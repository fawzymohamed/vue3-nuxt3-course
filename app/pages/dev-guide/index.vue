<script setup lang="ts">
// Force English language for dev guide - English only
const { setLocale } = useI18n();
setLocale("en");

const localePath = useLocalePath();

// Development mode check
const isDev = process.dev;

// Redirect in production
if (!isDev) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
  });
}

// SEO - English only
useHead({
  title: "Developer Guide - Learnova Academy",
  meta: [
    {
      name: "description",
      content:
        "Comprehensive development guide for Learnova Academy learning platform",
    },
    { name: "robots", content: "noindex, nofollow" },
  ],
});

// Navigation sections - English only
const sections = ref([
  {
    id: "overview",
    title: "Project Overview",
    icon: "heroicons:document-text",
  },
  {
    id: "getting-started",
    title: "Getting Started",
    icon: "heroicons:rocket-launch",
  },
  {
    id: "architecture",
    title: "Architecture",
    icon: "heroicons:building-library",
  },
  {
    id: "course-management",
    title: "Course Management",
    icon: "heroicons:academic-cap",
  },
  {
    id: "content-management",
    title: "Content Management",
    icon: "heroicons:document-duplicate",
  },
  {
    id: "features",
    title: "Key Features",
    icon: "heroicons:star",
  },
  {
    id: "deployment",
    title: "Deployment",
    icon: "heroicons:cloud-arrow-up",
  },
  {
    id: "development",
    title: "Development Workflow",
    icon: "heroicons:code-bracket",
  },
  {
    id: "troubleshooting",
    title: "Troubleshooting",
    icon: "heroicons:wrench-screwdriver",
  },
]);

const activeSection = ref("overview");

// Smooth scroll to section
function scrollToSection(sectionId: string) {
  activeSection.value = sectionId;
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
</script>

<template>
  <div class="min-h-screen bg-background">
    <UContainer class="py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-foreground mb-4">Developer Guide</h1>
        <p class="text-lg text-muted-foreground">
          Comprehensive guide to developing and maintaining the Learnova Academy
          platform
        </p>
        <div class="mt-4 p-4 bg-warning/10 border border-warning rounded-lg">
          <p class="text-sm text-warning-foreground">
            <Icon
              name="heroicons:exclamation-triangle"
              class="w-4 h-4 inline mr-2"
            />
            This development guide is only available in development mode
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Navigation Sidebar -->
        <aside class="lg:col-span-1">
          <div class="sticky top-8">
            <h2 class="text-lg font-semibold mb-4 text-foreground">Contents</h2>
            <nav class="space-y-2">
              <button
                v-for="section in sections"
                :key="section.id"
                @click="scrollToSection(section.id)"
                :class="[
                  'w-full text-left px-3 py-2 rounded-md transition-colors flex items-center gap-2',
                  activeSection === section.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted',
                ]"
              >
                <Icon :name="section.icon" class="w-4 h-4" />
                <span class="text-sm">{{ section.title }}</span>
              </button>
            </nav>
          </div>
        </aside>

        <!-- Main Content -->
        <main class="lg:col-span-3">
          <UCard class="divide-y divide-border">
            <!-- Project Overview -->
            <section id="overview" class="p-6">
              <h2
                class="text-2xl font-bold mb-4 flex items-center gap-2 text-foreground"
              >
                <Icon name="heroicons:document-text" class="w-6 h-6" />
                Project Overview
              </h2>
              <div class="space-y-4 text-muted-foreground">
                <p>
                  Learnova Academy is a modern, multilingual learning management
                  system built with cutting-edge web technologies. The platform
                  supports both English and Arabic languages with comprehensive
                  course management capabilities.
                </p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="bg-muted p-4 rounded-lg">
                    <h3 class="font-semibold mb-2 text-foreground">
                      Tech Stack
                    </h3>
                    <ul class="text-sm space-y-1">
                      <li>• Nuxt 4 (Vue 3 + TypeScript)</li>
                      <li>• Nuxt Content for course content</li>
                      <li>• Nuxt I18n for multilingual support</li>
                      <li>• Nuxt UI for component library</li>
                    </ul>
                  </div>
                  <div class="bg-muted p-4 rounded-lg">
                    <h3 class="font-semibold mb-2 text-foreground">
                      Key Features
                    </h3>
                    <ul class="text-sm space-y-1">
                      <li>• Multi-language support (EN/AR)</li>
                      <li>• Course progress tracking</li>
                      <li>• Responsive design</li>
                      <li>• SEO optimized</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <!-- Getting Started -->
            <section id="getting-started" class="p-6">
              <h2
                class="text-2xl font-bold mb-4 flex items-center gap-2 text-foreground"
              >
                <Icon name="heroicons:rocket-launch" class="w-6 h-6" />
                Getting Started
              </h2>
              <div class="space-y-4 text-muted-foreground">
                <h3 class="text-lg font-semibold text-foreground">
                  Prerequisites
                </h3>
                <ul class="list-disc list-inside space-y-1">
                  <li>Node.js 18+ installed</li>
                  <li>npm or yarn package manager</li>
                  <li>Basic knowledge of Vue.js and TypeScript</li>
                </ul>

                <h3 class="text-lg font-semibold text-foreground">
                  Installation
                </h3>
                <div class="bg-muted p-4 rounded-lg">
                  <pre class="text-sm"><code># Clone the repository
