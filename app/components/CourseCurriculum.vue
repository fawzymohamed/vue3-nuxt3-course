<script setup lang="ts">
interface Props {
  course: any;
}

const props = defineProps<Props>();

const { t, locale } = useI18n();
const localePath = useLocalePath();
const { getCourseProgress } = useCourseProgress();

// Get progress data
const courseProgress = computed(() => getCourseProgress(props.course.id));

// Check if lesson is completed
const isLessonCompleted = (moduleId: string, lessonId: string) => {
  const lessonKey = `${props.course.id}.${moduleId}.${lessonId}`;
  const progress = courseProgress.value as any;
  return progress && progress[lessonKey]?.completed;
};

// Calculate module progress
const getModuleProgress = (module: any) => {
  const totalLessons = module.lessons.length;
  const completedLessons = module.lessons.filter((lesson: any) =>
    isLessonCompleted(module.id, lesson.id)
  ).length;

  return {
    completed: completedLessons,
    total: totalLessons,
    percentage: totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0,
  };
};

// Calculate total course stats
const courseStats = computed(() => {
  let totalLessons = 0;
  let completedLessons = 0;
  let totalDuration = 0;

  props.course.modules.forEach((module: any) => {
    totalLessons += module.lessons.length;
    totalDuration += module.estimatedMinutes || 0;

    module.lessons.forEach((lesson: any) => {
      if (isLessonCompleted(module.id, lesson.id)) {
        completedLessons++;
      }
    });
  });

  return {
    totalLessons,
    completedLessons,
    totalDuration,
    completionPercentage:
      totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0,
  };
});

