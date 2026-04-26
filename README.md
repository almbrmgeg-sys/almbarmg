# WorkDesk Pro - منصة إدارة أعمال IT Administration

تطبيق احترافي (Web App) لإدارة الأعمال اليومية داخل بيئة تقنية المعلومات، مع واجهة عربية RTL كاملة.

## اسم النظام
**WorkDesk Pro | ورك ديسك برو**

## التحليل المختصر (Software Requirements)
- إدارة المهام اليومية (إنشاء/تحديث/حالة/أولوية/تواريخ).
- إدارة التذاكر والدعم الفني وربطها بالموظفين.
- إدارة الأصول والأجهزة والمعدات وحالتها التشغيلية.
- جدولة الصيانة الدورية ومتابعة التنفيذ والفني المسؤول.
- التنبيهات للمواعيد والمهام المتأخرة والصيانة.
- أرشفة الملفات والمرفقات المرتبطة بالكيانات.
- لوحة تحكم مركزية بإحصائيات ورسوم بيانية.
- سجل نشاطات (Audit Trail) لعمليات النظام.
- بحث وفلترة متقدمة.

## الموديولات الرئيسية
1. المصادقة وتسجيل الدخول.
2. Dashboard.
3. إدارة المهام.
4. إدارة التذاكر.
5. إدارة الأجهزة.
6. إدارة الصيانة.
7. التقارير.
8. التنبيهات والمرفقات وسجل النشاط.

## Stack المقترح والمنفّذ
- **Frontend:** React + TypeScript + TailwindCSS + Vite
- **Backend:** Express + TypeScript
- **Database:** SQLite (better-sqlite3)
- **Architecture:** واجهة منفصلة + REST API

## هيكل قاعدة البيانات
- `users`
- `tasks`
- `tickets`
- `devices`
- `maintenance`
- `alerts`
- `attachments`
- `activity_logs`

> جميع الجداول تم إنشاؤها مع علاقات أساسية `foreign keys` داخل `server/db.ts`.

## طريقة تنزيل المشروع على الكمبيوتر (Windows / macOS / Linux)
### الخيار 1: تنزيل مباشر (ZIP)
1. افتح صفحة المشروع على GitHub.
2. اضغط **Code** ثم **Download ZIP**.
3. فك الضغط في أي مجلد على جهازك.
4. افتح المجلد عبر Terminal أو VS Code ثم نفّذ:
```bash
npm install
npm run dev:api
npm run dev
```

### الخيار 2: عبر Git (مفضل)
> يتطلب تثبيت Git مسبقًا.
```bash
git clone <REPO_URL>
cd almbarmg
npm install
npm run dev:api
npm run dev
```

### المتطلبات قبل التشغيل
- **Node.js 18+** (يفضل LTS)
- **npm 9+**
- **Git** (إذا اخترت طريقة clone)

## تشغيل المشروع
### 1) تثبيت الحزم
```bash
npm install
```

### 2) تشغيل الـ API
```bash
npm run dev:api
```

### 3) تشغيل الواجهة
```bash
npm run dev
```

- الواجهة: `http://localhost:3000`
- API: `http://localhost:4000`

## بيانات دخول تجريبية
- البريد: `admin@workdesk.local`
- كلمة المرور: `Admin@123`

## ملاحظات مستقبلية للتطوير
- تطبيق RBAC كامل بصلاحيات دقيقة لكل Module.
- إضافة رفع ملفات حقيقي عبر S3 أو MinIO.
- تكامل مع البريد/Telegram/Slack للتنبيهات.
- تحويل قاعدة البيانات إلى PostgreSQL للإنتاج.
- إضافة اختبارات E2E وUnit tests.
