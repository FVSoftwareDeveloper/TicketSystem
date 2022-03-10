export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'TicketSystem',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // https://www.geeksforgeeks.org/how-to-add-datepicker-in-nuxtjs/
    { src: '~/plugins/vue-datepicker', ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://www.npmjs.com/package/@nuxtjs/router
    '@nuxtjs/router',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://auth.nuxtjs.org/guide/setup/
    '@nuxtjs/auth-next',
    // https://www.npmjs.com/package/nuxt-sweetalert2
    'nuxt-sweetalert2'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: 'http://localhost:8000',
  },
  // Auth module configuration: https://go.nuxtjs.dev/config-axios
  auth: {
    // Options    
    strategies: {
      'laravelJWT': {
        provider: 'laravel/jwt',
        url: 'http://localhost:8000',
        endpoints: {
          login: { url: '/api/auth/login', method: 'post', propertyName: 'data.token' },
          user: { url: '/api/auth/me', method: 'get', propertyName: 'data' }
        },
        token: {
          property: 'access_token',
          maxAge: 60 * 60
        },
        refreshToken: {
          maxAge: 20160 * 60
        },
        user: {
          property: 'user',
          autoFetch: false
        },
      },
    },
    redirect: {
      login: '/',
      logout: '/account/logout',
      callback: '/',
      home: '/account/home'
    }
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  routes:{
    middleware: 'auth'
  }

   
}
