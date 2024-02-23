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
import { mapState, mapGetters, mapActions } from 'vuex';
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
// var cardBrandToPfClass = {
//     'visa': 'pf-visa',
//     'mastercard': 'pf-mastercard',
//     'amex': 'pf-american-express',
//     'discover': 'pf-discover',
//     'diners': 'pf-diners',
//     'jcb': 'pf-jcb',
//     'unknown': 'pf-credit-card',
// }
// function setBrandIcon(brand) {
//     var brandIconElement = document.getElementById('brand-icon');
//     var pfClass = 'pf-credit-card';
//     if (brand in cardBrandToPfClass) {
//         pfClass = cardBrandToPfClass[brand];
//     }
//     for (var i = brandIconElement.classList.length - 1; i >= 0; i--) {
//         brandIconElement.classList.remove(brandIconElement.classList[i]);
//     }
//     brandIconElement.classList.add('pf');
//     brandIconElement.classList.add(pfClass);
// }

// cardNumber.on('change', function (event) {
//     // Switch brand logo
//     if (event.brand) {
//         setBrandIcon(event.brand);
//     }
// });
export default {
    data() {
        return {
            stripe: null,
            token: null,
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
        ...mapState('cart', ['cart', 'deliveryMethod', 'deliveryAddress', 'billingAddress']),
        ...mapGetters('cart', ['subTotal', 'totalAmount', 'totalVat', 'artworkCharges', 'deliveryCharges',]),
    },
    mounted() {
        this.stripe =  Stripe(PK);
        this.createAndMountFormElements();
        this.manageOrderItems()
    },
    methods: {
        ...mapActions('order', ['saveOrder', 'updateOrderStep']),
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
            const TOKEN = await this.getStripeToken();
            try {
                const transitionData = {
                    is_active: false,
                    is_trash: false,
                    batch_id: TOKEN.id,
                    token: TOKEN.id,
                    tran_date: this.$moment(new Date()).format("YYYY-MM-DD"),
                    tran_status: "Success",
                    tran_amount: this.totalAmount,
                    tran_currency: "Pound",
                    cc_number: TOKEN.card.last4,
                    cc_type: TOKEN.card.funding,
                    cc_exp_date: `2022-12-07`,
                    // cc_name: this.cardHolderName,
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
                    transaction_id: response.data.clientSecret,
                    special_instructions: 'deliver after 12',
                    shipping_method: this.cart[0].shipping_method,
                    shipping_amount: this.deliveryCharges,
                    shipping_currency: "Pound",
                    vat_amount: this.totalVat,
                    design_service_price: this.artworkCharges,
                    price_amount: this.totalAmount,
                    price_currency: "Pound",
                    ...this.deliveryAddress,
                    ...this.billingAddress,
                    delivery_upgrade: this.deliveryMethod,
                    order_subtotal: this.subTotal,
                };
                this.orderData.order = orderData;
                await this.$store.getters.userClient.post(`/order/create-order/`, this.orderData)
                    .then((orderResponse) => {
                        this.saveOrder(orderResponse.data)
                        this.orderResponse = orderResponse.data.order_items;
                        for (let i = 0; i < this.orderResponse.length; i++) {
                            const x = this.cart.find((cartItem) => cartItem.id == this.orderResponse[i].product);
                            if (x && x.artwork) {
                                this.$store.getters.client.patch(`/order/user-artworks/${x.artwork.id}/`, {
                                    order_item_id: this.orderResponse[i].id,
                                });
                            } else {
                                return
                            }
                        }
                    });

                this.$router.push("/cart/order-details");
                this.updateOrderStep(1)
                this.$store.dispatch("cart/clearCartItems");
            }
            catch (error) {
                console.error(error);
            }
            finally {
                this.loading = false;
            }
        },

        manageOrderItems() {
            for (let i = 0; i < this.cart.length; i++) {
                const twoPlacedFloat = +parseFloat(this.cart[i].price + this.cart[i].vat);
                this.orderData.orderItems.push({
                    product: this.cart[i].id,
                    qty_ordered: this.cart[i].quantity,
                    design_service_price: this.cart[i].designServicePrice,
                    item_total_amount: parseFloat(twoPlacedFloat).toFixed(2),
                    delivery_meathod: this.cart[i].shipping_method,
                    delivery_days: this.cart[i].deliveryDays,
                    delivery_date: this.$moment(this.cart[i].deliveryDate).format("YYYY-MM-DD"),
                    vat_amount: this.cart[i].vat.toFixed(2),
                    item_price: this.cart[i].price.toFixed(2),
                    catalog_product_variant_id: this.cart[i].catalog_product_variant_id,
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