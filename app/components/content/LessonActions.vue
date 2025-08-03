<template>
  <div
    class="lesson-actions mt-8 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700"
  >
    <!-- Action header -->
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white">
        {{ $t("lesson.actions.title") }}
      </h3>

      <!-- Lesson completion status -->
      <div v-if="course && module && lesson" class="flex items-center gap-2">
        <UIcon
          :name="
            isCompleted
              ? 'i-heroicons-check-circle-solid'
              : 'i-heroicons-play-circle'
          "
          :class="isCompleted ? 'text-success-500' : 'text-primary-500'"
          class="w-5 h-5"
        />
        <span class="text-sm font-medium">
          {{ isCompleted ? $t("lesson.completed") : $t("lesson.inProgress") }}
        </span>
      </div>
    </div>

    <!-- Action buttons grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      <!-- Mark as complete/incomplete -->
      <UButton
        v-if="!isCompleted"
        @click="handleMarkComplete"
        variant="solid"
        color="primary"
        size="sm"
        class="justify-center"
      >
        <UIcon name="i-heroicons-check" class="w-4 h-4 mr-2" />
        {{ $t("lesson.markComplete") }}
      </UButton>

      <UButton
        v-else
        @click="handleMarkIncomplete"
        variant="outline"
        color="neutral"
        size="sm"
        class="justify-center"
      >
        <UIcon name="i-heroicons-arrow-path" class="w-4 h-4 mr-2" />
        {{ $t("lesson.markIncomplete") }}
      </UButton>

      <!-- Bookmark lesson -->
      <UButton
        @click="handleBookmark"
        variant="outline"
        color="neutral"
        size="sm"
        class="justify-center"
        :class="{
          'bg-yellow-50 border-yellow-200 text-yellow-700': isBookmarked,
        }"
      >
        <UIcon
          :name="
            isBookmarked ? 'i-heroicons-bookmark-solid' : 'i-heroicons-bookmark'
          "
          class="w-4 h-4 mr-2"
        />
        {{ isBookmarked ? $t("lesson.bookmarked") : $t("lesson.bookmark") }}
      </UButton>

      <!-- Take notes -->
      <UButton
        @click="handleTakeNotes"
        variant="outline"
        color="neutral"
        size="sm"
        class="justify-center"
      >
        <UIcon name="i-heroicons-pencil-square" class="w-4 h-4 mr-2" />
        {{ $t("lesson.takeNotes") }}
      </UButton>

      <!-- Report issue -->
      <UButton
        @click="showReportModal = true"
        variant="outline"
        color="neutral"
        size="sm"
        class="justify-center"
      >
        <UIcon name="i-heroicons-flag" class="w-4 h-4 mr-2" />
        {{ $t("lesson.reportIssue") }}
      </UButton>
    </div>

    <!-- Additional actions row -->
    <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <!-- Course progress info -->
        <div
          v-if="course"
          class="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400"
        >
          <div class="flex items-center gap-1">
            <UIcon name="i-heroicons-chart-pie" class="w-4 h-4" />
            <span
              >{{ getCourseProgressPercentage() }}%
              {{ $t("course.complete") }}</span
            >
          </div>

          <div v-if="module" class="flex items-center gap-1">
            <UIcon name="i-heroicons-rectangle-stack" class="w-4 h-4" />
            <span
              >{{ getModuleProgressPercentage() }}%
              {{ $t("common.module") }}</span
            >
          </div>
        </div>

        <!-- Quick navigation -->
        <div class="flex items-center gap-2">
          <UButton
            v-if="course"
            :to="localePath(`/courses/${course.slug}`)"
            variant="ghost"
            color="neutral"
            size="xs"
          >
            {{ $t("course.overview") }}
          </UButton>

          <UButton
            :to="localePath('/courses')"
            variant="ghost"
            color="neutral"
            size="xs"
          >
            {{ $t("navigation.courses") }}
          </UButton>
        </div>
      </div>
    </div>

    <!-- Report issue modal -->
    <UModal v-model="showReportModal">
      <div class="p-6">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {{ $t("lesson.reportIssue") }}
        </h3>

        <FormGroup :label="$t('lesson.reportForm.type')" class="mb-4">
          <USelect
            v-model="reportIssueType"
            :options="reportIssueTypes"
            option-attribute="label"
            value-attribute="value"
          />
        </FormGroup>

        <FormGroup :label="$t('lesson.reportForm.description')" class="mb-4">
          <UTextarea
            v-model="reportIssueDescription"
            :placeholder="$t('lesson.reportForm.placeholder')"
            :rows="4"
          />
        </FormGroup>

        <div class="flex items-center justify-end gap-3">
          <UButton
            @click="showReportModal = false"
            variant="ghost"
            color="neutral"
          >
            {{ $t("common.cancel") }}
          </UButton>

          <UButton
            @click="handleSubmitReport"
            variant="solid"
            color="primary"
            :disabled="!reportIssueType || !reportIssueDescription.trim()"
          >
            {{ $t("common.submit") }}
          </UButton>
        </div>
      </div>
    </UModal>
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
  lesson?: LessonMetadata;
}

