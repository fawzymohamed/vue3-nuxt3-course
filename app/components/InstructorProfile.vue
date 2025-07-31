<script setup lang="ts">
interface Props {
  instructor: {
    name: string;
    bio: Record<string, string>;
    avatar: string;
    title?: Record<string, string>;
    experience?: string;
    socialLinks?: {
      website?: string;
      linkedin?: string;
      twitter?: string;
      github?: string;
    };
    specialties?: string[];
    achievements?: string[];
  };
  course: any;
}

const props = defineProps<Props>();

const { t, locale } = useI18n();

// Mock instructor stats (in a real app, these would come from an API)
const instructorStats = {
  totalStudents: 25000,
  totalCourses: 5,
  rating: 4.8,
  totalReviews: 3200,
};

// Social icons mapping
const socialIcons = {
  website: "i-heroicons-globe-alt",
  linkedin: "i-simple-icons-linkedin",
  twitter: "i-simple-icons-twitter",
  github: "i-simple-icons-github",
};
</script>

<template>
  <div class="instructor-profile">
    <!-- Instructor Card -->
    <UCard class="mb-8">
      <div class="flex flex-col md:flex-row gap-6">
        <!-- Avatar -->
        <div class="flex-shrink-0">
          <div class="w-32 h-32 mx-auto md:mx-0">
            <img
              v-if="instructor.avatar"
              :src="instructor.avatar"
              :alt="instructor.name"
              class="w-full h-full object-cover rounded-lg"
            />
            <div
              v-else
              class="w-full h-full bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg flex items-center justify-center"
            >
              <UIcon name="i-heroicons-user" class="w-16 h-16 text-white" />
            </div>
          </div>
        </div>

        <!-- Instructor Info -->
        <div class="flex-1 text-center md:text-left">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {{ instructor.name }}
          </h2>

          <p
            v-if="instructor.title"
            class="text-lg text-primary-600 dark:text-primary-400 mb-3"
          >
            {{ instructor.title[locale] || instructor.title.en }}
          </p>

          <p class="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
            {{ instructor.bio[locale] || instructor.bio.en }}
          </p>

          <!-- Social Links -->
          <div
            v-if="instructor.socialLinks"
            class="flex justify-center md:justify-start gap-3 mb-4"
          >
            <UButton
              v-for="(url, platform) in instructor.socialLinks"
              :key="platform"
              :to="url"
              variant="ghost"
              size="sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              <UIcon
                :name="socialIcons[platform as keyof typeof socialIcons]"
                class="w-4 h-4"
              />
            </UButton>
          </div>

          <!-- Instructor Stats -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div class="text-xl font-bold text-gray-900 dark:text-white">
                {{ instructorStats.totalStudents.toLocaleString() }}
              </div>
              <div class="text-xs text-gray-600 dark:text-gray-300">
                {{ $t("instructor.students") }}
              </div>
            </div>
            <div>
              <div class="text-xl font-bold text-gray-900 dark:text-white">
                {{ instructorStats.totalCourses }}
              </div>
              <div class="text-xs text-gray-600 dark:text-gray-300">
                {{ $t("instructor.courses") }}
              </div>
            </div>
            <div>
              <div class="text-xl font-bold text-gray-900 dark:text-white">
                {{ instructorStats.rating }}
              </div>
              <div class="text-xs text-gray-600 dark:text-gray-300">
                {{ $t("instructor.rating") }}
              </div>
            </div>
            <div>
              <div class="text-xl font-bold text-gray-900 dark:text-white">
                {{ instructorStats.totalReviews.toLocaleString() }}
              </div>
              <div class="text-xs text-gray-600 dark:text-gray-300">
                {{ $t("instructor.reviews") }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </UCard>

    <!-- Specialties -->
    <div
      v-if="instructor.specialties && instructor.specialties.length > 0"
      class="mb-8"
    >
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        {{ $t("instructor.specialties") }}
      </h3>
      <div class="flex flex-wrap gap-2">
        <UBadge
          v-for="specialty in instructor.specialties"
          :key="specialty"
          variant="soft"
          color="primary"
        >
          {{ specialty }}
        </UBadge>
      </div>
    </div>

    <!-- Experience -->
    <div v-if="instructor.experience" class="mb-8">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        {{ $t("instructor.experience") }}
      </h3>
      <div class="prose prose-gray dark:prose-invert max-w-none">
        <p class="text-gray-600 dark:text-gray-300">
          {{ instructor.experience }}
        </p>
      </div>
    </div>

    <!-- Achievements -->
    <div
      v-if="instructor.achievements && instructor.achievements.length > 0"
      class="mb-8"
    >
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        {{ $t("instructor.achievements") }}
      </h3>
      <ul class="space-y-2">
        <li
          v-for="achievement in instructor.achievements"
          :key="achievement"
          class="flex items-start gap-2"
        >
          <UIcon
            name="i-heroicons-trophy"
            class="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0"
          />
          <span class="text-gray-600 dark:text-gray-300">{{
            achievement
          }}</span>
        </li>
      </ul>
    </div>

    <!-- Teaching Philosophy -->
    <UCard>
      <template #header>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
          {{ $t("instructor.teachingPhilosophy") }}
        </h3>
      </template>

      <div class="space-y-4">
        <div class="flex items-start gap-3">
          <div
            class="flex-shrink-0 w-8 h-8 bg-primary-100 dark:bg-primary-800 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center"
          >
            <UIcon name="i-heroicons-light-bulb" class="w-4 h-4" />
          </div>
          <div>
            <h4 class="font-medium text-gray-900 dark:text-white mb-1">
              {{ $t("instructor.practicalApproach") }}
            </h4>
            <p class="text-sm text-gray-600 dark:text-gray-300">
              {{ $t("instructor.practicalApproachDesc") }}
            </p>
          </div>
        </div>

        <div class="flex items-start gap-3">
          <div
            class="flex-shrink-0 w-8 h-8 bg-primary-100 dark:bg-primary-800 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center"
          >
            <UIcon name="i-heroicons-users" class="w-4 h-4" />
          </div>
          <div>
            <h4 class="font-medium text-gray-900 dark:text-white mb-1">
              {{ $t("instructor.studentCentered") }}
            </h4>
            <p class="text-sm text-gray-600 dark:text-gray-300">
              {{ $t("instructor.studentCenteredDesc") }}
            </p>
          </div>
        </div>

        <div class="flex items-start gap-3">
          <div
            class="flex-shrink-0 w-8 h-8 bg-primary-100 dark:bg-primary-800 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center"
          >
            <UIcon name="i-heroicons-arrow-trending-up" class="w-4 h-4" />
          </div>
          <div>
            <h4 class="font-medium text-gray-900 dark:text-white mb-1">
              {{ $t("instructor.continuousImprovement") }}
            </h4>
            <p class="text-sm text-gray-600 dark:text-gray-300">
              {{ $t("instructor.continuousImprovementDesc") }}
            </p>
          </div>
        </div>
      </div>
    </UCard>

    <!-- Course Message -->
    <UCard
      class="mt-8 bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800"
    >
      <div class="text-center">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {{ $t("instructor.courseMessage.title") }}
        </h3>
        <p class="text-gray-600 dark:text-gray-300 mb-4">
          {{
            $t("instructor.courseMessage.text", {
              courseName: course.title[locale],
            })
          }}
        </p>
        <blockquote
          class="text-sm italic text-gray-600 dark:text-gray-300 border-l-4 border-primary-500 pl-4"
        >
          "{{ $t("instructor.courseMessage.quote") }}"
        </blockquote>
        <cite class="text-xs text-gray-500 dark:text-gray-400 mt-2 block">
          — {{ instructor.name }}
        </cite>
      </div>
    </UCard>
  </div>
</template>
