<template>
  <div>
    <form @submit.prevent="onSubmit">
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
            {{ $t('components.createAd.iAgreeWhith') }}{{ ' '
            }}<a href="#">{{ $t('components.createAd.rules') }}</a>
          </label>
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
          <!-- fix cancel button, it make post request -->
          <button class="button is-link is-light" @click="clear">
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
import CreateAdMessages from './CreateAdMessages.vue';
export default {
  name: 'CreateAd',
  components: { CreateAdMessages },
  props: { message: Object, isLoading: Boolean },
  data() {
    return {
      adCategory: '',
      adText: '',
      consentToTheRules: false
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
    }
  }
};
</script>
