# AI Copilot Instructions for VueNuxtMasters Learning Platform

You are an expert Vue 3 and Nuxt 3 developer, assisting in building a high-quality bilingual multi-course learning platform. Focus on understanding the existing architecture patterns before making changes.

## 0. Project Architecture Overview

**VueNuxtMasters** is a Nuxt 3-based multi-course learning platform with full internationalization support (English/Arabic with RTL). The platform has been transformed from a single-course system to a scalable multi-course architecture w### Course Validation Utilities

```typescript
// Validate course configuration
import {
  validateCourseConfig,
  validateAllCourses,
  checkCourseConsistency,
} from "~/utils/courseValidation";

// Generate course summaries
import { generateCourseSummary } from "~/utils/courseValidation";
```

### Course-Aware Components (Phase 2.1)

The platform includes comprehensive course-aware components for multi-course functionality:

#### 1. Course Card Component (`CourseCard.vue`)

```vue
<!-- Clickable course display for listings -->
<CourseCard :course="course" :show-progress="true" :compact="false" />
```

- **Features**: Course metadata display, progress indicators, instructor information
- **Navigation**: Clickable card wrapper using NuxtLink for reliable routing
- **Responsive**: Adapts layout for different card sizes
- **Progress**: Visual progress bars and completion status

#### 2. Course Navigation Component (`CourseNavigation.vue`)

```vue
<!-- Main course navigation for lesson pages -->
<CourseNavigation
  :course="course"
  :current-lesson="currentLesson"
  @navigate="handleNavigation"
/>
```

- **Features**: Course-aware lesson navigation, module structure, progress tracking
- **Functionality**: Previous/Next lesson logic, module overview
- **Integration**: Works with course registry and progress system

#### 3. Course Breadcrumb Component (`CourseBreadcrumb.vue`)

```vue
<!-- Course-aware breadcrumb navigation -->
<CourseBreadcrumb
  :course-slug="courseSlug"
  :module-id="moduleId"
  :lesson-slug="lessonSlug"
/>
```

- **Features**: Dynamic breadcrumb generation, course context awareness
- **Navigation**: Proper course/module/lesson hierarchy
- **Localization**: Multi-language breadcrumb labels

#### 4. Course Module Navigation (`CourseModuleNav.vue`)

```vue
<!-- Module-specific navigation sidebar -->
<CourseModuleNav
  :modules="course.modules"
  :current-module="currentModule"
  :current-lesson="currentLesson"
/>
```

- **Features**: Module listing, lesson organization, completion tracking
- **Interactive**: Expandable modules, lesson selection
- **State**: Current lesson highlighting, progress indicators

#### 5. Course Lesson Navigation (`CourseLessonNav.vue`)

```vue
<!-- Lesson-specific navigation controls -->
<CourseLessonNav
  :course="course"
  :current-lesson="currentLesson"
  @previous="handlePrevious"
  @next="handleNext"
/>
```

- **Features**: Previous/Next lesson buttons, completion actions
- **Logic**: Smart navigation across modules, course boundaries
- **Progress**: Lesson completion tracking integration

#### Component Usage Patterns:

```vue
<script setup>
// Course-aware component integration
const { getCourseBySlug } = useCourseRegistry();
const { getCourseProgress, markLessonComplete } = useCourseProgress();
const localePath = useLocalePath();

// Get course data
const course = getCourseBySlug("vue-nuxt-mastery");
const progress = getCourseProgress(course.id);

// Navigation handlers
const handleNavigation = (lesson) => {
  navigateTo(
    localePath(`/courses/${course.slug}/${lesson.moduleId}/${lesson.slug}`)
  );
};

const handleLessonComplete = () => {
  markLessonComplete(course.id, currentLesson.value.id);
};
</script>

<template>
  <div class="course-layout">
    <!-- Course-aware breadcrumb -->
    <CourseBreadcrumb
      :course-slug="course.slug"
      :module-id="currentModule.id"
      :lesson-slug="currentLesson.slug"
    />

    <!-- Main navigation -->
    <CourseNavigation
      :course="course"
      :current-lesson="currentLesson"
      @navigate="handleNavigation"
    />

    <!-- Module sidebar -->
    <CourseModuleNav
      :modules="course.modules"
      :current-module="currentModule"
      :current-lesson="currentLesson"
    />

    <!-- Lesson controls -->
    <CourseLessonNav
      :course="course"
      :current-lesson="currentLesson"
      @complete="handleLessonComplete"
    />
  </div>
</template>
```

