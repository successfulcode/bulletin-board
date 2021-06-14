<template>
  <div class="columns is-flex is-justify-content-center">
    <form
      class="column is-3 mt-5"
      @submit.prevent="
        onSubmit(email, password);
        $v.$reset();
      "
    >
      <div class="has-text-centered is-size-3">{{ $t('common.login') }}</div>
      <div>
        <div class="field mt-5">
          <div class="control has-icons-left has-icons-right">
            <input
              v-model.trim="$v.email.$model"
              class="input"
              :class="{ 'is-danger': $v.email.$error, 'is-success': !$v.email.$invalid }"
              type="email"
              :placeholder="$t('common.email')"
              :disabled="isLoading"
            />
            <span class="icon is-small is-left">
              <font-awesome-icon :icon="['fa', 'envelope']" class="mt-3 ml-2" />
            </span>
            <span class="icon is-small is-right">
              <font-awesome-icon
                v-if="$v.email.$error"
                :icon="['fa', 'exclamation-triangle']"
                class="mt-3 ml-2"
              />
              <font-awesome-icon
                v-else-if="!$v.email.$invalid"
                :icon="['fa', 'check']"
                class="mt-3 ml-2"
              />
            </span>
          </div>
          <p v-if="$v.email.$dirty && !$v.email.required" class="help is-danger">
            {{ $t('common.fieldIsrequired') }}
          </p>
          <p v-else-if="$v.email.$dirty && !$v.email.email" class="help is-danger">
            {{ $t('components.login.invalidEmail') }}
          </p>
        </div>
        <div class="field">
          <div class="control has-icons-left has-icons-right">
            <input
              v-model.trim="$v.password.$model"
              class="input"
              :class="{ 'is-danger': $v.password.$error, 'is-success': !$v.password.$invalid }"
              type="password"
              :placeholder="$t('common.password')"
              :disabled="isLoading"
            />
            <span class="icon is-small is-left">
              <font-awesome-icon :icon="['fa', 'lock']" class="mt-3 ml-2" />
            </span>
            <span class="icon is-small is-right">
              <font-awesome-icon
                v-if="$v.password.$error"
                :icon="['fa', 'exclamation-triangle']"
                class="mt-3 ml-2"
              />
              <font-awesome-icon
                v-else-if="!$v.password.$invalid"
                :icon="['fa', 'check']"
                class="mt-3 ml-2"
              />
            </span>
          </div>
          <p v-if="$v.password.$dirty && !$v.password.required" class="help is-danger">
            {{ $t('common.fieldIsrequired') }}
          </p>
          <p v-else-if="$v.password.$dirty && !$v.password.minLength" class="help is-danger">
            {{ $t('components.login.checkPassword') }}
          </p>
        </div>
      </div>
      <div class="is-flex is-justify-content-center mt-4">
        <button
          class="button is-info"
          :class="{ 'is-loading': isLoading }"
          type="submit"
          :disabled="$v.$invalid || isLoading"
        >
          {{ $t('components.login.confirm') }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { required, minLength, email } from 'vuelidate/lib/validators';
import { mapState } from 'vuex';
import { LOGIN } from '@/store/actions.types';

export default {
  name: 'Login',

  data() {
    return {
      email: 'test@test.lt',
      password: '123456'
    };
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6)
    }
  },
  computed: {
    ...mapState({
      isAuthenticated: (state) => state.auth.isAuthenticated,
      isLoading: (state) => state.auth.isLoading,
      isErrors: (state) => state.auth.errors
    })
  },
  methods: {
    onSubmit(email, password) {
      this.$store.dispatch(LOGIN, { email, password });
      this.isAuthenticated && this.$router.push('dashboard');
      this.email = '';
      this.password = '';
    }
  }
};
</script>
