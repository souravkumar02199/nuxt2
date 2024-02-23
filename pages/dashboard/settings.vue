<template>
  <div>
    <div class="cart_page_section myaccount_page dashboard_page bg-white">
      <div class="cart_page_area">
        <div class="myaccount_box mb-4">
          <div class="
              myaccount_box_title
              d-flex
              align-items-center
              justify-content-between
              mb-3
            ">
            <h3>Settings</h3>
          </div>
          <div class="myaccount_box_content">
            <div class="left_area mb-3">
              <div class="cartforms_collapses">
                <div class="cartform_collapse_item">
                  <div class="collapse_item_title">
                    <button v-b-toggle.account_details
                      class="d-flex align-items-center justify-content-between">
                      Account Details <i class="far fa-angle-down"></i>
                    </button>
                  </div>
                  <b-collapse class="collpase_item_body" visible id="account_details">
                    <div class="collpase_item_inner py-4">
                      <div class="px-4">
                        <!-- <form > -->
                        <div class="row">
                          <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                            <div class="form-group">
                              <label for="fname">First Name*</label>
                              <input type="text" class="form-control" id="fname" v-model="userAccount.first_name"
                                required />
                            </div>
                          </div>
                          <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                            <div class="form-group">
                              <label for="lname">Last Name</label>
                              <input type="text" class="form-control" id="lname" v-model="userAccount.last_name" />
                            </div>
                          </div>
                          <div class="
                              col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12
                            ">
                            <div class="form-group">
                              <label for="address1">Address*</label>
                              <div class="row">
                                <div class="
                                    col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12
                                    mb-2 mb-lg-0
                                  ">
                                  <input type="text" class="form-control" id="address1" required
                                    v-model="userAccount.address" />
                                </div>
                                <div class="
                                    col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12
                                    mb-2 mb-lg-0
                                  ">
                                  <input type="text" class="form-control" id="address1-1"
                                    v-model="userAccount.address2" />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                            <div class="form-group">
                              <label for="town">Town*</label>
                              <input type="text" class="form-control" id="town" required v-model="userAccount.town" />
                            </div>
                          </div>
                          <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                            <div class="form-group">
                              <label for="invoice_email1">Invoice Email</label>
                              <input type="email" class="form-control" id="invoice_email1"
                                v-model="userAccount.invoice_email" />
                            </div>
                          </div>
                          <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                            <div class="form-group">
                              <label for="phn">Contact Number*</label>
                              <input type="tel" class="form-control" id="phn" required v-model="userAccount.phone" />
                            </div>
                          </div>
                          <div class="
                              col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12
                            ">
                            <div class="form-group pt-1">
                              <div class="checkbox_item">
                                <input type="checkbox" class="remember_checkbox" id="b_address" />
                                <label for="b_address">Save as Billing Address</label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="btn_primary login_btn btn_black py-2">
                          <button class="px-5" @click.stop.prevent="updateProfile()">
                            Update
                          </button>
                        </div>
                        <!-- </form> -->
                      </div>
                    </div>
                  </b-collapse>
                </div>
                <div class="cartform_collapse_item">
                  <div class="collapse_item_title">
                    <button v-b-toggle.update_password
                      class="d-flex align-items-center justify-content-between">
                      Update Password <i class="far fa-angle-down"></i>
                    </button>
                  </div>
                  <b-collapse class="collpase_item_body" id="update_password">
                    <div class="collpase_item_inner py-4">
                      <div class="px-4 password_inputs">
                        <!-- <form @sumbit.prevent="updatePassword"> -->
                        <div class="row">
                          <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                            <div class="form-group">
                              <label for="old_password">Old Password:</label>
                              <div class="input-group">
                                <input :type="showOldPwd ? 'text' : 'password'" class="form-control" id="old_password"
                                  required v-model="pwd.oldPwd" />
                                <div class="input-group-append">
                                  <button type="button" class="btn" @click="toggleOldPwdShow()">
                                    <i class="fa" :class="showOldPwd ? 'fa-eye' : 'fa-eye-slash'
                                      "></i>
                                  </button>
                                </div>
                              </div>
                            </div>

                            <div class="form-group">
                              <label for="new_password">New Password</label>
                              <div class="input-group">
                                <input :type="showNewPwd ? 'text' : 'password'" class="form-control" id="new_password"
                                  v-model="pwd.newPwd" />
                                <div class="input-group-append">
                                  <button type="button" class="btn" @click="toggleNewPwdShow()">
                                    <i class="fa" :class="showNewPwd ? 'fa-eye' : 'fa-eye-slash'
                                      "></i>
                                  </button>
                                </div>
                              </div>
                            </div>

                            <div class="form-group">
                              <label for="confirm_password">Confirm Password</label>
                              <div class="input-group">
                                <input :type="showConfirmPwd ? 'text' : 'password'" class="form-control"
                                  id="confirm_password" v-model="pwd.confirmPwd" />
                                <div class="input-group-append">
                                  <button type="button" class="btn" @click="toggleConfirmPwdShow()">
                                    <i class="fa" :class="showConfirmPwd
                                        ? 'fa-eye'
                                        : 'fa-eye-slash'
                                      "></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="btn_primary login_btn btn_black py-2">
                          <button class="px-5" @click.stop.prevent="updatePassword" type="submit">
                            Update
                          </button>
                        </div>
                        <!-- </form> -->
                      </div>
                    </div>
                  </b-collapse>
                </div>
                <div class="cartform_collapse_item">
                  <div class="collapse_item_title">
                    <button v-b-toggle.marketing_pref
                      class="d-flex align-items-center justify-content-between">
                      Marketing Preferences <i class="far fa-angle-down"></i>
                    </button>
                  </div>
                  <b-collapse class="collpase_item_body border-bottom-0" id="marketing_pref">
                    <div class="collpase_item_inner py-4">
                      <div class="px-4">
                        <p class="mb-3">
                          Order update/Offers will be sent to this address as
                          well as the main account email address when orders are
                          placed.
                        </p>
                        <!-- <form> -->
                        <div class="row">
                          <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                            <div class="form-group">
                              <label for="marketing_email">Email:</label>
                              <input type="email" class="form-control" id="marketing_email" />
                            </div>
                          </div>
                        </div>
                        <div class="btn_primary login_btn btn_black py-2">
                          <button class="px-4" type="submit">
                            Save Changes
                          </button>
                        </div>
                        <!-- </form> -->
                      </div>
                    </div>
                  </b-collapse>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GenericMixin } from "@/mixins/generic";

