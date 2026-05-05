"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const TESTIMONIALS = [
  {
    quote:
      "Worked with us for three months straight and never missed a beat. The work was sharp, the communication was clear, and the launch was clean.",
    author: "Sarah Mendez",
    role: "Product Lead, Northwind",
    initials: "SM",
  },
  {
    quote:
      "We came in with a vague idea and walked out with a brand we're proud of. Genuinely one of the best collaborators we've hired.",
    author: "David Park",
    role: "Founder, Lumen Studio",
    initials: "DP",
  },
  {
    quote:
      "Fast, thoughtful, and not precious about feedback. The handoff was so clean our engineers had nothing to ask.",
    author: "Aisha Rahman",
    role: "Head of Design, Pulse",
    initials: "AR",
  },
  {
    quote:
      "Took our messy Figma file and turned it into a real design system. Our velocity has roughly doubled since then.",
    author: "Marcus Chen",
    role: "CTO, Vector",
    initials: "MC",
  },
];

export default function Testimonials() {
  return (
    <section className="relative py-32 px-6 lg:px-16 border-t border-border">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="w-10 h-px bg-accent" />
              <span className="text-sm uppercase tracking-widest text-muted">Testimonials</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight"
            >
              Kind words from <span className="gradient-text">past clients.</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-6 lg:col-start-8 self-end space-y-2"
          >
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-accent text-accent" />
              ))}
            </div>
            <p className="text-muted">
              <span className="text-foreground font-semibold">4.98 average</span> from 40+
              completed projects.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative p-8 lg:p-10 rounded-3xl border border-border bg-card hover:border-accent/30 transition-colors"
            >
              <Quote className="w-10 h-10 text-accent/30 mb-6" />
              <p
                className="text-lg lg:text-xl leading-relaxed mb-8"
                dangerouslySetInnerHTML={{ __html: t.quote }}
              />
              <div className="flex items-center gap-4 pt-6 border-t border-border">
                <div className="w-12 h-12 rounded-full bg-linear-to-br from-accent/40 to-purple-500/20 flex items-center justify-center font-display font-semibold">
                  {t.initials}
                </div>
                <div>
                  <div className="font-semibold">{t.author}</div>
                  <div className="text-sm text-muted">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
