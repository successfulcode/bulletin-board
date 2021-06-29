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
    return axios.post(`${dataUrl}`, message);
  },
  authWhithToken(token) {
    return axios.post(`${authUrl}:signInWithCustomToken?key=${process.env.VUE_APP_API_KEY}`, token);
  },
  getAds() {
    return axios.get(`${dataUrl}`);
  }
};

export default ApiService;
