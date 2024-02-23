<template>
  <div class="bg-dark sticky py-2">
    <div class="container">
      <div class="d-flex flex-column flex-md-row justify-content-between align-items-center">
        <DpLogo class="text-white"/>
        <div class="d-flex mx-0 text-white mt-3 mt-md-0">
            <ul class="d-flex flex-row justify-content-center justify-content-md-end">
                <li class="px-3">News</li>
                <li class="px-3">Tips & Advise</li>
                <li class="px-3">Inspiration</li>
                <li class="px-3"><Nuxt-link to="/contact">Contact Us</Nuxt-link></li>
            </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import DpLogo from "./DpLogo.vue";
export default {
  components: {
    DpLogo
  },
}
</script>
<style scoped>
.sticky {
  position: sticky;
  top: 0;
  z-index: 12;
}
ul{
    margin: 0%;
    padding: 0;
    list-style: none;
}
.counter{
    width: 1rem;
    height: 1rem;
    background-color: #FFF;
    position: absolute;
    top: 0;
    right: -5px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
}
</style>
