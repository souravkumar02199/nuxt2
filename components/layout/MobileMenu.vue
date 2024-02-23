<template>
  <transition name="mobile-menu">
    <div class="mobile-menu" v-if="dialogStatus == true">
      <div class="bg-white ms-auto h-100 position-relative" style="max-width : 300px">
        <span role="button" class="mobile-menu-close-btn" @click="closeMenubar"><i class="fa fa-angle-right dp-secondary"
            aria-hidden="true"></i></span>
        <!-- <div class=" d-flex align-items-center justify-content-end py-3 px-3">
        </div> -->
        <ul class="menu-list">
          <li><a href="javascript:void(0)" @click="redirectTo('/signup')" class="menu-item bg-imp"
              v-if="!isLogin">Join</a></li>
          <li><a href="javascript:void(0)" @click="redirectTo('/signin')" class="menu-item bg-imp" v-if="!isLogin">Sign
              in</a></li>
          <li><a href="javascript:void(0)" @click="redirectTo('/dashboard')" to="/dashboard" class="menu-item bg-imp"
              v-if="isLogin">My Account</a></li>
          <li><a href="javascript:void(0)" @click="redirectTo('/cart')" class="menu-item bg-imp">Basket</a></li>
          <li><a href="javascript:void(0)" @click="redirectTo('/contact')" class="menu-item bg-imp">Contact</a></li>
          <li>
            <a href="javascript:void(0)" class="menu-item d-flex justify-content-between align-items-center"
              @click="showList = !showList" :class="showList ? 'dp-bg-secondary-light' : ''">
              Products
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" :class="{ rotate: showList }"
                xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M9.2803 0.469668C9.5732 0.762558 9.5732 1.23744 9.2803 1.5303L5.2803 5.5303C4.9874 5.8232 4.5126 5.8232 4.2197 5.5303L0.219668 1.5303C-0.0732225 1.23744 -0.0732225 0.762558 0.219668 0.469668C0.512558 0.176777 0.987437 0.176777 1.28033 0.469668L4.75 3.9393L8.2197 0.469668C8.5126 0.176777 8.9874 0.176777 9.2803 0.469668Z"
                  fill="#303030" />
              </svg>
            </a>
          </li>
          <template v-for="(item, index) in menuList">
            <li :key="index" v-show="showList">
              <a href="javascript:void(0)" @click="redirectTo(`/c/${item.slug}`)"
                class="menu-item dp-bg-secondary-light">{{ item.title }}</a>
            </li>
          </template>
          <li v-show="showList">
            <a href="javascript:void(0)" @click="redirectTo('/categories')" class="menu-item dp-bg-secondary-light"><small
                class="dp-secondary">View all >></small> </a>
          </li>
          <li><a href="javascript:void(0)" @click="redirectTo('/blogs')" class="menu-item">Our Blogs</a></li>
          <li><a href="javascript:void(0)" @click="redirectTo('/enviromental_policy')" class="menu-item">Enviromental
              Policy</a></li>
          <li><a href="javascript:void(0)" @click="redirectTo('/bespoke_services')" class="menu-item">Bespoke Services</a>
          </li>
          <li><a href="javascript:void(0)" @click="redirectTo('/request_quote')" class="menu-item">Request a quote</a>
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>
<script>
import * as Constants from "../../utils/const";
export default {
  data() {
    return {
      isLogin: null,
      dialogStatus: false,
      data: null,
      showList: false,
      menuList: [],
    };
  },
  mounted() {
    this.isLogin = sessionStorage.getItem("userlogin");
    this.getCategories()
  },
  methods: {
    redirectTo(path) {
      this.$router.push(path);
      this.closeMenubar();
    },
    closeMenubar() {
      this.dialogStatus = false;
      document.body.style.overflowY = "auto";
    },
    getCategories() {
      this.$store.getters.client
        .get(Constants.GetCategoriesURL)
        .then((response) => {
          this.data = response.data.results;
          this.data.forEach((element) => {
            if (element.children) {
              element.children.filter((x) => {
                if (x.is_featured) {
                  this.menuList.push(x);
                }
              });
            }
          });
        });
    },
  },
  created() {
    this.$nuxt.$on("open-menu-modal", () => {
      this.dialogStatus = true;
      document.body.style.overflowY = "hidden";
    });
  },
  beforeDestroy() {
    this.$nuxt.$off("open-menu-modal");
  },
};
</script>

<style scoped>
.mobile-menu-close-btn {
  position: absolute;
  top: 0;
  right: 300px;
  background-color: #fff;
  height: 55px;
  width: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  border-radius: 10px 0px 0px 10px;
}

.menu-list,
.sub-menu-list {
  list-style-type: none;
  margin: 0%;
  padding: 0.5rem 0 0 0;
}

.menu-list li .menu-item,
.sub-menu-list li .sub-menu-item {
  display: block;
  padding: 14px 20px;
  font-size: 0.8rem;
  color: #444;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}

.bg-imp {
  background: rgba(230, 237, 235, 0.5);
}

.rotate {
  transform: rotateX(180deg);
}

.mobile-menu {
  width: 100%;
  position: fixed;
  height: 100vh;
  overflow: auto;
  top: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 1050;
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.5s ease;
}

.mobile-menu-enter {
  transform: translateX(100%);
}

.mobile-menu-enter-to {
  transform: translateX(0px);
}

.mobile-menu-leave-to {
  transform: translateX(100%);
}
</style>
