<script setup>
import {computed} from "vue";

const props = defineProps({
  services: {
    type: Array,
    required: true,
  }
});

const processedCategories = computed(() => {
  return props.services.map(category => ({
    ...category,
    image: category.image
        ? `${import.meta.env.VITE_API_BASE_URL}/storage/${category.image}`
        : null,
  }));
});

</script>

<template>
<section class="services">
  <div class="services__heading">
    <span>Главная / Услуги</span>
    <h1>Услуги</h1>
  </div>
  <div class="services__cards">
    <div v-for="category in processedCategories" :key="category.id" class="card">
      <div class="card__top">
        <span class="card__title">{{ category.name }}</span>
        <img
            :src="category.image || '@/assets/images/services/placeholder.png'"
            class="card__preview"
            :alt="category.name"
        />
      </div>
      <ul class="card__list">
        <li v-for="service in category.services" :key="service.slug" class="card__item">
          <router-link :to="`/services/${service.slug}`">
            <span>{{ service.title }}</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_751_7663)">
                <path d="M18.8369 12.0001C18.8369 12.4302 18.6727 12.8603 18.3449 13.1882L8.02535 23.5077C7.3689 24.1641 6.30458 24.1641 5.64839 23.5077C4.9922 22.8515 4.9922 21.7874 5.64839 21.1309L14.7797 12.0001L5.64871 2.86922C4.99252 2.21277 4.99252 1.14877 5.64871 0.492633C6.30489 -0.164138 7.36922 -0.164138 8.02567 0.492633L18.3452 10.8119C18.6731 11.14 18.8369 11.5701 18.8369 12.0001Z" fill="white"/>
              </g>
            </svg>
          </router-link>
        </li>
      </ul>
      <div class="card__background">
        <img src="@/assets/background/serv-bg-el_1.svg" alt="background" />
      </div>
    </div>
  </div>
</section>
</template>

<style scoped lang="scss">
.services {
  display: flex;
  flex-direction: column;
  margin-top: 200px;
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

  &__heading {
    span {
      font-size: 20px;
      font-weight: 400;
      line-height: 120%;
      color: $color-text;
    }
    h1 {
      font-size: 64px;
      font-weight: 500;
      line-height: 100%;
      letter-spacing: -0.04em;
      color: $color-black;
      margin-top: 24px;
    }
  }

  &__cards {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 24px;
    margin-top: 80px;
  }
}

.card {
  padding: 8px 8px 56px;
  border-radius: $radius;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  height: auto;

  &:nth-child(-n+2) {
    width: calc((100% - 24px) / 2);
  }

  &:nth-child(n+3) {
    width: calc((100% - 48px) / 3);
  }

  &__background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: $color-primary;
    z-index: -1;

    img {
      position: absolute;
      opacity: 20%;
      bottom: -80px;
      left: 0;
      transform: scale(1.5);
    }
  }

  &__top {
    height: 320px;
    width: 100%;
    position: relative;
    overflow: hidden;
    border-radius: $radius-inside;

    span {
      font-size: 36px;
      font-weight: 500;
      line-height: 100%;
      color: $color-white;
      position: absolute;
      bottom: 24px;
      left: 16px;
      z-index: 2;
    }

    img {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      object-fit: cover;
      z-index: 1;
    }
  }
  &__list {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    gap: 24px;
    list-style: none;
    margin-top: 40px;
    padding: 0 16px;
  }

  &__item {
    a {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      text-decoration: none;
      &:hover {
        span {
          color: $color-text-2;
        }
        path {
          fill: $color-text-2;
        }

      }

      span{
        color: $color-white;
        font-size: 20px;
        font-weight: 400;
        line-height: 110%;
        letter-spacing: -0.04em;
        max-width: 90%;
        transition: 0.3s all;
      }

      path {
        transition: 0.3s all;
      }
    }


  }

}

@media (max-width: 1400px) {
  .card {
    padding-bottom: 40px;
    &__top {
      span {
        font-size: 32px;
      }
    }
    &__list {
      margin-top: 32px;
    }
  }
}

@media (max-width: 1200px) {
  .services {
    margin-top: 160px;
  }

  .card {
    &:first-child {
      width: 100%;
    }

    &:nth-child(n+2) {
      width: calc((100% - 24px) / 2);
    }
  }
}

@media (max-width: 768px) {
  .services {
    margin-top: 120px;
  }

  .card {
    &:nth-child(n+2) {
      width: 100%;
    }
  }
}

@media (max-width: 500px) {
  .services {
    &__heading {
      h1 {
        font-size: 56px;
        margin-top: 16px;
      }
    }
  }

  .card {
    &__list {
      padding: 0 8px;
    }
  }
}
</style>