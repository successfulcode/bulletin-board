<template>
  <div>
    <div class="modal" :class="{ 'is-active': isModalOpen }">
      <edit-ad
        :current-ad="allAd"
        :ad-id="id"
        @toggleShowModal="toggleModal"
        @toggleDeletedAd="returnNull"
      ></edit-ad>
    </div>
    <div class="box" @click="routeToCurrentAd">
      <div>
        <div v-if="showEditMode" class="is-flex is-justify-content-space-between is-flex-wrap-wrap">
          <span class="mt-2 ml-4">Tavo skelbimas</span>
          <span class="button is-ghost" @click.stop="toggleModal">
            <p>{{ $t('views.ad.edit') }}</p>
            <font-awesome-icon :icon="['fa', 'edit']" class="ml-1" />
          </span>
        </div>
      </div>
      <article class="media is-flex is-justify-content-center is-flex-wrap-wrap">
        <div class="media-left">
          <figure class="image">
            <div>
              <span
                v-if="
                  $moment(adDate).format('YYYY-MM-DD') === $moment(Date.now()).format('YYYY-MM-DD')
                "
                class="image-label mt-2 pr-1 pl-1"
                >{{ $t('common.new') }}</span
              >
            </div>
            <div class="small-image" :style="{ backgroundImage: `url('${image.url}')` }"></div>
          </figure>
        </div>
        <div class="media-content">
          <div class="content">
            <div class="is-flex is-flex-wrap-wrap">
              <div class="mr-2">
                <strong>{{ name }}</strong>
              </div>
              <div class="mr-2">
                <strong>
                  <span class="mr-1">{{ $t('views.ad.category') }}:</span>
                  <span>{{ category }}</span>
                </strong>
              </div>
              <div class="mr-2">
                <small>
                  <span class="mr-1">{{ $t('common.email') }}.:</span>
                  <span>
                    <a :href="`mailto:${email}`" @click.stop>
                      {{ email }}
                    </a>
                  </span>
                </small>
              </div>
              <div class="mr-2">
                <small>
                  <span class="mr-1">{{ $t('common.tel') }}.:</span>
                  <span>
                    <a :href="`tel:${tel}`" @click.stop>{{ tel }}</a>
                  </span>
                </small>
              </div>
              <div>
                <small>
                  <span>
                    {{ $moment(adDate).format('YYYY-MM-DD') }}
                  </span>
                </small>
              </div>
            </div>
            <br />
            <div class="ellipsis">
              <p>
                {{ text }}
              </p>
            </div>
            <div>
              <router-link :to="{ name: 'Ad', params: { id } }"
                >{{ $t('common.more') }}...</router-link
              >
            </div>
            <div>
              <strong>
                <span class="mr-1">{{ $t('common.price') }}:</span>
                <span class="mr-1">{{ price }}</span>
                <span>{{ $t('common.eur') }}</span>
              </strong>
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
  </div>
</template>

<script>
import EditAd from '@/components/EditAd';
export default {
  name: 'AdsItem',
  components: { EditAd },
  props: {
    category: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    price: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    tel: {
      type: String,
      required: true
    },
    adDate: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    image: {
      type: Object,
      default: function () {
        return { url: 'https://bulma.io/images/placeholders/128x128.png' };
      },
      required: false
    },
    showEditMode: {
      type: Boolean,
      required: true
    },
    allAd: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isModalOpen: false
    };
  },
  methods: {
    routeToCurrentAd() {
      const id = this.id;
      this.$router.push({ name: 'Ad', params: { id } });
    },
    toggleModal() {
      this.isModalOpen = !this.isModalOpen;
    },
    returnNull() {
      return;
    }
  }
};
</script>

<style scoped>
.ellipsis {
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box !important;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  white-space: normal;
  word-break: break-word;
}

.small-image {
  float: left;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  border: 2px solid hsl(141, 53%, 53%);
  margin: 5px;
  width: 8rem;
  height: 8rem;
}

.media-content {
  width: 85%;
}

.image-label {
  color: hsl(141, 53%, 53%);
  background-color: rgb(255, 255, 255, 0.8);
  border: 2px solid hsl(141, 53%, 53%);
  font-size: 0.7rem;
  font-weight: bold;
  position: absolute;
  height: auto;
  top: 1px;
  right: 10px;
}

.box:hover {
  background-color: hsla(141, 53%, 53%, 0.048);
}

.box {
  cursor: pointer;
}
</style>
