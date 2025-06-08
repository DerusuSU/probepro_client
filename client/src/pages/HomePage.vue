<script setup>

import {onMounted, ref, watch} from 'vue';
import {useRoute} from 'vue-router';
import ProjectsSection from "@/components/sections/ProjectsSection.vue";
import GuaranteesSection from "@/components/sections/GuaranteesSection.vue";
import AboutSection from "@/components/sections/AboutSection.vue";
import ServicesSection from "@/components/sections/ServicesSection.vue";
import {fetchHomePage} from "@/api/pages/home.js";
import HeroSection from "@/components/sections/HeroSection.vue";
import Hero2Section from "@/components/sections/Hero2Section.vue";
import ContactsSection from "@/components/sections/ContactsSection.vue";
import StepsSection from "@/components/sections/StepsSection.vue";

const route = useRoute();
watch(
    () => route.name,
    () => {
      document.title = route.meta.title || 'Главная страница';
    },
    {immediate: true}
);

const homeRaw = route.meta.homeData || {};

</script>

<template>
  <HeroSection></HeroSection>
  <AboutSection :about-info="homeRaw.about" />
  <ServicesSection :services-info="homeRaw.services"></ServicesSection>
  <StepsSection :steps-info="homeRaw.steps"></StepsSection>
  <GuaranteesSection :guarantees-info="homeRaw.guarantees"></GuaranteesSection>
  <ProjectsSection :projects-info="homeRaw.projects"></ProjectsSection>
  <ContactsSection></ContactsSection>
</template>

<style scoped>

</style>