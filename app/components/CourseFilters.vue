<script setup lang="ts">
interface CourseFilters {
  search: string;
  difficulty: "beginner" | "intermediate" | "advanced" | "all";
  technology: string;
  status: "published" | "coming-soon" | "draft" | "all";
  sortBy: "title" | "difficulty" | "estimatedHours" | "createdAt";
  sortOrder: "asc" | "desc";
}

interface Props {
  filters: CourseFilters;
  availableTechnologies: string[];
}

interface Emits {
  "update:filters": [filters: CourseFilters];
  reset: [];
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const { t } = useI18n();

// Local reactive copy of filters
const localFilters = ref<CourseFilters>({ ...props.filters });

// Watch for external filter changes
watch(
  () => props.filters,
  (newFilters) => {
    localFilters.value = { ...newFilters };
  },
  { deep: true }
);

// Emit changes when local filters change
watch(
  localFilters,
  (newFilters) => {
    emit("update:filters", { ...newFilters });
  },
  { deep: true }
);

// Filter options
const difficultyOptions = [
  { value: "all", label: t("filters.difficulty.all") },
  { value: "beginner", label: t("filters.difficulty.beginner") },
  { value: "intermediate", label: t("filters.difficulty.intermediate") },
  { value: "advanced", label: t("filters.difficulty.advanced") },
];

const statusOptions = [
  { value: "all", label: t("filters.status.all") },
  { value: "published", label: t("filters.status.published") },
  { value: "coming-soon", label: t("filters.status.comingSoon") },
];

const sortOptions = [
  { value: "title", label: t("filters.sort.title") },
  { value: "difficulty", label: t("filters.sort.difficulty") },
  { value: "estimatedHours", label: t("filters.sort.duration") },
  { value: "createdAt", label: t("filters.sort.newest") },
];

const sortOrderOptions = [
  { value: "asc", label: t("filters.sortOrder.ascending") },
  { value: "desc", label: t("filters.sortOrder.descending") },
];

// Technology options with "All" option
const technologyOptions = computed(() => [
  { value: "all", label: t("filters.technology.all") },
  ...props.availableTechnologies.map((tech) => ({
    value: tech,
    label: tech.charAt(0).toUpperCase() + tech.slice(1),
  })),
]);

// Reset filters
const resetFilters = () => {
  localFilters.value = {
    search: "",
    difficulty: "all",
    technology: "all",
    status: "all",
    sortBy: "title",
    sortOrder: "asc",
  };
  emit("reset");
};

// Check if any filters are active
const hasActiveFilters = computed(() => {
  return (
    localFilters.value.search !== "" ||
    localFilters.value.difficulty !== "all" ||
    localFilters.value.technology !== "all" ||
    localFilters.value.status !== "all" ||
    localFilters.value.sortBy !== "title" ||
    localFilters.value.sortOrder !== "asc"
  );
});
</script>

<template>
  <div class="course-filters">
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            {{ $t("filters.title") }}
          </h3>
          <UButton
            v-if="hasActiveFilters"
            variant="ghost"
            size="sm"
            @click="resetFilters"
          >
            {{ $t("filters.reset") }}
          </UButton>
        </div>
      </template>

      <div class="space-y-6">
        <!-- Search Input -->
        <div>
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            {{ $t("filters.search.label") }}
          </label>
          <UInput
            v-model="localFilters.search"
            :placeholder="$t('filters.search.placeholder')"
            icon="i-heroicons-magnifying-glass"
            size="lg"
          />
        </div>

        <!-- Filter Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- Difficulty Filter -->
          <div>
            <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              {{ $t("filters.difficulty.label") }}
            </label>
            <USelect
              v-model="localFilters.difficulty"
              :options="difficultyOptions"
              option-attribute="label"
              value-attribute="value"
            />
          </div>

          <!-- Technology Filter -->
          <div>
            <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              {{ $t("filters.technology.label") }}
            </label>
            <USelect
              v-model="localFilters.technology"
              :options="technologyOptions"
              option-attribute="label"
              value-attribute="value"
            />
          </div>

          <!-- Status Filter -->
          <div>
            <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              {{ $t("filters.status.label") }}
            </label>
            <USelect
              v-model="localFilters.status"
              :options="statusOptions"
              option-attribute="label"
              value-attribute="value"
            />
          </div>

          <!-- Sort Options -->
          <div>
            <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              {{ $t("filters.sort.label") }}
            </label>
            <div class="flex gap-2">
              <USelect
                v-model="localFilters.sortBy"
                :options="sortOptions"
                option-attribute="label"
                value-attribute="value"
                class="flex-1"
              />
              <USelect
                v-model="localFilters.sortOrder"
                :options="sortOrderOptions"
                option-attribute="label"
                value-attribute="value"
                class="w-20"
              />
            </div>
          </div>
        </div>

        <!-- Active Filters Display -->
        <div v-if="hasActiveFilters" class="flex flex-wrap gap-2">
          <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
            {{ $t("filters.activeFilters") }}:
          </span>

          <UBadge
            v-if="localFilters.search"
            variant="soft"
            color="primary"
            @click="localFilters.search = ''"
          >
            {{ $t("filters.search.label") }}: "{{ localFilters.search }}"
            <UIcon name="i-heroicons-x-mark" class="ml-1 cursor-pointer" />
          </UBadge>

          <UBadge
            v-if="localFilters.difficulty !== 'all'"
            variant="soft"
            color="warning"
            @click="localFilters.difficulty = 'all'"
          >
            {{ $t(`filters.difficulty.${localFilters.difficulty}`) }}
            <UIcon name="i-heroicons-x-mark" class="ml-1 cursor-pointer" />
          </UBadge>

          <UBadge
            v-if="localFilters.technology !== 'all'"
            variant="soft"
            color="success"
            @click="localFilters.technology = 'all'"
          >
            {{ localFilters.technology }}
            <UIcon name="i-heroicons-x-mark" class="ml-1 cursor-pointer" />
          </UBadge>

          <UBadge
            v-if="localFilters.status !== 'all'"
            variant="soft"
            color="info"
            @click="localFilters.status = 'all'"
          >
            {{ $t(`filters.status.${localFilters.status}`) }}
            <UIcon name="i-heroicons-x-mark" class="ml-1 cursor-pointer" />
          </UBadge>
        </div>
      </div>
    </UCard>
  </div>
</template>

<style scoped>
.course-filters {
  margin-bottom: 2rem;
}
</style>
