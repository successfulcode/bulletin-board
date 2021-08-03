<template>
  <div>
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Redaguoti skelbimą</p>
        <button class="delete" aria-label="close" @click="$emit('toggleShowModal')"></button>
      </header>
      <section class="modal-card-body">
        <p>Skelbimo Nr.: -MfIrAJ7u10eUcVuETLF</p>
        <p>Firstname Lastname</p>
        <div class="control">
          <div class="select">
            <select class="input mt-2">
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
              <option :value="$t('components.createAd.other')">
                {{ $t('components.createAd.other') }}
              </option>
            </select>
          </div>
          <input type="text" class="input mt-4" value="El. paštas" />
          <input type="text" class="input mt-2" value="Tel." />
          <input type="text" class="input mt-2" />
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="$emit('toggleShowModal')">Save changes</button>
        <button class="button">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditAd'
};
</script>
