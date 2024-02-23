<script>
import * as Constants from "../../utils/const";
import { required, email } from "vuelidate/lib/validators";
import Accordion from "../../components/accordion";
import MenuBar from "../../components/layout/MenuBar.vue";
import HeaderBar from "../../components/layout/HeaderBar.vue";
import FooterBanner from "../../components/FooterBanner.vue";
import { MEDIA_URL } from "@/api/urls"
export default {
  middleware: 'scrollToTopMiddleware',
  Constants: Constants,
  props: { username: String, },
  components: { Accordion, MenuBar, HeaderBar, FooterBanner },
  head() {
    return {
      title: this.productDetail.page_title,
      meta: [
        { name: "description", content: this.productDetail.engine_description },
      ],
      link: [
        {
          rel: 'canonical',
          href: process.env.BACKEND_URL + this.$route.path
        }
      ],
      script: [
        { src: "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js", body: true },
        { src: "https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.4.1/js/bootstrap.min.js", body: true },
        { src: "https://scripts.sirv.com/sirvjs/v3/sirv.js" },
      ]
    }
  },
  data() {
    return {
      quote: {
        name: "",
        phone: "",
        email: "",
        message: "",
        user: null,
        contact_type: 'website',
      },
      MEDIA_URL: MEDIA_URL,
      noPrice: false,
      selectedProductImage: {},
      imageModal: false,
      isFaq: false,
      Constants: Constants,
      totalPrice: null,
      quantity: null,
      priceList: false,
      productDetail: {},
      shippingMethod: "",
      product_variant_id: "",
      varient_combination: [],
      is_loading: false,
      artworkTempltate: false,
      priceArray: [],
      showAllPrice: false,
      pricePerPage: 5,
      currentPriceCount: 5,
      productImages: [],
      categoryName: null,
      designServices: [],
      deliverySettings: [],
      selectedDesign: {
        price: 0.0,
      },
      filterVariant: {
        product_id: null,
        attribute_value_id: [],
        quantity: null,
      },
      deliveryOptions: [],
      selectedQty: 1,
      selectedDelivery: null,
      selectedDeliveryDate: null,
      viewModel: false,
    };
  },

  validations: {
    quote: {
      email: { required, email },
      name: { required },
      phone: { required },
      message: { required },
    },
  },

  computed: {
    displayedPrice() {
      if (this.showAllPrice) {
        return this.priceArray;
      } else if (this.priceArray) {
        return this.priceArray.slice(0, this.currentPriceCount);
      }
    },

    calcTotalPrice() {
      let totalPrice = Number(this.totalPrice);
      let artworkService = Number(this.selectedDesign.price);
      let total = totalPrice + artworkService;
      return total.toFixed(2)
    },

    calcUnitPrice() {
      let totalPrice = Number(this.totalPrice);
      let artworkService = Number(this.selectedDesign.price);
      let total = (totalPrice + artworkService) / this.quantity;
      return total.toFixed(2)
    },
  },

  mounted() {
    this.onload();
  },

  methods: {
    sendRequest() {
      if (this.$v.$invalid) {
        return;
      } else {
        this.is_loading = true;
        this.$store.getters.client
          .post(`/order/quotation/`, this.quote)
          .then(() => {
            this.$refs.requestForm.reset();
            this.is_loading = false;
          })
          .catch((errer) => {
            this.is_loading = false;
          });
      }
    },

    formatPrice(price) {
      if (price) {
        return price.toFixed(2)
      }
    },
    openModal(item, index) {
      this.imageModal = true;
      this.selectedProductImage = item;
    },

    async onload() {
      const ACCESS = sessionStorage.getItem('access') || null;
      const METHOD = ACCESS ? this.$store.getters.userClient : this.$store.getters.client
      this.is_loading = true;
      try {
        const response = await METHOD.get(Constants.GetCatalogProductURL + this.$route.params.id);
        this.productDetail = response.data;
        if (this.productDetail.associated_attribute.length > 0) {
          this.priceList = true;
        }
        this.designServices = [...this.productDetail.product_design_service];
        if (this.productDetail.artworks.length > 0) {
          this.artworkTempltate = true;
        }
        this.selectedDesign = this.designServices[0];
        this.categoryName = this.productDetail.category.name;
        this.productImages = this.productDetail.product_images;
        this.selectedProductImage = this.productImages[0];
        if (this.productDetail.faq.length > 0) {
          this.isFaq = true;
        }
        this.filterVariant.product_id = this.productDetail.id;
        if (Object.keys(this.productDetail.variant).length !== 0) {
          this.priceArray = this.productDetail.variant.pricing.map((x) => ({
            ...x,
            // express_price: this.formatPrice(x.express_price),
            // value_price: this.formatPrice(x.value_price),
            // standard_price: this.formatPrice(x.standard_price),
            discounted_express_price: this.formatPrice(x.discounted_express_price),
            discounted_value_price: this.formatPrice(x.discounted_value_price),
            discounted_standard_price: this.formatPrice(x.discounted_standard_price),
          }));
        }
        this.deliveryOptions = this.productDetail.product_delivery_methods;

        this.productDetail.associated_attribute.forEach((item) => {
          this.filterVariant.attribute_value_id.push(item.attribute_value[0].value_id);
        });
        this.calculateDeliveryDate();
      } catch (error) {
        console.error(error);
      } finally {
        this.is_loading = false;
      }
    },

    calculateDeliveryDate() {
      let deliverySettings = this.productDetail.product_delivery_settings;
      let today = new Date();
      let momentBusinessDays = require("moment-business-days");
      let result = deliverySettings.map((x) => ({
        ...x,
        date: momentBusinessDays(today, "DD-MM-YYYY").businessAdd(x.days)._d,
      }));
      this.deliverySettings = result;
    },

    async getPricing(event, index) {
      const ACCESS = sessionStorage.getItem('access') || null;
      const METHOD = ACCESS ? this.$store.getters.userClient : this.$store.getters.client
      this.$nuxt.$loading.start();
      this.filterVariant.attribute_value_id[index] = Number(event.target.value);
      this.filterVariant.quantity = this.selectedQty;
      try {
        const response = await METHOD.post(`/catalog-product/filter-pricing`, this.filterVariant);
        if (response.data.pricing.length > 0) {
          this.noPrice = false;
          this.priceArray = response.data.pricing.map((x) => ({
            ...x,
            // express_price: this.formatPrice(x.express_price),
            // value_price: this.formatPrice(x.value_price),
            // standard_price: this.formatPrice(x.standard_price),
            discounted_express_price: this.formatPrice(x.discounted_express_price),
            discounted_value_price: this.formatPrice(x.discounted_value_price),
            discounted_standard_price: this.formatPrice(x.discounted_standard_price),
          }));
        } else {
          this.noPrice = true;
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.$nuxt.$loading.finish();
      }
    },

    showMore() {
      this.currentPriceCount += 5;
      if (this.currentPriceCount >= this.priceArray.length) {
        this.showAllPrice = true;
      }
    },

    showLess() {
      this.currentPriceCount -= 5;
      this.showAllPrice = false;
    },

    selectmyItem(price, qty, myitem, shipping) {
      let option = this.deliverySettings.find((option) => option.name.toLowerCase() === shipping.toLowerCase());
      if (option) {
        this.selectedDeliveryDate = option.days;
        this.selectedDelivery = option.date;
      }
      this.shippingMethod = shipping;
      this.product_variant_id = myitem.product_variant_id;
      this.totalPrice = parseFloat(price.replace(/,/g, ""));
      this.quantity = qty;
      this.$store.getters.client
        .get(`/variant/get-variant-by-id/${myitem.product_variant_id}`)
        .then((res) => {
          let variant = res.data.Status;
          this.varient_combination = variant.map((obj) => ({
            attributeId: obj.attribute.id,
            attributeName: obj.attribute.name,
            attributeValueId: obj.attribute_value.id,
            attributeValueName: obj.attribute_value.name,
          }));
        });
    },

    async addToCart(product) {
      if (this.totalPrice === null) {
        this.$toast.error(Constants.invalidRate);
        return;
      }
      let productData = {
        product_images: product.product_images,
        id: product.id,
        name: product.name,
        artworkUploaded: false,
        artwork: null,
        vat: product.is_vat_applicable ? (this.totalPrice * 20) / 100 : 0,
        designServicePrice: this.selectedDesign.price === 0.0 ? 0.0 : Number(this.selectedDesign.price).toFixed(2),
        price: this.totalPrice,
        catalog_product_variant_id: this.product_variant_id,
        shipping_method: this.shippingMethod,
        quantity: this.quantity || 1,
        deliveryDays: this.selectedDeliveryDate,
        deliveryDate: this.selectedDelivery,
        combination: this.varient_combination,
      };
      this.$store.dispatch("cart/addToCart", productData);
      this.$nuxt.$emit("open-cart-modal");
    },
  },
};
</script>
<template>
  <div>
    <header-bar></header-bar>
    <menu-bar class="d-none d-md-block"></menu-bar>
    <marque />
    <div class="catg_page_banner" style="background-image: none">
      <div class="banner_breadcrumb">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-12">
              <ul>
                <li>
                  <a href="#"><em>Home</em></a>
                </li>
                <li>
                  <span><em>{{ productDetail.name }}</em></span>
                </li>
              </ul>
            </div>
            <div class="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-12">
              <div class="text-lg-end white_btn cursor_pointer">
                <a @click="$router.back()">Go Back</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="details_section bg-white">
      <div class="container py-4 details_area">
        <div class="row">
          <div class="col-12">
            <div class="details_area bg-white">
              <div class="row">
                <div class="col-lg-6 col-12" id="video-modal">
                  <div class="left_area sticky-top mb-4">
                    <div class="mb-4 details_slider_area">
                      <div v-if="productImages.length > 0">
                        <no-ssr>
                          <carousel :items="1" :margin="0" :loop="true" :autoplay="false" :dots="false" :nav="true"
                            :mouseDrag="false">
                            <div class="embed-responsive embed-responsive-4by3" v-if="productDetail.url_3d">
                              <div class="embed-responsive-item">
                                <div class="Sirv" :data-src="productDetail.url_3d"></div>
                              </div>
                            </div>
                            <div class="embed-responsive embed-responsive-4by3" v-for="(
                                prod, index
                              ) in productDetail.product_images" :key="index">
                              <div class="embed-responsive-item">
                                <img :src="prod.image" class="img-fluid d-block mx-auto"
                                  @click="openModal(prod, index)" />
                              </div>
                            </div>
                          </carousel>
                        </no-ssr>
                      </div>

                      <div v-else>
                        <div class="embed-responsive embed-responsive-4by3">
                          <div class="embed-responsive-item">
                            <img
                              src="https://www.slntechnologies.com/wp-content/uploads/2017/08/ef3-placeholder-image.jpg"
                              class="img-fluid d-block mx-auto" />
                          </div>
                        </div>
                      </div>
                      <!-- </div> -->
                    </div>
                    <div class="requestquote_section">
                      <div class="d-flex">
                        <div class="quoteicon">
                          <img v-if="productDetail.video_title !== null &&
                            productDetail.video_title !== ''
                            " @click="viewModel = true" src="@/assets/images/all/thumbnail.jpg" alt="..."
                            class="img-fluid" />
                          <img v-else src="@/assets/images/icons/quote1.png" alt="..." class="img-fluid pointer" />
                        </div>
                        <div class="quotetext">
                          <h5 class="dp-card-heading">
                            Can't find what you're looking for?
                          </h5>
                          <p>
                            If you're looking for a diferent stock or a higher
                            quantity, we can provide you with a quote
                          </p>
                        </div>
                        <div class="quotebtn">
                          <nuxt-link to="/request_quote">Request a Quote</nuxt-link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <b-modal v-model="viewModel" size="lg" hide-footer hide-header>
                  <div class="text-end">
                    <span role="button" @click="viewModel = false" class="close-btn-2">&#10006;</span>
                  </div>
                  <div class="p-md-3 position-relative">
                    <h1 class="dp-heading-secondary mb-4">
                      {{ productDetail.video_title }}
                    </h1>
                    <div class="dp-text video-content">
                      <div style="border-radius: 0.75rem; overflow: hidden" v-html="productDetail.video_url"></div>
                      <div class="mt-3 video-desc" v-html="productDetail.video_description"></div>
                    </div>
                  </div>
                </b-modal>
                <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                  <div class="right_area mb-4">
                    <h2 class="dp-sub-heading mb-4">
                      {{ productDetail.name }}
                    </h2>
                    <div class="details_tabs_area mb-4">
                      <nav>
                        <div class="nav nav-tabs" id="nav-tab" role="tablist">
                          <a class="nav-item active" id="nav-info-tab" data-toggle="tab" href="#nav-info" role="tab"
                            aria-controls="nav-info" aria-selected="true">Overview</a>
                          <a class="nav-item" id="nav-product-tab" data-toggle="tab" href="#nav-product" role="tab"
                            aria-controls="nav-product" aria-selected="false">Description</a>
                          <a class="nav-item" id="nav-submission-tab" data-toggle="tab" href="#nav-submission" role="tab"
                            aria-controls="nav-submission" aria-selected="false">Technical Specs</a>
                          <a class="nav-item" id="nav-templates-tab" data-toggle="tab" href="#nav-templates" role="tab"
                            aria-controls="nav-templates" aria-selected="false">Templates</a>
                          <a v-if="isFaq === true" class="nav-item" id="nav-faq-tab" data-toggle="tab" href="#nav-faq"
                            role="tab" aria-controls="nav-faq" aria-selected="false">FAQs</a>
                        </div>
                      </nav>
                      <div class="tab-content" id="nav-tabContent">
                        <div class="tab-pane fade show active" id="nav-info" role="tabpanel"
                          aria-labelledby="nav-info-tab">
                          <div class="cms_area" v-if="productDetail.short_description">
                            <read-more detail more-str="read more" :text="productDetail.description" link="#"
                              less-str="read less" :max-chars="500"></read-more>
                          </div>
                        </div>
                        <div class="tab-pane fade" id="nav-product" role="tabpanel" aria-labelledby="nav-info-tab">
                          <div class="cms_area px-3" v-if="productDetail.product_specs">
                            <read-more detail more-str="read more" :text="productDetail.product_specs" link="#"
                              less-str="read less" :max-chars="700"></read-more>
                          </div>
                        </div>
                        <div class="tab-pane fade" id="nav-submission" role="tabpanel" aria-labelledby="nav-info-tab">
                          <div class="cms_area" v-if="productDetail.submission_specs">
                            <read-more detail more-str="read more" :text="productDetail.submission_specs" link="#"
                              less-str="read less" :max-chars="500"></read-more>
                          </div>
                        </div>
                        <div class="tab-pane fade" id="nav-submission" role="tabpanel"
                          aria-labelledby="nav-submission-tab">
                          <div v-html="productDetail.submission_specs"></div>
                        </div>
                        <div class="tab-pane fade position-relative overflow-hidden" id="nav-templates" role="tabpanel"
                          aria-labelledby="nav-templates-tab">
                          <p class="text-center w-75 mx-auto" :class="artworkTempltate ? '' : 'my-3'">
                            {{ artworkTempltate ? 'Please choose the template to download and use for your artwork' :
                              'Please contact the sales team for the template.' }}
                          </p>
                          <div class="justify-content-center no-gutters mb-2 templateArtworks">
                            <template v-if="artworkTempltate">
                              <a :href="`${MEDIA_URL}/${item.file}`" target="_blank"
                                v-for="item in productDetail.artworks" :key="item.id">
                                <div v-if="item.type === '.psd'">
                                  <img src="@/assets/images/all/psd.png" alt="" height="50" />
                                  <div class="text-center">PSD</div>
                                </div>
                                <div v-if="item.type === '.idml'">
                                  <img src="@/assets/images/all/ai.png" alt="" height="50" />
                                  <div>ID</div>
                                </div>
                                <div v-if="item.type === '.hint'">
                                  <img src="@/assets/images/all/zip.png" alt="" height="50" />
                                  <div>HINT</div>
                                </div>
                                <div v-if="item.type === '.pdf'">
                                  <img src="@/assets/images/all/pdf.png" alt="" height="50" />
                                  <div>PDF</div>
                                </div>
                              </a>
                            </template>
                          </div>
                          <p class="text-center w-75 mx-auto">
                            If you require our design service, please choose one of the option from the <b>Design
                              Services</b>
                          </p>
                          <div class="template-frame">
                            <div></div>
                            <div></div>
                            <div></div>
                          </div>
                          <div class="frame-triangle"></div>
                        </div>
                        <div class="tab-pane fade" id="nav-faq" role="tabpanel" aria-labelledby="nav-faq-tab">
                          <div v-for="faq in productDetail.faq" :key="faq.id">
                            <Accordion class="mb-2">
                              <template v-slot:title>
                                <div class="pl-2" v-html="faq.question"></div>
                              </template>
                              <template v-slot:content>
                                <div class="pl-2 mb-2 faq-answer" v-html="faq.answer"></div>
                              </template>
                            </Accordion>
                          </div>
                        </div>
                        <!-- </div> -->
                      </div>
                    </div>
                    <div class="details_form_area" v-if="priceList">
                      <h4 class="dp-sub-heading">Start customising your product</h4>
                      <p>Select the specific properties that you need in your product.</p>
                      <div class="details_form_fields" v-for="(
                          attibutes, index
                        ) in productDetail.associated_attribute" :key="index">
                        <div class="form-group">
                          <label class="label" :for="attibutes.attribute_name">{{ attibutes.attribute_name }}</label>
                          <div class="input-group">
                            <select :id="attibutes.attribute_name" class="form-control"
                              @change="(e) => getPricing(e, index)">
                              <option v-for="(val, i) in attibutes.attribute_value" :key="i" :index="index"
                                :value="val.value_id">
                                {{ val.value_name }}
                              </option>
                            </select>
                            <div class="input-group-append">
                              <i class="far fa-chevron-down"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                      <h4 class="dp-sub-heading">Select Your Quantity</h4>

                      <p>
                        Multiple design: if you want to print different designs,
                        you'll need to add a quantity in your basket for each
                        design.
                      </p>

                      <div class="qtytable_new pb-2">
                        <table class="table table-bordered">
                          <thead>
                            <tr>
                              <th>
                                <div class="deliverytype" v-if="deliverySettings.length > 0">
                                  <h5>QTY</h5>
                                  <p>Select your <br /> quantity
                                  </p>
                                </div>
                              </th>
                              <th v-for="item in deliverySettings" :key="item.id">
                                <div class="deliverytype">
                                  <i class="far fa-truck-container"></i>
                                  <h5 class="text-capitalize">
                                    {{ item.name }}
                                  </h5>
                                  <p>
                                    Receive your order on: <br />
                                    <strong class="d-none d-md-block">{{ item.date |
                                      moment("Do MMMM YYYY") }}</strong><strong class="d-md-none">{{ item.date |
    moment("Do MMM YYYY") }}</strong>
                                  </p>
                                </div>
                              </th>
                            </tr>
                          </thead>
                          <tbody v-if="productDetail.variant" class="position-relative">
                            <tr v-for="(item, index) in displayedPrice" v-bind:key="index">
                              <td class="qty_td">
                                <h6>{{ item.quantity }}</h6>
                              </td>
                              <td class="price_td">
                                <div class="price_radio">
                                  <input type="radio" name="price" :id="item.id + index + 'express'"
                                    :disabled="!item.discounted_express_price"
                                    @click="selectmyItem(item.discounted_express_price, item.quantity, item, 'Express')" />
                                  <label :for="item.id + index + 'express'">
                                    {{ item.discounted_express_price ? '&#163;' : '--' }}<span
                                      v-if="item.discounted_express_price != undefined"></span>{{
                                        item.discounted_express_price }}
                                  </label>
                                </div>
                              </td>
                              <td class="price_td">
                                <div class="price_radio">
                                  <input type="radio" name="price" :id="item.id + index + 'standard'"
                                    :disabled="!item.discounted_standard_price"
                                    @click="selectmyItem(item.discounted_standard_price, item.quantity, item, 'Standard')" />
                                  <label :for="item.id + index + 'standard'">
                                    {{ item.discounted_standard_price ? '&#163;' : '--' }}<span
                                      v-if="item.discounted_standard_price != undefined"></span>{{
                                        item.discounted_standard_price }}
                                  </label>
                                </div>
                              </td>
                              <td class="price_td">
                                <div class="price_radio">
                                  <input type="radio" name="price" :id="item.id + index + 'value'"
                                    :disabled="!item.discounted_value_price"
                                    @click="selectmyItem(item.discounted_value_price, item.quantity, item, 'Value')" />
                                  <label :for="item.id + index + 'value'">
                                    {{ item.discounted_value_price ? '&#163;' : '--' }}<span
                                      v-if="item.discounted_value_price != undefined"></span>{{
                                        item.discounted_value_price }}
                                  </label>
                                </div>
                              </td>
                            </tr>
                            <tr v-if="displayedPrice">
                              <td></td>
                              <td colspan="3">
                                <button :disabled="showAllPrice" @click="showMore"
                                  class="w-100 border-0 py-2 text-uppercase">
                                  Show more
                                </button>
                              </td>
                            </tr>
                            <div class="no-price" v-if="noPrice">
                              <div class="w-75">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32">
                                  <path
                                    d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 15H13V17H11V15ZM11 7H13V13H11V7Z"
                                    fill="#212529"></path>
                                </svg> <br>
                                This option is not available, Please choose the other option or email us for a bespoke
                                quote.
                              </div>
                            </div>
                          </tbody>
                        </table>
                      </div>

                      <div class="row">
                        <div class="col-12 col-lg-5">
                          <h4 class="dp-sub-heading">Design Services</h4>
                        </div>
                        <div class="col-12 col-lg-7">
                          <div class="cms_area text-lg-end">
                            <p>
                              <NuxtLink to="/design-print"><u>Which artwork service is right for you?</u></NuxtLink>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div class="details_form_fields">
                        <div class="form-group mb-2">
                          <!-- {{selectedDesign}} -->
                          <div class="input-group">
                            <select id="size" v-model="selectedDesign" class="form-control"
                              placeholder="Select design service">
                              <!-- <option value="0" selected>Select design service</option> -->
                              <option v-for="(item, index) in designServices" :key="index" :value="item">
                                {{ item.name }}
                                <span v-if="item.price !== 0">| &#163;{{ Number(item.price).toFixed(2) }}</span>
                              </option>
                            </select>
                            <div class="input-group-append">
                              <i class="far fa-chevron-down"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="cms_area">
                        <p class="mb-3">
                          We'll "Just Print" your print ready file as supplied,
                          and you agree to <a href="#">these terms</a>. <br />
                          Accepted files: PDF.
                        </p>
                      </div>
                    </div>
                    <div class="details_form_area" v-if="!is_loading && !priceList">
                      <h4 class="dp-sub-heading">
                        Share your custom requirement for this product
                      </h4>
                      <p>
                        Due to the nature of this product we will need more
                        information before we quote you. So please send us your
                        size and qty and one of our sales rep will contact you
                        shortly.
                      </p>
                      <form action="" ref="requestForm">
                        <b-row>
                          <b-col cols="12">
                            <div class="form-group">
                              <label for="email">Your Email Address</label>
                              <input type="email" class="form-control" placeholder="Enter your email"
                                v-model="$v.quote.email.$model" @blur="$v.quote.email.$touch" required />
                              <div>
                                <span class="text-danger" v-if="$v.quote.email.$dirty &&
                                  !$v.quote.email.required
                                  ">Please enter your email.</span>
                                <span class="text-danger" v-else-if="$v.quote.email.$dirty &&
                                  !$v.quote.email.email
                                  ">Please enter a valid email.</span>
                              </div>
                            </div>
                          </b-col>
                          <b-col cols="12">
                            <div class="form-group">
                              <label for="product_name">Name</label>
                              <input type="text" class="form-control" placeholder="Enter your name"
                                v-model="$v.quote.name.$model" @blur="$v.quote.name.$touch" required />
                              <div>
                                <span class="text-danger" v-if="$v.quote.name.$dirty &&
                                  !$v.quote.name.required
                                  ">Please enter your name.</span>
                              </div>
                            </div>
                          </b-col>
                          <b-col cols="12">
                            <div class="form-group">
                              <label for="product_qty">Phone number</label>
                              <input type="number" class="form-control" placeholder="Enter your phone number"
                                v-model="$v.quote.phone.$model" @blur="$v.quote.phone.$touch" required />
                              <div>
                                <span class="text-danger" v-if="$v.quote.phone.$dirty &&
                                  !$v.quote.phone.required
                                  ">Please enter your phone number.</span>
                              </div>
                            </div>
                          </b-col>
                          <b-col cols="12">
                            <div class="form-group">
                              <label for="description">Description</label>
                              <textarea type="text" class="form-control" placeholder="Enter your message"
                                v-model="$v.quote.message.$model" @blur="$v.quote.message.$touch" rows="8"></textarea>
                              <div>
                                <span class="text-danger" v-if="$v.quote.message.$dirty &&
                                  !$v.quote.message.required
                                  ">Please enter your message.</span>
                              </div>
                            </div>
                          </b-col>
                        </b-row>
                        <div class="totalamnt_area text-center">
                          <div class="btn_primary cursor_pointer">
                            <a @click="sendRequest">Send Request</a>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div class="totalamnt_area text-center" v-if="totalPrice">
                      <h4 class="mb-0">
                        Subtotal
                        <span class="pl-2">&#163;{{ calcTotalPrice.substring(0, calcTotalPrice.length - 2) }}<span
                            style="font-size: 1.5rem;">{{ calcTotalPrice.slice(-2) }}</span></span>
                      </h4>
                      <p class="dp-secondary font-weight-bold">Unit Price : &#163;{{ calcUnitPrice }}</p>
                      <div class="btn_primary cursor_pointer mt-3">
                        <a @click="addToCart(productDetail)">Add To Cart</a>
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

    <footer-banner></footer-banner>
    <transition name="fade">
      <div class="image-modal" v-if="imageModal === true">
        <span @click="imageModal = false" class="close-btn text-white">&#10006;</span>
        <div class="modal-body">
          <img :src="selectedProductImage.image" alt="" />
        </div>
      </div>
    </transition>
  </div>
