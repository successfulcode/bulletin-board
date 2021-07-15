<template>
  <div>
    <gallery :images="images" :index="index" @close="index = null"></gallery>

    <div
      class="image-main"
      @click="index = 0"
      :style="{ backgroundImage: `url('${images[0]}')` }"
    ></div>

    <br />
    <div v-if="images.length > 1">
      <div
        class="image"
        v-for="(image, imageIndex) in images"
        :key="imageIndex"
        @click="index = imageIndex"
        :style="{ backgroundImage: `url('${image}')` }"
      ></div>
    </div>
  </div>
</template>

<script>
import VueGallery from 'vue-gallery';

export default {
  props: {
    pictures: {
      type: Array,
      default: function () {
        return [{ url: 'https://bulma.io/images/placeholders/128x128.png' }];
      }
    }
  },
  data() {
    return {
      images: [],
      index: null
    };
  },

  methods: {
    getImages() {
      return (this.images = this.pictures.map((item) => {
        return item.url;
      }));
    }
  },
  created() {
    this.getImages();
  },
  components: {
    gallery: VueGallery
  }
};
</script>

<style scoped>
.image-main {
  float: left;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  border: 1px solid #ebebeb;
  margin: 5px;
  width: 25rem;
  height: 25rem;
  cursor: pointer;
}

.image {
  float: left;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  border: 1px solid #ebebeb;
  margin: 5px;
  width: 8rem;
  height: 8rem;
  cursor: pointer;
}
</style>
