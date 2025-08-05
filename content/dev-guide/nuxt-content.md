---
title: "Nuxt Content & MDC System"
description: "Complete guide to using Nuxt Content with MDC (Markdown Components) in the Learnova Academy platform"
---

::dev-guide-section{title="What is MDC?" icon="📝" description="Understanding the power of Markdown Components in Nuxt Content"}

**MDC (Markdown Components)** is a revolutionary feature of Nuxt Content that allows you to embed **Vue components directly inside markdown files**. Instead of being limited to plain markdown syntax, you can create **interactive, dynamic content** that leverages the full power of Vue.js components.

Think of MDC as giving your markdown files **superpowers** - you can now create rich, interactive documentation, tutorials, and content pages that feel more like modern web applications than static documents.

::

::dev-guide-callout{type="info" title="Developer Benefits"}
MDC enables our development team to:

- **🧩 Reusable Components**: Create once, use everywhere across all content
- **⚡ Interactive Content**: Build engaging learning experiences beyond static text
- **🎨 Consistent Design**: Maintain design system consistency across all documentation
- **🔧 Developer Experience**: Write content in familiar markdown while accessing Vue's power
- **📱 Responsive**: All components are built with mobile-first responsive design
- **🌐 i18n Ready**: Components support our bilingual (English/Arabic) platform requirements

::

::dev-guide-section{title="The MDC System Architecture" icon="🏗️" description="Understanding how components are discovered and rendered"}

Our MDC system follows a **convention-based approach** where the file structure determines how components are accessed in markdown files.

::

::dev-guide-tech-card{title="Auto-Discovery System" version="Nuxt 4" description="Components are automatically discovered based on file structure and converted to kebab-case MDC syntax" badge="Core Feature" badgeColor="primary"}

The naming convention follows this pattern:

```
app/components/[folder]/[ComponentName].vue → ::folder-component-name::
```

**Examples:**

- `app/components/devGuide/DevGuideSection.vue` → `::dev-guide-section::`
- `app/components/content/ContentCallout.vue` → `::content-callout::`
- `app/components/ui/UiButton.vue` → `::ui-button::`
  ::

::dev-guide-code-block{language="vue" filename="components/example/ExampleComponent.vue"}

```vue
<script setup lang="ts">
// ✅ Define clear TypeScript interfaces for props
interface Props {
  title: string;
  description?: string;
  type?: "default" | "featured";
  showIcon?: boolean;
}

// ✅ Use withDefaults for optional props
const props = withDefaults(defineProps<Props>(), {
  description: undefined,
  type: "default",
  showIcon: true,
});
</script>

<template>
  <div class="example-component">
    <!-- ✅ Display props in template -->
    <h3>{{ title }}</h3>
    <p v-if="description">{{ description }}</p>

    <!-- ✅ CRITICAL: Always include slot for MDC content -->
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
/* ✅ Component-specific styles */
.example-component {
  /* Your styles here */
}
</style>
```

::
::

::dev-guide-section{title="Complete Implementation Guide" icon="🛠️" description="Follow these steps to add a new section to the dev-guide"}

This guide will walk you through creating a new tab/section in the dev-guide system, from content creation to navigation integration.

::

::dev-guide-step{number="1" title="Create Markdown File" description="Create the content file that will contain your new section"}

Create a new markdown file in the content directory:

```bash
# File location
content/dev-guide/your-section-name.md
```

**Template structure:**

```markdown
title: "Your Section Title"
description: "Brief description of what this section covers"

::dev-guide-section{title="Introduction" icon="🎯" description="Section overview"}
Start with an introduction using the dev-guide-section component.
::

<!-- Add more content using available DevGuide components -->
```

::

::dev-guide-step{number="2" title="Configure Navigation" description="Add your new section to the dev-guide navigation system"}

Update the navigation configuration to include your new section:

