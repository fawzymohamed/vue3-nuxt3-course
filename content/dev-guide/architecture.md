---
title: "System Architecture"
description: "Comprehensive overview of Learnova Academy's system architecture and design patterns"
---

## DevGuideSection Component Example

::dev-guide-section{title="Icon System Overview" icon="🎨" description="Comprehensive guide to the Learnova Academy icon system"}

Learnova Academy uses **@nuxt/icon** with multiple icon collections to provide a comprehensive and consistent icon experience across the platform. The system supports both external icon libraries and custom project-specific icons.

::

---

## DevGuideTechCard Component Example

::dev-guide-tech-card{title="@nuxt/icon" version="^1.13.0" description="Primary icon system with automatic optimization and multiple collection support" link="https://icon.nuxt.com" badge="Core Module" badgeColor="neutral"}

lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in venenatis enim. Sed at ligula nec leo facilisis aliquet.
::

---

## DevGuideList Component Example

::dev-guide-list{type="features" columns="2"}

- **Icon Collections**: Support for multiple icon libraries
- **Auto-optimization**: Automatic icon optimization and tree-shaking
- **Custom Icons**: Project-specific icon support
- **Consistent Sizing**: Standardized icon dimensions across components
- **Dark Mode**: Full dark mode compatibility
- **Performance**: Lazy loading and caching optimization

::

---

## DevGuideCodeBlock Component Tests

::dev-guide-code-block{language="typescript" filename="example.ts"}

```typescript
const example = "Hello World";
export { example };
```

::

---

## DevGuideCallout Component Example

::dev-guide-callout{type="tip" title="Icon Dependencies"}
The following icon collections are available in this project through npm packages:

- **@iconify-json/heroicons**: Tailwind's Heroicons collection
- **@iconify-json/lucide**: Lucide icon collection
- **Custom icons**: Project-specific SVG icons in `app/assets/icons/`

::
