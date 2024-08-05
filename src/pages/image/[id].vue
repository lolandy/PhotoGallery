<script setup lang="ts">
import { useImageStore } from "~/stores/imageStore";

const route = useRoute();
const router = useRouter();
const imageStore = useImageStore();

const imageId = ref(parseInt(route.params.id as string));

const imageIndex = computed(() =>
  imageStore.images.findIndex((image) => image.id === imageId.value),
);

const image = computed(() =>
  imageIndex.value > -1 ? imageStore.images[imageIndex.value] : null,
);

const showPrevButton = computed(() => imageIndex.value > 0);
const showNextButton = computed(
  () => imageIndex.value < imageStore.images.length - 1,
);

const handleClose = () => {
  router.push({ name: "index" });
};

const nextImage = () => {
  router.push(`${imageStore.images[imageIndex.value + 1].id}`);
};

const prevImage = () => {
  router.push(`${imageStore.images[imageIndex.value - 1].id}`);
};

const handleKeydown = (event: KeyboardEvent) => {
  switch (event.key) {
    case "ArrowLeft":
      if (showPrevButton.value) {
        prevImage();
      }
      break;
    case "ArrowRight":
      if (showNextButton.value) {
        nextImage();
      }
      break;
    case "Escape":
      handleClose();
      break;
    case "i":
      imageStore.showInfo = !imageStore.showInfo;
      break;
  }
};

onMounted(async () => {
  window.addEventListener("keydown", handleKeydown);

  if (
    imageIndex.value === imageStore.images.length - 2 &&
    !imageStore.noMoreImages
  ) {
    await imageStore.getImageData();
  }

  // preload
  const img = new Image();
  img.src = imageStore.images[imageIndex.value + 1]?.sourceURL || "";
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleKeydown);
});
</script>

<template>
  <div class="w-full h-screen bg-black fixed inset-0" v-if="image">
    <div
      class="w-full h-full flex justify-center overflow-hidden"
      v-show="image.isLoaded"
    >
      <img
        class="z-40 pointer-events-none select-none object-contain h-full fixed"
        :src="image.sourceURL"
        @load="image.isLoaded = true"
      />

      <div class="w-full select-none">
        <img class="w-full pointer-events-none" :src="image.sourceURL" />
        <div
          class="absolute backdrop-blur-xl w-full h-full inset-0 bg-black bg-opacity-75"
        ></div>
      </div>
    </div>

    <button
      class="z-50 flex justify-end absolute left-5 top-5 bg-gray-600 bg-opacity-70 rounded-full hover:bg-gray-800 hover:opacity-70"
      @click="handleClose"
    >
      <Icon class="text-white" name="carbon:close" size="40" mode="svg" />
    </button>

    <div
      class="z-50 absolute right-5 top-5 text-white"
      @click="imageStore.showInfo = !imageStore.showInfo"
    >
      <button
        class="flex bg-gray-600 bg-opacity-70 rounded-full hover:bg-gray-800 hover:opacity-70"
      >
        <Icon
          class="z-10"
          v-show="!imageStore.showInfo"
          name="material-symbols-light:info-i"
          size="40"
          mode="svg"
        />
      </button>

      <transition>
        <div
          class="cursor-pointer text-center whitespace-nowrap w-52 max-w-52 bg-opacity-60 bg-gray-600 absolute top-0 right-0 py-6 px-4 rounded-[20px]"
          v-show="imageStore.showInfo"
        >
          <h1 class="text-xl">{{ image.name }}</h1>
          <hr class="my-2" />
          <p>{{ image.date }}</p>
          <p>{{ image.location }}</p>
        </div>
      </transition>
    </div>

    <button
      class="z-50 flex absolute left-5 bg-gray-600 bg-opacity-70 rounded-full top-[calc(50%-2rem)] hover:bg-gray-800 hover:opacity-70"
      v-if="showPrevButton"
      @click="prevImage"
    >
      <Icon
        class="text-white"
        name="carbon:chevron-left"
        size="40"
        mode="svg"
      />
    </button>

    <button
      class="z-50 flex absolute right-5 bg-gray-600 bg-opacity-70 rounded-full top-[calc(50%-2rem)] hover:bg-gray-800 hover:opacity-70"
      v-if="showNextButton"
      @click="nextImage"
    >
      <Icon
        class="text-white"
        size="40"
        name="carbon:chevron-right"
        mode="svg"
      />
    </button>
  </div>

  <div
    class="flex justify-center bg-black bg-opacity-75 w-full h-screen"
    v-else
  >
    <button
      class="flex justify-end absolute left-5 top-5 bg-gray-600 bg-opacity-70 rounded-full hover:bg-gray-800 hover:opacity-70"
      @click="handleClose"
    >
      <Icon class="text-white" name="carbon:close" size="40" mode="svg" />
    </button>

    <div
      class="flex flex-col justify-center items-center bg-gray-400 w-[40%] h-full"
    >
      <Icon name="carbon:no-image" size="100" mode="svg" />
      <p class="text-2xl mt-4">Image currently unavailiable</p>
    </div>
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
