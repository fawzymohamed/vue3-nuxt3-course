<script setup lang="ts">
const { t } = useI18n();
const { locale } = useI18n();
const localePath = useLocalePath();
const route = useRoute();

const courseId = computed(() => route.params.courseId as string);

// For now, we'll use static data. In Phase 3, this will query from content
const courseData = {
  "vue-nuxt-mastery": {
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
    instructor: {
      name: "VueNuxtMasters Team",
      bio: {
        en: "Expert Vue.js and Nuxt.js developers with years of experience",
        ar: "مطورون خبراء في Vue.js و Nuxt.js مع سنوات من الخبرة",
      },
    },
    modules: [
      {
        id: "module1",
        title: {
          en: "Vue.js - The Progressive Framework",
          ar: "Vue.js - الإطار التدريجي",
        },
        description: {
          en: "Introduction to Vue.js fundamentals and core concepts",
          ar: "مقدمة عن أساسيات Vue.js والمفاهيم الأساسية",
        },
        lessons: [
          {
            id: "lesson1",
            title: {
              en: "What is Vue.js? Why Vue?",
              ar: "ما هو Vue.js؟ لماذا Vue؟",
            },
            slug: "lesson1",
          },
          {
            id: "lesson2",
            title: {
              en: "Setting Up Your Environment",
              ar: "إعداد بيئة التطوير",
            },
            slug: "lesson2",
          },
        ],
      },
    ],
  },
};

const course = computed(
  () => courseData[courseId.value as keyof typeof courseData]
);

// Handle course not found
if (!course.value) {
  throw createError({
    statusCode: 404,
    statusMessage: t("course.notFound"),
  });
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
</script>

<template>
  <div>
    <UContainer>
      <!-- Course Hero Section -->
      <div class="py-8 lg:py-16">
        <div class="lg:grid lg:grid-cols-12 lg:gap-x-8">
          <div class="lg:col-span-8">
            <h1
              class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl"
            >
              {{ course.title[locale] }}
            </h1>
            <p class="mt-4 text-xl text-gray-600 dark:text-gray-300">
              {{ course.description[locale] }}
            </p>

            <!-- Course Meta -->
            <div class="mt-6 flex flex-wrap items-center gap-4">
              <UBadge
                :color="
                  course.difficulty === 'beginner'
                    ? 'success'
                    : course.difficulty === 'intermediate'
                      ? 'warning'
                      : 'error'
                "
                variant="subtle"
                size="lg"
              >
                {{ $t(`difficulty.${course.difficulty}`) }}
              </UBadge>
              <span class="text-gray-600 dark:text-gray-300">
                {{ course.estimatedHours }} {{ $t("common.hours") }}
              </span>
              <span class="text-gray-600 dark:text-gray-300">
                {{ course.modules.length }} {{ $t("common.modules") }}
              </span>
            </div>

            <!-- Instructor Info -->
            <div class="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h3 class="font-semibold text-gray-900 dark:text-white">
                {{ $t("course.instructor") }}
              </h3>
              <p class="text-gray-600 dark:text-gray-300">
                {{ course.instructor.name }}
              </p>
              <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
                {{ course.instructor.bio[locale] }}
              </p>
            </div>
          </div>

          <div class="mt-8 lg:mt-0 lg:col-span-4">
            <!-- Course Actions -->
            <div
              class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6"
            >
              <UButton
                :to="localePath(`/courses/${courseId}/module1/lesson1`)"
                color="primary"
                size="lg"
                class="w-full mb-4"
              >
                {{ $t("course.startLearning") }}
              </UButton>

              <UButton
                variant="outline"
                size="lg"
                class="w-full"
                @click="() => {}"
              >
                {{ $t("course.viewCurriculum") }}
              </UButton>
            </div>
          </div>
        </div>
      </div>

      <!-- Course Curriculum -->
      <div class="border-t border-gray-200 dark:border-gray-700 pt-8">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          {{ $t("course.curriculum") }}
        </h2>

        <div class="space-y-6">
          <div
            v-for="(module, moduleIndex) in course.modules"
            :key="module.id"
            class="border border-gray-200 dark:border-gray-700 rounded-lg"
          >
            <div
              class="p-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700"
            >
              <h3 class="font-semibold text-gray-900 dark:text-white">
                {{ $t("common.module") }} {{ moduleIndex + 1 }}:
                {{ module.title[locale] }}
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">
                {{ module.description[locale] }}
              </p>
            </div>

            <div class="p-4">
              <ul class="space-y-2">
                <li
                  v-for="(lesson, lessonIndex) in module.lessons"
                  :key="lesson.id"
                >
                  <NuxtLink
                    :to="
                      localePath(
                        `/courses/${courseId}/${module.id}/${lesson.slug}`
                      )
                    "
                    class="flex items-center p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <span
                      class="flex-shrink-0 w-6 h-6 bg-primary-100 dark:bg-primary-800 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-sm font-medium mr-3"
                    >
                      {{ lessonIndex + 1 }}
                    </span>
                    <span class="text-gray-900 dark:text-white">
                      {{ lesson.title[locale] }}
                    </span>
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </UContainer>
  </div>
</template>
