<script setup>
const route = useRoute();
// const router = useRouter();
const { locale } = useI18n();
const localePath = useLocalePath();

// Get module and lesson slug from route params
const module = computed(() => route.params.module);
const lessonSlug = computed(() => route.params.lessonSlug);

// Function to map module names between languages
function mapModuleToLanguage(currentModule, targetLang) {
  // Extract module base name (assuming format like "module1-en")
  const moduleMatch = currentModule.match(/^(.+)-([a-z]{2})$/);
  if (!moduleMatch) return currentModule; // Return unchanged if pattern doesn't match

  const [_, moduleBase] = moduleMatch;
  return `${moduleBase}-${targetLang}`;
}

// Watch for language changes
watch(locale, async (newLocale) => {
  // Map current module to module in new language
  const newModule = mapModuleToLanguage(module.value, newLocale);

  // Only redirect if the module name would change
  if (newModule !== module.value) {
    try {
      // Create the new URL path
      const newPath = `/lesson/${newModule}/${lessonSlug.value}`;

      // Try a more direct navigation approach
      const localizedPath = localePath(newPath);

      setTimeout(async () => {
        // Navigate to the new path with replace option
        await navigateTo(localizedPath, { replace: true });
      }, 100);

      // Wait for the next tick instead of an arbitrary timeout
      // await nextTick();
      // await navigateTo(localizedPath, { replace: true });
    } catch (error) {
      console.error("Navigation error:", error);
    }
  }
});

// Get content with appropriate locale path
const { data: lesson } = await useAsyncData(
  `lesson-${module.value}-${lessonSlug.value}`,
  () =>
    queryCollection("content")
      .path(`/lesson/${module.value}/${lessonSlug.value}`)
      .first()
);
</script>

<template>
  <section>
    <UContainer>
      <ContentRenderer v-if="lesson" :value="lesson" />
      <div v-else class="py-4 text-red-500">
        {{ $t("lesson.notFound") }}
      </div>
    </UContainer>
  </section>
</template>
