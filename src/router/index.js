import { createRouter, createWebHistory } from "vue-router";
import RSA from "../components/RSA.vue";
import AES from "../components/AES.vue";

const routes = [
  {
    path: "/",
    name: "aes",
    component: AES,
  },
  {
    path: "/rsa",
    name: "rsa",
    component: RSA,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
