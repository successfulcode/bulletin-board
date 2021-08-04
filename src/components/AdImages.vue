<template>
  <div class="is-flex is-flex-wrap-wrap is-justify-content-center">
    <gallery :images="images" :index="index" @close="index = null"></gallery>

    <div
      class="image-main"
      :style="{ backgroundImage: `url('${images[0]}')` }"
      @click="index = 0"
    ></div>

    <br />
    <div v-if="images.length > 1" class="is-flex is-flex-wrap-wrap is-justify-content-center">
      <div
        v-for="(image, imageIndex) in images"
        :key="imageIndex"
        class="image"
        :style="{ backgroundImage: `url('${image}')` }"
        @click="index = imageIndex"
      ></div>
    </div>
  </div>
</template>

<script>
import VueGallery from 'vue-gallery';

export default {
  components: {
    gallery: VueGallery
  },
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
  created() {
    this.getImages();
  },

  methods: {
    getImages() {
      return (this.images = this.pictures.map((item) => {
        return item.url;
      }));
    }
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
  width: 22rem;
  height: 22rem;
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

@media only screen and (max-width: 320px) {
  .image-main {
    width: 16rem;
    height: 16rem;
  }
}
</style>
