// https://nuxt.com/docs/guide/directory-structure/app-config
export default defineAppConfig({
  ui: {
    // Use Nuxt Green as the primary color as specified in the project requirements
    colors: {
      primary: "green", // Nuxt Green
      neutral: "slate", // Dark grays for text and UI chrome
    },
    // Configure custom icons for components
    icons: {
      // Default icons used by components
      arrowLeft: "i-lucide-arrow-left",
      arrowRight: "i-lucide-arrow-right",
      check: "i-lucide-check",
      chevronDown: "i-lucide-chevron-down",
      chevronLeft: "i-lucide-chevron-left",
      chevronRight: "i-lucide-chevron-right",
      chevronUp: "i-lucide-chevron-up",
      close: "i-lucide-x",

      // Additional icons
      success: "i-lucide-circle-check",
      info: "i-lucide-info",
      warning: "i-lucide-triangle-alert",
      error: "i-lucide-circle-x",

      // Custom icons for our learning platform
      lesson: "i-lucide-book-open",
      quiz: "i-lucide-help-circle",
      exercise: "i-lucide-code",
      course: "i-heroicons-academic-cap",
      resource: "i-lucide-link",
    },
  },
});
