export function getToken() {
  return JSON.parse(localStorage.getItem("access_token"));
}
