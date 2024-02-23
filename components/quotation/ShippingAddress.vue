<template>
    <div class="collpase_item_inner py-4">
        <div class="px-4">
            <div class="row">
                <div class="col-12 col-md-6">
                    <div class="form-group">
                        <label for="postcode">Postcode<span class="text-danger">*</span></label>
                        <b-input-group class="mt-3">
                            <b-form-input v-model="address.shipping_postal_code"
                                placeholder="Enter your postcode"></b-form-input>
                            <b-input-group-append v-if="maualDeliveryAddress === 'false'">
                                <b-button variant="secondary" @click="findDelivery">Search</b-button>
                            </b-input-group-append>
                        </b-input-group>
                        <select v-if="deliveryAddressList !== null && maualDeliveryAddress === 'false'"
                            v-model="selectedDeliveryAddress" @change="handleAddressSelected" class="form-control mt-2">
                            <option v-for="item in deliveryAddressList" :value="item.id" :key="item.id">
                                {{ item.address }}
                            </option>
                        </select>
                    </div>
                    <div class="form-group pt-1">
                        <b-form-checkbox id="checkbox-1" v-model="maualDeliveryAddress" name="checkbox-1" value="true"
                            unchecked-value="false" class="remember_checkbox">
                            Enter Address Manually
                        </b-form-checkbox>
                    </div>
                </div>
            </div>
            <hr />
            <form>
                <div class="row">
                    <div class="col-12 col-md-6">
                        <div class="form-group">
                            <label for="fname">First Name<span class="text-danger">*</span></label>
                            <input type="text" class="form-control" id="fname"
                                v-model="$v.address.shipping_first_name.$model"
                                @blur="$v.address.shipping_first_name.$touch" />
                            <div class="text-danger"
                                v-if="$v.address.shipping_first_name.$dirty && !$v.address.shipping_first_name.required">
                                Please enter your first name.</div>
                        </div>
                    </div>
                    <div class="col-12 col-md-6">
                        <div class="form-group">
                            <label for="lname">Last Name</label>
                            <input type="text" v-model="address.shipping_last_name" class="form-control" id="lname" />
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="form-group">
                            <label for="cname">Company Name</label>
                            <input type="text" v-model="address.shipping_company" class="form-control" id="cname" />
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="form-group">
                            <label>Address<span class="text-danger">*</span></label>
                            <div class="row">
                                <div class=" col-12 col-md-6 mb-2 mb-lg-0">
                                    <input type="text" class="form-control" v-model="$v.address.shipping_street1.$model"
                                        @blur="$v.address.shipping_street1.$touch" />
                                    <div class="text-danger"
                                        v-if="$v.address.shipping_street1.$dirty && !$v.address.shipping_street1.required">
                                        Please enter your street name</div>
                                </div>
                                <div class="col-12 col-md-6 mb-2 mb-lg-0">
                                    <input id="formatted_address_1" v-model="address.shipping_street2" class="form-control"
                                        type="text">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-md-6">
                        <div class="form-group">
                            <label for="town">Town<span class="text-danger">*</span></label>
                            <input type="text" class="form-control" v-model="$v.address.shipping_city.$model"
                                @blur="$v.address.shipping_city.$touch" />
                            <div class="text-danger"
                                v-if="$v.address.shipping_city.$dirty && !$v.address.shipping_city.required">
                                Please enter your city</div>
                        </div>
                    </div>
                    <div class="col-12 col-md-6">
                        <div class="form-group">
                            <label for="country">Country<span class="text-danger">*</span></label>
                            <input type="text" class="form-control" v-model="$v.address.shipping_county.$model"
                                @blur="$v.address.shipping_county.$touch" />
                            <div class="text-danger"
                                v-if="$v.address.shipping_county.$dirty && !$v.address.shipping_county.required">
                                Please enter your country name</div>
                        </div>
                    </div>
                    <div class="col-12 col-md-6">
                        <div class="form-group">
                            <label for="phn">Delivery Contact Number<span class="text-danger">*</span></label>
                            <input type="text" class="form-control" v-model="$v.address.shipping_mobile.$model"
                                @blur="$v.address.shipping_mobile.$touch" />
                            <div class="text-danger"
                                v-if="$v.address.shipping_mobile.$dirty && !$v.address.shipping_mobile.required">
                                Please enter your country name</div>
                        </div>
                    </div>
                </div>
                <div class=" btn_primary login_btn btn_black py-2 d-flex align-items-center">
                    <button type="button" @click="submitDeliveryAddress" class="px-5">
                        Save Delivery Address
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import { mapActions, mapState } from 'vuex';
import Client from 'getaddress-api';
const api = new Client(process.env.ADDRESS);
export default {
    data() {
        return {
            selected: 0,
            newAddress: false,
            selectedDeliveryAddress: null,
            maualDeliveryAddress: 'false',
            deliveryAddressList: null,
            address: {
                shipping_first_name: null,
                shipping_last_name: null,
                shipping_company: null,
                shipping_mobile: null,
                shipping_geocode: null,
                shipping_street1: null,
                shipping_street2: null,
                shipping_city: null,
                shipping_state: null,
                shipping_country: null,
                shipping_pobox: null,
                shipping_county: null,
                shipping_postal_code: null,
                shipping_postal_code_type: null
            },
            addressList: [],
        }
    },
    validations: {
        address: {
            shipping_first_name: { required },
            shipping_mobile: { required },
            shipping_street1: { required },
            shipping_city: { required },
            shipping_county: { required },
        }
    },
    computed: {
        ...mapState("quotation", ['quotationData',])
    },
    mounted() {
        this.preFillAddress()
    },
    methods: {
        ...mapActions('quotation', ['addDeliveryAddress', 'updateCheckoutStep']),
        async findDelivery() {
            const findResult = await api.autocomplete(this.address.shipping_postal_code);
            if (findResult.isSuccess) {
                const success = findResult.toSuccess();
                this.deliveryAddressList = success.suggestions
            } else {
                const failed = findResult.toFailed();
                console.log(failed);
            }
        },
        preFillAddress() {
            this.address.shipping_first_name = this.quotationData?.users?.first_name,
                this.address.shipping_last_name = this.quotationData?.users?.last_name,
                this.address.shipping_company = this.quotationData?.company_details,
                this.address.shipping_mobile = this.quotationData?.users?.mobile,
                this.address.shipping_street1 = this.quotationData?.billing_address[0]?.street1,
                this.address.shipping_street2 = this.quotationData?.billing_address[0]?.street2,
                this.address.shipping_city = this.quotationData?.billing_address[0]?.city,
                this.address.shipping_state = this.quotationData?.billing_address[0]?.state,
                this.address.shipping_county = this.quotationData?.billing_address[0]?.county,
                this.address.shipping_postal_code = this.quotationData?.billing_address[0]?.postal_code
        },
        async handleAddressSelected() {
            try {
                const address = await api.get(this.selectedDeliveryAddress);
                this.address.shipping_street1 = address.address.line_1,
                    this.address.shipping_street2 = address.address.line_2,
                    this.address.shipping_city = address.address.town_or_city,
                    this.address.shipping_county = address.address.country,
                    this.address.shipping_county = address.address.county,
                    this.address.shipping_postal_code = address.address.postcode
            } catch (error) {
                console.log(error)
            }
        },
        submitDeliveryAddress() {
            if (this.$v.address.$invalid) {
                this.$v.$touch();
                this.$toast.error("Please fill the required fields");
                return
            }
            else {
                // console.log(this.address)
                this.addDeliveryAddress(this.address)
                this.updateCheckoutStep(2)
                this.$toast.success("Delivery Address is added successfully");
            }
        },
    }
}
</script>

<style>
.btn.btn-outline-secondary.active {
    background-color: #0096ae !important;
}
</style>