git clone [repository-url]
cd learnova-academy

# Install dependencies
npm install

# Start development server
npm run dev</code></pre>
                </div>

                <h3 class="text-lg font-semibold text-foreground">
                  Environment Setup
                </h3>
                <p>
                  The development server will be available at
                  <code class="bg-muted px-2 py-1 rounded"
                    >http://localhost:3000</code
                  >
                </p>
              </div>
            </section>

            <!-- Architecture -->
            <section id="architecture" class="p-6">
              <h2
                class="text-2xl font-bold mb-4 flex items-center gap-2 text-foreground"
              >
                <Icon name="heroicons:building-library" class="w-6 h-6" />
                Architecture
              </h2>
              <div class="space-y-4 text-muted-foreground">
                <h3 class="text-lg font-semibold text-foreground">
                  Directory Structure
                </h3>
                <div class="bg-muted p-4 rounded-lg">
                  <pre class="text-sm"><code>learnova-academy/
├── app/
│   ├── components/      # Reusable Vue components
│   ├── composables/     # Vue composables
│   ├── pages/          # Page components (routing)
│   └── assets/         # Static assets
├── content/
│   └── courses/        # Course content (Markdown)
├── i18n/
│   └── locales/        # Translation files
├── config/             # Configuration files
├── types/              # TypeScript type definitions
└── utils/              # Utility functions</code></pre>
                </div>

                <h3 class="text-lg font-semibold text-foreground">
                  Key Architectural Patterns
                </h3>
                <ul class="list-disc list-inside space-y-1">
                  <li>
                    <strong>Composables:</strong> Reusable logic for course
                    management and progress tracking
                  </li>
                  <li>
                    <strong>Component Architecture:</strong> Modular, reusable
                    components with TypeScript
                  </li>
                  <li>
                    <strong>Content Management:</strong> Markdown-based course
                    content with frontmatter
                  </li>
                  <li>
                    <strong>Internationalization:</strong> Vue I18n for
                    multilingual support
                  </li>
                </ul>
              </div>
            </section>

            <!-- Course Management -->
            <section id="course-management" class="p-6">
              <h2
                class="text-2xl font-bold mb-4 flex items-center gap-2 text-foreground"
              >
                <Icon name="heroicons:academic-cap" class="w-6 h-6" />
                Course Management
              </h2>
              <div class="space-y-4 text-muted-foreground">
                <h3 class="text-lg font-semibold text-foreground">
                  Course Configuration
                </h3>
                <p>
                  Courses are configured in
                  <code class="bg-muted px-2 py-1 rounded"
                    >config/courses.ts</code
                  >
                  with metadata including:
                </p>
                <ul class="list-disc list-inside space-y-1 ml-4">
                  <li>Course ID and title</li>
                  <li>Description and objectives</li>
                  <li>Instructor information</li>
                  <li>Module structure</li>
                  <li>Prerequisites and difficulty level</li>
                </ul>

                <h3 class="text-lg font-semibold text-foreground">
                  Content Structure
                </h3>
                <div class="bg-muted p-4 rounded-lg">
                  <pre class="text-sm"><code>content/courses/[course-id]/
