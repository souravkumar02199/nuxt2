<template>
  <div class="bg-dark sticky py-2">
    <div class="container">
      <div class="d-flex justify-content-between align-items-center">
        <DpLogo class="text-white" />
        <div class="col px-3 d-none d-md-block">
          <search-bar></search-bar>
        </div>
        <div class="d-flex mx-0">
          <a href="javascript:void(Tawk_API.toggle())">
            <img class="d-none d-sm-block" height="35" width="35" src="~/assets/images/header/conversation.png"
              alt="chat" />
          </a>
          <Nuxt-link to="/contact" class="d-none d-sm-block">
            <img height="35" width="35" src="~/assets/images/header/phone-icon.8dd1431.png" alt="contact" class="ms-3" />
          </Nuxt-link>
          <div @click="$nuxt.$emit('open-cart-modal')" class="ms-3 pointer d-none d-md-block position-relative">
            <img height="35" width="35" src="~/assets/images/header/basket-icon.2a33950.png" alt="cart" />
            <span class="counter" v-if="cartItemsCount.length > 0">{{ cartItemsCount.length }}</span>
          </div>
          <div class="mobile-menu-btn text-white d-md-none" @click="$nuxt.$emit('open-menu-modal')">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#FFFFFF" class="bi bi-list"
              viewBox="0 0 16 16">
              <path fill-rule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
            </svg>
          </div>
        </div>
      </div>
      <div class="d-md-none pt-2 mt-2 border-top">
        <search-bar></search-bar>
      </div>
    </div>
  </div>
</template>
<script>
import SearchBar from "./SearchBar.vue";
import DpLogo from "./DpLogo.vue";
export default {
  components: {
    SearchBar,
    DpLogo
  },
  computed: {
    cartItemsCount() {
      return this.$store.state.cart.cart
    }
  },
};
</script>
<style scoped>
.sticky {
  position: sticky;
  top: 0;
  z-index: 15;
}

.counter {
  width: 1rem;
  height: 1rem;
  background-color: #fff;
  position: absolute;
  top: 0;
  right: -5px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
}
</style>
