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

// Get all dev guide content dynamically
const { data: allDevGuideContent } = await useAsyncData(
  "dev-guide-content",
  async () => {
    try {
      // Query dev guide content using queryCollection
      const [developmentStack, gettingStarted, architecture] =
        await Promise.all([
          queryCollection("content")
            .path("/dev-guide/development-stack")
            .first()
            .catch(() => null),
          queryCollection("content")
            .path("/dev-guide/getting-started")
            .first()
            .catch(() => null),
          queryCollection("content")
            .path("/dev-guide/architecture")
            .first()
            .catch(() => null),
        ]);

      return [developmentStack, gettingStarted, architecture].filter(Boolean);
    } catch (error) {
      console.error("Error loading dev guide content:", error);
      return [];
    }
  }
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
const sections = computed(() => {
  if (!allDevGuideContent.value || !Array.isArray(allDevGuideContent.value))
    return [];

  const generatedSections = allDevGuideContent.value.map((content: any) => {
    const id =
      content.path?.split("/").pop() ||
      content.stem?.split("/").pop() ||
      content.title.toLowerCase().replace(/\s+/g, "-");

    return {
      id,
      title: content.title,
      icon: content.icon || "heroicons:document-text",
    };
  });

  return generatedSections;
});

const activeSection = ref("development-stack");

// Get current content
const currentContent = computed(() => {
  if (!allDevGuideContent.value || !Array.isArray(allDevGuideContent.value))
    return null;

  const found = allDevGuideContent.value.find((content: any) =>
    content.path?.includes(activeSection.value)
  );

  return found;
});

// Switch to selected section
function selectSection(sectionId: string) {
  activeSection.value = sectionId;
}
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

        <!-- Main Content -->
        <main class="lg:col-span-3">
          <!-- Direct content rendering without DevGuideRenderer -->
          <div class="dev-guide-content">
            <div class="prose prose-lg dark:prose-invert max-w-none">
              <ContentRenderer v-if="currentContent" :value="currentContent" />

              <!-- Loading state -->
              <div v-else class="animate-pulse">
                <div
                  class="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-4"
                ></div>
                <div class="space-y-3">
                  <div
                    class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"
                  ></div>
                  <div
                    class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </UContainer>
  </div>
</template>
