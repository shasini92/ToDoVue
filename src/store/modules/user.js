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
      commit("setUser", data);
    } catch (error) {
      console.log(error);
    }
  },
  async logout({ commit }) {
    try {
      await authService.logout();
      commit("logoutUser");
    } catch (error) {
      console.log(error);
    }
  },
  async register({ commit }, newUser) {
    try {
      const createdUser = await authService.register(newUser);
      commit("register", createdUser);
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
  setUser: (state, data) => {
    localStorageLogin(data);
    state.userLoggedIn = true;
    state.userName = data.user.name;
  },
  logoutUser: state => {
    localStorageLogout();
    state.userLoggedIn = false;
    state.userName = "";
  },
  register: (state, data) => {
    localStorageLogin(data);
    state.userLoggedIn = true;
    state.userName = data.user.name;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
