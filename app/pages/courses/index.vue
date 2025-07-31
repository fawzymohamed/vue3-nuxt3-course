<script setup lang="ts">
const { t } = useI18n();
const localePath = useLocalePath();
const { getAllCourses, getPublishedCourses } = useCourseRegistry();

// Manual import of the filtering composable
interface CourseFilters {
  search: string;
  difficulty: "beginner" | "intermediate" | "advanced" | "all";
  technology: string;
  status: "published" | "coming-soon" | "draft" | "all";
  sortBy: "title" | "difficulty" | "estimatedHours" | "createdAt";
  sortOrder: "asc" | "desc";
}

// Initialize filters
const filters = ref<CourseFilters>({
  search: "",
  difficulty: "all",
  technology: "all",
  status: "all",
  sortBy: "title",
  sortOrder: "asc",
});

// SEO Meta for courses listing page
useHead({
  title: t("courses.meta.title"),
  meta: [
    {
      name: "description",
      content: t("courses.meta.description"),
    },
  ],
});

// Get courses from the course registry
const allCourses = getAllCourses();
const publishedCourses = getPublishedCourses();

// Get available technologies for filtering
const availableTechnologies = computed(() => {
  const technologies = new Set<string>();
  allCourses.forEach((course: any) => {
    if (course.technologies) {
      course.technologies.forEach((tech: string) => technologies.add(tech));
    }
  });
  return Array.from(technologies).sort();
});

// Filter and sort courses
const filteredAndSortedCourses = computed(() => {
  const { locale } = useI18n();
  let filtered = [...allCourses];

  // Search filter
  if (filters.value.search) {
    const searchTerm = filters.value.search.toLowerCase();
    filtered = filtered.filter((course: any) => {
      const title = course.title[locale.value]?.toLowerCase() || "";
      const description = course.description[locale.value]?.toLowerCase() || "";
      const technologies = course.technologies?.join(" ").toLowerCase() || "";

      return (
        title.includes(searchTerm) ||
        description.includes(searchTerm) ||
        technologies.includes(searchTerm)
      );
    });
  }

  // Difficulty filter
  if (filters.value.difficulty !== "all") {
    filtered = filtered.filter(
      (course: any) => course.difficulty === filters.value.difficulty
    );
  }

  // Technology filter
  if (filters.value.technology !== "all") {
    filtered = filtered.filter((course: any) =>
      course.technologies?.includes(filters.value.technology)
    );
  }

  // Status filter
  if (filters.value.status !== "all") {
    filtered = filtered.filter(
      (course: any) => course.status === filters.value.status
    );
  }

  // Sort
  filtered.sort((a: any, b: any) => {
    let aValue: any;
    let bValue: any;

    switch (filters.value.sortBy) {
      case "title":
        aValue = a.title[locale.value] || "";
        bValue = b.title[locale.value] || "";
        break;
      case "difficulty":
        const difficultyOrder = { beginner: 1, intermediate: 2, advanced: 3 };
        aValue =
          difficultyOrder[a.difficulty as keyof typeof difficultyOrder] || 0;
        bValue =
          difficultyOrder[b.difficulty as keyof typeof difficultyOrder] || 0;
        break;
      case "estimatedHours":
        aValue = a.estimatedHours || 0;
        bValue = b.estimatedHours || 0;
        break;
      case "createdAt":
        aValue = new Date(a.createdAt || 0).getTime();
        bValue = new Date(b.createdAt || 0).getTime();
        break;
      default:
        aValue = a.title[locale.value] || "";
        bValue = b.title[locale.value] || "";
    }

    if (typeof aValue === "string" && typeof bValue === "string") {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    let comparison = 0;
    if (aValue < bValue) comparison = -1;
    if (aValue > bValue) comparison = 1;

    return filters.value.sortOrder === "desc" ? -comparison : comparison;
  });

  return filtered;
});

// Pagination
const currentPage = ref(1);
const itemsPerPage = 9;

const totalPages = computed(() =>
  Math.ceil(filteredAndSortedCourses.value.length / itemsPerPage)
);

const paginatedCourses = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return filteredAndSortedCourses.value.slice(startIndex, endIndex);
});

// Separate coming soon courses for display
const comingSoonCourses = computed(() =>
  filteredAndSortedCourses.value.filter(
    (course: any) => course.status === "coming-soon"
  )
);

// Published courses for main grid
const mainGridCourses = computed(() =>
  paginatedCourses.value.filter((course: any) => course.status === "published")
);

