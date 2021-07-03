<template>
  <div class="columns is-flex is-justify-content-center mt-5">
    <form
      class="column is-5 mt-5 box"
      @submit.prevent="
        onSubmit(firstName, lastName, email, password);
        $v.$reset();
      "
    >
      <div class="has-text-centered is-size-3">{{ $t('common.signUp') }}</div>
      <div class="field mt-5">
        <div class="control has-icons-left has-icons-right">
          <input
            v-model.trim="$v.firstName.$model"
            class="input"
            :class="{
              'is-danger': $v.firstName.$error,
              'is-success': !$v.firstName.$invalid
            }"
            type="text"
            :placeholder="$t('views.signUp.firstName')"
            :disabled="isLoading"
          />
          <span class="icon is-small is-left">
            <font-awesome-icon :icon="['fa', 'user']" class="mt-3 ml-2" />
          </span>
          <span class="icon is-small is-right">
            <font-awesome-icon
              v-if="$v.firstName.$error"
              :icon="['fa', 'exclamation-triangle']"
              class="mt-3 ml-2"
            />
            <font-awesome-icon
              v-else-if="!$v.firstName.$invalid"
              :icon="['fa', 'check']"
              class="mt-3 ml-2"
            />
          </span>
        </div>
        <p v-if="$v.firstName.$dirty && !$v.firstName.required" class="help is-danger">
          {{ $t('common.fieldIsrequired') }}
        </p>
      </div>
      <div class="field">
        <div class="control has-icons-left has-icons-right">
          <input
            v-model.trim="$v.lastName.$model"
            class="input"
            :class="{
              'is-danger': $v.lastName.$error,
              'is-success': !$v.lastName.$invalid
            }"
            type="text"
            :placeholder="$t('views.signUp.lastName')"
            :disabled="isLoading"
          />
          <span class="icon is-small is-left">
            <font-awesome-icon :icon="['fa', 'user']" class="mt-3 ml-2" />
          </span>
          <span class="icon is-small is-right">
            <font-awesome-icon
              v-if="$v.firstName.$error"
              :icon="['fa', 'exclamation-triangle']"
              class="mt-3 ml-2"
            />
            <font-awesome-icon
              v-else-if="!$v.lastName.$invalid"
              :icon="['fa', 'check']"
              class="mt-3 ml-2"
            />
          </span>
        </div>
        <p v-if="$v.lastName.$dirty && !$v.lastName.required" class="help is-danger">
          {{ $t('common.fieldIsrequired') }}
        </p>
      </div>
      <div class="field">
        <div class="control has-icons-left has-icons-right">
          <input
            v-model.trim="$v.email.$model"
            class="input"
            :class="{
              'is-danger': $v.email.$error,
              'is-success': !$v.email.$invalid
            }"
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
          {{ $t('views.signUp.invalidEmail') }}
        </p>
      </div>
      <div class="field">
        <div class="control has-icons-left has-icons-right">
          <input
            v-model.trim="$v.password.$model"
            class="input"
            :class="{
              'is-danger': $v.password.$error,
              'is-success': !$v.password.$invalid
            }"
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
          {{ $t('views.signUp.checkPassword') }}
        </p>
      </div>
      <div class="field">
        <div class="control has-icons-left has-icons-right">
          <input
            v-model.trim="$v.password2.$model"
            class="input"
            :class="{
              'is-danger': $v.password2.$error,
              'is-success': !$v.password2.$invalid
            }"
            type="password"
            :placeholder="$t('views.signUp.confirmPassword')"
            :disabled="isLoading"
          />
          <span class="icon is-small is-left">
            <font-awesome-icon :icon="['fa', 'lock']" class="mt-3 ml-2" />
          </span>
          <span class="icon is-small is-right">
            <font-awesome-icon
              v-if="$v.password2.$error"
              :icon="['fa', 'exclamation-triangle']"
              class="mt-3 ml-2"
            />
            <font-awesome-icon
              v-else-if="!$v.password2.$invalid"
              :icon="['fa', 'check']"
              class="mt-3 ml-2"
            />
          </span>
        </div>
        <p v-if="$v.password2.$dirty && !$v.password2.required" class="help is-danger">
          {{ $t('common.fieldIsrequired') }}
        </p>
        <p v-else-if="$v.password2.$dirty && !$v.password2.sameAs" class="help is-danger">
          {{ $t('views.signUp.password2') }}
        </p>
      </div>
      <div class="is-flex is-justify-content-center">
        <button class="button is-info" type="submit" :disabled="$v.$invalid || isLoading">
          {{ $t('views.login.confirm') }}
        </button>
      </div>
      <div class="mt-2 has-text-centered">
        <p>
          {{ $t('views.signUp.haveAnAccount') }}{{ ' ' }}{{ $t('views.signUp.create') }}
          <strong>
            <router-link to="/login">
              {{ $t('views.signUp.here') }}
            </router-link>
          </strong>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
import { required, minLength, email, sameAs } from 'vuelidate/lib/validators';
import { SIGN_UP } from '@/store/actions.types';
import { mapState } from 'vuex';

export default {
  name: 'SignUp',
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      password2: ''
    };
  },
  validations: {
    firstName: {
      required
    },
    lastName: {
      required
    },
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6)
    },
    password2: {
      required,
      sameAs: sameAs('comparePasswords')
    }
  },
  computed: {
    comparePasswords() {
      return this.password;
    },
    ...mapState({
      isAuthenticated: (state) => state.auth.isAuthenticated,
      isLoading: (state) => state.auth.isLoading
    })
  },
  watch: {
    isAuthenticated: function () {
      this.isAuthenticated && this.$router.push('dashboard');
    }
  },
  methods: {
    onSubmit(firstName, lastName, email, password) {
      this.$store.dispatch(SIGN_UP, { firstName, lastName, email, password });
    }
  }
};
</script>
