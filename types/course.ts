export interface ModuleMetadata {
  id: string;
  title: Record<string, string>; // Multi-language titles
  description: Record<string, string>;
  number: number;
  estimatedMinutes: number;
  lessons: LessonMetadata[];
}

export interface LessonMetadata {
  id: string;
  title: Record<string, string>;
  description: Record<string, string>;
  number: number;
  estimatedMinutes: number;
  hasExercise: boolean;
  hasQuiz: boolean;
  slug: string;
}

export interface InstructorInfo {
  name: string;
  bio: Record<string, string>; // Multi-language bios
  avatar: string;
  social?: {
    twitter?: string;
    github?: string;
    linkedin?: string;
    website?: string;
  };
}

export interface CoursePrice {
  amount: number;
  currency: string;
  type: "free" | "paid" | "premium";
  originalAmount?: number; // For discounts
}

export interface CourseFeatures {
  hasQuizzes: boolean;
  hasExercises: boolean;
  hasCertificates: boolean;
  hasDownloads: boolean;
  hasVideoContent: boolean;
  hasLiveSupport: boolean;
}

export interface CourseTheme {
  primaryColor?: string;
  accentColor?: string;
  backgroundImage?: string;
}

export interface CourseNavigation {
  showProgressBar: boolean;
  enableBookmarks: boolean;
  showEstimatedTime: boolean;
  enableNotes: boolean;
}

export interface CourseConfig {
  theme?: CourseTheme;
  features?: CourseFeatures;
  navigation?: CourseNavigation;
}

export interface Course {
  id: string;
  title: Record<string, string>; // Multi-language titles
  description: Record<string, string>;
  slug: string;
  status: "draft" | "published" | "archived" | "coming-soon";
  difficulty: "beginner" | "intermediate" | "advanced";
  estimatedHours: number;
  prerequisites: string[];
  technologies: string[];
  categories: string[];
  instructor: InstructorInfo;
  thumbnail: string;
  price: CoursePrice;
  modules: ModuleMetadata[];
  createdAt: string;
  updatedAt: string;
  config?: CourseConfig;
  tags?: string[];
  rating?: {
    average: number;
    count: number;
  };
  enrollmentCount?: number;
}

export interface CourseProgress {
  courseId: string;
  userId?: string;
  completedLessons: string[];
  currentLesson?: string;
  startedAt: string;
  lastAccessedAt: string;
  completedAt?: string;
  progressPercentage: number;
}

export interface CourseFilters {
  difficulty?: ("beginner" | "intermediate" | "advanced")[];
  technologies?: string[];
  categories?: string[];
  priceType?: ("free" | "paid" | "premium")[];
  status?: ("draft" | "published" | "archived" | "coming-soon")[];
  duration?: {
    min?: number;
    max?: number;
  };
}

export interface CourseSortOptions {
  field:
    | "title"
    | "difficulty"
    | "estimatedHours"
    | "createdAt"
    | "rating"
    | "enrollmentCount";
  direction: "asc" | "desc";
}
