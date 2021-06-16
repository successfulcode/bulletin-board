import axios from 'axios';
import { ADD_MESSAGE } from './actions.types';
import { SET_NEW_MESSAGE, SET_MESSAGES } from './mutations.types';

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
    console.log('newMessage ', message);
    try {
      console.log(commit, message);
      const { data, status } = await axios.post(process.env.VUE_APP_DATA_URL, message);

      commit(SET_NEW_MESSAGE, message);
      console.log(data, status);
    } catch (error) {
      console.log(error);
    }
  }
};

const mutations = {
  [SET_NEW_MESSAGE](state, message) {
    state.newMessage = message;
  },
  [SET_MESSAGES](state, messages) {
    state.message = messages;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
