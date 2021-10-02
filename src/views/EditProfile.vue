<template>
  <div class="edit-container is-flex is-justify-content-center mt-4 p-3">
    <div class="edit-form mt-6">
      <div class="tabs is-boxed">
        <ul>
          <li :class="[currentTab === 'profile' && 'is-active']">
            <span @click="toggleTabHandler('profile')">
              <a>
                <span class="icon is-small">
                  <font-awesome-icon :icon="['fa', 'id-badge']" />
                </span>
                <span>
                  {{ $t('views.editProfile.profile') }}
                </span>
              </a>
            </span>
          </li>
          <li :class="[currentTab === 'passwords' && 'is-active']">
            <span @click="toggleTabHandler('passwords')">
              <a>
                <span class="icon is-small">
                  <font-awesome-icon :icon="['fa', 'unlock-alt']" />
                </span>
                <span> {{ $t('views.editProfile.passwords') }}</span>
              </a>
            </span>
          </li>
        </ul>
      </div>
      <form
        v-if="currentTab === 'profile'"
        class="edit-form mt-6"
        @submit.prevent="
          onSumbmitChangedProfile();
          $v.$reset();
          $router.go(-1);
        "
      >
        <div class="field is-flex is-justify-content-center">
          <figure class="image is-128x128" @click="toggleModalProfile">
            <img class="is-rounded" :src="defaultProfilePicture" alt="profile" />
          </figure>
        </div>
        <div class="field">
          <label class="label">{{ $t('common.name') }}</label>
          <input
            v-model="$v.displayName.$model"
            class="input mr-1"
            :class="{
              'is-danger': $v.displayName.$error,
              'is-success': !$v.displayName.$invalid
            }"
            type="text"
            :placeholder="$t('common.name')"
          />
        </div>
        <div class="field">
          <label class="label">{{ $t('common.email') }}</label>
          <input
            v-model="$v.email.$model"
            class="input mr-1"
            :class="{
              'is-danger': $v.email.$error,
              'is-success': !$v.email.$invalid
            }"
            type="text"
            :placeholder="$t('common.email')"
          />
        </div>
        <div class="field is-grouped mb-4">
          <div class="control">
            <button
              class="button is-link"
              type="submit"
              :disabled="
                $v.displayName.$invalid ||
                $v.email.$invalid ||
                (displayName === currentUser.displayName && email === currentUser.email)
              "
            >
              {{ $t('common.confirm') }}
            </button>
          </div>
          <div class="control">
            <button class="button is-link is-light" type="reset" @click.stop="$router.go(-1)">
              {{ $t('common.cancel') }}
            </button>
          </div>
        </div>
      </form>
      <form
        v-else-if="currentTab === 'passwords'"
        @submit.prevent="
          onSumbmitChangedPassword();
          $v.$reset();
          $router.go(-1);
        "
      >
        <div class="field">
          <label class="label">{{ $t('views.editProfile.newPassword') }}</label>
          <input
            v-model="$v.newPassword.$model"
            class="input mr-1"
            :class="{
              'is-danger': $v.newPassword.$error,
              'is-success': !$v.newPassword.$invalid
            }"
            type="password"
          />
        </div>
        <div class="field">
          <label class="label">{{ $t('views.editProfile.confirNewPassword') }}</label>
          <input
            v-model="$v.confirNewPassword.$model"
            class="input mr-1"
            :class="{
              'is-danger': $v.confirNewPassword.$error,
              'is-success': !$v.confirNewPassword.$invalid
            }"
            type="password"
          />
        </div>
        <div class="field is-grouped mb-4">
          <div class="control">
            <button
              class="button is-link"
              type="submit"
              :disabled="$v.newPassword.$invalid || $v.confirNewPassword.$invalid"
            >
              {{ $t('common.confirm') }}
            </button>
          </div>
          <div class="control">
            <button class="button is-link is-light" type="reset" @click.stop="$router.go(-1)">
              {{ $t('common.cancel') }}
            </button>
          </div>
        </div>
      </form>
      <div>
        <edit-profile-photo
          :is-modal-open="isPhotoModalOpen"
          @toggleModal="toggleModalProfile"
        ></edit-profile-photo>
      </div>
    </div>
  </div>
</template>

<script>
import profile from '@/assets/pictures/profile.png';
import { required, minLength, email, sameAs } from 'vuelidate/lib/validators';
import { UPDATE, SET_NEW_PASSWORD } from '@/store/actions.types';
import { mapGetters } from 'vuex';
import EditProfilePhoto from '../components/EditProfilePhoto.vue';

export default {
  name: 'EditProfile',
  components: { EditProfilePhoto },
  data() {
    return {
      displayName: '',
      email: '',
      photo: null,
      tel: null,
      about: '',
      idToken: null,
      defaultProfilePicture: profile,
      currentTab: 'profile',
      newPassword: '',
      confirNewPassword: '',
      isPhotoModalOpen: false
    };
  },
  validations: {
    displayName: { required, minLength: minLength(1) },
    email: { required, email },
    newPassword: {
      required,
      minLength: minLength(6)
    },
    confirNewPassword: {
      required,
      sameAs: sameAs('comparePasswords')
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'isAuthenticated']),
    comparePasswords() {
      return this.newPassword;
    }
  },
  mounted() {
    this.displayName = this.currentUser.displayName;
    this.email = this.currentUser.email;
    const { idToken } = JSON.parse(localStorage.getItem('tokens'));
    this.idToken = idToken;
  },
  methods: {
    toggleTabHandler(tabName) {
      this.currentTab = tabName;
    },
    onSumbmitChangedProfile() {
      this.$store.dispatch(UPDATE, {
        idToken: this.idToken,
        displayName: this.displayName,
        email: this.email,
        photoUrl:
          'https://firebasestorage.googleapis.com/v0/b/bulletin-board-sm.appspot.com/o/imges%2Fundefined%2F1630958154553house.jpg?alt=media&amp;token=f5af5931-bed4-4e7a-83b7-1c58e8a743e6&quot;'
      });
    },
    onSumbmitChangedPassword() {
      const { email } = JSON.parse(localStorage.getItem('tokens'));
      this.$store.dispatch(SET_NEW_PASSWORD, {
        idToken: this.idToken,
        email: email,
        password: this.newPassword
      });
      console.log(this.oldPassword, this.newPassword, this.confirNewPassword);
    },
    toggleModalProfile() {
      this.isPhotoModalOpen = !this.isPhotoModalOpen;
    }
  }
};
</script>

<style scoped>
.edit-container {
  min-height: 100vh;
  max-width: 34rem;
  margin: auto;
}
.edit-form {
  width: 100%;
}
.is-rounded {
  border: 1px solid #48c774;
}
.image {
  cursor: pointer;
}
</style>
