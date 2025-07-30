<template>
  <div class="lesson-content">
    <!-- Course context header -->
    <CourseHeader
      v-if="showCourseHeader"
      :course="course"
      :module="module"
      :lesson="lesson"
    />

    <!-- Enhanced content renderer with course-aware styling -->
    <div
      class="prose prose-lg dark:prose-invert max-w-none default-content"
      :class="{ 'course-branded': course?.config?.theme?.primaryColor }"
    >
      <ContentRenderer
        :value="lesson"
        :data="{ course, module, lesson: lessonMetadata }"
      />
    </div>

    <!-- Course-specific lesson navigation -->
    <LessonNavigation
      v-if="showNavigation"
      :course="course"
      :current-lesson="lessonMetadata"
      :current-module="module"
      @navigate="handleNavigation"
      @complete="handleLessonComplete"
    />

    <!-- Lesson progress actions -->
    <LessonActions
      v-if="showActions"
      :course="course"
      :lesson="lessonMetadata"
      :module="module"
      @mark-complete="handleLessonComplete"
      @bookmark="handleBookmark"
      @report-issue="handleReportIssue"
    />
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
  lesson: any; // Nuxt Content document
  lessonMetadata?: LessonMetadata;
  showCourseHeader?: boolean;
  showNavigation?: boolean;
  showActions?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  showCourseHeader: true,
  showNavigation: true,
  showActions: true,
});

interface Emits {
  (e: "navigate", lesson: LessonMetadata): void;
  (e: "complete", lessonId: string): void;
  (e: "bookmark", lessonId: string): void;
  (e: "report-issue", lessonId: string, issue: string): void;
}

const emit = defineEmits<Emits>();

const localePath = useLocalePath();
const { markLessonComplete, isLessonCompleted } = useCourseProgress();

// Handle lesson navigation
const handleNavigation = (lesson: LessonMetadata) => {
  emit("navigate", lesson);
};

// Handle lesson completion
const handleLessonComplete = () => {
  if (props.course && props.module && props.lessonMetadata) {
    markLessonComplete(
      props.course.id,
      props.module.id,
      props.lessonMetadata.id
    );
    emit("complete", props.lessonMetadata.id);
  }
};

// Handle lesson bookmarking
const handleBookmark = () => {
  if (props.lessonMetadata) {
    emit("bookmark", props.lessonMetadata.id);
  }
};

// Handle issue reporting
const handleReportIssue = (issue: string) => {
  if (props.lessonMetadata) {
    emit("report-issue", props.lessonMetadata.id, issue);
  }
};

// Apply course-specific styling
const contentStyle = computed(() => {
  if (!props.course?.config?.theme) return {};

  const theme = props.course.config.theme;
  return {
    "--course-primary": theme.primaryColor || "#00DC82",
    "--course-accent": theme.accentColor || "#00A9E0",
  };
});

// Check if lesson is completed
const isCompleted = computed(() => {
  if (!props.course || !props.module || !props.lessonMetadata) return false;
  return isLessonCompleted(
    props.course.id,
    props.module.id,
    props.lessonMetadata.id
  );
});
</script>

<style scoped>
.lesson-content {
  --course-primary: #00dc82;
  --course-accent: #00a9e0;
}

/* Apply course-specific theming */
.course-branded :deep(.prose h1),
.course-branded :deep(.prose h2) {
  color: var(--course-primary);
}

.course-branded :deep(.prose a) {
  color: var(--course-primary);
}

.course-branded :deep(.prose a:hover) {
  color: var(--course-accent);
}

/* Enhanced content styling for course context */
.default-content :deep(.prose) {
  color: rgb(31 41 55); /* gray-800 */
}

.default-content :deep(.prose h1) {
  font-size: 1.875rem; /* text-2xl */
  font-weight: 700; /* font-bold */
  color: rgb(17 24 39); /* gray-900 */
  margin-bottom: 1.5rem; /* mb-6 */
}

.default-content :deep(.prose h2) {
  font-size: 1.5rem; /* text-xl */
  font-weight: 600; /* font-semibold */
  color: rgb(31 41 55); /* gray-800 */
  margin-top: 2rem; /* mt-8 */
  margin-bottom: 1rem; /* mb-4 */
}

.default-content :deep(.prose h3) {
  font-size: 1.25rem; /* text-lg */
  font-weight: 500; /* font-medium */
  color: rgb(55 65 81); /* gray-700 */
  margin-top: 1.5rem; /* mt-6 */
  margin-bottom: 0.75rem; /* mb-3 */
}

/* Course-specific content blocks */
.lesson-content :deep(.content-section) {
  margin: 2rem 0; /* my-8 */
}

.lesson-content :deep(.lesson-objectives) {
  background-color: rgb(239 246 255); /* bg-blue-50 */
  border-radius: 0.5rem; /* rounded-lg */
  padding: 1.5rem; /* p-6 */
  border-left: 4px solid rgb(59 130 246); /* border-l-4 border-blue-500 */
  margin: 1.5rem 0; /* my-6 */
}

.lesson-content :deep(.lesson-summary) {
  background-color: rgb(240 253 244); /* bg-green-50 */
  border-radius: 0.5rem; /* rounded-lg */
  padding: 1.5rem; /* p-6 */
  border-left: 4px solid rgb(34 197 94); /* border-l-4 border-green-500 */
  margin: 1.5rem 0; /* my-6 */
}

/* Dark mode support */
:root.dark .default-content :deep(.prose) {
  color: rgb(229 231 235); /* text-gray-200 */
}

:root.dark .default-content :deep(.prose h1) {
  color: rgb(255 255 255); /* text-white */
}

:root.dark .default-content :deep(.prose h2) {
  color: rgb(243 244 246); /* text-gray-100 */
}

:root.dark .default-content :deep(.prose h3) {
  color: rgb(229 231 235); /* text-gray-200 */
}

:root.dark .lesson-content :deep(.lesson-objectives) {
  background-color: rgba(30 58 138, 0.2); /* bg-blue-900/20 */
}

:root.dark .lesson-content :deep(.lesson-summary) {
  background-color: rgba(20 83 45, 0.2); /* bg-green-900/20 */
}
</style>
