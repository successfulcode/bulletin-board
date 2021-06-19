<template>
  <div class="mt-4">
    <div>
      <create-ad-alert :alert-text="$t('components.createAd.aboutFilelds')"></create-ad-alert>
    </div>
    <form class="mt-4" @submit.prevent="onSubmit">
      <div class="field">
        <label class="label">{{ $t('components.createAd.category') }}</label>
        <div class="control">
          <div class="select">
            <select v-model="adCategory">
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
            v-model="adText"
            class="textarea"
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
            v-model="adPrice"
            name="price"
            class="input"
            type="number"
            :placeholder="$t('components.createAd.price')"
          />
          <p class="help">{{ $t('components.createAd.aboutPrice') }}</p>
        </div>
        <label for="price" class="label mt-5 ml-1 mr-5">{{ $t('components.createAd.eur') }}</label>
        <div class="column is-3">
          <input v-model="adEmail" class="input mr-4" type="text" :placeholder="'Email'" />
          <p class="help">{{ $t('components.createAd.aboutEmail') }}</p>
        </div>
        <div class="column is-3">
          <input v-model="adTel" class="input" type="text" :placeholder="'Tel'" />
          <p class="help">{{ $t('components.createAd.aboutTel') }}</p>
        </div>
      </div>

      <div class="field is-grouped">
        <div class="control">
          <button
            class="button is-link"
            type="submit"
            :class="{ 'is-loading': isLoading }"
            :disabled="isLoading || !adText || !adCategory || !consentToTheRules"
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
export default {
  name: 'CreateAd',
  components: { CreateAdMessages, CreateAdAlert },
  props: { message: Object, isLoading: Boolean },
  data() {
    return {
      adCategory: '',
      adText: '',
      consentToTheRules: false,
      adPrice: '',
      adEmail: '',
      adTel: ''
    };
  },
  methods: {
    onSubmit() {
      const newMessage = {
        adCategory: this.adCategory,
        adText: this.adText,
        adPrice: this.adPrice,
        adEmail: this.adEmail,
        adTel: this.adTel
      };
      this.$emit('addMessage', newMessage);
      console.log('addMessage', newMessage);
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
