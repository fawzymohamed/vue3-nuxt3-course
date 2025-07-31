<template>
  <section class="py-16 lg:py-20 bg-gray-50 dark:bg-gray-900">
    <UContainer>
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-12">
          <h2
            class="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            {{ $t("homepage.categories.title") }}
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {{ $t("homepage.categories.subtitle") }}
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="category in categories"
            :key="category.id"
            class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md hover:border-green-300 dark:hover:border-green-600 transition-all duration-200 cursor-pointer group"
            @click="navigateToCategory(category.id)"
          >
            <div class="flex items-center gap-4 mb-4">
              <div
                class="w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200"
                :class="`bg-${category.color}-100 dark:bg-${category.color}-900/30`"
              >
                <UIcon
                  :name="category.icon"
                  class="w-6 h-6"
                  :class="`text-${category.color}-600 dark:text-${category.color}-400`"
                />
              </div>
              <div>
                <h3
                  class="text-xl font-semibold text-gray-900 dark:text-white mb-1"
                >
                  {{ category.title[locale] }}
                </h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  {{ getCategoryStats(category.id) }}
                </p>
              </div>
            </div>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
              {{ category.description[locale] }}
            </p>
          </div>
        </div>

        <div class="text-center mt-12">
          <UButton
            :to="localePath('/courses')"
            variant="outline"
            size="lg"
            class="border-green-400 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20"
          >
            {{ $t("homepage.categories.browseAll") }}
          </UButton>
        </div>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
const { t, locale } = useI18n();
const localePath = useLocalePath();
const { getCoursesByCategory, getCourseCategories } = useCourseRegistry();

const categories = getCourseCategories();

const getCategoryStats = (categoryId: string) => {
  const courses = getCoursesByCategory(categoryId);
  const count = courses.length;
  return count === 1
    ? t("homepage.categories.courseCount.singular", { count })
    : t("homepage.categories.courseCount.plural", { count });
};

const navigateToCategory = (categoryId: string) => {
  // Navigate to courses page with category filter
  navigateTo(localePath(`/courses?category=${categoryId}`));
};
</script>
