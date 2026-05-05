"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";

const CAL_LINK = "jewel-mia-goueyh/30min";

const CONTACTS = [
  { Icon: Mail, label: "Email", value: "jewelmia.dev@gmail.com", href: "mailto:jewelmia.dev@gmail.com" },
  { Icon: Phone, label: "Phone", value: "+880 1684-321082", href: "tel:+8801684321082" },
  { Icon: MapPin, label: "Location", value: "Dhaka, Bangladesh", href: "#" },
];

export default function Contact() {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: "30min" });
      cal("ui", {
        theme: "dark",
        cssVarsPerTheme: {
          dark: {
            "cal-bg": "#131313",
            "cal-bg-emphasis": "#1f1f1f",
            "cal-bg-muted": "#0b0b0b",
            "cal-brand": "#c5ff4d",
            "cal-text": "#ededed",
            "cal-text-emphasis": "#ffffff",
            "cal-text-muted": "#8a8a8a",
            "cal-border": "#1f1f1f",
            "cal-border-emphasis": "#2a2a2a",
          },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <section id="contact" className="relative py-32 px-6 lg:px-16 border-t border-border">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5 space-y-10">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-3 mb-6"
              >
                <span className="w-10 h-px bg-accent" />
                <span className="text-sm uppercase tracking-widest text-muted">Book a Call</span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
                className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight"
              >
                Got a project in <span className="gradient-text">mind?</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-muted text-lg mt-6 leading-relaxed"
              >
                Pick a time that works for you — 30 minutes, no pressure. We&apos;ll
                talk through your idea, scope, and timeline. Or reach me directly
                via the channels below.
              </motion.p>
            </div>

            <div className="space-y-4">
              {CONTACTS.map((c, i) => (
                <motion.a
                  key={c.label}
                  href={c.href}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="flex items-center gap-5 p-5 rounded-2xl border border-border bg-card/40 hover:bg-card hover:border-accent/40 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <c.Icon className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs uppercase tracking-widest text-muted">{c.label}</div>
                    <div className="font-medium">{c.value}</div>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-muted group-hover:text-accent group-hover:rotate-45 transition-all" />
                </motion.a>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-7 rounded-3xl border border-border bg-card overflow-hidden"
          >
            <div className="px-8 py-6 border-b border-border flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-widest text-muted mb-1">Schedule</div>
                <div className="font-display text-xl font-semibold">30-min Discovery Call</div>
              </div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                Available
              </div>
            </div>
            <div className="cal-wrapper">
              <Cal
                namespace="30min"
                calLink={CAL_LINK}
                style={{ width: "100%", height: "100%", minHeight: "600px" }}
                config={{ layout: "month_view", theme: "dark" }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
