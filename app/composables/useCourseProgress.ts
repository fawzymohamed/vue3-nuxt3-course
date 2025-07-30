/**
 * Progress Tracking System Composable
 *
 * Provides comprehensive course and lesson progress tracking for the multi-course platform.
 * This composable implements Phase 3.2 of the multi-course transformation plan.
 *
 * Features:
 * - Lesson completion tracking with timestamps
 * - Course and module progress calculation
 * - Local storage persistence
 * - Progress analytics and statistics
 * - Progress synchronization across sessions
 * - Bookmark and favorites management
 * - Learning streak tracking
 * - Time spent tracking
 * - Notes and scoring system
 */

// Enhanced progress tracking types
interface LessonProgress {
  completed: boolean;
  completedAt: string;
  timeSpent?: number; // in minutes
  attempts?: number;
  score?: number; // for quizzes/exercises
  bookmarked?: boolean;
  notes?: string;
}

interface ModuleProgress {
  moduleId: string;
  courseId: string;
  totalLessons: number;
  completedLessons: number;
  completionPercentage: number;
  startedAt?: string;
  completedAt?: string;
  estimatedTimeRemaining?: number;
}

interface CourseProgress {
  courseId: string;
  userId?: string;
  totalModules: number;
  completedModules: number;
  totalLessons: number;
  completedLessons: number;
  completionPercentage: number;
  progressPercentage: number; // For backward compatibility
  startedAt?: string;
  completedAt?: string;
  lastAccessedAt?: string;
  currentLesson?: string;
  totalTimeSpent?: number; // in minutes
  averageScore?: number;
  streak?: number; // consecutive days of learning
}

interface ProgressData {
  lessons: Record<string, LessonProgress>; // key: courseId.moduleId.lessonId
  modules: Record<string, ModuleProgress>; // key: courseId.moduleId
  courses: Record<string, CourseProgress>; // key: courseId
  user: {
    totalCoursesStarted: number;
    totalCoursesCompleted: number;
    totalLessonsCompleted: number;
    totalTimeSpent: number;
    currentStreak: number;
    longestStreak: number;
    lastActiveDate?: string;
    joinedAt?: string;
  };
  settings: {
    trackTimeSpent: boolean;
    showProgressBar: boolean;
    enableNotifications: boolean;
    autoMarkComplete: boolean;
  };
}

