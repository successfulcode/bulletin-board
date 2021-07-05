<template>
  <div class="box">
    <article class="media">
      <div class="media-left">
        <figure class="image is-128x128">
          <img src="https://bulma.io/images/placeholders/128x128.png" alt="Image" />
        </figure>
      </div>
      <div class="media-content">
        <div class="content">
          <p>
            <strong>{{ Name }}{{ ' ' }}</strong>
            <strong>Kategorija: {{ Category }}{{ ' ' }}</strong>
            <small>{{ $t('common.email') }}.:{{ ' ' }}{{ Email }}{{ ' ' }}</small>
            <small>{{ $t('common.tel') }}.:{{ ' ' }}{{ Tel }}</small>
            <small>{{ ' ' }}{{ $moment(AdDate).format('YYYY-MM-DD') }}</small>
            <br />
            {{ Text }}
            <br />
            <strong>{{ $t('common.price') }}:{{ ' ' }}{{ Price }}{{ ' ' }}{{ $t('common.eur') }}</strong>
          </p>
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
</template>

<script>
export default {
  name: 'AdsItem',
  props: ['Category', 'Text', 'Price', 'Email', 'Tel', 'AdDate', 'Name']
};
</script>

<style></style>
