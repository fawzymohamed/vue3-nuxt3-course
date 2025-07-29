<template>
  <div class="course-lesson-nav">
    <div class="flex items-center justify-between mb-3">
      <div class="flex items-center gap-2">
        <h4 class="text-sm font-medium text-gray-900 dark:text-white">
          {{ module.title[locale] }} - {{ $t("course.lessons") }}
        </h4>
        <UBadge variant="soft" size="xs" color="neutral">
          {{ module.lessons.length }}
        </UBadge>
      </div>

      <!-- Module progress -->
      <div
        class="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400"
      >
        <span>{{ moduleProgress }}%</span>
        <UProgress
          :value="moduleProgress"
          size="xs"
          color="primary"
          class="w-16"
        />
      </div>
    </div>

    <!-- Lessons grid -->
    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2"
    >
      <UButton
        v-for="(lesson, index) in module.lessons"
        :key="lesson.id"
        :variant="isCurrentLesson(lesson) ? 'solid' : 'outline'"
        :color="isCurrentLesson(lesson) ? 'primary' : 'neutral'"
        size="sm"
        :to="localePath(`/courses/${course.slug}/${module.id}/${lesson.slug}`)"
        class="justify-start text-left relative overflow-hidden"
      >
        <template #leading>
          <div class="flex items-center gap-2">
            <!-- Lesson status icon -->
            <UIcon
              v-if="isLessonCompleted(course.id, module.id, lesson.id)"
              name="i-heroicons-check-circle-solid"
              class="w-4 h-4 text-green-500 flex-shrink-0"
            />
            <UIcon
              v-else-if="isCurrentLesson(lesson)"
              name="i-heroicons-play-circle-solid"
              class="w-4 h-4 text-blue-500 flex-shrink-0"
            />
            <span
              v-else
              class="w-4 h-4 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-xs font-medium flex-shrink-0"
            >
              {{ index + 1 }}
            </span>

            <!-- Lesson number -->
            <span
              class="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0"
            >
              {{ lesson.number }}.
            </span>
          </div>
        </template>

        <div class="flex-1 min-w-0">
          <div class="truncate font-medium">
            {{ lesson.title[locale] }}
          </div>

          <!-- Lesson meta -->
          <div
            class="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mt-1"
          >
            <div class="flex items-center gap-1">
              <UIcon name="i-heroicons-clock" class="w-3 h-3" />
              <span>{{ lesson.estimatedMinutes }}m</span>
            </div>

            <div v-if="lesson.hasExercise" class="flex items-center gap-1">
              <UIcon name="i-heroicons-code-bracket" class="w-3 h-3" />
              <span>{{ $t("lesson.exercise") }}</span>
            </div>

            <div v-if="lesson.hasQuiz" class="flex items-center gap-1">
              <UIcon name="i-heroicons-question-mark-circle" class="w-3 h-3" />
              <span>{{ $t("lesson.quiz") }}</span>
            </div>
          </div>
        </div>

        <!-- Completion indicator -->
        <div
          v-if="isLessonCompleted(course.id, module.id, lesson.id)"
          class="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full"
        />
      </UButton>
    </div>

    <!-- Lesson navigation buttons -->
    <div
      class="flex items-center justify-between mt-6 pt-4 border-t border-gray-200 dark:border-gray-700"
    >
      <UButton
        v-if="previousLesson"
        :to="
          localePath(
            `/courses/${course.slug}/${module.id}/${previousLesson.slug}`
          )
        "
        variant="outline"
        color="neutral"
        size="sm"
      >
        <template #leading>
          <UIcon name="i-heroicons-chevron-left" class="w-4 h-4" />
        </template>
        {{ $t("lesson.previous") }}
      </UButton>
      <div v-else />

      <UButton
        v-if="nextLesson"
        :to="
          localePath(`/courses/${course.slug}/${module.id}/${nextLesson.slug}`)
        "
        variant="solid"
        color="primary"
        size="sm"
      >
        {{ $t("lesson.next") }}
        <template #trailing>
          <UIcon name="i-heroicons-chevron-right" class="w-4 h-4" />
        </template>
      </UButton>
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
  course: Course;
  module: ModuleMetadata;
  currentLesson?: LessonMetadata;
}

const props = defineProps<Props>();

const { locale } = useI18n();
const localePath = useLocalePath();
const { getCourseProgress, isLessonCompleted } = useCourseProgress();

// Get course progress
const progress = computed(() => getCourseProgress(props.course.id));

// Calculate module progress
const moduleProgress = computed(() => {
  if (!progress.value) return 0;

  const moduleCompletedLessons = progress.value.completedLessons.filter(
    (lessonKey: string) => lessonKey.startsWith(`${props.module.id}.`)
  );

  return Math.round(
    (moduleCompletedLessons.length / props.module.lessons.length) * 100
  );
});

// Check if lesson is current
const isCurrentLesson = (lesson: LessonMetadata) => {
  return props.currentLesson?.id === lesson.id;
};

// Get previous lesson
const previousLesson = computed(() => {
  if (!props.currentLesson) return null;

  const currentIndex = props.module.lessons.findIndex(
    (l) => l.id === props.currentLesson!.id
  );
  return currentIndex > 0 ? props.module.lessons[currentIndex - 1] : null;
});

// Get next lesson
const nextLesson = computed(() => {
  if (!props.currentLesson) return props.module.lessons[0];

  const currentIndex = props.module.lessons.findIndex(
    (l) => l.id === props.currentLesson!.id
  );
  return currentIndex < props.module.lessons.length - 1
    ? props.module.lessons[currentIndex + 1]
    : null;
});
</script>
