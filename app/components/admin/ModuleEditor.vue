<template>
  <div class="module-editor">
    <div class="editor-header">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
        {{ $t("admin.moduleEditor.title") }}
      </h2>
      <p class="text-gray-600 dark:text-gray-400 mt-2">
        {{ $t("admin.moduleEditor.subtitle") }}
      </p>
    </div>

    <UCard class="mt-6">
      <form @submit.prevent="saveModule" class="space-y-6">
        <!-- Module Basic Information -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormGroup :label="$t('admin.module.id')" required>
            <UInput
              v-model="moduleData.id"
              placeholder="module1"
              :disabled="isEditing"
            />
          </FormGroup>

          <FormGroup :label="$t('admin.module.number')" required>
            <UInput
              v-model.number="moduleData.number"
              type="number"
              min="1"
              max="50"
            />
          </FormGroup>

          <FormGroup :label="$t('admin.module.estimatedMinutes')" required>
            <UInput
              v-model.number="moduleData.estimatedMinutes"
              type="number"
              min="15"
              max="1200"
            />
          </FormGroup>
        </div>

        <!-- Module Content -->
        <div class="space-y-6">
          <!-- English Content -->
          <UCard>
            <template #header>
              <h4 class="font-semibold text-gray-900 dark:text-white">
                English
              </h4>
            </template>
            <div class="space-y-4">
              <FormGroup :label="$t('admin.module.title')" required>
                <UInput
                  v-model="moduleData.title.en"
                  :placeholder="$t('admin.module.titlePlaceholder')"
                />
              </FormGroup>

              <FormGroup :label="$t('admin.module.description')">
                <UTextarea
                  v-model="moduleData.description.en"
                  :placeholder="$t('admin.module.descriptionPlaceholder')"
                  :rows="3"
                />
              </FormGroup>

              <FormGroup :label="$t('admin.module.objectives')">
                <div class="space-y-2">
                  <div class="flex gap-2">
                    <UInput
                      v-model="newObjectiveEn"
                      :placeholder="$t('admin.module.addObjective')"
                      @keyup.enter="addObjective('en')"
                      class="flex-1"
                    />
                    <UButton
                      @click="addObjective('en')"
                      variant="outline"
                      :disabled="!newObjectiveEn.trim()"
                    >
                      {{ $t("admin.common.add") }}
                    </UButton>
                  </div>
                  <div class="space-y-1">
                    <div
                      v-for="(objective, index) in moduleData.objectives.en"
                      :key="index"
                      class="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded"
                    >
                      <span class="flex-1">{{ objective }}</span>
                      <UButton
                        @click="removeObjective('en', index)"
                        variant="ghost"
                        size="xs"
                        icon="heroicons:x-mark"
                      />
                    </div>
                  </div>
                </div>
              </FormGroup>
            </div>
          </UCard>

          <!-- Arabic Content -->
          <UCard>
            <template #header>
              <h4 class="font-semibold text-gray-900 dark:text-white">
                العربية
              </h4>
            </template>
            <div class="space-y-4" dir="rtl">
              <FormGroup :label="$t('admin.module.title')" required>
                <UInput
                  v-model="moduleData.title.ar"
                  :placeholder="$t('admin.module.titlePlaceholder')"
                />
              </FormGroup>

              <FormGroup :label="$t('admin.module.description')">
                <UTextarea
                  v-model="moduleData.description.ar"
                  :placeholder="$t('admin.module.descriptionPlaceholder')"
                  :rows="3"
                />
              </FormGroup>

              <FormGroup :label="$t('admin.module.objectives')">
                <div class="space-y-2">
                  <div class="flex gap-2">
                    <UInput
                      v-model="newObjectiveAr"
                      :placeholder="$t('admin.module.addObjective')"
                      @keyup.enter="addObjective('ar')"
                      class="flex-1"
                    />
                    <UButton
                      @click="addObjective('ar')"
                      variant="outline"
                      :disabled="!newObjectiveAr.trim()"
                    >
                      {{ $t("admin.common.add") }}
                    </UButton>
                  </div>
                  <div class="space-y-1">
                    <div
                      v-for="(objective, index) in moduleData.objectives.ar"
                      :key="index"
                      class="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded"
                    >
                      <span class="flex-1">{{ objective }}</span>
                      <UButton
                        @click="removeObjective('ar', index)"
                        variant="ghost"
                        size="xs"
                        icon="heroicons:x-mark"
                      />
                    </div>
                  </div>
                </div>
              </FormGroup>
            </div>
          </UCard>
        </div>

        <!-- Lessons Management -->
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              {{ $t("admin.module.lessons") }}
            </h3>
            <UButton @click="addLesson" variant="outline" icon="heroicons:plus">
              {{ $t("admin.module.addLesson") }}
            </UButton>
          </div>

          <div
            v-if="moduleData.lessons.length === 0"
            class="text-center py-8 text-gray-500"
          >
            {{ $t("admin.module.noLessons") }}
          </div>

          <div v-else class="space-y-3">
            <UCard
              v-for="(lesson, index) in moduleData.lessons"
              :key="lesson.id"
              class="lesson-card"
            >
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <UButton
                    icon="heroicons:bars-3"
                    variant="ghost"
                    size="xs"
                    class="cursor-move"
                  />
                  <div>
                    <h4 class="font-medium text-gray-900 dark:text-white">
                      {{
                        lesson.title.en ||
                        lesson.title.ar ||
                        $t("admin.module.untitledLesson")
                      }}
                    </h4>
                    <p class="text-sm text-gray-500">
                      {{ $t("admin.module.lesson") }} {{ lesson.number }} •
                      {{ lesson.estimatedMinutes }}
                      {{ $t("admin.common.minutes") }}
                    </p>
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <UBadge
                    :color="lesson.hasExercise ? 'success' : 'secondary'"
                    variant="soft"
                  >
                    {{
                      lesson.hasExercise
                        ? $t("admin.lesson.hasExercise")
                        : $t("admin.lesson.noExercise")
                    }}
                  </UBadge>
                  <UBadge
                    :color="lesson.hasQuiz ? 'info' : 'secondary'"
                    variant="soft"
                  >
                    {{
                      lesson.hasQuiz
                        ? $t("admin.lesson.hasQuiz")
                        : $t("admin.lesson.noQuiz")
                    }}
                  </UBadge>
                  <UButton
                    @click="editLesson(index)"
                    variant="ghost"
                    size="xs"
                    icon="heroicons:pencil"
                  />
                  <UButton
                    @click="removeLesson(index)"
                    variant="ghost"
                    size="xs"
                    icon="heroicons:trash"
                    color="error"
                  />
                </div>
              </div>
            </UCard>
          </div>
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
              @click="previewModule"
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
  mode?: "create" | "edit";
}

