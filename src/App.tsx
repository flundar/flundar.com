import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import {
  Github,
  Mail,
  ExternalLink,
  Database,
  Cloud,
  Settings,
  Server,
  ChevronRight,
  Activity,
  Wifi,
  HardDrive
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

// --- Background Data Packets Canvas Component ---
const DataPackets = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    const particles: any[] = []
    const particleCount = 40

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    class Particle {
      x: number; y: number; speed: number; size: number; opacity: number;
      constructor() {
        this.x = Math.random() * (canvas?.width || window.innerWidth)
        this.y = Math.random() * (canvas?.height || window.innerHeight)
        this.speed = 0.5 + Math.random() * 1
        this.size = Math.random() * 2
        this.opacity = 0.1 + Math.random() * 0.3
      }
      update() {
        this.y -= this.speed
        if (this.y < 0) {
          this.y = canvas?.height || window.innerHeight
          this.x = Math.random() * (canvas?.width || window.innerWidth)
        }
      }
      draw() {
        if (!ctx) return
        ctx.fillStyle = `rgba(15, 191, 255, ${this.opacity})`
        ctx.fillRect(this.x, this.y, this.size, this.size * 5)
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.update()
        p.draw()
      })
      animationFrameId = requestAnimationFrame(render)
    }

    window.addEventListener("resize", resize)
    resize()
    render()

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
}

// --- Live Logs Component ---
const LiveLogs = () => {
  const [logs, setLogs] = useState<{ id: number; text: string; type: string }[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  const logTemplates = [
    { text: "INBOUND TRANSFER: 128kb from node-cluster-α", type: "info" },
    { text: "KUBE-API: Resource definition applied", type: "success" },
    { text: "HEALTH_CHECK: All services operational [OK]", type: "success" },
    { text: "PROMETHEUS: CPU Spike detected on shard-04", type: "warning" },
    { text: "DOCKER: Image 'api-gateway:v2.4' pulled", type: "info" },
    { text: "LOAD_BALANCER: Rerouting traffic", type: "warning" },
    { text: "PSQL: Database vacuum completed in 45ms", type: "info" },
    { text: "REDIS: Cache invalidated for user_session", type: "info" },
    { text: "RABBITMQ: Message queue processed", type: "info" }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      const template = logTemplates[Math.floor(Math.random() * logTemplates.length)]
      setLogs(prev => [...prev.slice(-20), { id: Date.now(), ...template }])
    }, 1500)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [logs])

  return (
    <div
      className="font-mono text-[9px] h-40 overflow-y-auto overflow-x-hidden terminal-scroll pr-2 bg-black/60 rounded border border-primary/5 p-2"
      ref={containerRef}
    >
      {logs.map((log) => (
        <div key={log.id} className="flex gap-2 mb-1 leading-tight hover:bg-primary/5 transition-colors">
          <span className="opacity-20 shrink-0">{new Date().toLocaleTimeString([], { hour12: false })}</span>
          <span className={`shrink-0 font-bold ${log.type === "success" ? "text-primary" :
            log.type === "warning" ? "text-yellow-500" :
              "text-blue-400"
            }`}>
            {log.type.toUpperCase()}
          </span>
          <span className="opacity-70 truncate">{log.text}</span>
        </div>
      ))}
      <div className="flex gap-2">
        <span className="opacity-20 shrink-0">{new Date().toLocaleTimeString([], { hour12: false })}</span>
        <span className="text-primary animate-pulse">_</span>
      </div>
    </div>
  )
}

// --- System Metrics Hook ---
const useMetrics = () => {
  const [metrics, setMetrics] = useState({ cpu: 12.4, mem: 45.1, net: 2.1 })

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics({
        cpu: parseFloat((10 + Math.random() * 15).toFixed(1)),
        mem: parseFloat((40 + Math.random() * 10).toFixed(1)),
        net: parseFloat((1 + Math.random() * 5).toFixed(1))
      })
    }, 1500)
    return () => clearInterval(interval)
  }, [])

  return metrics
}

