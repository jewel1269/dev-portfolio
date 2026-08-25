"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { PROJECTS, type Project } from "@/data/projects";

const EASE = [0.16, 1, 0.3, 1] as const;

function MaskReveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <span className={cn("inline-block overflow-hidden align-bottom", className)}>
      <motion.span
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, delay, ease: EASE }}
        className="inline-block"
      >
        {children}
      </motion.span>
    </span>
  );
}

function HeroBlock() {
  const stats = [
    { value: PROJECTS.length.toString().padStart(2, "0"), label: "Projects shipped" },
    { value: "05", label: "Industries served" },
    { value: "100%", label: "Production-grade" },
  ];

  return (
    <section className="relative pt-40 pb-20 px-6 lg:px-16 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: EASE }}
        className="absolute top-1/3 -left-40 w-125 h-125 bg-accent/15 blur-[120px] rounded-full"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: EASE, delay: 0.2 }}
        className="absolute bottom-0 -right-40 w-125 h-125 bg-purple-500/10 blur-[120px] rounded-full"
      />

      <div className="relative max-w-[1600px] mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors mb-12"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back Home
          </Link>
        </motion.div>

        <div className="flex items-center gap-3 mb-6 overflow-hidden">
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
            className="w-10 h-px bg-accent origin-left"
          />
          <MaskReveal delay={0.3}>
            <span className="text-sm uppercase tracking-widest text-muted">All Projects</span>
          </MaskReveal>
        </div>

        <h1 className="font-display text-5xl sm:text-6xl lg:text-8xl font-bold leading-[0.95] tracking-tighter mb-8">
          <MaskReveal delay={0.1}>Selected&nbsp;</MaskReveal>
          <MaskReveal delay={0.2} className="gradient-text">
            work.
          </MaskReveal>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
          className="text-xl text-muted max-w-2xl leading-relaxed"
        >
          Production-grade systems shipped across e-commerce, education, AI,
          and finance — each one built end-to-end with a focus on
          performance, scale, and quiet craft.
        </motion.p>

        <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl border-t border-border pt-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 + i * 0.1, ease: EASE }}
            >
              <div className="font-display text-3xl lg:text-4xl font-bold tracking-tight">
                <span className="gradient-text">{s.value}</span>
              </div>
              <div className="text-xs uppercase tracking-widest text-muted mt-2">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectMarquee() {
  const items = [...PROJECTS, ...PROJECTS];
  return (
    <div className="relative py-10 overflow-hidden border-y border-border bg-card/30">
      <motion.div
        className="flex gap-16 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, ease: "linear", repeat: Infinity }}
      >
        {items.map((p, i) => (
          <div key={`${p.slug}-${i}`} className="flex items-center gap-16 shrink-0">
            <span className="font-display text-3xl lg:text-5xl font-bold tracking-tight text-foreground/60">
              {p.title}
            </span>
            <span className="w-2 h-2 rounded-full bg-accent" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function ProjectCard({ project, i }: { project: Project; i: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  const isOdd = i % 2 === 1;

  return (
    <Link
      ref={ref}
      href={`/projects/${project.slug}`}
      className="group relative block rounded-3xl overflow-hidden border border-border bg-card hover:border-accent/40 transition-colors duration-500"
    >
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: EASE }}
        className="grid lg:grid-cols-12 gap-0"
      >
        <div
          className={cn(
            "relative lg:col-span-7 aspect-2/1 lg:aspect-auto lg:min-h-[480px] overflow-hidden",
            isOdd && "lg:order-2 lg:col-start-6"
          )}
        >
          <motion.div style={{ y: imageY }} className="absolute -inset-y-8 inset-x-0 pointer-events-none">
            {project.image ? (
              <Image
                src={project.image}
                alt={`${project.title} preview`}
                fill
                priority={i === 0}
                quality={80}
                className="object-cover object-top transition-transform duration-1000 group-hover:scale-[1.04]"
                sizes="(max-width: 1024px) 100vw, (max-width: 1600px) 60vw, 1024px"
              />
            ) : (
              <div className={cn("absolute inset-0 bg-linear-to-br", project.color)}>
                <div className="absolute inset-0 noise" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="font-display text-[14rem] font-bold text-foreground/[0.06]">
                    {project.initials}
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          <div className="absolute top-6 left-6 flex flex-wrap gap-2 pointer-events-none">
            {project.tags.slice(0, 3).map((tag, ti) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: 0.4 + ti * 0.08, ease: EASE }}
                className="text-xs px-3 py-1 rounded-full bg-background/70 backdrop-blur-md border border-border"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>

        <div
          className={cn(
            "lg:col-span-5 p-8 lg:p-12 flex flex-col justify-between gap-8",
            isOdd && "lg:order-1 lg:col-start-1 lg:row-start-1"
          )}
        >
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-muted">
                <span className="text-accent">{String(i + 1).padStart(2, "0")}</span>
                <span className="mx-2 opacity-40">/</span>
                {project.category} · {project.year}
              </span>
              <span className="w-12 h-12 rounded-full bg-background border border-border flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all duration-500">
                <ArrowUpRight className="w-5 h-5 group-hover:text-background group-hover:rotate-45 transition-all duration-500" />
              </span>
            </div>

            <h2 className="font-display text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight leading-[1.05] group-hover:text-accent transition-colors duration-500">
              {project.title}
            </h2>

            <p className="text-muted leading-relaxed">{project.tagline}</p>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-6 mt-auto border-t border-border text-xs uppercase tracking-widest text-muted">
            <span>Role · {project.role}</span>
            <span className="w-1 h-1 rounded-full bg-muted" />
            <span>{project.duration}</span>
          </div>
        </div>
      </motion.div>

      <span className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-accent to-transparent scale-x-0 group-hover:scale-x-100 origin-center transition-transform duration-700 pointer-events-none" />
    </Link>
  );
}

function CTABlock() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.9, ease: EASE }}
      className="px-6 lg:px-16 pb-32"
    >
      <div className="relative max-w-[1600px] mx-auto rounded-3xl border border-border bg-card overflow-hidden p-12 lg:p-20 text-center">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="relative">
          <p className="text-sm uppercase tracking-widest text-muted mb-6">
            Got a project in mind?
          </p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-10">
            Let&apos;s build something <span className="gradient-text">remarkable.</span>
          </h2>
          <Link
            href="/#contact"
            className="group inline-flex items-center gap-3 px-7 py-4 rounded-full border border-border hover:border-accent transition-colors"
          >
            <span className="text-sm uppercase tracking-widest font-medium">Start a project</span>
            <span className="w-7 h-7 rounded-full bg-foreground text-background flex items-center justify-center group-hover:bg-accent transition-colors">
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform" />
            </span>
          </Link>
        </div>
      </div>
    </motion.section>
  );
}

export default function ProjectsContent() {
  return (
    <>
      <HeroBlock />
      <ProjectMarquee />
      <section className="px-6 lg:px-16 py-20">
        <div className="max-w-[1600px] mx-auto space-y-10 lg:space-y-14">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.slug} project={project} i={i} />
          ))}
        </div>
      </section>
      <CTABlock />
    </>
  );
}
