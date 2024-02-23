<template>
  <div class="myaccount_box mb-4">
    <div class="myaccount_box_title d-flex align-items-center justify-content-between">
      <h3>Request A Quote</h3>
    </div>
    <div class="myaccount_box_content">
      <div class="request_form bg-transparent pt-3">
        <p>Fill out the details, our team will contact you.</p>
        <form ref="requestForm">
          <div class="row">
            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
              <div class="form-group">
                <label for="first_name">First Name</label>
                <input type="text" class="bg-white rounded form-control" placeholder="Enter your name"
                  v-model="$v.quote.first_name.$model" @blur="$v.quote.first_name.$touch" required />
                <div>
                  <span class="text-danger" v-if="$v.quote.first_name.$dirty && !$v.quote.first_name.required">Please enter your first
                    name.</span>
                </div>
              </div>
            </div>
            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
              <div class="form-group">
                <label for="last_name">Last Name</label>
                <input type="text" class="bg-white rounded form-control" placeholder="Enter your name"
                  v-model="$v.quote.last_name.$model" @blur="$v.quote.last_name.$touch" required />
                <div>
                  <span class="text-danger" v-if="$v.quote.last_name.$dirty && !$v.quote.last_name.required">Please enter your last
                    name.</span>
                </div>
              </div>
            </div>
            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
              <div class="form-group">
                <label for="email">Your Email Address</label>
                <input type="email" class="bg-white rounded form-control" placeholder="Enter your email"
                  v-model="$v.quote.email.$model" @blur="$v.quote.email.$touch" required />
                <div>
                  <span class="text-danger" v-if="$v.quote.email.$dirty && !$v.quote.email.required
                    ">Please enter your email.</span>
                  <span class="text-danger" v-else-if="$v.quote.email.$dirty && !$v.quote.email.email
                    ">Please enter a valid email.</span>
                </div>
              </div>
            </div>
            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
              <div class="form-group">
                <label for="product_qty">Phone number</label>
                <input type="number" class="bg-white rounded form-control" placeholder="Enter your phone number"
                  v-model="$v.quote.phone.$model" @blur="$v.quote.phone.$touch" required />
                <div>
                  <span class="text-danger" v-if="$v.quote.phone.$dirty && !$v.quote.phone.required">Please enter your
                    phone number.</span>
                </div>
              </div>
            </div>
            <div class="col-xl-12">
              <div class="form-group">
                <label for="description">Description</label>
                <textarea type="text" class="bg-white rounded form-control" placeholder="Enter your message"
                  v-model="$v.quote.message.$model" @blur="$v.quote.message.$touch" rows="8"></textarea>
                <div>
                  <span class="text-danger" v-if="$v.quote.message.$dirty && !$v.quote.message.required">Please enter your
                    message.</span>
                </div>
              </div>
              <div class="form-group">
                <label for="attachments">Attachments</label>
                <input type="file" v-on:change="handleImageChange($event)" id="attachments" />
              </div>
              <p>
                <small>If you have the artwork or images to help us quote your job
                  more efficiently please upload (artwork uploaded for visual
                  reference only and will not be used if you decide to proceed
                  with the order).</small>
              </p>
              <p>
                <small>Once you submit your request we will estimate your price and
                  email you a quote which will also be saved in the QUOTES
                  section of your account. From there you can purchase the
                  item(s), pay and upload your artwork.</small>
              </p>
            </div>
          </div>
          <div class="btn_primary">
            <button type="button" @click="sendQuote">Submit Enquiry</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      FILE:null,
      quote: {
        first_name: "",
        last_name: "",
        phone: "",
        email: "",
        message: "",
        user: null,
        file_attachment: null,
      },
    };
  },
  validations: {
    quote: {
      email: { required, email },
      first_name: { required },
      last_name: { required },
      phone: { required },
      message: { required },
    },
  },
  methods: {
    handleImageChange(event) {
      const file = event.target.files[0];
      this.FILE = file
    },
    async sendQuote() {
      let formData = new FormData();
      if (this.FILE) {
        formData.append("file_attachment", this.FILE, this.FILE.name);
      }
      formData.append("email", this.quote.email);
      formData.append("first_name", this.quote.first_name);
      formData.append("last_name", this.quote.last_name);
      formData.append("phone", this.quote.phone);
      formData.append("message", this.quote.message);
      formData.append("contact_type", 'website');
      if (this.$v.$invalid) {
        return;
      } else {
        try {
          const resp = await this.$store.getters.client.post(`/order/quotation/`, formData)
          if (resp.status === 200) {
            this.$toast.success("Your quote request has been received. Please allow 4-8hrs for custom quote.");
          }
        } catch (error) {
          this.$toast.error("Something went wrong! Try again later.");

        } finally {
          this.$refs.requestForm.reset();
        }
      }
    },
  },
};
</script>