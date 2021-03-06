import Vue from "vue";
import App from "./App.vue";
import "./assets/iconfont/iconfont.css";
import "./assets/scss/style.scss";
import router from "./router";
Vue.config.productionTip = false;

import VueAwesomeSwiper from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";

import axios from "axios";

Vue.prototype.$http = axios.create({
  baseURL: "http://localhost:3000/web/api"
});

Vue.use(VueAwesomeSwiper /* { default global options } */);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
