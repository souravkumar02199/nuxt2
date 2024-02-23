<template>
    <section>
        <div class="bg-light rounded p-3">
            <h5 class="border-bottom pb-3"><b>Order Summary</b></h5>
            <div class="ordersummary_info d-flex flex-column pt-3 gap-3">
                <div class=" d-flex justify-content-between align-items-center">
                    <div class="">
                        <h6>Subtotal:</h6>
                    </div>
                    <div class="text-end">
                        <p>&#163;{{ quotationData.subtotal }}</p>
                    </div>
                </div>
                <div class=" d-flex justify-content-between align-items-center">
                    <div>
                        <h6>Artwork Checking:</h6>
                    </div>
                    <div class="text-end">
                        <p>&#163;{{ quotationData.artwork_charges || '0.00' }}</p>
                    </div>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <h6>Delivery:</h6>
                    </div>
                    <div class="text-end">
                        <p>&#163;{{ quotationData.shipping_charges || '0.00' }}</p>
                    </div>
                </div>
                <div class=" d-flex justify-content-between align-items-center">
                    <div>
                        <h6>Discount:</h6>
                    </div>
                    <div class="text-end">
                        <p>&#163;{{ quotationData.discount_amount || '0.00' }}</p>
                    </div>
                </div>
                <div class=" d-flex justify-content-between align-items-center">
                    <div>
                        <h6>Vat:</h6>
                    </div>
                    <div class="text-end">
                        <p>&#163;{{ quotationData.vat || '0.00' }}</p>
                    </div>
                </div>
                <div class=" d-flex justify-content-between align-items-center total_area pt-3 border-top">
                    <div>
                        <h6>Total:</h6>
                    </div>
                    <div class="text-end">
                        <p>&#163;{{ quotationData.total }}</p>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div>{{ $route.name }}</div> -->
        <div class="d-flex justify-content-end gap-3 mt-3">
          <b-button variant="light" class="w-100 border" @click="prev">Back</b-button>
          <QuotationPlaceOrder v-if="$route.name === 'quotation-place-order-id-checkout' && quotationData.users.payment_method !== 'with_order'"/>
          <b-button variant="dark" v-else :disabled="$route.name === 'quotation-place-order-id-checkout'" class="w-100" @click="next">Next</b-button>
        </div>
    </section>
</template>
  
<script>
import { mapState } from 'vuex'
export default {
    computed: {
        ...mapState("quotation", ['quotationData',])
    },
    methods:{
        next(){
            if(this.$route.name === 'quotation-place-order-id'){
                this.$router.push(`/quotation/place-order/${this.$route.params.id}/checkout`)
            }
        },
        prev(){
            this.$router.go(-1)
        }
    }
}
</script>