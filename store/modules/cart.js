import { apiDefaults, axios } from "@/api/index.js";

const state = {
  cart: JSON.parse(localStorage.getItem("cart")) || [],
  reference: {},
  deliveryCharges: 0,
  updatedDelivery: 0,
  deliveryMethod:'standard',
  deliveryAddress: null,
  billingAddress: null,
};

const getters = {
  cartItems: (state) => state.cart,

  cartItemCount: (state) => state.cart.length,

  isDelivery: (state) => state.deliveryAddress,

  isBilling: (state) => state.billingAddress,

  subTotal: (state) => {
    return state.cart.reduce((accumulator, obj) => {
      return accumulator + Number(obj.price);
    }, 0).toFixed(2);
  },

  artworkCharges: (state) => {
    return state.cart.reduce((accumulator, obj) => {
      return accumulator + Number(obj.designServicePrice);
    }, 0).toFixed(2);
  },

  itemsVat: (state) => {
    return state.cart.reduce((accumulator, obj) => {
      return accumulator + Number(obj.vat);
    }, 0).toFixed(2);
  },

  totalVat: (state) => {
    const artworkVat = Number(getters.artworkCharges(state) / 5);
    const deliveryVat = state.deliveryCharges / 5;
    const productVat = Number(getters.itemsVat(state))
    return (artworkVat + deliveryVat + productVat).toFixed(2);
  },

  totalAmount: (state) => {
    const SubTotal = Number(getters.subTotal(state));
    const ArtworkCharges = Number(getters.artworkCharges(state))
    const DeliveryCharges = Number(state.deliveryCharges);
    const TotalVat = Number(getters.totalVat(state))
    const total = SubTotal + ArtworkCharges + DeliveryCharges + TotalVat;
    return total.toFixed(2)
  },

  deliveryCharges: (state) =>  Number(state.deliveryCharges).toFixed(2)

};

const mutations = {
  ADD_TO_CART(state, payload) {
    state.cart = [...state.cart.filter(item => item.id !== payload.id), payload];
  },

  REMOVE_CART_ITEM(state, payload) {
    state.cart = state.cart.filter((item) => item.id !== payload.id);
  },

  CLEAR_CART(state) {
    state.cart = [];
  },

  UPDATE_ARTWORK(state, payload) {
    const productIndex = state.cart.findIndex(item => item.id === payload.product.id);
    if (productIndex !== -1) {
      state.cart[productIndex].artwork = payload.artwork;
      state.cart[productIndex].artworkUploaded = true;
    }
  },

  ADD_REFERENCE(state, payload) {
    state.reference = payload;
  },

  SET_DELIVERY_CHARGES(state, payload) {
    state.deliveryCharges = Number(payload).toFixed(2)
    state.updatedDelivery = Number(payload).toFixed(2)
  },

  UPDATE_DELIVERY(state, payload) {
    const standardCharge = state.updatedDelivery
    if (payload === 'standard') {
      state.deliveryCharges = standardCharge
      return 
    }
    if (payload === 'pre-noon') {
      state.deliveryCharges = standardCharge * 6 / 5
      return 
    }
    state.deliveryMethod = payload
  },

  ADD_DELIVERY_ADDRESS(state, payload) {
    state.deliveryAddress = payload;
  },

  ADD_BILLING_ADDRESS(state, payload) {
    state.billingAddress = payload;
  },
};

const actions = {
  addToCart: ({ commit }, payload) => {
    commit('ADD_TO_CART', payload);
  },

  removeCartItem: ({ commit }, payload) => {
    commit("REMOVE_CART_ITEM", payload);
  },

  addReference: ({ commit }, payload) => {
    commit('ADD_REFERENCE', payload);
  },

  clearCartItems: ({ commit }) => {
    commit("CLEAR_CART");
  },

  updateArtworkStatus: ({ commit }, { product, artwork }) => {
    commit("UPDATE_ARTWORK", { product, artwork });
  },

  deliveryOption: ({ commit },  payload ) => {
    commit("UPDATE_DELIVERY",  payload );
  },

  fetchDeliveryCharges: async ({ commit }) => {
    let productIdList = []
    state.cart.forEach((ele) => {
      productIdList.push({ product_id: ele.id, quantity: ele.quantity })
    })
    try {
      const response = await axios.post(
        `${apiDefaults.baseURL}/order/get-delivery-cost/`, { data: productIdList }
      );
      const deliveryCharges = response.data.delivery_cost;
      commit('SET_DELIVERY_CHARGES', deliveryCharges);
    } catch (error) {
      console.error('Error fetching order data:', error);
    }
  },

  addDeliveryAddress: ({ commit }, payload) => {
    commit("ADD_DELIVERY_ADDRESS",  payload );
  },

  addBillingAddress: ({ commit }, payload) => {
    commit("ADD_BILLING_ADDRESS", payload );
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
