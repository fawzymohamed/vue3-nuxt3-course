<script setup lang="ts">
const localePath = useLocalePath();
const appConfig = useAppConfig();

// Redirect to home page in production
if (import.meta.env.PROD) {
  await navigateTo(localePath("/"));
}

// SEO Meta for examples hub page (only in development)
useHead({
  title: "Examples Hub - VueNuxtMasters (Dev Only)",
  meta: [
    {
      name: "description",
      content:
        "Development examples and code demonstrations for VueNuxtMasters project.",
    },
    {
      name: "robots",
      content: "noindex, nofollow", // Prevent indexing even if accessible
    },
  ],
});

// Example pages data
const examplePages = [
  {
    id: "icons-system",
    title: "Icon System",
    description:
      "Complete guide to using all types of icons: Heroicons, Lucide, custom icons, and app config shortcuts.",
    icon: "i-lucide-palette",
    color: "blue",
    path: "/examples/icons-system",
    tags: ["Icons", "UI", "Design System"],
    status: "ready",
  },
  // Future example pages can be added here
  {
    id: "components",
    title: "UI Components",
    description:
      "Showcase of reusable Vue components and their usage patterns.",
    icon: "i-lucide-blocks",
    color: "green",
    path: "/examples/components",
    tags: ["Components", "Vue", "Reusable"],
    status: "coming-soon",
  },
  {
    id: "layouts",
    title: "Layout Examples",
    description:
      "Different layout patterns and responsive design demonstrations.",
    icon: "i-lucide-layout-grid",
    color: "purple",
    path: "/examples/layouts",
    tags: ["Layouts", "Responsive", "CSS"],
    status: "coming-soon",
  },
  {
    id: "animations",
    title: "Animations & Transitions",
    description: "CSS animations, Vue transitions, and interactive elements.",
    icon: "i-lucide-zap",
    color: "yellow",
    path: "/examples/animations",
    tags: ["Animations", "CSS", "Interactions"],
    status: "coming-soon",
  },
  {
    id: "forms",
    title: "Form Examples",
    description: "Form validation, input types, and form handling patterns.",
    icon: "i-lucide-file-text",
    color: "indigo",
    path: "/examples/forms",
    tags: ["Forms", "Validation", "UX"],
    status: "coming-soon",
  },
  {
    id: "data-visualization",
    title: "Data Visualization",
    description: "Charts, graphs, and data presentation examples.",
    icon: "i-lucide-bar-chart-3",
    color: "emerald",
    path: "/examples/data-visualization",
    tags: ["Charts", "Data", "Visualization"],
    status: "coming-soon",
  },
];