### Enhanced Navigation Components (Phase 2.2) course management.

### Multi-Course Architecture

- **Course Registry System**: Centralized course configuration in `config/courses.ts`
- **Dual routing patterns**:
  - New multi-course routes: `/courses/[courseId]/[module]/[lessonSlug]`
  - Legacy routes (backward compatible): `/lesson/[module]/[lessonSlug]`
- **Course-aware content structure**: `content/courses/[courseId]/[locale]/modules/[moduleId]/lessons/`
- **Backward compatibility**: Legacy content structure maintained at `content/lesson/module*-{lang}/`

### Content Architecture

- **Primary structure**: `content/courses/vue-nuxt-mastery/en/` and `content/courses/vue-nuxt-mastery/ar/`
- **Legacy support**: `content/lesson/module1-en/` and `content/lesson/module1-ar/` (maintained for compatibility)
- **Course metadata**: Centralized in `config/courses.ts` with TypeScript interfaces
- **Content managed via @nuxt/content** with enhanced frontmatter structure

### Course Configuration System

- **Course Registry**: `config/courses.ts` - centralized configuration for all courses
- **TypeScript Interfaces**: `types/course.ts` - comprehensive type definitions
- **Course Management**: `composables/useCourseRegistry.ts` - course retrieval, filtering, search
- **Progress Tracking**: `composables/useCourseProgress.ts` - user progress management
- **Validation System**: `utils/courseValidation.ts` - configuration validation and consistency checking

### i18n Architecture

- **Critical**: ALL user-facing text uses translation keys (`$t("key")`) - never hardcode strings
- **Language switching logic**: `LanguageSwitcher.vue` with automatic course-aware navigation
- **Route localization**: Always use `localePath()` for navigation, imported via `useLocalePath()`
- **RTL support**: Automatic `dir` attribute switching in `app.vue` using computed properties
- **Enhanced translations**: Extended i18n structure for multi-course platform with course-specific keys

### Tech Stack Essentials

- **Nuxt 3** with SSR enabled, TypeScript, and `<script setup>` pattern
- **@nuxt/ui** (NOT Nuxt UI Pro) with custom icon collections in `assets/icons/`
- **Vercel deployment** with nitro preset configured
- **@nuxtjs/i18n** with cookie-based language persistence
- **Course Management System**: TypeScript-based course registry and progress tracking

### Course Management Implementation

```vue
// ✅ Modern course-aware patterns
<script setup>
const { t } = useI18n();
const localePath = useLocalePath();
const { getCourseBySlug, getFeaturedCourses } = useCourseRegistry();
const { getCourseProgress } = useCourseProgress();

// Get course data from registry
const course = getCourseBySlug("vue-nuxt-mastery");
const progress = getCourseProgress(course.id);
</script>

<template>
  <h1>{{ course.title[locale] }}</h1>
  <NuxtLink :to="localePath(`/courses/${course.slug}`)">
    {{ $t("course.viewCourse") }}
  </NuxtLink>
</template>
```

### Multi-Course Routing Patterns

- **Course Overview**: `/courses/[courseId]` - course information and modules
- **Lesson Content**: `/courses/[courseId]/[module]/[lessonSlug]` - individual lessons
- **Course Listing**: `/courses` - browse all available courses
- **Legacy Support**: `/lesson/[module]/[lessonSlug]` - backward compatibility maintained

### Enhanced Content Frontmatter Schema

```yaml
---
# Course-level metadata (course.md files)
title: "Vue.js & Nuxt.js Mastery"
description: "Complete guide from Vue basics to advanced Nuxt development"
slug: "vue-nuxt-mastery"
status: "published"
difficulty: "beginner"
estimatedHours: 40
prerequisites: ["basic-javascript", "html-css"]
technologies: ["vue", "nuxt", "typescript", "pinia"]
---
# Module-level metadata (module.md files)
---
id: "module1"
title: "Vue.js Fundamentals"
description: "Learn the core concepts of Vue.js"
number: 1
estimatedMinutes: 180
---
# Lesson-level metadata (lesson.md files)
---
title: "Localized lesson title"
description: "Brief lesson summary for SEO"
number: 1 # Lesson order within module
estimatedMinutes: 30
hasExercise: true
hasQuiz: false
slug: "lesson1"
---
```

## Critical Development Rules

