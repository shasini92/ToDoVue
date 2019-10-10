import AuthService from "../../../services/AuthService";

const state = {
  userLoggedIn: false,
  userName: ""
};

const getters = {
  isUserLoggedIn: state => state.userLoggedIn,
  getUserName: state => state.userName
};

const actions = {
  login({ commit }, credentials) {
    try {
      const user = AuthService.login(credentials);
      commit("setUser", user);
    } catch (error) {
      console.log(error);
    }
  },
  logout({ commit }) {
    try {
      AuthService.logout();
      commit("logoutUser");
    } catch (error) {
      console.log(error);
    }
  },
  register({ commit }, newUser) {
    try {
      const createdUser = AuthService.register(newUser);
      commit("register", createdUser);
    } catch (error) {
      console.log(error);
    }
  }
};

const mutations = {
  setUser: (state, user) => {
    state.userLoggedIn = true;
    state.userName = user.name;
    localStorage.setItem("access_token", JSON.stringify(user.access_token));
  },
  logoutUser: state => {
    state.userLoggedIn = false;
    state.userName = "";
    localStorage.removeItem("access_token");
  },
  register: (state, user) => {
    state.userLoggedIn = true;
    state.userName = user.name;
    localStorage.setItem("access_token", JSON.stringify(user.access_token));
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
