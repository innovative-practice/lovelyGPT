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
// openai的参数
export const openApiParams = defineStore({
  id: "openApiParams",
  state: () => {
    return {
      openApiParams: {
      },
    };
  },
});

// 文件的列表
export const fileListStore = defineStore({
  id: "fileList",
  state: () => {
    return {
      fileList: [],
      nowFile: {},
    };
  }
})