1. **Never hardcode text** - Always use `$t("key")` or `t("key")`
2. **Always use `localePath()`** for navigation links
3. **Use course registry** - Access course data via `useCourseRegistry()` composable
4. **Test in both languages** - Components must work in RTL (Arabic) mode
5. **Follow the multi-course structure** - Use appropriate content paths for new/legacy systems
6. **Use `<script setup>`** - Standard for all Vue components
7. **Leverage @nuxt/ui components** - Use UButton, UContainer, UDropdownMenu, etc.
8. **Track user progress** - Use `useCourseProgress()` for lesson completion and navigation

## Essential File Locations

- **i18n config**: `nuxt.config.ts` (locales, detection settings)
- **Translation files**: `i18n/locales/en.json`, `i18n/locales/ar.json`
- **Course registry**: `config/courses.ts` (centralized course configuration)
- **Type definitions**: `types/course.ts` (TypeScript interfaces)
- **Course composables**: `app/composables/useCourseRegistry.ts`, `app/composables/useCourseProgress.ts`
- **Course validation**: `utils/courseValidation.ts`
- **New content structure**: `content/courses/[courseId]/[locale]/modules/[moduleId]/lessons/`
- **Legacy content**: `content/lesson/module{N}-{lang}/lesson{N}.md` (maintained for compatibility)
- **Main layout**: `app.vue` (handles language switching, RTL direction)
- **Language switcher**: `components/LanguageSwitcher.vue`

## Common Commands

```bash
npm run dev              # Development server
npm run build            # Production build
npm run generate         # Static generation
```

## Multi-Course Development Patterns

### Adding New Courses

1. **Add course configuration** to `config/courses.ts`:

```typescript
{
  id: "new-course-id",
  title: { en: "Course Title", ar: "عنوان الدورة" },
  description: { en: "Description", ar: "الوصف" },
  slug: "new-course",
  status: "published",
  // ... other configuration
}
```

2. **Create content structure**:

```
content/courses/new-course/
├── en/
│   ├── course.md
│   └── modules/
│       └── module1/
│           ├── module.md
│           └── lessons/
│               └── lesson1.md
└── ar/
    ├── course.md
    └── modules/
        └── module1/
            ├── module.md
            └── lessons/
                └── lesson1.md
```

3. **Add translation keys** to both `i18n/locales/en.json` and `i18n/locales/ar.json`

### Using Course Registry

```vue
<script setup>
// Get course management functions
const { getCourseBySlug, getFeaturedCourses, searchCourses, filterCourses } =
  useCourseRegistry();

// Get progress tracking functions
const { getCourseProgress, markLessonComplete, getNextLesson } =
  useCourseProgress();

// Example: Get a specific course
const course = getCourseBySlug("vue-nuxt-mastery");

// Example: Get user progress
const progress = getCourseProgress(course.id);
const nextLesson = getNextLesson(course.id);
</script>
```

## When Adding New Features

1. Check existing translation keys in `i18n/locales/`
2. Add new keys to BOTH language files
3. Use descriptive nested keys: `"section.component.action"`
4. Test language switching functionality
5. Verify RTL layout in Arabic mode
6. **Use course registry** for any course-related data
7. **Update course configuration** if adding course-specific features
8. **Test backward compatibility** with legacy routes

---

_The sections below contain additional styling and design guidelines. Focus on the architectural patterns above for immediate productivity._

## I. Overall Design Philosophy & Aesthetics

- **Modern & Clean:** The UI should feel current, uncluttered, and intuitive. Prioritize clarity and ease of use.
- **Nuxt-Inspired Theme:**
  - **Primary Color:** Nuxt Green (approx. `#00DC82`) - use for primary calls-to-action, active states, important highlights.
  - **Secondary/Accent Color:** A slightly lighter or darker shade of Nuxt Green, or a complementary subtle color (e.g., a teal or a bright but not overpowering blue like `#00A9E0` if needed for differentiation).
  - **Dark Tones:** Dark grays and near-blacks for backgrounds, text, and UI chrome (e.g., `#1E1E1E`, `#2F2F2F`, `#18181B` for dark mode elements, or as primary text on light backgrounds).
  - **Light Tones:** Off-whites and light grays for light mode backgrounds and contrasting elements (e.g., `#F3F4F6`, `#FFFFFF`).
  - **Text Colors:** High contrast is key. Dark text on light backgrounds, light text on dark backgrounds. Default body text could be a dark gray (e.g., `#333333` on light) or a light gray/white on dark.
