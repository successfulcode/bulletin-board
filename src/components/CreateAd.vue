<template>
  <div class="mt-4 px-4">
    <div v-if="$v.$invalid || isLoading || !consentToTheRules">
      <create-ad-alert
        :current-user="`${$t('components.createAd.hello')} ${currentUser}!`"
        :alert-text="$t('components.createAd.aboutFilelds')"
      ></create-ad-alert>
    </div>
    <form
      class="mt-4"
      @submit.prevent="
        onSubmit();
        $v.$reset();
      "
    >
      <div class="field">
        <label class="label">{{ $t('components.createAd.category') }}</label>
        <div class="control">
          <div class="select">
            <select
              v-model="$v.adCategory.$model"
              class="input"
              :class="{
                'is-danger': $v.adCategory.$error,
                'is-success': !$v.adCategory.$invalid
              }"
            >
              <option value="" disabled>
                ---{{ $t('components.createAd.selectCategory') }}---
              </option>
              <option :value="$t('components.createAd.realEstate')">
                {{ $t('components.createAd.realEstate') }}
              </option>
              <option :value="$t('components.createAd.transport')">
                {{ $t('components.createAd.transport') }}
              </option>
              <option :value="$t('components.createAd.workBusiness')">
                {{ $t('components.createAd.workBusiness') }}
              </option>
              <option :value="$t('components.createAd.homHousehold')">
                {{ $t('components.createAd.homHousehold') }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <div class="field">
        <label class="label">{{ $t('components.createAd.ad') }}</label>
        <div class="control">
          <textarea
            v-model="$v.adText.$model"
            class="textarea"
            :class="{
              'is-danger': $v.adText.$error,
              'is-success': !$v.adText.$invalid
            }"
            :placeholder="$t('components.createAd.adText')"
          ></textarea>
        </div>
      </div>

      <div class="field">
        <div class="control">
          <label class="checkbox">
            <input v-model="consentToTheRules" type="checkbox" />
            {{ $t('components.createAd.iAgreeWhith') }}
            {{ ' ' }}<a href="#">{{ $t('components.createAd.rules') }}</a>
          </label>
        </div>
      </div>

      <div class="field is-flex is-justify-content-left is-flex-wrap-wrap">
        <div class="pl-0">
          <input
            v-model="$v.adPrice.$model"
            name="price"
            class="input"
            :class="{
              'is-danger': $v.adPrice.$error,
              'is-success': !$v.adPrice.$invalid
            }"
            type="number"
            :placeholder="$t('common.price')"
          />
          <p class="help">{{ $t('components.createAd.aboutPrice') }}</p>
        </div>
        <label for="price" class="label mt-4 ml-1 mr-3">{{ $t('common.eur') }}</label>
        <div class="mr-3">
          <input
            v-model="$v.adEmail.$model"
            class="input mr-4"
            :class="{
              'is-danger': $v.adEmail.$error,
              'is-success': !$v.adEmail.$invalid
            }"
            type="text"
            :placeholder="$t('common.email')"
          />
          <p class="help">{{ $t('components.createAd.aboutEmail') }}</p>
        </div>
        <div>
          <input
            v-model="$v.adTel.$model"
            class="input"
            maxlength="12"
            :class="{
              'is-danger': $v.adTel.$error,
              'is-success': !$v.adTel.$invalid
            }"
            type="tel"
            :placeholder="$t('common.tel')"
          />
          <p class="help">{{ $t('components.createAd.aboutTel') }}</p>
        </div>
      </div>
      <div class="mb-5">
        <div class="file is-link has-name">
          <label class="file-label">
            <input
              class="file-input"
              type="file"
              name="resume"
              :disabled="images.length >= 8"
              @change="handleChange"
            />
            <span class="file-cta">
              <span class="file-icon">
                <font-awesome-icon :icon="['fa', 'upload']" />
              </span>
              <span class="file-label"> {{ $t('components.createAd.upload') }}</span>
            </span>
            <span class="file-name">{{
              file ? file.name : $t('components.createAd.adPhotos')
            }}</span>
          </label>
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
      </div>
      <div class="field is-grouped mb-4">
        <div class="control">
          <button
            class="button is-link"
            type="submit"
            :class="{ 'is-loading': isLoading }"
            :disabled="$v.$invalid || isLoading || !consentToTheRules"
          >
            {{ $t('common.confirm') }}
          </button>
        </div>
        <div class="control">
          <button
            class="button is-link is-light"
            type="reset"
            @click.prevent="
              clear();
              deleteAllImg();
            "
          >
            {{ $t('common.cancel') }}
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import CreateAdAlert from './CreateAdAlert.vue';
import { required, minLength, email } from 'vuelidate/lib/validators';
import firebase from 'firebase/app';

export default {
  name: 'CreateAd',
  components: { CreateAdAlert },
  props: {
    isLoading: Boolean,
    currentUser: { type: String, required: true },
    userLocalid: { type: String, required: true }
  },
  data() {
    return {
      adCategory: '',
      adText: '',
      consentToTheRules: false,
      adPrice: '',
      adEmail: '',
      adTel: '',
      adDate: Date.now(),
      file: null,
      fileError: false,
      images: [],
      downloadingProgress: null,
      imageIsloading: false,
      createAdSuccess: false
    };
  },
  validations: {
    adCategory: { required },
    adText: { required },
    adPrice: { required },
    adEmail: { required, email },
    adTel: { required, minLength: minLength(9) }
  },
  methods: {
    onSubmit() {
      const newMessage = {
        Category: this.adCategory,
        Text: this.adText,
        Price: this.adPrice,
        Email: this.adEmail,
        Tel: this.adTel,
        Date: this.adDate,
        Name: this.currentUser,
        Images: this.images
      };
      this.$emit('addMessage', newMessage);
      this.createAdSuccess = true;
      this.clear();
      this.$router.push('ads');
    },
    clear() {
      this.adCategory = '';
      this.adText = '';
      this.adPrice = '';
      (this.images = []((this.adEmail = ''))), (this.adTel = ''), (this.consentToTheRules = false);
    },
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
        .ref(`imges/${this.userLocalid}/${this.file.name}`)
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
      const desertRef = firebase.storage().refFromURL(img);
      desertRef
        .delete()
        .then(() => {
          console.log('img deleted success', this.images);
          this.images = this.images.filter((image) => image.url !== img);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteAllImg() {
      console.log('deleteAllImg');
      if (this.images) {
        this.images.map((img) => {
          return this.deleteImg(img.url);
        });
      }
      this.images = [];
    }
  },
  destroyed() {
    if (!this.createAdSuccess) {
      return this.deleteAllImg();
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
