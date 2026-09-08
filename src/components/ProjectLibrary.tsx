import { useState } from "react"
import { ArrowUpRight, LockKeyhole, Search, X } from "lucide-react"
import { projects, sourceUrl } from "../data/projects"
import { filterProjects } from "../lib/projectSearch"

const filters = ["All", "Public", "Private"] as const

export function ProjectLibrary() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All")
  const [query, setQuery] = useState("")
  const visibleProjects = filterProjects(projects, query, filter)
  const clear = () => { setQuery(""); setFilter("All") }

  return (
    <section className="project-library" id="all-projects" aria-labelledby="library-title">
      <div className="page-width">
        <div className="library-heading"><div><p className="eyebrow">THE PROJECT INDEX</p><h2 id="library-title">More than <em>a few highlights.</em></h2></div><span className="library-total">{projects.length}<span>PROJECTS & SYSTEMS</span></span></div>
        <p className="library-intro">Platforms, desktop applications, infrastructure, and integrations. Public repositories and private work, together in one place.</p>
        <div className="library-tools">
          <div className="library-filters" role="group" aria-label="Filter projects by source visibility">{filters.map(item => <button key={item} type="button" aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}<span>{item === "All" ? projects.length : projects.filter(project => item === "Private" ? project.private : !project.private).length}</span></button>)}</div>
          <div className="library-search"><Search size={16} aria-hidden="true" /><label className="sr-only" htmlFor="project-search">Search projects or technologies</label><input id="project-search" type="search" placeholder="Search projects or technologies" value={query} onChange={event => setQuery(event.target.value)} /></div>
        </div>
        <p className="library-result-count" role="status">{visibleProjects.length} of {projects.length} projects</p>
        {visibleProjects.length ? <div className="library-grid">{visibleProjects.map(project => <article className="library-project" key={`${project.owner ?? "flundar"}/${project.repo}`}>
          <div className="library-project-top"><p>{project.category}</p><span className="visibility">{project.private ? <LockKeyhole size={11} aria-hidden="true" /> : <span className="public-dot" />}{project.private ? "Private" : "Public"}</span></div>
          <h3>{project.name}</h3><p className="library-project-description">{project.description}</p>
          <div className="library-project-bottom"><ul aria-label="Technologies">{project.stack.map(item => <li key={item}>{item}</li>)}</ul>{project.private ? <span className="private-note">Closed source</span> : <a href={sourceUrl(project)} target="_blank" rel="noreferrer" aria-label={`View ${project.name} source on GitHub`}>Source <ArrowUpRight size={14} aria-hidden="true" /></a>}</div>
        </article>)}</div> : <div className="library-empty"><h3>No matching projects.</h3><p>Try another name or technology, or reset the filters.</p><button type="button" onClick={clear}><X size={14} aria-hidden="true" /> Reset filters</button></div>}
      </div>
    </section>
  )
}
