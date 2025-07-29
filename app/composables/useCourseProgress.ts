import type { CourseProgress } from "../../types/course";

export const useCourseProgress = () => {
  const progressData = useState<Record<string, CourseProgress>>(
    "courseProgress",
    () => ({})
  );

  /**
   * Mark a lesson as completed
   */
  const markLessonComplete = (
    courseId: string,
    moduleId: string,
    lessonId: string,
    userId?: string
  ) => {
    const key = `${courseId}`;
    const now = new Date().toISOString();

    if (!progressData.value[key]) {
      progressData.value[key] = {
        courseId,
        userId,
        completedLessons: [],
        startedAt: now,
        lastAccessedAt: now,
        progressPercentage: 0,
      };
    }

    const progress = progressData.value[key];
    const lessonKey = `${moduleId}.${lessonId}`;

    if (!progress.completedLessons.includes(lessonKey)) {
      progress.completedLessons.push(lessonKey);
      progress.lastAccessedAt = now;

      // Recalculate progress percentage
      progress.progressPercentage = calculateProgressPercentage(
        courseId,
        progress.completedLessons
      );
    }
  };

  /**
   * Mark a lesson as incomplete
   */
  const markLessonIncomplete = (
    courseId: string,
    moduleId: string,
    lessonId: string
  ) => {
    const key = `${courseId}`;
    const lessonKey = `${moduleId}.${lessonId}`;

    if (progressData.value[key]) {
      const progress = progressData.value[key];
      const index = progress.completedLessons.indexOf(lessonKey);

      if (index > -1) {
        progress.completedLessons.splice(index, 1);
        progress.lastAccessedAt = new Date().toISOString();

        // Recalculate progress percentage
        progress.progressPercentage = calculateProgressPercentage(
          courseId,
          progress.completedLessons
        );
      }
    }
  };

  /**
   * Update current lesson position
   */
  const updateCurrentLesson = (
    courseId: string,
    moduleId: string,
    lessonId: string
  ) => {
    const key = `${courseId}`;
    const now = new Date().toISOString();

    if (!progressData.value[key]) {
      progressData.value[key] = {
        courseId,
        completedLessons: [],
        startedAt: now,
        lastAccessedAt: now,
        progressPercentage: 0,
      };
    }

    progressData.value[key].currentLesson = `${moduleId}.${lessonId}`;
    progressData.value[key].lastAccessedAt = now;
  };

  /**
   * Get course progress
   */
  const getCourseProgress = (courseId: string): CourseProgress | undefined => {
    return progressData.value[courseId];
  };

  /**
   * Get progress percentage for a course
   */
  const getCourseProgressPercentage = (courseId: string): number => {
    const progress = progressData.value[courseId];
    return progress?.progressPercentage || 0;
  };

  /**
   * Check if a lesson is completed
   */
  const isLessonCompleted = (
    courseId: string,
    moduleId: string,
    lessonId: string
  ): boolean => {
    const progress = progressData.value[courseId];
    if (!progress) return false;

    const lessonKey = `${moduleId}.${lessonId}`;
    return progress.completedLessons.includes(lessonKey);
  };

  /**
   * Get module progress percentage
   */
  const getModuleProgressPercentage = async (
    courseId: string,
    moduleId: string
  ): Promise<number> => {
    const { useCourseRegistry } = await import("./useCourseRegistry");
    const { getCourseById } = useCourseRegistry();

    const course = getCourseById(courseId);
    if (!course) return 0;

    const module = course.modules.find((m: any) => m.id === moduleId);
    if (!module) return 0;

    const progress = progressData.value[courseId];
    if (!progress) return 0;

    const moduleCompletedLessons = progress.completedLessons.filter(
      (lessonKey: string) => lessonKey.startsWith(`${moduleId}.`)
    );

    return Math.round(
      (moduleCompletedLessons.length / module.lessons.length) * 100
    );
  };

  /**
   * Calculate overall course progress percentage
   */
  const calculateProgressPercentage = (
    courseId: string,
    completedLessons: string[]
  ): number => {
    // Import synchronously to avoid async issues in computed properties
    try {
      const { useCourseRegistry } = require("./useCourseRegistry");
      const { getCourseById } = useCourseRegistry();

      const course = getCourseById(courseId);
      if (!course) return 0;

      const totalLessons = course.modules.reduce(
        (total: number, module: any) => total + module.lessons.length,
        0
      );

      if (totalLessons === 0) return 0;

      return Math.round((completedLessons.length / totalLessons) * 100);
    } catch (error) {
      console.warn("Error calculating progress percentage:", error);
      return 0;
    }
  };

  /**
   * Mark course as completed
   */
  const markCourseCompleted = (courseId: string) => {
    const progress = progressData.value[courseId];
    if (progress) {
      progress.completedAt = new Date().toISOString();
      progress.progressPercentage = 100;
    }
  };

  /**
   * Check if course is completed
   */
  const isCourseCompleted = (courseId: string): boolean => {
    const progress = progressData.value[courseId];
    return Boolean(progress?.completedAt);
  };

  /**
   * Get next lesson to continue with
   */
  const getNextLesson = (
    courseId: string
  ): { moduleId: string; lessonId: string } | null => {
    try {
      const { useCourseRegistry } = require("./useCourseRegistry");
      const { getCourseById } = useCourseRegistry();

      const course = getCourseById(courseId);
      if (!course) return null;

      const progress = progressData.value[courseId];
      if (!progress)
        return course.modules[0]?.lessons[0]
          ? {
              moduleId: course.modules[0].id,
              lessonId: course.modules[0].lessons[0].id,
            }
          : null;

      // Find first incomplete lesson
      for (const module of course.modules) {
        for (const lesson of module.lessons) {
          const lessonKey = `${module.id}.${lesson.id}`;
          if (!progress.completedLessons.includes(lessonKey)) {
            return { moduleId: module.id, lessonId: lesson.id };
          }
        }
      }

      return null; // All lessons completed
    } catch (error) {
      console.warn("Error getting next lesson:", error);
      return null;
    }
  };

  /**
   * Reset course progress
   */
  const resetCourseProgress = (courseId: string) => {
    delete progressData.value[courseId];
  };

  /**
   * Export progress data (for backup/sync)
   */
  const exportProgress = (): Record<string, CourseProgress> => {
    return { ...progressData.value };
  };

  /**
   * Import progress data (for restore/sync)
   */
  const importProgress = (data: Record<string, CourseProgress>) => {
    progressData.value = { ...data };
  };

  return {
    // Lesson progress
    markLessonComplete,
    markLessonIncomplete,
    isLessonCompleted,
    updateCurrentLesson,

    // Course progress
    getCourseProgress,
    getCourseProgressPercentage,
    markCourseCompleted,
    isCourseCompleted,

    // Module progress
    getModuleProgressPercentage,

    // Navigation
    getNextLesson,

    // Management
    resetCourseProgress,
    exportProgress,
    importProgress,

    // Reactive data
    progressData: readonly(progressData),
  };
};
