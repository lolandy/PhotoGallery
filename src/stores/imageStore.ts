import { defineStore } from "pinia"
import { collection, getDocs, orderBy, query, limit, startAfter } from "firebase/firestore";
import { getStorage, ref as storageRef, getDownloadURL } from "firebase/storage";

interface ImageData {
  id: number
  date: string
  location: string
  name: string
  firebasePath: string
  sourceURL?: string
  isLoaded: boolean
}

export const useImageStore = defineStore("imageStore", {
  state: () => ({
    images: [] as ImageData[],
    showInfo: false,
    noMoreImages: false,
    scrollPos: 0
  }),

  getters: {},

  actions: {
    async getImageData (){
      try {
        const startId = this.images[this.images.length - 1]?.id || 0
        const lim = 24
        const db = useFirestore()
        const q = query(collection(db, "images"), orderBy("id"), limit(lim), startAfter(startId))
        const snapshot = await getDocs(q)

        if (snapshot.docs.length < lim){
          this.noMoreImages = true
        }
        
        if (!snapshot.empty){
          this.processImageData(snapshot.docs.map(doc => ({...doc.data(), "isLoaded": false})) as ImageData[])
        }
      } catch (error){
        console.log("Error fetching image data", error)
      }
    },

    processImageData(data : ImageData[]){
      this.images.push(...data)

      const storage = getStorage()
    
      for (let i = this.images.length - data.length; i < this.images.length; i++){
        getDownloadURL(storageRef(storage, this.images[i].firebasePath))
          .then((url) => 
            this.images[i].sourceURL = url
          )
          .catch((error) => {
            console.log("Error fetching image URL for ID:", this.images[i].id, error)
          })
      }
    }
  }
})