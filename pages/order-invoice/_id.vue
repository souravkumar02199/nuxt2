<template>
  <div class="py-5 mx-auto container" v-if="orderDetails">
    <client-only>
      <vue-html2pdf :show-layout="true" :float-layout="false" :enable-download="true" :preview-modal="false"
        :filename="`invoice-${orderDetails?.number}`" :paginate-elements-by-height="1100" :pdf-quality="2" pdf-format="a4" pdf-orientation="portrait"
        pdf-content-width="800px" :manual-pagination="false" ref="html2Pdf">
        <section slot="pdf-content">
          <div class="p-4 bg-white mt-4">
            <h4 class="dp-primary mb-5">INVOICE</h4>
            <b-row>
              <b-col cols="7">
                <ul>
                  <li>Order number: {{ orderDetails?.number }}</li>
                  <li>Invoice number: {{ orderDetails?.number }}</li>
                  <li>Order name: DP{{ orderDetails?.id }}</li>
                  <li>Your PO number: N/A</li>
                  <li>Invoice date: {{orderDetails?.created_at | moment("Do MMM YYYY")}}</li>
                </ul>
                <ul>
                  <li class="font-weight-bold">Bill to:</li>
                  <li>{{orderDetails?.billing_first_name}} {{orderDetails?.billing_last_name}}</li>
                  <li>{{orderDetails?.billing_company}}</li>
                  <li>{{orderDetails?.billing_street1}}</li>
                  <li>{{orderDetails?.billing_city}}</li>
                  <li>{{orderDetails?.billing_country}}</li>
                  <li>{{orderDetails?.billing_pobox}}</li>
                </ul>
                <ul>
                  <li class="font-weight-bold">Deliver to:</li>
                  <li>{{orderDetails?.shipping_first_name}} {{orderDetails?.shipping_last_name}}</li>
                  <li>{{orderDetails?.shipping_company}}</li>
                  <li>{{orderDetails?.shipping_street1}}</li>
                  <li>{{orderDetails?.shipping_city}}</li>
                  <li>{{orderDetails?.shipping_country}}</li>
                  <li>{{orderDetails?.shipping_pobox}}</li>
                  
                </ul>
              </b-col>
              <b-col cols="5">
                <div class="d-flex flex-column justify-content-center">
                  <img src="~/assets/images/header/logo.png" alt="LOGO" style="width: 178px; height: 31px;">
                  <!-- <span id="logo-text">QUALITY PRINTING FOR DIGITAL AGE</span> -->
                </div>
                <ul class="mt-4">
                  <!-- <li>VAT number: 880761012</li> -->
                  <li>Digital Press</li>
                  <li>
                    Registered address: Dock - Space City, Unit 109, <br> 75 Exploration Drive, Leicester LE4 5NU
                  </li>
                </ul>
                <ul>
                  <li>https://www.digitalpress.co.uk</li>
                  <li>sales@digitalpress.co.uk</li>
                  <li>0800 756 3711</li>
                  <li>Company Registration Number: 15228142</li>
                </ul>
              </b-col>
            </b-row>
            <div class="font-weight-bold">
              <p>ORDER DETAILS</p>
              <table>
                <thead>
                  <tr>
                    <th>Item</th>
                    <th class="vat text-center">Quantity</th>
                    <th class="w-100px"></th>
                    <th class="w-100px total text-end">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in orderDetails.order_items" :key="index">
                    <td>{{item.product_data.name}}
                      <ul>
                        <li v-for="(variant, index) in item.variant" :key="index">
                          {{ variant.attribute.name }}: {{ variant.attribute_value.name }}
                        </li>
                      </ul>
                    </td>
                    <td class="vat text-center">{{item.qty_ordered}}</td>
                    <th class="w-100px"></th>
                    <td class="w-100px total text-end">&#163;{{item.item_price}}</td>
                  </tr>
                  <tr class="border-0">
                    <td></td>
                    <td class="vat"></td>
                    <td colspan="2" class="p-0">
                      <table>
                        <tbody class="text-end">
                          <tr>
                            <td>Subtotal</td>
                            <td class="total">&#163;{{orderDetails.order_subtotal ? orderDetails.order_subtotal.toFixed(2): '0.00'}}</td>
                          </tr>
                          <tr>
                            <td>Artwork</td>
                            <td class="total">&#163;{{orderDetails.design_service_price ? orderDetails.design_service_price.toFixed(2) : '0.00'}}</td>
                          </tr>
                          <tr>
                            <td>Delivery</td>
                            <td class="total">&#163;{{orderDetails.shipping_amount?orderDetails.shipping_amount.toFixed(2):'0.00'}}</td>
                          </tr>
                          <tr>
                            <td>VAT</td>
                            <td class="total">&#163;{{orderDetails.vat_amount?orderDetails.vat_amount.toFixed(2):'0.00'}}</td>
                          </tr>
                          
                          <tr>
                            <td>Total</td>
                            <td class="total">&#163;{{orderDetails.price_amount.toFixed(2)}}</td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </vue-html2pdf>
    </client-only>
    <div class="text-center">
      <button type="button" class="btn btn-dark mt-3" @click="downloadPdf">Download Invoice</button>
    </div>
  </div>
</template>

<script>
import VueHtml2pdf from 'vue-html2pdf'
import DpLogo from '../../components/layout/DpLogo.vue';
export default {
  layout: "user",
  components: { DpLogo, VueHtml2pdf},
  data() {
    return {
      orderDetails: null,
      contentRendered: false,
      progress: 0,
      generatingPdf: false,
      pdfDownloaded: false,
      htmlToPdfOptions: {
        margin: 0,

        filename: `hehehe.pdf`,

        image: {
          type: "jpeg",
          quality: 0.98,
        },

        enableLinks: false,

        html2canvas: {
          scale: 1,
          useCORS: true,
        },

        jsPDF: {
          unit: "in",
          format: "a4",
          orientation: "portrait",
        },
      },
    }
  },
  methods: {
    async downloadPdf() {

      this.$refs.html2Pdf.generatePdf();
      this.$router.push('/dashboard/orders')
    },

   async getOrder() {
      const USER = JSON.parse(sessionStorage.getItem("user"));
      const HEADER = { Authorization: "Bearer " + USER.access };
      try {
        await this.$store.getters.userClient
        .post(`/user/user-order`, { order_id: Number(this.$route.params.id) }, { HEADER })
        .then((res) => {
          this.orderDetails = res.data.result[0]
        });
      } catch (error) {
        console.log(error)
      }
    } 
  },
  mounted() {
    this.getOrder()
  },

};
</script>

<style scoped>
table ul{
  list-style-type: disc;
  padding-left: 12px;
}
ul {
  margin-bottom: 1rem;
  list-style-type: none;
  font-size: 0.75rem;
}

table {
  font-size: 0.75rem;
  font-weight: 400;
  width: 100%;
  table-layout: fixed;
}

table tr {
  border-bottom: 1px solid #444;
}

table thead {
  color: #666;
}

th,
td {
  padding: 8px 15px;
}

.total {
  background-color: #f1d2d869;
}

.vat {
  width: 100px;
}

.w-100px {
  width: 100px;
}

.vue-html2pdf {
  display: flex;
  justify-content: center;
}

.vue-html2pdf>>>.layout-container.show-layout {
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1) !important;
}
</style>
