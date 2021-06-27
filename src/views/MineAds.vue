<template>
  <pre>{{ getCurrentUserMessages }}</pre>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'MineAds',
  computed: {
    ...mapGetters(['getCurrentUserMessages'])
  }
};
</script>
