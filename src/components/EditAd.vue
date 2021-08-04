<template>
  <div>
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Skelbimo redagavimas</p>
        <button class="delete" aria-label="close" @click="$emit('toggleShowModal')"></button>
      </header>
      <section class="modal-card-body">
        <p>Skelbimo Nr.: -MfIrAJ7u10eUcVuETLF</p>
        <p>Firstname Lastname</p>
        <div class="control">
          <div class="select">
            <select class="input mt-2">
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
          <input v-model="adEmail" type="text" class="input mt-4" />
          <input v-model="adTel" type="text" class="input mt-2" />
          <CreateAdCities class="mt-2" :current-city="city" @setCity="addCity" />
          <input v-model="adPrice" type="text" class="input mt-2" />
          <textarea v-model="adText" type="text" class="input mt-2" />
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="onUpdateAd">Save changes</button>
        <button class="button" @click="$emit('toggleShowModal')">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<script>
import CreateAdCities from '@/components/CreateAdCities';
import { UPDATE_AD } from '@/store/actions.types';
export default {
  name: 'EditAd',
  components: { CreateAdCities },
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
      file: null,
      fileError: false,
      images: [],
      city: this.currentAd.City,
      createAdSuccess: false
    };
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
        City: this.city
      };
      const adId = this.adId;
      this.$store.dispatch(UPDATE_AD, { adId, updatedAd });
      this.createAdSuccess = true;
      this.$emit('toggleShowModal');
    }
  }
};
</script>
