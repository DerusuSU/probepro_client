<template>
  <Header
      :categories="common.data.categories"
      :contact-info="common.data.contact"
  />
  <div class="container">
    <RouterView />
    <Footer :contact-info="common.data.contact" />
  </div>
</template>
<script setup>
import Header from '@/components/sections/Header.vue'
import Footer from '@/components/sections/Footer.vue'
import {onMounted, ref} from "vue";
import {fetchCommonData} from "@/api/common.js";
const common = ref({ data: { contact: {}, categories: [] } })
onMounted(async () => {
  const resp = await fetchCommonData()
  common.value.data = resp.data
})
</script>