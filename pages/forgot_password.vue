<template>
  <b-container class="py-5">
    <b-row>
      <b-col cols="12" lg="6">
        <b-row align-h="center">
          <b-col cols="12" md="9">
            <DpLogo />
            <h2 class="py-4"><b>Forgot your <br> Password?</b></h2>
            <p class="text-muted mb-3"><b>Enter your username or email address and we will send you instruction on how to
                create a new password.</b></p>
            <form class="row needs-validation">
              <div class="col-12">
                <label for="validationCustom01" class="form-label">Email</label>
                <input type="email" class="bg-white rounded form-control" placeholder="Enter your email"
                  v-model="$v.email.$model" @blur="$v.email.$touch" />
                <div><span class="text-danger" v-if="$v.email.$dirty && !$v.email.required">Please enter your
                    email.</span>
                  <span class="text-danger" v-else-if="$v.email.$dirty && !$v.email.email">Please enter a valid
                    email.</span>
                </div>
              </div>
              <div class="d-flex justify-content-end w-100 px-3 mt-3">
                <button @click="$router.push('/signin')"
                  class="access-btn text-dark bg-white w-auto justify-content-center text-uppercase"
                  style="font-weight: 400" type="button">
                  cancel
                </button>
                <button @click="SendRequest"
                  class="access-btn ms-3 text-white bg-dark w-auto justify-content-center text-uppercase"
                  style="font-weight: 400" type="button">
                  send re-set email
                </button>
              </div>
            </form>
          </b-col>
        </b-row>
      </b-col>
      <b-col cols="6" class="d-lg-block d-none"><AuthRight/></b-col>
    </b-row>
  </b-container>
</template>
<script>
import { required, email } from 'vuelidate/lib/validators';
import DpLogo from '../components/layout/DpLogo.vue';
import AuthRight from '../components/user/AuthRight.vue';
export default {
  middleware: 'scrollToTopMiddleware',
  components: { DpLogo, AuthRight },
  layout: 'user',
  data() {
    return {
      email: '',
    }
  },
  validations: {
    email: { required, email }
  },
  beforeCreate() {
    let user = sessionStorage.getItem('user')
    if (user) {
      this.$router.go(-1)
    }
  },
  methods: {
    async SendRequest() {
      let data = {
        email: this.email,
      };
      this.$v.$touch();
      if (this.$v.$invalid) {
        for (const field in this.fieldErrorMessages) {
          const fieldErrors = this.fieldErrorMessages[field];
          for (const errorType in fieldErrors) {
            if (!this.$v[field][errorType]) {
              this.$toast.error(fieldErrors[errorType]);
            }
          }
        }
        return;
      } else {
        await this.$store.getters.client
          .post("/accounts/password_reset/", data)
          .then((response) => {
            if (response.data.status == "OK") {
              this.$toast.success(
                "Request is sent successfully, please see your email for further instructions"
              );
              this.$router.push("/signin");
            }
          });
      }
    },
  },
};
</script>
<style >
.access-btn-cancel {
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
</style>