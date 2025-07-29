<script setup lang="ts">
const { t } = useI18n();

// SEO Meta for about page
useHead({
  title: t("aboutPage.meta.title"),
  meta: [
    {
      name: "description",
      content: t("aboutPage.meta.description"),
    },
  ],
});
</script>

<template>
  <div>
    <UContainer>
      <div class="py-8 lg:py-16">
        <div class="text-center">
          <h1
            class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl"
          >
            {{ t("aboutPage.title") }}
          </h1>
          <p class="mt-4 text-lg text-gray-600 dark:text-gray-300">
            {{ t("aboutPage.subtitle") }}
          </p>
        </div>

        <div class="mt-16 max-w-4xl mx-auto prose prose-lg dark:prose-invert">
          <p>{{ t("aboutPage.content.intro") }}</p>

          <h2>{{ t("aboutPage.content.mission.title") }}</h2>
          <p>{{ t("aboutPage.content.mission.description") }}</p>

          <h2>{{ t("aboutPage.content.approach.title") }}</h2>
          <p>{{ t("aboutPage.content.approach.description") }}</p>
        </div>
      </div>
    </UContainer>
  </div>
</template>
