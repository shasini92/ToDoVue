<template>
  <div id="app">
    <Header :userLoggedIn="userLoggedIn" @logout="logout" :userName="userName" />
    <router-view :userLoggedIn="userLoggedIn" :userId="userId" @login="login" />
  </div>
</template>

<script>
import Header from "./components/layout/Header";
export default {
  name: "app",
  data() {
    return {
      userLoggedIn: true,
      userName: "",
      userId: ""
    };
  },
  created() {
    if (JSON.parse(localStorage.getItem("access_token"))) {
      this.userLoggedIn = true;
    } else {
      this.userLoggedIn = false;
    }
  },
  methods: {
    logout() {
      console.log("Logged out.");
      localStorage.removeItem("access_token");
      this.userLoggedIn = false;
    },
    login(data) {
      this.userLoggedIn = true;
      this.userName = data.user.name;
      this.userId = data.user.id;
    }
  },

  components: { Header }
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.4;
}

.btn {
  display: inline-block;
  border: none;
  background: #555;
  color: #fff;
  padding: 7px 20px;
  cursor: pointer;
}

.btn:hover {
  background: #666;
}
</style>
