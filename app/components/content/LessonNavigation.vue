<template>
  <div
    class="lesson-navigation mt-12 pt-8 border-t border-gray-200 dark:border-gray-700"
  >
    <!-- Navigation header -->
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
        {{ $t("lesson.navigation.title") }}
      </h3>

      <!-- Progress indicator -->
      <div
        v-if="course && currentLesson"
        class="text-sm text-gray-500 dark:text-gray-400"
      >
        {{ getLessonProgress() }}
      </div>
    </div>

    <!-- Navigation buttons -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Previous lesson -->
      <div class="previous-lesson">
        <UButton
          v-if="previousLesson"
          :to="localePath(getPreviousLessonPath())"
          variant="outline"
          size="lg"
          color="neutral"
          class="w-full justify-start"
          :disabled="!previousLesson"
        >
          <div class="flex items-center gap-3">
            <UIcon
              name="i-heroicons-arrow-left"
              class="w-5 h-5 flex-shrink-0"
            />
            <div class="text-left min-w-0">
              <div class="text-xs text-gray-500 dark:text-gray-400 mb-1">
                {{ $t("lesson.navigation.previous") }}
              </div>
              <div class="font-medium truncate">
                {{ getPreviousLessonTitle() }}
              </div>
            </div>
          </div>
        </UButton>

        <div
          v-else
          class="w-full h-12 flex items-center justify-center text-gray-400 dark:text-gray-500 border border-gray-200 dark:border-gray-700 rounded-lg"
        >
          {{ $t("lesson.navigation.firstLesson") }}
        </div>
      </div>

      <!-- Next lesson -->
      <div class="next-lesson">
        <UButton
          v-if="nextLesson"
          :to="localePath(getNextLessonPath())"
          variant="solid"
          size="lg"
          color="primary"
          class="w-full justify-end"
          :disabled="!nextLesson"
        >
          <div class="flex items-center gap-3">
            <div class="text-right min-w-0">
              <div class="text-xs text-white/80 mb-1">
                {{ $t("lesson.navigation.next") }}
              </div>
              <div class="font-medium truncate">
                {{ getNextLessonTitle() }}
              </div>
            </div>
            <UIcon
              name="i-heroicons-arrow-right"
              class="w-5 h-5 flex-shrink-0"
            />
          </div>
        </UButton>

        <div
          v-else
          class="w-full h-12 flex items-center justify-center text-gray-400 dark:text-gray-500 border border-gray-200 dark:border-gray-700 rounded-lg"
        >
          {{ $t("lesson.navigation.lastLesson") }}
        </div>
      </div>
    </div>

    <!-- Course completion notice -->
    <div
      v-if="!nextLesson && isLastLesson"
      class="mt-6 p-4 bg-success-50 dark:bg-success-900/20 rounded-lg border border-success-200 dark:border-success-800"
    >
      <div class="flex items-center gap-3">
        <UIcon
          name="i-heroicons-trophy"
          class="w-6 h-6 text-success-600 dark:text-success-400"
        />
        <div>
          <h4 class="font-semibold text-success-800 dark:text-success-200">
            {{ $t("lesson.navigation.courseComplete") }}
          </h4>
          <p class="text-sm text-success-700 dark:text-success-300 mt-1">
            {{ $t("lesson.navigation.courseCompleteDescription") }}
          </p>
        </div>
      </div>

      <div class="mt-4 flex gap-3">
        <UButton
          v-if="course"
          :to="localePath(`/courses/${course.slug}`)"
          variant="solid"
          color="success"
          size="sm"
        >
          {{ $t("course.viewCertificate") }}
        </UButton>

        <UButton
          :to="localePath('/courses')"
          variant="outline"
          color="success"
          size="sm"
        >
          {{ $t("course.exploreMore") }}
        </UButton>
      </div>
    </div>

    <!-- Module navigation context -->
    <div
      v-if="currentModule"
      class="mt-8 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
    >
      <div class="flex items-center justify-between mb-3">
        <h4 class="font-medium text-gray-900 dark:text-white">
          {{ $t("common.module") }} {{ currentModule.number }}:
          {{ currentModule.title[locale] }}
        </h4>
        <div class="text-sm text-gray-500 dark:text-gray-400">
          {{ getModuleProgress() }}% {{ $t("common.complete") }}
        </div>
      </div>

      <UProgress
        :value="getModuleProgress()"
        size="sm"
        color="primary"
        class="mb-3"
      />

      <div
        class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400"
      >
        <span
          >{{ currentModule.lessons.length }} {{ $t("course.lessons") }}</span
        >
        <span
          >{{ currentModule.estimatedMinutes }} {{ $t("course.minutes") }}</span
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {
  Course,
  ModuleMetadata,
  LessonMetadata,
} from "../../../types/course";

