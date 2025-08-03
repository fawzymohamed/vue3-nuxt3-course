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

// Switch to selected section
function selectSection(sectionId: string) {
  activeSection.value = sectionId;
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
        <hr class="my-4" />
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Navigation Sidebar -->
        <aside class="lg:col-span-1">
          <div class="sticky top-8">
            <h2 class="text-lg font-semibold mb-4 text-foreground">Contents</h2>
            <nav class="space-y-1">
              <button
                v-for="section in sections"
                :key="section.id"
                @click="selectSection(section.id)"
                :class="[
                  'w-full text-left px-3 py-2 rounded-md transition-colors flex items-center gap-3 text-sm',
                  activeSection === section.id
                    ? 'bg-primary/10 text-primary border-l-2 border-primary font-medium'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50',
                ]"
              >
                <Icon :name="section.icon" class="w-4 h-4 flex-shrink-0" />
                <span>{{ section.title }}</span>
              </button>
            </nav>
          </div>
        </aside>

        <!-- Main Content -->
        <main class="lg:col-span-3">
          <div class="prose prose-gray dark:prose-invert max-w-none">
            <!-- Project Overview -->
            <div v-if="activeSection === 'overview'">
              <h1 class="flex items-center gap-3 mb-6">
                <Icon
                  name="heroicons:document-text"
                  class="w-8 h-8 text-primary"
                />
                Project Overview
              </h1>

              <p class="text-lg text-muted-foreground mb-6">
                Learnova Academy is a modern, multilingual learning management
                system built with cutting-edge web technologies. The platform
                supports both English and Arabic languages with comprehensive
                course management capabilities.
              </p>

              <h2>Tech Stack</h2>
              <ul>
                <li>
                  <strong>Nuxt 4</strong> - Vue 3 framework with TypeScript
                  support
                </li>
                <li>
                  <strong>Nuxt Content</strong> - File-based content management
                  system
                </li>
                <li>
                  <strong>Nuxt I18n</strong> - Comprehensive
                  internationalization support
                </li>
                <li><strong>Nuxt UI</strong> - Modern component library</li>
              </ul>

              <h2>Key Features</h2>
              <ul>
                <li>
                  <strong>Multi-language support</strong> - Full English/Arabic
                  with RTL
                </li>
                <li>
                  <strong>Course progress tracking</strong> - Comprehensive
                  learning analytics
                </li>
                <li>
                  <strong>Responsive design</strong> - Mobile-first approach
                </li>
                <li>
                  <strong>SEO optimized</strong> - Built-in SEO best practices
                </li>
              </ul>

              <div
                class="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4 my-6"
              >
                <div class="flex items-start gap-3">
                  <Icon
                    name="heroicons:information-circle"
                    class="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0"
                  />
                  <div>
                    <p class="text-sm text-blue-800 dark:text-blue-200 m-0">
                      This platform prioritizes user experience, type safety,
                      internationalization, and scalable course management.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Getting Started -->
            <div v-else-if="activeSection === 'getting-started'">
              <h1 class="flex items-center gap-3 mb-6">
                <Icon
                  name="heroicons:rocket-launch"
                  class="w-8 h-8 text-primary"
                />
                Getting Started
              </h1>

              <p class="text-lg text-muted-foreground mb-6">
                Follow these steps to set up your development environment and
                start working with the Learnova Academy platform.
              </p>

              <h2>Prerequisites</h2>
              <ul>
                <li>Node.js 18+ installed</li>
                <li>npm or yarn package manager</li>
                <li>Basic knowledge of Vue.js and TypeScript</li>
              </ul>

              <h2>Installation</h2>
              <div
                class="bg-gray-50 dark:bg-gray-900 border rounded-lg p-4 my-4"
              >
                <pre
                  class="text-sm overflow-x-auto"
                ><code># Clone the repository
git clone [repository-url]
cd learnova-academy

# Install dependencies
npm install

