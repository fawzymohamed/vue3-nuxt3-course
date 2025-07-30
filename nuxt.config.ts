// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  ssr: true, // Ensure SSR is enabled

  // Configure srcDir to use the app directory (Nuxt 4 default)
  srcDir: "app/",

  // App configuration
  app: {
    head: {
      title: "VueNuxtMasters",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "format-detection", content: "telephone=no" },
        { name: "theme-color", content: "#00DC82" },
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "VueNuxtMasters" },
        { property: "og:image", content: "/logo.png" },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { property: "twitter:card", content: "summary_large_image" },
        { property: "twitter:site", content: "@VueNuxtMasters" },
        { property: "twitter:image", content: "/logo.png" },
      ],
      link: [
        { rel: "icon", type: "image/png", href: "/logo.png" },
        { rel: "apple-touch-icon", href: "/logo.png" },
        { rel: "mask-icon", href: "/logo.png", color: "#00DC82" },
      ],
    },
  },

  nitro: {
    preset: "vercel",
    publicAssets: [
      {
        baseURL: "/_nuxt",
        dir: ".nuxt/dist/client",
      },
      {
        baseURL: "/_fonts",
        dir: ".output/public/_fonts",
      },
    ],
  },

  modules: [
    "@nuxt/content",
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/scripts",
    "@nuxt/test-utils",
    "@nuxt/ui",
    "@nuxtjs/i18n",
  ],

  css: ["~/assets/css/main.css"],

  i18n: {
    defaultLocale: "en",
    strategy: "prefix_except_default",
    lazy: true,
    langDir: "../i18n/locales/",
    locales: [
      {
        code: "en",
        name: "English",
        file: "en.json",
        iso: "en-US",
      },
      {
        code: "ar",
        name: "Arabic",
        file: "ar.json",
        iso: "ar-SA",
        dir: "rtl",
      },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root",
      cookieCrossOrigin: true,
    },
    bundle: {
      optimizeTranslationDirective: false,
    },
  },

  // Color mode configuration
  colorMode: {
    classSuffix: "",
    fallback: "system", // defaults to system preference
    storageKey: "nuxt-color-mode",
  },

  // UI configuration
  ui: {
    // Define theme colors used throughout the application
    theme: {
      colors: [
        "primary",
        "secondary",
        "success",
        "info",
        "warning",
        "error",
        "neutral",
      ],
    },
  },

  // Icon configuration
  icon: {
    // Register a custom collection for our project-specific icons
    customCollections: [
      {
        prefix: "custom",
        dir: "./app/assets/icons",
      },
    ],
  },
});
