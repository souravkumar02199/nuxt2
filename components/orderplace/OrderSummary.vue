<template>
    <div class="right_area sticky-top mb-4">
        <div class="order_summary_area mb-3">
            <h4 class="box_title text-center">Order Summary</h4>
            <hr />
            <div class="ordersummary_info">
                <div class=" d-flex justify-content-between align-items-center mb-4">
                    <div class="">
                        <h6>Subtotal:</h6>
                    </div>
                    <div class="text-end">
                        <p>&#163;{{ subTotal }}</p>
                    </div>
                </div>
                <div class=" d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h6>Artwork Checking:</h6>
                    </div>
                    <div class="text-end">
                        <p>&#163;{{ artworkCharges }}</p>
                    </div>
                </div>
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h6>Delivery:</h6>
                    </div>
                    <div class="text-end">
                        <p>&#163;{{ deliveryCharges }}</p>
                    </div>
                </div>
                <div class=" d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h6>Discount:</h6>
                    </div>
                    <div class="text-end">
                        <p>&#163;0.00</p>
                    </div>
                </div>
                <div class=" d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h6>Vat:</h6>
                    </div>
                    <div class="text-end">
                        <p>&#163;{{ totalVat }}</p>
                    </div>
                </div>
                <div class=" d-flex justify-content-between align-items-center total_area pt-3 border-top">
                    <div>
                        <h6>Total:</h6>
                    </div>
                    <div class="text-end">
                        <p>&#163;{{ totalAmount }}</p>
                    </div>
                </div>
            </div>
        </div>
        <b-row class="summaryend_btns">
            <b-col cols="6">
                <div class="btn_grey cursor_pointer" @click="clearCartItems()">
                    <a class="btn-block">Empty Basket</a>
                </div>
            </b-col>
            <b-col cols="6">
                <div class="btn_primary cursor_pointer">
                    <a @click="checkout()" class="btn-block">Checkout</a>
                </div>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
export default {
    data() {
        return {
            isLogin: false,
        };
    },

    async mounted() {
        this.isLogin = sessionStorage.getItem("userlogin");
    },

    computed: {
        ...mapState('cart', ['cart']),
        ...mapGetters('cart', ['subTotal', 'artworkCharges', 'totalVat', 'totalAmount', 'deliveryCharges']),
    },

    methods: {
        clearCartItems() {
            this.$store.dispatch("cart/clearCartItems");
        },

        checkout() {
            if (this.isLogin) {
                if (this.$route.name === 'cart') {
                    this.$router.push({name : 'cart-upload-artwork'});
                } 
                else if (this.$route.name === 'cart-upload-artwork') {
                    this.$router.push({name : 'cart-cart-delivery'});
                }
            } else {
                this.$router.push("/signin");
            }
        },
    },
};
</script>
  
<style scoped>
.modal.login-modal {
    background-color: rgb(0, 0, 0, 0.3);
}
</style>