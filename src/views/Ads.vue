<template>
  <div>
    <div v-show="isLoading" class="has-text-centered">
      <spinner></spinner>
    </div>
    <button @click="getAds">GET DATA TEST</button>
    <pre>{{ ads }}</pre>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { GET_ADS } from '@/store/actions.types';
import Spinner from '@/assets/Spinner.vue';

export default {
  name: 'Ads',
  components: { Spinner },
  computed: {
    ...mapState({
      ads: (state) => state.ads.messages,
      isLoading: (state) => state.auth.isLoading
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

