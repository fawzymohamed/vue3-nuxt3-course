<script setup lang="ts">
const { t } = useI18n();
const localePath = useLocalePath();

// SEO Meta for homepage with i18n
useHead({
  title: t("homepage.meta.title"),
  meta: [
    {
      name: "description",
      content: t("homepage.meta.description"),
    },
  ],
});
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section
      class="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-16 lg:py-24"
    >
      <UContainer>
        <div class="max-w-4xl mx-auto text-center">
          <h1
            class="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-6"
          >
            {{ $t("homepage.hero.title") }}
            <span class="text-green-400">{{
              $t("homepage.hero.titleHighlight")
            }}</span>
          </h1>

          <p
            class="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8 max-w-3xl mx-auto"
          >
            {{ $t("homepage.hero.subtitle") }}
          </p>

          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <UButton
              :to="localePath('/courses')"
              size="xl"
              class="bg-green-400 hover:bg-green-500 text-white font-semibold py-3 px-8 rounded-md transition-colors duration-200"
            >
              {{ $t("homepage.hero.cta") }}
            </UButton>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- Course Overview/Benefits Section -->
    <section class="py-16 lg:py-20">
      <UContainer>
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-12">
            <h2
              class="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            >
              {{ $t("homepage.benefits.title") }}
            </h2>
            <p
              class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            >
              {{ $t("homepage.benefits.subtitle") }}
            </p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <!-- Benefit Card 1 -->
            <div
              class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200"
            >
              <div
                class="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4"
              >
                <UIcon
                  name="i-heroicons-academic-cap"
                  class="w-6 h-6 text-green-600 dark:text-green-400"
                />
              </div>
              <h3
                class="text-xl font-semibold text-gray-900 dark:text-white mb-3"
              >
                {{ $t("homepage.benefits.comprehensive.title") }}
              </h3>
              <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                {{ $t("homepage.benefits.comprehensive.description") }}
              </p>
            </div>

            <!-- Benefit Card 2 -->
            <div
              class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200"
            >
              <div
                class="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4"
              >
                <UIcon
                  name="i-heroicons-code-bracket"
                  class="w-6 h-6 text-green-600 dark:text-green-400"
                />
              </div>
              <h3
                class="text-xl font-semibold text-gray-900 dark:text-white mb-3"
              >
                {{ $t("homepage.benefits.handson.title") }}
              </h3>
              <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                {{ $t("homepage.benefits.handson.description") }}
              </p>
            </div>

            <!-- Benefit Card 3 -->
            <div
              class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200"
            >
              <div
                class="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4"
              >
                <UIcon
                  name="i-heroicons-sparkles"
                  class="w-6 h-6 text-green-600 dark:text-green-400"
                />
              </div>
              <h3
                class="text-xl font-semibold text-gray-900 dark:text-white mb-3"
              >
                {{ $t("homepage.benefits.modern.title") }}
              </h3>
              <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                {{ $t("homepage.benefits.modern.description") }}
              </p>
            </div>

            <!-- Benefit Card 4 -->
            <div
              class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200"
            >
              <div
                class="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4"
              >
                <UIcon
                  name="i-heroicons-user-group"
                  class="w-6 h-6 text-green-600 dark:text-green-400"
                />
              </div>
              <h3
                class="text-xl font-semibold text-gray-900 dark:text-white mb-3"
              >
                {{ $t("homepage.benefits.expert.title") }}
              </h3>
              <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                {{ $t("homepage.benefits.expert.description") }}
              </p>
            </div>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- Curriculum Sneak Peek Section -->
    <section id="modules" class="py-16 lg:py-20 bg-gray-50 dark:bg-gray-900">
      <UContainer>
        <div class="max-w-4xl mx-auto">
          <div class="text-center mb-12">
            <h2
              class="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            >
              {{ $t("homepage.modules.title") }}
            </h2>
            <p class="text-lg text-gray-600 dark:text-gray-300">
              {{ $t("homepage.modules.subtitle") }}
            </p>
          </div>

          <div class="space-y-6">
            <!-- Module 1 -->
            <div
              class="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-600 transition-colors duration-200"
            >
              <div class="flex items-start gap-4">
                <div
                  class="w-10 h-10 bg-green-400 text-white rounded-lg flex items-center justify-center font-bold text-lg flex-shrink-0"
                >
                  1
                </div>
                <div>
                  <h3
                    class="text-xl font-semibold text-gray-900 dark:text-white mb-2"
                  >
                    {{ $t("homepage.modules.module1.title") }}
                  </h3>
                  <p class="text-gray-600 dark:text-gray-300">
                    {{ $t("homepage.modules.module1.description") }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Module 2 -->
            <div
              class="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-600 transition-colors duration-200"
            >
              <div class="flex items-start gap-4">
                <div
                  class="w-10 h-10 bg-green-400 text-white rounded-lg flex items-center justify-center font-bold text-lg flex-shrink-0"
                >
                  2
                </div>
                <div>
                  <h3
                    class="text-xl font-semibold text-gray-900 dark:text-white mb-2"
                  >
                    {{ $t("homepage.modules.module2.title") }}
                  </h3>
                  <p class="text-gray-600 dark:text-gray-300">
                    {{ $t("homepage.modules.module2.description") }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Module 3 -->
            <div
              class="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-600 transition-colors duration-200"
            >
              <div class="flex items-start gap-4">
                <div
                  class="w-10 h-10 bg-green-400 text-white rounded-lg flex items-center justify-center font-bold text-lg flex-shrink-0"
                >
                  3
                </div>
                <div>
                  <h3
                    class="text-xl font-semibold text-gray-900 dark:text-white mb-2"
                  >
                    {{ $t("homepage.modules.module3.title") }}
                  </h3>
                  <p class="text-gray-600 dark:text-gray-300">
                    {{ $t("homepage.modules.module3.description") }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- Final CTA Section -->
    <section class="py-16 lg:py-20">
      <UContainer>
        <div class="max-w-3xl mx-auto text-center">
          <h3
            class="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6"
          >
            {{ $t("homepage.finalCta.title") }}
          </h3>
          <p
            class="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
          >
            {{ $t("homepage.finalCta.subtitle") }}
          </p>

          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <UButton
              :to="localePath('/curriculum')"
              size="lg"
              class="bg-green-400 hover:bg-green-500 text-white font-semibold py-3 px-8 rounded-md transition-colors duration-200"
            >
              {{ $t("homepage.finalCta.primaryCta") }}
            </UButton>
            <UButton
              :to="{ path: localePath('/'), hash: '#modules' }"
              variant="outline"
              size="lg"
              class="border-green-400 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 py-3 px-8 rounded-md transition-colors duration-200"
            >
              {{ $t("homepage.finalCta.secondaryCta") }}
            </UButton>
          </div>
        </div>
      </UContainer>
    </section>
  </div>
</template>
