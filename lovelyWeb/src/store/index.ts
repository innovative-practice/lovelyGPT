import { defineStore } from 'pinia'
export const usePersonStore = defineStore({
  id: 'person',
  state: () => {
    return {
      person: {
        
      }
    }
  }
})

export const openApiParams = defineStore({
  id: 'openApiParams',
  state: () => {
    return {
      openApiParams: {
        
      }
    }
  }
})