interface CourseFilters {
  search: string;
  difficulty: "beginner" | "intermediate" | "advanced" | "all";
  technology: string;
  status: "published" | "coming-soon" | "draft" | "all";
  sortBy: "title" | "difficulty" | "estimatedHours" | "createdAt";
  sortOrder: "asc" | "desc";
}

export const useCourseFiltering = () => {
  const { locale } = useI18n();

  // Default filters
  const defaultFilters: CourseFilters = {
    search: "",
    difficulty: "all",
    technology: "all",
    status: "all",
    sortBy: "title",
    sortOrder: "asc",
  };

  // Reactive filters state
  const filters = ref<CourseFilters>({ ...defaultFilters });

  // Reset filters to default
  const resetFilters = () => {
    filters.value = { ...defaultFilters };
  };

  // Filter courses based on current filters
  const filterCourses = (courses: any[]) => {
    let filteredCourses = [...courses];

    // Search filter
    if (filters.value.search) {
      const searchTerm = filters.value.search.toLowerCase();
      filteredCourses = filteredCourses.filter((course) => {
        const title = course.title[locale.value]?.toLowerCase() || "";
        const description =
          course.description[locale.value]?.toLowerCase() || "";
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
      filteredCourses = filteredCourses.filter(
        (course) => course.difficulty === filters.value.difficulty
      );
    }

    // Technology filter
    if (filters.value.technology !== "all") {
      filteredCourses = filteredCourses.filter((course) =>
        course.technologies?.includes(filters.value.technology)
      );
    }

    // Status filter
    if (filters.value.status !== "all") {
      filteredCourses = filteredCourses.filter(
        (course) => course.status === filters.value.status
      );
    }

    return filteredCourses;
  };

  // Sort courses based on current sort settings
  const sortCourses = (courses: any[]) => {
    const sortedCourses = [...courses];

    sortedCourses.sort((a, b) => {
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

    return sortedCourses;
  };

  // Get processed courses (filtered and sorted)
  const getProcessedCourses = (courses: any[]) => {
    const filtered = filterCourses(courses);
    return sortCourses(filtered);
  };

  // Get unique technologies from all courses
  const getAvailableTechnologies = (courses: any[]) => {
    const technologies = new Set<string>();
    courses.forEach((course) => {
      if (course.technologies) {
        course.technologies.forEach((tech: string) => technologies.add(tech));
      }
    });
    return Array.from(technologies).sort();
  };

  // Pagination helper
  const usePagination = (items: any[], itemsPerPage: number = 9) => {
    const currentPage = ref(1);

    const totalPages = computed(() => Math.ceil(items.length / itemsPerPage));

    const paginatedItems = computed(() => {
      const startIndex = (currentPage.value - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      return items.slice(startIndex, endIndex);
    });

    const goToPage = (page: number) => {
      if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
      }
    };

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
      }
    };

    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
    };

    // Reset to first page when items change
    watch(
      () => items.length,
      () => {
        currentPage.value = 1;
      }
    );

    return {
      currentPage: readonly(currentPage),
      totalPages,
      paginatedItems,
      goToPage,
      nextPage,
      prevPage,
    };
  };

  return {
    filters,
    resetFilters,
    filterCourses,
    sortCourses,
    getProcessedCourses,
    getAvailableTechnologies,
    usePagination,
  };
};
