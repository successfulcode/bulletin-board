<template>
  <article class="message">
    <div class="message-body">
      {{ AlertText }}
    </div>
  </article>
</template>

<script>
export default {
  name: 'CreateAdAlert',
  props: { AlertText: String }
};
</script>

<style></style>
