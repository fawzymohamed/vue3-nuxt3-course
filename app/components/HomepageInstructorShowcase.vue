<template>
  <section class="py-16 lg:py-20">
    <UContainer>
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-12">
          <h2
            class="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            {{ $t("homepage.instructors.title") }}
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {{ $t("homepage.instructors.subtitle") }}
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="instructor in instructors"
            :key="instructor.id"
            class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200 text-center"
          >
            <div class="mb-4">
              <img
                :src="instructor.avatar"
                :alt="instructor.name"
                class="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
              />
              <h3
                class="text-xl font-semibold text-gray-900 dark:text-white mb-1"
              >
                {{ instructor.name }}
              </h3>
              <p class="text-green-600 dark:text-green-400 font-medium mb-3">
                {{ instructor.title[locale] }}
              </p>
            </div>

            <p
              class="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4"
            >
              {{ instructor.bio[locale] }}
            </p>

            <div class="flex flex-wrap justify-center gap-2 mb-4">
              <UBadge
                v-for="skill in instructor.skills"
                :key="skill"
                size="xs"
                color="primary"
                variant="soft"
              >
                {{ skill }}
              </UBadge>
            </div>

            <div class="flex justify-center gap-3">
              <UButton
                v-if="instructor.social?.github"
                :to="instructor.social.github"
                target="_blank"
                variant="ghost"
                size="xs"
                icon="i-heroicons-code-bracket"
              />
              <UButton
                v-if="instructor.social?.twitter"
                :to="instructor.social.twitter"
                target="_blank"
                variant="ghost"
                size="xs"
                icon="i-heroicons-at-symbol"
              />
              <UButton
                v-if="instructor.social?.website"
                :to="instructor.social.website"
                target="_blank"
                variant="ghost"
                size="xs"
                icon="i-heroicons-globe-alt"
              />
            </div>
          </div>
        </div>

        <div class="text-center mt-12">
          <UButton
            :to="localePath('/about')"
            variant="outline"
            size="lg"
            class="border-green-400 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20"
          >
            {{ $t("homepage.instructors.learnMore") }}
          </UButton>
        </div>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
const { t, locale } = useI18n();
const localePath = useLocalePath();

// Featured instructors (could be fetched from API in real implementation)
const instructors = [
  {
    id: "1",
    name: "Ahmed Hassan",
    title: {
      en: "Vue.js & Frontend Expert",
      ar: "خبير Vue.js والواجهة الأمامية",
    },
    bio: {
      en: "Experienced frontend developer with 8+ years in Vue.js and modern JavaScript frameworks. Passionate about teaching and building beautiful user interfaces.",
      ar: "مطور واجهة أمامية ذو خبرة تزيد عن 8 سنوات في Vue.js وأطر العمل الحديثة. شغوف بالتدريس وبناء واجهات مستخدم جميلة.",
    },
    avatar: "/instructor-avatar.png",
    skills: ["Vue.js", "Nuxt.js", "TypeScript", "CSS"],
    social: {
      github: "https://github.com/ahmedhassan",
      twitter: "https://twitter.com/ahmedhassan",
      website: "https://ahmedhassan.dev",
    },
  },
  {
    id: "2",
    name: "Sarah Johnson",
    title: {
      en: "Full-Stack JavaScript Developer",
      ar: "مطورة JavaScript كاملة المستوى",
    },
    bio: {
      en: "Full-stack developer specializing in Node.js and Vue.js. Author of several popular open-source projects and technical articles.",
      ar: "مطورة كاملة المستوى متخصصة في Node.js و Vue.js. مؤلفة عدة مشاريع مفتوحة المصدر ومقالات تقنية شائعة.",
    },
    avatar: "/instructor-avatar.png",
    skills: ["Node.js", "Vue.js", "MongoDB", "AWS"],
    social: {
      github: "https://github.com/sarahjohnson",
      website: "https://sarahjohnson.dev",
    },
  },
  {
    id: "3",
    name: "Mohamed Ali",
    title: {
      en: "DevOps & Backend Specialist",
      ar: "متخصص DevOps والخادم",
    },
    bio: {
      en: "DevOps engineer with expertise in cloud technologies and backend development. Helps developers deploy and scale their applications effectively.",
      ar: "مهندس DevOps متخصص في تقنيات السحابة وتطوير الخادم. يساعد المطورين في نشر وتوسيع تطبيقاتهم بفعالية.",
    },
    avatar: "/instructor-avatar.png",
    skills: ["Docker", "Kubernetes", "AWS", "Python"],
    social: {
      github: "https://github.com/mohamedali",
      twitter: "https://twitter.com/mohamedali",
    },
  },
];
</script>
