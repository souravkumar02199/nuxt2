<template>
    <form>
        <div class="collpase_item_inner py-4">
            <div class="px-4">
                <b-form-group v-slot="{ ariaDescribedby }" class="w-100">
                    <b-form-radio-group id="address-method" class="w-100 border-secondary"
                        style="border-color: #6c757d !important;" button-variant="outline-secondary shadow-none"
                        v-model="selectedAddressMethod" :options="options" :aria-describedby="ariaDescribedby"
                        name="radios-btn-default" buttons></b-form-radio-group>
                </b-form-group>
            </div>
            <div class="px-4">
                <div class="row" v-if="selectedAddressMethod === 'new-billing-address'">
                    <div class="col-12 col-md-6">
                        <div class="form-group">
                            <label for="postcode">Postcode*</label>
                            <b-input-group class="mt-3">
                                <b-form-input v-model="billingPostCode" placeholder="Enter your postcode"></b-form-input>
                                <b-input-group-append v-if="maualBillingAddress === 'false'">
                                    <b-button variant="secondary" @click="findBilling">Search</b-button>
                                </b-input-group-append>
                            </b-input-group>
                            <select v-if="billingAddressList !== null && maualBillingAddress === 'false'"
                                v-model="selectedBillingAddress" @change="handleBillingAddressSelected"
                                class="form-control mt-2">
                                <option v-for="item in billingAddressList" :value="item.id" :key="item.id">
                                    {{ item.address }}
                                </option>
                            </select>
                        </div>
                        <div class="form-group pt-1">
                            <b-form-checkbox id="checkbox-2" v-model="maualBillingAddress" name="checkbox-4" value="true"
                                unchecked-value="false" class="remember_checkbox">
                                Enter Address Manually
                            </b-form-checkbox>
                        </div>
                    </div>
                </div>
                <hr v-if="selectedAddressMethod === 'new-billing-address'" />
                <div class="row" v-if="selectedAddressMethod === 'new-billing-address'">
                    <div class="col-12 col-md-6">
                        <div class="form-group">
                            <label for="fname">First Name*</label>
                            <input type="text" class="form-control" id="fname"
                                v-model="$v.addressData.billing_first_name.$model"
                                @blur="$v.addressData.billing_first_name.$touch" />
                            <div class="text-danger"
                                v-if="$v.addressData.billing_first_name.$dirty && !$v.addressData.billing_first_name.required">
                                Please enter your first name.</div>
                        </div>
                    </div>
                    <div class="col-12 col-md-6">
                        <div class="form-group">
                            <label for="lname">Last Name</label>
                            <input type="text" v-model="addressData.billing_last_name" class="form-control" id="lname" />
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="form-group">
                            <label for="cname">Company Name</label>
                            <input type="text" v-model="addressData.billing_company" class="form-control" id="cname" />
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="form-group">
                            <label>Address*</label>
                            <div class="row">
                                <div class=" col-12 col-md-6 mb-2 mb-lg-0">
                                    <input type="text" class="form-control" v-model="$v.addressData.billing_street1.$model"
                                        @blur="$v.addressData.billing_street1.$touch" />
                                    <div class="text-danger"
                                        v-if="$v.addressData.billing_street1.$dirty && !$v.addressData.billing_street1.required">
                                        Please enter your street name</div>
                                </div>
                                <div class="col-12 col-md-6 mb-2 mb-lg-0">
                                    <input id="formatted_address_1" v-model="addressData.billing_street2"
                                        class="form-control" type="text">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-md-6">
                        <div class="form-group">
                            <label for="town">Town*</label>
                            <input type="text" class="form-control" v-model="$v.addressData.billing_city.$model"
                                @blur="$v.addressData.billing_city.$touch" />
                            <div class="text-danger"
                                v-if="$v.addressData.billing_city.$dirty && !$v.addressData.billing_city.required">
                                Please enter your city</div>
                        </div>
                    </div>
                    <div class="col-12 col-md-6">
                        <div class="form-group">
                            <label for="country">Country*</label>
                            <input type="text" class="form-control" v-model="addressData.billing_country" />
                        </div>
                    </div>
                    <div class="col-12 col-md-6">
                        <div class="form-group">
                            <label for="phn">Delivery Contact Number*</label>
                            <input type="text" class="form-control" v-model="$v.addressData.billing_mobile.$model"
                                @blur="$v.addressData.billing_mobile.$touch" />
                            <div class="text-danger"
                                v-if="$v.addressData.billing_mobile.$dirty && !$v.addressData.billing_mobile.required">
                                Please enter your country name</div>
                        </div>
                    </div>
                </div>
                <div class="btn_primary login_btn btn_black py-2">
                    <button class="px-5" type="button" @click="submitBillingAddress()">Next</button>
                </div>
            </div>
        </div>
    </form>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import { mapActions, mapState, mapGetters } from 'vuex';
