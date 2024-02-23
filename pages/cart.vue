<template>
    <div>
        <header-bar></header-bar>
        <menu-bar class="d-none d-md-block"></menu-bar>
        <div class="steps_line_section">
            <div class="container">
                <div class="steps_line_area">
                    <div class="row">
                        <div class="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6">
                            <div class="step_item">
                                <h5><span>1</span> Select Your Product Options</h5>
                            </div>
                        </div>
                        <div class="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6">
                            <div class="step_item">
                                <h5><span>2</span> Design or Upload your Artwork</h5>
                            </div>
                        </div>
                        <div class="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6">
                            <div class="step_item">
                                <h5><span>3</span> Checkout & Pay</h5>
                            </div>
                        </div>
                        <div class="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6">
                            <div class="step_item">
                                <h5><span>4</span> Receive Your Order</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="cart_page_section py-4 bg-white" v-if="cartItemCount > 0">
            <div class="container">
                <div class=" cart_title mb-4 d-flex justify-content-between align-items-center">
                    <h3>Your Basket</h3>
                    <a class="d-none d-md-block" href="javascript:void(0)" @click="$router.go(-1)">Back To Shopping</a>
                </div>
                <div class="cart_steps_section pt-2 mb-5">
                    <div class="row no-gutters">
                        <div class="col-sm-3 col-3">
                            <div class="cartstep_item text-center"
                                :class="{ 'working_step': step === 1, 'completed_step': step > 1 }">
                                <div class="step_icon">
                                    <i class="fas" :class="{ 'fa-circle': step <= 1, 'fa-check': step > 1 }"></i>
                                </div>
                                <h5>Basket</h5>
                            </div>
                        </div>
                        <div class="col-sm-3 col-3">
                            <div class="cartstep_item text-center"
                                :class="{ 'working_step': step === 2, 'completed_step': step > 2 }">
                                <div class="step_icon"><i class="fas"
                                        :class="{ 'fa-circle': step <= 2, 'fa-check': step > 2 }"></i></div>
                                <h5>Upload Artwork</h5>
                            </div>
                        </div>
                        <div class="col-sm-3 col-3">
                            <div class="cartstep_item text-center"
                                :class="{ 'working_step': step === 3, 'completed_step': step > 3 }">
                                <div class="step_icon">
                                    <i class="fas" :class="{ 'fa-circle': step <= 3, 'fa-check': step > 3 }"></i>
                                </div>
                                <h5>Delivery & Payment</h5>
                            </div>
                        </div>
                        <div class="col-sm-3 col-3">
                            <div class="cartstep_item text-center"
                                :class="{ 'working_step': step === 4, 'completed_step': step > 4 }">
                                <div class="step_icon"><i class="fas"
                                        :class="{ 'fa-circle': step <= 4, 'fa-check': step > 4 }"></i></div>
                                <h5>Order Success</h5>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="cart_page_area">
                    <div class="row">
                        <div class="col-md-12 col-sm-12 col-12" :class="{ 'col-xl-9 col-lg-8': step < 4 }">
                            <div class="left_area">
                                <NuxtChild />
                            </div>
                        </div>
                        <div class="col-xl-3 col-lg-4 col-md-12 col-sm-12 col-12" v-if="step < 4">
                            <OrderSummary />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="cart_page_section py-4 bg-white d-flex justify-content-center py-5" v-if="cartItemCount === 0 && step !== 4">
            <div>
                <img src="~/assets/images/all/empty-cart.png" alt="empty cart" class="mx-auto h-auto my-5">
                <div class="btn_primary ms-2 cursor_pointer">
                    <nuxt-link to="/categories" class="btn-block">Explore Products</nuxt-link>
                </div>
            </div>
        </div>
        <StripeJS />
        <StripeCheckout />
        <div class="pink_banner1" v-if="step === 4">
            <div class="container">
                <div class="pink_banner_area">
                    <div class="row align-items-center">
                        <div class="col-xl-9 col-lg-8 col-md-8 col-sm-8 col-12">
                            <div class="left_area pb-4 pt-5">
                                <h3>
                                    Thank you for your purchase and supporting us!<br />
                                    <span>Please tag us on social media #DigitalPressUK</span>
                                </h3>
                                <p>
                                    Love your order? We would appreciate your review!
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                </p>
                            </div>
                        </div>
                        <div class="col-xl-3 col-lg-4 col-md-4 col-sm-4 col-12">
                            <div class="img_area text-sm-right">
                                <img src="@/assets/images/thankyou_vector.png" alt="..." class="img-fluid" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <footer-banner v-if="step !== 4"></footer-banner>
    </div>
</template>
  
<script>
import { mapActions, mapGetters } from 'vuex';
import FooterBanner from '../components/FooterBanner.vue';
import HeaderBar from '../components/layout/HeaderBar.vue';
import MenuBar from '../components/layout/MenuBar.vue';
import OrderSummary from '../components/orderplace/OrderSummary.vue';
export default {
    middleware: 'scrollToTopMiddleware',
    components: { HeaderBar, MenuBar, FooterBanner, OrderSummary },
    mounted() {
        this.fetchDeliveryCharges()
    },
    methods: {
        ...mapActions('cart', ['fetchDeliveryCharges']),
    },

    computed: {
        ...mapGetters('cart', ['cartItemCount']),
        step() {
            if (this.$route.name === 'cart') {
                return 1
            }
            else if (this.$route.name === 'cart-upload-artwork') {
                return 2
            }
            else if (this.$route.name === 'cart-cart-delivery') {
                return 3
            }
            else if (this.$route.name === 'cart-order-details') {
                return 4
            }
            else {
                return 0
            }
        }
    }
};
</script>
  
<style scoped>
.modal.login-modal {
    background-color: rgb(0, 0, 0, 0.3);
}
</style>