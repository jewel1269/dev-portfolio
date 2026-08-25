"use client";

import { motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const ROLES = [
  {
    company: "Bina",
    role: "Software Engineer",
    dates: "Jan 2026 — Present",
    period: "26",
    location: "Ra'anana, Israel · Remote",
    current: true,
    points: [
      "Developing and maintaining full-stack applications for a global tech education platform.",
      "Optimizing application performance through backend, database, and API improvements.",
      "Integrating AI-powered solutions and contributing to scalable product development.",
    ],
  },
  {
    company: "Hablu Programmer",
    role: "Backend Instructor",
    dates: "Apr 2025 — Dec 2025",
    period: "25",
    location: "Rajshahi · Remote",
    current: false,
    points: [
      "Delivered backend development training covering REST APIs, databases, and scalable application architecture.",
      "Mentored aspiring developers through hands-on projects, code reviews, and engineering best practices.",
    ],
  },
  {
    company: "E-bitans Limited",
    role: "Software Engineer",
    dates: "Jan 2024 — Feb 2025",
    period: "24",
    location: "Dhaka, Bangladesh",
    current: false,
    points: [
      "Developed and maintained enterprise web applications, including ERP and inventory management.",
      "Built scalable backend services and collaborated across the full stack to deliver business solutions.",
      "Optimized code structure and database queries to enhance platform efficiency.",
    ],
  },
  {
    company: "Lara Group",
    role: "Front-End Engineer",
    dates: "Sep 2022 — Dec 2023",
    period: "22",
    location: "Nairobi, Kenya · Remote",
    current: false,
    points: [
      "Built responsive web applications using React.js and Next.js for fintech and e-commerce clients.",
      "Reduced initial page load times by 40% through lazy loading and optimized state management.",
    ],
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative py-32 px-6 lg:px-16 border-t border-border overflow-hidden"
    >
      <div className="relative max-w-[1600px] mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: EASE }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="w-10 h-px bg-accent" />
              <span className="text-sm uppercase tracking-widest text-muted">Work history</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: EASE }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight max-w-2xl"
            >
              Companies I&apos;ve <span className="gradient-text">built with.</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="text-muted max-w-md leading-relaxed"
          >
            Four teams across education, training, ERP, and fintech — remote
            and on-site, from Dhaka to Israel.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="rounded-[2rem] border border-border overflow-hidden divide-y divide-border"
        >
          {ROLES.map((job, i) => (
            <article
              key={`${job.company}-${job.dates}`}
              className="group relative bg-background hover:bg-card/80 transition-colors duration-300"
            >
              {job.current && (
                <span className="absolute left-0 top-0 bottom-0 w-px bg-accent" />
              )}

              {job.current && (
                <span className="absolute top-6 right-6 sm:top-8 sm:right-8 lg:top-10 lg:right-12 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/40 bg-accent/10 text-accent text-[10px] uppercase tracking-[0.2em]">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 animate-ping" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent" />
                  </span>
                  Current
                </span>
              )}

              <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 px-6 sm:px-8 lg:px-12 py-10 lg:py-12">
                <div className="lg:col-span-4 flex flex-col justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-muted tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="w-6 h-px bg-border group-hover:bg-accent/50 transition-colors" />
                    <span className="font-mono text-xs text-muted">/{job.period}</span>
                  </div>
                  <div>
                    <div className="text-sm font-medium tracking-tight">{job.dates}</div>
                    <div className="text-sm text-muted mt-1">{job.location}</div>
                  </div>
                </div>

                <div className="lg:col-span-8">
                  <h3 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold tracking-tight leading-[1.1] group-hover:text-accent transition-colors duration-300">
                    {job.company}
                  </h3>
                  <p className="text-muted mt-2 mb-6">{job.role}</p>
                  <ul className="space-y-3 max-w-2xl">
                    {job.points.map((point) => (
                      <li
                        key={point}
                        className="text-[15px] text-muted leading-relaxed pl-4 relative before:absolute before:left-0 before:top-[0.65em] before:w-1 before:h-1 before:rounded-full before:bg-foreground/30 group-hover:before:bg-accent/80 before:transition-colors"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
