<template>
  <div>
    <header-bar></header-bar>
    <menu-bar class="d-none d-md-block"></menu-bar>
    <section class="pagetitle">
      <div class="title">
        <h1>DIGITAL PRESS CATEGORIES</h1>
      </div>
    </section>
    <!-- <pre>{{ category }}</pre> -->
    <section class="partners-section py-4">
      <div class="container py-3 py-sm-5">
        <div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4" v-if="category">
          <div class="col cat-card pointer mb-4" v-for="item in category" :key="item.id"
            @click="redirectToCategory(item.slug)">
            <img loading="lazy" v-if="item.category_image"
              :src="`${MEDIA_URL + '/' +item.category_image}`" :alt="item.name"
              class="w-100 rounded" />
            <div class="dp-card-heading text-center mt-3">{{ item.name }}</div>
            <p class="text-center text-muted">{{ item.header_description }}</p>
          </div>
        </div>
        <div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4" v-if="!category">
          <div class="col mb-4" v-for="i in 8" :key="i">
            <skeleton-loader width="100%" aspectRatio="305/253" dpClass="rounded"/>
            <skeleton-loader width="100%" height="21px" dpClass="mt-3"/>
            <skeleton-loader width="100%" height="19px" dpClass="mt-1"/>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { MEDIA_URL } from "@/api/urls";
import HeaderBar from '../components/layout/HeaderBar.vue';
import MenuBar from '../components/layout/MenuBar.vue';
import SkeletonLoader from '../components/widgets/SkeletonLoader.vue';
export default {
  middleware: 'scrollToTopMiddleware',
  components: { HeaderBar, MenuBar, SkeletonLoader },
  data(){
    return{
      MEDIA_URL:MEDIA_URL,
    }
  },
  computed: {
    ...mapGetters('category', ['category'])
  },
  // async mounted() {
  //   if (this.category === null) {
  //     this.fetchCategories()
  //   }
  // },
  methods: {
    ...mapActions('category', ['fetchCategories']),
    redirectToCategory(category) {
      this.$router.push(`/c/${category}`);
    },
  }
}
</script>

<style></style>