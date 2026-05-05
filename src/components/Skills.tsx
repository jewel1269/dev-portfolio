"use client";

import { motion } from "framer-motion";
import type { ComponentType, SVGProps } from "react";
import {
  SiAnthropic,
  SiCplusplus,
  SiCss,
  SiDart,
  SiDocker,
  SiExpress,
  SiFirebase,
  SiGit,
  SiHtml5,
  SiHuggingface,
  SiJavascript,
  SiLangchain,
  SiMongodb,
  SiMongoose,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenai,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiReact,
  SiRedux,
  SiShadcnui,
  SiTailwindcss,
  SiTypescript,
  SiZapier,
} from "react-icons/si";

type IconType = ComponentType<SVGProps<SVGSVGElement>>;

function LetterMark({ letters, color = "#c5ff4d" }: { letters: string; color?: string }) {
  return (
    <span
      className="font-display font-black text-sm tracking-tighter"
      style={{ color }}
    >
      {letters}
    </span>
  );
}

const N8nIcon = () => <LetterMark letters="n8n" color="#EA4B71" />;
const ZustandIcon = () => <LetterMark letters="Z" color="#FFB454" />;

type Tech = {
  name: string;
  category: string;
  Icon: IconType | (() => React.ReactElement);
  color: string;
};

const TECHS: Tech[] = [
  // Languages
  { name: "JavaScript", category: "Languages", Icon: SiJavascript, color: "#F7DF1E" },
  { name: "TypeScript", category: "Languages", Icon: SiTypescript, color: "#3178C6" },
  { name: "Dart", category: "Languages", Icon: SiDart, color: "#0175C2" },
  { name: "Python", category: "Languages", Icon: SiPython, color: "#3776AB" },
  { name: "C++", category: "Languages", Icon: SiCplusplus, color: "#00599C" },

  // Frontend
  { name: "React", category: "Frontend", Icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", category: "Frontend", Icon: SiNextdotjs, color: "#FFFFFF" },
  { name: "React Native", category: "Frontend", Icon: SiReact, color: "#61DAFB" },
  { name: "Tailwind CSS", category: "Frontend", Icon: SiTailwindcss, color: "#06B6D4" },
  { name: "shadcn/ui", category: "Frontend", Icon: SiShadcnui, color: "#FFFFFF" },
  { name: "Redux", category: "Frontend", Icon: SiRedux, color: "#764ABC" },
  { name: "Zustand", category: "Frontend", Icon: ZustandIcon, color: "#FFB454" },
  { name: "HTML5", category: "Frontend", Icon: SiHtml5, color: "#E34F26" },
  { name: "CSS3", category: "Frontend", Icon: SiCss, color: "#1572B6" },

  // Backend
  { name: "Node.js", category: "Backend", Icon: SiNodedotjs, color: "#5FA04E" },
  { name: "Nest.js", category: "Backend", Icon: SiNestjs, color: "#E0234E" },
  { name: "Express.js", category: "Backend", Icon: SiExpress, color: "#FFFFFF" },
  { name: "PostgreSQL", category: "Backend", Icon: SiPostgresql, color: "#4169E1" },
  { name: "MongoDB", category: "Backend", Icon: SiMongodb, color: "#47A248" },
  { name: "Mongoose", category: "Backend", Icon: SiMongoose, color: "#880000" },
  { name: "Prisma", category: "Backend", Icon: SiPrisma, color: "#FFFFFF" },
  { name: "Firebase", category: "Backend", Icon: SiFirebase, color: "#FFCA28" },

  // AI
  { name: "OpenAI", category: "AI", Icon: SiOpenai, color: "#FFFFFF" },
  { name: "LLM", category: "AI", Icon: SiAnthropic, color: "#D4A27F" },
  { name: "LangChain", category: "AI", Icon: SiLangchain, color: "#FFFFFF" },
  { name: "Hugging Face", category: "AI", Icon: SiHuggingface, color: "#FFD21E" },

  // Automation
  { name: "n8n", category: "Automation", Icon: N8nIcon, color: "#EA4B71" },
  { name: "Zapier", category: "Automation", Icon: SiZapier, color: "#FF4F00" },

  // Tools
  { name: "Git", category: "Tools", Icon: SiGit, color: "#F05032" },
  { name: "Docker", category: "Tools", Icon: SiDocker, color: "#2496ED" },
];

function TechChip({ tech }: { tech: Tech }) {
  const Icon = tech.Icon;
  return (
    <div
      className="group/chip relative flex items-center gap-3 px-5 py-3 rounded-full border border-border bg-card/50 backdrop-blur-sm hover:bg-card hover:border-accent/40 hover:scale-105 transition-all duration-300 shrink-0"
      style={
        {
          ["--tech-color" as string]: tech.color,
        } as React.CSSProperties
      }
    >
      <span
        className="absolute inset-0 rounded-full opacity-0 group-hover/chip:opacity-20 transition-opacity duration-300 pointer-events-none"
        style={{ background: `radial-gradient(circle at center, ${tech.color}, transparent 70%)` }}
      />
      <Icon
        className="w-5 h-5 shrink-0 transition-transform duration-300 group-hover/chip:scale-110"
        style={{ color: tech.color }}
      />
      <span className="text-sm font-medium whitespace-nowrap">{tech.name}</span>
    </div>
  );
}

function TechRow({
  techs,
  reverse = false,
  duration = 40,
}: {
  techs: Tech[];
  reverse?: boolean;
  duration?: number;
}) {
  return (
    <div className="marquee-row relative w-full overflow-hidden">
      <div
        className={`marquee-track flex gap-4 w-max ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
        style={{ animationDuration: `${duration}s` }}
      >
        {[...techs, ...techs].map((tech, i) => (
          <TechChip key={`${tech.name}-${i}`} tech={tech} />
        ))}
      </div>
    </div>
  );
}

function TechMarquee({ techs }: { techs: Tech[] }) {
  const third = Math.ceil(techs.length / 3);
  const row1 = techs.slice(0, third);
  const row2 = techs.slice(third, third * 2);
  const row3 = techs.slice(third * 2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7 }}
      className="space-y-4"
    >
      <TechRow techs={row1} duration={45} />
      <TechRow techs={row2} reverse duration={55} />
      <TechRow techs={row3} duration={50} />
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative py-32 border-t border-border overflow-hidden">
      <div className="px-6 lg:px-16 max-w-[1600px] mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="w-10 h-px bg-accent" />
              <span className="text-sm uppercase tracking-widest text-muted">My Skills</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight"
            >
              Tech I use to <span className="text-accent">ship</span>.
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7 text-muted text-lg leading-relaxed self-end max-w-2xl"
          >
            From front-end interfaces to backend microservices and AI-driven
            workflows — these are the tools I reach for when shipping
            production-grade systems.
          </motion.p>
        </div>

      </div>

      <TechMarquee techs={TECHS} />
    </section>
  );
}
