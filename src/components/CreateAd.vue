<template>
  <div class="mt-4">
    <div>
      <create-ad-alert :AlertText="$t('components.createAd.aboutFilelds')"></create-ad-alert>
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
            {{' '}}<a href="#">{{ $t('components.createAd.rules') }}</a>
          </label>
        </div>
      </div>

      <div class="field is-flex is-justify-content-left">
        <div>
          <input class="input" type="number" v-model="price" :placeholder="$t('components.createAd.price')" />
          <p class="help">{{ $t('components.createAd.aboutPrice') }}</p>
        </div>
        <label class="label mt-2 ml-2">{{ $t('components.createAd.eur') }}</label>
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
      price:''
    };
  },
  methods: {
    onSubmit() {
      const newMessage = {
        adCategory: this.adCategory,
        adText: this.adText
      };
      this.$emit('addMessage', newMessage);
    },
    clear() {
      this.adCategory = '';
      this.adText = '';
      this.price = '';
      this.consentToTheRules = false;
    }
  }
};
</script>
