<script setup lang="ts">
interface Props {
  courseId: string;
}

const props = defineProps<Props>();

const { t } = useI18n();

// Mock reviews data (in a real app, this would come from an API)
const reviews = [
  {
    id: "1",
    userName: "Ahmad Hassan",
    userAvatar: "/instructor-avatar.png",
    rating: 5,
    date: "2025-01-15",
    review:
      "Excellent course! The instructor explains complex concepts in a very clear and practical way. The hands-on exercises really helped me understand Vue and Nuxt.",
    helpful: 24,
  },
  {
    id: "2",
    userName: "Sarah Johnson",
    userAvatar: null,
    rating: 5,
    date: "2025-01-10",
    review:
      "Amazing content and structure. I went from knowing nothing about Vue to building my own applications. The bilingual support is also fantastic!",
    helpful: 18,
  },
  {
    id: "3",
    userName: "Mohamed Ali",
    userAvatar: null,
    rating: 4,
    date: "2025-01-05",
    review:
      "Great course overall. Very comprehensive and well-organized. Would love to see more advanced topics in future modules.",
    helpful: 12,
  },
];

const courseRating = {
  overall: 4.8,
  totalReviews: 156,
  breakdown: {
    5: 78,
    4: 15,
    3: 5,
    2: 1,
    1: 1,
  },
};

// Calculate percentage for rating breakdown
const getRatingPercentage = (count: number) => {
  return (count / courseRating.totalReviews) * 100;
};

// Format date
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Generate star rating array
const getStarRating = (rating: number) => {
  return Array.from({ length: 5 }, (_, i) => i < rating);
};
</script>

<template>
  <div class="course-reviews">
    <!-- Rating Overview -->
    <div class="mb-8">
      <UCard>
        <template #header>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            {{ $t("reviews.ratingsAndReviews") }}
          </h3>
        </template>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Overall Rating -->
          <div class="text-center">
            <div class="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              {{ courseRating.overall }}
            </div>
            <div class="flex justify-center mb-2">
              <div class="flex gap-1">
                <UIcon
                  v-for="(filled, index) in getStarRating(
                    Math.floor(courseRating.overall)
                  )"
                  :key="index"
                  name="i-heroicons-star-solid"
                  :class="
                    filled
                      ? 'text-yellow-400'
                      : 'text-gray-300 dark:text-gray-600'
                  "
                  class="w-5 h-5"
                />
              </div>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-300">
              {{
                $t("reviews.basedOnReviews", {
                  count: courseRating.totalReviews,
                })
              }}
            </p>
          </div>

          <!-- Rating Breakdown -->
          <div class="space-y-2">
            <div
              v-for="(count, stars) in courseRating.breakdown"
              :key="stars"
              class="flex items-center gap-2"
            >
              <div class="flex items-center gap-1 w-12">
                <span class="text-sm text-gray-600 dark:text-gray-300">{{
                  stars
                }}</span>
                <UIcon
                  name="i-heroicons-star-solid"
                  class="w-3 h-3 text-yellow-400"
                />
              </div>
              <div class="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  class="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                  :style="{ width: `${getRatingPercentage(count)}%` }"
                ></div>
              </div>
              <span class="text-sm text-gray-600 dark:text-gray-300 w-8">
                {{ count }}
              </span>
            </div>
          </div>
        </div>
      </UCard>
    </div>

    <!-- Write Review Call-to-Action -->
    <div class="mb-8">
      <UCard
        class="bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800"
      >
        <div class="text-center">
          <h4 class="font-semibold text-gray-900 dark:text-white mb-2">
            {{ $t("reviews.shareYourExperience") }}
          </h4>
          <p class="text-gray-600 dark:text-gray-300 mb-4">
            {{ $t("reviews.shareYourExperienceDesc") }}
          </p>
          <UButton variant="outline" color="primary" disabled>
            {{ $t("reviews.writeReview") }}
          </UButton>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-2">
            {{ $t("reviews.loginRequired") }}
          </p>
        </div>
      </UCard>
    </div>

    <!-- Reviews List -->
    <div class="space-y-6">
      <h4 class="text-lg font-semibold text-gray-900 dark:text-white">
        {{ $t("reviews.studentReviews") }}
      </h4>

      <div
        v-for="review in reviews"
        :key="review.id"
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-6"
      >
        <!-- Review Header -->
        <div class="flex items-start gap-4 mb-4">
          <!-- User Avatar -->
          <div class="flex-shrink-0">
            <div class="w-10 h-10">
              <img
                v-if="review.userAvatar"
                :src="review.userAvatar"
                :alt="review.userName"
                class="w-full h-full object-cover rounded-full"
              />
              <div
                v-else
                class="w-full h-full bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center"
              >
                <UIcon
                  name="i-heroicons-user"
                  class="w-5 h-5 text-gray-500 dark:text-gray-400"
                />
              </div>
            </div>
          </div>

          <!-- Review Info -->
          <div class="flex-1">
            <div class="flex items-center justify-between mb-1">
              <h5 class="font-medium text-gray-900 dark:text-white">
                {{ review.userName }}
              </h5>
              <span class="text-sm text-gray-500 dark:text-gray-400">
                {{ formatDate(review.date) }}
              </span>
            </div>

            <!-- Star Rating -->
            <div class="flex gap-1 mb-2">
              <UIcon
                v-for="(filled, index) in getStarRating(review.rating)"
                :key="index"
                name="i-heroicons-star-solid"
                :class="
                  filled
                    ? 'text-yellow-400'
                    : 'text-gray-300 dark:text-gray-600'
                "
                class="w-4 h-4"
              />
            </div>
          </div>
        </div>

        <!-- Review Content -->
        <p class="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
          {{ review.review }}
        </p>

        <!-- Review Actions -->
        <div class="flex items-center gap-4 text-sm">
          <button
            class="flex items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          >
            <UIcon name="i-heroicons-hand-thumb-up" class="w-4 h-4" />
            {{ $t("reviews.helpful") }} ({{ review.helpful }})
          </button>
          <button
            class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          >
            {{ $t("reviews.report") }}
          </button>
        </div>
      </div>
    </div>

    <!-- Load More Reviews -->
    <div class="mt-8 text-center">
      <UButton variant="outline" disabled>
        {{ $t("reviews.loadMore") }}
      </UButton>
    </div>

    <!-- Feature Coming Soon Notice -->
    <div class="mt-8">
      <UAlert
        icon="i-heroicons-information-circle"
        color="info"
        variant="subtle"
        :title="$t('reviews.comingSoon.title')"
        :description="$t('reviews.comingSoon.description')"
      />
    </div>
  </div>
</template>
