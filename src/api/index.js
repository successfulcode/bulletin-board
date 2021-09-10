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
  updateProfile(updatedProfile) {
    return axios.post(`${authUrl}:update?key=${process.env.VUE_APP_API_KEY}`, updatedProfile);
  },
  createAd(newAd) {
    return axios.post(`${dataUrl}.json`, newAd);
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
  updateAd(id, updatedAd) {
    return axios.patch(`${dataUrl}/${id}.json`, updatedAd);
  },
  getCurrentUserAds(userLocalId) {
    return axios.get(`${dataUrl}.json?orderBy="userLocalId"&equalTo="${userLocalId}"&print=pretty`);
  },
  deleteAd(id) {
    return axios.delete(`${dataUrl}/${id}.json`);
  }
};

export default ApiService;
