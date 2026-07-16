import { createRouter, createWebHistory } from "vue-router";
import ManageListPage from "../pages/ManageListPage.vue";
import SignUpPage from "../pages/SignUpPage.vue";

const routes = [
  {
    path: "/",
    name: "manage-list",
    component: ManageListPage,
  },
  {
    path: "/signup",
    name: "sign-up",
    component: SignUpPage,
  },
];

// Browser history keeps both pages linkable and lets normal back and forward controls work.
export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
});
