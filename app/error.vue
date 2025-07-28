<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps<{
  error: NuxtError;
}>();

const { t } = useI18n();

// Handle the error
const handleError = () => clearError({ redirect: "/" });

useHead({
  title: `${props.error?.statusCode} - ${t("siteName")}`,
});
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900"
  >
    <div class="max-w-md mx-auto text-center px-4">
      <!-- Logo -->
      <div class="mb-8">
        <NuxtImg
          src="/logo.png"
          :alt="$t('siteName')"
          class="h-16 w-auto mx-auto opacity-80"
        />
      </div>
      <!-- Error Code -->
      <h1 class="text-6xl font-bold text-gray-900 dark:text-white mb-4">
        {{ props.error?.statusCode || "404" }}
      </h1>
      <!-- Error Message -->
      <h2 class="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-8">
        {{ props.error?.statusMessage || t("error.pageNotFound") }}
      </h2>

      <!-- Action Buttons -->
      <div class="space-y-4">
        <UButton
          size="xl"
          class="bg-green-400 hover:bg-green-500 text-white font-semibold py-3 px-8 rounded-md transition-colors duration-200 cursor-pointer"
          @click="handleError"
        >
          {{ t("error.goHome") }}
        </UButton>
      </div>
    </div>
  </div>
</template>
