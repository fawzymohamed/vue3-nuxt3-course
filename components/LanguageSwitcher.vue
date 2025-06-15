<script setup lang="ts">
import type { DropdownMenuItem } from "@nuxt/ui";

const { locale, locales, setLocale } = useI18n();
const { t } = useI18n();

// Create dropdown menu items from available locales
const languageItems = computed<DropdownMenuItem[]>(() => {
  return locales.value.map((lang) => ({
    label: t(`languages.${lang.code}`),
    icon: getLanguageIcon(lang.code),
    onSelect: () => setLocale(lang.code),
    active: locale.value === lang.code,
  }));
});

// Helper function to get appropriate icon for each language
function getLanguageIcon(langCode: string): string {
  const iconMap: Record<string, string> = {
    en: "i-twemoji-flag-united-states", // US flag for English
    ar: "i-twemoji-flag-saudi-arabia", // Saudi Arabia flag for Arabic
  };
  return iconMap[langCode] || "i-lucide-globe";
}

// Get current language display name
const currentLanguage = computed(() => {
  const currentLang = locales.value.find((lang) => lang.code === locale.value);
  return currentLang ? t(`languages.${currentLang.code}`) : "Language";
});

// Dropdown state
const isOpen = ref(false);

// Hover event handlers
function onButtonHover() {
  isOpen.value = true;
}
</script>

<template>
  <UDropdownMenu
    v-model:open="isOpen"
    :items="languageItems"
    :popper="{ placement: 'bottom-end' }"
    :ui="{
      content: 'w-40',
    }"
  >
    <UButton
      variant="ghost"
      color="neutral"
      :label="currentLanguage"
      icon="i-lucide-globe"
      trailing-icon="i-lucide-chevron-down"
      @mouseenter="onButtonHover"
    />
  </UDropdownMenu>
</template>
