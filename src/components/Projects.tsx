import { projects } from '@/data/projects'
import ProjectCard from '@/components/ProjectCard'

export default function Projects() {
  return (
    <section className="px-4 py-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-medium text-[#111111] dark:text-[#f5f5f5]">Projects</h1>
        <p className="mt-1.5 text-sm text-[#737373] dark:text-[#a3a3a3] mb-10">
          Things I&apos;ve built and experimented with.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map(project => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
