<script setup lang="ts">
const { t } = useI18n();
const localePath = useLocalePath();

// SEO Meta for curriculum page with i18n
useHead({
  title: t("curriculum.meta.title"),
  meta: [
    {
      name: "description",
      content: t("curriculum.meta.description"),
    },
  ],
});

// We'll use this content directly in our page
// This is the actual course outline content
const courseOutline = `
Module 1: Vue.js - The Progressive Framework (Beginner)
Section 1: Introduction to Vue.js
Lesson 1: What is Vue.js? Why Vue? (Ecosystem, Performance, DX)
Lesson 2: Setting Up Your Environment (Node.js, npm/yarn, Vue CLI vs. Vite)
Lesson 3: Creating Your First Vue App (Hello World with Vite)
Lesson 4: Understanding the Vue Instance and Application
Lesson 5: Template Syntax: Interpolation & Expressions
Section 2: Core Directives & Reactivity
Lesson 6: v-bind: Binding Attributes
Lesson 7: v-on: Handling Events
Lesson 8: v-model: Two-Way Data Binding on Forms
Lesson 9: Conditional Rendering (v-if, v-else-if, v-else, v-show)
Lesson 10: List Rendering (v-for with arrays and objects, key attribute)
Lesson 11: Class & Style Bindings (Object & Array Syntax)
Section 3: Computed Properties & Watchers
Lesson 12: Computed Properties: The Reactive Powerhouses
Lesson 13: Watchers: Responding to Data Changes
Lesson 14: Computed vs. Methods vs. Watchers
Section 4: Components - Building Blocks of Vue
Lesson 15: Introduction to Components
Lesson 16: Creating & Registering Components (Global vs. Local)
Lesson 17: Props: Passing Data to Child Components (Validation)
Lesson 18: Emitting Custom Events ($emit): Communicating to Parents
Lesson 19: Slots: Content Distribution & Layouts
Lesson 20: Dynamic Components (<component :is="...">) & keep-alive
Section 5: Vue Lifecycle Hooks
Lesson 21: Understanding the Component Lifecycle
Lesson 22: Common Lifecycle Hooks (created, mounted, updated, unmounted)
Project 1: Simple To-Do List Application
(Several lessons breaking down the build process)
Module 2: Intermediate Vue.js - Scaling & State Management
Section 6: Advanced Component Concepts
Lesson 23: Provide / Inject for Deep Prop Drilling
Lesson 24: Template Refs
Lesson 25: Asynchronous Components & Lazy Loading
Section 7: Transitions & Animations
Lesson 26: CSS Transitions & Animations with Vue
Lesson 27: JavaScript Hooks for Animations
Lesson 28: Animating Lists (<TransitionGroup>)
Section 8: Routing with Vue Router
Lesson 29: Introduction to Client-Side Routing
Lesson 30: Setting up Vue Router
Lesson 31: Defining Routes, <RouterLink>, <RouterView>
Lesson 32: Dynamic Route Matching & Params
Lesson 33: Nested Routes & Named Views
Lesson 34: Programmatic Navigation
Lesson 35: Navigation Guards (Global, Per-Route, In-Component)
Lesson 36: Route Meta Fields & Lazy Loading Routes
Section 9: State Management with Pinia
Lesson 37: Why State Management? Introduction to Pinia
Lesson 38: Setting up Pinia & Creating Stores
Lesson 39: State, Getters, Actions
Lesson 40: Accessing Stores in Components
Lesson 41: Organizing Stores (Multiple Stores, Modules concept)
Lesson 42: Pinia Plugins (e.g., for persistence)
Project 2: E-commerce Product Listing Page with Cart
(Utilizing Vue Router and Pinia)
Module 3: Advanced Vue.js - Composition API & Beyond
Section 10: The Composition API
Lesson 43: Introduction: Why the Composition API?
Lesson 44: setup() function
Lesson 45: Reactivity: ref(), reactive(), readonly()
Lesson 46: computed() and watch() / watchEffect() in Composition API
Lesson 47: Lifecycle Hooks in Composition API
Lesson 48: toRefs() and toRef()
Lesson 49: Script Setup (<script setup>) - The Recommended Syntax
Section 11: Reusable Logic with Composables
Lesson 50: What are Composables?
Lesson 51: Creating Your First Composable (e.g., useMousePosition, useFetchData)
Lesson 52: Best Practices for Composables
Section 12: TypeScript with Vue
Lesson 53: Benefits of TypeScript
Lesson 54: Setting up TypeScript in a Vue Project
Lesson 55: Typing Props, Emits, ref, reactive
Lesson 56: Typing Vue Router and Pinia Stores
Section 13: Performance & Optimization
Lesson 57: Identifying Performance Bottlenecks (Vue Devtools)
Lesson 58: Virtual Scrolling for Large Lists
Lesson 59: Code Splitting & Lazy Loading
Lesson 60: Best Practices for Performance
Section 14: Testing Vue Applications
Lesson 61: Introduction to Testing (Unit, Component, E2E)
Lesson 62: Unit Testing with Vitest (or Jest)
Lesson 63: Component Testing with Vue Test Utils & Vitest
Lesson 64: Introduction to E2E Testing (e.g., Cypress/Playwright)
Project 3: Building a Feature-Rich Component Library / Design System Elements
(Focusing on Composition API, TypeScript, and testing)
Module 4: Nuxt.js - The Intuitive Vue Framework (Beginner - Intermediate)
Section 15: Introduction to Nuxt.js
Lesson 65: What is Nuxt.js? (Benefits: SSR, SSG, File-System Routing, etc.)
Lesson 66: Setting Up Your First Nuxt 3 Project
Lesson 67: Nuxt Directory Structure Explained
Section 16: Core Nuxt Concepts
Lesson 68: Pages & File-System Routing (pages/)
Lesson 69: Dynamic Routes & Route Parameters in Nuxt
Lesson 70: Layouts (layouts/) - Defining UI Structures
Lesson 71: Components (components/) - Auto-imports
Lesson 72: Assets (assets/) vs. Public (public/) Directory
Lesson 73: Linking & Navigation (<NuxtLink>)
Lesson 74: Error Handling & Custom Error Pages
Section 17: Data Fetching in Nuxt
Lesson 75: useFetch() - The Universal Data Fetching Composable
Lesson 76: useAsyncData() - For more control
Lesson 77: $fetch - Direct API calls (client & server)
Lesson 78: Fetching on Server vs. Client
Section 18: State Management & Composables in Nuxt
Lesson 79: useState() - SSR-friendly shared reactive state
Lesson 80: Pinia Integration in Nuxt
Lesson 81: Auto-imported Composables (composables/)
Section 19: Nuxt Configuration & SEO
Lesson 82: nuxt.config.ts Deep Dive
Lesson 83: Meta Tags & SEO (useHead, definePageMeta)
Lesson 84: Runtime Config vs. App Config
Project 4: Building a Static Blog with Nuxt (Markdown-based)
Module 5: Advanced Nuxt.js - Server Power & Ecosystem
Section 20: Nuxt Server Engine (Nitro)
Lesson 85: Introduction to the Server Directory (server/)
Lesson 86: Creating API Routes (server/api/)
Lesson 87: Server Middleware (server/middleware/)
Lesson 88: Server Plugins & Utilities (server/plugins/, server/utils/)
Lesson 89: Handling Forms and Data Persistence with Server Routes
Section 21: Nuxt Content v2
Lesson 90: Introduction to Nuxt Content
Lesson 91: Setting up and Configuring Nuxt Content
Lesson 92: Writing Content in Markdown
Lesson 93: Querying Content (queryContent())
Lesson 94: Displaying Content & Using MDC Syntax
Lesson 95: Components in Markdown
Lesson 96: Creating Custom Content Types
Section 22: Nuxt Modules & Plugins
Lesson 97: Nuxt Plugins (plugins/) - Client & Server Side
Lesson 98: Exploring the Nuxt Module Ecosystem (e.g., NuxtImage, NuxtUI, etc.)
Lesson 99: Creating a Simple Nuxt Module (Overview)
Section 23: Rendering Modes & Deployment
Lesson 100: SSR vs. SSG vs. Hybrid vs. ISR - Nuxt Strategies
Lesson 101: Deploying Static Nuxt Sites (e.g., Firebase Hosting, Netlify, Vercel)
Lesson 102: Deploying Nuxt SSR Applications (e.g., Node server, Vercel, Firebase Functions)
Section 24: Advanced Topics
Lesson 103: Route Middleware (Protecting Routes, Redirects)
Lesson 104: Caching Strategies in Nuxt
Lesson 105: Internationalization (i18n) with Nuxt
Lesson 106: Nuxt DevTools - Your Best Friend
Project 5: Building a Dynamic Portfolio Website with a CMS-like backend (using Nuxt server routes & Nuxt Content)
Module 6: The Grand Finale - Real-World Project
Section 25: Project Planning & Architecture
Lesson 107: Defining Scope & Features for the Course Platform
Lesson 108: Data Modeling (Content, User Progress - if included)
Lesson 109: Component Design & UI/UX Considerations
Section 26: Building the Course Platform
(Multiple lessons covering the development of the platform, including)
Project 6: Course Platform
(Final project implementing all learned concepts)
`;

