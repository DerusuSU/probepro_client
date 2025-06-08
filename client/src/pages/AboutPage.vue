<script setup>
import { watch } from 'vue';
import {useRoute} from "vue-router";
import AboutSection from "@/components/sections/AboutSection.vue";
import AboutusBig from "@/components/sections/AboutusBig.vue";
import ContactsSection from "@/components/sections/ContactsSection.vue";
const route = useRoute();
watch(
    () => route.name,
    () => {
      document.title = route.meta.title || 'О компании';
    },
    { immediate: true }
);

const aboutRaw = route.meta.aboutData || {};
</script>

<template>
  <AboutSection :need-button="false" :about-info="aboutRaw.about"></AboutSection>
<!--  <AboutusBig></AboutusBig>-->
  <ContactsSection></ContactsSection>
</template>

<style scoped>

</style>