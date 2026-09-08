import type { CSSProperties } from "react"

const cells = [
  { x: 0, y: -64 }, { x: -64, y: -32 }, { x: 64, y: -32 },
  { x: -128, y: 0 }, { x: 0, y: 0 }, { x: 128, y: 0 },
  { x: -64, y: 32 }, { x: 64, y: 32 }, { x: 0, y: 64 },
]

export function ArchitectureModel() {
  return (
    <div className="architecture-model" aria-hidden="true">
      <svg viewBox="0 0 640 640" fill="none">
        <defs>
          <pattern id="draft-grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="currentColor" opacity=".18" />
          </pattern>
        </defs>
        <rect x="0" y="0" width="640" height="640" fill="url(#draft-grid)" />
        <g className="draft-guides" stroke="currentColor" strokeWidth=".8" opacity=".23">
          <path d="M40 320H600M320 40V600" strokeDasharray="4 7" />
          <circle cx="320" cy="320" r="246" strokeDasharray="2 9" />
          <path d="M74 92V74H92M548 74H566V92M566 548V566H548M92 566H74V548" />
          <path d="M90 474L320 589L550 474M90 164L320 49L550 164" />
        </g>
        <g className="model-links" stroke="currentColor" strokeWidth="1" strokeDasharray="4 5">
          <path d="M192 145V443M320 81V505M448 145V443" />
          <path d="M256 177V473M384 177V473" />
        </g>
        <g className="model-assembly">
          {[2, 1, 0].map(layer => (
            <g key={layer} className={`model-layer model-layer-${layer}`}>
              {cells.map((cell, index) => (
                <g key={index} transform={`translate(${320 + cell.x} ${225 + layer * 55 + cell.y})`} className={`model-cell ${layer === 0 && index === 4 ? "model-core" : ""}`}>
                  <path className="cube-left" d="M-58 0L0 29V63L-58 34Z" />
                  <path className="cube-right" d="M58 0L0 29V63L58 34Z" />
                  <path className="cube-top" d="M0-29L58 0L0 29L-58 0Z" />
                  {layer === 0 && index === 4 && <path d="M-13 0H13M0-7V7" className="core-cross" />}
                </g>
              ))}
            </g>
          ))}
        </g>
        <g className="model-annotations" fill="currentColor" fontSize="10" fontFamily="monospace" letterSpacing="1">
          <text x="42" y="37">FIG. 01 — SYSTEM ANATOMY</text>
          <text x="440" y="605">FORM / FLOW / FUNCTION</text>
          <g className="layer-label layer-label-top"><path d="M450 162H535" stroke="currentColor" /><text x="490" y="148">INTERFACE</text></g>
          <g className="layer-label layer-label-mid"><path d="M450 320H535" stroke="currentColor" /><text x="490" y="307">LOGIC</text></g>
          <g className="layer-label layer-label-base"><path d="M450 458H535" stroke="currentColor" /><text x="490" y="482">DATA</text></g>
        </g>
      </svg>
      <div className="model-coordinate"><span>↗ ISOMETRIC VIEW</span><span>01 : 01</span></div>
    </div>
  )
}

export function ProjectSketch({ index, labels = ["INPUT", "LOGIC", "OUTPUT"], variant = "modules", symbol = "F" }: {
  index: number
  labels?: [string, string, string]
  variant?: "modules" | "orbit" | "wave"
  symbol?: string
}) {
  return (
    <div className={`project-sketch sketch-${index % 4}`} aria-hidden="true">
      <span className="sketch-caption">FIG. {String(index + 1).padStart(2, "0")} / CONCEPT SKETCH</span>
      {variant === "wave" ? (
        <div className="wave-sketch">{Array.from({ length: 33 }, (_, i) => <i key={i} style={{ "--bar": `${16 + Math.abs(Math.sin(i * 0.61) * Math.cos(i * 0.23)) * 85}%` } as CSSProperties} />)}</div>
      ) : variant === "orbit" ? (
        <div className="orbit-sketch"><i /><i /><i /><span className="orbit-core">{symbol}</span><b className="orbit-node node-a" /><b className="orbit-node node-b" /><b className="orbit-node node-c" /></div>
      ) : (
        <div className="module-sketch"><span /><span /><span /><span /><span /><span /></div>
      )}
      <div className="sketch-flow">{labels.map(label => <span key={label}>{label}</span>)}</div>
    </div>
  )
}
