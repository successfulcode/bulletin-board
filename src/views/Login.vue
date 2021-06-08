<template>
  <div class="columns is-flex is-justify-content-center">
    <form class="column is-3 mt-5" @submit.prevent="onSubmit">
      <div class="has-text-centered is-size-3">{{ $t('common.login') }}</div>
      <div class="field mt-5">
        <div class="control has-icons-left has-icons-right">
          <input
            class="input is-danger"
            type="email"
            :placeholder="$t('common.email')"
            v-model="email"
          />
          <span class="icon is-small is-left">
            <font-awesome-icon :icon="['fa', 'envelope']" class="mt-3 ml-2" />
          </span>
          <span class="icon is-small is-right">
            <font-awesome-icon
              v-if="isInvalid"
              :icon="['fa', 'exclamation-triangle']"
              class="mt-3 ml-2"
            />
            <font-awesome-icon v-else :icon="['fa', 'check']" class="mt-3 ml-2" />
          </span>
        </div>
        <p class="help is-danger">This email is invalid</p>
      </div>
      <div class="field">
        <div class="control has-icons-left has-icons-right">
          <input
            class="input is-danger"
            type="text"
            :placeholder="$t('common.password')"
            v-model="password"
          />
          <span class="icon is-small is-left">
            <font-awesome-icon :icon="['fa', 'lock']" class="mt-3 ml-2" />
          </span>
          <span class="icon is-small is-right">
            <font-awesome-icon
              v-if="isInvalid"
              :icon="['fa', 'exclamation-triangle']"
              class="mt-3 ml-2"
            />
            <font-awesome-icon v-else :icon="['fa', 'check']" class="mt-3 ml-2" />
          </span>
        </div>
        <p class="help is-danger">This email is invalid</p>
      </div>
      <div class="is-flex is-justify-content-center">
        <button class="button is-info" type="submit" :disabled="isInvalid">
          {{ $t('components.login.confirm') }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      isInvalid: true,
      email: '',
      password: ''
    };
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

<style></style>