</template>

<style>
.label {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.no-price {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.94);
  top: 0;
  left: 0;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  font-size: 20px;
}

.thumb-container {
  gap: 0.5rem;
  max-width: 100%;
  overflow: auto;
}

.thumb-container img {
  cursor: pointer;
}

.modal.fade.show+.modal-backdrop {
  background-color: rgba(50, 50, 50, 0.88);
}

.image-modal {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 2050;
}

.image-modal .modal-body {
  height: 100%;
  width: 100%;
  position: relative;
}

.image-modal .modal-body img,
.image-modal .modal-body div {
  width: auto;
  max-width: 95%;
  height: auto;
  max-height: 90%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.image-modal .close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 2060;
  cursor: pointer;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.right_area .details_tabs_area .tab-content .tab-pane .cms_area p {
  font-size: 14px !important;
  line-height: 19px !important;
  margin-bottom: 5px !important;
}

.template-frame {
  position: absolute;
  top: -0.75rem;
  right: 0.75rem;
  width: 0.75rem;
  height: 100%;
}

.template-frame div:first-child {
  height: 88%;
  background-color: #e13f6e;
  transform: skewY(45deg);
}

.template-frame div:nth-child(2) {
  height: 1rem;
  background-color: #0096ae;
  transform: skewY(45deg);
  margin-top: 3px;
}

.template-frame div:nth-child(3) {
  height: 0.25rem;
  background-color: #e13f6e;
  transform: skewY(45deg);
  margin-top: 3px;
}

.frame-triangle {
  position: absolute;
  width: 2.5rem;
  height: 2.5rem;
  bottom: -21px;
  transform: rotate(-45deg);
  border-radius: 4px;
  background-color: #0096ae;
  right: 18px;
}

.faq-answer>>>p {
  color: #6c757d !important;
}</style>
