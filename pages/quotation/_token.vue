<template>
  <section class="relative">
    <div class="action-container bg-light">
      <div class="container d-flex justify-content-between py-3">
        <div></div>
        <div class="d-flex justify-content-end gap-3">
          <b-button variant="success" v-if="orderAcceptable" @click="acceptQuotation">Accept</b-button>
          <!-- <span>{{ orderAcceptable }}</span> -->
          <b-button variant="warning" @click="modifyModal = true">Modify</b-button>
          <b-button variant="dark" @click="downloadPdf">Download</b-button>
        </div>
      </div>
    </div>
    <div class="py-5 mx-auto container" v-if="quoteData">
      <div class="quote-container">
        <h2 class="page-title mb-4" style="color: #0096ae; margin-top: 0; font-weight: 600;">QUOTATION</h2>
        <div style="display: flex; gap: 1.5rem;">
          <div style="width: 50%;">
            <ul style="list-style-type: none; padding-left: 0%; margin-bottom: 1rem;">
              <li>Quotation number: {{ quoteData.number }}</li>
              <li>Quotation date: {{ quoteData.updated_at | moment('DD MMM, YYYY') }}</li>
              <!-- <li>Required By: {{ quoteData.updated_at | moment('DD MMM, YYYY') }}</li> -->
            </ul>
            <ul style="list-style-type: none; padding-left: 0%; " class="mb-3">
              <li style="font-weight: 600;">Bill to:</li>
              <li>{{ quoteData?.users?.first_name }} {{ quoteData?.users?.last_name }}</li>
              <li>{{ quoteData?.company_details }}</li>
              <li> {{ quoteData?.billing_address[0]?.street1 }} </li>
              <li> {{ quoteData?.billing_address[0]?.street2 }} </li>
              <li> {{ quoteData?.billing_address[0]?.city }} </li>
              <li> {{ quoteData?.billing_address[0]?.county }}, {{ quoteData?.billing_address[0]?.postal_code }}</li>
            </ul>
          </div>
          <div style="width: 50%;">
            <ul style="list-style-type: none; padding-left: 0%; ">
              <li>Digital Press</li>
              <li>
                Dock - Space City, Unit 109, <br> 75 Exploration Drive, Leicester LE4
                5NU
              </li>
            </ul>
            <ul style="list-style-type: none; padding-left: 0%; ">
              <li><a href="https://www.digitalpress.co.uk">www.digitalpress.co.uk</a></li>
              <li>sales@digitalpress.co.uk</li>
              <li>0800 756 3711</li>
              <li>Company Number: 15228142</li>
              <li>VAT number: 453 4365 91</li>
            </ul>
          </div>
        </div>

        <div>
          <p style="font-size: 1rem; font-weight: 600;">QUOTATION DETAILS</p>
          <table style="width: 100%;" align="center" role="presentation" cellspacing="0" cellpadding="0" border="0"
            width="100%">
            <thead style="border-top: 1px solid #000; background-color: #e9f0ff; padding: 8px 15px;">
              <tr>
                <th style="text-align: start; padding: 8px 15px; width: 60%;">Item Details</th>
                <th style="text-align: center; width: 125px; padding: 8px 15px;">Quantity</th>
                <th style=" text-align: center; width: 125px; padding: 8px 15px;">Unit price</th>
                <th style="text-align: end; width: 125px; padding: 8px 15px;">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr class="product-detail" v-for="(item, index) in quoteData.products_pricing" :key="index">
                <td style="padding: 15px 0; vertical-align: top; width: 60%;">
                  <table class="w-100">
                    <tr>
                      <td style="width: 150px; padding: 0 15px; vertical-align: top;">
                        <img :src="item.image" class="rounded w-100" alt="">
                      </td>
                      <td>
                        <div style="font-weight: 600;">{{ item.name }}</div>
                        {{ item.description }}
                      </td>
                    </tr>
                  </table>
                </td>
                <td colspan="3" style="padding: 8px 15px; vertical-align: top;">
                  <table style="width: 100%;">
                    <tbody>
                      <tr v-for="(price, j) in item.quotation_product_price" :key="j">
                        <td style="width: 125px; text-align: center;">{{ price.quantity }}</td>
                        <td style="width: 125px; text-align: center; ">&#163;{{
                          (price.base_price / price.quantity).toFixed(2) }}</td>
                        <td style="width: 125px; text-align: end;">&#163;{{ price.base_price }}</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr class="product-detail">
                <td style="padding: 8px 15px; vertical-align: top; text-align: end;" colspan="4">
                  <table style="width: 100%;">
                    <tbody>
                      <tr>
                        <th style="text-align: start; line-height: 2;">
                          Artwork Charges : <span style="font-weight: 400;">{{ quoteData.artwork_service }}</span>
                        </th>
                        <td>&#163;{{ quoteData.artwork_charges || '0.00' }}</td>
                      </tr>
                      <tr>
                        <th style="text-align: start; line-height: 2;">
                          Delivery Charges : <span style="font-weight: 400;">{{ quoteData.delivery_service }}</span>
                        </th>
                        <td>&#163;{{ quoteData.shipping_charges || '0.00' }}</td>
                      </tr>
                      <tr>
                        <th style="text-align: start; line-height: 2;">
                          Additional Cost : <span style="font-weight: 400;">{{ quoteData.additional_service }}</span>
                        </th>
                        <td>&#163;{{ quoteData.additional_charges || '0.00' }}</td>
                      </tr>
                      <tr>
                        <th style="text-align: start; line-height: 2;">
                          Discount : <span style="font-weight: 400;">{{ quoteData.discount_service }}</span>
                        </th>
                        <td>- &#163;{{ quoteData.discount_amount || '0.00' }}</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr class="product-detail">
                <td colspan="2"></td>
                <td style="padding: 8px 15px; vertical-align: top; text-align: end;" colspan="2">
                  <table style="width: 100%;">
                    <tbody>
                      <tr>
                        <th style="text-align: end;"> Subtotal :</th>
                        <td>&#163;{{ quoteData.subtotal }}</td>
                      </tr>
                      <tr>
                        <th style="text-align: end;">
                          VAT :
                        </th>
                        <td>&#163;{{ quoteData.vat }}</td>
                      </tr>
                      <tr>
                        <th style="text-align: end;">
                          Total :
                        </th>
                        <td>&#163;{{ quoteData.total }}</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td colspan="4"
                  style="font-size: 1.5rem; font-weight: 600; text-align: center; color: #0096ae; padding-top: 2rem;">
                  This Quotation is only valid for 14 days.</td>
              </tr>
            </tbody>
          </table>
          <div class="mt-3 bg-light p-3 rounded">
            <strong>Payments to be made to the following bank details:</strong>
            <div class="row mt-2">
              <div class="col-6">
                <strong>Account Name : </strong> Tuli Print & Technologies Limited
              </div>
              <div class="col-6">
                <strong>BIC/Swift : </strong> BUKBGB22
              </div>
              <div class="col-6">
                <strong>Account Number : </strong> 60172871
              </div>
              <div class="col-6">
                <strong>Sort Code : </strong> 20-49-17
              </div>
              <div class="col-6">
                <strong>IBAN Number : </strong> GB41 BUKB 2049 1760 1728 71
              </div>
              <div class="col-12 mt-3">
                <strong>
                  To make payment by Debit or Credit Card, please call our Accounts Team on: 0800 756 3711
   ALL REMITTANCES NEED TO BE SENT TO sales@digitalpress.co.uk <br> *If you have any issues or discrepancies, please notify us within 48 hours of receiving this documentation* <br>
  DIGITAL PRESS IS A TRADING DIVISION OF THE TULI PRINT & TECHNOLOGIES LIMITED (15228142)
                </strong>

              </div>
            </div>
          </div>
        </div>
      </div>
      <client-only>
        <vue-html2pdf :show-layout="false" :float-layout="true" :enable-download="true" :preview-modal="false"
          :filename="`quotation-${quoteData?.number}`" :paginate-elements-by-height="1100" :pdf-quality="2"
          pdf-format="a4" pdf-orientation="portrait" pdf-content-width="800px" :manual-pagination="false" ref="html2Pdf">
          <section slot="pdf-content">
            <div class="quote-container" style="font-size: 12px;">
              <h2 class="page-title mb-4" style="color: #0096ae; margin-top: 0; font-weight: 600;">QUOTATION</h2>
              <div style="display: flex; gap: 1.5rem;">
                <div style="width: 50%;">
                  <ul style="list-style-type: none; padding-left: 0%; margin-bottom: 1rem;">
                    <li>Quotation number: {{ quoteData.number }}</li>
                    <li>Quotation date: {{ quoteData.updated_at | moment('DD MMM, YYYY') }}</li>
                    <!-- <li>Required By: {{ quoteData.updated_at | moment('DD MMM, YYYY') }}</li> -->
                  </ul>
                  <ul style="list-style-type: none; padding-left: 0%;" class="mb-3">
                    <li style="font-weight: 600;">Bill to:</li>
                    <li>{{ quoteData?.users?.first_name }} {{ quoteData?.users?.last_name }}</li>
                    <li>{{ quoteData?.company_details }}</li>
                    <li> {{ quoteData?.billing_address[0]?.street1 }} </li>
                    <li> {{ quoteData?.billing_address[0]?.street2 }} </li>
                    <li> {{ quoteData?.billing_address[0]?.city }} </li>
                    <li> {{ quoteData?.billing_address[0]?.county }}, {{ quoteData?.billing_address[0]?.postal_code }}</li>
                  </ul>
                </div>
                <div style="width: 50%;">
                  <div class="d-flex flex-column justify-content-center">
                    <img src="~/assets/images/header/logo.png" alt="LOGO" width="200" height="35">
                  </div>
                  <!-- <img src="~/assets/images/header/logo.png" alt="LOGO" width="180" height="100"> -->
                  <ul style="list-style-type: none; padding-left: 0%; ">
                    <li>Digital Press</li>
                    <li>
                      Dock - Space City, Unit 109, <br> 75 Exploration Drive, Leicester LE4
                      5NU
                    </li>
                  </ul>
                  <ul style="list-style-type: none; padding-left: 0%; ">
                    <li><a href="https://www.digitalpress.co.uk">www.digitalpress.co.uk</a></li>
                    <li>sales@digitalpress.co.uk</li>
                    <li>0800 756 3711</li>
                    <li>Company Number: 15228142</li>
                    <li>VAT number: 453 4365 91</li>
                  </ul>
                </div>
              </div>

              <div>
                <p style="font-size: 1rem; font-weight: 600;">QUOTATION DETAILS</p>
                <table style="width: 100%;" align="center" role="presentation" cellspacing="0" cellpadding="0" border="0"
                  width="100%">
                  <thead style="border-top: 1px solid #000; background-color: #e9f0ff; padding: 8px 15px;">
                    <tr>
                      <th style="text-align: start; padding: 8px 15px;">Item</th>
                      <th style="text-align: center; width: 100px; padding: 8px 15px;">Quantity</th>
                      <th style=" text-align: end; width: 105px; padding: 8px 15px;">Unit price</th>
                      <th style="text-align: end; width: 100px; padding: 8px 15px;">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="product-detail" v-for="(item, index) in quoteData.products_pricing" :key="index">
                      <td style="padding: 8px 15px; vertical-align: top;">
                        <!-- <img :src="item.image" width="150" class="rounded" alt=""> -->
                        <div style="font-weight: 600;">{{ item.name }}</div>
                        {{ item.description }}
                      </td>
                      <td colspan="3" style="padding: 8px 15px; vertical-align: top;">
                        <table style="width: 100%;">
                          <tbody>
                            <tr v-for="(price, j) in item.quotation_product_price" :key="j">
                              <td style="width: 100px; text-align: center;">{{ price.quantity }}</td>
                              <td style="width: 100px; text-align: center; ">&#163;{{
                                (price.base_price / price.quantity).toFixed(2) }}</td>
                              <td style="width: 100px; text-align: end;">&#163;{{ price.base_price }}</td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    <tr class="product-detail">
                      <td style="padding: 8px 15px; vertical-align: top; text-align: end;" colspan="4">
                        <table style="width: 100%;">
                          <tbody>
                            <tr>
                              <th style="text-align: start; line-height: 1.5;">
                                Artwork Charges : <span style="font-weight: 400;">{{ quoteData.artwork_service }}</span>
                              </th>
                              <td>&#163;{{ quoteData.artwork_charges || '0.00' }}</td>
                            </tr>
                            <tr>
                              <th style="text-align: start; line-height: 1.5;">
                                Delivery Charges : <span style="font-weight: 400;">{{ quoteData.delivery_service }}</span>
                              </th>
                              <td>&#163;{{ quoteData.shipping_charges || '0.00' }}</td>
                            </tr>
                            <tr>
                              <th style="text-align: start; line-height: 1.5;">
                                Additional Cost : <span style="font-weight: 400;">{{ quoteData.additional_service
                                }}</span>
                              </th>
                              <td>&#163;{{ quoteData.additional_charges || '0.00' }}</td>
                            </tr>
                            <tr>
                              <th style="text-align: start; line-height: 1.5;">
                                Discount : <span style="font-weight: 400;">{{ quoteData.discount_service }}</span>
                              </th>
                              <td>- &#163;{{ quoteData.discount_amount || '0.00' }}</td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    <tr class="product-detail">
                      <td colspan="2"></td>
                      <td style="padding: 8px 15px; vertical-align: top; text-align: end;" colspan="2">
                        <table style="width: 100%;">
                          <tbody>
                            <tr>
                              <th style="text-align: end;">
                                Subtotal :
                              </th>
                              <td>&#163;100.00</td>
                            </tr>
                            <tr>
                              <th style="text-align: end;">
                                VAT :
                              </th>
                              <td>&#163;{{ quoteData.vat }}</td>
                            </tr>
                            <tr>
                              <th style="text-align: end;">
                                Total :
                              </th>
                              <td>&#163;{{ quoteData.total }}</td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td colspan="4"
                        style="font-size: 1.5rem; font-weight: 600; text-align: center; color: #0096ae; padding-top: 2rem;">
                        This Quotation is only valid for 14 days.</td>
                    </tr>
                  </tbody>
                </table>
                <div class="mt-3 bg-light p-3 rounded">
            <strong>Payments to be made to the following bank details:</strong>
            <div class="row mt-2">
              <div class="col-6">
                <strong>Account Name : </strong> Tuli Print & Technologies Limited
              </div>
              <div class="col-6">
                <strong>BIC/Swift : </strong> BUKBGB22
              </div>
              <div class="col-6">
                <strong>Account Number : </strong> 60172871
              </div>
              <div class="col-6">
                <strong>Sort Code : </strong> 20-49-17
              </div>
              <div class="col-6">
                <strong>IBAN Number : </strong> GB41 BUKB 2049 1760 1728 71
              </div>
              <div class="col-12 mt-3">
                <strong>
                  To make payment by Debit or Credit Card, please call our Accounts Team on: 0800 756 3711
   ALL REMITTANCES NEED TO BE SENT TO sales@digitalpress.co.uk <br> *If you have any issues or discrepancies, please notify us within 48 hours of receiving this documentation* <br>
  DIGITAL PRESS IS A TRADING DIVISION OF THE TULI PRINT & TECHNOLOGIES LIMITED (15228142)
                </strong>

              </div>
            </div>
          </div>
              </div>
            </div>
          </section>
        </vue-html2pdf>
      </client-only>
    </div>

    <b-modal v-model="modifyModal" centered hide-footer hide-header>

      <b-button type="button" variant="light" @click="modifyModal = false" class="float-right">&#10006;</b-button>
      <div class="text-center h6 py-3">
        Kindly respond to the initial email chain, specifying the modifications needed, and our sales team will forward
        the revised quotation to you.
      </div>
    </b-modal>
  </section>
