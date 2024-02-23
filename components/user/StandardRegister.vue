<template>
    <b-card-text class="mt-3">
        <p>A Standard account is for any individual or company that purchases our products for their own
            use.</p>
        <p>If you are a School, College, University or Registered Charity you are eligible to register as a
            Print Reseller and get discounted rates.</p>
        <form class="row g-3 needs-validation mt-3" @submit.prevent="submitForm">
            <div class="col-12 mb-3">
                <label class="form-label">Full Name</label>
                <input type="text" class="bg-white rounded form-control" v-model="$v.first_name.$model"
                    @blur="$v.first_name.$touch" />
                <div>
                    <span class="text-danger" v-if="$v.first_name.$dirty && !$v.first_name.required">Please enter
                        your
                        name.</span>
                </div>
            </div>
            <div class="col-12 mb-3">
                <label class="form-label">Email</label>
                <input type="email" class="bg-white rounded form-control" v-model="$v.email.$model"
                    @blur="$v.email.$touch" />
                <div>
                    <span class="text-danger" v-if="$v.email.$dirty && !$v.email.required">Please enter
                        your
                        email.</span>
                    <span class="text-danger" v-else-if="$v.email.$dirty && !$v.email.email">Please enter
                        a valid
                        email.</span>
                </div>
            </div>
            <div class="col-12 mb-3">
                <label class="form-label">Password</label>
                <input type="password" class="bg-white rounded form-control" v-model="$v.password.$model"
                    @blur="$v.password.$touch" />
                <div>
                    <span class="text-danger" v-if="$v.password.$dirty && !$v.password.required">Please
                        enter your
                        password.</span>
                    <span class="text-danger" v-else-if="$v.password.$dirty && !$v.password.minLength">Password
                        must be at
                        least 8 characters long.</span>
                    <span class="text-danger" v-else-if="$v.password.$dirty && !$v.password.hasUppercase">Password
                        must
                        contain at least one uppercase letter.</span>
                    <span class="text-danger" v-else-if="$v.password.$dirty && !$v.password.hasLowercase">Password
                        must
                        contain at least one lowercase letter.</span>
                    <span class="text-danger" v-else-if="$v.password.$dirty && !$v.password.hasNumber">Password
                        must contain
                        at least one number.</span>
                </div>
            </div>
            <div class="col-12 mb-3">
                <label class="form-label">Confirm Password</label>
                <input type="password" class="bg-white rounded form-control" v-model="$v.confirmPassword.$model"
                    @blur="$v.confirmPassword.$touch" />
                <div>
                    <span class="text-danger" v-if="$v.confirmPassword.$dirty && !$v.confirmPassword.required
                        ">Please confirm your password.</span>
                    <span class="text-danger" v-else-if="$v.confirmPassword.$dirty &&
                        !$v.confirmPassword.sameAsPassword
                        ">Passwords do not match.</span>
                </div>
            </div>
            <div class="col-12">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="invalidCheck" required />
                    <label class="form-check-label" for="invalidCheck">
                        <small>
                            I accept the <a href="javascript:void(0)"><u>API User Terms</u></a> and I
                            have read the
                            <a href="javascript:void(0)"><u>Data Processing Terms</u></a></small>
                    </label>
                </div>
            </div>
            <div class="col-12">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="invalidCheck"
                        v-model="subscribeToNewsletter" @change="subscribeOrUnsubscribe" />
                    <label class="form-check-label" for="invalidCheck">
                        <small>I would like to receive news, insights and best practice
                            from Digital Press</small>
                    </label>
                </div>
            </div>
            <div class="col-12 mt-3">
                <button @click="createAnAccount"
                    class="access-btn text-white bg-dark w-100 justify-content-center text-uppercase"
                    style="font-weight: 400" type="button">
                    create account
                </button>
            </div>
        </form>
    </b-card-text>
</template>
<script>
import * as Constants from "../../utils/const";
import {
    required,
    email,
    sameAs,
    minLength,
    helpers,
} from "vuelidate/lib/validators";
export default {
    data() {
        return {
            email: "",
            password: "",
            confirmPassword: "",
            first_name: "",
            subscribeToNewsletter: false,
        };
    },
    validations: {
        email: { required, email },
        password: {
            required,
            minLength: minLength(8),
            hasUppercase: helpers.regex("password", /^(?=.*[A-Z])/),
            hasLowercase: helpers.regex("password", /^(?=.*[a-z])/),
            hasNumber: helpers.regex("password", /^(?=.*\d)/),
        },
        confirmPassword: {
            required,
            sameAsPassword: sameAs("password"),
        },
        first_name: { required }
    },

    methods: {
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
        async createAnAccount() {
            this.$v.$touch();
            if (this.$v.$invalid) {
                return;
            } else {
                try {
                    let userData = {
                        email: this.email,
                        password: this.password,
                        first_name: this.first_name,
                        type: "front_user",
                    };
                    // Create the user account
                    await this.$store.getters.client
                        .post(Constants.SignupURL, userData)
                        .then(async (response) => {
                            this.$router.push("/signin");
                            this.$toast.success(
                                "Your account has been created successfully. Please login with the registered email."
                            );
                            if (this.subscribeToNewsletter) {
                                this.subscribeOrUnsubscribe();
                            }
                        });
                } catch ({ response }) {
                    let err = response.data.message.email;
                    err.forEach((element) => {
                        this.$toast.error(element);
                    });
                }
            }
        },
    },
};
</script>
  