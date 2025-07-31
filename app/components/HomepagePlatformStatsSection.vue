<template>
  <section class="py-16 lg:py-20 bg-green-50 dark:bg-green-900/10">
    <UContainer>
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-12">
          <h2
            class="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            {{ $t("homepage.platformStats.title") }}
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {{ $t("homepage.platformStats.subtitle") }}
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <!-- Total Courses -->
          <div class="text-center">
            <div
              class="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <UIcon
                name="i-heroicons-academic-cap"
                class="w-8 h-8 text-green-600 dark:text-green-400"
              />
            </div>
            <div class="text-4xl lg:text-5xl font-bold text-green-400 mb-2">
              {{ stats.totalCourses }}+
            </div>
            <div class="text-lg font-medium text-gray-900 dark:text-white mb-1">
              {{ $t("homepage.platformStats.courses.title") }}
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-300">
              {{ $t("homepage.platformStats.courses.description") }}
            </div>
          </div>

          <!-- Active Students -->
          <div class="text-center">
            <div
              class="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <UIcon
                name="i-heroicons-users"
                class="w-8 h-8 text-green-600 dark:text-green-400"
              />
            </div>
            <div class="text-4xl lg:text-5xl font-bold text-green-400 mb-2">
              {{ formatNumber(stats.activeStudents) }}+
            </div>
            <div class="text-lg font-medium text-gray-900 dark:text-white mb-1">
              {{ $t("homepage.platformStats.students.title") }}
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-300">
              {{ $t("homepage.platformStats.students.description") }}
            </div>
          </div>

          <!-- Learning Hours -->
          <div class="text-center">
            <div
              class="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <UIcon
                name="i-heroicons-clock"
                class="w-8 h-8 text-green-600 dark:text-green-400"
              />
            </div>
            <div class="text-4xl lg:text-5xl font-bold text-green-400 mb-2">
              {{ formatNumber(stats.totalHours) }}+
            </div>
            <div class="text-lg font-medium text-gray-900 dark:text-white mb-1">
              {{ $t("homepage.platformStats.hours.title") }}
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-300">
              {{ $t("homepage.platformStats.hours.description") }}
            </div>
          </div>

          <!-- Success Rate -->
          <div class="text-center">
            <div
              class="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <UIcon
                name="i-heroicons-trophy"
                class="w-8 h-8 text-green-600 dark:text-green-400"
              />
            </div>
            <div class="text-4xl lg:text-5xl font-bold text-green-400 mb-2">
              {{ stats.successRate }}%
            </div>
            <div class="text-lg font-medium text-gray-900 dark:text-white mb-1">
              {{ $t("homepage.platformStats.success.title") }}
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-300">
              {{ $t("homepage.platformStats.success.description") }}
            </div>
          </div>
        </div>

        <!-- Additional Stats Row -->
        <div
          class="grid md:grid-cols-3 gap-8 mt-16 pt-12 border-t border-gray-200 dark:border-gray-700"
        >
          <div class="text-center">
            <div class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {{ stats.languages }}
            </div>
            <div class="text-gray-600 dark:text-gray-300">
              {{ $t("homepage.platformStats.additional.languages") }}
            </div>
          </div>

          <div class="text-center">
            <div class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {{ stats.avgRating }}/5
            </div>
            <div class="text-gray-600 dark:text-gray-300">
              {{ $t("homepage.platformStats.additional.rating") }}
            </div>
          </div>

          <div class="text-center">
            <div class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {{ stats.certifications }}+
            </div>
            <div class="text-gray-600 dark:text-gray-300">
              {{ $t("homepage.platformStats.additional.certifications") }}
            </div>
          </div>
        </div>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n();

// Platform statistics (could be fetched from API in real implementation)
const stats = {
  totalCourses: 5,
  activeStudents: 2500,
  totalHours: 15000,
  successRate: 94,
  languages: 2,
  avgRating: 4.8,
  certifications: 1200,
};

const formatNumber = (num: number) => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
};
</script>
