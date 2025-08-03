<script setup lang="ts">
const { t } = useI18n();

// SEO Meta for platform homepage with i18n
useHead({
  title: t("homepage.meta.title"),
  meta: [
    {
      name: "description",
      content: t("homepage.meta.description"),
    },
  ],
});
</script>

<template>
  <div>
    <!-- Hero section for the platform -->
    <HomepagePlatformHero />

    <!-- Featured courses -->
    <HomepageFeaturedCourses />

    <!-- Course categories -->
    <HomepageCourseCategoriesSection />

    <!-- Learning paths -->
    <HomepageLearningPathsSection />

    <!-- Platform statistics -->
    <HomepagePlatformStatsSection />

    <!-- Instructor showcase -->
    <!-- <HomepageInstructorShowcase /> -->
  </div>
</template>
