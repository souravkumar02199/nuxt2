<template>
  <div>
    <div class="cart_page_section myaccount_page dashboard_page bg-white">
      <div class="myaccount_box mb-4">
        <div class="myaccount_box_title d-flex align-items-center justify-content-between mb-3">
          <h3>Order History</h3>
        </div>
        <div class="myaccount_box_content myorders_area" v-if="orderData">
          <div class="myorders_filters">
            <div class="d-lg-flex justify-content-between align-items-center">
              <label class="my-2">{{ paginatedData?.length }} of {{ orderData?.length }}</label>
              <div class="datefilter row align-items-center">
                <label class="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 mb-lg-0">View orders between:</label>
                <div class="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-12">
                  <div class="row position-relative">
                    <div class="col-6">
                      <input type="date" class="form-control" />
                    </div>
                    <div class="col-6">
                      <input type="date" class="form-control" />
                    </div>
                  </div>
                  <div class="date_separator">to</div>
                </div>
              </div>
            </div>
          </div>
          <div class="myorders_list">
            <div class="myorders_list_header">
              <div class="d-flex">
                <div class="orderno_col">
                  <h5>Order No / ref</h5>
                </div>
                <div class="date_col">
                  <h5>Order Date</h5>
                </div>
                <div class="deliveryadd_col">
                  <h5>Order Items</h5>
                </div>
                <div class="status_col">
                  <h5>Total Amount</h5>
                </div>
                <div class="status_col">
                  <h5>Status</h5>
                </div>
                <div class="action_col">
                  <h5 class="text-center">View</h5>
                </div>
              </div>
            </div>

            <div class="accordion myorders_list_body" role="tablist">
              <b-card no-body class="mb-1 myorder_item" v-for="(item, index) in paginatedData" :key="index">
                <b-card-header header-tag="header" class="p-0 myorder_item_row" role="tab">
                  <div class="orderno_col">
                    <p>{{ item.number }}</p>
                  </div>
                  <div class="date_col">
                    <p>{{ item.created_at | formatDate }}</p>
                  </div>
                  <div class="deliveryadd_col">
                    <p>{{ item.order_items.length }} Items</p>
                  </div>
                  <div class="status_col">
                    <span>£{{ item.price_amount }}</span>
                  </div>
                  <div class="status_col">
                    <b-badge pill v-if="item.status == 'pending'" variant="warning">Pending</b-badge>
                    <b-badge pill v-if="item.status == 'in_review'" variant="warning">Pending</b-badge>
                    <b-badge pill v-if="item.status == 'accepted'" variant="success">Accepted</b-badge>
                    <b-badge pill v-if="item.status == 'received'" variant="success">Received</b-badge>
                    <b-badge pill v-if="item.status == 'approved'" variant="success">Approved</b-badge>
                    <b-badge pill v-if="item.status == 'cancelled'" variant="danger">Cancelled</b-badge>
                    <b-badge pill v-if="item.status == 'rejected'" variant="danger">Rejected</b-badge>
                    <b-badge pill v-if="item.status == 'in_production'" variant="info">In Production</b-badge>
                    <b-badge pill v-if="item.status == 'proof_sent'" variant="info">Proof Sent</b-badge>
                    <b-badge pill v-if="item.status == 'shipped'" variant="info">Shipped</b-badge>
                    <b-badge pill v-if="item.status == 'dispatched'" variant="secondary">Dispatched</b-badge>
                    <b-badge pill v-if="item.status == 'delayed'" variant="warning">Delayed</b-badge>
                    <b-badge pill v-if="item.status == 'delivered'" variant="success">Delivered</b-badge>
                    <b-badge pill v-if="item.status == 'refund'" variant="secondary">Refund</b-badge>
                  </div>
                  <div class="action_col order_downbtn">
                    <b-button size="sm" class="py-1 px-2" variant="light" v-b-toggle="`accordion-${index}`">View Order <i
                        class="far fa-angle-down"></i></b-button>
                  </div>
                </b-card-header>
                <b-collapse :id="`accordion-${index}`" accordion="my-accordion" role="tabpanel">
                  <b-card-body class="item_orderdetails">
                    <b-row>
                      <b-col>
                        <b-row v-for="(el, i) in item.order_items" v-bind:key="i">
                          <div class="col-auto pt-2">
                            <img
                              :src="el.product_data.product_images ? el.product_data.product_images[0].image : './../../assets/images/no-image.jpg'"
                              alt="Product" width="100" class="rounded">
                          </div>
                          <div class="col pb-2">
                            <div class="" style="float: right;">
                              <b-badge v-if="el.status == 'pending'" variant="warning">PENDING</b-badge>
                              <b-badge v-if="el.status == 'proof_sent'" variant="info">PROOF SENT</b-badge>
                              <b-badge v-if="el.status == 'rejected'" variant="danger">ARTWORK REJECTED</b-badge>
                              <b-badge v-if="el.status == 'accepted'" variant="success">ARTWORK APPROVED</b-badge>
                              <b-badge v-if="el.status == 'in_production'" class="in-production">IN PRODUCTION</b-badge>
                              <b-badge v-if="el.status == 'delayed'" variant="delay">DELAYED</b-badge>
                              <b-badge v-if="el.status == 'dispatched'" class="dispatch">DISPATCHED</b-badge>
                              <b-badge v-if="el.status == 'delivered'" class="delivered">DELIVERED</b-badge>
                              <b-badge v-if="el.status == 'cancelled'" variant="danger">CANCELLED</b-badge>
                              <b-badge v-if="el.status == 'refunded'" variant="secondry">REFUNDED</b-badge>
                            </div>
                            <Nuxt-link :to="`/p/${el.product_data.slug}`">
                              <b> {{ el.product_data.name }}</b>
                            </Nuxt-link>
                            <small v-for="variant in el.variant" :key="variant.id" class="d-block">
                              {{ variant.attribute.name }} : <span>{{ variant.attribute_value.name }}</span>
                            </small>
                          </div>
                        </b-row>
                      </b-col>
                      <b-col cols="12" md="6" lg="4">
                        <div class="item_delivery_info">
                          <p style="font-size: 1rem;">Shipping Address:</p>
                          <p>
                            {{ item.shipping_first_name }} {{ item.shipping_last_name }} <br>
                            {{ item.shipping_company }} <br>
                            {{ item.shipping_street1 }}
                            {{ item.shipping_street2 }} <br>
                            {{ item.shipping_city }}
                            {{ item.shipping_country }} <br>
                            {{ item.shipping_mobile }}
                          </p>
                          <hr />
                          <div class="text-center price_text">
                            <p>Total Paid:</p>
                            <p>£{{ item.price_amount }}</p>
                          </div>
                          <hr />
                          <div class="outlined_white_btn text-center">
                            <button class="btn" @click="ViewInvoice(item.id)">
                              <i class="fal fa-download me-2"></i>
                              Download Invoice
                            </button>
                          </div>
                        </div>
                      </b-col>
                    </b-row>
                  </b-card-body>
                </b-collapse>
              </b-card>
            </div>
          </div>
        </div>
        <div class="pagination_area pt-3">
          <b-pagination v-model="currentPage" :per-page="perPage" first-text="First" prev-text="Previous" next-text="Next"
            last-text="Last" :total-rows="orderData?.length" align="center"></b-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { URL } from "@/api/global.env"
export default {
  name: "my_orders",

  data() {
    return {
      URL: URL,
      totalPages: null,
      perPage: 10,
      currentPage: 1,
    };
  },
  computed: {
    ...mapState('order', ['orderData']),
    paginatedData() {
      const { currentPage, perPage } = this;
      const start = (currentPage - 1) * perPage;
      const end = currentPage * perPage;

      return this.orderData?.slice(start, end);
    },
  },
  filters: {
    formatDate: (dateStr) =>
      Intl.DateTimeFormat("us-EN").format(new Date(dateStr)),
  },
  methods: {
    ViewInvoice(orderId) {
      this.$router.push(`/order-invoice/${orderId}`)
    }
  },
};
</script>
