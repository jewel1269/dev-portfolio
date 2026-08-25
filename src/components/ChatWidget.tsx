"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, MessageCircle, X } from "lucide-react";
import Image from "next/image";
import {
  FacebookIcon,
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
  WhatsappIcon,
} from "@/components/SocialIcons";

const EMAIL = "jewelmia.dev@gmail.com";
const PHONE_DISPLAY = "+880 1684-321082";
const WHATSAPP_URL =
  "https://wa.me/8801684321082?text=" +
  encodeURIComponent("Hi Jewel, I’d like to talk about a project.");
const MAIL_URL =
  `mailto:${EMAIL}?subject=` + encodeURIComponent("Project inquiry");

const SOCIALS = [
  { name: "GitHub", href: "https://github.com/jewel1269", Icon: GithubIcon },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/jewel-mia", Icon: LinkedinIcon },
  { name: "X", href: "https://x.com/jewelmia2330", Icon: TwitterIcon },
  { name: "Facebook", href: "https://www.facebook.com/jewel2331", Icon: FacebookIcon },
];

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onPointer = (e: MouseEvent | PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[90] flex flex-col items-end gap-3"
    >
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="w-[min(22rem,calc(100vw-2.5rem))] rounded-[1.75rem] border border-border bg-card overflow-hidden"
            role="dialog"
            aria-label="Contact Jewel Mia"
          >
            <div className="flex items-center gap-3 px-5 py-4 border-b border-border bg-background">
              <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-border">
                <Image
                  src="/img/jewel2.png"
                  alt="Jewel Mia"
                  fill
                  className="object-cover object-top"
                  sizes="44px"
                />
              </div>
              <div className="min-w-0">
                <div className="font-medium leading-tight">Jewel Mia</div>
                <div className="text-xs text-muted mt-0.5">Software Engineer · Dhaka</div>
              </div>
            </div>

            <div className="px-5 py-5 space-y-4">
              <p className="text-[15px] leading-relaxed text-muted">
                Hi — thanks for stopping by. Tell me about the project and
                I&apos;ll get back to you. Email or WhatsApp, whichever is
                faster.
              </p>

              <div className="space-y-2">
                <a
                  href={MAIL_URL}
                  className="group flex items-center gap-3 rounded-2xl border border-border bg-background px-4 py-3 hover:border-accent/40 transition-colors"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-card border border-border text-accent">
                    <Mail className="h-4 w-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[10px] uppercase tracking-widest text-muted">
                      Email
                    </span>
                    <span className="block text-sm truncate group-hover:text-accent transition-colors">
                      {EMAIL}
                    </span>
                  </span>
                </a>

                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-2xl border border-border bg-background px-4 py-3 hover:border-accent/40 transition-colors"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-card border border-border text-accent">
                    <WhatsappIcon className="h-4 w-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[10px] uppercase tracking-widest text-muted">
                      WhatsApp
                    </span>
                    <span className="block text-sm truncate group-hover:text-accent transition-colors">
                      {PHONE_DISPLAY}
                    </span>
                  </span>
                </a>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 px-5 py-4 border-t border-border">
              <span className="text-[10px] uppercase tracking-widest text-muted">
                Social
              </span>
              <div className="flex items-center gap-1">
                {SOCIALS.map(({ name, href, Icon }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-muted hover:text-accent hover:bg-background transition-colors"
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        aria-expanded={open}
        aria-label={open ? "Close chat" : "Open chat"}
        onClick={() => setOpen((v) => !v)}
        whileTap={{ scale: 0.94 }}
        className="relative flex h-10 w-10 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-transparent border border-gray-300 hover:border-gray-200 transition-colors"
      >
        <svg width="0" height="0" aria-hidden className="absolute">
          <defs>
            <linearGradient id="chat-widget-icon" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="45%" stopColor="#c5ff4d" />
              <stop offset="100%" stopColor="#c084fc" />
            </linearGradient>
          </defs>
        </svg>
        {open ? (
          <X
            className="h-4 w-4 sm:h-5 sm:w-5"
            stroke="url(#chat-widget-icon)"
          />
        ) : (
          <MessageCircle
            className="h-4 w-4 sm:h-5 sm:w-5"
            stroke="url(#chat-widget-icon)"
            fill="url(#chat-widget-icon)"
          />
        )}
      </motion.button>
    </div>
  );
}
