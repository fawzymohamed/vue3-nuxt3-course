<template>
  <div class="lesson-editor">
    <div class="editor-header">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
        {{ $t("admin.lessonEditor.title") }}
      </h2>
      <p class="text-gray-600 dark:text-gray-400 mt-2">
        {{ $t("admin.lessonEditor.subtitle") }}
      </p>
    </div>

    <UCard class="mt-6">
      <form @submit.prevent="saveLesson" class="space-y-6">
        <!-- Lesson Basic Information -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <FormGroup :label="$t('admin.lesson.id')" required>
            <UInput
              v-model="lessonData.id"
              placeholder="lesson1"
              :disabled="isEditing"
            />
          </FormGroup>

          <FormGroup :label="$t('admin.lesson.number')" required>
            <UInput
              v-model.number="lessonData.number"
              type="number"
              min="1"
              max="100"
            />
          </FormGroup>

          <FormGroup :label="$t('admin.lesson.estimatedMinutes')" required>
            <UInput
              v-model.number="lessonData.estimatedMinutes"
              type="number"
              min="5"
              max="180"
            />
          </FormGroup>

          <FormGroup :label="$t('admin.lesson.slug')">
            <UInput v-model="lessonData.slug" :placeholder="lessonData.id" />
          </FormGroup>
        </div>

        <!-- Lesson Features -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormGroup :label="$t('admin.lesson.features')">
            <div class="space-y-3">
              <div class="flex items-center gap-3">
                <input
                  type="checkbox"
                  v-model="lessonData.hasExercise"
                  :id="`hasExercise`"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  :for="`hasExercise`"
                  class="text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  {{ $t("admin.lesson.hasExercise") }}
                </label>
              </div>
              <div class="flex items-center gap-3">
                <input
                  type="checkbox"
                  v-model="lessonData.hasQuiz"
                  :id="`hasQuiz`"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  :for="`hasQuiz`"
                  class="text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  {{ $t("admin.lesson.hasQuiz") }}
                </label>
              </div>
              <div class="flex items-center gap-3">
                <input
                  type="checkbox"
                  v-model="lessonData.isPreview"
                  :id="`isPreview`"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  :for="`isPreview`"
                  class="text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  {{ $t("admin.lesson.isPreview") }}
                </label>
              </div>
              <div class="flex items-center gap-3">
                <input
                  type="checkbox"
                  v-model="lessonData.requiresPrevious"
                  :id="`requiresPrevious`"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  :for="`requiresPrevious`"
                  class="text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  {{ $t("admin.lesson.requiresPrevious") }}
                </label>
              </div>
            </div>
          </FormGroup>

          <FormGroup :label="$t('admin.lesson.difficulty')">
            <USelect
              v-model="lessonData.difficulty"
              :options="difficultyOptions"
              option-attribute="label"
              value-attribute="value"
            />
          </FormGroup>
        </div>

        <!-- Lesson Content -->
        <div class="space-y-6">
          <!-- English Content -->
          <UCard>
            <template #header>
              <h4 class="font-semibold text-gray-900 dark:text-white">
                English Content
              </h4>
            </template>
            <div class="space-y-4">
              <FormGroup :label="$t('admin.lesson.title')" required>
                <UInput
                  v-model="lessonData.title.en"
                  :placeholder="$t('admin.lesson.titlePlaceholder')"
                />
              </FormGroup>

              <FormGroup :label="$t('admin.lesson.description')">
                <UTextarea
                  v-model="lessonData.description.en"
                  :placeholder="$t('admin.lesson.descriptionPlaceholder')"
                  :rows="3"
                />
              </FormGroup>

              <FormGroup :label="$t('admin.lesson.content')" required>
                <UTextarea
                  v-model="lessonData.content.en"
                  :placeholder="$t('admin.lesson.contentPlaceholder')"
                  :rows="10"
                  class="font-mono text-sm"
                />
                <p class="text-xs text-gray-500 mt-1">
                  {{ $t("admin.lesson.markdownSupport") }}
                </p>
              </FormGroup>

              <FormGroup
                v-if="lessonData.hasExercise"
                :label="$t('admin.lesson.exercise')"
              >
                <UTextarea
                  v-model="lessonData.exercise.en"
                  :placeholder="$t('admin.lesson.exercisePlaceholder')"
                  :rows="5"
                />
              </FormGroup>
            </div>
          </UCard>

          <!-- Arabic Content -->
          <UCard>
            <template #header>
              <h4 class="font-semibold text-gray-900 dark:text-white">
                المحتوى العربي
              </h4>
            </template>
            <div class="space-y-4" dir="rtl">
              <FormGroup :label="$t('admin.lesson.title')" required>
                <UInput
                  v-model="lessonData.title.ar"
                  :placeholder="$t('admin.lesson.titlePlaceholder')"
                />
              </FormGroup>

              <FormGroup :label="$t('admin.lesson.description')">
                <UTextarea
                  v-model="lessonData.description.ar"
                  :placeholder="$t('admin.lesson.descriptionPlaceholder')"
                  :rows="3"
                />
              </FormGroup>

              <FormGroup :label="$t('admin.lesson.content')" required>
                <UTextarea
                  v-model="lessonData.content.ar"
                  :placeholder="$t('admin.lesson.contentPlaceholder')"
                  :rows="10"
                  class="font-mono text-sm"
                />
                <p class="text-xs text-gray-500 mt-1">
                  {{ $t("admin.lesson.markdownSupport") }}
                </p>
              </FormGroup>

              <FormGroup
                v-if="lessonData.hasExercise"
                :label="$t('admin.lesson.exercise')"
              >
                <UTextarea
                  v-model="lessonData.exercise.ar"
                  :placeholder="$t('admin.lesson.exercisePlaceholder')"
                  :rows="5"
                />
              </FormGroup>
            </div>
          </UCard>
        </div>

        <!-- Quiz Configuration -->
        <div v-if="lessonData.hasQuiz" class="space-y-4">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            {{ $t("admin.lesson.quizConfiguration") }}
          </h3>

          <UCard>
            <div class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormGroup :label="$t('admin.quiz.timeLimit')">
                  <UInput
                    v-model.number="lessonData.quiz.timeLimit"
                    type="number"
                    min="0"
                    max="60"
                    :placeholder="$t('admin.quiz.timeLimitPlaceholder')"
                  />
                </FormGroup>

                <FormGroup :label="$t('admin.quiz.passingScore')">
                  <UInput
                    v-model.number="lessonData.quiz.passingScore"
                    type="number"
                    min="0"
                    max="100"
                    placeholder="70"
                  />
                </FormGroup>
              </div>

              <FormGroup :label="$t('admin.quiz.questions')">
                <div class="space-y-3">
                  <div class="flex gap-2">
                    <UButton
                      @click="addQuizQuestion"
                      variant="outline"
                      icon="heroicons:plus"
                    >
                      {{ $t("admin.quiz.addQuestion") }}
                    </UButton>
                  </div>

                  <div
                    v-if="lessonData.quiz.questions.length === 0"
                    class="text-center py-4 text-gray-500"
                  >
                    {{ $t("admin.quiz.noQuestions") }}
                  </div>

                  <div v-else class="space-y-3">
                    <UCard
                      v-for="(question, index) in lessonData.quiz.questions"
                      :key="index"
                      class="quiz-question"
                    >
                      <div class="space-y-3">
                        <div class="flex items-center justify-between">
                          <h5 class="font-medium text-gray-900 dark:text-white">
                            {{ $t("admin.quiz.question") }} {{ index + 1 }}
                          </h5>
                          <UButton
                            @click="removeQuizQuestion(index)"
                            variant="ghost"
                            size="xs"
                            icon="heroicons:trash"
                            color="error"
                          />
                        </div>

                        <FormGroup :label="$t('admin.quiz.questionText')">
                          <UInput
                            v-model="question.text"
                            :placeholder="$t('admin.quiz.questionPlaceholder')"
                          />
                        </FormGroup>

                        <FormGroup :label="$t('admin.quiz.questionType')">
                          <USelect
                            v-model="question.type"
                            :options="questionTypeOptions"
                            option-attribute="label"
                            value-attribute="value"
                          />
                        </FormGroup>

                        <div
                          v-if="question.type === 'multiple-choice'"
                          class="space-y-2"
                        >
                          <div class="flex items-center justify-between">
                            <label
                              class="text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                              {{ $t("admin.quiz.answers") }}
                            </label>
                            <UButton
                              @click="addAnswer(index)"
                              variant="ghost"
                              size="xs"
                              icon="heroicons:plus"
                            >
                              {{ $t("admin.quiz.addAnswer") }}
                            </UButton>
                          </div>

                          <div class="space-y-2">
                            <div
                              v-for="(answer, answerIndex) in question.answers"
                              :key="answerIndex"
                              class="flex items-center gap-2"
                            >
                              <input
                                type="radio"
                                :name="`question-${index}`"
                                :value="answerIndex"
                                :checked="
                                  question.correctAnswer === answerIndex
                                "
                                @change="question.correctAnswer = answerIndex"
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              />
                              <UInput
                                v-model="answer.text"
                                :placeholder="
                                  $t('admin.quiz.answerPlaceholder')
                                "
                                class="flex-1"
                              />
                              <UButton
                                @click="removeAnswer(index, answerIndex)"
                                variant="ghost"
                                size="xs"
                                icon="heroicons:x-mark"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </UCard>
                  </div>
                </div>
              </FormGroup>
            </div>
          </UCard>
        </div>

        <!-- Action Buttons -->
        <div
          class="flex justify-between pt-6 border-t border-gray-200 dark:border-gray-700"
        >
          <UButton variant="outline" @click="resetForm" :disabled="isSaving">
            {{ $t("admin.common.reset") }}
          </UButton>

          <div class="flex gap-3">
            <UButton
              variant="outline"
              @click="previewLesson"
              :disabled="!isFormValid"
            >
              {{ $t("admin.common.preview") }}
            </UButton>

            <UButton type="submit" :loading="isSaving" :disabled="!isFormValid">
              {{
                isEditing
                  ? $t("admin.common.update")
                  : $t("admin.common.create")
              }}
            </UButton>
          </div>
        </div>
      </form>
    </UCard>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();
