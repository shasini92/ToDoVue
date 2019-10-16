<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <router-link class="navbar-brand" to="/">TodosApp</router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <router-link class="nav-link" :to="{ name: 'home' }">Home</router-link>
        </li>
      </ul>
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link class="nav-link" :to="{ name: 'login' }" v-if="!userLoggedIn">Login</router-link>
        </li>
        <li class="nav-item">
          <span class="navbar-text" v-if="username">Welcome, {{username}}</span>
        </li>
        <li class="nav-item">
          <a class="nav-item nav-link button" v-if="userLoggedIn" @click="onLogout">Logout</a>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{ name: 'register' }" v-if="!userLoggedIn">Register</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import axios from "axios";
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  name: "Header",

  computed: {
    ...mapGetters(["username", "userLoggedIn"])
  },

  methods: {
    ...mapActions(["logout"]),

    onLogout() {
      this.DELETE_ALERT_MESSAGE();
      this.logout();
      this.$router.push({ name: "login" });
    },

    ...mapMutations(["SET_USER_LOGGED_IN", "DELETE_ALERT_MESSAGE"])
  },

  created() {
    if (localStorage.getItem("access_token") === null) {
      this.SET_USER_LOGGED_IN(false);
    } else {
      this.SET_USER_LOGGED_IN(true);
    }
  }
};
</script>

<style scoped>
.nav-item {
  font-size: 1.3rem;
}
.nav-brand {
  font-size: 1.3rem;
}

.button:hover {
  cursor: pointer;
}
</style>
