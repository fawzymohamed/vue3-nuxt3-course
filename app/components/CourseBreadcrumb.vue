<template>
  <nav class="course-breadcrumb" aria-label="Breadcrumb">
    <ol class="flex items-center space-x-2 text-sm">
      <!-- Platform home -->
      <li>
        <NuxtLink
          :to="localePath('/')"
          class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
        >
          {{ $t("navigation.home") }}
        </NuxtLink>
      </li>

      <li>
        <UIcon name="i-heroicons-chevron-right" class="w-4 h-4 text-gray-400" />
      </li>

      <!-- All courses -->
      <li>
        <NuxtLink
          :to="localePath('/courses')"
          class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
        >
          {{ $t("navigation.courses") }}
        </NuxtLink>
      </li>

      <li>
        <UIcon name="i-heroicons-chevron-right" class="w-4 h-4 text-gray-400" />
      </li>

      <!-- Current course -->
      <li>
        <NuxtLink
          :to="localePath(`/courses/${course.slug}`)"
          class="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 font-medium transition-colors"
        >
          {{ course.title[locale] }}
        </NuxtLink>
      </li>

      <!-- Current module -->
      <template v-if="currentModule">
        <li>
          <UIcon
            name="i-heroicons-chevron-right"
            class="w-4 h-4 text-gray-400"
          />
        </li>
        <li>
          <span class="text-gray-700 dark:text-gray-300 font-medium">
            {{ currentModule.title[locale] }}
          </span>
        </li>
      </template>

      <!-- Current lesson -->
      <template v-if="currentLesson">
        <li>
          <UIcon
            name="i-heroicons-chevron-right"
            class="w-4 h-4 text-gray-400"
          />
        </li>
        <li>
          <span class="text-gray-900 dark:text-gray-100 font-semibold">
            {{ currentLesson.title[locale] }}
          </span>
        </li>
      </template>
    </ol>
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

defineProps<Props>();

const { locale } = useI18n();
const localePath = useLocalePath();
</script>
