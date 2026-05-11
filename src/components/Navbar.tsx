"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Plus, X } from "lucide-react";
import Link from "next/link";
import { PROJECTS } from "@/data/projects";
import { cn } from "@/lib/utils";
import {
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
} from "@/components/SocialIcons";

type NavLink = {
  label: string;
  href: string;
  expandable: boolean;
  sub?: { label: string; href: string }[];
};

const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/", expandable: false },
  { label: "About Me", href: "/#about", expandable: false },
  {
    label: "Services",
    href: "/#services",
    expandable: true,
    sub: [
      { label: "Full-Stack Development", href: "/#services" },
      { label: "Backend Engineering", href: "/#services" },
      { label: "AI Integration", href: "/#services" },
      { label: "Mobile Apps", href: "/#services" },
    ],
  },
  {
    label: "Portfolio",
    href: "/projects",
    expandable: true,
    sub: [
      { label: "All Projects", href: "/projects" },
      ...PROJECTS.map((p) => ({ label: p.title, href: `/projects/${p.slug}` })),
    ],
  },
  {
    label: "Blog",
    href: "/blog",
    expandable: true,
    sub: [
      { label: "All Posts", href: "/blog" },
      { label: "Engineering", href: "/blog?tag=engineering" },
      { label: "AI", href: "/blog?tag=ai" },
    ],
  },
  { label: "Contact", href: "/#contact", expandable: false },
];

function Logo() {
  return (
    <Link href="/" className="group flex flex-col leading-none">
      <span className="font-display font-bold text-lg tracking-tight group-hover:text-accent transition-colors">
        Jewel Mia<span className="text-accent">.</span>
      </span>
      <span className="text-[10px] uppercase tracking-[0.2em] text-muted mt-1">
        Software Engineer
      </span>
    </Link>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 px-6 lg:px-16 transition-all duration-500",
          scrolled
            ? "bg-background/70 backdrop-blur-xl border-b border-border/50 py-2"
            : "bg-transparent py-4"
        )}
      >
        <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-4">
          <Logo />

          <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/40 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </span>
            <span className="text-xs uppercase tracking-widest text-muted">
              Available for Projects
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/#contact"
              className="group hidden sm:inline-flex items-center gap-3 pl-5 pr-1.5 py-1.5 rounded-full border border-border bg-card/40 backdrop-blur-sm hover:border-accent/50 hover:bg-card transition-all"
            >
              <span className="text-sm font-medium">Let&apos;s Talk</span>
              <span className="w-9 h-9 rounded-full bg-foreground text-background flex items-center justify-center group-hover:bg-accent transition-colors overflow-hidden relative">
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-4 group-hover:-translate-y-4" />
                <ArrowUpRight className="w-4 h-4 absolute transition-transform duration-300 -translate-x-4 translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0" />
              </span>
            </Link>
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="group relative w-12 h-12 rounded-full border border-border bg-card/40 backdrop-blur-sm flex items-center justify-center hover:border-accent hover:bg-accent transition-all overflow-hidden"
            >
              <span className="flex flex-col gap-[5px] transition-colors group-hover:[&>span]:bg-background">
                <span className="block w-5 h-px bg-current transition-all duration-300 group-hover:w-3 group-hover:translate-x-2" />
                <span className="block w-5 h-px bg-current" />
                <span className="block w-5 h-px bg-current transition-all duration-300 group-hover:w-3" />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-60 bg-background"
          >
            {/* Top bar */}
            <div className="absolute top-0 left-0 right-0 h-24 px-6 lg:px-16 flex items-center justify-between max-w-[1600px] mx-auto">
              <Logo />
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:border-accent hover:text-accent transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Split layout */}
            <div className="h-full pt-32 pb-10 px-6 lg:px-16 max-w-[1600px] mx-auto grid lg:grid-cols-2 gap-10 lg:gap-20 overflow-y-auto">
              {/* LEFT — Nav links */}
              <nav className="flex flex-col">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + i * 0.06 }}
                    className="border-b border-border"
                  >
                    <div className="flex items-center justify-between py-5 group">
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="flex-1"
                      >
                        <span className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight uppercase group-hover:text-accent transition-colors">
                          {link.label}
                        </span>
                      </Link>
                      {link.expandable && (
                        <button
                          onClick={() =>
                            setExpanded(expanded === link.label ? null : link.label)
                          }
                          aria-label={`Expand ${link.label}`}
                          className="ml-4 p-2 -m-2"
                        >
                          <Plus
                            className={cn(
                              "w-6 h-6 text-muted hover:text-accent transition-all",
                              expanded === link.label && "rotate-45 text-accent"
                            )}
                          />
                        </button>
                      )}
                    </div>

                    <AnimatePresence>
                      {link.expandable && expanded === link.label && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <ul className="pb-5 pl-2 space-y-3">
                            {link.sub?.map((s) => (
                              <li key={s.label}>
                                <Link
                                  href={s.href}
                                  onClick={() => setOpen(false)}
                                  className="text-muted hover:text-accent transition-colors text-sm uppercase tracking-widest"
                                >
                                  — {s.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </nav>

              {/* RIGHT — Get in Touch */}
              <motion.div
                initial={{ x: 30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="lg:pl-10 lg:border-l border-border"
              >
                <h3 className="font-display text-3xl sm:text-4xl font-bold tracking-tight uppercase mb-12">
                  Get in Touch
                </h3>

                <div className="space-y-8">
                  <div>
                    <div className="text-xs uppercase tracking-widest text-muted mb-2">Phone</div>
                    <a
                      href="tel:+8801684321082"
                      className="text-xl font-medium hover:text-accent transition-colors"
                    >
                      +880 1684-321082
                    </a>
                  </div>

                  <div>
                    <div className="text-xs uppercase tracking-widest text-muted mb-2">Email</div>
                    <a
                      href="mailto:jewelmia.dev@gmail.com"
                      className="text-xl font-medium hover:text-accent transition-colors"
                    >
                      jewelmia.dev@gmail.com
                    </a>
                  </div>

                  <div>
                    <div className="text-xs uppercase tracking-widest text-muted mb-2">Address</div>
                    <p className="text-xl font-medium">Dhaka, Bangladesh</p>
                  </div>

                  <div>
                    <div className="text-xs uppercase tracking-widest text-muted mb-4">Follow Us</div>
                    <div className="flex items-center gap-3">
                      {[
                        { Icon: TwitterIcon, href: "#" },
                        { Icon: LinkedinIcon, href: "#" },
                        { Icon: GithubIcon, href: "#" },
                        { Icon: InstagramIcon, href: "#" },
                      ].map(({ Icon, href }, i) => (
                        <a
                          key={i}
                          href={href}
                          className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-accent hover:text-background hover:border-accent transition-colors"
                        >
                          <Icon className="w-4 h-4" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
