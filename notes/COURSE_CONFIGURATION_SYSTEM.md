# Course Configuration System Documentation

## Overview

Phase 1.3 of the multi-course platform transformation has been successfully implemented. This phase introduces a centralized course registry with standardized metadata management, providing a robust foundation for managing multiple courses efficiently.

## 🏗️ Architecture Components

### 1. Type Definitions (`types/course.ts`)

Comprehensive TypeScript interfaces for:

- **Course**: Main course configuration with metadata, modules, pricing, and features
- **ModuleMetadata**: Course module structure with lessons and timing
- **LessonMetadata**: Individual lesson configuration
- **InstructorInfo**: Instructor details with social profiles
- **CoursePrice**: Pricing configuration with support for free/paid/premium tiers
- **CourseFeatures**: Feature flags for course capabilities
- **CourseTheme**: Visual theming options per course
- **CourseProgress**: User progress tracking
- **CourseFilters**: Advanced filtering capabilities
- **CourseSortOptions**: Sorting configurations

### 2. Course Registry (`config/courses.ts`)

Centralized configuration system containing:

- **coursesConfig**: Array of all course configurations
- **courseCategories**: Predefined course categories with icons and colors
- **technologyTags**: Technology stack tags with visual styling
- **difficultyLevels**: Standardized difficulty levels

**Current Configuration:**

- Vue.js & Nuxt.js Mastery course (fully configured)
- Bilingual support (English/Arabic)
- Complete module and lesson structure
- Instructor information and social links
- Course features and theming
- Rating and enrollment data

### 3. Course Registry Composable (`app/composables/useCourseRegistry.ts`)

Comprehensive course management functions:

#### Course Retrieval

- `getAllCourses()`: Get all courses
- `getCourseById(id)`: Get course by ID
- `getCourseBySlug(slug)`: Get course by slug
- `getPublishedCourses()`: Get only published courses
- `getCoursesByCategory(category)`: Filter by category
- `getCoursesByTechnology(tech)`: Filter by technology
- `getCoursesByDifficulty(level)`: Filter by difficulty

#### Course Discovery

- `searchCourses(query)`: Full-text search across courses
- `filterCourses(filters)`: Advanced multi-criteria filtering
- `sortCourses(courses, options)`: Flexible sorting
- `getFeaturedCourses(limit)`: Get top-rated courses
- `getRelatedCourses(courseId, limit)`: Get related courses

#### Configuration Metadata

- `getCourseCategories()`: Get available categories
- `getTechnologyTags()`: Get technology tags
- `getDifficultyLevels()`: Get difficulty configurations

#### Validation

- `validateCourse(course)`: Comprehensive course validation

### 4. Course Progress Composable (`app/composables/useCourseProgress.ts`)

User progress tracking system:

#### Lesson Progress

- `markLessonComplete(courseId, moduleId, lessonId)`: Mark lesson as completed
- `markLessonIncomplete(courseId, moduleId, lessonId)`: Mark lesson as incomplete
- `isLessonCompleted(courseId, moduleId, lessonId)`: Check lesson completion
- `updateCurrentLesson(courseId, moduleId, lessonId)`: Update current position

#### Course Progress

- `getCourseProgress(courseId)`: Get course progress data
- `getCourseProgressPercentage(courseId)`: Get completion percentage
- `markCourseCompleted(courseId)`: Mark entire course as completed
- `isCourseCompleted(courseId)`: Check course completion

#### Module Progress

- `getModuleProgressPercentage(courseId, moduleId)`: Get module completion

#### Navigation

- `getNextLesson(courseId)`: Get next incomplete lesson

#### Management

- `resetCourseProgress(courseId)`: Reset progress
- `exportProgress()`: Export progress data
- `importProgress(data)`: Import progress data

### 5. Course Validation Utilities (`utils/courseValidation.ts`)

Comprehensive validation and consistency checking:

#### Validation Functions

- `validateCourseConfig(course)`: Full course validation with errors and warnings
- `validateAllCourses()`: Validate entire course registry
- `checkCourseConsistency()`: Check for duplicate IDs, slugs, and other issues
- `generateCourseSummary(course)`: Generate course statistics summary

#### Validation Checks

- Required field validation
- Slug format validation
- Duplicate slug detection
- Module and lesson validation
- Prerequisites validation
- Price validation
- Translation completeness
- Boolean field validation

### 6. Enhanced Internationalization

Extended i18n support with course-specific translations:

#### English (`i18n/locales/en.json`)

- Course metadata translations
- Feature descriptions
- Progress states
- Error messages
- Navigation labels

