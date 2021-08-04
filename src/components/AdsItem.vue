<template>
  <router-link :to="{ name: 'Ad', params: { id } }">
    <div class="box">
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
            <strong>{{ name }}{{ ' ' }}</strong>
            <strong>{{ $t('views.ad.category') }}:{{ ' ' }}{{ category }}{{ ' ' }}</strong>
            <small>{{ $t('common.email') }}.:{{ ' ' }}{{ email }}{{ ' ' }}</small>
            <small>{{ $t('common.tel') }}.:{{ ' ' }}{{ tel }}</small>
            <small>{{ ' ' }}{{ $moment(adDate).format('YYYY-MM-DD') }}</small>
            <br />
            <div class="ellipsis mb-2">
              <p>
                {{ text }}
              </p>
            </div>
            <div>
              <router-link :to="{ name: 'Ad', params: { id } }"
                >{{ $t('common.more') }}...</router-link
              >
            </div>
            <strong
              >{{ $t('common.price') }}:{{ ' ' }}{{ price }}{{ ' ' }}{{ $t('common.eur') }}</strong
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
  </router-link>
</template>

<script>
export default {
  name: 'AdsItem',
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
</style>
