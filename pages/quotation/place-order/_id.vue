<template>
  <div>
    <div class="cart_page_section py-4 bg-white">
      <div class="container">
        <div class="cart_page_area">
          <div class="row">
            <div class="col-lg-9 col-12">
              <div class="left_area">
                <nuxt-child />
              </div>
            </div>
            <div class="col-lg-3 col-12">
              <QuotationSummary />
            </div>
          </div>
        </div>
      </div>
    </div>
    <StripeJS />
    <StripeCheckout />
  </div>
</template>

<script>
export default {
  layout: "mail",
  middleware: 'scrollToTopMiddleware',
};
</script>