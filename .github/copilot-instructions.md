# AI Copilot Instructions for Learnova Academy Learning Platform

You are an expert Vue 3 and Nuxt 4 developer, assisting in building a high-quality bilingual multi-course learning platform. Focus on understanding the existing architecture patterns before making changes.

## 🎯 Project Overview

**Learnova Academy** is a Nuxt 4-based multi-course learning platform with full internationalization support (English/Arabic with RTL). The platform uses a scalable multi-course architecture that supports various programming courses while maintaining excellent bilingual support and developer experience.

### Core Architecture

- **Multi-Course System**: Centralized course registry with individual course management
- **Bilingual Support**: Full English/Arabic with RTL layout support
- **Content Management**: File-based content system using @nuxt/content
- **Progress Tracking**: Comprehensive user progress across courses and lessons
- **Responsive Design**: Mobile-first approach with @nuxt/ui components

## I. Critical Development Rules

### 1. **Internationalization (i18n) - MANDATORY**

- **Never hardcode text** - Always use `$t("key")` or `t("key")`
- **Always use `localePath()`** for navigation links
- **Test in both languages** - Components must work in RTL (Arabic) mode
- **Use nested translation keys** - Organize by section: `"course.progress.completed"`

```vue
<!-- ✅ Correct -->
<template>
  <h1>{{ $t("course.title") }}</h1>
  <NuxtLink :to="localePath('/courses')">{{
    $t("navigation.courses")
  }}</NuxtLink>
</template>

<!-- ❌ Wrong -->
<template>
  <h1>Course Title</h1>
  <NuxtLink to="/courses">Courses</NuxtLink>
</template>
```

### 2. **Course-Aware Development**

- **Use course registry** - Access course data via `useCourseRegistry()` composable
- **Course context** - All components should support multi-course functionality
- **Type safety** - Use TypeScript interfaces from `types/course.ts`

```vue
<script setup>
// ✅ Always use course registry
const { getCourseBySlug } = useCourseRegistry();
const { getCourseProgress } = useCourseProgress();
const localePath = useLocalePath();

const course = getCourseBySlug("vue-nuxt-mastery");
const progress = getCourseProgress(course.id);
</script>
```

### 3. **Component Standards**

- **Use `<script setup>`** - Standard for all Vue components
- **@nuxt/ui components** - Use UButton, UContainer, UCard, etc. (NOT Nuxt UI Pro)
- **Responsive design** - Mobile-first approach
- **Accessible** - Proper ARIA labels and keyboard navigation

### 4. **Content Structure**

- **Multi-course paths**: `content/courses/[courseId]/[locale]/modules/[moduleId]/lessons/`
- **Course metadata**: Centralized in `config/courses.ts`

## II. Tech Stack & Dependencies

### Core Framework

- **Nuxt 4** with SSR enabled and TypeScript
- **Vue 3** with Composition API and `<script setup>` pattern
- **@nuxt/content** for content management
- **@nuxtjs/i18n** with cookie-based language persistence

### UI & Styling

- **@nuxt/ui** (NOT Nuxt UI Pro) - Primary component library
- **Tailwind CSS** - Utility-first styling
- **Custom icons** - Located in `assets/icons/`

### Data Management

- **TypeScript** - Full type safety across the platform
- **Pinia** - For complex state management (when needed)
- **Local Storage** - For progress tracking and user preferences

## III. Essential Composables

### Course Management

```typescript
// Get course registry functions
const { getCourseBySlug, getAllCourses, getFeaturedCourses } =
  useCourseRegistry();

// Get content querying functions
const { getCourse, getCourseModules, getCourseLessons } = useCourses();

// Get progress tracking functions
const {
  markLessonComplete,
  getCourseProgress,
  toggleLessonBookmark,
  addLessonNotes,
} = useCourseProgress();
```

### Internationalization

```typescript
// i18n composables
const { t } = useI18n();
const localePath = useLocalePath();
const { locale } = useI18n();

// SEO with i18n
useHead({
  title: t("page.meta.title"),
  meta: [{ name: "description", content: t("page.meta.description") }],
});
```

