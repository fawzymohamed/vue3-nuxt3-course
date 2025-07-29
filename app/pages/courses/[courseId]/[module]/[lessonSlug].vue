<script setup lang="ts">
const { t } = useI18n();
const { locale } = useI18n();
const localePath = useLocalePath();
const route = useRoute();

const courseId = computed(() => route.params.courseId as string);
const moduleId = computed(() => route.params.module as string);
const lessonSlug = computed(() => route.params.lessonSlug as string);

// Get content from the new structure first, fallback to old structure for backward compatibility
const { data: newLesson } = await useAsyncData(
  `course-lesson-${courseId.value}-${moduleId.value}-${lessonSlug.value}`,
  async () => {
    try {
      // Try new course structure first
      const newStructureLesson = await queryCollection("content")
        .path(
          `/courses/${courseId.value}/${locale.value}/modules/${moduleId.value}/lessons/${lessonSlug.value}`
        )
        .first();

      if (newStructureLesson) {
        return newStructureLesson;
      }
    } catch (error) {
      // Silence the error and try fallback
    }

    try {
      // Fallback to old structure for backward compatibility
      // Map new route format to old content structure
      const legacyModule = `${moduleId.value}-${locale.value}`;
      return await queryCollection("content")
        .path(`/lesson/${legacyModule}/${lessonSlug.value}`)
        .first();
    } catch (fallbackError) {
      return null;
    }
  }
);

// Handle lesson not found
if (!newLesson.value) {
  throw createError({
    statusCode: 404,
    statusMessage: t("lesson.notFound"),
  });
}

// SEO Meta
useHead({
  title: newLesson.value.title,
  meta: [
    {
      name: "description",
      content: newLesson.value.description,
    },
  ],
});

// Navigation data - this will be enhanced in Phase 2
const navigationData = {
  course: {
    id: courseId.value,
    title:
      courseId.value === "vue-nuxt-mastery"
        ? locale.value === "en"
          ? "Vue.js & Nuxt.js Mastery"
          : "إتقان Vue.js و Nuxt.js"
        : courseId.value,
  },
  module: {
    id: moduleId.value,
    title:
      moduleId.value === "module1"
        ? locale.value === "en"
          ? "Vue.js - The Progressive Framework"
          : "Vue.js - الإطار التدريجي"
        : moduleId.value,
  },
  lesson: {
    id: lessonSlug.value,
    title: newLesson.value.title,
  },
};

// Function to map module names between languages for navigation
function mapModuleToLanguage(currentModule: string, targetLang: string) {
  const moduleMatch = currentModule.match(/^(.+)-([a-z]{2})$/);
  if (!moduleMatch) return currentModule;

  const [_, moduleBase] = moduleMatch;
  return `${moduleBase}-${targetLang}`;
}

// Watch for language changes and redirect to equivalent lesson
watch(locale, async (newLocale) => {
  // For new course structure, update route to new language
  if (courseId.value && moduleId.value && lessonSlug.value) {
    const newPath = `/courses/${courseId.value}/${moduleId.value}/${lessonSlug.value}`;
    await navigateTo(localePath(newPath));
  }
});
</script>

<template>
  <div>
    <!-- Course-aware layout will be added in Phase 2 -->
    <UContainer class="py-6">
      <!-- Breadcrumb Navigation -->
      <nav class="mb-6">
        <ol class="flex items-center space-x-2 text-sm">
          <li>
            <NuxtLink
              :to="localePath('/courses')"
              class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              {{ $t("navigation.courses") }}
            </NuxtLink>
          </li>
          <li class="text-gray-400">/</li>
          <li>
            <NuxtLink
              :to="localePath(`/courses/${courseId}`)"
              class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              {{ navigationData.course.title }}
            </NuxtLink>
          </li>
          <li class="text-gray-400">/</li>
          <li>
            <span class="text-gray-900 dark:text-white">{{
              navigationData.lesson.title
            }}</span>
          </li>
        </ol>
      </nav>

      <!-- Lesson Content -->
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-3">
          <div class="prose prose-lg dark:prose-invert max-w-none">
            <ContentRenderer v-if="newLesson" :value="newLesson" />
          </div>

          <!-- Lesson Navigation -->
          <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div class="flex justify-between">
              <!-- Previous Lesson - will be enhanced in Phase 2 -->
              <div>
                <!-- Placeholder for previous lesson link -->
              </div>

              <!-- Next Lesson - will be enhanced in Phase 2 -->
              <div>
                <!-- Placeholder for next lesson link -->
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar - Module Navigation -->
        <div class="lg:col-span-1">
          <div class="sticky top-6">
            <div
              class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4"
            >
              <h3 class="font-semibold text-gray-900 dark:text-white mb-4">
                {{ navigationData.module.title }}
              </h3>

              <!-- Module lessons list - simplified for now -->
              <ul class="space-y-2">
                <li>
                  <NuxtLink
                    :to="localePath(`/courses/${courseId}/${moduleId}/lesson1`)"
                    class="block p-2 text-sm rounded hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    :class="{
                      'bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-400':
                        lessonSlug === 'lesson1',
                    }"
                  >
                    1.
                    {{
                      locale === "en"
                        ? "What is Vue.js? Why Vue?"
                        : "ما هو Vue.js؟ لماذا Vue؟"
                    }}
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink
                    :to="localePath(`/courses/${courseId}/${moduleId}/lesson2`)"
                    class="block p-2 text-sm rounded hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    :class="{
                      'bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-400':
                        lessonSlug === 'lesson2',
                    }"
                  >
                    2.
                    {{
                      locale === "en"
                        ? "Setting Up Your Environment"
                        : "إعداد بيئة التطوير"
                    }}
                  </NuxtLink>
                </li>
              </ul>

              <!-- Back to Course -->
              <div
                class="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700"
              >
                <UButton
                  :to="localePath(`/courses/${courseId}`)"
                  variant="outline"
                  size="sm"
                  class="w-full"
                >
                  {{ $t("lesson.backToCourse") }}
                </UButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UContainer>
  </div>
</template>
