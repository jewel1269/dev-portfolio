"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";

const ROLES = ["Software Engineer", "Full-Stack Developer", "AI Integrator"];

function useTypewriter(words: string[], typingSpeed = 90, deletingSpeed = 45, pause = 1500) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && text === word) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === "") {
      timeout = setTimeout(() => {
        setDeleting(false);
        setWordIndex((i) => (i + 1) % words.length);
      }, 200);
    } else {
      timeout = setTimeout(
        () => {
          setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
        },
        deleting ? deletingSpeed : typingSpeed
      );
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, wordIndex, words, typingSpeed, deletingSpeed, pause]);

  return text;
}

export default function Hero() {
  const typed = useTypewriter(ROLES);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-28 pb-16 px-6 lg:px-16 overflow-hidden"
    >
      {/* Horizontal lines decoration */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.07]">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute left-0 right-0 h-px bg-accent"
            style={{ top: `${i * 5}%` }}
          />
        ))}
      </div>

      {/* Center photo */}
      <div className="absolute inset-0 flex items-end justify-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative w-[55%] max-w-2xl aspect-3/4 mt-16"
        >
          <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent z-10" />
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src="/img/jewel2.png"
              alt="Jewel Mia"
              fill
              priority
              fetchPriority="high"
              quality={85}
              className="object-cover object-center"
              sizes="(max-width: 1024px) 55vw, 700px"
            />
          </div>
        </motion.div>
      </div>

      {/* Content grid */}
      <div className="relative z-20 max-w-[1600px] mx-auto w-full grid lg:grid-cols-12 gap-10 items-center">
        {/* LEFT — Headline + CTA */}
        <div className="lg:col-span-6 space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs uppercase tracking-[0.3em] text-muted h-4"
          >
            <span className="text-accent">{typed}</span>
            <span className="inline-block w-0.5 h-3 bg-accent ml-1 animate-pulse align-middle" />
          </motion.div>

          <div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold leading-[0.95] tracking-tighter"
            >
              <span className="text-accent">I&apos;m</span> Jewel
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="font-display text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold leading-[0.95] tracking-tighter"
            >
              Mia<span className="text-accent">.</span>
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <a
              href="#portfolio"
              className="group inline-flex items-center gap-3 px-7 py-4 rounded-full border border-border hover:border-foreground transition-colors"
            >
              <span className="text-sm uppercase tracking-widest font-medium">View Portfolio</span>
              <span className="w-7 h-7 rounded-full bg-foreground text-background flex items-center justify-center group-hover:bg-accent transition-colors">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex items-center gap-8 pt-12 text-xs uppercase tracking-widest"
          >
            {[
              { name: "Github", href: "https://github.com/jewel1269" },
              { name: "Linkedin", href: "https://www.linkedin.com/in/jewel-mia" },
              { name: "Twitter", href: "https://x.com/jewelmia2330" },
              { name: "Facebook", href: "https://www.facebook.com/jewel2331" },
            ].map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-accent transition-colors"
              >
                {s.name}
              </a>
            ))}
          </motion.div>
        </div>

        {/* RIGHT — Tagline + Trusted */}
        <div className="lg:col-span-6 lg:col-start-9 lg:max-w-xs space-y-12 lg:mt-32">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-sm uppercase tracking-widest leading-relaxed text-muted"
          >
            Building scalable web platforms and high-performance mobile
            ecosystems with AI integration.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex items-center gap-4"
          >
            <div className="flex -space-x-3">
              {["bg-rose-400", "bg-amber-400", "bg-emerald-400"].map((c, i) => (
                <div
                  key={i}
                  className={`w-10 h-10 rounded-full ${c} border-2 border-background bg-linear-to-br from-foreground/30 to-foreground/10`}
                />
              ))}
              <div className="w-12 h-12 rounded-full bg-foreground text-background flex items-center justify-center font-display font-bold text-sm border-2 border-background">
                30+
              </div>
            </div>
            <div>
              <div className="text-sm font-medium uppercase tracking-wider">Happy Clients</div>
              <div className="text-xs uppercase tracking-widest text-muted">World Wide</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
