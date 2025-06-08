<template>
  <div class="mobile-menu">
    <ul ref="mobileNavList" class="mobile-menu__list">
      <li><router-link :to="'/'" @click="$emit('close')">Главная</router-link></li>
      <li><router-link :to="'/services'" @click="$emit('close')">Услуги</router-link></li>
      <li><router-link :to="'/projects'" @click="$emit('close')">Проекты</router-link></li>
      <li><router-link :to="'/about'" @click="$emit('close')">О нас</router-link></li>
      <li><router-link :to="'/contacts'" @click="$emit('close')">Контакты</router-link></li>
    </ul>
    <div class="mobile-menu__contacts" ref="contactInfo">
      <a :href="`tel:` + contactInfo.phone">Тел: {{contactInfo.phone}}</a>
      <a :href="`mailto:` + contactInfo.email">Почта: {{contactInfo.email}}</a>
      <a :href="contactInfo.address_link">Адрес: {{ contactInfo.address }}</a>
      <p>Время работы: {{ contactInfo.work_hours }}</p>
    </div>
    <button class="mobile-menu__close" @click="$emit('close')">
      <img src="../../assets/icons/close.svg" alt="Menu"/>
    </button>
    <div class="mobile-menu__background">
      <img src="../../assets/background/about-bg-el_1.svg" alt="">
      <img src="../../assets/background/bg-el_2.svg" alt="">
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted, watch} from 'vue';
import { gsap } from 'gsap';

const props = defineProps({
  categories: Array,
  contactInfo: Object,
});

const isServicesOpen = ref(false);
const openCategory = ref(null);
const mobileNavList = ref(null);
const contactInfoRef = ref(null);
const serviceLists = ref({});

watch(openCategory, (newVal, oldVal) => {
  if (oldVal && serviceLists.value[oldVal]) {
    gsap.to(serviceLists.value[oldVal], { height: 0, duration: 0.3 });
  }
  if (newVal && serviceLists.value[newVal]) {
    gsap.fromTo(serviceLists.value[newVal], { height: 0 }, { height: 'auto', duration: 0.3 });
  }
});

onMounted(() => {
  const links = mobileNavList.value.querySelectorAll('li');
  gsap.from(links, { x: -20, opacity: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out', delay: 0.4 });
  gsap.from(contactInfoRef.value, { opacity: 0, duration: 0.5, delay: 0.5 });
});
</script>

<style scoped lang="scss">
.mobile-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100dvh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 10;

  &__background {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: $color-primary;
    z-index: 10;

    img:nth-child(1) {
      position: absolute;
      opacity: 20%;
      top: -20px;
      left: -20px;
    }
    img:nth-child(2) {
      position: absolute;
      opacity: 20%;
      bottom: -220px;
      right: -400px;
      transform: scale(40%);
    }
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    a {
      font-size: 32px;
      font-weight: 500;
      text-decoration: none;
      line-height: 120%;
      letter-spacing: -0.04em;
      color: $color-white;
    }
    z-index: 11;
  }

  &__close {
    cursor: pointer;
    position: absolute;
    top: 24px;
    right: 24px;
    width: 24px;
    background: none;
    outline: none;
    border: none;
    z-index: 11;
  }

  &__contacts {
    z-index: 11;
    display: flex;
    flex-direction: column;
    gap: 12px;
    a {
      color: $color-white;
      text-decoration: none;
      font-size: 16px;
    }
    p {
      color: $color-white;
    }
  }
}

ul {
  list-style: none;
  padding: 0;
}
</style>