<script setup>
const colorMode = useColorMode();

// Enhanced color mode handling with better hydration support
const isDark = computed({
  get() {
    // Explicitly check if we're on the client side
    if (import.meta.client) {
      return colorMode.value === "dark";
    }
    // Default to false on server
    return false;
  },
  set(_isDark) {
    // Set the preference and forcibly update DOM
    colorMode.preference = _isDark ? "dark" : "light";
    // Ensure the change is applied immediately
    if (import.meta.client) {
      document.documentElement.classList.toggle("dark", _isDark);
    }
  },
});

// Make sure color mode is correctly initialized after hydration
onMounted(() => {
  // Force a re-evaluation of the color mode
  const currentPreference = colorMode.preference;
  if (
    currentPreference === "dark" ||
    (currentPreference === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
});
</script>

<template>
  <ClientOnly>
    <UButton
      :icon="isDark ? 'i-lucide-moon' : 'i-lucide-sun'"
      color="neutral"
      variant="ghost"
      aria-label="Toggle color mode"
      class="transition-colors duration-300"
      @click="isDark = !isDark"
    />

    <template #fallback>
      <div class="w-8 h-8" />
      <!-- Using w-8 h-8 instead of size-8 for better compatibility -->
    </template>
  </ClientOnly>
</template>
