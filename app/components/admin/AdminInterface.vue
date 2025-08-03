<template>
  <div class="admin-interface">
    <!-- Admin Header -->
    <div
      class="admin-header bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center gap-4">
            <h1 class="text-xl font-semibold text-gray-900 dark:text-white">
              {{ $t("admin.interface.title") }}
            </h1>
            <UBadge color="primary" variant="soft">
              {{ $t("admin.interface.beta") }}
            </UBadge>
          </div>

          <div class="flex items-center gap-3">
            <UButton
              @click="saveAll"
              :loading="isSaving"
              icon="heroicons:arrow-down-tray"
            >
              {{ $t("admin.common.saveAll") }}
            </UButton>

            <UButton
              @click="exitAdmin"
              variant="outline"
              icon="heroicons:x-mark"
            >
              {{ $t("admin.common.exit") }}
            </UButton>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="admin-content flex h-screen overflow-hidden">
      <!-- Sidebar Navigation -->
      <div
        class="admin-sidebar w-64 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto"
      >
        <div class="p-4">
          <nav class="space-y-2">
            <button
              v-for="tab in adminTabs"
              :key="tab.key"
              @click="activeTab = tab.key"
              class="w-full flex items-center gap-3 px-3 py-2 text-left rounded-lg transition-colors"
              :class="{
                'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400':
                  activeTab === tab.key,
                'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700':
                  activeTab !== tab.key,
              }"
            >
              <UIcon :name="tab.icon" class="w-5 h-5" />
              <span class="font-medium">{{ tab.label }}</span>
            </button>
          </nav>

          <!-- Quick Actions -->
          <div class="mt-8">
            <h3
              class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3"
            >
              {{ $t("admin.interface.quickActions") }}
            </h3>
            <div class="space-y-2">
              <UButton
                @click="createNewCourse"
                variant="outline"
                size="sm"
                icon="heroicons:plus"
                class="w-full justify-start"
              >
                {{ $t("admin.actions.newCourse") }}
              </UButton>

              <UButton
                @click="importContent"
                variant="outline"
                size="sm"
                icon="heroicons:arrow-up-tray"
                class="w-full justify-start"
              >
                {{ $t("admin.actions.import") }}
              </UButton>

              <UButton
                @click="exportContent"
                variant="outline"
                size="sm"
                icon="heroicons:arrow-down-tray"
                class="w-full justify-start"
              >
                {{ $t("admin.actions.export") }}
              </UButton>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Editor Area -->
      <div class="admin-main flex-1 flex overflow-hidden">
        <!-- Editor Panel -->
        <div class="editor-panel flex-1 overflow-y-auto">
          <div class="p-6">
            <!-- Course Editor -->
            <div v-if="activeTab === 'course'">
              <CourseEditor
                :course-id="selectedCourseId"
                :mode="courseEditorMode"
                @course-saved="handleCourseSaved"
              />
            </div>

            <!-- Module Editor -->
            <div v-else-if="activeTab === 'module'">
              <ModuleEditor
                :course-id="selectedCourseId"
                :module-id="selectedModuleId"
                :mode="moduleEditorMode"
                @module-saved="handleModuleSaved"
                @lesson-edit="handleLessonEdit"
              />
            </div>

            <!-- Lesson Editor -->
            <div v-else-if="activeTab === 'lesson'">
              <LessonEditor
                :course-id="selectedCourseId"
                :module-id="selectedModuleId"
                :lesson-id="selectedLessonId"
                :mode="lessonEditorMode"
                @lesson-saved="handleLessonSaved"
              />
            </div>

            <!-- Content Preview -->
            <div v-else-if="activeTab === 'preview'">
              <ContentPreview
                :preview-data="{
                  course: currentCourse,
                  module: currentModule,
                  lesson: currentLesson,
                  modules: currentModules,
                }"
              />
            </div>

            <!-- Settings/Configuration -->
            <div v-else-if="activeTab === 'settings'">
              <div class="settings-panel">
                <h2
                  class="text-2xl font-bold text-gray-900 dark:text-white mb-6"
                >
                  {{ $t("admin.settings.title") }}
                </h2>

                <div class="space-y-6">
                  <!-- Course Settings -->
                  <UCard>
                    <template #header>
                      <h3 class="font-semibold text-gray-900 dark:text-white">
                        {{ $t("admin.settings.courseSettings") }}
                      </h3>
                    </template>

                    <div class="space-y-4">
                      <div class="space-y-2">
                        <label
                          class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          {{ $t("admin.settings.defaultLanguage") }}
                        </label>
                        <USelect
                          v-model="settings.defaultLanguage"
                          :options="languageOptions"
                          option-attribute="label"
                          value-attribute="value"
                        />
                      </div>

                      <div class="space-y-2">
                        <label
                          class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          {{ $t("admin.settings.autoSave") }}
                        </label>
                        <UCheckbox
                          v-model="settings.autoSave"
                          :label="$t('admin.settings.enableAutoSave')"
                        />
                      </div>

                      <div class="space-y-2">
                        <label
                          class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          {{ $t("admin.settings.validation") }}
                        </label>
                        <UCheckbox
                          v-model="settings.strictValidation"
                          :label="$t('admin.settings.enableStrictValidation')"
                        />
                      </div>
                    </div>
                  </UCard>

                  <!-- Preview Settings -->
                  <UCard>
                    <template #header>
                      <h3 class="font-semibold text-gray-900 dark:text-white">
                        {{ $t("admin.settings.previewSettings") }}
                      </h3>
                    </template>

                    <div class="space-y-4">
                      <div class="space-y-2">
                        <label
                          class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          {{ $t("admin.settings.previewTheme") }}
                        </label>
                        <USelect
                          v-model="settings.previewTheme"
                          :options="themeOptions"
                          option-attribute="label"
                          value-attribute="value"
                        />
                      </div>

                      <div class="space-y-2">
                        <label
                          class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          {{ $t("admin.settings.livePreview") }}
                        </label>
                        <UCheckbox
                          v-model="settings.livePreview"
                          :label="$t('admin.settings.enableLivePreview')"
                        />
                      </div>
                    </div>
                  </UCard>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Preview Panel (when not full-screen) -->
        <div
          v-if="activeTab !== 'preview' && settings.livePreview"
          class="preview-panel w-96 border-l border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 overflow-y-auto"
        >
          <div class="p-4">
            <div class="flex items-center justify-between mb-4">
              <h3 class="font-medium text-gray-900 dark:text-white">
                {{ $t("admin.interface.livePreview") }}
              </h3>
              <UButton
                @click="settings.livePreview = false"
                variant="ghost"
                size="xs"
                icon="heroicons:x-mark"
              />
            </div>

            <div class="preview-mini">
              <ContentPreview
                :preview-data="{
                  course: currentCourse,
                  module: currentModule,
                  lesson: currentLesson,
                  modules: currentModules,
                }"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Status Bar -->
    <div
      class="admin-status-bar bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 py-2"
    >
      <div class="flex items-center justify-between text-sm">
        <div class="flex items-center gap-4">
          <span class="text-gray-600 dark:text-gray-400">
            {{ $t("admin.status.ready") }}
          </span>
          <div
            v-if="settings.autoSave"
            class="flex items-center gap-1 text-green-600 dark:text-green-400"
          >
            <UIcon name="heroicons:check-circle" class="w-4 h-4" />
            <span>{{ $t("admin.status.autoSaveEnabled") }}</span>
          </div>
        </div>

        <div class="flex items-center gap-4">
          <span class="text-gray-500">
            {{ $t("admin.status.lastSaved") }}:
            {{ lastSaved || $t("admin.status.never") }}
          </span>
          <div class="flex items-center gap-1">
            <div class="w-2 h-2 bg-green-500 rounded-full"></div>
            <span class="text-gray-600 dark:text-gray-400">{{
              $t("admin.status.online")
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Explicitly import admin components
import CourseEditor from "./CourseEditor.vue";
import ModuleEditor from "./ModuleEditor.vue";
import LessonEditor from "./LessonEditor.vue";
import ContentPreview from "./ContentPreview.vue";

const { t } = useI18n();
const toast = useToast();
const router = useRouter();

// State
const activeTab = ref("course");
const isSaving = ref(false);
const lastSaved = ref("");

// Selected content IDs
const selectedCourseId = ref("");
const selectedModuleId = ref("");
const selectedLessonId = ref("");

// Editor modes
const courseEditorMode = ref<"create" | "edit">("create");
const moduleEditorMode = ref<"create" | "edit">("create");
const lessonEditorMode = ref<"create" | "edit">("create");

// Current content data
const currentCourse = ref(null);
const currentModule = ref(null);
const currentLesson = ref(null);
const currentModules = ref([]);

// Settings
const settings = ref({
  defaultLanguage: "en",
  autoSave: true,
  strictValidation: true,
  previewTheme: "light",
  livePreview: false,
});

// Options
const adminTabs = [
  {
    key: "course",
    label: t("admin.tabs.course"),
    icon: "heroicons:academic-cap",
  },
  {
    key: "module",
    label: t("admin.tabs.module"),
    icon: "heroicons:folder",
  },
  {
    key: "lesson",
    label: t("admin.tabs.lesson"),
    icon: "heroicons:document-text",
  },
  {
    key: "preview",
    label: t("admin.tabs.preview"),
    icon: "heroicons:eye",
  },
  {
    key: "settings",
    label: t("admin.tabs.settings"),
    icon: "heroicons:cog-6-tooth",
  },
];

const languageOptions = [
  { label: "English", value: "en" },
  { label: "العربية", value: "ar" },
];

const themeOptions = [
  { label: t("admin.themes.light"), value: "light" },
  { label: t("admin.themes.dark"), value: "dark" },
  { label: t("admin.themes.auto"), value: "auto" },
];

// Methods
const handleCourseSaved = (courseData: any) => {
  currentCourse.value = courseData;
  selectedCourseId.value = courseData.id;
  updateLastSaved();

  toast.add({
    title: t("admin.notifications.courseSaved"),
    description: t("admin.notifications.courseSavedDesc"),
    color: "success",
  });
};

const handleModuleSaved = (moduleData: any) => {
  currentModule.value = moduleData;
  selectedModuleId.value = moduleData.id;
  updateLastSaved();

  toast.add({
    title: t("admin.notifications.moduleSaved"),
    description: t("admin.notifications.moduleSavedDesc"),
    color: "success",
  });
};

const handleLessonSaved = (lessonData: any) => {
  currentLesson.value = lessonData;
  selectedLessonId.value = lessonData.id;
  updateLastSaved();

  toast.add({
    title: t("admin.notifications.lessonSaved"),
    description: t("admin.notifications.lessonSavedDesc"),
    color: "success",
  });
};

const handleLessonEdit = (lessonIndex: number, lesson: any) => {
  selectedLessonId.value = lesson.id;
  lessonEditorMode.value = "edit";
  activeTab.value = "lesson";
};

const saveAll = async () => {
  isSaving.value = true;

  try {
    // Save all current content
    await new Promise((resolve) => setTimeout(resolve, 1500));

    updateLastSaved();

    toast.add({
      title: t("admin.notifications.allSaved"),
      description: t("admin.notifications.allSavedDesc"),
      color: "success",
    });
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

const exitAdmin = () => {
  router.push("/courses");
};

const createNewCourse = () => {
  courseEditorMode.value = "create";
  activeTab.value = "course";
  selectedCourseId.value = "";
  currentCourse.value = null;
};

const importContent = () => {
  // Implement content import functionality
  toast.add({
    title: t("admin.notifications.importStarted"),
    description: t("admin.notifications.importStartedDesc"),
    color: "info",
  });
};

const exportContent = () => {
  // Implement content export functionality
  toast.add({
    title: t("admin.notifications.exportStarted"),
    description: t("admin.notifications.exportStartedDesc"),
    color: "info",
  });
};

const updateLastSaved = () => {
  lastSaved.value = new Date().toLocaleTimeString();
};

// Auto-save functionality
let autoSaveInterval: NodeJS.Timeout;

watch(
  () => settings.value.autoSave,
  (enabled) => {
    if (enabled) {
      autoSaveInterval = setInterval(() => {
        if (currentCourse.value || currentModule.value || currentLesson.value) {
          saveAll();
        }
      }, 30000); // Auto-save every 30 seconds
    } else {
      if (autoSaveInterval) {
        clearInterval(autoSaveInterval);
      }
    }
  },
  { immediate: true }
);

// Cleanup
onUnmounted(() => {
  if (autoSaveInterval) {
    clearInterval(autoSaveInterval);
  }
});

// Keyboard shortcuts
onMounted(() => {
  const handleKeyDown = (event: KeyboardEvent) => {
    // Ctrl/Cmd + S to save
    if ((event.ctrlKey || event.metaKey) && event.key === "s") {
      event.preventDefault();
      saveAll();
    }

    // Ctrl/Cmd + P to preview
    if ((event.ctrlKey || event.metaKey) && event.key === "p") {
      event.preventDefault();
      activeTab.value = "preview";
    }
  };

  document.addEventListener("keydown", handleKeyDown);

  onUnmounted(() => {
    document.removeEventListener("keydown", handleKeyDown);
  });
});
</script>

<style scoped>
.admin-interface {
  height: 100vh;
  overflow: hidden;
}

.admin-content {
  height: calc(100vh - 4rem); /* Subtract header height */
}

.preview-mini .content-preview {
  transform: scale(0.8);
  transform-origin: top left;
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .admin-sidebar {
    width: 200px;
  }

  .preview-panel {
    display: none;
  }
}

@media (max-width: 768px) {
  .admin-sidebar {
    position: absolute;
    z-index: 50;
    height: 100%;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }

  .admin-sidebar.open {
    transform: translateX(0);
  }
}

/* Focus and accessibility */
button:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* Smooth transitions */
.admin-sidebar button {
  transition: all 0.2s ease;
}
</style>
