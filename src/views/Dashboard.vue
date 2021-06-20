<template>
  <div>
    <create-ad
      :message="newMessage"
      :is-loading="isLoading"
      :current-user="currentUser.displayName"
      @addMessage="addMessage"
    ></create-ad>
  </div>
</template>

<script>
// import axios from 'axios';
import CreateAd from '@/components/CreateAd.vue';
import { mapState, mapGetters } from 'vuex';
import { ADD_MESSAGE } from '@/store/actions.types';

export default {
  name: 'Dashboard',
  components: { CreateAd },
  computed: {
    ...mapState({
      newMessage: (state) => state.ads.newMessage,
      isLoading: (state) => state.auth.isLoading,
      isErrors: (state) => state.auth.errors
    }),
    ...mapGetters(['currentUser'])
  },
  methods: {
    addMessage(message) {
      this.$store.dispatch(ADD_MESSAGE, message);
    }
  }
};
</script>
