import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Calendar, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/Reveal";
import {
  POSTS,
  formatPostDate,
  getPostBySlug,
  getRelatedPosts,
  type ContentBlock,
} from "@/data/posts";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };
  return { title: `${post.title} — Jewel Mia`, description: post.excerpt };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const headings = post.content
    .filter((b): b is { type: "h2"; text: string } => b.type === "h2")
    .map((b) => ({ text: b.text, id: slugify(b.text) }));

  const related = getRelatedPosts(slug, 3);
  const shareUrl = `https://jewelmia.dev/blog/${slug}`;

  return (
    <main className="relative">
      <ScrollProgress />
      <Navbar />

      {/* Hero */}
      <header className="relative pt-40 pb-16 px-6 lg:px-16 overflow-hidden">
        <div
          className={`absolute top-0 right-0 w-[600px] h-[600px] bg-linear-to-br ${post.color} blur-[140px] opacity-40 pointer-events-none`}
        />
        <div className="relative max-w-[1200px] mx-auto">
          <Reveal y={10}>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors mb-10"
            >
              <ArrowLeft className="w-4 h-4" />
              All Posts
            </Link>
          </Reveal>

          <Reveal y={20} delay={0.1}>
            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-widest text-muted mb-8">
              <span className="px-3 py-1 rounded-full border border-accent/40 bg-accent/5 text-accent">
                {post.category}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3 h-3" />
                {formatPostDate(post.date)}
              </span>
              <span className="w-1 h-1 rounded-full bg-muted" />
              <span className="flex items-center gap-1.5">
                <Clock className="w-3 h-3" />
                {post.readTime}
              </span>
            </div>
          </Reveal>

          <Reveal y={30} delay={0.2}>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] tracking-tight mb-8 max-w-4xl">
              {post.title}
            </h1>
          </Reveal>

          <Reveal y={20} delay={0.35}>
            <p className="text-xl lg:text-2xl text-muted leading-relaxed max-w-3xl">
              {post.excerpt}
            </p>
          </Reveal>

          <Reveal y={20} delay={0.5}>
            <div className="flex items-center gap-4 mt-10 pt-10 border-t border-border">
              <div className="w-12 h-12 rounded-full bg-linear-to-br from-accent to-purple-500 flex items-center justify-center font-display font-bold text-background">
                JM
              </div>
              <div>
                <div className="font-medium">Jewel Mia</div>
                <div className="text-xs uppercase tracking-widest text-muted mt-0.5">
                  Software Engineer
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </header>

      {/* Body */}
      <section className="px-6 lg:px-16 pb-32">
        <div className="max-w-[1200px] mx-auto grid lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Article */}
          <article className="lg:col-span-8 min-w-0">
            <div className="space-y-6 text-foreground/85 text-lg leading-[1.8]">
              {post.content.map((block, i) => (
                <Block key={i} block={block} />
              ))}
            </div>

            <Reveal>
              <div className="mt-16 pt-10 border-t border-border">
                <div className="text-xs uppercase tracking-widest text-muted mb-4">
                  Filed under
                </div>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-3 py-1.5 rounded-full border border-border bg-card/40 text-muted hover:text-foreground hover:border-foreground/30 transition-colors"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28 space-y-8">
              {headings.length > 0 && (
                <Reveal y={20} delay={0.1}>
                  <div className="text-xs uppercase tracking-widest text-muted mb-4">
                    On this page
                  </div>
                  <nav className="space-y-2 border-l border-border">
                    {headings.map((h) => (
                      <a
                        key={h.id}
                        href={`#${h.id}`}
                        className="block pl-4 -ml-px border-l border-transparent hover:border-accent text-sm text-muted hover:text-foreground transition-colors py-1"
                      >
                        {h.text}
                      </a>
                    ))}
                  </nav>
                </Reveal>
              )}

              <Reveal y={20} delay={0.2}>
                <div className="text-xs uppercase tracking-widest text-muted mb-4">
                  Share
                </div>
                <div className="flex flex-wrap gap-2">
                  <ShareLink
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`}
                    label="Twitter"
                  />
                  <ShareLink
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                    label="LinkedIn"
                  />
                  <ShareLink
                    href={`mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(shareUrl)}`}
                    label="Email"
                  />
                </div>
              </Reveal>

              <Reveal y={20} delay={0.3}>
                <div className="p-6 rounded-2xl border border-border bg-card/40">
                  <div className="text-xs uppercase tracking-widest text-muted mb-3">
                    About the author
                  </div>
                  <p className="text-sm text-foreground/80 leading-relaxed mb-4">
                    Jewel Mia is a software engineer based in Dhaka, building
                    scalable web platforms, mobile apps, and AI-driven workflows.
                  </p>
                  <Link
                    href="/#contact"
                    className="inline-flex items-center gap-2 text-sm text-accent hover:underline"
                  >
                    Get in touch
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </Reveal>
            </div>
          </aside>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="px-6 lg:px-16 pb-32 border-t border-border pt-20">
          <div className="max-w-[1200px] mx-auto">
            <Reveal>
              <div className="flex items-center gap-3 mb-10">
                <span className="w-10 h-px bg-accent" />
                <span className="text-sm uppercase tracking-widest text-muted">
                  Read next
                </span>
              </div>
            </Reveal>

            <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" stagger={0.1}>
              {related.map((r) => (
                <StaggerItem key={r.slug}>
                  <Link
                    href={`/blog/${r.slug}`}
                    className="group p-6 rounded-2xl border border-border bg-card/40 hover:bg-card hover:border-accent/40 transition-all flex flex-col h-full"
                  >
                    <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-muted mb-4">
                      <span>{r.category}</span>
                      <span className="w-1 h-1 rounded-full bg-muted" />
                      <span>{r.readTime}</span>
                    </div>
                    <h3 className="font-display text-xl font-bold tracking-tight leading-tight mb-3 group-hover:text-accent transition-colors">
                      {r.title}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed mb-4 line-clamp-2">
                      {r.excerpt}
                    </p>
                    <div className="mt-auto pt-4 border-t border-border flex items-center justify-between text-xs text-muted">
                      <span>{formatPostDate(r.date)}</span>
                      <ArrowRight className="w-4 h-4 group-hover:text-accent group-hover:translate-x-1 transition-all" />
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}

function Block({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "p":
      return <p>{block.text}</p>;
    case "h2":
      return (
        <h2
          id={slugify(block.text)}
          className="font-display text-2xl lg:text-3xl font-bold tracking-tight text-foreground mt-12 mb-2 scroll-mt-28"
        >
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3
          id={slugify(block.text)}
          className="font-display text-xl lg:text-2xl font-semibold tracking-tight text-foreground mt-8 mb-2 scroll-mt-28"
        >
          {block.text}
        </h3>
      );
    case "ul":
      return (
        <ul className="space-y-3 list-none pl-0">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3">
              <span className="text-accent shrink-0 mt-2">→</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote className="my-10 pl-6 border-l-2 border-accent">
          <p className="font-display text-xl lg:text-2xl text-foreground leading-snug italic">
            &ldquo;{block.text}&rdquo;
          </p>
          {block.cite && (
            <cite className="block mt-3 text-sm text-muted not-italic">
              — {block.cite}
            </cite>
          )}
        </blockquote>
      );
    case "code":
      return (
        <pre className="my-6 p-5 rounded-2xl border border-border bg-card/60 text-sm overflow-x-auto">
          <code className="font-mono text-foreground/90">{block.code}</code>
        </pre>
      );
  }
}

function ShareLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-xs px-3 py-1.5 rounded-full border border-border bg-card/40 text-muted hover:text-foreground hover:border-accent/40 transition-colors"
    >
      {label}
    </a>
  );
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
