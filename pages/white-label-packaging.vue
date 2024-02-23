<template>
    <div>
      <header-bar></header-bar>
      <menu-bar class="d-none d-md-block"></menu-bar>
      <section class="pagetitle">
        <div class="title">
            <h1>White Label Packaging</h1>
        </div>
    </section>

    <section class="terms">
        <div class="container_wrap">

            <p>Discretion is of utmost importance when it comes to order delivery, hence at Digital Press; we are expert in B2B printing and ship every order in unbranded, white label packaging as per standard. For full privacy, your bill and all other order
                related information will be shared with you through email alone. This way ensures that your client does not get to know the source from where the parcel has been dispatched. Hence, all of our orders are delivered in prudent packaging with
                no branding of any kind.</p>
            <p>The simple packaging does not include any advertising or invoices from us, which helps to save your precious time and gives the impression that the item is your own production, which can be then shipped directly to your customer.</p>

            <p>On the other hand, we can deliver the packaging to you that you can simply customise with your own labels. Moreover, we boast of solid and safe packaging to make sure that your products reach the destination without being damaged during transit.
                We can even deliver your products packed in bundles into quantities of your preference as an additional alternative for your convenience.</p>
        </div>
    </section>
    </div>
  </template>
  
  <script>
  import HeaderBar from '../components/layout/HeaderBar.vue'
  import MenuBar from '../components/layout/MenuBar.vue'
  export default {
    middleware: 'scrollToTopMiddleware',
    components: { HeaderBar, MenuBar },
  
  }
  </script>
  
  <style>
  
  </style>