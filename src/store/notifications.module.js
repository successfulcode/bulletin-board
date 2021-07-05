import { OPEN_NOTIFICATION, CLOSE_NOTIFICATION } from './mutations.types';

const state = {
  open: false,
  status: 'is-warning',
  message: ''
}

const getters = {
  notificationIsOpen(state) {
    return state.open;
  },
  notificationStatus(state) {
    return state.status;
  },
  notificationMessage(state) {
    return state.message;
  }  
}

const actions = {

}

const mutations = {
  [OPEN_NOTIFICATION] (state, { status, timeout, message }) {
    state.open = true;
    state.status = status;
    state.message = message;
    setTimeout(() => {
      state.open = false;
      state.message = '';
    }, timeout)
  },
  [CLOSE_NOTIFICATION] (state) {
    state.open = false;
  }
}

export default {
  state,
  getters,
  actions,
  mutations
};
