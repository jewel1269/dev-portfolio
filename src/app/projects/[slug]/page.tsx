import { notFound } from "next/navigation";
import {
  PROJECTS,
  getAdjacentProjects,
  getProjectBySlug,
} from "@/data/projects";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectDetailContent from "./ProjectDetailContent";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} — Case Study | Jewel Mia`,
    description: project.tagline,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const { prev, next } = getAdjacentProjects(slug);

  return (
    <main className="relative">
      <Navbar />
      <ProjectDetailContent project={project} prev={prev} next={next} />
      <Footer />
    </main>
  );
}
