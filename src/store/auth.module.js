// import axios from 'axios';
import { LOGIN, SIGN_UP, LOGOUT } from './actions.types';
import { SET_AUTH, PURGE_AUTH, SET_ERROR, ISLOADING, ISLOADING_FALSE } from './mutations.types';
import ApiService from '@/api';

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
      commit(ISLOADING);
      const { data, status } = await ApiService.loginUser(user);
      const loggedUser = { 
        displayName: data.displayName, 
        email: data.email, 
        localId: data.localId, 
        idToken: data.idToken, 
        refreshToken: data.refreshToken
      };

      if (status === 200) {
        commit(SET_AUTH, loggedUser );
        commit(ISLOADING_FALSE);
        console.log('data', loggedUser);
      }
    } catch (error) {
      commit(SET_ERROR, error.message);
      commit(ISLOADING_FALSE);
    }
  },
  async [SIGN_UP]({ commit }, { firstName, lastName, email, password }) {
    try {
      const newUser = {
        email,
        password,
        displayName: `${firstName}${' '}${lastName}`,
        returnSecureToken: true
      };
      commit(ISLOADING);
      const { data, status } = await ApiService.signUpUser(newUser);
      const loggedUser = { 
        displayName: data.displayName, 
        email: data.email, 
        localId: data.localId, 
        idToken: data.idToken, 
        refreshToken: data.refreshToken
      };
      
      const idToken = data.idToken
      const refreshToken = data.refreshToken
      if (status === 200) {
        commit(SET_AUTH, loggedUser, idToken, refreshToken);
        commit(ISLOADING_FALSE);
        console.log('data', data);
      }
    } catch (error) {
      commit(SET_ERROR, error.message);
      commit(ISLOADING_FALSE);
    }
  },
  [LOGOUT]({ commit }) {
    commit(PURGE_AUTH);
  }
};

const mutations = {
  [SET_AUTH](state, { displayName, email, localId, idToken, refreshToken }) {
    const loggedUser = { displayName, email, localId };
    state.user = loggedUser;
    state.isAuthenticated = true;
    localStorage.setItem('localId', localId);
    localStorage.setItem('idToken', idToken);
    localStorage.setItem('refreshToken', refreshToken);
  },
  [PURGE_AUTH](state) {
    state.isAuthenticated = false;
    state.errors = null;
    state.user = {};
    localStorage.removeItem('localId');
    localStorage.removeItem('idToken');
    localStorage.removeItem('refreshToken');
  },
  [SET_ERROR](state, error) {
    state.errors = error;
    setTimeout(() => {
      state.errors = null;
    }, 3000);
  },
  [ISLOADING](state) {
    state.isLoading = true;
  },
  [ISLOADING_FALSE](state) {
    state.isLoading = false;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
