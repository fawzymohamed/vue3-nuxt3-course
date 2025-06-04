<script setup>
const { locale, locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const availableLocales = computed(() => {
  return locales.value.filter((i) => i.code !== locale.value);
});

const { data: home } = await useAsyncData(() =>
  queryCollection("content").path("/").first()
);
</script>

<template>
  <UContainer>
    <!-- Content Section -->
    <div>
      <ContentRenderer v-if="home" :value="home" />
    </div>

    <!-- Language Switch Links -->
    <div class="py-10">
      <NuxtLink
        v-for="loc in availableLocales"
        :key="loc.code"
        :to="switchLocalePath(loc.code)"
        class="pb-85"
      >
        {{ loc.name }}
      </NuxtLink>
      <h1 class="py-5 text-3xl">{{ $t("welcome") }}</h1>
      <h1 class="py-5 text-3xl">This is a testing Message!</h1>
    </div>
  </UContainer>
</template>
