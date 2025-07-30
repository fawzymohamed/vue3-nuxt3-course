<script setup lang="ts">
const localePath = useLocalePath();
const appConfig = useAppConfig();

// Redirect to home page in production
if (import.meta.env.PROD) {
  await navigateTo(localePath("/"));
}

// SEO Meta for icons examples page (only in development)
useHead({
  title: "Learnova Academy - Icons System",
  meta: [
    {
      name: "description",
      content:
        "Complete guide to using icons in Learnova Academy project - Heroicons, Lucide, custom icons, and more.",
    },
    {
      name: "robots",
      content: "noindex, nofollow", // Prevent indexing even if accessible
    },
  ],
});
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Header -->
    <section
      class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700"
    >
      <UContainer>
        <div class="py-12">
          <!-- Dev Mode Badge -->
          <div class="mb-4">
            <span
              class="inline-flex items-center gap-2 px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 text-sm font-medium rounded-full border border-orange-200 dark:border-orange-800"
            >
              <UIcon name="i-lucide-code" class="w-4 h-4" />
              Development Mode Only
            </span>
          </div>

          <!-- Breadcrumb -->
          <nav class="mb-4">
            <ol
              class="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400"
            >
              <li>
                <NuxtLink
                  :to="localePath('/examples')"
                  class="hover:text-gray-700 dark:hover:text-gray-300"
                >
                  Examples
                </NuxtLink>
              </li>
              <li class="flex items-center">
                <UIcon name="i-lucide-chevron-right" class="w-4 h-4 mx-2" />
                <span class="text-gray-700 dark:text-gray-300"
                  >Icon System</span
                >
              </li>
            </ol>
          </nav>

          <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Icon System Examples
          </h1>
          <p class="text-lg text-gray-600 dark:text-gray-300 max-w-3xl">
            Complete guide to using all types of icons available in this
            Learnova Academy project. Each section shows implementation examples
            with detailed explanations.
          </p>
        </div>
      </UContainer>
    </section>

    <!-- Icon Examples -->
    <section class="py-16">
      <UContainer>
        <div class="max-w-6xl mx-auto space-y-16">
          <!-- 1. Heroicons Collection -->
          <div
            class="bg-white dark:bg-gray-800 rounded-lg p-8 border border-gray-200 dark:border-gray-700"
          >
            <div class="mb-8">
              <h2
                class="text-2xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-3"
              >
                <UIcon
                  name="i-heroicons-academic-cap"
                  class="w-6 h-6 text-blue-500"
                />
                Heroicons Collection
              </h2>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Beautiful hand-crafted SVG icons by the makers of Tailwind CSS.
                Two styles available: outline and solid.
              </p>
              <div
                class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4"
              >
                <p class="text-sm text-blue-800 dark:text-blue-200">
                  <strong>Resource:</strong>
                  <a
                    href="https://heroicons.com/"
                    target="_blank"
                    class="underline hover:no-underline"
                  >
                    https://heroicons.com/
                  </a>
                </p>
                <p class="text-sm text-blue-800 dark:text-blue-200 mt-1">
                  <strong>Format:</strong>
                  <code class="bg-blue-100 dark:bg-blue-800 px-1 rounded"
                    >i-heroicons-{icon-name}</code
                  >
                </p>
              </div>
            </div>

            <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              <!-- Heroicons Examples -->
              <div class="text-center space-y-2">
                <UIcon
                  name="i-heroicons-academic-cap"
                  class="w-8 h-8 text-indigo-500 mx-auto"
                />
                <code class="text-xs text-gray-500 block">academic-cap</code>
              </div>
              <div class="text-center space-y-2">
                <UIcon
                  name="i-heroicons-code-bracket"
                  class="w-8 h-8 text-green-500 mx-auto"
                />
                <code class="text-xs text-gray-500 block">code-bracket</code>
              </div>
              <div class="text-center space-y-2">
                <UIcon
                  name="i-heroicons-sparkles"
                  class="w-8 h-8 text-purple-500 mx-auto"
                />
                <code class="text-xs text-gray-500 block">sparkles</code>
              </div>
              <div class="text-center space-y-2">
                <UIcon
                  name="i-heroicons-user-group"
                  class="w-8 h-8 text-orange-500 mx-auto"
                />
                <code class="text-xs text-gray-500 block">user-group</code>
              </div>
              <div class="text-center space-y-2">
                <UIcon
                  name="i-heroicons-arrow-right"
                  class="w-8 h-8 text-red-500 mx-auto"
                />
                <code class="text-xs text-gray-500 block">arrow-right</code>
              </div>
              <div class="text-center space-y-2">
                <UIcon
                  name="i-heroicons-heart"
                  class="w-8 h-8 text-pink-500 mx-auto"
                />
                <code class="text-xs text-gray-500 block">heart</code>
              </div>
            </div>

            <!-- Usage Example -->
            <div class="mt-6 bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h4 class="font-semibold text-gray-900 dark:text-white mb-2">
                Usage Example:
              </h4>
              <pre
                class="text-sm text-gray-700 dark:text-gray-300 overflow-x-auto"
              ><code>&lt;UIcon name="i-heroicons-academic-cap" class="w-6 h-6 text-indigo-500" /&gt;</code></pre>
            </div>
          </div>

          <!-- 2. Lucide Icons Collection -->
          <div
            class="bg-white dark:bg-gray-800 rounded-lg p-8 border border-gray-200 dark:border-gray-700"
          >
            <div class="mb-8">
              <h2
                class="text-2xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-3"
              >
                <UIcon
                  name="i-lucide-feather"
                  class="w-6 h-6 text-emerald-500"
                />
                Lucide Icons Collection
              </h2>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Beautiful & consistent icon toolkit made by the community.
                Clean, minimal, and highly customizable.
              </p>
              <div
                class="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg p-4"
              >
                <p class="text-sm text-emerald-800 dark:text-emerald-200">
                  <strong>Resource:</strong>
                  <a
                    href="https://lucide.dev/icons/"
                    target="_blank"
                    class="underline hover:no-underline"
                  >
                    https://lucide.dev/icons/
                  </a>
                </p>
                <p class="text-sm text-emerald-800 dark:text-emerald-200 mt-1">
                  <strong>Format:</strong>
                  <code class="bg-emerald-100 dark:bg-emerald-800 px-1 rounded"
                    >i-lucide-{icon-name}</code
                  >
                </p>
              </div>
            </div>

            <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              <!-- Lucide Examples -->
              <div class="text-center space-y-2">
                <UIcon
                  name="i-lucide-book-open"
                  class="w-8 h-8 text-blue-500 mx-auto"
                />
                <code class="text-xs text-gray-500 block">book-open</code>
              </div>
              <div class="text-center space-y-2">
                <UIcon
                  name="i-lucide-arrow-left"
                  class="w-8 h-8 text-gray-500 mx-auto"
                />
                <code class="text-xs text-gray-500 block">arrow-left</code>
              </div>
              <div class="text-center space-y-2">
                <UIcon
                  name="i-lucide-check"
                  class="w-8 h-8 text-green-500 mx-auto"
                />
                <code class="text-xs text-gray-500 block">check</code>
              </div>
              <div class="text-center space-y-2">
                <UIcon
                  name="i-lucide-code"
                  class="w-8 h-8 text-purple-500 mx-auto"
                />
                <code class="text-xs text-gray-500 block">code</code>
              </div>
              <div class="text-center space-y-2">
                <UIcon
                  name="i-lucide-help-circle"
                  class="w-8 h-8 text-orange-500 mx-auto"
                />
                <code class="text-xs text-gray-500 block">help-circle</code>
              </div>
              <div class="text-center space-y-2">
                <UIcon
                  name="i-lucide-star"
                  class="w-8 h-8 text-yellow-500 mx-auto"
                />
                <code class="text-xs text-gray-500 block">star</code>
              </div>
            </div>

            <!-- Usage Example -->
            <div class="mt-6 bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h4 class="font-semibold text-gray-900 dark:text-white mb-2">
                Usage Example:
              </h4>
              <pre
                class="text-sm text-gray-700 dark:text-gray-300 overflow-x-auto"
              ><code>&lt;UIcon name="i-lucide-book-open" class="w-6 h-6 text-blue-500" /&gt;</code></pre>
            </div>
          </div>

          <!-- 3. App Config Shortcuts -->
          <div
            class="bg-white dark:bg-gray-800 rounded-lg p-8 border border-gray-200 dark:border-gray-700"
          >
            <div class="mb-8">
              <h2
                class="text-2xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-3"
              >
                <UIcon
                  name="i-lucide-settings"
                  class="w-6 h-6 text-amber-500"
                />
                App Config Shortcuts
              </h2>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Pre-defined icon shortcuts configured in
                <code class="bg-gray-200 dark:bg-gray-600 px-1 rounded"
                  >app.config.ts</code
                >. Use these for consistent icon usage across components.
              </p>
              <div
                class="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4"
              >
                <p class="text-sm text-amber-800 dark:text-amber-200">
                  <strong>Configuration:</strong>
                  <code class="bg-amber-100 dark:bg-amber-800 px-1 rounded"
                    >app/app.config.ts → ui.icons</code
                  >
                </p>
                <p class="text-sm text-amber-800 dark:text-amber-200 mt-1">
                  <strong>Usage:</strong>
                  <code class="bg-amber-100 dark:bg-amber-800 px-1 rounded"
                    >appConfig.ui.icons.{shortcut}</code
                  >
                </p>
              </div>
            </div>

            <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              <!-- App Config Examples -->
              <div class="text-center space-y-2">
                <UIcon
                  :name="appConfig.ui.icons.arrowLeft"
                  class="w-8 h-8 text-gray-500 mx-auto"
                />
                <code class="text-xs text-gray-500 block">arrowLeft</code>
              </div>
              <div class="text-center space-y-2">
                <UIcon
                  :name="appConfig.ui.icons.check"
                  class="w-8 h-8 text-green-500 mx-auto"
                />
                <code class="text-xs text-gray-500 block">check</code>
              </div>
              <div class="text-center space-y-2">
                <UIcon
                  :name="appConfig.ui.icons.lesson"
                  class="w-8 h-8 text-blue-500 mx-auto"
                />
                <code class="text-xs text-gray-500 block">lesson</code>
              </div>
              <div class="text-center space-y-2">
                <UIcon
                  :name="appConfig.ui.icons.quiz"
                  class="w-8 h-8 text-purple-500 mx-auto"
                />
                <code class="text-xs text-gray-500 block">quiz</code>
              </div>
              <div class="text-center space-y-2">
                <UIcon
                  :name="appConfig.ui.icons.course"
                  class="w-8 h-8 text-indigo-500 mx-auto"
                />
                <code class="text-xs text-gray-500 block">course</code>
              </div>
              <div class="text-center space-y-2">
                <UIcon
                  :name="appConfig.ui.icons.close"
                  class="w-8 h-8 text-red-500 mx-auto"
                />
                <code class="text-xs text-gray-500 block">close</code>
              </div>
            </div>

            <!-- Usage Example -->
            <div class="mt-6 bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h4 class="font-semibold text-gray-900 dark:text-white mb-2">
                Usage Example:
              </h4>
              <pre
                class="text-sm text-gray-700 dark:text-gray-300 overflow-x-auto"
              ><code>const appConfig = useAppConfig();
