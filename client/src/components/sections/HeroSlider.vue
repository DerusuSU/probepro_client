<script setup>
import '@splidejs/vue-splide/css';
import {ref} from "vue";

const options = {
  type: 'loop',
  perPage: 1,
  rewind: true,
  pagination: true,
  arrows: false,
  height: "100%",
  gap: '24px'
}

const slides = ref([
  {
    title: "Разработка рабочей документации и монтаж автоматической системы пожаротушения (АУПТ)",
    image: "@/assets/images/test_services/1.png",
    link: "#",
  },
  {
    title: "Разработка рабочей документации и монтаж системы видеонаблюдения (СВН)",
    image: "@/assets/images/test_services/2.png",
    link: "#",
  },
])
</script>

<template>
  <div class="hero-slider">
    <Splide ref="hero-slider" :options="options" aria-label="My Favorite Images">
      <SplideSlide v-for="(slide, index) in slides" :key="index">
        <div class="slide">
          <img src="../../assets/images/test_services/1.png" alt="Услуга 1">
          <span>Разработка рабочей документации и монтаж автоматической системы пожаротушения (АУПТ)</span>
        </div>
      </SplideSlide>
    </Splide>
  </div>
</template>

<style scoped lang="scss">
.hero-slider {
  padding: 8px;
  border-radius: $radius-inside;
  border: 1px solid #A7A7A7;
  background-color: rgba(217, 217, 217, 0.2);
  backdrop-filter: blur(5px);
  width: 384px;
  height: auto;
  overflow: hidden;
}

.slide {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;

  img {
    width: 100%;
    border-radius: $radius-inside;
    object-fit: cover;
    opacity: 0.8;
    position: relative;
    z-index: 1;
    flex: 0 0 80%;
  }

  span {
    width: 80%;
    padding-left: 8px;
    line-height: 110%;
    font-size: 20px;
    letter-spacing: -0.03em;
    display: inline-block;
    margin-top: -40px;
    position: relative;
    z-index: 2;
    color: $color-white;
  }
}

.hero-slider :deep(.splide__pagination)  {
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 10;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0;
}
</style>