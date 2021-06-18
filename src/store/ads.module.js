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
  getNewMessage(state) {
    return state.newMessage;
  },
  getMessages(state) {
    return state.messages;
  }
};

const actions = {
  async [ADD_MESSAGE]({ commit }, message) {
    try {
      commit(ISLOADING);
      const {
        data: { name },
        status
      } = await ApiService.createAd(message);
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
  },

  [SET_MESSAGES](state, messages) {
    console.log('messages', messages)
    state.messages = messages;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
