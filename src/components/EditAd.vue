<template>
  <div>
    <div class="modal-background" @click="$emit('toggleShowModal')"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ $t('components.editAd.editMode') }}</p>
        <button class="delete" aria-label="close" @click="$emit('toggleShowModal')"></button>
      </header>
      <section class="modal-card-body">
        <p>
          <span class="mr-1">{{ $t('components.editAd.adNr') }}</span>
          <span>{{ adId }}</span>
        </p>
        <p>{{ currentAd.Name }}</p>
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
          <div class="mt-2">
            <label class="label" for="email">{{ $t('common.email') }}</label>
            <input
              v-model="$v.adEmail.$model"
              class="input"
              :class="{
                'is-danger': $v.adEmail.$error,
                'is-success': !$v.adEmail.$invalid
              }"
              type="text"
              :placeholder="$t('common.email')"
              name="email"
            />
          </div>
          <div class="mt-2">
            <label class="label" for="email">{{ $t('common.tel') }}</label>
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
          </div>
          <div class="mt-2">
            <label class="label" for="city">{{ $t('components.editAd.city') }}</label>
            <CreateAdCities name="city" :current-city="city" @setCity="addCity" />
          </div>
          <div class="mt-2">
            <label class="label" for="price">
              <span class="mr-1">{{ $t('common.price') }}</span>
              <span>{{ $t('common.eur') }}</span>
            </label>
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
          </div>
          <div class="mt-2">
            <label class="label" for="adtext">{{ $t('components.editAd.adtext') }}</label>
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
          <div class="mt-4">
            <create-images
              ref="imagesComponent"
              :create-ad-success="createAdSuccess"
              :ad-images="adImages"
              :ad-edit-mode="adEditMode"
              @addImages="addImages"
            ></create-images>
          </div>
        </div>
        <div>
          <button class="button is-danger" @click="onAdDelete">
            {{ $t('components.editAd.deleteAd') }}
          </button>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" :disabled="$v.$invalid" @click="onUpdateAd">
          {{ $t('components.editAd.save') }}
        </button>
        <button class="button" @click="$emit('toggleShowModal')">
          {{ $t('components.editAd.cancel') }}
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
import CreateAdCities from '@/components/CreateAdCities';
import { UPDATE_AD, DELETE_AD } from '@/store/actions.types';
import CreateImages from './CreateImages';
import { required, minLength, email } from 'vuelidate/lib/validators';
export default {
  name: 'EditAd',
  components: { CreateAdCities, CreateImages },
  props: {
    currentAd: {
      type: Object,
      required: true
    },
    adId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      adCategory: this.currentAd.Category,
      adText: this.currentAd.Text,
      adPrice: this.currentAd.Price,
      adEmail: this.currentAd.Email,
      adTel: this.currentAd.Tel,
      dateOfAdjustment: Date.now(),
      adImages: this.currentAd.Images,
      city: this.currentAd.City,
      createAdSuccess: true,
      adEditMode: true
    };
  },
  validations: {
    adCategory: { required },
    adText: { required },
    adPrice: { required },
    adEmail: { required, email },
    adTel: { required, minLength: minLength(9) }
  },
  computed: {
    price() {
      return this.currentAd.Price;
    }
  },
  methods: {
    addCity(city) {
      this.city = city;
    },
    onUpdateAd() {
      const updatedAd = {
        Category: this.adCategory,
        Text: this.adText,
        Price: this.adPrice,
        Email: this.adEmail,
        Tel: this.adTel,
        DateOfAdjustment: this.dateOfAdjustment,
        City: this.city,
        Images: this.adImages
      };
      this.$refs.imagesComponent.deleteImagesFromEditMode();
      const adId = this.adId;
      updatedAd.id = this.adId;
      this.$store.dispatch(UPDATE_AD, { adId, updatedAd });
      this.$emit('toggleShowModal');
    },
    onAdDelete() {
      this.adEditMode = false;
      this.$refs.imagesComponent.deleteAllImg();
      this.$store.dispatch(DELETE_AD, this.adId);
      this.$emit('toggleDeletedAd');
    },
    addImages(images) {
      this.adImages = images;
    }
  }
};
</script>
<style scoped>
.input {
  width: 100%;
}
.select {
  width: 100%;
}
</style>
