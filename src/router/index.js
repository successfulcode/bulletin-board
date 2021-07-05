import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '@/views/Login.vue';
import SignUp from '@/views/SignUp.vue';
import Dashboard from '@/views/Dashboard.vue';
import Ads from '@/views/Ads.vue';
import CurrentUserAds from '@/views/CurrentUserAds.vue';
import NotFound from '@/views/NotFound.vue';
import store from '@/store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    alias: '/',
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/currentuserads',
    name: 'CurrentUserAds',
    component: CurrentUserAds,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/ads',
    name: 'Ads',
    component: Ads,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.state.auth.isAuthenticated) {
      next();
    } else {
      next({
        path: '/login'
        // query: {
        //   errorMessage: 'Unauthorized'
        // }
      });
    }
  } else {
    next();
  }
});

export default router;
