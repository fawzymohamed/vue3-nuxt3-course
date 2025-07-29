import type { Course } from "../types/course";

export const coursesConfig: Course[] = [
  {
    id: "vue-nuxt-mastery",
    title: {
      en: "Vue.js & Nuxt.js Mastery",
      ar: "إتقان Vue.js و Nuxt.js",
    },
    description: {
      en: "Complete guide from Vue basics to advanced Nuxt development",
      ar: "دليل شامل من أساسيات Vue إلى التطوير المتقدم مع Nuxt",
    },
    slug: "vue-nuxt-mastery",
    status: "published",
    difficulty: "beginner",
    estimatedHours: 40,
    prerequisites: ["basic-javascript", "html-css"],
    technologies: ["vue", "nuxt", "typescript", "pinia"],
    categories: ["frontend", "web-development", "javascript"],
    instructor: {
      name: "VueNuxtMasters Team",
      bio: {
        en: "Expert Vue.js and Nuxt.js developers with years of experience building modern web applications",
        ar: "فريق من الخبراء في Vue.js و Nuxt.js مع سنوات من الخبرة في بناء تطبيقات الويب الحديثة",
      },
      avatar: "/instructor-avatar.png",
      social: {
        github: "https://github.com/vuenuxtmasters",
        twitter: "https://twitter.com/vuenuxtmasters",
        website: "https://vuenuxtmasters.com",
      },
    },
    thumbnail: "/course-vue-nuxt.png",
    price: {
      amount: 0,
      currency: "USD",
      type: "free",
    },
    modules: [
      {
        id: "module1",
        title: {
          en: "Vue.js Fundamentals",
          ar: "أساسيات Vue.js",
        },
        description: {
          en: "Learn the core concepts of Vue.js including reactivity, components, and directives",
          ar: "تعلم المفاهيم الأساسية لـ Vue.js بما في ذلك التفاعل والمكونات والتوجيهات",
        },
        number: 1,
        estimatedMinutes: 180,
        lessons: [
          {
            id: "lesson1",
            title: {
              en: "What is Vue.js?",
              ar: "ما هو Vue.js؟",
            },
            description: {
              en: "Introduction to Vue.js and its core concepts",
              ar: "مقدمة إلى Vue.js ومفاهيمه الأساسية",
            },
            number: 1,
            estimatedMinutes: 30,
            hasExercise: false,
            hasQuiz: true,
            slug: "lesson1",
          },
          {
            id: "lesson2",
            title: {
              en: "Vue Instance and Reactivity",
              ar: "Vue Instance والتفاعل",
            },
            description: {
              en: "Understanding Vue instances and the reactivity system",
              ar: "فهم Vue instances ونظام التفاعل",
            },
            number: 2,
            estimatedMinutes: 45,
            hasExercise: true,
            hasQuiz: true,
            slug: "lesson2",
          },
        ],
      },
    ],
    createdAt: "2025-07-29",
    updatedAt: "2025-07-29",
    config: {
      theme: {
        primaryColor: "#4FC08D", // Vue green
        accentColor: "#00DC82", // Nuxt green
      },
      features: {
        hasQuizzes: true,
        hasExercises: true,
        hasCertificates: true,
        hasDownloads: false,
        hasVideoContent: false,
        hasLiveSupport: false,
      },
      navigation: {
        showProgressBar: true,
        enableBookmarks: true,
        showEstimatedTime: true,
        enableNotes: true,
      },
    },
    tags: ["vue", "nuxt", "frontend", "javascript", "typescript"],
    rating: {
      average: 4.8,
      count: 156,
    },
    enrollmentCount: 2430,
  },
];

