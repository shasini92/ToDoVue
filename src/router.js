import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login";
import PageNotFound from "./views/PageNotFound";
import Todo from "./views/Todo";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Todo
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "*",
      component: PageNotFound
    },
    {
      path: "/register",
      name: "Register",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Register.vue")
    }
  ]
});
