<script setup lang="ts">
interface Props {
  title: string;
  description?: string;
  icon?: string;
  id?: string;
}

const props = withDefaults(defineProps<Props>(), {
  description: undefined,
  icon: undefined,
  id: undefined,
});

// Generate anchor ID from title if not provided
const anchorId = computed(() => {
  if (props.id) return props.id;
  return props.title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .trim();
});
</script>

<template>
  <section :id="anchorId" class="dev-guide-section">
    <!-- Section Header -->
    <div class="section-header my-6">
      <div class="flex items-center gap-3 mb-3">
        <span v-if="icon" class="text-2xl">{{ icon }}</span>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100">
          {{ title }}
        </h2>
      </div>

      <p
        v-if="description"
        class="text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
      >
        {{ description }}
      </p>
    </div>

    <!-- Section Content -->
    <div class="section-content space-y-6">
      <slot />
    </div>
  </section>
</template>

<style scoped>
.dev-guide-section {
  margin-bottom: 3rem;
  scroll-margin-top: 6rem;
}

.section-header {
  border-bottom: 1px solid rgb(229 231 235);
  padding-bottom: 1rem;
}

.dark .section-header {
  border-bottom-color: rgb(55 65 81);
}

.section-content {
  margin-left: 0;
}

/* Ensure good spacing between nested content */
.section-content :deep(> *:not(:last-child)) {
  margin-bottom: 1.5rem;
}
</style>
