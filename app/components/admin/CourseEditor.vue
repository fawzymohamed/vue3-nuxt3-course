<template>
  <div class="course-editor">
    <div class="editor-header">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
        {{ $t("admin.courseEditor.title") }}
      </h2>
      <p class="text-gray-600 dark:text-gray-400 mt-2">
        {{ $t("admin.courseEditor.subtitle") }}
      </p>
    </div>

    <UCard class="mt-6">
      <form @submit.prevent="saveCourse" class="space-y-6">
        <!-- Course Basic Information -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormGroup :label="$t('admin.course.id')" required>
            <UInput
              v-model="courseData.id"
              placeholder="vue-fundamentals"
              :disabled="isEditing"
            />
          </FormGroup>

          <FormGroup :label="$t('admin.course.slug')" required>
            <UInput v-model="courseData.slug" placeholder="vue-fundamentals" />
          </FormGroup>

          <FormGroup :label="$t('admin.course.status')" required>
            <USelect
              v-model="courseData.status"
              :options="statusOptions"
              option-attribute="label"
              value-attribute="value"
            />
          </FormGroup>

          <FormGroup :label="$t('admin.course.difficulty')" required>
            <USelect
              v-model="courseData.difficulty"
              :options="difficultyOptions"
              option-attribute="label"
              value-attribute="value"
            />
          </FormGroup>

          <FormGroup :label="$t('admin.course.estimatedHours')" required>
            <UInput
              v-model.number="courseData.estimatedHours"
              type="number"
              min="1"
              max="200"
            />
          </FormGroup>

          <FormGroup :label="$t('admin.course.price')">
            <div class="flex gap-2">
              <UInput
                v-model.number="courseData.price.amount"
                type="number"
                min="0"
                step="0.01"
                class="flex-1"
              />
              <USelect
                v-model="courseData.price.currency"
                :options="currencyOptions"
                class="w-24"
              />
              <USelect
                v-model="courseData.price.type"
                :options="priceTypeOptions"
                option-attribute="label"
                value-attribute="value"
                class="w-32"
              />
            </div>
          </FormGroup>
        </div>

        <!-- Multilingual Title and Description -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            {{ $t("admin.course.content") }}
          </h3>

          <div class="space-y-6">
            <!-- English Content -->
            <UCard>
              <template #header>
                <h4 class="font-semibold text-gray-900 dark:text-white">
                  English
                </h4>
              </template>
              <div class="space-y-4">
                <FormGroup :label="$t('admin.course.title')" required>
                  <UInput
                    v-model="courseData.title.en"
                    :placeholder="$t('admin.course.titlePlaceholder')"
                  />
                </FormGroup>

                <FormGroup :label="$t('admin.course.description')" required>
                  <UTextarea
                    v-model="courseData.description.en"
                    :placeholder="$t('admin.course.descriptionPlaceholder')"
                    :rows="4"
                  />
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
                <FormGroup :label="$t('admin.course.title')" required>
                  <UInput
                    v-model="courseData.title.ar"
                    :placeholder="$t('admin.course.titlePlaceholder')"
                  />
                </FormGroup>

                <FormGroup :label="$t('admin.course.description')" required>
                  <UTextarea
                    v-model="courseData.description.ar"
                    :placeholder="$t('admin.course.descriptionPlaceholder')"
                    :rows="4"
                  />
                </FormGroup>
              </div>
            </UCard>
          </div>
        </div>

        <!-- Technologies and Prerequisites -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormGroup :label="$t('admin.course.technologies')">
            <div class="space-y-2">
              <div class="flex gap-2">
                <UInput
                  v-model="newTechnology"
                  :placeholder="$t('admin.course.addTechnology')"
                  @keyup.enter="addTechnology"
                  class="flex-1"
                />
                <UButton
                  @click="addTechnology"
                  variant="outline"
                  :disabled="!newTechnology.trim()"
                >
                  {{ $t("admin.common.add") }}
                </UButton>
              </div>
              <div class="flex flex-wrap gap-2">
                <UBadge
                  v-for="(tech, index) in courseData.technologies"
                  :key="index"
                  variant="soft"
                  class="cursor-pointer"
                  @click="removeTechnology(index)"
                >
                  {{ tech }} ×
                </UBadge>
              </div>
            </div>
          </FormGroup>

          <FormGroup :label="$t('admin.course.prerequisites')">
            <div class="space-y-2">
              <div class="flex gap-2">
                <UInput
                  v-model="newPrerequisite"
                  :placeholder="$t('admin.course.addPrerequisite')"
                  @keyup.enter="addPrerequisite"
                  class="flex-1"
                />
                <UButton
                  @click="addPrerequisite"
                  variant="outline"
                  :disabled="!newPrerequisite.trim()"
                >
                  {{ $t("admin.common.add") }}
                </UButton>
              </div>
              <div class="flex flex-wrap gap-2">
                <UBadge
                  v-for="(prereq, index) in courseData.prerequisites"
                  :key="index"
                  variant="soft"
                  class="cursor-pointer"
                  @click="removePrerequisite(index)"
                >
                  {{ prereq }} ×
                </UBadge>
              </div>
            </div>
          </FormGroup>
        </div>

        <!-- Instructor Information -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            {{ $t("admin.instructor.title") }}
          </h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormGroup :label="$t('admin.instructor.name')" required>
              <UInput
                v-model="courseData.instructor.name"
                :placeholder="$t('admin.instructor.namePlaceholder')"
              />
            </FormGroup>

            <FormGroup :label="$t('admin.instructor.avatar')">
              <UInput
                v-model="courseData.instructor.avatar"
                :placeholder="$t('admin.instructor.avatarPlaceholder')"
              />
            </FormGroup>
          </div>

          <div class="space-y-6">
            <!-- English Bio -->
            <UCard>
              <template #header>
                <h4 class="font-semibold text-gray-900 dark:text-white">
                  English Bio
                </h4>
              </template>
              <div class="pt-4">
                <FormGroup :label="$t('admin.instructor.bio')" required>
                  <UTextarea
                    v-model="courseData.instructor.bio.en"
                    :placeholder="$t('admin.instructor.bioPlaceholder')"
                    :rows="3"
                  />
                </FormGroup>
              </div>
            </UCard>

            <!-- Arabic Bio -->
            <UCard>
              <template #header>
                <h4 class="font-semibold text-gray-900 dark:text-white">
                  السيرة الذاتية
                </h4>
              </template>
              <div class="pt-4" dir="rtl">
                <FormGroup :label="$t('admin.instructor.bio')" required>
                  <UTextarea
                    v-model="courseData.instructor.bio.ar"
                    :placeholder="$t('admin.instructor.bioPlaceholder')"
                    :rows="3"
                  />
                </FormGroup>
              </div>
            </UCard>
          </div>
        </div>

        <!-- Course Media -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            {{ $t("admin.course.media") }}
          </h3>

          <FormGroup :label="$t('admin.course.thumbnail')">
            <UInput
              v-model="courseData.thumbnail"
              :placeholder="$t('admin.course.thumbnailPlaceholder')"
            />
          </FormGroup>
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
              @click="previewCourse"
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
import FormGroup from "~/components/FormGroup.vue";