const toast = useToast();

// Props
interface Props {
  courseId?: string;
  moduleId?: string;
  lessonId?: string;
  mode?: "create" | "edit";
}

const props = withDefaults(defineProps<Props>(), {
  mode: "create",
});

// Emits
const emit = defineEmits<{
  lessonSaved: [lessonData: any];
}>();

// State
const isEditing = computed(() => props.mode === "edit");
const isSaving = ref(false);

// Lesson data structure
const lessonData = ref({
  id: "",
  number: 1,
  slug: "",
  title: {
    en: "",
    ar: "",
  },
  description: {
    en: "",
    ar: "",
  },
  content: {
    en: "",
    ar: "",
  },
  exercise: {
    en: "",
    ar: "",
  },
  estimatedMinutes: 30,
  difficulty: "beginner",
  hasExercise: false,
  hasQuiz: false,
  isPreview: false,
  requiresPrevious: true,
  quiz: {
    timeLimit: 0,
    passingScore: 70,
    questions: [] as any[],
  },
  createdAt: "",
  updatedAt: "",
});

// Options
const difficultyOptions = [
  { label: t("admin.difficulty.beginner"), value: "beginner" },
  { label: t("admin.difficulty.intermediate"), value: "intermediate" },
  { label: t("admin.difficulty.advanced"), value: "advanced" },
];