- **Minimalism:** Avoid unnecessary decorations. Focus on typography, spacing, and subtle interactive cues.
- **Accessibility:** Ensure good color contrast (WCAG AA minimum), keyboard navigability, and semantic HTML. Use ARIA attributes where appropriate.
- **Responsive Design:** All components and layouts must be responsive, adapting gracefully from mobile to desktop screens. Use mobile-first approach where logical.

## II. Core Features (Multi-Course Platform)

1. **Course Management:**
   - Course Listing Page: Browse all available courses with filtering and search
   - Course Overview Page: Individual course information, modules, and enrollment
   - Course Progress Tracking: User progress across multiple courses
2. **Lesson Consumption:**
   - Individual Lesson View Page: Display lesson content with course context
   - Navigation: Course-aware "Next Lesson" / "Previous Lesson" buttons
   - Sidebar navigation: Current course module structure
3. **Content Formats:**
   - **Text-based lessons:** Rich text formatting with course branding
   - **Code Examples:** Syntax-highlighted code blocks with "copy to clipboard"
   - **Interactive Exercises:** Course-specific exercises with progress tracking
   - **Quizzes:** Course-integrated quizzes with completion tracking
4. **Multi-Course User Experience:**
   - Course discovery and filtering
   - Cross-course progress management
   - Course-specific theming and features
   - Unified navigation across courses

## I. Overall Design Philosophy & Aesthetics

- **Modern & Clean:** The UI should feel current, uncluttered, and intuitive. Prioritize clarity and ease of use.
- **Nuxt-Inspired Theme:**
  - **Primary Color:** Nuxt Green (approx. `#00DC82`) - use for primary calls-to-action, active states, important highlights.
  - **Secondary/Accent Color:** A slightly lighter or darker shade of Nuxt Green, or a complementary subtle color (e.g., a teal or a bright but not overpowering blue like `#00A9E0` if needed for differentiation).
  - **Dark Tones:** Dark grays and near-blacks for backgrounds, text, and UI chrome (e.g., `#1E1E1E`, `#2F2F2F`, `#18181B` for dark mode elements, or as primary text on light backgrounds).
  - **Light Tones:** Off-whites and light grays for light mode backgrounds and contrasting elements (e.g., `#F3F4F6`, `#FFFFFF`).
  - **Text Colors:** High contrast is key. Dark text on light backgrounds, light text on dark backgrounds. Default body text could be a dark gray (e.g., `#333333` on light) or a light gray/white on dark.
- **Minimalism:** Avoid unnecessary decorations. Focus on typography, spacing, and subtle interactive cues.
- **Accessibility:** Ensure good color contrast (WCAG AA minimum), keyboard navigability, and semantic HTML. Use ARIA attributes where appropriate.
- **Responsive Design:** All components and layouts must be responsive, adapting gracefully from mobile to desktop screens. Use mobile-first approach where logical.

## II. Core Features (MVP - To be delivered from the start)

1.  **Course Display:**
    - Homepage/Course Landing Page: Overview, benefits, CTA to view courses.
    - Course Overview Page: List all modules and lessons. Lessons should indicate if they contain exercises or quizzes.
2.  **Lesson Consumption:**
    - Individual Lesson View Page: Display lesson content.
    - Navigation: Easy "Next Lesson" / "Previous Lesson" buttons. Sidebar navigation tree for current module.
3.  **Content Formats:**
    - **Text-based lessons:** Rich text formatting.
    - **Code Examples:** Clear, syntax-highlighted code blocks with a "copy to clipboard" feature.
    - **Interactive Exercises:** Embedded within lessons. Provide input area and feedback mechanism (correct/incorrect, hints).
    - **Quizzes:** Embedded within lessons (or at end of modules). Multiple-choice format initially. Show score and answers upon submission.
4.  **User Experience:**
    - Clear navigation structure.
    - Intuitive UI for interacting with exercises and quizzes.

## II.1. Multi-Language Support (Internationalization - i18n)

**CRITICAL:** This project implements full internationalization support and MUST be considered in all development decisions.

### **Supported Languages:**

- **English (en)** - Primary language
- **Arabic (ar)** - Secondary language with RTL support

### **Key Implementation Details:**

