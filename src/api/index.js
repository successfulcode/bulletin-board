import axios from 'axios';

const authUrl = process.env.VUE_APP_AUTH_URL;
const dataUrl = process.env.VUE_APP_DATA_URL;

const ApiService = {
  loginUser(user) {
    return axios.post(`${authUrl}:signInWithPassword?key=${process.env.VUE_APP_API_KEY}`, user);
  },
  signUpUser(newUser) {
    return axios.post(`${authUrl}:signUp?key=${process.env.VUE_APP_API_KEY}`, newUser);
  },
  createAd(message) {
    return axios.post(`${dataUrl}.json`, message);
  },
  authWhithToken(token) {
    return axios.post(`${authUrl}:signInWithCustomToken?key=${process.env.VUE_APP_API_KEY}`, token);
  },
  getAds() {
    return axios.get(`${dataUrl}.json?orderBy="Date"&limitToLast=6&print=pretty`);
  },
  getMoreAds(lastItem) {
    return axios.get(`${dataUrl}.json?orderBy="Date"&endAt=${lastItem}&limitToLast=3&print=pretty`);
  },
  getShallowData() {
    return axios.get(`${dataUrl}.json?shallow=true&print=pretty`);
  },
  getAd(id) {
    return axios.get(`${dataUrl}/${id}.json`);
  },
  getCurrentUserAds(userLocalId) {
    return axios.get(`${dataUrl}.json?orderBy="userLocalId"&equalTo="${userLocalId}"&print=pretty`);
  }
};

export default ApiService;
