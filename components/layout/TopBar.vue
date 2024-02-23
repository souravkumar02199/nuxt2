<template>
  <div id="topBar" class="w-100 overflow-x-hidden topbar d-flex position-relative" style="background: #d5dce1">
    <div class="marquee-section d-flex col">
      <div class="marquee-block d-flex">
        <div class="marquee-text dp-text" v-for="(content, index) in marque" :key="index">
          <small>{{ content }}</small>
        </div>
      </div>
      <div class="marquee-block d-flex">
        <div class="marquee-text dp-text" v-for="(content, index) in marque" :key="index">
          <small>{{ content }}</small>
        </div>
      </div>
      <div class="marquee-block d-flex">
        <div class="marquee-text dp-text" v-for="(content, index) in marque" :key="index">
          <small>{{ content }}</small>
        </div>
      </div>
      <div class="marquee-block d-flex">
        <div class="marquee-text dp-text" v-for="(content, index) in marque" :key="index">
          <small>{{ content }}</small>
        </div>
      </div>
    </div>
    <div class="bg_primary py-2 user-Info-section pl-4 d-flex top-blog-user-section"></div>
    <div class="container right-top-section d-none d-md-block">
      <div class="d-flex align-items-center justify-content-end">
        <Nuxt-link to="/blogs" class="d-flex align-items-center py-2">
          <img height="19" width="21" src="~/assets/images/header/blogging.png" alt="blog-icon" />
          <span class="text-white ms-2 d-none d-sm-block"><small>Our Blogs</small></span>
        </Nuxt-link>

        <div class="d-flex align-items-center ms-sm-4 my-account py-2">
          <Nuxt-link to="/signin" v-if="!isLogin" class="d-flex align-items-center ms-4">
            <img height="19" width="19" src="~/assets/images/header/user.png" alt="user icon" />
            <span class="text-white ms-2 d-none d-sm-block"><small>Login</small></span>
          </Nuxt-link>
          <span v-else class="text-white ms-2 d-none d-sm-block">
            <span class="d-flex align-items-center">
              <img height="19" width="19" src="~/assets/images/header/user.png" alt="user icon" />
              <span class="ms-2 d-none d-sm-block"><small>My Account</small></span>
            </span>

            <span class="account-options row text-dark pt-2">
              <Nuxt-link  to="/dashboard/" class="col-6 py-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path
                    d="M13 21V11h8v10h-8zM3 13V3h8v10H3zm6-2V5H5v6h4zM3 21v-6h8v6H3zm2-2h4v-2H5v2zm10 0h4v-6h-4v6zM13 3h8v6h-8V3zm2 2v2h4V5h-4z"
                    fill="rgba(52,58,64,1)" />
                </svg>
                Dashboard
              </Nuxt-link>
              <Nuxt-link to="/dashboard/orders" class="col-6 py-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path
                    d="M3 10H2V4.003C2 3.449 2.455 3 2.992 3h18.016A.99.99 0 0 1 22 4.003V10h-1v10.001a.996.996 0 0 1-.993.999H3.993A.996.996 0 0 1 3 20.001V10zm16 0H5v9h14v-9zM4 5v3h16V5H4zm5 7h6v2H9v-2z"
                    fill="rgba(52,58,64,1)" />
                </svg>
                Orders
              </Nuxt-link>
              <Nuxt-link to="/dashboard/artwork" class="col-6 py-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path
                    d="M8 8v8h8V8H8zM6 6h12v12H6V6zm0-4h2v3H6V2zm0 17h2v3H6v-3zM2 6h3v2H2V6zm0 10h3v2H2v-2zM19 6h3v2h-3V6zm0 10h3v2h-3v-2zM16 2h2v3h-2V2zm0 17h2v3h-2v-3z"
                    fill="rgba(52,58,64,1)" />
                </svg>
                Artworks
              </Nuxt-link>
              <Nuxt-link to="/dashboard/address" class="col-6 py-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path
                    d="M21 4H7a2 2 0 1 0 0 4h14v13a1 1 0 0 1-1 1H7a4 4 0 0 1-4-4V6a4 4 0 0 1 4-4h13a1 1 0 0 1 1 1v1zM5 18a2 2 0 0 0 2 2h12V10H7a3.982 3.982 0 0 1-2-.535V18zM20 7H7a1 1 0 1 1 0-2h13v2z"
                    fill="rgba(52,58,64,1)" />
                </svg>
                Address Book
              </Nuxt-link>
              <Nuxt-link to="/dashboard/request_quote" class="col-6 py-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path
                    d="M5.455 15L1 18.5V3a1 1 0 0 1 1-1h15a1 1 0 0 1 1 1v12H5.455zm-.692-2H16V4H3v10.385L4.763 13zM8 17h10.237L20 18.385V8h1a1 1 0 0 1 1 1v13.5L17.545 19H9a1 1 0 0 1-1-1v-1z"
                    fill="rgba(52,58,64,1)" />
                </svg>
                Quote Request
              </Nuxt-link>
              <Nuxt-link to="/dashboard/settings" class="col-6 py-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path
                    d="M12 1l9.5 5.5v11L12 23l-9.5-5.5v-11L12 1zm0 2.311L4.5 7.653v8.694l7.5 4.342 7.5-4.342V7.653L12 3.311zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
                    fill="rgba(52,58,64,1)" />
                </svg>
                Settings
              </Nuxt-link>
              <a href="javascript:void(0)" class="col-12 py-2 text-center pointer dp-bg-secondary-light"
                @click="logout">Logout</a>
            </span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLogin: null,
      marque: [
        "+ Over 20 Years Experience",
        "+ Next Day UK Delivery",
        "+ Dedicated Management Team",
        "+ Best Price Guaranteed",
        "+ Over 20,000 Products",
        "+ Personal Artworker",
        "+ State of the Art Design Tool"
      ],
    };
  },
  mounted() {
    this.isLogin = sessionStorage.getItem("userlogin");
  },
  methods: {
    logout() {
      this.$store.dispatch("logoutUser", "logout");
      this.isLogin = null;
    },
  },
};
</script>

<style>
#topBar {
  font-size: 12px;
  font-weight: 400;
  color: #151515;
}

.user-Info-section {
  position: relative;
  z-index: 4;
  gap: 2rem;
  /* justify-content: space-around; */
}

.top-blog-user-section {
  width: 25%;
}

@media (min-width: 1600px) {
  .top-blog-user-section {
    width: 30%;
  }
}

@media (max-width: 1400px) {
  .top-blog-user-section {
    width: 30%;
  }
}

@media (max-width: 768px) {
  .top-blog-user-section {
    width: 40%;
    display: none !important;
  }
}

.user-Info-section::after {
  content: "";
  background: #0096ae;
  position: absolute;
  width: 17px;
  height: 100%;
  left: -10px;
  top: 0;
  transform: skewX(-20deg);
  z-index: 33;
}

.right-top-section {
  position: absolute;
  top: 50%;
  /* height: 100%; */
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 35;
}

.login-dropdown {
  position: absolute;
  top: 100%;
  right: 0%;
  background-color: rgba(0, 0, 0, 0.7);
  width: 300px;
  z-index: 16;
  border-radius: 8px;
}

.my-account {
  position: relative;
  z-index: 30;
}

.my-account:hover span .account-options {
  display: flex;
}

.account-options {
  position: absolute;
  top: 100%;
  right: 0%;
  width: 360px;
  background: #FFF;
  /* border-radius: 8px; */
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  z-index: 35;
  display: none;
}

.account-options a:hover {
  background-color: #f1f1f1;
}

.my-account:hover .login-dropdown {
  display: block;
}</style>
