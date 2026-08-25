import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import MarqueeBanner from "@/components/MarqueeBanner";
import Footer from "@/components/Footer";
import { SITE_DESCRIPTION, SITE_URL } from "@/lib/site";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Jewel Mia",
  url: SITE_URL,
  jobTitle: "Software Engineer",
  description: SITE_DESCRIPTION,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dhaka",
    addressCountry: "BD",
  },
  sameAs: [
    "https://github.com/jewel1269",
    "https://www.linkedin.com/in/jewel-mia",
    "https://x.com/jewelmia2330",
    "https://www.facebook.com/jewel2331",
    "https://learnwithjewel.com",
  ],
};

export default function Home() {
  return (
    <main className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Experience />
      <Portfolio />
      <Skills />
      <Contact />
      <MarqueeBanner />
      <Footer />
    </main>
  );
}
