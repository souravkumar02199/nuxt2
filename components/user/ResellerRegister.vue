<template>
    <b-card-text class="mt-3">
        <p>A Print Reseller is a company or individual that purchases our products (at our discounted rate)
            and sells them on to their own customers. This includes Marketplace Sellers (e.g. Etsy, Ebay,
            etc).</p>
        <p>If you are a School, College, University or Registered Charity you are eligible to register as a
            Print Reseller and get discounted rates.</p>
        <form class="row g-3 needs-validation mt-3" @submit.prevent="submitForm">
            <div class="col-12 mb-3">
                <label class="form-label">First Name</label>
                <input type="text" class="bg-white rounded form-control" v-model="$v.first_name.$model"
                    @blur="$v.first_name.$touch" />
                <div>
                    <span class="text-danger" v-if="$v.first_name.$dirty && !$v.first_name.required">Please enter
                        your first name.</span>
                </div>
            </div>
            <div class="col-12 mb-3">
                <label class="form-label">Last Name</label>
                <input type="text" class="bg-white rounded form-control" v-model="$v.last_name.$model"
                    @blur="$v.last_name.$touch" />
                <div>
                    <span class="text-danger" v-if="$v.last_name.$dirty && !$v.last_name.required">Please
                        enter
                        your last name.</span>
                </div>
            </div>
            <div class="col-12 mb-3">
                <label class="form-label">Company name</label>
                <input type="text" class="bg-white rounded form-control" v-model="$v.company_name.$model"
                    @blur="$v.company_name.$touch" />
                <div>
                    <span class="text-danger" v-if="$v.company_name.$dirty && !$v.company_name.required">This is a
                        required field</span>
                </div>
            </div>
            <div class="col-12 mb-3">
                <label class="form-label">Phone Number</label>
                <input type="number" class="bg-white rounded form-control" v-model="$v.phone.$model"
                    @blur="$v.phone.$touch" />
                <div>
                    <span class="text-danger" v-if="$v.phone.$dirty && !$v.phone.required">Please enter
                        your
                        phone number.</span>
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
            <div class="col-12 mb-3">
                <div class="form-group">
                    <label for="postcode">Postcode*</label>
                    <b-input-group>
                        <b-form-input v-model="postCode" placeholder="Enter your postcode"></b-form-input>
                        <b-input-group-append>
                            <b-button variant="secondary" @click="findAddress">Search</b-button>
                        </b-input-group-append>
                    </b-input-group>
                    <select v-if="addressList !== null" v-model="selectedAddress" @change="handleAddressSelected"
                        class="form-control mt-2">
                        <option v-for="item in addressList" :value="item.id" :key="item.id">
                            {{ item.address }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="col-12 mb-3">
                <label class="form-label">Address Line 1</label>
                <input type="text" class="bg-white rounded form-control" v-model="$v.address1.$model"
                    @blur="$v.address1.$touch" />
                <div>
                    <span class="text-danger" v-if="$v.address1.$dirty && !$v.address1.required">This
                        is a required field</span>
                </div>
            </div>
            <div class="col-12 mb-3">
                <label class="form-label">Address Line 2</label>
                <input type="text" class="bg-white rounded form-control" v-model="address2" />
            </div>
            <div class="col-12 mb-3">
                <label class="form-label">County</label>
                <input type="text" class="bg-white rounded form-control" v-model="$v.county.$model"
                    @blur="$v.county.$touch" />
                <div>
                    <span class="text-danger" v-if="$v.county.$dirty && !$v.county.required">This
                        is a required field</span>
                </div>
            </div>
            <div class="col-12 mb-3">
                <label class="form-label">Town/City</label>
                <input type="text" class="bg-white rounded form-control" v-model="$v.city.$model" @blur="$v.city.$touch" />
                <div>
                    <span class="text-danger" v-if="$v.city.$dirty && !$v.city.required">This
                        is a required field</span>
                </div>
            </div>
            <div class="col-12 mb-3">
                <label class="form-label">Postcode</label>
                <input type="text" class="bg-white rounded form-control" v-model="$v.zip.$model" @blur="$v.zip.$touch" />
                <div>
                    <span class="text-danger" v-if="$v.zip.$dirty && !$v.zip.required">This
                        is a required field</span>
                </div>
            </div>
            <div class="col-12 mb-3">
                <label class="form-label">Country</label>
                <input type="text" class="bg-white rounded form-control" v-model="$v.country.$model"
                    @blur="$v.country.$touch" />
                <div>
                    <span class="text-danger" v-if="$v.country.$dirty && !$v.country.required">This
                        is a required field</span>
                </div>
            </div>
            <div class="col-12 mb-3">
                <label class="form-label">What sector are you in?</label>
                <select class="bg-white rounded form-control" v-model="$v.question1.$model" @blur="$v.question1.$touch">
                    <option value="Charity & Fundraising">Charity & Fundraising</option>
                    <option value="School & University">School & University</option>
                    <option value="Tutoring & Training">Tutoring & Training</option>
                    <option value="eCommerce Provider">eCommerce Provider</option>
                    <option value="Exhibitions & Events">Exhibitions & Events</option>
                    <option value="Graphic Designer">Graphic Designer</option>
                    <option value="Marketing Agency">Marketing Agency</option>
                    <option value="Print Buyer">Print Buyer</option>
                    <option value="Retail & Wholesale">Retail & Wholesale</option>
                    <option value="Trade Reseller">Trade Reseller</option>
                </select>
                <div>
                    <span class="text-danger" v-if="$v.question1.$dirty && !$v.question1.required">This is
                        a required
                        field</span>
                </div>
            </div>
            <div class="col-12 mb-3">
                <label class="form-label">Average monthly print spend</label>
                <select class="bg-white rounded form-control" v-model="$v.question2.$model" @blur="$v.question2.$touch">
                    <option value="50 and under">&#163;50 and under</option>
                    <option value="51 – 199">&#163;51 – &#163;199</option>
                    <option value="200 – 499">&#163;200 – &#163;499</option>
                    <option value="500 - 999">&#163;500 - &#163;999</option>
                    <option value="1000 - 1499">&#163;1000 - &#163;1499</option>
                    <option value="1500 - 1999">&#163;1500 - &#163;1999</option>
                    <option value="2000 - 2999">&#163;2000 - &#163;2999</option>
                    <option value="3000 - 4999">&#163;3000 - &#163;4999</option>
                    <option value="5000 +">&#163;5000 +</option>
                </select>
                <div>
                    <span class="text-danger" v-if="$v.question2.$dirty && !$v.question2.required">This is
                        a required
                        field</span>
                </div>
            </div>
            <div class="col-12 mb-3">
                <label class="form-label">Where did you hear about us?</label>
                <select class="bg-white rounded form-control" v-model="$v.question3.$model" @blur="$v.question3.$touch">
                    <option value="Google Search">Google Search</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="Twitter">Twitter</option>
                    <option value="Facebook">Facebook</option>
                    <option value="Instagram">Instagram</option>
                    <option value="Trade Show / Exhibition">Trade Show / Exhibition</option>
                    <option value="Direct Mail">Direct Mail</option>
                    <option value="Recommendation">Recommendation</option>
                    <option value="Other">Other</option>
                </select>
                <div>
                    <span class="text-danger" v-if="$v.question3.$dirty && !$v.question3.required">This is
                        a required
                        field</span>
                </div>
            </div>
            <div class="col-12 mb-3">
                <label class="form-label">Website</label>
                <input type="text" class="bg-white rounded form-control" v-model="$v.website.$model"
                    @blur="$v.website.$touch" />
                <div>
                    <span class="text-danger" v-if="$v.website.$dirty && !$v.website.required">This is a
                        required field</span>
                </div>
            </div>
            <div class="col-12">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="DBTerms" />
                    <label class="form-check-label" for="DBTerms">
                        <small>
                            I accept the <a href="javascript:void(0)"><u>API User Terms</u></a> and I
                            have read the
                            <a href="javascript:void(0)"><u>Data Processing Terms</u></a></small>
                    </label>
                </div>
            </div>
            <div class="col-12">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="newsletter" v-model="subscribeToNewsletter"
                        @change="subscribeOrUnsubscribe" />
                    <label class="form-check-label" for="newsletter">
                        <small>I would like to receive news, insights and best practice
                            from Digital Press</small>
                    </label>
                </div>
            </div>
            <div class="col-12 mt-3">
                <button @click="registerReseller"
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
import Client from 'getaddress-api';
const api = new Client(process.env.ADDRESS);
export default {
    data() {
        return {
            postCode: '',
            addressList: null,
            selectedAddress:null,
            subscribeToNewsletter: false,
            email: "",
            password: "",
            confirmPassword: "",
            first_name: "",
            last_name: "",
            phone: null,
            address1: "",
            address2: "",
            county: "",
            zip: "",
            city: "",
            country: "",
            country_code: "+44",
            company_name: "",
            question1: "",
            question2: "",
            question3: "",
            website: "",
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
        first_name: { required },
        last_name: { required },
        phone: { required },
        address1: { required },
        county: { required },
        zip: { required },
        city: { required },
        country: { required },
        country_code: { required },
        company_name: { required },
        question1: { required },
        question2: { required },
        question3: { required },
        website: { required }
    },

    methods: {
        async findAddress() {
            const findResult = await api.autocomplete(this.postCode);
            if (findResult.isSuccess) {
                const success = findResult.toSuccess();
                this.addressList = success.suggestions
            } else {
                const failed = findResult.toFailed();
                console.log(failed);
            }
        },
        async handleAddressSelected() {
            try {
                const address = await api.get(this.selectedAddress);
                this.address1 = address.address.line_1,
                this.address2 = address.address.line_2,
                this.city = address.address.town_or_city,
                this.country = address.address.country,
                this.county = address.address.county,
                this.zip = address.address.postcode
            } catch (error) {
                console.log(error)
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
        async registerReseller() {
            let data = {
                email: this.email,
                password: this.password,
                first_name: this.first_name,
                last_name: this.last_name,
                phone: this.phone,
                address_details: {
                    address1: this.address1,
                    address2: this.address2,
                    county: this.county,
                    zip: this.zip,
                    city: this.city,
                    country: this.country,
                    country_code: '+44',
                },
                company_name: this.company_name,
                question1: this.question1,
                question2: this.question2,
                question3: this.question3,
                website: this.website,
            }

            this.$v.$touch();
            if (this.$v.$invalid) {
                return;
            } else {
                try {
                    // Create the user account
                    await this.$store.getters.client
                        .post(Constants.CREATE_RESELLER, data)
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

    created() {
        let user = sessionStorage.getItem("user");
        if (user) {
            this.$router.go(-1);
        }
    },
};
</script>
  