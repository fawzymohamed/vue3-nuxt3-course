<template>
  <div>
    <AdminInterface />
  </div>
</template>

<script setup lang="ts">
// Page meta and SEO
definePageMeta({
  title: "Admin - Course Creation Tools",
  description: "Administrative interface for creating and managing courses",
});

const { t } = useI18n();

// Set page title and meta
useHead({
  title: t("admin.interface.title"),
  meta: [
    {
      name: "description",
      content: t("admin.courseEditor.subtitle"),
    },
  ],
});

// Optional: Add authentication check here
// const { $auth } = useNuxtApp()
// if (!$auth.user?.isAdmin) {
//   throw createError({
//     statusCode: 403,
//     statusMessage: 'Access denied - Admin privileges required'
//   })
// }
</script>
