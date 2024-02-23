<template>
  <div>
    <header-bar></header-bar>
    <menu-bar class="d-none d-md-block"></menu-bar>
    <breadcrumbsVue />
    <div class="catg_page_banner contactpage_banner aboutpage_banner" v-bind:style="{
      backgroundImage:
        'url(' + require('@/assets/images/about_banner.jpg') + ')',
    }">
      <div class="container">
        <div class="row">
          <div class="col-xl-7 col-lg-7 col-md-12 col-sm-12 col-12">
            <div class="catg_banner_content">
              <h1>Everything <br />Under One Roof</h1>
              <h5>
                <em>Save your Stress, Time and Money!!</em>
              </h5>
            </div>
          </div>
        </div>
      </div>
      <div class="d-lg-none">
        <img src="@/assets/images/about_banner-mobile.png" alt="..." class="img-fluid d-block mx-auto full-width" />
      </div>
    </div>

    <div class="aboutpage_info bg-white pt-5">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-xl-9 col-lg-10 col-md-11 col-sm-12 col-12">
            <div class="text-center">
              <h2>About Digital Press</h2>
              <h3>
                We are next generation printers believe in building
                relationships with our customers and provide them great quality
                printing.
              </h3>
              <div class="ethos_section">
                <h5>Our Ethos</h5>
                <h4>“Competitive Prices with Best Customer Service.”</h4>
              </div>
              <div class="cms_area">
                <p>With more than 15 years of experience, Digitalpress is a name that stands for versatility when it comes
                  to printing offering wide range of display merchandises to fulfil event specific demands. With our
                  proficient team at work, we possess the capability to support any custom-built printing requirements.
                  Situated in the heart of the East Midlands, Digitalpress is the printing pro that aims to cater to the
                  needs of varied clientele across the UK, Ireland and Europe through its state-of-the-art printed display
                  solutions.
                </p>
                <p>

                  As a prominent print seller, we can assure that the quality of our products is unmatched as compared to
                  our competitors. Our distributions channels operate efficiently to ensure fast delivery as we
                  persistently seek to adopt.
                  Our people make the difference. With enormous experience in
                  print sector, we believe we have the solutions for all your
                  print problems. We have a passion for print and we at Digital
                  Press would love to serve our customers. We are more than just
                  ink on paper.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="aboutpage_img">
        <img src="@/assets/images/about_1.png" alt="..." class="img-fluid d-block mx-auto full-width" />
      </div>
    </div>
  </div>
</template>

<script>
import HeaderBar from '../components/layout/HeaderBar.vue';
import MenuBar from '../components/layout/MenuBar.vue';
import breadcrumbsVue from "../components/widgets/breadcrumbs.vue";

export default {
  middleware: 'scrollToTopMiddleware',
  components: {
    breadcrumbsVue,
    MenuBar,
    HeaderBar,
  },
};
</script>