const getColorClasses = (color: string) => {
  const colorMap = {
    blue: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300",
    green:
      "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300",
    purple:
      "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300",
    yellow:
      "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-700 dark:text-yellow-300",
    indigo:
      "bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300",
    emerald:
      "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300",
  };
  return colorMap[color as keyof typeof colorMap] || colorMap.blue;
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Header -->
    <section
      class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700"
    >
      <UContainer>
        <div class="py-16">
          <!-- Dev Mode Badge -->
          <div class="mb-6">
            <span
              class="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 text-sm font-medium rounded-full border border-orange-200 dark:border-orange-800"
            >
              <UIcon name="i-lucide-code" class="w-4 h-4" />
              Development Mode Only
            </span>
          </div>

          <div class="max-w-4xl">
            <h1 class="text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Examples Hub
            </h1>
            <p class="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              A collection of code examples, component demonstrations, and
              implementation guides for the VueNuxtMasters project. These
              examples showcase best practices and provide reference
              implementations for common patterns.
            </p>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- Examples Grid -->
    <section class="py-16">
      <UContainer>
        <div class="max-w-7xl mx-auto">
          <!-- Quick Stats -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div
              class="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700"
            >
              <div class="flex items-center gap-3">
                <div
                  class="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center"
                >
                  <UIcon
                    name="i-lucide-check-circle"
                    class="w-5 h-5 text-green-600 dark:text-green-400"
                  />
                </div>
                <div>
                  <div class="text-2xl font-bold text-gray-900 dark:text-white">
                    {{
                      examplePages.filter((p) => p.status === "ready").length
                    }}
                  </div>
                  <div class="text-sm text-gray-600 dark:text-gray-400">
                    Ready Examples
                  </div>
                </div>
              </div>
            </div>

            <div
              class="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700"
            >
              <div class="flex items-center gap-3">
                <div
                  class="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center"
                >
                  <UIcon
                    name="i-lucide-clock"
                    class="w-5 h-5 text-blue-600 dark:text-blue-400"
                  />
                </div>
                <div>
                  <div class="text-2xl font-bold text-gray-900 dark:text-white">
                    {{
                      examplePages.filter((p) => p.status === "coming-soon")
                        .length
                    }}
                  </div>
                  <div class="text-sm text-gray-600 dark:text-gray-400">
                    Coming Soon
                  </div>
                </div>
              </div>
            </div>

            <div
              class="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700"
            >
              <div class="flex items-center gap-3">
                <div
                  class="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center"
                >
                  <UIcon
                    name="i-lucide-folder"
                    class="w-5 h-5 text-purple-600 dark:text-purple-400"
                  />
                </div>
                <div>
                  <div class="text-2xl font-bold text-gray-900 dark:text-white">
                    {{ examplePages.length }}
                  </div>
                  <div class="text-sm text-gray-600 dark:text-gray-400">
                    Total Examples
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Examples Cards -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div
              v-for="example in examplePages"
              :key="example.id"
              class="group relative"
            >
              <!-- Card -->
              <div
                class="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 hover:shadow-lg"
                :class="example.status === 'coming-soon' ? 'opacity-75' : ''"
              >
                <!-- Status Badge -->
                <div class="absolute top-4 right-4">
                  <span
                    v-if="example.status === 'ready'"
                    class="inline-flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-medium rounded-full"
                  >
                    <UIcon name="i-lucide-check" class="w-3 h-3" />
                    Ready
                  </span>
                  <span
                    v-else
                    class="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs font-medium rounded-full"
                  >
                    <UIcon name="i-lucide-clock" class="w-3 h-3" />
                    Coming Soon
                  </span>
                </div>

                <!-- Icon -->
                <div
                  class="w-16 h-16 rounded-xl border mb-6 flex items-center justify-center"
                  :class="getColorClasses(example.color)"
                >
                  <UIcon :name="example.icon" class="w-8 h-8" />
                </div>

                <!-- Content -->
                <div class="space-y-4">
                  <div>
                    <h3
                      class="text-xl font-semibold text-gray-900 dark:text-white mb-2"
                    >
                      {{ example.title }}
                    </h3>
                    <p
                      class="text-gray-600 dark:text-gray-300 text-sm leading-relaxed"
                    >
                      {{ example.description }}
                    </p>
                  </div>

                  <!-- Tags -->
                  <div class="flex flex-wrap gap-2">
                    <span
                      v-for="tag in example.tags"
                      :key="tag"
                      class="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-md"
                    >
                      {{ tag }}
                    </span>
                  </div>

                  <!-- Action Button -->
                  <div class="pt-2">
                    <UButton
                      v-if="example.status === 'ready'"
                      :to="localePath(example.path)"
                      variant="outline"
                      size="sm"
                      class="w-full justify-center group-hover:bg-gray-50 dark:group-hover:bg-gray-700 transition-colors"
                    >
                      <span>View Example</span>
                      <UIcon
                        name="i-lucide-arrow-right"
                        class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                      />
                    </UButton>
                    <div
                      v-else
                      class="w-full py-2 px-4 text-center text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 rounded-md"
                    >
                      Coming Soon
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Getting Started Section -->
          <div
            class="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-8 border border-blue-200 dark:border-blue-800"
          >
            <div class="max-w-3xl">
              <h2
                class="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3"
              >
                <UIcon
                  name="i-lucide-rocket"
                  class="w-6 h-6 text-blue-600 dark:text-blue-400"
                />
                Getting Started
              </h2>
              <p class="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                These examples are designed to help you understand the project
                structure, component patterns, and best practices. Each example
                includes detailed explanations and copy-pasteable code snippets.
              </p>

              <div class="grid md:grid-cols-2 gap-6">
                <div class="space-y-3">
                  <h3 class="font-semibold text-gray-900 dark:text-white">
                    📋 What You'll Find:
                  </h3>
                  <ul
                    class="space-y-2 text-sm text-gray-700 dark:text-gray-300"
                  >
                    <li class="flex items-start gap-2">
                      <UIcon
                        name="i-lucide-check"
                        class="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0"
                      />
                      Implementation examples with code snippets
                    </li>
                    <li class="flex items-start gap-2">
                      <UIcon
                        name="i-lucide-check"
                        class="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0"
                      />
                      Best practices and common patterns
                    </li>
                    <li class="flex items-start gap-2">
                      <UIcon
                        name="i-lucide-check"
                        class="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0"
                      />
                      Resource links and documentation
                    </li>
                  </ul>
                </div>

                <div class="space-y-3">
                  <h3 class="font-semibold text-gray-900 dark:text-white">
                    🔧 Development Only:
                  </h3>
                  <ul
                    class="space-y-2 text-sm text-gray-700 dark:text-gray-300"
                  >
                    <li class="flex items-start gap-2">
                      <UIcon
                        name="i-lucide-shield"
                        class="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0"
                      />
                      Only available in development mode
                    </li>
                    <li class="flex items-start gap-2">
                      <UIcon
                        name="i-lucide-shield"
                        class="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0"
                      />
                      Automatically redirects in production
                    </li>
                    <li class="flex items-start gap-2">
                      <UIcon
                        name="i-lucide-shield"
                        class="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0"
                      />
                      Not indexed by search engines
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- Back to Home -->
    <section class="py-8 border-t border-gray-200 dark:border-gray-700">
      <UContainer>
        <div class="text-center">
          <UButton
            :to="localePath('/')"
            variant="outline"
            size="lg"
            class="inline-flex items-center gap-2"
          >
            <UIcon :name="appConfig.ui.icons.arrowLeft" class="w-4 h-4" />
            Back to Home
          </UButton>
        </div>
      </UContainer>
    </section>
  </div>
</template>
