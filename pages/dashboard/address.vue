<template>
  <div>
    <div class="cart_page_section myaccount_page dashboard_page bg-white">
      <div class="cart_page_area">
        <div class="myaccount_box mb-4">
          <div class="myaccount_box_title d-flex align-items-center justify-content-between mt-n3 mb-3">
            <h3>Address Book</h3>
            <div class="btn_primary btn_black py-2">
              <button @click="openAddModal" type="button">
                <i class="far fa-plus me-2"></i> Add New Address
              </button>
            </div>
          </div>
          <!-- <pulse-loader class="p-5" v-if="loadSpinner"></pulse-loader> -->
          <div v-if="!loadSpinner" class="myaccount_box_content">
            <div class="myaddresses_items">
              <div class="row" v-if="addressList.length">
                <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 mb-4" v-for="(item, index) in addressList"
                  v-bind:key="index">
                  <div class="myaddress_item" :class="item.is_active == true ? 'default_address' : ''">
                    <div class="myaddress_content">
                      <p> {{ item.first_name }} {{ item.last_name }},
                        <br>{{ item.company_name }} <br>
                        {{ item.street1 }} {{ item.street2 }} {{ item.county }} {{ item.state }} {{ item.city }} {{
                          item.postal_code }}
                        <br>
                        {{ item.phone }}
                      </p>
                    </div>
                    <div class="myaddress_actions d-flex justify-content-between align-items-center">
                      <div v-if="item.is_active">
                        <input type="checkbox" :name="'address_' + item.id" :value="item.is_active"
                          :id="'address_' + item.id" checked="checked" />

                        <label :for="'address_' + item.id">Default Address
                        </label>
                      </div>
                      <div v-if="!item.is_active">
                        <input type="checkbox" name="address" :value="'address_' + item.id" :id="'address_' + item.id"
                          @click="activeDefaultAddress(item)" />
                        <!-- @click="activeDefaultAddress(item)" -->
                        <label :for="'address_' + item.id">Make it default Address
                        </label>
                      </div>
                      <div>
                        <a role="button" href="javascript:void(0)" @click="openEditModal(item)"><i
                            class="fas fa-pencil-alt"></i></a>
                        <a role="button" href="javascript:void(0)" @click="openDeleteModal(item)"><i
                            class="fas fa-trash-alt"></i></a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div v-else class="row">
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 m-4 text-center">
                  <h3>No Address yet</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <b-modal v-model="addressModal" modal-class="requestquote_modal modal_section"
      :title="isEdit ? 'Update Address' : 'Add Address'" centered size="lg" hide-footer>
      <div class="requestmodal_form">
        <div class="row">
          <div class="col-12 col-md-6">
            <div class="form-group">
              <label for="postcode">Postcode*</label>
              <b-input-group>
                <b-form-input v-model="deliveryPostCode" placeholder="Enter your postcode"></b-form-input>
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
                <input type="text" class="form-control" id="fname" v-model="$v.address.first_name.$model"
                  @blur="$v.address.first_name.$touch" />
                <div class="text-danger" v-if="$v.address.first_name.$dirty && !$v.address.first_name.required">
                  Please enter your first name.</div>
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="form-group">
                <label for="lname">Last Name</label>
                <input type="text" v-model="address.last_name" class="form-control" id="lname" />
              </div>
            </div>
            <div class="col-12">
              <div class="form-group">
                <label for="cname">Company Name</label>
                <input type="text" v-model="address.company_name" class="form-control" id="cname" />
              </div>
            </div>
            <div class="col-12">
              <div class="form-group">
                <label>Address*</label>
                <div class="row">
                  <div class=" col-12 col-md-6 mb-2 mb-lg-0">
                    <input type="text" class="form-control" v-model="$v.address.street1.$model"
                      @blur="$v.address.street1.$touch" />
                    <div class="text-danger" v-if="$v.address.street1.$dirty && !$v.address.street1.required">
                      Please enter your street name</div>
                  </div>
                  <div class="col-12 col-md-6 mb-2 mb-lg-0">
                    <input id="formatted_address_1" v-model="address.street2" class="form-control" type="text">
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="form-group">
                <label for="town">Town*</label>
                <input type="text" class="form-control" v-model="$v.address.city.$model" @blur="$v.address.city.$touch" />
                <div class="text-danger" v-if="$v.address.city.$dirty && !$v.address.city.required">
                  Please enter your city</div>
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="form-group">
                <label for="country">County*</label>
                <input type="text" class="form-control" v-model="$v.address.county.$model"
                  @blur="$v.address.county.$touch" />
                <div class="text-danger" v-if="$v.address.county.$dirty && !$v.address.county.required">
                  Please enter your country name</div>
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="form-group">
                <label for="phn">Delivery Contact Number*</label>
                <input type="text" class="form-control" v-model="$v.address.phone.$model"
                  @blur="$v.address.phone.$touch" />
                <div class="text-danger" v-if="$v.address.phone.$dirty && !$v.address.phone.required">
                  Please enter your phone number</div>
              </div>
            </div>
          </div>
          <div class=" btn_primary login_btn btn_black py-2 d-flex justify-content-end gap-3">
            <button type="button" @click="isEdit ? updateDeliveryAddress() : addDeliveryAddress()" class="px-5">
              {{ isEdit ? 'Update Address' : 'Add Address' }}
            </button>
          </div>
        </form>
      </div>
    </b-modal>

    <b-modal v-model="deleteModal" modal-class="requestquote_modal modal_section" hide-footer title="Delete Address">
      <div class="requestmodal_form">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 text-center justify-content-end">
          <h5 class="mb-5">
            Are you sure you want to delete this address?
          </h5>
        </div>
        <div class="d-flex justify-content-end align-items-center">
          <div class="btn_primary">
            <button @click="deleteAddress()">
              Delete
            </button>
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import Client from 'getaddress-api';
const api = new Client(process.env.ADDRESS);
export default {
  data() {
    return {
      isEdit: false,
      selectedAddressID: null,
      addressModal: false,
      deleteModal:false,
      deliveryPostCode: '',
      selectedDeliveryAddress: null,
      maualDeliveryAddress: 'false',
      deliveryAddressList: null,
      address: {
        first_name: null,
        last_name: null,
        company_name: null,
        phone: null,
        shipping_geocode: null,
        street1: null,
        street2: null,
        city: null,
        state: null,
        county: null,
        shipping_pobox: null,
        county: null,
        postal_code: null,
        postal_code_type: null,
        customer: null,
        customer_id: null
      },
      loadSpinner: false,
      user: null,
      addressList: [],
    };
  },

  validations: {
    address: {
      first_name: { required },
      phone: { required },
      street1: { required },
      city: { required },
      county: { required },
    }
  },
  mounted() {
    this.user = JSON.parse(sessionStorage.getItem("user"));
    this.address.customer = this.user.id;
    this.getAddresses();
  },

  methods: {
    async findDelivery() {
      const findResult = await api.autocomplete(this.deliveryPostCode);
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
        this.address.street1 = address.address.line_1,
          this.address.street2 = address.address.line_2,
          this.address.city = address.address.town_or_city,
          this.address.country = address.address.country,
          this.address.county = address.address.county,
          this.address.postal_code = address.address.postcode
      } catch (error) {
        console.log(error)
      }
    },
    async addDeliveryAddress() {
      if (this.$v.address.$invalid) {
        this.$toast.error("Please fill the required fields");
      }
      else {
        try {
          this.loadSpinner = true;
          await this.$store.getters.userClient.post(`/order/shipping-address/`, this.address)
          this.$toast.success("Address is added successfully");
        } catch (error) {
          this.$toast.error('Something went wrong');
        }
        finally {
          this.getAddresses();
          this.addressModal = false
          this.loadSpinner = false;
        }
      }
    },

    async updateDeliveryAddress() {
      if (this.$v.address.$invalid) {
        this.$toast.error("Please fill the required fields");
      }
      else {
        try {
          this.loadSpinner = true;
          this.address.customer = this.address.customer_id;
          await this.$store.getters.userClient.patch(`/order/shipping-address/${this.selectedAddressID}/`, this.address)
          this.$toast.success("Address is added successfully");
        } catch (error) {
          this.$toast.error('Something went wrong');
        }
        finally {
          this.getAddresses();
          this.addressModal = false
          this.loadSpinner = false;
        }
      }
    },

    openEditModal(address) {
      this.isEdit = true,
      this.selectedAddressID = address.id
      this.address = address;
      this.addressModal = true;
    },

    openDeleteModal(address) {
      this.selectedAddressID = address.id
      this.deleteModal = true;
    },

    openAddModal() {
      this.isEdit = false,
      this.emptyValues();
      this.addressModal = true;
    },

    async emptyValues() {
      this.selectedAddressID = null,
        this.address.first_name = null,
        this.address.last_name = null,
        this.address.company_name = null,
        this.address.phone = null,
        this.address.shipping_geocode = null,
        this.address.street1 = null,
        this.address.street2 = null,
        this.address.city = null,
        this.address.state = null,
        this.address.shipping_pobox = null,
        this.address.county = null,
        this.address.postal_code = null,
        this.address.postal_code_type = null
    },

    getAddresses() {
      this.loadSpinner = true;

      this.$store.getters.userClient
        .post(`/user/user-shipping-address`)
        .then((response) => {
          this.loadSpinner = false;
          this.addressList = response.data.result;
        })
        .catch(({ response }) => {
          this.loadSpinner = false;
          this.$toast.error(response.data.detail);
        });
    },

    deleteAddress() {
      this.loadSpinner = true;
      try {
        this.$store.getters.userClient.delete(`order/shipping-address/${this.selectedAddressID}/`)
        this.$toast.success("Address deleted successfully");
      } catch (error) {
        this.$toast.error('Something went wrong! Try again after some time.');
      }finally{
        this.getAddresses();
        this.loadSpinner = false;
        this.deleteModal = false;
        this.selectedAddressID = null;
      }
    },
  },
};
</script>

<style>
.modal.fade.show+.modal-backdrop {
  background-color: rgba(50, 50, 50, 0.88);
}
</style>