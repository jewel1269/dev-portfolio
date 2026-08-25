export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  category: string;
  year: string;
  role: string;
  client?: string;
  liveLink: string;
  githubLink?: string;
  image?: string;
  tags: string[];
  color: string;
  initials: string;
  overview: string;
  challenge: string;
  approach: string[];
  features: { title: string; desc: string }[];
  stack: { area: string; tools: string[] }[];
  results: { metric: string; label: string }[];
  duration: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "learn-with-jewel",
    title: "Learn With Jewel",
    tagline: "Bangladesh's Bengali-first LMS for career-ready developers.",
    description:
      "Bengali-friendly LMS with structured courses, AI assistant, and ATS resume checker. Built Bangla-first so learners can go from first lesson to a job-ready portfolio in one place.",
    category: "Education",
    year: "2024",
    role: "Founder & Full-Stack Engineer",
    liveLink: "https://learnwithjewel.com",
    image: "/img/learnwithjewel-home.png",
    tags: ["Next.js", "TypeScript", "AI"],
    color: "from-sky-500/30 to-sky-900/10",
    initials: "LW",
    duration: "1.5 Months",
    overview:
      "Learn With Jewel is a Bengali-friendly learning platform for serious learners — structured video courses, assessments, credentials, and career tools, all in one place. It pairs project-based learning with mentorship to take students from their first line of code to a job-ready portfolio.",
    challenge:
      "Most quality developer education is locked behind English-only platforms that overwhelm Bengali-speaking beginners and stop at video content. Learners needed a single platform that teaches in their language, tracks real progress through coursework and assessments, and bridges the gap to employment with career tooling — not just another video library.",
    approach: [
      "Built the platform on Next.js (App Router) with TypeScript and Tailwind CSS for a fast, SEO-friendly experience across course pages and the learner dashboard.",
      "Designed a full learner journey — enrolled courses, foundational learning tracks, coursework, assessments, credentials, and performance rankings — so progress is measurable, not just watched.",
      "Integrated an 'Ask AI' assistant so students get instant, context-aware help without leaving the platform.",
      "Shipped an ATS resume checker that scores resumes instantly and suggests improvements, connecting learning directly to job hunting.",
      "Made the UI bilingual (Bangla/English) with full dark-mode support, designed Bangla-first for accessibility.",
      "Delivered it as an installable PWA so students can launch it from their home screen like a native app.",
      "Added webinars, a community feed, and a blog to keep learning social and continuous beyond course content.",
    ],
    features: [
      { title: "Structured learner dashboard", desc: "Enrolled courses, coursework, assessments, and credentials — the full journey in one view." },
      { title: "Ask AI assistant", desc: "Instant, context-aware answers to learning questions, built into the platform." },
      { title: "ATS resume checker", desc: "Score and improve your resume instantly — learning connected to landing the job." },
      { title: "Assessments & credentials", desc: "Measurable progress with graded assessments and earned certificates." },
      { title: "Performance rankings", desc: "Leaderboards that keep learners motivated and cohorts competitive." },
      { title: "Bangla-first bilingual UI", desc: "Switch between Bangla and English instantly, with full dark-mode support." },
      { title: "Installable PWA", desc: "Launch from the home screen like a native app — no browser needed." },
      { title: "Webinars & community feed", desc: "Live sessions, peer discussion, and a blog to keep learning continuous." },
    ],
    stack: [
      { area: "Frontend", tools: ["Next.js", "TypeScript", "Tailwind CSS"] },
      { area: "Platform", tools: ["PWA", "Bangla/English i18n", "Dark Mode"] },
      { area: "AI", tools: ["Ask AI Assistant", "ATS Resume Analysis"] },
    ],
    results: [
      { metric: "200+", label: "Active Students" },
      { metric: "5,000+", label: "YouTube Subscribers" },
      { metric: "AI", label: "Built-in Assistant" },
      { metric: "Bangla", label: "First UX" },
    ],
  },
  {
    slug: "ophelia-go",
    title: "Ophelia Go",
    tagline: "A multi-vendor e-commerce platform built for scale.",
    description:
      "Multi-vendor E-commerce platform with real-time inventory sync. Local payment gateways and courier dispatch sit in the same seller dashboard so operations don't fall back to spreadsheets.",
    category: "E-Commerce",
    year: "2025",
    role: "Lead Developer",
    client: "Ophelia Go",
    liveLink: "https://opheliago.com",
    image: "/img/ophelia.png",
    tags: ["Next.js", "Nest.js", "PostgreSQL"],
    color: "from-emerald-500/30 to-emerald-900/10",
    initials: "OG",
    duration: "3 months",
    overview:
      "Ophelia Go is a high-performance multi-vendor marketplace where dozens of sellers manage inventory, orders, and payouts from a single dashboard while shoppers get a fast, unified buying experience.",
    challenge:
      "The existing operations relied on manual spreadsheets to reconcile inventory across vendors, leading to overselling, slow checkout, and a fragmented seller dashboard. The team needed a single platform that could keep stock synced in real time, support hundreds of concurrent vendors, and stay snappy as the catalog scaled.",
    approach: [
      "Architected the storefront with Next.js (App Router) for server-side rendering, fast initial loads, and SEO-friendly product pages.",
      "Built the backend on Nest.js with a modular service-per-domain structure (orders, vendors, inventory, payments) so each module could evolve independently.",
      "Designed a normalized PostgreSQL schema with row-level locking on stock mutations to prevent overselling under concurrent purchases.",
      "Implemented a real-time inventory sync layer using Postgres LISTEN/NOTIFY and Server-Sent Events to push stock updates to seller dashboards instantly.",
      "Integrated four major payment gateways — SSLCommerz, AamarPay, bKash, and PayStation — behind a unified payment abstraction so checkout works for every customer regardless of their preferred method.",
      "Wired up Steadfast Courier API for automated order dispatch, label generation, and live delivery tracking — eliminating manual courier coordination.",
      "Streamlined the checkout flow into a 2-step process with optimistic UI, reducing drop-off and admin intervention.",
    ],
    features: [
      { title: "Multi-vendor dashboard", desc: "Each seller gets a self-serve dashboard for products, orders, and payout tracking." },
      { title: "Real-time inventory", desc: "Stock counts sync across all storefronts and seller views the moment a sale closes." },
      { title: "Multi-gateway payments", desc: "SSLCommerz, AamarPay, bKash, and PayStation — customers pay however they want." },
      { title: "Steadfast courier sync", desc: "Auto-dispatch orders, generate labels, and track deliveries live from the dashboard." },
      { title: "Dynamic catalog", desc: "Faceted search, category filters, and instant-update product cards." },
      { title: "Streamlined checkout", desc: "Two-step checkout with auto-saved cart and optimistic UI." },
      { title: "Admin operations console", desc: "Centralized view for moderators to handle disputes, refunds, and vendor onboarding." },
      { title: "Scalable image pipeline", desc: "Optimized image delivery with on-the-fly resizing and lazy loading." },
    ],
    stack: [
      { area: "Frontend", tools: ["Next.js 14", "TypeScript", "Tailwind CSS", "TanStack Query"] },
      { area: "Backend", tools: ["Nest.js", "PostgreSQL", "Prisma", "Redis"] },
      { area: "Payments", tools: ["SSLCommerz", "AamarPay", "bKash", "PayStation"] },
      { area: "Courier", tools: ["Steadfast"] },
      { area: "Infra", tools: ["Docker", "AWS EC2", "AWS S3", "CI/CD"] },
    ],
    results: [
      { metric: "4", label: "Payment Gateways" },
      { metric: "Auto", label: "Courier Dispatch" },
      { metric: "Real-time", label: "Inventory Sync" },
      { metric: "Multi", label: "Vendor Support" },
    ],
  },
  {
    slug: "docsheba",
    title: "Doc Sheba",
    tagline: "Bangladesh-first telehealth platform — book doctors, video consult, Rx, and records in one place.",
    description:
      "Full-stack healthcare OS for patients, doctors, and admins — video consultations, digital prescriptions, medical records, payments, and AI assistant.",
    category: "Healthcare",
    year: "2026",
    role: "Full-Stack Engineer",
    liveLink: "#",
    image: "/img/docsheba.png",
    tags: ["Next.js", "NestJS", "PostgreSQL", "LiveKit"],
    color: "from-teal-500/30 to-teal-900/10",
    initials: "DS",
    duration: "1.5+ months",
    overview:
      "Doc Sheba is a modular telehealth platform built for Bangladesh — patients can find BMDC-verified specialists, book slots, pay via local gateways, join secure video consultations, and receive digital prescriptions. Doctors get a full portal for schedule, consultations, and earnings; admins verify credentials and manage the platform.",
    challenge:
      "Bangladesh healthcare is fragmented: appointments on phone, prescriptions on paper, reports scattered across labs, and no unified follow-up after a visit. Rural users need Bangla/English support, local payment methods (bKash-style flows), and video that works on average mobile networks — not a Western-only stack with Stripe and Cal.com assumptions.",
    approach: [
      "Architected a modular monolith (NestJS + Prisma + PostgreSQL) with read-replica readiness, Redis caching, and BullMQ for async jobs — designed to scale toward 1M+ users without premature microservices.",
      "Built patient booking with internal slot conflict prevention, 30-minute pending holds, and Pay Station + UddoktaPay payment adapters for Bangladesh.",
      "Integrated LiveKit Cloud for real-time video consults with server-issued JWT tokens — patient waiting room and doctor room flows.",
      "Shipped server-side prescription PDF generation (PDFKit → MinIO/Cloudinary) with async BullMQ processing and patient download.",
      "Wired transactional notifications (Resend email, Twilio/BulkSMSBD SMS) through BullMQ with in-app notification center.",
      "Added OpenRouter-powered AI health assistant with SSE streaming, rate limits, and semantic response cache.",
      "Stored medical records on MinIO/S3 with presigned private URLs; patient–doctor messaging with SSE realtime updates.",
    ],
    features: [
      { title: "Doctor search & booking", desc: "Meilisearch-powered specialist search, slot picker, and conflict-safe appointment creation." },
      { title: "Local payments", desc: "Pay Station + UddoktaPay initiate, webhook, and appointment confirmation on success." },
      { title: "Video consultation", desc: "LiveKit waiting room → consult room for patient and doctor with mic/cam controls." },
      { title: "Digital prescriptions", desc: "Doctor writes Rx in consult; server PDF generated and stored; patient downloads from portal." },
      { title: "Medical records", desc: "Upload lab/imaging PDFs and images to private S3/MinIO; view with presigned URLs." },
      { title: "AI assistant", desc: "Bangla/English symptom triage and report explainer via OpenRouter — streamed token-by-token." },
      { title: "Patient ↔ doctor messaging", desc: "Follow-up threads after confirmed appointments with SSE live updates." },
      { title: "Admin verification", desc: "Doctor credential queue, approve/reject, and platform oversight dashboards." },
      { title: "Multi-portal RBAC", desc: "Patient, doctor, admin, and pharmacy UI shells with JWT + role guards." },
    ],
    stack: [
      { area: "Frontend", tools: ["Next.js 15", "React", "Tailwind CSS", "Server Actions", "Expo (mobile)"] },
      { area: "Backend", tools: ["NestJS", "Prisma", "PostgreSQL", "Redis", "BullMQ"] },
      { area: "Integrations", tools: ["LiveKit", "OpenRouter", "Pay Station", "UddoktaPay", "Resend", "BulkSMSBD", "MinIO/S3", "Cloudinary", "Meilisearch"] },
      { area: "Infra", tools: ["Docker Compose", "PgBouncer", "Turbo monorepo", "Cursor pagination", "revalidateTag caching"] },
    ],
    results: [
      { metric: "3", label: "Portals (Patient / Doctor / Admin)" },
      { metric: "Phase 3", label: "Async Integrations" },
      { metric: "SSE", label: "AI + Messaging" },
      { metric: "BD-ready", label: "Payments & SMS" },
    ],
  },
  {
    slug: "krishak-ai",
    title: "Krishak AI",
    tagline: "An AI-powered mobile assistant for farmers.",
    description:
      "AI-powered agriculture mobile app helping farmers with crop and field intelligence. Snap a leaf for disease detection, ask in Bangla, and keep using it when the network drops.",
    category: "AI",
    year: "2025",
    role: "Mobile + Backend Engineer",
    liveLink: "#",
    image: "/img/krishak.png",
    tags: ["Flutter", "Node.js", "Express.js", "MongoDB"],
    color: "from-purple-500/30 to-purple-900/10",
    initials: "KA",
    duration: "2.5 months",
    overview:
      "Krishak AI puts an agronomist in every farmer's pocket. The app uses image recognition and LLM-driven Q&A to identify crop diseases, recommend treatments, and guide farmers through seasonal decisions in their own language.",
    challenge:
      "Smallholder farmers often lack access to extension officers or reliable agronomic advice, leading to crop loss from preventable disease and poor input timing. Existing apps assumed high literacy, English fluency, and stable connectivity — none of which is realistic in rural Bangladesh.",
    approach: [
      "Built the mobile app in Flutter with a clean Bangla-first UI, voice input, and image capture flow optimized for low-end Android devices.",
      "Engineered a Node.js + Express.js backend that orchestrates calls to vision models for disease detection and an LLM for follow-up questions and treatment guidance.",
      "Stored user farms, crop history, and consultation logs in MongoDB so the assistant could give context-aware advice over time.",
      "Built an offline-first caching layer so common diagnoses and seasonal tips work even on intermittent connectivity.",
      "Added a feedback loop where farmer outcomes flow back into model fine-tuning datasets.",
    ],
    features: [
      { title: "Crop disease detection", desc: "Snap a photo of a leaf — get an instant diagnosis and treatment plan." },
      { title: "AI agronomist chat", desc: "Ask questions in Bangla; get LLM-backed advice tailored to your farm." },
      { title: "Field intelligence", desc: "Track multiple plots, growth stages, and per-crop recommendations." },
      { title: "Offline-first", desc: "Works on patchy connectivity with smart caching and sync." },
      { title: "Voice input", desc: "Speak instead of typing — designed for low-literacy users." },
      { title: "Bangla-first UX", desc: "Native language interface, units, and cultural context throughout." },
    ],
    stack: [
      { area: "Mobile", tools: ["Flutter", "Dart", "Riverpod", "Hive"] },
      { area: "Backend", tools: ["Node.js", "Express.js", "MongoDB", "Mongoose"] },
      { area: "AI", tools: ["OpenAI / LLM", "Vision Models", "Custom Prompts"] },
    ],
    results: [
      { metric: "Bangla", label: "First Language" },
      { metric: "Offline", label: "Capable" },
      { metric: "AI", label: "Crop Diagnosis" },
      { metric: "Mobile", label: "Cross-Platform" },
    ],
  },
  {
    slug: "expenseiq",
    title: "ExpenseIQ",
    tagline: "Offline-first expense tracker — budgets, analytics, and reports that stay on your phone.",
    description:
      "Flutter finance app for personal and small-business spending — local Hive storage, bilingual UI (English/বাংলা), budgets, recurring bills, PDF/CSV reports, biometric lock, and Play Store release readiness.",
    category: "Finance / Mobile",
    year: "2026",
    role: "Mobile App Developer",
    liveLink: "#",
    image: "/img/expenseiq.png",
    tags: ["Flutter", "Riverpod", "Hive", "Android"],
    color: "from-blue-500/30 to-slate-900/10",
    initials: "EQ",
    duration: "1 months",
    overview:
      "ExpenseIQ is a privacy-first expense tracker built for everyday users in Bangladesh and beyond. Track expenses and income across accounts and categories, set budgets with alerts, automate recurring bills, view analytics, export PDF/CSV reports, and lock the app with PIN or biometric — all without cloud sync. Data lives on-device via Hive; English and বাংলা are first-class.",
    challenge:
      "Most finance apps push cloud accounts, ads, or Western payment assumptions. Users wanted a clean offline experience: multi-currency display, Bangla support, local reminders that survive reboot, secure local auth, receipt attach from gallery (no unnecessary camera), and a Play Store–ready release pipeline (upload keystore, Data safety, privacy policy, AAB).",
    approach: [
      "Built a Flutter + Riverpod architecture with feature modules (auth, dashboard, expenses, income, budgets, recurring, analytics, reports, settings) and typed Hive models/repositories.",
      "Implemented local-first auth with salted SHA-256 password hashing, user-scoped data isolation, and optional PIN/biometric app lock via local_auth.",
      "Designed a light navy brand UI (#1E3A5F) with onboarding, dashboard summaries, category/account management, and consistent form patterns across screens.",
      "Added fl_chart analytics, PDF/CSV report export + share sheet, gallery-only receipt attach, JSON backup export/import, and an Android home-screen widget.",
      "Hardened daily reminders with flutter_local_notifications, timezone (Asia/Dhaka fallback), boot receivers, and exact/inexact alarm fallbacks.",
      "Prepared Play release: upload keystore signing, ProGuard rules, package id com.jewel.expenseiq, privacy policy, store assets, and signed AAB (versioned releases for Internal + Closed testing).",
    ],
    features: [
      { title: "Expenses & income", desc: "Add, filter, and manage transactions with categories, accounts, notes, and optional gallery receipts." },
      { title: "Budgets & alerts", desc: "Category budgets with progress tracking and notification hooks when spending approaches limits." },
      { title: "Recurring bills", desc: "Automate repeating expenses so fixed costs don’t get forgotten each cycle." },
      { title: "Analytics & reports", desc: "Charts for spending insights; export PDF/CSV and share via the system share sheet." },
      { title: "Bilingual UI", desc: "Full English and বাংলা strings for onboarding, auth, and core flows." },
      { title: "Privacy lock", desc: "Optional PIN and biometric unlock; passwords hashed locally — no cloud login server." },
      { title: "Backup & restore", desc: "Export/import JSON backups so users can recover data after reinstall." },
      { title: "Home widget & reminders", desc: "Android widget plus scheduled daily reminders with timezone-aware scheduling." },
      { title: "Play Store ready", desc: "Release signing, privacy policy, Data safety–aligned permissions (no camera), Internal/Closed testing AABs." },
    ],
    stack: [
      { area: "Mobile", tools: ["Flutter", "Dart", "Riverpod", "Google Fonts", "Material 3"] },
      { area: "Local data", tools: ["Hive", "path_provider", "crypto (salted hash)"] },
      { area: "Features", tools: ["fl_chart", "pdf", "share_plus", "image_picker", "file_picker", "local_auth", "home_widget"] },
      { area: "Notifications", tools: ["flutter_local_notifications", "timezone", "flutter_timezone"] },
      { area: "Release", tools: ["Android App Bundle", "Upload keystore", "R8/ProGuard", "Play Console"] },
    ],
    results: [
      { metric: "1 app", label: "Offline finance OS" },
      { metric: "En + Bn", label: "Bilingual UX" },
      { metric: "0 cloud", label: "On-device privacy" },
      { metric: "Play", label: "AAB + Closed testing" },
    ],
  },
  {
    slug: "expense-tracker",
    title: "Expense Tracker",
    tagline: "A clean personal-finance app with budgets and analytics.",
    description: "Personal finance app with budgets, categories, and analytics.",
    category: "Finance",
    year: "2024",
    role: "Full-Stack Engineer",
    liveLink: "#",
    image: "/img/expense.png",
    tags: ["React Native", "Node.js", "MongoDB"],
    color: "from-rose-500/30 to-rose-900/10",
    initials: "ET",
    duration: "2 months",
    overview:
      "Expense Tracker is a personal finance app for people who want a quick, friction-free way to see where their money goes. Add a transaction in two taps; get budget alerts and monthly insights without leaving the home screen.",
    challenge:
      "Most expense apps either bury the 'add transaction' flow under three menus or bloat the UI with bank-syncing setup that rural users can't complete. The goal was the opposite: a fast manual-entry app that makes daily tracking effortless.",
    approach: [
      "Built the mobile client in React Native + TypeScript so Android and iOS share one codebase with native navigation and gesture performance.",
      "Designed a one-thumb add-transaction flow as the home screen, so logging an expense takes under 3 seconds.",
      "Built category-based budgets with rolling monthly windows and gentle nudges when spending trends near the cap.",
      "Implemented analytics views — by category, by week, by month — using lightweight in-app charts to avoid heavy chart libraries.",
      "Stored data locally with cloud sync so the app works offline and stays fast on first launch.",
      "Used Node.js + MongoDB on the backend for sync, auth, and multi-device consistency.",
    ],
    features: [
      { title: "2-tap entry", desc: "Add a transaction faster than typing it in notes — that's the whole point." },
      { title: "Budgets & alerts", desc: "Set monthly category budgets; get nudged before you blow them." },
      { title: "Analytics", desc: "Spend trends by category, week, and month — at a glance." },
      { title: "Offline-first", desc: "Add and view anywhere; cloud-sync when online." },
      { title: "Multi-device", desc: "Same data on phone, tablet, and the web companion." },
      { title: "Custom categories", desc: "Create your own categories with icons and colors." },
    ],
    stack: [
      { area: "Mobile", tools: ["React Native", "TypeScript", "Redux", "AsyncStorage"] },
      { area: "Backend", tools: ["Node.js", "Express.js", "MongoDB"] },
      { area: "Infra", tools: ["JWT Auth", "REST API", "Cloud Sync"] },
    ],
    results: [
      { metric: "<3s", label: "Add Transaction" },
      { metric: "Offline", label: "First UX" },
      { metric: "Multi", label: "Device Sync" },
      { metric: "Real-time", label: "Budgets" },
    ],
  },
];

export function getProjectBySlug(slug: string) {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string) {
  const i = PROJECTS.findIndex((p) => p.slug === slug);
  return {
    prev: i > 0 ? PROJECTS[i - 1] : PROJECTS[PROJECTS.length - 1],
    next: i < PROJECTS.length - 1 ? PROJECTS[i + 1] : PROJECTS[0],
  };
}
