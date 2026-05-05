export type ContentBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string; cite?: string }
  | { type: "code"; lang?: string; code: string };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  tags: string[];
  color: string;
  content: ContentBlock[];
};

export const POSTS: Post[] = [
  {
    slug: "redis-caching-cut-our-api-times-by-35-percent",
    title: "How Redis Caching Cut Our API Response Times by 35%",
    excerpt:
      "A walkthrough of where caching actually paid off in a real backend — and where it just added complexity for no reason.",
    category: "Engineering",
    date: "2026-04-12",
    readTime: "6 min",
    tags: ["Redis", "Backend", "Performance"],
    color: "from-emerald-500/30 to-emerald-900/10",
    content: [
      { type: "p", text: "We had an API that worked. It was just slow. Our p95 sat at 480ms, the dashboards were noisy, and the support inbox kept asking why product pages took two seconds to load. Before reaching for Redis, I wanted to know exactly where the time was going." },
      { type: "h2", text: "Finding the actual bottleneck" },
      { type: "p", text: "We added per-route timing to our middleware and let it bake for a week. The results were surprising — the slow path wasn't our heaviest endpoint. It was the catalog listing, called 40x more often than anything else, hitting the database twice for every paginated request and re-running a category join that almost never changed." },
      { type: "p", text: "That's the rule I keep relearning: optimise the request you make 10,000 times an hour, not the one that takes 800ms once a day." },
      { type: "h2", text: "Where caching actually paid off" },
      { type: "p", text: "Three places, in order of impact:" },
      { type: "ul", items: [
        "Category trees — read-heavy, write-rare. We cached the entire tree under a single key and invalidated on mutation. p95 on the catalog dropped from 480ms to 210ms.",
        "Hot product details — the same 200 SKUs accounted for 60% of traffic. A 60-second TTL on the hydrated product object cut DB load in half.",
        "Session lookups — JWT payloads were getting re-validated against the user table on every request. We moved that to Redis with a 5-minute TTL and freed up real connection capacity.",
      ]},
      { type: "h2", text: "Where it didn't" },
      { type: "p", text: "I tried caching the cart endpoint. It seemed obvious — read-heavy, per-user. But cart contents change constantly, and the invalidation logic ended up costing more than the cached reads saved. We pulled it out a week later." },
      { type: "p", text: "Same story with search results. The query space was too wide; cache hit rate stayed under 8%. The Redis cluster was doing real work for almost no payoff." },
      { type: "quote", text: "If your hit rate is below 70%, you're not caching — you're just adding a network hop." },
      { type: "h2", text: "What I'd do differently" },
      { type: "p", text: "Measure first, cache second. The instinct is to reach for Redis the moment latency creeps up, but half the wins are in the SQL — better indexes, fewer N+1s, smarter joins. Caching is the right tool when reads dominate, the data is shareable, and invalidation is bounded. Outside of that, it's mostly extra moving parts." },
      { type: "p", text: "We ended up with three small caches doing real work, instead of a giant cache layer doing none. p95 settled at 310ms. Not a heroic number — but the right one for the work we actually did." },
    ],
  },
  {
    slug: "integrating-openai-into-a-production-lms",
    title: "Integrating OpenAI into a Production LMS",
    excerpt:
      "Practical lessons from wiring up LLM-driven curriculum generation: prompt design, cost control, fallback strategies, and failure modes.",
    category: "AI",
    date: "2026-03-20",
    readTime: "9 min",
    tags: ["OpenAI", "LLM", "Education"],
    color: "from-purple-500/30 to-purple-900/10",
    content: [
      { type: "p", text: "Adding an LLM to a working product is easy. Keeping it stable, affordable, and useful in production is the actual job. After six months of running OpenAI inside a paid LMS, here's what I'd tell my past self." },
      { type: "h2", text: "Prompts are infrastructure" },
      { type: "p", text: "We started with prompts hardcoded into route handlers. Within a month they were duplicated across three services and impossible to iterate on. Pulling them into a versioned, testable prompt library was the highest-leverage refactor we did all year." },
      { type: "p", text: "Treat them like SQL queries: named, reviewed, tested against fixtures, and rolled back when they regress. Not free-form strings buried in business logic." },
      { type: "h2", text: "Cost control is a product feature" },
      { type: "p", text: "Three things kept the bill survivable:" },
      { type: "ul", items: [
        "Aggressive prompt caching — system prompts, instructions, and reference docs are stable across calls. Caching them cut input tokens by 60% on our most-used flow.",
        "Tiered model routing — Haiku for classification and routing, Sonnet for the actual generation, Opus only when accuracy mattered enough to justify the spend.",
        "Hard ceilings on retries — one auto-retry on transient errors, then fail loud. Silent retry storms during an outage can 10x your monthly cost.",
      ]},
      { type: "h2", text: "Plan for the model being wrong" },
      { type: "p", text: "The LLM is a stochastic component in a deterministic system. Sometimes it returns malformed JSON. Sometimes it confidently invents references. Sometimes it just... pauses for 40 seconds." },
      { type: "p", text: "We built three layers of defence: schema validation on every output, a deterministic fallback for critical paths, and a circuit breaker that stops calling the API entirely if error rates spike. None of it is glamorous — all of it has saved us." },
      { type: "quote", text: "Treat the LLM like a flaky third-party service that occasionally also lies. Build accordingly." },
      { type: "h2", text: "What instructors actually used" },
      { type: "p", text: "We shipped four AI features. Two flopped, two stuck. The ones that stuck shared a pattern: they reduced grunt work without claiming creative authorship — generating quiz drafts, summarising student submissions. The flops tried to replace judgment instructors wanted to keep. Lesson learned: AI assists, doesn't author." },
    ],
  },
  {
    slug: "anti-piracy-video-playback-on-the-web",
    title: "Anti-Piracy Video Playback on the Web",
    excerpt:
      "What signed URLs, watermarks, and DRM-style controls actually buy you when shipping paid course videos — and what they don't.",
    category: "Security",
    date: "2026-02-08",
    readTime: "7 min",
    tags: ["Video", "DRM", "Streaming"],
    color: "from-rose-500/30 to-rose-900/10",
    content: [
      { type: "p", text: "Paid course videos leak. That's the starting truth. The question isn't how to make them un-leakable — that's impossible without full DRM and a hardware chain. The question is how to raise the cost of redistribution high enough that casual leakers give up." },
      { type: "h2", text: "Signed URLs first" },
      { type: "p", text: "Every video request goes through a backend that mints a short-lived, IP-bound URL valid for the session. Direct hot-linking stops working immediately — and that alone covered 80% of the casual sharing." },
      { type: "p", text: "The implementation is small: a token signed with a server secret, baked into the manifest URL, validated by the CDN edge function. CloudFront, Bunny, and Fastly all support this directly." },
      { type: "h2", text: "Watermarks people can't crop out" },
      { type: "p", text: "We render the user's email in semi-transparent text that drifts position every 30 seconds across the player. Cropping it out means cropping the actual video content too. It doesn't stop sharing, but it makes the leaker's identity recoverable from any redistributed clip." },
      { type: "p", text: "This was the cheapest, highest-impact deterrent we shipped. Three confirmed leak attempts, all traced back to the original buyer within an hour." },
      { type: "h2", text: "What DRM actually buys you" },
      { type: "p", text: "We evaluated full Widevine/FairPlay DRM and decided against it. The integration cost is real, browser support is messy, and a determined attacker with a screen recorder still wins. For paid education content, the tradeoff didn't make sense." },
      { type: "ul", items: [
        "Signed URLs — stops drive-by hot-linking and bandwidth theft.",
        "Per-user watermarks — makes leak attribution trivial.",
        "Token rotation per segment — defeats simple manifest-grabbing tools.",
        "DRM — only worth it if you're shipping major-label content with contractual requirements.",
      ]},
      { type: "h2", text: "What stopped working" },
      { type: "p", text: "Disabling right-click. Blocking dev tools. Detecting screen recorders. Every attempt to fight the browser made the player feel hostile to legitimate users without slowing down anyone determined. We ripped all of it out." },
      { type: "quote", text: "Security through annoyance only annoys your paying customers." },
    ],
  },
  {
    slug: "real-time-inventory-with-postgres-listen-notify",
    title: "Real-Time Inventory Sync with Postgres LISTEN/NOTIFY",
    excerpt:
      "Why we picked plain Postgres over Redis pub/sub or a queue for live stock updates — and how it scaled to dozens of concurrent vendors.",
    category: "Engineering",
    date: "2026-01-15",
    readTime: "8 min",
    tags: ["PostgreSQL", "Real-time", "Architecture"],
    color: "from-blue-500/30 to-blue-900/10",
    content: [
      { type: "p", text: "Multi-vendor marketplaces have one inventory problem: when stock changes, every connected dashboard needs to know in seconds, not minutes. The standard answer is Redis pub/sub or a message queue. We did neither." },
      { type: "h2", text: "Why not Redis or a queue" },
      { type: "p", text: "Both work. Both add a second source of truth that can drift from the database. We were already running Postgres for orders, vendors, and inventory — adding a separate event bus meant two systems to operate, two failure modes to handle, and a window where the cache and the DB disagree." },
      { type: "p", text: "Postgres has LISTEN/NOTIFY built in. It's not glamorous, but it's transactional with the data — when the row commits, the notification fires. No drift, no extra infra." },
      { type: "h2", text: "How the wiring works" },
      { type: "ul", items: [
        "A trigger on the inventory table fires NOTIFY on UPDATE.",
        "A long-lived connection in our API service runs LISTEN and forwards events through Server-Sent Events to connected dashboards.",
        "Each dashboard subscribes only to the channels for its vendor's products.",
        "The whole chain is sub-200ms from row change to UI update.",
      ]},
      { type: "h2", text: "What broke at scale" },
      { type: "p", text: "Two things, both fixable." },
      { type: "p", text: "First — NOTIFY payloads are capped at 8000 bytes. We were dumping the full row in. Switched to sending just the product ID and letting clients refetch. Smaller payloads, simpler invalidation." },
      { type: "p", text: "Second — long-lived connections need supervision. A network blip kills the LISTEN socket silently and you stop getting events. We added a heartbeat and reconnect loop, which is the kind of thing nobody mentions in the docs." },
      { type: "quote", text: "The boring tool you already run usually beats the exciting tool you'd have to operate." },
      { type: "h2", text: "When to reach for Redis instead" },
      { type: "p", text: "If your fan-out is in the thousands of subscribers per channel, or you need cross-region replication, or the events aren't tied to DB writes — Redis (or a real broker) is the right answer. For a single-region marketplace with dozens of vendors and reactive UIs, plain Postgres carried us further than I expected." },
    ],
  },
  {
    slug: "flutter-for-low-end-android-devices",
    title: "Flutter for Low-End Android Devices",
    excerpt:
      "Designing Krishak AI for $80 Android phones in rural Bangladesh — what worked, what we cut, and what we'd do differently.",
    category: "Mobile",
    date: "2025-12-02",
    readTime: "6 min",
    tags: ["Flutter", "Mobile", "UX"],
    color: "from-amber-500/30 to-amber-900/10",
    content: [
      { type: "p", text: "Most Flutter performance advice assumes a flagship phone. Krishak AI shipped to farmers running 2GB RAM, low-end Android 9 devices on 2G coverage. Half the patterns we'd normally use weren't viable. Here's what we changed." },
      { type: "h2", text: "Cut animations until they justify themselves" },
      { type: "p", text: "Default Flutter transitions look great on an iPhone and chug on a Realme C-series. We replaced page route animations with instant transitions on screens where the user just wants information fast. Felt jarring in QA on our test phones; felt correct in the field." },
      { type: "h2", text: "Image weight is the silent killer" },
      { type: "p", text: "A single uncompressed PNG can blow your jank budget for the entire screen. We standardised on WebP, set strict cache sizes, and switched to memory-aware lazy loading for any list with more than 20 items. App memory dropped from peaks of 380MB to a steady 140MB." },
      { type: "ul", items: [
        "WebP everywhere, with PNG fallbacks only where we needed transparency.",
        "Image dimensions sized to the actual render box, not the largest possible viewport.",
        "Disk cache capped at 60MB so we don't fill up storage on devices with 16GB total.",
      ]},
      { type: "h2", text: "Offline-first, without lying about it" },
      { type: "p", text: "Network is intermittent in rural areas. We cached every successful response with a clear UI signal when data was stale — not silent stale data presented as fresh. Farmers trust the app more when it tells them 'this was last synced 2 hours ago' than when it pretends everything is current." },
      { type: "h2", text: "What we'd do differently" },
      { type: "p", text: "Test on the worst phone you can find, daily. Not in a sim. We bought three of the cheapest Androids on the market and made them our development test devices. Every pattern that survived that filter shipped to production." },
      { type: "quote", text: "Build for the phone your user actually owns, not the one your team uses." },
    ],
  },
  {
    slug: "teaching-clean-architecture-to-200-engineers",
    title: "Teaching Clean Architecture to 200 Engineers",
    excerpt:
      "What I learned mentoring two cohorts of backend engineers — and the patterns that actually stuck after the curriculum ended.",
    category: "Mentoring",
    date: "2025-10-22",
    readTime: "5 min",
    tags: ["Clean Architecture", "TDD", "Mentoring"],
    color: "from-cyan-500/30 to-cyan-900/10",
    content: [
      { type: "p", text: "I ran two backend cohorts back to back — about 200 engineers between them. Clean Architecture was supposed to be the centerpiece. Six months later, half of what I taught had stuck and half had quietly evaporated. The pattern in what survived is worth writing down." },
      { type: "h2", text: "What stuck" },
      { type: "p", text: "Three patterns, all of them small:" },
      { type: "ul", items: [
        "Separating handlers from business logic — every team kept this. The win is obvious the first time you write a test.",
        "Dependency injection for IO — also kept, mostly because it makes mocking trivial in tests.",
        "Naming use-cases by verb — 'CreateOrder', 'CancelSubscription'. Cheap, clear, and it forces you to think about what each operation actually does.",
      ]},
      { type: "h2", text: "What evaporated" },
      { type: "p", text: "Strict layering. Domain entities. Repository interfaces with three implementations behind them. The full Onion/Clean stack as taught in the book. Engineers nodded through it during the cohort and reverted to two-layer (handler + service) the moment they were back in their own codebases." },
      { type: "p", text: "Not because they were lazy. Because most production codebases don't have the kind of complexity those patterns are protecting against. You're paying setup cost for problems you don't have." },
      { type: "quote", text: "Architecture is overhead until your problem grows into it. Teach the patterns. Don't sell them as defaults." },
      { type: "h2", text: "What I'd teach differently" },
      { type: "p", text: "Less doctrine, more decision-making. Instead of 'always use a repository pattern', teach 'here's when a repository pattern earns its complexity, and here's when it doesn't'. The engineers who shipped good code six months later were the ones who could articulate the tradeoff, not the ones who memorized the diagram." },
    ],
  },
];

export function formatPostDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function getPostBySlug(slug: string) {
  return POSTS.find((p) => p.slug === slug);
}

export function getRelatedPosts(slug: string, limit = 3) {
  const current = getPostBySlug(slug);
  if (!current) return [];
  const sameCategory = POSTS.filter(
    (p) => p.slug !== slug && p.category === current.category
  );
  const others = POSTS.filter(
    (p) => p.slug !== slug && p.category !== current.category
  );
  return [...sameCategory, ...others].slice(0, limit);
}
