import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PROJECTS } from "@/data/projects";

export const metadata = {
  title: "Projects — Jewel Mia",
  description: "A selection of recent work across e-commerce, education, AI, and finance.",
};

export default function ProjectsIndex() {
  return (
    <main className="relative">
      <Navbar />

      <section className="relative pt-40 pb-20 px-6 lg:px-16 overflow-hidden">
        <div className="absolute top-1/3 -left-40 w-125 h-125 bg-accent/15 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 -right-40 w-125 h-125 bg-purple-500/10 blur-[120px] rounded-full" />

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
            <span className="text-sm uppercase tracking-widest text-muted">All Projects</span>
          </div>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-8xl font-bold leading-[0.95] tracking-tighter mb-8">
            Selected <span className="gradient-text">work.</span>
          </h1>

          <p className="text-xl text-muted max-w-2xl leading-relaxed">
            Production-grade systems shipped across e-commerce, education, AI,
            and finance — each one built end-to-end with a focus on
            performance, scale, and quiet craft.
          </p>
        </div>
      </section>

      <section className="px-6 lg:px-16 pb-32">
        <div className="max-w-[1600px] mx-auto space-y-8">
          {PROJECTS.map((project, i) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group relative block rounded-3xl overflow-hidden border border-border bg-card hover:border-accent/40 transition-all"
            >
              <div className="grid lg:grid-cols-12 gap-0">
                <div className="lg:col-span-7 relative aspect-2/1 lg:aspect-auto lg:min-h-[400px] overflow-hidden">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={`${project.title} preview`}
                      fill
                      quality={95}
                      className="object-cover scale-110 group-hover:scale-125 transition-transform duration-700"
                      sizes="(max-width: 1024px) 100vw, (max-width: 1600px) 60vw, 1024px"
                    />
                  ) : (
                    <div className={`absolute inset-0 bg-linear-to-br ${project.color}`}>
                      <div className="absolute inset-0 noise" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="font-display text-[14rem] font-bold text-foreground/[0.06]">
                          {project.initials}
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="absolute top-6 left-6 flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1 rounded-full bg-background/70 backdrop-blur-md border border-border"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-between">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-widest text-muted">
                        {String(i + 1).padStart(2, "0")} · {project.category} · {project.year}
                      </span>
                      <span className="w-12 h-12 rounded-full bg-background border border-border flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all">
                        <ArrowUpRight className="w-5 h-5 group-hover:text-background group-hover:rotate-45 transition-all" />
                      </span>
                    </div>

                    <h2 className="font-display text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight leading-[1.05] group-hover:text-accent transition-colors">
                      {project.title}
                    </h2>

                    <p className="text-muted leading-relaxed">{project.tagline}</p>
                  </div>

                  <div className="flex items-center gap-6 pt-6 mt-6 border-t border-border text-xs uppercase tracking-widest text-muted">
                    <span>Role · {project.role}</span>
                    <span className="w-1 h-1 rounded-full bg-muted" />
                    <span>{project.duration}</span>
                  </div>
                </div>
              </div>

              <span className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-accent to-transparent scale-x-0 group-hover:scale-x-100 origin-center transition-transform duration-700" />
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
