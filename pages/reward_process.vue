<template>
  <div>
    <HeaderBar />
    <breadcrumbsVue />
    <div class="catg_page_banner contactpage_banner rewardspage_banner" v-bind:style="{
      backgroundImage:
        'url(' + require('@/assets/images/rewards_banner.jpg') + ')',
    }">
      <div class="container">
        <div class="row">
          <div class="col-xl-10 col-lg-10 col-md-12 col-sm-12 col-12">
            <div class="catg_banner_content">
              <h1 class="text-end">Reward points Program</h1>
              <h3 class="ms-n1">
                <em>Earn Reward Point for every £ you Spend</em>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="rewardspage_section bg-white pb-5">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-xl-10 col-lg-10 col-md-12 col-sm-12 col-12">
            <div class="rewardspage_steps">
              <div class="row">
                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                  <div class="rewardpage_step mb-4">
                    <div class="icon_area">
                      <img src="@/assets/images/buy_icon.png" alt="..." class="img-fluid d-block mx-auto" />
                    </div>
                    <h4>Buy</h4>
                    <p>
                      For every £1 that you spend at DigitalPress.com you're
                      rewarded with...
                    </p>
                  </div>
                </div>
                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                  <div class="rewardpage_step mb-4">
                    <div class="icon_area">
                      <img src="@/assets/images/earn_icon.png" alt="..." class="img-fluid d-block mx-auto" />
                    </div>
                    <h4>Earn</h4>
                    <p>...with 1 reward point</p>
                  </div>
                </div>
                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                  <div class="rewardpage_step mb-4">
                    <div class="icon_area">
                      <img src="@/assets/images/redeem_icon.png" alt="..." class="img-fluid d-block mx-auto" />
                    </div>
                    <h4>Redeem</h4>
                    <p>
                      ...you can redeem them as saving on your future purchases!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <div class="cms_area">
              <p>
                At DigitalPress.com we appreciate our customers. We strive to
                bring you top quality business and printing products at the best
                prices. As an additional sign of our appreciation, we offer
                Rewards Points to say “Thank You” for being our customer.
              </p>
              <br />
              <h4>
                <strong>REWARDS POINTS</strong>
              </h4>
              <p>
                GD Print is pleased to bring you Rewards Points. Rewards Points
                accumulate over time and can be converted into vouchers to use
                in the online store.
              </p>
              <p>There are several methods for gaining rewards points.</p>
              <ul>
                <li>Register For An Account - 400 points</li>
                <li>Per £10 Spent - 40 points</li>
                <li>Review A Product - 60 points</li>
                <li>
                  Refer a Friend - 200 points (if they register and place an
                  order)
                </li>
              </ul>

              <div class="table-responsive rewardsinfo_table">
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th colspan="2">
                        <h4>How Do I Get Rewards Points?</h4>
                        <p>
                          There are several methods for gaining rewards points.
                        </p>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Register for an Account</td>
                      <td>400 points</td>
                    </tr>
                    <tr>
                      <td>Per £10 Spent</td>
                      <td>40 points</td>
                    </tr>
                    <tr>
                      <td>Review a Product</td>
                      <td>60 points</td>
                    </tr>
                    <tr>
                      <td>Refer a Friend</td>
                      <td>200 points (if they register and place an order)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h5>What Are Rewards Points Worth?</h5>
              <ul>
                <li>Rewards Points are valued at 100 points = £1</li>
              </ul>
              <h5>When Can I Use My Rewards Points?</h5>
              <ul>
                <li>
                  Points can be used at any time when making a purchase. First
                  time customers can use sign-up bonus points toward their first
                  purchase of £20 or more.
                </li>
              </ul>
              <h5>Will My Rewards Points Expire?</h5>
              <ul>
                <li>
                  Your rewards points will never expire and will continue to
                  accrue. Use them to create coupon codes for use at checkout.
                </li>
              </ul>
              <h5>Are Rewards Points Limited?</h5>
              <ul>
                <li>There is no limit for your earnings.</li>
                <li>Your rewards points will never expire.</li>
                <li>Rewards Points can be used toward any purchase over £20</li>
              </ul>
              <p>
                GD Print will allow you to convert your reward points back into
                vouchers to spend on any product in the online store. Every
                point is worth £0.01. Points can be used any time at the basket.
                When you have items in your basket, simply click the “Use Points
                For Payment” button and the system will allocate the points to
                the basket. All points will be used for payment (excluding
                delivery). If you don't have enough points to cover the full
                value of the basket, you can complete the purchase using normal
                payment methods.
              </p>
              <p>
                Points never expire and will continue to build with every
                purchase. Please visit your account for a complete breakdown of
                points earned and spent.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script>
import HeaderBar from '../components/layout/HeaderBar.vue';
import breadcrumbsVue from "../components/widgets/breadcrumbs.vue";

export default {
  middleware: 'scrollToTopMiddleware',
  components: {
    breadcrumbsVue,
    HeaderBar,
  },
};
</script>