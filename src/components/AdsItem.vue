<template>
  <router-link :to="{ name: 'Ad', params: { id } }">
    <div class="box">
      <article class="media">
        <div class="media-left">
          <div class="image-wrapper">
            <figure class="image is-128x128">
              <img
                :src="image ? image.url : `https://bulma.io/images/placeholders/128x128.png`"
                alt="Image"
                class="img"
              />
            </figure>
          </div>
        </div>
        <div class="media-content">
          <div class="content">
            <strong>{{ name }}{{ ' ' }}</strong>
            <strong>Kategorija: {{ category }}{{ ' ' }}</strong>
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
    category: String,
    text: String,
    price: String,
    email: String,
    tel: String,
    adDate: Number,
    name: String,
    id: String,
    image: Object
  }
};
</script>

<style lang="scss" scoped>
.ellipsis {
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box !important;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  white-space: normal;
  word-break: break-word;
}
.image-wrapper {
  width: 128px;
  height: 128px;
}
.img {
  width: 128px;
  height: auto;
}
</style>
