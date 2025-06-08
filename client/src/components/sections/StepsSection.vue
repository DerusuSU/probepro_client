<script setup>
import {ref, computed, onMounted, nextTick, onBeforeUnmount} from 'vue';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import SectionLabel from '@/components/elements/SectionLabel.vue';
import ArrowButton from '@/components/elements/ArrowButton.vue';

gsap.registerPlugin(SplitText);

const screenWidth = ref(window.innerWidth);
const onResize = () => {
  screenWidth.value = window.innerWidth;
};
const props = defineProps({
  stepsInfo: {
    type: Object,
    required: true,
    default: () => ({
      title: '',
      description: null,
      cards: []
    })
  }
});

const adjustSliderHeight = () => {
  // Если мобильный режим (<768px), то «подстраиваем» height под первую карточку (они у вас все одного размера)
  if (screenWidth.value <= 768 && sliderWrapper.value) {
    nextTick(() => {
      // Ищем любой .card внутри слайдера (у всех одинаковая высота)
      const anyCard = sliderWrapper.value.querySelector('.card');
      if (anyCard) {
        // offsetHeight даст реальную высоту с учётом контента и aspect-ratio
        const h = anyCard.offsetHeight;
        sliderWrapper.value.style.height = `${h}px`;
      }
    });
  } else if (sliderWrapper.value) {
    // Если экран шире 768 — сбрасываем инлайновую высоту, и CSS опять будет работать «как прежде»
    sliderWrapper.value.style.height = '';
  }
};

const smallWidth = computed(() => {
  if (screenWidth.value <= 768) {
    // мобильный: пусть маленькие карточки будут, скажем, 70% от ширины экрана
    return Math.round(screenWidth.value);
  }
  if (screenWidth.value <= 1700) {
    // планшеты: фиксированная ширина 360px
    return 360;
  }
  // десктоп (более 1024px): дефолт 420px
  return 420;
});

const scale = computed(() => {
  if (screenWidth.value <= 768) {
    return 1;
  }
  return 1.5;
});

const left_margin = computed(() => {
  if (screenWidth.value <= 768) {
    return 0;
  }
  if (screenWidth.value <= 1440) {
    return 88;
  }
  return 104;
});


const activeIndex = ref(0);
const sliderWrapper = ref(null);
const cards = ref([]);
const stepInfoRef = ref(null);
let splitText = null;

const currentDescription = computed(() => {
  return props.stepsInfo.cards[ activeIndex.value ]?.description || '';
});

const updateSlider = (animate = false) => {
  // вместо const smallWidth = 420; const gap = 32;
  // используем вычисляемые значения:
  const w = smallWidth.value;
  const g = 32;
  const l = left_margin.value;
  const scaleFactor = scale.value;

  cards.value.forEach((card, index) => {
    const isActive = index === activeIndex.value;
    const scale = isActive ? scaleFactor : 1;

    let left;
    if (index < activeIndex.value) {
      left = - (w + g) * (activeIndex.value - index);
    } else if (index === activeIndex.value) {
      left = l;
    } else {
      left = w * scaleFactor + g + (w + g) * (index - activeIndex.value - 1);
    }

    if (animate) {
      gsap.to(card, {
        left,
        scale,
        duration: 0.5,
        ease: 'power2.inOut',
      });
    } else {
      gsap.set(card, { left, scale });
    }
  });
  adjustSliderHeight();
};


const animateTextIn = () => {
  // Если ещё есть старый splitText – проходим revert(), чтобы не осталось «призраков»
  if (splitText) {
    splitText.revert();
    splitText = null;
  }
  // Создаём новый SplitText уже для актуального <p ref="stepInfoRef">
  splitText = new SplitText(stepInfoRef.value, { type: 'lines' });
  gsap.set(splitText.lines, { opacity: 0, y: 20 });
  gsap.to(splitText.lines, {
    opacity: 1,
    y: 0,
    duration: 0.5,
    stagger: 0.1,
    ease: 'power2.out',
  });
};

const animateTextOut = (onComplete) => {
  if (splitText && splitText.lines.length) {
    gsap.to(splitText.lines, {
      opacity: 0,
      y: -20,
      duration: 0.3,
      stagger: 0.05,
      ease: 'power2.in',
      onComplete: () => {
        splitText.revert();
        splitText = null;
        if (onComplete) onComplete();
      }
    });
  } else {
    // Если splitText ещё не создан – сразу вызываем onComplete
    if (onComplete) onComplete();
  }
};

const goToSlide = (newIndex) => {
  // Сначала анимируем «уход» текущего текста
  animateTextOut(async () => {
    // После того как текст ушёл, меняем индекс
    activeIndex.value = newIndex;
    // Прокручиваем слайды (анимация карточек)
    updateSlider(true);
    // Ждём, пока Vue вставит новый текст в DOM
    await nextTick();
    // Теперь анимируем «появление» нового текста
    animateTextIn();
  });
};

const nextSlide = () => {
  const max = props.stepsInfo.cards.length - 1;
  const target = activeIndex.value < max ? activeIndex.value + 1 : 0;
  goToSlide(target);
};

const prevSlide = () => {
  const max = props.stepsInfo.cards.length - 1;
  const target = activeIndex.value > 0 ? activeIndex.value - 1 : max;
  goToSlide(target);
};

// При монтировании собираем список карточек и сразу выставляем их позицию без анимации
onMounted(() => {
  window.addEventListener('resize', onResize);
  cards.value = Array.from(sliderWrapper.value.querySelectorAll('.card'));
  updateSlider(false);
  // «Входная» анимация текста для первого слайда
  if (stepInfoRef.value) {
    animateTextIn();
  }
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize);
});