// Format duration
const formatDuration = (minutes: number) => {
  if (minutes < 60) {
    return `${minutes} ${t("course.minutes")}`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (remainingMinutes === 0) {
    return `${hours} ${t("course.hours")}`;
  }
  return `${hours}h ${remainingMinutes}m`;
};

// Expandable modules state
const expandedModules = ref<Set<string>>(new Set());

const toggleModule = (moduleId: string) => {
  if (expandedModules.value.has(moduleId)) {
    expandedModules.value.delete(moduleId);
  } else {
    expandedModules.value.add(moduleId);
  }
};

const isModuleExpanded = (moduleId: string) => {
  return expandedModules.value.has(moduleId);
};

// Expand first module by default
onMounted(() => {
  if (props.course.modules.length > 0) {
    expandedModules.value.add(props.course.modules[0].id);
  }
});
</script>

<template>
  <div class="course-curriculum">
    <!-- Course Overview Stats -->
    <div class="mb-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div>
          <div
            class="text-2xl font-bold text-primary-600 dark:text-primary-400"
          >
            {{ course.modules.length }}
          </div>
          <div class="text-sm text-gray-600 dark:text-gray-300">
            {{ $t("course.modules") }}
          </div>
        </div>
        <div>
          <div
            class="text-2xl font-bold text-primary-600 dark:text-primary-400"
          >
            {{ courseStats.totalLessons }}
          </div>
          <div class="text-sm text-gray-600 dark:text-gray-300">
            {{ $t("course.lessons") }}
          </div>
        </div>
        <div>
          <div
            class="text-2xl font-bold text-primary-600 dark:text-primary-400"
          >
            {{ course.estimatedHours }}h
          </div>
          <div class="text-sm text-gray-600 dark:text-gray-300">
            {{ $t("course.totalDuration") }}
          </div>
        </div>
        <div>
          <div
            class="text-2xl font-bold text-primary-600 dark:text-primary-400"
          >
            {{ Math.round(courseStats.completionPercentage) }}%
          </div>
          <div class="text-sm text-gray-600 dark:text-gray-300">
            {{ $t("course.completed") }}
          </div>
        </div>
      </div>
    </div>

    <!-- Module List -->
    <div class="space-y-4">
      <div
        v-for="(module, moduleIndex) in course.modules"
        :key="module.id"
        class="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
      >
        <!-- Module Header -->
        <button
          @click="toggleModule(module.id)"
          class="w-full p-4 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left flex items-center justify-between"
        >
          <div class="flex-1">
            <div class="flex items-center gap-3 mb-2">
              <span
                class="flex-shrink-0 w-8 h-8 bg-primary-100 dark:bg-primary-800 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-sm font-semibold"
              >
                {{ moduleIndex + 1 }}
              </span>
              <h3 class="font-semibold text-gray-900 dark:text-white">
                {{ module.title[locale] }}
              </h3>
            </div>

            <p class="text-sm text-gray-600 dark:text-gray-300 mb-3 ml-11">
              {{ module.description[locale] }}
            </p>

            <!-- Module Stats -->
            <div
              class="flex items-center gap-4 ml-11 text-xs text-gray-500 dark:text-gray-400"
            >
              <span class="flex items-center gap-1">
                <UIcon name="i-heroicons-play-circle" class="w-3 h-3" />
                {{ module.lessons.length }} {{ $t("course.lessons") }}
              </span>
              <span
                v-if="module.estimatedMinutes"
                class="flex items-center gap-1"
              >
                <UIcon name="i-heroicons-clock" class="w-3 h-3" />
                {{ formatDuration(module.estimatedMinutes) }}
              </span>
              <span class="flex items-center gap-1">
                <UIcon name="i-heroicons-check-circle" class="w-3 h-3" />
                {{ getModuleProgress(module).completed }}/{{
                  getModuleProgress(module).total
                }}
                {{ $t("course.completed") }}
              </span>
            </div>

            <!-- Module Progress Bar -->
            <div class="ml-11 mt-2">
              <UProgress
                :value="getModuleProgress(module).percentage"
                size="sm"
                :color="
                  getModuleProgress(module).percentage === 100
                    ? 'success'
                    : 'primary'
                "
              />
            </div>
          </div>

          <!-- Expand/Collapse Icon -->
          <UIcon
            :name="
              isModuleExpanded(module.id)
                ? 'i-heroicons-chevron-up'
                : 'i-heroicons-chevron-down'
            "
            class="w-5 h-5 text-gray-400 transition-transform"
          />
        </button>

        <!-- Module Content (Lessons) -->
        <div
          v-if="isModuleExpanded(module.id)"
          class="border-t border-gray-200 dark:border-gray-700"
        >
          <div class="p-4 space-y-2">
            <div
              v-for="(lesson, lessonIndex) in module.lessons"
              :key="lesson.id"
              class="group"
            >
              <NuxtLink
                :to="
                  localePath(
                    `/courses/${course.slug}/${module.id}/${lesson.slug}`
                  )
                "
                class="flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <!-- Lesson Number/Status -->
                <div class="flex-shrink-0 mr-3">
                  <div
                    v-if="isLessonCompleted(module.id, lesson.id)"
                    class="w-6 h-6 bg-green-100 dark:bg-green-800 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center"
                  >
                    <UIcon name="i-heroicons-check" class="w-3 h-3" />
                  </div>
                  <div
                    v-else
                    class="w-6 h-6 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full flex items-center justify-center text-xs font-medium"
                  >
                    {{ lessonIndex + 1 }}
                  </div>
                </div>

                <!-- Lesson Info -->
                <div class="flex-1 min-w-0">
                  <div class="flex items-center justify-between">
                    <h4
                      class="text-sm font-medium text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors"
                    >
                      {{ lesson.title[locale] }}
                    </h4>

                    <!-- Lesson Features -->
                    <div class="flex items-center gap-2 ml-2">
                      <UBadge
                        v-if="lesson.hasExercise"
                        size="xs"
                        variant="outline"
                        color="warning"
                      >
                        {{ $t("course.exercise") }}
                      </UBadge>
                      <UBadge
                        v-if="lesson.hasQuiz"
                        size="xs"
                        variant="outline"
                        color="info"
                      >
                        {{ $t("course.quiz") }}
                      </UBadge>
                    </div>
                  </div>

                  <!-- Lesson Duration -->
                  <div
                    v-if="lesson.estimatedMinutes"
                    class="flex items-center gap-1 mt-1 text-xs text-gray-500 dark:text-gray-400"
                  >
                    <UIcon name="i-heroicons-clock" class="w-3 h-3" />
                    {{ formatDuration(lesson.estimatedMinutes) }}
                  </div>
                </div>

                <!-- Play Icon -->
                <UIcon
                  name="i-heroicons-play-circle"
                  class="w-5 h-5 text-gray-400 group-hover:text-primary-500 transition-colors ml-2"
                />
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Course Completion Call-to-Action -->
    <div
      v-if="
        courseStats.completionPercentage > 0 &&
        courseStats.completionPercentage < 100
      "
      class="mt-8 p-6 bg-primary-50 dark:bg-primary-900/20 rounded-lg text-center"
    >
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {{ $t("course.keepLearning") }}
      </h3>
      <p class="text-gray-600 dark:text-gray-300 mb-4">
        {{
          $t("course.progressMessage", {
            completed: courseStats.completedLessons,
            total: courseStats.totalLessons,
          })
        }}
      </p>
      <UProgress :value="courseStats.completionPercentage" class="mb-4" />
    </div>
  </div>
</template>
