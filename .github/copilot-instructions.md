# AI Copilot Instructions for VueNuxtMasters

You are an expert Vue 3 and Nuxt 3 developer, assisting in building a high-quality learning platform. Your primary goal is to translate design specifications, project features, and functional requirements into clean, efficient, and maintainable code.

## 0. Project Overview & Core Mission

- **Project Goal:** To create a comprehensive, single-course learning website teaching Vue.js and Nuxt.js from beginner to advanced levels.
- **Target Audience:** Developers of all levels (beginner, intermediate, advanced) looking to learn or master Vue and Nuxt.
- **Monetization:** Initially free or an "early access" model. No complex payment gateways or user authentication for V1. Progress tracking might be client-side (localStorage) only.
- **Core Philosophy:** Provide high-quality, practical, and engaging learning content in a user-friendly interface.

## I. Overall Design Philosophy & Aesthetics

- **Modern & Clean:** The UI should feel current, uncluttered, and intuitive. Prioritize clarity and ease of use.
- **Nuxt-Inspired Theme:**
  - **Primary Color:** Nuxt Green (approx. `#00DC82`) - use for primary calls-to-action, active states, important highlights.
  - **Secondary/Accent Color:** A slightly lighter or darker shade of Nuxt Green, or a complementary subtle color (e.g., a teal or a bright but not overpowering blue like `#00A9E0` if needed for differentiation).
  - **Dark Tones:** Dark grays and near-blacks for backgrounds, text, and UI chrome (e.g., `#1E1E1E`, `#2F2F2F`, `#18181B` for dark mode elements, or as primary text on light backgrounds).
  - **Light Tones:** Off-whites and light grays for light mode backgrounds and contrasting elements (e.g., `#F3F4F6`, `#FFFFFF`).
  - **Text Colors:** High contrast is key. Dark text on light backgrounds, light text on dark backgrounds. Default body text could be a dark gray (e.g., `#333333` on light) or a light gray/white on dark.
- **Minimalism:** Avoid unnecessary decorations. Focus on typography, spacing, and subtle interactive cues.
- **Accessibility:** Ensure good color contrast (WCAG AA minimum), keyboard navigability, and semantic HTML. Use ARIA attributes where appropriate.
- **Responsive Design:** All components and layouts must be responsive, adapting gracefully from mobile to desktop screens. Use mobile-first approach where logical.

## II. Core Features (MVP - To be delivered from the start)

1.  **Course Display:**
    - Homepage/Course Landing Page: Overview, benefits, CTA to view curriculum.
    - Course Curriculum/Syllabus Page: List all modules and lessons. Lessons should indicate if they contain exercises or quizzes.
2.  **Lesson Consumption:**
    - Individual Lesson View Page: Display lesson content.
    - Navigation: Easy "Next Lesson" / "Previous Lesson" buttons. Sidebar navigation tree for current module.
3.  **Content Formats:**
    - **Text-based lessons:** Rich text formatting.
    - **Code Examples:** Clear, syntax-highlighted code blocks with a "copy to clipboard" feature.
    - **Interactive Exercises:** Embedded within lessons. Provide input area and feedback mechanism (correct/incorrect, hints).
    - **Quizzes:** Embedded within lessons (or at end of modules). Multiple-choice format initially. Show score and answers upon submission.
4.  **User Experience:**
    - Clear navigation structure.
    - Intuitive UI for interacting with exercises and quizzes.

## II.1. Multi-Language Support (Internationalization - i18n)

**CRITICAL:** This project implements full internationalization support and MUST be considered in all development decisions.

### **Supported Languages:**

- **English (en)** - Primary language
- **Arabic (ar)** - Secondary language with RTL support

### **Key Implementation Details:**

- **Translation Framework:** Uses `@nuxtjs/i18n` module with Nuxt 3
- **Locale Files:** Located in `i18n/locales/` directory (`en.json`, `ar.json`)
- **Language Switcher:** Custom `LanguageSwitcher.vue` component using UDropdownMenu
- **RTL Support:** Automatic direction handling for Arabic (`dir="rtl"`)

### **Development Guidelines:**

1. **Always Use Translation Keys:** Never hardcode text strings in components

   - ✅ Correct: `{{ $t("homepage.hero.title") }}`
   - ❌ Wrong: `"Master Vue.js and Nuxt.js"`

2. **Add New Translation Keys:** When adding new content, update BOTH locale files

   - Add to `i18n/locales/en.json`
   - Add to `i18n/locales/ar.json`
   - Use descriptive, nested key structure (e.g., `"section.subsection.key"`)

3. **Translation Key Naming Convention:**

   - Use camelCase for keys: `"primaryCta"`, `"titleHighlight"`
   - Use nested objects for organization: `"homepage.hero.title"`
   - Be descriptive and context-specific

4. **Component Translation Usage:**

   - Use `{{ $t("key") }}` in templates
   - Use `const { t } = useI18n()` and `t("key")` in script setup
   - For SEO meta: `useHead({ title: t("page.meta.title") })`

