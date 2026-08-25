"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Code2, Database, GraduationCap, Smartphone, Sparkles, Zap } from "lucide-react";

const SERVICES = [
  {
    icon: Code2,
    title: "Full-Stack Development",
    desc: "End-to-end web platforms with Next.js, React, and modern frameworks — built for scale and shipped clean.",
    tags: ["Next.js", "React.js", "TypeScript"],
  },
  {
    icon: Database,
    title: "Backend Engineering",
    desc: "Modular APIs and microservices using Node.js, Express, Nest.js, with PostgreSQL & MongoDB at the core.",
    tags: ["Node.js", "Nest.js", "PostgreSQL"],
  },
  {
    icon: Sparkles,
    title: "AI Integration",
    desc: "OpenAI and LLM-powered tooling for automation, content generation, and smarter user workflows.",
    tags: ["OpenAI", "LLM", "n8n"],
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    desc: "Cross-platform Android and iOS apps — React Native as the primary stack (2 years), Flutter where the product calls for it.",
    tags: ["React Native", "Flutter", "TypeScript"],
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    desc: "Cut API response times with Redis caching, SQL tuning, and Core Web Vitals fixes that show in the data.",
    tags: ["Redis", "Caching", "SEO"],
  },
  {
    icon: GraduationCap,
    title: "Mentoring & Training",
    desc: "Backend curriculum design and 1:1 mentorship — TDD, Clean Architecture, REST API design.",
    tags: ["TDD", "Clean Arch.", "REST"],
  },
];

export default function Services() {
  return (
    <section id="services" className="relative py-32 px-6 lg:px-16 border-t border-border">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="w-10 h-px bg-accent" />
              <span className="text-sm uppercase tracking-widest text-muted">Services</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight max-w-2xl"
            >
              What I <span className="text-accent">do</span> best.
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-muted max-w-md"
          >
            Six focused offerings, end-to-end — from first sketch to shipped
            product. Pick what you need, or pair them up.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-3xl overflow-hidden">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group relative bg-background p-8 lg:p-10 hover:bg-card transition-colors duration-300 cursor-pointer"
            >
              <div className="flex items-start justify-between mb-12">
                <div className="w-14 h-14 rounded-2xl bg-card border border-border flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-colors">
                  <service.icon className="w-6 h-6 group-hover:text-background transition-colors" />
                </div>
                <ArrowUpRight className="w-5 h-5 text-muted opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-accent transition-all" />
              </div>

              <h3 className="font-display text-2xl font-semibold mb-3">{service.title}</h3>
              <p className="text-muted text-sm leading-relaxed mb-6">{service.desc}</p>

              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 rounded-full border border-border text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <span className="absolute top-0 left-0 right-0 h-px bg-accent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
