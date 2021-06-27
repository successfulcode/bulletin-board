<template>
  <div class="mt-4">
    <article class="message is-primary">
      <div class="message-header">
        <p>Kategorija: {{ newMessage.adCategory }}</p>
        <p>Kaina: {{ newMessage.adPrice }} Eur</p>
        <p>El.p: {{ newMessage.adEmail }}</p>
        <p>Tel.: {{ newMessage.adTel }}</p>
      </div>
      <div class="message-body">
        {{ newMessage.adText }}
      </div>
    </article>
  </div>
</template>

<script>
export default {
  name: 'CreateAdMessages',
  props: { newMessage: Object }
};
</script>
