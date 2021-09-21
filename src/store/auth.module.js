import {
  LOGIN,
  SIGN_UP,
  LOGOUT,
  AUTO_LOGOUT,
  AUTO_LOGIN,
  UPDATE,
  SET_NEW_PASSWORD
} from './actions.types';
import {
  SET_AUTH,
  PURGE_AUTH,
  SET_ERROR,
  ISLOADING,
  ISLOADING_FALSE,
  OPEN_NOTIFICATION,
  CLOSE_NOTIFICATION,
  UPDATE_AUTH,
  UPDATE_ID_TOKEN
} from './mutations.types';
import ApiService from '@/api';
import i18n from '@/i18n';

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
        photoUrl: data.photoUrl,
        refreshToken: data.refreshToken,
        expiresIn: data.expiresIn
      };

      if (status === 200) {
        const notificationRules = {
          status: 'is-success',
          timeout: 3000,
          message: i18n.t('store.authModule.successLoginMessage')
        };
        commit(OPEN_NOTIFICATION, notificationRules);
        commit(SET_AUTH, loggedUser);
        dispatch(AUTO_LOGOUT, data.expiresIn);
      }
    } catch (error) {
      const notificationRules = {
        status: 'is-danger',
        timeout: 5000,
        message: i18n.t('store.authModule.invalidLoginMessage')
      };
      commit(OPEN_NOTIFICATION, notificationRules);
      commit(SET_ERROR, error.message);
    } finally {
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
        const notificationRules = {
          status: 'is-success',
          timeout: 3000,
          message: i18n.t('store.authModule.successSignUpMessage')
        };
        commit(OPEN_NOTIFICATION, notificationRules);
        commit(SET_AUTH, loggedUser);
        dispatch(AUTO_LOGOUT, data.expiresIn);
      }
    } catch (error) {
      if (error.response.data.error.code === 400) {
        const notificationRules = {
          status: 'is-danger',
          timeout: 5000,
          message: i18n.t('store.authModule.invalidUserExist')
        };
        commit(OPEN_NOTIFICATION, notificationRules);
        commit(SET_ERROR, error.message);
      } else {
        const notificationRules = {
          status: 'is-danger',
          timeout: 5000,
          message: i18n.t('store.authModule.invalidSignUpMessage')
        };
        commit(OPEN_NOTIFICATION, notificationRules);
        commit(SET_ERROR, error.message);
      }
    } finally {
      commit(ISLOADING_FALSE);
    }
  },
  async [UPDATE]({ commit }, { idToken, displayName, email, photoUrl }) {
    try {
      const updatedProfile = {
        idToken,
        displayName,
        email,
        photoUrl,
        returnSecureToken: true
      };
      commit(ISLOADING);
      const { data, status } = await ApiService.updateProfile(updatedProfile);
      const updatedUser = {
        displayName: data.displayName,
        email: data.email,
        localId: data.localId,
        photoUrl: data.photoUrl
      };

      if (status === 200) {
        const notificationRules = {
          status: 'is-success',
          timeout: 3000,
          message: i18n.t('store.authModule.successUpdate')
        };
        commit(OPEN_NOTIFICATION, notificationRules);
        commit(UPDATE_AUTH, updatedUser);
      }
    } catch (error) {
      const notificationRules = {
        status: 'is-danger',
        timeout: 5000,
        message: i18n.t('store.authModule.invalidUpdateMessage')
      };
      commit(OPEN_NOTIFICATION, notificationRules);
      commit(SET_ERROR, error.message);
    } finally {
      commit(ISLOADING_FALSE);
    }
  },
  async [SET_NEW_PASSWORD]({ commit }, { idToken, email, password }) {
    try {
      const updatedPassword = {
        idToken,
        email,
        password,
        returnSecureToken: true
      };
      commit(ISLOADING);
      const { data, status } = await ApiService.updatePassword(updatedPassword);
      const idTokenItem = { idToken: data.idToken };
      console.log('idToken ', idTokenItem);
      if (status === 200) {
        const notificationRules = {
          status: 'is-success',
          timeout: 3000,
          message: i18n.t('store.authModule.successPasswordUpdate')
        };
        commit(UPDATE_ID_TOKEN, idTokenItem);
        commit(OPEN_NOTIFICATION, notificationRules);
      }
    } catch (error) {
      const notificationRules = {
        status: 'is-danger',
        timeout: 5000,
        message: i18n.t('store.authModule.invalidUpdateMessage')
      };
      commit(OPEN_NOTIFICATION, notificationRules);
      commit(SET_ERROR, error.message);
    } finally {
      commit(ISLOADING_FALSE);
    }
  },
  [AUTO_LOGOUT]({ commit }, expiresIn) {
    try {
      setTimeout(() => {
        commit(PURGE_AUTH);
      }, expiresIn * 1000);
    } catch (error) {
      console.log(error);
    }
  },
  [AUTO_LOGIN]({ dispatch, commit }) {
    const { idToken, refreshToken, expirationDate } = JSON.parse(localStorage.getItem('tokens'));

    const { localId, displayName, email, photoUrl } = JSON.parse(localStorage.getItem('user'));

    try {
      if (!idToken || !refreshToken || !displayName || !email || !expirationDate) {
        dispatch(LOGOUT);
      } else if (new Date(expirationDate) <= new Date()) {
        dispatch(LOGOUT);
      } else {
        const expiresIn = (new Date(expirationDate).getTime() - new Date().getTime()) / 1000;
        commit(SET_AUTH, {
          displayName,
          email,
          localId,
          idToken,
          photoUrl,
          refreshToken,
          expiresIn
        });
        dispatch(AUTO_LOGOUT, expiresIn);
      }
    } catch (error) {
      console.log(error);
    }
  },
  [LOGOUT]({ commit }) {
    commit(PURGE_AUTH);
    commit(CLOSE_NOTIFICATION);
  }
};

const mutations = {
  [SET_AUTH](
    state,
    { displayName, email, localId, idToken, photoUrl = null, refreshToken, expiresIn }
  ) {
    const loggedUser = { displayName, email, localId, photoUrl };
    state.user = loggedUser;
    state.isAuthenticated = true;
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);

    localStorage.setItem('tokens', JSON.stringify({ idToken, refreshToken, expirationDate }));

    localStorage.setItem('user', JSON.stringify({ displayName, email, localId, photoUrl }));
  },
  [UPDATE_AUTH](state, { displayName, email, localId, photoUrl }) {
    const loggedUser = { displayName, email, localId };
    state.user = loggedUser;
    localStorage.setItem('user', JSON.stringify({ displayName, email, localId, photoUrl }));
  },
  [UPDATE_ID_TOKEN](state, { idToken }) {
    const { refreshToken, expirationDate } = JSON.parse(localStorage.getItem('tokens'));
    localStorage.setItem('tokens', JSON.stringify({ idToken, refreshToken, expirationDate }));
  },
  [PURGE_AUTH](state) {
    state.isAuthenticated = false;
    state.errors = null;
    state.user = {};

    localStorage.removeItem('tokens');

    localStorage.removeItem('user');
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
