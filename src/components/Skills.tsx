"use client";

import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useMemo, useState, type ComponentType, type SVGProps, type MouseEvent } from "react";
import {
  SiClaude,
  SiCplusplus,
  SiDart,
  SiDocker,
  SiExpress,
  SiFirebase,
  SiFlutter,
  SiGit,
  SiGraphql,
  SiJavascript,
  SiKubernetes,
  SiLangchain,
  SiMongodb,
  SiMongoose,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenai,
  SiPostgresql,
  SiPrisma,
  SiPostman,
  SiPython,
  SiReact,
  SiReactquery,
  SiRedis,
  SiRedux,
  SiShadcnui,
  SiTailwindcss,
  SiTypescript,
  SiZapier,
} from "react-icons/si";
import { cn } from "@/lib/utils";

type IconType = ComponentType<SVGProps<SVGSVGElement>>;

function LetterMark({ letters, color }: { letters: string; color: string }) {
  return (
    <span
      className="font-display font-black text-base tracking-tighter"
      style={{ color }}
    >
      {letters}
    </span>
  );
}

const N8nIcon = () => <LetterMark letters="n8n" color="#EA4B71" />;
const ZustandIcon = () => <LetterMark letters="Z" color="#FFB454" />;

function CursorAiIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M13.109 21.444 10.273 11.804.556 8.556 23.444.556l-7.889 22.888-2.446-2z" />
    </svg>
  );
}

type Tech = {
  name: string;
  category: string;
  Icon: IconType | (() => React.ReactElement);
  color: string;
};

