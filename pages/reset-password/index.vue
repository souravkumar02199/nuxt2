<template>
    <div>
        <b-container class="py-5">
            <b-row>
                <b-col cols="12" lg="6">
                    <b-row align-h="center">
                        <b-col cols="12" md="9">
                            <DpLogo />
                            <h2 class="py-4"><b>Create New Password</b></h2>
                            <form class="row g-3 needs-validation">
                                <div class="col-12 mb-3">
                                    <label class="form-label">Enter New Password</label>
                                    <input type="password" placeholder="Enter your password"
                                        class="bg-white rounded form-control" v-model="$v.password.$model"
                                        @blur="$v.password.$touch" />
                                    <div>
                                        <span class="text-danger" v-if="$v.password.$dirty && !$v.password.required">Please
                                            enter your password.</span>
                                        <span class="text-danger"
                                            v-else-if="$v.password.$dirty && !$v.password.minLength">Password must be at
                                            least 8 characters long.</span>
                                        <span class="text-danger"
                                            v-else-if="$v.password.$dirty && !$v.password.hasUppercase">Password must
                                            contain at least one uppercase letter.</span>
                                        <span class="text-danger"
                                            v-else-if="$v.password.$dirty && !$v.password.hasLowercase">Password must
                                            contain at least one lowercase letter.</span>
                                        <span class="text-danger"
                                            v-else-if="$v.password.$dirty && !$v.password.hasNumber">Password must contain
                                            at least one number.</span>
                                    </div>
                                </div>
                                <div class="col-12 mb-3">
                                    <label class="form-label">Confirm Password</label>
                                    <input type="password" placeholder="Enter your password"
                                        class="bg-white rounded form-control" v-model="$v.confirmPassword.$model"
                                        @blur="$v.confirmPassword.$touch" />
                                    <div>
                                        <span class="text-danger"
                                            v-if="$v.confirmPassword.$dirty && !$v.confirmPassword.required">Please confirm
                                            your password.</span>
                                        <span class="text-danger"
                                            v-else-if="$v.confirmPassword.$dirty && !$v.confirmPassword.sameAsPassword">Passwords
                                            do not match.</span>
                                    </div>
                                </div>
                                <div class="col-12 mt-3">
                                    <button @click="resetPassword()"
                                        class="access-btn text-white bg-dark w-100 justify-content-center text-uppercase"
                                        style="font-weight: 400" type="button">
                                        Reset Password
                                    </button>
                                </div>
                            </form>
                        </b-col>
                    </b-row>
                </b-col>
                <b-col cols="6" class="d-lg-block d-none"><auth-right></auth-right></b-col>
            </b-row>
        </b-container>
    </div>
</template>
<script>
import { required, sameAs, minLength, helpers } from 'vuelidate/lib/validators';
import DpLogo from '../../components/layout/DpLogo.vue';
export default {
    components: { DpLogo },
    layout: "user",
    data() {
        return {
            password: "",
            confirmPassword: '',
        };
    },
    validations: {
        password: {
            required,
            minLength: minLength(8),
            hasUppercase: helpers.regex('password', /^(?=.*[A-Z])/),
            hasLowercase: helpers.regex('password', /^(?=.*[a-z])/),
            hasNumber: helpers.regex('password', /^(?=.*\d)/),
        },
        confirmPassword: {
            required,
            sameAsPassword: sameAs("password"),
        },
    },
    methods: {
        async resetPassword() {
            const TOKEN = this.$route.query.token
            // const headers = { Authorization: "Bearer " + TOKEN };
            this.$v.$touch();
            if (this.$v.$invalid) {
                return;
            } else {
                try {
                    await this.$store.getters.client
                    .post(`/accounts/password_reset/confirm/`, { password: this.password, token:TOKEN })
                        .then((response) => {
                            this.$router.push("/signin");
                            this.$toast.success(
                                "Password reset successfully"
                            );
                        }, 2000);
                } catch (error) {
                    console.log(error)
                    // let err = response.data.message.email;
                    // err.forEach((element) => {
                    //     this.$toast.error(element);
                    // });
                }
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
    