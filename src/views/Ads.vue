<template>
  <div>
    <div v-show="isLoading" class="has-text-centered">
      <spinner></spinner>
    </div>
    <div v-if="ads.length > 0">
      <div v-for="ad in ads" :key="ad.id" class="mt-4">
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
import { mapState, mapGetters } from 'vuex';
import { GET_ADS } from '@/store/actions.types';
import Spinner from '@/assets/Spinner.vue';
import AdsItem from '../components/AdsItem.vue';
export default {
  name: 'Ads',
  components: { Spinner, AdsItem },
  computed: {
    ...mapState({
      isLoading: (state) => state.auth.isLoading
    }),
    ...mapGetters(['ads'])
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