```typescript
// Update the navigation data structure
const sections = [
  {
    id: "getting-started",
    title: "Getting Started",
    icon: "heroicons:rocket-launch",
    file: "getting-started",
  },
  {
    id: "development-stack",
    title: "Development Stack",
    icon: "heroicons:cube",
    file: "development-stack",
  },
  {
    id: "architecture",
    title: "System Architecture",
    icon: "heroicons:building-library",
    file: "architecture",
  },
  {
    id: "nuxt-content",
    title: "Nuxt Content",
    icon: "heroicons:document-text",
    file: "nuxt-content",
  },
  // ✅ Add your new section here
  {
    id: "your-section-id",
    title: "Your Section Title",
    icon: "heroicons:your-icon",
    file: "your-section-name",
  },
];
```

::

::dev-guide-step{number="3" title="Implement Content Loading" description="Use the mandatory content loading pattern for proper SSR/hydration"}

**CRITICAL**: Always use this pattern for loading content:

```typescript
// ✅ MANDATORY: Use queryCollection with useAsyncData wrapper
const { data: allContent } = await useAsyncData(
  "dev-guide-content",
  async () => {
    try {
      const [section1, section2, yourNewSection] = await Promise.all([
        queryCollection("content")
          .path("/dev-guide/getting-started")
          .first()
          .catch(() => null),
        queryCollection("content")
          .path("/dev-guide/development-stack")
          .first()
          .catch(() => null),
        queryCollection("content")
          .path("/dev-guide/your-section-name")
          .first()
          .catch(() => null),
      ]);
      return [section1, section2, yourNewSection].filter(Boolean);
    } catch (error) {
      console.error("Error loading content:", error);
      return [];
    }
  }
);
```

**Key points:**

- ✅ Wrap in `useAsyncData` with unique key
- ✅ Use `Promise.all` for parallel loading
- ✅ Add `.catch(() => null)` for error handling
- ✅ Filter out null results

::

::dev-guide-step{number="4" title="Use DevGuide Components" description="Structure your content using our established component system"}

Use these components to structure your content effectively:

**Section Headers:**

```markdown
::dev-guide-section{title="Your Title" icon="🎯" description="Section description"}
Content goes here
::
```

**Technology Cards:**

```markdown
::dev-guide-tech-card{title="Technology Name" version="1.0.0" description="Technology description" link="https://example.com" badge="Framework" badgeColor="primary"}
Additional information about the technology
::
```

**Code Examples:**

````markdown
::dev-guide-code-block{language="typescript" filename="example.ts"}
\```typescript
const example = "Your code here";
export { example };
\```
::
````

**Information Callouts:**

```markdown
::dev-guide-callout{type="info" title="Important Note"}
Your important information here
::
```

**Feature Lists:**

```markdown
::dev-guide-list{type="features" columns="2"}

- Feature 1: Description
- Feature 2: Description
- Feature 3: Description
  ::
