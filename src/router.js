import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login";
import PageNotFound from "./views/PageNotFound";
import Todo from "./views/Todo";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Todo,
      meta: {
        requiresAuth: true
      }
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
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Register.vue")
    }
  ]
});

router.beforeEach((to, from, next) => {
  setTimeout(() => {
    if (!localStorage.getItem("access_token") && to.meta.requiresAuth) {
      console.log(localStorage.getItem("access_token"));
      console.log("rerouting from login");
      next("/login");
    } else next();
  }, 500);
});

export default router;
