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

// Parse content for structured rendering
const structuredContent = computed(() => {
  if (!props.content?.body) return null;

  // Use the existing ContentRenderer for all content
  return props.content;
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
          name="i-heroicons-arrow-path"
          class="w-5 h-5 text-yellow-600 dark:text-yellow-400 animate-spin"
        />
        <p class="text-yellow-800 dark:text-yellow-200 font-medium">
          Loading content...
        </p>
      </div>
    </div>

    <!-- Enhanced Content Renderer -->
    <div v-else class="content-body">
      <!-- Use ContentRenderer for all content -->
      <ContentRenderer :value="structuredContent" />

      <!-- Content Metadata -->
      <div
        v-if="contentMeta"
        class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700"
      >
        <details class="group">
          <summary
            class="cursor-pointer text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
          >
            <span class="inline-flex items-center gap-2">
              <Icon
                name="i-heroicons-information-circle"
                class="w-4 h-4 transition-transform group-open:rotate-180"
              />
              Content Information
            </span>
          </summary>
          <div class="mt-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg text-sm">
            <div class="space-y-2 text-gray-700 dark:text-gray-300">
              <div><strong>Path:</strong> {{ contentMeta.path }}</div>
              <div v-if="contentMeta.createdAt">
                <strong>Created:</strong>
                {{ new Date(contentMeta.createdAt).toLocaleString() }}
              </div>
              <div v-if="contentMeta.updatedAt">
                <strong>Updated:</strong>
                {{ new Date(contentMeta.updatedAt).toLocaleString() }}
              </div>
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
