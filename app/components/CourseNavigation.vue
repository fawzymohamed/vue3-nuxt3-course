<template>
  <nav
    class="course-navigation bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Course breadcrumb -->
      <CourseBreadcrumb
        :course="course"
        :current-module="currentModule"
        :current-lesson="currentLesson"
        class="py-3"
      />

      <!-- Module navigation -->
      <div
        class="flex items-center justify-between py-3 border-t border-gray-100 dark:border-gray-800"
      >
        <CourseModuleNav
          :course="course"
          :current-module="currentModule"
          class="flex-1"
        />

        <!-- Progress indicator -->
        <div
          v-if="progress"
          class="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300"
        >
          <span
            >{{ $t("course.progress") }}:
            {{ progress.progressPercentage }}%</span
          >
          <UProgress
            :value="progress.progressPercentage"
            size="sm"
            color="primary"
            class="w-24"
          />
        </div>
      </div>

      <!-- Lesson navigation within module -->
      <div
        v-if="currentModule"
        class="py-3 border-t border-gray-100 dark:border-gray-800"
      >
        <CourseLessonNav
          :course="course"
          :module="currentModule"
          :current-lesson="currentLesson"
        />
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import type {
  Course,
  ModuleMetadata,
  LessonMetadata,
} from "../../types/course";

interface Props {
  course: Course;
  currentModule?: ModuleMetadata;
  currentLesson?: LessonMetadata;
}

const props = defineProps<Props>();

const { getCourseProgress } = useCourseProgress();

// Get course progress
const progress = computed(() => getCourseProgress(props.course.id));
</script>
