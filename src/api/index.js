import axios from 'axios';

const authUrl = process.env.VUE_APP_AUTH_URL;

const ApiService = {
  loginUser(user) {
    return axios.post(`${authUrl}:signInWithPassword?key=${process.env.VUE_APP_API_KEY}`, user);
  },
  signUpUser(newUser) {
    return axios.post(`${authUrl}:signUp?key=${process.env.VUE_APP_API_KEY}`, newUser);
  }
};

export default ApiService;
