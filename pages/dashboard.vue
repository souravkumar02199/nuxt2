<template>
  <div>
    <header-bar></header-bar>
    <menu-bar class="d-none d-md-block"></menu-bar>
    <div class="cart_page_section myaccount_page dashboard_page py-5 bg-white">
      <div class="container">
        <div class="cart_title mb-4 d-flex justify-content-between align-items-center">
          <h3>My Account</h3>
          <a class="d-none d-md-block" href="#">Back To Shopping</a>
        </div>
        <div class="cart_page_area">
          <div class="row">
            <div class="col-xl-3 col-lg-4 col-md-4 col-sm-12 col-12">
              <div class="myaccount_sidebar">
                <div class="sidebarbox mb-4">
                  <ul class="myaccount_menus list-unstyled">
                    <li>
                      <NuxtLink  to="/dashboard/"><span>Dashboard</span></NuxtLink>
                    </li>
                    <li>
                      <NuxtLink to="/dashboard/orders"><span>My orders</span></NuxtLink>
                    </li>
                    <li>
                      <NuxtLink to="/dashboard/address"><span>Address Book</span></NuxtLink>
                    </li>
                    <li>
                      <NuxtLink to="/dashboard/artwork"><span>Artwork</span></NuxtLink>
                    </li>
                    <li>
                      <NuxtLink to="/dashboard/request_quote"><span>Request a Quote</span></NuxtLink>
                    </li>
                    <li>
                      <NuxtLink to="/dashboard/cards"><span>Saved Cards</span></NuxtLink>
                    </li>
                    <li>
                      <NuxtLink to="/dashboard/settings"><span>Settings</span></NuxtLink>
                    </li>
                    <li>
                      <a href="javascript:void(0)"><span>Logout</span></a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="col-xl-9 col-lg-8 col-md-8 col-sm-12 col-12">
              <NuxtChild />
            </div>
          </div>
        </div>
      </div>
    </div>

    <FooterBanner />
  </div>
</template>


<script>
import { mapState, mapActions } from 'vuex';
import FooterBanner from "../components/FooterBanner.vue";
import HeaderBar from "../components/layout/HeaderBar.vue";
import MenuBar from "../components/layout/MenuBar.vue";
import Breadcrumbs from "../components/widgets/breadcrumbs.vue";

export default {
  middleware: ['scrollToTopMiddleware','authenticated'],
  components: {
    HeaderBar,
    MenuBar,
    Breadcrumbs,
    FooterBanner,
  },
  computed: {
    ...mapState('order', ['activeOrders']),
  },
  mounted() {
    this.fetchOrderData();
  },
  methods: {
    logout() {
      this.$store.dispatch("logoutUser", "logout");
      this.$router.push("/");
      this.isLogin = null;
    },
    ...mapActions('order', ['fetchOrderData']),
  },
};
</script>

<style>
.myaccount_menus .nuxt-link-exact-active.nuxt-link-active {
  background: #151515;
  color: #fff !important;
}
.disabled{
  pointer-events: none;
}
</style>