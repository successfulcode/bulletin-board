<template>
  <div>
    <create-ad :message="newMessage" @addMessage="addMessage"></create-ad>
  </div>
</template>

<script>
// import axios from 'axios';
import CreateAd from '@/components/CreateAd.vue';
import { mapState } from 'vuex';
import { ADD_MESSAGE } from '@/store/actions.types';

export default {
  name: 'Dashboard',
  components: { CreateAd },
  computed: {
    ...mapState({
      newMessage: (state) => state.ads.newMessage
    })
  },
  methods: {
    addMessage(message) {
      this.$store.dispatch(ADD_MESSAGE, message);
      console.log('message', message);
    }
  }
};
</script>
