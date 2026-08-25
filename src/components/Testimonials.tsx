"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { LinkedinIcon } from "@/components/SocialIcons";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const LIVE_PROOF = [
  {
    title: "Learn With Jewel",
    meta: "Education · live product",
    href: "https://learnwithjewel.com",
    caseStudy: "/projects/learn-with-jewel",
    note: "Bengali-first LMS I founded and shipped — open the site.",
  },
  {
    title: "Ophelia Go",
    meta: "E-commerce · client build",
    href: "https://opheliago.com",
    caseStudy: "/projects/ophelia-go",
    note: "Multi-vendor marketplace in production — payments, inventory, courier.",
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative py-32 px-6 lg:px-16 border-t border-border overflow-hidden"
    >
      <div className="absolute top-1/2 -right-40 w-125 h-125 bg-accent/10 blur-[140px] rounded-full pointer-events-none" />

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
              <span className="text-sm uppercase tracking-widest text-muted">References</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: EASE }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight max-w-2xl"
            >
              Proof you can <span className="gradient-text">open in a tab.</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="text-muted max-w-md leading-relaxed"
          >
            I don&apos;t publish invented reviews. These two products are live.
            Named client references are shared privately on a call.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-4 mb-8">
          {LIVE_PROOF.map((item, i) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: EASE }}
              className="group relative rounded-[2rem] border border-border bg-card/50 p-8 sm:p-10 overflow-hidden"
            >
              <div className="absolute inset-0 noise pointer-events-none" />
              <div className="relative">
                <div className="text-xs uppercase tracking-widest text-muted mb-4">
                  {item.meta}
                </div>
                <h3 className="font-display text-3xl font-semibold tracking-tight mb-3">
                  {item.title}
                </h3>
                <p className="text-muted leading-relaxed mb-8 max-w-md">{item.note}</p>
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-foreground text-background text-sm font-medium hover:bg-accent transition-colors"
                  >
                    Visit live site
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                  <Link
                    href={item.caseStudy}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border text-sm hover:border-accent hover:text-accent transition-colors"
                  >
                    Case study
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, delay: 0.12, ease: EASE }}
          className="rounded-[2rem] border border-border p-8 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6"
        >
          <div>
            <div className="text-xs uppercase tracking-widest text-muted mb-3">
              Private references
            </div>
            <p className="font-display text-2xl sm:text-3xl font-semibold tracking-tight max-w-xl leading-tight">
              Need a name and a call with a client? I&apos;ll intro you — no
              placeholder quotes.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <a
              href="https://www.linkedin.com/in/jewel-mia"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border text-sm hover:border-accent hover:text-accent transition-colors"
            >
              <LinkedinIcon className="w-4 h-4" />
              LinkedIn
            </a>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent text-background text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Book a call
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
