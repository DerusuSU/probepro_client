<script setup>
import {ref, watch, onMounted, nextTick} from 'vue';
import {gsap} from 'gsap';
import {SplitText} from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

const props = defineProps({
  service: {
    type: Object,
    required: true,
    default: () => ({
      title:       '',
      description: '',
      image:       null,
      caption:     '',
    }),
  },
  tabs: {
    type: Array,
    required: true,
    default: () => [],
  },
});

const activeTab = ref(0);
const tabContentRef = ref(null);

const animateTabContent = () => {
  nextTick(() => {
    if (tabContentRef.value) {
      const split = new SplitText(tabContentRef.value, {type: 'words'});
      gsap.from(split.words, {
        duration: 0.5,
        opacity: 0,
        y: 20,
        stagger: 0.05,
      });
    }
  });
};

watch(activeTab, animateTabContent);

const isLaptop = ref(false);
let mql = null;

const update = () => {
  isLaptop.value = mql.matches;
};

onMounted(async () => {
  mql = window.matchMedia('(max-width: 1440px)');
  mql.addEventListener('change', update);
  update();
  await nextTick();
  animateTabContent();
});
</script>

<template>
  <section class="service">
    <div class="service__heading">
      <span class="service__path">Услуги / {{ service.title }}</span>
      <h1>{{ service.title }}</h1>
    </div>
    <div class="service__content">
      <div class="service__image">
        <img :src="service.image" alt="">
      </div>
      <div class="service__description">
        <h2>{{ service.description }}</h2>
        <p class="service__text" v-html="service.caption"></p>
      </div>
    </div>
  </section>
  <teleport :to="isLaptop ? '.service__content' : '.service__description'">
    <div class="service__info">
      <div class="tabs-headers">
        <div
            v-for="(tab, index) in tabs"
            :key="tab.number"
            @click="activeTab = index"
            :class="{ 'tab__header': true, 'active': activeTab === index }"
        >
          {{ tab.title }}
        </div>
      </div>
      <div class="tab__content" v-if="tabs.length > 0" ref="tabContentRef">
        <div class="tab__title">
          <span class="tab__index">{{ tabs.indexOf(tabs[activeTab]) + 1 }}</span>
          <h2>{{ tabs[activeTab].title }}</h2>
        </div>
        <span class="tab__text" v-html="tabs[activeTab].content"></span>
      </div>
    </div>
  </teleport>
</template>

<style scoped lang="scss">
.service {
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
    flex-direction: column;

    h2 {
      color: $color-black;
    }
  }

  &__text {
    margin-top: 24px;
  }

  &__info {
    margin-top: 64px;

    .tabs-headers {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      gap: 20px;
      row-gap: 16px;
    }

    .tab__header {
      color: $color-text;
      cursor: pointer;
      transition: color 0.3s;
      font-size: 20px;
      font-weight: 500;
      line-height: 110%;
      letter-spacing: -0.04em;

      &.active {
        color: $color-black;
      }
    }

    .tab__title {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 20px;
    }

    .tab__index {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 40px;
      width: 40px;
      border-radius: 50%;
      background: $color-primary;
      color: $color-white;
      font-size: 20px;
    }

    .tab__content {
      font-size: 16px;
      font-weight: 400;
      line-height: 110%;
      letter-spacing: -0.04em;
      color: $color-text;
      margin-top: 32px;

      p {
        margin-top: 20px;
      }
    }
  }
}

.tab__text {
  display: inline-block;
  margin-top: 16px;
  padding-left: 24px;
}

@media (max-width: 1440px) {
  .service {
    &__image {
      width: calc(50% - 24px);
    }
    &__description {
      width: calc(50% - 24px);
    }
  }
}

@media (max-width: 1024px) {
  .service {
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
  .service {
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
    }
    &__text {
      margin-top: 16px;
    }
    &__info {
      order: 3;
    }
  }
}

@media (max-width: 500px) {
  .service {
    &__heading {
      h1 {
        font-size: 28px;
      }
    }
  }
}
</style>