---
title: "Introduction "
description: "Follow these steps to set up your development environment and start working with the Learnova Academy platform."
---

## Prerequisites

Before you begin, ensure you have the following installed on your development machine:

- **Node.js 18+** - Download from [nodejs.org](https://nodejs.org/)
- **npm or yarn** - Package manager (npm comes with Node.js)
- **Git** - Version control system
- **VS Code** - Recommended code editor with Vue.js extensions

## Quick Start

### 1. Clone the Repository

```bash
# Clone the repository
git clone [repository-url]
cd learnova-academy
```

### 2. Install Dependencies

```bash
# Install all dependencies
npm install

# Or using yarn
yarn install
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```env
# Development environment
NUXT_PUBLIC_SITE_URL=http://localhost:3000
NUXT_I18N_DEFAULT_LOCALE=en
```

### 4. Start Development Server

```bash
# Start the development server
npm run dev

# The server will be available at:
# http://localhost:3000
```

::callout{type="success"}
🎉 **Success!** Your development environment is now ready. You can start building amazing learning experiences.
::

## Development Workflow

### File Structure Overview

```
learnova-academy/
├── app/                    # Application source code
│   ├── components/         # Vue components
│   ├── composables/        # Composables and utilities
│   ├── pages/             # Page routes
│   └── assets/            # Static assets
├── content/               # Markdown content
│   ├── courses/           # Course content
│   └── dev-guide/         # Development guide
├── config/                # Configuration files
└── i18n/                  # Internationalization
```

### Essential Commands

| Command              | Description              |
| -------------------- | ------------------------ |
| `npm run dev`        | Start development server |
| `npm run build`      | Build for production     |
| `npm run preview`    | Preview production build |
| `npm run type-check` | Run TypeScript checks    |
| `npm run lint`       | Run ESLint               |

## Next Steps

Once your environment is set up:

1. **Explore the codebase** - Familiarize yourself with the project structure
2. **Read the Architecture guide** - Understand the design patterns used
3. **Check out Course Management** - Learn how courses are structured
4. **Review the Content Management** - Understand how content is organized

::callout{type="info"}
💡 **Tip:** Use the navigation sidebar to explore different sections of this developer guide. Each section contains detailed information to help you become productive quickly.
::
