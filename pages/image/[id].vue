<script setup lang="ts">
const route = useRoute();
const router = useRouter();
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

const handleClose = () => {
  router.go(-1);
};
</script>

<template>
  <div
    class="flex overflow-hidden justify-center items-center w-full h-screen backdrop-blur-lg"
  >
    <NuxtImg
      :src="images[parseInt($route.params.id as string)]"
      class="object-contain h-full absolute"
      @dragstart.prevent
    />

    <div class="w-full -z-50">
      <NuxtImg
        :src="images[parseInt($route.params.id as string)]"
        class="w-full"
      />
      <div
        class="absolute backdrop-blur-xl w-full h-full inset-0 bg-black bg-opacity-75"
      ></div>
    </div>

    <button
      class="flex absolute left-5 top-5 bg-gray-600 bg-opacity-70 rounded-full hover:bg-gray-800 hover:opacity-70"
      @click="handleClose"
    >
      <Icon name="carbon:close" size="40" mode="svg" class="text-white" />
    </button>
    <button
      class="flex absolute right-5 top-5 bg-gray-600 bg-opacity-70 rounded-full hover:bg-gray-800 hover:opacity-70"
    >
      <Icon
        name="material-symbols-light:info-i"
        size="40"
        mode="svg"
        class="text-white"
      />
    </button>
    <button
      class="flex absolute left-5 bg-gray-600 bg-opacity-70 rounded-full top-[calc(50%-2rem)] hover:bg-gray-800 hover:opacity-70"
    >
      <Icon
        name="carbon:chevron-left"
        size="40"
        mode="svg"
        class="text-white"
      />
    </button>
    <button
      class="flex absolute right-5 rounded-full top-[calc(50%-2rem)] bg-gray-600 bg-opacity-70 hover:bg-gray-800 hover:opacity-70"
    >
      <Icon
        name="carbon:chevron-right"
        size="40"
        mode="svg"
        class="text-white"
      />
    </button>
  </div>
</template>
