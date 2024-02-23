<template>
  <div class="pink_banner1" :class="shuffledArray ? shuffledArray[0].bgClass : ''">
      <div class="container">
        <div class="pink_banner_area">
          <div class="row align-items-center">
            <div class="col-xl-6 col-lg-8 col-md-8 col-sm-8 col-12">
              <div class="left_area py-3">
                <h3>
                  Why not explore our unique <br />
                  <span v-if="shuffledArray">{{shuffledArray[0].category}}?</span>
                </h3>
                <p>Excellent product to get your brand message out.</p>
                <div class="btn_secondary">
                  <Nuxt-link :to="shuffledArray?shuffledArray[0].path: ''">Shop Now</Nuxt-link>
                </div>
              </div>
            </div>
            <div class="col-xl-6 col-lg-4 col-md-4 col-sm-4 col-12">
              <div class="img_area text-sm-right" v-if="shuffledArray">
                <img :src="shuffledArray[0].image" alt="Banner image" width="188" height="270" style="height: 270px; width: auto;"/>
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
      bannerContent: [
        {category: 'Leaflets and Flyers Range', path:'/c/flyers-and-leaflets', bgClass:'dp-bg-secondary', image: require(`/assets/images/man-jump.png`)},
        {category: 'Brochure & Booklets', path:'/c/brochure-and-booklets', bgClass:'dp-bg-primary', image: require(`/assets/images/footer-banner/image2.png`)},
        {category: 'Rigid Board Printing', path:'/c/signage', bgClass:'dp-bg-secondary', image: require(`/assets/images/footer-banner/image3.png`)},
        {category: 'Boxes and Packaging', path:'/c/boxes-and-packaging', bgClass:'dp-bg-primary', image: require(`/assets/images/footer-banner/image4.png`)}
      ],
      shuffledArray: []
    }
  },
  async created(){
    await this.shuffleArray();
  },
  mounted(){
    window.setInterval(()=>{
      this.pollcontent();
    }, 15000);
  },
  methods: {
    shuffleArray() {
      this.shuffledArray = [...this.bannerContent];
      for (let i = this.shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.shuffledArray[i], this.shuffledArray[j]] = [this.shuffledArray[j], this.shuffledArray[i]];
      }
    },
    pollcontent(){
      const first = this.shuffledArray.shift();
      this.shuffledArray = this.shuffledArray.concat(first);
    },
  }
}
</script>

<style>

</style>