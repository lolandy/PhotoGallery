<script setup lang="ts">
import { useImageStore } from "~/stores/imageStore";

const imageStore = useImageStore();
const { toggleSideNav } = storeToRefs(imageStore);
</script>

<template>
  <div
    class="flex fixed bg-white z-30 h-16 w-full border-b border-gray-400 justify-between items-center"
  >
    <div class="flex items-center">
      <button
        class="ml-4 xl:hidden rounded-full hover:bg-gray-400"
        @click="toggleSideNav = !toggleSideNav"
      >
        <Icon
          class="m-1"
          name="material-symbols-light:menu"
          size="30"
          mode="svg"
        />
      </button>

      <h1 class="text-4xl font-bold mx-4 whitespace-nowrap select-none">
        ANDY CALLAHAN
      </h1>
    </div>

    <img
      class="rounded-full border border-gray-500 mr-4 w-12 pointer-events-none select-none"
      src="../public/images/head.png"
    />
  </div>
</template>
