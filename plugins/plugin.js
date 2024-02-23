
// import { StripeCheckout, StripePlugin } from '@vue-stripe/vue-stripe';
import VueTyperPlugin from 'vue-typer'
import Vue from 'vue'
import ReadMore from 'vue-read-more';
import Toast from "vue-toastification";
import OwlCarousel from 'v-owl-carousel';
import "vue-toastification/dist/index.css";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
// import GridLoader from 'vue-spinner/src/GridLoader.vue'
// import ClipLoader from 'vue-spinner/src/ClipLoader.vue'
// import RiseLoader from 'vue-spinner/src/RiseLoader.vue'
// import BeatLoader from 'vue-spinner/src/BeatLoader.vue'
// import SyncLoader from 'vue-spinner/src/SyncLoader.vue'
// import RotateLoader from 'vue-spinner/src/RotateLoader.vue'
// import FadeLoader from 'vue-spinner/src/FadeLoader.vue'
// import PacmanLoader from 'vue-spinner/src/PacmanLoader.vue'
// import SquareLoader from 'vue-spinner/src/SquareLoader.vue'
// import ScaleLoader from 'vue-spinner/src/ScaleLoader.vue'
// import SkewLoader from 'vue-spinner/src/SkewLoader.vue'
// import MoonLoader from 'vue-spinner/src/MoonLoader.vue'
// import RingLoader from 'vue-spinner/src/RingLoader.vue'
// import BounceLoader from 'vue-spinner/src/BounceLoader.vue'
// import DotLoader from 'vue-spinner/src/DotLoader.vue'
import vClickOutside from 'v-click-outside'
import Vuelidate from 'vuelidate';
export const eventBus = new Vue();
Vue.use(Vuelidate);
Vue.use(vClickOutside)
const option = {
    timeout: 4000
};
// const options = {
//     pk: 'pk_test_51M415XFY5nXFNwZCbzVpKnahEkHEjfYD5YFQPOh4WYlKyZRzEWgn8EMoRazVExII160I46EHAxlsO3lVAKzRAVdK00uXCWiGfg',
//     stripeAccount: process.env.STRIPE_ACCOUNT,
//     apiVersion: process.env.API_VERSION,
//     locale: process.env.LOCALE,
//   };
Vue.use(require('vue-moment'));
Vue.use(Toast, option);
Vue.use(ReadMore);
Vue.use(VueTyperPlugin)
// Vue.use(StripeCheckout, options, StripePlugin);
Vue.use(BootstrapVue)
// Vue.use(PulseLoader);
// Vue.use(RingLoader);
// Vue.use(BounceLoader);
// Vue.use(GridLoader);
// Vue.use(ClipLoader);
// Vue.use(RiseLoader);
// Vue.use(BeatLoader,);
// Vue.use(SyncLoader);
// Vue.use(RotateLoader);
// Vue.use(FadeLoader);
// Vue.use(PacmanLoader);
// Vue.use(SquareLoader);
// Vue.use(ScaleLoader);
// Vue.use(SkewLoader);
// Vue.use(MoonLoader);
// Vue.use(DotLoader);
 
Vue.component('carousel', OwlCarousel)