</template>
<script>
import VueHtml2pdf from 'vue-html2pdf'
import DpLogo from '../../components/layout/DpLogo.vue';
import axios from "axios";
import { URL } from "@/api/global.env.js";
import { mapActions } from 'vuex';
export default {
  layout: "mail",
  components: { DpLogo, VueHtml2pdf },
  data() {
    return {
      URL: URL,
      action: false,
      id: null,
      orderId: null,
      artworkData: null,
      AUTH: null,
      data: {
        comment: "",
        status: "",
      },
      modifyModal: false,
      quoteData: null,
      orderAcceptable: false
    };
  },
  created() {
    const PATH_ID = this.$route.params.token.split("-");
    this.id = PATH_ID[1];
    this.AUTH = this.$route.query.token;
  },
  mounted() {
    this.getArtwork();
  },
  methods: {
    ...mapActions("quotation", ['initQuotationOrder', 'addOrderItems', 'setToken']),
    async downloadPdf() {
      this.$refs.html2Pdf.generatePdf();
    },
    async getArtwork() {
      try {
        const res = await axios.get(`${URL}/api/order/quotation/${this.id}/`, {
          headers: {
            Authorization: `Bearer ${this.AUTH}`,
          },
        });
        this.quoteData = res.data
        this.orderAcceptable = this.allOrdersHaveSingleQuantity(this.quoteData.products_pricing)
      } catch (error) {
        console.log(error)
      }
    },
    uuidv4() {
      return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
      );
    },

    allOrdersHaveSingleQuantity(products) {
      return products.every(function (pricing) {
        return pricing.quotation_product_price.length === 1;
      });
    },

    acceptQuotation() {
      this.initQuotationOrder(this.quoteData)
      this.setToken(this.AUTH)
      this.$router.push(`/quotation/place-order/${this.uuidv4()}/`)
    }
  },
};
</script> 
  
<style>
.quote-container {
  /* margin: auto;  */
  padding: 3rem;
  box-shadow: 0 0 20px #DDDDDD;
}

.product-detail:nth-child(even) {
  background-color: #e9f0ff;
}

.vue-html2pdf {
  display: flex;
  justify-content: center;
}

.vue-html2pdf>>>.layout-container.show-layout {
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1) !important;
}

.action-container {
  position: sticky;
  top: 60px;
}
</style>
  