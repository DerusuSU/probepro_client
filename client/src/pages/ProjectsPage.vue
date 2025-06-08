<script setup>
import {computed, watch} from 'vue';
import {useRoute} from "vue-router";
import ProjectsBig from "@/components/sections/ProjectsBig.vue";
import ContactsSection from "@/components/sections/ContactsSection.vue";
const route = useRoute();
watch(
    () => route.name,
    () => {
      document.title = route.meta.title || 'Мой сайт';
    },
    { immediate: true }
);
const projectsRaw = route.meta.projectsData || {};
</script>

<template>
  <ProjectsBig :projects="projectsRaw"></ProjectsBig>
  <ContactsSection></ContactsSection>
</template>

<style scoped>

</style>