import type {
  Course,
  CourseFilters,
  CourseSortOptions,
  CourseProgress,
} from "../../types/course";
import {
  coursesConfig,
  courseCategories,
  technologyTags,
  difficultyLevels,
} from "../../config/courses";

export const useCourseRegistry = () => {
  const { locale } = useI18n();

  /**
   * Get all available courses
   */
  const getAllCourses = (): Course[] => {
    return coursesConfig;
  };

  /**
   * Get a specific course by ID
   */
  const getCourseById = (courseId: string): Course | undefined => {
    return coursesConfig.find((course) => course.id === courseId);
  };

  /**
   * Get a course by slug
   */
  const getCourseBySlug = (slug: string): Course | undefined => {
    return coursesConfig.find((course) => course.slug === slug);
  };

  /**
   * Get published courses only
   */
  const getPublishedCourses = (): Course[] => {
    return coursesConfig.filter((course) => course.status === "published");
  };

  /**
   * Get courses by category
   */
  const getCoursesByCategory = (categoryId: string): Course[] => {
    return coursesConfig.filter(
      (course) =>
        course.categories.includes(categoryId) && course.status === "published"
    );
  };

  /**
   * Get courses by technology
   */
  const getCoursesByTechnology = (technology: string): Course[] => {
    return coursesConfig.filter(
      (course) =>
        course.technologies.includes(technology) &&
        course.status === "published"
    );
  };

  /**
   * Get courses by difficulty level
   */
  const getCoursesByDifficulty = (
    difficulty: "beginner" | "intermediate" | "advanced"
  ): Course[] => {
    return coursesConfig.filter(
      (course) =>
        course.difficulty === difficulty && course.status === "published"
    );
  };

  /**
   * Search courses by title or description
   */
  const searchCourses = (query: string): Course[] => {
    const searchTerm = query.toLowerCase();
    return coursesConfig.filter((course) => {
      const title = course.title[locale.value]?.toLowerCase() || "";
      const description = course.description[locale.value]?.toLowerCase() || "";
      const technologies = course.technologies.join(" ").toLowerCase();
      const tags = course.tags?.join(" ").toLowerCase() || "";

      return (
        title.includes(searchTerm) ||
        description.includes(searchTerm) ||
        technologies.includes(searchTerm) ||
        tags.includes(searchTerm)
      );
    });
  };

  /**
   * Filter courses based on multiple criteria
   */
  const filterCourses = (filters: CourseFilters): Course[] => {
    let filteredCourses = getPublishedCourses();

    if (filters.difficulty && filters.difficulty.length > 0) {
      filteredCourses = filteredCourses.filter((course) =>
        filters.difficulty!.includes(course.difficulty)
      );
    }

    if (filters.technologies && filters.technologies.length > 0) {
      filteredCourses = filteredCourses.filter((course) =>
        filters.technologies!.some((tech) => course.technologies.includes(tech))
      );
    }

    if (filters.categories && filters.categories.length > 0) {
      filteredCourses = filteredCourses.filter((course) =>
        filters.categories!.some((category) =>
          course.categories.includes(category)
        )
      );
    }

    if (filters.priceType && filters.priceType.length > 0) {
      filteredCourses = filteredCourses.filter((course) =>
        filters.priceType!.includes(course.price.type)
      );
    }

    if (filters.duration) {
      if (filters.duration.min !== undefined) {
        filteredCourses = filteredCourses.filter(
          (course) => course.estimatedHours >= filters.duration!.min!
        );
      }
      if (filters.duration.max !== undefined) {
        filteredCourses = filteredCourses.filter(
          (course) => course.estimatedHours <= filters.duration!.max!
        );
      }
    }

    return filteredCourses;
  };

  /**
   * Sort courses based on criteria
   */
  const sortCourses = (
    courses: Course[],
    sort: CourseSortOptions
  ): Course[] => {
    return [...courses].sort((a, b) => {
      let aValue: any, bValue: any;

      switch (sort.field) {
        case "title":
          aValue = a.title[locale.value] || "";
          bValue = b.title[locale.value] || "";
          break;
        case "difficulty":
          const difficultyOrder = { beginner: 1, intermediate: 2, advanced: 3 };
          aValue = difficultyOrder[a.difficulty];
          bValue = difficultyOrder[b.difficulty];
          break;
        case "estimatedHours":
          aValue = a.estimatedHours;
          bValue = b.estimatedHours;
          break;
        case "createdAt":
          aValue = new Date(a.createdAt).getTime();
          bValue = new Date(b.createdAt).getTime();
          break;
        case "rating":
          aValue = a.rating?.average || 0;
          bValue = b.rating?.average || 0;
          break;
        case "enrollmentCount":
          aValue = a.enrollmentCount || 0;
          bValue = b.enrollmentCount || 0;
          break;
        default:
          return 0;
      }

      if (sort.direction === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });
  };

  /**
   * Get featured courses (top-rated or recommended)
   */
  const getFeaturedCourses = (limit: number = 3): Course[] => {
    return getPublishedCourses()
      .filter((course) => course.rating && course.rating.average >= 4.5)
      .sort((a, b) => (b.rating?.average || 0) - (a.rating?.average || 0))
      .slice(0, limit);
  };

  /**
   * Get related courses based on technologies and categories
   */
  const getRelatedCourses = (courseId: string, limit: number = 3): Course[] => {
    const course = getCourseById(courseId);
    if (!course) return [];

    return getPublishedCourses()
      .filter((c) => c.id !== courseId)
      .filter(
        (c) =>
          c.technologies.some((tech) => course.technologies.includes(tech)) ||
          c.categories.some((cat) => course.categories.includes(cat))
      )
      .slice(0, limit);
  };

  /**
   * Get course configuration metadata
   */
  const getCourseCategories = () => courseCategories;
  const getTechnologyTags = () => technologyTags;
  const getDifficultyLevels = () => difficultyLevels;

  /**
   * Validate course configuration
   */
  const validateCourse = (
    course: Course
  ): { valid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (!course.id) errors.push("Course ID is required");
    if (!course.title.en) errors.push("English title is required");
    if (!course.description.en) errors.push("English description is required");
    if (!course.slug) errors.push("Course slug is required");
    if (!course.instructor.name) errors.push("Instructor name is required");
    if (course.modules.length === 0)
      errors.push("At least one module is required");

    // Validate modules
    course.modules.forEach((module, moduleIndex) => {
      if (!module.id) errors.push(`Module ${moduleIndex + 1}: ID is required`);
      if (!module.title.en)
        errors.push(`Module ${moduleIndex + 1}: English title is required`);
      if (module.lessons.length === 0)
        errors.push(
          `Module ${moduleIndex + 1}: At least one lesson is required`
        );

      // Validate lessons
      module.lessons.forEach((lesson, lessonIndex) => {
        if (!lesson.id)
          errors.push(
            `Module ${moduleIndex + 1}, Lesson ${lessonIndex + 1}: ID is required`
          );
        if (!lesson.title.en)
          errors.push(
            `Module ${moduleIndex + 1}, Lesson ${lessonIndex + 1}: English title is required`
          );
        if (!lesson.slug)
          errors.push(
            `Module ${moduleIndex + 1}, Lesson ${lessonIndex + 1}: Slug is required`
          );
      });
    });

    return {
      valid: errors.length === 0,
      errors,
    };
  };

  return {
    // Course retrieval
    getAllCourses,
    getCourseById,
    getCourseBySlug,
    getPublishedCourses,
    getCoursesByCategory,
    getCoursesByTechnology,
    getCoursesByDifficulty,

    // Course discovery
    searchCourses,
    filterCourses,
    sortCourses,
    getFeaturedCourses,
    getRelatedCourses,

    // Configuration metadata
    getCourseCategories,
    getTechnologyTags,
    getDifficultyLevels,

    // Validation
    validateCourse,
  };
};
