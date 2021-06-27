import ApiService from '@/api';
import { ADD_MESSAGE, GET_ADS } from './actions.types';
import {
  SET_NEW_MESSAGE,
  SET_MESSAGES,
  ISLOADING,
  ISLOADING_FALSE,
  SET_ERROR
} from './mutations.types';

const state = {
  newMessage: {},
  messages: []
};

const getters = {
  newAd(state) {
    return state.newMessage;
  },
  ads(state) {
    return state.messages;
  },
  currentUserAds(state, rootState) {
    console.log('getCurrentUserAds', rootState.currentUser.localId)
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
        const id = { id: name };
        const newMessage = {
          ...message,
          ...id
        };
        commit(SET_NEW_MESSAGE, newMessage);
        commit(ISLOADING_FALSE);
      }
    } catch (error) {
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
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
