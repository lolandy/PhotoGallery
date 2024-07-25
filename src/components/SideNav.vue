<script setup lang="ts">
const categories = ref(["Catergory 1", "Catergory 2", "Catergory 3"]);
</script>

<template>
  <div class="hidden xl:block fixed bg-white w-60 pt-24 z-20 h-full px-5">
    <h1 class="font-semibold text-lg">GREECE - SUMMER 23</h1>
    <ul>
      <li
        class="hover:bg-gray-200 cursor-pointer rounded-md"
        v-for="category in categories"
      >
        {{ category }}
      </li>
    </ul>
  </div>
</template>
