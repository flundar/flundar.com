import { useEffect, useRef } from "react"

const clamp = (value: number) => Math.max(0, Math.min(1, value))
const ramp = (value: number, start: number, end: number) => clamp((value - start) / (end - start))

export function useScrollStory() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const storyMedia = window.matchMedia("(min-height: 680px) and (prefers-reduced-motion: no-preference)")
    const galleryMedia = window.matchMedia("(min-width: 1000px) and (min-height: 760px) and (prefers-reduced-motion: no-preference)")
    const reducedMedia = window.matchMedia("(prefers-reduced-motion: reduce)")
    const opening = root.querySelector<HTMLElement>(".opening")!
    const panels = Array.from(root.querySelectorAll<HTMLElement>(".opening-panel"))
    const chapterButtons = Array.from(root.querySelectorAll<HTMLButtonElement>("[data-chapter]"))
    const work = root.querySelector<HTMLElement>(".work")!
    const viewport = root.querySelector<HTMLElement>(".work-viewport")!
    const track = root.querySelector<HTMLElement>(".work-track")!
    const cards = Array.from(track.querySelectorAll<HTMLElement>(".project"))
    const count = root.querySelector<HTMLElement>(".work-count-current")!
    const next = root.querySelector<HTMLButtonElement>("[data-gallery-next]")!
    const previous = root.querySelector<HTMLButtonElement>("[data-gallery-previous]")!
    const approach = root.querySelector<HTMLElement>(".approach")!
    const contact = root.querySelector<HTMLElement>(".contact")!
    let frame = 0
    let travel = 0
    let scrollDistance = 0
    let positions: number[] = []
    let currentCard = 0
    let currentPanel = -1

    const update = () => {
      frame = 0
      const height = window.innerHeight
      const y = window.scrollY
      const openingBounds = opening.getBoundingClientRect()
      const workBounds = work.getBoundingClientRect()
      const approachBounds = approach.getBoundingClientRect()
      const contactBounds = contact.getBoundingClientRect()
      const range = document.documentElement.scrollHeight - height
      const openingProgress = storyMedia.matches ? clamp(-openingBounds.top / Math.max(1, openingBounds.height - height)) : 0
      const workProgress = galleryMedia.matches ? clamp(-workBounds.top / Math.max(1, scrollDistance)) : 0
      const translation = workProgress * travel
      const activePanel = openingProgress < 0.32 ? 0 : openingProgress < 0.68 ? 1 : 2
      const split = ramp(openingProgress, 0.12, 0.44) * (1 - ramp(openingProgress, 0.72, 1) * 0.65)
      const dark = ramp(openingProgress, 0.23, 0.42)

      root.style.setProperty("--page-progress", String(clamp(y / Math.max(1, range))))
      opening.style.setProperty("--split", String(storyMedia.matches ? split : 0.4))
      opening.style.setProperty("--connected", String(storyMedia.matches ? ramp(openingProgress, 0.46, 0.8) : 1))
      opening.style.setProperty("--turn", `${storyMedia.matches ? -7 + openingProgress * 14 : 0}deg`)
      opening.style.setProperty("--surface", `${Math.round(239 - dark * 215)} ${Math.round(238 - dark * 212)} ${Math.round(232 - dark * 210)}`)
      opening.style.setProperty("--ink", `${Math.round(29 + dark * 210)} ${Math.round(32 + dark * 206)} ${Math.round(27 + dark * 205)}`)
      opening.style.setProperty("--opening-progress", String(openingProgress))
      panels.forEach((panel, index) => {
        const opacity = index === 0 ? 1 - ramp(openingProgress, 0.18, 0.3)
          : index === 1 ? ramp(openingProgress, 0.32, 0.44) * (1 - ramp(openingProgress, 0.58, 0.67))
          : ramp(openingProgress, 0.69, 0.82)
        panel.style.setProperty("--panel-opacity", String(storyMedia.matches ? opacity : 1))
        panel.style.setProperty("--panel-y", `${storyMedia.matches ? (1 - opacity) * 32 : 0}px`)
        panel.inert = storyMedia.matches && activePanel !== index
      })
      if (currentPanel !== activePanel) {
        currentPanel = activePanel
        chapterButtons.forEach((button, index) => button.setAttribute("aria-current", String(index === activePanel)))
      }
      work.style.setProperty("--track-x", `${-translation}px`)
      work.style.setProperty("--work-progress", String(workProgress))
      if (galleryMedia.matches) {
        currentCard = positions.reduce((nearest, position, index) => Math.abs(position - translation) < Math.abs(positions[nearest] - translation) ? index : nearest, 0)
        if (workProgress > 0.999) currentCard = cards.length - 1
      }
      count.textContent = String(currentCard + 1).padStart(2, "0")
      previous.disabled = currentCard === 0
      next.disabled = currentCard === cards.length - 1
      approach.style.setProperty("--statement-progress", String(reducedMedia.matches ? 1 : clamp((height * 0.8 - approachBounds.top) / (height * 0.8))))
      contact.style.setProperty("--contact-progress", String(reducedMedia.matches ? 1 : clamp((height - contactBounds.top) / (height * 0.75))))
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }
    const measure = () => {
      root.classList.toggle("story-enabled", storyMedia.matches)
      root.classList.toggle("gallery-enabled", galleryMedia.matches)
      travel = galleryMedia.matches ? Math.max(0, track.scrollWidth - track.clientWidth) : 0
      scrollDistance = travel * 0.85
      positions = cards.map(card => Math.min(travel, card.offsetLeft))
      work.style.setProperty("--work-distance", `${scrollDistance}px`)
      schedule()
    }
    const goToCard = (index: number, instant = false) => {
      if (!galleryMedia.matches) return
      const position = positions[Math.max(0, Math.min(index, cards.length - 1))]
      const top = window.scrollY + work.getBoundingClientRect().top + (travel ? position / travel * scrollDistance : 0)
      window.scrollTo({ top, behavior: instant || reducedMedia.matches ? "instant" : "smooth" })
    }
    const onNext = () => goToCard(currentCard + 1)
    const onPrevious = () => goToCard(currentCard - 1)
    const onFocus = (event: FocusEvent) => {
      if (!(event.target instanceof HTMLElement)) return
      const card = event.target.closest<HTMLElement>(".project")
      if (card) goToCard(cards.indexOf(card), true)
    }
    const onChapter = (event: MouseEvent) => {
      const button = event.currentTarget as HTMLButtonElement
      const index = Number(button.dataset.chapter)
      if (!storyMedia.matches) {
        panels[index].scrollIntoView({ behavior: "smooth", block: "center" })
        return
      }
      const bounds = opening.getBoundingClientRect()
      window.scrollTo({ top: window.scrollY + bounds.top + [0, 0.49, 0.94][index] * (bounds.height - window.innerHeight), behavior: "smooth" })
    }
    const resizeObserver = new ResizeObserver(measure)
    resizeObserver.observe(viewport)
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", measure)
    storyMedia.addEventListener("change", measure)
    galleryMedia.addEventListener("change", measure)
    reducedMedia.addEventListener("change", measure)
    next.addEventListener("click", onNext)
    previous.addEventListener("click", onPrevious)
    track.addEventListener("focusin", onFocus)
    chapterButtons.forEach(button => button.addEventListener("click", onChapter))
    measure()
    return () => {
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", measure)
      storyMedia.removeEventListener("change", measure)
      galleryMedia.removeEventListener("change", measure)
      reducedMedia.removeEventListener("change", measure)
      next.removeEventListener("click", onNext)
      previous.removeEventListener("click", onPrevious)
      track.removeEventListener("focusin", onFocus)
      chapterButtons.forEach(button => button.removeEventListener("click", onChapter))
      panels.forEach(panel => { panel.inert = false })
      root.classList.remove("story-enabled", "gallery-enabled")
    }
  }, [])

  return rootRef
}
