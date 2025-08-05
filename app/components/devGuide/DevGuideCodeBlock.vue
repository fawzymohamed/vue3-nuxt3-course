<script setup lang="ts">
interface Props {
  code?: string;
  language?: string;
  title?: string;
  description?: string;
  filename?: string;
  highlightLines?: number[];
  showLineNumbers?: boolean;
  showCopy?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  code: undefined,
  language: "typescript",
  title: undefined,
  description: undefined,
  filename: undefined,
  highlightLines: () => [],
  showLineNumbers: false,
  showCopy: true,
});

const slots = useSlots();
const copied = ref(false);
const highlightedCode = ref("");
const isHighlighting = ref(true);

// Extract code content from slot or prop
const codeContent = computed(() => {
  // If code prop is provided, use it
  if (props.code) return props.code;

  // Extract code from MDC slot content
  if (slots.default) {
    const slotContent = slots.default();

    // Try multiple extraction methods
    const extractText = (nodes: any[]): string => {
      let result = "";

      for (const node of nodes) {
        if (typeof node === "string") {
          result += node;
        } else if (node && typeof node === "object") {
          // For MDC components, check for children.default function
          if (
            node.children &&
            node.children.default &&
            typeof node.children.default === "function"
          ) {
            try {
              const defaultContent = node.children.default();
              if (Array.isArray(defaultContent)) {
                result += extractText(defaultContent);
              } else if (typeof defaultContent === "string") {
                result += defaultContent;
              }
            } catch (e: unknown) {
              console.warn("Error calling default function:", e);
            }
          }

          // Check for various properties where text might be stored
          if (node.children) {
            if (typeof node.children === "string") {
              result += node.children;
            } else if (Array.isArray(node.children)) {
              result += extractText(node.children);
            }
          }

          // Check for text property
          if (node.text) {
            result += node.text;
          }

          // Check for innerHTML or textContent
          if (node.props) {
            if (node.props.innerHTML) result += node.props.innerHTML;
            if (node.props.textContent) result += node.props.textContent;
          }

          // For MDC, sometimes content is in the default slot
          if (node.type && typeof node.type === "object" && node.type.default) {
            result += extractText([node.type.default]);
          }
        }
      }

      return result;
    };

    const extractedCode = extractText(slotContent).trim();

    return extractedCode;
  }

  return "";
});

// Syntax highlighting with Shiki
const highlightCode = async (): Promise<void> => {
  const code = codeContent.value;
  if (!code) {
    highlightedCode.value = "";
    isHighlighting.value = false;
    return;
  }

  // Only run on client-side
  if (!process.client) {
    highlightedCode.value = `<pre><code class="language-${props.language}">${code.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code></pre>`;
    isHighlighting.value = false;
    return;
  }

  try {
    // Import Shiki dynamically
    const { createHighlighter } = await import("shiki");

    const highlighter = await createHighlighter({
      themes: ["github-light", "github-dark"],
      langs: [
        "javascript",
        "typescript",
        "vue",
        "html",
        "css",
        "json",
        "bash",
        "sql",
        "yaml",
        "markdown",
      ],
    });

    // Get current color mode (client-side only)
    const isDark = process.client
      ? document.documentElement.classList.contains("dark")
      : false;
    const theme = isDark ? "github-dark" : "github-light";

    const highlighted = highlighter.codeToHtml(code, {
      lang: props.language,
      theme: theme,
    });

    highlightedCode.value = highlighted;
    isHighlighting.value = false;
  } catch (error: unknown) {
    console.error("Failed to highlight code:", error);
    // Fallback to plain text with proper formatting
    highlightedCode.value = `<pre><code class="language-${props.language}">${code.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code></pre>`;
    isHighlighting.value = false;
  }
};

// Watch for code changes and re-highlight
watch(
  () => codeContent.value,
  () => {
    if (codeContent.value && process.client) {
      highlightCode();
    }
  }
);

// Initialize highlighting on client-side mount
onMounted(() => {
  if (codeContent.value) {
    highlightCode();
  }
});

// Watch for color mode changes (client-side only)
watch(
  () => process.client && document.documentElement.classList.contains("dark"),
  () => {
    if (codeContent.value && process.client) {
      highlightCode();
    }
  }
);

const copyCode = async (): Promise<void> => {
  const code = codeContent.value;
  if (!code) return;

  try {
    await navigator.clipboard.writeText(code);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch (err: unknown) {
    console.error("Failed to copy code:", err);
  }
};
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
          v-if="showCopy && codeContent"
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
        <div v-if="!codeContent" class="text-gray-500 italic">
          No code content provided
        </div>

        <!-- Loading state -->
        <div v-else-if="isHighlighting" class="text-gray-500 italic">
          Highlighting code...
        </div>

        <!-- Highlighted code -->
        <div
          v-else-if="highlightedCode"
          class="shiki-container"
          v-html="highlightedCode"
        />

        <!-- Fallback plain text -->
        <pre v-else class="code-pre">
          <code class="code-element language-" :class="props.language">{{ codeContent }}</code>
        </pre>

        <!-- Hidden slot for content extraction -->
        <div style="display: none">
          <slot />
        </div>
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
  white-space: pre;
  tab-size: 2;
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

/* Override Shiki's default background */
.shiki-container :deep(.shiki) {
  background: transparent !important;
}

/* Ensure line breaks and indentation are preserved */
.shiki-container :deep(.line) {
  display: block;
  white-space: pre;
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
  white-space: pre;
  tab-size: 2;
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
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
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