├── [locale]/
│   ├── index.md         # Course overview
│   ├── modules/
│   │   ├── module-1/
│   │   │   ├── index.md
│   │   │   ├── lesson-1.md
│   │   │   └── lesson-2.md
│   │   └── module-2/
│   └── resources/       # Additional resources</code></pre>
                </div>

                <h3 class="text-lg font-semibold text-foreground">
                  Course Registry
                </h3>
                <p>
                  The
                  <code class="bg-muted px-2 py-1 rounded"
                    >useCourseRegistry</code
                  >
                  composable manages course data and provides methods for:
                </p>
                <ul class="list-disc list-inside space-y-1 ml-4">
                  <li>Course validation and registration</li>
                  <li>Module and lesson discovery</li>
                  <li>Progress tracking integration</li>
                </ul>
              </div>
            </section>

            <!-- Content Management -->
            <section id="content-management" class="p-6">
              <h2
                class="text-2xl font-bold mb-4 flex items-center gap-2 text-foreground"
              >
                <Icon name="heroicons:document-duplicate" class="w-6 h-6" />
                Content Management
              </h2>
              <div class="space-y-4 text-muted-foreground">
                <h3 class="text-lg font-semibold text-foreground">
                  Nuxt Content Integration
                </h3>
                <p>
                  Content is managed using Nuxt Content with Markdown files
                  supporting:
                </p>
                <ul class="list-disc list-inside space-y-1 ml-4">
                  <li>Frontmatter for metadata</li>
                  <li>MDC (Markdown Components) for enhanced content</li>
                  <li>Automatic content parsing and navigation</li>
                  <li>Full-text search capabilities</li>
                </ul>

                <h3 class="text-lg font-semibold text-foreground">
                  Content Components
                </h3>
                <p>Custom components for enhanced content presentation:</p>
                <ul class="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <code class="bg-muted px-2 py-1 rounded">CodeExample</code>
                    - Interactive code snippets
                  </li>
                  <li>
                    <code class="bg-muted px-2 py-1 rounded">Callout</code> -
                    Highlighted information blocks
                  </li>
                  <li>
                    <code class="bg-muted px-2 py-1 rounded">FeatureList</code>
                    - Feature showcases
                  </li>
                  <li>
                    <code class="bg-muted px-2 py-1 rounded"
                      >LessonActions</code
                    >
                    - Navigation and progress controls
                  </li>
                </ul>

                <h3 class="text-lg font-semibold text-foreground">
                  Frontmatter Schema
                </h3>
                <div class="bg-muted p-4 rounded-lg">
                  <pre class="text-sm"><code>---
title: "Lesson Title"
description: "Lesson description"
duration: 30
objectives:
  - "Learning objective 1"
  - "Learning objective 2"