// Swipe-функционал оставляем без изменений
let isDragging = false;
let startX = 0;
const threshold = 50;

const onStart = (e) => {
  isDragging = true;
  startX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
};

const onMove = (e) => {
  if (!isDragging) return;
  const currentX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
  const diff = startX - currentX;
  if (Math.abs(diff) > threshold) {
    if (diff > 0) nextSlide();
    else prevSlide();
    isDragging = false;
  }
};

const onEnd = () => {
  isDragging = false;
};

onMounted(() => {
  const slider = sliderWrapper.value;
  slider.addEventListener('mousedown', onStart);
  slider.addEventListener('mousemove', onMove);
  slider.addEventListener('mouseup', onEnd);
  slider.addEventListener('touchstart', onStart);
  slider.addEventListener('touchmove', onMove);
  slider.addEventListener('touchend', onEnd);
});
</script>

<template>
  <section class="steps-sec" ref="container">
    <div class="steps-sec__wrapper">
      <SectionLabel variant="alt">Этапы работы</SectionLabel>
      <div class="steps-sec__heading">
        <h2 class="steps-sec__title">{{ props.stepsInfo.title }}</h2>
        <div class="alt steps-sec__controls">
          <ArrowButton direction="left" @click="prevSlide" />
          <ArrowButton @click="nextSlide" />
        </div>
      </div>
      <div class="steps-sec__content">
        <div class="steps-sec__slider" ref="sliderWrapper">
          <div
              v-for="(card, idx) in props.stepsInfo.cards"
              :key="`${card.index}-${idx}`"
              class="card"
          >
            <img :src="card.image" :alt="card.title" />
            <div class="card__header">
              <span class="card__title">{{ card.title }}</span>
            </div>
          </div>
          <div v-if="!props.stepsInfo.cards.length" class="card">
            <div class="card__header">
              <span class="card__title">Нет данных</span>
              <span class="card__index">00</span>
            </div>
          </div>
        </div>
        <p
            v-if="props.stepsInfo.cards.length"
            class="steps-sec__step-info"
            ref="stepInfoRef"
            :key="activeIndex"
        >
          {{ currentDescription }}
        </p>
        <p class="steps-sec__step-info" v-else-if="props.stepsInfo.description">
          {{ props.stepsInfo.description }}
        </p>
      </div>
    </div>
    <div class="steps-sec__background">
      <img src="@/assets/background/bg-el_1.svg" alt="" />
      <img src="@/assets/background/bg-el_2.svg" alt="" />
    </div>
  </section>
</template>

<style scoped lang="scss">
.steps-sec {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: $color-primary;
  border-radius: $radius;
  position: relative;
  overflow: hidden;
  margin-top: 160px;

  &__background {
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

  &__wrapper {
    width: 100%;
    z-index: 2;
    padding: 72px 88px 120px;
  }

  &__heading {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  &__title {
    width: 60%;
    color: $color-white;
  }

  &__controls {
    width: 35%;
    display: flex;
    flex-direction: row;
    height: auto;
    align-items: flex-end;
    justify-content: flex-end;
    gap: 16px;
  }

  &__content {
    margin-top: 104px;
    position: relative;
  }

  &__slider {
    position: relative;
    height: 500px;
  }

  &__step-info {
    color: $color-text-2;
    width: 30%;
    position: absolute;
    top: 380px;
    left: 680px;
    font-size: 18px;
    line-height: 1.5;
  }
}

.card {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  width: 420px;
  height: 320px;
  flex-direction: column;
  padding: 8px;
  background: $color-white;
  border-radius: $radius;
  overflow: hidden;
  transform-origin: top;

  img {
    width: 100%;
    height: 240px;
    object-fit: cover;
    border-radius: $radius-inside;
  }

  &__header {
    width: 100%;
    height: 100%;
    padding: 0 16px;
    margin-top: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__title {
    width: 100%;
    font-size: 24px;
    font-weight: 500;
    color: $color-black;
    line-height: 1;
  }
}

@media (max-width: 1700px) {
  .steps-sec {
    &__step-info {
      width: 45%;
      left: 600px;
    }
  }
  .card {
    width: 360px;
    height: 280px;
  }
}

@media (max-width: 1440px) {
  .steps-sec {
    &__wrapper {
      padding: 64px 72px;
    }
    &__step-info {
      width: 45%;
      top: 320px;
    }
  }
}

@media (max-width: 1200px) {
  .steps-sec {
    &__content {
      margin-top: 56px;
    }
    &__step-info {
      position: static;
      width: 100%;
      height: 80px;
    }
    &__slider {
      height: 460px;
    }
  }
}

@media (max-width: 1024px) {
  .steps-sec {
    &__wrapper {
      padding: 64px 56px;
    }

    &__content {
      margin-top: 80px;
    }
  }
}

@media (max-width: 768px) {
  .steps-sec {
    border-radius: 0;

    &__wrapper {
      padding: 72px 16px;
    }

    &__heading {
      width: 100%;
      flex-direction: column;
    }

    &__title {
      width: 100%;
    }

    &__controls {
      margin-top: 24px;
    }

    &__content {
      margin-top: 40px;
    }

    &__step-info {
      position: static;
      width: 100%;
      margin-top: 24px;
    }

    &__slider {
      align-items: center;
    }

    .card {
      width: 100%;
      height: auto;

      img {
        height: auto;
        aspect-ratio: 16/9;
      }
    }
  }
}

@media (max-width: 500px) {
  .steps-sec {
    &__wrapper {
      padding: 40px 16px;
    }

    &__content {
      margin-top: 32px;
    }

    &__step-info {
      height: 160px;
    }
  }
}
</style>