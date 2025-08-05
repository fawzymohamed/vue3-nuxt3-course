<script setup lang="ts">
interface Props {
  number: string | number;
  title: string;
  description?: string;
  status?: "pending" | "active" | "completed";
  showConnector?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  description: undefined,
  status: "pending",
  showConnector: false,
});

// Status styling
const statusClasses = computed(() => ({
  pending:
    "bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700",
  active:
    "bg-primary-100 text-primary-700 border-primary-300 dark:bg-primary-900/30 dark:text-primary-300 dark:border-primary-600",
  completed:
    "bg-green-100 text-green-700 border-green-300 dark:bg-green-900/30 dark:text-green-300 dark:border-green-600",
}));

const stepClasses = computed(() => ({
  pending:
    "bg-gray-50 border-gray-200 dark:bg-gray-800/50 dark:border-gray-700",
  active:
    "bg-primary-50 border-primary-200 dark:bg-primary-900/20 dark:border-primary-700",
  completed:
    "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-700",
}));
</script>

<template>
  <div class="dev-guide-step relative overflow-hidden">
    <!-- Connector Line (for multi-step sequences) -->
    <div
      v-if="showConnector"
      class="absolute left-6 top-12 w-0.5 h-full bg-gray-200 dark:bg-gray-700 -z-10"
    ></div>

    <div
      class="flex gap-4 p-6 rounded-lg border-2 mb-6 transition-all duration-200"
      :class="stepClasses[status]"
    >
      <!-- Step Number -->
      <div class="flex-shrink-0">
        <div
          class="w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold text-lg transition-all duration-200"
          :class="statusClasses[status]"
        >
          <!-- Completed checkmark -->
          <Icon
            v-if="status === 'completed'"
            name="heroicons:check"
            class="w-6 h-6"
          />
          <!-- Step number -->
          <span v-else>{{ number }}</span>
        </div>
      </div>

      <!-- Step Content -->
      <div class="flex-1 min-w-0">
        <!-- Step Header -->
        <div class="mb-3">
          <h3
            class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1 break-words"
          >
            {{ title }}
          </h3>
          <p
            v-if="description"
            class="text-gray-600 dark:text-gray-400 break-words"
          >
            {{ description }}
          </p>
        </div>

        <!-- Step Content Slot -->
        <div
          v-if="$slots.default"
          class="prose prose-gray dark:prose-invert max-w-none overflow-x-auto"
        >
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Ensure the last step doesn't show a connector */
.dev-guide-step:last-child .absolute {
  display: none;
}
</style>
