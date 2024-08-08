<script setup lang="ts">
defineProps<{
  iconName: string;
}>();
</script>

<template>
  <button
    class="z-50 bg-gray-600 bg-opacity-70 rounded-full hover:bg-gray-800 hover:opacity-70"
  >
    <Icon class="text-white" size="40" :name="iconName" mode="svg" />
  </button>
</template>
