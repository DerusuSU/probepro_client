<template>
  <ProjectAboutSection :project="project"></ProjectAboutSection>
  <ContactsSection></ContactsSection>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();

import {computed, watch} from 'vue';
import ProjectAboutSection from "@/components/sections/ProjectAboutSection.vue";
import ContactsSection from "@/components/sections/ContactsSection.vue";
watch(
    () => route.name,
    () => {
      document.title = route.meta.title || 'Мой сайт';
    },
    { immediate: true }
);

const projectRaw = route.meta.projectData || {};
const project = computed(() => ({
  title: projectRaw.title,
  object_description: projectRaw.object_description,
  address: projectRaw.address,
  additional_info: projectRaw.additional_info,
  image: projectRaw.image
      ? `${import.meta.env.VITE_API_BASE_URL}/storage/${projectRaw.image}`
      : null,
  services: projectRaw.services,
}));
</script>

<style scoped>

</style>