import Vuex from "vuex";
import Vue from "vue";
import todos from "./modules/todos";
import user from "./modules/user";

//  Load VueX
Vue.use(Vuex);

// Create the store
export default new Vuex.Store({
  // Here we put all the modules we have and want to use the store
  modules: {
    todos,
    user
  }
});
