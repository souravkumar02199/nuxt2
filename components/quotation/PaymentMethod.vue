<template>
  <div class="collpase_item_inner py-4">
    <div class="px-4">
      <h5 class="mb-4 d-md-flex justify-content-between">
        <span>ADD NEW Credit/Debit Card</span>
      </h5>
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
        <button type="button" @click.prevent="placeOrder" :disabled="loading" class="px-5">
          <span v-if="!loading">Buy Now</span>
          <span v-else><b-spinner small type="grow"></b-spinner> Buy Now</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { URL } from "@/api/global.env.js";
import axios from 'axios';
import { mapState, mapActions } from 'vuex';
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
  data() {
    return {
      stripe: null,
      orderData: {
        order: {},
        Currency: {
          currency_abbr: "£",
          currency_name: "Pound",
        },
        orderItems: [],
      },
      CARD_NUMBER: null,
      EXPIRY: null,
      CVV: null,
      orderResponse: null,
      loading: false,
    }
  },
  computed: {
    ...mapState('quotation', [
      'step',
      'orderItems',
      'quotationData',
      'token',
      'billingAddress',
      'deliveryAddress'
    ])
  },
  mounted() {
    this.stripe = Stripe(PK);
    this.createAndMountFormElements();
  },
  methods: {
    ...mapActions('quotation', ['updateCheckoutStep']),
    ...mapActions('order', ['saveOrder']),
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

    async placeOrder() {
      this.loading = true;
      this.manageOrderItems()
      const TOKEN = await this.getStripeToken();
      try {
        const transitionData = {
          is_active: false,
          is_trash: false,
          batch_id: TOKEN.id,
          token: TOKEN.id,
          tran_date: this.$moment(new Date()).format("YYYY-MM-DD"),
          tran_status: "Success",
          tran_amount: this.quotationData.total,
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
          console.error(error);
          return
        }
        else {
          const { paymentIntent, error } = await this.stripe.confirmCardPayment(response.data.clientSecret, {
            payment_method: paymentMethod.id,
          });
          if (error) {
            console.error(error);
            return
          }
        }
        const orderData = {
          transaction_id: null,
          special_instructions: '',
          shipping_method: this.quotationData.delivery_service,
          shipping_amount: Number(this.quotationData.shipping_charges),
          vat_amount: Number(this.quotationData.vat),
          design_service_price: Number(this.quotationData.artwork_charges),
          price_amount: this.quotationData.total,
          ...this.deliveryAddress,
          ...this.billingAddress,
          delivery_upgrade: '',
          payment_method:'paid',
          order_subtotal: this.quotationData.subtotal,
          quotation_id: this.quotationData.id,
          customer: this.quotationData.users.id
        };
        this.orderData.order = orderData;

        await axios.post(`${URL}/api/order/create-order/`, this.orderData, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
          .then((orderResponse) => {
            this.saveOrder(orderResponse.data)
            this.orderResponse = orderResponse.data.order_items;
            for (let i = 0; i < this.orderResponse.length; i++) {
              const x = this.orderItems.find((cartItem) => cartItem.id == this.orderResponse[i].quotation_product);
              if (x && x.artwork) {
                this.$store.getters.client.patch(`/order/user-artworks/${x.artwork.id}/`, {
                  order_item_id: this.orderResponse[i].id,
                });
              } else {
                return
              }
            }
          });
        this.updateCheckoutStep(1)
        this.updateQuotationStatus()
        this.$router.push('/quotation/order-success')
      }
      catch (error) {
        console.error(error);
      }
      finally {
        this.loading = false;
      }
    },
    async updateQuotationStatus() {
      try {
        await this.$store.getters.client.patch(`/order/quotation/${this.quotationData.id}/`, { status: 'accepted' })
      } catch (error) {
        alert("something went wrong", error)
      } finally {
        this.getData();
      }
    },
    manageOrderItems() {
      for (let i = 0; i < this.orderItems.length; i++) {
        console.log(this.orderItems)
        this.orderData.orderItems.push({
          // product: this.orderItems[i].product_id,
          // custom_product:  this.orderItems[i].custom_product_id,
          // custom_product_id:  this.orderItems[i].custom_product_id,
          quotation_product: this.orderItems[i].id,
          qty_ordered: this.orderItems[i].quantity,
          design_service_price: Number(this.quotationData.artwork_charges),
          item_total_amount: this.orderItems[i].price,
          delivery_meathod: this.quotationData.delivery_service,
          delivery_days: 5,
          delivery_date: this.$moment(this.quotationData.expected_lead_time).format("YYYY-MM-DD"),
          vat_amount: (Number(this.orderItems[i].price) / 5).toFixed(2),
          item_price: this.orderItems[i].price,
        });
      }
    },
  }
}
</script>

<style>
.height-50 {
  height: 50px !important;
  padding: 10px 18px !important;
  display: grid;
  align-content: center;
}
</style>