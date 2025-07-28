<template>
  <UIcon :name="iconName" class="text-primary" />
</template>

<script setup>
/**
 * A component that displays appropriate icon based on lesson type
 */
const props = defineProps({
  type: {
    type: String,
    default: "lesson",
    validator: (value) =>
      ["lesson", "quiz", "exercise", "course"].includes(value),
  },
  customIcon: {
    type: String,
    default: "",
  },
});

// Determine which icon to use based on type
const iconName = computed(() => {
  if (props.customIcon) return props.customIcon;

  switch (props.type) {
    case "quiz":
      return "i-lucide-help-circle";
    case "exercise":
      return "i-lucide-code";
    case "course":
      return "i-heroicons-academic-cap";
    case "lesson":
    default:
      return "i-lucide-book-open";
  }
});
</script>