const { t } = useI18n();
const toast = useToast();

// Props
interface Props {
  courseId?: string;
  mode?: "create" | "edit";
}

const props = withDefaults(defineProps<Props>(), {
  mode: "create",
});

// State
const isEditing = computed(() => props.mode === "edit");
const isSaving = ref(false);
const newTechnology = ref("");
const newPrerequisite = ref("");

// Course data structure
const courseData = ref({
  id: "",
  slug: "",
  title: {
    en: "",
    ar: "",
  },
  description: {
    en: "",
    ar: "",
  },
  status: "draft",
  difficulty: "beginner",
  estimatedHours: 10,
  prerequisites: [] as string[],
  technologies: [] as string[],
  instructor: {
    name: "",
    bio: {
      en: "",
      ar: "",
    },
    avatar: "",
  },
  thumbnail: "",
  price: {
    amount: 0,
    currency: "USD",
    type: "free",
  },
  createdAt: "",
  updatedAt: "",
});

// Options
const statusOptions = [
  { label: t("admin.courseStatus.draft"), value: "draft" },
  { label: t("admin.courseStatus.published"), value: "published" },
  { label: t("admin.courseStatus.archived"), value: "archived" },
];

const difficultyOptions = [
  { label: t("admin.difficulty.beginner"), value: "beginner" },
  { label: t("admin.difficulty.intermediate"), value: "intermediate" },
  { label: t("admin.difficulty.advanced"), value: "advanced" },
];

