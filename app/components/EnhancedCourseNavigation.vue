<template>
  <div class="enhanced-course-navigation">
    <!-- Course progress overview -->
    <div
      class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 mb-6"
    >
      <div class="flex items-center justify-between mb-3">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
          {{ course?.title[locale] }}
        </h2>
        <UBadge
          variant="soft"
          color="success"
          v-if="progressPercentage === 100"
        >
          {{ $t("course.completed") }}
        </UBadge>
        <UBadge variant="soft" color="primary" v-else>
          {{ progressPercentage }}% {{ $t("course.complete") }}
        </UBadge>
      </div>

      <!-- Overall progress bar -->
      <UProgress
        :value="progressPercentage"
        size="md"
        color="primary"
        class="mb-2"
      />

      <!-- Course stats -->
      <div
        class="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300"
      >
        <span
          >{{ completedLessons }} / {{ totalLessons }}
          {{ $t("course.lessons").toLowerCase() }}</span
        >
        <span
          >{{ course?.estimatedHours }} {{ $t("course.hours").toLowerCase() }}
          {{ $t("course.total") }}</span
        >
      </div>
    </div>

    <!-- Responsive navigation layout -->
    <div class="grid gap-6 lg:grid-cols-3">
      <!-- Course breadcrumb (full width on mobile) -->
      <div class="lg:col-span-3">
        <CourseBreadcrumb
          :course="course"
          :current-module="currentModule"
          :current-lesson="currentLesson"
        />
      </div>

      <!-- Module navigation (2/3 width on desktop) -->
      <div class="lg:col-span-2">
        <EnhancedCourseModuleNav
          v-if="course"
          :course="course"
          :modules="course.modules"
          :current-module="currentModule"
          :current-lesson="currentLesson"
        />
      </div>

      <!-- Quick lesson navigation (1/3 width on desktop) -->
      <div class="lg:col-span-1">
        <div
          class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4"
        >
          <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-3">
            {{ $t("navigation.quickActions") }}
          </h3>

          <!-- Quick navigation buttons -->
          <div class="space-y-2">
            <!-- Mark lesson complete -->
            <UButton
              v-if="currentLesson && !isCurrentLessonCompleted"
              @click="markCurrentLessonComplete"
              variant="outline"
              color="success"
              size="sm"
              block
            >
              <template #leading>
                <UIcon name="i-heroicons-check-circle" class="w-4 h-4" />
              </template>
              {{ $t("lesson.markComplete") }}
            </UButton>

            <!-- Course overview -->
            <UButton
              v-if="course"
              :to="localePath(`/courses/${course.slug}`)"
              variant="ghost"
              color="neutral"
              size="sm"
              block
            >
              <template #leading>
                <UIcon name="i-heroicons-book-open" class="w-4 h-4" />
              </template>
              {{ $t("course.overview") }}
            </UButton>
          </div>

          <!-- Current lesson info -->
          <div
            v-if="currentLesson"
            class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
          >
            <h4
              class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2"
            >
              {{ $t("lesson.current") }}
            </h4>
            <div class="text-sm">
              <div class="font-medium text-gray-900 dark:text-white mb-1">
                {{ currentLesson.title[locale] }}
              </div>
              <div class="text-gray-500 dark:text-gray-400 text-xs">
                {{ currentLesson.estimatedMinutes }}min •
                {{ $t("common.module") }} {{ currentModule?.number }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {
  Course,
  ModuleMetadata,
  LessonMetadata,
} from "../../types/course";

interface Props {
  course?: Course;
  currentModule?: ModuleMetadata;
  currentLesson?: LessonMetadata;
}

const props = defineProps<Props>();

const { locale } = useI18n();
const localePath = useLocalePath();
const { getCourseProgress, markLessonComplete, isLessonCompleted } =
  useCourseProgress();

// Get course progress
const progress = computed(() =>
  props.course ? getCourseProgress(props.course.id) : null
);

// Calculate progress stats
const progressPercentage = computed(() => {
  if (!progress.value || !props.course) return 0;

  const totalLessons = props.course.modules.reduce(
    (total, module) => total + module.lessons.length,
    0
  );
  const completedLessons = Array.isArray(progress.value?.completedLessons)
    ? progress.value.completedLessons.length
    : 0;

  return Math.round((completedLessons / totalLessons) * 100);
});

const completedLessons = computed(() =>
  Array.isArray(progress.value?.completedLessons)
    ? progress.value.completedLessons.length
    : 0
);

const totalLessons = computed(
  () =>
    props.course?.modules.reduce(
      (total, module) => total + module.lessons.length,
      0
    ) || 0
);

// Check if current lesson is completed
const isCurrentLessonCompleted = computed(() => {
  if (!props.currentLesson || !props.currentModule || !props.course)
    return false;
  return isLessonCompleted(
    props.course.id,
    props.currentModule.id,
    props.currentLesson.id
  );
});

// Mark current lesson as complete
const markCurrentLessonComplete = () => {
  if (!props.course || !props.currentModule || !props.currentLesson) return;

  markLessonComplete(
    props.course.id,
    props.currentModule.id,
    props.currentLesson.id
  );
};
</script>
