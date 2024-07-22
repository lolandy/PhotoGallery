<script setup lang="ts">
import TopBar from "../components/TopBar.vue";
import SideNav from "../components/SideNav.vue";
import ImageGallery from "../components/ImageGallery.vue";
</script>

<template>
  <TopBar />

  <div class="flex justify-between mx-auto">
    <SideNav />
    <ImageGallery />
  </div>
</template>

<style scoped></style>
