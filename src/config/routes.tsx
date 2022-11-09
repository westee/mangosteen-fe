import { RouteRecordRaw } from "vue-router";
import { First } from "../components/welcome/First";
import { Third } from "../components/welcome/Third";
import { Second } from "../components/welcome/Second";
import { Forth } from "../components/welcome/Forth";
import { Bar } from "../views/Bar";
import { Foo } from "../views/Foo";
import { Welcome } from "../views/Welcome";

export const routes: RouteRecordRaw[] = [
  { path: "/", component: Foo },
  { path: "/about", component: Bar },
  {
    path: "/Welcome",
    component: Welcome,
    children: [
      { path: "one", component: First },
      { path: "two", component: Second },
      { path: "three", component: Third },
      { path: "four", component: Forth }
    ],
  },
];
