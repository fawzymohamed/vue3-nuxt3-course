<script setup lang="ts">
import * as locales from "@nuxt/ui/locale";

const { locale } = useI18n();
const localePath = useLocalePath();
const { isDev } = useDevOnly(); // Import the dev-only composable

const lang = computed(() => locales[locale.value].code);
const dir = computed(() => locales[locale.value].dir);

useHead({
  htmlAttrs: {
    lang,
    dir,
  },
});
</script>

<template>
  <UApp :locale="locales[locale]">
    <!-- Main Layout Container -->
    <div class="min-h-screen flex flex-col">
      <!-- Header with Navigation -->
      <header class="border-b border-default">
        <UContainer class="py-4">
          <div class="flex justify-between items-center">
            <!-- Logo/Site Name -->
            <div class="flex items-center">
              <NuxtLink :to="localePath('/')" class="flex items-center">
                <NuxtImg
                  src="/logo.png"
                  :alt="$t('siteName')"
                  class="h-8 w-auto"
                  loading="eager"
                  preload
                />
                <span class="text-primary">Learnova Academy</span>
              </NuxtLink>
            </div>
            <!-- Main Navigation -->
            <nav class="flex items-center gap-4">
              <!-- Examples Link (Dev Only) -->
              <div v-if="isDev" class="mr-2">
                <NuxtLink
                  :to="localePath('/examples')"
                  class="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors duration-200"
                >
                  <UIcon name="i-lucide-code" class="w-4 h-4" />
                  <span>Examples</span>
                  <span
                    class="inline-flex items-center px-1.5 py-0.5 text-xs font-medium bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded"
                  >
                    DEV
                  </span>
                </NuxtLink>
              </div>

              <!-- Dev Guide Link (Dev Only) -->
              <div v-if="isDev" class="mr-2">
                <NuxtLink
                  :to="localePath('/dev-guide')"
                  class="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors duration-200"
                >
                  <UIcon name="i-lucide-code" class="w-4 h-4" />
                  <span>Dev Guide</span>
                  <span
                    class="inline-flex items-center px-1.5 py-0.5 text-xs font-medium bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded"
                  >
                    DEV
                  </span>
                </NuxtLink>
              </div>

              <!-- Admin Link (Dev Only) -->
              <div v-if="isDev" class="mr-2">
                <NuxtLink
                  :to="localePath('/admin')"
                  class="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors duration-200"
                >
                  <UIcon name="i-lucide-settings" class="w-4 h-4" />
                  <span>Admin</span>
                  <span
                    class="inline-flex items-center px-1.5 py-0.5 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded"
                  >
                    BETA
                  </span>
                </NuxtLink>
              </div>

              <!-- Language Switcher -->
              <LanguageSwitcher />

              <!-- Add ColorModeButton -->
              <ColorModeButton />
            </nav>
          </div>
        </UContainer>
      </header>

      <!-- Main Content Area -->
      <main class="flex-1">
        <NuxtPage />
      </main>
      <!-- Footer -->
      <footer class="border-t border-default">
        <UContainer class="py-6">
          <div class="flex justify-center gap-4">
            <!-- Footer Logo -->
            <div class="flex items-center">
              <NuxtLink :to="localePath('/')" class="flex items-center">
                <NuxtImg
                  src="/logo.png"
                  :alt="$t('siteName')"
                  class="h-6 w-auto opacity-80 hover:opacity-100 transition-opacity"
                />
              </NuxtLink>
            </div>

            <!-- Copyright -->
            <div class="text-sm text-muted text-center">
              {{ $t("footer.copyright", { year: new Date().getFullYear() }) }}
            </div>
          </div>
        </UContainer>
      </footer>
    </div>
  </UApp>
</template>
