<template>
  <div class="edit-container is-flex is-justify-content-center mt-4">
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
          onSubmit();
          $v.$reset();
          $router.go(-1);
        "
      >
        <div class="field is-flex is-justify-content-center">
          <figure class="image is-128x128">
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
                $v.$invalid ||
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
      <form v-else-if="currentTab === 'passwords'" action="">
        <div class="field">
          <label class="label">{{ $t('views.editProfile.oldPassword') }}</label>
          <input
            v-model="$v.displayName.$model"
            class="input mr-1"
            :class="{
              'is-danger': $v.displayName.$error,
              'is-success': !$v.displayName.$invalid
            }"
            type="text"
          />
        </div>
        <div class="field">
          <label class="label">{{ $t('views.editProfile.newPassword') }}</label>
          <input
            v-model="$v.email.$model"
            class="input mr-1"
            :class="{
              'is-danger': $v.email.$error,
              'is-success': !$v.email.$invalid
            }"
            type="text"
          />
        </div>
        <div class="field">
          <label class="label">{{ $t('views.editProfile.confirNewPassword') }}</label>
          <input
            v-model="$v.email.$model"
            class="input mr-1"
            :class="{
              'is-danger': $v.email.$error,
              'is-success': !$v.email.$invalid
            }"
            type="text"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import profile from '@/assets/pictures/profile.png';
import { required, minLength, email } from 'vuelidate/lib/validators';
import { UPDATE } from '@/store/actions.types';
import { mapGetters } from 'vuex';

export default {
  name: 'EditProfile',
  data() {
    return {
      displayName: '',
      email: '',
      photo: null,
      tel: null,
      about: '',
      idToken: null,
      defaultProfilePicture: profile,
      currentTab: 'profile'
    };
  },
  validations: {
    displayName: { required, minLength: minLength(1) },
    email: { required, email }
  },
  computed: {
    ...mapGetters(['currentUser', 'isAuthenticated'])
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
    onSubmit() {
      const newItem = {
        displayName: this.displayName,
        email: this.email
      };
      console.log('submit', newItem);
      this.$store.dispatch(UPDATE, {
        idToken: this.idToken,
        displayName: this.displayName,
        email: this.email,
        photoUrl:
          'https://firebasestorage.googleapis.com/v0/b/bulletin-board-sm.appspot.com/o/imges%2Fundefined%2F1630958154553house.jpg?alt=media&amp;token=f5af5931-bed4-4e7a-83b7-1c58e8a743e6&quot;'
      });
    }
  }
};
</script>

<style scoped>
.edit-container {
  min-height: 100vh;
}
.edit-form {
  min-width: 35rem;
}
.is-rounded {
  border: 1px solid #48c774;
}
</style>
