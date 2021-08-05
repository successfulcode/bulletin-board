<template>
  <div class="mb-5">
    <div class="file is-link has-name">
      <label class="file-label">
        <input
          class="file-input"
          type="file"
          name="resume"
          :disabled="images.length >= 9"
          @change="handleChange"
        />
        <span class="file-cta">
          <span class="file-icon">
            <font-awesome-icon :icon="['fa', 'upload']" />
          </span>
          <span class="file-label"> {{ $t('components.createAd.upload') }}</span>
        </span>
        <span class="file-name">{{ file ? file.name : $t('components.createAd.adPhotos') }}</span>
      </label>
    </div>
    <div>
      <p class="help">{{ $t('components.createAd.maxPhotosItems') }}</p>
    </div>
    <p v-if="fileError" class="help is-danger">
      {{ $t('components.createAd.photoЕxpansionError') }}
    </p>
    <div v-if="imageIsloading">
      <progress
        class="progress is-small is-primary mt-4"
        :value="downloadingProgress"
        max="100"
      ></progress>
    </div>
    <div v-if="images">
      <div class="mt-3 is-flex is-justify-content-left is-flex-wrap-wrap">
        <figure v-for="image in images" :key="image.url" class="image is-128x128 mb-1">
          <div>
            <span class="delete-img-span"
              ><font-awesome-icon
                class="delete-img"
                :icon="['fa', 'times-circle']"
                @click.stop="deleteImg(image.url)"
            /></span>
          </div>
          <div class="small-image" :style="{ backgroundImage: `url('${image.url}')` }"></div>
        </figure>
      </div>
    </div>
    <pre>{{ imagesDeletedInEditMode }}</pre>
  </div>
</template>

<script>
import firebase from 'firebase/app';
export default {
  name: 'CreateAd',
  props: {
    createAdSuccess: {
      type: Boolean,
      default: false
    },
    adImages: {
      type: Array,
      default: function () {
        return [];
      }
    },
    adEditMode: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      images: this.adImages,
      imageIsloading: false,
      downloadingProgress: null,
      file: null,
      fileError: null,
      editMode: this.adEditMode,
      imagesDeletedInEditMode: []
    };
  },
  watch: {
    images: function (images) {
      this.$emit('addImages', images);
    }
  },
  destroyed() {
    if (!this.createAdSuccess) {
      return this.deleteAllImg();
    }
  },
  methods: {
    async handleChange(e) {
      const types = ['image/jpeg', 'image/png'];
      const selectedFile = e.target.files[0];
      if (selectedFile && types.includes(selectedFile.type)) {
        this.file = selectedFile;
        this.fileError = false;
        await this.sendImg();
      } else {
        this.file = null;
        this.fileError = true;
      }
    },
    sendImg() {
      this.imageIsloading = true;
      const uploadTask = firebase
        .storage()
        .ref(`imges/${this.userLocalid}/${Date.now()}${this.file.name}`)
        .put(this.file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          this.downloadingProgress = progress;
          console.log('Upload is ' + progress + '% done');
          if (snapshot.state === 100) {
            this.downloadingProgress = null;
          }
        },
        (error) => {
          console.log(error);
          this.imageIsloading = false;
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            this.images.push({ url: downloadURL });
            this.imageIsloading = false;
            console.log('File available at', this.images);
          });
        }
      );
    },
    deleteImg(img) {
      if (!this.editMode) {
        const desertRef = firebase.storage().refFromURL(img);
        desertRef
          .delete()
          .then(() => {
            console.log('img deleted success', this.images);
            this.images = this.images.filter((image) => image.url !== img);
            console.log(img);
          })
          .catch((error) => {
            console.log(error);
            const newError = { error };
            if (newError.error.code === 'storage/object-not-found') {
              this.images = this.images.filter((image) => image.url !== img);
            }
          });
      } else {
        this.images = this.images.filter((image) => image.url !== img);
        this.imagesDeletedInEditMode.push({ url: img });
      }
    },
    deleteAllImg() {
      console.log('deleteAllImg');
      if (this.images) {
        this.images.map((img) => {
          return this.deleteImg(img.url);
        });
      }
      this.images = [];
    },
    deleteImagesFromEditMode() {
      console.log('deleteImagesFromEditmode');
      if (this.imagesDeletedInEditMode) {
        this.editMode = false;
        this.imagesDeletedInEditMode.map((img) => {
          return this.deleteImg(img.url);
        });
      }
      this.imagesDeletedInEditMode = [];
    }
  }
};
</script>

<style scoped>
.small-image {
  float: left;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  border: 1px solid #ebebeb;
  margin: 5px;
  width: 8rem;
  height: 8rem;
}
.delete-img-span {
  color: hsl(348, 100%, 61%);
  font-size: 2rem;
  position: absolute;
  height: auto;
  top: 2px;
  right: 2px;
}
.delete-img {
  margin: 0;
  padding: 0;
  background-color: rgb(255, 255, 255, 0.7);
  border-radius: 50%;
  cursor: pointer;
}
</style>
