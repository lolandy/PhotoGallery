<script setup lang="ts">
import { useImageStore } from "~/stores/imageStore";

const imageStore = useImageStore();
const { images, scrollPos } = storeToRefs(imageStore);

onMounted(() => {
  nextTick(() => {
    window.scrollTo(0, scrollPos.value);
  });
});

onBeforeUnmount(() => {
  scrollPos.value = window.scrollY;
});
</script>

<template>
  <div
    class="relative grid 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-2.5 xl:pl-60 px-5 pt-24 pb-2 h-full"
  >
    <div
      class="flex-1 aspect-[3/4] overflow-hidden rounded-md"
      v-for="image in images"
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
        class="animate-shimmer h-full bg-gradient-to-r bg-[length:200%] from-slate-100 from-30% via-gray-200 via-50% to-slate-100 to-70%"
        v-if="!image.isLoaded"
      ></div>
    </div>
    <InfiniteScroll />
  </div>
</template>
