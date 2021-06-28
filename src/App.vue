<template>
  <div>
    <navbar></navbar>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/TheNavbar.vue';
import { AUTO_LOGIN } from '@/store/actions.types';

export default {
  components: { Navbar },
  mounted() {
    this.$store.dispatch(AUTO_LOGIN);
  }
};
</script>

<style lang="scss">
@import '@/assets/styles.scss';
</style>
