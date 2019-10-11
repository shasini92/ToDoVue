import { authService } from "../../services/AuthService";

const state = {
  userLoggedIn: false,
  userName: "",
  accessToken: null
};

const getters = {
  userLoggedIn: store => store.userLoggedIn,
  username: store => store.userName,
  accessToken: store => store.accessToken
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
  async logout({ commit }, token) {
    try {
      await authService.logout(token);
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

// const localStorageLogin = data => {
//   localStorage.setItem("access_token", JSON.stringify(data.access_token));
//   localStorage.setItem("userLoggedIn", JSON.stringify(true));
//   localStorage.setItem("username", JSON.stringify(data.user.name));
// };

// const localStorageLogout = () => {
//   localStorage.removeItem("access_token");
//   localStorage.removeItem("username");
//   localStorage.setItem("userLoggedIn", JSON.stringify(false));
// };

const mutations = {
  setUser: (state, data) => {
    // localStorageLogin(data);
    localStorage.setItem("access_token", JSON.stringify(data.access_token));
    state.accessToken = data.access_token;
    state.userLoggedIn = true;
    state.userName = data.user.name;
  },
  logoutUser: state => {
    // localStorageLogout();
    localStorage.removeItem("access_token");
    state.userLoggedIn = false;
    state.userName = "";
    state.accessToken = null;
  },
  register: (state, data) => {
    // localStorageLogin(data);
    localStorage.setItem("access_token", JSON.stringify(data.access_token));
    state.accessToken = data.access_token;
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
