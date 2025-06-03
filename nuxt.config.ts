// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true }, // Configure for static site generation  ssr: true,
  nitro: {
    preset: "vercel",
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
    locales: [
      {
        code: "ar",
        name: "Arabic",
        file: "ar.json",
      },
      {
        code: "en",
        name: "English",
        file: "en.json",
      },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root",
      cookieCrossOrigin: true,
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
        dir: "./assets/icons",
      },
    ],
  },
});