prerequisite: "previous-lesson"
---</code></pre>
                </div>
              </div>
            </section>

            <!-- Key Features -->
            <section id="features" class="p-6">
              <h2
                class="text-2xl font-bold mb-4 flex items-center gap-2 text-foreground"
              >
                <Icon name="heroicons:star" class="w-6 h-6" />
                Key Features
              </h2>
              <div class="space-y-4 text-muted-foreground">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 class="text-lg font-semibold mb-2 text-foreground">
                      Multilingual Support
                    </h3>
                    <ul class="list-disc list-inside space-y-1 text-sm">
                      <li>English and Arabic languages</li>
                      <li>RTL support for Arabic</li>
                      <li>Locale-specific routing</li>
                      <li>Content translation management</li>
                    </ul>
                  </div>

                  <div>
                    <h3 class="text-lg font-semibold mb-2 text-foreground">
                      Progress Tracking
                    </h3>
                    <ul class="list-disc list-inside space-y-1 text-sm">
                      <li>Lesson completion tracking</li>
                      <li>Module progress calculation</li>
                      <li>Course completion certificates</li>
                      <li>Learning analytics</li>
                    </ul>
                  </div>

                  <div>
                    <h3 class="text-lg font-semibold mb-2 text-foreground">
                      Interactive Learning
                    </h3>
                    <ul class="list-disc list-inside space-y-1 text-sm">
                      <li>Interactive code examples</li>
                      <li>Hands-on exercises</li>
                      <li>Video content integration</li>
                      <li>Quiz and assessment system</li>
                    </ul>
                  </div>

                  <div>
                    <h3 class="text-lg font-semibold mb-2 text-foreground">
                      User Experience
                    </h3>
                    <ul class="list-disc list-inside space-y-1 text-sm">
                      <li>Responsive design</li>
                      <li>Dark/light mode support</li>
                      <li>Accessible navigation</li>
                      <li>Fast page loading</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <!-- Deployment -->
            <section id="deployment" class="p-6">
              <h2
                class="text-2xl font-bold mb-4 flex items-center gap-2 text-foreground"
              >
                <Icon name="heroicons:cloud-arrow-up" class="w-6 h-6" />
                Deployment
              </h2>
              <div class="space-y-4 text-muted-foreground">
                <h3 class="text-lg font-semibold text-foreground">
                  Vercel Deployment
                </h3>
                <p>
                  The platform is optimized for Vercel deployment with
                  configuration in
                  <code class="bg-muted px-2 py-1 rounded">vercel.json</code>:
                </p>
                <div class="bg-muted p-4 rounded-lg">
                  <pre class="text-sm"><code># Build for production
npm run build

# Preview locally
npm run preview

# Deploy to Vercel
vercel --prod</code></pre>
                </div>

                <h3 class="text-lg font-semibold text-foreground">
                  Environment Variables
                </h3>
                <ul class="list-disc list-inside space-y-1">
                  <li>
                    <code class="bg-muted px-2 py-1 rounded"
                      >NUXT_PUBLIC_SITE_URL</code
                    >
                    - Public site URL
                  </li>
                  <li>
                    <code class="bg-muted px-2 py-1 rounded"
                      >NUXT_I18N_DEFAULT_LOCALE</code
                    >
                    - Default language
                  </li>
                </ul>

                <h3 class="text-lg font-semibold text-foreground">
                  Performance Optimizations
                </h3>
                <ul class="list-disc list-inside space-y-1">
                  <li>Static site generation (SSG) for course content</li>
                  <li>Image optimization with Nuxt Image</li>
                  <li>Code splitting and lazy loading</li>
                  <li>Content delivery network (CDN) integration</li>
                </ul>
              </div>
            </section>

            <!-- Development Workflow -->
            <section id="development" class="p-6">
              <h2
                class="text-2xl font-bold mb-4 flex items-center gap-2 text-foreground"
              >
                <Icon name="heroicons:code-bracket" class="w-6 h-6" />
                Development Workflow
              </h2>
              <div class="space-y-4 text-muted-foreground">
                <h3 class="text-lg font-semibold text-foreground">
                  Development Scripts
                </h3>
                <div class="bg-muted p-4 rounded-lg">
                  <pre class="text-sm"><code># Start development server
npm run dev

# Type checking
npm run type-check

