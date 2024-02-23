<template>
  <div class="category-page">
    <header-bar></header-bar>
    <menu-bar class="d-none d-md-block"></menu-bar>
    <div :style="{ 
      aspectRatio: mobileScreen ? '625/347' : '16/3', 
      backgroundImage: mobileScreen ? `url(${MEDIA_URL + '/' + mainCategory.category_mobile_banner})`:`url(${categoryImage})`,
      }" style="background-size: cover;" :class="mainCategory.category_mobile_banner || categoryImage ?'':'bg-light'">
    </div>
    <div class="products_section pb-5 pt-4">
      <b-container>
        <div class="section_title pb-0">
            <SkeletonLoader v-if="!mainCategory.name" dpClass="mx-auto mb-4" width="50%" height="84px"></SkeletonLoader>
          <h1 class="text-center category-heading text-uppercase py-4" v-else>
            Explore our {{ mainCategory.name }}
          </h1>
        </div>
        <div class="mb-5" v-if="!mainCategory.description">
          <SkeletonLoader dpClass="w-100 mb-2" height="18px"></SkeletonLoader>
          <SkeletonLoader dpClass="w-100 mb-2" height="18px"></SkeletonLoader>
          <SkeletonLoader dpClass="w-50 mb-2" height="18px"></SkeletonLoader>
        </div>
        <div class="category-description-text" v-else>
          <span v-if="mainCategory.description.length > 400 && !longDesc"
            v-html="mainCategory.description.substring(0, 400)"></span>
          <span v-else v-html="mainCategory.description"></span>
          <span v-if="mainCategory.description.length > 400 && !longDesc">... <small class="pointer dp-primary"
              @click="longDesc = true">Read more</small></span>
          <span v-if="mainCategory.description.length > 400 && longDesc"><small class="pointer dp-primary"
              @click="longDesc = false">Read Less</small></span>
        </div>

        <div class="products_area mt-4" id="productArea">
          <div class="row" v-if="!mainCategory.product_data && !mainCategory.children">
            <div class="col-lg-3 col-md-4 col-6 mb-3" v-for="i in 8" :key="i">
              <SkeletonLoader dpClass="mb-2" borderRadius="4px" aspectRatio="305/204"></SkeletonLoader>
              <SkeletonLoader dpClass="mb-2" borderRadius="4px" height="26px"></SkeletonLoader>
              <div class="d-flex g-3">
                <SkeletonLoader dpClass="mb-2" borderRadius="4px" height="20px"></SkeletonLoader>
                <SkeletonLoader dpClass="mb-2" borderRadius="4px" width="75%" height="20px"></SkeletonLoader>
              </div>
              <div class="d-flex gap-3">
                <SkeletonLoader dpClass="mb-2 me-2" borderRadius="50%" width="20px" height="20px"></SkeletonLoader>
                <SkeletonLoader dpClass="mb-2" borderRadius="4px" width="75%" height="20px"></SkeletonLoader>
              </div>
              <div class="d-flex gap-3">
                <SkeletonLoader dpClass="mb-2 me-2" borderRadius="50%" width="20px" height="20px"></SkeletonLoader>
                <SkeletonLoader dpClass="mb-2" borderRadius="4px" width="75%" height="20px"></SkeletonLoader>
              </div>
              <div class="d-flex gap-3">
                <SkeletonLoader dpClass="mb-2 me-2" borderRadius="50%" width="20px" height="20px"></SkeletonLoader>
                <SkeletonLoader dpClass="mb-2" borderRadius="4px" width="75%" height="20px"></SkeletonLoader>
              </div>
            </div>
          </div>
          <div v-if="mainCategory.product_data || mainCategory.children">
            <div class="row">
              <template>
                <div class="col-lg-3 col-md-4 col-6 position-relative" v-for="(item, index) in mainCategory.children"
                  :key="index" @click="redirectToCategory(item)">
                  <div class="product_item mb-4">
                    <div class="img_area mb-0">
                      <a 
                      href="javascript:void(0)" 
                      class="d-block rounded" 
                      :class="item.category_image?'':'bg-light'"
                      style="aspect-ratio: 305/171;" >
                        <img :src="`${MEDIA_URL + '/' + item.category_image}`" :alt="item.name"
                          class="img-fluid d-block mx-auto embed-responsive-item rounded" />
                      </a>
                      <h6 class="item_price" v-show="item.lowest_price">
                        From &#163;{{ item.lowest_price ? Number(item.lowest_price).toFixed(2) : 0.00 }}
                      </h6>
                    </div>
                    <div class="info_area">
                      <h5 class="dp-card-heading dp-primary my-2" >
                        <a>{{ item.name }}</a>
                      </h5>
                      <div class="text-dark" v-html="item.header_text"></div>
                    </div>
                    <div class="btn_area">
                      <a class="rounded">Explore More</a>
                    </div>
                  </div>
                </div>
              </template>
              <template>
                <div class="col-xl-3 col-lg-3 col-md-4 col-6 position-relative" v-for="(item, index) in productData"
                  :key="index" @click="redirectToProduct(item)">
                  <div class="product_item mb-4">
                    <div class="img_area mb-0">
                      <a href="javascript:void(0)"
                      :class="item.thumbnail.medium_image || item.thumbnail.small_image ?'':'bg-light'"
                      style="aspect-ratio: 305/171;" >
                        <picture>
                          <source media="(max-width:465px)" :srcset="item.thumbnail.small_image">
                          <img :src="item.thumbnail.medium_image" :alt="item.name"
                            class="img-fluid d-block mx-auto embed-responsive-item rounded">
                        </picture>
                        <!-- <SkeletonLoader v-else dpClass="mb-2" borderRadius="4px" aspectRatio="305/204"></SkeletonLoader> -->
                      </a>
                      <h6 class="item_price" v-show="item.lowest_price">
                        From &#163;{{ item.lowest_price ? Number(item.lowest_price).toFixed(2) : 0.00 }}
                      </h6>
                    </div>
                    <div class="info_area">
                      <h5 class="dp-card-heading dp-primary my-2">
                        <a>{{ item.name }}</a>
                      </h5>
                      <div class="text-dark" v-html="item.short_description"></div>
                    </div>
                    <div class="btn_area">
                      <a class="rounded">Order Now</a>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>

          <div class="cms_area mb-4" v-if="!mainCategory.product_data && !mainCategory.children && !loading">
            Sorry! Couldn't find the product you were looking For!!!
          </div>
        </div>
      </b-container>
    </div>
    <footer-banner></footer-banner>
  </div>
