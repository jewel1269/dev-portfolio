"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const ROLES = ["Software Engineer", "Full-Stack Developer", "AI Integrator"];

function playKeyClick(ctx: AudioContext, kind: "type" | "delete") {
  const t = ctx.currentTime;
  const frames = Math.floor(ctx.sampleRate * 0.035);
  const buffer = ctx.createBuffer(1, frames, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < frames; i++) data[i] = Math.random() * 2 - 1;

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const highpass = ctx.createBiquadFilter();
  highpass.type = "highpass";
  highpass.frequency.value = kind === "delete" ? 300 : 500;

  const bandpass = ctx.createBiquadFilter();
  bandpass.type = "bandpass";
  bandpass.frequency.value = (kind === "delete" ? 900 : 2200) + Math.random() * 700;
  bandpass.Q.value = 0.9;

  const noiseGain = ctx.createGain();
  const noiseVol = kind === "delete" ? 0.045 : 0.09 + Math.random() * 0.03;
  noiseGain.gain.setValueAtTime(noiseVol, t);
  noiseGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.04);

  noise.connect(highpass);
  highpass.connect(bandpass);
  bandpass.connect(noiseGain);
  noiseGain.connect(ctx.destination);
  noise.start(t);
  noise.stop(t + 0.04);

  const thock = ctx.createOscillator();
  thock.type = "sine";
  thock.frequency.value = kind === "delete" ? 130 : 170 + Math.random() * 50;
  const thockGain = ctx.createGain();
  thockGain.gain.setValueAtTime(kind === "delete" ? 0.025 : 0.045, t);
  thockGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.028);
  thock.connect(thockGain);
  thockGain.connect(ctx.destination);
  thock.start(t);
  thock.stop(t + 0.03);
}

function useKeyboardClicks(active: boolean) {
  const ctxRef = useRef<AudioContext | null>(null);
  const unlockedRef = useRef(false);
  const activeRef = useRef(active);
  activeRef.current = active;

  useEffect(() => {
    const AudioCtx =
      window.AudioContext ||
      (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;

    const unlock = () => {
      if (!ctxRef.current) ctxRef.current = new AudioCtx();
      if (ctxRef.current.state === "suspended") void ctxRef.current.resume();
      unlockedRef.current = true;
    };

    window.addEventListener("pointerdown", unlock);
    window.addEventListener("keydown", unlock);

    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
      void ctxRef.current?.close();
      ctxRef.current = null;
      unlockedRef.current = false;
    };
  }, []);

  return useCallback((kind: "type" | "delete") => {
    const ctx = ctxRef.current;
    if (!ctx || !unlockedRef.current || !activeRef.current) return;
    if (document.visibilityState !== "visible") return;
    if (ctx.state !== "running") return;
    playKeyClick(ctx, kind);
  }, []);
}

function useTypewriter(
  words: string[],
  typingSpeed = 90,
  deletingSpeed = 45,
  pause = 1500,
  onTick?: (kind: "type" | "delete") => void
) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const onTickRef = useRef(onTick);
  onTickRef.current = onTick;

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
          onTickRef.current?.(deleting ? "delete" : "type");
        },
        deleting ? deletingSpeed : typingSpeed
      );
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, wordIndex, words, typingSpeed, deletingSpeed, pause]);

  return text;
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(true);
  const playClick = useKeyboardClicks(inView);
  const typed = useTypewriter(ROLES, 90, 45, 1500, playClick);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center pt-28 pb-16 px-6 lg:px-16 overflow-hidden"
    >
      {/* Ambient wash — charcoal lift + faint lime, shared across the whole hero */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 120% 85% at 50% -15%, #161616 0%, var(--background) 68%)",
          }}
        />
        <div
          className="absolute inset-0 mix-blend-screen opacity-30"
          style={{
            background: [
              "radial-gradient(ellipse 50% 45% at 18% 28%, rgba(197,255,77,0.45) 0%, transparent 70%)",
              "radial-gradient(ellipse 40% 40% at 82% 72%, rgba(197,255,77,0.22) 0%, transparent 70%)",
            ].join(", "),
          }}
        />
        <div className="absolute inset-0 bg-linear-to-b from-transparent from-55% to-background" />
      </div>

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

      {/* Center photo — desktop only; on small screens an in-flow photo card is shown instead */}
      <div className="absolute inset-0 hidden lg:flex items-end justify-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative w-auto aspect-3/4 h-[min(calc(100svh-6.5rem),calc(685px*4/3))] max-w-[685px]"
        >
          <div className="absolute inset-x-0 top-0 h-16 bg-linear-to-b from-[#161616] to-transparent z-10" />
          <div className="absolute inset-0 bg-linear-to-t from-background via-background/50 to-transparent z-10" />
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src="/img/jewel2.png"
              alt="Jewel Mia"
              fill
              priority
              fetchPriority="high"
              quality={85}
              className="object-cover object-[center_20%]"
              sizes="685px"
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

          {/* Mobile / tablet photo card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:hidden relative w-full max-w-sm aspect-4/5 rounded-3xl overflow-hidden border border-border bg-card"
          >
            <Image
              src="/img/jewel2.png"
              alt="Jewel Mia"
              fill
              priority
              fetchPriority="high"
              quality={85}
              className="object-cover object-top"
              sizes="(max-width: 1024px) 90vw, 1px"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-background to-transparent" />
          </motion.div>

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
            className="text-base leading-relaxed text-muted lg:[text-shadow:0_2px_16px_rgba(0,0,0,0.9)]"
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
            <div className="w-14 h-14 rounded-full bg-foreground text-background flex items-center justify-center font-display font-bold text-sm border-2 border-background">
              200+
            </div>
            <div>
              <div className="text-sm font-medium uppercase tracking-wider">Students & Clients</div>
              <div className="text-xs uppercase tracking-widest text-muted">98% Satisfaction</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
