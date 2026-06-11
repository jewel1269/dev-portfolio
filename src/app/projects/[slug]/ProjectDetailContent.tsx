"use client";

import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Clock,
  ExternalLink,
  User,
} from "lucide-react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import type { Project } from "@/data/projects";

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

function CountUp({ value, duration = 1.6 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const motionVal = useMotionValue(0);

  const numericMatch = value.match(/(-?\d+(?:\.\d+)?)/);
  const numeric = numericMatch ? parseFloat(numericMatch[1]) : null;
  const prefix = numeric !== null ? value.slice(0, numericMatch!.index!) : "";
  const suffix =
    numeric !== null
      ? value.slice(numericMatch!.index! + numericMatch![1].length)
      : "";

  useEffect(() => {
    if (!inView || numeric === null) return;
    const controls = motionVal.on("change", (latest) => {
      if (ref.current) {
        const formatted = Number.isInteger(numeric)
          ? Math.round(latest).toString()
          : latest.toFixed(1);
        ref.current.textContent = `${prefix}${formatted}${suffix}`;
      }
    });
    motionVal.set(0);
    const start = performance.now();
    let rafId = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - t, 3);
      motionVal.set(numeric * eased);
      if (t < 1) rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafId);
      controls();
    };
  }, [inView, numeric, prefix, suffix, motionVal, duration]);

  if (numeric === null) {
    return <span ref={ref}>{value}</span>;
  }
  return <span ref={ref}>{prefix}0{suffix}</span>;
}

function ParallaxImage({
  src,
  alt,
  color,
  initials,
  title,
}: {
  src?: string;
  alt: string;
  color: string;
  initials: string;
  title: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease: EASE }}
      className="relative rounded-3xl overflow-hidden border border-border bg-card"
    >
      {src ? (
        <div className="relative overflow-hidden">
          <Image
            src={src}
            alt={alt}
            width={1440}
            height={1080}
            priority
            fetchPriority="high"
            quality={80}
            sizes="(max-width: 1600px) 100vw, 1600px"
            className="w-full h-auto"
          />
          <motion.div
            initial={{ scaleY: 1 }}
            whileInView={{ scaleY: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.2 }}
            className="absolute inset-0 origin-bottom bg-background pointer-events-none"
          />
        </div>
      ) : (
        <div className={cn("relative aspect-2/1 bg-linear-to-br", color)}>
          <div className="absolute inset-0 noise" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="font-display text-[14rem] sm:text-[20rem] font-bold text-foreground/[0.04]">
              {initials}
            </div>
          </div>
          <div className="absolute bottom-8 left-8 text-xs uppercase tracking-widest text-muted">
            {title}
          </div>
        </div>
      )}
    </motion.div>
  );
}

function StackMarquee({ tools }: { tools: string[] }) {
  const items = [...tools, ...tools, ...tools];
  return (
    <div className="relative overflow-hidden">
      <motion.div
        className="flex gap-3 whitespace-nowrap"
        animate={{ x: ["0%", "-33.333%"] }}
        transition={{ duration: 22, ease: "linear", repeat: Infinity }}
      >
        {items.map((t, i) => (
          <span
            key={`${t}-${i}`}
            className="shrink-0 text-sm px-4 py-2 rounded-full border border-border bg-background"
          >
            {t}
          </span>
        ))}
      </motion.div>
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
    <div className={cn("flex items-center gap-3 overflow-hidden", center && "justify-center")}>
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: EASE }}
        className="text-sm uppercase tracking-widest text-accent font-mono"
      >
        {num}
      </motion.span>
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
        className="w-10 h-px bg-accent origin-left"
      />
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
        className="text-sm uppercase tracking-widest text-muted"
      >
        {label}
      </motion.span>
    </div>
  );
}

function MetaItem({
  Icon,
  label,
  value,
  delay,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, ease: EASE, delay }}
      className="flex items-start gap-3"
    >
      <div className="shrink-0 w-9 h-9 rounded-full border border-border bg-card/40 flex items-center justify-center">
        <Icon className="w-4 h-4 text-accent" />
      </div>
      <div>
        <div className="text-xs uppercase tracking-widest text-muted">{label}</div>
        <div className="font-medium mt-0.5">{value}</div>
      </div>
    </motion.div>
  );
}

