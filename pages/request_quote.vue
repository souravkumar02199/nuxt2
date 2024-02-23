<template>
  <div>
    <!-- <Loadingbar v-show="loading"/> -->
    <header-bar></header-bar>
    <menu-bar class="d-none d-md-block"></menu-bar>
    <div class="cart_page_section myaccount_page dashboard_page py-5 bg-white">
      <div class="container">
        <div class="cart_page_area">
          <div class="quotepage_title mb-5 pb-3">
            <div class="row">
              <div class="col-12 text-center">
                <h2>Are you looking for something new?</h2>
                <h5>
                  Give us a chance to quote and let us help you to make an
                  impression.
                </h5>
              </div>
            </div>
          </div>
          <div class="row justify-content-between">
            <div class="col-xl-6 col-md-6 col-sm-12 col-12">
              <RequestQoteForm/>
            </div>
            <div class="col-xl-5 col-md-6 col-sm-12 col-12">
              <CategoryBanner :dots="true"/>
            </div>
          </div>
        </div>
      </div>
    </div>

    <footer-banner></footer-banner>
  </div>
</template>

<script>
import CategoryBanner from '../components/CategoryBanner.vue';
import FooterBanner from '../components/FooterBanner.vue';
import HeaderBar from "../components/layout/HeaderBar.vue";
import MenuBar from "../components/layout/MenuBar.vue";
import breadcrumbsVue from "../components/widgets/breadcrumbs.vue";
import RequestQoteForm from '../components/RequestQoteForm.vue';

export default {
  name: "Reques-quote",
  middleware: 'scrollToTopMiddleware',
  components: {
    breadcrumbsVue,
    MenuBar,
    HeaderBar,
    FooterBanner,
    CategoryBanner,
    RequestQoteForm
  },
};
</script>