```

::

::dev-guide-step{number="5" title="Test Implementation" description="Verify everything works correctly"}

**Testing checklist:**

1. **✅ Content Loading**: Verify content loads without errors
2. **✅ Navigation**: Check that navigation includes your new section
3. **✅ Components**: Ensure all MDC components render correctly
4. **✅ Responsive**: Test on mobile and desktop
5. **✅ Dark Mode**: Verify dark mode compatibility
6. **✅ Build**: Run `npm run build` to test production build

**Common issues to check:**

- Component names match file structure exactly
- MDC syntax is properly formatted (no extra spaces/characters)
- Props are correctly typed in components
- Slot content is handled appropriately

::

::dev-guide-section{title="Component Library Reference" icon="🧩" description="Complete reference of available DevGuide components for content creation"}

Here's the complete library of DevGuide components available for creating rich content:

::

::dev-guide-list{type="components" columns="1"}

- **DevGuideSection** (`::dev-guide-section::`): Main section headers with icons and descriptions
- **DevGuideCallout** (`::dev-guide-callout::`): Information boxes with different types (info, warning, success, error)
- **DevGuideList** (`::dev-guide-list::`): Flexible lists with multiple display types and column layouts
- **DevGuideTechCard** (`::dev-guide-tech-card::`): Technology showcase cards with versioning and metadata
- **DevGuideCodeBlock** (`::dev-guide-code-block::`): Syntax-highlighted code blocks with copy functionality
- **DevGuideStep** (`::dev-guide-step::`): Step-by-step tutorial components with progress indicators and connector lines

::

::dev-guide-code-block{language="markdown" filename="content-examples.md"}

````markdown
<!-- Section Header -->

::dev-guide-section{title="Your Title" icon="🎯" description="Description"}
Content for this section
::

<!-- Information Callout -->

::dev-guide-callout{type="warning" title="Important"}
Critical information here
::

<!-- Technology Card -->

::dev-guide-tech-card{title="Vue 3" version="^3.4.0" description="Progressive framework" link="https://vuejs.org" badge="Framework" badgeColor="success"}
Additional details about Vue 3
::

<!-- Feature List -->

::dev-guide-list{type="features" columns="2"}

- Feature 1: Description
- Feature 2: Description
  ::

<!-- Code Block -->

::dev-guide-code-block{language="typescript" filename="example.ts"}
\```typescript
const example = "Hello World";
\```
::
````

::

::dev-guide-section{title="Extending the Component System" icon="⚙️" description="How to create new DevGuide components when needed"}

Sometimes you need a specialized component for unique content. Here's how to create new DevGuide components:

::

::dev-guide-code-block{language="vue" filename="components/devGuide/DevGuideNewComponent.vue"}

```vue
<script setup lang="ts">
// ✅ Define clear TypeScript interface
interface Props {
  title: string;
  subtitle?: string;
  type?: "default" | "highlighted";
  showBorder?: boolean;
}

// ✅ Use withDefaults for optional props
const props = withDefaults(defineProps<Props>(), {
  subtitle: undefined,
  type: "default",
  showBorder: true,
});

// ✅ Computed properties for dynamic styling
const componentClasses = computed(() => ({
  "border-2 border-gray-200 dark:border-gray-700": props.showBorder,
  "bg-primary-50 dark:bg-primary-900/20": props.type === "highlighted",
  "bg-gray-50 dark:bg-gray-800": props.type === "default",
}));
</script>

