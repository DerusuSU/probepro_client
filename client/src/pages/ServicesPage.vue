<script setup>
import { watch } from 'vue';
import {useRoute} from "vue-router";
import Header from "@/components/sections/Header.vue";
import ServiceAboutSection from "@/components/sections/ServiceAboutSection.vue";
import ServicesBig from "@/components/sections/ServicesBig.vue";
import ContactsSection from "@/components/sections/ContactsSection.vue";
const route = useRoute();
watch(
    () => route.name,
    () => {
      document.title = route.meta.title || 'Мой сайт';
    },
    { immediate: true }
);

const servicesRaw = route.meta.servicesData || {};
</script>

<template>
<ServicesBig :services="servicesRaw"></ServicesBig>
  <ContactsSection></ContactsSection>
</template>

<style scoped>

</style>