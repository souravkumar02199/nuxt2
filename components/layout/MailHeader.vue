<template>
  <div class="bg-dark sticky py-2">
    <div class="container">
      <div class="d-flex justify-content-between align-items-center">
        <DpLogo class="text-white" />
        <div class="d-flex mx-0">
          <a href="javascript:void(Tawk_API.toggle())">
            <img class="d-none d-sm-block" height="35" width="35" src="~/assets/images/header/conversation.png"
              alt="chat" />
          </a>
          <Nuxt-link to="/contact" class="d-none d-sm-block">
            <img height="35" width="35" src="~/assets/images/header/phone-icon.8dd1431.png" alt="contact" class="ms-3" />
          </Nuxt-link>
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

.counter {
  width: 1rem;
  height: 1rem;
  background-color: #fff;
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
