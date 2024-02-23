<template>
  <section class="blog3">
    <div class="heading">
      <h2>In the Spotlight</h2>
      <h3>Meet the Masterminds</h3>
    </div>

    <div class="row">
      <div
        class="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12 mb_30"
        v-for="member in team"
        :key="member.id"
      >
        <div class="blogpost pointer">
          <div class="img_wrap">
            <img
              :src="`${MEDIA_URL}/${member.profile}`"
              alt=""
            />
            <div class="content_overlay">
              <p>{{ member.description }}</p>
            </div>
          </div>
          <h3>{{ member.name }}</h3>
          <p>{{ member.role }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import {MEDIA_URL} from "@/api/urls"
export default {
  data() {
    return {
      MEDIA_URL: MEDIA_URL,
      team: [],
    };
  },
  async mounted() {
    this.getTeamData();
  },
  methods: {
    async getTeamData() {
      await this.$store.getters.client.get("/team").then((res) => {
        this.team = res.data.data;
      });
    },
  },
};
</script>

<style>
</style>