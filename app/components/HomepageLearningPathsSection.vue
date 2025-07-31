<template>
  <section class="py-16 lg:py-20">
    <UContainer>
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-12">
          <h2
            class="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            {{ $t("homepage.learningPaths.title") }}
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {{ $t("homepage.learningPaths.subtitle") }}
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Frontend Development Path -->
          <div
            class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200"
          >
            <div class="flex items-center gap-3 mb-4">
              <div
                class="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center"
              >
                <UIcon
                  name="i-heroicons-code-bracket"
                  class="w-5 h-5 text-blue-600 dark:text-blue-400"
                />
              </div>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                {{ $t("homepage.learningPaths.frontend.title") }}
              </h3>
            </div>
            <p class="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
              {{ $t("homepage.learningPaths.frontend.description") }}
            </p>
            <div class="flex flex-wrap gap-2 mb-4">
              <UBadge size="sm" color="info" variant="soft">Vue.js</UBadge>
              <UBadge size="sm" color="info" variant="soft">React</UBadge>
              <UBadge size="sm" color="info" variant="soft">TypeScript</UBadge>
            </div>
            <div class="text-sm text-gray-500 dark:text-gray-400">
              {{ $t("homepage.learningPaths.frontend.duration") }} •
              {{ $t("homepage.learningPaths.frontend.level") }}
            </div>
          </div>

          <!-- Backend Development Path -->
          <div
            class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md hover:border-green-300 dark:hover:border-green-600 transition-all duration-200"
          >
            <div class="flex items-center gap-3 mb-4">
              <div
                class="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center"
              >
                <UIcon
                  name="i-heroicons-server"
                  class="w-5 h-5 text-green-600 dark:text-green-400"
                />
              </div>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                {{ $t("homepage.learningPaths.backend.title") }}
              </h3>
            </div>
            <p class="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
              {{ $t("homepage.learningPaths.backend.description") }}
            </p>
            <div class="flex flex-wrap gap-2 mb-4">
              <UBadge size="sm" color="success" variant="soft">Node.js</UBadge>
              <UBadge size="sm" color="success" variant="soft">Python</UBadge>
              <UBadge size="sm" color="success" variant="soft">APIs</UBadge>
            </div>
            <div class="text-sm text-gray-500 dark:text-gray-400">
              {{ $t("homepage.learningPaths.backend.duration") }} •
              {{ $t("homepage.learningPaths.backend.level") }}
            </div>
          </div>

          <!-- Full-Stack Development Path -->
          <div
            class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-200"
          >
            <div class="flex items-center gap-3 mb-4">
              <div
                class="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center"
              >
                <UIcon
                  name="i-heroicons-globe-alt"
                  class="w-5 h-5 text-purple-600 dark:text-purple-400"
                />
              </div>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                {{ $t("homepage.learningPaths.fullstack.title") }}
              </h3>
            </div>
            <p class="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
              {{ $t("homepage.learningPaths.fullstack.description") }}
            </p>
            <div class="flex flex-wrap gap-2 mb-4">
              <UBadge size="sm" color="primary" variant="soft">Vue+Nuxt</UBadge>
              <UBadge size="sm" color="primary" variant="soft"
                >Databases</UBadge
              >
              <UBadge size="sm" color="primary" variant="soft">DevOps</UBadge>
            </div>
            <div class="text-sm text-gray-500 dark:text-gray-400">
              {{ $t("homepage.learningPaths.fullstack.duration") }} •
              {{ $t("homepage.learningPaths.fullstack.level") }}
            </div>
          </div>
        </div>

        <div class="text-center mt-12">
          <UButton
            :to="localePath('/courses')"
            size="lg"
            class="bg-green-400 hover:bg-green-500 text-white font-semibold py-3 px-8 rounded-md transition-colors duration-200"
          >
            {{ $t("homepage.learningPaths.startLearning") }}
          </UButton>
        </div>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n();
const localePath = useLocalePath();
</script>
