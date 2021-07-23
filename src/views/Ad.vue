<template>
  <div>
    <the-notification
      v-if="notificationIsOpen"
      :status="notificationStatus"
      @close="closeNotification"
    >
      {{ notificationMessage }}
    </the-notification>
    <div v-if="isLoading" class="has-text-centered">
      <spinner></spinner>
    </div>
    <div v-else class="box mt-4">
      <div class="is-flex is-justify-content-center mb-4">
        <ad-images :pictures="currentAd.Images"></ad-images>
      </div>
      <article>
        <div class="media-content">
          <div class="content">
            <strong>{{ $t('views.ad.adNr') }}:</strong>{{ ' ' }}{{ $route.params.id }}

            <strong>{{ currentAd.Name }}{{ ' ' }} </strong>
            <strong>{{ $t('views.ad.category') }}: {{ currentAd.Category }}{{ ' ' }}</strong>
            <small>{{ $t('common.email') }}.:{{ ' ' }}{{ currentAd.Email }}{{ ' ' }}</small>
            <small>{{ $t('common.tel') }}.:{{ ' ' }}{{ currentAd.Tel }}</small>
            <small>{{ ' ' }}{{ $moment(currentAd.AdDate).format('YYYY-MM-DD') }}</small>
            <br />
            <div class="wrap mb-2">
              <p>
                {{ currentAd.Text }}
              </p>
            </div>
            <strong
              >{{ $t('common.price') }}:{{ ' ' }}{{ currentAd.Price }}{{ ' '
              }}{{ $t('common.eur') }}</strong
            >
          </div>
          <nav class="level is-mobile">
            <div class="level-left">
              <a class="level-item" aria-label="reply">
                <span class="icon is-small">
                  <i class="fas fa-reply" aria-hidden="true"></i>
                </span>
              </a>
              <a class="level-item" aria-label="retweet">
                <span class="icon is-small">
                  <i class="fas fa-retweet" aria-hidden="true"></i>
                </span>
              </a>
              <a class="level-item" aria-label="like">
                <span class="icon is-small">
                  <i class="fas fa-heart" aria-hidden="true"></i>
                </span>
              </a>
            </div>
          </nav>
        </div>
      </article>
    </div>
    <a @click="$router.go(-1)">Atgal>></a>
  </div>
</template>

<script>
import { GET_AD } from '@/store/actions.types';
import { mapState, mapGetters } from 'vuex';
import Spinner from '@/assets/Spinner.vue';
import TheNotification from '@/components/TheNotification.vue';
import { CLOSE_NOTIFICATION } from '@/store/mutations.types';
import AdImages from '../components/AdImages.vue';

export default {
  name: 'Ad',
  components: { Spinner, TheNotification, AdImages },
  computed: {
    ...mapState({
      isLoading: (state) => state.auth.isLoading
    }),
    ...mapGetters(['currentAd', 'notificationIsOpen', 'notificationStatus', 'notificationMessage'])
  },
  created() {
    this.getAd();
  },
  methods: {
    getAd() {
      this.$store.dispatch(GET_AD, this.$route.params.id);
    },
    closeNotification() {
      this.$store.commit(CLOSE_NOTIFICATION);
    }
  }
};
</script>

<style lang="scss" scoped>
.wrap {
  width: 100%;
  word-break: break-word;
}
</style>
