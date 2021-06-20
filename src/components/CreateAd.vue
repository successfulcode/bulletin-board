<template>
  <div class="mt-4">
    <div v-if="$v.$invalid || isLoading || !consentToTheRules">
      <create-ad-alert :currentUser="`${$t('components.createAd.hello')} ${currentUser}!`" :alertText="$t('components.createAd.aboutFilelds')"></create-ad-alert>
    </div>
    <form
      class="mt-4"
      @submit.prevent="
        onSubmit();
        $v.$reset();
      "
    >
      <div class="field">
        <label class="label">{{ $t('components.createAd.category') }}</label>
        <div class="control">
          <div class="select">
            <select
              v-model="$v.adCategory.$model"
              class="input"
              :class="{ 'is-danger': $v.adCategory.$error, 'is-success': !$v.adCategory.$invalid }"
            >
              <option value="" disabled>
                ---{{ $t('components.createAd.selectCategory') }}---
              </option>
              <option value="Nekilnojamasis turta">
                {{ $t('components.createAd.realEstate') }}
              </option>
              <option value="Transportas">{{ $t('components.createAd.transport') }}</option>
              <option value="Darbas, verslas">{{ $t('components.createAd.workBusiness') }}</option>
              <option value="Namai, buitis">{{ $t('components.createAd.homHousehold') }}</option>
            </select>
          </div>
        </div>
      </div>

      <div class="field">
        <label class="label">{{ $t('components.createAd.ad') }}</label>
        <div class="control">
          <textarea
            v-model="$v.adText.$model"
            class="textarea"
            :class="{ 'is-danger': $v.adText.$error, 'is-success': !$v.adText.$invalid }"
            :placeholder="$t('components.createAd.adText')"
          ></textarea>
        </div>
      </div>

      <div class="field">
        <div class="control">
          <label class="checkbox">
            <input v-model="consentToTheRules" type="checkbox" />
            {{ $t('components.createAd.iAgreeWhith') }}
            {{ ' ' }}<a href="#">{{ $t('components.createAd.rules') }}</a>
          </label>
        </div>
      </div>

      <div class="field is-flex is-justify-content-left">
        <div class="column is-2">
          <input
            v-model="$v.adPrice.$model"
            name="price"
            class="input"
            :class="{ 'is-danger': $v.adPrice.$error, 'is-success': !$v.adPrice.$invalid }"
            type="number"
            :placeholder="$t('components.createAd.price')"
          />
          <p class="help">{{ $t('components.createAd.aboutPrice') }}</p>
        </div>
        <label for="price" class="label mt-5 ml-1 mr-5">{{ $t('components.createAd.eur') }}</label>
        <div class="column is-3">
          <input
            v-model="$v.adEmail.$model"
            class="input mr-4"
            :class="{ 'is-danger': $v.adEmail.$error, 'is-success': !$v.adEmail.$invalid }"
            type="text"
            :placeholder="'Email'"
          />
          <p class="help">{{ $t('components.createAd.aboutEmail') }}</p>
        </div>
        <div class="column is-3">
          <input
            v-model="$v.adTel.$model"
            class="input"
            :class="{ 'is-danger': $v.adTel.$error, 'is-success': !$v.adTel.$invalid }"
            type="text"
            :placeholder="'Tel'"
          />
          <p class="help">{{ $t('components.createAd.aboutTel') }}</p>
        </div>
      </div>

      <div class="field is-grouped">
        <div class="control">
          <button
            class="button is-link"
            type="submit"
            :class="{ 'is-loading': isLoading }"
            :disabled="$v.$invalid || isLoading || !consentToTheRules"
          >
            {{ $t('common.confirm') }}
          </button>
        </div>
        <div class="control">
          <button class="button is-link is-light" @click.prevent="clear">
            {{ $t('common.cancel') }}
          </button>
        </div>
      </div>
    </form>
    <div v-if="message.adText">
      <create-ad-messages :new-message="message"></create-ad-messages>
    </div>
  </div>
</template>

<script>
import CreateAdAlert from './CreateAdAlert.vue';
import CreateAdMessages from './CreateAdMessages.vue';
import { required, minLength, email } from 'vuelidate/lib/validators';
export default {
  name: 'CreateAd',
  components: { CreateAdMessages, CreateAdAlert },
  props: { message: Object, isLoading: Boolean, currentUser: String },
  data() {
    return {
      adCategory: '',
      adText: '',
      consentToTheRules: false,
      adPrice: '',
      adEmail: '',
      adTel: '',
      adDate: Date.now()
    };
  },
  validations: {
    adCategory: { required },
    adText: { required },
    adPrice: { required },
    adEmail: { required, email },
    adTel: { required, minLength: minLength(9) }
  },
  methods: {
    onSubmit() {
      const newMessage = {
        Category: this.adCategory,
        Text: this.adText,
        Price: this.adPrice,
        Email: this.adEmail,
        Tel: this.adTel,
        Date: this.adDate,
        Name: this.currentUser
      };
      this.$emit('addMessage', newMessage);
      this.clear();
    },
    clear() {
      this.adCategory = '';
      this.adText = '';
      this.adPrice = '';
      (this.adEmail = ''), (this.adTel = ''), (this.consentToTheRules = false);
    }
  }
};
</script>
