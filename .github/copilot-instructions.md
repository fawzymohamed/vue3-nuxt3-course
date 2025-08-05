# AI Copilot Instructions for Learnova Academy Learning Platform

You are an expert Vue 3 and Nuxt 4 developer, assisting in building a high-quality bilingual multi-course learning platform. Focus on understanding the existing architecture patterns before making changes.

## 🎯 Development Stack Overview

**Learnova Academy** is a Nuxt 4-based multi-course learning platform with full internationalization support (English/Arabic with RTL). The platform uses a scalable multi-course architecture that supports various programming courses while maintaining excellent bilingual support and developer experience.

### Core Architecture

- **Multi-Course System**: Centralized course registry with individual course management
- **Bilingual Support**: Full English/Arabic with RTL layout support
- **Content Management**: File-based content system using @nuxt/content with MDC (Markdown Components)
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
- **Dev guide paths**: `content/dev-guide/`

## II. Tech Stack & Dependencies

### Core Framework

- **Nuxt 4** with SSR enabled and TypeScript
- **Vue 3** with Composition API and `<script setup>` pattern
- **@nuxt/content** for content management with MDC support
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

## IV. Nuxt Content & MDC System

### **CRITICAL: Mandatory Content Loading Pattern**

All content loading MUST follow this pattern to ensure proper SSR/hydration:

```vue
<script setup lang="ts">
// ✅ MANDATORY: Use queryCollection with useAsyncData wrapper
const { data: content } = await useAsyncData("unique-key", () =>
  queryCollection("content").path("/path/to/content").first()
);

// ✅ For multiple content files
const { data: allContent } = await useAsyncData("content-list", () =>
  queryCollection("content").path("/content/directory").find()
);
</script>

<template>
  <!-- ✅ MANDATORY: Always provide loading states -->
  <div v-if="!content" class="loading-state">
    <p>Loading content...</p>
  </div>

  <!-- ✅ MANDATORY: Use ContentRenderer for content display -->
  <ContentRenderer v-if="content" :value="content" />
</template>
```

### **MDC (Markdown Components) System**

The platform uses MDC extensively for content-driven components. All content files support custom Vue components through MDC syntax:

```markdown
---
title: "Content Title"
description: "Content description"
---

::component-name{prop="value" anotherProp="another value"}
Content inside the component
::

::dev-guide-section{title="Framework Overview" icon="🛠️"}
This content will be rendered inside the DevGuideSection component
::

::dev-guide-tech-card{title="Nuxt 4" version="^4.0.1" description="Full-stack framework" link="https://nuxt.com" badge="Primary" badgeColor="primary"}
::
```

### **MDC Component Development Rules**

When creating MDC-compatible components:

```vue
<script setup lang="ts">
// ✅ Define clear TypeScript interfaces for props
interface Props {
  title: string;
  description?: string;
  icon?: string;
  type?: "info" | "warning" | "success";
}

const props = withDefaults(defineProps<Props>(), {
  description: undefined,
  icon: undefined,
  type: "info",
});
</script>

<template>
  <div class="mdc-component">
    <h3>{{ title }}</h3>
    <p v-if="description">{{ description }}</p>

    <!-- ✅ Always support slot content for MDC -->
    <div class="content">
      <slot />
    </div>
  </div>
</template>
```

### **Content Loading Anti-Patterns (AVOID)**

```vue
<!-- ❌ NEVER: Direct queryContent without useAsyncData -->
<script setup>
const content = await queryContent("/path").findOne(); // Causes hydration issues
</script>

<!-- ❌ NEVER: Use ContentDoc component -->
<ContentDoc path="/content/path" />
<!-- Component resolution issues -->

<!-- ❌ NEVER: Missing loading states -->
<ContentRenderer :value="content" />
<!-- Shows empty during loading -->

<!-- ❌ NEVER: Use $fetch for content -->
const content = await $fetch("/api/content");
<!-- Wrong API pattern -->
```

## V. Dev Guide Components System

The platform includes specialized MDC components for developer documentation.

## VI. Component Architecture

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

## VII. Content Management Patterns

### Content Structure

```
content/
├── courses/[courseId]/[locale]/
│   ├── course.md                    # Course metadata
│   └── modules/[moduleId]/
│       ├── module.md               # Module metadata
│       └── lessons/[lessonId].md   # Individual lessons
└── dev-guide/
    ├── development-stack.md        # Dev guide sections
    ├── getting-started.md
    └── architecture.md
```

### Content Querying Examples

```typescript
// ✅ Single content file
const { data: course } = await useAsyncData("course-overview", () =>
  queryCollection("content")
    .path(`/courses/${courseId}/${locale}/course`)
    .first()
);

// ✅ Multiple content files
const { data: devGuideContent } = await useAsyncData("dev-guide-content", () =>
  queryCollection("content").path("/dev-guide").find()
);

// ✅ Specific lesson content
const { data: lesson } = await useAsyncData(`lesson-${lessonSlug}`, () =>
  queryCollection("content")
    .path(
      `/courses/${courseId}/${locale}/modules/${moduleId}/lessons/${lessonSlug}`
    )
    .first()
);
```

