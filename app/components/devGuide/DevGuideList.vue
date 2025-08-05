<script setup lang="ts">
interface ListItem {
  text: string;
  description?: string;
  icon?: string;
  badge?: string;
}

interface Props {
  type?:
    | "bullet"
    | "numbered"
    | "features"
    | "check"
    | "components"
    | "best-practices"
    | "next-steps"
    | "troubleshooting";
  columns?: 1 | 2 | 3 | "1" | "2" | "3";
  items?: Array<
    | string
    | { text: string; description?: string; icon?: string; badge?: string }
  >;
}

const props = withDefaults(defineProps<Props>(), {
  type: "bullet",
  columns: 1,
  items: undefined,
});

// Parse slot content if no items prop provided
const slots = useSlots();

// Normalize items to have consistent structure
const normalizedItems = computed(() => {
  if (props.items?.length) {
    return props.items.map((item) => {
      if (typeof item === "string") {
        return { text: item };
      }
      return item;
    });
  }

  // Parse slot content for list items
  if (slots.default) {
    const slotContent = slots.default();
    const textContent = slotContent
      .map((node) => {
        if (typeof node.children === "string") {
          return node.children;
        }
        return "";
      })
      .join("");

    // Parse markdown-style list items
    const lines = textContent.split("\n").filter((line) => line.trim());
    return lines
      .map((line) => {
        const trimmed = line.trim();
        if (trimmed.startsWith("- ")) {
          return { text: trimmed.substring(2) };
        }
        return { text: trimmed };
      })
      .filter((item) => item.text);
  }

  return [];
});

// Icon mapping for different list types
const getListIcon = (type: string, index: number) => {
  const icons = {
    bullet: "i-heroicons-minus",
    numbered: undefined, // Will show numbers
    features: "i-heroicons-star",
    check: "i-heroicons-check",
    components: "i-heroicons-cube",
    "best-practices": "i-heroicons-light-bulb",
    "next-steps": "i-heroicons-arrow-right",
    troubleshooting: "i-heroicons-wrench-screwdriver",
  };
  return icons[type as keyof typeof icons];
};

// Grid classes based on columns
const gridClass = computed(() => {
  const classes = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  };
  const columnValue = Number(props.columns);
  return `grid gap-3 ${classes[columnValue as keyof typeof classes]}`;
});
</script>

<template>
  <div class="dev-guide-list" :class="`columns-${columns}`">
    <!-- Render from items prop if provided -->
    <ul v-if="items && items.length > 0" :class="gridClass">
      <li v-for="(item, index) in items" :key="index">
        {{ typeof item === "string" ? item : item.text }}
      </li>
    </ul>

    <!-- Render from slot content -->
    <div v-else class="slot-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.dev-guide-list {
  margin: 1rem 0;
  list-style: none !important; /* Remove default list styles */
  padding-left: 0 !important; /* Remove any default padding */
}

.dev-guide-list *,
.dev-guide-list *::before,
.dev-guide-list *::after {
  list-style: none !important; /* Ensure no child elements have list styles */
  list-style-type: none !important;
  list-style-image: none !important;
  list-style-position: outside !important;
}

/* Remove any potential bullet points from divs that might be treated as lists */
.dev-guide-list div {
  list-style: none !important;
}

.list-item {
  padding: 0.75rem 0;
  list-style: none !important; /* Remove any list styles from items */
  position: relative;
  padding: 12px !important; /* Prevent layout shift */
}

/* Ensure no pseudo-elements are creating bullet points */
.list-item::before,
.list-item::after {
  content: none !important;
  list-style: none !important;
}

.feature-item {
  padding: 1rem;
  border: 1px solid rgb(229 231 235);
  border-radius: 0.5rem;
  background: rgb(249 250 251);
  transition: all 0.2s ease;
}

.dark .feature-item {
  border-color: rgb(55 65 81);
  background: rgb(17 24 39);
}

/* .feature-item:hover {
  border-color: rgb(99 102 241);
  background: rgb(243 244 246);
}

.dark .feature-item:hover {
  border-color: rgb(129 140 248);
  background: rgb(31 41 55);
} */

.check-item {
  padding: 0.5rem;
  border-radius: 0.5rem;
  background: rgb(240 253 244);
  border: 1px solid rgb(187 247 208);
}

.dark .check-item {
  background: rgba(34, 197, 94, 0.1);
  border-color: rgba(34, 197, 94, 0.3);
}
</style>
