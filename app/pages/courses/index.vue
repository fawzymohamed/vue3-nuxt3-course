<script setup lang="ts">
const { t } = useI18n();
const localePath = useLocalePath();

// SEO Meta for courses listing page
useHead({
  title: t("courses.meta.title"),
  meta: [
    {
      name: "description",
      content: t("courses.meta.description"),
    },
  ],
});

// For now, we'll create a simple courses listing page
// In Phase 4, this will be enhanced with filtering and search
const courses = [
  {
    id: "vue-nuxt-mastery",
    slug: "vue-nuxt-mastery",
    title: {
      en: "Vue.js & Nuxt.js Mastery",
      ar: "إتقان Vue.js و Nuxt.js",
    },
    description: {
      en: "Complete guide from Vue basics to advanced Nuxt development",
      ar: "دليل شامل من أساسيات Vue إلى التطوير المتقدم مع Nuxt",
    },
    difficulty: "beginner",
    estimatedHours: 40,
    status: "published",
  },
];

const { locale } = useI18n();
</script>

<template>
  <div>
    <UContainer>
      <!-- Page Header -->
      <div class="py-8 lg:py-16">
        <div class="text-center">
          <h1
            class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl"
          >
            {{ $t("courses.title") }}
          </h1>
          <p class="mt-4 text-lg text-gray-600 dark:text-gray-300">
            {{ $t("courses.subtitle") }}
          </p>
        </div>
      </div>

      <!-- Courses Grid -->
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <UCard
          v-for="course in courses"
          :key="course.id"
          :to="localePath(`/courses/${course.slug}`)"
          class="hover:shadow-lg transition-shadow"
        >
          <template #header>
            <div
              class="h-48 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center"
            >
              <h3 class="text-white text-xl font-bold text-center px-4">
                {{ course.title[locale] }}
              </h3>
            </div>
          </template>

          <div class="p-4">
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              {{ course.description[locale] }}
            </p>

            <div class="flex items-center justify-between">
              <UBadge
                :color="
                  course.difficulty === 'beginner'
                    ? 'success'
                    : course.difficulty === 'intermediate'
                      ? 'warning'
                      : 'error'
                "
                variant="subtle"
              >
                {{ $t(`difficulty.${course.difficulty}`) }}
              </UBadge>
              <span class="text-sm text-gray-500">
                {{ course.estimatedHours }} {{ $t("common.hours") }}
              </span>
            </div>
          </div>
        </UCard>
      </div>

      <!-- Coming Soon Section -->
      <div class="mt-16 text-center">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          {{ $t("courses.comingSoon") }}
        </h2>
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div
            v-for="upcomingCourse in [
              'React Fundamentals',
              'Python Basics',
              'Node.js Backend',
              'Mobile Development',
            ]"
            :key="upcomingCourse"
            class="p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg"
          >
            <p class="text-gray-500 dark:text-gray-400">{{ upcomingCourse }}</p>
          </div>
        </div>
      </div>
    </UContainer>
  </div>
</template>