function ApproachStep({
  step,
  index,
  total,
}: {
  step: string;
  index: number;
  total: number;
}) {
  const isLast = index === total - 1;
  return (
    <motion.li
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: EASE, delay: index * 0.05 }}
      className="relative flex gap-6 pb-10"
    >
      <div className="relative shrink-0">
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE, delay: index * 0.05 + 0.15 }}
          className="w-12 h-12 rounded-full border border-accent/40 bg-background flex items-center justify-center font-display font-bold text-accent relative z-10"
        >
          {String(index + 1).padStart(2, "0")}
        </motion.div>
        {!isLast && (
          <motion.span
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE, delay: index * 0.05 + 0.3 }}
            className="absolute left-1/2 -translate-x-1/2 top-12 bottom-0 w-px bg-linear-to-b from-accent/40 to-transparent origin-top"
          />
        )}
      </div>
      <p className="text-lg text-foreground/85 leading-relaxed pt-2.5 flex-1">{step}</p>
    </motion.li>
  );
}

function FeatureCard({ title, desc, index }: { title: string; desc: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: EASE, delay: (index % 3) * 0.08 }}
      whileHover={{ y: -4 }}
      className="group relative bg-card/40 border border-border rounded-2xl p-7 lg:p-9 overflow-hidden hover:border-accent/40 transition-colors"
    >
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      <div className="relative">
        <div className="flex items-center justify-between mb-6">
          <span className="font-mono text-xs uppercase tracking-widest text-accent">
            {String(index + 1).padStart(2, "0")}
          </span>
          <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
        </div>
        <h3 className="font-display text-xl lg:text-2xl font-semibold mb-3 group-hover:text-accent transition-colors">
          {title}
        </h3>
        <p className="text-muted text-sm leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
}

function ResultCard({
  metric,
  label,
  index,
}: {
  metric: string;
  label: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: EASE, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      className="group relative p-8 lg:p-10 rounded-3xl border border-border bg-card text-center hover:border-accent/40 transition-colors overflow-hidden"
    >
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1, ease: EASE, delay: index * 0.08 + 0.2 }}
        className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-accent to-transparent origin-center"
      />
      <div className="font-display text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 gradient-text">
        <CountUp value={metric} />
      </div>
      <div className="text-xs uppercase tracking-widest text-muted">{label}</div>
    </motion.div>
  );
}

