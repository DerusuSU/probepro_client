<template>
  <ServiceAboutSection :service="service" :tabs="tabs"></ServiceAboutSection>
  <GuaranteesSection :guarantees-info="guaranties[0]"></GuaranteesSection>
  <ProjectsSection :projects-info="projectsRaw.projects" v-if="!isProjectsEmpty"></ProjectsSection>
  <ContactsSection></ContactsSection>
</template>

<script setup>
import {useRoute} from 'vue-router';
import {computed, ref, watch, onMounted} from 'vue';
import ServiceAboutSection from "@/components/sections/ServiceAboutSection.vue";
import GuaranteesSection from "@/components/sections/GuaranteesSection.vue";
import ProjectsSection from "@/components/sections/ProjectsSection.vue";
import {fetchServiceDetailPage} from "@/api/pages/serviceDetail.js";
import ContactsSection from "@/components/sections/ContactsSection.vue";

const route = useRoute();

// Реактивные данные
const serviceRaw = ref({});
const guaranteesRaw = ref([]);
const projectsRaw = ref({});
const loading = ref(true);
const error = ref(null);
const isProjectsEmpty = ref(false);

// Функция обновления данных из мета-информации роута
const updateData = () => {
  loading.value = true;
  error.value = null;

  try {
    serviceRaw.value = route.meta.serviceData || {};
    guaranteesRaw.value = route.meta.guaranteesData || [];
    projectsRaw.value = route.meta.projectsData || {};
    if (projectsRaw.value.projects.cards.length === 0) {
      console.log('edede')
      isProjectsEmpty.value = true
    }

    // Обновляем заголовок страницы
    document.title = serviceRaw.value.title || 'PROBEPRO';

    // Если данные пустые - считаем это ошибкой
    if (!serviceRaw.value.title) {
      throw new Error('Данные услуги не загружены');
    }
  } catch (err) {
    error.value = err.message || 'Ошибка загрузки данных услуги';
    console.error('Ошибка обновления данных:', err);
  } finally {
    loading.value = false;
  }
};


async function updateDataRe(slug) {
  try {
    const response = await fetchServiceDetailPage(slug);
    if (response.status === 'success') {
      // заполняем локальные ref
      const s = response.data.service;
      serviceRaw.value = {
        title: s.title,
        description: s.description,
        image: s.image,
        caption: s.caption,
        tabs: s.tabs || []
      };
      guaranteesRaw.value = response.data.guarantees || [];
      projectsRaw.value = response.data.projects || { projects: [] };
      if (projectsRaw.value.projects.cards.length === 0) {
        console.log('edede')
        isProjectsEmpty.value = true
      }
    } else {
      // Можно кидать ошибку или показывать 404
      console.warn('Не удалось загрузить данные для слуга:', slug);
    }
  } catch (err) {
    console.error('Ошибка при fetchServiceDetailPage:', err);
  }
}


// Инициализация при монтировании
onMounted(updateData);

// Реакция на изменение маршрута
watch(() => route.params.slug,
    (newSlug, oldSlug) => {
      if (newSlug !== oldSlug) {
        updateDataRe(newSlug);
      }
    }
);

// Вычисляемые свойства
const service = computed(() => ({
  title: serviceRaw.value.title,
  description: serviceRaw.value.description,
  image: serviceRaw.value.image
      ? `${import.meta.env.VITE_API_BASE_URL}/storage/${serviceRaw.value.image}`
      : null,
  caption: serviceRaw.value.caption,
}));

const tabs = computed(() => serviceRaw.value.tabs || []);
const guaranties = computed(() => guaranteesRaw.value);
</script>