import { defineStore } from "pinia"
import sourceData from "assets/data/data.json";

export const useImageStore = defineStore("imageStore", {
  state: () => {
    return {
      images: sourceData.images,
      showInfo: false
    }
  },
  getters: {},
  actions: {}
})