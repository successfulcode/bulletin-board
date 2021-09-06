<template>
  <div class="mt-4 px-4">
    <div v-if="$v.$invalid || isLoading || !consentToTheRules">
      <create-ad-alert
        :current-user="`${$t('components.createAd.hello')} ${currentUser}!`"
        :alert-text="$t('components.createAd.aboutFilelds')"
      ></create-ad-alert>
    </div>
    <form
      class="mt-4"
      @submit.prevent="
        onSubmit();
        $v.$reset();
      "
    >
      <div class="field">
        <label class="label" for="category">{{ $t('components.createAd.category') }}</label>
        <div class="control">
          <div class="select">
            <select
              v-model="$v.adCategory.$model"
              class="input"
              :class="{
                'is-danger': $v.adCategory.$error,
                'is-success': !$v.adCategory.$invalid
              }"
              name="category"
            >
              <option value="" disabled>
                ---{{ $t('components.createAd.selectCategory') }}---
              </option>
              <option :value="$t('components.createAd.realEstate')">
                {{ $t('components.createAd.realEstate') }}
              </option>
              <option :value="$t('components.createAd.transport')">
                {{ $t('components.createAd.transport') }}
              </option>
              <option :value="$t('components.createAd.workBusiness')">
                {{ $t('components.createAd.workBusiness') }}
              </option>
              <option :value="$t('components.createAd.homHousehold')">
                {{ $t('components.createAd.homHousehold') }}
              </option>
              <option :value="$t('components.createAd.other')">
                {{ $t('components.createAd.other') }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <div class="is-flex mb-2">
        <button v-if="suggest" class="button is-success" @click.prevent="toggleSuggest">
          {{ $t('components.createAd.suggest') }}
          <font-awesome-icon :icon="['fa', 'check-circle']" class="ml-1" />
        </button>
        <button v-else class="button is-light px-5" @click.prevent="toggleSuggest">
          {{ $t('components.createAd.suggest') }}
        </button>
        <div class="pt-2 mx-1">arba</div>
        <button v-if="!suggest" class="button is-warning" @click.prevent="toggleSuggest">
          {{ $t('components.createAd.lookingFor') }}
          <font-awesome-icon :icon="['fa', 'check-circle']" class="ml-1" />
        </button>
        <button v-else class="button is-light px-5" @click.prevent="toggleSuggest">
          {{ $t('components.createAd.lookingFor') }}
        </button>
      </div>

      <div class="field">
        <label class="label">{{ $t('components.createAd.ad') }}</label>
        <div class="control">
          <textarea
            v-model="$v.adText.$model"
            name="adtext"
            class="textarea"
            :class="{
              'is-danger': $v.adText.$error,
              'is-success': !$v.adText.$invalid
            }"
            :placeholder="$t('components.createAd.adText')"
          ></textarea>
        </div>
      </div>

      <div class="field">
        <div class="control">
          <label class="checkbox">
            <input v-model="consentToTheRules" type="checkbox" />
            {{ $t('components.createAd.iAgreeWhith') }}
            {{ ' ' }}<router-link to="/rules">{{ $t('components.createAd.rules') }}</router-link>
          </label>
        </div>
      </div>
      <div class="field is-flex">
        <div class="pl-0">
          <input
            v-model="$v.adPrice.$model"
            name="price"
            class="input"
            :class="{
              'is-danger': $v.adPrice.$error,
              'is-success': !$v.adPrice.$invalid
            }"
            type="number"
            :placeholder="$t('common.price')"
          />
          <p class="help">{{ $t('components.createAd.aboutPrice') }}</p>
        </div>
        <label for="price" class="label mt-4 ml-1 mr-2">{{ $t('common.eur') }}</label>
      </div>
      <div class="field is-flex is-justify-content-left is-flex-wrap-wrap">
        <div class="mr-3">
          <input
            v-model="$v.adEmail.$model"
            class="input mr-1"
            :class="{
              'is-danger': $v.adEmail.$error,
              'is-success': !$v.adEmail.$invalid
            }"
            type="text"
            :placeholder="$t('common.email')"
          />
          <p class="help">{{ $t('components.createAd.aboutEmail') }}</p>
        </div>
        <div class="mr-3">
          <input
            v-model="$v.adTel.$model"
            class="input"
            maxlength="12"
            :class="{
              'is-danger': $v.adTel.$error,
              'is-success': !$v.adTel.$invalid
            }"
            type="tel"
            :placeholder="$t('common.tel')"
          />
          <p class="help">{{ $t('components.createAd.aboutTel') }}</p>
        </div>
        <div>
          <CreateAdCities @setCity="addCity" />
          <p class="help">{{ $t('components.createAd.aboutCity') }}</p>
        </div>
      </div>
      <create-images
        ref="imagesComponent"
        :create-ad-success="createAdSuccess"
        @addImages="addImages"
      ></create-images>
      <div class="field is-grouped mb-4">
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
          <button
            class="button is-link is-light"
            type="reset"
            @click.prevent="
              clear();
              deleteAllImg();
            "
          >
            {{ $t('common.cancel') }}
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import CreateAdAlert from './CreateAdAlert.vue';
import CreateAdCities from './CreateAdCities.vue';
import { required, minLength, email } from 'vuelidate/lib/validators';
import CreateImages from './CreateImages.vue';
import i18n from '../i18n';

export default {
  name: 'CreateAd',
  components: { CreateAdAlert, CreateAdCities, CreateImages },
  props: {
    isLoading: Boolean,
    currentUser: { type: String },
    userLocalid: { type: String }
  },
  data() {
    return {
      adCategory: '',
      adText: '',
      consentToTheRules: false,
      adPrice: '',
      adEmail: '',
      adTel: '',
      adDate: Date.now(),
      images: [],
      suggest: true,
      city: i18n.t('cities.allCities'),
      createAdSuccess: false
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
      const newAd = {
        Category: this.adCategory,
        Text: this.adText,
        Price: this.adPrice,
        Email: this.adEmail,
        Tel: this.adTel,
        Date: this.adDate,
        Name: this.currentUser,
        Images: this.images,
        Suggest: this.suggest,
        City: this.city
      };
      this.createAdSuccess = true;
      this.$emit('addAd', newAd);
      this.$refs.imagesComponent.clearImages();
      this.clear();
      this.images = [];
      this.$router.push('ads');
    },
    clear() {
      this.adCategory = '';
      this.adText = '';
      this.adPrice = '';
      this.adTel = '';
      this.consentToTheRules = false;
    },

    toggleSuggest() {
      this.suggest = !this.suggest;
    },
    addCity(city) {
      this.city = city;
    },
    addImages(images) {
      this.images = images;
    }
  }
};
</script>

<style scoped>
.input {
  width: 17rem;
}
</style>
