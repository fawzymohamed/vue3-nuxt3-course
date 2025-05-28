<template>
  <div class="container mx-auto p-4 sm:p-6">
    <UCard>
      <template #header>
        <div class="p-4 bg-primary/10">
          <h1 class="text-2xl font-semibold">
            <UIcon name="i-lucide-palette" class="mr-2" />
            Icon Examples
          </h1>
        </div>
      </template>

      <div class="p-6 space-y-8">
        <!-- Example of basic icon usage -->
        <section>
          <h2 class="text-xl font-semibold mb-3">Basic Icons</h2>
          <div class="flex flex-wrap gap-6">
            <div
              v-for="icon in basicIcons"
              :key="icon"
              class="flex flex-col items-center p-4 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <UIcon :name="icon" class="mb-2 size-8 text-primary" />
              <span class="text-xs text-muted">{{ icon }}</span>
            </div>
          </div>
        </section>

        <!-- Custom icon collection -->
        <section>
          <h2 class="text-xl font-semibold mb-3">Custom Icon Collection</h2>
          <div class="flex flex-wrap gap-6">
            <div
              v-for="icon in customIcons"
              :key="icon"
              class="flex flex-col items-center p-4 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <UIcon :name="icon" class="mb-2 size-8 text-primary" />
              <span class="text-xs text-muted">{{ icon }}</span>
            </div>
          </div>
        </section>

        <!-- Our custom LessonIcon component -->
        <section>
          <h2 class="text-xl font-semibold mb-3">Custom Lesson Icons</h2>
          <div class="flex gap-8">
            <div
              v-for="type in ['lesson', 'quiz', 'exercise', 'course']"
              :key="type"
              class="flex flex-col items-center"
            >
              <LessonIcon :type="type" class="mb-2 size-8" />
              <span class="text-sm">{{ type }}</span>
            </div>
          </div>
        </section>

        <!-- Icon usage in UI components -->
        <section>
          <h2 class="text-xl font-semibold mb-3">Icons in Components</h2>
          <div class="flex flex-wrap gap-4">
            <UButton icon="i-lucide-book-open"> Lessons </UButton>
            <UButton icon="i-lucide-help-circle" color="warning" variant="soft">
              Quizzes
            </UButton>
            <UButton icon="i-lucide-code" color="info" variant="outline">
              Exercises
            </UButton>
            <UBadge icon="i-lucide-trending-up" color="success"
              >Progress</UBadge
            >
            <UBadge icon="i-lucide-star" color="warning">Favorite</UBadge>
          </div>
        </section>

        <!-- Icon usage in alerts -->
        <section>
          <h2 class="text-xl font-semibold mb-3">Icons in Alerts</h2>
          <div class="space-y-4">
            <UAlert
              icon="i-lucide-info"
              color="info"
              title="Information"
              description="Here's some useful information."
            />
            <UAlert
              icon="i-lucide-check"
              color="success"
              title="Success"
              description="You completed this lesson!"
            />
            <UAlert
              icon="i-lucide-alert-triangle"
              color="warning"
              title="Warning"
              description="Make sure to complete the quiz."
            />
            <UAlert
              icon="i-lucide-x"
              color="error"
              title="Error"
              description="Something went wrong."
            />
          </div>
        </section>
      </div>
    </UCard>
  </div>
</template>

<script setup>
// List of example icons to display
const basicIcons = [
  "i-lucide-book-open",
  "i-lucide-code",
  "i-lucide-help-circle",
  "i-heroicons-academic-cap",
  "i-lucide-graduation-cap",
  "i-lucide-github",
  "i-lucide-check",
  "i-lucide-x",
  "i-lucide-arrow-right",
  "i-lucide-arrow-left",
  "i-lucide-home",
  "i-lucide-settings",
];

// Custom collection icons
const customIcons = [
  "i-custom-vue-logo",
  "i-custom-nuxt-logo",
  "i-custom-learn",
];
</script>
