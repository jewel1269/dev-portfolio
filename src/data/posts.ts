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
  image?: string;
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
    image: "/img/redis.png",
    content: [
      { type: "p", text: "Caching gets blamed for problems it never causes and credited with wins it didn't earn. After moving an e-commerce backend's p95 from 480ms to 310ms with Redis, here's what actually mattered — and the parts where caching made things worse before they got better." },

      { type: "h2", text: "Step 1: Measure before you cache" },
      { type: "p", text: "We added per-route latency and call-count metrics to our middleware and let it bake for a full week. The bottleneck was not where we expected. The slowest single endpoint was a report query at 1.8s — but it ran four times an hour. The catalog listing took only 220ms, but it was hit 40,000 times an hour." },
      { type: "p", text: "Total user-facing time saved by speeding up the catalog by 100ms: roughly 67 minutes per hour across the user base. Total saved by speeding up the report by 1s: 4 seconds. That comparison decided everything we did next." },
      { type: "quote", text: "Optimize the request that runs 10,000 times an hour, not the one that takes 800ms once a day." },

      { type: "h2", text: "Step 2: Cache only when three conditions hold" },
      { type: "ul", items: [
        "Read-heavy — at least 10x more reads than writes on the same key.",
        "Cacheable surface — inputs collapse into a small key space, not unique-per-user query strings.",
        "Bounded invalidation — you can list every event that should expire the key in a single sentence.",
      ]},
      { type: "p", text: "If any one of these fails, you don't have a caching problem — you have a query problem. Fix the SQL first." },

      { type: "h2", text: "What worked" },
      { type: "ul", items: [
        "Category trees — read-heavy, write-rare. One key, invalidated on category mutation. Catalog p95 dropped from 480ms to 210ms.",
        "Hot product details — 200 SKUs accounted for 60% of traffic. A 60-second TTL on the hydrated object cut DB load in half.",
        "Session lookups — JWT payloads were re-validated against the user table on every request. Moved to Redis with a 5-minute TTL; freed real connection capacity.",
      ]},

      { type: "h3", text: "A read-through pattern that's almost always right" },
      { type: "code", lang: "typescript", code: "async function cached<T>(key: string, ttl: number, fn: () => Promise<T>): Promise<T> {\n  const hit = await redis.get(key);\n  if (hit) return JSON.parse(hit) as T;\n  const value = await fn();\n  await redis.set(key, JSON.stringify(value), 'EX', ttl);\n  return value;\n}" },
      { type: "p", text: "No stampede protection here — add a short-lived lock if your origin can't survive N concurrent misses on a hot key." },

      { type: "h2", text: "What didn't" },
      { type: "p", text: "Two failures, both instructive." },
      { type: "p", text: "Cart endpoint: per-user, read-heavy, looked obvious. But cart contents changed on almost every request — invalidation cost more than the cache saved. We pulled it within a week." },
      { type: "p", text: "Search results: query space too wide; hit rate stayed under 8%. Redis was doing real work for almost no payoff. The fix wasn't a smarter cache — it was a better index." },

      { type: "h2", text: "Final numbers" },
      { type: "ul", items: [
        "p95 latency: 480ms → 310ms (35% reduction).",
        "Database CPU during peak: 71% → 38%.",
        "Cache hit rate where caching shipped: 89%.",
      ]},
      { type: "p", text: "Caching is the right tool when reads dominate, the data is shareable, and invalidation is bounded. Outside of that, you're not caching — you're just adding a network hop with extra steps." },
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
    image: "/img/openai.png",
    content: [
      { type: "p", text: "Adding an LLM to a working product takes a weekend. Keeping it stable, affordable, and useful for six months in production is the actual job. Here are the patterns that survived running OpenAI inside a paid LMS used by tens of thousands of students." },

      { type: "h2", text: "1. Prompts are infrastructure, not strings" },
      { type: "p", text: "We started with prompts hardcoded into route handlers. Within a month they were duplicated across three services with subtle differences nobody could explain. The single highest-leverage refactor of the year was pulling them into a versioned prompt library." },
      { type: "code", lang: "typescript", code: "// prompts/quiz/generate.v3.ts\nexport const generateQuiz = {\n  id: 'quiz.generate',\n  version: 3,\n  model: 'gpt-4o',\n  system: '...stable, cacheable instructions...',\n  user: (input: QuizInput) =>\n    `Topic: ${input.topic}\\nDifficulty: ${input.difficulty}`,\n};" },
      { type: "p", text: "Treat prompts like SQL queries: named, versioned, reviewed, tested against fixtures, rolled back when they regress. Not free-form strings buried in business logic." },

      { type: "h2", text: "2. Cost control is a feature, not an afterthought" },
      { type: "p", text: "Three patterns kept the bill survivable as we scaled from 1k to 50k students:" },
      { type: "ul", items: [
        "Prompt caching — system prompts, instructions, and reference docs are stable across calls. Caching them cut input tokens by 60% on our most-used flow.",
        "Tiered model routing — a small model for classification and routing, a mid-tier for the actual generation, the frontier model only when accuracy mattered enough to justify the spend.",
        "Hard ceilings on retries — one auto-retry on transient errors, then fail loud. Silent retry storms during a provider outage can 10x your monthly bill overnight.",
      ]},

      { type: "h2", text: "3. Plan for the model being wrong" },
      { type: "p", text: "An LLM is a stochastic component inside a deterministic system. Sometimes it returns malformed JSON. Sometimes it confidently invents references. Sometimes it just pauses for 40 seconds and times out." },
      { type: "p", text: "Three layers of defense kept us shippable:" },
      { type: "ul", items: [
        "Schema validation on every output — if the JSON doesn't match the expected shape, retry once, then fall back.",
        "Deterministic fallback for critical paths — if the model can't be reached, the user gets a sensible non-AI experience instead of an error.",
        "Circuit breaker — if error rate exceeds a threshold over 5 minutes, stop calling the API entirely and serve fallbacks until it recovers.",
      ]},
      { type: "quote", text: "Treat the LLM like a flaky third-party service that occasionally also lies. Build accordingly." },

      { type: "h2", text: "4. Ship narrow, ship measurable" },
      { type: "p", text: "We shipped four AI features. Two flopped, two stuck. The pattern was clear in retrospect: features that reduced grunt work without claiming creative authorship survived. Features that tried to replace judgment instructors wanted to keep got switched off." },
      { type: "ul", items: [
        "Quiz draft generation — 87% adoption. Used as a starting point, edited, shipped.",
        "Submission summarization — 64% adoption. Surfaced patterns across hundreds of student answers.",
        "Auto-grading essay rubrics — 11% adoption. Instructors didn't trust it and didn't want to.",
        "AI lesson planner — 6% adoption. Felt generic no matter how much we tuned the prompt.",
      ]},

      { type: "h2", text: "What I'd tell my past self" },
      { type: "p", text: "Cache aggressively, route by tier, validate every output, and ship the smallest feature that solves a real instructor pain. The LLM is the easy part. Everything around it is the work." },
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
    image: "/img/anti-piroacy.png",
    content: [
      { type: "p", text: "Paid course videos leak. That's the starting truth — any system that displays pixels on a consumer device can be re-captured. The realistic question is not how to prevent leaks, but how to raise the cost of casual redistribution and make leakers identifiable when they do redistribute. Here's what that looks like in production." },

      { type: "h2", text: "Threat model first" },
      { type: "p", text: "Most teams skip this step and end up shipping security theater. We sorted attackers into four buckets:" },
      { type: "ul", items: [
        "Casual sharers — paste a URL into a Telegram group. ~80% of leak attempts. Easy to stop.",
        "Manifest scrapers — run yt-dlp or similar against the playlist URL. ~15%. Stoppable with rotating tokens.",
        "Screen recorders — buy access, record locally, redistribute. ~5%. Cannot be prevented, only attributed.",
        "Determined pirates with cracked DRM tooling — under 1%. Out of scope for an indie course platform.",
      ]},
      { type: "p", text: "We optimized for the first two buckets and made the third trivially traceable." },

      { type: "h2", text: "Layer 1: signed, short-lived URLs" },
      { type: "p", text: "Every video request goes through a backend that mints a token-bound URL valid for 5 minutes and tied to the user's IP. Direct hot-linking stops the moment a token expires." },
      { type: "code", lang: "typescript", code: "function signVideoUrl(videoId: string, userId: string, ip: string) {\n  const exp = Math.floor(Date.now() / 1000) + 300;\n  const payload = `${videoId}:${userId}:${ip}:${exp}`;\n  const sig = hmacSha256(VIDEO_SECRET, payload);\n  return `https://cdn.example.com/${videoId}/master.m3u8` +\n         `?u=${userId}&e=${exp}&s=${sig}`;\n}" },
      { type: "p", text: "The CDN edge function validates the signature before serving. CloudFront, Bunny, and Fastly all support this directly." },

      { type: "h2", text: "Layer 2: per-user watermarks" },
      { type: "p", text: "We render the buyer's email in semi-transparent text that drifts position every 30 seconds across the player. Cropping it out crops the actual video too." },
      { type: "p", text: "It's the cheapest, highest-impact deterrent we shipped. In six months we had three confirmed leak attempts — every one traced back to the original buyer within an hour, refunded, and the account was banned." },

      { type: "h2", text: "Layer 3: per-segment token rotation" },
      { type: "p", text: "HLS streams break content into 6–10 second segments. We rotate the token on every segment boundary. A scraper that grabs the master playlist gets a token that's valid for a single segment — by the time they request segment 2, it's invalid." },
      { type: "p", text: "Cost: a small backend service that signs segments on demand. Benefit: yt-dlp and similar tools simply don't work against the stream." },

      { type: "h2", text: "What we tried and removed" },
      { type: "p", text: "Every browser-fighting trick made the player feel hostile to legitimate users without slowing down anyone determined:" },
      { type: "ul", items: [
        "Disabling right-click — broke accessibility tooling, didn't stop dev tools.",
        "Detecting and blocking dev tools — broke legitimate debugging, false positives on common extensions.",
        "Detecting screen recorders — false positives everywhere; impossible to do reliably.",
      ]},
      { type: "quote", text: "Security through annoyance only annoys your paying customers." },

      { type: "h2", text: "When DRM is actually worth it" },
      { type: "p", text: "Widevine and FairPlay buy you real protection — but they cost real money in licensing, integration time, and ongoing maintenance, and they break on browsers and devices in surprising ways. The math only works if your content is high-value enough that determined pirates target it specifically, or if a contract requires it (major-label media)." },
      { type: "p", text: "For paid education content, signed URLs + watermarks + segment rotation hit the cost-effective sweet spot. We never went further and never needed to." },
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
    image: "/img/real-time.png",
    content: [
      { type: "p", text: "Multi-vendor marketplaces have one inventory problem: when stock changes, every connected dashboard needs to know within seconds, not minutes. The standard answer is Redis pub/sub or a message queue. We built the entire pipeline on plain Postgres and it carried us further than I expected." },

      { type: "h2", text: "Why not the obvious tools" },
      { type: "p", text: "Both Redis and a queue work. Both add a second source of truth that can drift from the database. We were already running Postgres for orders, vendors, and inventory — adding a separate event bus meant two systems to operate, two failure modes to handle, and a window where the cache and the DB disagree." },
      { type: "p", text: "Postgres has LISTEN/NOTIFY built in. It's not glamorous, but it's transactional with the data — when the row commits, the notification fires. No drift, no extra infra, no operational cost." },

      { type: "h2", text: "The full wiring, in four pieces" },

      { type: "h3", text: "1. Trigger on the inventory table" },
      { type: "code", lang: "sql", code: "CREATE OR REPLACE FUNCTION notify_inventory_change()\nRETURNS TRIGGER AS $$\nBEGIN\n  PERFORM pg_notify(\n    'inventory:' || NEW.vendor_id,\n    json_build_object('id', NEW.id, 'qty', NEW.quantity)::text\n  );\n  RETURN NEW;\nEND; $$ LANGUAGE plpgsql;\n\nCREATE TRIGGER inventory_notify\nAFTER UPDATE ON inventory\nFOR EACH ROW EXECUTE FUNCTION notify_inventory_change();" },

      { type: "h3", text: "2. Long-lived listener in the API service" },
      { type: "code", lang: "typescript", code: "const client = new Client({ connectionString: DATABASE_URL });\nawait client.connect();\nawait client.query('LISTEN inventory_channel');\n\nclient.on('notification', (msg) => {\n  const payload = JSON.parse(msg.payload!);\n  bus.emit(msg.channel, payload);\n});" },

      { type: "h3", text: "3. Server-Sent Events to the dashboard" },
      { type: "p", text: "Each dashboard subscribes via SSE to its vendor's channel. SSE was the right choice over WebSockets here — read-only fan-out, automatic reconnect on the client, no protocol overhead." },

      { type: "h3", text: "4. Heartbeat and reconnect" },
      { type: "p", text: "This is the piece nobody mentions in the docs. A network blip kills the LISTEN socket silently — you stop getting events but your code thinks everything is fine. We send a ping every 30 seconds; if it fails, we tear down and reconnect." },

      { type: "h2", text: "What broke at scale (and how we fixed it)" },
      { type: "p", text: "Two failure modes hit us, both in production." },
      { type: "p", text: "First: NOTIFY payloads are capped at 8000 bytes. We were dumping the full row in. Switched to sending just the row ID and letting clients refetch on demand. Smaller payloads, simpler invalidation, identical UX." },
      { type: "p", text: "Second: silent listener death. Network interruptions kill the LISTEN socket without throwing. The heartbeat above brought failure detection from minutes to about 30 seconds." },
      { type: "quote", text: "The boring tool you already run usually beats the exciting tool you'd have to operate." },

      { type: "h2", text: "When this approach breaks down" },
      { type: "p", text: "Reach for Redis or a real broker when:" },
      { type: "ul", items: [
        "Fan-out is in the thousands of subscribers per channel — Postgres won't keep up.",
        "You need cross-region replication of events (LISTEN/NOTIFY is local to a single primary).",
        "Events aren't tied to DB writes, or you need durable delivery and replay.",
      ]},
      { type: "p", text: "For a single-region marketplace with dozens of vendors and reactive UIs, plain Postgres is more than enough. We never moved off it." },
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
    image: "/img/flutter.png",
    content: [
      { type: "p", text: "Most Flutter performance advice assumes a flagship phone. Krishak AI shipped to farmers in rural Bangladesh running 2GB RAM, low-end Android 9 devices on intermittent 2G coverage. Half the patterns we'd normally use weren't viable. Here's what we changed and what stayed." },

      { type: "h2", text: "Test on the worst phone you can buy" },
      { type: "p", text: "Before any optimization, we bought three of the cheapest current Androids on the market and made them our daily test devices. Every pattern that survived this filter shipped. Performance bugs that show up in a profiler look invisible on a $1000 dev phone but make the actual user experience unusable." },
      { type: "quote", text: "Build for the phone your user actually owns, not the one your team uses." },

      { type: "h2", text: "Animations: cut by default, add by exception" },
      { type: "p", text: "Default Flutter page transitions chug on a Realme C-series. We replaced them with instant transitions on screens where the user just wants information fast, and only re-enabled animation where it actually communicated something." },
      { type: "code", lang: "dart", code: "Navigator.push(\n  context,\n  PageRouteBuilder(\n    pageBuilder: (_, __, ___) => const Screen(),\n    transitionDuration: Duration.zero,\n    reverseTransitionDuration: Duration.zero,\n  ),\n);" },
      { type: "p", text: "Felt jarring in QA on our test phones; felt correct in the field. Information speed beat polish." },

      { type: "h2", text: "Image weight is the silent killer" },
      { type: "p", text: "A single uncompressed PNG can blow your jank budget for an entire screen. Three rules covered most of the wins:" },
      { type: "ul", items: [
        "WebP everywhere, with PNG fallbacks only where transparency was required.",
        "Image dimensions sized to the actual render box — use cacheWidth/cacheHeight on Image.network.",
        "Disk cache capped at 60MB so we don't fill up storage on devices with 16GB total.",
      ]},
      { type: "p", text: "Result: app memory dropped from peaks of 380MB to a steady 140MB." },

      { type: "h2", text: "Lists: virtualized or bust" },
      { type: "p", text: "Anything with more than 20 items uses ListView.builder, never ListView with a children list. Items off-screen aren't built. Items off-screen also don't hold image memory if disposal is wired correctly." },
      { type: "code", lang: "dart", code: "ListView.builder(\n  itemCount: items.length,\n  cacheExtent: 200, // small ahead-of-time render window\n  itemBuilder: (_, i) => ItemTile(item: items[i]),\n);" },

      { type: "h2", text: "Offline-first, without lying" },
      { type: "p", text: "Network is intermittent. We cache every successful response and surface staleness explicitly — not silent stale data presented as fresh. Farmers trust the app more when it tells them \"last synced 2 hours ago\" than when it pretends everything is current." },

      { type: "h2", text: "What didn't matter" },
      { type: "p", text: "We spent time on tree-shaking, AOT tweaks, and obsessing over widget rebuilds before realizing none of it moved the needle compared to fixing image weights and cutting animations. Profile first, then optimize." },

      { type: "h2", text: "What I'd do differently next time" },
      { type: "p", text: "Start the project on the test phones, not on the dev machine. Half our regressions came from features that worked beautifully on a Pixel 7 and shipped to production before anyone tried them on a Symphony. Make the worst phone the canonical environment, and good performance becomes the default instead of a fix-up phase." },
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
      { type: "p", text: "I ran two backend cohorts back-to-back — about 200 engineers between them. Clean Architecture was the centerpiece of the curriculum. Six months later, half of what I taught had stuck and half had quietly evaporated. The pattern in what survived is worth writing down." },

      { type: "h2", text: "What stuck" },
      { type: "p", text: "Three patterns showed up in nearly every codebase I reviewed afterwards:" },
      { type: "ul", items: [
        "Separating handlers from business logic — the win is obvious the first time you write a test. Every team kept this.",
        "Dependency injection for I/O — also kept, mostly because it makes mocking trivial in tests, not because of any architectural conviction.",
        "Naming use-cases by verb — CreateOrder, CancelSubscription. Cheap, clear, forces you to think about what each operation actually does.",
      ]},
      { type: "p", text: "Notice the pattern: each of these has an immediate, concrete payoff in the next test the engineer writes. They survive because they pay rent every day." },

      { type: "h2", text: "What evaporated" },
      { type: "ul", items: [
        "Strict layering with import rules.",
        "Domain entities separate from DB models.",
        "Repository interfaces with three implementations behind them.",
        "The full Onion / Clean stack as taught in the book.",
      ]},
      { type: "p", text: "Engineers nodded through it during the cohort and reverted to two-layer (handler + service) the moment they were back in their own codebases. Not because they were lazy. Because most production codebases don't have the kind of complexity those patterns are protecting against. You're paying setup cost for problems you don't have." },
      { type: "quote", text: "Architecture is overhead until your problem grows into it. Teach the patterns. Don't sell them as defaults." },

      { type: "h2", text: "The real lesson: teach decision-making, not doctrine" },
      { type: "p", text: "Instead of \"always use a repository pattern\", teach \"here's when a repository pattern earns its complexity, and here's when it doesn't\". The engineers who shipped good code six months later were the ones who could articulate the tradeoff, not the ones who memorized the diagram." },

      { type: "h3", text: "A simple rubric for layering decisions" },
      { type: "ul", items: [
        "Is the business logic going to outlive the framework? If yes, isolate it. If no, don't.",
        "Will you realistically swap the database or external service? If yes, abstract it. If only theoretically, don't.",
        "Are tests painful right now? Add only the indirection that makes the painful test easy.",
      ]},
      { type: "p", text: "This rubric is uglier than a clean diagram. It's also what working engineers actually need." },

      { type: "h2", text: "What I'd teach differently" },
      { type: "p", text: "Less doctrine, more mistakes. The best sessions in cohort 2 weren't lectures — they were retrospectives on real PRs where strict architecture cost more than it saved, and on PRs where two-layer code rotted into something unreadable. Engineers learn architecture from feeling the pain of getting it wrong, not from clean slides." },
      { type: "p", text: "Teach the patterns. Walk through their tradeoffs. Then let your students make their own calls." },
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
