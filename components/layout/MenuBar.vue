<template>
  <section class="sticky bg-white border-bottom">
    <div class="position-relative">
      <ul class="d-flex align-items-center container justify-content-between">
        <li class="my-2" v-if="menu_category === null"><SkeletonLoader  width="100%" height="19px"/></li>
        <li class="my-2" v-if="menu_category === null"><SkeletonLoader  width="100%" height="19px"/></li>
        <li class="my-2" v-if="menu_category === null"><SkeletonLoader  width="100%" height="19px"/></li>
        <li class="my-2" v-if="menu_category === null"><SkeletonLoader  width="100%" height="19px"/></li>
        <li class="my-2" v-if="menu_category === null"><SkeletonLoader  width="100%" height="19px"/></li>
        <li class="my-2" v-if="menu_category === null"><SkeletonLoader  width="100%" height="19px"/></li>
        <li class="my-2" v-if="menu_category === null"><SkeletonLoader  width="100%" height="19px"/></li>
        <li v-if="menu_category !== null" class="py-2 menu-item">
          <a href="javascript:void(0)">
            <span>All Products</span>
            <span class="ms-2">
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M9.2803 0.469668C9.5732 0.762558 9.5732 1.23744 9.2803 1.5303L5.2803 5.5303C4.9874 5.8232 4.5126 5.8232 4.2197 5.5303L0.219668 1.5303C-0.0732225 1.23744 -0.0732225 0.762558 0.219668 0.469668C0.512558 0.176777 0.987437 0.176777 1.28033 0.469668L4.75 3.9393L8.2197 0.469668C8.5126 0.176777 8.9874 0.176777 9.2803 0.469668Z"
                  fill="#303030" />
              </svg>
            </span>
          </a>
          <div class="category-block">
            <div class="category-white-block px-4 py-3">
              <div class="d-flex container">
                <div class="tabs" :class="[tab === 'a2z' ? 'active' : '']" @mouseenter="tab = 'a2z'">
                  Shop A to Z
                </div>
                <div class="tabs" :class="[tab === 'byCate' ? 'active' : '']" @mouseenter="tab = 'byCate'" @click="$router.push('/categories')">
                  By Category
                </div>
                <!-- <div class="tabs" v-if="most_popular_category" :class="[tab === 'popular' ? 'active' : '']" @mouseenter="tab = 'popular'">
                  By Category
                </div>
                <div class="tabs" v-if="discounted_category" :class="[tab === 'discounted' ? 'active' : '']" @mouseenter="tab = 'discounted'">
                  By Category
                </div>
                <div class="tabs" v-if="recycled_category" :class="[tab === 'recycled' ? 'active' : '']" @mouseenter="tab = 'recycled'">
                  By Category
                </div> -->
              </div>
              <hr />
              <div class="row container">
                <b-row>
                  <b-col cols="8">
                    <b-row class="scroll-container" v-if="tab === 'byCate'">
                      <b-col cols="3" v-for="item in category" :key="item.id">
                        <Nuxt-link :to="`/c/${item.slug}`" class="cate-link px-3 py-2 pill d-inline-block"
                          v-if="item.path">{{ item.name }}</Nuxt-link>
                      </b-col>
                    </b-row>
                    <div class="scroll-container" v-if="tab === 'a2z'">
                      <div class="card-columns">
                        <template v-for="item in a2z_categories">
                          <div class="card border-0" v-if="item.products.length > 0" :key="item.type">
                            <div class="text-uppercase dp-card-heading px-3 py-2 dp-secondary">
                              {{ item.type }}
                            </div>
                            <div v-for="link in item.products" :key="link.id">
                              <Nuxt-link :to="link.type === 'category'
                                  ? `/c/${link.slug}`
                                  : `/p/${link.slug}`
                                " class="cate-link px-3 py-2 pill d-inline-block">{{ link.short_name }}</Nuxt-link>
                            </div>
                          </div>
                        </template>
                      </div>
                    </div>
                  </b-col>
                  <MenuThreed v-if="tab === 'a2z' || tab === 'byCate'"/>
                  <b-col cols="4" v-else>
                    <b-row>
                      <b-col cols="6"><img src="@/assets/images/banner/Mostpoular01.jpg" class="w-100 mb-3" alt=""></b-col>
                      <b-col cols="6"><img src="@/assets/images/banner/Mostpoular02.jpg" class="w-100 mb-3" alt=""></b-col>
                      <b-col cols="6"><img src="@/assets/images/banner/Most-poular03.jpg" class="w-100 mb-3" alt=""></b-col>
                      <b-col cols="6"><img src="@/assets/images/banner/Mostpoular04.jpg" class="w-100 mb-3" alt=""></b-col>
                    </b-row>
                  </b-col>
                </b-row>
              </div>
            </div>
          </div>
        </li>
        <li class="py-2" v-for="item in menu_category" :key="item.id">
          <Nuxt-link :to="`/c/${item.slug}`">
            <span>{{ item.title }}</span>
          </Nuxt-link>
        </li>
        <li v-if="menu_category !== null" class="py-2 menu-item position-relative">
          <a href="javascript:void(0)">
            <span>Advise and Help</span>
            <span class="ms-2">
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M9.2803 0.469668C9.5732 0.762558 9.5732 1.23744 9.2803 1.5303L5.2803 5.5303C4.9874 5.8232 4.5126 5.8232 4.2197 5.5303L0.219668 1.5303C-0.0732225 1.23744 -0.0732225 0.762558 0.219668 0.469668C0.512558 0.176777 0.987437 0.176777 1.28033 0.469668L4.75 3.9393L8.2197 0.469668C8.5126 0.176777 8.9874 0.176777 9.2803 0.469668Z"
                  fill="#303030" />
              </svg>
            </span>
          </a>
          <div class="advise-menu">
            <ul class="p-0">
              <li v-for="link in adviseHelp" :key="link.id" class="text-dark">
                <Nuxt-link :to="link.path" class="px-3 py-2 d-block">{{ link.name }}</Nuxt-link>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import SkeletonLoader from '../widgets/SkeletonLoader.vue';
