<script setup lang="ts">
interface Props {
  type?: "info" | "success" | "warning" | "error" | "tip";
  title?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: "info",
  title: undefined,
});

const typeConfig = computed(() => {
  const configs = {
    info: {
      icon: "i-heroicons-information-circle",
      bgColor: "bg-blue-50 dark:bg-blue-950/30",
      borderColor: "border-blue-200 dark:border-blue-800",
      iconColor: "text-blue-600 dark:text-blue-400",
      textColor: "text-blue-800 dark:text-blue-200",
    },
    success: {
      icon: "i-heroicons-check-circle",
      bgColor: "bg-green-50 dark:bg-green-950/30",
      borderColor: "border-green-200 dark:border-green-800",
      iconColor: "text-green-600 dark:text-green-400",
      textColor: "text-green-800 dark:text-green-200",
    },
    warning: {
      icon: "i-heroicons-exclamation-triangle",
      bgColor: "bg-yellow-50 dark:bg-yellow-950/30",
      borderColor: "border-yellow-200 dark:border-yellow-800",
      iconColor: "text-yellow-600 dark:text-yellow-400",
      textColor: "text-yellow-800 dark:text-yellow-200",
    },
    error: {
      icon: "i-heroicons-x-circle",
      bgColor: "bg-red-50 dark:bg-red-950/30",
      borderColor: "border-red-200 dark:border-red-800",
      iconColor: "text-red-600 dark:text-red-400",
      textColor: "text-red-800 dark:text-red-200",
    },
    tip: {
      icon: "i-heroicons-light-bulb",
      bgColor: "bg-purple-50 dark:bg-purple-950/30",
      borderColor: "border-purple-200 dark:border-purple-800",
      iconColor: "text-purple-600 dark:text-purple-400",
      textColor: "text-purple-800 dark:text-purple-200",
    },
  };
  return configs[props.type];
});
</script>

<template>
  <div
    class="dev-callout p-4 rounded-lg border my-6"
    :class="[typeConfig.bgColor, typeConfig.borderColor]"
  >
    <div class="flex items-start gap-3">
      <Icon
        :name="typeConfig.icon"
        class="w-5 h-5 mt-0.5 flex-shrink-0"
        :class="typeConfig.iconColor"
      />

      <div class="flex-1 min-w-0">
        <h4
          v-if="title"
          class="font-semibold mb-2"
          :class="typeConfig.textColor"
        >
          {{ title }}
        </h4>

        <div class="prose prose-sm max-w-none" :class="typeConfig.textColor">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dev-callout {
  border-width: 1px;
  border-style: solid;
}

/* Ensure prose content inherits the correct colors */
.dev-callout .prose {
  color: inherit;
}

.dev-callout .prose :deep(p) {
  color: inherit;
  margin-bottom: 0.5rem;
}

.dev-callout .prose :deep(p:last-child) {
  margin-bottom: 0;
}

.dev-callout .prose :deep(code) {
  background: rgba(0, 0, 0, 0.1);
  padding: 0.125rem 0.25rem;
  border-radius: 0.25rem;
  font-size: 0.875em;
}

.dark .dev-callout .prose :deep(code) {
  background: rgba(255, 255, 255, 0.1);
}
</style>
