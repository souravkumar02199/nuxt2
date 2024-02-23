import { apiDefaults, axios } from "@/api/index.js";
const state = {
  orderData: null,
  activeOrders: [],
  artworkPendingItems: [],
  currentOrder:null,
  orderStep:1,
};

const mutations = {
  SET_ORDER_DATA(state, data) {
    state.orderData = data;
  },

  SET_ACTIVE_ORDERS(state, orders) {
    state.activeOrders = orders;
  },

  SET_PENDING_ARTWORK(state, orders) {
    state.artworkPendingItems = orders;
  },

  SAVE_ORDER(state, order) {
    state.currentOrder = order;
  },

  UPDATE_ORDER_STEP(state, step){
    state.orderStep = step
  }
};

const actions = {
  async fetchOrderData({ commit }) {
    try {
      const TOKEN = sessionStorage.getItem('access')
      const headers = {
        Authorization: `Bearer ${TOKEN}`
      };
      
      const response = await axios.post(
        `${apiDefaults.baseURL}/user/user-order`, {}, { headers }
      );

      const orderData = response.data.result;
      const activeOrders = orderData.filter(order => order.status !== 'deliverd');
      const artworkPending = orderData.filter(order => order.status === 'in-review');
      commit('SET_ORDER_DATA', orderData);
      commit('SET_ACTIVE_ORDERS', activeOrders);
      commit('SET_PENDING_ARTWORK', artworkPending);
    } catch (error) {
      console.error('Error fetching order data:', error);
    }
  },

  saveOrder: ({ commit }, payload) => {
    commit('SAVE_ORDER', payload);
  },

  updateOrderStep: ({ commit },  payload ) => {
    commit("UPDATE_ORDER_STEP",  payload );
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
