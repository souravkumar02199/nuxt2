<template>
  <div class="cartforms_collapses">
    <!-- Artwork -->
    <div class="cartform_collapse_item">
      <div class="collapse_item_title">
        <button data-toggle="collapse" data-target="#uploadartwork">
          Artwork
        </button>
      </div>
      <div class="collpase_item_body border-bottom-0 collapse show" id="uploadartwork">
        <div class="collpase_item_inner py-4">
          <div class="px-4">
            <div class="left_area uploadart_section">
              <h6 class="uploadart_title">
                You can upload your files below, or if we are
                designing, please send us the brief with
                text/images/logos.
              </h6>
              <b-card no-body class="no-gutters row">
                <b-tabs pills vertical content-class="pl-md-0"
                  nav-wrapper-class="col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12 pr-md-0" v-model="activeTab">
                  <b-tab v-for="(item, index) in cart" v-bind:key="index">
                    <template #title>
                      <h6>Item Code {{ item.id }}</h6>
                      <h4>{{ item.name }}</h4>
                    </template>
                    <b-card-text>
                      <div class="p-3 p-lg-4 greybox_area">
                        <div class="pb-3">
                          <h6 class="small_title">Product Specification</h6>
                          <p v-for="(e, i) in item.combination" v-bind:key="i">
                            {{ e.attributeName }}: <span class="text-muted">{{ e.attributeValueName }}</span>
                          </p>
                        </div>
                        <div class="bg-white p-3 mb-3">
                          <div
                            class=" d-flex text-center align-items-center justify-content-center flex-column uploadbox">
                            <div class=" btn_primary artworkbtn text-uppercase">
                              <button class="mb-2" v-on:change="uploadArtwork($event, item)" :disabled="loading">
                                <input type="file" :id="'artwork' + item.id" hidden />
                                <label :for="'artwork' + item.id">
                                  <span v-if="!loading">
                                    <i class="fas fa-upload me-2"></i>
                                    Upload Files
                                  </span>
                                  <span v-else>
                                    <b-spinner small type="grow"></b-spinner> Uploading...
                                  </span>
                                </label>
                              </button>
                            </div>
                            <a class="previewIcon" v-if="item.artworkUploaded == true" :href="item.artwork.artwork"
                              target="_blank">
                              <i class="fas fa-file-check"></i></a>
                            <div v-if="item.artworkUploaded == true" class="mb-2">
                              Your artwork is uploaded. Click on
                              the above icon to check the uploaded
                              artwork.
                            </div>
                          </div>
                        </div>
                        <div class="bg-white px-3 pt-3 pb-2">
                          <p>
                            Please note, on completion of your
                            order we offer a 15 minute window to
                            make any final amends to your uploaded
                            artwork via
                            <a href="#"><strong>Orders</strong></a>
                            in the
                            <a href="#"><strong>MyAccount</strong></a>
                            area. After these 15 minutes, no
                            further changes can be made and all
                            artwork will be processed for printing
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
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  head() {
    return {
      title: 'Digital Press | Upload Artwork',
    }
  },
  data() {
    return {
      loading: false,
      userData: {},
      userDetail: {},
      activeTab: 0,
    };
  },

  async mounted() {
    this.getUserdetails();
  },

  computed: {
    ...mapState('cart', ['cart']),
  },

  methods: {
    async uploadArtwork(event, product) {
      let FILE = event.target.files[0];
      if (FILE.size > 104857600) { // 104857600 bytes = 100MB
        this.$toast.error("File size exceeds the limit of 100MB. Please select a smaller file.");
        return;
      }
      if (FILE) {
        let formData = new FormData();
        formData.append("product", product.id);
        formData.append("user", this.userData.id);
        formData.append("artwork", FILE);
        try {
          this.loading = true
          const response = await this.$store.getters.client.post("/order/user-artworks/", formData)
          const artwork = response.data;
          this.$store.dispatch("cart/updateArtworkStatus", {
            product,
            artwork,
          });
          this.$toast.success("Your artwork is uploaded successfully");

        } catch (error) {
          this.$toast.error(error);
        }
        finally {
          this.loading = false
        }
      }
    },

    getUserdetails() {
      this.userDetail = JSON.parse(sessionStorage.getItem("user"));
      this.userData = this.userDetail;
    },
  },
};
</script>
