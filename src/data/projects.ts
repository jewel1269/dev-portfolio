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
    slug: "ophelia-go",
    title: "Ophelia Go",
    tagline: "A multi-vendor e-commerce platform built for scale.",
    description: "Multi-vendor E-commerce platform with real-time inventory sync.",
    category: "E-Commerce",
    year: "2025",
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
    tagline: "A full-featured LMS for live, project-based learning.",
    description: "Full-featured LMS with live classes, assignments, and secure video.",
    category: "Education",
    year: "2024",
    role: "Full-Stack Engineer",
    client: "Programming Fighter",
    liveLink: "https://programming-fighter.com",
    image: "/img/programming-fighter.png",
    tags: ["Next.js", "Express.js", "MongoDB"],
    color: "from-amber-500/30 to-amber-900/10",
    initials: "PF",
    duration: "5 months",
    overview:
      "Programming Fighter is a Learning Management System where instructors run live cohorts, ship assignments, and sell paid courses — with a secure video player that resists unauthorized redistribution.",
    challenge:
      "The team wanted to move beyond third-party platforms (which charged per-student fees and offered limited control) to a self-hosted LMS. The hardest constraint was preventing course videos from being downloaded and re-uploaded elsewhere — a major leak channel for paid education content.",
    approach: [
      "Designed a custom video playback system with signed, short-lived URLs, watermarking, and DRM-style anti-distribution controls baked in.",
      "Built the live-class layer on top of a streaming SDK with per-cohort access control and seamless replay generation.",
      "Implemented an assignment workflow where students submit, instructors review, and feedback threads stay scoped per submission.",
      "Integrated SSLCommerz for local payment methods (mobile banking, cards) so paying for courses worked smoothly inside Bangladesh.",
      "Modeled the data in MongoDB with denormalized read paths for course pages and normalized writes for enrollment / progress tracking.",
    ],
    features: [
      { title: "Live class streaming", desc: "Real-time classes with chat, screen-share, and instant replay archiving." },
      { title: "Anti-piracy video player", desc: "Signed URLs, watermarks, and tampering protection on every stream." },
      { title: "Assignment workflows", desc: "Submit-review-feedback loop with per-thread scoping." },
      { title: "SSLCommerz payments", desc: "Native support for Bangladeshi cards and mobile-banking checkouts." },
      { title: "Cohort management", desc: "Group students into batches with per-cohort scheduling and content drip." },
      { title: "Progress tracking", desc: "Per-student dashboards showing completion, scores, and time spent." },
    ],
    stack: [
      { area: "Frontend", tools: ["Next.js", "TypeScript", "Tailwind CSS", "Redux Toolkit"] },
      { area: "Backend", tools: ["Express.js", "Node.js", "MongoDB", "Mongoose"] },
      { area: "Infra", tools: ["AWS S3", "SSLCommerz", "CDN", "JWT Auth"] },
    ],
    results: [
      { metric: "Secure", label: "Video Playback" },
      { metric: "Live", label: "Class Streaming" },
      { metric: "Payments", label: "SSLCommerz" },
      { metric: "Scalable", label: "Cohort Workflows" },
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
    tags: ["React Native", "Node.js", "MongoDB"],
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
      { area: "Mobile", tools: ["React Native", "TypeScript", "Zustand"] },
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
