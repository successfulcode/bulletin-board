<template>
  <div>
    <the-notification
      v-if="notificationIsOpen"
      :status="notificationStatus"
      @close="closeNotification"
    >
      {{ notificationMessage }}
    </the-notification>
    <create-ad
      :message="newMessage"
      :is-loading="isLoading"
      :current-user="currentUser.displayName"
      :user-localid="currentUser.localId"
      @addMessage="addMessage"
    ></create-ad>
  </div>
</template>

<script>
import CreateAd from '@/components/CreateAd.vue';
import { mapState, mapGetters } from 'vuex';
import { ADD_MESSAGE } from '@/store/actions.types';
import TheNotification from '../components/TheNotification.vue';
import { CLOSE_NOTIFICATION } from '@/store/mutations.types';
export default {
  name: 'Dashboard',
  components: { CreateAd, TheNotification },
  computed: {
    ...mapState({
      newMessage: (state) => state.ads.newMessage,
      isLoading: (state) => state.auth.isLoading,
      isErrors: (state) => state.auth.errors
    }),
    ...mapGetters([
      'currentUser',
      'notificationIsOpen',
      'notificationStatus',
      'notificationMessage'
    ])
  },
  methods: {
    addMessage(message) {
      this.$store.dispatch(ADD_MESSAGE, message);
    },
    closeNotification() {
      this.$store.commit(CLOSE_NOTIFICATION);
    }
  }
};
</script>
