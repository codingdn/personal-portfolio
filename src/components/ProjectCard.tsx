import type { Project } from '@/types'
import githubSvg from '@/assets/github.svg?url'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group border border-[#E5E5E5] dark:border-[#2a2a2a] rounded-lg p-5 bg-white dark:bg-[#1a1a1a] hover:border-[#C2410C] dark:hover:border-[#C2410C] transition-colors duration-150 flex flex-col gap-3 min-h-[180px]">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-medium text-[#111111] dark:text-[#f5f5f5] group-hover:text-[#C2410C] transition-colors duration-150 text-sm leading-snug">
          {project.title}
        </h3>
        <span className="text-xs text-[#737373] dark:text-[#a3a3a3] shrink-0 pt-px">{project.year}</span>
      </div>

      <p className="text-sm text-[#737373] dark:text-[#a3a3a3] leading-relaxed flex-1">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {project.tags.map(tag => (
          <span
            key={tag}
            className="text-xs px-2 py-0.5 rounded-full bg-[#F5F5F5] dark:bg-[#262626] text-[#737373] dark:text-[#a3a3a3]"
          >
            {tag}
          </span>
        ))}
      </div>

      {(project.github ?? project.live) && (
        <div className="flex items-center gap-4 pt-2 border-t border-[#F0F0F0] dark:border-[#252525]">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-xs text-[#737373] dark:text-[#a3a3a3] hover:text-[#111111] dark:hover:text-[#f5f5f5] transition-colors duration-150"
              aria-label={`${project.title} source code`}
            >
              <img src={githubSvg} alt="" className="w-3.5 h-3.5 opacity-50 dark:invert" />
              Code
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-[#737373] dark:text-[#a3a3a3] hover:text-[#111111] dark:hover:text-[#f5f5f5] transition-colors duration-150"
            >
              Live →
            </a>
          )}
        </div>
      )}
    </article>
  )
}
