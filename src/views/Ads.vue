<template>
  <div>
    <button @click="getAds">GET DATA TEST</button>
    <pre>{{ ads }}</pre>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { GET_ADS } from '@/store/actions.types';

export default {
  name: 'Ads',
  computed: {
    ...mapState({
      ads: (state) => state.ads.messages
    })
  },
  methods: {
    getAds() {
      this.$store.dispatch(GET_ADS);
    }
  },
  mounted() {
   this.getAds();
  }
};
</script>

