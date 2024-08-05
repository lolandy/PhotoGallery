<script setup>
import { useImageStore } from "~/stores/imageStore";

const imageStore = useImageStore();
const { noMoreImages } = storeToRefs(imageStore);

const observer = ref();
const rootElement = ref();

const loadImages = (entries) => {
  entries.forEach(async (entry) => {
    if (entry.isIntersecting) {
      await imageStore.getImageData();
    }
  });
};

onMounted(() => {
  if (!noMoreImages.value) {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    observer.value = new IntersectionObserver(loadImages, options);
    observer.value.observe(rootElement.value);
  }
});

onBeforeUnmount(() => {
  if (!noMoreImages) {
    observer.value.unobserve(rootElement.value);
  }
});

watch(noMoreImages, () => {
  if (noMoreImages) {
    observer.value.unobserve(rootElement.value);
  }
});
</script>

<template>
  <div
    class="absolute -z-10 pointer-events-none h-[200px] w-full bottom-0"
    ref="rootElement"
  ></div>
</template>
