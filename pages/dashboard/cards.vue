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
            <h3>Saved Cards</h3>
          </div>
          <div class="myaccount_box_content">
            <div class="row">
              <div class="
                  mycards_items
                  col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12
                ">
                <!-- <div class="mycards_item d-flex justify-content-between">
                  <h6>Visa XXXX XXXX XXXX 8016 - Expires 6/2026</h6>
                  <button class="btn">
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </div>
                <div class="mycards_item d-flex justify-content-between">
                  <h6>Visa XXXX XXXX XXXX 8016 - Expires 6/2026</h6>
                  <button class="btn">
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </div>
                <div class="mycards_item d-flex justify-content-between">
                  <h6>Visa XXXX XXXX XXXX 8016 - Expires 6/2026</h6>
                  <button class="btn">
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cards: []
    }
  },
  mounted() {
    this.getCardList()
  },
  methods: {
    async getCardList() {
      await this.$store.getters.userClient
        .post(`/user/saved-cards`)
    },
  }
}
</script>