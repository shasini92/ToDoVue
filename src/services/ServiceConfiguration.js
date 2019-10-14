import { getApiUrl, getToken } from "../config";
import axios from "axios";

export function setAuthHeader() {
  axios.defaults.headers.common["Authorization"] = `Bearer ${getToken()}`;
}

export function configureHttp() {
  axios.defaults.baseURL = "http://127.0.0.1:8000/api/";
  axios.defaults.headers.Accept = "application/json";
}

export default {
  setAuthHeader,
  configureHttp
};
