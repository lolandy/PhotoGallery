<script setup lang="ts">
import TopBar from "../components/TopBar.vue";
import SideNav from "../components/SideNav.vue";
import ImageGallery from "../components/ImageGallery.vue";

definePageMeta({
  scrollToTop: false,
});
</script>

<template>
  <TopBar />
  <SideNav />
  <ImageGallery />
</template>
