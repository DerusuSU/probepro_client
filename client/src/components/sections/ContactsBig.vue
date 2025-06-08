<script setup>
import {ref, watch, onMounted, nextTick} from 'vue';
import {gsap} from 'gsap';
import {SplitText} from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

const props = defineProps({
  contacts: {
    type: Object,
    required: true,
    default: () => ({
    }),
  },
});

</script>

<template>
  <section class="contacts">
    <div class="contacts__heading">
      <span class="contacts__path">Главная / Конакты</span>
      <h1>Контакты</h1>
    </div>
    <div class="contacts__content">
      <div class="contacts__image">
        <div style="position:relative;overflow:hidden;"><a
            href="https://yandex.ru/maps/2/saint-petersburg/?utm_medium=mapframe&utm_source=maps"
            style="font-size:12px;position:absolute;top:0px;">Санкт‑Петербург</a><a
            href="https://yandex.ru/maps/2/saint-petersburg/house/shosse_revolyutsii_114/Z0kYcgBlTUcAQFtjfXV3dnxhYQ==/?ll=30.475427%2C59.967025&utm_medium=mapframe&utm_source=maps&z=17.05"
            style="font-size:12px;position:absolute;top:14px;border: none">Яндекс Карты</a>
          <iframe
              src="https://yandex.ru/map-widget/v1/?ll=30.475427%2C59.967025&mode=search&ol=geo&ouri=ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgg1NzQzNDQ5NxJP0KDQvtGB0YHQuNGPLCDQodCw0L3QutGCLdCf0LXRgtC10YDQsdGD0YDQsywg0YjQvtGB0YHQtSDQoNC10LLQvtC70Y7RhtC40LgsIDExNCIKDa3N80EVPN5vQg%2C%2C&z=17.05"
              width="100%" height="400" allowfullscreen="true" style="position:relative;border: none;"></iframe>
        </div>
      </div>
      <div class="contacts__description">
        <div class="contacts__info">
          <h2>Телефон</h2>
          <p>{{contacts.phone}}</p>
        </div>
        <div class="contacts__info">
          <h2>Почта</h2>
          <p>{{contacts.email}}</p>
        </div>
        <div class="contacts__info">
          <h2>Адрес</h2>
          <p>{{contacts.address}}</p>
        </div>
        <div class="contacts__info">
          <h2>Часы работы</h2>
          <p>{{contacts.work_hours}}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.contacts {
  width: 100%;
  height: auto;
  margin-top: 160px;
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
      display: block;
      font-size: 16px;
      font-weight: 400;
      line-height: 120%;
      color: $color-text;
      max-width: 80%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
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

  &__content {
    width: 100%;
    height: auto;
    margin-top: 72px;
    position: relative;
    border-radius: $radius;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  &__image {
    width: calc(50% - 44px);

    iframe {
      width: 100%;
      aspect-ratio: 4/3;
      border-radius: $radius;
    }
  }

  &__description {
    width: calc(50% - 44px);
    display: flex;
    gap: 56px;
    flex-direction: column;
  }

  &__info {
    h2 {
      margin-bottom: 8px;
    }
    p {
      font-size: 20px;
    }
  }
}

@media (max-width: 1440px) {
  .contacts {
    &__image {
      width: calc(50% - 24px);
    }

    &__description {
      width: calc(50% - 24px);
    }
  }
}

@media (max-width: 1024px) {
  .contacts {
    margin-top: 160px;

    &__image {
      width: calc(50% - 12px);
    }

    &__description {
      width: calc(50% - 12px);

      h2 {
        font-size: 24px;
      }
    }
  }
}

@media (max-width: 768px) {
  .contacts {
    margin-top: 120px;

    &__heading {
      h1 {
        font-size: 32px;
      }
    }

    &__content {
      margin-top: 24px;
    }

    &__image {
      order: 1;
      width: 100%;

      img {
        aspect-ratio: 16/9;
      }
    }

    &__description {
      order: 2;
      width: 100%;
      margin-top: 24px;
      gap: 40px;
    }
  }
}

@media (max-width: 500px) {
  .contacts {
    &__heading {
      h1 {
        font-size: 28px;
      }
    }
  }
}
</style>