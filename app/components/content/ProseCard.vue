<script setup>
defineProps({
  title: {
    type: String,
    default: undefined,
  },
});
</script>

<template>
  <div
    class="prose-card bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 border border-blue-200 dark:border-gray-600 rounded-xl p-8 my-8 shadow-sm"
  >
    <h3
      v-if="title"
      class="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-6 flex items-center gap-3"
    >
      <div class="w-2 h-8 bg-blue-500 rounded-full" />
      {{ title }}
    </h3>
    <div class="prose dark:prose-invert max-w-none leading-9">
      <slot />
    </div>
  </div>
</template>
