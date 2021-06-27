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

export default {
  components: { Navbar }
};
</script>

<style lang="scss">
@import '@/assets/styles.scss';
</style>
