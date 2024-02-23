<template>
  <div class="cartforms_collapses">
    <!-- Delivery Address-->
    <div class="cartform_collapse_item">
      <div class="collapse_item_title">
        <button  class="d-flex justify-content-between">
          <div>Delivery Address</div>
          <div class="dp-primary" v-if="orderStep > 1 || isDelivery" @click="updateOrderStep(1)">Edit</div>
        </button>
      </div>
      <b-collapse class="collpase_item_body" :visible="orderStep == 1" id="delivery_info">
        <DeliveryAddress/>
      </b-collapse>
    </div>

    <!-- Billing Address -->
    <div class="cartform_collapse_item">
      <div class="collapse_item_title">
        <button  class="d-flex justify-content-between">
          <div>Billing Address</div>
          <div class="dp-primary" v-if="orderStep > 2 || isBilling" @click="updateOrderStep(2)">Edit</div>
        </button>
      </div>
      <b-collapse class="collpase_item_body" :visible="orderStep == 2" id="billing_info">
        <BillingAddress/>
      </b-collapse>
    </div>

    <!-- Payment Method -->
    <div class="cartform_collapse_item">
      <div class="collapse_item_title">
        <button v-b-toggle.payment_info :disabled="orderStep < 3">Payment Method</button>
      </div>
      <b-collapse class="collpase_item_body border-bottom-0" :visible="orderStep == 3" id="payment_info">
        <PaymentMethod/>
      </b-collapse>
    </div>
  </div>
</template>

<script>
import BillingAddress from '../../components/orderplace/BillingAddress.vue';
import DeliveryAddress from '../../components/orderplace/DeliveryAddress.vue';
import PaymentMethod from '../../components/orderplace/PaymentMethod.vue';
import { mapState, mapGetters, mapActions } from 'vuex';
export default {
    middleware: 'scrollToTopMiddleware',
    components: { DeliveryAddress, BillingAddress, PaymentMethod },
    data() {
        return {};
    },
    computed:{
        ...mapGetters('cart', ['isDelivery', 'isBilling']),
        ...mapState('order', ['orderStep',]),
    },
    async mounted() {},
    methods: {
      ...mapActions('order', ['updateOrderStep']),
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