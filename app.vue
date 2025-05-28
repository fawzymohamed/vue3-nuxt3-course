<template>
  <UApp>
    <!-- Main Layout Container -->
    <div class="min-h-screen flex flex-col">
      <!-- Main Content Area -->
      <main class="flex-1">
        <NuxtPage />
      </main>

      <!-- Footer - Using regular footer element instead of UFooter -->
      <footer class="border-t border-default">
        <UContainer class="py-4">
          <div
            class="flex flex-col sm:flex-row justify-between items-center gap-4"
          >
            <!-- Left side -->
            <div class="text-sm text-muted">
              &copy; {{ new Date().getFullYear() }} Vue/Nuxt Learning Platform
            </div>

            <!-- Right side -->
            <div class="flex gap-4">
              <!-- <UButton
                icon="i-heroicons-book-open"
                to="/resources"
                variant="ghost"
                size="sm"
                color="neutral"
              >
                Resources
              </UButton>
              <UButton
                icon="i-heroicons-information-circle"
                to="/about"
                variant="ghost"
                size="sm"
                color="neutral"
              >
                About
              </UButton> -->
            </div>
          </div>
        </UContainer>
      </footer>
    </div>
  </UApp>
</template>
