import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import category from "./modules/category";
import cart from "./modules/cart";
import blog from "./modules/blog";
import order from "./modules/order";
import quotation from "./modules/quotaion"

Vue.use(Vuex);

const store = () => {
  return new Vuex.Store({
    modules: {
      auth,
      category,
      cart,
      blog,
      order,
      quotation
    }
  })
}
export default store

