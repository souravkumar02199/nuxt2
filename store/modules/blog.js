import { apiDefaults, axios } from "@/api/index.js";

const state = {
  homeBlog:[],
  blogList:[]
};

const mutations = {
  setBlogs(state, blog) {
    const filteredBlog = blog.filter((x) => {
      return x.show_on_front === false
    })
    state.blogList = filteredBlog;
  },
  setHomeblog(state, home_blog) {
    const filteredBlog = home_blog.filter((x) => {
      return x.show_on_front === true
    })
    state.homeBlog = filteredBlog;
  },
};

const actions = {
  async fetchBlogs({ commit }) {
    try {
      const response = await axios.get(
        `${apiDefaults.baseURL}/blog/`
      );
      const blog = response.data.results;
      const home_blog = response.data.results;
      commit("setBlogs", blog);
      commit("setHomeblog", home_blog);
    } catch (error) {
      console.error("Error fetching blog:", error);
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
