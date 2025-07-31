<script setup lang="ts">
interface Props {
  course: any;
  progress?: any;
}

const props = defineProps<Props>();

const { t, locale } = useI18n();
const localePath = useLocalePath();
const { getCourseProgress, getCourseProgressPercentage } = useCourseProgress();

// Get progress data
const courseProgress = computed(() => getCourseProgress(props.course.id));
const progressPercentage = computed(() =>
  getCourseProgressPercentage(props.course.id)
);

// Calculate course statistics
const courseStats = computed(() => {
  let totalLessons = 0;
  let completedLessons = 0;

  props.course.modules.forEach((module: any) => {
    totalLessons += module.lessons.length;
    if (courseProgress.value) {
      module.lessons.forEach((lesson: any) => {
        const lessonKey = `${props.course.id}.${module.id}.${lesson.id}`;
        const progress = courseProgress.value as any;
        if (progress && progress[lessonKey]?.completed) {
          completedLessons++;
        }
      });
    }
  });

  return {
    totalLessons,
    completedLessons,
    totalModules: props.course.modules.length,
  };
});

// Determine course action based on progress
const courseAction = computed(() => {
  if (progressPercentage.value > 0) {
    return {
      label: t("course.continue"),
      variant: "solid" as const,
      color: "primary" as const,
    };
  }
  return {
    label: t("course.startLearning"),
    variant: "solid" as const,
    color: "primary" as const,
  };
});

// Get first lesson URL
const firstLessonUrl = computed(() => {
  const firstModule = props.course.modules[0];
  const firstLesson = firstModule?.lessons[0];
  if (firstModule && firstLesson) {
    return localePath(
      `/courses/${props.course.slug}/${firstModule.id}/${firstLesson.slug}`
    );
  }
  return localePath(`/courses/${props.course.slug}`);
});

// Difficulty badge color
const difficultyColor = computed(() => {
  switch (props.course.difficulty) {
    case "beginner":
      return "success";
    case "intermediate":
      return "warning";
    case "advanced":
      return "error";
    default:
      return "primary";
  }
});

// Price display
const priceDisplay = computed(() => {
  if (props.course.price.type === "free") {
    return t("course.free");
  }
  return `${props.course.price.amount} ${props.course.price.currency}`;
});
</script>

