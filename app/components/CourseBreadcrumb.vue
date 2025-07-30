<template>
  <nav class="course-breadcrumb" :aria-label="$t('navigation.breadcrumb')">
    <UBreadcrumb :links="breadcrumbLinks" />
  </nav>
</template>

<script setup lang="ts">
import type {
  Course,
  ModuleMetadata,
  LessonMetadata,
} from "../../types/course";

interface Props {
  course?: Course;
  currentModule?: ModuleMetadata;
  currentLesson?: LessonMetadata;
  showHome?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  showHome: true,
});

const { locale } = useI18n();
const localePath = useLocalePath();

// Generate breadcrumb links based on current context
const breadcrumbLinks = computed(() => {
  const links = [];

  // Platform home
  if (props.showHome) {
    links.push({
      label: "Learnova Academy",
      to: localePath("/"),
      icon: "i-heroicons-home",
    });
  }

  // All courses
  links.push({
    label: "Courses",
    to: localePath("/courses"),
    icon: "i-heroicons-academic-cap",
  });

  // Current course
  if (props.course) {
    links.push({
      label: props.course.title[locale.value] || props.course.title.en,
      to: localePath(`/courses/${props.course.slug}`),
      icon: "i-heroicons-book-open",
    });
  }

  // Current module
  if (props.currentModule && props.course) {
    links.push({
      label:
        props.currentModule.title[locale.value] || props.currentModule.title.en,
      to: localePath(
        `/courses/${props.course.slug}#module-${props.currentModule.id}`
      ),
      icon: "i-heroicons-rectangle-stack",
    });
  }

  // Current lesson
  if (props.currentLesson && props.course && props.currentModule) {
    links.push({
      label:
        props.currentLesson.title[locale.value] || props.currentLesson.title.en,
      to: localePath(
        `/courses/${props.course.slug}/${props.currentModule.id}/${props.currentLesson.slug}`
      ),
      icon: "i-heroicons-document-text",
    });
  }

  return links;
});
</script>

<style scoped>
.course-breadcrumb {
  margin-bottom: 1rem;
}
</style>
