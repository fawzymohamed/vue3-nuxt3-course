---
title: "Development Stack Overview"
description: "Comprehensive guide to the technologies, tools, and libraries powering Learnova Academy learning platform."
---

# Development Stack & Technologies

Learnova Academy is built with a modern, cutting-edge te## 💻 Code Snippet Systemhnology stack that ensures performance, scalability, and excellent developer experience. This comprehensive overview details every tool and technology used in the project.

## 🚀 Core Framework

### **Nuxt 4** - Full-Stack Vue Framework

[**Official Documentat## 🖼️ Media & Assetson →**](https://nuxt.com/)

- **Version**: `^4.0.0`
- **Purpose**: Server-side rendering, static generation, and universal Vue applications
- **Key Features**: Auto-imports, file-based routing, built-in optimization

::dev-guide-code-block{code="

<!-- Example: Page auto-import -->
<script setup>
// Auto-imported composables
const { t } = useI18n();
const localePath = useLocalePath();
</script>

"}

::

### **Vue 3** - Progressive JavaScript Framework

[**Official Documentation →**](https://vuejs.org/)

- **Version**: `^3.5.15`
- **Features**: Composition API, `<script setup>`, TypeScript integration
- **Pattern**: All components use `<script setup>` syntax

```vue
<script setup lang="ts">
interface Props {
  title: string;
  description?: string;
}

const props = withDefaults(defineProps<Props>(), {
  description: "Default description",
});
</script>
```

### **TypeScript** - Type Safety

[**Official Documentation →**](https://www.typescriptlang.org/)

- **Version**: `^5.8.3`
- **Integration**: Full type safety across components, composables, and utilities
- **Config**: Strict TypeScript configuration with enhanced type checking

## 🎨 UI Framework & Styling

### **Nuxt UI** - Component Library

[**Official Documentation →**](https://ui.nuxt.com/)

- **Version**: `^3.1.3`
- **Purpose**: Modern, accessible Vue components built on Tailwind CSS
- **Components**: UButton, UCard, UContainer, UProgress, UBadge, etc.

```vue
<template>
  <UContainer>
    <UCard>
      <template #header>
        <h3>{{ $t("course.title") }}</h3>
      </template>

      <UButton
        :to="localePath('/courses')"
        variant="solid"
        color="primary"
        icon="i-heroicons-academic-cap"
      >
        {{ $t("navigation.viewCourses") }}
      </UButton>
    </UCard>
  </UContainer>
</template>
```

::callout{type="info"}
**Important**: We use **@nuxt/ui** (community version), NOT Nuxt UI Pro. All components should use the community library.
::

### **Tailwind CSS** - Utility-First Styling

[**Official Documentation →**](https://tailwindcss.com/)

- **Integration**: Built into @nuxt/ui, no separate installation needed
- **Approach**: Utility-first classes with component composition
- **Responsive**: Mobile-first responsive design patterns

```vue
<template>
  <!-- RTL-friendly classes -->
  <div class="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-sm">
    <div class="flex items-center gap-4 mb-4">
      <div class="flex-shrink-0">
        <UAvatar :src="instructor.avatar" :alt="instructor.name" />
      </div>
      <div class="flex-1 min-w-0">
        <h3 class="text-lg font-semibold truncate">{{ instructor.name }}</h3>
        <p class="text-gray-600 dark:text-gray-400 text-sm">
          {{ instructor.title }}
        </p>
      </div>
    </div>
  </div>
</template>
```

## 🔤 Typography & Fonts

### **Nuxt Fonts** - Font Optimization

[**Official Documentation →**](https://fonts.nuxt.com/)

- **Version**: `^0.11.4`
- **Purpose**: Automatic font optimization and loading
- **Features**: Google Fonts integration, font display optimization, preloading

```vue
<!-- Fonts are automatically optimized -->
<style>
.heading {
  font-family: "Inter", sans-serif; /* Auto-optimized */
}

.arabic-text {
  font-family: "Noto Sans Arabic", sans-serif; /* RTL support */
}
</style>
```

## 🎭 Icons System

### **Nuxt Icon** - Iconify Integration

[**Official Documentation →**](https://icon.nuxt.com/)

- **Version**: `^1.13.0`
- **Icon Sets**: Heroicons (`^1.2.2`), Lucide (`^1.2.45`)
- **Usage**: Component-based icon system with auto-completion

```vue
<template>
  <!-- Heroicons -->
  <Icon name="i-heroicons-academic-cap" class="w-5 h-5" />
  <Icon name="i-heroicons-arrow-right" class="w-4 h-4" />

  <!-- Lucide icons -->
  <Icon name="i-lucide-book-open" class="w-5 h-5" />
  <Icon name="i-lucide-play-circle" class="w-6 h-6" />

  <!-- Custom icons from assets/icons/ -->
  <Icon name="custom:vue-logo" class="w-8 h-8" />
</template>
```

### **Custom Icons**

Located in `assets/icons/`:

- `learn.svg` - Platform learning icon
- `nuxt-logo.svg` - Nuxt framework logo
- `vue-logo.svg` - Vue.js logo

## 🌍 Internationalization

### **Nuxt I18n** - Multi-language Support

[**Official Documentation →**](https://i18n.nuxtjs.org/)

- **Version**: `^9.5.4`
- **Languages**: English (LTR) and Arabic (RTL)
- **Features**: Route localization, SEO optimization, cookie persistence

```vue
<script setup>
const { t, locale } = useI18n();
const localePath = useLocalePath();
</script>

<template>
  <div>
    <!-- Always use translation keys -->
    <h1>{{ $t("course.title") }}</h1>

    <!-- Always use localePath for navigation -->
    <NuxtLink :to="localePath('/courses')">
      {{ $t("navigation.courses") }}
    </NuxtLink>

    <!-- RTL-aware styling -->
    <div class="text-start rtl:text-right">
      {{ $t("course.description") }}
    </div>
  </div>
</template>
```

**Translation Structure** (`i18n/locales/`):

```json
{
  "platform": {
    "name": "Learnova Academy",
    "tagline": "Master Programming Skills"
  },
  "courses": {
    "title": "All Courses",
    "filter": "Filter Courses"
  },
  "course": {
    "overview": "Course Overview",
    "progress": "Progress"
  }
}
```

## 📝 Content Management

### **Nuxt Content** - File-based CMS

[**Official Documentation →**](https://content.nuxt.com/)

- **Version**: `^3.5.1`
- **Purpose**: Markdown-based content management with Vue components
- **Features**: MDC syntax, code highlighting, auto-imports

```vue
<script setup>
// Correct content fetching pattern
const { data: content } = await useAsyncData("content-key", () =>
  queryCollection("content").path("/dev-guide/overview").first()
);
</script>

<template>
  <div v-if="!content" class="loading-state">
    <p>{{ $t("common.loading") }}...</p>
  </div>

  <ContentRenderer v-if="content" :value="content" />
</template>
```

**Content Structure**:

```
content/
├── courses/[courseId]/[locale]/modules/[moduleId]/lessons/
├── dev-guide/
│   ├── overview.md
│   ├── getting-started.md
│   └── architecture.md
```

## � Code Snippet System

### **DevGuideCodeBlock** - Enhanced Code Display

Our platform features a sophisticated code snippet system built specifically for developer documentation and course content. The system provides beautiful syntax highlighting, professional styling, and an excellent user experience.

**Key Features**:

- 🎨 **Syntax Highlighting**: Powered by Shiki with GitHub Light/Dark themes
- 🔄 **Theme-Aware**: Automatically switches between light and dark modes
- 📋 **Copy Functionality**: One-click code copying with visual feedback
- 🖥️ **macOS-Style UI**: Professional window controls for enhanced aesthetics
- ⚡ **Progressive Enhancement**: Instant rendering with progressive syntax highlighting
- 🌍 **RTL Support**: Works seamlessly in both LTR and RTL layouts

### **Implementation Architecture**

#### **1. Syntax Highlighting Composable**

```typescript
// composables/useSyntaxHighlight.ts
import { createHighlighter, type BundledLanguage } from "shiki";

export const useSyntaxHighlight = () => {
  const highlightCode = async (
    code: string,
    language: BundledLanguage,
    theme: "github-light" | "github-dark"
  ): Promise<string> => {
    const highlighter = await initHighlighter();
    return highlighter.codeToHtml(code, { lang: language, theme });
  };

  const highlightCodeSync = (code: string, language: BundledLanguage) => {
    // Immediate fallback for SSR-safe rendering
    return `<pre class="shiki"><code class="language-${language}">${escapeHtml(code)}</code></pre>`;
  };
};
```

#### **2. DevGuideCodeBlock Component**

```vue
<script setup lang="ts">
import type { BundledLanguage } from "shiki";

interface Props {
  code: string;
  language?: BundledLanguage;
  title?: string;
  description?: string;
  filename?: string;
}

const props = withDefaults(defineProps<Props>(), {
  language: "typescript",
});

const { highlightCode, highlightCodeSync } = useSyntaxHighlight();
const { $colorMode } = useNuxtApp();

// Progressive enhancement: start with fallback, then enhance
onMounted(() => {
  highlightedCode.value = highlightCodeSync(props.code, props.language);
  nextTick(() => processCode());
});
</script>
```

#### **3. Usage in Content Files**

The component can be used in multiple ways throughout the platform:

**Direct Component Usage**:

```vue
<template>
  <DevGuideCodeBlock
    :code="codeExample"
    language="vue"
    title="Vue Component Example"
    description="Basic component structure with TypeScript"
    filename="MyComponent.vue"
  />
</template>
```

**Markdown Integration**:

````markdown
```vue
<script setup lang="ts">
interface Props {
  title: string;
  description?: string;
}

const props = withDefaults(defineProps<Props>(), {
  description: "Default description",
});
</script>
```
````

### **Styling & Theme System**

#### **Visual Design**

The code blocks feature a **macOS-inspired design** with:

- **Window Controls**: Red, yellow, green dots for authentic macOS feel
- **Clean Header**: File information and copy functionality
- **Professional Cards**: Rounded corners, shadows, and proper spacing
- **Responsive Layout**: Works seamlessly on all device sizes

#### **Color Themes**

```typescript
// Automatic theme switching based on user preference
const getTheme = () => {
  return $colorMode.value === "dark" ? "github-dark" : "github-light";
};
```

**Supported Languages**:

- Vue (`vue`)
- TypeScript (`typescript`)
- JavaScript (`javascript`)
- HTML (`html`)
- CSS (`css`)
- Bash/Shell (`bash`)
- JSON (`json`)
- Markdown (`markdown`)
- YAML (`yaml`)

### **Performance Optimizations**

#### **1. Progressive Enhancement**

```typescript
// Start with immediate fallback
onMounted(() => {
  // 1. Immediate rendering (no delay)
  highlightedCode.value = highlightCodeSync(props.code, props.language);

  // 2. Progressive enhancement
  nextTick(() => {
    processCode(); // Add syntax highlighting asynchronously
  });
});
```

#### **2. Singleton Highlighter**

```typescript
// Reuse highlighter instance across components
let highlighter: Highlighter | null = null;
let initPromise: Promise<Highlighter> | null = null;

const initHighlighter = async () => {
  if (highlighter) return highlighter;
  if (initPromise) return initPromise;

  initPromise = createHighlighter({
    themes: ["github-light", "github-dark"],
    langs: ["vue", "typescript", "javascript" /* ... */],
  });

  return initPromise;
};
```

#### **3. SSR-Safe Rendering**

```typescript
const escapeHtml = (text: string): string => {
  if (process.server) {
    // Server-side HTML escaping
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }
  // Client-side escaping
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
};
```

### **Copy-to-Clipboard System**

#### **Enhanced UX**

```vue
<template>
  <button @click="copyCode" class="copy-button">
    <!-- Dynamic icon based on copy state -->
    <svg v-if="!copied" class="copy-icon"><!-- Copy icon --></svg>
    <svg v-else class="success-icon"><!-- Check icon --></svg>
    <span>{{ copied ? "Copied!" : "Copy" }}</span>
  </button>
</template>

<script setup>
const copyCode = async () => {
  await navigator.clipboard.writeText(props.code);
  copied.value = true;
  setTimeout(() => (copied.value = false), 2000);
};
</script>
```

### **Integration Patterns**

#### **1. Dev Guide Content**

```vue
<!-- components/devGuide/DevGuideContent.vue -->
<DevGuideCodeBlock
  :code="vueComponentExample"
  language="vue"
  title="Vue Component Pattern"
  filename="components/Example.vue"
/>
```

#### **2. Course Lessons**

```vue
<!-- components/content/LessonRenderer.vue -->
<DevGuideCodeBlock
  :code="lesson.codeExample"
  :language="lesson.language"
  :description="lesson.codeDescription"
/>
```

#### **3. Documentation Pages**

```markdown
<!-- Direct usage in .md files -->

::dev-guide-code-block{language="typescript" title="TypeScript Interface"}
interface CourseModule {
id: string
title: Record<string, string>
lessons: CourseLesson[]
}
::
```

### **Best Practices**

#### **1. Language Selection**

```typescript
// Always specify the correct language for optimal highlighting
<DevGuideCodeBlock language="vue" />     // Vue SFC
<DevGuideCodeBlock language="typescript" /> // TS files
<DevGuideCodeBlock language="bash" />    // Terminal commands
```

#### **2. Code Organization**

```typescript
// Keep code examples in separate constants for maintainability
const codeExamples = {
  vueComponent: `<script setup lang="ts">
const { t } = useI18n()
<\/script>`, // Note: Escaped closing script tag

  typeInterface: `interface Props {
  title: string
  description?: string
}`,
};
```

#### **3. Accessibility**

- **Keyboard Navigation**: Copy button is keyboard accessible
- **Screen Readers**: Proper ARIA labels and semantic HTML
- **High Contrast**: Theme colors ensure sufficient contrast ratios
- **Focus Management**: Clear focus indicators for interactive elements

::callout{type="success"}
**Code System Summary**: Our code snippet system provides professional-grade syntax highlighting with excellent performance, beautiful design, and comprehensive language support. It's optimized for both developer experience and end-user interaction.
::

## �🖼️ Media & Assets

### **Nuxt Image** - Image Optimization

[**Official Documentation →**](https://image.nuxt.com/)

- **Version**: `^1.10.0`
- **Features**: Automatic image optimization, responsive images, lazy loading

```vue
<template>
  <!-- Optimized images -->
  <NuxtImg
    src="/course-vue-nuxt.jpg"
    alt="Vue Nuxt Course"
    width="400"
    height="300"
    loading="lazy"
    class="rounded-lg"
  />

  <!-- Responsive images -->
  <NuxtPicture
    src="/instructor-avatar.png"
    :img-attrs="{ class: 'rounded-full' }"
    sizes="sm:100px md:120px lg:150px"
  />
</template>
```

## 🛠️ Development Tools

### **ESLint** - Code Quality

[**Official Documentation →**](https://eslint.org/)

- **Version**: `^9.27.0`
- **Nuxt Integration**: `@nuxt/eslint ^1.4.1`
- **Purpose**: Code linting, formatting, and best practices enforcement

### **Better SQLite3** - Local Database

[**Official Documentation →**](https://github.com/WiseLibs/better-sqlite3)

- **Version**: `^12.2.0`
- **Purpose**: Local progress tracking and user data storage
- **Usage**: Course progress, bookmarks, notes storage

## 🧪 Testing & Quality

### **Nuxt Test Utils** - Testing Framework

[**Official Documentation →**](https://nuxt.com/docs/getting-started/testing)

- **Version**: `^3.19.1`
- **Purpose**: Component testing, E2E testing, and integration tests

## ⚡ Performance & SEO

### **Nuxt Scripts** - Script Optimization

[**Official Documentation →**](https://scripts.nuxt.com/)

- **Version**: `^0.11.7`
- **Purpose**: Third-party script optimization and loading strategies

### **Unhead** - Document Head Management

[**Official Documentation →**](https://unhead.unjs.io/)

- **Version**: `^2.0.10`
- **Purpose**: SEO optimization, meta tags, and structured data

```vue
<script setup>
const { t } = useI18n();

// SEO with i18n
useHead({
  title: t("page.meta.title"),
  meta: [
    { name: "description", content: t("page.meta.description") },
    { property: "og:title", content: t("page.meta.title") },
    { property: "og:description", content: t("page.meta.description") },
  ],
});
</script>
```
