<template>
  <section class="blog4">
    <div class="container_wrap">
      <h2>Want Digital Press updates sent straight to your inbox?</h2>

      <div class="newsletter">
        <input v-model="email" type="email" placeholder="We saved a spot for your email"/>
        <button @click="sendEmail()">Send</button>
        <p>
          By clicking send you'll receive occasional emails from Digital Press.
          You always have the choice to unsubscribe within every email you
          receive.
        </p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      email: "",
    };
  },
  methods: {
    sendEmail() {
      if (this.email !== "") {
        this.$store.getters.client
          .post("newsletter/", { email: this.email })
          .then(() => {
            this.email = "";
          });
      }
    },
  },
};
</script>

<style>
</style>