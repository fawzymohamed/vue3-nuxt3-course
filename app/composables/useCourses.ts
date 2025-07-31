/**
 * Enhanced Content Queries Composable
 *
 * Provides course-aware content querying functions for the multi-course platform.
 * This composable implements Phase 3.1 of the multi-course transformation plan.
 *
 * Features:
 * - Course-aware content queries with locale support
 * - Module and lesson retrieval with proper sorting
 * - Caching and error handling
 * - Type-safe content operations
 */

export const useCourses = () => {
  const { locale } = useI18n();

  /**
   * Get all courses from the content directory
   * Returns courses in the current locale with full metadata
   */
  const getAllCourses = async () => {
    try {
      const content = await $fetch("/api/_content/query", {
        method: "get",
        query: {
          _params: JSON.stringify({
            where: [
              { _path: { $regex: `courses/.*/${locale.value}/course$` } },
            ],
          }),
        },
      });

      // Ensure we return an array
      return Array.isArray(content) ? content : [];
    } catch (error) {
      console.error("Error fetching all courses:", error);
      return [];
    }
  };

  /**
   * Get a specific course by courseId
   * Returns course metadata for the current locale
   */
  const getCourse = async (courseId: string) => {
    try {
      const content = await $fetch("/api/_content/query", {
        method: "get",
        query: {
          _params: JSON.stringify({
            first: true,
            where: [
              { _path: { $eq: `courses/${courseId}/${locale.value}/course` } },
            ],
          }),
        },
      });

      return content || null;
    } catch (error) {
      console.error(`Error fetching course '${courseId}':`, error);
      return null;
    }
  };

  /**
   * Get all modules for a specific course
   * Returns modules sorted by number with metadata
   */
  const getCourseModules = async (courseId: string) => {
    try {
      const content = await $fetch("/api/_content/query", {
        method: "get",
        query: {
          _params: JSON.stringify({
            where: [
              {
                _path: {
                  $regex: `courses/${courseId}/${locale.value}/modules/.*/module$`,
                },
              },
            ],
            sort: [{ number: 1 }],
          }),
        },
      });

      // Ensure we return an array
      return Array.isArray(content) ? content : [];
    } catch (error) {
      console.error(`Error fetching modules for course '${courseId}':`, error);
      return [];
    }
  };

  /**
   * Get lessons for a course or specific module
   * Returns lessons sorted by number with metadata
   */
  const getCourseLessons = async (courseId: string, moduleId?: string) => {
    try {
      const pathPattern = moduleId
        ? `courses/${courseId}/${locale.value}/modules/${moduleId}/lessons/.*`
        : `courses/${courseId}/${locale.value}/modules/.*/lessons/.*`;

      const content = await $fetch("/api/_content/query", {
        method: "get",
        query: {
          _params: JSON.stringify({
            where: [{ _path: { $regex: pathPattern } }],
            sort: [{ number: 1 }],
          }),
        },
      });

      // Ensure we return an array
      return Array.isArray(content) ? content : [];
    } catch (error) {
      console.error(
        `Error fetching lessons for course '${courseId}', module '${moduleId}':`,
        error
      );
      return [];
    }
  };

  /**
   * Get a specific lesson by courseId, moduleId, and lessonSlug
   */
  const getLesson = async (
    courseId: string,
    moduleId: string,
    lessonSlug: string
  ) => {
    try {
      const content = await $fetch("/api/_content/query", {
        method: "get",
        query: {
          _params: JSON.stringify({
            first: true,
            where: [
              {
                _path: {
                  $eq: `courses/${courseId}/${locale.value}/modules/${moduleId}/lessons/${lessonSlug}`,
                },
              },
            ],
          }),
        },
      });

      return content || null;
    } catch (error) {
      console.error(`Error fetching lesson '${lessonSlug}':`, error);
      return null;
    }
  };

  /**
   * Get a specific module by courseId and moduleId
   */
  const getModule = async (courseId: string, moduleId: string) => {
    try {
      const content = await $fetch("/api/_content/query", {
        method: "get",
        query: {
          _params: JSON.stringify({
            first: true,
            where: [
              {
                _path: {
                  $eq: `courses/${courseId}/${locale.value}/modules/${moduleId}/module`,
                },
              },
            ],
          }),
        },
      });

      return content || null;
    } catch (error) {
      console.error(`Error fetching module '${moduleId}':`, error);
      return null;
    }
  };

  /**
   * Search courses by title, description, or technologies
   */
  const searchCourses = async (query: string) => {
    if (!query || query.trim().length < 2) {
      return [];
    }

    try {
      const searchTerm = query.toLowerCase().trim();
      const allCourses = await getAllCourses();

      if (!Array.isArray(allCourses)) {
        return [];
      }

      return allCourses.filter((course: any) => {
        const title = (course.title || "").toLowerCase();
        const description = (course.description || "").toLowerCase();
        const technologies = Array.isArray(course.technologies)
          ? course.technologies.join(" ").toLowerCase()
          : "";

        return (
          title.includes(searchTerm) ||
          description.includes(searchTerm) ||
          technologies.includes(searchTerm)
        );
      });
    } catch (error) {
      console.error("Error searching courses:", error);
      return [];
    }
  };

  /**
   * Get courses by difficulty level
   */
  const getCoursesByDifficulty = async (
    difficulty: "beginner" | "intermediate" | "advanced"
  ) => {
    try {
      const allCourses = await getAllCourses();

      if (!Array.isArray(allCourses)) {
        return [];
      }

      return allCourses.filter(
        (course: any) => course.difficulty === difficulty
      );
    } catch (error) {
      console.error(
        `Error fetching courses by difficulty '${difficulty}':`,
        error
      );
      return [];
    }
  };

  /**
   * Get courses by technology
   */
  const getCoursesByTechnology = async (technology: string) => {
    try {
      const allCourses = await getAllCourses();

      if (!Array.isArray(allCourses)) {
        return [];
      }

      return allCourses.filter(
        (course: any) =>
          Array.isArray(course.technologies) &&
          course.technologies.includes(technology)
      );
    } catch (error) {
      console.error(
        `Error fetching courses by technology '${technology}':`,
        error
      );
      return [];
    }
  };

  /**
   * Get published courses only
   */
  const getPublishedCourses = async () => {
    try {
      const allCourses = await getAllCourses();

      if (!Array.isArray(allCourses)) {
        return [];
      }

      return allCourses.filter((course: any) => course.status === "published");
    } catch (error) {
      console.error("Error fetching published courses:", error);
      return [];
    }
  };

  /**
   * Get course navigation data (modules and lessons) for a specific course
   * This is optimized for navigation components
   */
  const getCourseNavigation = async (courseId: string) => {
    try {
      const [course, modules] = await Promise.all([
        getCourse(courseId),
        getCourseModules(courseId),
      ]);

      if (!course) {
        throw new Error(`Course '${courseId}' not found`);
      }

      if (!Array.isArray(modules)) {
        return {
          course,
          modules: [],
        };
      }

      // Get lessons for each module
      const modulesWithLessons = await Promise.all(
        modules.map(async (module: any) => {
          const moduleId = module._path.split("/").slice(-2, -1)[0];
          const lessons = await getCourseLessons(courseId, moduleId);
          return {
            ...module,
            moduleId,
            lessons: Array.isArray(lessons) ? lessons : [],
          };
        })
      );

      return {
        course,
        modules: modulesWithLessons,
      };
    } catch (error) {
      console.error(
        `Error fetching course navigation for '${courseId}':`,
        error
      );
      return null;
    }
  };

  /**
   * Get content statistics for a course
   */
  const getCourseStats = async (courseId: string) => {
    try {
      const [modules, allLessons] = await Promise.all([
        getCourseModules(courseId),
        getCourseLessons(courseId),
      ]);

      const safeModules = Array.isArray(modules) ? modules : [];
      const safeLessons = Array.isArray(allLessons) ? allLessons : [];

      const totalLessons = safeLessons.length;
      const totalModules = safeModules.length;

      // Calculate estimated total time
      const totalMinutes = safeLessons.reduce((total: number, lesson: any) => {
        return total + (lesson.estimatedMinutes || 0);
      }, 0);

      const totalHours = Math.round((totalMinutes / 60) * 10) / 10; // Round to 1 decimal

      return {
        totalModules,
        totalLessons,
        totalMinutes,
        totalHours,
        hasExercises: safeLessons.some((lesson: any) => lesson.hasExercise),
        hasQuizzes: safeLessons.some((lesson: any) => lesson.hasQuiz),
      };
    } catch (error) {
      console.error(`Error calculating course stats for '${courseId}':`, error);
      return {
        totalModules: 0,
        totalLessons: 0,
        totalMinutes: 0,
        totalHours: 0,
        hasExercises: false,
        hasQuizzes: false,
      };
    }
  };

  return {
    // Core content queries
    getAllCourses,
    getCourse,
    getCourseModules,
    getCourseLessons,
    getLesson,
    getModule,

    // Search and filtering
    searchCourses,
    getCoursesByDifficulty,
    getCoursesByTechnology,
    getPublishedCourses,

    // Navigation and stats
    getCourseNavigation,
    getCourseStats,
  };
};
