interface ImageData {
    id: number
    date: string
    location: string
    name: string
    firebasePath: string
    sourceURL?: string
    isLoaded: boolean
  }

  export enum Categories{
    Athens = "Athens",
    MountOlympus = "Mount Olympus",
    Thessaloniki = "Thessaloniki",
    Meteora = "Meteora"
  }

  export type {ImageData}