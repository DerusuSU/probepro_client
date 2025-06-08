<script setup>
import ArrowButton from "@/components/elements/ArrowButton.vue";
import {computed} from "vue";

const props = defineProps({
  projects: {
    type: Array,
    required: true,
  }
});

const processedProjects = computed(() => {
  return props.projects.map(project => ({
    ...project,
    image: project.image
        ? `${import.meta.env.VITE_API_BASE_URL}/storage/${project.image}`
        : null,
  }));
});


</script>

<template>
<section class="projects">
  <div class="projects__heading">
    <span>Главная / Проекты</span>
    <h1>Проекты</h1>
  </div>
  <ul class="projects__list">
    <li v-for="project in processedProjects" :key="project.id" class="card">
      <router-link :to="`/projects/${project.slug}`" class="card__link">
        <ArrowButton class="card__button"></ArrowButton>
        <span>{{ project.title }}</span>
        <img
            v-if="project.image"
            :src="project.image"
            :alt="project.title"
            class="card__image"
        />
        <img
            v-else
            src="@/assets/images/project_placeholder.png"
            :alt="project.title"
            class="card__image"
        />
      </router-link>
    </li>
  </ul>
</section>
</template>

<style scoped lang="scss">
.projects {
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

  &__list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 80px;
    gap: 24px;
    text-decoration: none;
  }
}

.card {
  position: relative;
  overflow: hidden;
  height: 400px;
  border-radius: $radius;
  padding: 16px;
  cursor: pointer;

  a {
    text-decoration: none;
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: space-between;
  }

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
  }

  span {
    color: $color-white;
    font-size: 24px;
    font-weight: 500;
    letter-spacing: -0.04em;
    line-height: 120%;
  }

  &__button {
    align-self: flex-end;
  }

  &:nth-child(3n + 1) {
    width: calc(50% - 16px);
  }

  &:nth-child(3n + 2),
  &:nth-child(3n + 3) {
    width: calc(25% - 16px);
  }

  /* Порядок в строке 2 (элементы 4–6) */
  &:nth-child(6n + 4) {
    order: 2;
  }
  &:nth-child(6n + 5) {
    order: 1;
  }
  &:nth-child(6n + 6) {
    order: 3;
  }

  /* Порядок в строке 3 (элементы 7–9) */
  &:nth-child(6n + 7) {
    order: 1;
  }
  &:nth-child(6n + 8) {
    order: 2;
  }
  &:nth-child(6n + 9) {
    order: 3;
  }
}

@media (max-width: 1440px) {
  .card {
    &:nth-child(3n + 1) {
      width: calc(50% - 12px);
    }

    &:nth-child(3n + 2),
    &:nth-child(3n + 3) {
      width: calc(50% - 12px);
    }

    /* Порядок в строке 2 (элементы 4–6) */
    &:nth-child(6n + 4) {
      order: 1;
    }
    &:nth-child(6n + 5) {
      order: 2;
    }
    &:nth-child(6n + 6) {
      order: 3;
    }

    /* Порядок в строке 3 (элементы 7–9) */
    &:nth-child(6n + 7) {
      order: 1;
    }
    &:nth-child(6n + 8) {
      order: 2;
    }
    &:nth-child(6n + 9) {
      order: 3;
    }
  }
}
@media (max-width: 1200px) {
  .projects {
    margin-top: 160px;
  }
}

@media (max-width: 768px) {
  .projects {
    margin-top: 120px;
  }

  .card {
    &:nth-child(3n + 1) {
      width: calc(100%);
    }

    &:nth-child(3n + 2),
    &:nth-child(3n + 3) {
      width: calc(100%);
    }
  }
}

@media (max-width: 500px) {
  .projects {
    &__heading {
      h1 {
        font-size: 56px;
        margin-top: 16px;
      }
    }
  }
  .card {
    height: 320px;
  }
}
</style>