# Start development server
npm run dev</code></pre>
              </div>

              <h2>Environment Setup</h2>
              <p>
                The development server will be available at
                <code>http://localhost:3000</code>
              </p>

              <div
                class="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg p-4 my-6"
              >
                <div class="flex items-start gap-3">
                  <Icon
                    name="heroicons:check-circle"
                    class="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0"
                  />
                  <div>
                    <p class="text-sm text-green-800 dark:text-green-200 m-0">
                      <strong>Success!</strong> Your development environment is
                      now ready. You can start building amazing learning
                      experiences.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Architecture -->
            <div v-else-if="activeSection === 'architecture'">
              <h1 class="flex items-center gap-3 mb-6">
                <Icon
                  name="heroicons:building-library"
                  class="w-8 h-8 text-primary"
                />
                Architecture
              </h1>

              <p class="text-lg text-muted-foreground mb-6">
                Understanding the architectural patterns and directory structure
                of the Learnova Academy platform.
              </p>

              <h2>Directory Structure</h2>
              <div
                class="bg-gray-50 dark:bg-gray-900 border rounded-lg p-4 my-4"
              >
                <pre class="text-sm overflow-x-auto"><code>learnova-academy/
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

              <h2>Key Architectural Patterns</h2>
              <ul>
                <li>
                  <strong>Composables</strong> - Reusable logic for course
                  management and progress tracking
                </li>
                <li>
                  <strong>Component Architecture</strong> - Modular, reusable
                  components with TypeScript
                </li>
                <li>
                  <strong>Content Management</strong> - Markdown-based course
                  content with frontmatter
                </li>
                <li>
                  <strong>Internationalization</strong> - Vue I18n for
                  multilingual support
                </li>
              </ul>
            </div>

            <!-- Course Management -->
            <div v-else-if="activeSection === 'course-management'">
              <h1 class="flex items-center gap-3 mb-6">
                <Icon
                  name="heroicons:academic-cap"
                  class="w-8 h-8 text-primary"
                />
                Course Management
              </h1>

              <p class="text-lg text-muted-foreground mb-6">
                Learn how to configure, manage, and structure courses within the
                platform.
              </p>

              <h2>Course Configuration</h2>
              <p>
                Courses are configured in <code>config/courses.ts</code> with
                metadata including:
              </p>
              <ul>
                <li>Course ID and title</li>
                <li>Description and objectives</li>
                <li>Instructor information</li>
                <li>Module structure</li>
                <li>Prerequisites and difficulty level</li>
              </ul>

              <h2>Content Structure</h2>
              <div
                class="bg-gray-50 dark:bg-gray-900 border rounded-lg p-4 my-4"
              >
                <pre
                  class="text-sm overflow-x-auto"
                ><code>content/courses/[course-id]/
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

              <h2>Course Registry</h2>
              <p>
                The <code>useCourseRegistry</code> composable manages course
                data and provides methods for:
              </p>
              <ul>
                <li>Course validation and registration</li>
                <li>Module and lesson discovery</li>
                <li>Progress tracking integration</li>
              </ul>
            </div>

            <!-- Content Management -->
            <div v-else-if="activeSection === 'content-management'">
              <h1 class="flex items-center gap-3 mb-6">
                <Icon
                  name="heroicons:document-duplicate"
                  class="w-8 h-8 text-primary"
                />
                Content Management
              </h1>

              <p class="text-lg text-muted-foreground mb-6">
                Comprehensive guide to managing and structuring content using
                Nuxt Content.
              </p>

              <h2>Nuxt Content Integration</h2>
              <p>
                Content is managed using Nuxt Content with Markdown files
                supporting:
              </p>
              <ul>
                <li>Frontmatter for metadata</li>
                <li>MDC (Markdown Components) for enhanced content</li>
                <li>Automatic content parsing and navigation</li>
                <li>Full-text search capabilities</li>
              </ul>

              <h2>Content Components</h2>
              <p>Custom components for enhanced content presentation:</p>
              <ul>
                <li><code>CodeExample</code> - Interactive code snippets</li>
                <li><code>Callout</code> - Highlighted information blocks</li>
                <li><code>FeatureList</code> - Feature showcases</li>
                <li>
                  <code>LessonActions</code> - Navigation and progress controls
                </li>
              </ul>

              <h2>Frontmatter Schema</h2>
              <div
                class="bg-gray-50 dark:bg-gray-900 border rounded-lg p-4 my-4"
              >
                <pre class="text-sm overflow-x-auto"><code>---
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

            <!-- Key Features -->
            <div v-else-if="activeSection === 'features'">
              <h1 class="flex items-center gap-3 mb-6">
                <Icon name="heroicons:star" class="w-8 h-8 text-primary" />
                Key Features
              </h1>

              <p class="text-lg text-muted-foreground mb-6">
                Explore the powerful features that make Learnova Academy a
                comprehensive learning platform.
              </p>

              <h2>Multilingual Support</h2>
              <ul>
                <li>English and Arabic languages</li>
                <li>RTL support for Arabic</li>
                <li>Locale-specific routing</li>
                <li>Content translation management</li>
              </ul>

              <h2>Progress Tracking</h2>
              <ul>
                <li>Lesson completion tracking</li>
                <li>Module progress calculation</li>
                <li>Course completion certificates</li>
                <li>Learning analytics</li>
              </ul>

              <h2>Interactive Learning</h2>
              <ul>
                <li>Interactive code examples</li>
                <li>Hands-on exercises</li>
                <li>Video content integration</li>
                <li>Quiz and assessment system</li>
              </ul>

              <h2>User Experience</h2>
              <ul>
                <li>Responsive design</li>
                <li>Dark/light mode support</li>
                <li>Accessible navigation</li>
                <li>Fast page loading</li>
              </ul>
            </div>

            <!-- Deployment -->
            <div v-else-if="activeSection === 'deployment'">
              <h1 class="flex items-center gap-3 mb-6">
                <Icon
                  name="heroicons:cloud-arrow-up"
                  class="w-8 h-8 text-primary"
                />
                Deployment
              </h1>

              <p class="text-lg text-muted-foreground mb-6">
                Deploy your Learnova Academy platform to production with these
                deployment strategies.
              </p>

              <h2>Vercel Deployment</h2>
              <p>
                The platform is optimized for Vercel deployment with
                configuration in <code>vercel.json</code>:
              </p>
              <div
                class="bg-gray-50 dark:bg-gray-900 border rounded-lg p-4 my-4"
              >
                <pre
                  class="text-sm overflow-x-auto"
                ><code># Build for production
