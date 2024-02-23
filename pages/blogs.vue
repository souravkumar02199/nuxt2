<template>

  <div>
    <section class="blog1"  v-if="blogList.length > 0">
      <carousel
        :items="1"
        :margin="0"
        :loop="true"
        :autoplay="true"
        :dots="true"
        :nav="false"
        :autoplayTimeout="9000"
        :autoplaySpeed="600"
      >
        <div class="slide_item" :class="`slideritem${index+1}`" v-for="(blog, index) in blogList" :key="blog.id">
          <div class="item pointer" @click="goToBlog(blog.slug)">
            <div class="slider slide1" :style="{ 'background-color': blog.background_color }">
              <div class="colleft" v-html="blog.title">
              </div>

              <div class="colright">
                <div class="imgslide shake">
                  <img :src="blog.attachment" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </carousel>
    </section>

    <BlogList :homePage="false"></BlogList>
    <TeamList/>
    <BlogNewsletter/>
  </div>
</template>

<script>
import BlogList from '../components/blog/BlogList.vue';
import BlogNewsletter from '../components/blog/BlogNewsletter.vue';
import TeamList from '../components/blog/TeamList.vue';

export default {
    middleware: 'scrollToTopMiddleware',
    layout: "blog",
    components: { BlogList, TeamList, BlogNewsletter },
    data() {
        return {
            blogList: [],
            team:[]
        };
    },
    async mounted() {
      this.getTeamData()
      await this.$store.dispatch('blog/fetchBlogs');
      this.blogList = this.$store.state.blog.homeBlog
    },
    methods: {
      async getTeamData(){
            await this.$store.getters.client.get('/team').then((res)=>{
                this.team = res.data.data
            })
        },
        goToBlog(id) {
            this.$router.push(`/blog/${id}`);
        },
    },
};
</script>
