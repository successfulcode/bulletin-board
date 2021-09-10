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
      <div class="field">
        <label class="label">{{ $t('common.tel') }}</label>
        <input
          v-model="$v.tel.$model"
          class="input"
          maxlength="12"
          :class="{
            'is-danger': $v.tel.$error,
            'is-success': !$v.tel.$invalid
          }"
          type="tel"
          :placeholder="$t('common.tel')"
        />
      </div>
      <div class="field">
        <label class="label">{{ $t('common.about') }}</label>
        <textarea
          v-model="about"
          class="textarea"
          maxlength="12"
          :class="{
            'is-success': about
          }"
          type="textbox"
          :placeholder="$t('common.about')"
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
      idToken: null
    };
  },
  validations: {
    displayName: { required, minLength: minLength(1) },
    email: { required, email },
    tel: { required, minLength: minLength(9) }
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
        email: this.email,
        photo: this.photo,
        tel: this.tel,
        about: this.about
      };
      console.log('submit', newItem);
      this.$store.dispatch(UPDATE, {
        idToken: this.idToken,
        displayName: this.displayName,
        email: this.email
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
</style>
