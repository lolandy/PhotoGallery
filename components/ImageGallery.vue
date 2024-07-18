<script setup lang="ts">
const images = [
  "/images/IMG_0322.JPEG",
  "/images/IMG_0323.JPEG",
  "/images/IMG_0324.JPEG",
  "/images/IMG_0326.JPEG",
  "/images/IMG_0327.JPEG",
  "/images/IMG_0335.JPEG",
  "/images/IMG_0336.JPEG",
  "/images/IMG_0339.JPEG",
  "/images/IMG_0341.JPEG",
  "/images/IMG_0344.JPEG",
  "/images/IMG_0348.JPEG",
  "/images/IMG_0349.JPEG",
  "/images/IMG_0352.JPEG",
  "/images/IMG_0353.JPEG",
];
</script>

<template>
  <div
    class="mx-auto grid 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-2.5 xl:px-60 px-2 pt-28 pb-2 h-full"
  >
    <div
      v-for="(image, index) in images"
      :key="index"
      class="aspect-[3/4] overflow-hidden rounded-md"
    >
      <NuxtLink :to="{ name: 'image-id', params: { id: index } }">
        <NuxtImg
          :src="image"
          class="block object-cover max-w-none h-full scale-100 hover:scale-110 transition-transform duration-300"
        />
      </NuxtLink>
    </div>
  </div>
</template>
