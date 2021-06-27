<template>
  <article class="message">
    <div class="message-body">
      <strong>{{ currentUser }}</strong
      >{{ ' ' }}{{ alertText }}
    </div>
  </article>
</template>

<script>
export default {
  name: 'CreateAdAlert',
  props: { alertText: String, currentUser: String }
};
</script>

<style></style>
