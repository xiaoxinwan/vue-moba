import Vue from "vue";
import Router from "vue-router";
import Main from "./views/Main.vue";
import CategoryCreate from "./views/CategoryEdit.vue";
import CategoryList from "./views/CategoryList.vue";
import ItemEdit from "./views/ItemEdit.vue";
import ItemList from "./views/ItemList.vue";
import HeroEdit from './views/HeroEdit.vue'
import HeroList from './views/HeroList.vue'


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
        },

        {
          path: "/items/create",
          name: "item-create",
          component: ItemEdit
        },
        {
          path: "/items/edit/:id",
          name: "item-edit",
          component: ItemEdit,
          props: true
        },
        {
          path: "/items/list",
          name: "item-list",
          component: ItemList
        },

        {
          path: "/heroes/create",
          name: "hero-create",
          component: HeroEdit
        },
        {
          path: "/heroes/edit/:id",
          name: "hero-edit",
          component: HeroEdit,
          props: true
        },
        {
          path: "/heroes/list",
          name: "hero-list",
          component: HeroList
        }
      ]
    }
  ]
});
