<template>
  <div>
    <section class="section pb-0 bg-gradient-info main-section">
      <div class="container">
        <div class="row row-grid align-items-center justify-content-md-center mt-5">
          <div class="col-lg-8 order-lg-1 mt-0">
            <div class="card bg-gradient-secondary shadow shadow-lg--hover mt-5">
              <form class="card-body p-lg-5" @submit.prevent="registerForm">
                <h4 class="mb-1">Register</h4>
                <p class="mt-0">To access the best Todos app ever.</p>
                <div class="form-group mt-3">
                  <div class="input-group input-group-alternative">
                    <input
                      class="form-control"
                      placeholder="Your Name"
                      type="text"
                      v-model="userInfo.name"
                    />
                  </div>
                </div>
                <div class="form-group">
                  <div class="input-group input-group-alternative">
                    <input
                      class="form-control"
                      placeholder="Your Email address"
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
                      type="password"
                      v-model="userInfo.password"
                    />
                  </div>
                </div>

                <div>
                  <button type="submit" class="btn btn-primary btn-round btn-block btn-lg">Sign up</button>
                </div>
                <router-link to="/login" class="register-link">
                  <span class="nav-link-inner--text">Already Registered?</span>
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
import axios from "axios";
export default {
  name: "Register",
  data() {
    return {
      userInfo: {
        name: "",
        email: "",
        password: ""
      }
    };
  },
  methods: {
    registerForm(e) {
      axios({
        method: "post",
        url: "http://127.0.0.1:8000/register",
        data: this.userInfo,
        config: { headers: { "Content-Type": "application/json" } }
      })
        .then(function(response) {
          //handle success
          console.log(response);
        })
        .catch(function(response) {
          //handle error
          console.log(response);
        });

      this.$router.push("/");
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
.register-link {
  float: right;
  margin-top: 15px;
}
</style>