### MDC Content File Example

````markdown
---
title: "Development Stack Overview"
description: "Core technologies and frameworks used in Learnova Academy"
---

::dev-guide-section{title="Core Framework" icon="🛠️"}

Learnova Academy is built on a modern, scalable tech stack designed for performance and developer experience.

::

::dev-guide-tech-card{title="Nuxt 4" version="^4.0.1" description="Full-stack Vue framework with SSR, SSG, and hybrid rendering" link="https://nuxt.com" badge="Primary Framework" badgeColor="primary"}
::

::dev-guide-list{type="features" columns="2"}

- Server-side rendering capabilities
- File-based routing system
- Auto-imported composables
- Built-in TypeScript support
  ::

::dev-guide-code-block{language="typescript" filename="composables/example.ts"}

```typescript
// Example composable
export const useExample = () => {
  const data = ref("Hello World");
  return { data };
};
```
````

::

::dev-guide-callout{type="info" title="Development Tip"}
All composables are auto-imported in Nuxt 4, so you can use them directly in components without manual imports.
::

````

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

# Dev Guide sections
---
title: "Development Stack Overview"
description: "Core technologies and frameworks"
---
````

## VIII. Progress Tracking System

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

## IX. Routing & Navigation

### Multi-Course URL Structure

```typescript
// Primary routes
/                                 # Platform homepage
/courses                         # All courses listing
/courses/[courseId]             # Course overview
/courses/[courseId]/[module]/[lessonSlug]  # Individual lessons
/dev-guide                      # Developer documentation (dev mode only)
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

## X. Translation System

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

## XI. Component Development Guidelines

### Vue 3 + Nuxt 4 Best Practices

```vue
<script setup lang="ts">
// ✅ Proper imports
const { t } = useI18n();
const localePath = useLocalePath();
const { getCourseBySlug } = useCourseRegistry();

// ✅ Typed props for MDC compatibility
interface Props {
  courseId: string;
  showProgress?: boolean;
  title?: string;
  description?: string;
}

