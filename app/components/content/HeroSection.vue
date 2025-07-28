<script setup>
// No props needed for this simple wrapper
</script>

<template>
  <div
    class="my-8 py-5 md:py-10 px-1 md:px-5 rounded-lg mb-8 border hero-section bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border-green-100 dark:border-gray-700"
  >
    <div
      class="mx-auto text-2xl md:text-3xl xl:text-4xl text-gray-900 dark:text-gray-100 text-center"
    >
      <div class="prose prose-lg dark:prose-invert max-w-none">
        <slot />
      </div>
    </div>
  </div>
</template>
