---
title: "Architecture"
description: "Understanding the architectural patterns and directory structure of the Learnova Academy platform"
---

Understanding the architectural patterns and directory structure of the Learnova Academy platform.

## Directory Structure

```
learnova-academy/
├── app/
│   ├── components/      # Reusable Vue components
│   ├── composables/     # Vue composables
│   ├── pages/          # Page components (routing)
│   └── assets/         # Static assets
├── content/
│   └── courses/        # Course content (Markdown)
├── i18n/
│   └── locales/        # Translation files
├── config/             # Configuration files
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## Key Architectural Patterns

- **Composables** - Reusable logic for course management and progress tracking
- **Component Architecture** - Modular, reusable components with TypeScript
- **Content Management** - Markdown-based course content with frontmatter
- **Internationalization** - Vue I18n for multilingual support
