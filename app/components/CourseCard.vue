<template>
  <NuxtLink :to="localePath(`/courses/${course.slug}`)" class="block">
    <UCard
      class="course-card group hover:shadow-lg transition-all duration-300 cursor-pointer"
    >
      <template #header>
        <div class="relative overflow-hidden">
          <img
            :src="course.thumbnail"
            :alt="course.title[locale]"
            class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div class="absolute top-3 right-3">
            <UBadge :color="difficultyColor" variant="solid" size="sm">
              {{ $t(`difficulty.${course.difficulty}`) }}
            </UBadge>
          </div>
          <div
            v-if="course.price.type === 'free'"
            class="absolute top-3 left-3"
          >
            <UBadge color="success" variant="solid" size="sm">
              {{ $t("course.free") }}
            </UBadge>
          </div>
        </div>
      </template>

      <div class="p-4">
        <h3
          class="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2"
        >
          {{ course.title[locale] }}
        </h3>

        <p class="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
          {{ course.description[locale] }}
        </p>

        <div class="course-meta flex flex-wrap items-center gap-2 mb-4">
          <div
            class="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400"
          >
            <UIcon name="i-heroicons-clock" class="w-4 h-4" />
            <span>{{ course.estimatedHours }} {{ $t("course.hours") }}</span>
          </div>

          <div
            class="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400"
          >
            <UIcon name="i-heroicons-rectangle-stack" class="w-4 h-4" />
            <span>{{ course.modules.length }} {{ $t("course.modules") }}</span>
          </div>

          <div
            v-if="course.rating"
            class="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400"
          >
            <UIcon
              name="i-heroicons-star-solid"
              class="w-4 h-4 text-yellow-400"
            />
            <span>{{ course.rating.average }}</span>
            <span>({{ course.rating.count }})</span>
          </div>
        </div>

        <!-- Technologies -->
        <div class="flex flex-wrap gap-1 mb-4">
          <UBadge
            v-for="tech in course.technologies.slice(0, 3)"
            :key="tech"
            variant="soft"
            size="xs"
            color="neutral"
          >
            {{ tech }}
          </UBadge>
          <UBadge
            v-if="course.technologies.length > 3"
            variant="soft"
            size="xs"
            color="neutral"
          >
            +{{ course.technologies.length - 3 }}
          </UBadge>
        </div>

        <!-- Course Features -->
        <div
          class="flex flex-wrap gap-2 text-xs text-gray-500 dark:text-gray-400"
        >
          <div
            v-if="course.config?.features?.hasQuizzes"
            class="flex items-center gap-1"
          >
            <UIcon name="i-heroicons-question-mark-circle" class="w-3 h-3" />
            <span>{{ $t("course.features.hasQuizzes") }}</span>
          </div>
          <div
            v-if="course.config?.features?.hasExercises"
            class="flex items-center gap-1"
          >
            <UIcon name="i-heroicons-code-bracket" class="w-3 h-3" />
            <span>{{ $t("course.features.hasExercises") }}</span>
          </div>
          <div
            v-if="course.config?.features?.hasCertificates"
            class="flex items-center gap-1"
          >
            <UIcon name="i-heroicons-academic-cap" class="w-3 h-3" />
            <span>{{ $t("course.features.hasCertificates") }}</span>
          </div>
        </div>

        <!-- Progress indicator if user has started the course -->
        <div v-if="progress && progress.progressPercentage > 0" class="mt-4">
          <div
            class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1"
          >
            <span>{{ $t("course.progress") }}</span>
            <span>{{ progress.progressPercentage }}%</span>
          </div>
          <UProgress
            :value="progress.progressPercentage"
            size="sm"
            color="primary"
          />
        </div>
      </div>

      <template #footer>
        <div class="flex items-center justify-between p-4 pt-0">
          <div class="instructor-info flex items-center gap-2">
            <img
              :src="course.instructor.avatar || '/default-avatar.png'"
              :alt="course.instructor.name"
              class="w-6 h-6 rounded-full object-cover"
            />
            <span class="text-xs text-gray-500 dark:text-gray-400">
              {{ course.instructor.name }}
            </span>
          </div>

          <UButton
            size="xs"
            color="primary"
            variant="ghost"
            :label="
              (progress?.progressPercentage || 0) > 0
                ? $t('course.continue')
                : $t('course.startLearning')
            "
          />
        </div>
      </template>
    </UCard>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Course } from "../../types/course";

interface Props {
  course: Course;
}

const props = defineProps<Props>();

const { locale } = useI18n();
const localePath = useLocalePath();
const { getCourseProgress } = useCourseProgress();

// Get user progress for this course
const progress = computed(() => getCourseProgress(props.course.id));

// Determine difficulty badge color - using UBadge compatible colors
const difficultyColor = computed(() => {
  switch (props.course.difficulty) {
    case "beginner":
      return "success";
    case "intermediate":
      return "warning";
    case "advanced":
      return "error";
    default:
      return "neutral";
  }
});
</script>

<style scoped>
.course-card {
  cursor: pointer;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-clamp: 2;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-clamp: 3;
}
</style>