// Course categories configuration
export const courseCategories = [
  {
    id: "frontend",
    title: {
      en: "Frontend Development",
      ar: "تطوير الواجهة الأمامية",
    },
    description: {
      en: "Build beautiful and interactive user interfaces",
      ar: "إنشاء واجهات مستخدم جميلة وتفاعلية",
    },
    icon: "i-heroicons-code-bracket",
    color: "blue",
  },
  {
    id: "backend",
    title: {
      en: "Backend Development",
      ar: "تطوير الخادم",
    },
    description: {
      en: "Server-side development and API creation",
      ar: "تطوير الخادم وإنشاء واجهات برمجة التطبيقات",
    },
    icon: "i-heroicons-server",
    color: "green",
  },
  {
    id: "mobile",
    title: {
      en: "Mobile Development",
      ar: "تطوير التطبيقات المحمولة",
    },
    description: {
      en: "Native and cross-platform mobile applications",
      ar: "تطبيقات محمولة أصلية ومتعددة المنصات",
    },
    icon: "i-heroicons-device-phone-mobile",
    color: "purple",
  },
  {
    id: "web-development",
    title: {
      en: "Web Development",
      ar: "تطوير الويب",
    },
    description: {
      en: "Full-stack web application development",
      ar: "تطوير تطبيقات الويب الشاملة",
    },
    icon: "i-heroicons-globe-alt",
    color: "cyan",
  },
  {
    id: "data-science",
    title: {
      en: "Data Science",
      ar: "علم البيانات",
    },
    description: {
      en: "Data analysis, machine learning, and AI",
      ar: "تحليل البيانات والتعلم الآلي والذكاء الاصطناعي",
    },
    icon: "i-heroicons-chart-bar",
    color: "orange",
  },
  {
    id: "devops",
    title: {
      en: "DevOps & Cloud",
      ar: "DevOps والحوسبة السحابية",
    },
    description: {
      en: "Deployment, scaling, and infrastructure management",
      ar: "النشر والتوسع وإدارة البنية التحتية",
    },
    icon: "i-heroicons-cloud",
    color: "gray",
  },
] as const;

// Technology tags configuration
export const technologyTags = [
  { id: "vue", name: "Vue.js", color: "green" },
  { id: "nuxt", name: "Nuxt.js", color: "green" },
  { id: "react", name: "React", color: "blue" },
  { id: "next", name: "Next.js", color: "blue" },
  { id: "angular", name: "Angular", color: "red" },
  { id: "svelte", name: "Svelte", color: "orange" },
  { id: "typescript", name: "TypeScript", color: "blue" },
  { id: "javascript", name: "JavaScript", color: "yellow" },
  { id: "python", name: "Python", color: "blue" },
  { id: "nodejs", name: "Node.js", color: "green" },
  { id: "express", name: "Express.js", color: "gray" },
  { id: "nestjs", name: "NestJS", color: "red" },
  { id: "django", name: "Django", color: "green" },
  { id: "flask", name: "Flask", color: "blue" },
  { id: "fastapi", name: "FastAPI", color: "green" },
  { id: "go", name: "Go", color: "cyan" },
  { id: "rust", name: "Rust", color: "orange" },
  { id: "java", name: "Java", color: "red" },
  { id: "kotlin", name: "Kotlin", color: "purple" },
  { id: "swift", name: "Swift", color: "orange" },
  { id: "flutter", name: "Flutter", color: "blue" },
  { id: "react-native", name: "React Native", color: "blue" },
  { id: "ionic", name: "Ionic", color: "blue" },
  { id: "pinia", name: "Pinia", color: "green" },
  { id: "vuex", name: "Vuex", color: "green" },
  { id: "redux", name: "Redux", color: "purple" },
  { id: "tailwindcss", name: "Tailwind CSS", color: "cyan" },
  { id: "bootstrap", name: "Bootstrap", color: "purple" },
] as const;

// Difficulty levels configuration
export const difficultyLevels = [
  {
    id: "beginner",
    title: {
      en: "Beginner",
      ar: "مبتدئ",
    },
    description: {
      en: "No prior experience required",
      ar: "لا يتطلب خبرة سابقة",
    },
    color: "green",
    icon: "i-heroicons-academic-cap",
  },
  {
    id: "intermediate",
    title: {
      en: "Intermediate",
      ar: "متوسط",
    },
    description: {
      en: "Some programming experience recommended",
      ar: "يُنصح ببعض الخبرة في البرمجة",
    },
    color: "yellow",
    icon: "i-heroicons-fire",
  },
  {
    id: "advanced",
    title: {
      en: "Advanced",
      ar: "متقدم",
    },
    description: {
      en: "Extensive programming experience required",
      ar: "يتطلب خبرة واسعة في البرمجة",
    },
    color: "red",
    icon: "i-heroicons-bolt",
  },
] as const;
