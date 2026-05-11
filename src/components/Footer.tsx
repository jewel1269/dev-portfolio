"use client";

import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative border-t border-border bg-card/30 px-6 lg:px-16 pt-24 pb-10 overflow-hidden">
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-200 h-100 bg-accent/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-[1600px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="text-xs uppercase tracking-widest text-muted mb-6">Let&apos;s create together</div>
          <h3 className="font-display text-5xl sm:text-6xl lg:text-8xl font-bold leading-[0.95] tracking-tighter mb-8">
            Have a project? <br />
            <span className="gradient-text">Let&apos;s talk.</span>
          </h3>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-accent text-background font-medium hover:scale-105 transition-transform"
          >
            Start a Project →
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="py-12 lg:py-16"
        >
          <div className="group cursor-pointer font-display font-black leading-[0.85] tracking-tight uppercase text-center flex items-baseline justify-center gap-[2vw] whitespace-nowrap">
            <span className="footer-name text-[14vw]">JEWEL</span>
            <span className="footer-name text-[14vw]">MIA</span>
            <span className="footer-name footer-dot text-[14vw] leading-none">.</span>
          </div>
        </motion.div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-border text-sm text-muted">
          <div>© {new Date().getFullYear()} Jewel Mia. All rights reserved.</div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <button
              onClick={scrollTop}
              className="flex items-center gap-2 hover:text-accent transition-colors"
            >
              Back to top <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