// Define types for our data structures
interface LessonItem {
  type: string;
  number: number;
  title: string;
  description?: string;
}

interface CourseSection {
  type: string;
  number: number;
  title: string;
  items: LessonItem[];
}

interface CourseModule {
  type: string;
  number: number;
  title: string;
  level: string;
  sections: CourseSection[];
}

// Parse the course outline text into a structured format
const parseCourseOutline = (): CourseModule[] => {
  const lines = courseOutline.split("\n").filter((line) => line.trim() !== "");

  const modules: CourseModule[] = [];
  let currentModule: CourseModule | null = null;
  let currentSection: CourseSection | null = null;
  let currentProject: LessonItem | null = null;

  for (const line of lines) {
    // Skip filepath comment if present
    if (line.startsWith("//")) continue;

    // Module detection
    if (line.startsWith("Module ")) {
      // If there was an active project, add it to the current section
      if (currentProject && currentSection) {
        currentSection.items.push(currentProject);
        currentProject = null;
      }

      // Extract module number and title
      const match = line.match(/Module (\d+): (.*?)( \((.*?)\))?$/);
      if (match) {
        const moduleNum = parseInt(match[1]);
        const moduleTitle = match[2];
        const moduleLevel = match[4] || ""; // Optional level like (Beginner)

        currentModule = {
          type: "module",
          number: moduleNum,
          title: moduleTitle,
          level: moduleLevel,
          sections: [],
        };
        modules.push(currentModule);
        currentSection = null;
      }
    }
    // Section detection
    else if (line.startsWith("Section ") && currentModule) {
      // If there was an active project, add it to the previous section
      if (currentProject && currentSection) {
        currentSection.items.push(currentProject);
        currentProject = null;
      }

      const match = line.match(/Section (\d+): (.*)/);
      if (match) {
        const sectionNum = parseInt(match[1]);
        const sectionTitle = match[2];

        currentSection = {
          type: "section",
          number: sectionNum,
          title: sectionTitle,
          items: [],
        };
        currentModule.sections.push(currentSection);
      }
    }
    // Lesson detection
    else if (line.startsWith("Lesson ") && currentSection) {
      const match = line.match(/Lesson (\d+): (.*)/);
      if (match) {
        const lessonNum = parseInt(match[1]);
        const lessonTitle = match[2];

        currentSection.items.push({
          type: "lesson",
          number: lessonNum,
          title: lessonTitle,
        });
      }
    }
    // Project detection
    else if (line.startsWith("Project ") && currentModule) {
      const match = line.match(/Project (\d+): (.*)/);
      if (match) {
        const projectNum = parseInt(match[1]);
        const projectTitle = match[2];

        currentProject = {
          type: "project",
          number: projectNum,
          title: projectTitle,
        };
      }
    }
    // Handle project description line (usually in parenthesis after a Project line)
    else if (line.startsWith("(") && line.endsWith(")") && currentProject) {
      currentProject.description = line.substring(1, line.length - 1);
      // Add the project to the current section
      if (currentSection) {
        currentSection.items.push(currentProject);
        currentProject = null;
      }
    }
  }

  // In case there's a dangling project at the end
  if (currentProject && currentSection) {
    currentSection.items.push(currentProject);
  }

  return modules;
};

