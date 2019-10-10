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
          <router-link class="nav-link" to="/">Home</router-link>
        </li>
      </ul>
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link class="nav-link" to="/login" v-if="!isUserLoggedIn">Login</router-link>
        </li>
        <li class="nav-item">
          <span class="navbar-text" v-if="getUserName">Welcome, {{getUserName}}</span>
        </li>
        <li class="nav-item">
          <a class="nav-item nav-link button" v-if="isUserLoggedIn" @click="logout">Logout</a>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/register" v-if="!isUserLoggedIn">Register</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import axios from "axios";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Header",
  computed: mapGetters(["isUserLoggedIn", "getUserName"]),
  methods: {
    ...mapActions(["logout"])
    // logout() {
    //   let access_token = JSON.parse(localStorage.getItem("access_token"));
    //   axios
    //     .post(
    //       "http://127.0.0.1:8000/api/logout",
    //       {},
    //       {
    //         headers: { Authorization: `Bearer ${access_token}` }
    //       }
    //     )
    //     .then(({ data }) => {
    //       this.$emit("logout");
    //       this.$router.push("/login");
    //     })
    //     .catch(errors => {
    //       console.log("Cannot logout", errors);
    //     });
    // }
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
