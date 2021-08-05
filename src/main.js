import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import i18n from './i18n';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faLock,
  faEnvelope,
  faExclamationTriangle,
  faCheck,
  faUser,
  faUpload,
  faTimesCircle,
  faCheckCircle,
  faEdit
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Vuelidate from 'vuelidate';
import VueMoment from 'vue-moment';
import firebase from 'firebase';
import { firebaseConfig } from './utils/firebaseConfig';
import VueObserveVisibility from 'vue-observe-visibility';

firebase.initializeApp(firebaseConfig);

library.add(
  faLock,
  faEnvelope,
  faExclamationTriangle,
  faCheck,
  faUser,
  faUpload,
  faTimesCircle,
  faCheckCircle,
  faEdit
);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

Vue.use(VueObserveVisibility);
Vue.use(Vuelidate);
Vue.use(VueMoment);

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App)
}).$mount('#app');
