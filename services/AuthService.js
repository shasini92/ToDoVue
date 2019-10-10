import axios from "axios";
let config = {
  headers: {
    Authorization: `Bearer ${JSON.parse(localStorage.getItem("access_token"))}`
  }
};

class AuthService {
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
  }

  async logout() {
    try {
      await axios.post(`http://127.0.0.1:8000/api/logout`, {}, config);
    } catch (error) {
      console.log(error);
    }
  }

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
}

export const authService = new AuthService();