export const useCourseProgress = () => {
  // Initialize progress data with proper defaults
  const progressData = useState<ProgressData>("courseProgress", () => ({
    lessons: {},
    modules: {},
    courses: {},
    user: {
      totalCoursesStarted: 0,
      totalCoursesCompleted: 0,
      totalLessonsCompleted: 0,
      totalTimeSpent: 0,
      currentStreak: 0,
      longestStreak: 0,
    },
    settings: {
      trackTimeSpent: true,
      showProgressBar: true,
      enableNotifications: true,
      autoMarkComplete: false,
    },
  }));

  // Load progress from localStorage on client-side
  const loadProgress = () => {
    if (process.client) {
      try {
        const saved = localStorage.getItem("course-progress");
        if (saved) {
          const parsed = JSON.parse(saved);
          progressData.value = { ...progressData.value, ...parsed };
        }
      } catch (error) {
        console.error("Error loading progress from localStorage:", error);
      }
    }
  };

  // Save progress to localStorage
  const saveProgress = () => {
    if (process.client) {
      try {
        localStorage.setItem(
          "course-progress",
          JSON.stringify(progressData.value)
        );
      } catch (error) {
        console.error("Error saving progress to localStorage:", error);
      }
    }
  };

  // Generate progress key for lessons
  const getLessonKey = (
    courseId: string,
    moduleId: string,
    lessonId: string
  ): string => {
    return `${courseId}.${moduleId}.${lessonId}`;
  };

  // Generate progress key for modules
  const getModuleKey = (courseId: string, moduleId: string): string => {
    return `${courseId}.${moduleId}`;
  };

  /**
   * Mark a lesson as complete
   */
  const markLessonComplete = (
    courseId: string,
    moduleId: string,
    lessonId: string,
    options: {
      timeSpent?: number;
      score?: number;
      autoNext?: boolean;
      userId?: string;
    } = {}
  ) => {
    const key = getLessonKey(courseId, moduleId, lessonId);
    const now = new Date().toISOString();

    // Update lesson progress
    if (!progressData.value.lessons[key]) {
      progressData.value.lessons[key] = {
        completed: false,
        completedAt: "",
      };
    }

    const lessonProgress = progressData.value.lessons[key];
    lessonProgress.completed = true;
    lessonProgress.completedAt = now;

    if (options.timeSpent) {
      lessonProgress.timeSpent =
        (lessonProgress.timeSpent || 0) + options.timeSpent;
    }

    if (options.score !== undefined) {
      lessonProgress.score = options.score;
    }

    lessonProgress.attempts = (lessonProgress.attempts || 0) + 1;

    // Update user statistics
    progressData.value.user.totalLessonsCompleted += 1;
    progressData.value.user.totalTimeSpent += options.timeSpent || 0;
    progressData.value.user.lastActiveDate = now;

    // Update module and course progress
    updateModuleProgress(courseId, moduleId);
    updateCourseProgress(courseId);
    updateStreak();

    // Save to localStorage
    saveProgress();

    return true;
  };

  /**
   * Mark a lesson as incomplete
   */
  const markLessonIncomplete = (
    courseId: string,
    moduleId: string,
    lessonId: string
  ) => {
    const key = getLessonKey(courseId, moduleId, lessonId);

    if (progressData.value.lessons[key]?.completed) {
      progressData.value.lessons[key].completed = false;
      progressData.value.user.totalLessonsCompleted = Math.max(
        0,
        progressData.value.user.totalLessonsCompleted - 1
      );

      // Update module and course progress
      updateModuleProgress(courseId, moduleId);
      updateCourseProgress(courseId);

      saveProgress();
    }
  };

  /**
   * Get lesson progress
   */
  const getLessonProgress = (
    courseId: string,
    moduleId: string,
    lessonId: string
  ): LessonProgress | null => {
    const key = getLessonKey(courseId, moduleId, lessonId);
    return progressData.value.lessons[key] || null;
  };

  /**
   * Check if a lesson is completed
   */
  const isLessonCompleted = (
    courseId: string,
    moduleId: string,
    lessonId: string
  ): boolean => {
    const progress = getLessonProgress(courseId, moduleId, lessonId);
    return progress?.completed || false;
  };

  /**
   * Update current lesson position
   */
  const updateCurrentLesson = (
    courseId: string,
    moduleId: string,
    lessonId: string
  ) => {
    const now = new Date().toISOString();

    if (!progressData.value.courses[courseId]) {
      progressData.value.courses[courseId] = {
        courseId,
        totalModules: 0,
        completedModules: 0,
        totalLessons: 0,
        completedLessons: 0,
        completionPercentage: 0,
        progressPercentage: 0,
        startedAt: now,
        lastAccessedAt: now,
      };
    }

    progressData.value.courses[courseId].currentLesson =
      `${moduleId}.${lessonId}`;
    progressData.value.courses[courseId].lastAccessedAt = now;
  };

  /**
   * Update module progress based on lesson completions
   */
  const updateModuleProgress = async (courseId: string, moduleId: string) => {
    try {
      // Get all lessons for this module using the useCourses composable
      const { getCourseLessons } = useCourses();
      const lessons = await getCourseLessons(courseId, moduleId);

      if (!Array.isArray(lessons) || lessons.length === 0) {
        return;
      }

      const moduleKey = getModuleKey(courseId, moduleId);
      const totalLessons = lessons.length;

      // Count completed lessons
      let completedLessons = 0;
      let totalTimeSpent = 0;

      lessons.forEach((lesson: any) => {
        const lessonId =
          lesson._path.split("/").slice(-1)[0] || lesson.lessonId;
        const lessonProgress = getLessonProgress(courseId, moduleId, lessonId);

        if (lessonProgress?.completed) {
          completedLessons += 1;
          totalTimeSpent += lessonProgress.timeSpent || 0;
        }
      });

      const completionPercentage = Math.round(
        (completedLessons / totalLessons) * 100
      );
      const now = new Date().toISOString();

      // Update module progress
      const moduleProgress: ModuleProgress = {
        moduleId,
        courseId,
        totalLessons,
        completedLessons,
        completionPercentage,
        startedAt:
          progressData.value.modules[moduleKey]?.startedAt ||
          (completedLessons > 0 ? now : undefined),
        completedAt: completionPercentage === 100 ? now : undefined,
        estimatedTimeRemaining: calculateEstimatedTime(
          lessons,
          completedLessons
        ),
      };

      progressData.value.modules[moduleKey] = moduleProgress;
    } catch (error) {
      console.error(
        `Error updating module progress for ${courseId}.${moduleId}:`,
        error
      );
    }
  };

  /**
   * Get module progress
   */
  const getModuleProgress = (
    courseId: string,
    moduleId: string
  ): ModuleProgress | null => {
    const key = getModuleKey(courseId, moduleId);
    return progressData.value.modules[key] || null;
  };

  /**
   * Get module progress percentage - backward compatibility
   */
  const getModuleProgressPercentage = async (
    courseId: string,
    moduleId: string
  ): Promise<number> => {
    const moduleProgress = getModuleProgress(courseId, moduleId);
    if (moduleProgress) {
      return moduleProgress.completionPercentage;
    }

    // Fallback: calculate on the fly
    await updateModuleProgress(courseId, moduleId);
    const updatedProgress = getModuleProgress(courseId, moduleId);
    return updatedProgress?.completionPercentage || 0;
  };

  /**
   * Update course progress based on module completions
   */
  const updateCourseProgress = async (courseId: string) => {
    try {
      // Get all modules for this course
      const { getCourseModules, getCourseLessons } = useCourses();
      const [modules, allLessons] = await Promise.all([
        getCourseModules(courseId),
        getCourseLessons(courseId),
      ]);

      if (!Array.isArray(modules) || !Array.isArray(allLessons)) {
        return;
      }

      const totalModules = modules.length;
      const totalLessons = allLessons.length;

      // Count completed modules and lessons
      let completedModules = 0;
      let completedLessons = 0;
      let totalTimeSpent = 0;
      let totalScore = 0;
      let scoredLessons = 0;

      modules.forEach((module: any) => {
        const moduleId =
          module._path.split("/").slice(-2, -1)[0] || module.moduleId;
        const moduleProgress = getModuleProgress(courseId, moduleId);

        if (moduleProgress?.completionPercentage === 100) {
          completedModules += 1;
        }
      });

      allLessons.forEach((lesson: any) => {
        const pathParts = lesson._path.split("/");
        const moduleId = pathParts.slice(-3, -2)[0];
        const lessonId = pathParts.slice(-1)[0];
        const lessonProgress = getLessonProgress(courseId, moduleId, lessonId);

        if (lessonProgress?.completed) {
          completedLessons += 1;
          totalTimeSpent += lessonProgress.timeSpent || 0;

          if (lessonProgress.score !== undefined) {
            totalScore += lessonProgress.score;
            scoredLessons += 1;
          }
        }
      });

      const completionPercentage = Math.round(
        (completedLessons / totalLessons) * 100
      );
      const averageScore =
        scoredLessons > 0 ? Math.round(totalScore / scoredLessons) : undefined;
      const now = new Date().toISOString();

      // Update course progress
      const courseProgress: CourseProgress = {
        courseId,
        totalModules,
        completedModules,
        totalLessons,
        completedLessons,
        completionPercentage,
        progressPercentage: completionPercentage, // For backward compatibility
        startedAt:
          progressData.value.courses[courseId]?.startedAt ||
          (completedLessons > 0 ? now : undefined),
        completedAt: completionPercentage === 100 ? now : undefined,
        lastAccessedAt: now,
        totalTimeSpent,
        averageScore,
        streak: progressData.value.user.currentStreak,
        currentLesson: progressData.value.courses[courseId]?.currentLesson,
        userId: progressData.value.courses[courseId]?.userId,
      };

      progressData.value.courses[courseId] = courseProgress;

      // Update user statistics
      const wasAlreadyStarted = progressData.value.courses[courseId]?.startedAt;
      if (!wasAlreadyStarted && completedLessons > 0) {
        progressData.value.user.totalCoursesStarted += 1;
      }

      const wasAlreadyCompleted =
        progressData.value.courses[courseId]?.completionPercentage === 100;
      if (!wasAlreadyCompleted && completionPercentage === 100) {
        progressData.value.user.totalCoursesCompleted += 1;
      }
    } catch (error) {
      console.error(`Error updating course progress for ${courseId}:`, error);
    }
  };

  /**
   * Get course progress
   */
  const getCourseProgress = (courseId: string): CourseProgress | null => {
    return progressData.value.courses[courseId] || null;
  };

  /**
   * Get progress percentage for a course - backward compatibility
   */
  const getCourseProgressPercentage = (courseId: string): number => {
    const progress = progressData.value.courses[courseId];
    return progress?.progressPercentage || progress?.completionPercentage || 0;
  };

  /**
   * Calculate estimated time remaining for a module
   */
  const calculateEstimatedTime = (
    lessons: any[],
    completedCount: number
  ): number => {
    const remainingLessons = lessons.length - completedCount;
    const averageTimePerLesson =
      lessons.reduce((total, lesson) => {
        return total + (lesson.estimatedMinutes || 15); // default 15 minutes per lesson
      }, 0) / lessons.length;

    return Math.round(remainingLessons * averageTimePerLesson);
  };

  /**
   * Update learning streak
   */
  const updateStreak = () => {
    const today = new Date().toDateString();
    const lastActive = progressData.value.user.lastActiveDate
      ? new Date(progressData.value.user.lastActiveDate).toDateString()
      : null;

    if (lastActive === today) {
      // Already updated today, no change needed
      return;
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayString = yesterday.toDateString();

    if (lastActive === yesterdayString) {
      // Continuing streak
      progressData.value.user.currentStreak += 1;
    } else if (lastActive !== today) {
      // Streak broken or starting new
      progressData.value.user.currentStreak = 1;
    }

    // Update longest streak
    if (
      progressData.value.user.currentStreak >
      progressData.value.user.longestStreak
    ) {
      progressData.value.user.longestStreak =
        progressData.value.user.currentStreak;
    }
  };

  /**
   * Toggle lesson bookmark
   */
  const toggleLessonBookmark = (
    courseId: string,
    moduleId: string,
    lessonId: string
  ) => {
    const key = getLessonKey(courseId, moduleId, lessonId);

    if (!progressData.value.lessons[key]) {
      progressData.value.lessons[key] = {
        completed: false,
        completedAt: "",
      };
    }

    progressData.value.lessons[key].bookmarked =
      !progressData.value.lessons[key].bookmarked;
    saveProgress();
  };

  /**
   * Add notes to a lesson
   */
  const addLessonNotes = (
    courseId: string,
    moduleId: string,
    lessonId: string,
    notes: string
  ) => {
    const key = getLessonKey(courseId, moduleId, lessonId);

    if (!progressData.value.lessons[key]) {
      progressData.value.lessons[key] = {
        completed: false,
        completedAt: "",
      };
    }

    progressData.value.lessons[key].notes = notes;
    saveProgress();
  };

  /**
   * Get all bookmarked lessons
   */
  const getBookmarkedLessons = () => {
    const bookmarked: Array<{
      courseId: string;
      moduleId: string;
      lessonId: string;
      progress: LessonProgress;
    }> = [];

    Object.entries(progressData.value.lessons).forEach(([key, progress]) => {
      if (progress.bookmarked) {
        const [courseId, moduleId, lessonId] = key.split(".");
        if (courseId && moduleId && lessonId) {
          bookmarked.push({
            courseId,
            moduleId,
            lessonId,
            progress,
          });
        }
      }
    });

    return bookmarked;
  };

  /**
   * Mark course as completed
   */
  const markCourseCompleted = (courseId: string) => {
    const progress = progressData.value.courses[courseId];
    if (progress) {
      progress.completedAt = new Date().toISOString();
      progress.progressPercentage = 100;
      progress.completionPercentage = 100;
    }
  };

  /**
   * Check if course is completed
   */
  const isCourseCompleted = (courseId: string): boolean => {
    const progress = progressData.value.courses[courseId];
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

      const progress = progressData.value.courses[courseId];
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
          if (!isLessonCompleted(courseId, module.id, lesson.id)) {
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
   * Get progress statistics for dashboard
   */
  const getProgressStats = () => {
    const stats = {
      ...progressData.value.user,
      recentActivity: [] as Array<{
        type: "lesson_completed" | "course_started" | "course_completed";
        courseId: string;
        moduleId?: string;
        lessonId?: string;
        timestamp: string;
      }>,
      coursesInProgress: Object.values(progressData.value.courses).filter(
        (course) =>
          course.completionPercentage > 0 && course.completionPercentage < 100
      ).length,
    };

    return stats;
  };

  /**
   * Reset course progress
   */
  const resetCourseProgress = (courseId: string) => {
    // Remove all lessons for this course
    Object.keys(progressData.value.lessons).forEach((key) => {
      if (key.startsWith(`${courseId}.`)) {
        delete progressData.value.lessons[key];
      }
    });

    // Remove all modules for this course
    Object.keys(progressData.value.modules).forEach((key) => {
      if (key.startsWith(`${courseId}.`)) {
        delete progressData.value.modules[key];
      }
    });

    // Remove course progress
    delete progressData.value.courses[courseId];

    // Update user statistics
    progressData.value.user.totalCoursesStarted = Math.max(
      0,
      progressData.value.user.totalCoursesStarted - 1
    );
    progressData.value.user.totalCoursesCompleted = Math.max(
      0,
      progressData.value.user.totalCoursesCompleted - 1
    );

    saveProgress();
  };

  /**
   * Export progress data
   */
  const exportProgress = (): ProgressData => {
    return JSON.parse(JSON.stringify(progressData.value));
  };

  /**
   * Import progress data
   */
  const importProgress = (data: ProgressData) => {
    progressData.value = { ...progressData.value, ...data };
    saveProgress();
  };

  /**
   * Calculate overall course progress percentage - backward compatibility
   */
  const calculateProgressPercentage = (
    courseId: string,
    completedLessons: string[]
  ): number => {
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

  // Initialize progress on composable creation
  onMounted(() => {
    loadProgress();
  });

  // Watch for changes and auto-save
  watch(
    progressData,
    () => {
      saveProgress();
    },
    { deep: true }
  );

  return {
    // Data
    progressData: readonly(progressData),

    // Lesson progress
    markLessonComplete,
    markLessonIncomplete,
    getLessonProgress,
    isLessonCompleted,
    updateCurrentLesson,

    // Module progress
    updateModuleProgress,
    getModuleProgress,
    getModuleProgressPercentage, // Backward compatibility

    // Course progress
    updateCourseProgress,
    getCourseProgress,
    getCourseProgressPercentage, // Backward compatibility
    markCourseCompleted,
    isCourseCompleted,

    // Navigation
    getNextLesson,

    // Bookmarks and notes
    toggleLessonBookmark,
    addLessonNotes,
    getBookmarkedLessons,

    // Statistics and analytics
    getProgressStats,
    updateStreak,

    // Data management
    resetCourseProgress,
    exportProgress,
    importProgress,
    loadProgress,
    saveProgress,
    calculateProgressPercentage, // Backward compatibility
  };
};