import MenuThreed from './MenuThreed.vue';
export default {
  components: { MenuThreed, SkeletonLoader },
  data() {
    return{
      tab: "a2z",
      adviseHelp: [
        {
          id: 20231,
          name: 'Paper size',
          path: '/paper-size'
        },
        {
          id: 20232,
          name: 'Enviromental Policy',
          path: '/enviromental_policy'
        },
        {
          id: 20233,
          name: 'Return Policy',
          path: '/return-policy'
        },
        {
          id: 20234,
          name: 'White Label',
          path: '/white-label-packaging'
        },
        {
          id: 20235,
          name: 'Design & Proofing',
          path: '/design-and-proofing'
        },
      ],
    };
  },
  computed:{
    ...mapGetters('category', ['menu_category', 'category', 'a2z_categories', 'recycled_category', 'discounted_category', 'most_popular_category'])
  },
};
</script>

<style scoped>
.card-columns {
  column-count: 4;
  column-gap: 0;
}

.text-uppercase.title {
  font-size: 1rem;
  font-weight: 600;
}

.advise-menu {
  position: absolute;
  width: 175px;
  top: 100%;
  left: 0;
  background: #FFF;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  display: none;
}

.advise-menu li a {
  font-family: 'Value_sans' !important;
  font-size: 1rem !important;
  line-height: 1.2 !important;
  font-weight: 400;
}

.advise-menu li a:hover {
  background-color: #f1f1f1;
}

.menu-item:hover .advise-menu {
  display: block !important;
}

@media (max-width: 1024px) {
  .card-columns {
    column-count: 3;
  }
}

@media (max-width: 768px) {
  .card-columns {
    column-count: 2;
  }
}

ul {
  list-style-type: none;
  gap: 2rem;
}

li {
  font-size: 14px;
  font-weight: 500;
}

li:hover .category-block {
  display: block;
}

.menu-loading {
  height: 19.2px;
  width: 100px;
  background-color: #ddd;
  border-radius: 4px;
}

.category-block {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  z-index: 13;
  transition: all 0.5 ease;
}

.advice-block {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  z-index: 13;
  transition: all 0.5 ease;
}

.category-white-block {
  width: 100%;
  max-height: 500px;
  background: #fff;
  border-bottom: 5px solid #e13f6e;
}

.cate-link {
  border-radius: 20px;
}

.cate-link:hover {
  border-radius: 20px;
  background: rgba(225, 63, 110, 0.3);
}

.category-block .tabs {
  padding: 8px 20px;
  background-color: #eee;
  margin-right: 2rem;
  border-radius: 20px;
  color: #252525;
  cursor: pointer;
}

.category-block .tabs.active {
  background-color: #e13f6e;
  color: white;
}

.scroll-container {
  max-height: 400px;
  overflow: auto;
}

.scroll-container::-webkit-scrollbar {
  width: 3px;
}

/* Track */
.scroll-container::-webkit-scrollbar-track {
  background: rgba(225, 63, 110, 0.1);
  border-radius: 3px;
}

/* Handle */
.scroll-container::-webkit-scrollbar-thumb {
  background: rgba(225, 63, 110, 0.3);
  border-radius: 10px;
}

/* Handle on hover */
.scroll-container::-webkit-scrollbar-thumb:hover {
  background: #b30000;
}

.category-block p {
  text-align: center;
  color: #636363;
}

.sticky {
  position: sticky;
  top: 61px;
  z-index: 12;
}
</style>
