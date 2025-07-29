import type { Course, ModuleMetadata, LessonMetadata } from "../types/course";
import { coursesConfig } from "../config/courses";

/**
 * Utility functions for course configuration management
 */

/**
 * Validate a course configuration
 */
export function validateCourseConfig(course: Course): {
  valid: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required fields validation
  if (!course.id) errors.push("Course ID is required");
  if (!course.title?.en) errors.push("English title is required");
  if (!course.description?.en) errors.push("English description is required");
  if (!course.slug) errors.push("Course slug is required");
  if (!course.instructor?.name) errors.push("Instructor name is required");
  if (!course.thumbnail) errors.push("Course thumbnail is required");

  // Slug validation
  if (course.slug && !/^[a-z0-9-]+$/.test(course.slug)) {
    errors.push(
      "Course slug must contain only lowercase letters, numbers, and hyphens"
    );
  }

  // Duplicate slug check
  const existingCourse = coursesConfig.find(
    (c) => c.slug === course.slug && c.id !== course.id
  );
  if (existingCourse) {
    errors.push(
      `Course slug "${course.slug}" is already used by course "${existingCourse.id}"`
    );
  }

  // Modules validation
  if (!course.modules || course.modules.length === 0) {
    errors.push("At least one module is required");
  } else {
    course.modules.forEach((module, moduleIndex) => {
      validateModuleConfig(module, moduleIndex + 1, errors, warnings);
    });
  }

  // Prerequisites validation
  if (course.prerequisites && course.prerequisites.length > 0) {
    const invalidPrereqs = course.prerequisites.filter(
      (prereq) => !coursesConfig.find((c) => c.id === prereq)
    );
    if (invalidPrereqs.length > 0) {
      warnings.push(`Unknown prerequisites: ${invalidPrereqs.join(", ")}`);
    }
  }

  // Price validation
  if (course.price) {
    if (course.price.amount < 0) {
      errors.push("Price amount cannot be negative");
    }
    if (course.price.type === "paid" && course.price.amount === 0) {
      warnings.push("Paid course has zero price amount");
    }
    if (course.price.type === "free" && course.price.amount > 0) {
      warnings.push("Free course has non-zero price amount");
    }
  }

  // Estimated hours validation
  if (course.estimatedHours <= 0) {
    errors.push("Estimated hours must be positive");
  }

  // Translation completeness check
  const supportedLocales = ["en", "ar"];
  supportedLocales.forEach((locale) => {
    if (locale === "en") return; // English is required, already checked

    if (!course.title[locale]) {
      warnings.push(`Missing ${locale} translation for course title`);
    }
    if (!course.description[locale]) {
      warnings.push(`Missing ${locale} translation for course description`);
    }
    if (!course.instructor.bio[locale]) {
      warnings.push(`Missing ${locale} translation for instructor bio`);
    }
  });

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Validate a module configuration
 */
function validateModuleConfig(
  module: ModuleMetadata,
  moduleNumber: number,
  errors: string[],
  warnings: string[]
) {
  const modulePrefix = `Module ${moduleNumber}`;

  // Required fields
  if (!module.id) errors.push(`${modulePrefix}: ID is required`);
  if (!module.title?.en)
    errors.push(`${modulePrefix}: English title is required`);
  if (!module.description?.en)
    errors.push(`${modulePrefix}: English description is required`);
  if (typeof module.number !== "number")
    errors.push(`${modulePrefix}: Number is required`);
  if (
    typeof module.estimatedMinutes !== "number" ||
    module.estimatedMinutes <= 0
  ) {
    errors.push(`${modulePrefix}: Estimated minutes must be a positive number`);
  }

  // Lessons validation
  if (!module.lessons || module.lessons.length === 0) {
    errors.push(`${modulePrefix}: At least one lesson is required`);
  } else {
    module.lessons.forEach((lesson, lessonIndex) => {
      validateLessonConfig(
        lesson,
        moduleNumber,
        lessonIndex + 1,
        errors,
        warnings
      );
    });
  }

  // Translation completeness check
  const supportedLocales = ["en", "ar"];
  supportedLocales.forEach((locale) => {
    if (locale === "en") return; // Already checked

    if (!module.title[locale]) {
      warnings.push(`${modulePrefix}: Missing ${locale} translation for title`);
    }
    if (!module.description[locale]) {
      warnings.push(
        `${modulePrefix}: Missing ${locale} translation for description`
      );
    }
  });
}

/**
 * Validate a lesson configuration
 */
function validateLessonConfig(
  lesson: LessonMetadata,
  moduleNumber: number,
  lessonNumber: number,
  errors: string[],
  warnings: string[]
) {
  const lessonPrefix = `Module ${moduleNumber}, Lesson ${lessonNumber}`;

  // Required fields
  if (!lesson.id) errors.push(`${lessonPrefix}: ID is required`);
  if (!lesson.title?.en)
    errors.push(`${lessonPrefix}: English title is required`);
  if (!lesson.description?.en)
    errors.push(`${lessonPrefix}: English description is required`);
  if (!lesson.slug) errors.push(`${lessonPrefix}: Slug is required`);
  if (typeof lesson.number !== "number")
    errors.push(`${lessonPrefix}: Number is required`);
  if (
    typeof lesson.estimatedMinutes !== "number" ||
    lesson.estimatedMinutes <= 0
  ) {
    errors.push(`${lessonPrefix}: Estimated minutes must be a positive number`);
  }

  // Slug validation
  if (lesson.slug && !/^[a-z0-9-]+$/.test(lesson.slug)) {
    errors.push(
      `${lessonPrefix}: Slug must contain only lowercase letters, numbers, and hyphens`
    );
  }

  // Boolean validation
  if (typeof lesson.hasExercise !== "boolean") {
    warnings.push(`${lessonPrefix}: hasExercise should be a boolean`);
  }
  if (typeof lesson.hasQuiz !== "boolean") {
    warnings.push(`${lessonPrefix}: hasQuiz should be a boolean`);
  }

  // Translation completeness check
  const supportedLocales = ["en", "ar"];
  supportedLocales.forEach((locale) => {
    if (locale === "en") return; // Already checked

    if (!lesson.title[locale]) {
      warnings.push(`${lessonPrefix}: Missing ${locale} translation for title`);
    }
    if (!lesson.description[locale]) {
      warnings.push(
        `${lessonPrefix}: Missing ${locale} translation for description`
      );
    }
  });
}

/**
 * Generate a course summary for debugging/logging
 */
export function generateCourseSummary(course: Course): string {
  const totalLessons = course.modules.reduce(
    (total, module) => total + module.lessons.length,
    0
  );
  const totalMinutes = course.modules.reduce(
    (total, module) => total + module.estimatedMinutes,
    0
  );

  return `
Course: ${course.title.en} (${course.id})
- Status: ${course.status}
- Difficulty: ${course.difficulty}
- Modules: ${course.modules.length}
- Total Lessons: ${totalLessons}
- Estimated Time: ${Math.round(totalMinutes / 60)}h ${totalMinutes % 60}m
- Technologies: ${course.technologies.join(", ")}
- Categories: ${course.categories.join(", ")}
- Price: ${course.price.type} (${course.price.amount} ${course.price.currency})
`.trim();
}

/**
 * Validate all courses in the configuration
 */
export function validateAllCourses(): {
  valid: boolean;
  results: Array<{
    courseId: string;
    valid: boolean;
    errors: string[];
    warnings: string[];
  }>;
} {
  const results = coursesConfig.map((course) => ({
    courseId: course.id,
    ...validateCourseConfig(course),
  }));

  const valid = results.every((result) => result.valid);

  return { valid, results };
}

/**
 * Check for course configuration consistency
 */
export function checkCourseConsistency(): {
  issues: string[];
  recommendations: string[];
} {
  const issues: string[] = [];
  const recommendations: string[] = [];

  // Check for duplicate course IDs
  const courseIds = coursesConfig.map((c) => c.id);
  const duplicateIds = courseIds.filter(
    (id, index) => courseIds.indexOf(id) !== index
  );
  if (duplicateIds.length > 0) {
    issues.push(
      `Duplicate course IDs found: ${[...new Set(duplicateIds)].join(", ")}`
    );
  }

  // Check for duplicate slugs
  const courseSlugs = coursesConfig.map((c) => c.slug);
  const duplicateSlugs = courseSlugs.filter(
    (slug, index) => courseSlugs.indexOf(slug) !== index
  );
  if (duplicateSlugs.length > 0) {
    issues.push(
      `Duplicate course slugs found: ${[...new Set(duplicateSlugs)].join(", ")}`
    );
  }

  // Check for missing translations
  const missingTranslations = coursesConfig.filter(
    (course) => !course.title.ar || !course.description.ar
  );
  if (missingTranslations.length > 0) {
    recommendations.push(
      `${missingTranslations.length} courses missing Arabic translations`
    );
  }

  // Check for courses without ratings
  const coursesWithoutRatings = coursesConfig.filter(
    (course) => !course.rating
  );
  if (coursesWithoutRatings.length > 0) {
    recommendations.push(
      `${coursesWithoutRatings.length} courses missing rating information`
    );
  }

  // Check for courses without enrollment count
  const coursesWithoutEnrollment = coursesConfig.filter(
    (course) => !course.enrollmentCount
  );
  if (coursesWithoutEnrollment.length > 0) {
    recommendations.push(
      `${coursesWithoutEnrollment.length} courses missing enrollment count`
    );
  }

  return { issues, recommendations };
}