&lt;UIcon :name="appConfig.ui.icons.arrowLeft" class="w-6 h-6" /&gt;</code></pre>
            </div>
          </div>

          <!-- 4. Custom Icons -->
          <div
            class="bg-white dark:bg-gray-800 rounded-lg p-8 border border-gray-200 dark:border-gray-700"
          >
            <div class="mb-8">
              <h2
                class="text-2xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-3"
              >
                <UIcon name="custom-nuxt-logo" class="w-6 h-6 text-green-500" />
                Custom Icons
              </h2>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Project-specific custom SVG icons stored in
                <code class="bg-gray-200 dark:bg-gray-600 px-1 rounded"
                  >app/assets/icons/</code
                >. Perfect for brand logos and unique icons.
              </p>
              <div
                class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4"
              >
                <p class="text-sm text-green-800 dark:text-green-200">
                  <strong>Location:</strong>
                  <code class="bg-green-100 dark:bg-green-800 px-1 rounded"
                    >app/assets/icons/*.svg</code
                  >
                </p>
                <p class="text-sm text-green-800 dark:text-green-200 mt-1">
                  <strong>Format:</strong>
                  <code class="bg-green-100 dark:bg-green-800 px-1 rounded"
                    >custom-{filename}</code
                  >
                </p>
              </div>
            </div>

            <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              <!-- Custom Icons Examples -->
              <div class="text-center space-y-2">
                <UIcon
                  name="custom-nuxt-logo"
                  class="w-8 h-8 text-green-500 mx-auto"
                />
                <code class="text-xs text-gray-500 block">nuxt-logo</code>
              </div>
              <div class="text-center space-y-2">
                <UIcon
                  name="custom-vue-logo"
                  class="w-8 h-8 text-emerald-500 mx-auto"
                />
                <code class="text-xs text-gray-500 block">vue-logo</code>
              </div>
              <div class="text-center space-y-2">
                <UIcon
                  name="custom-learn"
                  class="w-8 h-8 text-blue-500 mx-auto"
                />
                <code class="text-xs text-gray-500 block">learn</code>
              </div>
            </div>

            <!-- Usage Example -->
            <div class="mt-6 bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h4 class="font-semibold text-gray-900 dark:text-white mb-2">
                Usage Example:
              </h4>
              <pre
                class="text-sm text-gray-700 dark:text-gray-300 overflow-x-auto"
              ><code>&lt;UIcon name="custom-nuxt-logo" class="w-6 h-6 text-green-500" /&gt;</code></pre>
            </div>

            <!-- Custom Icon Instructions -->
            <div
              class="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4"
            >
              <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                Adding New Custom Icons:
              </h4>
              <ol
                class="text-sm text-blue-800 dark:text-blue-200 space-y-1 list-decimal list-inside"
              >
                <li>
                  Add your SVG file to
                  <code class="bg-blue-100 dark:bg-blue-800 px-1 rounded"
                    >app/assets/icons/</code
                  >
                </li>
                <li>
                  Use filename without extension:
                  <code class="bg-blue-100 dark:bg-blue-800 px-1 rounded"
                    >my-icon.svg</code
                  >
                  →
                  <code class="bg-blue-100 dark:bg-blue-800 px-1 rounded"
                    >custom-my-icon</code
                  >
                </li>
                <li>Restart dev server to register new icons</li>
              </ol>
            </div>
          </div>

          <!-- 5. Additional Icon Collections -->
          <!-- <div
            class="bg-white dark:bg-gray-800 rounded-lg p-8 border border-gray-200 dark:border-gray-700"
          >
            <div class="mb-8">
              <h2
                class="text-2xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-3"
              >
                <UIcon
                  name="i-lucide-package"
                  class="w-6 h-6 text-violet-500"
                />
                Additional Icon Collections
              </h2>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Other popular icon collections available through Iconify. You
                can use any of these without additional setup.
              </p>
            </div>

            <div class="grid md:grid-cols-2 gap-6 mb-8">
              <div
                class="bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-800 rounded-lg p-4"
              >
                <h4
                  class="font-semibold text-violet-900 dark:text-violet-100 mb-3"
                >
                  🔍 Icon Discovery Tools
                </h4>
                <ul class="space-y-2 text-sm">
                  <li>
                    <a
                      href="https://icones.js.org/"
                      target="_blank"
                      class="text-violet-700 dark:text-violet-300 underline hover:no-underline"
                    >
                      Icônes Browser (Recommended)
                    </a>
                    <p class="text-violet-600 dark:text-violet-400 text-xs">
                      Search all icon collections at once
                    </p>
                  </li>
                  <li>
                    <a
                      href="https://iconify.design/"
                      target="_blank"
                      class="text-violet-700 dark:text-violet-300 underline hover:no-underline"
                    >
                      Iconify Official Site
                    </a>
                    <p class="text-violet-600 dark:text-violet-400 text-xs">
                      Main iconify documentation
                    </p>
                  </li>
                </ul>
              </div>

              <div
                class="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-4"
              >
                <h4
                  class="font-semibold text-indigo-900 dark:text-indigo-100 mb-3"
                >
                  📦 Popular Collections
                </h4>
                <ul
                  class="space-y-1 text-sm text-indigo-800 dark:text-indigo-200"
                >
                  <li>
                    <code class="bg-indigo-100 dark:bg-indigo-800 px-1 rounded"
                      >i-tabler-*</code
                    >
                    - Tabler Icons
                  </li>
                  <li>
                    <code class="bg-indigo-100 dark:bg-indigo-800 px-1 rounded"
                      >i-ph-*</code
                    >
                    - Phosphor Icons
                  </li>
                  <li>
                    <code class="bg-indigo-100 dark:bg-indigo-800 px-1 rounded"
                      >i-mdi-*</code
                    >
                    - Material Design
                  </li>
                  <li>
                    <code class="bg-indigo-100 dark:bg-indigo-800 px-1 rounded"
                      >i-bi-*</code
                    >
                    - Bootstrap Icons
                  </li>
                  <li>
                    <code class="bg-indigo-100 dark:bg-indigo-800 px-1 rounded"
                      >i-fa-*</code
                    >
                    - Font Awesome
                  </li>
                </ul>
              </div>
            </div>

            <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              <div class="text-center space-y-2">
                <UIcon
                  name="i-tabler-brand-github"
                  class="w-8 h-8 text-gray-800 dark:text-white mx-auto"
                />
                <code class="text-xs text-gray-500 block"
                  >tabler-brand-github</code
                >
              </div>
              <div class="text-center space-y-2">
                <UIcon
                  name="i-ph-lightning"
                  class="w-8 h-8 text-yellow-500 mx-auto"
                />
                <code class="text-xs text-gray-500 block">ph-lightning</code>
              </div>
              <div class="text-center space-y-2">
                <UIcon
                  name="i-mdi-nodejs"
                  class="w-8 h-8 text-green-600 mx-auto"
                />
                <code class="text-xs text-gray-500 block">mdi-nodejs</code>
              </div>
              <div class="text-center space-y-2">
                <UIcon
                  name="i-bi-discord"
                  class="w-8 h-8 text-indigo-500 mx-auto"
                />
                <code class="text-xs text-gray-500 block">bi-discord</code>
              </div>
            </div>
          </div> -->

          <!-- 6. Icon Best Practices -->
          <div
            class="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border border-green-200 dark:border-green-800 rounded-lg p-8"
          >
            <h2
              class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3"
            >
              <UIcon
                name="i-lucide-lightbulb"
                class="w-6 h-6 text-yellow-500"
              />
              Icon Usage Best Practices
            </h2>

            <div class="grid md:grid-cols-2 gap-8">
              <div>
                <h3
                  class="text-lg font-semibold text-green-700 dark:text-green-400 mb-4"
                >
                  ✅ Do
                </h3>
                <ul class="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li class="flex items-start gap-2">
                    <UIcon
                      name="i-lucide-check"
                      class="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0"
                    />
                    Use consistent sizing:
                    <code class="bg-gray-200 dark:bg-gray-600 px-1 rounded"
                      >w-4 h-4</code
                    >,
                    <code class="bg-gray-200 dark:bg-gray-600 px-1 rounded"
                      >w-6 h-6</code
                    >
                  </li>
                  <li class="flex items-start gap-2">
                    <UIcon
                      name="i-lucide-check"
                      class="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0"
                    />
                    Use app config shortcuts for commonly used icons
                  </li>
                  <li class="flex items-start gap-2">
                    <UIcon
                      name="i-lucide-check"
                      class="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0"
                    />
                    Add proper color classes for accessibility
                  </li>
                  <li class="flex items-start gap-2">
                    <UIcon
                      name="i-lucide-check"
                      class="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0"
                    />
                    Use semantic icon names that match their purpose
                  </li>
                </ul>
              </div>

              <div>
                <h3
                  class="text-lg font-semibold text-red-700 dark:text-red-400 mb-4"
                >
                  ❌ Don't
                </h3>
                <ul class="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li class="flex items-start gap-2">
                    <UIcon
                      name="i-lucide-x"
                      class="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0"
                    />
                    Mix different icon styles in the same component
                  </li>
                  <li class="flex items-start gap-2">
                    <UIcon
                      name="i-lucide-x"
                      class="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0"
                    />
                    Use very large custom icons without optimization
                  </li>
                  <li class="flex items-start gap-2">
                    <UIcon
                      name="i-lucide-x"
                      class="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0"
                    />
                    Hardcode icon colors when theme switching is important
                  </li>
                  <li class="flex items-start gap-2">
                    <UIcon
                      name="i-lucide-x"
                      class="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0"
                    />
                    Use decorative icons without considering accessibility
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- Back to Examples Hub -->
    <section class="py-8 border-t border-gray-200 dark:border-gray-700">
      <UContainer>
        <div class="text-center">
          <UButton
            :to="localePath('/examples')"
            variant="outline"
            size="lg"
            class="inline-flex items-center gap-2"
          >
            <UIcon :name="appConfig.ui.icons.arrowLeft" class="w-4 h-4" />
            Back to Examples Hub
          </UButton>
        </div>
      </UContainer>
    </section>
  </div>
</template>
