<script setup>
import { useImageStore } from "~/stores/imageStore";

const imageStore = useImageStore();
const { images, noMoreImages } = storeToRefs(imageStore);

const observer = ref();
const rootElement = ref();

const loadImages = (entries) => {
  entries.forEach(async (entry) => {
    if (entry.isIntersecting && !noMoreImages.value) {
      const startId = images.value[images.value.length - 1]?.id || 0;
      await imageStore.getImageData(startId, 24);
    }
  });
};

onMounted(() => {
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  observer.value = new IntersectionObserver(loadImages, options);
  observer.value.observe(rootElement.value);
});

onBeforeUnmount(() => {
  observer.value.unobserve(rootElement.value);
});
</script>

<template>
  <div
    class="absolute -z-10 pointer-events-none w-full bottom-0 h-64"
    ref="rootElement"
  ></div>
</template>