<template>
  <section
    class="course-hero bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-900 dark:to-gray-800 py-12 lg:py-16"
  >
    <UContainer>
      <div class="lg:grid lg:grid-cols-12 lg:gap-x-12 items-start">
        <!-- Course Information -->
        <div class="lg:col-span-8">
          <!-- Breadcrumb -->
          <nav class="mb-6">
            <ol class="flex items-center space-x-2 text-sm">
              <li>
                <NuxtLink
                  :to="localePath('/courses')"
                  class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  {{ $t("navigation.courses") }}
                </NuxtLink>
              </li>
              <li class="text-gray-400">/</li>
              <li class="text-gray-900 dark:text-white font-medium">
                {{ course.title[locale] }}
              </li>
            </ol>
          </nav>

          <!-- Course Title and Description -->
          <div class="mb-8">
            <h1
              class="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl mb-4"
            >
              {{ course.title[locale] }}
            </h1>
            <p class="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              {{ course.description[locale] }}
            </p>
          </div>

          <!-- Course Metadata -->
          <div class="flex flex-wrap items-center gap-4 mb-6">
            <UBadge :color="difficultyColor" variant="subtle" size="lg">
              {{ $t(`filters.difficulty.${course.difficulty}`) }}
            </UBadge>

            <div
              class="flex items-center gap-1 text-gray-600 dark:text-gray-300"
            >
              <UIcon name="i-heroicons-clock" class="w-4 h-4" />
              <span>{{ course.estimatedHours }} {{ $t("course.hours") }}</span>
            </div>

            <div
              class="flex items-center gap-1 text-gray-600 dark:text-gray-300"
            >
              <UIcon name="i-heroicons-squares-2x2" class="w-4 h-4" />
              <span
                >{{ courseStats.totalModules }} {{ $t("course.modules") }}</span
              >
            </div>

            <div
              class="flex items-center gap-1 text-gray-600 dark:text-gray-300"
            >
              <UIcon name="i-heroicons-play-circle" class="w-4 h-4" />
              <span
                >{{ courseStats.totalLessons }} {{ $t("course.lessons") }}</span
              >
            </div>
          </div>

          <!-- Technologies -->
          <div class="mb-6">
            <h3 class="text-sm font-medium text-gray-900 dark:text-white mb-2">
              {{ $t("course.technologies") }}
            </h3>
            <div class="flex flex-wrap gap-2">
              <UBadge
                v-for="tech in course.technologies"
                :key="tech"
                variant="outline"
                color="primary"
              >
                {{ tech }}
              </UBadge>
            </div>
          </div>

          <!-- Prerequisites -->
          <div
            v-if="course.prerequisites && course.prerequisites.length > 0"
            class="mb-6"
          >
            <h3 class="text-sm font-medium text-gray-900 dark:text-white mb-2">
              {{ $t("course.prerequisites") }}
            </h3>
            <ul
              class="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1"
            >
              <li
                v-for="prerequisite in course.prerequisites"
                :key="prerequisite"
              >
                {{ prerequisite }}
              </li>
            </ul>
          </div>
        </div>

        <!-- Course Actions Card -->
        <div class="mt-8 lg:mt-0 lg:col-span-4">
          <UCard class="sticky top-8">
            <!-- Course Image -->
            <template #header>
              <img
                v-if="course.thumbnail"
                :src="course.thumbnail"
                :alt="course.title[locale]"
                class="w-full h-48 object-cover"
              />
              <div
                v-else
                class="w-full h-48 bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center"
              >
                <UIcon
                  name="i-heroicons-academic-cap"
                  class="w-16 h-16 text-white"
                />
              </div>
            </template>

            <div class="space-y-6">
              <!-- Price -->
              <div class="text-center">
                <div class="text-3xl font-bold text-gray-900 dark:text-white">
                  {{ priceDisplay }}
                </div>
                <div
                  v-if="course.price.type !== 'free'"
                  class="text-sm text-gray-500 dark:text-gray-400"
                >
                  {{ $t("course.oneTimePayment") }}
                </div>
              </div>

              <!-- Progress (if started) -->
              <div v-if="progressPercentage > 0" class="space-y-2">
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600 dark:text-gray-300">{{
                    $t("course.progress")
                  }}</span>
                  <span class="font-medium text-gray-900 dark:text-white"
                    >{{ Math.round(progressPercentage) }}%</span
                  >
                </div>
                <UProgress :value="progressPercentage" />
                <div class="text-xs text-gray-500 dark:text-gray-400">
                  {{ courseStats.completedLessons }} {{ $t("course.of") }}
                  {{ courseStats.totalLessons }}
                  {{ $t("course.lessonsCompleted") }}
                </div>
              </div>

              <!-- Action Button -->
              <UButton
                :to="firstLessonUrl"
                :color="courseAction.color"
                :variant="courseAction.variant"
                size="lg"
                class="w-full"
                block
              >
                {{ courseAction.label }}
              </UButton>

              <!-- Course Features -->
              <div class="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h4 class="font-medium text-gray-900 dark:text-white mb-3">
                  {{ $t("course.thisIncludes") }}
                </h4>
                <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li class="flex items-center gap-2">
                    <UIcon
                      name="i-heroicons-check-circle"
                      class="w-4 h-4 text-green-500"
                    />
                    {{ $t("course.lifetimeAccess") }}
                  </li>
                  <li class="flex items-center gap-2">
                    <UIcon
                      name="i-heroicons-check-circle"
                      class="w-4 h-4 text-green-500"
                    />
                    {{ $t("course.mobileFriendly") }}
                  </li>
                  <li class="flex items-center gap-2">
                    <UIcon
                      name="i-heroicons-check-circle"
                      class="w-4 h-4 text-green-500"
                    />
                    {{ $t("course.bilingualSupport") }}
                  </li>
                  <li
                    v-if="course.features?.hasExercises"
                    class="flex items-center gap-2"
                  >
                    <UIcon
                      name="i-heroicons-check-circle"
                      class="w-4 h-4 text-green-500"
                    />
                    {{ $t("course.practicalExercises") }}
                  </li>
                  <li
                    v-if="course.features?.hasCertificates"
                    class="flex items-center gap-2"
                  >
                    <UIcon
                      name="i-heroicons-check-circle"
                      class="w-4 h-4 text-green-500"
                    />
                    {{ $t("course.certificateCompletion") }}
                  </li>
                </ul>
              </div>
            </div>
          </UCard>
        </div>
      </div>
    </UContainer>
  </section>
</template>

<style scoped>
.course-hero {
  background-image:
    radial-gradient(
      circle at 20% 80%,
      rgba(120, 119, 198, 0.1) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 80% 20%,
      rgba(255, 255, 255, 0.1) 0%,
      transparent 50%
    );
}
</style>
