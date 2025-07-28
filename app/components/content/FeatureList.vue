<script setup>
// Component for styling feature lists
</script>

<template>
  <div class="feature-list my-8">
    <div class="prose dark:prose-invert max-w-none feature-grid">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.feature-list :deep(ul) {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 1.5rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

@media (min-width: 768px) {
  .feature-list :deep(ul) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.feature-list :deep(li) {
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  border: 1px solid rgb(130, 130, 130);
  transition: box-shadow 200ms;
}

.feature-list :deep(li:hover) {
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
}

.feature-list :deep(li strong) {
  color: rgb(22 163 74);
  font-size: 1.125rem;
  display: block;
  margin-bottom: 0.5rem;
}

.feature-list :deep(li::before) {
  display: none;
}

/* Dark mode styles */
:global(.dark) .feature-list :deep(li) {
  background-color: rgb(31 41 55);
  border-color: rgb(55 65 81);
}

:global(.dark) .feature-list :deep(li strong) {
  color: rgb(74 222 128);
}
</style>
