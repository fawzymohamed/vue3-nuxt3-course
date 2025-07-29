<script setup lang="ts">
const { t } = useI18n();

// SEO Meta for contact page
useHead({
  title: t("contact.meta.title"),
  meta: [
    {
      name: "description",
      content: t("contact.meta.description"),
    },
  ],
});
</script>

<template>
  <div>
    <UContainer>
      <div class="py-8 lg:py-16">
        <div class="text-center">
          <h1
            class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl"
          >
            {{ t("contact.title") }}
          </h1>
          <p class="mt-4 text-lg text-gray-600 dark:text-gray-300">
            {{ t("contact.subtitle") }}
          </p>
        </div>

        <div class="mt-16 max-w-2xl mx-auto">
          <div class="text-center">
            <p class="text-gray-600 dark:text-gray-300 mb-8">
              {{ t("contact.content") }}
            </p>

            <div class="space-y-4">
              <p>
                <strong>{{ t("contact.email.label") }}:</strong>
                <a
                  href="mailto:hello@vuenuxtmasters.com"
                  class="text-primary-600 hover:text-primary-500"
                >
                  hello@vuenuxtmasters.com
                </a>
              </p>

              <p>
                <strong>{{ t("contact.social.label") }}:</strong>
                <a href="#" class="text-primary-600 hover:text-primary-500 mx-2"
                  >Twitter</a
                >
                <a href="#" class="text-primary-600 hover:text-primary-500 mx-2"
                  >GitHub</a
                >
                <a href="#" class="text-primary-600 hover:text-primary-500 mx-2"
                  >Discord</a
                >
              </p>
            </div>
          </div>
        </div>
      </div>
    </UContainer>
  </div>
</template>
