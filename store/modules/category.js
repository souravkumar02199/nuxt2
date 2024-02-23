import { apiDefaults, axios } from "@/api/index.js";
import { MEDIA_URL } from "./../../api/urls";
const state = {
  category: null,
  a2z_categories: null,
  menu_category: null,
  home_category: null,
  discounted_category: null,
  promotional_category: null,
  most_popular_category: null,
  recycled_category: null,
  hero_banners: [
    `${MEDIA_URL}/static/slide-2.jpg.webp`,
    `${MEDIA_URL}/static/Digital_Press.webm`,
    `${MEDIA_URL}/static/1.f1fdb2b_S006dkm.webp`,
    `${MEDIA_URL}/static/4.webp`,
    `${MEDIA_URL}/static/3.webp`,
    `${MEDIA_URL}/static/2.webp`
  ],
  mobile_banner: [
    `${MEDIA_URL}/static/main-banner-7.webp`,
    `${MEDIA_URL}/static/mobile-slider-3.jpg.webp`,
    `${MEDIA_URL}/static/mobile-slider-1.jpg.webp`,
    `${MEDIA_URL}/static/mobile-slider-2.jpg.webp`,
    `${MEDIA_URL}/static/mobile-slider-4.jpg.webp`
  ],
  partners_logo: [
    `${MEDIA_URL}/static/logo3.png`,
    `${MEDIA_URL}/static/logo1.png`,
    `${MEDIA_URL}/static/logo14.png`,
    `${MEDIA_URL}/static/logo13.png`,
    `${MEDIA_URL}/static/logo12.png`,
    `${MEDIA_URL}/static/logo11.png`,
    `${MEDIA_URL}/static/logo10.png`,
    `${MEDIA_URL}/static/logo9.png`,
    `${MEDIA_URL}/static/logo2.png`,
    `${MEDIA_URL}/static/logo7.png`,
    `${MEDIA_URL}/static/logo6.png`,
    `${MEDIA_URL}/static/logo5.png`,
    `${MEDIA_URL}/static/logo4.png`,
    `${MEDIA_URL}/static/logo8.png`
  ],
  classwiseData: [
    { type: "a", products: [] },
    { type: "b", products: [] },
    { type: "c", products: [] },
    { type: "d", products: [] },
    { type: "e", products: [] },
    { type: "f", products: [] },
    { type: "g", products: [] },
    { type: "h", products: [] },
    { type: "i", products: [] },
    { type: "j", products: [] },
    { type: "k", products: [] },
    { type: "l", products: [] },
    { type: "m", products: [] },
    { type: "n", products: [] },
    { type: "o", products: [] },
    { type: "p", products: [] },
    { type: "q", products: [] },
    { type: "r", products: [] },
    { type: "s", products: [] },
    { type: "t", products: [] },
    { type: "u", products: [] },
    { type: "v", products: [] },
    { type: "w", products: [] },
    { type: "x", products: [] },
    { type: "y", products: [] },
    { type: "z", products: [] },
  ],
};

const getters = {
  category: (state) => state.category,
  a2z_categories: (state) => state.a2z_categories,
  menu_category: (state) => state.menu_category,
  home_category: (state) => state.home_category,
  discounted_category: (state) => state.discounted_category,
  promotional_category: (state) => state.promotional_category,
  most_popular_category: (state) => state.most_popular_category,
  recycled_category: (state) => state.recycled_category,
  hero_banners: (state) => state.hero_banners,
  mobile_banner: (state) => state.mobile_banner,
  partners_logo: (state) => state.partners_logo,
}

const mutations = {
  // SET_HERO_BANNERS(state, payload) {
  //   const BANNERS = payload.banner
  //   const desiredOrder = [
  //     `${MEDIA_URL}/static/slide-2.jpg.webp`,
  //     `${MEDIA_URL}/static/Digital_Press.webm`,
  //   ];
  //   state.hero_banners = desiredOrder.concat(BANNERS.filter(url => !desiredOrder.includes(url)));;
  // },
  // SET_BANNERS(state, payload) {
  //   state.mobile_banner = payload.mobile;
  //   state.partners_logo = payload.partrners
  // },
  SET_CATEGORY(state, payload) {
    let categoryList = payload.sort(function (a, b) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    state.category = categoryList;
  },
  SET_A2Z(state, payload) {
    let classwiseData = state.classwiseData;
    let categories = payload;
    for (let i = 0; i < classwiseData.length; i++) {
      let filterArray = categories.filter((x) => {
        return x.short_name?.charAt(0).toLowerCase() == classwiseData[i].type;
      });

      classwiseData[i]["products"] = filterArray;
    }
    state.a2z_categories = classwiseData;
  },
  SET_HOME_CATEGORY(state, payload) {
    const filter = payload.filter(x => x.show_on_home_page)
    state.home_category = filter;
  },
  SET_MENU(state, payload) {
    const filter = payload.filter(x => x.is_featured)
    state.menu_category = filter;
  },
  SET_DISCOUNTED(state, payload) {
    state.discounted_category = payload;
  },
  SET_PROMOTIONAL(state, payload) {
    state.promotional_category = payload;
  },
  SET_RECYCLED(state, payload) {
    state.recycled_category = payload;
  },
  SET_POPULAR(state, payload) {
    state.most_popular_category = payload;
  },
};

const actions = {
  async fetchCategories({ commit }) {
    try {
      const response = await axios.get(`${apiDefaults.baseURL}/categories/home/`);
      const allCategory = response.data.results
      const a2z = response.data.a_to_z_category
      const mostPopular = response.data.most_popular_category
      const recycled = response.data.recycled_category
      const promotional = response.data.promotional_category
      const discounted = response.data.discounted_category
      commit("SET_CATEGORY", allCategory[1].children)
      commit("SET_A2Z", a2z)
      commit("SET_HOME_CATEGORY", allCategory[1].children)
      commit("SET_MENU", allCategory[1].children)
      commit("SET_DISCOUNTED", discounted)
      commit("SET_PROMOTIONAL", promotional)
      commit("SET_RECYCLED", recycled)
      commit("SET_POPULAR", mostPopular)
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
