<template>
  <div class="columns is-flex is-justify-content-center">
    <div class="column is-8 mt-5">
      <div class="notification is-light" :class="status">
        <button class="delete" @click="close"></button>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    status: {
      type: String,
      requiired: true,
      validator: function (status) {
        return ['is-success', 'is-danger', 'is-warning'].indexOf(status) !== -1;
      }
    }
  },
  methods: {
    close() {
      this.$emit('close');
    }
  }
};
</script>
