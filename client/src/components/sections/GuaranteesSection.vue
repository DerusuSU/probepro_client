<script setup>

import SectionLabel from "@/components/elements/SectionLabel.vue";
import ButtonAlter from "@/components/elements/ButtonAlter.vue";
import {ref, watch} from "vue";

const props = defineProps({
  guaranteesInfo: {
    type: Object,
    required: true,
    default: () => [],
  },
});
const card1 = ref([]);
const card2 = ref([]);

watch(
    () => props.guaranteesInfo,
    (newInfo) => {
      if (newInfo?.cards?.length >= 2) {
        card1.value = newInfo.cards[0];
        card2.value = newInfo.cards[1];
      }
    },
    { immediate: true }
);

const openLink = () => {
  if (card1.value?.link) {
    window.open(card2.value.link, '_blank');
  } else {
    console.warn('Ссылка отсутствует');
  }
};
const openLink2 = () => {
  if (card2.value?.link) {
    window.open(card2.value.link, '_blank');
  } else {
    console.warn('Ссылка отсутствует');
  }
}

</script>

<template>
<section class="guarantees-sec">
  <div class="guarantees-sec__wrapper">
    <SectionLabel>Гарантии</SectionLabel>
    <div class="guarantees-sec__heading">
      <h2 class="guarantees-sec__title">{{guaranteesInfo.title}}</h2>
      <p class="guarantees-sec__description">{{guaranteesInfo.description}}</p>
    </div>
    <div class="guarantees-sec__content">
      <div class="guarantees-sec__card card">
        <h3 class="card__title">{{card1.title}}</h3>
        <p class="card__caption">{{card1.description}}</p>
        <ButtonAlter class="card__button" @click="openLink">
          <template v-slot:icon><img src="../../assets/icons/link_icon.svg" alt="Перейти"></template>
          <template v-slot:text>Перейти на сайт</template>
        </ButtonAlter>
        <div class="card__background">
          <img src="../../assets/background/guar-bg-el_2.svg" alt="">
          <img src="../../assets/background/guar-bg-el_1.svg" alt="">
        </div>
      </div>
      <div class="guarantees-sec__card card">
        <h3 class="card__title">{{card2.title}}</h3>
        <p class="card__caption">{{card2.description}}</p>
        <ButtonAlter class="card__button" @click="openLink2">
          <template v-slot:icon><img src="../../assets/icons/download_icon.svg" alt="Скачать"></template>
          <template v-slot:text>Скачать лицензию</template>
        </ButtonAlter>
        <div class="card__background">
          <img src="../../assets/background/guar-bg-el_3.svg" alt="">
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<style scoped lang="scss">
.guarantees-sec {
  margin-top: 120px;

  .guarantees-sec__wrapper {
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

  &__description {
    width: 35%;
    padding-top: 8px;
  }

  &__content {
    width: 100%;
    display: flex;
    flex-direction: row;
    margin-top: 96px;
    justify-content: space-between;
  }
}

.card {
  width: calc(50% - 12px);
  height: auto;
  border-radius: $radius;
  background-color: $color-primary;
  padding: 24px 32px;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;

  &__title {
    color: $color-white;
    font-size: 32px;
    line-height: 100%;
    letter-spacing: -0.04em;
    font-weight: 500;
    z-index: 2;
  }

  &__caption  {
    color: $color-white;
    margin-top: 16px;
    margin-bottom: 32px;
    z-index: 2;
  }

  &__button {
    margin-top: auto;
    z-index: 2;
  }

  &__background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    opacity: 20%;

    img {
      position: absolute;
    }
  }

  &:first-child {
    .card__background {
      img:nth-child(1) {
        top: -20px;
        left: -60px;
      }
      img:nth-child(2) {
        bottom: -60px;
        right: -80px;
      }
    }
  }

  &:nth-child(2) {
    .card__background {
      img {
        top: -20px;
        right: -60px;
      }
    }
  }
}
@media (max-width: 1440px) {
  .card {
    &__title {
      font-size: 32px;
    }
  }
}

@media (max-width: 1200px) {
  .guarantees-sec {
    &__heading {
      width: 100%;
      flex-direction: column;
    }

    &__title {
      width: 100%;
    }

    &__description {
      width: 100%;
      padding-top: 16px;
    }

    &__content {
      flex-direction: column;
      gap: 24px;
      margin-top: 80px;
    }
  }
  .card {
    width: 100%;
  }
}

@media (max-width: 1024px) {
  .card {
    &__title {
      font-size: 32px;
    }
  }
}

@media (max-width: 768px) {
  .card {
    padding: 24px 16px;

    &__title {
      font-size: 24px;
    }
  }
}

@media (max-width: 500px) {
  .guarantees-sec__content {
    margin-top: 56px;
  }
}
</style>