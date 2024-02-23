<template>
  <carousel :items="1" :margin="0" :loop="true" :autoplay="false" :dots="dots" :nav="false" :autoplayTimeout="9000"
    :autoplaySpeed="600">
    <div class="slide_item position-relative" @click="redirectToCategory('/c/boxes-and-packaging')">
      <img width="485" height="693" class="w-100 h-auto" src="https://digitalpress-prod.s3.eu-west-2.amazonaws.com/static/category-banner/1sm.webp" alt="Boxes and Packaging" />
      <div class="banner-middle-content mobile position-absolute">
        <b-row class="container flex-column">
          <b-col></b-col>
          <b-col class="rounded py-3">
            <h4 class="text-uppercase">Boxes and Packaging</h4>
            <p class="my-2">
              We leave no stone unturned when it comes to product safety. Count on
              our durable, functional, and bespoke packing solutions to act like a cocoon
              for your merchandise.
            </p>
            <b-button variant="light" pill>Explore More</b-button>
          </b-col>
        </b-row>
      </div>
    </div>
    <div class="slide_item position-relative" @click="redirectToCategory('/c/outdoor-displays')">
      <img width="485" height="693" class="w-100 h-auto" src="https://digitalpress-prod.s3.eu-west-2.amazonaws.com/static/category-banner/2sm.webp" alt=" Outdoor Display" />
      <div class="banner-middle-content mobile position-absolute ">
        <b-row class="container flex-column">
          <b-col></b-col>
          <b-col class="rounded py-3">
            <h4 class="text-uppercase">Outdoor displays</h4>
            <p class="my-2">
              First impression is the last impression; explore our wide range of
              tailored stunning prints in al fresco signage to kick-start a profitable trade
              with your clients.
            </p>
            <b-button variant="light" pill>Explore More</b-button>
          </b-col>
        </b-row>
      </div>
    </div>
    <div class="slide_item position-relative" @click="redirectToCategory('/c/promotional-flags')">
      <img width="485" height="693" class="w-100 h-auto" src="https://digitalpress-prod.s3.eu-west-2.amazonaws.com/static/category-banner/3sm.webp" alt="Flag Collection" />
      <div class="banner-middle-content mobile position-absolute">
        <b-row class="container flex-column">
          <b-col></b-col>
          <b-col class="rounded py-3">
            <h4 class="text-uppercase">Promotional Flag Collection</h4>
            <p class="my-2">
              Count on our professionally printed quality flags to make your customers
              want to come back for more. With our custom-made flags, let your business
              soar high and reach the skies.
            </p>
            <b-button variant="light" pill>Explore More</b-button>
          </b-col>
        </b-row>
      </div>
    </div>
    <div class="slide_item position-relative" @click="redirectToCategory('/c/wedding-stationery')">
      <img width="485" height="693" class="w-100 h-auto" src="https://digitalpress-prod.s3.eu-west-2.amazonaws.com/static/category-banner/4sm.webp" alt="Wedding Banner" />
      <div class="banner-middle-content mobile position-absolute">
        <b-row class="container flex-column">
          <b-col class="rounded py-3">
            <h4 class="text-uppercase">The wedding Collection</h4>
            <p class="my-2">
              Your big day matters to us; let us rock it together with our
              personalised designer wedding prints as company to your celebratory
              ambience. Hallelujah!
            </p>
            <b-button variant="light" pill>Explore More</b-button>
          </b-col>
        </b-row>
      </div>
    </div>
  </carousel>
</template>
<script>
export default {
  props: {
    dots: false
  },
  methods: {
    redirectToCategory(category) {
      this.$router.push(category);
    },
  }
}
</script>

<style scoped>
</style>