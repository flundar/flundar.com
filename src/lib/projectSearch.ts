import type { Project } from "../data/projects"

export type ProjectVisibility = "All" | "Public" | "Private"

function normalize(value: string) {
  return value.toLowerCase().normalize("NFKD").replace(/\p{M}/gu, "").replace(/ı/g, "i")
}

export function filterProjects(projects: readonly Project[], query: string, visibility: ProjectVisibility) {
  const search = normalize(query.trim())
  return projects.filter(project => {
    const matchesVisibility = visibility === "All" || (visibility === "Private" ? project.private : !project.private)
    const text = [project.name, project.category, project.description, project.repo, project.owner ?? "flundar", ...project.stack].join(" ")
    return matchesVisibility && normalize(text).includes(search)
  })
}
