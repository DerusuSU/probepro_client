<script setup>

import SectionLabel from "@/components/elements/SectionLabel.vue";
import ArrowButton from "@/components/elements/ArrowButton.vue";
import gsap from 'gsap';
import {onMounted, onUnmounted, ref} from "vue";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {SplitText} from "gsap/SplitText";
import Button from "@/components/elements/Button.vue";

gsap.registerPlugin(ScrollTrigger, SplitText);

const isLaptop = ref(false);
let mql = null;

const update = () => {
  isLaptop.value = mql.matches;
};

const props = defineProps({
  projectsInfo: {
    type: Object,
    default: () => ({
      title: '',
      description: '',
      cards: []
    })
  }
})

const currentIndex = ref(0);

const nextProject = () => {
  currentIndex.value = (currentIndex.value + 1) % props.projectsInfo.cards.length;
};

const prevProject = () => {
  currentIndex.value = (currentIndex.value - 1 + props.projectsInfo.cards.length) % props.projectsInfo.cards.length;
};

const container = ref(null);

onMounted(() => {
  mql = window.matchMedia('(max-width: 1024px) and (min-width: 768px)');
  mql.addEventListener('change', update);
  update();
  const elements = container.value.querySelectorAll("h2, p, li");
  elements.forEach((element) => {
    const split = new SplitText(element, {
      type: "words,lines",
      linesClass: "line",
      autoSplit: true,
      mask: "lines",
    });
    const numLines = split.lines.length;
    const totalStaggerTime = 0.3;
    const staggerValue = numLines > 1 ? totalStaggerTime / (numLines - 1) : 0;
    gsap.from(split.lines, {
      duration: 0.8,
      opacity: 0,
      yPercent: 100,
      ease: 'expo.out',
      stagger: staggerValue,
      scrollTrigger: {
        trigger: element,
        start: 'top 90%',
        toggleActions: 'play none none none'
      }
    })
  })
  gsap.from('.projects-sec__image', {
    scale: 0.95,
    opacity: 0,
    duration: 0.8,
    scrollTrigger: {
      trigger: '.projects-sec__image',
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  })
})

onUnmounted(() => {
  mql.removeEventListener('change', update);
});

</script>

<template>
  <section class="projects-sec" ref="container">
    <div class="projects-sec__wrapper">
      <SectionLabel variant="alt">Проекты</SectionLabel>
      <div class="projects-sec__heading">
        <h2 class="alt projects-sec__title" ref="textElement">{{ projectsInfo.title }}</h2>
        <p class="alt projects-sec__description">{{ projectsInfo.description }}</p>
      </div>
      <div class="projects-sec__content">
        <div class="projects-sec__info">
          <div class="projects-sec__image">
            <img
                :src="projectsInfo.cards[currentIndex]?.image || '@/assets/images/projects/placeholder.png'"
                :alt="projectsInfo.cards[currentIndex]?.title"
            >
            <span>{{ projectsInfo.cards[currentIndex]?.title }}</span>
          </div>
          <teleport to=".projects-sec__info" v-if="isLaptop">
            <div class="projects-sec__controls">
              <ArrowButton direction="left" @click="prevProject"/>
              <ArrowButton @click="nextProject"/>
            </div>
          </teleport>
          <div class="projects-sec__about">
            <div class="info-block">
              <h3>Описание объекта:</h3>
              <p>{{ projectsInfo.cards[currentIndex]?.object_description }}</p>
            </div>
            <teleport to=".projects-sec__about" v-if="isLaptop">
              <p class="projects-sec__address">{{ projectsInfo.cards[currentIndex]?.address }}</p>
            </teleport>
            <teleport to=".projects-sec__about" v-if="isLaptop">
              <router-link :to="`/projects/${projectsInfo.cards[currentIndex]?.slug}`">
                <Button class="projects-sec__button">Подробнее</Button>
              </router-link>
            </teleport>
          </div>
        </div>
        <div class="projects-sec__bottom">
          <p class="projects-sec__address" v-if="!isLaptop">{{ projectsInfo.cards[currentIndex]?.address }}</p>
          <div class="projects-sec__panel">
            <router-link :to="`/projects/${projectsInfo.cards[currentIndex]?.slug}`">
              <Button v-if="!isLaptop" variant="alt">Подробнее</Button>
            </router-link>
            <div class="projects-sec__controls" v-if="!isLaptop">
              <ArrowButton direction="left" @click="prevProject"></ArrowButton>
              <ArrowButton @click="nextProject"></ArrowButton>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="projects-sec__background">
      <img src="../../assets/background/bg-el_1.svg" alt="">
      <img src="../../assets/background/bg-el_2.svg" alt="">
    </div>
  </section>
</template>

<style scoped lang="scss">
.projects-sec {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: auto;
  background: $color-primary;
  border-radius: $radius;
  position: relative;
  overflow: hidden;
  margin-top: 160px; //Поменять/удалить!

  .projects-sec__background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;

    img:first-child {
      opacity: 20%;
      position: absolute;
      top: -20px;
      left: -100px;
    }

    img:last-child {
      opacity: 20%;
      position: absolute;
      bottom: -20px;
      right: -100px;
    }
  }

  .projects-sec__wrapper {
    width: 100%;
    padding: 72px 88px;
    z-index: 2;
  }

  .projects-sec__heading {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .projects-sec__title {
    width: 60%;
  }

  .projects-sec__description {
    width: 35%;
    padding-top: 8px;
  }

  .projects-sec__content {
    margin-top: 104px;
  }

  .projects-sec__info {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }

  .projects-sec__about {
    width: 35%;
  }

  .projects-sec__image {
    width: 40%;
    aspect-ratio: 16/9;
    border-radius: $radius;
    background: $color-white;
    padding: 8px;
    display: flex;
    flex-direction: column;

    img {
      width: 100%;
      height: 80%;
      object-fit: cover;
      border-radius: $radius-inside;
    }

    span {
      display: flex;
      font-size: 24px;
      color: $color-black;
      font-weight: 500;
      flex-grow: 1;
      padding: 0 16px;
      align-items: center;
    }
  }

  .projects-sec__bottom {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 88px;
  }

  .projects-sec__panel {
    display: flex;
    flex-direction: row;
    column-gap: 32px;
  }

  .projects-sec__controls {
    display: flex;
    flex-direction: row;
    column-gap: 16px;
  }

  .projects-sec__address {
    width: 30%;
    color: $color-white;
  }
}

.info-block {
  &:first-child {
    margin-bottom: 40px;
  }

  h3 {
    font-size: 24px;
    font-weight: 500;
    line-height: 100%;
    color: $color-white;
    margin-bottom: 16px;
  }

  p {
    color: $color-text-2;
  }

  ul {
    color: $color-text-2;
    font-size: 20px;
    font-weight: 400;
    line-height: 145%;
    letter-spacing: -0.04em;
    padding-left: 24px;
  }
}

@media (max-width: 1440px) {
  .projects-sec {

    .projects-sec__wrapper {
      padding: 64px 72px;
    }

    .projects-sec__info {
      align-items: flex-start;
    }

    .projects-sec__about {
      width: 50%;
    }

    .projects-sec__image {

      aspect-ratio: 4/3;

      span {
        font-size: 20px;
      }
    }
  }
}

@media (max-width: 1200px) {
  .projects-sec {
    .projects-sec__heading {
      flex-direction: column;
    }

    .projects-sec__title {
      width: 100%;
    }

    .projects-sec__description {
      width: 100%;
    }
  }
}

@media (max-width: 1024px) {
  .projects-sec {
    .projects-sec__wrapper {
      padding: 64px 56px;
    }

    .projects-sec__info {
      flex-direction: row;
      justify-content: flex-start;
      flex-wrap: wrap;
      row-gap: 40px;
    }

    .projects-sec__about {
      width: 100%;
      order: 3;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
      margin-top: 56px;
    }

    .projects-sec__image {
      aspect-ratio: 16/9;
      width: 65%;
      order: 1;
    }

    .projects-sec__controls {
      order: 2;
      width: 35%;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
    }

    .projects-sec__address {
      order: 2;
      width: 35%;
    }

    .projects-sec__button {
      order: 4;
      align-self: flex-end;
    }
  }

  .info-block {
    width: 46%;

    &:first-child {
      order: 1;
    }

    &:nth-child(2) {
      order: 3;
    }
  }
}

@media (max-width: 768px) {
  .projects-sec {
    border-radius: 0;

    .projects-sec__wrapper {
      width: 100%;
      padding: 72px 16px;
      z-index: 2;
    }

    .projects-sec__image {
      aspect-ratio: 16/9;
      width: 100%;
      order: 1;
    }

    .projects-sec__bottom {
      flex-direction: column-reverse;
      margin-top: 32px;
      row-gap: 56px;
    }

    .projects-sec__address {
      width: 100%;
    }

    .projects-sec__panel {
      width: 100%;
      justify-content: space-between;
    }

    .projects-sec__controls {
      width: auto;
    }

  }

  .info-block {
    width: 100%;

    &:first-child {
      order: 1;
    }

    &:nth-child(2) {
      order: 2;
    }
  }
}

@media (max-width: 500px) {
  .projects-sec {

    .projects-sec__wrapper {
      padding: 40px 16px;
    }

    .projects-sec__description {
      padding-top: 16px;
    }

    .projects-sec__content {
      margin-top: 80px;
    }

    .projects-sec__image {
      aspect-ratio: 0;
      height: auto;
      padding-bottom: 0;

      img {
        aspect-ratio: 16/9;
      }

      span {
        font-size: 16px;
        padding: 16px 8px;
      }
    }

    .projects-sec__about {
      margin-top: 0;
    }

  }

  .info-block {
    h3 {
      font-size: 20px;
    }

    ul {
      font-size: 16px;
    }
  }
}
</style>