# Linting
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview</code></pre>
                </div>

                <h3 class="text-lg font-semibold text-foreground">
                  Code Quality
                </h3>
                <ul class="list-disc list-inside space-y-1">
                  <li>ESLint for code linting</li>
                  <li>TypeScript for type safety</li>
                  <li>Prettier for code formatting</li>
                  <li>Husky for git hooks</li>
                </ul>

                <h3 class="text-lg font-semibold text-foreground">
                  Development Guidelines
                </h3>
                <ul class="list-disc list-inside space-y-1">
                  <li>Use TypeScript for all new components</li>
                  <li>Follow Vue 3 Composition API patterns</li>
                  <li>Implement responsive design from mobile-first</li>
                  <li>Ensure accessibility compliance</li>
                  <li>Write comprehensive documentation</li>
                </ul>
              </div>
            </section>

            <!-- Troubleshooting -->
            <section id="troubleshooting" class="p-6">
              <h2
                class="text-2xl font-bold mb-4 flex items-center gap-2 text-foreground"
              >
                <Icon name="heroicons:wrench-screwdriver" class="w-6 h-6" />
                Troubleshooting
              </h2>
              <div class="space-y-4 text-muted-foreground">
                <h3 class="text-lg font-semibold text-foreground">
                  Common Issues
                </h3>

                <div class="space-y-4">
                  <div class="border border-border rounded-lg p-4">
                    <h4 class="font-semibold mb-2 text-foreground">
                      Build Errors
                    </h4>
                    <p class="text-sm">If you encounter build errors:</p>
                    <ul class="list-disc list-inside text-sm mt-2 space-y-1">
                      <li>
                        Clear the
                        <code class="bg-muted px-1 rounded">.nuxt</code>
                        directory
                      </li>
                      <li>
                        Delete
                        <code class="bg-muted px-1 rounded">node_modules</code>
                        and reinstall
                      </li>
                      <li>
                        Check TypeScript errors with
                        <code class="bg-muted px-1 rounded"
                          >npm run type-check</code
                        >
                      </li>
                    </ul>
                  </div>

                  <div class="border border-border rounded-lg p-4">
                    <h4 class="font-semibold mb-2 text-foreground">
                      Content Not Loading
                    </h4>
                    <p class="text-sm">If course content doesn't load:</p>
                    <ul class="list-disc list-inside text-sm mt-2 space-y-1">
                      <li>
                        Verify content file paths match the expected structure
                      </li>
                      <li>Check frontmatter syntax in Markdown files</li>
                      <li>
                        Ensure course is registered in
                        <code class="bg-muted px-1 rounded"
                          >config/courses.ts</code
                        >
                      </li>
                    </ul>
                  </div>

                  <div class="border border-border rounded-lg p-4">
                    <h4 class="font-semibold mb-2 text-foreground">
                      Translation Issues
                    </h4>
                    <p class="text-sm">If translations aren't working:</p>
                    <ul class="list-disc list-inside text-sm mt-2 space-y-1">
                      <li>Check translation keys in locale files</li>
                      <li>
                        Verify i18n configuration in
                        <code class="bg-muted px-1 rounded"
                          >nuxt.config.ts</code
                        >
                      </li>
                      <li>Clear browser cache and restart dev server</li>
                    </ul>
                  </div>
                </div>

                <h3 class="text-lg font-semibold text-foreground">
                  Getting Help
                </h3>
                <p>For additional support:</p>
                <ul class="list-disc list-inside space-y-1">
                  <li>Check the official Nuxt documentation</li>
                  <li>Review component source code for usage examples</li>
                  <li>Use browser dev tools for debugging</li>
                  <li>Check console for error messages</li>
                </ul>
              </div>
            </section>
          </UCard>
        </main>
      </div>
    </UContainer>
  </div>
</template>

<style scoped>
code {
  background-color: hsl(var(--muted));
  padding: 0.125rem 0.25rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
}

pre code {
  background: none;
  padding: 0;
}

.dark code {
  background-color: hsl(var(--muted));
}
</style>
