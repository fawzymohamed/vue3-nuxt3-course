<script setup lang="ts">
interface DevGuideSection {
  id: string;
  title: string;
  icon: string;
}

interface Props {
  section: DevGuideSection;
  content: any;
}

const props = defineProps<Props>();

// Extract title from content or use section title
const displayTitle = computed(() => {
  return (props.content as any)?.title || props.section.title;
});

// Extract description from content
const displayDescription = computed(() => {
  return (
    (props.content as any)?.description ||
    `${props.section.title} section of the Learnova Academy development guide`
  );
});
</script>

<template>
  <div class="dev-guide-header">
    <div class="flex items-start gap-6">
      <!-- Section Icon -->
      <!-- <div class="flex-shrink-0">
        <div
          class="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center"
        >
          <Icon :name="section.icon" class="w-8 h-8 text-primary" />
        </div>
      </div> -->

      <!-- Header Content -->
      <div class="flex-1 min-w-0">
        <!-- Breadcrumb -->
        <!-- <nav class="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <span>Developer Guide</span>
          <Icon name="heroicons:chevron-right" class="w-4 h-4" />
          <span class="text-foreground font-medium">{{ section.title }}</span>
        </nav> -->

        <!-- Title -->
        <h1 class="text-3xl lg:text-4xl font-bold text-foreground mb-3">
          {{ displayTitle }}
        </h1>

        <!-- Description -->
        <p class="text-lg text-muted-foreground leading-relaxed">
          {{ displayDescription }}
        </p>
      </div>
    </div>

    <!-- Divider -->
    <hr class="border-border mt-8" />
  </div>
</template>

<style scoped>
.dev-guide-header {
  padding-bottom: 2rem;
}
</style>
