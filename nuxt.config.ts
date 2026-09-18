// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/i18n', '@tresjs/nuxt'],
  css: ['~/assets/css/museum.css'],
  i18n: {
    bundle: { optimizeTranslationDirective: false },
    locales: [
      { code: 'en', language: 'en-US', dir: 'ltr', name: 'English' },
      { code: 'fa', language: 'fa-IR', dir: 'rtl', name: 'فارسی' },
    ],
    defaultLocale: 'en',
    vueI18n: 'i18n.config.ts',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'museum_locale',
      redirectOn: 'root',
    },
  },
  app: {
    head: {
      title: 'Iranian Military Technology — Digital Museum',
      meta: [
        {
          name: 'description',
          content:
            'An interactive digital museum of Iranian military technology — archival, historical, educational.',
        },
      ],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    },
  },
  tres: {
    glslVersion: '300 es',
  },
  nitro: {
    // Cloudflare Workers (default). Pages-style output: NITRO_PRESET=cloudflare-pages. Local Node: NITRO_PRESET=node-server
    preset: process.env.NITRO_PRESET || 'cloudflare_module',
    prerender: {
      crawlLinks: true,
    },
  },
})