- **Translation Framework:** Uses `@nuxtjs/i18n` module with Nuxt 3
- **Locale Files:** Located in `i18n/locales/` directory (`en.json`, `ar.json`)
- **Language Switcher:** Custom `LanguageSwitcher.vue` component using UDropdownMenu
- **RTL Support:** Automatic direction handling for Arabic (`dir="rtl"`)

### **Development Guidelines:**

1. **Always Use Translation Keys:** Never hardcode text strings in components
   - ✅ Correct: `{{ $t("homepage.hero.title") }}`
   - ❌ Wrong: `"Master Vue.js and Nuxt.js"`

2. **Add New Translation Keys:** When adding new content, update BOTH locale files
   - Add to `i18n/locales/en.json`
   - Add to `i18n/locales/ar.json`
   - Use descriptive, nested key structure (e.g., `"section.subsection.key"`)

3. **Translation Key Naming Convention:**
   - Use camelCase for keys: `"primaryCta"`, `"titleHighlight"`
   - Use nested objects for organization: `"homepage.hero.title"`
   - Be descriptive and context-specific

4. **Component Translation Usage:**
   - Use `{{ $t("key") }}` in templates
   - Use `const { t } = useI18n()` and `t("key")` in script setup
   - For SEO meta: `useHead({ title: t("page.meta.title") })`

5. **Handling Dynamic Content:**
   - Use interpolation: `$t("message", { name: userName })`
   - In locale files: `"welcome": "Welcome {name}!"`

6. **RTL Considerations:**
   - Test all UI components in Arabic (RTL) mode
   - Ensure icons, layouts, and spacing work correctly
   - Use logical CSS properties when possible (e.g., `margin-inline-start` vs `margin-left`)

7. **Language Switcher Integration:**
   - The `LanguageSwitcher` component is already implemented
   - It automatically updates the UI language and persists the choice
   - Placed in the main navigation (app.vue)

8. **Navigation with i18n:**
   - Always use `localePath` for route generation in navigation links
   - ✅ Correct: `:to="localePath('/courses')"`
   - ❌ Wrong: `to="/courses"`
   - Import using: `const localePath = useLocalePath()` in script setup
   - This ensures links work correctly across language changes

### **Enhanced Translation Structure:**

```json
{
  "resources": "...",
  "about": "...",
  "languages": { "en": "...", "ar": "..." },
  "homepage": {
    "meta": { "title": "...", "description": "..." },
    "hero": { "title": "...", "titleHighlight": "...", "subtitle": "..." },
    "benefits": { ... },
    "modules": { ... },
    "finalCta": { ... }
  },
  "courses": {
    "title": "All Courses",
    "subtitle": "Browse our comprehensive collection of programming courses",
    "comingSoon": "Coming Soon"
  },
  "course": {
    "instructor": "Instructor",
    "modules": "Modules",
    "lessons": "Lessons",
    "hours": "Hours",
    "difficulty": "Difficulty",
    "progress": "Progress",
    "features": {
      "hasQuizzes": "Interactive Quizzes",
      "hasExercises": "Hands-on Exercises",
      "hasCertificates": "Completion Certificate"
    }
  },
  "navigation": {
    "courses": "Courses"
  },
  "difficulty": {
    "beginner": "Beginner",
    "intermediate": "Intermediate",
    "advanced": "Advanced"
  },
  "footer": { "copyright": "..." }
}
```

### **Testing Multi-Language:**

- Always test new features in both English and Arabic
- Verify text truncation, layout shifts, and RTL behavior
- Ensure all user-facing text is translatable

## III. Content Structure & Management

- **Content Source:** Markdown files located in the `content/` directory, managed by the `@nuxt/content` module.
- **Multi-Course Organization:**
  - **Primary structure**: `content/courses/[courseId]/[locale]/modules/[moduleId]/lessons/[lessonId].md`
    - Example: `content/courses/vue-nuxt-mastery/en/modules/module1/lessons/lesson1.md`
  - **Legacy structure**: `content/lesson/module1-en/lesson1.md` (maintained for backward compatibility)
- **Course Frontmatter (Essential):**
  - `title: Record<string, string>` (Multi-language course titles)
  - `description: Record<string, string>` (Multi-language descriptions)
  - `slug: string` (URL-friendly course identifier)
  - `status: "draft" | "published" | "archived" | "coming-soon"`
  - `difficulty: "beginner" | "intermediate" | "advanced"`
  - `estimatedHours: number` (Total course duration)
  - `prerequisites: string[]` (Required prior knowledge/courses)
  - `technologies: string[]` (Technologies covered)
  - `categories: string[]` (Course categories)
  - `instructor: InstructorInfo` (Instructor details with multi-language bio)
  - `price: CoursePrice` (Pricing information)
  - `config: CourseConfig` (Course-specific features and theming)
