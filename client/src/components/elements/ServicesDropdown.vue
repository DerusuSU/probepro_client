<template>
  <div class="dropdown" @mouseleave="onMouseLeaveServices">
    <div
        class="dropdown__section"
        v-for="category in categories"
        :key="category.id"
    >
      <button
          class="dropdown__toggle"
          @click="toggleCategory(category.id)"
      >
        {{ category.name }}
        <!-- SVG-стрелка, которая будет поворачиваться -->
        <svg
            class="dropdown__arrow"
            :class="{ rotated: openCategory === category.id }"
            width="13"
            height="8"
            viewBox="0 0 13 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
          <path
              d="M6.49997 7.41846C6.2849 7.41846 6.06987 7.33635 5.9059 7.17246L0.74617 2.01268C0.417943 1.68445 0.417943 1.15229 0.74617 0.824195C1.07426 0.496102 1.60632 0.496102 1.93457 0.824195L6.49997 5.38986L11.0654 0.824354C11.3936 0.496261 11.9256 0.496261 12.2537 0.824354C12.5821 1.15245 12.5821 1.68461 12.2537 2.01284L7.09404 7.17262C6.92999 7.33653 6.71495 7.41846 6.49997 7.41846Z"
              fill="white"
          />
        </svg>
      </button>

      <!-- Оборачиваем контент в Transition, чтобы анимировать enter/leave -->
      <Transition
          @enter="(el, done) => {
          // перед раскрытием явно обнуляем height
          gsap.set(el, { height: 0 });
          // теперь плавно «разворачиваем» до auto
          gsap.to(el, { height: 'auto', duration: 0.3, ease: 'power2.out', onComplete: done });
        }"
          @leave="(el, done) => {
          gsap.to(el, { height: 0, duration: 0.3, ease: 'power2.in', onComplete: done });
        }"
      >
        <!-- v-if будет определять наличие элемента в DOM, Vue дождётся onComplete -->
        <div
            v-if="openCategory === category.id"
            class="dropdown__content"
            :ref="el => setRef(el, category.id)"
        >
          <ul>
            <li
                v-for="service in category.services"
                :key="service.slug"
            >
              <router-link :to="`/services/${service.slug}`">
                {{ service.title }}
              </router-link>
            </li>
          </ul>
        </div>
      </Transition>
    </div>
    <div class="dropdown__background">
      <img src="@/assets/background/guar-bg-el_3.svg" alt="">
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { gsap } from 'gsap';

const props = defineProps({
  categories: {
    type: Array,
    default: () => []
  }
});

// Нужен emit, чтобы при уходе мыши спрятать весь дропдаун
const emit = defineEmits({
  'hide-services': null
});

const onMouseLeaveServices = () => {
  emit('hide-services');
};

const openCategory = ref(null);
const serviceLists = ref({});

// Эта функция всё ещё может понадобиться, если вы где-то читаете refs,
// но в данном варианте GSAP-анимации мы на неё не полагаемся
const setRef = (el, id) => {
  if (el) {
    serviceLists.value[id] = el;
  }
};

const toggleCategory = (categoryId) => {
  openCategory.value = openCategory.value === categoryId ? null : categoryId;
};
</script>

<style scoped lang="scss">
// Если нужно, скорректируйте переменные $color-… или уберите их
.dropdown {
  position: absolute;
  background: $color-primary;
  padding: 24px 88px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  left: 0;
  width: 100%;
  z-index: -1;
}

.dropdown__background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  img {
    position: absolute;
    top: -20px;
    right: -60px;
    opacity: 20%;
  }
  z-index: 1;
}

.dropdown__section {
  // сам блок категории
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 2;
}

// Стили для кнопки-секции
.dropdown__toggle {
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  gap: 12px;
  color: $color-white;
  font-size: 24px;
  font-weight: 500;
}

// SVG-стрелка, которая будет поворачиваться
.dropdown__arrow {
  transition: transform 0.3s ease-in-out;
  transform: rotate(0deg);
  /* при закрытом состоянии — вниз */
  &.rotated {
    transform: rotate(180deg);
    /* при открытом — вверх */
  }
}

// Контент списка услуг (обёртка <div> вокруг <ul>)
.dropdown__content {
  overflow: hidden;
  // изначально height контролируется через GSAP
  // при v-if элемент не существует, при появлении он сразу получает height:0,
  // а потом мы анимируем до auto
}

.dropdown__content ul {
  list-style: none;
  padding: 0 24px;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;

  li {
    a {
      text-decoration: none;
      font-size: 20px;
      color: $color-white;
      font-weight: 400;
      transition: 0.3s color;
      &:hover {
        color: $color-text-2;
      }
    }
  }
}
</style>
