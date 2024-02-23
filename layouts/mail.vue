<template>
  <div>
    <mail-header></mail-header>
    <Nuxt/>
    <footer-view></footer-view>
  </div>
</template>

<script>
import FooterView from '../components/layout/FooterView.vue'
import MailHeader from '../components/layout/MailHeader.vue'
export default {
  components: { MailHeader, FooterView},

}
</script>