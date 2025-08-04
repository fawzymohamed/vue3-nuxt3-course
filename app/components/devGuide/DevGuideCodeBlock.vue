<script setup lang="ts">
interface Props {
  code: string;
  language?: string;
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
  showLineNumbers: true,
});

// Copy to clipboard functionality
const copied = ref(false);

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
</script>

<template>
  <div class="dev-code-block">
    <!-- Code Block Header -->
    <div v-if="title || filename || description" class="code-header">
      <div class="flex items-start justify-between">
        <div class="flex-1">
          <div v-if="title" class="flex items-center gap-2 mb-1">
            <Icon
              name="i-heroicons-code-bracket"
              class="w-4 h-4 text-primary-600 dark:text-primary-400"
            />
            <h4 class="text-sm font-semibold text-gray-900 dark:text-gray-100">
              {{ title }}
            </h4>
          </div>

          <div
            v-if="filename"
            class="text-xs text-gray-500 dark:text-gray-400 mb-1 font-mono"
          >
            {{ filename }}
          </div>

          <p
            v-if="description"
            class="text-sm text-gray-600 dark:text-gray-300"
          >
            {{ description }}
          </p>
        </div>

        <!-- Copy Button -->
        <UButton
          variant="ghost"
          size="xs"
          :icon="
            copied ? 'i-heroicons-check' : 'i-heroicons-clipboard-document'
          "
          :color="copied ? 'success' : 'neutral'"
          @click="copyCode"
          class="flex-shrink-0"
        >
          {{ copied ? "Copied!" : "Copy" }}
        </UButton>
      </div>
    </div>

    <!-- Code Content -->
    <div class="code-content">
      <div class="relative">
        <!-- Copy button for blocks without header -->
        <UButton
          v-if="!title && !filename && !description"
          variant="ghost"
          size="xs"
          :icon="
            copied ? 'i-heroicons-check' : 'i-heroicons-clipboard-document'
          "
          :color="copied ? 'success' : 'neutral'"
          @click="copyCode"
          class="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          {{ copied ? "Copied!" : "" }}
        </UButton>

        <!-- Pre-formatted Code -->
        <pre
          class="code-pre group"
          :class="{ 'has-line-numbers': showLineNumbers }"
        ><code 
          class="code-element" 
          :class="`language-${language}`"
        >{{ code.trim() }}</code></pre>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dev-code-block {
  border: 1px solid rgb(229 231 235);
  border-radius: 0.75rem;
  overflow: hidden;
  background: rgb(249 250 251);
}

.dark .dev-code-block {
  border-color: rgb(55 65 81);
  background: rgb(17 24 39);
}

.code-header {
  padding: 1rem 1.25rem;
  border-bottom: 1px solid rgb(229 231 235);
  background: rgb(243 244 246);
}

.dark .code-header {
  border-bottom-color: rgb(55 65 81);
  background: rgb(31 41 55);
}

.code-content {
  position: relative;
}

.code-pre {
  margin: 0;
  padding: 1.25rem;
  background: rgb(249 250 251);
  overflow-x: auto;
  font-family: "Fira Code", "Monaco", "Cascadia Code", "Roboto Mono", monospace;
  font-size: 0.875rem;
  line-height: 1.5;
}

.dark .code-pre {
  background: rgb(17 24 39);
}

.code-element {
  background: transparent;
  padding: 0;
  border-radius: 0;
  color: rgb(55 65 81);
  white-space: pre;
  word-spacing: normal;
  word-break: normal;
  tab-size: 2;
}

.dark .code-element {
  color: rgb(209 213 219);
}

/* Line numbers */
.has-line-numbers {
  counter-reset: line-number;
}

.has-line-numbers .code-element {
  padding-left: 3rem;
}

.has-line-numbers .code-element::before {
  content: counter(line-number);
  counter-increment: line-number;
  position: absolute;
  left: 1rem;
  color: rgb(156 163 175);
  font-size: 0.75rem;
  line-height: 1.5rem;
  text-align: right;
  min-width: 2rem;
}

.dark .has-line-numbers .code-element::before {
  color: rgb(75 85 99);
}

/* Syntax highlighting colors */
.code-element .token.comment {
  color: rgb(107 114 126);
}

.code-element .token.keyword {
  color: rgb(147 51 234);
  font-weight: 600;
}

.code-element .token.string {
  color: rgb(34 197 94);
}

.code-element .token.function {
  color: rgb(59 130 246);
}

.code-element .token.variable {
  color: rgb(239 68 68);
}

.dark .code-element .token.comment {
  color: rgb(156 163 175);
}

.dark .code-element .token.keyword {
  color: rgb(196 181 253);
}

.dark .code-element .token.string {
  color: rgb(134 239 172);
}

.dark .code-element .token.function {
  color: rgb(147 197 253);
}

.dark .code-element .token.variable {
  color: rgb(252 165 165);
}
</style>
