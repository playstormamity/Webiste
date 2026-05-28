import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Lock, Unlock, Sparkles, LogIn, LogOut, Activity, Cpu, HardDrive, ShieldCheck, Database, RefreshCw, Server, Check, AlertTriangle } from 'lucide-react'
import { TiltCard, GlowCard, MagneticElement, playTactileClick, playDigitalHover, CursorPhysicsDistortion } from '../components/VisualEffects'

export default function AdminAuth() {
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const [stats, setStats] = useState(null)
  const [refreshing, setRefreshing] = useState({ roster: false, instagram: false })
  const [actionMessage, setActionMessage] = useState('')
  
  // Client-side dynamic metrics states
  const [fps, setFps] = useState(60)
  const [browserMemory, setBrowserMemory] = useState(null)
  const [pageLoadTime, setPageLoadTime] = useState(0)

  const isAdmin = localStorage.getItem('isAdmin') === 'true'

  // Poll system and server stats
  useEffect(() => {
    if (!isAdmin) return;
    
    // Initial stats fetch
    fetchStats()
    
    // Setup 3-second live telemetry polling loop
    const interval = setInterval(fetchStats, 3000)
    return () => clearInterval(interval)
  }, [isAdmin])

  // Track browser-side JS runtime memory heap
  useEffect(() => {
    if (!isAdmin) return;
    const checkMemory = () => {
      if (window.performance && window.performance.memory) {
        setBrowserMemory({
          used: window.performance.memory.usedJSHeapSize,
          total: window.performance.memory.totalJSHeapSize,
          limit: window.performance.memory.jsHeapSizeLimit
        })
      }
    }
    checkMemory()
    const memoryInterval = setInterval(checkMemory, 3000)
    return () => clearInterval(memoryInterval)
  }, [isAdmin])

  // Calculate live rendering speed (FPS)
  useEffect(() => {
    if (!isAdmin) return;
    let frameCount = 0
    let lastTime = performance.now()
    let animationFrameId;

    const calcFps = () => {
      frameCount++
      const now = performance.now()
      if (now - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (now - lastTime)))
        frameCount = 0
        lastTime = now
      }
      animationFrameId = requestAnimationFrame(calcFps)
    }

    animationFrameId = requestAnimationFrame(calcFps)
    return () => cancelAnimationFrame(animationFrameId)
  }, [isAdmin])

  // Measure initial page load speed
  useEffect(() => {
    if (!isAdmin) return;
    const getLoadTime = () => {
      try {
        const nav = performance.getEntriesByType('navigation')[0]
        if (nav) {
          setPageLoadTime(Math.round(nav.duration))
        } else if (performance.timing) {
          setPageLoadTime(performance.timing.loadEventEnd - performance.timing.navigationStart)
        }
      } catch {
        setPageLoadTime(0)
      }
    }
    setTimeout(getLoadTime, 1000)
  }, [isAdmin])

  const handleLocalLogout = () => {
    localStorage.removeItem('isAdmin')
    localStorage.removeItem('adminToken')
    window.location.href = '/admin'
  }

  const fetchStats = async () => {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      handleLocalLogout()
      return
    }
    try {
      const res = await fetch('/api/admin/system-stats', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (res.ok) {
        const data = await res.json()
        setStats(data)
      } else if (res.status === 401 || res.status === 403) {
        console.warn("Session expired or unauthorized during stats fetch.")
        handleLocalLogout()
      }
    } catch (err) {
      console.error("Failed to fetch system stats:", err)
    }
  }

  const handleForceRefresh = async (target) => {
    setRefreshing(prev => ({ ...prev, [target]: true }))
    setActionMessage('')
    const token = localStorage.getItem('adminToken')
    if (!token) {
      handleLocalLogout()
      return
    }
    try {
      const res = await fetch('/api/admin/force-refresh', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ target })
      })
      if (res.ok) {
        const data = await res.json()
        setActionMessage(data.message || `Successfully refreshed ${target} cache!`)
        fetchStats()
      } else if (res.status === 401 || res.status === 403) {
        console.warn("Session expired or unauthorized during force refresh.")
        handleLocalLogout()
      } else {
        setActionMessage(`Failed to refresh ${target} cache.`)
      }
    } catch {
      setActionMessage(`Network error during refresh.`)
    } finally {
      setRefreshing(prev => ({ ...prev, [target]: false }))
      setTimeout(() => setActionMessage(''), 4000)
    }
  }

  const formatBytes = (bytes, decimals = 2) => {
    if (!bytes) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  const formatUptime = (secs) => {
    const d = Math.floor(secs / (3600 * 24));
    const h = Math.floor((secs % (3600 * 24)) / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = Math.floor(secs % 60);
    return `${d > 0 ? `${d}d ` : ''}${h}h ${m}m ${s}s`;
  };

  const handleLogin = async (e) => {
    e.preventDefault()
    playTactileClick()
    setError('')
    
    if (!id || !password) {
      setError('Please provide ID and Password')
      return
    }
    
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, password })
      })
      
      const data = await res.json()
      
      if (res.ok) {
        localStorage.setItem('isAdmin', 'true')
        localStorage.setItem('adminToken', data.token)
        window.location.href = '/admin'
      } else {
        setError(data.error || 'Invalid ID or Password')
      }
    } catch (err) {
      console.error("Authentication error:", err)
      setError('Network connection error. Try again.')
    }
  }

  // If already logged in, show a logout button
  const handleLogout = async () => {
    playTactileClick()
    const token = localStorage.getItem('adminToken')
    if (token) {
      try {
        await fetch('/api/admin/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
      } catch (err) {
        console.error("Logout request failed:", err)
      }
    }
    localStorage.removeItem('isAdmin')
    localStorage.removeItem('adminToken')
    window.location.href = '/'
  }

  if (isAdmin) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="space-y-8 pb-12"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-[10px] font-mono font-black uppercase tracking-wider text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Security Tier 1 Unlocked
            </div>
            <h1 className="font-display text-3xl font-black tracking-tight text-white sm:text-4xl uppercase mt-2">
              System <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(16,185,129,0.2)]">Control Dashboard</span>
            </h1>
            <p className="text-xs font-mono text-gray-500">
              Hostname: {stats?.os?.hostname || 'Scanning...'} · OS: {stats?.os?.platform || '-'} ({stats?.os?.arch || '-'}) · Process PID: {stats?.process?.pid || '-'}
            </p>
          </div>
          <MagneticElement>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-red-400 hover:bg-red-500/20 transition-all font-mono"
            >
              <LogOut className="w-3.5 h-3.5" /> Revoke Token
            </button>
          </MagneticElement>
        </div>

        {/* Action Messaging */}
        <AnimatePresence>
          {actionMessage && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="p-3.5 rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-300 text-xs font-mono text-center shadow-lg">
              System Broadcast: {actionMessage}
            </motion.div>
          )}
        </AnimatePresence>

        {/* METRICS ROW (RAM, CPU, UPTIME, CLIENT) */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* 1. MEMORY telemetry */}
          <TiltCard>
            <GlowCard className="h-full rounded-2xl border border-white/10 bg-black/60 p-5 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                  <HardDrive className="w-4 h-4 text-purple-400" /> Memory Telemetry
                </h3>
                <span className="text-[10px] font-mono text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded-md">RAM</span>
              </div>
              <div className="space-y-3.5">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono text-gray-300">
                    <span>Used / Total</span>
                    <span>{stats ? `${formatBytes(stats.ram.used)} / ${formatBytes(stats.ram.total)}` : 'Scanning...'}</span>
                  </div>
                  {/* Progress bar */}
                  <div className="w-full bg-white/5 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full transition-all duration-500"
                      style={{ width: stats ? `${(stats.ram.used / stats.ram.total) * 100}%` : '0%' }}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2.5 text-[11px] font-mono text-gray-400 border-t border-white/5 pt-3">
                  <div>
                    <span className="block text-gray-500">Node Process (RSS)</span>
                    <span className="text-white font-bold">{stats ? formatBytes(stats.ram.rss) : '-'}</span>
                  </div>
                  <div>
                    <span className="block text-gray-500">Heap Used</span>
                    <span className="text-white font-bold">{stats ? formatBytes(stats.ram.heapUsed) : '-'}</span>
                  </div>
                </div>
              </div>
            </GlowCard>
          </TiltCard>

          {/* 2. CPU telemetry */}
          <TiltCard>
            <GlowCard className="h-full rounded-2xl border border-white/10 bg-black/60 p-5 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-indigo-400" /> CPU Core Matrix
                </h3>
                <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-md">CPU</span>
              </div>
              <div className="space-y-3.5">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono text-gray-300">
                    <span>Average Core Load</span>
                    <span>{stats ? `${stats.cpu.load}%` : 'Calculating...'}</span>
                  </div>
                  {/* Progress bar */}
                  <div className="w-full bg-white/5 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-indigo-500 to-blue-500 h-full rounded-full transition-all duration-300"
                      style={{ width: stats ? `${stats.cpu.load}%` : '0%' }}
                    />
                  </div>
                </div>
                <div className="text-[11px] font-mono text-gray-400 border-t border-white/5 pt-3">
                  <span className="block text-gray-500">Hardware Processor</span>
                  <span className="text-white truncate block font-bold" title={stats?.cpu?.model}>
                    {stats ? `${stats.cpu.model} (${stats.cpu.cores} Cores)` : 'Scanning...'}
                  </span>
                </div>
              </div>
            </GlowCard>
          </TiltCard>

          {/* 3. UPTIME & SYSTEM INFO */}
          <TiltCard>
            <GlowCard className="h-full rounded-2xl border border-white/10 bg-black/60 p-5 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                  <Server className="w-4 h-4 text-indigo-400" /> System Uptime
                </h3>
                <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-md">SYS</span>
              </div>
              <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-gray-500">Node Server Uptime</span>
                  <span className="text-white font-bold">{stats ? formatUptime(stats.process.uptime) : 'Syncing...'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-gray-500">Host OS Uptime</span>
                  <span className="text-white font-bold">{stats ? formatUptime(stats.os.uptime) : 'Syncing...'}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-500">Runtime Platform</span>
                  <span className="text-white font-bold">{stats ? `Node ${stats.process.version}` : '-'}</span>
                </div>
              </div>
            </GlowCard>
          </TiltCard>

          {/* 4. CLIENT WEB APP TELEMETRY */}
          <TiltCard>
            <GlowCard className="h-full rounded-2xl border border-white/10 bg-black/60 p-5 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-emerald-400" /> Client Web App
                </h3>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md">CLIENT</span>
              </div>
              <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-gray-500">Browser Tab RAM</span>
                  <span className="text-white font-bold">{browserMemory ? formatBytes(browserMemory.used) : 'Scanning...'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-gray-500">Canvas Render Speed</span>
                  <span className={`font-bold flex items-center gap-1.5 ${fps >= 55 ? 'text-emerald-400' : fps >= 30 ? 'text-yellow-400' : 'text-red-400'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${fps >= 55 ? 'bg-emerald-400 animate-pulse' : fps >= 30 ? 'bg-yellow-400' : 'bg-red-400'}`} />
                    {fps} FPS
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-gray-500">Initial Page Load</span>
                  <span className="text-white font-bold">{pageLoadTime ? `${pageLoadTime} ms` : 'Syncing...'}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-500">Viewport Size</span>
                  <span className="text-white font-bold">{`${window.innerWidth} x ${window.innerHeight}`}</span>
                </div>
              </div>
            </GlowCard>
          </TiltCard>
        </div>

        {/* DUAL PANELS: API CACHE & DISCORD INTEGRATIONS */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* API CACHE MANAGER */}
          <GlowCard className="rounded-3xl border border-white/10 bg-black/60 p-6 space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white flex items-center gap-2 border-b border-white/10 pb-3">
              <Database className="w-4 h-4 text-purple-400" /> Live API Cache Console
            </h3>
            
            <div className="space-y-6">
              {/* Roster sheet cache */}
              <div className="space-y-3 rounded-xl border border-purple-500/10 bg-purple-950/10 p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">Google Sheets Roster Cache</h4>
                    <p className="text-[10px] text-gray-500 font-mono mt-0.5">
                      Last sync: {stats?.cache?.rosterLastFetched ? `${new Date(stats.cache.rosterLastFetched).toLocaleTimeString()}` : 'Never'}
                    </p>
                  </div>
                  <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded border ${stats?.cache?.rosterCached ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
                    {stats?.cache?.rosterCached ? 'Stale-While-Revalidate ACTIVE' : 'MISSING'}
                  </span>
                </div>
                
                <div className="flex justify-between items-center pt-2">
                  <span className="text-xs font-mono text-gray-400">Total Loaded Records: <strong className="text-white">{stats?.cache?.rosterSize || 0} Members</strong></span>
                  <button
                    onClick={() => handleForceRefresh('roster')}
                    disabled={refreshing.roster}
                    className="flex items-center gap-1.5 rounded-lg border border-purple-500/30 bg-purple-500/15 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-purple-300 hover:bg-purple-500/25 transition disabled:opacity-50 font-mono"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${refreshing.roster ? 'animate-spin' : ''}`} />
                    {refreshing.roster ? 'Syncing...' : 'Force Sync Roster'}
                  </button>
                </div>
              </div>

              {/* Instagram cache */}
              <div className="space-y-3 rounded-xl border border-pink-500/10 bg-pink-950/10 p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">Instagram Scraping Cache</h4>
                    <p className="text-[10px] text-gray-500 font-mono mt-0.5">
                      Last sync: {stats?.cache?.instaLastFetched ? `${new Date(stats.cache.instaLastFetched).toLocaleTimeString()}` : 'Never'}
                    </p>
                  </div>
                  <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded border ${stats?.cache?.instaCached ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
                    {stats?.cache?.instaCached ? 'Live Scraping ACTIVE' : 'MISSING'}
                  </span>
                </div>
                
                <div className="flex justify-between items-center pt-2">
                  <span className="text-xs font-mono text-gray-400">Target User: <strong className="text-white">@playstorm.amity</strong></span>
                  <button
                    onClick={() => handleForceRefresh('instagram')}
                    disabled={refreshing.instagram}
                    className="flex items-center gap-1.5 rounded-lg border border-pink-500/30 bg-pink-500/15 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-pink-400 hover:bg-pink-500/25 transition disabled:opacity-50 font-mono"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${refreshing.instagram ? 'animate-spin' : ''}`} />
                    {refreshing.instagram ? 'Syncing...' : 'Force Sync Insta'}
                  </button>
                </div>
              </div>
            </div>
          </GlowCard>

          {/* DISCORD WEBHOOK MONITOR */}
          <GlowCard className="rounded-3xl border border-white/10 bg-black/60 p-6 space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white flex items-center gap-2 border-b border-white/10 pb-3">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Discord Integration Matrix
            </h3>
            
            <div className="space-y-3 font-mono text-xs">
              <p className="text-gray-400 text-[11px] font-medium leading-relaxed mb-1">
                Security verification for server-side Discord Webhooks initialized inside <code className="text-purple-300 font-bold bg-white/5 px-1 py-0.5 rounded">.env</code>. Publicly hidden.
              </p>

              {stats && Object.entries(stats.webhooks).map(([game, active]) => (
                <div key={game} className="flex justify-between items-center py-2.5 border-b border-white/5">
                  <span className="text-gray-300 font-medium">
                    {game.replace('s3_', 'Season 3 — ').replace(/^\w/, c => c.toUpperCase())}
                  </span>
                  {active ? (
                    <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/15 px-3 py-0.5 text-[9px] font-black uppercase text-emerald-400">
                      <Check className="w-3 h-3 text-emerald-400" /> Secure Link Active
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 rounded-full border border-yellow-500/30 bg-yellow-500/15 px-3 py-0.5 text-[9px] font-black uppercase text-yellow-400">
                      <AlertTriangle className="w-3 h-3 text-yellow-400" /> Configuration Missing
                    </span>
                  )}
                </div>
              ))}
            </div>
          </GlowCard>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="space-y-12 pb-12"
    >
      {/* 1. LOOKSMAXED HEADER */}
      <div className="space-y-4 relative lg:max-w-[58%] mx-auto text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 bg-purple-500/10 rounded-full blur-[60px] pointer-events-none" />
        <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 backdrop-blur-md text-[10px] font-mono font-black uppercase tracking-[0.25em] text-purple-300">
          <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
          <span>Core System</span>
        </div>
        
        <div>
          <CursorPhysicsDistortion>
            <h1 className="font-display text-3xl font-black tracking-tight text-white sm:text-5xl uppercase">
              Admin <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-pink-600 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]">Terminal</span> 🔒
            </h1>
          </CursorPhysicsDistortion>
        </div>
      </div>

      {/* 2. AUTH CARD */}
      <div className="max-w-md mx-auto">
        <TiltCard>
          <GlowCard className="p-8 rounded-3xl border border-white/10 bg-black/60 backdrop-blur-md space-y-6">
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.2)]">
                <Lock className="h-6 w-6 text-purple-400" />
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase tracking-[0.22em] text-purple-200">
                  Admin ID
                </label>
                <input
                  type="text"
                  placeholder="ID credentials"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-xs text-white placeholder-gray-600 outline-none transition focus:border-purple-500 focus:bg-black/80 font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase tracking-[0.22em] text-purple-200">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="System key"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-xs text-white placeholder-gray-600 outline-none transition focus:border-purple-500 focus:bg-black/80 font-mono"
                />
              </div>

              {error && (
                <p className="text-xs font-mono font-bold text-red-500 text-center animate-pulse">
                  {error}
                </p>
              )}

              <div className="pt-2">
                <MagneticElement>
                  <button
                    type="submit"
                    onMouseEnter={playDigitalHover}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 px-6 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-lg border border-white/10 hover:brightness-110"
                  >
                    <LogIn className="w-3.5 h-3.5" /> Authenticate
                  </button>
                </MagneticElement>
              </div>
            </form>
          </GlowCard>
        </TiltCard>
      </div>

    </motion.div>
  )
}
