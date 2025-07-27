<script setup>
import { ref } from "vue";

// Enhanced code example wrapper with copy functionality
const copied = ref(false);

const copyCode = async () => {
  try {
    const codeElement = document.querySelector(".code-example pre code");
    if (codeElement) {
      const text = codeElement.textContent || "";
      await navigator.clipboard.writeText(text);
      copied.value = true;
      setTimeout(() => {
        copied.value = false;
      }, 2000);
    }
  } catch (error) {
    console.error("Failed to copy code:", error);
  }
};
</script>

<template>
  <div class="code-example my-8">
    <div
      class="bg-gray-50 dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700"
    >
      <div
        class="bg-gray-100 dark:bg-gray-800 px-6 py-3 flex items-center justify-between border-b border-gray-200 dark:border-gray-700"
      >
        <div class="flex items-center gap-2">
          <div class="w-3 h-3 bg-red-500 rounded-full" />
          <div class="w-3 h-3 bg-yellow-500 rounded-full" />
          <div class="w-3 h-3 bg-green-500 rounded-full" />
        </div>
        <button
          :title="copied ? 'Copied!' : 'Copy code'"
          class="cursor-pointer flex items-center gap-2 px-3 py-1 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
          @click="copyCode"
        >
          <svg
            v-if="!copied"
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
          <svg
            v-else
            class="w-4 h-4 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span class="font-mono">{{ copied ? "Copied!" : "Copy" }}</span>
        </button>
      </div>
      <div class="p-6 overflow-x-auto bg-white dark:bg-gray-900">
        <div class="prose dark:prose-invert max-w-none">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.code-example :deep(pre) {
  background-color: transparent !important;
  padding: 0 !important;
  margin: 0 !important;
}

.code-example :deep(code) {
  font-size: 0.875rem;
}

/* Light theme code styling */
.code-example :deep(pre code) {
  color: #374151;
}

.dark .code-example :deep(pre code) {
  color: #e5e7eb;
}

/* Ensure code blocks have proper background in light mode */
.code-example :deep(pre) {
  background: transparent !important;
}
</style>
