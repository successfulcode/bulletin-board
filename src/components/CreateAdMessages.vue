<template>
  <div class="mt-4">
    <article class="message is-primary">
      <div class="message-header">
        <p>{{ newMessage.adCategory }}</p>
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
