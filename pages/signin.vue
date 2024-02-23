<template>
  <div>
    <Loadingbar v-show="loading" />
    <b-container class="py-5">
      <!-- <div id="googleButton"></div> -->
      <!-- {{ prevRoute }} -->
      <b-row>
        <b-col cols="12" lg="6">
          <b-row align-h="center">
            <b-col cols="12" md="9">
              <DpLogo />
              <h2 class="py-4"><b>Sign In</b></h2>
              <b-alert :show="dismissCountDown" dismissible fade variant="danger" @dismiss-count-down="countDownChanged">
                Invalid Credentials!
              </b-alert>
              <form class="row">
                <div class="col-12 mb-3">
                  <label class="form-label">Email</label>
                  <input type="email" class="bg-white rounded form-control" placeholder="Enter your email"
                    v-model="$v.userData.email.$model" @blur="$v.userData.email.$touch" required />
                  <div>
                    <span class="text-danger" v-if="$v.userData.email.$dirty && !$v.userData.email.required
                      ">Please enter your email.</span>
                    <span class="text-danger" v-else-if="$v.userData.email.$dirty && !$v.userData.email.email
                      ">Please enter a valid email.</span>
                  </div>
                </div>
                <div class="col-12 mb-3">
                  <label for="validationCustom02" class="form-label">Password</label>
                  <input type="password" placeholder="Enter your password" class="bg-white rounded form-control"
                    v-model="$v.userData.password.$model" @blur="$v.userData.password.$touch" />
                  <div>
                    <span class="text-danger" v-if="$v.userData.password.$dirty &&
                      !$v.userData.password.required
                      ">Please enter your password.</span>
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="invalidCheck" required />
                    <label class="form-check-label" for="invalidCheck">Remember me</label>
                    <div class="invalid-feedback">
                      You must agree before submitting.
                    </div>
                  </div>
                </div>
                <div class="col-6 text-end">
                  <Nuxt-link to="/forgot_password"><u>Forgot password?</u></Nuxt-link>
                </div>
                <div class="col-12 my-3">
                  <button @click="login" class="access-btn text-white bg-dark w-100 justify-content-center text-uppercase"
                    style="font-weight: 400" type="button">
                    Sign in
                  </button>
                </div>
                <div class="col-12 text-center">
                  Don't have an account?
                  <Nuxt-link to="/signup"><u>Sign up</u></Nuxt-link>
                </div>
              </form>
            </b-col>
          </b-row>
        </b-col>
        <b-col cols="6" class="d-lg-block d-none"><AuthRight/></b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import { required, email } from "vuelidate/lib/validators";
import DpLogo from "../components/layout/DpLogo.vue";
import AuthRight from '../components/user/AuthRight.vue';
export default {
  components: { DpLogo, AuthRight },
  layout: "user",
  data() {
    return {
      prevRoute: null,
      loading: false,
      data: {},
      userData: {
        email: "",
        password: "",
      },
      email: "",
      password: "",
      dismissSecs: 5,
      dismissCountDown: 0,
      showDismissibleAlert: false,
      isAuthenticate: false,
    };
  },
  validations: {
    userData: {
      email: { required, email },
      password: { required },
    },
  },
  beforeCreate() {
    let user = sessionStorage.getItem("user");
    if (user) {
      this.$router.go(-1);
    }
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.prevRoute = from;
    });
  },
  methods: {
    handleCredentialResponse(response) {},
    start() {
      this.loading = true;
    },
    finish() {
      this.loading = false;
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },
    login() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      } else {
        this.start();
        this.$store
          .dispatch("obtainToken", {
            email: this.userData.email,
            password: this.userData.password,
          })
          .then(() => {
            this.finish();
            if (
              this.prevRoute.name === "signup" ||
              this.prevRoute.name === "forgot_password" ||
              this.prevRoute.name === "reset-password"
            ) {
              this.$router.push("/");
            } else {
              this.$router.go(-1);
            }
          })
          .catch((error) => {
            this.finish();
            this.showAlert();
          });
      }
    },
  },
};
</script>

<style>
.access-btn {
  padding: 5px 12px;
  border: 1px solid #888;
  border-radius: 20px;
  display: flex;
  align-items: center;
  outline: none;
  color: #888;
  background: #fff;
  font-weight: 600;
  justify-content: space-between;
}

.line span {
  z-index: 21;
}

.line::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 1px;
  background-color: #ccc;
  top: 50%;
  left: 0;
  z-index: 20;
}
</style>
