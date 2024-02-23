<template>
  <div>
    <header-bar></header-bar>
    <menu-bar class="d-none d-md-block"></menu-bar>
    <section class="bespoke1">
      <a href="#"></a>
    </section>

    <section class="bespoke2">
      <div class="container">
        <div class="heading">
          <h2>Bespoke Services</h2>
          <p>
            You can count on to make the print of your dreams come alive, as we
            possess a team of professional designers who can help create your
            perfect artwork. We provide affordable bespoke servicesso that you
            can relax while we take up the load to get you the printed products
            you want. Because of our ample experience in bespoke printing, we
            can easily source unique print supplies to create unique designer
            print solutions for you, so it does not matter whether your project
            is small or big in size, monochrome, or multicolored, single print
            or double sided, we have you covered for every demand. Give us a
            chance to prove our versatility.
          </p>
        </div>

        <div class="services">
          <div class="row">
            <div class="service_box box1">
              <h3>Fill in a form</h3>
              <p>
                Share your idea with us via our online form, and our team will
                reach out to you to authenticate any information.
              </p>
            </div>
            <div class="service_box box2">
              <h3>Get a Quote</h3>
              <p>
                After we receive your form, we will send you a quote. You will
                be able to see the in My Account within 24 hours. Then, we
                willnotify you through an email when it is ready.
              </p>
            </div>
            <div class="service_box box3">
              <h3>Supply Artwork</h3>
              <p>
                Nothing happens without you approval, so when you are fully
                satisfied, add the quote to your basket and share your artwork.
              </p>
            </div>
            <div class="service_box box4">
              <h3>Checkout</h3>
              <p>
                Here, you will select your delivery preferences and checkout.
                Now it is time to grab a cup of coffee and chill, while we work
                on designing your vision on print.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <b-container class="py-5">
      <div class="row justify-content-between">
        <div class="col-xl-6 col-md-6 col-sm-12 col-12">
          <div class="myaccount_box mb-4">
            <RequestQoteForm/>
          </div>
        </div>
        <div class="col-xl-5 col-md-6 col-sm-12 col-12">
          <div class="requestpage_slider">
            <no-ssr>
              <CategoryBanner :dots="true"/>
            </no-ssr>
            <!-- </div> -->
          </div>
        </div>
      </div>
    </b-container>
  </div>
</template>

<script>
import HeaderBar from '../components/layout/HeaderBar.vue';
import MenuBar from "../components/layout/MenuBar.vue";
import CategoryBanner from '../components/CategoryBanner.vue';
import RequestQoteForm from '../components/RequestQoteForm.vue';
export default {
  middleware: 'scrollToTopMiddleware',
  components: { MenuBar, HeaderBar, CategoryBanner, RequestQoteForm },
};
</script>