5. **Handling Dynamic Content:**

   - Use interpolation: `$t("message", { name: userName })`
   - In locale files: `"welcome": "Welcome {name}!"`

6. **RTL Considerations:**

   - Test all UI components in Arabic (RTL) mode
   - Ensure icons, layouts, and spacing work correctly
   - Use logical CSS properties when possible (e.g., `margin-inline-start` vs `margin-left`)

7. **Language Switcher Integration:**

   - The `LanguageSwitcher` component is already implemented
   - It automatically updates the UI language and persists the choice
   - Placed in the main navigation (app.vue)

8. **Navigation with i18n:**
   - Always use `localePath` for route generation in navigation links
   - ✅ Correct: `:to="localePath('/curriculum')"`
   - ❌ Wrong: `to="/curriculum"`
   - Import using: `const localePath = useLocalePath()` in script setup
   - This ensures links work correctly across language changes

### **Current Translation Structure:**

```json
{
  "resources": "...",
  "about": "...",
  "languages": { "en": "...", "ar": "..." },
  "homepage": {
    "meta": { "title": "...", "description": "..." },
    "hero": { "title": "...", "titleHighlight": "...", "subtitle": "..." },
    "benefits": { ... },
    "modules": { ... },
    "finalCta": { ... }
  },
  "footer": { "copyright": "..." }
}
```

### **Testing Multi-Language:**

- Always test new features in both English and Arabic
- Verify text truncation, layout shifts, and RTL behavior
- Ensure all user-facing text is translatable

## III. Content Structure & Management

- **Content Source:** Markdown files located in the `content/` directory, managed by the `@nuxt/content` module.
- **Markdown Organization:**
  - Nested directory structure: `content/<module-order>-<module-slug>/<lesson-order>-<lesson-slug>.md`
    - Example: `content/1-vue-fundamentals/1-what-is-vue.md`
- **Lesson Frontmatter (Essential):**
  - `title: String` (Lesson title)
  - `description: String` (Brief lesson summary for SEO and listings)
  - `order: Number` (Lesson order within its module)
  - `level: String` (Optional: 'beginner', 'intermediate', 'advanced')
  - `hasExercise: Boolean` (True if an interactive exercise is part of the lesson content)
  - `hasQuiz: Boolean` (True if a quiz is part of the lesson content)
  - `quizData: Object` (If `hasQuiz` is true, structured data for the quiz. e.g., `{ type: 'multiple-choice', question: '...', options: [...], answer: '...' }`)
  - `exerciseData: Object` (If `hasExercise` is true, structured data or instructions for the exercise component to render it.)
- **Course Syllabus:** The full syllabus outline, detailing all modules and lessons (approximately 6 modules covering Vue basics, intermediate Vue, advanced Vue, Nuxt basics, advanced Nuxt, and a final project), will guide the creation of these Markdown files.

## IV. Layout & Structure (General Webpage Elements)

- **Spacing:** Generous use of whitespace. Consistent padding and margins.
  - Default padding for containers: `p-4` or `p-6` (Tailwind).
  - Default margin between major sections: `my-6` or `my-8`.
- **Grid System:** Primarily use CSS Flexbox or CSS Grid for layout (Tailwind classes preferred).
- **Common Layouts:**
  - **Main App Layout (`layouts/default.vue`):**
    - Header: Logo/Site Title, main navigation links (e.g., "Course Curriculum").
    - Main Content Slot: `<slot />` for page content.
    - Footer: Copyright, other relevant links.
  - **Lesson View Layout (potentially a separate layout or achieved with components):** Sidebar for lesson navigation within the current module, main area for lesson content.
- **Modularity:** Design components to be reusable and self-contained.

## V. Typography

- **Primary Font:** A clean, modern sans-serif font. Consider system fonts first for performance, or a readily available Google Font like 'Inter', 'Roboto', or 'Open Sans'.
  - Example: `font-sans` (if Tailwind is configured with a good default sans-serif stack).
- **Headings:**
  - `h1`: Large, prominent (e.g., `text-3xl` or `text-4xl`, `font-bold`).
  - `h2`: Smaller than `h1` (e.g., `text-2xl`, `font-semibold`).
  - `h3`: (e.g., `text-xl`, `font-semibold`).
