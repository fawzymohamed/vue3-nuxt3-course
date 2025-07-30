<template>
  <div class="enhanced-course-module-nav">
    <!-- Module navigation header -->
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
        {{ $t("course.modules") }}
      </h3>
      <UBadge variant="soft" size="sm" color="primary">
        {{ modules.length }} {{ $t("course.modules").toLowerCase() }}
      </UBadge>
    </div>

    <!-- Module navigation with disclosure panels -->
    <div class="space-y-3">
      <div
        v-for="module in modules"
        :key="module.id"
        class="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
      >
        <!-- Module header button -->
        <UButton
          :color="isCurrentModule(module) ? 'primary' : 'neutral'"
          :variant="isCurrentModule(module) ? 'solid' : 'ghost'"
          class="w-full justify-between p-4"
          size="lg"
          @click="toggleModule(module.id)"
        >
          <div class="flex items-center gap-3">
            <!-- Module number -->
            <div
              class="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 text-sm font-semibold"
            >
              {{ module.number }}
            </div>

            <!-- Module info -->
            <div class="text-left">
              <div class="font-medium">
                {{ module.title[locale] }}
              </div>
              <div class="text-xs opacity-80">
                {{ module.lessons.length }}
                {{ $t("course.lessons").toLowerCase() }} •
                {{ module.estimatedMinutes }}min
              </div>
            </div>
          </div>

          <!-- Progress indicator -->
          <div class="flex items-center gap-2">
            <div class="w-16">
              <UProgress
                :value="getModuleProgress(module)"
                size="xs"
                color="primary"
              />
            </div>
            <span class="text-xs font-medium">
              {{ getModuleProgress(module) }}%
            </span>
            <UIcon
              :name="
                isModuleOpen(module.id)
                  ? 'i-heroicons-chevron-up'
                  : 'i-heroicons-chevron-down'
              "
              class="w-4 h-4"
            />
          </div>
        </UButton>

        <!-- Module content (lessons) -->
        <div
          v-if="isModuleOpen(module.id)"
          class="p-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700"
        >
          <!-- Module description -->
          <p
            v-if="module.description?.[locale]"
            class="text-sm text-gray-600 dark:text-gray-300 mb-3"
          >
            {{ module.description[locale] }}
          </p>

          <!-- Lesson list -->
          <div class="space-y-1">
            <NuxtLink
              v-for="lesson in module.lessons"
              :key="lesson.id"
              :to="
                localePath(
                  `/courses/${course.slug}/${module.id}/${lesson.slug}`
                )
              "
              class="flex items-center gap-3 p-2 rounded-md hover:bg-white dark:hover:bg-gray-700 transition-colors group"
              :class="{
                'bg-white dark:bg-gray-700 shadow-sm': isCurrentLesson(lesson),
                'text-primary-600 dark:text-primary-400':
                  isCurrentLesson(lesson),
              }"
            >
              <!-- Lesson status -->
              <div class="flex-shrink-0">
                <UIcon
                  v-if="isLessonCompleted(course.id, module.id, lesson.id)"
                  name="i-heroicons-check-circle-solid"
                  class="w-4 h-4 text-success-500"
                />
                <UIcon
                  v-else-if="isCurrentLesson(lesson)"
                  name="i-heroicons-play-circle-solid"
                  class="w-4 h-4 text-primary-500"
                />
                <div
                  v-else
                  class="w-4 h-4 rounded-full border-2 border-gray-300 dark:border-gray-600 group-hover:border-primary-400"
                />
              </div>

              <!-- Lesson info -->
              <div class="flex-1 min-w-0">
                <div class="font-medium truncate">
                  {{ lesson.title[locale] }}
                </div>
                <div
                  class="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400"
                >
                  <span>{{ lesson.estimatedMinutes }}min</span>
                  <span
                    v-if="lesson.hasExercise"
                    class="flex items-center gap-1"
                  >
                    <UIcon name="i-heroicons-code-bracket" class="w-3 h-3" />
                    Exercise
                  </span>
                  <span v-if="lesson.hasQuiz" class="flex items-center gap-1">
                    <UIcon
                      name="i-heroicons-question-mark-circle"
                      class="w-3 h-3"
                    />
                    Quiz
                  </span>
                </div>
              </div>

              <!-- Lesson number -->
              <div class="text-xs text-gray-400 font-mono">
                {{ lesson.number }}
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Overall course progress -->
    <div class="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <div class="flex items-center justify-between mb-2">
        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
          {{ $t("course.overallProgress") }}
        </span>
        <span
          class="text-sm font-semibold text-primary-600 dark:text-primary-400"
        >
          {{ overallProgress }}%
        </span>
      </div>
      <UProgress :value="overallProgress" size="sm" color="primary" />
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
  modules: ModuleMetadata[];
  currentModule?: ModuleMetadata;
  currentLesson?: LessonMetadata;
}

const props = defineProps<Props>();

const { locale } = useI18n();
const localePath = useLocalePath();
const { getCourseProgress, isLessonCompleted } = useCourseProgress();

// State for managing open/closed modules
const openModules = ref(new Set<string>());

// Initialize with current module open
onMounted(() => {
  if (props.currentModule) {
    openModules.value.add(props.currentModule.id);
  }
});

// Get course progress
const progress = computed(() => getCourseProgress(props.course.id));

// Check if module is current
const isCurrentModule = (module: ModuleMetadata) => {
  return props.currentModule?.id === module.id;
};

// Check if lesson is current
const isCurrentLesson = (lesson: LessonMetadata) => {
  return props.currentLesson?.id === lesson.id;
};

// Check if module is open
const isModuleOpen = (moduleId: string) => {
  return openModules.value.has(moduleId);
};

// Toggle module open/closed
const toggleModule = (moduleId: string) => {
  if (openModules.value.has(moduleId)) {
    openModules.value.delete(moduleId);
  } else {
    openModules.value.add(moduleId);
  }
};

// Calculate module progress
const getModuleProgress = (module: ModuleMetadata) => {
  if (!progress.value || !Array.isArray(progress.value.completedLessons))
    return 0;

  const moduleCompletedLessons = progress.value.completedLessons.filter(
    (lessonKey: string) =>
      typeof lessonKey === "string" && lessonKey.startsWith(`${module.id}.`)
  );

  return Math.round(
    (moduleCompletedLessons.length / module.lessons.length) * 100
  );
};

// Calculate overall course progress
const overallProgress = computed(() => {
  if (!progress.value) return 0;

  const totalLessons = props.modules.reduce(
    (total, module) => total + module.lessons.length,
    0
  );
  const completedLessons = Array.isArray(progress.value.completedLessons)
    ? progress.value.completedLessons.length
    : 0;

  return Math.round((completedLessons / totalLessons) * 100);
});
</script>
