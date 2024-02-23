<template>
  <b-container class="py-5">
    <b-row>
      <b-col cols="12" lg="6">
        <b-row align-h="center">
          <b-col cols="12" md="9">
            <DpLogo />
            <h2 class="py-4"><b>Register</b></h2>
            <div>
              <b-card no-body class="border-0">
                <b-tabs pills justified lazy v-model="tabIndex">
                  <b-tab title="Standard" :title-link-class="linkClass(0)">
                    <StandardRegister />
                  </b-tab>
                  <b-tab title="Print Reseller" :title-link-class="linkClass(1)">
                    <ResellerRegister />
                  </b-tab>
                </b-tabs>
              </b-card>
            </div>

            <div class="col-12 text-center mt-3">
              Already have an account?
              <Nuxt-link to="/signin"><u>Sign In</u></Nuxt-link>
            </div>
            <!-- <div class="text-center line position-relative mt-4 mb-4">
              <span class="bg-white text-muted px-2 position-relative">or</span>
            </div>
            <button class="access-btn w-100 mb-3">
              <img loading="lazy" src="~/assets/images/all/Google.png" width="24" alt="" />
              <div>SIGN IN WITH GOOGLE</div>
              <div></div>
            </button> -->
            <!-- {{ $v.reSeller }} -->
          </b-col>
        </b-row>
      </b-col>
      <b-col cols="6" class="d-lg-block d-none"><AuthRight/></b-col>
    </b-row>
  </b-container>
</template>
<script>
// import * as Constants from "../utils/const";
// import {
//   required,
//   email,
//   sameAs,
//   minLength,
//   helpers,
// } from "vuelidate/lib/validators";
import DpLogo from "../components/layout/DpLogo.vue";
import AuthRight from "../components/user/AuthRight.vue";
import ResellerRegister from "../components/user/ResellerRegister.vue";
import StandardRegister from "../components/user/StandardRegister.vue";
export default {
  components: { DpLogo, ResellerRegister, StandardRegister, AuthRight },
  layout: "user",
  data() {
    return {
      tabIndex: 0,
    };
  },

  methods: {
    linkClass(idx) {
      if (this.tabIndex === idx) {
        return ['dp-bg-primary', 'text-light', 'disabled']
      } else {
        return ['bg-light', 'dp-primary']
      }
    },
    async subscribeOrUnsubscribe() {
      if (this.subscribeToNewsletter) {
        try {
          await this.$store.getters.client.post("/newsletter/", {
            email: this.email,
          });
        } catch (error) {
          console.error("Failed to subscribe to the newsletter", error);
        }
      } else {
        // Handle unsubscription if needed
      }
    },
  },

  created() {
    let user = sessionStorage.getItem("user");
    if (user) {
      this.$router.go(-1);
    }
  },
};
</script>
