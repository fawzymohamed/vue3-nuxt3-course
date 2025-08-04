<script setup lang="ts">
interface ListItem {
  text: string;
  description?: string;
  icon?: string;
  badge?: string;
}

interface Props {
  items: ListItem[] | string[];
  type?: "bullet" | "numbered" | "feature" | "check";
  columns?: 1 | 2 | 3;
}

const props = withDefaults(defineProps<Props>(), {
  type: "bullet",
  columns: 1,
});

// Normalize items to have consistent structure
const normalizedItems = computed(() => {
  return props.items.map((item) => {
    if (typeof item === "string") {
      return { text: item };
    }
    return item;
  });
});

// Icon mapping for different list types
const getListIcon = (type: string, index: number) => {
  const icons = {
    bullet: "i-heroicons-minus",
    numbered: undefined, // Will show numbers
    feature: "i-heroicons-star",
    check: "i-heroicons-check",
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
  return `grid gap-3 ${classes[props.columns]}`;
});
</script>

<template>
  <div class="dev-guide-list">
    <div :class="gridClass">
      <div
        v-for="(item, index) in normalizedItems"
        :key="index"
        class="list-item"
        :class="{
          'feature-item': type === 'feature',
          'check-item': type === 'check',
        }"
      >
        <div class="flex gap-3">
          <!-- Icon or Number -->
          <div class="flex-shrink-0 mt-0.5">
            <!-- Numbered list -->
            <div
              v-if="type === 'numbered'"
              class="w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-sm font-semibold flex items-center justify-center"
            >
              {{ index + 1 }}
            </div>

            <!-- Icon lists -->
            <Icon
              v-else-if="item.icon || getListIcon(type, index)"
              :name="
                item.icon || getListIcon(type, index) || 'i-heroicons-minus'
              "
              class="w-5 h-5"
              :class="{
                'text-gray-600 dark:text-gray-400': type === 'bullet',
                'text-yellow-600 dark:text-yellow-400': type === 'feature',
                'text-green-600 dark:text-green-400': type === 'check',
              }"
            />
          </div>

          <!-- Content -->
          <div class="flex-1 min-w-0">
            <div class="flex items-start justify-between gap-2">
              <div class="flex-1">
                <div class="text-gray-900 dark:text-gray-100 font-medium">
                  {{ item.text }}
                </div>

                <div
                  v-if="item.description"
                  class="text-sm text-gray-600 dark:text-gray-400 mt-1"
                >
                  {{ item.description }}
                </div>
              </div>

              <!-- Badge -->
              <UBadge
                v-if="item.badge"
                variant="soft"
                color="primary"
                size="sm"
                class="flex-shrink-0"
              >
                {{ item.badge }}
              </UBadge>
            </div>
          </div>
        </div>
      </div>
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
