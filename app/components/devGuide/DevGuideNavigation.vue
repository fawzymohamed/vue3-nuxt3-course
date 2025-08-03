<script setup lang="ts">
interface DevGuideSection {
  id: string;
  title: string;
  icon: string;
}

interface Props {
  sections: DevGuideSection[];
  activeSection: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  sectionSelect: [sectionId: string];
}>();

// Handle section selection
function selectSection(sectionId: string) {
  emit("sectionSelect", sectionId);
}
</script>

<template>
  <div class="dev-guide-navigation">
    <!-- Header -->
    <div class="mb-6">
      <h2 class="text-lg font-semibold text-foreground mb-2">
        Developer Guide
      </h2>
      <p class="text-sm text-muted-foreground">
        Complete development guide for the platform
      </p>
    </div>

    <!-- Navigation Menu -->
    <nav class="space-y-2">
      <button
        v-for="section in sections"
        :key="section.id"
        @click="selectSection(section.id)"
        :class="[
          'w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 text-left ',
          activeSection === section.id
            ? 'bg-primary/10 text-primary border border-primary/20'
            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50',
        ]"
      >
        <Icon
          :name="section.icon"
          :class="[
            'w-5 h-5 transition-colors',
            activeSection === section.id
              ? 'text-primary'
              : 'text-muted-foreground',
          ]"
        />
        <span
          :class="[
            'font-medium transition-colors',
            activeSection === section.id ? 'text-primary' : 'text-foreground',
          ]"
        >
          {{ section.title }}
        </span>
      </button>
    </nav>

    <!-- Footer Actions -->
    <div class="mt-8 pt-6 border-t border-border">
      <div class="space-y-3">
        <UButton to="/" variant="outline" size="sm" class="w-full">
          <template #leading>
            <Icon name="heroicons:home" class="w-4 h-4" />
          </template>
          Back to Home
        </UButton>

        <UButton to="/courses" variant="ghost" size="sm" class="w-full">
          <template #leading>
            <Icon name="heroicons:academic-cap" class="w-4 h-4" />
          </template>
          View Courses
        </UButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dev-guide-navigation {
  position: sticky;
  top: 2rem;
  max-height: calc(100vh - 4rem);
  overflow-y: auto;
}
</style>
