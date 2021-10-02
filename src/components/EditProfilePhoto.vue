<template>
  <div :class="['modal p-2', isModalOpen && 'is-active']">
    <div class="modal-background" @click="toggleModal"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Pakeisti profilio nuotrauką</p>
        <button class="delete" aria-label="close" @click="toggleModal"></button>
      </header>
      <section class="modal-card-body">
        <div class="field is-flex is-justify-content-center">
          <figure class="image is-128x128">
            <img
              class="is-rounded"
              :src="image ? image.url : defaultProfilePicture"
              alt="profile"
            />
          </figure>
        </div>
        <pre>{{ image && image.url }}</pre>
      </section>
      <footer class="modal-card-foot is-flex is-justify-content-center">
        <div class="file is-link mr-2">
          <label class="file-label">
            <input class="file-input" type="file" name="resume" @change="handleChange" />
            <span class="file-cta">
              <span class="file-icon">
                <font-awesome-icon :icon="['fa', 'upload']" />
              </span>
              <span class="file-label">Įkelti nuotrauką</span>
            </span>
          </label>
        </div>
        <button class="button is-danger">Ištrinti nuotrauką</button>
        <button class="button" @click="toggleModal">Atšaukti</button>
      </footer>
    </div>
  </div>
</template>

<script>
import profile from '@/assets/pictures/profile.png';
import firebase from 'firebase/app';
export default {
  name: 'EditProfilePhoto',
  props: {
    isModalOpen: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      defaultProfilePicture: profile,
      file: null,
      fileError: null,
      imageIsloading: false,
      image: null
    };
  },
  methods: {
    toggleModal() {
      this.$emit('toggleModal');
    },
    async handleChange(e) {
      const types = ['image/jpeg', 'image/png'];
      const selectedFile = e.target.files[0];
      if (selectedFile && types.includes(selectedFile.type)) {
        this.file = selectedFile;
        this.fileError = false;
        this.sendImg();
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
            this.image = { url: downloadURL };
            this.imageIsloading = false;
          });
        }
      );
    }
  }
};
</script>

<style scoped>
.modal-background {
  cursor: pointer;
}
.is-rounded {
  border: 1px solid #48c774;
}
</style>
