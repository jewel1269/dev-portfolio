import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <main className="relative">
      <Navbar />
      <section className="relative min-h-screen flex items-center px-6 lg:px-16 overflow-hidden">
        <div className="absolute top-1/3 -left-40 w-125 h-125 bg-accent/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="relative max-w-[1600px] mx-auto w-full">
          <div className="text-sm uppercase tracking-widest text-muted mb-6 flex items-center gap-3">
            <span className="w-10 h-px bg-accent" />
            Error 404
          </div>
          <h1 className="font-display text-7xl sm:text-8xl lg:text-9xl font-bold leading-[0.95] tracking-tighter mb-8">
            Page not <span className="gradient-text">found.</span>
          </h1>
          <p className="text-xl text-muted max-w-xl leading-relaxed mb-12">
            The page you&apos;re looking for doesn&apos;t exist or has moved.
            Let&apos;s get you back on track.
          </p>
          <Link
            href="/"
            className="group inline-flex items-center gap-3 px-7 py-4 rounded-full border border-border hover:border-accent transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm uppercase tracking-widest font-medium">Back Home</span>
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
