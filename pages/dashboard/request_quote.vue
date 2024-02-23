<template>
  <div>
    <div class="cart_page_section myaccount_page dashboard_page bg-white">
      <div class="cart_page_area">
        <RequestQoteForm />
      </div>
    </div>
  </div>
</template>

<script>
import RequestQoteForm from "../../components/RequestQoteForm.vue";

export default {
  components: {
    RequestQoteForm,
  },
};
</script>