interface Props {
  course?: Course;
  currentLesson?: LessonMetadata;
  currentModule?: ModuleMetadata;
}

const props = defineProps<Props>();

interface Emits {
  (e: "navigate", lesson: LessonMetadata): void;
  (e: "complete"): void;
}

const emit = defineEmits<Emits>();

const { locale } = useI18n();
const localePath = useLocalePath();
const { getCourseProgress, getModuleProgressPercentage, isLessonCompleted } =
  useCourseProgress();

// Calculate navigation lessons
const navigationData = computed(() => {
  if (!props.course || !props.currentModule || !props.currentLesson) {
    return { previousLesson: null, nextLesson: null, isLastLesson: false };
  }

  const allLessons: LessonMetadata[] = [];

  // Collect all lessons from all modules in order
  props.course.modules.forEach((module) => {
    allLessons.push(...module.lessons);
  });

  const currentIndex = allLessons.findIndex(
    (lesson) => lesson.id === props.currentLesson?.id
  );

  return {
    previousLesson: currentIndex > 0 ? allLessons[currentIndex - 1] : null,
    nextLesson:
      currentIndex < allLessons.length - 1
        ? allLessons[currentIndex + 1]
        : null,
    isLastLesson: currentIndex === allLessons.length - 1,
  };
});

const previousLesson = computed(() => navigationData.value.previousLesson);
const nextLesson = computed(() => navigationData.value.nextLesson);
const isLastLesson = computed(() => navigationData.value.isLastLesson);

// Get lesson progress text
const getLessonProgress = () => {
  if (!props.course || !props.currentModule) return "";

  const currentLessonIndex = props.currentModule.lessons.findIndex(
    (lesson) => lesson.id === props.currentLesson?.id
  );

  return `${currentLessonIndex + 1} / ${props.currentModule.lessons.length}`;
};

// Get module progress percentage
const getModuleProgress = () => {
  if (!props.course || !props.currentModule) return 0;
  return getModuleProgressPercentage(props.course.id, props.currentModule.id);
};

// Get previous lesson title
const getPreviousLessonTitle = () => {
  if (!previousLesson.value) return "";
  return typeof previousLesson.value.title === "string"
    ? previousLesson.value.title
    : previousLesson.value.title[locale.value] || previousLesson.value.title.en;
};

// Get next lesson title
const getNextLessonTitle = () => {
  if (!nextLesson.value) return "";
  return typeof nextLesson.value.title === "string"
    ? nextLesson.value.title
    : nextLesson.value.title[locale.value] || nextLesson.value.title.en;
};

// Get previous lesson path
const getPreviousLessonPath = () => {
  if (!props.course || !previousLesson.value) return "";

  // Find which module contains the previous lesson
  const previousModule = props.course.modules.find((module) =>
    module.lessons.some((lesson) => lesson.id === previousLesson.value?.id)
  );

  if (!previousModule) return "";

  return `/courses/${props.course.slug}/${previousModule.id}/${previousLesson.value.slug || previousLesson.value.id}`;
};

// Get next lesson path
const getNextLessonPath = () => {
  if (!props.course || !nextLesson.value) return "";

  // Find which module contains the next lesson
  const nextModule = props.course.modules.find((module) =>
    module.lessons.some((lesson) => lesson.id === nextLesson.value?.id)
  );

  if (!nextModule) return "";

  return `/courses/${props.course.slug}/${nextModule.id}/${nextLesson.value.slug || nextLesson.value.id}`;
};
</script>

<style scoped>
/* Navigation button animations */
.lesson-navigation .previous-lesson button,
.lesson-navigation .next-lesson button {
  transition: all 0.2s ease;
}

.lesson-navigation .previous-lesson button:hover {
  transform: translateX(-2px);
}

.lesson-navigation .next-lesson button:hover {
  transform: translateX(2px);
}

/* RTL support */
[dir="rtl"] .lesson-navigation .previous-lesson button:hover {
  transform: translateX(2px);
}

[dir="rtl"] .lesson-navigation .next-lesson button:hover {
  transform: translateX(-2px);
}

/* Responsive layout adjustments */
@media (max-width: 768px) {
  .lesson-navigation .grid {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
}
</style>
