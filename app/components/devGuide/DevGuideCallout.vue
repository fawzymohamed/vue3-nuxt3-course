<script setup lang="ts">
interface Props {
  type?: "info" | "success" | "warning" | "error" | "tip";
  title?: string;
  icon?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: "info",
  title: undefined,
  icon: undefined,
});

// Icon and color mapping
const calloutConfig = computed(() => {
  const configs = {
    info: {
      icon: "i-heroicons-information-circle",
      bgClass: "bg-blue-50 dark:bg-blue-950/30",
      borderClass: "border-blue-200 dark:border-blue-800",
      iconClass: "text-blue-600 dark:text-blue-400",
      titleClass: "text-blue-900 dark:text-blue-100",
      contentClass: "text-blue-800 dark:text-blue-200",
    },
    success: {
      icon: "i-heroicons-check-circle",
      bgClass: "bg-green-50 dark:bg-green-950/30",
      borderClass: "border-green-200 dark:border-green-800",
      iconClass: "text-green-600 dark:text-green-400",
      titleClass: "text-green-900 dark:text-green-100",
      contentClass: "text-green-800 dark:text-green-200",
    },
    warning: {
      icon: "i-heroicons-exclamation-triangle",
      bgClass: "bg-yellow-50 dark:bg-yellow-950/30",
      borderClass: "border-yellow-200 dark:border-yellow-800",
      iconClass: "text-yellow-600 dark:text-yellow-400",
      titleClass: "text-yellow-900 dark:text-yellow-100",
      contentClass: "text-yellow-800 dark:text-yellow-200",
    },
    error: {
      icon: "i-heroicons-x-circle",
      bgClass: "bg-red-50 dark:bg-red-950/30",
      borderClass: "border-red-200 dark:border-red-800",
      iconClass: "text-red-600 dark:text-red-400",
      titleClass: "text-red-900 dark:text-red-100",
      contentClass: "text-red-800 dark:text-red-200",
    },
    tip: {
      icon: "i-heroicons-light-bulb",
      bgClass: "bg-purple-50 dark:bg-purple-950/30",
      borderClass: "border-purple-200 dark:border-purple-800",
      iconClass: "text-purple-600 dark:text-purple-400",
      titleClass: "text-purple-900 dark:text-purple-100",
      contentClass: "text-purple-800 dark:text-purple-200",
    },
  };

  return configs[props.type];
});

const displayIcon = computed(() => props.icon || calloutConfig.value.icon);
</script>

<template>
  <div
    class="dev-callout"
    :class="[calloutConfig.bgClass, calloutConfig.borderClass]"
  >
    <div class="flex gap-3">
      <!-- Icon -->
      <Icon
        :name="displayIcon"
        class="w-5 h-5 flex-shrink-0 mt-0.5"
        :class="calloutConfig.iconClass"
      />

      <!-- Content -->
      <div class="flex-1 min-w-0">
        <!-- Title -->
        <div
          v-if="title"
          class="font-semibold mb-1"
          :class="calloutConfig.titleClass"
        >
          {{ title }}
        </div>

        <!-- Content -->
        <div class="callout-content" :class="calloutConfig.contentClass">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dev-callout {
  padding: 1rem 1.25rem;
  border: 1px solid;
  border-radius: 0.75rem;
  margin: 1.5rem 0;
}

.callout-content :deep(> *:first-child) {
  margin-top: 0;
}

.callout-content :deep(> *:last-child) {
  margin-bottom: 0;
}

.callout-content :deep(p) {
  margin: 0.5rem 0;
  line-height: 1.6;
}

.callout-content :deep(code) {
  background: rgba(0, 0, 0, 0.05);
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
}

.dark .callout-content :deep(code) {
  background: rgba(255, 255, 255, 0.1);
}
</style>