- **Body Text:** Legible size (e.g., `text-base` which is typically `16px`), normal font weight. Line height should be comfortable (e.g., `leading-relaxed` or `1.6`).
- **Code Blocks:** Monospace font (e.g., 'Fira Code', 'Source Code Pro', or Tailwind's `font-mono`). Clear visual distinction from body text (e.g., different background, subtle border). Syntax highlighting via Nuxt Content's MDC or a similar solution.

## VI. Component-Specific Styling Guidelines

- **Buttons:**
  - **Primary CTA:** Nuxt Green background (`bg-green-500 hover:bg-green-600` - adjust Tailwind shades to match `#00DC82`), white/dark text for contrast. Rounded corners (e.g., `rounded-md`). Clear hover and active states.
  - **Secondary/Ghost Buttons:** Transparent background with a colored border (e.g., Nuxt Green border, Nuxt Green text) or a light gray background.
  - **Padding:** `py-2 px-4` or `py-3 px-6` depending on importance.
- **Forms & Inputs (for exercises/quizzes):**
  - Clean, simple borders (e.g., `border-gray-300`).
  - Focus state should be clear (e.g., border color change to Nuxt Green or a focus ring).
  - Adequate padding within inputs.
  - Labels clearly associated with inputs.
- **Cards/Containers (e.g., for module listings, lesson previews):**
  - Subtle rounded corners (e.g., `rounded-lg`).
  - Optional: light border (`border border-gray-200` on light mode) or a very subtle box shadow (`shadow-sm` or `shadow-md`).
  - Background often off-white/light gray on a light page, or dark gray on a dark page.
- **Navigation (Menus, Sidebars):**
  - Active links should be clearly indicated (e.g., Nuxt Green text, different background, or a small accent border).
  - Sufficient spacing between nav items.
- **Code Examples:**
  - Use Nuxt Content's built-in capabilities for syntax highlighting (MDC - Markdown Components).
  - "Copy to clipboard" button, easily accessible.
- **Interactive Elements (Exercises, Quizzes):**
  - These will be custom Vue components rendered by Nuxt Content, possibly triggered by specific Markdown syntax or components within Markdown.
  - Design for clarity: clear instructions, distinct input areas, obvious submission buttons.
  - Feedback (correct/incorrect) should be unambiguous using color (e.g., green for correct, red for incorrect) and icons/text.

## VII. Technical Stack & Vue/Nuxt Specific Instructions

- **Framework:** Nuxt 3
- **Language:** TypeScript (implied by Nuxt 3 defaults, strive for type safety).
- **Content Management:** `@nuxt/content` module for all course content.
- **Styling:**
  - **Tailwind CSS First:** Prioritize using `@nuxt/ui` utility classes for all styling. Do not use Nuxt UI Pro components at all.
  - **Scoped Styles:** If custom CSS is absolutely necessary beyond Tailwind's capabilities, use `<style scoped>` in Vue components. Avoid global styles unless for foundational resets or typography.
  - **No Inline Styles:** Avoid inline `style="..."` attributes unless dynamically generated and unavoidable.
- **State Management:** Pinia for any complex global/shared state if needed. `useState` for simple SSR-friendly shared state. For MVP, complex state management might be minimal.
- **Server Capabilities:** Nuxt server routes (`server/api/`) can be used for quiz/exercise answer validation if client-side is insufficient, but aim for client-side simplicity for V1 where possible.
- **Deployment:** Vercel (for both static and SSR builds). Vercel's serverless functions can be used if more complex backend logic is needed.
- **File Structure:** Adhere to standard Nuxt 3 directory structure.
- **Component Naming:** PascalCase (e.g., `LessonCard.vue`). Auto-imported components in Nuxt.
- **Script Setup:** Use `<script setup>` for all new Vue components.
- **Props & Emits:** Clearly define props with types. Use `defineEmits` for component events.
- **Composables:** Use for reusable logic. Place in `composables/` directory for auto-import.
- **Data Fetching (for Nuxt Content):** Primarily using `queryContent()` and Nuxt Content's provided components/composables to render content.

## VIII. Interaction & User Experience

- **Feedback:** Provide immediate visual feedback for user actions (e.g., button clicks, form submissions).
- **Loading States:** Implement clear loading indicators (e.g., spinners, skeletons) if any data fetching outside Nuxt Content causes delays. Nuxt Content is generally very fast.
- **Error Handling:** Display user-friendly error messages (e.g., Nuxt's default error page, customizable).
- **Transitions & Animations:** Use subtle transitions for a smoother experience (e.g., hover effects). Nuxt page transitions can be considered if they enhance UX without performance cost.

## IX. Code Quality & Best Practices

- **Readability:** Write clean, well-commented code where necessary.
- **DRY Principle:** Don't Repeat Yourself. Utilize components and composables.
- **Performance:** Be mindful of performance implications. Nuxt and Nuxt Content are optimized, but custom components should also be efficient.
- **Semantic HTML:** Use appropriate HTML tags for their meaning.

---

## X. Final Notes

- **MULTI-LANGUAGE PRIORITY:** Always consider internationalization first. Every user-facing text must use translation keys. Test in both English and Arabic.
- **Documentation:** Keep code well-documented. Use JSDoc comments for complex functions or components.
- **Version Control:** Use Git for version control. Commit often with clear messages.
- **Development environment:** Windows 11.
- Don't hesitate to ask for clarification on any point or if you need more context about a specific feature or design choice.
- Don't ask for permission when fetching data from the Internet, but ensure it aligns with the project's goals and respects any API usage limits or terms of service.

By following these guidelines, you will help create a consistent, beautiful, and effective learning platform. When in doubt, ask for clarification or refer back to these principles. Let's build something great!
