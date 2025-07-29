<script setup lang="ts">
const { t } = useI18n();
const localePath = useLocalePath();
const { getAllCourses, getPublishedCourses } = useCourseRegistry();

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

// Get courses from the course registry
const allCourses = getAllCourses();
const publishedCourses = getPublishedCourses();

// Separate coming soon courses
const comingSoonCourses = computed(() =>
  allCourses.filter((course) => course.status === "coming-soon")
);

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
        <CourseCard
          v-for="course in publishedCourses"
          :key="course.id"
          :course="course"
        />
      </div>

      <!-- Coming Soon Section -->
      <div v-if="comingSoonCourses.length > 0" class="mt-16">
        <div class="text-center mb-8">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {{ $t("courses.comingSoon") }}
          </h2>
        </div>
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <CourseCard
            v-for="course in comingSoonCourses"
            :key="course.id"
            :course="course"
          />
        </div>
      </div>
    </UContainer>
  </div>
</template>
