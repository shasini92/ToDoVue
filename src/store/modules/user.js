import { authService } from "../../services/AuthService";

const state = {
  userLoggedIn: false,
  userName: ""
};

const getters = {
  userLoggedIn: store => store.userLoggedIn,
  username: store => store.userName
};

const actions = {
  async login({ commit }, credentials) {
    try {
      const data = await authService.login(credentials);
      commit("SET_USER", data);
    } catch (error) {
      console.log(error);
    }
  },

  async logout({ commit }) {
    try {
      await authService.logout();
      commit("LOGOUT_USER");
    } catch (error) {
      console.log(error);
    }
  },

  async register({ commit }, newUser) {
    try {
      const createdUser = await authService.register(newUser);
      commit("REGISTER_USER", createdUser);
    } catch (error) {
      console.log(error);
    }
  }
};

const localStorageLogin = data => {
  localStorage.setItem("access_token", JSON.stringify(data.access_token));
  localStorage.setItem("username", JSON.stringify(data.user.name));
};

const localStorageLogout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("username");
};

const mutations = {
  SET_USER: (state, data) => {
    localStorageLogin(data);
    state.userLoggedIn = true;
    state.userName = data.user.name;
  },

  LOGOUT_USER: state => {
    localStorageLogout();
    state.userLoggedIn = false;
    state.userName = "";
  },

  REGISTER_USER: (state, data) => {
    localStorageLogin(data);
    state.userLoggedIn = true;
    state.userName = data.user.name;
  },

  SET_USER_LOGGED_IN: (state, data) => {
    state.userLoggedIn = data;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