function PrevNextCard({
  project,
  direction,
  delay,
}: {
  project: Project;
  direction: "prev" | "next";
  delay: number;
}) {
  const isPrev = direction === "prev";
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="group relative block rounded-3xl border border-border bg-card/40 hover:bg-card hover:border-accent/40 transition-all overflow-hidden"
      >
        <div className="grid sm:grid-cols-5 gap-0 min-h-[200px]">
          <div
            className={cn(
              "sm:col-span-2 relative aspect-2/1 sm:aspect-auto overflow-hidden",
              !isPrev && "sm:order-2"
            )}
          >
            {project.image ? (
              <Image
                src={project.image}
                alt={project.title}
                fill
                quality={85}
                sizes="(max-width: 640px) 100vw, 40vw"
                className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
              />
            ) : (
              <div className={cn("absolute inset-0 bg-linear-to-br", project.color)}>
                <div className="absolute inset-0 noise" />
                <div className="absolute inset-0 flex items-center justify-center font-display text-7xl font-bold text-foreground/10">
                  {project.initials}
                </div>
              </div>
            )}
          </div>
          <div
            className={cn(
              "sm:col-span-3 p-6 lg:p-8 flex flex-col justify-between",
              !isPrev && "sm:text-right sm:order-1"
            )}
          >
            <div
              className={cn(
                "flex items-center gap-2 text-xs uppercase tracking-widest text-muted mb-6",
                !isPrev && "sm:justify-end"
              )}
            >
              {isPrev ? (
                <>
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  Previous
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </div>
            <div>
              <h3 className="font-display text-2xl lg:text-3xl font-bold tracking-tight group-hover:text-accent transition-colors leading-tight">
                {project.title}
              </h3>
              <p className="text-sm text-muted mt-2">{project.category} · {project.year}</p>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function ProjectDetailContent({
  project,
  prev,
  next,
}: {
  project: Project;
  prev: Project;
  next: Project;
}) {
  const heroProgress = useScroll().scrollYProgress;
  const heroBlobY = useSpring(useTransform(heroProgress, [0, 1], [0, 200]), {
    stiffness: 60,
    damping: 20,
  });

  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-24 px-6 lg:px-16 overflow-hidden">
        <motion.div
          style={{ y: heroBlobY }}
          className={`absolute top-0 right-0 w-[700px] h-[700px] bg-linear-to-br ${project.color} blur-[140px] opacity-50 pointer-events-none`}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: EASE, delay: 0.2 }}
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-accent/10 blur-[140px] rounded-full pointer-events-none"
        />
        <div className="absolute inset-0 noise pointer-events-none" />

        <div className="relative max-w-[1600px] mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors mb-12"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              All Projects
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-8 space-y-8">
              <div className="flex items-center gap-3 overflow-hidden">
                <MaskReveal delay={0.1}>
                  <span className="px-3 py-1 rounded-full border border-accent/40 bg-accent/5 text-accent text-xs uppercase tracking-widest">
                    {project.category}
                  </span>
                </MaskReveal>
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
                  className="w-8 h-px bg-muted origin-left"
                />
                <MaskReveal delay={0.25}>
                  <span className="text-xs uppercase tracking-widest text-muted">{project.year}</span>
                </MaskReveal>
              </div>

              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.95] tracking-tighter">
                <MaskReveal delay={0.15}>{project.title}</MaskReveal>
                <MaskReveal delay={0.3} className="text-accent">.</MaskReveal>
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
                className="text-xl lg:text-2xl text-muted max-w-2xl leading-relaxed"
              >
                {project.tagline}
              </motion.p>

              {project.liveLink !== "#" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.7, ease: EASE }}
                >
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-full bg-accent text-background font-medium hover:scale-105 transition-transform"
                  >
                    <span className="text-sm uppercase tracking-widest">Visit Live</span>
                    <span className="w-9 h-9 rounded-full bg-background text-accent flex items-center justify-center overflow-hidden relative">
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-4 group-hover:-translate-y-4" />
                      <ArrowUpRight className="w-4 h-4 absolute transition-transform duration-300 -translate-x-4 translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0" />
                    </span>
                  </a>
                </motion.div>
              )}
            </div>

            <div className="lg:col-span-4 space-y-6 lg:pl-10 lg:border-l border-border">
              <MetaItem Icon={User} label="Role" value={project.role} delay={0.4} />
              {project.client && (
                <MetaItem
                  Icon={ExternalLink}
                  label="Client"
                  value={project.client}
                  delay={0.5}
                />
              )}
              <MetaItem Icon={Calendar} label="Year" value={project.year} delay={0.6} />
              <MetaItem Icon={Clock} label="Duration" value={project.duration} delay={0.7} />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.8 }}
              >
                <div className="text-xs uppercase tracking-widest text-muted mb-3">Tech Stack</div>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((t, i) => (
                    <motion.span
                      key={t}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, ease: EASE, delay: 0.85 + i * 0.05 }}
                      className="text-xs px-3 py-1 rounded-full border border-border bg-card/40"
                    >
                      {t}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Project visual */}
      <section className="px-6 lg:px-16 mb-32">
        <div className="max-w-[1600px] mx-auto">
          <ParallaxImage
            src={project.image}
            alt={`${project.title} screenshot`}
            color={project.color}
            initials={project.initials}
            title={project.title}
          />
        </div>
      </section>

      {/* Overview + Challenge */}
      <section className="px-6 lg:px-16 mb-32">
        <div className="max-w-[1600px] mx-auto grid lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <SectionLabel num="01" label="Overview" />
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
                className="font-display text-3xl lg:text-5xl font-bold tracking-tight leading-tight mt-6"
              >
                The <span className="gradient-text">project</span>
                <br />
                &amp; the challenge.
              </motion.h2>
            </div>
          </div>
          <div className="lg:col-span-7 space-y-16">
            <div>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-3 mb-5"
              >
                <span className="font-mono text-xs uppercase tracking-widest text-accent">
                  The Project
                </span>
                <span className="w-8 h-px bg-border" />
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
                className="text-lg lg:text-xl text-foreground/85 leading-relaxed"
              >
                {project.overview}
              </motion.p>
            </div>
            <div>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-3 mb-5"
              >
                <span className="font-mono text-xs uppercase tracking-widest text-accent">
                  The Challenge
                </span>
                <span className="w-8 h-px bg-border" />
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
                className="text-lg lg:text-xl text-foreground/85 leading-relaxed"
              >
                {project.challenge}
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="px-6 lg:px-16 mb-32">
        <div className="max-w-[1600px] mx-auto grid lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <SectionLabel num="02" label="Approach" />
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
                className="font-display text-3xl lg:text-5xl font-bold tracking-tight leading-tight mt-6"
              >
                How I <span className="gradient-text">built it.</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.35 }}
                className="text-muted leading-relaxed mt-6 max-w-md"
              >
                Step-by-step decisions and trade-offs that shaped the final shipped product.
              </motion.p>
            </div>
          </div>
          <div className="lg:col-span-7">
            <ol className="relative">
              {project.approach.map((step, i) => (
                <ApproachStep
                  key={i}
                  step={step}
                  index={i}
                  total={project.approach.length}
                />
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 lg:px-16 mb-32">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
            <div>
              <SectionLabel num="03" label="Features" />
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
                className="font-display text-3xl lg:text-5xl font-bold tracking-tight mt-6 max-w-2xl"
              >
                What it <span className="text-accent">does</span>.
              </motion.h2>
            </div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
              className="text-sm text-muted"
            >
              {project.features.length} core capabilities
            </motion.span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.features.map((f, i) => (
              <FeatureCard key={i} title={f.title} desc={f.desc} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Stack */}
      <section className="px-6 lg:px-16 mb-32">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
            <div>
              <SectionLabel num="04" label="Tech Stack" />
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
                className="font-display text-3xl lg:text-5xl font-bold tracking-tight mt-6"
              >
                The <span className="gradient-text">tools</span> I used.
              </motion.h2>
            </div>
          </div>
          <div className="space-y-4">
            {project.stack.map((s, i) => (
              <motion.div
                key={s.area}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: EASE, delay: i * 0.08 }}
                className="grid sm:grid-cols-12 items-center gap-6 p-6 lg:p-7 rounded-2xl border border-border bg-card/40 hover:border-accent/30 transition-colors"
              >
                <div className="sm:col-span-3 flex items-center gap-3">
                  <span className="font-mono text-xs text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm uppercase tracking-widest text-muted">{s.area}</span>
                </div>
                <div className="sm:col-span-9 min-w-0">
                  {s.tools.length > 6 ? (
                    <StackMarquee tools={s.tools} />
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {s.tools.map((t) => (
                        <span
                          key={t}
                          className="text-sm px-4 py-1.5 rounded-full border border-border bg-background"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="relative px-6 lg:px-16 mb-32 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: EASE }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 blur-[120px] rounded-full pointer-events-none"
        />
        <div className="relative max-w-[1600px] mx-auto">
          <div className="text-center mb-14">
            <SectionLabel num="05" label="Results" center />
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
              className="font-display text-3xl lg:text-5xl xl:text-6xl font-bold tracking-tight mt-6"
            >
              The <span className="text-accent">outcome</span>.
            </motion.h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {project.results.map((r, i) => (
              <ResultCard key={i} metric={r.metric} label={r.label} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Prev/Next */}
      <section className="px-6 lg:px-16 pb-32 border-t border-border pt-20">
        <div className="max-w-[1600px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="flex items-center gap-3 mb-12"
          >
            <span className="w-10 h-px bg-accent" />
            <span className="text-sm uppercase tracking-widest text-muted">Continue exploring</span>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            <PrevNextCard project={prev} direction="prev" delay={0} />
            <PrevNextCard project={next} direction="next" delay={0.1} />
          </div>
        </div>
      </section>
    </>
  );
}
