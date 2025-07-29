<template>
  <div class="course-module-nav">
    <div class="flex items-center gap-2 mb-3">
      <h3 class="text-sm font-medium text-gray-900 dark:text-white">
        {{ $t("course.modules") }}
      </h3>
      <UBadge variant="soft" size="xs" color="neutral">
        {{ course.modules.length }}
      </UBadge>
    </div>

    <div class="flex flex-wrap gap-2">
      <UButton
        v-for="(module, index) in course.modules"
        :key="module.id"
        :variant="isCurrentModule(module) ? 'solid' : 'outline'"
        :color="isCurrentModule(module) ? 'primary' : 'neutral'"
        size="sm"
        :to="localePath(`/courses/${course.slug}/${module.id}`)"
        class="relative"
      >
        <template #leading>
          <UIcon
            v-if="isModuleCompleted(module)"
            name="i-heroicons-check-circle-solid"
            class="w-4 h-4 text-green-500"
          />
          <UIcon
            v-else-if="isModuleInProgress(module)"
            name="i-heroicons-play-circle-solid"
            class="w-4 h-4 text-blue-500"
          />
          <span
            v-else
            class="w-4 h-4 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-xs font-medium"
          >
            {{ index + 1 }}
          </span>
        </template>

        <span class="truncate max-w-32">
          {{ module.title[locale] }}
        </span>

        <!-- Progress indicator -->
        <div
          v-if="getModuleProgress(module) > 0"
          class="absolute bottom-0 left-0 h-0.5 bg-primary-500 transition-all duration-300"
          :style="{ width: `${getModuleProgress(module)}%` }"
        />
      </UButton>
    </div>

    <!-- Current module details -->
    <div
      v-if="currentModule"
      class="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
    >
      <div class="flex items-center justify-between mb-2">
        <h4 class="font-medium text-gray-900 dark:text-white">
          {{ currentModule.title[locale] }}
        </h4>
        <UBadge variant="soft" size="xs" color="neutral">
          {{ currentModule.lessons.length }} {{ $t("course.lessons") }}
        </UBadge>
      </div>

      <p class="text-sm text-gray-600 dark:text-gray-300 mb-3">
        {{ currentModule.description[locale] }}
      </p>

      <div
        class="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400"
      >
        <div class="flex items-center gap-1">
          <UIcon name="i-heroicons-clock" class="w-3 h-3" />
          <span
            >{{ currentModule.estimatedMinutes }}
            {{ $t("course.minutes") }}</span
          >
        </div>

        <div class="flex items-center gap-1">
          <UIcon name="i-heroicons-chart-bar" class="w-3 h-3" />
          <span
            >{{ getModuleProgress(currentModule) }}%
            {{ $t("course.completed") }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Course, ModuleMetadata } from "../../types/course";

interface Props {
  course: Course;
  currentModule?: ModuleMetadata;
}

const props = defineProps<Props>();

const { locale } = useI18n();
const localePath = useLocalePath();
const { getCourseProgress } = useCourseProgress();

// Get course progress
const progress = computed(() => getCourseProgress(props.course.id));

// Check if module is current
const isCurrentModule = (module: ModuleMetadata) => {
  return props.currentModule?.id === module.id;
};

// Get module progress percentage
const getModuleProgress = (module: ModuleMetadata) => {
  if (!progress.value) return 0;

  const moduleCompletedLessons = progress.value.completedLessons.filter(
    (lessonKey: string) => lessonKey.startsWith(`${module.id}.`)
  );

  return Math.round(
    (moduleCompletedLessons.length / module.lessons.length) * 100
  );
};

// Check if module is completed
const isModuleCompleted = (module: ModuleMetadata) => {
  return getModuleProgress(module) === 100;
};

// Check if module is in progress
const isModuleInProgress = (module: ModuleMetadata) => {
  const progressPercent = getModuleProgress(module);
  return progressPercent > 0 && progressPercent < 100;
};
</script>
