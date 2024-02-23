<template>
  <div>
    <div class="bordered_box cart_items_table p-0 mb-4">
      <div class="table-responsive">
        <table class="table table-bordered m-0">
          <thead>
            <tr>
              <th>Product Details</th>
              <th>Quantity</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>

          <tbody v-if="cart">
            <tr v-for="(cItem, index) in cart" :key="index">
              <td class="item_details_td">
                <div class="d-flex">
                  <div class="img_area me-2">
                    <nuxt-link :to="{ path: '/p/' + cItem.id }">
                      <img v-if="cItem.product_images[0]" :src="cItem.product_images[0].image" alt="..."
                        class="img-fluid" />
                      <img v-if="!cItem.product_images"
                        src="https://www.slntechnologies.com/wp-content/uploads/2017/08/ef3-placeholder-image.jpg"
                        alt="..." class="img-fluid" />
                    </nuxt-link>
                  </div>
                  <div>
                    <p>
                      <nuxt-link :to="{ path: '/p/' + cItem.id }">
                        <strong>{{ cItem.name }}</strong>
                        <br />
                        <div class="desc line-3">
                          <ul class="ms-3">
                            <li v-for="(varient, i) in cItem.combination" :key="i">
                              {{ varient.attributeName }} : {{
                                varient.attributeValueName }}
                            </li>
                          </ul>
                        </div>
                      </nuxt-link>
                    </p>
                  </div>
                </div>
              </td>
              <td class="item_price_td">
                <p>{{ cItem.quantity }}</p>
              </td>
              <td class="item_price_td">
                <p>&#163;{{ cItem.price.toFixed(2) }}</p>
              </td>
              <td class="item_action_td">
                <a><i v-on:click="removeCartItem(cItem)" class="far fa-trash-alt"></i></a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="p-3 greybox_area mb-3">
      <h5>Delivery Upgrade Options:</h5>
      <p> Extended Areas: If you live in the following areas, please allow an extra day to
        your delivery:
        Northern Ireland, Aberdeen, Argyll, Arran, Dundee, Northern Highlands, Orkney
        Shetland, Cornwall and
        Isle of Man.A full list of postcodes can be found here</p>
      <div class="row no-gutters">
        <div class="col-md-6 col-12 pr-3">
          <div class="form-group select_form_group mb-md-0">
            <div class="input-group">
              <select id="deliveryOption" @change="deliveryOption(deliveryType)" v-model="deliveryType"
                class="form-control">
                <option value="standard">Standard</option>
                <option value="pre-noon">Pre noon</option>
              </select>
              <div class="input-group-append" for="deliveryOption">
                <i class="far fa-chevron-down"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-12">
          <div class="delivery_date d-flex align-items-center">
            <div class="bg_primary">
              <h6>Estimated Delivery</h6>
            </div>
            <div class="bg_white">
              <p>{{ deliveryTime | moment("ddd, Do MMMM YYYY") }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 col-12">
        <div class="p-3 greybox_area mb-3 couponcode_area">
          <h5>Have a coupon code?</h5>
          <div class="input-group">
            <input type="text" class="form-control" placeholder="Gift card or discount code" v-model="coupon" />
            <div class="input-group-append btn_primary">
              <button type="button" @click="ApplyCode">
                Apply
              </button>
            </div>
          </div>
          <div v-if="couponStatus">
            <span class="text-success d-flex align-items-center mt-2" v-if="couponStatus == 'success'">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
                <path
                  d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11.0026 16L6.75999 11.7574L8.17421 10.3431L11.0026 13.1716L16.6595 7.51472L18.0737 8.92893L11.0026 16Z"
                  fill="rgba(40,167,69,1)"></path>
              </svg>
              <small class="ms-1">
                {{ couponMessage }}
              </small>
            </span>
            <span class="text-danger d-flex align-items-center mt-2" v-if="couponStatus == 'invalid'">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
                <path
                  d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 15H13V17H11V15ZM11 7H13V13H11V7Z"
                  fill="rgba(220,53,69,1)"></path>
              </svg>
              <small class="ms-1">
                {{ couponMessage }}
              </small>
            </span>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-12">
        <div class="p-3 greybox_area mb-3 couponcode_area">
          <h5>Reference</h5>
          <div class="input-group mb-3">
            <input type="text" class="form-control" v-model="refName" placeholder="Give your order a reference name" />
          </div>
          <div class="input-group">
            <input type="text" class="form-control" v-model="refPO" placeholder="Give your order a PO number" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import { URL } from "@/api/global.env";
export default {
  data() {
    return {
      MEDIA_URL: URL,
      isLogin: false,
      coupon: '',
      deliveryOptions: null,
      deliveryMethods: {},
      totalDelivery: 0.00,
      deliveryAmount: null,
      deliveryType: 'standard',
      date: new Date(),
      deliveryTime: null,
      refName: '',
      refPO: '',
      totalDiscount: 0,
      couponStatus: null,
      couponMessage: ''
    };
  },

  async mounted() {
    if (process.client) {
      this.calculateDeliveryDate()
    }
  },

  computed: {
    ...mapState('cart', ['cart']),
    ...mapGetters('cart', ['cartItemCount']),
  },

  methods: {
    ...mapActions('cart', ['deliveryOption']),

    calculateDeliveryDate() {
      let deliveryDate = this.cart ? this.cart[0].deliveryDays : 1
      let tody = new Date();
      let momentBusinessDays = require("moment-business-days");
      this.deliveryTime = momentBusinessDays(tody, "DD-MM-YYYY").businessAdd(deliveryDate)._d;
    },

    removeCartItem(product) {
      this.$store.dispatch("cart/removeCartItem", product);
    },

    async ApplyCode() {
      let products = this.cart.map(item => {
        return {
          product_id: item.id,
          price: item.price
        }
      })
      let payload = {
        product_items: products,
        coupon: this.coupon
      }
      await this.$store.getters.userClient
        .post(`/order/coupon-apply/`, payload)
        .then((response) => {
          let result = response.data.data
          if (response.data.status === 'success') {
            this.couponMessage = response.data.message;
            this.couponStatus = 'success'
          } else {
            this.couponStatus = 'invalid'
            this.couponMessage = "The Coupon is invalid/expired"
            return
          }
          this.totalDiscount = result.reduce((accumulator, obj) => {
            return accumulator + Number(obj.discounted_price);
          }, 0);
        }).catch((error) => {
          this.couponStatus = 'invalid'
          this.couponMessage = "The Coupon is invalid/expired"
        });
    },

    saveRef() {
      let referance = {
        name: this.refName,
        po: this.refPO,
        deliveryType: this.deliveryType
      }
      this.$store.dispatch("cart/addReferance", referance);
    },
  },
};
</script>

<style scoped>
.modal.login-modal {
  background-color: rgb(0, 0, 0, 0.3);
}
</style>