<template>
  <div
    class="dev-guide-new-component rounded-lg p-6 my-6"
    :class="componentClasses"
  >
    <!-- ✅ Component header -->
    <header class="mb-4">
      <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100">
        {{ title }}
      </h3>
      <p v-if="subtitle" class="text-gray-600 dark:text-gray-400 mt-1">
        {{ subtitle }}
      </p>
    </header>

    <!-- ✅ CRITICAL: Always include slot for MDC content -->
    <div class="content prose prose-gray dark:prose-invert max-w-none">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.dev-guide-new-component {
  /* Component-specific styles */
}
</style>
```

::

::dev-guide-callout{type="success" title="DevGuide Component Standards"}
Follow these principles when creating new DevGuide components:

- **🎯 Single Purpose**: Each component should have a clear, specific purpose
- **📱 Responsive**: Built with mobile-first approach using Tailwind CSS
- **🌙 Dark Mode**: Full support for light/dark themes
- **♿ Accessible**: Proper ARIA labels, semantic HTML, keyboard navigation
- **🌐 i18n Ready**: Design with bilingual content in mind
- **🔧 Type Safe**: Comprehensive TypeScript interfaces
- **🎨 Design System**: Consistent with @nuxt/ui and platform design tokens
  ::

::

::dev-guide-section{title="Developer Guidelines" icon="💡" description="Essential tips for working with the MDC system effectively"}

These practices will help you create maintainable, high-quality content and components:

::

::dev-guide-list{type="best-practices" columns="1"}

- **📁 Logical Structure**: Organize content files by topic and complexity level
- **📝 Clear Naming**: Use descriptive filenames that match navigation labels
- **🔗 Cross-References**: Link related sections and provide clear navigation paths
- **📊 Progressive Disclosure**: Start with overview, then dive into details
- **🎯 Developer Focus**: Write for developers who will work on this codebase
- **🔄 Keep Updated**: Regularly review and update content as the system evolves

::

::dev-guide-list{type="numbered" columns="1"}

1. **Design First**: Sketch the component layout and define its purpose clearly
2. **Props Planning**: Define a clear, minimal set of props that cover all use cases
3. **Slot Strategy**: Always include slots for flexible content, design for reusability
4. **Error Handling**: Gracefully handle missing props and edge cases
5. **Testing**: Test components in isolation and within actual content
6. **Documentation**: Include clear examples and usage guidelines

::

::dev-guide-callout{type="info" title="Optimization Guidelines"}
Keep these performance principles in mind:

- **🚀 Lazy Loading**: Components are automatically code-split by Nuxt
- **📦 Bundle Size**: Keep components focused to minimize individual bundle sizes
- **🔄 Caching**: Content is cached by Nuxt Content for optimal performance
- **📱 Mobile First**: Optimize for mobile performance and slower connections
- **🖼️ Image Optimization**: Use Nuxt Image for any images within components

::

::dev-guide-section{title="Real-World Usage Patterns" icon="🎨" description="Common patterns and examples for effective MDC usage"}

Learn from these proven patterns used throughout the Learnova Academy platform:

::

::dev-guide-code-block{language="markdown" filename="typical-doc-structure.md"}

````markdown
title: "Your Page Title"
description: "Clear, concise description"

::dev-guide-section{title="Overview" icon="🎯" description="What this covers"}
Brief introduction to the topic
::

::dev-guide-section{title="Core Concepts" icon="🧠" description="Key ideas"}

::dev-guide-tech-card{title="Technology" version="1.0" description="Details"}
More information about the technology
::

::dev-guide-code-block{language="typescript" filename="example.ts"}
\```typescript
// Your code example here
\```
::

::

::dev-guide-callout{type="warning" title="Critical Information"}
Important details that developers need to know
::

::dev-guide-list{type="next-steps" columns="1"}

- Step 1: What to do next
- Step 2: Additional resources
  ::
````

::

::dev-guide-list{type="features" columns="2"}

- **Left Column**: Use for primary content, detailed explanations, and main concepts
- **Right Column**: Perfect for related links, quick tips, metadata, and supplementary information
- **Single Column**: Best for code blocks, detailed explanations, and sequential content
- **Responsive**: All layouts automatically adapt to mobile screens

::

::dev-guide-section{title="Debugging MDC Problems" icon="🐛" description="Solutions to common issues when working with MDC"}

When things don't work as expected, here's how to diagnose and fix issues:

::

::dev-guide-callout{type="warning" title="Component Shows as Raw Text"}
If you see the raw MDC syntax instead of the rendered component:

**Possible causes:**

- Component file doesn't exist in the expected location
- Component name doesn't match MDC syntax
- Syntax errors in the component file
- Missing props or incorrect prop types

**Solutions:**

1. Check file exists: `app/components/devGuide/YourComponent.vue`
2. Verify naming: `DevGuideExample.vue` → `::dev-guide-example::`
3. Check browser console for Vue errors
4. Validate component props match usage

::

::dev-guide-callout{type="warning" title="MDC Syntax Issues"}
Common syntax problems and fixes:

```markdown
<!-- ❌ Wrong: Extra spaces or characters -->

:: dev-guide-section {title="Test"}
Content
::

<!-- ❌ Wrong: Incorrect prop syntax -->

::dev-guide-section{title=Test without quotes}
Content
::

<!-- ✅ Correct: Clean syntax -->

::dev-guide-section{title="Test"}
Content
::
```

::

::dev-guide-list{type="troubleshooting" columns="1"}

- **Slow Loading**: Check if components have heavy dependencies or complex computations
- **Bundle Size**: Ensure components are focused and don't import unnecessary libraries
- **Memory Leaks**: Avoid reactive data that doesn't clean up properly
- **Hydration Mismatches**: Always use the mandatory content loading pattern

::

Now you have everything you need to effectively work with the MDC system in Learnova Academy! 🚀
