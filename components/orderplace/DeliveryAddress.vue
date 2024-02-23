<template>
    <div class="collpase_item_inner py-4">
        <div class="px-4">
            <div>
                <b-form-group v-slot="{ ariaDescribedby }" class="w-100">
                    <b-form-radio-group id="address-method" class="w-100 border-secondary"
                        style="border-color: #6c757d !important;" button-variant="outline-secondary shadow-none"
                        v-model="selectedAddressMethod" :options="options" :aria-describedby="ariaDescribedby"
                        name="radios-btn-default" buttons></b-form-radio-group>
                </b-form-group>
            </div>
            <template v-if="selectedAddressMethod === 'select-from-list'">
                <b-alert show :variant="index === selected ? 'success' : 'secondary'"
                    v-for="(address, index) in addressList" :key="index">
                    <b-row @click="selected = index">
                        <b-col>
                            <p>
                                <b>{{ address.first_name }} {{ address.last_name }}</b> <br>
                                {{ address.company_name }} <br> {{ address.street1 }} {{ address.street2 }} {{ address.city
                                }}
                                {{ address.state }} {{ address.county }} {{ address.postal_code }} <br> {{ address.phone }}
                            </p>
                        </b-col>
                    </b-row>
                    <hr v-if="selected === index">
                    <p class="mb-0" v-if="selected === index">
                        <b-button size="sm" variant="success" type="button" @click="saveFromAddressList(address)">Deliver
                            Here</b-button>
                    </p>
                </b-alert>
            </template>

            <div v-if="selectedAddressMethod === 'new-address'">
                <div class="row">
                    <div class="col-12 col-md-6">
                        <div class="form-group">
                            <label for="postcode">Postcode*</label>
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
                                <label for="fname">First Name*</label>
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
                                <label>Address*</label>
                                <div class="row">
                                    <div class=" col-12 col-md-6 mb-2 mb-lg-0">
                                        <input type="text" class="form-control" v-model="$v.address.shipping_street1.$model"
                                            @blur="$v.address.shipping_street1.$touch" />
                                        <div class="text-danger"
                                            v-if="$v.address.shipping_street1.$dirty && !$v.address.shipping_street1.required">
                                            Please enter your street name</div>
                                    </div>
                                    <div class="col-12 col-md-6 mb-2 mb-lg-0">
                                        <input id="formatted_address_1" v-model="address.shipping_street2"
                                            class="form-control" type="text">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-md-6">
                            <div class="form-group">
                                <label for="town">Town*</label>
                                <input type="text" class="form-control" v-model="$v.address.shipping_city.$model"
                                    @blur="$v.address.shipping_city.$touch" />
                                <div class="text-danger"
                                    v-if="$v.address.shipping_city.$dirty && !$v.address.shipping_city.required">
                                    Please enter your city</div>
                            </div>
                        </div>
                        <div class="col-12 col-md-6">
                            <div class="form-group">
                                <label for="country">Country*</label>
                                <input type="text" class="form-control" v-model="$v.address.shipping_country.$model"
                                    @blur="$v.address.shipping_country.$touch" />
                                <div class="text-danger"
                                    v-if="$v.address.shipping_country.$dirty && !$v.address.shipping_country.required">
                                    Please enter your country name</div>
                            </div>
                        </div>
                        <div class="col-12 col-md-6">
                            <div class="form-group">
                                <label for="phn">Delivery Contact Number*</label>
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
                            Next
                        </button>
                    </div>
                </form>
            </div>

        </div>
    </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import { mapActions } from 'vuex';
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
            selectedAddressMethod: 'new-address',
            options: [
                { text: 'ADD NEW DELIVERY ADDRESS', value: 'new-address' },
                { text: 'SELECT FROM ADDRESS BOOK', value: 'select-from-list', disabled: !this.isSelectFromListDisabled, },
            ]
        }
    },
    validations: {
        address: {
            shipping_first_name: { required },
            shipping_mobile: { required },
            shipping_street1: { required },
            shipping_city: { required },
            shipping_country: { required },
        }
    },
    computed: {
        isSelectFromListDisabled() {
            return this.addressList.length === 0;
        },
    },
    mounted() {
        this.getAddresses();
    },
    methods: {
        ...mapActions('cart', ['addDeliveryAddress']),
        ...mapActions('order', ['updateOrderStep']),
        getAddresses() {
            this.$store.getters.userClient
                .post(`/user/user-shipping-address`)
                .then((response) => {
                    let Addresses = response.data.result;
                    this.addressList = Addresses.map((item, index) => {
                        return {
                            ...item,
                            selected: index === 0 ? true : false,
                        };
                    });
                })
                .catch(({ response }) => {
                    this.$toast.error(response);
                });
        },
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
        async handleAddressSelected() {
            try {
                const address = await api.get(this.selectedDeliveryAddress);
                this.address.shipping_street1 = address.address.line_1,
                    this.address.shipping_street2 = address.address.line_2,
                    this.address.shipping_city = address.address.town_or_city,
                    this.address.shipping_country = address.address.country,
                    this.address.shipping_county = address.address.county,
                    this.address.shipping_postal_code = address.address.postcode
            } catch (error) {
                console.log(error)
            }
        },
        submitDeliveryAddress() {
            if (this.$v.address.$invalid) {
                this.$toast.error("Please fill the required fields");
                return
            }
            else {
                console.log(this.address)
                this.addDeliveryAddress(this.address)
                this.updateOrderStep(2)
                this.$toast.success("Delivery Address is added successfully");
            }
        },
        saveFromAddressList(address) {
            const Address = {
                shipping_first_name: address.first_name,
                shipping_last_name: address.last_name,
                shipping_company: address.company_name,
                shipping_mobile: address.phone,
                shipping_street1: address.street1,
                shipping_street2: address.street2,
                shipping_city: address.city,
                shipping_state: address.state,
                shipping_county: address.county,
                shipping_postal_code: address.postal_code,
            }
            this.addDeliveryAddress(Address)
            this.updateOrderStep(2)
            this.$toast.success("Delivery Address is added successfully");
        },
        async newDeliveryAddress() {
            const user =JSON.parse(sessionStorage.getItem("user"))
            let formData = {
                first_name: this.address.shipping_first_name,
                last_name: this.address.shipping_last_name,
                company_name: this.address.shipping_company,
                phone: this.address.shipping_mobile,
                street1: this.address.shipping_street1,
                street2: this.address.shipping_street2,
                city: this.address.shipping_city,
                state: this.address.shipping_state,
                county: this.address.shipping_county,
                postal_code: this.address.shipping_postal_code,
                customer: user.id,
            }
            try {
                await this.$store.getters.userClient.post(`/order/shipping-address/`, formData)
            } catch (error) {
                this.$toast.error('Something went wrong');
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