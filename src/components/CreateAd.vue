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

      <div class="field is-flex is-justify-content-left">
        <div class="column is-2">
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
        <label for="price" class="label mt-5 ml-1 mr-5">{{ $t('common.eur') }}</label>
        <div class="column is-3">
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
        <div class="column is-3">
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
        <input type="file" @change="handleChange" :disabled="this.images.length >= 3" />
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
        <div v-if="images" class="is-flex">
          <div class="mt-3 is-flex is-justify-content-left">
            <figure
              v-for="image in images"
              :key="image.url"
              class="image is-128x128 ml-1 mr-1 mb-4"
            >
              <img :src="image.url" />
            </figure>
          </div>
        </div>
      </div>
      <div class="field is-grouped">
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
          <button class="button is-link is-light" type="reset" @click.prevent="clear">
            {{ $t('common.cancel') }}
          </button>
        </div>
      </div>
    </form>
    <div v-if="message.adText">
      <create-ad-messages :new-message="message"></create-ad-messages>
    </div>
  </div>
</template>

<script>
import CreateAdAlert from './CreateAdAlert.vue';
import CreateAdMessages from './CreateAdMessages.vue';
import { required, minLength, email } from 'vuelidate/lib/validators';
import firebase from 'firebase/app';

export default {
  name: 'CreateAd',
  components: { CreateAdMessages, CreateAdAlert },
  props: { message: Object, isLoading: Boolean, currentUser: String },
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
      imageIsloading: false
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
      this.clear();
      this.$router.push('ads');
    },
    clear() {
      this.adCategory = '';
      this.adText = '';
      this.adPrice = '';
      (this.adEmail = ''), (this.adTel = ''), (this.consentToTheRules = false);
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
      const uploadTask = firebase.storage().ref(`imges/${this.file.name}`).put(this.file);
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
    }
  }
};
</script>