const TECHS: Tech[] = [
  { name: "TypeScript", category: "Languages", Icon: SiTypescript, color: "#3178C6" },
  { name: "JavaScript", category: "Languages", Icon: SiJavascript, color: "#F7DF1E" },
  { name: "Python", category: "Languages", Icon: SiPython, color: "#3776AB" },
  { name: "Dart", category: "Languages", Icon: SiDart, color: "#0175C2" },
  { name: "C++", category: "Languages", Icon: SiCplusplus, color: "#00599C" },

  { name: "React", category: "Frontend", Icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", category: "Frontend", Icon: SiNextdotjs, color: "#FFFFFF" },
  { name: "React Native", category: "Frontend", Icon: SiReact, color: "#61DAFB" },
  { name: "Flutter", category: "Frontend", Icon: SiFlutter, color: "#02569B" },
  { name: "Tailwind CSS", category: "Frontend", Icon: SiTailwindcss, color: "#06B6D4" },
  { name: "shadcn/ui", category: "Frontend", Icon: SiShadcnui, color: "#FFFFFF" },
  { name: "Redux", category: "Frontend", Icon: SiRedux, color: "#764ABC" },
  { name: "Zustand", category: "Frontend", Icon: ZustandIcon, color: "#FFB454" },
  { name: "TanStack Query", category: "Frontend", Icon: SiReactquery, color: "#FF4154" },

  { name: "Node.js", category: "Backend", Icon: SiNodedotjs, color: "#5FA04E" },
  { name: "Nest.js", category: "Backend", Icon: SiNestjs, color: "#E0234E" },
  { name: "Express.js", category: "Backend", Icon: SiExpress, color: "#FFFFFF" },
  { name: "GraphQL", category: "Backend", Icon: SiGraphql, color: "#E10098" },
  { name: "PostgreSQL", category: "Backend", Icon: SiPostgresql, color: "#4169E1" },
  { name: "Prisma", category: "Backend", Icon: SiPrisma, color: "#FFFFFF" },
  { name: "MongoDB", category: "Backend", Icon: SiMongodb, color: "#47A248" },
  { name: "Mongoose", category: "Backend", Icon: SiMongoose, color: "#880000" },
  { name: "Redis", category: "Backend", Icon: SiRedis, color: "#FF4438" },
  { name: "Firebase", category: "Backend", Icon: SiFirebase, color: "#FFCA28" },

  { name: "OpenAI", category: "AI", Icon: SiOpenai, color: "#FFFFFF" },
  { name: "Claude", category: "AI", Icon: SiClaude, color: "#D97757" },
  { name: "LangChain", category: "AI", Icon: SiLangchain, color: "#FFFFFF" },

  { name: "n8n", category: "Automation", Icon: N8nIcon, color: "#EA4B71" },
  { name: "Zapier", category: "Automation", Icon: SiZapier, color: "#FF4F00" },

  { name: "Cursor AI", category: "Tools", Icon: CursorAiIcon, color: "#FFFFFF" },
  { name: "Git", category: "Tools", Icon: SiGit, color: "#F05032" },
  { name: "Docker", category: "Tools", Icon: SiDocker, color: "#2496ED" },
  { name: "Kubernetes", category: "Tools", Icon: SiKubernetes, color: "#326CE5" },
  { name: "Postman", category: "Tools", Icon: SiPostman, color: "#FF6C37" },
];

const CATEGORIES = [
  "All",
  "Languages",
  "Frontend",
  "Backend",
  "AI",
  "Automation",
  "Tools",
] as const;

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

function TechCard({ tech, index }: { tech: Tech; index: number }) {
  const Icon = tech.Icon;
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 200, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 200, damping: 20 });
  const rotateX = useTransform(springY, [-50, 50], [6, -6]);
  const rotateY = useTransform(springX, [-50, 50], [-6, 6]);

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = e.clientX - rect.left - rect.width / 2;
    const cy = e.clientY - rect.top - rect.height / 2;
    mouseX.set(cx);
    mouseY.set(cy);
  };

  const handleLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay: index * 0.03, ease: EASE }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className="group relative aspect-square rounded-2xl border border-border bg-card/40 backdrop-blur-sm overflow-hidden cursor-pointer"
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${tech.color}25, transparent 70%)`,
        }}
      />
      <div
        className="absolute inset-0 rounded-2xl border opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ borderColor: `${tech.color}60` }}
      />

      <div className="relative h-full flex flex-col items-center justify-center gap-3 p-4">
        <div
          className="transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1"
          style={{ color: tech.color }}
        >
          <Icon className="w-10 h-10" style={{ color: tech.color }} />
        </div>
        <div className="text-center">
          <div className="text-sm font-medium leading-tight">{tech.name}</div>
          <div className="text-[10px] uppercase tracking-widest text-muted mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {tech.category}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function FilterPills({
  active,
  onChange,
  counts,
}: {
  active: string;
  onChange: (c: string) => void;
  counts: Record<string, number>;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {CATEGORIES.map((c) => {
        const isActive = active === c;
        return (
          <button
            key={c}
            onClick={() => onChange(c)}
            className={cn(
              "relative px-5 py-2.5 rounded-full text-sm border transition-colors",
              isActive
                ? "border-transparent text-background"
                : "border-border text-muted hover:text-foreground hover:border-foreground/40"
            )}
          >
            {isActive && (
              <motion.span
                layoutId="skill-pill"
                className="absolute inset-0 rounded-full bg-accent"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative flex items-center gap-2">
              {c}
              <span
                className={cn(
                  "text-[10px] px-1.5 py-0.5 rounded-full",
                  isActive ? "bg-background/20" : "bg-foreground/5 text-muted"
                )}
              >
                {counts[c]}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default function Skills() {
  const [active, setActive] = useState<string>("All");

  const counts = useMemo(() => {
    const c: Record<string, number> = { All: TECHS.length };
    for (const t of TECHS) c[t.category] = (c[t.category] ?? 0) + 1;
    return c;
  }, []);

  const filtered = useMemo(
    () => (active === "All" ? TECHS : TECHS.filter((t) => t.category === active)),
    [active]
  );

  return (
    <section
      id="skills"
      className="relative py-32 px-6 lg:px-16 border-t border-border overflow-hidden"
    >
      <div className="absolute top-1/2 -left-40 w-125 h-125 bg-accent/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 -right-40 w-125 h-125 bg-purple-500/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="relative max-w-[1600px] mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 mb-12">
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: EASE }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="w-10 h-px bg-accent" />
              <span className="text-sm uppercase tracking-widest text-muted">My Stack</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: EASE }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight"
            >
              Tech I use to <span className="gradient-text">ship.</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
            className="lg:col-span-5 lg:col-start-8 self-end space-y-6"
          >
            <p className="text-muted leading-relaxed">
              From front-end interfaces to backend microservices and AI-driven
              workflows — these are the tools I reach for when shipping
              production-grade systems.
            </p>
            <div className="flex items-center gap-8 pt-4 border-t border-border">
              <div>
                <div className="font-display text-3xl font-bold gradient-text">
                  {TECHS.length}+
                </div>
                <div className="text-xs uppercase tracking-widest text-muted mt-1">
                  Technologies
                </div>
              </div>
              <div className="w-px h-12 bg-border" />
              <div>
                <div className="font-display text-3xl font-bold gradient-text">
                  {CATEGORIES.length - 1}
                </div>
                <div className="text-xs uppercase tracking-widest text-muted mt-1">
                  Categories
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
          className="mb-10"
        >
          <FilterPills active={active} onChange={setActive} counts={counts} />
        </motion.div>

        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((tech, i) => (
              <TechCard key={tech.name} tech={tech} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
