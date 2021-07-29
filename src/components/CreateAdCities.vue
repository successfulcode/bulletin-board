<template>
  <div>
    <div class="select">
      <select class="input" @change="$emit('setCity', $event.target.value)">
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
import { bigCities, otherCities, other } from '../assets/cities';
export default {
  data() {
    return {
      bigCities: bigCities,
      otherCities: otherCities,
      other: other
    };
  }
};
</script>
