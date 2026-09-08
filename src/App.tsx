import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Github, LockKeyhole } from "lucide-react"
import { ArchitectureModel, ProjectSketch } from "./components/ArchitectureModel"
import { projects, featuredProjects, sourceUrl } from "./data/projects"
import { ProjectLibrary } from "./components/ProjectLibrary"
import { useScrollStory } from "./hooks/useScrollStory"

const chapters = ["The intent", "The structure", "The system"]

function BrandMark() {
  return <svg width="24" height="26" viewBox="0 0 24 26" fill="none" aria-hidden="true"><path d="M2 7L12 2L22 7L12 12L2 7ZM2 13L12 18L22 13M2 19L12 24L22 19" stroke="currentColor" strokeWidth="1.7" /></svg>
}

export default function App() {
  const rootRef = useScrollStory()
  const privateCount = projects.filter(project => project.private).length

  return (
    <div className="portfolio" ref={rootRef}>
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="reading-progress" aria-hidden="true" />
      <header className="site-header">
        <a className="brand" href="#top" aria-label="flundar — back to the top"><BrandMark /><span>flundar<span className="brand-dot">.</span></span></a>
        <span className="header-role">SOFTWARE ARCHITECT / SYSTEM DESIGN</span>
        <nav aria-label="Main navigation"><a href="#work">Work <span>{String(projects.length).padStart(2, "0")}</span></a><a href="#about">Approach</a><a href="#contact">Let’s talk <ArrowUpRight size={15} aria-hidden="true" /></a></nav>
      </header>

      <main id="main">
        <section className="opening" id="top" aria-label="From complexity to a coherent system">
          <div className="opening-stage">
            <div className="opening-frame">
              <div className="opening-copy">
                <div className="opening-panel" id="intent">
                  <p className="eyebrow"><span className="signal-dot" /> FLUNDAR / SOFTWARE ARCHITECT</p>
                  <h1>Complexity,<br />meet <em>clarity.</em></h1>
                  <p className="opening-description">I design the structure behind the software.<br />Clear boundaries. Connected systems.<br />Room for what comes next.</p>
                  <a className="inline-link" href="#all-projects">Explore {projects.length} projects <ArrowUpRight size={18} aria-hidden="true" /></a>
                </div>
                <div className="opening-panel" id="structure">
                  <p className="eyebrow">01 / DEFINE THE BOUNDARIES</p>
                  <h2>Every part.<br /><em>A purpose.</em></h2>
                  <p className="opening-description">An interface, a service, a data layer.<br />Give each a clear responsibility.<br />Make the boundaries intentional.</p>
                  <span className="panel-footnote">LESS COUPLING. MORE CLARITY.</span>
                </div>
                <div className="opening-panel" id="system">
                  <p className="eyebrow">02 / CONNECT THE THINKING</p>
                  <h2>Many parts.<br /><em>One system.</em></h2>
                  <p className="opening-description">Architecture is how the pieces work together.<br />I turn product requirements into systems<br />that are easier to build on.</p>
                  <a className="inline-link" href="#work">See it in practice <ArrowDown size={18} aria-hidden="true" /></a>
                </div>
              </div>
              <ArchitectureModel />
            </div>
            <div className="opening-bottom">
              <div className="chapter-nav" aria-label="Story chapters">{chapters.map((chapter, index) => <button type="button" data-chapter={index} key={chapter} aria-current={index === 0 ? "true" : "false"}><span>0{index}</span>{chapter}</button>)}</div>
              <span className="scroll-invitation">SCROLL TO UNFOLD <ArrowDown size={15} aria-hidden="true" /></span>
            </div>
          </div>
        </section>

        <section id="work" className="work" aria-labelledby="work-title">
          <div className="work-stage">
            <div className="work-heading page-width">
              <div><p className="eyebrow">03 / SELECTED WORK</p><h2 id="work-title">Thinking, <em>built.</em></h2></div>
              <div className="work-heading-aside"><p>{featuredProjects.length} featured systems.<br />{projects.length} projects in the complete index.</p><a className="subtle-link" href="#all-projects">Explore all projects <ArrowUpRight size={15} aria-hidden="true" /></a></div>
            </div>
            <div className="work-viewport page-width">
              <div className="work-track">
                {featuredProjects.map((project, index) => (
                  <article className="project" key={project.repo} id={`project-${index + 1}`}>
                    <ProjectSketch index={index} labels={project.diagram} variant={project.sketch} symbol={project.name[0]} />
                    <div className="project-body">
                      <div className="project-meta"><span>{String(index + 1).padStart(2, "0")} / {project.category}</span><span className="visibility">{project.private ? <LockKeyhole size={11} aria-hidden="true" /> : <span className="public-dot" />}{project.private ? "Private" : "Public"}</span></div>
                      <h3>{project.name}</h3>
                      <p className="project-description">{project.description}</p>
                      <div className="project-bottom"><ul aria-label="Technologies">{project.stack.map(item => <li key={item}>{item}</li>)}</ul>{project.private ? <span className="private-note">Closed source</span> : <a className="source-link" href={sourceUrl(project)} target="_blank" rel="noreferrer" aria-label={`View ${project.name} source on GitHub`}><Github size={16} aria-hidden="true" /><ArrowUpRight size={15} aria-hidden="true" /></a>}</div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
            <div className="work-footer page-width">
              <div className="work-controls"><span className="work-counter" aria-hidden="true"><span className="work-count-current">01</span><span> / {String(featuredProjects.length).padStart(2, "0")}</span></span><button type="button" data-gallery-previous aria-label="Previous project"><ArrowLeft size={17} /></button><button type="button" data-gallery-next aria-label="Next project"><ArrowRight size={17} /></button></div>
              <span className="work-source-note">FULL INDEX · {projects.length - privateCount} PUBLIC / {privateCount} PRIVATE</span>
              <a className="subtle-link" href="#all-projects">All {projects.length} projects <ArrowDown size={15} aria-hidden="true" /></a>
            </div>
          </div>
        </section>

        <ProjectLibrary />

        <section id="about" className="approach" aria-labelledby="approach-title">
          <div className="page-width">
            <div className="section-kicker"><p className="eyebrow">04 / THE APPROACH</p><span>THE BIG PICTURE. THE SMALL DETAILS.</span></div>
            <h2 id="approach-title">Good architecture<br />makes room<br />for <span className="statement-word"><span>change.</span><span aria-hidden="true">change.</span></span></h2>
            <div className="approach-detail"><div className="about-intro"><p>I’m flundar, a software architect who stays close to the implementation.</p><p>From web platforms to desktop tools, I work through the decisions that shape a system: what belongs together, what stays independent, and how information moves between them.</p><a className="inline-link" href="https://github.com/flundar" target="_blank" rel="noreferrer">A closer look at my work <ArrowUpRight size={17} aria-hidden="true" /></a></div><dl className="principles"><div><dt><span>01</span>Understand the problem.</dt><dd>Start with the product, the people, and the constraints.</dd></div><div><dt><span>02</span>Make the tradeoffs clear.</dt><dd>Choose boundaries and technologies for a reason.</dd></div><div><dt><span>03</span>Leave room to evolve.</dt><dd>Build a foundation the next decision can build on.</dd></div></dl></div>
          </div>
        </section>

        <section id="contact" className="contact" aria-labelledby="contact-title">
          <div className="page-width">
            <div className="section-kicker"><p className="eyebrow">05 / THE NEXT CHAPTER</p><span>START WITH A CONVERSATION.</span></div>
            <div className="contact-main"><h2 id="contact-title">Let’s make<br />it <em>make sense.</em></h2><a className="contact-arrow" href="mailto:mail@flundar.com" aria-label="Email flundar"><ArrowUpRight strokeWidth={1} aria-hidden="true" /></a></div>
            <a className="contact-email" href="mailto:mail@flundar.com">mail@flundar.com <ArrowUpRight size={22} aria-hidden="true" /></a>
            <div className="contact-bottom"><span>SOFTWARE ARCHITECTURE / SYSTEM DESIGN</span><a href="#top">Back to the beginning <ArrowUpRight size={15} aria-hidden="true" /></a></div>
          </div>
        </section>
      </main>
      <footer className="site-footer page-width"><a className="brand" href="#top"><BrandMark /><span>flundar.</span></a><span>© {new Date().getFullYear()} flundar</span><a href="https://github.com/flundar" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={14} aria-hidden="true" /></a></footer>
    </div>
  )
}
