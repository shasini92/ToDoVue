import HttpBaseClient from "./HttpBaseClient";

class AuthService extends HttpBaseClient {
  login = async credentials => {
    const { data } = await this.getApiClient().post("login", credentials);

    return data;
  };

  async logout() {
    await this.getApiClient().post("logout", {});
  }

  register = async newUserData => {
    const { data } = await this.getApiClient().post("register", newUserData);

    return data;
  };
}

export default AuthService;