#### Arabic (`i18n/locales/ar.json`)

- Complete Arabic translations
- RTL-compatible text
- Cultural localization

## 🚀 Integration Examples

### Updated Course Page (`app/pages/courses/[courseId]/index.vue`)

The course page now uses the new system:

```typescript
// Get course from registry
const { getCourseBySlug, validateCourse } = useCourseRegistry();
const { getCourseProgress, getCourseProgressPercentage } = useCourseProgress();

const course = computed(() => {
  const courseData = getCourseBySlug(courseId.value);
  if (!courseData) {
    throw createError({
      statusCode: 404,
      statusMessage: t("course.errors.notFound"),
    });
  }
  return courseData;
});

// Get user progress
const progress = computed(() => getCourseProgress(course.value.id));
const progressPercentage = computed(() =>
  getCourseProgressPercentage(course.value.id)
);
```

### Development Validation

Automatic validation in development mode:

```typescript
if (process.dev && course.value) {
  const validation = validateCourse(course.value);
  if (!validation.valid) {
    console.warn(
      `Course validation errors for ${course.value.id}:`,
      validation.errors
    );
  }
}
```

## 📊 Current Course Data

### Vue.js & Nuxt.js Mastery Course

- **ID**: `vue-nuxt-mastery`
- **Status**: Published
- **Difficulty**: Beginner
- **Estimated Hours**: 40
- **Technologies**: Vue, Nuxt, TypeScript, Pinia
- **Categories**: Frontend, Web Development, JavaScript
- **Price**: Free
- **Features**: Quizzes, Exercises, Certificates, Progress tracking
- **Rating**: 4.8/5 (156 reviews)
- **Enrollments**: 2,430 students

### Module Structure

- **Module 1**: Vue.js Fundamentals (180 minutes)
  - Lesson 1: What is Vue.js? (30 minutes, has quiz)
  - Lesson 2: Vue Instance and Reactivity (45 minutes, has exercise and quiz)

## 🎨 Theming & Customization

### Course-Specific Theming

```typescript
config: {
  theme: {
    primaryColor: "#4FC08D", // Vue green
    accentColor: "#00DC82", // Nuxt green
  },
  features: {
    hasQuizzes: true,
    hasExercises: true,
    hasCertificates: true,
    // ... other features
  },
  navigation: {
    showProgressBar: true,
    enableBookmarks: true,
    showEstimatedTime: true,
    enableNotes: true,
  },
}
```

### Category Styling

Predefined categories with consistent visual styling:

- Frontend Development (Blue)
- Backend Development (Green)
- Mobile Development (Purple)
- Web Development (Cyan)
- Data Science (Orange)
- DevOps & Cloud (Gray)

## 🔧 Development Tools

The course registry system includes built-in validation utilities that can be used within the Vue/Nuxt application context to ensure configuration integrity.

### Course Validation Functions

Available validation utilities in `utils/courseValidation.ts`:

- `validateCourseConfig()` - Individual course validation
- `validateAllCourses()` - Validate entire course registry
- `checkCourseConsistency()` - Configuration consistency checks
- `generateCourseSummary()` - Course summaries and statistics

These functions can be imported and used within components and composables for real-time validation during development.

## ✅ Validation Results

The system performs comprehensive validation including:

### Required Field Checks

- Course ID, title, description
- Instructor information
- Module and lesson structure
- Slug format validation

### Consistency Checks

- Duplicate ID detection
- Duplicate slug detection
- Prerequisites validation
- Price configuration validation

### Translation Completeness

- English translations (required)
- Arabic translations (warnings for missing)
- Instructor bio translations

### Configuration Warnings

- Missing rating information
- Missing enrollment counts
- Incomplete feature configurations

## 🔮 Future Enhancements

This course configuration system provides a solid foundation for:

1. **Easy Course Addition**: Simply add new course objects to `coursesConfig`
2. **Advanced Filtering**: Ready-to-use filtering and sorting capabilities
3. **Progress Tracking**: Complete user progress management
4. **Internationalization**: Built-in multi-language support
5. **Theme Customization**: Per-course visual customization
6. **Validation**: Automated configuration validation
7. **Extensibility**: Type-safe extension points for new features

## 📋 Next Steps

With Phase 1.3 complete, the platform now has:

- ✅ Standardized course configuration
- ✅ Centralized course registry
- ✅ Progress tracking system
- ✅ Validation utilities
- ✅ Enhanced internationalization
- ✅ Course-aware navigation

Ready for Phase 2: Component Architecture Refactoring and Phase 3: Enhanced Data Layer & Content Management.
