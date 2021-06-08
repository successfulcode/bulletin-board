<template>
  <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item has-text-dark" href="#!"> BULLETIN </a>
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
      <div class="navbar-start">
        <router-link to="/dashboard" class="navbar-item">Dashboard</router-link>
        <router-link to="/dashboard" class="navbar-item">Advertisements</router-link>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <router-link to="/signup" class="button is-info">
              <strong>Sign up</strong>
            </router-link>
            <router-link to="/login" class="button is-light"> Log in </router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {};
</script>
