<template>
  <div>
    <section class="section pb-0 bg-gradient-info main-section">
      <div class="container">
        <div class="row row-grid align-items-center justify-content-md-center">
          <div class="col-lg-8 order-lg-1 mt-0">
            <div class="card bg-gradient-secondary shadow shadow-lg--hover mt-5">
              <form class="card-body p-lg-5" @submit.prevent="login($event)">
                <h4 class="mb-1">Login</h4>
                <p class="mt-0">To access the best Todos app ever.</p>
                <div class="form-group mt-3">
                  <div class="input-group input-group-alternative">
                    <input
                      class="form-control"
                      placeholder="Your Email address"
                      name="email"
                      type="email"
                      v-model="userInfo.email"
                    />
                  </div>
                </div>
                <div class="form-group">
                  <div class="input-group input-group-alternative">
                    <input
                      class="form-control"
                      placeholder="Your Password"
                      name="password"
                      type="password"
                      v-model="userInfo.password"
                    />
                  </div>
                </div>
                <div>
                  <button type="submit" class="btn btn-primary btn-round btn-block btn-lg">Login</button>
                </div>
                <router-link to="/register" class="register-link float-right mt-2">
                  <span class="nav-link-inner--text">New Registration?</span>
                </router-link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>



<script>
import VueRouter from "vue-router";
// import todoDetailModal from "./TodoDetailModal";

export default {
  name: "Login",
  data: function() {
    return {
      userInfo: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    login(e) {
      let email = e.target.elements.email.value;
      let password = e.target.elements.password.value;
      console.log("User logged in.", this.userInfo);

      //   let login = () => {
      //     let data = {
      //       email: email,
      //       password: password
      //     };
      //     axios
      //       .post("/api/login", data)
      //       .then(response => {
      //         console.log("Logged in", response);
      //         this.$router.push("/home");
      //       })
      //       .catch(errors => {
      //         console.log("Cannots login", errors);
      //       });
      //   };
    }
  }
};
</script>

<style scoped>
section.main-section {
  height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.section {
  padding-top: 0;
}
.google-img-wrapper {
  cursor: pointer;
}
.google-signin-img {
  width: 175px;
}
</style>