- **Module Frontmatter:**
  - `id: string` (Module identifier)
  - `title: Record<string, string>` (Multi-language module titles)
  - `description: Record<string, string>` (Multi-language descriptions)
  - `number: number` (Module order)
  - `estimatedMinutes: number` (Module duration)
- **Lesson Frontmatter (Enhanced):**
  - `title: Record<string, string>` (Multi-language lesson titles)
  - `description: Record<string, string>` (Brief lesson summary for SEO)
  - `number: number` (Lesson order within module)
  - `estimatedMinutes: number` (Lesson duration)
  - `hasExercise: boolean` (Interactive exercise included)
  - `hasQuiz: boolean` (Quiz included)
  - `slug: string` (URL-friendly lesson identifier)
- **Course Registry System:** Centralized course configuration in `config/courses.ts` with TypeScript interfaces, validation, and progress tracking.

## IV. Layout & Structure (General Webpage Elements)

- **Spacing:** Generous use of whitespace. Consistent padding and margins.
  - Default padding for containers: `p-4` or `p-6` (Tailwind).
  - Default margin between major sections: `my-6` or `my-8`.
- **Grid System:** Primarily use CSS Flexbox or CSS Grid for layout (Tailwind classes preferred).
- **Common Layouts:**
  - **Main App Layout (`layouts/default.vue`):**
    - Header: Logo/Site Title, main navigation links (e.g., "Courses").
    - Main Content Slot: `<slot />` for page content.
    - Footer: Copyright, other relevant links.
  - **Lesson View Layout (potentially a separate layout or achieved with components):** Sidebar for lesson navigation within the current module, main area for lesson content.
- **Modularity:** Design components to be reusable and self-contained.

## V. Typography

- **Primary Font:** A clean, modern sans-serif font. Consider system fonts first for performance, or a readily available Google Font like 'Inter', 'Roboto', or 'Open Sans'.
  - Example: `font-sans` (if Tailwind is configured with a good default sans-serif stack).
- **Headings:**
  - `h1`: Large, prominent (e.g., `text-3xl` or `text-4xl`, `font-bold`).
  - `h2`: Smaller than `h1` (e.g., `text-2xl`, `font-semibold`).
  - `h3`: (e.g., `text-xl`, `font-semibold`).
