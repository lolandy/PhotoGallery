import { defineStore } from "pinia"
import { collection, getDocs, orderBy, query, limit, startAfter, where } from "firebase/firestore";
import { getStorage, ref as storageRef, getDownloadURL } from "firebase/storage";

import { type ImageData, Categories } from "~/types/types";

export const useImageStore = defineStore("imageStore", {
  state: () => ({
    images: [] as ImageData[],
    activeCategory: "",
    showInfo: false,
    noMoreImages: false,
    scrollPos: 0,
    toggleSideNav: false
  }),

  getters: {},

  actions: {
    async getImageData (startId: number, count: number){
      try {
        const db = useFirestore()
        const storage = getStorage()

        let q = query(collection(db, "images"), orderBy("id"), limit(count), startAfter(startId))
        if (this.activeCategory !== ""){
          q = query(q, where("location", "==", this.activeCategory))
        }

        const snapshot = await getDocs(q)

        const numNewImages = snapshot.docs.length
        if (numNewImages < count){
          this.noMoreImages = true
        }
        
        if (numNewImages > 0){
          snapshot.forEach((doc) => {
            this.images.push({...doc.data(), "isLoaded": false} as ImageData)
          })
  
          const newImageData = this.images.slice(this.images.length - numNewImages)
  
          for (const newData of newImageData) {
            getDownloadURL(storageRef(storage, newData.firebasePath))
              .then((url) => newData.sourceURL = url) 
          }
        }
      } catch (error){
        console.log("Error fetching image data", error)
      }
    },

    async changeCategory(category: Categories | ""){
      if (this.activeCategory !== category){
        this.activeCategory = category
        this.noMoreImages = false
  
        const oldLen = this.images.length
        await this.getImageData(0, 24)
  
        this.images.splice(0, oldLen)
        window.scrollTo(0, 0);
      }
    }
  }
})