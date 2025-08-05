---
title: "Development Stack Overview"
description: "Core technologies and frameworks used in Learnova Academy"
---

::dev-guide-section{title="Core Framework" icon="🛠️"}

Learnova Academy is built on a modern, scalable tech stack designed for performance and developer experience.

::

::dev-guide-tech-card{title="Nuxt 4" version="^4.0.1" description="Full-stack Vue framework with SSR, SSG, and hybrid rendering" link="https://nuxt.com" badge="Primary Framework" badgeColor="primary"}
::

::dev-guide-tech-card{title="Vue 3" version="^3.4.0" description="Progressive JavaScript framework with Composition API" link="https://vuejs.org" badge="Frontend" badgeColor="success"}
::

::dev-guide-tech-card{title="TypeScript" version="^5.0.0" description="Typed superset of JavaScript for better development experience" link="https://typescriptlang.org" badge="Language" badgeColor="info"}
::

::dev-guide-section{title="UI & Styling" icon="🎨"}

Modern UI components and styling solutions for a consistent design system.

::

::dev-guide-list{type="features" columns="2"}

- @nuxt/ui components for consistent UI
- Tailwind CSS for utility-first styling
- Custom icons in assets/icons/
- Responsive design patterns
- Dark mode support
- RTL layout compatibility
  ::

::dev-guide-section{title="Data Management" icon="📊"}

Robust data management and state handling solutions.

::

::dev-guide-code-block{language="typescript" filename="composables/useCourseRegistry.ts"}

```typescript
// Course registry functions
const { getCourseBySlug, getAllCourses, getFeaturedCourses } =
  useCourseRegistry();

// Content querying functions
const { getCourse, getCourseModules, getCourseLessons } = useCourses();

// Progress tracking functions
const { markLessonComplete, getCourseProgress, toggleLessonBookmark } =
  useCourseProgress();
```

::

::dev-guide-callout{type="info" title="Development Tip"}
All composables are auto-imported in Nuxt 4, so you can use them directly in components without manual imports.
::

::dev-guide-section{title="Content Management" icon="📝"}

Powerful content management system built on Nuxt Content v3.

::

::dev-guide-tech-card{title="Nuxt Content v3" version="^3.0.0" description="File-based CMS with MDC (Markdown Components) support" link="https://content.nuxt.com" badge="CMS" badgeColor="primary"}
::

::dev-guide-list{type="check" columns="1"}

- Markdown with Vue components (MDC)
- YAML frontmatter support
- Auto-generated navigation
- Full-text search capabilities
- Git-based versioning
- Hot reload in development
  ::

::dev-guide-section{title="Development Tools" icon="⚡"}

Essential tools for productive development workflow.

::

::dev-guide-list{type="numbered" columns="2"}

- ESLint for code quality
- Prettier for code formatting
- TypeScript for type safety
- Vite for fast development
- Git hooks with Husky
- Automated testing setup
  ::

::dev-guide-callout{type="tip" title="Pro Tip"}
Use `npm run dev` to start the development server with hot reload, TypeScript checking, and ESLint validation.
::
