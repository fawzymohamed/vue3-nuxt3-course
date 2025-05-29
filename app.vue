<template>
  <UApp>
    <!-- Main Layout Container -->
    <div class="min-h-screen flex flex-col">
      <!-- Header with Navigation -->
      <header class="border-b border-default">
        <UContainer class="py-4">
          <div class="flex justify-between items-center">
            <!-- Logo/Site Name -->
            <div class="flex items-center gap-x-2">
              <UIcon name="i-lucide-code" class="text-primary size-6" />
              <NuxtLink to="/" class="font-bold text-lg">
                <span class="text-primary">Vue/Nuxt</span> Learning Platform
              </NuxtLink>
            </div>

            <!-- Main Navigation -->
            <nav class="flex items-center gap-2">
              <UButtonGroup>
                <UButton
                  to="/course"
                  variant="ghost"
                  icon="i-heroicons-academic-cap"
                >
                  Courses
                </UButton>
                <UButton to="/icons" variant="ghost" icon="i-lucide-palette">
                  Icons Demo
                </UButton>
                <UButton
                  to="https://github.com/nuxt/ui"
                  variant="ghost"
                  icon="i-lucide-github"
                  target="_blank"
                >
                  GitHub
                </UButton>
              </UButtonGroup>
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
              {{ new Date().getFullYear() }} Vue/Nuxt Learning Platform
            </div>

            <!-- Right side -->
            <div class="flex gap-4">
              <UButton
                icon="i-lucide-book"
                to="/resources"
                variant="ghost"
                size="sm"
                color="neutral"
              >
                Resources
              </UButton>
              <UButton
                icon="i-lucide-info"
                to="/about"
                variant="ghost"
                size="sm"
                color="neutral"
              >
                About
              </UButton>
            </div>
          </div>
        </UContainer>
      </footer>
    </div>
  </UApp>
</template>
