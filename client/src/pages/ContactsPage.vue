<script setup>
import {onMounted, watch} from 'vue';
import {useRoute} from "vue-router";
import ContactsBig from "@/components/sections/ContactsBig.vue";
import ContactsSection from "@/components/sections/ContactsSection.vue";
const route = useRoute();
watch(
    () => route.name,
    () => {
      document.title = route.meta.title || 'Страница контактов';
    },
    {immediate: true}
);

const contactsRaw = route.meta.contactsData || {};
</script>

<template>
  <ContactsBig :contacts="contactsRaw.contact"></ContactsBig>
  <ContactsSection></ContactsSection>
</template>

<style scoped>

</style>