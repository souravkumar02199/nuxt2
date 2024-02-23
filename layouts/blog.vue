<template>
  <div>
    <blog-header></blog-header>
    <Nuxt />
    <footer-view></footer-view>
  </div>
</template>

<script>
import BlogHeader from '../components/layout/BlogHeader.vue';
import FooterView from '../components/layout/FooterView.vue';
export default {
  components: { FooterView, BlogHeader },};
</script>
