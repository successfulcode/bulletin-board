<template>
  <div>
    <the-notification
      v-if="notificationIsOpen"
      :status="notificationStatus"
      @close="closeNotification"
      >{{ notificationMessage }}</the-notification
    >
    <div v-show="isLoading && !isObserveLoading" class="has-text-centered">
      <spinner></spinner>
    </div>
    <div v-if="ads.length > 0">
      <div>
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
            :show-edit-mode="ad.userLocalId === currentUser.localId"
            :all-ad="ad"
          ></ads-item>
        </div>
      </div>
    </div>
    <div v-else-if="ads.length <= 0 && !isLoading">
      {{ $t('views.ads.noAds') }}
    </div>
    <div v-show="isLoading && isObserveLoading" class="has-text-centered mb-4">
      <spinner></spinner>
    </div>
    <div v-observe-visibility="getMoreAdsHandler"></div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { GET_ADS, GET_MORE_ADS } from '@/store/actions.types';
import Spinner from '@/assets/Spinner.vue';
import AdsItem from '@/components/AdsItem.vue';
import { CLOSE_NOTIFICATION } from '@/store/mutations.types';
import TheNotification from '@/components/TheNotification.vue';

export default {
  name: 'Ads',
  components: { Spinner, AdsItem, TheNotification },
  data() {
    return {
      loadMore: true,
      isObserveLoading: false,
      adIndex: null
    };
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.auth.isLoading
    }),
    ...mapGetters([
      'currentUser',
      'ads',
      'notificationIsOpen',
      'notificationStatus',
      'notificationMessage'
    ])
  },
  created() {
    this.getAds();
  },
  methods: {
    getAds() {
      this.$store.dispatch(GET_ADS);
    },
    async getMoreAds() {
      try {
        this.isObserveLoading = true;
        if (this.adIndex != this.ads.length - 1 && !this.isLoading) {
          this.adIndex = this.ads.length - 1;
          await this.$store.dispatch(GET_MORE_ADS, this.ads[this.adIndex].Date);
          this.isObserveLoading = false;
        }
      } catch (error) {
        console.log(error);
      }
    },
    getMoreAdsHandler(isVisible) {
      if (!isVisible) {
        return;
      }
      this.getMoreAds();
    },
    closeNotification() {
      this.$store.commit(CLOSE_NOTIFICATION);
    }
  }
};
</script>
