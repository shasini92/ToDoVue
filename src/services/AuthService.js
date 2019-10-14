import axios from "axios";
import { setAuthHeader, configureHttp } from "./ServiceConfiguration";

const authService = {
  init() {
    configureHttp();
    setAuthHeader();
  },

  async login(credentials) {
    try {
      const { data } = await axios.post(
        `http://127.0.0.1:8000/api/login`,
        credentials
      );

      return data;
    } catch (error) {
      console.log(error);
    }
  },

  async logout() {
    try {
      await axios.post(`http://127.0.0.1:8000/api/logout`, {});
    } catch (error) {
      console.log(error);
    }
  },

  async register(newUserData) {
    try {
      const { data } = await axios.post(
        `http://127.0.0.1:8000/api/register`,
        newUserData
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
};

export default authService;
