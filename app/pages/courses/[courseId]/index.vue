<script setup lang="ts">
const { t } = useI18n();
const { locale } = useI18n();
const localePath = useLocalePath();
const route = useRoute();

// Use the new course registry system
const { getCourseBySlug, validateCourse } = useCourseRegistry();
const { getCourseProgress, getCourseProgressPercentage } = useCourseProgress();

const courseId = computed(() => route.params.courseId as string);

// Get course data from the registry
const course = computed(() => {
  const courseData = getCourseBySlug(courseId.value);
  if (!courseData) {
    throw createError({
      statusCode: 404,
      statusMessage: t("course.errors.notFound"),
    });
  }
  return courseData;
});

// Get user progress for this course
const progress = computed(() => getCourseProgress(course.value.id));
const progressPercentage = computed(() =>
  getCourseProgressPercentage(course.value.id)
);

// Validate course configuration in development
if (process.dev && course.value) {
  const validation = validateCourse(course.value);
  if (!validation.valid) {
    console.warn(
      `Course validation errors for ${course.value.id}:`,
      validation.errors
    );
  }
  if (validation.errors.length > 0) {
    console.warn(
      `Course validation warnings for ${course.value.id}:`,
      validation.errors
    );
  }
}

// SEO Meta
useHead({
  title: course.value.title[locale.value],
  meta: [
    {
      name: "description",
      content: course.value.description[locale.value],
    },
  ],
});

// Tab configuration for course details
const tabItems = [
  {
    key: "curriculum",
    label: t("course.curriculum"),
    icon: "i-heroicons-academic-cap",
  },
  {
    key: "instructor",
    label: t("course.instructor"),
    icon: "i-heroicons-user-circle",
  },
  {
    key: "reviews",
    label: t("reviews.ratingsAndReviews"),
    icon: "i-heroicons-star",
  },
];

// Default active tab
const activeTab = ref("curriculum");
</script>

<template>
  <div>
    <!-- Course Hero Section -->
    <CourseHeroSection :course="course" :progress="progress" />

    <!-- Course Details with Tabs -->
    <UContainer>
      <div class="py-12">
        <!-- Tab Navigation -->
        <div class="border-b border-gray-200 dark:border-gray-700 mb-8">
          <nav class="flex space-x-8">
            <button
              v-for="tab in tabItems"
              :key="tab.key"
              @click="activeTab = tab.key"
              :class="[
                'py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2',
                activeTab === tab.key
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300',
              ]"
            >
              <UIcon :name="tab.icon" class="w-4 h-4" />
              {{ tab.label }}
            </button>
          </nav>
        </div>

        <!-- Tab Content -->
        <div class="tab-content">
          <!-- Curriculum Tab -->
          <div v-show="activeTab === 'curriculum'">
            <CourseCurriculum :course="course" />
          </div>

          <!-- Instructor Tab -->
          <div v-show="activeTab === 'instructor'">
            <InstructorProfile
              :instructor="course.instructor"
              :course="course"
            />
          </div>

          <!-- Reviews Tab -->
          <div v-show="activeTab === 'reviews'">
            <CourseReviews :course-id="course.id" />
          </div>
        </div>
      </div>
    </UContainer>
  </div>
</template>
