import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import authService from "./services/AuthService";
import todoService from "./services/TodoService";
import { getToken } from "./config";

authService.init();
if (getToken()) {
  todoService.init();
}

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
