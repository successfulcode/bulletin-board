<template>
  <div>
    <the-notification :status="notificationStatus" @close="closeNotification" v-if="notificationIsOpen">{{notificationMessage}}</the-notification>
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
      {{ $t('views.ads.noAds') }}
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { GET_ADS } from '@/store/actions.types';
import Spinner from '@/assets/Spinner.vue';
import AdsItem from '../components/AdsItem.vue';
import { CLOSE_NOTIFICATION } from '@/store/mutations.types';

export default {
  name: 'Ads',
  components: { Spinner, AdsItem },
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
    closeNotification() {
      this.$store.commit(CLOSE_NOTIFICATION)
    }
  }
};
</script>
