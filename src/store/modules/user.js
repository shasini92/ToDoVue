import { authService } from "../../../services/AuthService";

const state = {
  userLoggedIn: false,
  userName: ""
};

const getters = {
  isUserLoggedIn: state => state.userLoggedIn,
  getUserName: state => state.userName
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

const mutations = {
  setUser: (state, data) => {
    state.userLoggedIn = true;
    state.userName = data.user.name;
    localStorage.setItem("access_token", JSON.stringify(data.access_token));
  },
  logoutUser: state => {
    state.userLoggedIn = false;
    state.userName = "";
    localStorage.removeItem("access_token");
  },
  register: (state, data) => {
    state.userLoggedIn = true;
    state.userName = data.user.name;
    localStorage.setItem("access_token", JSON.stringify(data.access_token));
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
