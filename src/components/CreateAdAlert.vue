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
  props: {
    alertText: { type: String, defalt: 'Error!' },
    currentUser: { type: String, required: true }
  }
};
</script>

<style></style>
