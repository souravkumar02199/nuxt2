<template>
  <div>
    <div class="cart_page_section py-5 bg-white">
      <div class="container">
        <div class="thankyou_area py-5">
          <div class="row justify-content-center">
            <div class="col-xl-7 col-lg-8 col-md-10 col-sm-12 col-12">
              <div class="text-center">
                <h1>Thank You</h1>
                <div class="bg_gradient">
                  <div class="bg-white py-4 px-2">
                    <h3>Your order was completed successfully.</h3>
                  </div>
                </div>
                <div class="cms_area py-4">
                  <p>
                    Your order confirmation number is
                    <strong>{{currentOrder?.order_number}}</strong>. An email receipt including
                    the details about your order has been sent to your email
                    address. please keep it for your records. You can visit the
                    my account page to check the status of your order or if any
                    query please email it to
                    <strong>sales@digitalpress.co.uk</strong>
                  </p>
                </div>
                <!-- <div class="btn_primary rounded_btn btn_black">
                  <a role="button" href="javascript:void(0)" @click="ViewInvoice()">Click here to print a copy of your receipt.</a>
                </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { mapState } from 'vuex';
export default {
  middleware: 'scrollToTopMiddleware',
  computed:{
    ...mapState('order', ['currentOrder'])
  },
  methods:{
    ViewInvoice() {
      this.$router.push(`/order-invoice/${this.currentOrder?.order_id}`)
    }
  }
};
</script>
