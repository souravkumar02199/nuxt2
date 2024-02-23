<template>
  <div>
    <div class="position-relative ms-auto search-container d-none d-md-block" v-click-outside="handleClickOutside"
      :class="[focus === true ? 'w-100' : 'w-50']">
      <input @focus="focus = true" @input="fetchData" v-model="search" class="search-input form-control"
        placeholder="Search DigitalPress.co.uk" />
      <img height="20" width="20" src="~/assets/images/header/magnifying-glass.png" alt="search" />
      <div class="search-result" v-if="search.length > 0">
        <b-row class="scroll">
          <b-col cols="12" class="border-right col-md" v-if="categoryList.length > 0">
            <small class="text-muted">Categories</small>
            <div v-for="(item, index) in categoryList" :key="index" class="mx-0 mt-3">
              <Nuxt-link :to="`/c/${item.slug}`" class="row">
                <div class="pt-1 col-3">
                  <img :src="item.category_image ? MEDIA_URL + '/' + item.category_image : ''" width="100" height="100"
                    alt="product image" class="h-auto rounded" />
                </div>
                <div class="col-9">
                  <div class="dp-card-heading">
                    <small><b>{{ item.name }}</b></small>
                  </div>
                  <div class="desc" v-if="item.description" v-html="item.description"></div>
                </div>
              </Nuxt-link>
            </div>
          </b-col>
          <b-col cols="12" class="col-md" v-if="productList.length > 0">
            <small class="text-muted">Products</small>
            <b-row class="me-0 mt-3 position-relative">
              <b-col>
                <div v-for="(item, index) in productList" :key="index" @mouseover="getImage(item)"
                  class="my-1 product-list-item">
                  <Nuxt-link :to="`/p/${item.slug}`">{{ item.name }}</Nuxt-link>
                </div>
              </b-col>
              <div v-if="productImage" class="col-3">
                <img :src="productImage" alt="product image" width="120" height="120" class="sticky rounded h-auto" />
              </div>
            </b-row>
          </b-col>
        </b-row>
      </div>
    </div>
    <div class="position-relative ms-auto search-container d-md-none">
      <input @input="fetchData" v-model="search" class="search-input form-control"
        placeholder="Search DigitalPress.co.uk" />
      <img loading="lazy" width="20" height="20" src="~/assets/images/header/magnifying-glass.png" alt="search" />
      <div class="search-result" v-if="search.length > 0" v-click-outside="handleClickOutside">
        <b-row class="scroll">
          <b-col cols="12" class="border-right col-md" v-if="categoryList">
            <small class="text-muted">Categories</small>
            <div>
              <b-row v-for="(item, index) in categoryList" :key="index" class="mx-0 mt-3">
                <Nuxt-link :to="`/c/${item.slug}`" class="d-flex">
                  <div>
                    <img :src="item.category_image ? MEDIA_URL + '/' + item.category_image : ''" alt="category" width="100"
                      height="50" class="h-auto" />
                  </div>
                  <b-col>
                    <div class="dp-card-heading">
                      <small><b>{{ item.name }}</b></small>
                    </div>
                    <div class="desc" v-if="item.description" v-html="item.description"></div>
                  </b-col>
                </Nuxt-link>
              </b-row>
            </div>
          </b-col>
          <b-col cols="12" class="col-md" v-if="productList">
            <small class="text-muted">Products</small>
            <b-row class="me-0 mt-3 position-relative">
              <b-col>
                <div v-for="(item, index) in productList" :key="index" @mouseover="getImage(item)" class="my-1">
                  <Nuxt-link :to="`/p/${item.slug}`">{{ item.name }}</Nuxt-link>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </div>
    </div>
  </div>
</template>
<script>
import { MEDIA_URL } from "@/api/urls"
export default {
  data() {
    return {
      loading: false,
      MEDIA_URL: MEDIA_URL,
      focus: false,
      search: "",
      categoryList: [],
      productList: [],
      productImage: null,
      controller: null,
    };
  },

  methods: {
    handleClickOutside(event) {
      this.search = ''
      this.focus = false;
    },
    async fetchData() {
      if (this.search !== "") {
        if (this.controller) {
          this.controller.abort();
        }
        this.controller = new AbortController();  // Create a new controller for the current request
        const signal = this.controller.signal;
        try {
          this.loading = true;
          this.focus = true;
          const response = await this.$store.getters.client.get(`/home-search/?search=${this.search}`, {signal})
          this.productList = response.data.products;
          this.categoryList = response.data.category;
          this.productImage = this.productList[0].product_images[0].small_image
        } catch (error) {
          console.error(error)
        } finally {
          this.loading = false
        }
      }
    },

    getImage(item) {
      this.productImage = item.product_images ? item.product_images[0].small_image : '';
    },
  },
};
</script>
<style>
.search-result {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: #fff;
  border-radius: 1rem;
  padding: 0.75rem 1rem;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  line-height: 1rem;
}

.search-result .scroll {
  max-height: 400px;
  overflow: auto;
}

.search-result .scroll::-webkit-scrollbar {
  width: 3px;
}

/* Track */
.search-result .scroll::-webkit-scrollbar-track {
  background: rgba(225, 63, 110, 0.1);
  border-radius: 3px;
}

/* Handle */
.search-result .scroll::-webkit-scrollbar-thumb {
  background: rgba(225, 63, 110, 0.3);
  border-radius: 10px;
}

/* Handle on hover */
.search-result .scroll::-webkit-scrollbar-thumb:hover {
  background: #b30000;
}

.search-result .sticky {
  position: sticky;
  top: 0;
}

.search-result .desc {
  width: 100%;
  /* font-size: 12.8px !important; */
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.search-input {
  border-radius: 2rem;
  border: 1px solid transparent;
  outline: none;
  font-size: 0.8rem;
  font-weight: 400;
  color: #151515;
  padding-left: 3rem;
}

.search-container {
  transition: all 0.5s ease;
}

.search-input+img {
  position: absolute;
  top: 50%;
  left: 12px;
  transform: translateY(-50%);
}

.product-list-item:hover {
  background-color: #f1f1f1;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  border-radius: 12px;
}</style>
