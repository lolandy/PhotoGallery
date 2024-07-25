<script setup lang="ts">
import { useImageStore } from "~/stores/imageStore";
const imageStore = useImageStore();
</script>

<template>
  <div
    class="mx-auto grid 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-2.5 xl:px-60 px-2 pt-24 pb-2 h-full"
  >
    <div
      class="aspect-[3/4] overflow-hidden rounded-md"
      v-for="image in imageStore.images"
      :key="image.id"
    >
      <NuxtLink :to="{ name: 'image-id', params: { id: image.id } }">
        <img
          class="object-cover max-w-none h-full hover:scale-110 transition-transform duration-300"
          :src="image.url"
        />
      </NuxtLink>
    </div>
  </div>
</template>
