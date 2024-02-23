<template>
  <div class="cartforms_collapses">
    <!-- Delivery Address-->
    <div class="cartform_collapse_item">
      <div class="collapse_item_title">
        <button class="d-flex justify-content-between">
          <div>Delivery Address</div>
          <div class="dp-primary" v-if="checkoutStep !== 2 && deliveryAddress" @click="updateCheckoutStep(1)">Edit</div>
        </button>
      </div>
      <b-collapse class="collpase_item_body" :visible="checkoutStep == 1" id="delivery_info">
        <QuotationShippingAddress />
      </b-collapse>
    </div>

    <!-- Billing Address -->
    <div class="cartform_collapse_item">
      <div class="collapse_item_title">
        <button class="d-flex justify-content-between">
          <div>Billing Address</div>
          <div class="dp-primary" v-if="checkoutStep !== 2 && billingAddress" @click="updateCheckoutStep(2)">Edit</div>
        </button>
      </div>
      <b-collapse class="collpase_item_body" :visible="checkoutStep === 2" id="billing_info">
        <QuotationBillingAddress />
      </b-collapse>
    </div>

    <!-- Payment Method -->
    <div class="cartform_collapse_item" v-if="quotationData.users.payment_method ==='with_order'">
      <div class="collapse_item_title">
        <button v-b-toggle.payment_info :disabled="checkoutStep < 3">Payment Method</button>
      </div>
      <b-collapse class="collpase_item_body border-bottom-0" :visible="billingAddress !== null && deliveryAddress !== NamedModulesPlugin" id="payment_info">
        <QuotationPaymentMethod />
      </b-collapse>
    </div>
  </div>
</template>
  
<script>
import { mapState, mapActions } from 'vuex';
export default {
  computed: {
    ...mapState('quotation', ['checkoutStep', 'quotationData', 'billingAddress', 'deliveryAddress']),
  },
  methods: {
    ...mapActions('quotation', ['updateStep', 'updateCheckoutStep']),
  },
};
</script>
  
  
<style>
#getaddress_button,
#getaddress_button_1 {
  height: 50px;
  padding: 10px 18px;
  border-radius: 5px;
  background-color: #E5E5E5;
  border: 1px solid #E5E5E5;
}
</style>