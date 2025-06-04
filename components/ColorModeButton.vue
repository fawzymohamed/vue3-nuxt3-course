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
      color="neutral"
      variant="ghost"
      aria-label="Toggle color mode"
      class="transition-colors duration-300"
      @click="isDark = !isDark"
    >
      <!-- Use explicit SVG icons instead of relying on icon string references -->
      <template #leading>
        <div v-if="isDark" class="w-5 h-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="w-5 h-5"
          >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
          </svg>
        </div>
        <div v-else class="w-5 h-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="w-5 h-5"
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
        </div>
      </template>
    </UButton>

    <template #fallback>
      <div class="w-8 h-8" />
    </template>
  </ClientOnly>
</template>
