<template>
  <section
    class="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-16 lg:py-24"
  >
    <UContainer>
      <div class="max-w-5xl mx-auto text-center">
        <h1
          class="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-6"
        >
          {{ $t("homepage.hero.title") }}
          <span class="text-green-400">{{
            $t("homepage.hero.titleHighlight")
          }}</span>
        </h1>

        <p
          class="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8 max-w-4xl mx-auto"
        >
          {{ $t("homepage.hero.subtitle") }}
        </p>

        <div class="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <UButton
            :to="localePath('/courses')"
            size="xl"
            class="bg-green-400 hover:bg-green-500 text-white font-semibold py-3 px-8 rounded-md transition-colors duration-200"
          >
            {{ $t("homepage.hero.primaryCta") }}
          </UButton>
          <UButton
            :to="localePath('/about')"
            variant="outline"
            size="xl"
            class="border-green-400 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 py-3 px-8 rounded-md transition-colors duration-200"
          >
            {{ $t("homepage.hero.secondaryCta") }}
          </UButton>
        </div>

        <!-- Platform Statistics -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
          <div class="text-center">
            <div class="text-3xl lg:text-4xl font-bold text-green-400 mb-2">
              {{ $t("homepage.stats.courses") }}
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-300">
              {{ $t("homepage.stats.coursesLabel") }}
            </div>
          </div>
          <div class="text-center">
            <div class="text-3xl lg:text-4xl font-bold text-green-400 mb-2">
              {{ $t("homepage.stats.students") }}
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-300">
              {{ $t("homepage.stats.studentsLabel") }}
            </div>
          </div>
          <div class="text-center">
            <div class="text-3xl lg:text-4xl font-bold text-green-400 mb-2">
              {{ $t("homepage.stats.languages") }}
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-300">
              {{ $t("homepage.stats.languagesLabel") }}
            </div>
          </div>
          <div class="text-center">
            <div class="text-3xl lg:text-4xl font-bold text-green-400 mb-2">
              {{ $t("homepage.stats.hours") }}
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-300">
              {{ $t("homepage.stats.hoursLabel") }}
            </div>
          </div>
        </div>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n();
const localePath = useLocalePath();
</script>
