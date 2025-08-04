---
title: "Development Stack Overview"
description: "Comprehensive guide to the technologies, tools, and libraries powering Learnova Academy learning platform."
---

# Development Stack & Technologies

Learnova Academy is built with a modern, cutting-edge technology stack that ensures performance, scalability, and excellent developer experience. This comprehensive overview details every tool and technology used in the project.

## 🚀 Core Framework

### **Nuxt 4** - Full-Stack Vue Framework

[**Official Documentation →**](https://nuxt.com/)

- **Version**: `^4.0.0`
- **Purpose**: Server-side rendering, static generation, and universal Vue applications
- **Key Features**: Auto-imports, file-based routing, built-in optimization

```vue
<!-- Example: Page auto-import -->
<script setup>
// Auto-imported composables
const { t } = useI18n();
const localePath = useLocalePath();
</script>
```

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

## 🖼️ Media & Assets

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

## 📦 Build & Deployment

### **Development Commands**

```bash
npm run dev              # Start development server
npm run build           # Production build
npm run generate        # Static site generation
npm run preview         # Preview production build
```

### **Project Structure**

```
learnova-academy/
├── app/                 # Nuxt 4 app directory
├── content/            # Content files
├── i18n/               # Translation files
├── config/             # Configuration files
├── types/              # TypeScript definitions
└── utils/              # Utility functions
```

::callout{type="success"}
**Stack Summary**: This technology stack provides excellent performance, developer experience, and scalability. All tools are production-ready and follow modern web development best practices.
::
