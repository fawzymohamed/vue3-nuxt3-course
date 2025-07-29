---
title: "إعداد بيئة التطوير"
description: "تعلم كيفية إعداد Node.js، npm/yarn، والاختيار بين Vue CLI و Vite لتطوير Vue.js"
number: 2
module: 1
section: 1
level: "beginner"
courseId: "vue-nuxt-mastery"
moduleId: "module1"
---

::hero-section

# إعداد بيئة التطوير

# Node.js، npm/yarn، Vue CLI مقابل Vite

::

::introduction-section

قبل أن نغوص في تطوير Vue.js، نحتاج إلى إعداد بيئة التطوير بشكل صحيح. يشمل ذلك تثبيت **Node.js**، فهم مديري الحزم، واختيار أداة البناء المناسبة.

_الأساس المتين هو مفتاح تجربة تطوير سلسة._

::

::content-section-title

# 📦 Node.js - الأساس

::

::prose-card{title="ما هو Node.js؟"}
**Node.js** هو وقت تشغيل JavaScript مبني على محرك V8 JavaScript في Chrome. يتيح لنا تشغيل JavaScript خارج المتصفح، وهو ضروري لـ:

- **إدارة الحزم** باستخدام npm/yarn
- **أدوات البناء** وخوادم التطوير
- **أدوات JavaScript الحديثة** (محزمات، مترجمات)
  ::

::content-section

# تثبيت Node.js

زر [nodejs.org](https://nodejs.org) وحمل إصدار **LTS (الدعم طويل المدى)**. هذا يضمن الاستقرار والتوافق مع معظم الأدوات.

::

::code-example

```bash
# تحقق من تثبيت Node.js
node --version

# تحقق من إصدار npm
npm --version
```

::

::callout{type="tip"}
**نصيحة**: استخدم مدير إصدارات Node.js مثل **nvm** (Linux/Mac) أو **nvm-windows** (Windows) للتبديل بسهولة بين إصدارات Node.js للمشاريع المختلفة.
::

::content-section-title

# 📚 مديرو الحزم: npm مقابل yarn

::

::feature-list

- **npm** مدمج في Node.js، مدير الحزم الافتراضي
- **yarn** مدير حزم بديل مع تثبيت أسرع وذاكرة تخزين مؤقت أفضل
- **pnpm** خيار أحدث مع استخدام فعال لمساحة القرص

::

::content-section

# أوامر npm التي ستستخدمها

::

::code-example

```bash
# تهيئة مشروع جديد
npm init

# تثبيت التبعيات
npm install package-name

# تثبيت تبعيات التطوير
npm install --save-dev package-name

# تشغيل السكريبتات
npm run script-name

# تثبيت الحزم عالمياً
npm install -g package-name
```

::

::content-section

# أوامر yarn (البديل)

::

::code-example

```bash
# تهيئة مشروع جديد
yarn init

# تثبيت التبعيات
yarn add package-name

# تثبيت تبعيات التطوير
yarn add --dev package-name

# تشغيل السكريبتات
yarn script-name

# تثبيت الحزم عالمياً
yarn global add package-name
```

::

::content-section-title

# ⚡ Vue CLI مقابل Vite: اختيار أداة البناء

::

::prose-card{title="الجدل الكبير: Vue CLI مقابل Vite"}
كلا الأداتين تساعدانك في إنشاء وإدارة مشاريع Vue.js، لكن لهما نهج ونقاط قوة مختلفة.
::

::content-section

# Vue CLI - الخيار التقليدي

Vue CLI هو أداة السقالات **الرسمية** لمشاريع Vue.js التي موجودة منذ Vue 2.

**المزايا:**

- ناضج ومستقر
- نظام بيئي واسع من الإضافات
- رائع للمشاريع المعقدة والمؤسسية
- خيارات تكوين شاملة

**العيوب:**

- خادم تطوير أبطأ
- مبني على Webpack (أكثر تعقيداً)
- أوقات بناء أطول

::

::code-example

```bash
# تثبيت Vue CLI عالمياً
npm install -g @vue/cli

# إنشاء مشروع جديد
vue create my-project

# بدء خادم التطوير
npm run serve
```

::

::content-section

# Vite - البديل الحديث

Vite (يُنطق "فيت") هو أداة بناء **الجيل التالي** التي أصبحت الخيار الموصى به لمشاريع Vue 3 الجديدة.

**المزايا:**

- خادم تطوير سريع البرق
- استبدال الوحدات الساخن الفوري
- دعم وحدات ES الأصلية
- تكوين أبسط
- تجربة مطور أفضل

**العيوب:**

- أحدث (نظام بيئي أقل نضجاً)
- بعض الإضافات قد لا تكون متاحة بعد

::

::code-example

```bash
# إنشاء مشروع Vue جديد مع Vite
npm create vue@latest my-project

# الانتقال إلى المشروع
cd my-project

# تثبيت التبعيات
npm install

# بدء خادم التطوير
npm run dev
```

::

::callout{type="success"}
**التوصية**: للمشاريع الجديدة Vue 3، **Vite هو الخيار الموصى به** بسبب تجربة التطوير والأداء المتفوق.
::

::content-section-title

# 🛠️ إنشاء مشروعك الأول

::

::content-section

لننشئ مشروع Vue جديد باستخدام Vite:

::

::code-example

```bash
# إنشاء مشروع (اختر Vue، TypeScript اختياري)
npm create vue@latest vue-learning-project

# الانتقال إلى المشروع
cd vue-learning-project

# تثبيت التبعيات
npm install

# بدء خادم التطوير
npm run dev
```

::

::content-section

# نظرة عامة على هيكل المشروع

::

::code-example

```
vue-learning-project/
├── public/          # الأصول الثابتة
├── src/
│   ├── assets/      # الأصول المعالجة بواسطة Vite
│   ├── components/  # مكونات Vue
│   ├── App.vue      # المكون الجذر
│   └── main.js      # نقطة دخول التطبيق
├── index.html       # قالب HTML
├── package.json     # تبعيات المشروع
└── vite.config.js   # تكوين Vite
```

::

::content-section-title

# 🔧 إضافات VS Code الأساسية

::

::feature-list

- **Volar** دعم لغة Vue 3 (يحل محل Vetur)
- **Vue VSCode Snippets** مقاطع كود Vue مفيدة
- **Auto Rename Tag** إعادة تسمية تلقائية للعلامات المقترنة HTML/XML
- **Bracket Pair Colorizer** تلوين الأقواس المتطابقة
- **Prettier** منسق الكود
- **ESLint** مدقق JavaScript

::

::callout{type="info"}
**الخطوات التالية**: في الدرس التالي، سننشئ أول تطبيق Vue ونستكشف هيكل المشروع بالتفصيل!
::
