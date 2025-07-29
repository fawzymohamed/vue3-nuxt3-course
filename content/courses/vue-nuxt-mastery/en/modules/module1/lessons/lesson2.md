---
title: "Setting Up Your Environment"
description: "Learn how to set up Node.js, npm/yarn, and choose between Vue CLI and Vite for Vue.js development"
number: 2
module: 1
section: 1
level: "beginner"
courseId: "vue-nuxt-mastery"
moduleId: "module1"
---

::hero-section

# Setting Up Your Environment

# Node.js, npm/yarn, Vue CLI vs. Vite

::

::introduction-section

Before we dive into Vue.js development, we need to set up our development environment properly. This includes installing **Node.js**, understanding package managers, and choosing the right build tool.

_A solid foundation is key to a smooth development experience._

::

::content-section-title

# 📦 Node.js - The Foundation

::

::prose-card{title="What is Node.js?"}
**Node.js** is a JavaScript runtime built on Chrome's V8 JavaScript engine. It allows us to run JavaScript outside the browser, which is essential for:

- **Package management** with npm/yarn
- **Build tools** and development servers
- **Modern JavaScript tooling** (bundlers, transpilers)
  ::

::content-section

# Installing Node.js

Visit [nodejs.org](https://nodejs.org) and download the **LTS (Long Term Support)** version. This ensures stability and compatibility with most tools.

::

::code-example

```bash
# Check if Node.js is installed
node --version

# Check npm version
npm --version
```

::

::callout{type="tip"}
**Tip**: Use a Node.js version manager like **nvm** (Linux/Mac) or **nvm-windows** (Windows) to easily switch between Node.js versions for different projects.
::

::content-section-title

# 📚 Package Managers: npm vs. yarn

::

::feature-list

- **npm** Built into Node.js, the default package manager
- **yarn** Alternative package manager with faster installs and better caching
- **pnpm** Newer option with efficient disk space usage

::

::content-section

# npm Commands You'll Use

::

::code-example

```bash
# Initialize a new project
npm init

# Install dependencies
npm install package-name

# Install development dependencies
npm install --save-dev package-name

# Run scripts
npm run script-name

# Install packages globally
npm install -g package-name
```

::

::content-section

# yarn Commands (Alternative)

::

::code-example

```bash
# Initialize a new project
yarn init

# Install dependencies
yarn add package-name

# Install development dependencies
yarn add --dev package-name

# Run scripts
yarn script-name

# Install packages globally
yarn global add package-name
```

::

::content-section-title

# ⚡ Vue CLI vs. Vite: Choosing Your Build Tool

::

::prose-card{title="The Great Debate: Vue CLI vs. Vite"}
Both tools help you create and manage Vue.js projects, but they have different approaches and strengths.
::

::content-section

# Vue CLI - The Traditional Choice

Vue CLI is the **official** Vue.js project scaffolding tool that has been around since Vue 2.

**Pros:**

- Mature and stable
- Extensive plugin ecosystem
- Great for complex, enterprise projects
- Comprehensive configuration options

**Cons:**

- Slower development server
- Based on Webpack (more complex)
- Longer build times

::

::code-example

```bash
# Install Vue CLI globally
npm install -g @vue/cli

# Create a new project
vue create my-project

# Start development server
npm run serve
```

::

::content-section

# Vite - The Modern Alternative

Vite (pronounced "veet") is a **next-generation** build tool that's become the recommended choice for new Vue 3 projects.

**Pros:**

- Lightning-fast development server
- Instant hot module replacement
- Native ES modules support
- Simpler configuration
- Better developer experience

**Cons:**

- Newer (less mature ecosystem)
- Some plugins might not be available yet

::

::code-example

```bash
# Create a new Vue project with Vite
npm create vue@latest my-project

# Navigate to project
cd my-project

# Install dependencies
npm install

# Start development server
npm run dev
```

::

::callout{type="success"}
**Recommendation**: For new Vue 3 projects, **Vite is the recommended choice** due to its superior development experience and performance.
::

::content-section-title

# 🛠️ Creating Your First Project

::

::content-section

Let's create a new Vue project using Vite:

::

::code-example

```bash
# Create project (choose Vue, TypeScript optional)
npm create vue@latest vue-learning-project

# Navigate to the project
cd vue-learning-project

# Install dependencies
npm install

# Start the development server
npm run dev
```

::

::content-section

# Project Structure Overview

::

::code-example

```
vue-learning-project/
├── public/          # Static assets
├── src/
│   ├── assets/      # Assets processed by Vite
│   ├── components/  # Vue components
│   ├── App.vue      # Root component
│   └── main.js      # Application entry point
├── index.html       # HTML template
├── package.json     # Project dependencies
└── vite.config.js   # Vite configuration
```

::

::content-section-title

# 🔧 Essential VS Code Extensions

::

::feature-list

- **Volar** Vue 3 language support (replaces Vetur)
- **Vue VSCode Snippets** Useful Vue code snippets
- **Auto Rename Tag** Automatically rename paired HTML/XML tags
- **Bracket Pair Colorizer** Color matching brackets
- **Prettier** Code formatter
- **ESLint** JavaScript linter

::

::callout{type="info"}
**Next Steps**: In the next lesson, we'll create our first Vue application and explore the project structure in detail!
::
