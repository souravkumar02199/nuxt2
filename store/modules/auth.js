import { unauthClient, apiDefaults, axios } from "@/api/index.js";

const Auth = {
  state: () => ({
    userDetails: (state) => {
      return state.user;
    },
    access: sessionStorage.getItem("access") || null,
    refresh: sessionStorage.getItem("refresh") || null,
    email: sessionStorage.getItem("email") || null,
    unauthClient: unauthClient,
    endpoints: {
      obtain: "/front-user/login",
      refresh: "/token/refresh/",
      register: "/accounts/register/",
    },
  }),
  mutations: {
    updateTokens(state, tokens) {
      if (process.client) {
        const userDetails = tokens;
        sessionStorage.setItem("access", tokens.access);
        sessionStorage.setItem("refresh", tokens.refresh);
        sessionStorage.setItem("email", tokens.email);
        sessionStorage.setItem("userlogin", true);
        sessionStorage.setItem("user", JSON.stringify(tokens.user))
        state.access = tokens.access;
        state.refresh = tokens.refresh;
        state.user = tokens.user;
      }
    },
    updateAccess(state, access) {
      sessionStorage.setItem("access", access);
      state.access = access;
    },
    removeToken(state) {
      sessionStorage.removeItem("access", null);
      sessionStorage.removeItem("refresh", null);
      sessionStorage.removeItem("name", null);
      sessionStorage.removeItem("email", null);
      sessionStorage.removeItem("user", {})
      state.access = null;
      state.user = {};
      sessionStorage.removeItem("userlogin", false);
    },
  },
  getters: {
    client: () => {
      const apiClient = axios.create({
        ...apiDefaults,
      });
      return apiClient;
    },
    userClient: (state) => {
      const apiClient = axios.create({
        ...apiDefaults,
        headers: {
          Authorization: `Bearer ${state.access}`,
        },
      });
      return apiClient;
    },
    unauthClient: () => {
      const Client = axios.create({
        ...unauthClient,
      });
      return Client;
    },
  },
  actions: {
    obtainToken(context, payload) {
      return context.state.unauthClient
        .post(context.state.endpoints.obtain, payload)
        .then((response) => {
          this.commit("updateTokens", {
            access: response.data.access,
            refresh: response.data.refresh,
            email: response.data.email,
            user: response.data
          });
        });
    },

    logoutUser: (context, payload) => {
      context.commit("removeToken", payload);
    },

    refreshToken(context) {
      const payload = {
        refresh: context.state.refresh,
      };
      context.state.unauthClient
        .post(context.state.endpoints.refresh, payload)
        .then((response) => {
          this.commit("updateAccess", response.data.access);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    registerUser(context, authDetails) {
      return context.state.unauthClient
        .post(context.state.endpoints.register, authDetails)
    },
  },
};

export default Auth;
