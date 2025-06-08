<template>
  <nav>
    <ul ref="navList" class="nav-list">
      <li>
        <router-link to="/">Главная</router-link>
      </li>
      <li
          @mouseover="onMouseOverServices"
      >
        <router-link to="/services">
          Услуги
          <svg width="13" height="8" viewBox="0 0 13 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.49997 7.41846C6.2849 7.41846 6.06987 7.33635 5.9059 7.17246L0.74617 2.01268C0.417943 1.68445 0.417943 1.15229 0.74617 0.824195C1.07426 0.496102 1.60632 0.496102 1.93457 0.824195L6.49997 5.38986L11.0654 0.824354C11.3936 0.496261 11.9256 0.496261 12.2537 0.824354C12.5821 1.15245 12.5821 1.68461 12.2537 2.01284L7.09404 7.17262C6.92999 7.33653 6.71495 7.41846 6.49997 7.41846Z" fill="black"/>
          </svg>
        </router-link>

      </li>
      <li>
        <router-link to="/projects">Проекты</router-link>
      </li>
      <li>
        <router-link to="/about">О нас</router-link>
      </li>
      <li>
        <router-link to="/contacts">Контакты</router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';

const props = defineProps({
  categories: {
    type: Array,
    default: () => []
  },
});

const emit = defineEmits({
  'show-services': null,
});

// Ссылку на список навигации пока оставим, чтобы анимация по-прежнему работала
const navList = ref(null);

// Вместо изменения isServicesOpen здесь — будем выбрасывать событие наверх
const onMouseOverServices = () => {
  // «транспортируем» информацию о том, что указатель навёлся на "Услуги"
  // написал 'show-services', но можно любое имя
  emit('show-services');
};

const enterAnimation = (links) => {
  gsap.from(links, {
    y: -20,
    opacity: 0,
    duration: 0.5,
    stagger: 0.1,
    ease: 'power2.out',
  });
};

onMounted(() => {
  const links = navList.value.querySelectorAll('li');
  enterAnimation(links);
});
</script>


<style scoped lang="scss">
.nav-list {
  display: flex;
  list-style: none;
  gap: 32px;

  a {
    font-size: 20px;
    font-weight: 500;
    text-decoration: none;
    line-height: 120%;
    letter-spacing: -0.04em;
    color: $color-black;
    transition: 0.3s all;
    &:hover {
      color: $color-text;
    }

    &:hover path {
      fill: $color-text;
    }

    path {
      transition: 0.3s all;
    }
  }
}

li {
  position: relative;

  svg {
    margin-left: 6px;
  }
}
</style>