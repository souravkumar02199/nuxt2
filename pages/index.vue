<template>
  <div>
    <HeaderBar />
    <menu-bar class="d-none d-md-block"></menu-bar>

    <div class="home_banner_slider" v-if="!mobileView && hero_banners">
      <carousel :items="1" :margin="0" :loop="true" :autoplay="true" :dots="true" :nav="false" :autoplayTimeout="10000"
        :autoplaySpeed="600">
        <div class="slide_item" v-for="(hero_banner, index) in hero_banners" :key="index">
          <template v-if="hero_banner.endsWith('.webm')">
            <div class="slide_item" :class="`slideritem${index}`">
              <video autoplay loop muted class="w-100" preload="none" style="aspect-ratio: 24 / 5">
                <source :src="hero_banner" fetchpriority="high" type="video/webm" />
              </video>
            </div>
          </template>

          <template v-else>
            <div class="slide_item slideritem1">
              <div :style="{
                aspectRatio:'24/5',
                backgroundImage:`url(${hero_banner})`,
              }" style="background-size: cover;" :class="hero_banner ? '' : 'bg-light'">
              </div>
              <div class="upper_slider" v-if="hero_banner === `${MEDIA_URL}/static/slide-2.jpg.webp`">
                <h2>
                  We save you serious
                  <vue-typer class="typewrite" :text="['Time', 'Money', 'Stress']" :repeat="Infinity" :shuffle="false"
                    initial-action="typing" :pre-type-delay="70" :type-delay="100" :pre-erase-delay="1500"
                    :erase-delay="100" erase-style="backspace" :erase-on-complete="false" caret-animation="solid">
                  </vue-typer>
                </h2>
                <h4>Help From Our Experts</h4>
                <a href="#" role="button" class="white_btn">Contact Now</a>
              </div>
            </div>
          </template>
        </div>
      </carousel>
    </div>
    <!-- <skeleton-loader v-if="!mobileView && !hero_banners" aspectRatio="24/5" width="100%" height="auto" /> -->

    <div v-if="mobileView && mobile_banner">
      <carousel :items="1" :margin="0" :loop="true" :autoplay="true" :dots="false" :nav="false" :autoplayTimeout="9000"
        :autoplaySpeed="600">
        <div class="slide_item" :class="`slideritem${index}`" v-for="(hero_banner, index) in mobile_banner" :key="index">
          <img :src="hero_banner" alt="Banner" width="1250" height="694" class="w-100 h-auto" />
        </div>
      </carousel>
    </div>
    <skeleton-loader v-if="mobileView && !mobile_banner" aspectRatio="625/347" width="100%" />

    <section class="bg-light" style="margin-top: -6px;" v-if="partners_logo">
      <b-container class="py-3">
        <carousel :items="8" :margin="80" :loop="true" :autoplay="true" :dots="false" :nav="false" :autoplayTimeout="9000"
          :autoplaySpeed="600" :responsive="{
            0: { items: 3 },
            480: { items: 4 },
            768: { items: 6 },
            1024: { items: 8 },
          }">
          <div class="slide_item" :class="`slideritem${index}`" v-for="(logo, index) in partners_logo" :key="index">
            <img :src="logo" height="50" width="94" alt="Partner-Logo" class="w-100 h-auto" />
          </div>
        </carousel>
      </b-container>
    </section>
    <skeleton-loader v-if="!partners_logo" width="100%" height="82px" />

    <div class="brands_section">
      <div class="brands_tagline">
        <div class="container">
          <h6>We work with these well known brands… why not join them?</h6>
        </div>
      </div>
    </div>

    <section class="partners-section">
      <div class="container py-3 py-sm-5">
        <h1 class="dp-heading pb-3 pb-sm-5 text-center">
          Printing is a big Yesss, with Digitalpress
        </h1>
        <div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4" v-if="home_category">
          <div class="col cat-card pointer mb-4" v-for="item in home_category" :key="item.id"
            @click="redirectToCategory(item.slug)">
            <img loading="lazy" width="305" height="253" v-if="item.category_medium_image"
              :src="`${MEDIA_URL}/${item.category_medium_image}`" alt="Image" class="w-100 rounded h-auto" />
            <div class="dp-card-heading text-center mt-3">{{ item.name }}</div>
            <p class="text-center text-muted">{{ item.header_description }}</p>
          </div>
        </div>
        <div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4" v-if="!home_category">
          <div class="col mb-4" v-for="i in 8" :key="i">
            <skeleton-loader width="100%" aspectRatio="305/253" dpClass="rounded" />
            <skeleton-loader width="100%" height="21px" dpClass="mt-3" />
            <skeleton-loader width="100%" height="19px" dpClass="mt-1" />
          </div>
        </div>
      </div>
    </section>

    <section class="home_banner_slider" v-if="!mobileView">
      <carousel :items="1" :margin="0" :loop="true" :autoplay="true" :dots="false" :nav="false" :autoplayTimeout="9000"
        :autoplaySpeed="600">
        <div class="slide_item position-relative"  @click="redirectToCategory('boxes-and-packaging')">
          <img loading="lazy" width="1920" height="350" class="w-100 h-auto"
            src="https://digitalpress-prod.s3.eu-west-2.amazonaws.com/static/category-banner/1.webp" alt="Image" />
          <div class="banner-middle-content">
            <b-row class="container">
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
        <div class="slide_item position-relative" @click="redirectToCategory('outdoor-displays')">
          <img loading="lazy" width="1920" height="350" class="w-100 h-auto"
            src="https://digitalpress-prod.s3.eu-west-2.amazonaws.com/static/category-banner/2.webp" alt="Image" />
          <div class="banner-middle-content">
            <b-row class="container">
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
        <div class="slide_item position-relative" @click="redirectToCategory('promotional-flags')">
          <img loading="lazy" width="1920" height="350" class="w-100 h-auto"
            src="https://digitalpress-prod.s3.eu-west-2.amazonaws.com/static/category-banner/3.webp" alt="Image" />
          <div class="banner-middle-content">
            <b-row class="container">
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
        <div class="slide_item position-relative" @click="redirectToCategory('wedding-stationery')">
          <img loading="lazy" width="1920" height="350" class="w-100 h-auto"
            src="https://digitalpress-prod.s3.eu-west-2.amazonaws.com/static/category-banner/4.webp" alt="Image" />
          <div class="banner-middle-content">
            <b-row class="container">
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
    </section>

    <section class="home_banner_slider d-md-none" v-if="mobileView">
      <CategoryBanner :dots="false" />
    </section>

    <section class="bg-white">
      <div class="container py-3 py-sm-5">
        <h2 class="dp-heading text-center mb-3">
          Why Choose Digital Press
        </h2>
        <b-row>
          <b-col cols="6" md="3" class="cat-card mt-3">
            <div class="d-flex justify-content-center height-70px">
              <div class="img-section d-inline-block position-relative">
                <img loading="lazy" width="1920" height="350" src="~/assets/images/spessality/certificate.png" alt="Image"
                  class="m-auto w-100 h-auto" />
                <span class="bg_secondary" style="left: -12px; top: -5px"></span>
              </div>
            </div>
            <p class="text-center my-3 ">
              With 20+ years of Industry Experience
            </p>
          </b-col>
          <b-col cols="6" md="3" class="cat-card mt-3">
            <div class="d-flex justify-content-center height-70px">
              <div class="img-section d-inline-block position-relative">
                <img loading="lazy" width="1920" height="350" src="~/assets/images/spessality/rating.png" alt="Image"
                  class="w-100 h-auto m-auto" />
                <span class="bg_primary" style="top: 20%; left: 10%"></span>
              </div>
            </div>
            <p class="text-center my-3 ">
              We provide really quick turn around
            </p>
          </b-col>
          <b-col cols="6" md="3" class="cat-card mt-3">
            <div class="d-flex justify-content-center height-70px">
              <div class="img-section d-inline-block position-relative">
                <img loading="lazy" width="1920" height="350" src="~/assets/images/spessality/union-jack.png" alt="Image"
                  class="m-auto w-100 h-auto" />
                <span class="bg_secondary" style="left: 10%; top: 0"></span>
              </div>
            </div>
            <p class="text-center my-3 ">
              95% of our products are UK manufactured
            </p>
          </b-col>
          <b-col cols="6" md="3" class="cat-card mt-3">
            <div class="d-flex justify-content-center height-70px">
              <div class="img-section d-inline-block position-relative">
                <img loading="lazy" width="1920" height="350" src="~/assets/images/spessality/reward.png" alt="Image"
                  class="m-auto w-100 h-auto" />
                <span class="bg_secondary" style="right: 0; bottom: 0"></span>
              </div>
            </div>
            <p class="text-center my-3 ">
              Providing rewards to our customers
            </p>
          </b-col>
          <b-col cols="6" md="3" class="cat-card mt-3">
            <div class="d-flex justify-content-center height-70px">
              <div class="img-section d-inline-block position-relative">
                <img loading="lazy" width="1920" height="350" src="~/assets/images/spessality/handshake.png" alt="Image"
                  class="m-auto w-100 h-auto" />
                <span class="bg_primary" style="right: 0; top: 0"></span>
              </div>
            </div>
            <p class="text-center my-3 ">
              White label packaging for your business
            </p>
          </b-col>
          <b-col cols="6" md="3" class="cat-card mt-3">
            <div class="d-flex justify-content-center height-70px">
              <div class="img-section d-inline-block position-relative">
                <img loading="lazy" width="1920" height="350" src="~/assets/images/spessality/discount.png" alt="Image"
                  class="m-auto w-100 h-auto" />
                <span class="bg_secondary" style="right: 0; bottom: 0"></span>
              </div>
            </div>
            <p class="text-center my-3 ">
              We offer the lowest price guarantee
            </p>
          </b-col>
          <b-col cols="6" md="3" class="cat-card mt-3">
            <div class="d-flex justify-content-center height-70px">
              <div class="img-section d-inline-block position-relative">
                <img loading="lazy" width="1920" height="350" src="~/assets/images/spessality/print.png" alt="Image"
                  class="m-auto w-100 h-auto" />
                <span class="bg_primary" style="left: -12px; top: -5px"></span>
              </div>
            </div>
            <p class="text-center my-3 ">
              We provide bespoke printing
            </p>
          </b-col>
          <b-col cols="6" md="3" class="cat-card mt-3">
            <div class="d-flex justify-content-center height-70px">
              <div class="img-section d-inline-block position-relative">
                <img loading="lazy" width="1920" height="350" src="~/assets/images/spessality/customer-service.png"
                  alt="Image" class="m-auto w-100 h-auto" />
                <span class="bg_primary" style="right: 0; bottom: 0"></span>
              </div>
            </div>
            <p class="text-center my-3 ">
              Dedicated account manager to handle your issues
            </p>
          </b-col>
        </b-row>
      </div>
    </section>

    <section class="bg-news-letter py-4 overflow-hidden">
      <div class="container py-3 py-md-5">
        <div class="d-flex flex-column flex-sm-row align-items-center justify-content-between">
          <div class="col-12 col-sm-6 text-center text-sm-startmb-4 mb-sm-0">
            <h2 class="mb-3 text-white">Sign up for our Newsletter</h2>
            <p class="text-white">
              and get a 10% discount on your first order!
            </p>
          </div>
          <div class="col-12 col-sm-6 text-end">
            <div class="w-100 w-sm-75 ms-auto email position-relative">
              <input type="text" :disabled="loading" class="w-100" placeholder="Your email address ..." v-model="email" />
              <img role="button" class="pointer" @click="sendEmail" width="24" height="21" loading="lazy"
                src="~/assets/images/all/send.png" alt="Image" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-5 px-4">
      <div class="container">
        <h2 class="dp-heading pb-3 pb-sm-5 text-center">Be Part of the Tribe</h2>
        <div class="quinn_cards" id="quinn-cards-1">
          <nuxt-link to="/request_quote">
            <div class="quinn_card">
              <video muted autoplay loop playsinline class="w-100">
                <source
                  src="https://digitalpress-prod.s3.eu-west-2.amazonaws.com/media/category_video/creative_design_dp.mp4"
                  type="video/mp4" />
              </video>
            </div>
          </nuxt-link>

          <nuxt-link to="/c/wedding-stationery">
            <div class="quinn_card">
              <video muted autoplay loop playsinline class="w-100">
                <source src="https://digitalpress-prod.s3.eu-west-2.amazonaws.com/media/category_video/Wedding_Statio.mp4"
                  type="video/mp4" />
              </video>
            </div>
          </nuxt-link>

          <nuxt-link to="/c/lightbox-displays">
            <div class="quinn_card">
              <video muted autoplay loop playsinline class="w-100">
                <source src="https://digitalpress-prod.s3.eu-west-2.amazonaws.com/media/category_video/lightbox_dp.mp4"
                  type="video/mp4" />
              </video>
            </div>
          </nuxt-link>

          <nuxt-link to="/c/promotional-flags">
            <div class="quinn_card">
              <video muted autoplay loop playsinline class="w-100">
                <source src="https://digitalpress-prod.s3.eu-west-2.amazonaws.com/media/category_video/flags_dp.mp4"
                  type="video/mp4" />
              </video>
            </div>
          </nuxt-link>

          <nuxt-link to="/c/flyers-and-leaflets">
            <div class="quinn_card">
              <video muted autoplay loop playsinline class="w-100">
                <source
                  src="https://digitalpress-prod.s3.eu-west-2.amazonaws.com/media/category_video/promotion_ad_dp.mp4"
                  type="video/mp4" />
              </video>
            </div>
          </nuxt-link>

          <nuxt-link to="/c/brochure-and-booklets">
            <div class="quinn_card">
              <video muted autoplay loop playsinline class="w-100">
                <source src="https://digitalpress-prod.s3.eu-west-2.amazonaws.com/media/category_video/best_books_dp.mp4"
                  type="video/mp4" />
              </video>
            </div>
          </nuxt-link>
        </div>
      </div>
    </section>

    <section class="bg-white" id="newsletter">
      <div class="col-12 col-md-10 col-lg-9 mx-auto pt-4 pb-5">
        <h2 class="dp-heading mb-3 text-center">
          let customers speak for us
        </h2>
        <UserReviews />
      </div>
    </section>

    <section style="background-color: #f1f1f1">
      <BlogList :homePage="true"></BlogList>
    </section>
  </div>
