<template>
  <div>
    <div class="cart_page_section myaccount_page dashboard_page bg-white">
      <div class="cart_page_area">
        <div class="myaccount_box mb-4">
          <div class="
              myaccount_box_title
              d-flex
              align-items-center
              justify-content-between
              mb-3
            ">
            <h3>Artwork</h3>
          </div>
          <div class="myaccount_box_content">
            <div class="left_area uploadart_section">
              <h6 class="uploadart_title">
                You can upload your files below, or if we are designing, please
                send us the brief with text/images/logos.
              </h6>
              <div class="row no-gutters mb-4">
                <div class="col-12">
                  <div v-if="orderItems.length > 0" class="artworkNav nav nav-pills" id="items-tab" role="tablist"
                    aria-orientation="vertical">
                    <a v-for="(item, index) in orderItems" :key="index" :class="index == 0 ? 'active' : ''"
                      class="nav-link" :id="'item' + index + '-tab'" data-toggle="pill" :href="'#item' + index" role="tab"
                      :aria-controls="'item' + index" aria-selected="true">
                      <h6>Item Code {{ item.id }}</h6>
                      <h4>{{ item.name }}</h4>
                    </a>
                  </div>

                  <div class="emptyList" v-else>Your Order list is empty.</div>
                </div>
                <div class="col-12">
                  <div class="tab-content" id="items-tabContent">
                    <div v-for="(item, index) in orderItems" :key="index" class="tab-pane fade" :id="'item' + index"
                      :class="index == 0 ? 'show active' : ''" role="tabpanel" :aria-labelledby="'item' + index + '-tab'">
                      <div class="p-3 p-lg-4 greybox_area">
                        <div class="bg-white p-3 mb-3">
                          <div class="order_info">
                            <h6>Order Number</h6>
                            <h4>{{ item.order_id }}</h4>
                          </div>
                          <div class="
                              d-flex
                              text-center
                              align-items-center
                              justify-content-center
                              flex-column
                              uploadbox
                            ">
                            <div class="btn_primary text-uppercase">
                              <button class="mb-2" v-on:change="uploadArtwork(item)">
                                <input type="file" id="artwork" hidden />
                                <label for="artwork">
                                  <i class="fas fa-upload me-2"></i>
                                  Upload Files
                                </label>
                              </button>
                            </div>
                            <p>File Types: PDF, EPS, TIF, JPG</p>
                          </div>
                        </div>
                        <div class="bg-white px-3 pt-3 pb-2">
                          <p>
                            Please note, on completion of your order we offer a
                            15 minute window to make any final amends to your
                            uploaded artwork via
                            <a href="#"><strong>Orders</strong></a> in the
                            <a href="#"><strong>MyAccount</strong></a> area.
                            After these 15 minutes, no further changes can be
                            made and all artwork will be processed for printing
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
  data() {
    return {
      orderList: [],
      totalCount: null,
      isCallApi: false,
      totalPages: null,
      loadSpinner: false,
      rows: null,
      perPage: null,
      currentPage: 1,
      orderItems: [],
      user: null
    };
  },

  computed: {
    ...mapState('order', ['artworkPendingItems']),
    rows() {
      return this.artworkPendingItems.length;
    },
  },

  mounted() {
    this.user = JSON.parse(sessionStorage.getItem("user"));
  },

  methods: {

    async getOrderList() {
      // this.getUserdetails();

      // this.loadSpinner = true;
      // await this.$store.getters.userClient
      //   .post(`/user/user-order`)
      //   .then((res) => {
      //     this.loadSpinner = false;
      //     this.orderData = res.data;
      //     this.rows = this.orderData.total_count;
      //     this.totalCount = this.orderData.datatotal_count;
      //     this.perPage = this.orderData.per_page;
      //     this.currentPage = this.orderData.current_page;
      //     this.totalPages = this.orderData.total_pages;
      //     this.orderList = res.data.result;
      //     // this.orderList = orderList.filter((X)=>{
      //     //   return X.customer == this.user.id
      //     // })
      //     this.getCombineList();
      //   });
    },

    async uploadArtwork() {
      // if (document.getElementById("artwork").files[0]) {
      //   let formData = new FormData();
      //   formData.append("order_id", product.order);
      //   formData.append("orderItem_id", product.id);
      //   formData.append("user", this.user.id);
      //   formData.append("artwork", document.getElementById("artwork").files[0]);
      //   await this.$store.getters.client
      //     .post("order/user-artworks/", formData)
      //     .then((response) => {
      //       this.$toast.success("Your artwork is uploaded successfully");
      //     }),
      //     ({ error }) => {};
      // }
    },

    getCombineList() {
      // this.orderList.forEach((element) => {
      //   element.order_items.forEach((item) => {
      //     this.orderItems.push(item);
      //   });
      // });

      // this.getUserdetails();
    },
  },
};
</script>