export default {
  data() {
    return {
      user: null,
      loadSpinner: false,

      pwd: {
        oldPwd: null,
        newPwd: null,
        confirmPwd: null,
      },
      userAccount: {
        first_name: null,
        last_name: null,
        address: null,
        address2: null,
        town: null,
        email: null,
        phone: null,
        invoice_email: null,
        gender: null,
        date_of_birth: null,
      },
      showOldPwd: false,
      showNewPwd: false,
      showConfirmPwd: false,
    };
  },

  mounted() {
    this.user = JSON.parse(sessionStorage.getItem("user"));
    this.userAccount.email = this.user.email;

    this.getProfile();
  },
  mixins: [GenericMixin],
  methods: {
    toggleOldPwdShow() {
      this.showOldPwd = !this.showOldPwd;
    },

    toggleNewPwdShow() {
      this.showNewPwd = !this.showNewPwd;
    },

    toggleConfirmPwdShow() {
      this.showConfirmPwd = !this.showConfirmPwd;
    },

    updateProfile() {
      const headers = { Authorization: "Bearer " + this.user.access };

      this.$store.getters.client
        .put(`accounts/update_profile/${this.user.id}/`, this.userAccount, {
          headers,
        })
    },

    getProfile() {
      this.loadSpinner = true;

      const headers = { Authorization: "Bearer " + this.user.access };
      this.$store.getters.client
        .get(`/accounts/user/profile`, { headers })
        .then((res) => {
          this.loadSpinner = false;

          this.userAccount.first_name = res.data.first_name;
          this.userAccount.last_name = res.data.last_name;
          this.userAccount.address = res.data.address;
          this.userAccount.address2 = res.data.address2;
          this.userAccount.town = res.data.town;
          this.userAccount.phone = res.data.phone;
          this.userAccount.invoice_email = res.data.invoice_email;
        });
    },

    updatePassword() {
      if (
        this.isEmpty(this.pwd.oldPwd) == true ||
        this.isEmpty(this.pwd.newPwd) == true ||
        this.isEmpty(this.pwd.confirmPwd) == true
      ) {
        this.$toast.error("Password Field is required");
        return;
      } else if (this.pwd.newPwd != this.pwd.confirmPwd) {
        this.$toast.error("New and Confirm password must be same");
        return;
      } else if (this.pwd.oldPwd == this.pwd.newPwd) {
        this.$toast.error("Old and New password cannot be same");
        return;
      } else if (this.pwd.oldPwd == this.pwd.confirmPwd) {
        this.$toast.error("Old and Confirm password cannot be same");
        return;
      }

      const data = {
        old_password: this.pwd.oldPwd,
        new_password: this.pwd.newPwd,
      };

      const headers = { Authorization: "Bearer " + this.user.access };
      this.loadSpinner = true;

      this.$store.getters.client
        .put(`/accounts/change-password/`, data, { headers })
        .then((res) => {
          this.loadSpinner = false;

          if (res.data.code == 200) {
            this.$toast.success(res.data.message);
          }
          this.getProfile();
        });
    },
  },
};
</script>