</template>

<script>
import { MEDIA_URL } from "../api/urls";
import MenuBar from "../components/layout/MenuBar.vue";
import HeaderBar from "../components/layout/HeaderBar.vue";
import CategoryBanner from "../components/CategoryBanner.vue";
import BlogList from "../components/blog/BlogList.vue";
import SkeletonLoader from '../components/widgets/SkeletonLoader.vue';
import UserReviews from '../components/widgets/UserReviews.vue';
import { mapGetters } from 'vuex';
export default {
  name: "Index",
  middleware: 'scrollToTopMiddleware',
  head() {
    return {
      title: 'Budget Friendly Online Printing Services UK | Superior Quality - Digital Press',
      meta: [
        { name: "description", content: 'Digitalpress is the most reliable online printing company in the UK, we offer competitive rates, superior quality, and  fast delivery across the UK for every order. Choose us as your online printing service for premium products at unbeatable prices. Discover more about our offerings today!' },
      ]
    }
  },
  data() {
    return {
      MEDIA_URL: MEDIA_URL,
      loading: false,
      email: '',
      mobileView: false,
    };
  },
  components: { MenuBar, HeaderBar, CategoryBanner, BlogList, SkeletonLoader, UserReviews, },
  computed: {
    ...mapGetters('category', ['home_category', 'partners_logo', 'mobile_banner', 'hero_banners'])
  },
  async mounted() {
    this.getReviewsList()

    const quinnCards = document.querySelector('.quinn_cards');
    let isGrabbing = false;
    let startX = 0;
    let scrollLeft = 0;

    quinnCards.addEventListener('mousedown', (e) => {
      isGrabbing = true;
      startX = e.pageX;
      scrollLeft = quinnCards.scrollLeft;
    });

    quinnCards.addEventListener('mouseup', () => {
      isGrabbing = false;
    });

    quinnCards.addEventListener('mousemove', (e) => {
      if (!isGrabbing) return;
      const x = e.pageX;
      const deltaX = x - startX;
      quinnCards.scrollLeft = scrollLeft - deltaX;
    });
  },

  created() {
    if (process.client) {
      window.addEventListener("resize", this.checkScreen);
    }
    this.checkScreen();
  },

  methods: {
    start() {
      this.loading = true;
    },

    finish() {
      this.loading = false;
    },
    checkScreen() {
      if (process.client) {
        this.windowWidth = window.innerWidth;
        if (this.windowWidth <= 768) {
          this.mobileView = true;
          return;
        }
        this.mobileView = false;
        return;
      }
    },
    redirectToCategory(item) {
      this.$router.push(`/c/${item}`);
    },
    async getReviewsList() {
      await this.$store.getters.client.get('/reviews').then((res) => {
        this.reviews = res.data.data
      })
    },
    async sendEmail() {
      if (this.email !== '') {
        this.start()
        try {
          const resp = await this.$store.getters.client.post('newsletter/', { email: this.email })
          if (resp.status === 201) {
            this.$toast.success("Successfully registered for Digital Press newsletter.");
          }
        } catch (error) {
          this.$toast.error("You are already registered with this email address.");
        }
        finally {
          this.email = '';
          this.finish();
        }
      }
    },
  },
};
</script>
