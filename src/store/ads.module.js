import ApiService from '@/api';
import {
  ADD_AD,
  GET_ADS,
  GET_AD,
  GET_MORE_ADS,
  GET_CURRENT_USER_ADS,
  UPDATE_AD,
  DELETE_AD
  // GET_SHALLOW
} from './actions.types';
import {
  SET_NEW_AD,
  SET_ADS,
  SET_CURRENT_AD,
  ISLOADING,
  ISLOADING_FALSE,
  SET_ERROR,
  OPEN_NOTIFICATION,
  SET_MORE_ADS,
  SET_CURRENT_USER_ADS,
  SET_UPDATED_CURRENT_AD,
  DELETE_AD_FROM_STATE
  // SET_SHALLOWS
} from './mutations.types';
import i18n from '@/i18n';

const state = {
  newAd: {},
  ads: [],
  currentUserAds: [],
  currentAd: {},
  shallows: {}
};

const getters = {
  newAd(state) {
    return state.newAd;
  },
  ads(state) {
    return state.ads;
  },
  currentAd(state) {
    return state.currentAd;
  },
  currentUserAds(state) {
    return state.currentUserAds;
  }
};

const actions = {
  async [ADD_AD]({ commit, rootState }, ad) {
    try {
      const userId = { userLocalId: rootState.auth.user.localId };
      const adsMessage = {
        ...ad,
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
        const newAd = {
          ...ad,
          ...id
        };
        commit(SET_NEW_AD, newAd);
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
  async [UPDATE_AD]({ commit }, { adId, updatedAd }) {
    try {
      commit(ISLOADING);
      const { status } = await ApiService.updateAd(adId, updatedAd);
      if (status === 200) {
        const notificationRules = {
          status: 'is-success',
          timeout: 3000,
          message: i18n.t('store.adsModule.successUpdateMessage')
        };
        commit(SET_UPDATED_CURRENT_AD, updatedAd);
        commit(OPEN_NOTIFICATION, notificationRules);
        commit(ISLOADING_FALSE);
      }
    } catch (error) {
      const notificationRules = {
        status: 'is-danger',
        timeout: 5000,
        message: i18n.t('store.adsModule.invalidUpdateMessage')
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
        commit(SET_ADS, data);
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
  async [GET_MORE_ADS]({ commit }, lastItem) {
    try {
      commit(ISLOADING);
      const { data, status } = await ApiService.getMoreAds(lastItem);
      if (status === 200) {
        commit(SET_MORE_ADS, data);
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
  async [GET_CURRENT_USER_ADS]({ commit, rootState }) {
    try {
      const userLocalId = rootState.auth.user.localId;
      commit(ISLOADING);
      const { data, status } = await ApiService.getCurrentUserAds(userLocalId);
      if (status === 200) {
        commit(SET_CURRENT_USER_ADS, data);
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

  // async [GET_SHALLOW]({ commit }) {
  //   try {
  //     commit(ISLOADING);
  //     const { data, status } = await ApiService.getShallowData();
  //     if (status === 200) {
  //       commit(SET_SHALLOWS, data);
  //       commit(ISLOADING_FALSE);
  //     }
  //   } catch (error) {
  //     const notificationRules = {
  //       status: 'is-danger',
  //       timeout: 5000,
  //       message: i18n.t('store.adsModule.invalidMessage')
  //     };
  //     commit(OPEN_NOTIFICATION, notificationRules);
  //     commit(SET_ERROR, error.message);
  //     commit(ISLOADING_FALSE);
  //   }
  // },
  async [GET_AD]({ commit }, id) {
    try {
      commit(ISLOADING);
      const { data, status } = await ApiService.getAd(id);
      if (status === 200) {
        commit(SET_CURRENT_AD, data);
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
  async [DELETE_AD]({ commit }, id) {
    try {
      commit(ISLOADING);
      const { status } = await ApiService.deleteAd(id);
      if (status === 200) {
        const notificationRules = {
          status: 'is-success',
          timeout: 3000,
          message: i18n.t('store.adsModule.successDeleteMessage')
        };
        commit(OPEN_NOTIFICATION, notificationRules);
        commit(ISLOADING_FALSE);
        commit(DELETE_AD_FROM_STATE, id);
      }
    } catch (error) {
      const notificationRules = {
        status: 'is-danger',
        timeout: 5000,
        message: i18n.t('store.adsModule.invalidDeleteMessage')
      };
      commit(OPEN_NOTIFICATION, notificationRules);
      commit(SET_ERROR, error.message);
      commit(ISLOADING_FALSE);
    }
  }
};

const mutations = {
  [SET_NEW_AD](state, newAd) {
    state.newAd = newAd;
    state.ads = [newAd, ...state.ads];
  },
  [SET_ADS](state, ads) {
    const newads = Object.keys(ads)
      .map((id) => ({ ...ads[id], id }))
      .reverse();
    state.ads = newads;
  },
  [SET_CURRENT_USER_ADS](state, ads) {
    const newAds = Object.keys(ads)
      .map((id) => ({ ...ads[id], id }))
      .sort((a, b) => b.Date - a.Date);
    state.currentUserAds = newAds;
  },
  [SET_MORE_ADS](state, ads) {
    const moreads = Object.keys(ads)
      .map((id) => ({ ...ads[id], id }))
      .reverse();
    moreads.shift();
    state.ads = [...state.ads, ...moreads];
  },
  [SET_CURRENT_AD](state, currentAd) {
    state.currentAd = currentAd;
  },
  [SET_UPDATED_CURRENT_AD](state, updatedAd) {
    state.currentAd = { ...state.currentAd, ...updatedAd };
    state.ads = state.ads.map((ad) => {
      if (ad.id === updatedAd.id) {
        return (ad = { ...ad, ...updatedAd });
      }
      return ad;
    });
  },
  [DELETE_AD_FROM_STATE](state, id) {
    state.ads = state.ads.filter((ad) => ad.id != id);
  }
  // [SET_SHALLOWS](state, shallows) {
  //   const shallowsItems = Object.keys(shallows).map((item) => ({ adId: item }));
  //   state.shallows = [...shallowsItems];
  //   console.log('SET_SHALLOWS', state.shallows);
  // }
};

export default {
  state,
  getters,
  actions,
  mutations
};
