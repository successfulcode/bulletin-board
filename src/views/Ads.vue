<template>
  <div>
    <div v-show="isLoading" class="has-text-centered">
      <spinner></spinner>
    </div>
    <div>
      <button @click="getAds">GET DATA TEST</button>
      <p class="mt-4">For tests...</p>
      <pre>{{ ads }}</pre>
    </div>
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
