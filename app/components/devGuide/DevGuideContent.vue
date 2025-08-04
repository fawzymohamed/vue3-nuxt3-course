<script setup lang="ts">
interface Props {
  content: any;
  sectionId: string;
}

const props = defineProps<Props>();

// Check if content is loading
const isLoading = computed(() => !props.content);

// Content metadata
const contentMeta = computed(() => {
  if (!props.content) return null;

  const content = props.content as any;
  return {
    title: content.title,
    path: content._path,
    updatedAt: content._updatedAt,
    createdAt: content._createdAt,
  };
});

// Parse content for structured rendering
const structuredContent = computed(() => {
  if (!props.content?.body) return null;

  // For now, we'll use the existing ContentRenderer
  // Later we can add parsing logic to convert markdown to our components
  return props.content;
});

// Code examples to avoid template parsing issues
const codeExamples = {
  nuxtAutoImport: `<!-- Example: Page auto-import -->
<script setup>
// Auto-imported composables
const { t } = useI18n()
const localePath = useLocalePath()
<\/script>`,

  vueSetupPattern: `<script setup lang="ts">
interface Props {
  title: string
  description?: string
}

const props = withDefaults(defineProps<Props>(), {
  description: 'Default description'
})
<\/script>`,

  nuxtUIUsage: `<template>
  <UContainer>
    <UCard>
      <template #header>
        <h3>{{ $t('course.title') }}</h3>
      </template>
      
      <UButton 
        :to="localePath('/courses')" 
        variant="solid" 
        color="primary"
        icon="i-heroicons-academic-cap"
      >
        {{ $t('navigation.viewCourses') }}
      </UButton>
    </UCard>
  </UContainer>
</template>`,

  rtlStyling: `<template>
  <!-- RTL-friendly classes -->
  <div class="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-sm">
    <div class="flex items-center gap-4 mb-4">
      <div class="flex-shrink-0">
        <UAvatar :src="instructor.avatar" :alt="instructor.name" />
      </div>
      <div class="flex-1 min-w-0">
        <h3 class="text-lg font-semibold truncate">{{ instructor.name }}</h3>
        <p class="text-gray-600 dark:text-gray-400 text-sm">{{ instructor.title }}</p>
      </div>
    </div>
  </div>
</template>`,

  iconUsage: `<template>
  <!-- Heroicons -->
  <Icon name="i-heroicons-academic-cap" class="w-5 h-5" />
  <Icon name="i-heroicons-arrow-right" class="w-4 h-4" />
  
  <!-- Lucide icons -->
  <Icon name="i-lucide-book-open" class="w-5 h-5" />
  <Icon name="i-lucide-play-circle" class="w-6 h-6" />
  
  <!-- Custom icons from assets/icons/ -->
  <Icon name="custom:vue-logo" class="w-8 h-8" />
</template>`,

  fontImplementation: `/* Fonts are automatically optimized */
.heading {
  font-family: 'Inter', sans-serif; /* Auto-optimized */
}

.arabic-text {
  font-family: 'Noto Sans Arabic', sans-serif; /* RTL support */
}`,

  i18nImplementation: `<script setup>
const { t, locale } = useI18n()
const localePath = useLocalePath()
<\/script>

<template>
  <div>
    <!-- Always use translation keys -->
    <h1>{{ $t('course.title') }}</h1>
    
    <!-- Always use localePath for navigation -->
    <NuxtLink :to="localePath('/courses')">
      {{ $t('navigation.courses') }}
    </NuxtLink>
    
    <!-- RTL-aware styling -->
    <div class="text-start rtl:text-right">
      {{ $t('course.description') }}
    </div>
  </div>
</template>`,

  contentFetching: `<script setup>
// Correct content fetching pattern
const { data: content } = await useAsyncData('content-key', () =>
  queryCollection("content").path("/dev-guide/overview").first()
)
<\/script>

<template>
  <div v-if="!content" class="loading-state">
    <p>{{ $t('common.loading') }}...</p>
  </div>
  
  <ContentRenderer v-if="content" :value="content" />
</template>`,

  optimizedImages: `<template>
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
</template>`,

  seoWithI18n: `<script setup>
const { t } = useI18n()

// SEO with i18n
useHead({
  title: t('page.meta.title'),
  meta: [
    { name: 'description', content: t('page.meta.description') },
    { property: 'og:title', content: t('page.meta.title') },
    { property: 'og:description', content: t('page.meta.description') }
  ]
})
<\/script>`,

  projectStructure: `learnova-academy/
├── app/                 # Nuxt 4 app directory
│   ├── components/      # Vue components
│   ├── composables/     # Composition functions
│   ├── pages/          # File-based routing
│   └── assets/         # Static assets
├── content/            # Content files
│   └── courses/        # Course content
├── i18n/               # Translation files
├── config/             # Configuration files
├── types/              # TypeScript definitions
└── utils/              # Utility functions`,

  devCommands: `# Development
npm run dev              # Start development server
npm run build           # Production build
npm run generate        # Static site generation
npm run preview         # Preview production build`,
};
</script>

