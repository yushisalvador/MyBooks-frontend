import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import store from "./vuex.js";
import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";
import MyBooks from "./views/MyBooks";

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/mybooks",
    component: MyBooks,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: "active",
});

router.beforeEach((to, from, next) => {
  if (to.path === "/mybooks" && !store.getters.user) next({ path: "/login" });
  if (to.path === "/login" && store.getters.user) next({ path: "/" });
  else next();
});

createApp(App).use(router).use(store).mount("#app");