const questionTypeOptions = [
  { label: t("admin.quiz.multipleChoice"), value: "multiple-choice" },
  { label: t("admin.quiz.trueFalse"), value: "true-false" },
  { label: t("admin.quiz.shortAnswer"), value: "short-answer" },
];

// Computed
const isFormValid = computed(() => {
  return (
    lessonData.value.id &&
    lessonData.value.title.en &&
    lessonData.value.title.ar &&
    lessonData.value.content.en &&
    lessonData.value.content.ar &&
    lessonData.value.number > 0 &&
    lessonData.value.estimatedMinutes > 0
  );
});

// Methods
const addQuizQuestion = () => {
  const newQuestion = {
    text: "",
    type: "multiple-choice",
    answers: [
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
    ],
    correctAnswer: 0,
  };
  lessonData.value.quiz.questions.push(newQuestion);
};

const removeQuizQuestion = (index: number) => {
  lessonData.value.quiz.questions.splice(index, 1);
};

const addAnswer = (questionIndex: number) => {
  lessonData.value.quiz.questions[questionIndex].answers.push({
    text: "",
    isCorrect: false,
  });
};

const removeAnswer = (questionIndex: number, answerIndex: number) => {
  lessonData.value.quiz.questions[questionIndex].answers.splice(answerIndex, 1);
};

