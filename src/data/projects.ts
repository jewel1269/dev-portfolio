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
    description: "Bengali-friendly LMS with structured courses, AI assistant, and ATS resume checker.",
    category: "Education",
    year: "2026",
    role: "Founder & Full-Stack Engineer",
    liveLink: "https://learnwithjewel.com",
    image: "/img/learnwithjewel.png",
    tags: ["Next.js", "TypeScript", "AI"],
    color: "from-sky-500/30 to-sky-900/10",
    initials: "LW",
    duration: "Ongoing",
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
    description: "Multi-vendor E-commerce platform with real-time inventory sync.",
    category: "E-Commerce",
    year: "2026",
    role: "Lead Developer",
    client: "Ophelia Go",
    liveLink: "https://opheliago.com",
    image: "/img/ophelia.png",
    tags: ["Next.js", "Nest.js", "PostgreSQL"],
    color: "from-emerald-500/30 to-emerald-900/10",
    initials: "OG",
    duration: "4 months",
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
    slug: "programming-fighter",
    title: "Programming Fighter",
    tagline: "A Bangla-first career-track LMS — learn, build, get hired.",
    description: "Bangla-first LMS with career-track courses, mentorship, and job placement support.",
    category: "Education",
    year: "2025",
    role: "Founder & Full-Stack Engineer",
    liveLink: "https://programming-fighter.com",
    image: "/img/programming-fighter.png",
    tags: ["Next.js", "Express.js", "MongoDB"],
    color: "from-amber-500/30 to-amber-900/10",
    initials: "PF",
    duration: "Ongoing",
    overview:
      "Programming Fighter is a Bangla-first learning platform that prepares students for jobs and freelancing through career-track courses — Frontend Mastery (React, Next.js, Tailwind), Backend Engineering (Node, Express, MongoDB), and AI Agent Development (LLMs, LangChain, n8n) — backed by 24/7 mentorship, real-life projects, and job placement guidance.",
    challenge:
      "Bengali-speaking learners preparing for tech careers needed more than video tutorials: structured guidance in their own language, portfolio-worthy projects, mentor access when stuck, and a bridge to actual employment. Building it self-hosted also meant protecting paid course videos from being downloaded and re-uploaded elsewhere — a major leak channel for paid education content.",
    approach: [
      "Built the platform with a Next.js frontend and an Express.js + MongoDB backend, modeled with denormalized read paths for course pages and normalized writes for enrollment and progress tracking.",
      "Designed three career-track courses around industry-standard stacks — frontend, backend, and AI agent development — each ending in market-standard projects students add to their portfolios.",
      "Set up a mentorship system with 24/7 live support and dedicated support hours where students get direct help from experienced mentors.",
      "Implemented a secure video playback system with signed, short-lived URLs and watermarking to resist unauthorized redistribution of paid content.",
      "Integrated SSLCommerz for local payment methods (mobile banking, cards) so paying for courses works smoothly inside Bangladesh.",
      "Added a career layer: verified performance-graded certificates, CV/LinkedIn/GitHub review, interview prep, and direct referral of top performers to partner companies.",
    ],
    features: [
      { title: "Career-track courses", desc: "Frontend Mastery, Backend Engineering, and AI Agent Development — job-ready stacks, not toy tutorials." },
      { title: "24/7 mentorship", desc: "Live support plus dedicated support hours with experienced mentors when students get stuck." },
      { title: "Real projects & assignments", desc: "Market-standard practical projects students ship and add straight to their portfolios." },
      { title: "Job & internship referrals", desc: "Best performers' profiles are shared directly with partner companies." },
      { title: "Career & interview prep", desc: "Direct support on CV, LinkedIn, GitHub profile, and job interview preparation." },
      { title: "Verified certificates", desc: "Performance-graded certification at course completion." },
      { title: "Anti-piracy video player", desc: "Signed URLs and watermarks protect paid content on every stream." },
      { title: "SSLCommerz payments", desc: "Native support for Bangladeshi cards and mobile-banking checkouts." },
    ],
    stack: [
      { area: "Frontend", tools: ["Next.js", "TypeScript", "Tailwind CSS"] },
      { area: "Backend", tools: ["Express.js", "Node.js", "MongoDB", "Mongoose"] },
      { area: "Infra", tools: ["SSLCommerz", "CDN", "JWT Auth"] },
    ],
    results: [
      { metric: "500+", label: "Students" },
      { metric: "3", label: "Career Tracks" },
      { metric: "98%", label: "Satisfaction" },
      { metric: "24/7", label: "Mentorship" },
    ],
  },
  {
    slug: "krishak-ai",
    title: "Krishak AI",
    tagline: "An AI-powered mobile assistant for farmers.",
    description: "AI-powered agriculture mobile app helping farmers with crop and field intelligence.",
    category: "AI",
    year: "2025",
    role: "Mobile + Backend Engineer",
    liveLink: "#",
    image: "/img/krishak.png",
    tags: ["Flutter", "Node.js", "Express.js", "MongoDB"],
    color: "from-purple-500/30 to-purple-900/10",
    initials: "KA",
    duration: "3 months",
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
    slug: "expense-tracker",
    title: "Expense Tracker",
    tagline: "A clean personal-finance app with budgets and analytics.",
    description: "Personal finance app with budgets, categories, and analytics.",
    category: "Finance",
    year: "2024",
    role: "Full-Stack Engineer",
    liveLink: "#",
    image: "/img/expense.png",
    tags: ["Flutter", "Node.js", "MongoDB"],
    color: "from-rose-500/30 to-rose-900/10",
    initials: "ET",
    duration: "2 months",
    overview:
      "Expense Tracker is a personal finance app for people who want a quick, friction-free way to see where their money goes. Add a transaction in two taps; get budget alerts and monthly insights without leaving the home screen.",
    challenge:
      "Most expense apps either bury the 'add transaction' flow under three menus or bloat the UI with bank-syncing setup that rural users can't complete. The goal was the opposite: a fast manual-entry app that makes daily tracking effortless.",
    approach: [
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
      { area: "Mobile", tools: ["Flutter", "Dart", "Riverpod", "Hive"] },
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