npm run build

# Preview locally
npm run preview

# Deploy to Vercel
vercel --prod</code></pre>
              </div>

              <h2>Environment Variables</h2>
              <ul>
                <li><code>NUXT_PUBLIC_SITE_URL</code> - Public site URL</li>
                <li>
                  <code>NUXT_I18N_DEFAULT_LOCALE</code> - Default language
                </li>
              </ul>

              <h2>Performance Optimizations</h2>
              <ul>
                <li>Static site generation (SSG) for course content</li>
                <li>Image optimization with Nuxt Image</li>
                <li>Code splitting and lazy loading</li>
                <li>Content delivery network (CDN) integration</li>
              </ul>
            </div>

            <!-- Development Workflow -->
            <div v-else-if="activeSection === 'development'">
              <h1 class="flex items-center gap-3 mb-6">
                <Icon
                  name="heroicons:code-bracket"
                  class="w-8 h-8 text-primary"
                />
                Development Workflow
              </h1>

              <p class="text-lg text-muted-foreground mb-6">
                Best practices and workflows for developing and maintaining the
                platform.
              </p>

              <h2>Development Scripts</h2>
              <div
                class="bg-gray-50 dark:bg-gray-900 border rounded-lg p-4 my-4"
              >
                <pre
                  class="text-sm overflow-x-auto"
                ><code># Start development server
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

              <h2>Code Quality</h2>
              <ul>
                <li>ESLint for code linting</li>
                <li>TypeScript for type safety</li>
                <li>Prettier for code formatting</li>
                <li>Husky for git hooks</li>
              </ul>

              <h2>Development Guidelines</h2>
              <ul>
                <li>Use TypeScript for all new components</li>
                <li>Follow Vue 3 Composition API patterns</li>
                <li>Implement responsive design from mobile-first</li>
                <li>Ensure accessibility compliance</li>
                <li>Write comprehensive documentation</li>
              </ul>
            </div>

            <!-- Troubleshooting -->
            <div v-else-if="activeSection === 'troubleshooting'">
              <h1 class="flex items-center gap-3 mb-6">
                <Icon
                  name="heroicons:wrench-screwdriver"
                  class="w-8 h-8 text-primary"
                />
                Troubleshooting
              </h1>

              <p class="text-lg text-muted-foreground mb-6">
                Common issues and their solutions when working with the
                platform.
              </p>

              <h2>Common Issues</h2>

              <h3>Build Errors</h3>
              <p>If you encounter build errors:</p>
              <ul>
                <li>Clear the <code>.nuxt</code> directory</li>
                <li>Delete <code>node_modules</code> and reinstall</li>
                <li>
                  Check TypeScript errors with <code>npm run type-check</code>
                </li>
              </ul>

              <h3>Content Not Loading</h3>
              <p>If course content doesn't load:</p>
              <ul>
                <li>Verify content file paths match the expected structure</li>
                <li>Check frontmatter syntax in Markdown files</li>
                <li>
                  Ensure course is registered in <code>config/courses.ts</code>
                </li>
              </ul>

              <h3>Translation Issues</h3>
              <p>If translations aren't working:</p>
              <ul>
                <li>Check translation keys in locale files</li>
                <li>
                  Verify i18n configuration in <code>nuxt.config.ts</code>
                </li>
                <li>Clear browser cache and restart dev server</li>
              </ul>

              <h2>Getting Help</h2>
              <p>For additional support:</p>
              <ul>
                <li>Check the official Nuxt documentation</li>
                <li>Review component source code for usage examples</li>
                <li>Use browser dev tools for debugging</li>
                <li>Check console for error messages</li>
              </ul>

              <div
                class="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6"
              >
                <div class="flex items-start gap-3">
                  <Icon
                    name="heroicons:light-bulb"
                    class="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0"
                  />
                  <div>
                    <p class="text-sm text-amber-800 dark:text-amber-200 m-0">
                      <strong>Tip:</strong> Most issues can be resolved by
                      ensuring your development environment matches the
                      requirements and following the coding guidelines.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
