<template>
  <div class="content-preview">
    <div class="preview-header">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
        {{ $t("admin.contentPreview.title") }}
      </h2>
      <p class="text-gray-600 dark:text-gray-400 mt-2">
        {{ $t("admin.contentPreview.subtitle") }}
      </p>
    </div>

    <!-- Preview Controls -->
    <div class="preview-controls mb-6">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <FormGroup :label="$t('admin.preview.contentType')">
            <USelect
              v-model="previewType"
              :options="contentTypeOptions"
              option-attribute="label"
              value-attribute="value"
              class="w-40"
            />
          </FormGroup>

          <FormGroup :label="$t('admin.preview.language')">
            <USelect
              v-model="previewLanguage"
              :options="languageOptions"
              option-attribute="label"
              value-attribute="value"
              class="w-32"
            />
          </FormGroup>

          <FormGroup :label="$t('admin.preview.device')">
            <USelect
              v-model="previewDevice"
              :options="deviceOptions"
              option-attribute="label"
              value-attribute="value"
              class="w-32"
            />
          </FormGroup>
        </div>

        <div class="flex items-center gap-2">
          <UButton
            @click="refreshPreview"
            variant="outline"
            icon="heroicons:arrow-path"
            :loading="isRefreshing"
          >
            {{ $t("admin.preview.refresh") }}
          </UButton>

          <UButton
            @click="openInNewTab"
            variant="outline"
            icon="heroicons:arrow-top-right-on-square"
          >
            {{ $t("admin.preview.openNewTab") }}
          </UButton>
        </div>
      </div>
    </div>

    <!-- Preview Window -->
    <div class="preview-window">
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="flex gap-1">
                <div class="w-3 h-3 bg-red-500 rounded-full"></div>
                <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div class="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span class="text-sm text-gray-500">{{ previewUrl }}</span>
            </div>
            <UBadge
              :color="
                previewDevice === 'mobile'
                  ? 'info'
                  : previewDevice === 'tablet'
                    ? 'warning'
                    : 'success'
              "
            >
              {{ previewDevice }}
            </UBadge>
          </div>
        </template>

        <div
          class="preview-content"
          :class="{
            'max-w-sm mx-auto': previewDevice === 'mobile',
            'max-w-2xl mx-auto': previewDevice === 'tablet',
            'w-full': previewDevice === 'desktop',
          }"
        >
          <!-- Course Preview -->
          <div v-if="previewType === 'course'" class="space-y-6">
            <div class="course-preview">
              <div
                class="course-hero bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg"
              >
                <h1 class="text-3xl font-bold mb-2">
                  {{
                    previewData.course?.title?.[previewLanguage] ||
                    "Course Title"
                  }}
                </h1>
                <p class="text-lg opacity-90">
                  {{
                    previewData.course?.description?.[previewLanguage] ||
                    "Course description will appear here..."
                  }}
                </p>
                <div class="flex items-center gap-4 mt-4">
                  <UBadge color="success" variant="solid">
                    {{ previewData.course?.difficulty || "beginner" }}
                  </UBadge>
                  <span class="text-sm">
                    {{ previewData.course?.estimatedHours || 0 }}
                    {{ $t("admin.common.hours") }}
                  </span>
                </div>
              </div>

              <div class="course-content mt-6">
                <h2 class="text-xl font-semibold mb-4">
                  {{ $t("admin.preview.courseModules") }}
                </h2>
                <div class="space-y-3">
                  <div
                    v-for="module in previewData.modules"
                    :key="module.id"
                    class="module-card p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                  >
                    <h3 class="font-medium text-gray-900 dark:text-white">
                      {{
                        module.title?.[previewLanguage] ||
                        `Module ${module.number}`
                      }}
                    </h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {{
                        module.description?.[previewLanguage] ||
                        "Module description..."
                      }}
                    </p>
                    <div class="flex items-center gap-2 mt-2">
                      <UBadge variant="soft">
                        {{ module.lessons?.length || 0 }}
                        {{ $t("admin.common.lessons") }}
                      </UBadge>
                      <span class="text-xs text-gray-500">
                        {{ module.estimatedMinutes || 0 }}
                        {{ $t("admin.common.minutes") }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Module Preview -->
          <div v-else-if="previewType === 'module'" class="space-y-4">
            <div class="module-preview">
              <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
                {{
                  previewData.module?.title?.[previewLanguage] || "Module Title"
                }}
              </h1>
              <p class="text-gray-600 dark:text-gray-400 mt-2">
                {{
                  previewData.module?.description?.[previewLanguage] ||
                  "Module description will appear here..."
                }}
              </p>

              <div
                class="objectives mt-4"
                v-if="previewData.module?.objectives?.[previewLanguage]?.length"
              >
                <h3 class="font-semibold text-gray-900 dark:text-white mb-2">
                  {{ $t("admin.preview.learningObjectives") }}
                </h3>
                <ul
                  class="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400"
                >
                  <li
                    v-for="objective in previewData.module.objectives[
                      previewLanguage
                    ]"
                    :key="objective"
                  >
                    {{ objective }}
                  </li>
                </ul>
              </div>

              <div class="lessons mt-6">
                <h3 class="font-semibold text-gray-900 dark:text-white mb-3">
                  {{ $t("admin.preview.lessons") }}
                </h3>
                <div class="space-y-2">
                  <div
                    v-for="lesson in previewData.module?.lessons"
                    :key="lesson.id"
                    class="lesson-item p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <div class="flex items-center justify-between">
                      <div>
                        <h4 class="font-medium text-gray-900 dark:text-white">
                          {{ lesson.number }}.
                          {{
                            lesson.title?.[previewLanguage] || "Lesson Title"
                          }}
                        </h4>
                        <p class="text-sm text-gray-600 dark:text-gray-400">
                          {{ lesson.estimatedMinutes || 0 }}
                          {{ $t("admin.common.minutes") }}
                        </p>
                      </div>
                      <div class="flex gap-1">
                        <UBadge
                          v-if="lesson.hasExercise"
                          color="info"
                          variant="soft"
                          size="xs"
                        >
                          {{ $t("admin.lesson.exercise") }}
                        </UBadge>
                        <UBadge
                          v-if="lesson.hasQuiz"
                          color="warning"
                          variant="soft"
                          size="xs"
                        >
                          {{ $t("admin.lesson.quiz") }}
                        </UBadge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Lesson Preview -->
          <div v-else-if="previewType === 'lesson'" class="space-y-4">
            <div class="lesson-preview">
              <div
                class="lesson-header border-b border-gray-200 dark:border-gray-700 pb-4"
              >
                <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
                  {{
                    previewData.lesson?.title?.[previewLanguage] ||
                    "Lesson Title"
                  }}
                </h1>
                <p class="text-gray-600 dark:text-gray-400 mt-2">
                  {{
                    previewData.lesson?.description?.[previewLanguage] ||
                    "Lesson description..."
                  }}
                </p>
                <div class="flex items-center gap-2 mt-3">
                  <UBadge>
                    {{ $t("admin.lesson.lesson") }}
                    {{ previewData.lesson?.number || 1 }}
                  </UBadge>
                  <UBadge variant="soft">
                    {{ previewData.lesson?.estimatedMinutes || 0 }}
                    {{ $t("admin.common.minutes") }}
                  </UBadge>
                  <UBadge
                    v-if="previewData.lesson?.difficulty"
                    color="info"
                    variant="soft"
                  >
                    {{ previewData.lesson.difficulty }}
                  </UBadge>
                </div>
              </div>

              <div
                class="lesson-content prose prose-lg dark:prose-invert max-w-none mt-6"
              >
                <div
                  v-if="previewData.lesson?.content?.[previewLanguage]"
                  v-html="
                    markdownToHtml(previewData.lesson.content[previewLanguage])
                  "
                ></div>
                <div v-else class="text-gray-500 italic">
                  {{ $t("admin.preview.noContent") }}
                </div>
              </div>

              <div
                v-if="
                  previewData.lesson?.hasExercise &&
                  previewData.lesson?.exercise?.[previewLanguage]
                "
                class="exercise mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
              >
                <h3 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  {{ $t("admin.lesson.exercise") }}
                </h3>
                <div
                  class="prose prose-sm dark:prose-invert"
                  v-html="
                    markdownToHtml(previewData.lesson.exercise[previewLanguage])
                  "
                ></div>
              </div>

              <div
                v-if="
                  previewData.lesson?.hasQuiz &&
                  previewData.lesson?.quiz?.questions?.length
                "
                class="quiz mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg"
              >
                <h3
                  class="font-semibold text-yellow-900 dark:text-yellow-100 mb-4"
                >
                  {{ $t("admin.lesson.quiz") }}
                </h3>
                <div class="space-y-4">
                  <div
                    v-for="(question, index) in previewData.lesson.quiz
                      .questions"
                    :key="index"
                    class="question p-3 bg-white dark:bg-gray-800 rounded"
                  >
                    <h4 class="font-medium mb-2">
                      {{ index + 1 }}. {{ question.text }}
                    </h4>
                    <div
                      v-if="question.type === 'multiple-choice'"
                      class="space-y-1"
                    >
                      <div
                        v-for="(answer, answerIndex) in question.answers"
                        :key="answerIndex"
                        class="flex items-center gap-2"
                      >
                        <input
                          type="radio"
                          :name="`question-${index}`"
                          disabled
                        />
                        <span
                          :class="{
                            'font-medium text-green-600':
                              answerIndex === question.correctAnswer,
                          }"
                        >
                          {{ answer.text }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else class="empty-preview text-center py-12">
            <div class="text-gray-400 mb-4">
              <svg
                class="w-16 h-16 mx-auto"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm3 2h6v4H7V5zm8 8v2h1v-2h-1zm-2-2H7v4h6v-4zm2 0h1V9h-1v2z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {{ $t("admin.preview.noPreview") }}
            </h3>
            <p class="text-gray-500">
              {{ $t("admin.preview.selectContent") }}
            </p>
          </div>
        </div>
      </UCard>
    </div>

    <!-- Preview Actions -->
    <div class="preview-actions mt-6 flex justify-center gap-3">
      <UButton
        @click="exportPreview"
        variant="outline"
        icon="heroicons:arrow-down-tray"
      >
        {{ $t("admin.preview.export") }}
      </UButton>

      <UButton @click="sharePreview" variant="outline" icon="heroicons:share">
        {{ $t("admin.preview.share") }}
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();
const toast = useToast();

// Props
interface Props {
  previewData?: {
    course?: any;
    module?: any;
    lesson?: any;
    modules?: any[];
  };
}

const props = withDefaults(defineProps<Props>(), {
  previewData: () => ({}),
});

// State
const previewType = ref("course");
const previewLanguage = ref("en");
const previewDevice = ref("desktop");
const isRefreshing = ref(false);

// Options
const contentTypeOptions = [
  { label: t("admin.preview.course"), value: "course" },
  { label: t("admin.preview.module"), value: "module" },
  { label: t("admin.preview.lesson"), value: "lesson" },
];

const languageOptions = [
  { label: "English", value: "en" },
  { label: "العربية", value: "ar" },
];

const deviceOptions = [
  { label: t("admin.preview.desktop"), value: "desktop" },
  { label: t("admin.preview.tablet"), value: "tablet" },
  { label: t("admin.preview.mobile"), value: "mobile" },
];

// Computed
const previewUrl = computed(() => {
  const baseUrl = "https://learnova-academy.local";
  switch (previewType.value) {
    case "course":
      return `${baseUrl}/courses/preview-course`;
    case "module":
      return `${baseUrl}/courses/preview-course/preview-module`;
    case "lesson":
      return `${baseUrl}/courses/preview-course/preview-module/preview-lesson`;
    default:
      return baseUrl;
  }
});

// Methods
const markdownToHtml = (markdown: string) => {
  // Simple markdown to HTML conversion for preview
  // In a real implementation, you'd use a proper markdown parser
  return markdown
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/`(.*?)`/g, "<code>$1</code>")
    .replace(/\n/g, "<br>")
    .replace(/^# (.*$)/gim, "<h1>$1</h1>")
    .replace(/^## (.*$)/gim, "<h2>$1</h2>")
    .replace(/^### (.*$)/gim, "<h3>$1</h3>");
};

const refreshPreview = async () => {
  isRefreshing.value = true;
  // Simulate refresh delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  isRefreshing.value = false;

  toast.add({
    title: t("admin.notifications.previewRefreshed"),
    description: t("admin.notifications.previewRefreshedDesc"),
    color: "info",
  });
};

const openInNewTab = () => {
  // In a real implementation, this would open the actual preview URL
  window.open(previewUrl.value, "_blank");

  toast.add({
    title: t("admin.notifications.previewOpened"),
    description: t("admin.notifications.previewOpenedDesc"),
    color: "info",
  });
};

const exportPreview = () => {
  // Export preview as HTML or PDF
  console.log("Exporting preview...");

  toast.add({
    title: t("admin.notifications.exportStarted"),
    description: t("admin.notifications.exportStartedDesc"),
    color: "info",
  });
};

const sharePreview = () => {
  // Generate shareable preview link
  const shareUrl = `${previewUrl.value}?token=preview-123`;

  if (navigator.share) {
    navigator.share({
      title: t("admin.preview.shareTitle"),
      text: t("admin.preview.shareText"),
      url: shareUrl,
    });
  } else {
    // Fallback: copy to clipboard
    navigator.clipboard.writeText(shareUrl);
    toast.add({
      title: t("admin.notifications.linkCopied"),
      description: t("admin.notifications.linkCopiedDesc"),
      color: "success",
    });
  }
};

// Watch for preview data changes
watch(
  () => props.previewData,
  (newData) => {
    // Auto-select preview type based on available data
    if (newData.lesson) {
      previewType.value = "lesson";
    } else if (newData.module) {
      previewType.value = "module";
    } else if (newData.course) {
      previewType.value = "course";
    }
  },
  { immediate: true, deep: true }
);
</script>

<style scoped>
.content-preview {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem;
}

.preview-header {
  text-align: center;
  margin-bottom: 2rem;
}

.preview-window {
  min-height: 600px;
  background: #f8fafc;
  border-radius: 8px;
  padding: 1rem;
}

.preview-content {
  background: white;
  border-radius: 6px;
  padding: 1.5rem;
  min-height: 500px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

/* Device-specific styles */
.preview-content.max-w-sm {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  border: 8px solid #1f2937;
  border-radius: 20px;
}

.preview-content.max-w-2xl {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  border: 4px solid #374151;
  border-radius: 12px;
}

/* Preview content styles */
.course-hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.module-card {
  transition: all 0.2s ease;
}

.module-card:hover {
  border-color: #3b82f6;
  transform: translateY(-1px);
}

.lesson-item {
  transition: all 0.2s ease;
}

.lesson-item:hover {
  background-color: #e5e7eb;
}

.dark .lesson-item:hover {
  background-color: #374151;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .preview-controls .flex {
    flex-direction: column;
    gap: 1rem;
  }

  .preview-controls .flex > div {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
}
</style>
