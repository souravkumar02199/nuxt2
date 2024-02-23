<template>
  <div>
    <!-- {{ $route.path }} -->
    <top-bar></top-bar>
    <side-cart></side-cart>
    <mobile-menu></mobile-menu>
    <Nuxt />
    <TalkToWidget></TalkToWidget>
    <footer-view></footer-view>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import FooterView from '../components/layout/FooterView.vue';
// import GTMScript from '../components/layout/GTMScript.vue';
import MobileMenu from '../components/layout/MobileMenu.vue';
import SideCart from '../components/layout/SideCart.vue';
import TopBar from '../components/layout/TopBar.vue';
import TalkToWidget from '../components/widgets/TawkToWidget.vue';
export default {
  components: { TopBar, FooterView, SideCart, MobileMenu, TalkToWidget },

  mounted() {
    this.fetchCategories()
  },
  methods: {
    ...mapActions('category', ['fetchCategories'])
  }
  // created() {
  //   window.addEventListener('beforeunload', this.saveStateToLocalStorage);
  //   window.addEventListener('load', this.restoreStateFromLocalStorage);
  // },
  // mounted(){
  //   setTimeout(() => {
  //     localStorage.removeItem('cartState')
  //   }, 2000);
  // },
  // beforeDestroy() {
  //   window.removeEventListener('beforeunload', this.saveStateToLocalStorage);
  //   window.removeEventListener('load', this.restoreStateFromLocalStorage);
  // },
  // methods: {
  //   saveStateToLocalStorage() {
  //     localStorage.setItem('cartState', JSON.stringify(this.$store.state.cart));
  //   },
  //   restoreStateFromLocalStorage() {
  //     const cartState = JSON.parse(localStorage.getItem('cartState'));
  //     if (cartState) {
  //       this.$store.replaceState(Object.assign(this.$store.state.cart, cartState));
  //     }
  //   }
  // }
};

</script>
<style>
.dp-notification {
  position: fixed !important;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  z-index: 9999;
}
</style>
