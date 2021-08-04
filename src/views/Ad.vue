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
      <div v-if="currentAd.userLocalId === currentUser.localId" class="has-text-right">
        <span class="button is-ghost" @click="toggleModal">
          <p>{{ $t('views.ad.edit') }}</p>
          <font-awesome-icon :icon="['fa', 'edit']" class="ml-1" />
        </span>
      </div>
      <div class="modal" :class="{ 'is-active': isModalOpen }">
        <edit-ad
          :current-ad="currentAd"
          :ad-id="$route.params.id"
          @toggleShowModal="toggleModal"
          @toggleDeletedAd="redirectToAds"
        ></edit-ad>
      </div>
      <div class="is-flex is-justify-content-center mb-4">
        <ad-images :pictures="currentAd.Images"></ad-images>
      </div>
      <article>
        <div class="media-content">
          <div class="content">
            <div class="is-flex is-flex-wrap-wrap">
              <div class="mr-1">
                <span class="mr-1">
                  <strong>{{ $t('views.ad.adNr') }}:</strong>
                </span>
                <span>{{ $route.params.id }}</span>
              </div>
              <div class="mr-1">
                <strong>{{ currentAd.Name }}</strong>
              </div>
              <div class="mr-1">
                <strong>{{ $t('views.ad.category') }}: {{ currentAd.Category }}</strong>
              </div>
              <div class="mr-1">
                <span>{{ $t('common.email') }}.:</span>
                <span>
                  {{ currentAd.Email }}
                </span>
              </div>
              <div class="mr-1">
                <span class="mr-1">
                  <small>{{ $t('common.tel') }}.:</small>
                </span>
                <span>
                  <small>{{ currentAd.Tel }}</small>
                </span>
              </div>
              <div>
                <small>{{ $moment(currentAd.AdDate).format('YYYY-MM-DD') }}</small>
              </div>
            </div>
            <br />
            <div class="wrap mb-5">
              <p>
                {{ currentAd.Text }}
              </p>
            </div>
            <div>
              <strong
                >{{ $t('common.price') }}:{{ ' ' }}{{ currentAd.Price }}{{ ' '
                }}{{ $t('common.eur') }}</strong
              >
            </div>
            <div>
              <strong>{{ currentAd.Name }}{{ ' ' }} </strong> |
              <strong>{{ currentAd.City }}{{ ' ' }} </strong>
            </div>
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
    <button class="button is-ghost" @click="$router.go(-1)">{{ $t('views.ad.back') }}>></button>
  </div>
</template>

<script>
import { GET_AD } from '@/store/actions.types';
import { mapState, mapGetters } from 'vuex';
import Spinner from '@/assets/Spinner.vue';
import TheNotification from '@/components/TheNotification.vue';
import { CLOSE_NOTIFICATION } from '@/store/mutations.types';
import AdImages from '../components/AdImages.vue';
import EditAd from '../components/EditAd.vue';

export default {
  name: 'Ad',
  components: { Spinner, TheNotification, AdImages, EditAd },
  data() {
    return {
      isModalOpen: false
    };
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.auth.isLoading
    }),
    ...mapGetters([
      'currentUser',
      'currentAd',
      'notificationIsOpen',
      'notificationStatus',
      'notificationMessage'
    ])
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
    },
    toggleModal() {
      this.isModalOpen = !this.isModalOpen;
    },
    redirectToAds() {
      this.$router.go(-1);
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