## IV. Component Architecture

### Course-Aware Components

#### 1. **CourseCard.vue** - Course Display

```vue
<CourseCard :course="course" :show-progress="true" :compact="false" />
```

- **Purpose**: Display course information with progress indicators
- **Features**: Clickable navigation, progress bars, course metadata
- **Usage**: Course listings, featured courses, recommendations

#### 2. **EnhancedCourseNavigation.vue** - Comprehensive Navigation

```vue
<EnhancedCourseNavigation
  :course="course"
  :current-progress="progress"
  :show-breadcrumb="true"
/>
```

- **Purpose**: Complete course navigation system
- **Features**: Breadcrumbs, module navigation, progress tracking
- **Layout**: 3-column responsive design

#### 3. **EnhancedCourseModuleNav.vue** - Module Navigation

```vue
<EnhancedCourseModuleNav
  :course="course"
  :current-module="currentModule"
  :current-lesson="currentLesson"
  @lesson-select="handleLessonSelect"
/>
```

- **Purpose**: Interactive module and lesson navigation
- **Features**: Collapsible modules, lesson status, progress indicators
- **Interactivity**: Click navigation, lesson completion tracking

### Content Components

#### 4. **LessonRenderer.vue** - Lesson Content Display

- **Purpose**: Render lesson content with course context
- **Features**: Course branding, progress integration, navigation
- **Content**: Enhanced markdown rendering with course-specific features

#### 5. **CourseHeader.vue** - Course Branding

- **Purpose**: Display course branding and metadata
- **Features**: Course title, instructor info, progress indicators
- **Context**: Course → Module → Lesson hierarchy

## V. Content Management Patterns

### Content Structure

```
content/courses/[courseId]/[locale]/
├── course.md                    # Course metadata
└── modules/[moduleId]/
    ├── module.md               # Module metadata
    └── lessons/[lessonId].md   # Individual lessons
```

### Content Querying

```typescript
// Get course content
const course = await getCourse(courseId);
const modules = await getCourseModules(courseId);
const lessons = await getCourseLessons(courseId, moduleId);

// Query specific lesson
const lesson = await queryContent(
  "courses",
  courseId,
  locale,
  "modules",
  moduleId,
  "lessons",
  lessonSlug
).findOne();
```

### Frontmatter Standards

```yaml
# Course-level (course.md)
---
title: "Vue.js & Nuxt.js Mastery"
description: "Complete guide from Vue basics to advanced Nuxt development"
slug: "vue-nuxt-mastery"
status: "published"
difficulty: "beginner"
estimatedHours: 40
---
# Module-level (module.md)
---
id: "module1"
title: "Vue.js Fundamentals"
number: 1
estimatedMinutes: 180
---
# Lesson-level (lesson.md)
---
title: "Introduction to Vue.js"
number: 1
estimatedMinutes: 30
hasExercise: true
hasQuiz: false
---
```

## VI. Progress Tracking System

### Comprehensive Progress Management

```typescript
// Mark lesson complete with metadata
markLessonComplete(courseId, moduleId, lessonId, {
  timeSpent: 25, // minutes
  score: 95, // quiz score
  autoNext: true, // auto-navigate
});

// Get progress information
const courseProgress = getCourseProgress(courseId);
const lessonProgress = getLessonProgress(courseId, moduleId, lessonId);
const userStats = getProgressStats();

// Bookmark and notes
toggleLessonBookmark(courseId, moduleId, lessonId);
addLessonNotes(courseId, moduleId, lessonId, "Important notes");
```

### Progress Data Structure

- **Lesson Level**: Completion status, time spent, scores, bookmarks, notes
- **Module Level**: Progress calculation, estimated completion time
- **Course Level**: Overall progress, learning streaks, completion certificates
- **User Level**: Global statistics, achievements, learning analytics

## VII. Routing & Navigation

### Multi-Course URL Structure

