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
  created() {
    this.$store.dispatch(AUTO_LOGIN);
    console.log('AUTO_LOGIN2')
  }
};
</script>

<style lang="scss">
@import '@/assets/styles.scss';
</style>
