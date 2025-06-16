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
            <div class="flex items-center gap-x-2">
              <UIcon name="i-lucide-code" class="text-primary size-6" />
              <NuxtLink :to="localePath('/')" class="font-bold text-lg">
                <span class="text-primary">Vue/Nuxt</span> Learning Platform
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
        <UContainer class="py-4">
          <div
            class="flex flex-col sm:flex-row justify-between items-center gap-4"
          >
            <!-- Left side -->
            <div class="text-sm text-muted flex items-center gap-2">
              <UIcon name="i-lucide-copyright" class="size-4" />
              {{ $t("footer.copyright", { year: new Date().getFullYear() }) }}
            </div>
            <!-- Right side -->
            <div class="flex gap-4">
              <UButton
                icon="i-lucide-book"
                :to="localePath('/resources')"
                variant="ghost"
                size="sm"
                color="neutral"
              >
                {{ $t("resources") }}
              </UButton>
              <UButton
                icon="i-lucide-info"
                :to="localePath('/about')"
                variant="ghost"
                size="sm"
                color="neutral"
              >
                {{ $t("about") }}
              </UButton>
            </div>
          </div>
        </UContainer>
      </footer>
    </div>
  </UApp>
</template>
