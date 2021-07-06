import ApiService from '@/api';
import { ADD_MESSAGE, GET_ADS, GET_AD } from './actions.types';
import {
  SET_NEW_MESSAGE,
  SET_MESSAGES,
  SET_CURRENT_MESSAGE,
  ISLOADING,
  ISLOADING_FALSE,
  SET_ERROR,
  OPEN_NOTIFICATION
} from './mutations.types';
import i18n from '@/i18n';

const state = {
  newMessage: {},
  messages: [],
  currentMessage: {}
};

const getters = {
  newAd(state) {
    return state.newMessage;
  },
  ads(state) {
    return state.messages;
  },
  currentAd(state) {
    return state.currentMessage;
  },
  currentUserAds(state, rootState) {
    return state.messages.filter((ad) => ad.userLocalId === rootState.currentUser.localId);
  }
};

const actions = {
  async [ADD_MESSAGE]({ commit, rootState }, message) {
    try {
      const userId = { userLocalId: rootState.auth.user.localId };
      const adsMessage = {
        ...message,
        ...userId
      };
      commit(ISLOADING);
      const {
        data: { name },
        status
      } = await ApiService.createAd(adsMessage);
      if (status === 200 && name) {
        const notificationRules = {
          status: 'is-success',
          timeout: 3000,
          message: i18n.t('store.adsModule.successMessage')
        };
        commit(OPEN_NOTIFICATION, notificationRules);
        const id = { id: name };
        const newMessage = {
          ...message,
          ...id
        };
        commit(SET_NEW_MESSAGE, newMessage);
        commit(ISLOADING_FALSE);
      }
    } catch (error) {
      const notificationRules = {
        status: 'is-danger',
        timeout: 5000,
        message: i18n.t('store.adsModule.invalidMessage')
      };
      commit(OPEN_NOTIFICATION, notificationRules);
      commit(SET_ERROR, error.message);
      commit(ISLOADING_FALSE);
    }
  },
  async [GET_ADS]({ commit }) {
    try {
      commit(ISLOADING);
      const { data, status } = await ApiService.getAds();
      if (status === 200) {
        commit(SET_MESSAGES, data);
        commit(ISLOADING_FALSE);
      }
    } catch (error) {
      const notificationRules = {
        status: 'is-danger',
        timeout: 5000,
        message: i18n.t('store.adsModule.invalidMessage')
      };
      commit(OPEN_NOTIFICATION, notificationRules);
      commit(SET_ERROR, error.message);
      commit(ISLOADING_FALSE);
    }
  },
  async [GET_AD]({ commit }, id) {
    try {
      commit(ISLOADING);
      const { data, status } = await ApiService.getAd(id);
      if (status === 200) {
        commit(SET_CURRENT_MESSAGE, data);
        commit(ISLOADING_FALSE);
      }
    } catch (error) {
      const notificationRules = {
        status: 'is-danger',
        timeout: 5000,
        message: i18n.t('store.adsModule.invalidMessage')
      };
      commit(OPEN_NOTIFICATION, notificationRules);
      commit(SET_ERROR, error.message);
      commit(ISLOADING_FALSE);
    }
  }
};

const mutations = {
  [SET_NEW_MESSAGE](state, newMessage) {
    state.newMessage = newMessage;
    state.messages = [newMessage, ...state.messages];
  },
  [SET_MESSAGES](state, messages) {
    const newMessages = Object.keys(messages)
      .map((id) => ({ ...messages[id], id }))
      .reverse();
    state.messages = newMessages;
  },
  [SET_CURRENT_MESSAGE](state, currentMessage) {
    state.currentMessage = currentMessage;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
