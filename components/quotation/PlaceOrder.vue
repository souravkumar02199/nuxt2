<template>
    <b-button class="w-100" :disabled="!billingAddress || !deliveryAddress" @click="placeOrder" variant="dark">Place
        order</b-button>
</template>

<script>
import axios from 'axios'
import { URL } from "@/api/global.env.js";
import { mapActions, mapState } from 'vuex'
export default {
    data() {
        return {
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
            'orderItems',
            'quotationData',
            'token',
            'billingAddress',
            'deliveryAddress',
        ])
    },
    methods: {
        ...mapActions('quotation', ['updateCheckoutStep']),
        ...mapActions('order', ['saveOrder']),
        async placeOrder() {
            this.manageOrderItems()
            try {
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
                    payment_method:'unpaid',
                    order_subtotal: this.quotationData.subtotal,
                    quotation_id: this.quotationData.id,
                    customer: this.quotationData.users.id
                };
                this.orderData.order = orderData;
                await axios.post(`${URL}/api/order/create-order/`, this.orderData, {
                    headers: {
                        Authorization: "Bearer " + this.token
                    }
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
                        this.updateCheckoutStep(1)
                        this.updateQuotationStatus()
                        this.$router.push('/quotation/order-success')
                    });

            } catch (error) {
                console.log(error)
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
