import { LOGIN, SIGN_UP, LOGOUT, CHECK_AUTH, AUTO_LOGOUT, AUTO_LOGIN } from './actions.types';
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
  async [LOGIN]({ commit, dispatch }, { email, password }) {
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
        refreshToken: data.refreshToken,
        expiresIn: data.expiresIn
      };

      if (status === 200) {
        commit(SET_AUTH, loggedUser );
        commit(ISLOADING_FALSE);
        dispatch(AUTO_LOGOUT, data.expiresIn);
      }
    } catch (error) {
      commit(SET_ERROR, error.message);
      commit(ISLOADING_FALSE);
    }
  },
  async [SIGN_UP]({ commit, dispatch }, { firstName, lastName, email, password }) {
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
        refreshToken: data.refreshToken,
        expiresIn: data.expiresIn
      };

      if (status === 200) {
        commit(SET_AUTH, loggedUser);
        commit(ISLOADING_FALSE);
        dispatch(AUTO_LOGOUT, data.expiresIn);
      }
    } catch (error) {
      commit(SET_ERROR, error.message);
      commit(ISLOADING_FALSE);
    }
  },
  async [CHECK_AUTH] ({ commit }){
    try {
      commit(ISLOADING);
      const token = {
        token: localStorage.getItem('idToken'),
        // token: localStorage.getItem('refreshToken'),
        returnSecureToken: true
      }
      const { data, status } = await ApiService.authWhithToken(token);
      if (status === 200) {
       console.log('CHECK_AUTH', data);
      }
    } catch (error) {
      commit(SET_ERROR, error.message);
      commit(ISLOADING_FALSE);
      console.log(error);
    }
  },
  [AUTO_LOGOUT]({ commit }, expiresIn){
    try {
      setTimeout(()=>{
        commit(PURGE_AUTH)
      }, expiresIn * 1000)
    } catch (error) {
      console.log(error)
    }
  },
  [AUTO_LOGIN]({ dispatch, commit }) {
    const idToken = localStorage.getItem('idToken');
    const refreshToken = localStorage.getItem('refreshToken');
    const localId = localStorage.getItem('localId');
    const displayName = localStorage.getItem('displayName');
    const email = localStorage.getItem('email');
    const expirationDate = new Date(localStorage.getItem('expirationDate'))
   
    try {
      if(!idToken || !refreshToken || !displayName || !email || !expirationDate) {
        dispatch(LOGOUT)
      } else if (expirationDate <= new Date()) {
        dispatch(LOGOUT)
      } else {
        const expiresIn = (expirationDate.getTime() - new Date().getTime()) / 1000
        commit(SET_AUTH, {displayName, email, localId, idToken, refreshToken, expiresIn })
        dispatch(AUTO_LOGOUT, expiresIn)
        console.log('newExpirationDate', expiresIn )
      }} catch (error) {
      console.log(error)
    }
  },
  [LOGOUT]({ commit }) {
    commit(PURGE_AUTH);
  }
};

const mutations = {
  [SET_AUTH](state, { displayName, email, localId, idToken, refreshToken, expiresIn }) {
    console.log('test', displayName, email, localId, idToken, refreshToken, expiresIn)
    const loggedUser = { displayName, email, localId };
    state.user = loggedUser;
    state.isAuthenticated = true;
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    localStorage.setItem('displayName', displayName);
    localStorage.setItem('email', email);
    localStorage.setItem('localId', localId);
    localStorage.setItem('idToken', idToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('expirationDate', expirationDate)
  },
  [PURGE_AUTH](state) {
    state.isAuthenticated = false;
    state.errors = null;
    state.user = {};
    localStorage.removeItem('displayName');
    localStorage.removeItem('email');
    localStorage.removeItem('localId');
    localStorage.removeItem('idToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('expirationDate');
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
