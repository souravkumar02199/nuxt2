<template>
  <div>
    <header-bar></header-bar>
    <breadcrumbsVue />
    <div class="referfriend_page">
      <div class="container">
        <div class="row align-items-end">
          <div class="col-xl-4 col-lg-5 col-md-12 col-sm-12 col-12">
            <div class="refer_slider">
              <no-ssr>
                <carousel :items="1" :margin="0" :loop="false" :autoplay="false" :dots="true" :nav="false">
                  <div class="referfriend_item text-center">
                    <h4 class="invite_title">Abc, invite now using:</h4>
                    <ul class="list-inline social_selection">
                      <li>
                        <a href="#">
                          <i class="fas fa-comment"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i class="fas fa-envelope"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i class="fab fa-facebook-f"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i class="fab fa-facebook-messenger"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i class="far fa-link"></i>
                        </a>
                      </li>
                    </ul>
                    <div class="bg_white tellbox p-3 mb-3">
                      <h5>
                        Tell your friends to enter your name, like this, at the
                        checkout:
                      </h5>
                      <h2>Abc Xyz</h2>
                      <h6>
                        <a href="#">How does it work? <span> [ + ]</span></a>
                      </h6>
                      <div class="btn_primary">
                        <a href="#">Tell them in person</a>
                      </div>
                    </div>
                    <div class="bg_white linkbox text-startp-3">
                      <h5>OR SHARE A LINK:</h5>
                      <div class="d-flex justify-content-center align-items-center">
                        <p>
                          digitalpress.com/m/ol/pteoa23/lonfsnaof?2423&=232df
                        </p>
                        <div class="btn_primary btn_black">
                          <button>Copy Link</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="referfriend_item text-center">
                    <div class="referform_area">
                      <h2>Register to start sharing</h2>
                      <form action="#">
                        <div class="form-group">
                          <label for="name">Your first name*</label>
                          <input type="text" class="form-control" id="name" />
                        </div>
                        <div class="form-group">
                          <label for="sname">Your surname*</label>
                          <input type="text" class="form-control" id="sname" />
                        </div>
                        <div class="form-group">
                          <label for="email">Your email address*</label>
                          <input type="email" class="form-control" id="email" />
                        </div>
                        <div class="form-group btn_primary">
                          <button>Register</button>
                        </div>
                        <h6>
                          <em>By accepting this offer you agree to the
                            <a href="#">Terms and Conditions</a></em>
                        </h6>
                      </form>
                    </div>
                  </div>
                </carousel>
              </no-ssr>
            </div>
          </div>
          <div class="col-xl-8 col-lg-7 col-md-12 col-sm-12 col-12">
            <img src="@/assets/images/refer-friend.jpg" alt="..." class="img-fluid" />
          </div>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import HeaderBar from "../components/layout/HeaderBar.vue";
import breadcrumbsVue from "../components/widgets/breadcrumbs.vue";

export default {
  middleware: 'scrollToTopMiddleware',
  components: {
    breadcrumbsVue,
    HeaderBar,
  },
};
</script>
