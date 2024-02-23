<template>
    <div class="cartform_collapse_item">
        <div class="collpase_item_body border-bottom-0 collapse show">
            <div class="collpase_item_inner py-4">
                <div class="">
                    <div class="left_area uploadart_section">
                        <h6 class="uploadart_title">
                            You can upload your files below, or if we are designing, please send us the brief with
                            text/images/logos.
                        </h6>
                        <b-card no-body class="no-gutters row">
                            <b-tabs pills vertical content-class="px-md-0"
                                nav-wrapper-class="col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12 px-md-0" v-model="activeTab">
                                <b-tab v-for="(item, index) in orderItems" v-bind:key="index">
                                    <template #title>
                                        <h6>Item Code {{ item.id }}</h6>
                                        <h4>{{ item.name }}</h4>
                                    </template>
                                    <b-card-text>
                                        <div class="p-3 p-lg-4 greybox_area">
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
                                                                    Upload Files
                                                                </span>
                                                                <span v-else>
                                                                    <b-spinner small type="grow"></b-spinner>
                                                                    Uploading...
                                                                </span>
                                                            </label>
                                                        </button>
                                                    </div>
                                                    <a class="previewIcon" v-if="item.artworkUploaded == true"
                                                        :href="item.artwork.artwork" target="_blank">
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
    </div>
</template>
  
<script>
import { mapActions, mapState } from 'vuex';

export default {
    data() {
        return {
            loading: false,
            activeTab: 0,
        };
    },

    computed: {
        ...mapState("quotation", ['orderItems', 'quotationData'])
    },

    methods: {
        ...mapActions('quotation', ['updateArtworkStatus', 'updateStep']),
        async uploadArtwork(event, product) {
            let FILE = event.target.files[0];
            if (FILE.size > 104857600) {
                this.$toast.error("File size exceeds the limit of 100MB. Please select a smaller file.");
                return;
            }
            // console.log(product)
            // const productID = product.product_id || product.quotation_product_id
            if (FILE) {
                let formData = new FormData();
                // formData.append("product", productID);
                formData.append("user", this.quotationData?.users?.id);
                formData.append("artwork", FILE);
                try {
                    this.loading = true
                    const response = await this.$store.getters.client.post("/order/user-artworks/", formData)
                    const artwork = response.data;
                    this.updateArtworkStatus({ product, artwork })
                    this.$toast.success("Your artwork is uploaded successfully");
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