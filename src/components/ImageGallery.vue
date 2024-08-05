<script setup lang="ts">
import { useImageStore } from "~/stores/imageStore";

const imageStore = useImageStore();

onMounted(() => {
  nextTick(() => {
    window.scrollTo(0, imageStore.scrollPos);
  });
});

onBeforeUnmount(() => {
  imageStore.scrollPos = window.scrollY;
});
</script>

<template>
  <div
    class="relative mx-auto grid 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-[10px] xl:px-60 px-2 pt-24 pb-2 h-full"
  >
    <div
      class="aspect-[3/4] overflow-hidden rounded-md"
      v-for="image in imageStore.images"
      :key="image.id"
    >
      <NuxtLink
        v-show="image.isLoaded"
        :to="{ name: 'image-id', params: { id: image.id } }"
      >
        <img
          class="object-cover max-w-none h-full hover:scale-110 transition-transform duration-300"
          :src="image.sourceURL"
          @load="image.isLoaded = true"
        />
      </NuxtLink>

      <div
        class="animate-shimmer w-[230px] h-full bg-gradient-to-r bg-[length:200%] from-slate-100 from-30% via-gray-200 via-50% to-slate-100 to-70%"
        v-if="!image.isLoaded"
      ></div>
    </div>
    <InfiniteScroll />
  </div>
</template>
