<template>
  <div>
    <marque />

    <div class="catg_page_banner" style="background-image: none">
      <div class="banner_breadcrumb">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-12">
              <ul>
                <li>
                  <a href="#"><em>Home</em></a>
                </li>
                <li>
                  <span><em>{{$route.name}}</em></span>
                </li>
              </ul>
            </div>
            <div class="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-12">
              <div class="text-lg-end white_btn">
                <a href="#">Go Back</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="steps_line_section">
      <div class="container">
        <div class="steps_line_area">
          <div class="row">
            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3">
              <div class="step_item">
                <h5><span>1</span> Select Your Product Options</h5>
              </div>
            </div>
            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3">
              <div class="step_item">
                <h5><span>2</span> Design or Upload your Artwork</h5>
              </div>
            </div>
            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3">
              <div class="step_item">
                <h5><span>3</span> Checkout & Pay</h5>
              </div>
            </div>
            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3">
              <div class="step_item">
                <h5><span>4</span> Receive Your Order</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "breadcrumbs",
};
</script>
