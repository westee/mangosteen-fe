import { createApp } from "vue";
import App from "./App";
import { createRouter, createWebHashHistory } from "vue-router";
import { routes } from "./config/routes";
import "@svgstore";
import { history } from "./shared/history";
import { useMeStore } from "./stores/useMeStore";
import { createPinia } from "pinia";

const router = createRouter({
  history,
  routes,
});


const whiteList: Record<string, 'exact' | 'startsWith'> = {
  '/': 'exact',
  '/start': 'exact',
  '/welcome': 'startsWith',
  '/sign_in': 'startsWith',
}

router.beforeEach(async (to, from) => {
  for (const key in whiteList) {
    const value = whiteList[key];
    if  ((value === "exact" && to.path === key) ||
    (value === "startsWith" && to.path.startsWith(key))){
      return true
    }
  }
  const mm = meStore.mePromise!.then(
    () => true,
    () => "/sign_in?return_to=" + to.path
  )
  
  return mm;
});

const pinia = createPinia();
const app = createApp(App);
app.use(pinia);
app.use(router);
app.mount("#app");

const meStore = useMeStore()
meStore.fetchMe();
