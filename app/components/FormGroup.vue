<template>
  <div class="form-group space-y-2">
    <label
      v-if="label"
      class="block text-sm font-medium text-gray-700 dark:text-gray-300"
      :class="{
        'after:content-[\'*\'] after:ml-0.5 after:text-red-500': required,
      }"
    >
      {{ label }}
    </label>
    <slot />
    <p v-if="help" class="text-sm text-gray-500 dark:text-gray-400">
      {{ help }}
    </p>
    <p v-if="error" class="text-sm text-red-600 dark:text-red-400">
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  label?: string;
  help?: string;
  error?: string;
  required?: boolean;
}

withDefaults(defineProps<Props>(), {
  required: false,
});
</script>
