<template>
  <div>
    <div v-if="showSideCart" class="backShadow" @click="closeMenubar"></div>
    <transition name="slide-fade">
      <div class="side-cart" v-if="showSideCart">
        <div class="d-flex justify-content-between align-items-center bg-dark px-3 py-2 text-white">
          <p class="text-white">
            <small class="pr-3">Delivery might be delayed due to high demand from the past few days.</small>
          </p>
          <span class="pointer" @click="closeMenubar">&#10006;</span>
        </div>
        <p class="text-muted px-3 mt-2"><b>Your Cart</b></p>
        <div class="content">
          <div v-if="cart.length == 0" class="d-flex align-items-center justify-content-center p-4 h-100">
            <img loading="lazy" src="~/assets/images/all/empty-cart.png" width="350" height="237" alt="empty cart"
              class="w-100 h-auto" />
          </div>
          <div v-if="cart.length > 0">
            <div v-for="item in cart" :key="item.id" class="product-border-bottom pointer p-3">
              <div class="cart-product">
                <div>
                  <div class="product-image">
                    <img @click="redirect(`/cart`)" loading="lazy" width="110" height="100" class="w-100 h-auto"
                      v-if="item.product_images[0]" :src="item.product_images[0].image" alt="..." />
                  </div>

                </div>
                <div class="">
                  <div class="pointer product-title" @click="redirect(`/cart`)">
                    {{ item.name }}
                  </div>
                  <div class="d-flex justify-content-between align-items-end">
                    <div class="">
                      <div class="dp-secondary product-price">&#163;{{ item.price.toFixed(2) }}</div>
                      <div class=".chip-container">
                        <span class="product-chip">Quantity : {{ item.quantity }}</span>
                        <span class="product-chip" v-if="item.designServicePrice !== 0">Design : &#163;{{
                          formatPrice(item.designServicePrice) }}</span>
                      </div>
                    </div>
                    <div><i v-on:click="removeCartItem(item)" class="far fa-trash-alt"></i></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="p-4">

            </div>
          </div>
        </div>
        <div class="cart-footer py-2 dp-bg-secondary-light">
          <div class="dp-text px-3 border-right col" v-if="cart.length !== 0">
            <div><b><small><b>Total :</b></small> &#163;{{ subTotal }}</b></div>
            <div>Exclusive of all taxes</div>
          </div>
          <div class="dp-text px-3 border-right col">
            <b-button @click="redirect('/categories')" v-if="cart.length == 0" class="dp-bg-secondary w-100">Continue
              Shoping</b-button>
            <b-button @click="redirect('/cart')" v-else class="dp-bg-secondary w-100">Confirm Order</b-button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
  data() {
    return {
      showSideCart: false,
    };
  },
  computed: {
    ...mapState('cart', ['cart']),
    ...mapGetters('cart', ['subTotal',]),
    getSubTotal: function () {
      let cartItems = this.$store.state.cart.cart
      return cartItems.reduce((accumulator, obj) => {
        return accumulator + Number(obj.price);
      }, 0);
    },
  },
  created() {
    this.$nuxt.$on("open-cart-modal", () => {
      this.showSideCart = true;
    });
  },
  methods: {
    formatPrice(price) {
      const options = {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      };
      if (price) {
        let decimalPrice = Number(price).toLocaleString("en", options);
        if (decimalPrice.indexOf(".") !== -1) {
          return decimalPrice.replace(".00", "");
        }
      }
    },
    redirect(item) {
      this.$router.push(item)
      this.showSideCart = false
    },
    removeCartItem(product) {
      this.$store.dispatch("cart/removeCartItem", product);
    },
    closeMenubar() {
      this.showSideCart = false;
    },
  },
  beforeDestroy() {
    this.$nuxt.$off("open-cart-modal");
  },
};
</script>

<style>
.backShadow {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 120;
}

.side-cart {
  width: 400px;
  max-width: 100%;
  height: 100%;
  background: #fff;
  position: fixed;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  flex-direction: column;
  right: 0;
  bottom: 0;
  z-index: 121;
}

.content {
  overflow-x: hidden;
  overflow-y: auto;
  flex-grow: 1;
}

.cart-product {
  display: grid;
  gap: 0.75rem;
  grid-template-columns: 110px auto;
}

.product-image {
  width: 110px;
  border-radius: 8px;
  background-color: #f7f9fa;
  overflow: hidden;
  padding: 8px;
}

.product-image img {
  width: 100%;
  border-radius: 4px;
}

.product-title {
  font-size: 14px;
  font-weight: 500;
  line-height: 1.3;
}

.product-price {
  font-size: 14px;
  font-weight: 500;
  line-height: 1.5;
}

.chip-container {
  display: flex;
  gap: 0.5rem;
}

.product-chip {
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 10px;
  border: solid 1px #e5e7e8;
  background-color: #eff3f5;
}

.product-border-bottom {
  border: solid 1px #eff3f5;
}

.side-cart .cart-footer {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* align-self: flex-end; */
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}

.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(400px);
}
</style>
