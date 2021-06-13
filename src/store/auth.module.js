import axios from 'axios';
import { LOGIN, SIGN_UP, LOGOUT } from './actions.types';
import { SET_AUTH, PURGE_AUTH } from './mutations.types';

const state = {
  errors: null,
  user: {},
  isAuthenticated: false,
  isLoading: false
};

const getters = {
  currentUser(state) {
    return state.user;
  },
  isAuthenticated(state) {
    return state.isAuthenticated;
  },
  isLoading(state) {
    return state.isLoading;
  }
};

const actions = {
  async [LOGIN]({ commit }, { email, password }) {
    try {
      const user = {
        email,
        password,
        returnSecureToken: true
      };
      const { data } = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_API_KEY}`,
        user
      );
      const loggedUser = {
        localId: data.localId,
        email: data.email,
        displayName: data.displayName
      };
      commit(SET_AUTH, loggedUser, data.idToken, data.refreshToken);
    } catch (err) {
      console.log(err);
    }
  },
  async [SIGN_UP]({ commit }, { firstName, lastName, email, password }) {
    console.log('SIGN_UP', firstName, lastName, email, password);
    try {
      const newUser = {
        email,
        password,
        displayName: `${firstName}${' '}${lastName}`,
        returnSecureToken: true
      };
      const { data } = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.VUE_APP_API_KEY}`,
        newUser
      );
      const loggedUser = {
        localId: data.localId,
        email: data.email,
        displayName: data.displayName
      };
      commit(SET_AUTH, loggedUser, data.idToken, data.refreshToken);
      console.log('SIGNUP', data, commit);
    } catch (err) {
      console.log(err);
    }
  },
  [LOGOUT]({ commit }) {
    commit(PURGE_AUTH);
  }
};

const mutations = {
  [SET_AUTH](state, user, idToken, refreshToken) {
    state.user = user;
    state.isAuthenticated = true;
    localStorage.setItem('idToken', idToken);
    localStorage.setItem('refreshToken', refreshToken);
  },
  [PURGE_AUTH](state) {
    state.isAuthenticated = false;
    state.errors = null;
    state.user = {};
    localStorage.removeItem('idToken');
    localStorage.removeItem('refreshToken');
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
