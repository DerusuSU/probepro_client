<script setup>
import SectionLabel from "@/components/elements/SectionLabel.vue";
import ButtonAlter from "@/components/elements/ButtonAlter.vue";
import ArrowButton from "@/components/elements/ArrowButton.vue";
import router from "@/router/index.js";
import {ref} from "vue";

const props = defineProps({
  servicesInfo: {
    type: Object,
    required: true,
  }
});
const hoveredCard = ref(null)

// Разделяем услуги на карточки (первые 4) и список (с 5-й)
const cardServices = props.servicesInfo.cards.slice(0, 4);
const listServices = props.servicesInfo.cards.length >= 5 ? props.servicesInfo.cards.slice(4) : [];
</script>

<template>
  <section class="services-sec">
    <div class="services-sec__wrapper">
      <SectionLabel>Услуги</SectionLabel>
      <div class="services-sec__heading">
        <h2 class="services-sec__title">Полный комплекс инженерных и противопожарных решений под ключ. От обследования
          до ввода в эксплуатацию — всё в одних руках.</h2>
      </div>
      <div class="services-sec__cards">
        <div class="services-sec__left">
          <div v-for="service in cardServices" :key="service.slug" class="card" @mouseenter="hoveredCard = service.slug"
               @mouseleave="hoveredCard = null">
            <router-link :to="`/services/${service.slug}`" class="card__link">
              <ArrowButton class="card__button" :isHovered="hoveredCard === service.slug"></ArrowButton>
              <span class="card__text">{{ service.title }}</span>
              <div class="card__gradient"></div>
              <img
                  :src="service.image || '@/assets/images/services/placeholder.png'"
                  :alt="service.title"
              />
            </router-link>
          </div>
        </div>
        <div class="services-sec__right">
          <ul v-if="listServices.length" class="services-sec__list">
            <li v-for="service in listServices" :key="service.slug">
              <router-link :to="`/services/${service.slug}`">
                {{ service.title }}
              </router-link>
            </li>
          </ul>
          <router-link to="/services" class="services-sec__button">
            <ButtonAlter variant="alt" class="services-sec__button">
              <template v-slot:icon><img src="../../assets/icons/arrow_1.svg" alt="Скачать"></template>
              <template v-slot:text>Все услуги</template>
            </ButtonAlter>
          </router-link>
          <img class="services-sec__background" src="../../assets/background/serv-bg-el_1.svg" alt=""/>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.services-sec {
  margin-top: 120px;

  .services-sec__wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0 88px;

    @media (max-width: 1440px) {
      padding: 0 72px;
    }

    @media (max-width: 1024px) {
      padding: 0 56px;
    }

    @media (max-width: 768px) {
      padding: 0 16px;
    }
  }

  &__heading {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  &__title {
    width: 60%;
  }

  &__cards {
    width: 100%;
    margin-top: 80px;
    display: flex;
    flex-direction: row;
    column-gap: 24px;
  }

  &__left {
    width: calc(70% - 12px);
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 24px;
    justify-content: space-between;
  }

  &__right {
    width: calc(30% - 12px);
    max-height: 100%;
    border-radius: $radius;
    background: $color-primary;
    padding: 24px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    overflow: hidden;

    a {
      text-decoration: none;
    }
  }

  &__background {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 20%;
    z-index: 1;
    transform: scale(1.2);
  }

  &__button {
    align-self: flex-end;
    z-index: 2;
  }

  &__list {
    width: 100%;
    display: flex;
    flex-direction: column;
    list-style: none;
    gap: 24px;
    line-height: 110%;
    padding: 16px;
    z-index: 2;

    a {
      font-size: 20px;
      font-weight: 400;
      text-decoration: none;
      cursor: pointer;
      color: $color-white;
    }
  }

}

.card {
  height: 340px;
  border-radius: $radius;
  padding: 24px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: 0.4s all ease-in-out;

  &:hover {
    transform: scale(0.99);
  }

  a {
    text-decoration: none;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }

  &:nth-child(1), &:nth-child(4) {
    width: calc(67% - 12px);
  }

  &:nth-child(2), &:nth-child(3) {
    width: calc(33% - 12px);
  }

  &__gradient {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50%;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
    z-index: -1;
  }

  img {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    object-fit: cover;
    z-index: -2;
  }

  &__button {
    align-self: flex-end;
  }

  &__text {
    font-size: 20px;
    font-weight: 400;
    line-height: 110%;
    color: $color-white;
    letter-spacing: -0.04em;
  }
}

@media (max-width: 1440px) {
  .services-sec {
    &__cards {
      flex-direction: column;
      gap: 24px;
    }

    &__left {
      width: 100%;
    }

    &__right {
      width: 100%;
    }

    &__background {
      transform: rotate(90deg) scale(2.4);
      top: 0;
      left: -250px;
    }

    &__list {
      margin-bottom: 40px;
    }
  }

  .card {
    &:nth-child(1), &:nth-child(4) {
      width: calc(50% - 12px);
    }

    &:nth-child(2), &:nth-child(3) {
      width: calc(50% - 12px);
    }
  }
}

@media (max-width: 1200px) {
  .services-sec {
    &__title {
      width: 100%;
    }
  }
}

@media (max-width: 768px) {
  .services-sec {
    &__right {
      padding: 32px 16px;
    }

    &__list {
      padding: 0;
    }
  }

  .card {
    padding: 16px;

    &:nth-child(1), &:nth-child(4) {
      width: 100%;
    }

    &:nth-child(2), &:nth-child(3) {
      width: 100%;
    }
  }
}

</style>