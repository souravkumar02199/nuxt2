<template>
  <div>
    <section class="blog1 blog-single">
      <div class="item">
        <div
          class="slider slide1"
          :style="{ 'background-color': blog.background_color }"
        >
          <div class="colleft" v-html="blog.title"></div>

          <div class="colright">
            <div class="imgslide shake">
              <img width="960" height="960" class="h-auto" :src="blog.attachment" :alt="blog.title" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="tem_content">
      <div class="container_wrap" v-html="blog.description"></div>
    </section>

    <TeamList />
    <BlogNewsletter/>
    <BlogList></BlogList>
  </div>
</template>

<script>
import BlogList from "../../components/blog/BlogList.vue";
import BlogNewsletter from '../../components/blog/BlogNewsletter.vue';
import TeamList from "../../components/blog/TeamList.vue";
export default {
  middleware: 'scrollToTopMiddleware',
  head() {
    return {
      title: this.blog.seo_title,
      meta: [
        { name: "description", content: this.blog.seo_description },
      ],
      link: [
        {
          rel: 'canonical',
          href: process.env.BACKEND_URL + this.$route.path
        }
      ]
    }
  },
  layout: "blog",
  components: { BlogList, TeamList, BlogNewsletter },
  data() {
    return {
      blog: {},
    };
  },
  mounted() {
    this.getBlog();
  },
  methods: {
    getBlog() {
      this.$store.getters.client
        .get(`/blog/${this.$route.params.id}`)
        .then((response) => {
          this.blog = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // goToBlog(id) {
    //   this.$router.push(`/blog/${id}`);
    // }, 
  },
};
</script>