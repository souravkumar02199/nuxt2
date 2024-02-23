<template>
  <div>
    <div class="dashboard_banner mb-4">
      <div class="dashboard_banner_inner">
        <div class="row">
          <div class="col-12">
            <h2 v-if="user">Hello, {{ user.first_name }}!</h2>
            <h5>Welcome Back</h5>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
        <nuxt-link to="/dashboard/orders" class="statistics_box d-block">
          <div class="d-flex align-items-center">
            <div class="icon_area">
              <img src="@/assets/images/order_icon.png" alt="..." class="img-fluid d-block mx-auto" />
            </div>
            <div class="content_area">
              <h4>{{ activeOrders.length }}
                <span>Live Orders</span>
              </h4>
              <h3>My Orders</h3>
            </div>
          </div>
        </nuxt-link>
      </div>

      <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
        <nuxt-link to="" class="statistics_box d-block">
          <div class="d-flex align-items-center">
            <div class="icon_area">
              <img src="@/assets/images/order_icon.png" alt="..." class="img-fluid d-block mx-auto" />
            </div>
            <div class="content_area">
              <h4>0 <span>points</span></h4>
              <h3>Awards Points</h3>
            </div>
          </div>
        </nuxt-link>
      </div>

      <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
        <nuxt-link to="" class="statistics_box d-block">
          <div class="d-flex align-items-center">
            <div class="icon_area">
              <img src="@/assets/images/order_icon.png" alt="..." class="img-fluid d-block mx-auto" />
            </div>
            <div class="content_area">
              <h4>0 <span>saved quotes</span></h4>
              <h3>Quotes</h3>
            </div>
          </div>
        </nuxt-link>
      </div>

      <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
        <nuxt-link to="" class="statistics_box d-block">
          <div class="d-flex align-items-center">
            <div class="icon_area">
              <img src="@/assets/images/order_icon.png" alt="..." class="img-fluid d-block mx-auto" />
            </div>
            <div class="content_area">
              <h4>0 <span>By Friends</span></h4>
              <h3>Earn Referral Points</h3>
            </div>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      user: null,
      liveOrders: null,
    };
  },

  computed: {
    ...mapState('order', ['activeOrders']),
  },
  mounted() {
    this.user = JSON.parse(sessionStorage.getItem("user"));
  },
};
</script>