```typescript
// Primary routes
/                                 # Platform homepage
/courses                         # All courses listing
/courses/[courseId]             # Course overview
/courses/[courseId]/[module]/[lessonSlug]  # Individual lessons
```

### Navigation Best Practices

```vue
<script setup>
const localePath = useLocalePath();

// Always use course-aware routing
const courseUrl = localePath(`/courses/${course.slug}`);
const lessonUrl = localePath(
  `/courses/${courseSlug}/${moduleId}/${lessonSlug}`
);
</script>

<template>
  <!-- ✅ Correct navigation -->
  <NuxtLink :to="courseUrl">{{ course.title[locale] }}</NuxtLink>

  <!-- ✅ Lesson navigation with context -->
  <NuxtLink :to="lessonUrl">{{ lesson.title[locale] }}</NuxtLink>
</template>
```

## VIII. Translation System

### Translation File Structure

```json
{
  "platform": {
    "name": "Learnova Academy",
    "tagline": "Master Programming Skills"
  },
  "courses": {
    "title": "All Courses",
    "subtitle": "Browse our comprehensive collection",
    "filter": "Filter Courses"
  },
  "course": {
    "overview": "Course Overview",
    "modules": "Course Modules",
    "progress": "Progress",
    "instructor": "Instructor"
  },
  "progress": {
    "completed": "Completed",
    "inProgress": "In Progress",
    "streak": "Learning Streak",
    "bookmarks": "Bookmarks"
  },
  "navigation": {
    "courses": "Courses",
    "about": "About"
  }
}
```

### RTL Support Requirements

- **Test Arabic mode** - All components must work in RTL layout
- **Logical CSS properties** - Use `margin-inline-start` vs `margin-left`
- **Icon positioning** - Ensure icons work in both LTR and RTL
- **Text alignment** - Proper text flow for both languages

## IX. Component Development Guidelines

### Vue 3 + Nuxt 4 Best Practices

```vue
<script setup lang="ts">
// ✅ Proper imports
const { t } = useI18n();
const localePath = useLocalePath();
const { getCourseBySlug } = useCourseRegistry();

// ✅ Typed props
interface Props {
  courseId: string;
  showProgress?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  showProgress: true,
});

// ✅ Typed emits
const emit = defineEmits<{
  lessonSelect: [lessonId: string];
  progressUpdate: [progress: number];
}>();

// ✅ Reactive data
const course = getCourseBySlug(props.courseId);
const progress = getCourseProgress(props.courseId);
</script>

<template>
  <div class="course-component">
    <!-- ✅ i18n compliant -->
    <h2>{{ course.title[locale] }}</h2>

    <!-- ✅ Progress integration -->
    <UProgress
      v-if="showProgress"
      :value="progress?.completionPercentage || 0"
    />

    <!-- ✅ Course-aware navigation -->
    <NuxtLink :to="localePath(`/courses/${course.slug}`)">
      {{ $t("course.viewDetails") }}
    </NuxtLink>
  </div>
</template>

<style scoped>
/* ✅ RTL-friendly styles */
.course-component {
  padding-inline: 1rem;
  margin-inline-start: auto;
}
</style>
```

### @nuxt/ui Component Usage

```vue
<template>
  <!-- ✅ Use @nuxt/ui components -->
  <UContainer>
    <UCard>
      <template #header>
        <h3>{{ $t("course.overview") }}</h3>
      </template>

      <UButton :to="localePath('/courses')" variant="solid" color="primary">
        {{ $t("navigation.viewCourses") }}
      </UButton>
    </UCard>
  </UContainer>
</template>
```

## X. Course Registry Management

### Adding New Courses

```typescript
// config/courses.ts
export const coursesConfig = [
  {
    id: "vue-nuxt-mastery",
    title: {
      en: "Vue.js & Nuxt.js Mastery",
      ar: "إتقان Vue.js و Nuxt.js",
    },
    description: {
      en: "Complete guide from Vue basics to advanced Nuxt development",
      ar: "دليل شامل من أساسيات Vue إلى التطوير المتقدم مع Nuxt",
    },
    slug: "vue-nuxt-mastery",
    status: "published",
    difficulty: "beginner",
    estimatedHours: 40,
    technologies: ["vue", "nuxt", "typescript"],
    modules: [
      {
        id: "module1",
        title: { en: "Vue Fundamentals", ar: "أساسيات Vue" },
        lessons: [
          {
            id: "lesson1",
            title: { en: "Introduction", ar: "مقدمة" },
            slug: "introduction",
          },
        ],
      },
    ],
  },
];
```

