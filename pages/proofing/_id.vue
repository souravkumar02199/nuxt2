<template>
  <section class="py-5">
    <div class="email-container bg-dark px-4 py-5 rounded text-white" v-if="action">
      <h3 class="text-white text-center">The artwork submission has been sent to the team.</h3>
    </div>
    <div class="email-container bg-dark px-4 py-5 rounded text-white" v-else>
      <h3 class="mb-3 text-white text-center">Design Proof <span></span></h3>
      <h4 class="text-center dp-primary mb-3">Order: DP123456Z</h4>
      <p class="mb-4 text-white">
        Please approve your design.
        Digitalpress will not assume responsibility in case of errors found in printed materials that were not bought to
        our attention during the proofing stage. Please check our
        <a class="dp-secondary text-underline" target="_blank"
          href="https://frontend.digitalpress.co.uk/design-%26-proofing">design &
          proofing guidelines</a>.
      </p>
      <p class="text-center text-white text-uppercase">
      </p>
      <div>
        <img :src="artworkData ? artworkData.attachments : ''" class="w-100" alt="" />
        <div class="mb-3">
          <label for="comment" class="form-label">Have a message?</label>
          <textarea class="form-control" placeholder="Please add a message" id="comment" rows="3"
            v-model="data.comment"></textarea>
        </div>
        <button v-if="!action" type="button" class="w-100 btn dp-bg-secondary mb-3 text-uppercase text-white"
          @click="sendApprove('accepted')">Approve</button>
        <button v-if="!action" type="button" class="w-100 btn dp-bg-primary mb-3 text-uppercase text-white"
          @click="sendApprove('rejected')">Reject</button>
      </div>
      <p class=" text-white"><small>I understand the approval terms and conditions, Late approval may affect your delivery
          deadline. Please approve the job within 30 minutes from receiving the proof email. Any changes will affect the
          delivery date.</small></p>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import { URL } from '@/api/global.env.js'
export default {
  layout: "mail",
  data() {
    return {
      URL: URL,
      action: false,
      id: null,
      orderId: null,
      artworkData: null,
      AUTH: null,
      data: {
        comment: '',
        status: '',
      }
    };
  },
  created() {
    const PATH_ID = this.$route.params.id.split("-");
    this.id = PATH_ID[1]
    this.AUTH = this.$route.query.token
  },
  mounted() { this.getArtwork() },
  methods: {
    getArtwork() {
      axios.get(`${URL}/api/order/artwork-proofing/${this.id}/`, {
        headers: {
          Authorization: `Bearer ${this.AUTH}`
        }
      })
        .then((response) => {
          this.artworkData = response.data;
          if (this.artworkData.status !== 'received') {
            this.action = true;
          }
        })
        .catch(error => {
          console.error('Error:', error);
          this.action = true;
          // Handle the error here, e.g., show an error message to the user.
        });
    },
    sendApprove(STATUS) {
      let data = {
        comment: this.data.comment,
        status: STATUS
      }

      this.$store
        .getters.client
        .patch(`/order/artwork-proofing/${this.id}/`, data, {
          headers: {
            Authorization: `Bearer ${this.AUTH}`
          }
        })
        .then(() => {
          this.action = true;
          this.getArtwork();
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }

  },
};
</script>

<style scoped>
.email-container {
  width: 90%;
  max-width: 600px;
  margin: auto;
}
</style>
