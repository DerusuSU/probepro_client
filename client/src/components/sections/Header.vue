<template>
  <header class="header">
    <div class="header__wrapper">
      <div class="header__content">
        <img src="../../assets/logo.svg" class="header__logo" alt="logo" />

        <!-- Навигация, при наведении на "Услуги" открываем дропдаун -->
        <Navigation
            :categories="categories"
            class="header__navigation"
            @show-services="openServicesDropdown"
        />

        <div class="header__phone">
          <img src="../../assets/icons/phone_icon.svg" alt="Phone" />
          <a :href="`tel:` + contactInfo.phone">{{ contactInfo.phone }}</a>
        </div>

        <button class="header__burger-menu" @click="toggleMobileMenu">
          <img src="../../assets/icons/menu.svg" alt="Menu" />
        </button>

        <Transition @enter="enterMobileMenu" @leave="leaveMobileMenu">
          <MobileMenu
              v-if="isMobileMenuOpen"
              :categories="categories"
              :contact-info="contactInfo"
              @close="toggleMobileMenu"
          />
        </Transition>
      </div>
    </div>
    <Transition @enter="enterDropdown" @leave="leaveDropdown">
      <ServicesDropdown
          v-if="isServicesOpen"
          :categories="categories"
          @hide-services="closeServicesDropdown"
      />
    </Transition>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import { gsap } from 'gsap';
import Navigation from '../elements/Navigation.vue';
import MobileMenu from '../elements/MobileMenu.vue';
import ServicesDropdown from '../elements/ServicesDropdown.vue';

const props = defineProps({
  categories: {
    type: Array,
    default: () => []
  },
  contactInfo: {
    type: Object,
    default: () => ({})
  }
});

// === Мобильное меню ===
const isMobileMenuOpen = ref(false);
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};
const enterMobileMenu = (el, done) => {
  gsap.fromTo(
      el,
      { x: '100%' },
      { x: '0%', duration: 0.5, ease: 'power2.out', onComplete: done }
  );
};
const leaveMobileMenu = (el, done) => {
  gsap.to(el, { x: '100%', duration: 0.5, ease: 'power2.in', onComplete: done });
};

// === Дропдаун услуг ===
const isServicesOpen = ref(false);

const openServicesDropdown = () => {
  isServicesOpen.value = true;
};
const closeServicesDropdown = () => {
  isServicesOpen.value = false;
};

// GSAP-анимация появления/исчезновения всего дропдауна
const enterDropdown = (el, done) => {
  // Изначально ставим элемент чуть выше и невидимым
  gsap.set(el, { opacity: 0, y: -200 });

  // Анимируем «выпадение» вниз
  gsap.to(el, {
    opacity: 1,
    y: 0,
    duration: 0.6,
    ease: 'power2.out',
    onComplete: done
  });
};

const leaveDropdown = (el, done) => {
  // Анимируем «уход» вверх и исчезание
  gsap.to(el, {
    opacity: 0,
    y: -200,
    duration: 0.6,
    ease: 'power2.in',
    onComplete: done
  });
};
</script>

<style scoped lang="scss">
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 88px;
  z-index: 10;

  &__wrapper {
    width: 100%;
    height: 100%;
    padding: 20px 80px;
    background-color: $color-background-opacity;
    backdrop-filter: blur(5px);
    z-index: 12;
  }

  &__content {
    width: 100%;
    height: 100%;
    position: relative;
  }

  &__logo {
    height: 72px;
    left: 0;
    top: -12px;
    position: absolute;
  }

  &__navigation {
    left: 50%;
    transform: translateX(-50%);
    top: 12px;
    position: absolute;
  }

  &__phone {
    position: absolute;
    right: 0;
    top: 12px;
    display: flex;
    align-items: center;
    gap: 16px;

    a {
      font-size: 20px;
      font-weight: 500;
      color: $color-black;
      line-height: 120%;
      letter-spacing: -0.04em;
      text-decoration: none;
      transition: 0.3s all;
      &:hover {
        color: $color-text;
      }
    }

    img {
      width: 24px;
    }
  }

  &__burger-menu {
    display: none;
    position: absolute;
    top: 12px;
    right: 0;
    background: none;
    border: none;
    outline: none;

    img {
      width: 24px;
    }
  }
}

@media (max-width: 1200px) {
  .header {
    &__wrapper {
      padding: 20px 48px;
    }
    &__navigation {
      display: none;
    }
    &__phone {
      display: none;
    }
    &__burger-menu {
      display: block;
    }
    &__logo {
      height: 64px;
      left: 0;
      top: -8px;
      position: absolute;
    }
  }
}

@media (max-width: 768px) {
  .header {
    &__wrapper {
      padding: 20px 16px;
    }
  }
}

@media (max-width: 500px) {

}

/* Убираем любые CSS-fade-классы — теперь всё через GSAP */
</style>
