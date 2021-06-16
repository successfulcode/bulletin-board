<template>
  <form @submit.prevent="onSubmit">
    <div class="field">
      <pre>{{ message }}</pre>
      <label class="label">Katergorija</label>
      <div class="control">
        <div class="select">
          <select v-model="adCategory">
            <option value="" disabled>---Pasirinkite kategorija---</option>
            <option value="Nekilnojamasis turta">Nekilnojamasis turtas</option>
            <option value="Transportas">Transportas</option>
            <option value="Darbas, verslas">Darbas, verslas</option>
            <option value="Namai, buitis">Namai, buitis</option>
          </select>
        </div>
      </div>
    </div>

    <div class="field">
      <label class="label">Skelbimas</label>
      <div class="control">
        <textarea v-model="adText" class="textarea" placeholder="Skelbimo tekstas"></textarea>
      </div>
    </div>

    <div class="field">
      <div class="control">
        <label class="checkbox">
          <input v-model="consentToTheRules" type="checkbox" />
          Sutinku su{{ ' ' }}<a href="#">taisyklėmis</a>
        </label>
      </div>
    </div>

    <div class="field is-grouped">
      <div class="control">
        <button class="button is-link" type="submit">Patvirtinti</button>
      </div>
      <div class="control">
        <button class="button is-link is-light" @click="clear">Atšaukti</button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: 'CreateAd',
  props: { message: Object },
  data() {
    return {
      adCategory: '',
      adText: '',
      consentToTheRules: false
    };
  },
  methods: {
    onSubmit() {
      const newMessage = {
        adCategory: this.adCategory,
        adText: this.adText
      };
      this.$emit('addMessage', newMessage);
      console.log('onSubmit', this.adCategory, this.adText);
    },
    clear() {
      this.adCategory = '';
      this.adText = '';
    }
  }
};
</script>

<style></style>
