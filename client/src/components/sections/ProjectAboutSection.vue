<script setup>
import {ref, watch, onMounted, nextTick} from 'vue';
import {gsap} from 'gsap';
import {SplitText} from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

const props = defineProps({
  project: {
    type: Object,
    required: true,
    default: () => ({
      title:       '',
      object_description: '',
      image:       null,
      address:     '',
      additional_info: '',
      services: []
    }),
  },
});

const isLaptop = ref(false);
let mql = null;

const update = () => {
  isLaptop.value = mql.matches;
};

onMounted(async () => {
  mql = window.matchMedia('(max-width: 1440px)');
  mql.addEventListener('change', update);
  update();
});
</script>

<template>
  <section class="project">
    <div class="project__heading">
      <span class="project__path">Проекты / {{ project.title }}</span>
      <h1>{{ project.title }}</h1>
    </div>
    <div class="project__content">
      <div class="project__image">
        <img :src="project.image" alt="">
      </div>
      <div class="project__description">
        <div class="project__info">
          <h2>Описание объекта</h2>
          <p>{{ project.object_description }}</p>
        </div>
        <div class="project__info">
          <h2>Подробности</h2>
          <p v-html="project.additional_info"></p>
        </div>
        <div class="project__info">
          <h2>Адрес</h2>
          <p>{{ project.address }}</p>
        </div>
        <div class="project__info">
          <h2>Выполненные работы</h2>
          <ul v-if="project.services.length">
            <li v-for="(service, index) in project.services" :key="index">{{ service }}</li>
          </ul>
          <p v-else>Услуги не указаны</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.project {
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
      font-size: 40px;
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

    img {
      width: 100%;
      object-fit: cover;
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
    ul {
      color: $color-text;
      padding-left: 24px;
      gap: 12px;
      display: flex;
      flex-direction: column;
    }
  }
}

@media (max-width: 1440px) {
  .project {
    &__image {
      width: calc(50% - 24px);
    }
    &__description {
      width: calc(50% - 24px);
    }
  }
}

@media (max-width: 1024px) {
  .project {
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
  .project {
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
  .project {
    &__heading {
      h1 {
        font-size: 28px;
      }
    }
  }
}
</style>