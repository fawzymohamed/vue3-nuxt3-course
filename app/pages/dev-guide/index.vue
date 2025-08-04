<script setup lang="ts">
// Force English language for dev guide - English only
const { setLocale } = useI18n();
setLocale("en");

// Development mode check
const isDev = process.dev;

// Redirect in production
if (!isDev) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
  });
}

// Get the overview content for dynamic sections
const { data: overviewContent } = await useAsyncData("dev-guide-overview", () =>
  queryCollection("content").path("/dev-guide/overview").first()
);

// Get the getting-started content
const { data: gettingStartedContent } = await useAsyncData(
  "dev-guide-getting-started",
  () => queryCollection("content").path("/dev-guide/getting-started").first()
);

// Get the architecture content
const { data: architectureContent } = await useAsyncData(
  "dev-guide-architecture",
  () => queryCollection("content").path("/dev-guide/architecture").first()
);

// SEO - English only
useHead({
  title: "Developer Guide - Learnova Academy",
  meta: [
    {
      name: "description",
      content:
        "Comprehensive development guide for Learnova Academy learning platform",
    },
    { name: "robots", content: "noindex, nofollow" },
  ],
});

// Navigation sections - English only
const sections = ref([
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

const activeSection = ref("overview");

// Switch to selected section
function selectSection(sectionId: string) {
  activeSection.value = sectionId;
}

// Content mapping for sections with content files
const contentMap = computed(() => ({
  overview: overviewContent.value,
  "getting-started": gettingStartedContent.value,
  architecture: architectureContent.value,
}));

// Check if current section has content file
const hasContentFile = computed(() => {
  return Object.keys(contentMap.value).includes(activeSection.value);
});

// Get current content safely
const currentContent = computed(() => {
  return contentMap.value[activeSection.value as keyof typeof contentMap.value];
});
</script>

<template>
  <div class="min-h-screen bg-background">
    <UContainer class="py-8">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Navigation Sidebar -->
        <aside class="lg:col-span-1">
          <DevGuideNavigation
            :sections="sections"
            :active-section="activeSection"
            @section-select="selectSection"
          />
        </aside>

        <!-- Main Content with Enhanced Components -->
        <main class="lg:col-span-3">
          <!-- Sections with Content Files -->
          <div v-if="hasContentFile">
            <DevGuideRenderer
              :content="currentContent"
              :section-id="activeSection"
              :sections="sections"
              @section-change="selectSection"
            />
          </div>

          <!-- Other sections (can be converted to content files later) -->
          <div v-else class="space-y-8">
            <!-- Section Header for non-content sections -->
            <DevGuideHeader
              :section="
                sections.find((s) => s.id === activeSection) || {
                  id: activeSection,
                  title: 'Section',
                  icon: 'heroicons:document-text',
                }
              "
              :content="null"
            />

            <!-- Section Content -->
            <div class="prose prose-gray dark:prose-invert max-w-none">
              <!-- Placeholder for other sections -->
              <div>
                <p class="text-lg text-muted-foreground mb-6">
                  This section is under development. Content will be added soon.
                </p>

                <div
                  class="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4"
                >
                  <div class="flex items-start gap-3">
                    <Icon
                      name="heroicons:information-circle"
                      class="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0"
                    />
                    <div>
                      <p class="text-sm text-blue-800 dark:text-blue-200 m-0">
                        <strong>Coming Soon:</strong> This section will contain
                        detailed information about
                        {{
                          sections.find((s) => s.id === activeSection)?.title ||
                          activeSection
                        }}.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </UContainer>
  </div>
</template>

<style scoped>
code {
  background-color: hsl(var(--muted));
  padding: 0.125rem 0.25rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
}

pre code {
  background: none;
  padding: 0;
}

.dark code {
  background-color: hsl(var(--muted));
}
</style>
