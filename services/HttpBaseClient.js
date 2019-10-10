class HttpBaseClient {
  constructor() {
    this.client = axios.create({
      baseURL: "http://127.0.0.1:8000/api"
    });
    this.setInterceptor();
  }

  setInterceptor = () => {
    this.client.interceptors.request.use(config => {
      const token = window.localStorage.getItem("access_token");

      if (!!token) {
        Object.assign(config.headers, {
          Authorization: `Bearer ${token}`
        });
      }

      return config;
    });
  };

  attachHeaders(headers) {
    Object.assign(this.client.defaults.headers, headers);
  }

  detachHeader(headerKey) {
    delete this.client.defaults.headers[headerKey];
  }

  getApiClient() {
    return this.client;
  }
}

export default HttpBaseClient;
