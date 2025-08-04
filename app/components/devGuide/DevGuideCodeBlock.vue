<script setup lang="ts">
import type { BundledLanguage } from "shiki";

interface Props {
  code: string;
  language?: BundledLanguage;
  title?: string;
  description?: string;
  filename?: string;
  highlightLines?: number[];
  showLineNumbers?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  language: "typescript",
  title: undefined,
  description: undefined,
  filename: undefined,
  highlightLines: () => [],
  showLineNumbers: false,
});

// Copy to clipboard functionality
const copied = ref(false);
const highlightedCode = ref("");
const isHighlighting = ref(true);
const { highlightCode, highlightCodeSync } = useSyntaxHighlight();
const { $colorMode } = useNuxtApp();

const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(props.code);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch (err) {
    console.error("Failed to copy code:", err);
  }
};

// Get the appropriate theme based on color mode
const getTheme = () => {
  if (process.client) {
    return $colorMode.value === "dark" ? "github-dark" : "github-light";
  }
  return "github-light";
};

// Highlight the code
const processCode = async () => {
  try {
    const theme = getTheme();
    const highlighted = await highlightCode(props.code, props.language, theme);
    highlightedCode.value = highlighted;
    isHighlighting.value = false;
  } catch (error) {
    console.error("Failed to highlight code:", error);
    // Fallback to plain text
    highlightedCode.value = highlightCodeSync(props.code, props.language);
    isHighlighting.value = false;
  }
};

// Initialize with synchronous fallback, then enhance with async highlighting
onMounted(() => {
  // Start with immediate fallback
  highlightedCode.value = highlightCodeSync(props.code, props.language);
  isHighlighting.value = false;

  // Then enhance with proper highlighting
  nextTick(() => {
    processCode();
  });
});

// Watch for color mode changes to re-highlight
watch(
  () => $colorMode?.value,
  () => {
    if (process.client && !isHighlighting.value) {
      processCode();
    }
  }
);
</script>

<template>
  <div class="dev-code-block my-8" dir="ltr">
    <div
      class="bg-gray-50 dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700"
    >
      <!-- Header with window controls and copy button -->
      <div
        class="bg-gray-100 dark:bg-gray-800 px-6 py-3 flex items-center justify-between border-b border-gray-200 dark:border-gray-700"
      >
        <div class="flex items-center gap-3">
          <!-- macOS window controls -->
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 bg-red-500 rounded-full" />
            <div class="w-3 h-3 bg-yellow-500 rounded-full" />
            <div class="w-3 h-3 bg-green-500 rounded-full" />
          </div>

          <!-- File info -->
          <div v-if="filename || title" class="flex items-center gap-2">
            <Icon
              v-if="title"
              name="i-heroicons-code-bracket"
              class="w-4 h-4 text-gray-500 dark:text-gray-400"
            />
            <span class="text-sm text-gray-600 dark:text-gray-300 font-mono">
              {{ filename || title }}
            </span>
          </div>
        </div>

        <!-- Copy Button -->
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

      <!-- Description section (if provided) -->
      <div
        v-if="description"
        class="px-6 py-3 bg-blue-50 dark:bg-blue-900/20 border-b border-gray-200 dark:border-gray-700"
      >
        <p class="text-sm text-blue-800 dark:text-blue-200">
          {{ description }}
        </p>
      </div>

      <!-- Code Content -->
      <div class="p-6 overflow-x-auto bg-white dark:bg-gray-900">
        <div class="shiki-container" v-html="highlightedCode" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.dev-code-block {
  direction: ltr;
  text-align: left;
}

/* Shiki container styling */
.shiki-container :deep(pre) {
  background-color: transparent !important;
  padding: 0 !important;
  margin: 0 !important;
  font-family:
    "JetBrains Mono", "Fira Code", "Monaco", "Cascadia Code", "Roboto Mono",
    monospace;
  font-size: 0.875rem;
  line-height: 1.6;
  overflow-x: auto;
  border: none !important;
}

.shiki-container :deep(code) {
  background: transparent !important;
  padding: 0 !important;
  border-radius: 0 !important;
  white-space: pre;
  word-spacing: normal;
  word-break: normal;
  tab-size: 2;
  font-weight: 400;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
}

/* Fallback styles for non-highlighted code */
.code-pre {
  background-color: transparent !important;
  padding: 0 !important;
  margin: 0 !important;
  font-family:
    "JetBrains Mono", "Fira Code", "Monaco", "Cascadia Code", "Roboto Mono",
    monospace;
  font-size: 0.875rem;
  line-height: 1.6;
  overflow-x: auto;
}

.code-element {
  background: transparent;
  padding: 0;
  border-radius: 0;
  white-space: pre;
  word-spacing: normal;
  word-break: normal;
  tab-size: 2;
  font-weight: 400;
  color: #374151;
}

.dark .code-element {
  color: #e5e7eb;
}

/* Ensure code content is always LTR regardless of page direction */
.dev-code-block [dir="ltr"] {
  text-align: left;
  direction: ltr;
}

.dev-code-block [dir="ltr"] :deep(*) {
  direction: ltr;
  text-align: left;
}

/* Ensure proper spacing and layout for Shiki output */
.shiki-container :deep(.line) {
  display: block;
  min-height: 1.6rem;
  position: relative;
}

/* Remove any default background colors that Shiki might add */
.shiki-container :deep(.shiki) {
  background: transparent !important;
}

/* Override any theme backgrounds to match our design */
.dev-code-block :deep(.github-light),
.dev-code-block :deep(.github-dark) {
  background: transparent !important;
}
</style>
