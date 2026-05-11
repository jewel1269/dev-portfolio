import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { POSTS, formatPostDate } from "@/data/posts";

export const metadata = {
  title: "Blog — Jewel Mia",
  description: "Notes on engineering, AI integration, and building production systems.",
};

export default function BlogIndex() {
  const [featured, ...rest] = POSTS;

  return (
    <main className="relative">
      <Navbar />

      <section className="relative pt-40 pb-20 px-6 lg:px-16 overflow-hidden">
        <div className="absolute top-1/3 -right-40 w-125 h-125 bg-accent/15 blur-[120px] rounded-full" />

        <div className="relative max-w-[1600px] mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors mb-12"
          >
            <ArrowLeft className="w-4 h-4" />
            Back Home
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <span className="w-10 h-px bg-accent" />
            <span className="text-sm uppercase tracking-widest text-muted">Journal</span>
          </div>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-8xl font-bold leading-[0.95] tracking-tighter mb-8">
            Notes &amp; <span className="gradient-text">essays.</span>
          </h1>

          <p className="text-xl text-muted max-w-2xl leading-relaxed">
            Things I&apos;m thinking through — engineering decisions, AI
            workflows, and the small details that turn shipping into craft.
          </p>
        </div>
      </section>

      <section className="px-6 lg:px-16 mb-20">
        <div className="max-w-[1600px] mx-auto">
          <Link
            href={`/blog/${featured.slug}`}
            className="group relative block rounded-3xl overflow-hidden border border-border bg-card hover:border-accent/40 transition-all"
          >
            <div className="grid lg:grid-cols-12">
              <div
                className={`lg:col-span-5 relative aspect-2/1 lg:aspect-auto lg:min-h-[400px] bg-linear-to-br ${featured.color} overflow-hidden`}
              >
                {featured.image && (
                  <Image
                    src={featured.image}
                    alt={`${featured.title} cover`}
                    fill
                    quality={80}
                    className="object-cover transition-transform duration-1000 group-hover:scale-[1.04]"
                    sizes="(max-width: 1024px) 100vw, 640px"
                    priority
                    fetchPriority="high"
                  />
                )}
                <div className="absolute inset-0 noise" />
                <div className="absolute top-6 left-6 px-3 py-1 rounded-full bg-background/70 backdrop-blur-md border border-border text-xs uppercase tracking-widest">
                  Featured
                </div>
              </div>

              <div className="lg:col-span-7 p-8 lg:p-12 flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-muted">
                    <span className="px-3 py-1 rounded-full border border-border">
                      {featured.category}
                    </span>
                    <span>{formatPostDate(featured.date)}</span>
                    <span className="w-1 h-1 rounded-full bg-muted" />
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {featured.readTime}
                    </span>
                  </div>
                  <h2 className="font-display text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight leading-[1.05] group-hover:text-accent transition-colors">
                    {featured.title}
                  </h2>
                  <p className="text-muted text-lg leading-relaxed">{featured.excerpt}</p>
                </div>

                <div className="flex items-center justify-between pt-6 mt-6 border-t border-border">
                  <div className="flex flex-wrap gap-2">
                    {featured.tags.map((t) => (
                      <span key={t} className="text-xs text-muted">
                        #{t}
                      </span>
                    ))}
                  </div>
                  <span className="w-12 h-12 rounded-full bg-background border border-border flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all">
                    <ArrowUpRight className="w-5 h-5 group-hover:text-background group-hover:rotate-45 transition-all" />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      <section className="px-6 lg:px-16 pb-32">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex items-center justify-between mb-10">
            <h3 className="font-display text-2xl font-bold tracking-tight">All Posts</h3>
            <span className="text-sm text-muted">{POSTS.length} essays</span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col rounded-2xl border border-border bg-card/40 hover:bg-card hover:border-accent/40 transition-all overflow-hidden"
              >
                <div
                  className={`relative aspect-16/9 bg-linear-to-br ${post.color} overflow-hidden`}
                >
                  {post.image && (
                    <Image
                      src={post.image}
                      alt={`${post.title} cover`}
                      fill
                      quality={75}
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  )}
                  <div className="absolute inset-0 noise" />
                  <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-background/70 backdrop-blur-md border border-border text-xs uppercase tracking-widest">
                    {post.category}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-muted mb-3">
                    <span>{formatPostDate(post.date)}</span>
                    <span className="w-1 h-1 rounded-full bg-muted" />
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold tracking-tight leading-tight mb-3 group-hover:text-accent transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-sm text-muted leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                    <div className="flex flex-wrap gap-2">
                      {post.tags.slice(0, 2).map((t) => (
                        <span key={t} className="text-xs text-muted">
                          #{t}
                        </span>
                      ))}
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