### Course Validation

```typescript
// Always validate course configuration
import { validateCourseConfig } from "~/utils/courseValidation";

const isValid = validateCourseConfig(courseConfig);
if (!isValid) {
  throw new Error("Invalid course configuration");
}
```

## XI. File Locations & Organization

### Essential Files

- **Course Registry**: `config/courses.ts` - Centralized course configuration
- **Type Definitions**: `types/course.ts` - TypeScript interfaces
- **Course Composables**: `app/composables/useCourseRegistry.ts`, `app/composables/useCourseProgress.ts`
- **Content Validation**: `utils/courseValidation.ts`

### Content Structure

- **Multi-Course Content**: `content/courses/[courseId]/[locale]/modules/[moduleId]/lessons/`

### Translation Files

- **English**: `i18n/locales/en.json`
- **Arabic**: `i18n/locales/ar.json`

### Components

- **Enhanced Navigation**: `components/EnhancedCourseNavigation.vue`
- **Module Navigation**: `components/EnhancedCourseModuleNav.vue`
- **Course Cards**: `components/CourseCard.vue`
- **Content Rendering**: `components/content/LessonRenderer.vue`

## XII. Development Commands

```bash
# Development
npm run dev              # Start development server (Nuxt 4)
npm run build           # Production build
npm run generate        # Static site generation

# Course Management
npm run validate:courses # Validate course configurations
npm run type-check      # TypeScript validation
```

## XIII. Common Patterns & Examples

### Course Component Integration

```vue
<script setup>
// Standard course component setup
const { getCourseBySlug } = useCourseRegistry();
const { getCourseProgress, markLessonComplete } = useCourseProgress();
const { getCourseModules } = useCourses();
const localePath = useLocalePath();
const { t } = useI18n();

// Get course data
const course = getCourseBySlug("vue-nuxt-mastery");
const progress = getCourseProgress(course.id);
const modules = await getCourseModules(course.id);

// Handle lesson completion
const handleLessonComplete = (moduleId: string, lessonId: string) => {
  markLessonComplete(course.id, moduleId, lessonId, {
    timeSpent: timeSpent.value,
    score: quizScore.value
  });
};
</script>

<template>
  <div class="course-layout">
    <!-- Enhanced course navigation -->
    <EnhancedCourseNavigation
      :course="course"
      :current-progress="progress"
      @lesson-complete="handleLessonComplete"
    />

    <!-- Course content -->
    <main class="course-content">
      <slot />
    </main>
  </div>
</template>
```

### Error Handling

```typescript
// Always handle course not found scenarios
const course = getCourseBySlug(courseSlug);
if (!course) {
  throw createError({
    statusCode: 404,
    statusMessage: "Course not found",
  });
}
```

---

## 🎯 Success Checklist

Before implementing any feature, ensure:

- [ ] **i18n Compliance**: All text uses translation keys
- [ ] **Course Awareness**: Components support multi-course functionality
- [ ] **Type Safety**: TypeScript interfaces used throughout
- [ ] **Progress Integration**: Leverages progress tracking system
- [ ] **Responsive Design**: Works on mobile and desktop
- [ ] **RTL Support**: Tested in Arabic (RTL) mode
- [ ] **@nuxt/ui Usage**: Uses approved component library
- [ ] **Navigation**: Uses `localePath()` for all links
- [ ] **SEO Friendly**: Proper meta tags and structure
- [ ] **Performance**: Optimized loading and rendering

**The platform prioritizes user experience, type safety, internationalization, and scalable course management. Always follow these patterns to maintain consistency and quality across the codebase.**
