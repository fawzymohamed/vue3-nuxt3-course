<script setup lang="ts">
import * as locales from "@nuxt/ui/locale";

const { locale } = useI18n();
const localePath = useLocalePath();

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
                <span class="text-primary">VueNuxtMasters</span>
              </NuxtLink>
            </div>
            <!-- Main Navigation -->
            <nav class="flex items-center gap-4">
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
