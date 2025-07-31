<template>
  <section class="py-16 lg:py-20">
    <UContainer>
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-12">
          <h2
            class="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            {{ $t("homepage.featuredCourses.title") }}
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {{ $t("homepage.featuredCourses.subtitle") }}
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <CourseCard
            v-for="course in featuredCourses"
            :key="course.id"
            :course="course"
            :show-progress="false"
            :compact="false"
          />
        </div>

        <div class="text-center">
          <UButton
            :to="localePath('/courses')"
            variant="outline"
            size="lg"
            class="border-green-400 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20"
          >
            {{ $t("homepage.featuredCourses.viewAllCourses") }}
          </UButton>
        </div>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n();
const localePath = useLocalePath();
const { getFeaturedCourses } = useCourseRegistry();

// Get featured courses (top-rated or manually selected)
const featuredCourses = getFeaturedCourses(3);
</script>