const currencyOptions = ["USD", "EUR", "GBP"];

const priceTypeOptions = [
  { label: t("admin.priceType.free"), value: "free" },
  { label: t("admin.priceType.paid"), value: "paid" },
  { label: t("admin.priceType.premium"), value: "premium" },
];

// Computed
const isFormValid = computed(() => {
  return (
    courseData.value.id &&
    courseData.value.slug &&
    courseData.value.title.en &&
    courseData.value.title.ar &&
    courseData.value.description.en &&
    courseData.value.description.ar &&
    courseData.value.instructor.name &&
    courseData.value.instructor.bio.en &&
    courseData.value.instructor.bio.ar
  );
});

// Methods
const addTechnology = () => {
  const tech = newTechnology.value.trim();
  if (tech && !courseData.value.technologies.includes(tech)) {
    courseData.value.technologies.push(tech);
    newTechnology.value = "";
  }
};

const removeTechnology = (index: number) => {
  courseData.value.technologies.splice(index, 1);
};

const addPrerequisite = () => {
  const prereq = newPrerequisite.value.trim();
  if (prereq && !courseData.value.prerequisites.includes(prereq)) {
    courseData.value.prerequisites.push(prereq);
    newPrerequisite.value = "";
  }
};

const removePrerequisite = (index: number) => {
  courseData.value.prerequisites.splice(index, 1);
};

const saveCourse = async () => {
  if (!isFormValid.value) return;

  isSaving.value = true;

  try {
    // Add timestamps
    const now = new Date().toISOString();
    const courseToSave = {
      ...courseData.value,
      createdAt: isEditing.value ? courseData.value.createdAt : now,
      updatedAt: now,
    };

    // Here you would typically save to an API or file system
    console.log("Saving course:", courseToSave);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.add({
      title: t("admin.notifications.courseCreated"),
      description: t("admin.notifications.courseCreatedDesc"),
      color: "success",
    });

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
  courseData.value = {
    id: "",
    slug: "",
    title: { en: "", ar: "" },
    description: { en: "", ar: "" },
    status: "draft",
    difficulty: "beginner",
    estimatedHours: 10,
    prerequisites: [],
    technologies: [],
    instructor: {
      name: "",
      bio: { en: "", ar: "" },
      avatar: "",
    },
    thumbnail: "",
    price: {
      amount: 0,
      currency: "USD",
      type: "free",
    },
    createdAt: "",
    updatedAt: "",
  };
};

const previewCourse = () => {
  // Emit preview event or navigate to preview page
  console.log("Preview course:", courseData.value);
  toast.add({
    title: t("admin.notifications.previewGenerated"),
    description: t("admin.notifications.previewDesc"),
    color: "info",
  });
};

// Auto-generate slug from title
watch(
  () => courseData.value.title.en,
  (newTitle) => {
    if (newTitle && !isEditing.value) {
      courseData.value.slug = newTitle
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-+|-+$/g, "");
    }
  }
);

// Load existing course data if editing
onMounted(async () => {
  if (isEditing.value && props.courseId) {
    try {
      // Load course data from API or course registry
      console.log("Loading course:", props.courseId);
      // courseData.value = await loadCourse(props.courseId);
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
.course-editor {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

.editor-header {
  text-align: center;
  margin-bottom: 2rem;
}

/* RTL support for Arabic content */
[dir="rtl"] .course-editor {
  text-align: right;
}

[dir="rtl"] .editor-header {
  text-align: center;
}
</style>
