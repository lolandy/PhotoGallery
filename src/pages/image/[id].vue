<script setup lang="ts">
import { useImageStore } from "~/stores/imageStore";

const route = useRoute();
const router = useRouter();
const imageStore = useImageStore();

const { images, showInfo, noMoreImages } = storeToRefs(imageStore);
const imageId = ref(parseInt(route.params.id as string));

const imageIndex = computed(() =>
  images.value.findIndex((image) => image.id === imageId.value),
);

const image = computed(() =>
  imageIndex.value > -1 ? images.value[imageIndex.value] : null,
);

const showPrevButton = computed(() => imageIndex.value > 0);
const showNextButton = computed(
  () => imageIndex.value < images.value.length - 1,
);

const handleClose = () => {
  router.push({ name: "index" });
};

const nextImage = () => {
  router.push(`${images.value[imageIndex.value + 1].id}`);
};

const prevImage = () => {
  router.push(`${images.value[imageIndex.value - 1].id}`);
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
      showInfo.value = showInfo.value;
      break;
  }
};

onMounted(async () => {
  window.addEventListener("keydown", handleKeydown);

  if (imageIndex.value === images.value.length - 2 && !noMoreImages.value) {
    const startId =
      imageStore.images[imageStore.images.length - 1]?.id || imageId.value;
    await imageStore.getImageData(startId, 24);
  }

  // preload
  const img = new Image();
  img.src = images.value[imageIndex.value + 1]?.sourceURL || "";
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleKeydown);
});
</script>

<template>
  <div class="w-full h-screen bg-black fixed inset-0" v-if="image">
    <div
      class="w-full h-full flex justify-center overflow-hidden pointer-events-none select-none relative"
      v-show="image.isLoaded"
    >
      <img
        class="z-10 object-contain h-full fixed"
        :src="image.sourceURL"
        @load="image.isLoaded = true"
      />

      <img class="object-cover w-full" :src="image.sourceURL" />
      <div
        class="absolute backdrop-blur-xl w-full h-full inset-0 bg-black bg-opacity-70"
      ></div>
    </div>

    <RoundButton
      class="left-5 top-5 absolute"
      :iconName="'carbon:close'"
      @click="handleClose"
    />

    <div
      class="z-50 absolute right-5 top-5 text-white"
      @click="showInfo = !showInfo"
    >
      <RoundButton
        class="z-10"
        v-show="!showInfo"
        :iconName="'material-symbols-light:info-i'"
      />

      <transition>
        <div
          class="cursor-pointer text-center whitespace-nowrap w-52 max-w-52 bg-opacity-60 bg-gray-600 absolute top-0 right-0 py-6 px-4 rounded-2xl"
          v-show="showInfo"
        >
          <h1 class="text-xl">{{ image.name }}</h1>
          <hr class="my-2" />
          <p>{{ image.date }}</p>
          <p>{{ image.location }}</p>
        </div>
      </transition>
    </div>

    <RoundButton
      class="left-5 top-[calc(50%-2rem)] absolute"
      v-if="showPrevButton"
      @click="prevImage"
      :iconName="'carbon:chevron-left'"
    />

    <RoundButton
      class="right-5 top-[calc(50%-2rem)] absolute"
      v-if="showNextButton"
      @click="nextImage"
      :iconName="'carbon:chevron-right'"
    />
  </div>

  <div
    class="flex justify-center bg-black bg-opacity-70 w-full h-screen"
    v-else
  >
    <RoundButton
      class="left-5 top-5 absolute"
      :iconName="'carbon:close'"
      @click="handleClose"
    />

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