const saveLesson = async () => {
  if (!isFormValid.value) return;

  isSaving.value = true;

  try {
    // Add timestamps
    const now = new Date().toISOString();
    const lessonToSave = {
      ...lessonData.value,
      createdAt: isEditing.value ? lessonData.value.createdAt : now,
      updatedAt: now,
    };

    // Generate slug if not provided
    if (!lessonToSave.slug) {
      lessonToSave.slug = lessonToSave.id;
    }

    // Here you would typically save to an API or file system
    console.log("Saving lesson:", lessonToSave);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.add({
      title: t("admin.notifications.lessonSaved"),
      description: t("admin.notifications.lessonSavedDesc"),
      color: "success",
    });

    emit("lessonSaved", lessonToSave);

    if (!isEditing.value) {
      resetForm();
    }
  } catch (error) {
    toast.add({
      title: t("admin.notifications.error"),
      description: t("admin.notifications.saveFailed"),
      color: "error",
    });
  } finally {
    isSaving.value = false;
  }
};

const resetForm = () => {
  lessonData.value = {
    id: "",
    number: 1,
    slug: "",
    title: { en: "", ar: "" },
    description: { en: "", ar: "" },
    content: { en: "", ar: "" },
    exercise: { en: "", ar: "" },
    estimatedMinutes: 30,
    difficulty: "beginner",
    hasExercise: false,
    hasQuiz: false,
    isPreview: false,
    requiresPrevious: true,
    quiz: {
      timeLimit: 0,
      passingScore: 70,
      questions: [],
    },
    createdAt: "",
    updatedAt: "",
  };
};

const previewLesson = () => {
  console.log("Preview lesson:", lessonData.value);
  toast.add({
    title: t("admin.notifications.previewGenerated"),
    description: t("admin.notifications.lessonPreviewDesc"),
    color: "info",
  });
};

// Auto-generate slug from title
watch(
  () => lessonData.value.title.en,
  (newTitle) => {
    if (newTitle && !isEditing.value && !lessonData.value.slug) {
      lessonData.value.slug = newTitle
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-+|-+$/g, "");
    }
  }
);

// Load existing lesson data if editing
onMounted(async () => {
  if (isEditing.value && props.lessonId) {
    try {
      console.log("Loading lesson:", props.lessonId);
      // lessonData.value = await loadLesson(props.courseId, props.moduleId, props.lessonId);
    } catch (error) {
      toast.add({
        title: t("admin.notifications.error"),
        description: t("admin.notifications.loadFailed"),
        color: "error",
      });
    }
  }
});
</script>

<style scoped>
.lesson-editor {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

.editor-header {
  text-align: center;
  margin-bottom: 2rem;
}

.quiz-question {
  border-left: 3px solid #3b82f6;
}

/* RTL support for Arabic content */
[dir="rtl"] .lesson-editor {
  text-align: right;
}

[dir="rtl"] .editor-header {
  text-align: center;
}

[dir="rtl"] .quiz-question {
  border-left: none;
  border-right: 3px solid #3b82f6;
}
</style>
