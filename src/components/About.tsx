"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const STATS = [
  { value: "4+", label: "Years Experience" },
  { value: "200+", label: "Students Mentored" },
  { value: "4", label: "Companies Worked With" },
  { value: "35%", label: "Faster API Responses" },
];

export default function About() {
  return (
    <section id="about" className="relative py-32 px-6 lg:px-16">
      <div className="max-w-[1600px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="w-10 h-px bg-accent" />
          <span className="text-sm uppercase tracking-widest text-muted">About Me</span>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-7 space-y-8">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight"
            >
              Engineering{" "}
              <span className="gradient-text">production systems</span> with
              clear architecture and reliable delivery.
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4 text-muted text-lg leading-relaxed max-w-2xl"
            >
              <p>
                I am a Software Engineer at Bina. I design and deliver
                production systems for products of any kind, from architecture
                through release. Technical decisions are aligned with business
                requirements, with accountability for quality, performance, and
                maintainability.
              </p>
              <p>
                I am the founder of{" "}
                <a
                  href="https://www.storebee.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-accent transition-colors underline underline-offset-4 decoration-border hover:decoration-accent"
                >
                  StoreBee
                </a>
                , a multi-tenant ecommerce platform for merchants, and{" "}
                <a
                  href="https://learnwithjewel.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-accent transition-colors underline underline-offset-4 decoration-border hover:decoration-accent"
                >
                  Learn With Jewel
                </a>
                , a learning platform. I remain responsible for the product, the
                engineering, and the outcome after launch. The same standard of
                ownership applies to client engagements and to the products I
                have founded.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <a
                href="/resume/Jewel_Resume.pdf"
                download="Jewel_Mia_Resume.pdf"
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-foreground text-background font-medium hover:bg-accent transition-colors"
              >
                Download CV
                <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-border hover:border-foreground/50 transition-colors"
              >
                Hire Me
              </a>
            </motion.div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-4 self-start lg:sticky lg:top-32">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-8 rounded-2xl bg-card border border-border hover:border-accent/40 transition-colors group"
              >
                <div className="font-display text-5xl lg:text-6xl font-bold mb-2 group-hover:text-accent transition-colors">
                  {stat.value}
                </div>
                <div className="text-sm text-muted">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
