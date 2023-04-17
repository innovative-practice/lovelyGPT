import { createRouter, createMemoryHistory } from "vue-router"

const Chat = () => import("@/views/Chat.vue")
const Setting = () => import("@/views/Setting.vue")
const Voice = () => import("@/views/Voice.vue")

const routes = [
  {
    path: "/",
    name: "Chat",
    component: Chat,
  },
  {
    path: "/setting",
    name: "Setting",
    component: Setting,
  },
  {
    path: "/voice",
    name: "Voice",
    component: Voice,
  },
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
})