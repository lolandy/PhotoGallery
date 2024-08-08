<script setup lang="ts">
import { useImageStore } from "~/stores/imageStore";
import { Categories } from "~/types/types";

const imageStore = useImageStore();

const { activeCategory, toggleSideNav } = storeToRefs(imageStore);
const isXlScreen = ref();

const showSideNav = computed(() => {
  if (isXlScreen.value) {
    return true;
  } else {
    return toggleSideNav.value;
  }
});

const handleResize = () => {
  isXlScreen.value = window.innerWidth >= 1280;
};

onMounted(() => {
  isXlScreen.value = window.innerWidth >= 1280;
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});

watch(isXlScreen, (newVal) => {
  if (newVal) {
    toggleSideNav.value = false;
  }
});
</script>

<template>
  <div
    class="fixed bg-white w-60 pt-24 z-20 h-full px-4"
    :class="{ hidden: !showSideNav }"
  >
    <ul>
      <li>
        <button
          class="hover:bg-gray-200 rounded-md w-full text-left pl-1"
          :class="{ 'bg-gray-200': activeCategory === '' }"
          @click="imageStore.changeCategory('')"
        >
          <h1 class="font-semibold text-lg">GREECE - SUMMER 23</h1>
        </button>
      </li>

      <li v-for="category in Categories">
        <button
          class="hover:bg-gray-200 rounded-md w-full text-left pl-1"
          :class="{ 'bg-gray-200': activeCategory === category }"
          @click="imageStore.changeCategory(category)"
        >
          {{ category }}
        </button>
      </li>
    </ul>
  </div>
</template>