const props = withDefaults(defineProps<Props>(), {
  mode: "create",
});

// Emits
const emit = defineEmits<{
  lessonEdit: [lessonIndex: number, lesson: any];
  moduleSaved: [moduleData: any];
}>();

// State
const isEditing = computed(() => props.mode === "edit");
const isSaving = ref(false);
const newObjectiveEn = ref("");
const newObjectiveAr = ref("");

// Module data structure
const moduleData = ref({
  id: "",
  number: 1,
  title: {
    en: "",
    ar: "",
  },
  description: {
    en: "",
    ar: "",
  },
  objectives: {
    en: [] as string[],
    ar: [] as string[],
  },
  estimatedMinutes: 60,
  lessons: [] as any[],
  createdAt: "",
  updatedAt: "",
});

// Computed
const isFormValid = computed(() => {
  return (
    moduleData.value.id &&
    moduleData.value.title.en &&
    moduleData.value.title.ar &&
    moduleData.value.number > 0 &&
    moduleData.value.estimatedMinutes > 0
  );
});

// Methods
const addObjective = (lang: "en" | "ar") => {
  const objectiveText =
    lang === "en" ? newObjectiveEn.value.trim() : newObjectiveAr.value.trim();
  if (
    objectiveText &&
    !moduleData.value.objectives[lang].includes(objectiveText)
  ) {
    moduleData.value.objectives[lang].push(objectiveText);
    if (lang === "en") {
      newObjectiveEn.value = "";
    } else {
      newObjectiveAr.value = "";
    }
  }
};

const removeObjective = (lang: "en" | "ar", index: number) => {
  moduleData.value.objectives[lang].splice(index, 1);
};

const addLesson = () => {
  const newLesson = {
    id: `lesson${moduleData.value.lessons.length + 1}`,
    number: moduleData.value.lessons.length + 1,
    title: { en: "", ar: "" },
    estimatedMinutes: 30,
    hasExercise: false,
    hasQuiz: false,
  };
  moduleData.value.lessons.push(newLesson);
};

const editLesson = (index: number) => {
  emit("lessonEdit", index, moduleData.value.lessons[index]);
};

const removeLesson = (index: number) => {
  moduleData.value.lessons.splice(index, 1);
  // Renumber remaining lessons
  moduleData.value.lessons.forEach((lesson, i) => {
    lesson.number = i + 1;
  });
};

const saveModule = async () => {
  if (!isFormValid.value) return;

  isSaving.value = true;

  try {
    // Add timestamps
    const now = new Date().toISOString();
    const moduleToSave = {
      ...moduleData.value,
      createdAt: isEditing.value ? moduleData.value.createdAt : now,
      updatedAt: now,
    };

    // Here you would typically save to an API or file system
    console.log("Saving module:", moduleToSave);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.add({
      title: t("admin.notifications.moduleSaved"),
      description: t("admin.notifications.moduleSavedDesc"),
      color: "success",
    });

    emit("moduleSaved", moduleToSave);

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
  moduleData.value = {
    id: "",
    number: 1,
    title: { en: "", ar: "" },
    description: { en: "", ar: "" },
    objectives: { en: [], ar: [] },
    estimatedMinutes: 60,
    lessons: [],
    createdAt: "",
    updatedAt: "",
  };
};

const previewModule = () => {
  console.log("Preview module:", moduleData.value);
  toast.add({
    title: t("admin.notifications.previewGenerated"),
    description: t("admin.notifications.modulePreviewDesc"),
    color: "info",
  });
};

// Load existing module data if editing
onMounted(async () => {
  if (isEditing.value && props.moduleId) {
    try {
      console.log("Loading module:", props.moduleId);
      // moduleData.value = await loadModule(props.courseId, props.moduleId);
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
.module-editor {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

.editor-header {
  text-align: center;
  margin-bottom: 2rem;
}

.lesson-card {
  transition: all 0.2s ease;
}

.lesson-card:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* RTL support for Arabic content */
[dir="rtl"] .module-editor {
  text-align: right;
}

[dir="rtl"] .editor-header {
  text-align: center;
}
</style>
