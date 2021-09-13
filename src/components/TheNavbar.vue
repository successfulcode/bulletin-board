<template>
  <div>
    <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <router-link class="navbar-item has-text-dark" to="/ads">BULLETIN</router-link>
        <button
          role="button"
          class="navbar-burger"
          :class="burgerIsActive && 'is-active'"
          aria-label="menu"
          aria-expanded="false"
          data-target="bulletinNavbar"
          @click="toggleBurger"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </button>
      </div>
      <div id="bulletinNavbar" class="navbar-menu" :class="burgerIsActive && 'is-active'">
        <div v-if="isAuthenticated" class="navbar-start">
          <router-link to="/dashboard" class="navbar-item">{{
            $t('components.theNavbar.createAd')
          }}</router-link>
          <router-link to="/ads" class="navbar-item">{{
            $t('components.theNavbar.allAds')
          }}</router-link>
          <router-link to="/currentuserads" class="navbar-item">{{
            $t('components.theNavbar.currentuserads')
          }}</router-link>
        </div>
        <div v-else class="navbar-start">
          <router-link to="/ads" class="navbar-item">{{
            $t('components.theNavbar.allAds')
          }}</router-link>
        </div>
      </div>
      <div class="navbar-end">
        <div v-if="isAuthenticated" class="navbar-item mr-2">
          <div class="navbar-item has-dropdown is-hoverable">
            <strong class="mr-2 name" @click="toggleProfileModal"
              >{{ currentUser.displayName }}
            </strong>
            <div class="edit-container navbar-dropdown is-boxed mt-1">
              <router-link to="/editprofile">
                <span class="edit">
                  {{ $t('components.theNavbar.editProfile') }}
                  <font-awesome-icon :icon="['fa', 'cog']" class="ml-1" />
                </span>
              </router-link>
            </div>
          </div>
          <div class="mr-2 pb-1">
            <figure class="image is-24x24">
              <img
                class="is-rounded"
                :src="currentUser.photoUrl ? currentUser.photoUrl : defaultProfilePicture"
                alt="profile"
              />
            </figure>
          </div>

          <div>
            <button class="button is-light" @click="logout">
              {{ $t('components.theNavbar.logout') }}
            </button>
          </div>
        </div>
        <div v-else class="buttons">
          <router-link to="/signup" class="button is-info">
            <strong>{{ $t('common.signUp') }}</strong>
          </router-link>
          <router-link to="/login" class="button is-light">{{ $t('common.login') }}</router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { LOGOUT } from '@/store/actions.types';
import profile from '@/assets/pictures/profile.png';
export default {
  name: 'TheNavbar',
  data() {
    return {
      burgerIsActive: false,
      isPorfileModalOpen: false,
      defaultProfilePicture: profile
    };
  },
  computed: {
    ...mapGetters(['currentUser', 'isAuthenticated'])
  },
  methods: {
    logout() {
      this.$store.dispatch(LOGOUT).then(() => this.$router.push('login'));
    },
    toggleBurger() {
      this.burgerIsActive = !this.burgerIsActive;
    },
    toggleProfileModal() {
      this.isPorfileModalOpen = !this.isPorfileModalOpen;
    }
  }
};
</script>

<style scoped>
.name {
  cursor: pointer;
}
.edit {
  cursor: pointer;
}
.edit-container {
  text-align: center;
}
@media only screen and (max-width: 1020px) {
  .edit-container {
    text-align: left;
  }
}
.edit:hover {
  color: rgb(133, 133, 133);
}
</style>