<template>
  <div class="dev-guide-content">
    <!-- Loading State -->
    <div v-if="isLoading" class="content-loading">
      <div
        class="flex items-center gap-3 p-6 bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-800 rounded-lg"
      >
        <Icon
          name="i-heroicons-arrow-path"
          class="w-5 h-5 text-yellow-600 dark:text-yellow-400 animate-spin"
        />
        <p class="text-yellow-800 dark:text-yellow-200 font-medium">
          Loading content...
        </p>
      </div>
    </div>

    <!-- Enhanced Content Renderer -->
    <div v-else class="content-body">
      <!-- Custom Content Structure for Development Stack -->
      <div v-if="sectionId === 'overview'" class="structured-content">
        <!-- Core Framework Section -->
        <DevGuideSection
          title="🚀 Core Framework"
          description="The foundation technologies powering the platform"
          id="core-framework"
        >
          <div class="space-y-6">
            <DevGuideTechCard
              title="Nuxt 4"
              version="^4.0.0"
              description="Full-Stack Vue Framework with server-side rendering, static generation, and universal Vue applications"
              link="https://nuxt.com/"
              badge="Primary Framework"
              badge-color="primary"
            >
              <DevGuideList
                :items="[
                  'Auto-imports for composables and components',
                  'File-based routing with dynamic routes',
                  'Built-in optimization and performance features',
                  'TypeScript support out of the box',
                ]"
                type="check"
                :columns="2"
              />

              <DevGuideCodeBlock
                title="Page Auto-import Example"
                language="vue"
                filename="pages/example.vue"
                :code="codeExamples.nuxtAutoImport"
              />
            </DevGuideTechCard>

            <DevGuideTechCard
              title="Vue 3"
              version="^3.5.15"
              description="Progressive JavaScript Framework with Composition API and enhanced TypeScript integration"
              link="https://vuejs.org/"
              badge="Core Library"
              badge-color="success"
            >
              <DevGuideCodeBlock
                title="Component Setup Pattern"
                language="vue"
                filename="components/Example.vue"
                :code="codeExamples.vueSetupPattern"
              />
            </DevGuideTechCard>

            <DevGuideTechCard
              title="TypeScript"
              version="^5.8.3"
              description="Full type safety across components, composables, and utilities with strict configuration"
              link="https://www.typescriptlang.org/"
              badge="Type Safety"
              badge-color="info"
            >
              <DevGuideList
                :items="[
                  'Strict TypeScript configuration',
                  'Enhanced type checking for Vue components',
                  'Full IntelliSense support',
                  'Type-safe API integration',
                ]"
                type="feature"
              />
            </DevGuideTechCard>
          </div>
        </DevGuideSection>

        <!-- UI Framework Section -->
        <DevGuideSection
          title="🎨 UI Framework & Styling"
          description="Modern, accessible components and styling system"
          id="ui-framework"
        >
          <div class="space-y-6">
            <DevGuideTechCard
              title="Nuxt UI"
              version="^3.1.3"
              description="Modern, accessible Vue components built on Tailwind CSS"
              link="https://ui.nuxt.com/"
              badge="Component Library"
              badge-color="primary"
            >
              <DevGuideCallout type="warning" title="Important Note">
                We use <strong>@nuxt/ui</strong> (community version), NOT Nuxt
                UI Pro. All components should use the community library.
              </DevGuideCallout>

              <DevGuideCodeBlock
                title="UI Component Usage"
                language="vue"
                filename="components/CourseCard.vue"
                :code="codeExamples.nuxtUIUsage"
              />
            </DevGuideTechCard>

            <DevGuideTechCard
              title="Tailwind CSS"
              description="Utility-first styling with component composition and responsive design patterns"
              link="https://tailwindcss.com/"
              badge="Styling System"
              badge-color="info"
            >
              <DevGuideCodeBlock
                title="RTL-Friendly Styling"
                language="vue"
                filename="components/RTLExample.vue"
                :code="codeExamples.rtlStyling"
              />
            </DevGuideTechCard>
          </div>
        </DevGuideSection>

        <!-- Icons & Typography Section -->
        <DevGuideSection
          title="🎭 Icons & Typography"
          description="Comprehensive icon system and font optimization"
          id="icons-typography"
        >
          <div class="space-y-6">
            <DevGuideTechCard
              title="Nuxt Icon"
              version="^1.13.0"
              description="Iconify integration with auto-completion and optimized loading"
              link="https://icon.nuxt.com/"
              badge="Icon System"
              badge-color="info"
            >
              <DevGuideCodeBlock
                title="Icon Usage Examples"
                language="vue"
                filename="components/IconExamples.vue"
                :code="codeExamples.iconUsage"
              />

              <DevGuideList
                :items="[
                  {
                    text: 'Heroicons',
                    description: 'Primary icon set for UI elements',
                    badge: '^1.2.2',
                  },
                  {
                    text: 'Lucide',
                    description: 'Additional icons for enhanced variety',
                    badge: '^1.2.45',
                  },
                  {
                    text: 'Custom Icons',
                    description: 'Located in assets/icons/ directory',
                    badge: 'SVG',
                  },
                ]"
                type="feature"
              />
            </DevGuideTechCard>

            <DevGuideTechCard
              title="Nuxt Fonts"
              version="^0.11.4"
              description="Automatic font optimization with Google Fonts integration"
              link="https://fonts.nuxt.com/"
              badge="Typography"
              badge-color="success"
            >
              <DevGuideCodeBlock
                title="Font Implementation"
                language="css"
                filename="assets/css/main.css"
                :code="codeExamples.fontImplementation"
              />
            </DevGuideTechCard>
          </div>
        </DevGuideSection>

        <!-- Internationalization Section -->
        <DevGuideSection
          title="🌍 Internationalization"
          description="Multi-language support with comprehensive RTL layout"
          id="internationalization"
        >
          <div class="space-y-6">
            <DevGuideTechCard
              title="Nuxt I18n"
              version="^9.5.4"
              description="Complete internationalization with route localization and SEO optimization"
              link="https://i18n.nuxtjs.org/"
              badge="Multi-language"
              badge-color="primary"
            >
              <DevGuideList
                :items="[
                  'English (LTR) and Arabic (RTL) support',
                  'Route localization with SEO optimization',
                  'Cookie-based language persistence',
                  'RTL-aware component styling',
                ]"
                type="check"
                :columns="2"
              />

              <DevGuideCodeBlock
                title="i18n Implementation"
                language="vue"
                filename="components/MultiLangExample.vue"
                :code="codeExamples.i18nImplementation"
              />
            </DevGuideTechCard>
          </div>
        </DevGuideSection>

        <!-- Content Management Section -->
        <DevGuideSection
          title="📝 Content Management"
          description="File-based content system with enhanced markdown support"
          id="content-management"
        >
          <div class="space-y-6">
            <DevGuideTechCard
              title="Nuxt Content"
              version="^3.5.1"
              description="Markdown-based content management with Vue components and MDC syntax"
              link="https://content.nuxt.com/"
              badge="Content System"
              badge-color="success"
            >
              <DevGuideCallout type="info" title="Content Structure">
                Content files are organized in
                <code
                  >content/courses/[courseId]/[locale]/modules/[moduleId]/lessons/</code
                >
              </DevGuideCallout>

              <DevGuideCodeBlock
                title="Content Fetching Pattern"
                language="vue"
                filename="pages/course/[...slug].vue"
                :code="codeExamples.contentFetching"
              />
            </DevGuideTechCard>
          </div>
        </DevGuideSection>

        <!-- Performance & SEO Section -->
        <DevGuideSection
          title="⚡ Performance & SEO"
          description="Optimization tools for enhanced performance and search engine visibility"
          id="performance-seo"
        >
          <div class="space-y-6">
            <DevGuideTechCard
              title="Nuxt Image"
              version="^1.10.0"
              description="Automatic image optimization with responsive images and lazy loading"
              link="https://image.nuxt.com/"
              badge="Image Optimization"
              badge-color="info"
            >
              <DevGuideCodeBlock
                title="Optimized Images"
                language="vue"
                filename="components/OptimizedImage.vue"
                :code="codeExamples.optimizedImages"
              />
            </DevGuideTechCard>

            <DevGuideTechCard
              title="Unhead"
              version="^2.0.10"
              description="Document head management for SEO optimization and meta tags"
              link="https://unhead.unjs.io/"
              badge="SEO Management"
              badge-color="success"
            >
              <DevGuideCodeBlock
                title="SEO with i18n"
                language="vue"
                filename="pages/courses/index.vue"
                :code="codeExamples.seoWithI18n"
              />
            </DevGuideTechCard>
          </div>
        </DevGuideSection>

        <!-- Development Tools Section -->
        <DevGuideSection
          title="🛠️ Development Tools"
          description="Code quality, testing, and development workflow tools"
          id="development-tools"
        >
          <div class="space-y-6">
            <DevGuideTechCard
              title="ESLint"
              version="^9.27.0"
              description="Code linting and formatting with Nuxt integration"
              link="https://eslint.org/"
              badge="Code Quality"
              badge-color="warning"
            >
              <DevGuideList
                :items="[
                  'Nuxt ESLint integration (^1.4.1)',
                  'Code linting and formatting',
                  'Best practices enforcement',
                  'TypeScript support',
                ]"
                type="check"
              />
            </DevGuideTechCard>

            <DevGuideTechCard
              title="Better SQLite3"
              version="^12.2.0"
              description="Local database for progress tracking and user data storage"
              link="https://github.com/WiseLibs/better-sqlite3"
              badge="Local Database"
              badge-color="neutral"
            >
              <DevGuideList
                :items="[
                  'Course progress tracking',
                  'User bookmarks and notes',
                  'Learning analytics storage',
                  'Offline data persistence',
                ]"
                type="bullet"
              />
            </DevGuideTechCard>
          </div>
        </DevGuideSection>

        <!-- Project Structure Section -->
        <DevGuideSection
          title="📦 Project Structure"
          description="Directory organization and build configuration"
          id="project-structure"
        >
          <div class="space-y-6">
            <DevGuideCodeBlock
              title="Directory Structure"
              language="bash"
              filename="Project Layout"
              :code="codeExamples.projectStructure"
            />

            <DevGuideCodeBlock
              title="Development Commands"
              language="bash"
              filename="package.json scripts"
              :code="codeExamples.devCommands"
            />
          </div>
        </DevGuideSection>

        <!-- Success Summary -->
        <DevGuideCallout type="success" title="Technology Stack Summary">
          This comprehensive technology stack provides excellent performance,
          developer experience, and scalability. All tools are production-ready
          and follow modern web development best practices with full TypeScript
          support and internationalization.
        </DevGuideCallout>
      </div>

      <!-- Fallback to ContentRenderer for other sections -->
      <div
        v-else
        class="prose prose-gray dark:prose-invert max-w-none prose-lg"
      >
        <ContentRenderer :value="content" />
      </div>

      <!-- Debug Info (Development Only) -->
      <div
        v-if="$nuxt.ssrContext?.event?.context?.dev && contentMeta"
        class="content-debug mt-8 p-4 bg-gray-50 dark:bg-gray-900 border rounded-lg text-xs"
      >
        <details>
          <summary
            class="cursor-pointer font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Debug Information
          </summary>
          <div class="space-y-1 text-gray-600 dark:text-gray-400">
            <div><strong>Title:</strong> {{ contentMeta.title }}</div>
            <div><strong>Path:</strong> {{ contentMeta.path }}</div>
            <div v-if="contentMeta.updatedAt">
              <strong>Updated:</strong>
              {{ new Date(contentMeta.updatedAt).toLocaleString() }}
            </div>
          </div>
        </details>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dev-guide-content {
  min-height: 400px;
}

.content-body {
  position: relative;
}

.content-loading {
  margin: 2rem 0;
}

/* Improve code block styling */
.content-body :deep(pre) {
  border: 1px solid rgb(229 231 235);
  border-radius: 0.5rem;
  overflow-x: auto;
}

.dark .content-body :deep(pre) {
  border-color: rgb(55 65 81);
}

.content-body :deep(code) {
  background-color: rgb(243 244 246);
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
}

.dark .content-body :deep(code) {
  background-color: rgb(31 41 55);
}

.content-body :deep(pre code) {
  background: transparent;
  padding: 0;
}

/* Callout enhancements */
.content-body :deep(.callout) {
  margin: 1.5rem 0;
}
</style>
