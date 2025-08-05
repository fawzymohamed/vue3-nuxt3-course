<script setup lang="ts">
interface Props {
  title: string;
  version?: string;
  description: string;
  link?: string;
  linkText?: string;
  badge?: string;
  badgeColor?:
    | "primary"
    | "secondary"
    | "success"
    | "info"
    | "warning"
    | "error"
    | "neutral";
}

const props = withDefaults(defineProps<Props>(), {
  version: undefined,
  link: undefined,
  linkText: "Official Documentation →",
  badge: undefined,
  badgeColor: "primary",
});
</script>

<template>
  <UCard class="dev-tech-card mt-5">
    <!-- Card Header -->
    <template #header>
      <div class="flex items-start justify-between">
        <div class="flex-1">
          <div class="flex items-center gap-3 mb-2">
            <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100">
              {{ title }}
            </h3>
            <UBadge v-if="version" :color="badgeColor" variant="soft" size="sm">
              {{ version }}
            </UBadge>
          </div>

          <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
            {{ description }}
          </p>
        </div>

        <UBadge
          v-if="badge"
          :color="badgeColor"
          variant="subtle"
          class="ml-3 flex-shrink-0"
        >
          {{ badge }}
        </UBadge>
      </div>

      <!-- Documentation Link -->
      <div v-if="link" class="mt-3">
        <UButton
          :to="link"
          target="_blank"
          variant="ghost"
          color="primary"
          size="sm"
          icon="i-heroicons-arrow-top-right-on-square"
          trailing
        >
          {{ linkText }}
        </UButton>
      </div>
    </template>

    <!-- Card Content -->
    <div class="tech-card-content">
      <slot />
    </div>
  </UCard>
</template>

<style scoped>
.dev-tech-card {
  border: 1px solid rgb(229 231 235);
  transition: all 0.2s ease;
}

.dark .dev-tech-card {
  border-color: rgb(55 65 81);
}

.dev-tech-card:hover {
  /* border-color: rgb(99 102 241);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.1); */
}

.dark .dev-tech-card:hover {
  /* border-color: rgb(129 140 248);
  box-shadow: 0 4px 12px rgba(129, 140, 248, 0.1); */
}

.tech-card-content {
  margin-top: 1rem;
}

.tech-card-content :deep(> *:not(:last-child)) {
  margin-bottom: 1rem;
}
</style>