export default function App() {
  const metrics = useMetrics()

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 font-mono overflow-x-hidden">
      <DataPackets />
      <div className="scanline" />

      {/* Sidebar Metrics (Desktop) */}
      <div className="fixed right-6 top-32 z-40 hidden xl:flex flex-col gap-4 w-48 animate-in fade-in slide-in-from-right duration-700">
        <Card className="bg-black/40 border-primary/20 backdrop-blur-md">
          <CardHeader className="p-3">
            <CardTitle className="text-[10px] uppercase text-primary/60 flex items-center gap-2">
              <Activity size={12} /> Realtime_Monitor
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 space-y-4">
            <div className="space-y-1">
              <div className="flex justify-between text-[10px]"><span>CPU_LOAD</span><span>{metrics.cpu}%</span></div>
              <div className="h-1 bg-primary/10 rounded-full overflow-hidden">
                <motion.div className="h-full bg-primary" animate={{ width: `${metrics.cpu}%` }} transition={{ duration: 1 }} />
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-[10px]"><span>MEM_USE</span><span>{metrics.mem}%</span></div>
              <div className="h-1 bg-primary/10 rounded-full overflow-hidden">
                <motion.div className="h-full bg-primary" animate={{ width: `${metrics.mem}%` }} transition={{ duration: 1 }} />
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-[10px]"><span>NET_BAND</span><span>{metrics.net}MB/s</span></div>
              <div className="h-1 bg-primary/10 rounded-full overflow-hidden">
                <motion.div className="h-full bg-primary" animate={{ width: `${(metrics.net / 6) * 100}%` }} transition={{ duration: 1 }} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 border-primary/20 backdrop-blur-md overflow-hidden">
          <CardHeader className="p-3 border-b border-primary/10">
            <CardTitle className="text-[10px] uppercase text-primary/60">System_Events</CardTitle>
          </CardHeader>
          <CardContent className="p-1">
            <LiveLogs />
          </CardContent>
        </Card>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-primary/10 bg-background/60 backdrop-blur-xl">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 font-bold text-xl group"
          >
            <div className="w-8 h-8 rounded border border-primary/40 bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all shadow-glow">
              <img src="/flundar.webp" alt="flundar" width={256} height={256} />
            </div>
            <span className="tracking-tighter uppercase whitespace-nowrap">flundar:<span className="text-primary animate-pulse">_</span></span>
          </motion.div>

          <div className="hidden md:flex items-center gap-6 text-[11px] uppercase tracking-[0.2em] font-bold">
            <a href="#about" className="hover:text-primary transition-colors cursor-pointer border-b border-transparent hover:border-primary/40 pb-1">01_INIT</a>
            <a href="#expertise" className="hover:text-primary transition-colors cursor-pointer border-b border-transparent hover:border-primary/40 pb-1">02_STACK</a>
            <a href="#projects" className="hover:text-primary transition-colors cursor-pointer border-b border-transparent hover:border-primary/40 pb-1">03_OUTPUT</a>
            <a href="#contact" className="hover:text-primary transition-colors cursor-pointer border-b border-transparent hover:border-primary/40 pb-1">04_CONCT</a>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden lg:flex flex-col items-end mr-4 opacity-50">
              <span className="text-[10px] leading-none">UPTIME: 99.99%</span>
              <span className="text-[8px] tracking-widest leading-none">STABLE_BUILD</span>
            </div>
            <Button variant="outline" size="sm" className="border-primary/30 hover:bg-primary/10 text-primary uppercase text-[10px] tracking-widest font-bold">
              GET_RESUME
            </Button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 pt-32 pb-20 relative z-10">
        {/* Hero Section */}
        <section id="about" className="mb-40 min-h-[60vh] flex flex-col justify-center">
          <div className="grid lg:grid-cols-5 gap-12 items-center">
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] font-bold tracking-[0.3em] mb-8 uppercase">
                <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
                Connection: Secure
              </div>
              <h1 className="text-4xl md:text-7xl font-bold tracking-tighter mb-8 leading-[0.9]">
                Architecting <span className="text-primary border-b-2 border-primary/20">high-performance</span> backends.
              </h1>
              <p className="text-lg text-muted-foreground mb-12 max-w-2xl leading-relaxed opacity-80">
                I am <span className="text-primary font-bold">flundar</span>, a Backend Engineer & DevOps Lead.
                I specialize in building fault-tolerant distributed systems,
                automating deployment lifecycles, and optimizing database clusters.
              </p>
              <div className="flex flex-wrap gap-6 items-center">
                <a href="#contact">
                  <Button size="lg" className="bg-primary hover:bg-primary/80 text-black font-black px-8">
                    PUSH_TO_MASTER();
                  </Button>
                </a>
                <div className="flex gap-6 opacity-60">
                  <a href="https://github.com/flundar" target="_blank" className="hover:text-primary transition-colors"><Github size={24} /></a>
                  {/* <a href="#" className="hover:text-primary transition-colors"><Linkedin size={24} /></a> */}
                  <a href="mailto:mail@flundar.com" className="hover:text-primary transition-colors"><Mail size={24} /></a>
                </div>
              </div>
            </motion.div>

            <div className="lg:col-span-2 hidden lg:block relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="relative z-20"
              >
                <div className="border border-primary/30 rounded-lg bg-black/80 p-8 font-mono text-sm shadow-2xl skew-y-1 hover:skew-y-0 transition-transform duration-500">
                  <div className="flex gap-1.5 mb-6">
                    <div className="w-3 h-3 rounded-full bg-red-900/40" />
                    <div className="w-3 h-3 rounded-full bg-yellow-900/40" />
                    <div className="w-3 h-3 rounded-full bg-green-900/40" />
                  </div>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <span className="text-primary/40 shrink-0">01</span>
                      <span className="text-blue-400">interface</span> <span className="text-primary">Dev</span> {"{"}
                    </div>
                    <div className="flex gap-4">
                      <span className="text-primary/40 shrink-0">02</span>
                      <span className="pl-4 text-purple-400">Backend:</span> <span className="text-white">string</span>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-primary/40 shrink-0">03</span>
                      <span className="pl-4 text-purple-400">DevOps:</span> <span className="text-white">string</span>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-primary/40 shrink-0">04</span>
                      <span className="pl-4 text-purple-400">Available:</span> <span className="text-green-400">bool</span>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-primary/40 shrink-0">05</span>
                      {"}"}
                    </div>
                    <div className="flex gap-4 mt-6">
                      <span className="text-primary/40 shrink-0">06</span>
                      <span className="text-yellow-400">function</span> <span className="text-blue-400">main</span>() {"{"}
                    </div>
                    <div className="flex gap-4">
                      <span className="text-primary/40 shrink-0">07</span>
                      <span className="pl-4 text-white">build.Success()</span>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-primary/40 shrink-0">08</span>
                      {"}"}
                    </div>
                  </div>
                </div>
                <div className="absolute -inset-4 bg-primary/10 blur-[60px] -z-10 rounded-full animate-pulse" />
              </motion.div>
            </div>
          </div>
        </section >

        {/* Expertise Grid */}
        < section id="expertise" className="mb-40" >
          <div className="flex items-center gap-8 mb-20 group">
            <h2 className="text-3xl font-black uppercase tracking-tighter whitespace-nowrap">
              <span className="text-primary mr-2">/</span>Core_Architecture.ts
            </h2>
            <div className="h-[2px] w-full bg-gradient-to-r from-primary/30 to-transparent" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Scalable APIs",
                icon: <Server className="text-primary" />,
                desc: "Node.js-driven microservices with high concurrent throughput and low memory footprint.",
                tags: ["Node.js", "Express", "NestJS"]
              },
              {
                title: "Cloud Native",
                icon: <Cloud className="text-primary" />,
                desc: "Kubernetes orchestration, serverless lambdas, and multi-region AWS infrastructure.",
                tags: ["K8s", "Helm", "EKS"]
              },
              {
                title: "Data Persistence",
                icon: <Database className="text-primary" />,
                desc: "Complex PostgreSQL optimizations, Redis caching layers, and distributed NoSQL.",
                tags: ["SQL", "Redis", "Elastic"]
              },
              {
                title: "CI/CD Automation",
                icon: <Settings className="text-primary" />,
                desc: "Terraform IaC and automated pipelines (GitHub Actions, Jenkins) for stable releases.",
                tags: ["IaC", "Tf", "Actions"]
              }
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full bg-black/40 border-primary/10 hover:border-primary/40 hover:bg-black/60 transition-all duration-300 group">
                  <CardHeader>
                    <div className="mb-4 p-4 w-fit rounded border border-primary/20 bg-primary/5  group-hover:text-black transition-all">
                      {item.icon}
                    </div>
                    <CardTitle className="text-lg font-bold">{item.title}</CardTitle>
                    <CardDescription className="text-xs leading-relaxed mt-2 opacity-60 group-hover:opacity-100 transition-opacity">
                      {item.desc}
                    </CardDescription>
                  </CardHeader>
                  <div className="px-6 pb-6 flex flex-wrap gap-2">
                    {item.tags.map(t => (
                      <Badge key={t} variant="outline" className="text-[9px] border-primary/20 text-primary/70 py-0 uppercase">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section >

        {/* Selected Systems (Projects) */}
        < section id="projects" className="mb-40" >
          <div className="flex items-center gap-8 mb-20">
            <h2 className="text-3xl font-black uppercase tracking-tighter whitespace-nowrap">
              <span className="text-primary mr-2">/</span>Production_Output
            </h2>
            <div className="h-[2px] w-full bg-gradient-to-r from-primary/30 to-transparent" />
          </div>

          <div className="grid grid-cols-1 gap-12">
            {[
              {
                title: "[SYSTM_01] Distrubuted Log Processor",
                description: "Built a node.js pipeline processing 1M+ logs/min via Kafka and ElasticSearch with real-time alerting layer.",
                metric: "LATENCY: <50ms",
                icon: <HardDrive className="text-primary" size={24} />
              },
              {
                title: "[SYSTM_02] Multi-Cloud Gateway",
                description: "Custom Reverse Proxy with dynamic routing for 500+ microservices spanning AWS and On-Prem clusters.",
                metric: "UPTIME: 100%",
                icon: <Wifi className="text-primary" size={24} />
              }
            ].map((p) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="flex flex-col md:flex-row gap-8 items-start md:items-center bg-black/30 border border-primary/10 p-8 rounded-lg hover:border-primary/40 transition-all">
                  <div className="w-16 h-16 rounded-full border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform bg-primary/5">
                    {p.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3 flex items-center gap-4">
                      {p.title}
                      <Badge className="bg-primary/20 text-primary border-none text-[9px]">{p.metric}</Badge>
                    </h3>
                    <p className="text-muted-foreground text-sm max-w-3xl leading-relaxed opacity-80">
                      {p.description}
                    </p>
                  </div>
                  <Button variant="ghost" size="icon" className="text-primary/40 group-hover:text-primary">
                    <ExternalLink size={20} />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </section >

        {/* Console / Terminal Section */}
        < section id="contact" className="mb-40" >
          <div className="max-w-3xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-black tracking-tight uppercase">Establish_Link</h2>
              <p className="opacity-60 text-sm italic">// Ready for data transmission</p>
            </div>

            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 to-primary/0 rounded-lg blur opacity-20 group-hover:opacity-40 transition-opacity" />
              <div className="relative rounded-lg bg-black/60 border border-primary/20 shadow-2xl overflow-hidden">
                <div className="h-10 bg-[#111] border-b border-primary/20 flex items-center justify-between px-4">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400/50" />
                    <div className="w-3 h-3 rounded-full bg-green-400/50" />
                  </div>
                  <span className="text-[9px] tracking-widest text-primary/40 font-bold uppercase">flundar@kernel-prompt: ~</span>
                </div>

                <div className="p-8 space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] uppercase font-black text-primary tracking-widest block">src_addr</label>
                      <Input placeholder="user@remote.host" className="bg-black/40 border-primary/10 focus-visible:ring-primary h-12 font-mono text-xs placeholder:opacity-30" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] uppercase font-black text-primary tracking-widest block">payload_type</label>
                      <Input placeholder="[QUERY_STND]" className="bg-black/40 border-primary/10 focus-visible:ring-primary h-12 font-mono text-xs placeholder:opacity-30" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase font-black text-primary tracking-widest block">data_buffer</label>
                    <Textarea placeholder="Transmission start..." className="min-h-[150px] bg-black/40 border-primary/10 focus-visible:ring-primary font-mono text-xs placeholder:opacity-30" />
                  </div>
                  <Button className="w-full bg-primary hover:bg-white text-black font-black h-14 group">
                    EXEC_SEND_ROUTINE();
                    <ChevronRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section >
      </main >

      {/* Footer */}
      < footer className="border-t border-primary/10 py-20 bg-black/50 relative z-20" >
        <div className="container mx-auto px-4 text-center space-y-12">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded border border-primary/40 flex items-center justify-center text-primary bg-primary/5">
              <img src="/flundar.webp" alt="flundar" width={256} height={256} />
            </div>
            <p className="text-[10px] opacity-40 uppercase tracking-[0.5em] font-bold">End of Transmission</p>
          </div>

          <div className="flex justify-center gap-12 opacity-50">
            <a href="https://github.com/flundar" target="_blank" className="hover:text-primary transition-colors text-xs font-bold uppercase tracking-widest">Git</a>
            {/* <a href="#" className="hover:text-primary transition-colors text-xs font-bold uppercase tracking-widest">In</a> */}
            <a href="mailto:mail@flundar.com" className="hover:text-primary transition-colors text-xs font-bold uppercase tracking-widest">Mail</a>
          </div>

          <div className="text-[9px] opacity-30 tracking-[0.2em] font-bold">
            © {new Date().getFullYear()} FLUNDAR.COM • BUILT_WITH_REACT_TS • STABLE_VERSION_1.0.0
          </div>
        </div>
      </footer >
    </div >
  )
}
