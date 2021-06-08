<template>
  <div class="columns is-flex is-justify-content-center">
    <form class="column is-3 mt-5" @submit.prevent="onSubmit">
      <div class="has-text-centered is-size-3">{{ $t('common.login') }}</div>
      <div class="field mt-5">
        <div class="control has-icons-left has-icons-right">
          <input
            v-model.trim="$v.email.$model"
            class="input"
            :class="{ 'is-danger': $v.email.$error, 'is-success': !$v.email.$invalid }"
            type="email"
            :placeholder="$t('common.email')"
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
            type="text"
            :placeholder="$t('common.password')"
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
      <div class="is-flex is-justify-content-center">
        <button class="button is-info" type="submit" :disabled="$v.$invalid">
          {{ $t('components.login.confirm') }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { required, minLength, email } from 'vuelidate/lib/validators';

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: ''
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
  methods: {
    onSubmit() {
      const user = {
        email: this.email,
        password: this.password
      };
      console.log('onSubmit', user);
      this.email = '';
      this.password = '';
    }
  }
};
</script>
