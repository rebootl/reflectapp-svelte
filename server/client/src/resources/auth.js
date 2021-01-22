import { apiPostRequest } from './requests.js'
import { apiGetRequest } from './requests.js'
import { authURL } from './urls.js';

export function loggedIn() {
  if (localStorage.getItem('username')) return true;
  return false;
}

export function getUserName() {
  if (!loggedIn()) return '';
  return localStorage.getItem('username');
}

export async function login(username, pw) {
  const r = await apiPostRequest(authURL + '/login', {
    username: username,
    password: pw
  });
  // check login login resp.
  if (!r.success) {
    console.log("Login unsuccessful :(");
    return r;
  }
  console.log("Login successful!");
  localStorage.setItem('username', username);
  return r;
}

export async function logout() {
  const r = await apiGetRequest(authURL + '/logout');
  if (!r.success) {
    console.log("Logout unsuccessful :/");
    return r;
  }
  localStorage.removeItem('username');
  console.log("Logout successful, bye...");
  location.reload();
  //return r;
}
