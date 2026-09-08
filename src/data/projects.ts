export type Project = {
  name: string
  category: string
  description: string
  stack: string[]
  repo: string
  private?: boolean
  owner?: string
  diagram?: [string, string, string]
  sketch?: "modules" | "orbit" | "wave"
}

export const projects: Project[] = [
{
  "name": "AdSquad Platform",
  "category": "Campaign management platform",
  "description": "Campaign management connecting brands, agencies, and streamers, with operator workflows, pricing, reporting, and delivery integrations.",
  "stack": [
    "TypeScript",
    "Express",
    "PostgreSQL",
    "RabbitMQ"
  ],
  "repo": "adsquad-backend",
  "private": true,
  "owner": "AdSquadDevelopment",
  "diagram": [
    "PLAN",
    "DISPATCH",
    "MEASURE"
  ]
},
{
  "name": "Premate Finder",
  "category": "Gaming community platform",
  "description": "Player profiles, teammate lobbies, real-time lobby chat, crosshair discovery, and Riot account integration in one community application.",
  "stack": [
    "React",
    "TypeScript",
    "Express",
    "Socket.IO",
    "Prisma"
  ],
  "repo": "premate-finder",
  "sketch": "orbit",
  "private": true,
  "diagram": [
    "FIND",
    "CONNECT",
    "PLAY"
  ]
},
{
  "name": "MEKCRM",
  "category": "Business management software",
  "description": "A CRM with customer and lead management, appointments, activity reporting, representative workflows, and external lead integrations.",
  "stack": [
    "PHP",
    "JavaScript",
    "CRM"
  ],
  "repo": "MEKCRM",
  "private": true,
  "diagram": [
    "LEADS",
    "WORKFLOW",
    "REPORTS"
  ]
},
{
  "name": "AdSquad Pulse",
  "category": "Streaming intelligence",
  "description": "A streaming analytics dashboard with Kick and Twitch data collection, broadcast history, viewer measurements, and a separate crawler worker.",
  "stack": [
    "React",
    "TypeScript",
    "PostgreSQL",
    "Drizzle",
    "Playwright"
  ],
  "repo": "adsquad-pulse",
  "private": true,
  "owner": "AdSquadDevelopment",
  "diagram": [
    "COLLECT",
    "NORMALIZE",
    "ANALYZE"
  ]
},
{
  "name": "FLURDP",
  "category": "Remote desktop application",
  "description": "A desktop workspace for organizing RDP connections into folders, storing connection records in SQLite, and opening remote desktop sessions.",
  "stack": [
    "Electron",
    "SQLite",
    "Node.js",
    "SSH"
  ],
  "repo": "flurdp-new",
  "private": true,
  "diagram": [
    "ORGANIZE",
    "CONNECT",
    "CONTROL"
  ]
},
{
  "name": "Anizium",
  "category": "Video browsing application",
  "description": "An anime browsing interface with detail pages, sign-in, and a custom HLS video player, supported by an Express proxy layer.",
  "stack": [
    "React",
    "HLS.js",
    "Express",
    "Vite"
  ],
  "repo": "anizium-local-front",
  "private": true,
  "diagram": [
    "BROWSE",
    "SELECT",
    "WATCH"
  ]
},
{
  "name": "Campaign Dispatcher",
  "category": "Campaign delivery service",
  "description": "A dedicated campaign delivery service with eligibility checks, scheduled dispatching, queue publishing, and a monitoring dashboard.",
  "stack": [
    "TypeScript",
    "RabbitMQ",
    "Redis",
    "PostgreSQL"
  ],
  "repo": "campaign-dispatcher-microservice",
  "private": true,
  "owner": "AdSquadDevelopment"
},
{
  "name": "AdSquad OBS Overlay",
  "category": "Live broadcast integration",
  "description": "A React overlay for OBS browser sources, with a WebSocket service connecting broadcast graphics to the campaign delivery system.",
  "stack": [
    "React",
    "TypeScript",
    "WebSocket"
  ],
  "repo": "obs-overlay",
  "private": true,
  "owner": "AdSquadDevelopment"
},
{
  "name": "Stream Recorder",
  "category": "Media processing service",
  "description": "A queue-connected stream recording service with object-storage uploads and job status reporting, separated from the main application backend.",
  "stack": [
    "Node.js",
    "RabbitMQ",
    "S3",
    "PostgreSQL"
  ],
  "repo": "stream-recorder",
  "private": true,
  "owner": "AdSquadDevelopment"
},
{
  "name": "Stream Encoder",
  "category": "Media processing service",
  "description": "A dedicated media encoding worker with message-queue integration, object storage, and processing status reporting.",
  "stack": [
    "Node.js",
    "RabbitMQ",
    "S3"
  ],
  "repo": "stream-encoder",
  "private": true,
  "owner": "AdSquadDevelopment"
},
{
  "name": "AdSquad Status Service",
  "category": "Service monitoring",
  "description": "A standalone service for distributing status updates through a message queue, Redis, and real-time Socket.IO connections.",
  "stack": [
    "Express",
    "RabbitMQ",
    "Redis",
    "Socket.IO"
  ],
  "repo": "status-service",
  "private": true,
  "owner": "AdSquadDevelopment"
},
{
  "name": "AdSquad Kick Integration",
  "category": "Streaming platform integration",
  "description": "A backend for Kick channel resolution and chat message delivery, with session management, browser automation, and PostgreSQL storage.",
  "stack": [
    "TypeScript",
    "Fastify",
    "Playwright",
    "PostgreSQL"
  ],
  "repo": "adsquad-kick-bot",
  "private": true,
  "owner": "AdSquadDevelopment"
},
{
  "name": "Football Event Service",
  "category": "Live event integration",
  "description": "A match-event collector that sends goal and card events to the AdSquad backend to trigger relevant live-stream campaign workflows.",
  "stack": [
    "Node.js",
    "Playwright",
    "HTTP API"
  ],
  "repo": "microservice-football",
  "private": true
},
{
  "name": "Nodelabs Messaging Backend",
  "category": "Backend case study",
  "description": "A messaging backend case study with conversations, message search, scheduled delivery, background workers, caching, and queue consumers.",
  "stack": [
    "Node.js",
    "MongoDB",
    "RabbitMQ",
    "Redis",
    "Elasticsearch"
  ],
  "repo": "nodelabs-case",
  "private": true
},
{
  "name": "MikroTik Panel",
  "category": "Network administration",
  "description": "A web panel and API for MikroTik, with VPN connection management, RouterOS integration, and server-rendered administration views.",
  "stack": [
    "Node.js",
    "Express",
    "EJS",
    "MySQL",
    "RouterOS"
  ],
  "repo": "Mikrotik",
  "diagram": [
    "MANAGE",
    "ROUTE",
    "CONNECT"
  ]
},
{
  "name": "GMod Manager",
  "category": "Game server tooling",
  "description": "A React management interface for Garry’s Mod with a separate Node.js server component and application settings.",
  "stack": [
    "React",
    "Node.js",
    "Vite"
  ],
  "repo": "gmod-manager",
  "private": true
},
{
  "name": "Eightborn V Panel",
  "category": "Community portal",
  "description": "A community portal with account flows, forum sections, announcements, and a Prisma-backed data layer.",
  "stack": [
    "Next.js",
    "TypeScript",
    "Prisma",
    "NextAuth"
  ],
  "repo": "eightbornv-panel",
  "private": true
},
{
  "name": "Commerce & Order Management",
  "category": "Commerce application",
  "description": "A PHP storefront and administration area with product management, shopping-cart updates, order creation, and a checkout page.",
  "stack": [
    "PHP",
    "JavaScript",
    "SQL"
  ],
  "repo": "e-commerce",
  "private": true
},
{
  "name": "Microsoft Cloud Backup",
  "category": "Backup automation",
  "description": "A Node.js backup utility combining archive creation, scheduled jobs, Microsoft identity authentication, and Microsoft Graph integration.",
  "stack": [
    "Node.js",
    "Microsoft Graph",
    "MSAL",
    "Archiver"
  ],
  "repo": "backup-to-azure",
  "private": true
},
{
  "name": "DDTank Browser Client",
  "category": "Browser game integration",
  "description": "A browser-based DDTank client designed to launch the game without a separate Flash Player installation.",
  "stack": [
    "JavaScript",
    "Browser"
  ],
  "repo": "ddtank-from-browser"
},
  {
    name: "Bize Oyun Öner",
    category: "Community platform",
    description: "A game recommendation community with voting, discussions, playlists, and moderation tools. Integrates game discovery with Steam, Epic, and itch.io.",
    stack: ["Next.js", "TypeScript", "Prisma", "Redis"],
    repo: "bizeoyunoner.com",
    diagram: ["DISCOVER", "DISCUSS", "CURATE"],
    private: true,
  },
  {
    name: "FLUDPI",
    category: "Desktop application",
    description: "A cross-platform desktop app for DPI-related connectivity issues. Connection testing, custom profiles, and native integrations for macOS and Windows.",
    stack: ["Rust", "Tauri 2", "JavaScript"],
    repo: "FLUDPI",
    diagram: ["macOS", "PROFILES", "WINDOWS"],
    sketch: "orbit",
  },
  {
    name: "Flu SQL",
    category: "Developer tooling",
    description: "A desktop database workspace with connection management and a query interface, backed by dedicated PostgreSQL, MySQL, and MongoDB drivers.",
    stack: ["Rust", "Tauri", "TypeScript"],
    repo: "flu-sql",
    diagram: ["CONNECT", "QUERY", "EXPLORE"],
    private: true,
  },
  {
    name: "Discord GIF Maker",
    category: "Media processing application",
    description: "Turn videos into Discord profile and banner GIFs. A browser interface connects to an Express backend for cropping, conversion, and file-size optimization.",
    stack: ["Node.js", "Express", "FFmpeg"],
    repo: "discord-profile-gif-maker",
  },
  {
    name: "Hypnoflow",
    category: "Interactive audio application",
    description: "A browser audio application with layered sound synthesis, a mixer, listening modes, and a session timer. Combines ambient textures, rhythms, and melodies.",
    stack: ["React", "TypeScript", "Vite"],
    repo: "hypnoflow",
    private: true,
  },
  {
    name: "Roblox Piano Player",
    category: "Desktop & audio automation",
    description: "A macOS and Windows piano player supporting sheet notation, MIDI playback, and local audio-to-MIDI transcription, with tempo and transpose controls.",
    stack: ["Electron", "JavaScript", "MIDI"],
    repo: "roblox-auto-piano",
  },
  {
    name: "Server Monitor",
    category: "Monitoring & integration",
    description: "A Discord bot that checks game server availability, player counts, and map information, then keeps a single status message up to date.",
    stack: ["Node.js", "Discord.js", "GameDig"],
    repo: "servermonitor",
  },
  {
    name: "Twitch Chat Bot",
    category: "Chat automation",
    description: "A configurable Twitch chatbot with custom commands and a JSON-backed command store. Built to extend and adapt to a channel’s needs.",
    stack: ["Node.js", "JavaScript", "Twitch"],
    repo: "twitch-bot-js",
  },
]


export const featuredProjects = [
  "adsquad-backend", "premate-finder", "MEKCRM", "bizeoyunoner.com", "FLUDPI", "flu-sql",
].map(repo => projects.find(project => project.repo === repo)!)

export function sourceUrl(project: Project) {
  return `https://github.com/${project.owner ?? "flundar"}/${project.repo}`
}
