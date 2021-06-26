<template>
  <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link class="navbar-item has-text-dark" to="/"
        >BULLETIN</router-link
      >
      <button
        role="button"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </button>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div v-if="isAuthenticated" class="navbar-start">
        <router-link to="/dashboard" class="navbar-item">{{
          $t("components.theNavbar.createAd")
        }}</router-link>
        <router-link to="/ads" class="navbar-item">{{
          $t("components.theNavbar.allAds")
        }}</router-link>
        <router-link to="/mineads" class="navbar-item">{{
          $t("components.theNavbar.mineAds")
        }}</router-link>
      </div>
      <div v-else class="navbar-start">
        <router-link to="/ads" class="navbar-item">{{
          $t("components.theNavbar.allAds")
        }}</router-link>
      </div>
    </div>

    <div class="navbar-end">
      <div class="navbar-item mr-2">
        <div v-if="isAuthenticated">
          <strong class="mr-3">{{ currentUser.displayName }}</strong>
          <button class="button is-light" @click="logout">
            {{ $t("components.theNavbar.logout") }}
          </button>
        </div>
        <div v-else class="buttons">
          <router-link to="/signup" class="button is-info">
            <strong>{{ $t("common.signUp") }}</strong>
          </router-link>
          <router-link to="/login" class="button is-light">{{
            $t("common.login")
          }}</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
import { LOGOUT } from "@/store/actions.types";
export default {
  name: "TheNavbar",
  computed: {
    ...mapGetters(["currentUser", "isAuthenticated"]),
  },
  methods: {
    logout() {
      this.$store.dispatch(LOGOUT).then(() => this.$router.push("login"));
    },
  },
};
</script>
