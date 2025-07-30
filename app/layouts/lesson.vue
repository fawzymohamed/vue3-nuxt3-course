<script setup lang="ts">
import * as locales from "@nuxt/ui/locale";

// Import i18n and path utilities
const { locale } = useI18n();
const localePath = useLocalePath();

// Reactive properties for language settings
const lang = computed(() => locales[locale.value].code);
const dir = computed(() => locales[locale.value].dir);

// Set HTML attributes for proper language and direction
useHead({
  htmlAttrs: {
    lang,
    dir,
  },
});

// Get current route information
// const route = useRoute();
</script>

<template>
  <UApp :locale="locales[locale]">
    <div class="min-h-screen flex flex-col">
      <!-- Header -->
      <header class="border-b border-gray-200 dark:border-gray-800">
        <UContainer class="py-3">
          <div class="flex justify-between items-center">
            <!-- Logo/Site Name -->
            <NuxtLink :to="localePath('/')" class="flex items-center gap-2">
              <span class="font-bold text-xl text-primary">VueNuxtMasters</span>
            </NuxtLink>

            <!-- Navigation Controls -->
            <div class="flex items-center gap-4">
              <!-- Language Switcher -->
              <LanguageSwitcher />

              <!-- Color Mode Toggle -->
              <ColorModeButton />
            </div>
          </div>
        </UContainer>
      </header>

      <!-- Main Content Area with Sidebar -->
      <div class="flex-1 flex">
        <!-- Sidebar for Lesson Navigation - Hide on mobile -->
        <aside
          class="hidden md:block w-64 xl:w-72 border-e border-gray-200 dark:border-gray-800 overflow-y-auto"
        >
          <div class="p-4 sticky top-0">
            <!-- Module Title - Will be dynamic in future -->
            <h3 class="font-semibold mb-3 text-gray-900 dark:text-white">
              {{ $t("lesson.currentModule") }}
            </h3>

            <!-- Lesson Navigation - Will be populated dynamically in future -->
            <div class="space-y-1 mt-4">
              <!-- This will be replaced with a dynamic list of lessons -->
              <slot name="sidebar" />
            </div>
          </div>
        </aside>

        <!-- Main Lesson Content -->
        <main class="flex-1 overflow-y-auto">
          <UContainer class="py-8">
            <!-- Main content slot -->
            <slot />
          </UContainer>
        </main>
      </div>

      <!-- Footer -->
      <footer class="border-t border-gray-200 dark:border-gray-800">
        <UContainer class="py-6">
          <div class="flex justify-between items-center">
            <!-- Left Footer Section -->
            <div class="text-sm text-gray-600 dark:text-gray-400">
              {{ $t("footer.copyright", { year: new Date().getFullYear() }) }}
            </div>

            <!-- Right Footer Section - Could add more links here -->
            <div class="flex items-center gap-4">
              <NuxtLink
                :to="localePath('/')"
                class="text-sm text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
              >
                {{ $t("homepage.title") }}
              </NuxtLink>
            </div>
          </div>
        </UContainer>
      </footer>
    </div>
  </UApp>
</template>
