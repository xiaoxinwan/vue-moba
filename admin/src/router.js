import Vue from "vue";
import Router from "vue-router";
import Main from "./views/Main.vue";
import CategoryCreate from "./views/CategoryEdit.vue";
import CategoryList from "./views/CategoryList.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "main",
      component: Main,
      children: [
        {
          path: "/categories/create",
          name: "category-create",
          component: CategoryCreate
        },
        {
          path: "/categories/edit/:id",
          name: "category-edit",
          component: CategoryCreate,
          props: true
        },
        {
          path: "/categories/list",
          name: "category-list",
          component: CategoryList
        }
      ]
    }
  ]
});
