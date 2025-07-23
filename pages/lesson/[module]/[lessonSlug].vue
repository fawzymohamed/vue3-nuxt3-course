<script setup>
const route = useRoute();

// Get module and lesson slug from route params
const module = route.params.module;
const lessonSlug = route.params.lessonSlug;

// Get current locale
// const { locale } = useI18n();

// Get content with appropriate locale path
const { data: home } = await useAsyncData(() =>
  queryCollection("content").path(`/lesson/${module}/${lessonSlug}`).first()
);
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Module: {{ module }}</h1>
    <h2 class="text-xl mb-2">Lesson: {{ lessonSlug }}</h2>
    <ContentRenderer v-if="home" :value="home" />
  </div>
</template>
