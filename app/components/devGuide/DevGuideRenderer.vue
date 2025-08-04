<script setup lang="ts">
interface Props {
  content: any;
  sectionId: string;
  title?: string;
  icon?: string;
}

interface DevGuideSection {
  id: string;
  title: string;
  icon: string;
}

const props = defineProps<Props>();

// Define dev guide sections
const sections = ref<DevGuideSection[]>([
  {
    id: "overview",
    title: "Development Stack Overview",
    icon: "heroicons:document-text",
  },
  {
    id: "getting-started",
    title: "Getting Started",
    icon: "heroicons:rocket-launch",
  },
  {
    id: "architecture",
    title: "Architecture",
    icon: "heroicons:building-library",
  },
  {
    id: "course-management",
    title: "Course Management",
    icon: "heroicons:academic-cap",
  },
  {
    id: "content-management",
    title: "Content Management",
    icon: "heroicons:document-duplicate",
  },
  {
    id: "features",
    title: "Key Features",
    icon: "heroicons:star",
  },
  {
    id: "deployment",
    title: "Deployment",
    icon: "heroicons:cloud-arrow-up",
  },
  {
    id: "development",
    title: "Development Workflow",
    icon: "heroicons:code-bracket",
  },
  {
    id: "troubleshooting",
    title: "Troubleshooting",
    icon: "heroicons:wrench-screwdriver",
  },
]);

// Find current section info
const currentSection = computed(() => {
  return (
    sections.value.find(
      (section: DevGuideSection) => section.id === props.sectionId
    ) || {
      id: props.sectionId,
      title: props.title || "Development Guide",
      icon: props.icon || "heroicons:document-text",
    }
  );
});

// SEO
useHead({
  title: `${currentSection.value.title} - Developer Guide`,
  meta: [
    {
      name: "description",
      content: `${currentSection.value.title} section of the Learnova Academy development guide`,
    },
    { name: "robots", content: "noindex, nofollow" },
  ],
});
</script>

<template>
  <div class="dev-guide-renderer">
    <!-- Section Header -->
    <DevGuideHeader :section="currentSection" :content="content" />

    <!-- Content Body -->
    <DevGuideContent :content="content" :section-id="sectionId" />
  </div>
</template>

<style scoped>
.dev-guide-renderer {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
</style>
