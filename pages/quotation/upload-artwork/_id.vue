<template>
  <div class="cartform_collapse_item container">
        <div class="collpase_item_body border-bottom-0 collapse show">
            <div class="collpase_item_inner py-4" v-if="orderdata">
                <div class="">
                    <div class="left_area uploadart_section">
                        <h6 class="uploadart_title">
                            You can upload your files below, or if we are designing, please send us the brief with
                            text/images/logos.
                        </h6>
                        <b-card no-body class="no-gutters row">
                            <b-tabs pills vertical content-class="px-md-0"
                                nav-wrapper-class="col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12 px-md-0" v-model="activeTab">
                                <b-tab v-for="(item, index) in orderdata?.order_items" v-bind:key="index">
                                    <template #title>
                                        <h6>Item Code {{ item.id }}</h6>
                                        <h4>{{ item.quotation_product.name }}</h4>
                                    </template>
                                    <b-card-text>
                                        <div class="p-3 p-lg-4 greybox_area border-left">
                                            <div class="bg-white p-3 mb-3">
                                                <div
                                                    class=" d-flex text-center align-items-center justify-content-center flex-column uploadbox">
                                                    <div class=" btn_primary artworkbtn text-uppercase">
                                                        <button class="mb-2" v-on:change="uploadArtwork($event, item)"
                                                            :disabled="loading">
                                                            <input type="file" :id="'artwork' + item.id" hidden />
                                                            <label :for="'artwork' + item.id">
                                                                <span v-if="!loading">
                                                                    <i class="fas fa-upload me-2"></i>
                                                                    {{item.user_artwork.length > 0 ? 'Change File':'Upload Files'}}
                                                                </span>
                                                                <span v-else>
                                                                    <b-spinner small type="grow"></b-spinner>
                                                                    Uploading...
                                                                </span>
                                                            </label>
                                                        </button>
                                                    </div>
                                                    <a class="previewIcon" v-if="item.user_artwork.length > 0"
                                                        :href="item.user_artwork[0]?.artwork" target="_blank">
                                                        <i class="fas fa-file-check"></i></a>
                                                    <div v-if="item.user_artwork.length > 0" class="mb-2">
                                                        Your artwork is uploaded. Click on
                                                        the above icon to check the uploaded
                                                        artwork.
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="bg-white px-3 pt-3 pb-2">
                                                <p>
                                                    Kindly submit your print-ready artwork or provide us with a design
                                                    brief if you've opted for design services. All artwork undergoes
                                                    thorough checks before proceeding to the printing stage.
                                                </p>
                                            </div>
                                        </div>
                                    </b-card-text>
                                </b-tab>
                            </b-tabs>
                        </b-card>
                    </div>
                </div>
            </div>
        </div>
        <div class="d-flex justify-content-center mb-3">
          <nuxt-link to="/" class="btn btn-dark">Explore Products</nuxt-link>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import { URL } from "@/api/global.env.js";
export default {
  layout: "mail",
  data() {
    return {
      URL: URL,
      orderdata: null,
      loading:false,
      activeTab:0
    };
  },
  created() {
    const PATH_ID = this.$route.params.id.split("-");
    this.id = PATH_ID[1];
    this.AUTH = this.$route.query.token;
  },
  mounted() {
    this.getOrderData();
  },
  methods: {
    async getOrderData() {
      try {
        const res = await axios.get(`${URL}/api/order/create-order/${this.id}/`, {
          headers: {
            Authorization: `Bearer ${this.AUTH}`,
          },
        });
        this.orderdata = res.data
      } catch (error) {
        console.log(error)
      }
    },
    async uploadArtwork(event, product) {
      let FILE = event.target.files[0];
      if (FILE.size > 104857600) { // 104857600 bytes = 100MB
        this.$toast.error("File size exceeds the limit of 100MB. Please select a smaller file.");
        return;
      }
      if (FILE) {
        let formData = new FormData();
        formData.append("order_item_id", product.id);
        formData.append("user", this.orderdata.customer);
        formData.append("artwork", FILE);
        try {
          this.loading = true
          await this.$store.getters.client.post("/order/user-artworks/", formData)
          this.$toast.success("Your artwork is uploaded successfully");
          this.getOrderData();
        } catch (error) {
          this.$toast.error(error);
        }
        finally {
          this.loading = false
        }
      }
    },
  },
};
</script> 
  