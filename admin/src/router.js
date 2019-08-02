import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login.vue";
import Main from "./views/Main.vue";
import CategoryCreate from "./views/CategoryEdit.vue";
import CategoryList from "./views/CategoryList.vue";
import ItemEdit from "./views/ItemEdit.vue";
import ItemList from "./views/ItemList.vue";
import HeroEdit from "./views/HeroEdit.vue";
import HeroList from "./views/HeroList.vue";
import ArticleEdit from "./views/ArticleEdit.vue";
import ArticleList from "./views/ArticleList.vue";
import AdEdit from "./views/AdEdit.vue";
import AdList from "./views/AdList.vue";
import AdminUserEdit from "./views/AdminUserEdit.vue";
import AdminUserList from "./views/AdminUserList.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login
    },

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
        },

        {
          path: "/articles/create",
          name: "article-create",
          component: ArticleEdit
        },
        {
          path: "/articles/edit/:id",
          name: "article-edit",
          component: ArticleEdit,
          props: true
        },
        {
          path: "/articles/list",
          name: "article-list",
          component: ArticleList
        },

        {
          path: "/ads/create",
          name: "ad-create",
          component: AdEdit
        },
        {
          path: "/ads/edit/:id",
          name: "ad-edit",
          component: AdEdit,
          props: true
        },
        {
          path: "/ads/list",
          name: "ad-list",
          component: AdList
        },

        {
          path: "/admin_users/create",
          name: "admin-user-create",
          component: AdminUserEdit
        },
        {
          path: "/admin_users/edit/:id",
          name: "admin-user-edit",
          component: AdminUserEdit,
          props: true
        },
        {
          path: "/admin_users/list",
          name: "admin-user-list",
          component: AdminUserList
        }
      ]
    }
  ]
});
