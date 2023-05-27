import { defineStore } from "pinia";
export const usePersonStore = defineStore({
  id: "person",
  state: () => {
    return {
      person: {},
    };
  },
});

// 组件间的通信
export const openApiParams = defineStore({
  id: "openApiParams",
  state: () => {
    return {
      openApiParams: {
      },
    };
  },
});
