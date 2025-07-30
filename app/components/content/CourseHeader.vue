<template>
  <div class="course-header mb-8">
    <!-- Course breadcrumb context -->
    <div class="mb-4">
      <CourseBreadcrumb
        v-if="course && module && lesson"
        :course-slug="course.slug"
        :module-id="module.id"
        :lesson-slug="lesson.slug || lesson.id"
      />
    </div>

    <!-- Course and lesson title section -->
    <div
      class="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 border border-gray-200 dark:border-gray-700"
    >
      <div
        class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
      >
        <!-- Left side: Course and lesson info -->
        <div class="flex-1">
          <!-- Course title -->
          <div v-if="course" class="mb-3">
            <div
              class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-1"
            >
              <UIcon name="i-heroicons-academic-cap" class="w-4 h-4" />
              <NuxtLink
                :to="localePath(`/courses/${course.slug}`)"
                class="hover:text-primary transition-colors"
              >
                {{ course.title[locale] }}
              </NuxtLink>
            </div>

            <!-- Module title -->
            <div
              v-if="module"
              class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300"
            >
              <UIcon name="i-heroicons-rectangle-stack" class="w-4 h-4" />
              <span
                >{{ $t("common.module") }} {{ module.number }}:
                {{ module.title[locale] }}</span
              >
            </div>
          </div>

          <!-- Lesson title -->
          <h1
            class="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2"
          >
            {{ getLessonTitle() }}
          </h1>

          <!-- Lesson metadata -->
          <div
            class="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400"
          >
            <div
              v-if="lessonMetadata?.estimatedMinutes"
              class="flex items-center gap-1"
            >
              <UIcon name="i-heroicons-clock" class="w-4 h-4" />
              <span
                >{{ lessonMetadata.estimatedMinutes }}
                {{ $t("course.minutes") }}</span
              >
            </div>

            <div
              v-if="lessonMetadata?.hasExercise"
              class="flex items-center gap-1"
            >
              <UIcon name="i-heroicons-code-bracket" class="w-4 h-4" />
              <span>{{ $t("course.features.hasExercises") }}</span>
            </div>

            <div v-if="lessonMetadata?.hasQuiz" class="flex items-center gap-1">
              <UIcon name="i-heroicons-question-mark-circle" class="w-4 h-4" />
              <span>{{ $t("course.features.hasQuizzes") }}</span>
            </div>

            <div v-if="lessonMetadata?.number" class="flex items-center gap-1">
              <UIcon name="i-heroicons-hashtag" class="w-4 h-4" />
              <span>{{ $t("lesson.number") }} {{ lessonMetadata.number }}</span>
            </div>
          </div>
        </div>

        <!-- Right side: Progress and actions -->
        <div class="flex flex-col lg:items-end gap-3">
          <!-- Lesson completion status -->
          <div
            v-if="course && module && lessonMetadata"
            class="flex items-center gap-2"
          >
            <UIcon
              v-if="isLessonCompleted(course.id, module.id, lessonMetadata.id)"
              name="i-heroicons-check-circle-solid"
              class="w-5 h-5 text-success-500"
            />
            <UIcon
              v-else
              name="i-heroicons-play-circle"
              class="w-5 h-5 text-primary-500"
            />
            <span class="text-sm font-medium">
              {{
                isLessonCompleted(course.id, module.id, lessonMetadata.id)
                  ? $t("lesson.completed")
                  : $t("lesson.inProgress")
              }}
            </span>
          </div>

          <!-- Quick actions -->
          <div class="flex items-center gap-2">
            <!-- Mark as complete button -->
            <UButton
              v-if="
                course &&
                module &&
                lessonMetadata &&
                !isLessonCompleted(course.id, module.id, lessonMetadata.id)
              "
              size="sm"
              variant="outline"
              color="primary"
              @click="handleMarkComplete"
            >
              <UIcon name="i-heroicons-check" class="w-4 h-4 mr-1" />
              {{ $t("lesson.markComplete") }}
            </UButton>

            <!-- Course overview link -->
            <UButton
              v-if="course"
              :to="localePath(`/courses/${course.slug}`)"
              size="sm"
              variant="ghost"
              color="neutral"
            >
              <UIcon name="i-heroicons-list-bullet" class="w-4 h-4 mr-1" />
              {{ $t("course.overview") }}
            </UButton>
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
} from "../../../types/course";

interface Props {
  course?: Course;
  module?: ModuleMetadata;
  lesson?: any; // Nuxt Content document
  lessonMetadata?: LessonMetadata;
}

const props = defineProps<Props>();

interface Emits {
  (e: "mark-complete"): void;
}

const emit = defineEmits<Emits>();

const { locale } = useI18n();
const localePath = useLocalePath();
const { markLessonComplete, isLessonCompleted } = useCourseProgress();

// Get lesson title from either lesson metadata or content document
const getLessonTitle = () => {
  if (props.lessonMetadata?.title) {
    return typeof props.lessonMetadata.title === "string"
      ? props.lessonMetadata.title
      : props.lessonMetadata.title[locale.value] ||
          props.lessonMetadata.title.en;
  }

  if (props.lesson?.title) {
    return typeof props.lesson.title === "string"
      ? props.lesson.title
      : props.lesson.title[locale.value] ||
          props.lesson.title.en ||
          props.lesson.title;
  }

  return "Lesson";
};

// Handle mark as complete
const handleMarkComplete = () => {
  if (props.course && props.module && props.lessonMetadata) {
    markLessonComplete(
      props.course.id,
      props.module.id,
      props.lessonMetadata.id
    );
    emit("mark-complete");
  }
};
</script>

<style scoped>
/* Ensure proper RTL support */
[dir="rtl"] .course-header {
  text-align: right;
}

[dir="rtl"] .course-header .flex {
  flex-direction: row-reverse;
}
</style>
