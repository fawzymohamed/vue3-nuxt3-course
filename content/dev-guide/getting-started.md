---
title: "Getting Started"
description: "Comprehensive overview of Learnova Academy's system architecture and design patterns"
---

::dev-guide-section{title="Getting Started" icon="🏗️"}

Learnova Academy follows a modern, component-based architecture built on Vue 3 and Nuxt 4.
::

::dev-guide-callout{type="info" title="Design Principles"}
Our architecture is built on **modularity**, **scalability**, and **developer experience** principles.
::

::dev-guide-section{title="System Layers" icon="📚"}

The application is organized into distinct layers for separation of concerns.

::

::dev-guide-list{type="numbered" columns="1"}

- **Presentation Layer**: Vue components and pages
- **Business Logic Layer**: Composables and utilities
- **Data Layer**: Content management and state
- **Configuration Layer**: App and build configuration
  ::

::dev-guide-section{title="Component Architecture" icon="🧩"}

Reusable components organized by feature and functionality.

::

::dev-guide-code-block{language="text" filename="Component Structure"}

```
app/components/
├── content/              # Content rendering components
│   ├── LessonRenderer.vue
│   ├── CourseHeader.vue
│   └── ContentSection.vue
├── devGuide/            # Developer guide components
│   ├── DevGuideSection.vue
│   ├── DevGuideTechCard.vue
│   └── DevGuideRenderer.vue
├── admin/               # Admin interface components
└── ui/                  # Base UI components
```

::

::dev-guide-section{title="Data Flow" icon="🔄"}

Understanding how data flows through the application.

::

::dev-guide-tech-card{title="Content Pipeline" description="Markdown files → Nuxt Content → Vue components → Rendered pages" badge="Core Flow" badgeColor="primary"}
::

::dev-guide-tech-card{title="State Management" description="Composables + Vue reactivity for local state, Pinia for global state" badge="State" badgeColor="success"}
::

::dev-guide-section{title="Routing Strategy" icon="🛣️"}

File-based routing with dynamic course and lesson handling.

::

::dev-guide-code-block{language="text" filename="Route Structure"}

```
pages/
├── index.vue                    # Homepage
├── courses/
│   ├── index.vue               # Course listing
│   └── [courseSlug]/
│       ├── index.vue           # Course overview
│       └── [moduleSlug]/
│           └── [lessonSlug].vue # Individual lesson
├── dev-guide/
│   └── index.vue               # Developer documentation
└── admin.vue                   # Admin interface
```

::

::dev-guide-callout{type="tip" title="Routing Tip"}
Dynamic routes use file-based conventions. The `[param]` syntax creates dynamic route segments.
::
