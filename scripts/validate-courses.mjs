#!/usr/bin/env node
/**
 * Course Configuration Validation Script
 * Run with: npm run validate-courses
 */

import {
  validateAllCourses,
  checkCourseConsistency,
  generateCourseSummary,
} from "../utils/courseValidation.js";
import { coursesConfig } from "../config/courses.js";

console.log("🔍 Validating Course Configuration System...\n");

// Validate all courses
console.log("📚 Validating individual courses:");
const validationResults = validateAllCourses();

validationResults.results.forEach((result) => {
  const status = result.valid ? "✅" : "❌";
  console.log(`${status} Course: ${result.courseId}`);

  if (result.errors.length > 0) {
    console.log("   Errors:");
    result.errors.forEach((error) => console.log(`     - ${error}`));
  }

  if (result.warnings.length > 0) {
    console.log("   Warnings:");
    result.warnings.forEach((warning) => console.log(`     - ${warning}`));
  }

  console.log("");
});

// Check consistency
console.log("🔧 Checking configuration consistency:");
const consistency = checkCourseConsistency();

if (consistency.issues.length > 0) {
  console.log("❌ Issues found:");
  consistency.issues.forEach((issue) => console.log(`   - ${issue}`));
} else {
  console.log("✅ No consistency issues found");
}

if (consistency.recommendations.length > 0) {
  console.log("💡 Recommendations:");
  consistency.recommendations.forEach((rec) => console.log(`   - ${rec}`));
}

console.log("");

// Generate summaries
console.log("📊 Course Summaries:");
console.log("=".repeat(50));
coursesConfig.forEach((course) => {
  console.log(generateCourseSummary(course));
  console.log("-".repeat(50));
});

// Final summary
console.log("\n📈 Overall Statistics:");
console.log(`Total Courses: ${coursesConfig.length}`);
console.log(
  `Published Courses: ${coursesConfig.filter((c) => c.status === "published").length}`
);
console.log(
  `Draft Courses: ${coursesConfig.filter((c) => c.status === "draft").length}`
);
console.log(
  `Free Courses: ${coursesConfig.filter((c) => c.price.type === "free").length}`
);
console.log(
  `Paid Courses: ${coursesConfig.filter((c) => c.price.type === "paid").length}`
);

const totalLessons = coursesConfig.reduce(
  (total, course) =>
    total +
    course.modules.reduce(
      (moduleTotal, module) => moduleTotal + module.lessons.length,
      0
    ),
  0
);
console.log(`Total Lessons: ${totalLessons}`);

const avgRating =
  coursesConfig
    .filter((c) => c.rating)
    .reduce((sum, c) => sum + (c.rating?.average || 0), 0) /
  coursesConfig.filter((c) => c.rating).length;
console.log(`Average Rating: ${avgRating.toFixed(1)}`);

console.log(
  `\n${validationResults.valid ? "✅ All courses valid!" : "❌ Some courses have issues!"}`
);
