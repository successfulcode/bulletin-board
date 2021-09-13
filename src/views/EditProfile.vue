<template>
  <div class="is-flex is-justify-content-center">
    <form
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
          <button class="button is-link" type="submit" :disabled="$v.$invalid">
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
      defaultProfilePicture: profile
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
    this.idToken = localStorage.getItem('idToken');
  },
  methods: {
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
.edit-form {
  max-width: 35rem;
  width: 100%;
}
.is-rounded {
  border: 1px solid #00d1b2;
}
</style>
