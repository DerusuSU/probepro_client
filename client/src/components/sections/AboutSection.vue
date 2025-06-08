<script setup>

import SectionLabel from "@/components/elements/SectionLabel.vue";
import Button from "@/components/elements/Button.vue";
import {onMounted, ref} from "vue";

defineProps({
  aboutInfo: {
    type: Object,
    default: () => ({
      title: '',
      description: '',
      cards: []
    })
  },
  needButton: {
    type: Boolean,
    default: true
  }
})

const bgFiles = import.meta.glob('@/assets/background/about-bg-el_*.svg', { eager: true, query: '?url', import: 'default' })

const getBgFromMap = (index) => {
  const fileName = `about-bg-el_${index + 1}.svg`
  const importPath = `/src/assets/background/${fileName}`
  return bgFiles[importPath] || ''
}

onMounted(() => {
})
</script>

<template>
  <section class="about-sec">
    <div class="about-sec__wrapper">
      <SectionLabel>О нас</SectionLabel>
      <div class="about-sec__heading">
        <h2 class="about-sec__title">{{aboutInfo.title}}</h2>
        <p class="about-sec__description">{{aboutInfo.description}}</p>
        <div class="about-sec__btn-wrap">
          <router-link :to="'/about'" v-if="needButton"><Button>Подробнее</Button></router-link>
        </div>
      </div>
      <div class="about-sec__advantages">
        <div
            v-for="(card, index) in aboutInfo.cards"
            :key="card.id"
            class="card"
        >
          <div class="card__head">
            <h3 class="card__title">{{ card.title }}</h3>
            <span class="card__index">
              {{ card.sort_order ? String(card.sort_order).padStart(2, '0') : (index + 1).toString().padStart(2, '0') }}
            </span>
          </div>
          <p class="card__text">{{ card.description }}</p>
          <div class="card__background">
            <img :src="getBgFromMap(index)" alt="" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.about-sec {
  margin-top: 120px;

  &__wrapper {
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
    flex-wrap: wrap;
  }

  &__title {
    width: 60%;
  }

  &__description {
    width: 35%;
    padding-top: 8px;
  }

  &__btn-wrap {
    width: 100%;
    padding-left: 65%;
    margin-top: 40px;
  }

  &__advantages {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 24px;
    margin-top: 80px;
  }
}

.card {
  padding: 32px 32px 40px;
  background: $color-primary;
  width: auto;
  height: auto;
  flex-grow: 1;
  border-radius: $radius;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;

  &:nth-child(-n+2) {
    width: calc((100% - 24px) / 2);
  }

  &:nth-child(n+3) {
    width: calc((100% - 48px) / 3);
  }

  &__head {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-bottom: 24px;
    border-bottom: 1px solid $color-white;
    z-index: 2;
  }

  &__title {
    font-size: 20px;
    font-weight: 500;
    color: $color-white;
    line-height: 120%;
    letter-spacing: -0.03em;
  }

  &__index {
    font-size: 20px;
    font-weight: 500;
    color: $color-white;
    line-height: 120%;
    letter-spacing: -0.03em;
  }

  &__text {
    margin-top: 56px;
    color: $color-white;
    z-index: 2;
  }

  &__background {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    opacity: 20%;
    overflow: hidden;
    border-radius: $radius;

    img {
      position: absolute;
    }
  }

  &:nth-child(1) {
    .card__background {
      img {
        top: -60px;
        left: -20px;
      }
    }
  }

  &:nth-child(2) {
    .card__background {
      img {
        top: -60px;
        right: -60px;
      }
    }
  }

  &:nth-child(3) {
    .card__background {
      img {
        bottom: -30px;
        left: -60px;
      }
    }
  }

  &:nth-child(4) {
    .card__background {
      img {
        top: -60px;
        right: -60px;
      }
    }
  }

  &:nth-child(5) {
    .card__background {
      img {
        top: -60px;
        left: -60px;
      }
    }
  }
}

@media (max-width: 1440px) {
  .about-sec {
    &__heading {
      flex-direction: column;
    }

    &__title {
      width: 100%;
    }

    &__description {
      width: 100%;
      margin-top: 16px;
    }

    &__btn-wrap {
      padding: 0;
    }
  }
}

@media (max-width: 1200px) {
  .about-sec {
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

@media (max-width: 1024px) {
  .card {
    padding: 24px 16px 32px;
  }
}

@media (max-width: 768px) {
  .card {
    &:nth-child(n+2) {
      width: 100%;
    }
  }
}

</style>