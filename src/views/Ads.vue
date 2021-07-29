<template>
  <div>
    <the-notification
      v-if="notificationIsOpen"
      :status="notificationStatus"
      @close="closeNotification"
      >{{ notificationMessage }}</the-notification
    >
    <div v-show="isLoading" class="has-text-centered">
      <spinner></spinner>
    </div>
    <div v-if="ads.length > 0">
      <div v-for="ad in ads" :key="ad.id" class="mt-4 mb-4 px-4">
        <ads-item
          :id="ad.id"
          :category="ad.Category"
          :text="ad.Text"
          :price="ad.Price"
          :email="ad.Email"
          :tel="ad.Tel"
          :ad-date="ad.Date"
          :name="ad.Name"
          :image="ad.Images && ad.Images[0]"
        ></ads-item>
      </div>
    </div>
    <div v-else-if="ads.length <= 0 && !isLoading">
      {{ $t('views.ads.noAds') }}
    </div>
    <div>
      <button class="button is-info mb-6" @click="getMoreAds">MORE</button>
      <button class="button is-info mb-6" @click="getShallow">GET_SHALLOW</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { GET_ADS, GET_MORE_ADS, GET_SHALLOW } from '@/store/actions.types';
import Spinner from '@/assets/Spinner.vue';
import AdsItem from '@/components/AdsItem.vue';
import { CLOSE_NOTIFICATION } from '@/store/mutations.types';
import TheNotification from '@/components/TheNotification.vue';

export default {
  name: 'Ads',
  components: { Spinner, AdsItem, TheNotification },
  computed: {
    ...mapState({
      isLoading: (state) => state.auth.isLoading
    }),
    ...mapGetters(['ads', 'notificationIsOpen', 'notificationStatus', 'notificationMessage'])
  },
  created() {
    this.getAds();
  },
  methods: {
    getAds() {
      this.$store.dispatch(GET_ADS);
    },
    getMoreAds() {
      console.log('getMoreAds ads data', this.ads);
      this.$store.dispatch(GET_MORE_ADS, this.ads[this.ads.length - 1].Date);
      console.log('numberId', this.ads[this.ads.length - 1].Date);
    },
    getShallow() {
      this.$store.dispatch(GET_SHALLOW);
    },
    closeNotification() {
      this.$store.commit(CLOSE_NOTIFICATION);
    }
  }
};
</script>
