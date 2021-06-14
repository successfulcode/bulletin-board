<template>
  <div>
    <create-ad></create-ad>
  </div>
</template>

<script>
// import axios from 'axios';
import CreateAd from '@/components/CreateAd.vue';

export default {
  name: 'Dashboard',
  components: { CreateAd }
  // methods: {
  //   async testData() {
  //     const test = 'test';
  //     try {
  //       const response = await axios.post(process.env.VUE_APP_DATA_URL, { test });
  //       console.log('respones', response.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  // }
};
</script>
