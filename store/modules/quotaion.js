const state = {
    quotationData: null,
    orderItems: null,
    deliveryAddress: null,
    billingAddress: null,
    step: 1,
    checkoutStep: 1,
    token: ''
};

const mutations = {
    SET_TOKEN(state, data) {
        state.token = data
    },

    SET_QUOTATION(state, data) {
        state.quotationData = data;
    },

    ADD_ORDER_ITEMS(state, data) {
        let productItems = [];
        for (let item in data.products_pricing) {
            productItems.push({
                product_images: data.products_pricing[item].image,
                id: data.products_pricing[item].id,
                name: data.products_pricing[item].name,
                product_id: data.products_pricing[item].product,
                custom_product_id: data.products_pricing[item].custom_product,
                artworkUploaded: false,
                artwork: null,
                description: data.products_pricing[item].description,
                price: data.products_pricing[item].quotation_product_price[0]?.base_price,
                quantity: data.products_pricing[item].quotation_product_price[0]?.quantity,
                description: data.products_pricing[item].description,
            })
        }
        state.orderItems = productItems
    },

    UPDATE_ARTWORK(state, payload) {
        const productIndex = state.orderItems.findIndex(item => item.id === payload.product.id);
        if (productIndex !== -1) {
            state.orderItems[productIndex].artwork = payload.artwork;
            state.orderItems[productIndex].artworkUploaded = true;
        }
    },

    UPDATE_ORDER_STEP(state, data) {
        console.log(data)
        state.step = data
    },

    ADD_DELIVERY_ADDRESS(state, payload) {
        state.deliveryAddress = payload;
    },

    ADD_BILLING_ADDRESS(state, payload) {
        state.billingAddress = payload;
    },

    ADD_CHECKOUT_STEP(state, payload) {
        state.checkoutStep = payload;
    },
};

const actions = {
    initQuotationOrder({ commit }, payload) {
        commit('SET_QUOTATION', payload);
        commit('ADD_ORDER_ITEMS', payload);
    },

    setToken({ commit }, payload) {
        commit('SET_TOKEN', payload);
    },

    addOrderItems: ({ commit }, payload) => {
        console.log(payload)
        commit('ADD_ORDER_ITEMS', payload);
    },

    updateStep: ({ commit }, payload) => {
        console.log(payload)
        commit('UPDATE_ORDER_STEP', payload);
    },

    updateArtworkStatus: ({ commit }, { product, artwork }) => {
        commit("UPDATE_ARTWORK", { product, artwork });
    },

    addDeliveryAddress: ({ commit }, payload) => {
        commit("ADD_DELIVERY_ADDRESS", payload);
    },

    addBillingAddress: ({ commit }, payload) => {
        commit("ADD_BILLING_ADDRESS", payload);
    },

    updateCheckoutStep: ({ commit }, payload) => {
        commit("ADD_CHECKOUT_STEP", payload);
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};
