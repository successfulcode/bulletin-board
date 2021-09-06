<template>
  <div>
    <div class="select">
      <select
        class="input is-success"
        :value="currentCity"
        @change="$emit('setCity', $event.target.value)"
      >
        <option :value="$t('cities.allCities')">{{ $t('cities.allCities') }}</option>
        <optgroup :label="$t('cities.bigCities')">
          <option v-for="cityItem in bigCities" :key="cityItem.city" :value="cityItem.city">
            {{ cityItem.city }}
          </option>
        </optgroup>
        <optgroup :label="$t('cities.other')">
          <option v-for="cityItem in other" :key="cityItem.city" :value="cityItem.city">
            {{ cityItem.city }}
          </option>
        </optgroup>
        <optgroup :label="$t('cities.otherCities')">
          <option v-for="cityItem in otherCities" :key="cityItem.city" :value="cityItem.city">
            {{ cityItem.city }}
          </option>
        </optgroup>
      </select>
    </div>
  </div>
</template>

<script>
import { bigCities, otherCities, other } from '@/assets/cities';
import i18n from '../i18n';
export default {
  name: 'CreateAdCities',
  props: {
    currentCity: {
      type: String,
      required: false,
      default: i18n.t('cities.allCities')
    }
  },
  data() {
    return {
      bigCities: bigCities,
      otherCities: otherCities,
      other: other
    };
  }
};
</script>

<style lang="scss" scoped>
.input {
  min-width: 17rem;
}
.select {
  width: 100%;
}
</style>
