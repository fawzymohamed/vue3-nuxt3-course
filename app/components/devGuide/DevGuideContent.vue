<script setup lang="ts">
interface Props {
  content: any;
  sectionId: string;
}

const props = defineProps<Props>();

// Check if content is loading
const isLoading = computed(() => !props.content);

// Content metadata
const contentMeta = computed(() => {
  if (!props.content) return null;

  const content = props.content as any;
  return {
    title: content.title,
    path: content._path,
    updatedAt: content._updatedAt,
    createdAt: content._createdAt,
  };
});
</script>

<template>
  <div class="dev-guide-content">
    <!-- Loading State -->
    <div v-if="isLoading" class="content-loading">
      <div
        class="flex items-center gap-3 p-6 bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-800 rounded-lg"
      >
        <Icon
          name="heroicons:arrow-path"
          class="w-5 h-5 text-yellow-600 dark:text-yellow-400 animate-spin"
        />
        <p class="text-yellow-800 dark:text-yellow-200 font-medium">
          Loading content...
        </p>
      </div>
    </div>

    <!-- Content Renderer -->
    <div v-else class="content-body">
      <!-- Content -->
      <div class="prose prose-gray dark:prose-invert max-w-none prose-lg">
        <ContentRenderer :value="content" />
      </div>

      <!-- Debug Info (Development Only) -->
      <div
        v-if="$nuxt.ssrContext?.event?.context?.dev && contentMeta"
        class="content-debug mt-8 p-4 bg-gray-50 dark:bg-gray-900 border rounded-lg text-xs"
      >
        <details>
          <summary
            class="cursor-pointer font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Debug Information
          </summary>
          <div class="space-y-1 text-gray-600 dark:text-gray-400">
            <div><strong>Title:</strong> {{ contentMeta.title }}</div>
            <div><strong>Path:</strong> {{ contentMeta.path }}</div>
            <div v-if="contentMeta.updatedAt">
              <strong>Updated:</strong>
              {{ new Date(contentMeta.updatedAt).toLocaleString() }}
            </div>
          </div>
        </details>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dev-guide-content {
  min-height: 400px;
}

.content-body {
  position: relative;
}

.content-loading {
  margin: 2rem 0;
}

/* Enhanced prose styling for dev guide 
.content-body :deep(.prose) {
  
  --tw-prose-pre-bg: theme("colors.gray.50");
  --tw-prose-pre-code: theme("colors.gray.800");
}

.dark .content-body :deep(.prose) {
  --tw-prose-pre-bg: theme("colors.gray.900");
  --tw-prose-pre-code: theme("colors.gray.200");
}
*/

/* Improve code block styling */
.content-body :deep(pre) {
  border: 1px solid rgb(229 231 235);
  border-radius: 0.5rem;
  overflow-x: auto;
}

.dark .content-body :deep(pre) {
  border-color: rgb(55 65 81);
}

.content-body :deep(code) {
  background-color: rgb(243 244 246);
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
}

.dark .content-body :deep(code) {
  background-color: rgb(31 41 55);
}

.content-body :deep(pre code) {
  background: transparent;
  padding: 0;
}

/* Callout enhancements */
.content-body :deep(.callout) {
  margin: 1.5rem 0;
}
</style>
