"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { PROJECTS } from "@/data/projects";

const FILTERS = ["All", "E-Commerce", "Education", "AI", "Finance"];

export default function Portfolio() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === active);

  return (
    <section id="portfolio" className="relative py-32 px-6 lg:px-16 border-t border-border">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="w-10 h-px bg-accent" />
              <span className="text-sm uppercase tracking-widest text-muted">Selected Work</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight"
            >
              Recent <span className="gradient-text">projects.</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-wrap gap-2"
          >
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm border transition-all",
                  active === f
                    ? "bg-accent text-background border-accent"
                    : "border-border text-muted hover:border-foreground/40 hover:text-foreground"
                )}
              >
                {f}
              </button>
            ))}
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {filtered.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
              className={cn(
                "group relative",
                i % 3 === 0 && "md:col-span-2"
              )}
            >
              <Link
                href={`/projects/${project.slug}`}
                className={cn(
                  "block relative aspect-4/3 rounded-3xl overflow-hidden border border-border bg-card",
                  i % 3 === 0 && "md:aspect-2/1"
                )}
              >
                {project.image ? (
                  <>
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      quality={95}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, (max-width: 1600px) 60vw, 1280px"
                      className="object-cover scale-110 transition-transform duration-700 group-hover:scale-125"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-background via-background/80 via-30% to-transparent" />
                  </>
                ) : (
                  <>
                    <div className={cn("absolute inset-0 bg-linear-to-br", project.color)} />
                    <div className="absolute inset-0 noise" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="font-display text-[10rem] lg:text-[14rem] font-bold text-foreground/5 group-hover:text-foreground/10 group-hover:scale-110 transition-all duration-700">
                        {project.initials}
                      </div>
                    </div>
                  </>
                )}

                <div className="absolute top-6 left-6 right-6 flex items-start justify-between">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1 rounded-full bg-background/60 backdrop-blur-sm border border-border text-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="w-12 h-12 rounded-full bg-background/60 backdrop-blur-sm border border-border flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all">
                    <ArrowUpRight className="w-5 h-5 group-hover:text-background group-hover:rotate-45 transition-all" />
                  </div>
                </div>

                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted mb-2">
                    <span>{project.category} · {project.year}</span>
                    <span className="opacity-0 group-hover:opacity-100 text-accent transition-opacity">
                      → Case Study
                    </span>
                  </div>
                  <h3 className="font-display text-2xl lg:text-3xl font-semibold mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted max-w-md leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </Link>

              {project.liveLink !== "#" && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="absolute top-6 right-20 w-12 h-12 rounded-full bg-background/60 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-accent hover:border-accent hover:text-background transition-all opacity-0 group-hover:opacity-100"
                  aria-label="Visit live site"
                >
                  <ArrowUpRight className="w-5 h-5" />
                </a>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-center"
        >
          <a
            href="#"
            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-border hover:border-accent hover:text-accent transition-colors"
          >
            View All Projects
            <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