import Client from 'getaddress-api';
const api = new Client(process.env.ADDRESS);
export default {
    data() {
        return {
            billingPostCode: '',
            selectedBillingAddress: null,
            billingAddressList: null,
            maualBillingAddress: 'false',
            addressData: {
                billing_first_name: null,
                billing_last_name: null,
                billing_company: null,
                billing_mobile: null,
                billing_geocode: null,
                billing_street1: null,
                billing_street2: null,
                billing_city: null,
                billing_state: null,
                billing_country: null,
                billing_pobox: null,
                billing_county: null,
                billing_postal_code: null,
                billing_postal_code_type: null
            },
            selectedAddressMethod: 'new-billing-address',
            options: [
                { text: 'ADD NEW BILLING ADDRESS', value: 'new-billing-address' },
                { text: 'SAME AS DELIVERY ADDRESS', value: 'same-as-delivery' },
            ]
        }
    },
    validations: {
        addressData: {
            billing_first_name: { required },
            billing_mobile: { required },
            billing_street1: { required },
            billing_city: { required },
        }
    },
    computed: {
        ...mapGetters('cart', ['isDelivery']),
    },
    methods: {
        ...mapActions('cart', ['addBillingAddress']),
        ...mapActions('order', ['updateOrderStep']),
        async findBilling() {
            const findResult = await api.autocomplete(this.billingPostCode);
            if (findResult.isSuccess) {
                const success = findResult.toSuccess();
                this.billingAddressList = success.suggestions
            } else {
                const failed = findResult.toFailed();
                console.log(failed);
            }
        },
        async handleBillingAddressSelected() {
            try {
                const address = await api.get(this.selectedBillingAddress);
                this.addressData.billing_street1 = address.address.line_1,
                    this.addressData.billing_street2 = address.address.line_2,
                    this.addressData.billing_city = address.address.town_or_city,
                    this.addressData.billing_country = address.address.country,
                    this.addressData.billing_county = address.address.county,
                    this.addressData.billing_postal_code = address.address.postcode
            } catch (error) {
                console.log(error)
            }
        },
        applyDeliveryAddress() {
            this.addressData.billing_first_name = this.isDelivery.shipping_first_name,
                this.addressData.billing_last_name = this.isDelivery.shipping_last_name,
                this.addressData.billing_company = this.isDelivery.shipping_company,
                this.addressData.billing_mobile = this.isDelivery.shipping_mobile,
                this.addressData.billing_geocode = this.isDelivery.shipping_geocode,
                this.addressData.billing_street1 = this.isDelivery.shipping_street1,
                this.addressData.billing_street2 = this.isDelivery.shipping_street2,
                this.addressData.billing_city = this.isDelivery.shipping_city,
                this.addressData.billing_state = this.isDelivery.shipping_state,
                this.addressData.billing_country = this.isDelivery.shipping_country,
                this.addressData.billing_pobox = this.isDelivery.shipping_pobox,
                this.addressData.billing_county = this.isDelivery.shipping_county,
                this.addressData.billing_postal_code = this.isDelivery.shipping_postal_code,
                this.addressData.billing_postal_code_type = this.isDelivery.shipping_postal_code_type
        },
        async submitBillingAddress() {
            if (this.selectedAddressMethod === 'same-as-delivery') {
                await this.applyDeliveryAddress()
                this.addBillingAddress(this.addressData)
                this.updateOrderStep(3)
                this.$toast.success("Billing Address is added successfully");
            } else {
                if (this.$v.addressData.$invalid) {
                    this.$toast.error("Please fill the required fields");
                }
                else {
                    this.addBillingAddress(this.addressData)
                    this.updateOrderStep(3)
                    this.$toast.success("Billing Address is added successfully");
                }
            }
        }
    }
}
</script>

<style></style>