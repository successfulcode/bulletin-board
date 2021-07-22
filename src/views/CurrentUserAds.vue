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
    <div v-if="currentUserAds.length > 0">
      <div v-for="ad in currentUserAds" :key="ad.id" class="mt-4 px-4">
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
    <div v-else-if="currentUserAds.length <= 0 && !isLoading">
      {{ $t('views.ads.noAds') }}
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import AdsItem from '@/components/AdsItem.vue';
import Spinner from '@/assets/Spinner.vue';
import { GET_ADS } from '@/store/actions.types';
import { CLOSE_NOTIFICATION } from '@/store/mutations.types';
import TheNotification from '@/components/TheNotification.vue';

export default {
  name: 'CurrentUserAds',
  components: { Spinner, AdsItem, TheNotification },
  computed: {
    ...mapGetters([
      'currentUserAds',
      'notificationIsOpen',
      'notificationStatus',
      'notificationMessage'
    ]),
    ...mapState({
      isLoading: (state) => state.auth.isLoading
    })
  },
  created() {
    this.getAds();
  },
  methods: {
    getAds() {
      this.$store.dispatch(GET_ADS);
    },
    closeNotification() {
      this.$store.commit(CLOSE_NOTIFICATION);
    }
  }
};
</script>
