<template>
  <section class="blog2">
    <div class="">
      <h2>{{ homePage ? 'FROM THE BLOG' : 'NEW RELEASE' }}</h2>
      <div class="row" v-if="homePage == true">
        <div class="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12 mb_30" v-for="blog in blogList.slice(0, 4)" :key="blog.id">
          <div class="blogpost pointer" @click="goToBlog(blog.slug)">
            <img height="960" width="960" class="w-100 h-auto" :src="blog.attachment" alt="blog image" />
            <div class="tag">{{ blog.seo_keywords }}</div>
            <h3>{{ blog.seo_title }}</h3>
            <p>{{ blog.seo_description }}</p>
          </div>
        </div>
      </div>
      <div class="row" v-else>
        <div class="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12 mb_30" v-for="blog in blogList" :key="blog.id">
          <div class="blogpost pointer" @click="goToBlog(blog.slug)">
            <img height="960" width="960" class="w-100 h-auto" :src="blog.attachment" alt="blog image" />
            <div class="tag">{{ blog.seo_keywords }}</div>
            <h3>{{ blog.seo_title }}</h3>
            <p>{{ blog.seo_description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: [
    "homePage"
  ],
  data() {
    return {
      blogList: []
    }
  },
  async mounted() {
    await this.$store.dispatch('blog/fetchBlogs');
    this.blogList = this.$store.state.blog.blogList
  },
  methods: {
    goToBlog(id) {
      this.$router.push(`/blog/${id}`);
    },
  }
}
</script>

<style></style>