import { SiteMap_Urls } from "./utils/sitemap";

export default {
  // target: 'server',
  ssr: true,
  head: {
    htmlAttrs: {
      lang: 'en'
    },
    // title: "Digital Press",
    meta: [
      { charset: "utf-8" },
      // { hid:name: "description", content: 'Digitalpress is the most reliable online printing company in the UK, we offer competitive rates, superior quality, and  fast delivery across the UK for every order. Choose us as your online printing service for premium products at unbeatable prices. Discover more about our offerings today!' },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { 'http-equiv': "X-UA-Compatible", content: "IE=edge" },
      { name: "x-apple-disable-message-reformatting" },
      { name: "p:domain_verify", content: "8cb31dc748f7dc74e8c56a089517fe1e" },
      { name: "google-site-verification", content: "GpcCBVsG0tmCwahQCcoZyQOIIprKD1u5BPME2flPSys" },
    ],
    pwa: { icon: { source: '~/static/favicon.ico' } },
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href: "https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.4.1/css/bootstrap.min.css",
      },
      {
        rel: "stylesheet",
        href: "https://pro.fontawesome.com/releases/v5.11.0/css/all.css",
      },
    ],
  },
  env: {
    BACKEND_URL: process.env.BACKEND_URL || 'http://localhost:8000',
    S3_URL: process.env.S3_URL,
    gtmId: process.env.GTM_ID,
    ADDRESS: process.env.ADDRESS || '',
    STRIPE_PK: process.env.STRIPE_PK,
  },
  // generate: { fallback: '404.html' },

  middleware: ['scrollToTopMiddleware'],

  css: [
    "~/assets/css/custom.min.css",
    "~/assets/css/style.css",
    "~/assets/css/developer.css",
  ],
  plugins: [
    {
      src: '~/plugins/gtm.js',
      mode: 'client'
    },
    { src: "plugins/plugin.js", mode: 'client' },
    { src: "plugins/click-outside.js", mode: 'client' },
    { src: "plugins/removeInactiveItems.js", mode: 'client' },
  ],
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/gtm',
    'bootstrap-vue/nuxt',
    "@nuxtjs/axios",
    '@nuxtjs/sitemap'
  ],
  sitemap: {
    hostname: 'https://digitalpress.co.uk/',
    gzip: true,
    exclude: [
      '/forgot_password',
      '/cart',
      '/cart/**',
      '/dashboard',
      '/dashboard/**',
      '/home',
      '/signin',
      '/signup',
      '/forgot_password',
      '/proofing/**',
      '/proofing',
      '/reset-password',
      '/order-invoice/**',
      '/order-invoice',
      '/quotation',
      '/quotation/**',
    ],
    routes: SiteMap_Urls
  },
  router: {
    base: "/", mode: 'history', prefetchLinks: true, extendRoutes(routes, resolve) {
      routes.push({
        path: '/home',
        redirect: '/'
      })
    }
  },
  axios: {
    baseURL: "/",
  },
  build: {
    transpile: [
      "vee-validate/dist/rules",
      "vee-validate.js",
    ],
  },
  serverMiddleware: [
    '~/servermiddleware/render.js'
  ],
  loading: { loading: "~/components/LoadingBar.vue", }
};