</template>
  
<script>
import { MEDIA_URL } from "@/api/urls"
import MenuBar from '../../components/layout/MenuBar.vue';
import HeaderBar from '../../components/layout/HeaderBar.vue';
import * as Constants from "../../utils/const";
import FooterBanner from '../../components/FooterBanner.vue';
import SkeletonLoader from '../../components/widgets/SkeletonLoader.vue';
export default {
  middleware: 'scrollToTopMiddleware',
  head() {
    return {
      title: this.mainCategory.page_title,
      meta: [
        { name: "description", content: this.mainCategory.engine_description },
      ],
      link: [
        {
          rel: 'canonical',
          href: process.env.BACKEND_URL + this.$route.path
        }
      ]
    }
  },
  components: { MenuBar, FooterBanner, HeaderBar, SkeletonLoader },
  data() {
    return {
      MEDIA_URL: MEDIA_URL,
      id: null,
      Constants: Constants,
      productslist: [],
      mainCategory: {},
      longDesc: false,
      mainCategoryDesc: null,
      currentPage: 1,
      totalPages: null,
      totalCount: null,
      isCallApi: false,
      loading: false,
      categoryImage: "",
      productData: null,
      mobileScreen: false,
    };
  },
  created() {
    if (process.client) {
      window.addEventListener("resize", this.checkScreen);
    }
    this.checkScreen();
  },
  computed: {
    selectedItemId() {
      return this.$store.state.selectedItemId;
    }
  },
  mounted() {
    this.loading = true
    this.$store.getters.client
      .get(`categories/tree/${this.$route.params.id}/`)
      .then((response) => {
        this.categoryImage = this.MEDIA_URL + '/' + response.data.results.header_image;
        this.mainCategory = response.data.results;
        const PRODUCTS = this.mainCategory.product_data
        if (PRODUCTS.length > 0) {
          this.productData = PRODUCTS.map(product => {
            return {
              ...product,
              thumbnail: product.product_images[0]
            }
          })
        }
        this.productData.sort((a, b) => a.display_order - b.display_order)
        this.loading = false
      }).catch(() => { this.loading = false });
  },
  methods: {
    checkScreen() {
      if (process.client) {
        this.windowWidth = window.innerWidth;
        if (this.windowWidth <= 750) {
          this.mobileScreen = true;
          return;
        }
        this.mobileScreen = false;
        return;
      }
    },
    redirectToProduct(item) {
      this.$router.push(`/p/${item.slug}`)
    },
    redirectToCategory(item) {
      this.$router.push(`/c/${item.slug}`);
    },
  }
};
</script>
  
<style scoped>
.category-page .category-description-text span>>>p {
  display: inline;
}

.catg_page_banner {
  background-image: none !important;
}

.catg_page_banner .img-bg {
  min-height: 150px;
  background: #eee;
}

.info_area {
  margin-bottom: 68px;
}

.btn_area {
  position: absolute;
  bottom: 1.5rem;
  left: 15px;
  width: calc(100% - 30px);
}

.products_section .products_area .product_item .img_area a img {
  -o-object-fit: unset !important;
  object-fit: unset !important;
  width: 100%;
  height: auto;
}
</style>
  