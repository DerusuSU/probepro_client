<script setup>
import {onMounted, ref} from "vue";

const isMobile = ref(false);
let mql = null;

const update = () => {
  isMobile.value = mql.matches;
};

defineProps({
  contactInfo: {
    type: Object,
    default: () => ({})
  }
})

onMounted(() => {
  mql = window.matchMedia('(max-width: 768px)');
  mql.addEventListener('change', update);
  update();
})
</script>

<template>
  <div class="footer">
    <div class="footer__left">
      <img src="../../assets/logo.svg" alt="">
      <a href="#" class="footer__policy" v-if="!isMobile">Политика конфиденциальности</a>
    </div>
    <div class="footer__right">
      <nav class="footer__navigation">
        <span>Навигация</span>
        <ul>
          <li><router-link :to="'/'">Главная</router-link></li>
          <li><router-link :to="'/services'">Услуги</router-link></li>
          <li><router-link :to="'/projects'">Проекты</router-link></li>
          <li><router-link :to="'/about'">О нас</router-link></li>
          <li><router-link :to="'/contacts'">Контакты</router-link></li>
        </ul>
      </nav>
      <div class="footer__contacts">
        <span>Контакты</span>
        <a :href="`tel:` + contactInfo.phone">Тел: {{contactInfo.phone}}</a>
        <a :href="`mailto:` + contactInfo.email">Почта: {{contactInfo.email}}</a>
        <a :href="contactInfo.address_link">Адрес: {{ contactInfo.address }}</a>
      </div>
      <div class="footer__background">
        <img src="../../assets/background/footer-bg-el_1.svg" alt="">
        <img src="../../assets/background/footer-bg-el_2.svg" alt="">
      </div>
    </div>
    <teleport to=".footer" v-if="isMobile">
      <a href="#" class="footer__policy">Политика конфиденциальности</a>
    </teleport>
  </div>
</template>

<style scoped lang="scss">
.footer {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 32px;
  margin-top: 200px;

  &__left {
    width: 25%;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    img {
      width: 75%;
      height: auto;
    }

  }

  &__policy {
    font-size: 16px;
    color: $color-black;
    font-weight: 500;
    margin-top: 24px;
  }

  &__right {
    width: 75%;
    height: 448px;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    border-radius: $radius;
    background-color: $color-primary;
    position: relative;
    padding: 72px 0;

    span {
      font-size: 24px;
      color: $color-white;
      font-weight: 600;
      line-height: 165%;
    }
  }

  &__background {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    overflow: hidden;
    border-radius: $radius;

    img:first-child {
      position: absolute;
      opacity: 20%;
      top: -20px;
      left: -220px;
    }

    img:nth-child(2) {
      position: absolute;
      opacity: 20%;
      bottom: -20px;
      right: -40px;
    }

  }

  &__navigation {
    z-index: 2;

    ul {
      margin-top: 24px;
      list-style: none;
      display: flex;
      flex-direction: column;
      row-gap: 8px;
    }

    a {
      text-decoration: none;
      font-size: 20px;
      color: $color-white;
      font-weight: 400;
      line-height: 165%;
      letter-spacing: -0.04em;
      cursor: pointer;
      transition: 0.3s all;
      &:hover {
        color: $color-text-2;
      }
    }
  }

  &__contacts {
    z-index: 2;
    display: flex;
    flex-direction: column;
    row-gap: 8px;
    width: 35%;

    span {
      margin-bottom: 16px;
    }

    a {
      text-decoration: none;
      font-size: 20px;
      color: $color-white;
      font-weight: 400;
      line-height: 165%;
      letter-spacing: -0.04em;
      cursor: pointer;
      transition: 0.3s all;
      &:hover {
        color: $color-text-2;
      }
    }
  }
}

@media (max-width: 1440px) {
  .footer {
    &__left {
      width: 33%;
    }

    &__right {
      width: 67%;
      padding: 40px 0;
      height: auto;
    }
  }
}

@media (max-width: 1024px) {
  .footer {
    &__right {
      flex-direction: column;
      padding: 56px 32px;
      height: auto;
    }

    &__navigation {
      ul {
        flex-direction: row;
        flex-wrap: wrap;
        column-gap: 16px;
      }
    }

    &__contacts {
      margin-top: 40px;
      width: 100%;

      span {
        margin-bottom: 8px;
      }
    }
  }
}

@media (max-width: 768px) {
  .footer {
    flex-direction: column;
    row-gap: 0;
    margin-bottom: 8px;

    &__left {
      width: 100%;
      align-items: center;
      margin-bottom: 32px;

      img {
        width: 300px;
      }
    }

    &__right {
      width: 100%;
      border-radius: 0;
    }

    &__background {
      border-radius: 0;
    }

    &__policy {
      padding: 0 24px;
    }
  }
}

@media (max-width: 500px) {
  .footer {
    &__left {
      img {
        width: 80%;
      }
    }

    &__right {
      padding: 40px 16px;
    }

    &__navigation {
      ul {
        flex-direction: column;
      }
    }
  }
}
</style>