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
    <button
      type="button"
      class="cursor-pointer flex items-center justify-center rounded-md p-2 transition-colors duration-300 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
      aria-label="Toggle color mode"
      @click="isDark = !isDark"
    >
      <!-- Moon icon for dark mode -->
      <svg
        v-if="isDark"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="w-4 h-4"
      >
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
      </svg>

      <!-- Sun icon for light mode -->
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="w-4 h-4"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2" />
        <path d="M12 20v2" />
        <path d="m4.93 4.93 1.41 1.41" />
        <path d="m17.66 17.66 1.41 1.41" />
        <path d="M2 12h2" />
        <path d="M20 12h2" />
        <path d="m6.34 17.66-1.41 1.41" />
        <path d="m19.07 4.93-1.41 1.41" />
      </svg>
    </button>

    <template #fallback>
      <div class="w-8 h-8" />
    </template>
  </ClientOnly>
</template>
