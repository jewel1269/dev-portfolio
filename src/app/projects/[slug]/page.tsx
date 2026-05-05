import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight, Calendar, Clock, ExternalLink, User } from "lucide-react";
import {
  PROJECTS,
  getAdjacentProjects,
  getProjectBySlug,
} from "@/data/projects";
import Navbar from "@/components/Navbar";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/Reveal";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} — Case Study | Jewel Mia`,
    description: project.tagline,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const { prev, next } = getAdjacentProjects(slug);

  return (
    <main className="relative">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-40 pb-20 px-6 lg:px-16 overflow-hidden">
        <div className={`absolute top-0 right-0 w-[600px] h-[600px] bg-linear-to-br ${project.color} blur-[140px] opacity-50 pointer-events-none`} />
        <div className="absolute inset-0 noise pointer-events-none" />

        <div className="relative max-w-[1600px] mx-auto">
          <Link
            href="/#portfolio"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors mb-12"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>

          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8 space-y-8">
              <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-muted">
                <span className="px-3 py-1 rounded-full border border-border bg-card/40">
                  {project.category}
                </span>
                <span className="w-1 h-1 rounded-full bg-muted" />
                <span>{project.year}</span>
              </div>

              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.95] tracking-tighter">
                {project.title}
                <span className="text-accent">.</span>
              </h1>

              <p className="text-xl lg:text-2xl text-muted max-w-2xl leading-relaxed">
                {project.tagline}
              </p>

              {project.liveLink !== "#" && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-full bg-accent text-background font-medium hover:scale-105 transition-transform"
                >
                  <span className="text-sm uppercase tracking-widest">Visit Live</span>
                  <span className="w-9 h-9 rounded-full bg-background text-accent flex items-center justify-center">
                    <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                  </span>
                </a>
              )}
            </div>

            <div className="lg:col-span-4 space-y-6 lg:pl-10 lg:border-l border-border">
              <Meta Icon={User} label="Role" value={project.role} />
              {project.client && (
                <Meta Icon={ExternalLink} label="Client" value={project.client} />
              )}
              <Meta Icon={Calendar} label="Year" value={project.year} />
              <Meta Icon={Clock} label="Duration" value={project.duration} />
              <div>
                <div className="text-xs uppercase tracking-widest text-muted mb-3">Tech Stack</div>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-3 py-1 rounded-full border border-border bg-card/40"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project visual */}
      <section className="px-6 lg:px-16 mb-32">
        <div className="max-w-[1600px] mx-auto">
          <Reveal y={50}>
            {project.image ? (
              <div className="relative rounded-3xl overflow-hidden border border-border bg-card">
                <Image
                  src={project.image}
                  alt={`${project.title} screenshot`}
                  width={3300}
                  height={2475}
                  priority
                  quality={95}
                  sizes="(max-width: 1600px) 100vw, 1600px"
                  className="w-full h-auto"
                />
              </div>
            ) : (
              <div className={`relative aspect-2/1 rounded-3xl overflow-hidden border border-border bg-linear-to-br ${project.color}`}>
                <div className="absolute inset-0 noise" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="font-display text-[20rem] font-bold text-foreground/[0.04]">
                    {project.initials}
                  </div>
                </div>
                <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-widest text-muted">Project Cover</div>
                    <div className="font-display text-2xl font-semibold mt-1">{project.title}</div>
                  </div>
                  <span className="text-xs uppercase tracking-widest text-muted">[Add screenshot here]</span>
                </div>
              </div>
            )}
          </Reveal>
        </div>
      </section>

      {/* Overview + Challenge */}
      <section className="px-6 lg:px-16 mb-32">
        <div className="max-w-[1600px] mx-auto grid lg:grid-cols-12 gap-12 lg:gap-20">
          <Reveal className="lg:col-span-5">
            <SectionLabel num="01" label="Overview" />
          </Reveal>
          <div className="lg:col-span-7 space-y-12">
            <Reveal delay={0.1}>
              <h2 className="font-display text-3xl lg:text-4xl font-bold tracking-tight mb-6">
                The Project
              </h2>
              <p className="text-lg text-muted leading-relaxed">{project.overview}</p>
            </Reveal>
            <Reveal delay={0.2}>
              <h2 className="font-display text-3xl lg:text-4xl font-bold tracking-tight mb-6">
                The Challenge
              </h2>
              <p className="text-lg text-muted leading-relaxed">{project.challenge}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="px-6 lg:px-16 mb-32">
        <div className="max-w-[1600px] mx-auto grid lg:grid-cols-12 gap-12 lg:gap-20">
          <Reveal className="lg:col-span-5">
            <SectionLabel num="02" label="Approach" />
            <h2 className="font-display text-3xl lg:text-5xl font-bold tracking-tight leading-tight mt-6">
              How I <span className="gradient-text">built it.</span>
            </h2>
          </Reveal>
          <StaggerContainer className="lg:col-span-7" stagger={0.12}>
            <ol className="space-y-8">
              {project.approach.map((step, i) => (
                <StaggerItem key={i}>
                  <li className="flex gap-6 pb-8 border-b border-border last:border-0">
                    <div className="shrink-0 w-12 h-12 rounded-full border border-accent/40 flex items-center justify-center font-display font-bold text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <p className="text-lg text-foreground/85 leading-relaxed pt-2">{step}</p>
                  </li>
                </StaggerItem>
              ))}
            </ol>
          </StaggerContainer>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 lg:px-16 mb-32">
        <div className="max-w-[1600px] mx-auto">
          <Reveal>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
              <div>
                <SectionLabel num="03" label="Features" />
                <h2 className="font-display text-3xl lg:text-5xl font-bold tracking-tight mt-6 max-w-2xl">
                  What it <span className="text-accent">does</span>.
                </h2>
              </div>
            </div>
          </Reveal>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-3xl overflow-hidden" stagger={0.06}>
            {project.features.map((f, i) => (
              <StaggerItem key={i} className="bg-background p-8 lg:p-10 hover:bg-card transition-colors h-full">
                <div className="text-xs uppercase tracking-widest text-accent mb-4">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="font-display text-xl font-semibold mb-3">{f.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{f.desc}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Stack */}
      <section className="px-6 lg:px-16 mb-32">
        <div className="max-w-[1600px] mx-auto grid lg:grid-cols-12 gap-12 lg:gap-20">
          <Reveal className="lg:col-span-5">
            <SectionLabel num="04" label="Tech Stack" />
            <h2 className="font-display text-3xl lg:text-5xl font-bold tracking-tight mt-6">
              The <span className="gradient-text">tools</span> I used.
            </h2>
          </Reveal>
          <StaggerContainer className="lg:col-span-7 space-y-6" stagger={0.1}>
            {project.stack.map((s) => (
              <StaggerItem key={s.area}>
                <div className="p-6 lg:p-8 rounded-2xl border border-border bg-card/40">
                  <div className="text-xs uppercase tracking-widest text-accent mb-4">{s.area}</div>
                  <div className="flex flex-wrap gap-3">
                    {s.tools.map((t) => (
                      <span
                        key={t}
                        className="text-sm px-4 py-2 rounded-full border border-border bg-background"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Results */}
      <section className="px-6 lg:px-16 mb-32">
        <div className="max-w-[1600px] mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <SectionLabel num="05" label="Results" center />
              <h2 className="font-display text-3xl lg:text-5xl font-bold tracking-tight mt-6">
                The <span className="text-accent">outcome</span>.
              </h2>
            </div>
          </Reveal>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" stagger={0.08}>
            {project.results.map((r, i) => (
              <StaggerItem key={i}>
                <div className="p-8 rounded-2xl border border-border bg-card text-center hover:border-accent/40 transition-colors">
                  <div className="font-display text-4xl lg:text-5xl font-bold mb-2">{r.metric}</div>
                  <div className="text-sm uppercase tracking-widest text-muted">{r.label}</div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Next project */}
      <section className="px-6 lg:px-16 pb-32 border-t border-border pt-20">
        <div className="max-w-[1600px] mx-auto grid md:grid-cols-2 gap-6">
          <Reveal>
            <Link
              href={`/projects/${prev.slug}`}
              className="group block p-8 lg:p-10 rounded-3xl border border-border bg-card/40 hover:bg-card hover:border-accent/40 transition-all h-full"
            >
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted mb-6">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Previous
              </div>
              <h3 className="font-display text-2xl lg:text-3xl font-bold tracking-tight group-hover:text-accent transition-colors">
                {prev.title}
              </h3>
              <p className="text-sm text-muted mt-2">{prev.category}</p>
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              href={`/projects/${next.slug}`}
              className="group block p-8 lg:p-10 rounded-3xl border border-border bg-card/40 hover:bg-card hover:border-accent/40 transition-all md:text-right h-full"
            >
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted mb-6 md:justify-end">
                Next
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
              <h3 className="font-display text-2xl lg:text-3xl font-bold tracking-tight group-hover:text-accent transition-colors">
                {next.title}
              </h3>
              <p className="text-sm text-muted mt-2">{next.category}</p>
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

function Meta({
  Icon,
  label,
  value,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="w-4 h-4 text-accent mt-1" />
      <div>
        <div className="text-xs uppercase tracking-widest text-muted">{label}</div>
        <div className="font-medium mt-0.5">{value}</div>
      </div>
    </div>
  );
}

function SectionLabel({
  num,
  label,
  center = false,
}: {
  num: string;
  label: string;
  center?: boolean;
}) {
  return (
    <div className={`flex items-center gap-3 ${center ? "justify-center" : ""}`}>
      <span className="text-sm uppercase tracking-widest text-accent font-mono">{num}</span>
      <span className="w-10 h-px bg-accent" />
      <span className="text-sm uppercase tracking-widest text-muted">{label}</span>
    </div>
  );
}
