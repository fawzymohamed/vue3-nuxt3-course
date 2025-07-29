# Examples System Documentation

This directory contains development-only example pages for the VueNuxtMasters project.

## Structure

```
app/pages/examples/
├── index.vue                    # Examples Hub (main landing page)
├── icons-system/
│   └── index.vue               # Icon system examples
├── components/                 # Future: UI component examples
├── layouts/                    # Future: Layout examples
├── animations/                 # Future: Animation examples
├── forms/                      # Future: Form examples
└── data-visualization/         # Future: Data visualization examples
```

## Adding New Example Pages

### 1. Create the Directory and File

```bash
# Create new example category
mkdir app/pages/examples/your-category
touch app/pages/examples/your-category/index.vue
```

### 2. Page Template

Use this template for new example pages:

```vue
<script setup lang="ts">
const localePath = useLocalePath();
const appConfig = useAppConfig();

// Redirect to home page in production
if (import.meta.env.PROD) {
  await navigateTo(localePath("/"));
}

// SEO Meta (only in development)
useHead({
  title: "Your Example Title - VueNuxtMasters (Dev Only)",
  meta: [
    {
      name: "description",
      content: "Description of your example page.",
    },
    {
      name: "robots",
      content: "noindex, nofollow",
    },
  ],
});
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Header -->
    <section
      class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700"
    >
      <UContainer>
        <div class="py-12">
          <!-- Dev Mode Badge -->
          <div class="mb-4">
            <span
              class="inline-flex items-center gap-2 px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 text-sm font-medium rounded-full border border-orange-200 dark:border-orange-800"
            >
              <UIcon name="i-lucide-code" class="w-4 h-4" />
              Development Mode Only
            </span>
          </div>

          <!-- Breadcrumb -->
          <nav class="mb-4">
            <ol
              class="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400"
            >
              <li>
                <NuxtLink
                  :to="localePath('/examples')"
                  class="hover:text-gray-700 dark:hover:text-gray-300"
                >
                  Examples
                </NuxtLink>
              </li>
              <li class="flex items-center">
                <UIcon name="i-lucide-chevron-right" class="w-4 h-4 mx-2" />
                <span class="text-gray-700 dark:text-gray-300"
                  >Your Category</span
                >
              </li>
            </ol>
          </nav>

          <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Your Example Title
          </h1>
          <p class="text-lg text-gray-600 dark:text-gray-300 max-w-3xl">
            Description of what this example demonstrates.
          </p>
        </div>
      </UContainer>
    </section>

    <!-- Your Example Content -->
    <section class="py-16">
      <UContainer>
        <!-- Add your example content here -->
      </UContainer>
    </section>

    <!-- Back to Examples Hub -->
    <section class="py-8 border-t border-gray-200 dark:border-gray-700">
      <UContainer>
        <div class="text-center">
          <UButton
            :to="localePath('/examples')"
            variant="outline"
            size="lg"
            class="inline-flex items-center gap-2"
          >
            <UIcon :name="appConfig.ui.icons.arrowLeft" class="w-4 h-4" />
            Back to Examples Hub
          </UButton>
        </div>
      </UContainer>
    </section>
  </div>
</template>
```

### 3. Update the Examples Hub

Add your new example to the `examplePages` array in `app/pages/examples/index.vue`:

```javascript
{
  id: 'your-category',
  title: 'Your Example Title',
  description: 'Brief description of what this example demonstrates.',
  icon: 'i-lucide-your-icon', // Choose appropriate icon
  color: 'blue', // blue, green, purple, yellow, indigo, emerald
  path: '/examples/your-category',
  tags: ['Tag1', 'Tag2', 'Tag3'],
  status: 'ready' // or 'coming-soon'
}
```

## Development Protection

All example pages are automatically protected by:

1. **Runtime Redirect**: `if (import.meta.env.PROD)` check redirects to home in production
2. **SEO Protection**: `robots: noindex, nofollow` prevents search engine indexing
3. **Visual Indicators**: Orange "Development Mode Only" badges

## Best Practices

### Page Structure

- Always include the dev mode badge
- Add breadcrumb navigation
- Use consistent styling and layout
- Include "Back to Examples Hub" button

### Content Organization

- Break examples into clear sections
- Include code snippets with syntax highlighting
- Add explanatory text for each example
- Use consistent spacing and typography

### Code Examples

```vue
<!-- Good: Clear section with explanation -->
<div class="bg-white dark:bg-gray-800 rounded-lg p-8 border">
  <h2 class="text-2xl font-bold mb-4">Example Title</h2>
  <p class="text-gray-600 dark:text-gray-300 mb-6">
    Explanation of what this example demonstrates.
  </p>

  <!-- Example implementation -->
  <div class="space-y-4">
    <!-- Your example here -->
  </div>

  <!-- Code snippet -->
  <div class="mt-6 bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
    <h4 class="font-semibold mb-2">Code Example:</h4>
    <pre class="text-sm overflow-x-auto"><code><!-- Your code here --></code></pre>
  </div>
</div>
```

### Styling Guidelines

- Use the project's design system colors and components
- Follow the existing color scheme (green primary, gray neutrals)
- Ensure dark mode compatibility
- Use consistent spacing with Tailwind utilities

## Available Resources

### Icons

- **Heroicons**: `i-heroicons-{name}`
- **Lucide**: `i-lucide-{name}`
- **Custom**: `custom-{filename}`
- **App Config**: `appConfig.ui.icons.{shortcut}`

### Components

- All `@nuxt/ui` components are available
- Project-specific components in `app/components/`
- Use `UContainer`, `UButton`, `UIcon`, etc.

### Utilities

- `useLocalePath()` for i18n routing
- `useAppConfig()` for accessing app configuration
- `useHead()` for SEO meta
- `useDevOnly()` for development mode checks

## Future Enhancements

Consider adding these features to future examples:

- Interactive playground areas
- Copy-to-clipboard functionality
- Live code editing
- Example downloads
- Related examples suggestions