- **Body Text:** Legible size (e.g., `text-base` which is typically `16px`), normal font weight. Line height should be comfortable (e.g., `leading-relaxed` or `1.6`).
- **Code Blocks:** Monospace font (e.g., 'Fira Code', 'Source Code Pro', or Tailwind's `font-mono`). Clear visual distinction from body text (e.g., different background, subtle border). Syntax highlighting via Nuxt Content's MDC or a similar solution.

## VI. Component-Specific Styling Guidelines

- **Buttons:**
  - **Primary CTA:** Nuxt Green background (`bg-green-500 hover:bg-green-600` - adjust Tailwind shades to match `#00DC82`), white/dark text for contrast. Rounded corners (e.g., `rounded-md`). Clear hover and active states.
  - **Secondary/Ghost Buttons:** Transparent background with a colored border (e.g., Nuxt Green border, Nuxt Green text) or a light gray background.
  - **Padding:** `py-2 px-4` or `py-3 px-6` depending on importance.
- **Forms & Inputs (for exercises/quizzes):**
  - Clean, simple borders (e.g., `border-gray-300`).
  - Focus state should be clear (e.g., border color change to Nuxt Green or a focus ring).
  - Adequate padding within inputs.
  - Labels clearly associated with inputs.
- **Cards/Containers (e.g., for module listings, lesson previews):**
  - Subtle rounded corners (e.g., `rounded-lg`).
  - Optional: light border (`border border-gray-200` on light mode) or a very subtle box shadow (`shadow-sm` or `shadow-md`).
  - Background often off-white/light gray on a light page, or dark gray on a dark page.
- **Navigation (Menus, Sidebars):**
  - Active links should be clearly indicated (e.g., Nuxt Green text, different background, or a small accent border).
  - Sufficient spacing between nav items.
- **Code Examples:**
  - Use Nuxt Content's built-in capabilities for syntax highlighting (MDC - Markdown Components).
  - "Copy to clipboard" button, easily accessible.
- **Interactive Elements (Exercises, Quizzes):**
  - These will be custom Vue components rendered by Nuxt Content, possibly triggered by specific Markdown syntax or components within Markdown.
  - Design for clarity: clear instructions, distinct input areas, obvious submission buttons.
  - Feedback (correct/incorrect) should be unambiguous using color (e.g., green for correct, red for incorrect) and icons/text.

## VII. Technical Stack & Vue/Nuxt Specific Instructions

- **Framework:** Nuxt 3
- **Language:** TypeScript (implied by Nuxt 3 defaults, strive for type safety).
- **Content Management:** `@nuxt/content` module for all course content.
- **Styling:**
  - **Tailwind CSS First:** Prioritize using `@nuxt/ui` utility classes for all styling. Do not use Nuxt UI Pro components at all.
  - **Scoped Styles:** If custom CSS is absolutely necessary beyond Tailwind's capabilities, use `<style scoped>` in Vue components. Avoid global styles unless for foundational resets or typography.
  - **No Inline Styles:** Avoid inline `style="..."` attributes unless dynamically generated and unavoidable.
- **State Management:** Pinia for any complex global/shared state if needed. `useState` for simple SSR-friendly shared state. For MVP, complex state management might be minimal.
- **Server Capabilities:** Nuxt server routes (`server/api/`) can be used for quiz/exercise answer validation if client-side is insufficient, but aim for client-side simplicity for V1 where possible.
- **Deployment:** Vercel (for both static and SSR builds). Vercel's serverless functions can be used if more complex backend logic is needed.
- **File Structure:** Adhere to standard Nuxt 3 directory structure.
- **Component Naming:** PascalCase (e.g., `LessonCard.vue`). Auto-imported components in Nuxt.
- **Script Setup:** Use `<script setup>` for all new Vue components.
- **Props & Emits:** Clearly define props with types. Use `defineEmits` for component events.
- **Composables:** Use for reusable logic. Place in `composables/` directory for auto-import.
- **Data Fetching (for Nuxt Content):** Primarily using `queryContent()` and Nuxt Content's provided components/composables to render content.

## VIII. Interaction & User Experience

- **Feedback:** Provide immediate visual feedback for user actions (e.g., button clicks, form submissions).
- **Loading States:** Implement clear loading indicators (e.g., spinners, skeletons) if any data fetching outside Nuxt Content causes delays. Nuxt Content is generally very fast.
- **Error Handling:** Display user-friendly error messages (e.g., Nuxt's default error page, customizable).
- **Transitions & Animations:** Use subtle transitions for a smoother experience (e.g., hover effects). Nuxt page transitions can be considered if they enhance UX without performance cost.

## IX. Code Quality & Best Practices

- **Readability:** Write clean, well-commented code where necessary.
- **DRY Principle:** Don't Repeat Yourself. Utilize components and composables.
- **Performance:** Be mindful of performance implications. Nuxt and Nuxt Content are optimized, but custom components should also be efficient.
- **Semantic HTML:** Use appropriate HTML tags for their meaning.

## X. Multi-Course Platform Utilities

### Course Registry Composable (`useCourseRegistry`)

```typescript
// Course retrieval
const { getCourseBySlug, getAllCourses, getPublishedCourses } =
  useCourseRegistry();

// Course discovery
const { searchCourses, filterCourses, getFeaturedCourses } =
  useCourseRegistry();

// Configuration metadata
const { getCourseCategories, getTechnologyTags, getDifficultyLevels } =
  useCourseRegistry();

// Validation
const { validateCourse } = useCourseRegistry();
```

### Course Progress Composable (`useCourseProgress`)

```typescript
// Lesson progress
const { markLessonComplete, isLessonCompleted, updateCurrentLesson } =
  useCourseProgress();

// Course progress
const { getCourseProgress, getCourseProgressPercentage, markCourseCompleted } =
  useCourseProgress();

// Navigation
const { getNextLesson } = useCourseProgress();

// Management
const { resetCourseProgress, exportProgress, importProgress } =
  useCourseProgress();
```

### Course Validation Utilities

```typescript
// Validate course configuration
import {
  validateCourseConfig,
  validateAllCourses,
  checkCourseConsistency,
} from "~/utils/courseValidation";

// Generate course summaries
import { generateCourseSummary } from "~/utils/courseValidation";
```

### TypeScript Interfaces

Comprehensive type definitions available in `types/course.ts`:

- `Course` - Complete course configuration
- `ModuleMetadata` - Module structure with lessons
- `LessonMetadata` - Individual lesson configuration
- `CourseProgress` - User progress tracking
- `CourseFilters` - Advanced filtering options
- `CourseSortOptions` - Sorting configurations

### Enhanced Navigation Components (Phase 2.2)

The platform now includes sophisticated navigation components with advanced features:

#### 1. Enhanced Course Breadcrumb (`CourseBreadcrumb.vue`)

```vue
// Enhanced breadcrumb using @nuxt/ui UBreadcrumb
<CourseBreadcrumb
  :course-slug="courseSlug"
  :module-id="moduleId"
  :lesson-slug="lessonSlug"
/>
```

- **Features**: Dynamic path generation, icons, configurable home link
- **@nuxt/ui Integration**: Uses UBreadcrumb component with proper color schemes
- **Responsive**: Adapts to different screen sizes with overflow handling

#### 2. Enhanced Course Module Navigation (`EnhancedCourseModuleNav.vue`)

```vue
// Advanced module navigation with expandable panels
<EnhancedCourseModuleNav
  :course="course"
  :current-module="currentModule"
  :current-lesson="currentLesson"
  @lesson-select="handleLessonSelect"
/>
```

- **Features**: Collapsible module panels, progress tracking, lesson status indicators
- **Interactive**: Click to expand/collapse modules, lesson navigation
- **Progress Visualization**: Visual indicators for completed/current/upcoming lessons
- **Responsive**: Mobile-friendly with touch interactions

#### 3. Enhanced Course Navigation Wrapper (`EnhancedCourseNavigation.vue`)

```vue
// Comprehensive navigation with responsive layout
<EnhancedCourseNavigation
  :course="course"
  :current-progress="progress"
  :show-breadcrumb="true"
  :show-quick-actions="true"
/>
```

- **Features**: 3-column responsive grid, progress overview, quick actions sidebar
- **Layout**: Breadcrumb + Module Navigation + Quick Actions
- **Progress Management**: Course completion tracking, next lesson suggestions
- **Accessibility**: Keyboard navigation, ARIA labels, screen reader support

#### Implementation Patterns:

```vue
<script setup>
// Enhanced navigation usage
const { getCourseBySlug } = useCourseRegistry();
const { getCourseProgress, markLessonComplete } = useCourseProgress();

const course = getCourseBySlug("vue-nuxt-mastery");
const progress = getCourseProgress(course.id);

// Handle lesson navigation
const handleLessonSelect = (lesson) => {
  navigateTo(
    localePath(`/courses/${course.slug}/${lesson.moduleId}/${lesson.slug}`)
  );
};

// Mark lesson as complete
const handleLessonComplete = (lessonId) => {
  markLessonComplete(course.id, lessonId);
};
</script>

<template>
  <!-- Enhanced navigation with full feature set -->
  <EnhancedCourseNavigation
    :course="course"
    :current-progress="progress"
    @lesson-select="handleLessonSelect"
    @lesson-complete="handleLessonComplete"
  />
</template>
```

#### @nuxt/ui Color Compatibility:

- **Approved Colors**: `primary`, `secondary`, `success`, `info`, `warning`, `error`, `neutral`
- **Avoid**: `gray`, `zinc`, `slate` (use `neutral` instead)
- **Pattern**: Always test components with approved color schemes

#### Responsive Design Features:

- **Mobile First**: Components adapt from mobile to desktop
- **Touch Interactions**: Optimized for touch devices
- **Overflow Handling**: Graceful handling of long content
- **Layout Flexibility**: Grid systems adapt to screen size

---

## XI. Final Notes

- **MULTI-LANGUAGE PRIORITY:** Always consider internationalization first. Every user-facing text must use translation keys. Test in both English and Arabic.
- **Documentation:** Keep code well-documented. Use JSDoc comments for complex functions or components.
- **Version Control:** Use Git for version control. Commit often with clear messages.
- **Development environment:** Windows 11.
- Don't hesitate to ask for clarification on any point or if you need more context about a specific feature or design choice.
- Don't ask for permission when fetching data from the Internet, but ensure it aligns with the project's goals and respects any API usage limits or terms of service.

By following these guidelines, you will help create a consistent, beautiful, and effective learning platform. When in doubt, ask for clarification or refer back to these principles. Let's build something great!