const props = withDefaults(defineProps<Props>(), {
  showProgress: true,
  title: undefined,
  description: undefined,
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

    <!-- ✅ MDC slot support -->
    <div class="content">
      <slot />
    </div>

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

## XII. Course Registry Management

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

## XIII. File Locations & Organization

### Essential Files

- **Course Registry**: `config/courses.ts` - Centralized course configuration
- **Type Definitions**: `types/course.ts` - TypeScript interfaces
- **Course Composables**: `app/composables/useCourseRegistry.ts`, `app/composables/useCourseProgress.ts`
- **Content Validation**: `utils/courseValidation.ts`

### Content Structure

- **Multi-Course Content**: `content/courses/[courseId]/[locale]/modules/[moduleId]/lessons/`
- **Dev Guide Content**: `content/dev-guide/` - Developer documentation with MDC components

### Translation Files

- **English**: `i18n/locales/en.json`
- **Arabic**: `i18n/locales/ar.json`

### Components

- **Enhanced Navigation**: `components/EnhancedCourseNavigation.vue`
- **Module Navigation**: `components/EnhancedCourseModuleNav.vue`
- **Course Cards**: `components/CourseCard.vue`
- **Content Rendering**: `components/content/LessonRenderer.vue`
- **Dev Guide Components**: `components/devGuide/` - MDC-compatible documentation components

## XIV. Content Troubleshooting

### Critical Content Loading Rules

#### ✅ **Correct Patterns**

```vue
<!-- ✅ Always use this pattern for content loading -->
<script setup lang="ts">
const { data: content } = await useAsyncData("unique-key", () =>
  queryCollection("content").path("/path/to/content").first()
);
</script>

<template>
  <!-- ✅ Always provide loading states -->
  <div v-if="!content" class="animate-pulse">
    <div class="h-8 bg-gray-200 rounded mb-4"></div>
    <div class="h-4 bg-gray-200 rounded w-3/4"></div>
  </div>

  <!-- ✅ Use ContentRenderer for content display -->
  <ContentRenderer v-if="content" :value="content" />
</template>
```

#### ❌ **Anti-Patterns (NEVER USE)**

```vue
<!-- ❌ NEVER: Direct queryContent -->
<script setup>
const content = await queryContent("/path").findOne(); // Hydration issues
</script>

<!-- ❌ NEVER: ContentDoc component -->
<ContentDoc path="/content/path" />
<!-- Component resolution issues -->

<!-- ❌ NEVER: Missing loading states -->
<ContentRenderer :value="content" />
<!-- Shows empty during loading -->

<!-- ❌ NEVER: $fetch for content -->
const content = await $fetch('/api/content');
<!-- Wrong API -->
```

### Common Issues and Solutions

#### **MDC Components Not Rendering**

1. **Check component naming**: MDC uses kebab-case (`dev-guide-section` not `DevGuideSection`)
2. **Verify component location**: Components must be in `components/` directory for auto-discovery
3. **Check MDC syntax**: Use `::component-name{props}` with content `::` to close

#### **Content Path Issues**

```typescript
// ✅ Correct path patterns
queryCollection("content").path("/dev-guide/development-stack").first();
queryCollection("content").path("/courses/vue-nuxt-mastery/en/course").first();

// ❌ Wrong paths
queryCollection("content").path("dev-guide/development-stack").first(); // Missing leading slash
queryCollection("content").path("/dev-guide/development-stack.md").first(); // Don't include .md
```

#### **Hydration Mismatch Prevention**

```vue
<!-- ✅ Always wrap content queries -->
<script setup lang="ts">
const { data: content } = await useAsyncData("content-key", () =>
  queryCollection("content").path("/path").first()
);
</script>

<!-- ✅ Conditional rendering prevents hydration issues -->
<template>
  <div>
    <div v-if="!content" class="loading">Loading...</div>
    <ContentRenderer v-if="content" :value="content" />
  </div>
</template>
```

## XV. Development Commands

```bash
# Development
npm run dev              # Start development server (Nuxt 4)
npm run build           # Production build
npm run generate        # Static site generation

# Course Management
npm run validate:courses # Validate course configurations
npm run type-check      # TypeScript validation
```

## XVI. Common Patterns & Examples

### MDC Content Page Implementation

```vue
<script setup lang="ts">
// ✅ Standard MDC content page pattern
const { data: allContent } = await useAsyncData("section-content", async () => {
  try {
    const [section1, section2, section3] = await Promise.all([
      queryCollection("content")
        .path("/content/section1")
        .first()
        .catch(() => null),
      queryCollection("content")
        .path("/content/section2")
        .first()
        .catch(() => null),
      queryCollection("content")
        .path("/content/section3")
        .first()
        .catch(() => null),
    ]);
    return [section1, section2, section3].filter(Boolean);
  } catch (error) {
    console.error("Error loading content:", error);
    return [];
  }
});

// ✅ Navigation sections
const sections = computed(() => {
  if (!allContent.value) return [];

  return allContent.value.map((content) => {
    const id =
      content.path?.split("/").pop() ||
      content.title.toLowerCase().replace(/\s+/g, "-");
    return {
      id,
      title: content.title,
      icon: content.icon || "heroicons:document-text",
    };
  });
});

const activeSection = ref(sections.value[0]?.id || "default");

// ✅ Current content matching
const currentContent = computed(() => {
  if (!allContent.value) return null;
  return allContent.value.find((content) =>
    content.path?.includes(activeSection.value)
  );
});

function selectSection(sectionId: string) {
  activeSection.value = sectionId;
}
</script>

<template>
  <div class="min-h-screen bg-background">
    <UContainer class="py-8">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Navigation Sidebar -->
        <aside class="lg:col-span-1">
          <nav class="space-y-2">
            <button
              v-for="section in sections"
              :key="section.id"
              @click="selectSection(section.id)"
              class="w-full text-left p-3 rounded-lg transition-colors"
              :class="{
                'bg-primary-50 text-primary-700 dark:bg-primary-900 dark:text-primary-300':
                  activeSection === section.id,
                'hover:bg-gray-50 dark:hover:bg-gray-800':
                  activeSection !== section.id,
              }"
            >
              {{ section.title }}
            </button>
          </nav>
        </aside>

        <!-- Main Content -->
        <main class="lg:col-span-3">
          <div v-if="!currentContent" class="animate-pulse">
            <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
            <div class="space-y-3">
              <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            </div>
          </div>

          <div
            v-if="currentContent"
            class="prose prose-lg dark:prose-invert max-w-none"
          >
            <ContentRenderer :value="currentContent" />
          </div>
        </main>
      </div>
    </UContainer>
  </div>
</template>
```

### Error Handling

```typescript
// Always handle content not found scenarios
const { data: content } = await useAsyncData("content-key", async () => {
  try {
    const result = await queryCollection("content").path("/path").first();
    if (!result) {
      throw createError({
        statusCode: 404,
        statusMessage: "Content not found",
      });
    }
    return result;
  } catch (error) {
    console.error("Content loading error:", error);
    return null;
  }
});
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
- [ ] **Content Management**: Uses mandatory `queryCollection + useAsyncData` pattern
- [ ] **MDC Support**: Components work with MDC syntax and slot content
- [ ] **Loading States**: Always provides loading states for content
- [ ] **Error Handling**: Graceful fallbacks for content loading failures

**The platform prioritizes user experience, type safety, internationalization, scalable course management, and robust content management through MDC. Always follow these patterns to maintain consistency and quality across the codebase.**
