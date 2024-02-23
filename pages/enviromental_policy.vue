<template>
  <div>
    <header-bar></header-bar>
    <menu-bar class="d-none d-md-block"></menu-bar>
    <img src="../assets/images/new/gogreen.jpg" class="w-100" alt="" />

    <section class="home2">
      <div class="container">
        <h1>Advocating sustainability</h1>
        <p>
          At Digitalpress, we understand how our actions can affect the nature
          around us; hence, we aim to control our impact on the environment.
          From adopting mindful packing styles and focusing on getting access to
          carbon-neutral and eco-conscious papers, to cutting down and
          reprocessing our waste, we are committed in contributing towards a
          greener planet. We are devoted to do away with challenging plastics in
          particular from our printing and execution procedure. We want to
          assure you that the suppliers from where we source our prints and
          other supplies possess all the mandatory accreditation and we have
          executed the audit to verify that they use eco-friendly products and
          are have access to sustainable sources. Hence, when you order recycled
          products from us, be assured that our sources incorporate the
          following essentials in their printing process:
        </p>
      </div>
    </section>

    <section class="home3">
      <div class="container">
        <div class="row">
          <div class="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12 mb_30">
            <div class="home2_box">
              <div class="img_box">
                <img src="../assets/images/new/icon1.png" alt="" />
              </div>

              <h3>Recycle</h3>
              <p>
                We aim to be a business with zero to landfill site. We are
                working with our partners to introduce recycle products and
                environmentally friendly packaging.
              </p>
            </div>
          </div>
          <div class="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12 mb_30">
            <div class="home2_box">
              <div class="img_box">
                <img src="../assets/images/new/icon2.png" alt="" />
              </div>

              <h3>Minimise waste</h3>
              <p>
                We are always making continuous efforts to seeknovel solutions
                to cut down on our waste by practicing methods like reusing ink
                cartridges and investing in print machinery that saves paper.
              </p>
            </div>
          </div>
          <div class="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12 mb_30">
            <div class="home2_box">
              <div class="img_box">
                <img src="../assets/images/new/icon3.png" alt="" />
              </div>

              <h3>Endorse recyclable products</h3>
              <p>
                We attempt to encourage customers to use more of green products
                wherever feasible so that they become aware and can take
                sensible decisions when it comes to choosing their print items.
              </p>
            </div>
          </div>
          <div class="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12 mb_30">
            <div class="home2_box">
              <div class="img_box">
                <img src="../assets/images/new/icon4.png" alt="" />
              </div>

              <h3>Progress over perfection</h3>
              <p>
                We may not have reached the level of perfection yet, but we are persistently making efforts to amplify our ecological interests. We are dynamically involved in eliminating plastic in our packaging and trying to enhance our environmentally friendly collection further.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="home4">
      <div class="container">
        <div class="home2_box mb-3">
          <h3>Our credentials</h3>
          <p>
            Digitalpress assures you that our partners have official recognition
            from Forest Stewardship Council® (FSC®) standards and ISO Management
            standards.
          </p>
        </div>

        <div class="row2">
          <div class="row">
            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 mb_30">
              <div class="home2_box">
                <h3>FSC Certification</h3>
                <p>
                  Our sources have a valid certification from Forest Stewardship
                  Council® Chain of Custody, implying that you can count on them
                  to generate better prospects for our forests, community
                  welfare, and markets for current times and even for future
                  generations.
                </p>
              </div>
            </div>

            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 mb_30">
              <div class="home2_box">
                <h3>ISO 14001 Certification</h3>
                <p>
                  Our suppliers are an ISO 14001certified business, which shows
                  that they have been examined and assessed based on the
                  contribution of their business practices towards environment
                  preservation. Our procedures comprise how we deal with our
                  waste and competently employ our resources.
                </p>
              </div>
            </div>

            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 mb_30">
              <div class="home2_box">
                <h3>ISO 9001 Certification</h3>
                <p>
                  This is an internationally recognized standard for Quality
                  Management Systems. It shows that repeatedly our partners have
                  proved themselves trustworthy for offering the best quality
                  when it comes to printing services.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="home2_box">
          <h3 class="mb-3">Explore our range of eco-conscious papers</h3>
          <p style="line-height: 1.5;">
            We offer a wide collection of environmentally-friendly substitutes for your most favourite paper stock,
            maintaining the same high quality you expect from regular papers. Explore our comprehensive range and make the
            switch to more ecologically oriented options. <br>

            Browse our recycle range to discover your ideal product that complements your green print project. Explore all
            options offered in our recyclable category - there's something for everyone. Choose the option that best suits
            your requirements. <br>

            We are continuously striving to reduce our environmental impact and expand our collection of
            environmentally-friendly products. We encourage our customers to make thoughtful choices and select more of
            these products when placing orders.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import HeaderBar from '../components/layout/HeaderBar.vue';
import MenuBar from "../components/layout/MenuBar.vue";
export default {
  middleware: 'scrollToTopMiddleware',
  components: { MenuBar, HeaderBar },
};
</script>
<style scoped>
p{
  line-height: 1.5 !important;
}
</style>
