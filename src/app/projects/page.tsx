import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectsContent from "./ProjectsContent";

export const metadata = {
  title: "Projects — Jewel Mia",
  description: "A selection of recent work across e-commerce, education, AI, and finance.",
};

export default function ProjectsIndex() {
  return (
    <main className="relative">
      <Navbar />
      <ProjectsContent />
      <Footer />
    </main>
  );
}