// Parse the course outline
const courseModules = parseCourseOutline();

// Function to generate lesson URL
const generateLessonUrl = (
  moduleNumber: number,
  lessonNumber: number
): string => {
  return `/lesson/module${moduleNumber}-${
    useNuxtApp().$i18n.locale.value
  }/lesson${lessonNumber}`;
};
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section
      class="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 lg:py-16"
    >
      <UContainer>
        <div class="max-w-4xl mx-auto text-center">
          <h1
            class="text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight mb-4"
          >
            {{ $t("curriculum.hero.title") }}
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-8">
            {{ $t("curriculum.hero.subtitle") }}
          </p>
        </div>
      </UContainer>
    </section>

    <!-- Curriculum Content Section -->
    <section class="py-12">
      <UContainer>
        <div class="max-w-5xl mx-auto">
          <!-- Course Modules -->
          <div
            v-for="module in courseModules"
            :key="`module-${module.number}`"
            class="mb-12"
          >
            <!-- Module Header -->
            <div
              class="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border-l-4 border-primary mb-6"
            >
              <div class="flex items-center gap-3">
                <!-- Module level badge -->
                <UBadge
                  v-if="module.level"
                  :color="
                    module.level.toLowerCase().includes('beginner')
                      ? 'success'
                      : module.level.toLowerCase().includes('intermediate')
                      ? 'info'
                      : 'secondary'
                  "
                  size="sm"
                  class="whitespace-nowrap"
                >
                  {{ module.level }}
                </UBadge>

                <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
                  {{
                    $t("curriculum.moduleTitle", {
                      number: module.number,
                      title: module.title,
                    })
                  }}
                </h2>
              </div>
            </div>

            <!-- Sections -->
            <div
              v-for="section in module.sections"
              :key="`section-${module.number}-${section.number}`"
              class="mb-8 ps-4"
            >
              <h3
                class="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200"
              >
                {{
                  $t("curriculum.sectionTitle", {
                    number: section.number,
                    title: section.title,
                  })
                }}
              </h3>

              <!-- Lessons & Projects -->
              <ul class="space-y-2 ps-5">
                <li
                  v-for="item in section.items"
                  :key="`item-${module.number}-${section.number}-${item.number}`"
                  class="ps-4 border-s dark:border-gray-700 pb-2 relative"
                >
                  <!-- Lesson/Project Dot -->
                  <div
                    class="absolute size-3 rounded-full -start-1.5 top-1.5"
                    :class="
                      item.type === 'project'
                        ? 'bg-yellow-500 dark:bg-yellow-400'
                        : 'bg-primary'
                    "
                  />

                  <div class="flex items-center">
                    <!-- Lesson icon or Project icon -->
                    <div v-if="item.type === 'project'" class="me-2 mt-1">
                      <UIcon
                        name="i-lucide-code"
                        class="text-yellow-600 dark:text-yellow-400"
                      />
                    </div>
                    <div v-else class="me-2 mt-1">
                      <LessonIcon />
                    </div>

                    <div>
                      <!-- Title -->
                      <p
                        class="font-medium"
                        :class="
                          item.type === 'project'
                            ? 'text-yellow-700 dark:text-yellow-300'
                            : 'text-gray-700 dark:text-gray-300'
                        "
                      >
                        <template v-if="item.type === 'lesson'">
                          <NuxtLink
                            :to="
                              localePath(
                                generateLessonUrl(module.number, item.number)
                              )
                            "
                            class="hover:text-primary transition-colors duration-200 hover:underline"
                          >
                            {{
                              $t("curriculum.lessonTitle", {
                                number: item.number,
                                title: item.title,
                              })
                            }}
                          </NuxtLink>
                        </template>
                        <template v-else-if="item.type === 'project'">
                          {{
                            $t("curriculum.project", {
                              number: item.number,
                              title: item.title,
                            })
                          }}
                        </template>
                      </p>

                      <!-- Description for projects -->
                      <p
                        v-if="item.type === 'project' && item.description"
                        class="text-sm text-gray-500 dark:text-gray-400 mt-1"
                      >
                        {{ item.description }}
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </UContainer>
    </section>
  </div>
</template>
