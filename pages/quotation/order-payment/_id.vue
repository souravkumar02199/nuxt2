<template>
  <div class="cart_page_section py-4 bg-white">
    <StripeJS />
    <StripeCheckout />
    <div class="container">
      <h4 class="mb-3">ORDER NUMBER: #{{ orderdata?.number }}</h4>
      <div class="cart_page_area">
        <div class="row">
          <div class="col-lg-9 col-12">
            <div class="left_area">
              <div class="cartforms_collapses">
                <!-- Payment Method -->
                <div class="cartform_collapse_item">
                  <div class="collapse_item_title">
                    <button v-b-toggle.payment_info >Make Payment</button>
                  </div>
                  <b-collapse class="collpase_item_body border-bottom-0" visible id="payment_info">
                    <div class="collpase_item_inner py-4">
                      <div class="px-4">
                        <div class="row">
                          <div class="col-12">
                            <div class="form-group">
                              <label for="card-element">Card Number</label>
                              <div id="card-number-element"></div>
                            </div>
                          </div>
                          <div class="col-6">
                            <div class="form-group">
                              <label for="card-element">Card Expiry</label>
                              <div id="card-expiry-element"></div>
                            </div>
                          </div>
                          <div class="col-6">
                            <div class="form-group">
                              <label for="card-element">CVV</label>
                              <div id="card-cvc-element"></div>
                            </div>
                          </div>
                        </div>
                        <div class="btn_primary login_btn btn_black py-2">
                          <button type="button" @click.prevent="makePayment" :disabled="loading" class="px-5">
                            <span v-if="!loading">Buy Now</span>
                            <span v-else><b-spinner small type="grow"></b-spinner> Buy Now</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </b-collapse>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-12">
            <div class="bg-light rounded p-3">
              <h5 class="border-bottom pb-3"><b>Order Summary</b></h5>
              <div class="ordersummary_info d-flex flex-column pt-3 gap-3">
                <div class=" d-flex justify-content-between align-items-center">
                  <div class="">
                    <h6>Subtotal:</h6>
                  </div>
                  <div class="text-end">
                    <p>&#163;{{ orderdata?.order_subtotal}}</p>
                  </div>
                </div>
                <div class=" d-flex justify-content-between align-items-center">
                  <div>
                    <h6>Artwork Checking:</h6>
                  </div>
                  <div class="text-end">
                    <p>&#163;{{ orderdata?.design_service_price || '0.00' }}</p>
                  </div>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <h6>Delivery:</h6>
                  </div>
                  <div class="text-end">
                    <p>&#163;{{ orderdata?.shipping_amount || '0.00' }}</p>
                  </div>
                </div>
                <div class=" d-flex justify-content-between align-items-center">
                  <div>
                    <h6>Discount:</h6>
                  </div>
                  <div class="text-end">
                    <p>&#163;{{ orderdata?.discount_amount || '0.00' }}</p>
                  </div>
                </div>
                <div class=" d-flex justify-content-between align-items-center">
                  <div>
                    <h6>Vat:</h6>
                  </div>
                  <div class="text-end">
                    <p>&#163;{{ orderdata?.vat_amount || '0.00' }}</p>
                  </div>
                </div>
                <div class=" d-flex justify-content-between align-items-center total_area pt-3 border-top">
                  <div>
                    <h6>Total:</h6>
                  </div>
                  <div class="text-end">
                    <p>&#163;{{ orderdata?.price_amount }}</p>
                  </div>
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
import axios from "axios";
import { URL } from "@/api/global.env.js";
const PK = process.env.STRIPE_PK
var options = {
  style: {
    base: {
      color: '#000000',
      fontSmoothing: 'antialiased',
      fontFamily: 'inherit',
      fontSize: '14px',
      '::placeholder': {
        color: '#aab7c4'
      },
    },
  },
  classes: {
    base: 'form-control rounded height-50',
    complete: 'form-control rounded',
    empty: 'form-control rounded',
    invalid: 'border-danger text-danger',
  },
};
export default {
  layout: "mail",
  data() {
    return {
      AUTH:'',
      URL: URL,
      orderdata: null,
      loading: false,
      stripe: null,
      CARD_NUMBER: null,
      EXPIRY: null,
      CVV: null,
    };
  },
  created() {
    const PATH_ID = this.$route.params.id.split("-");
    this.id = PATH_ID[1];
    this.AUTH = this.$route.query.token;
  },
  mounted() {
    setTimeout(() => {
      this.stripe = Stripe(PK)
      this.createAndMountFormElements();
    }, 1000);;
    this.getOrderData();
  },
  methods: {
    async createAndMountFormElements() {
      var elements = this.stripe.elements();

      var cardNumber = elements.create('cardNumber', {
        showIcon: true,
        style: {
          base: {
            color: '#000000',
            fontSmoothing: 'antialiased',
            fontFamily: 'inherit',
            fontSize: '14px',
            '::placeholder': {
              color: '#aab7c4'
            },
          },
        },
        classes: {
          base: 'form-control rounded height-50',
          complete: 'form-control rounded',
          empty: 'form-control rounded',
          invalid: 'border-danger text-danger',
        },
      });
      this.CARD_NUMBER = cardNumber

      var cardExpiry = elements.create('cardExpiry', options);
      this.EXPIRY = cardExpiry

      var cardCvc = elements.create('cardCvc', options);
      this.CVV = cardCvc

      cardNumber.mount('#card-number-element');

      cardExpiry.mount('#card-expiry-element');

      cardCvc.mount('#card-cvc-element');

      cardNumber.addEventListener('change', (event) => {
        this.setValidationError(event);
      });

      cardExpiry.addEventListener('change', (event) => {
        this.setValidationError(event);
      });

      cardCvc.addEventListener('change', (event) => {
        this.setValidationError(event);
      });
    },

    async getOrderData() {
      try {
        const res = await axios.get(`${URL}/api/order/create-order/${this.id}/`, {
          headers: {
            Authorization: `Bearer ${this.AUTH}`,
          },
        });
        this.orderdata = res.data
      } catch (error) {
        console.log(error)
      }
    },

    setValidationError(event) {
      this.stripeValidationError = event.error ? event.error.message : "";
    },

    async getStripeToken() {
      const result = await this.stripe.createToken(this.CARD_NUMBER, this.EXPIRY, this.CVV);
      if (result.error) {
        this.stripeValidationError = result.error.message;
      } else if (result.token) {
        return result.token;
      }
    },

    async createPaymentMethod() {
      const { paymentMethod, error } = await this.stripe.createPaymentMethod({
        type: 'card',
        card: (this.CARD_NUMBER, this.EXPIRY, this.CVV),
      });
      if (error) {
        console.error(error);
        return
      }
      else {
        const { paymentIntent, error } = await this.stripe.confirmCardPayment(response.data.clientSecret, {
          payment_method: paymentMethod.id,
        });
        console.log("paymentIntent", paymentIntent)
        if (error) {
          console.error(error);
          return
        }
      }
    },

    async makePayment() {
      this.loading = true;
      const TOKEN = await this.getStripeToken();
      try {
        const transitionData = {
          is_active: false,
          is_trash: false,
          batch_id: TOKEN.id,
          token: TOKEN.id,
          tran_date: this.$moment(new Date()).format("YYYY-MM-DD"),
          tran_status: "Success",
          tran_amount: this.orderdata.price_amount,
          tran_currency: "Pound",
          cc_number: TOKEN.card.last4,
          cc_type: TOKEN.card.funding,
          cc_exp_date: `2022-12-07`,
          cc_display_number: "",
          cc_company: TOKEN.card.brand,
          geocode: "",
          street1: "",
          street2: "",
          city: "",
          state: "",
          pobox: "",
          description: "test",
          country: "",
          postal_code: "",
          postal_code_type: "",
        };
        const response = await this.$store.getters.client.post(`/order/transaction/`, transitionData);
        // const CARD_ELEMENTS = this.stripe.elements();
        const { paymentMethod, error } = await this.stripe.createPaymentMethod({
          type: 'card',
          card: (this.CARD_NUMBER, this.EXPIRY, this.CVV),
        });
        if (error) {
          this.$toast.error(error.message);
          return
        }
        else {
          const { paymentIntent, error } = await this.stripe.confirmCardPayment(response.data.clientSecret, {
            payment_method: paymentMethod.id,
          });
          if (error) {
            // console.error(error);
            this.$toast.error(error.message);
            return
          }
        }
        const orderData = {
          transaction_id: response.data.clientSecret,
          payment_method:'paid'
        };
        // this.orderData.order = orderData;

        await axios.patch(`${URL}/api/order/create-order/${this.id}/`, orderData, {
          headers: {
            Authorization: `Bearer ${this.AUTH}`,
          },
        })
        this.$router.push('/quotation/order-success')
      }
      catch (error) {
        this.$toast.error(error?.message || 'Internal error, contact for support!');
      }
      finally {
        this.loading = false;
      }
    },
  },
};
</script>
  