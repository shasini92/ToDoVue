<template>
  <div id="app">
    <!-- <Header :userLoggedIn="userLoggedIn" @logout="logout" :userName="userName" /> -->
    <!-- <router-view :userLoggedIn="userLoggedIn" :userId="userId" @login="login" @register="register" /> -->
    <Todos />
  </div>
</template>

<script>
import Header from "./components/layout/Header";
import Todos from "./views/Todos";
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
      this.userId = localStorage.getItem("userId");
      this.userName = localStorage.getItem("userName");
    } else {
      this.userLoggedIn = false;
    }
  },
  methods: {
    logout() {
      this.userLoggedIn = false;
      this.userName = "";
      localStorage.removeItem("access_token");
      localStorage.removeItem("userName");
    },
    login(data) {
      this.userLoggedIn = true;
      this.userName = data.user.name;
      localStorage.setItem("userName", data.user.name);
      localStorage.setItem("access_token", JSON.stringify(data.access_token));
    },
    register(data) {
      this.userLoggedIn = true;
      this.userName = data.user.name;
      localStorage.setItem("userName", data.user.name);
      localStorage.setItem("access_token", JSON.stringify(data.access_token));
    }
  },

  components: { Header, Todos }
};
</script>

// TODO make sure to update the components, uncomment the components in the template, 


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