// Course count information
const courseStats = computed(() => {
  const total = filteredAndSortedCourses.value.length;
  const published = filteredAndSortedCourses.value.filter(
    (c: any) => c.status === "published"
  ).length;
  const comingSoon = filteredAndSortedCourses.value.filter(
    (c: any) => c.status === "coming-soon"
  ).length;

  return { total, published, comingSoon };
});

// Results display information
const resultsInfo = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage + 1;
  const end = Math.min(
    currentPage.value * itemsPerPage,
    filteredAndSortedCourses.value.length
  );
  const total = filteredAndSortedCourses.value.length;

  return { start, end, total };
});

// Handle filter updates
const handleFiltersUpdate = (newFilters: CourseFilters) => {
  filters.value = { ...newFilters };
  currentPage.value = 1; // Reset to first page when filters change
};

// Reset filters handler
const handleResetFilters = () => {
  filters.value = {
    search: "",
    difficulty: "all",
    technology: "all",
    status: "all",
    sortBy: "title",
    sortOrder: "asc",
  };
  currentPage.value = 1;
};

// Go to page handler
const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const { locale } = useI18n();
</script>

<template>
  <div>
    <UContainer>
      <!-- Page Header -->
      <div class="py-8 lg:py-16">
        <div class="text-center">
          <h1
            class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl"
          >
            {{ $t("courses.title") }}
          </h1>
          <p class="mt-4 text-lg text-gray-600 dark:text-gray-300">
            {{ $t("courses.subtitle") }}
          </p>

          <!-- Course Statistics -->
          <div
            class="mt-6 flex justify-center gap-8 text-sm text-gray-600 dark:text-gray-400"
          >
            <div>
              <span
                class="font-semibold text-primary-600 dark:text-primary-400"
              >
                {{ courseStats.total }}
              </span>
              {{ $t("courses.title") }}
            </div>
            <div>
              <span class="font-semibold text-green-600 dark:text-green-400">
                {{ courseStats.published }}
              </span>
              {{ $t("filters.status.published") }}
            </div>
            <div>
              <span class="font-semibold text-orange-600 dark:text-orange-400">
                {{ courseStats.comingSoon }}
              </span>
              {{ $t("courses.comingSoon") }}
            </div>
          </div>
        </div>
      </div>

      <!-- Course Filters -->
      <CourseFilters
        :filters="filters"
        :available-technologies="availableTechnologies"
        @update:filters="handleFiltersUpdate"
        @reset="handleResetFilters"
      />

      <!-- Results Information -->
      <div
        v-if="resultsInfo.total > 0"
        class="mb-6 flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4"
      >
        <p class="text-sm text-gray-600 dark:text-gray-400">
          {{
            $t("courses.showing", {
              start: resultsInfo.start,
              end: resultsInfo.end,
              total: resultsInfo.total,
            })
          }}
        </p>

        <!-- Items per page selector -->
        <div class="flex items-center gap-2">
          <span class="text-sm text-gray-600 dark:text-gray-400">
            {{ itemsPerPage }} {{ $t("courses.resultsPerPage") }}
          </span>
        </div>
      </div>

      <!-- No Results Message -->
      <div
        v-if="filteredAndSortedCourses.length === 0"
        class="text-center py-16"
      >
        <div class="text-gray-400 dark:text-gray-500 mb-4">
          <UIcon name="i-heroicons-academic-cap" class="w-16 h-16 mx-auto" />
        </div>
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
          {{ $t("courses.noResults") }}
        </h3>
        <p class="text-gray-600 dark:text-gray-400 mb-6">
          Try adjusting your search criteria or browse all courses.
        </p>
        <UButton variant="outline" @click="handleResetFilters">
          {{ $t("filters.reset") }}
        </UButton>
      </div>

      <!-- Published Courses Grid -->
      <div v-if="mainGridCourses.length > 0">
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <CourseCard
            v-for="course in mainGridCourses"
            :key="course.id"
            :course="course"
          />
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="mt-12 flex justify-center">
        <UPagination
          :model-value="currentPage"
          :total="filteredAndSortedCourses.length"
          :page-count="itemsPerPage"
          @update:model-value="goToPage"
        />
      </div>

      <!-- Coming Soon Section -->
      <div v-if="comingSoonCourses.length > 0" class="mt-16">
        <div class="text-center mb-8">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {{ $t("courses.comingSoon") }}
          </h2>
        </div>
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <CourseCard
            v-for="course in comingSoonCourses"
            :key="course.id"
            :course="course"
          />
        </div>
      </div>
    </UContainer>
  </div>
</template>