const props = defineProps<Props>();

interface Emits {
  (e: "mark-complete"): void;
  (e: "bookmark", lessonId: string): void;
  (e: "report-issue", lessonId: string, issue: string): void;
}

const emit = defineEmits<Emits>();

const { locale } = useI18n();
const localePath = useLocalePath();
const {
  markLessonComplete,
  markLessonIncomplete,
  isLessonCompleted,
  getCourseProgressPercentage: getCourseProgress,
  getModuleProgressPercentage: getModuleProgress,
} = useCourseProgress();

// Component state
const showReportModal = ref(false);
const reportIssueType = ref("");
const reportIssueDescription = ref("");
const isBookmarked = ref(false);

// Report issue types
const reportIssueTypes = computed(() => [
  { value: "content-error", label: "Content Error" },
  { value: "technical-issue", label: "Technical Issue" },
  { value: "suggestion", label: "Suggestion" },
  { value: "other", label: "Other" },
]);

// Check if lesson is completed
const isCompleted = computed(() => {
  if (!props.course || !props.module || !props.lesson) return false;
  return isLessonCompleted(props.course.id, props.module.id, props.lesson.id);
});

// Handle mark as complete
const handleMarkComplete = () => {
  if (props.course && props.module && props.lesson) {
    markLessonComplete(props.course.id, props.module.id, props.lesson.id);
    emit("mark-complete");
  }
};

// Handle mark as incomplete
const handleMarkIncomplete = () => {
  if (props.course && props.module && props.lesson) {
    markLessonIncomplete(props.course.id, props.module.id, props.lesson.id);
  }
};

// Handle bookmark
const handleBookmark = () => {
  if (props.lesson) {
    isBookmarked.value = !isBookmarked.value;
    emit("bookmark", props.lesson.id);
  }
};

// Handle take notes
const handleTakeNotes = () => {
  // For now, just log - in future this could open a notes interface
  console.log("Take notes for lesson:", props.lesson?.id);
};

// Handle submit report
const handleSubmitReport = () => {
  if (
    props.lesson &&
    reportIssueType.value &&
    reportIssueDescription.value.trim()
  ) {
    const issue = `${reportIssueType.value}: ${reportIssueDescription.value}`;
    emit("report-issue", props.lesson.id, issue);

    // Reset form
    reportIssueType.value = "";
    reportIssueDescription.value = "";
    showReportModal.value = false;
  }
};

// Get course progress percentage
const getCourseProgressPercentage = () => {
  if (!props.course) return 0;
  return getCourseProgress(props.course.id);
};

// Get module progress percentage
const getModuleProgressPercentage = () => {
  if (!props.course || !props.module) return 0;
  return getModuleProgress(props.course.id, props.module.id);
};
</script>

<style scoped>
/* Action button hover effects */
.lesson-actions button {
  transition: all 0.2s ease;
}

.lesson-actions button:hover {
  transform: translateY(-1px);
}

/* Bookmarked state styling */
.lesson-actions button.bg-yellow-50 {
  background-color: rgb(254 252 232); /* yellow-50 */
  border-color: rgb(254 240 138); /* yellow-200 */
  color: rgb(161 98 7); /* yellow-700 */
}

/* Dark mode support for bookmarked state */
:root.dark .lesson-actions button.bg-yellow-50 {
  background-color: rgba(161 98 7, 0.1);
  border-color: rgba(161 98 7, 0.3);
  color: rgb(254 240 138);
}

/* Responsive grid adjustments */
@media (max-width: 640px) {
  .lesson-actions .grid {
    grid-template-columns: 1fr;
  }
}

@media (min-width: 641px) and (max-width: 1023px) {
  .lesson-actions .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
