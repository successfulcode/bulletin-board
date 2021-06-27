<template>
  <div>
    <div>
      <pre>{{ currentUserAds }}</pre>
    </div>
    <div v-show="isLoading" class="has-text-centered">
      <spinner></spinner>
    </div>
    <div v-if="currentUserAds.length > 0">
      <div v-for="ad in currentUserAds" :key="ad.id" class="mt-4">
        <ads-item
          :category="ad.Category"
          :text="ad.Text"
          :price="ad.Price"
          :email="ad.Email"
          :tel="ad.Tel"
          :ad-date="ad.Date"
          :name="ad.Name"
        ></ads-item>
      </div>
    </div>
    <div v-else>
      {{ $t('components.ads.noAds') }}
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import AdsItem from '@/components/AdsItem.vue';
import Spinner from '@/assets/Spinner.vue';
import { GET_ADS } from '@/store/actions.types';

export default {
  name: 'CurrentUserAds',
  components: { Spinner, AdsItem },
  computed: {
    ...mapGetters(['currentUserAds']),
    ...mapState({
      isLoading: (state) => state.auth.isLoading
    })
  },
  mounted() {
    this.getAds();
  },
  methods: {
    getAds() {
      this.$store.dispatch(GET_ADS);
    }
  }
};
</script>
