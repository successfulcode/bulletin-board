<template>
  <div>
    <div>Dashboard</div>
    <button @click="testData">TEST</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  methods: {
    async testData() {
      const test = 'test';
      try {
        const response = await axios.post(process.env.VUE_APP_DATA_URL, { test });
        console.log('respones', response);
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>
