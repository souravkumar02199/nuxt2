<template>
  <div>
    <header-bar></header-bar>
    <menu-bar class="d-none d-md-block"></menu-bar>
    <!-- <breadcrumbsVue /> -->
    <div class="catg_page_banner contactpage_banner" v-bind:style="{
      backgroundImage:
        'url(' + require('@/assets/images/contact_banner.jpg') + ')',
    }">
      <div class="container">
        <div class="row">
          <div class="col-xl-7 col-lg-7 col-md-12 col-sm-12 col-12">
            <div class="catg_banner_content">
              <h1>We'd Love to <br />Hear From You</h1>
              <h5>
                <em>Always open for a Good Cup of Coffee</em>
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="contactpage_info bg-white py-5">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-xl-8 col-lg-10 col-md-12 col-sm-12 col-12">
            <div class="text-center">
              <h2>Contact Us</h2>
              <div class="cms_area mb-5">
                <p>
                  Our friendly, in-house customer success team are on hand to
                  guarantee the best print experience. So if you'd like to
                  discuss the print options for your next project, if you'd like
                  to talk about an existing order, or if you can't find
                  something on our website, they can help!
                </p>
                <p>
                  You can save time by searching for your query below. If you
                  can't find the answer you're looking for, choose your
                  preferred method of contact and get in touch directly with our
                  team.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12 mb-4">
            <div class="contactinfo_box text-center">
              <h4>Chat</h4>
              <p>Ask our UK care team online, we'll answer in a flash!</p>
              <div class="btn_primary btn_black">
                <a href="javascript:void(Tawk_API.toggle())"> Live Chat Now</a>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12 mb-4">
            <div class="contactinfo_box text-center">
              <h4>Email</h4>
              <p>Drop us a line and we'll email you back soon.</p>
              <p>sales@digitalpress.co.uk</p>
            </div>
          </div>
          <div class="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12 mb-4">
            <div class="contactinfo_box text-center">
              <h4>Write</h4>
              <p>Do it the old fashioned way; send us mail.</p>
              <p>Dock - Space City,
                Unit 109
                75 Exploration Drive,
                Leicester
                LE4 5NU</p>
            </div>
          </div>
          <div class="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12 mb-4">
            <div class="contactinfo_box text-center">
              <h4>Connect</h4>
              <p>Get in touch <br />on social media.</p>
              <ul class="list-inline socialicons">
                <li><a href="https://www.youtube.com/@DigitalPress_Official" target="_blank"><i
                      class="fab fa-youtube"></i></a></li>
                <li>
                  <a href="https://www.instagram.com/digitalpress_official/" target="_blank">
                    <i class="fab fa-instagram"></i>
                  </a>
                </li>
                <li>
                  <a href="https://www.facebook.com/digitalpressofficial/" target="_blank">
                    <i class="fab fa-facebook-square"></i>
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/digitalpress_official" target="_blank">
                    <i class="fab fa-twitter"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-xl-5 col-lg-6 col-md-8 col-sm-10 col-12 mt-4">
            <div class="contactinfo_box callus_box text-center">
              <i class="far fa-phone-alt callicon"></i>
              <h4>
                <a href="#">Call us on: <br class="d-sm-none" />
                  0800 756 3711</a>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="reviews_section contactpage_reviews py-4">
      <div class="container">
        <div class="row">
          <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div class="review_area pt-2">
              <div class="section_title text-center mb-4">
                <h3>Our Happy Customers</h3>
                <p>
                  Choose from our collection consisting thousands of free
                  templates.
                </p>
              </div>
              <UserReviews/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderBar from '../components/layout/HeaderBar.vue';
import MenuBar from '../components/layout/MenuBar.vue';
import UserReviews from '../components/widgets/UserReviews.vue';
import breadcrumbsVue from "../components/widgets/breadcrumbs.vue";

export default {
  middleware: 'scrollToTopMiddleware',
  components: {
    breadcrumbsVue,
    MenuBar,
    HeaderBar,
    UserReviews
},
};
</script>