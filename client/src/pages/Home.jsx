import { useState, useEffect, useRef } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Gamepad2, Users, Trophy, Instagram, Linkedin, Server, Copy, Check, Activity, Zap, MapPin, Calendar, Youtube, FileText, Lock, Sparkles } from 'lucide-react'
import ConfettiButton from '../components/ConfettiButton'
import FloatingParticles from '../components/FloatingParticles'
import playstormLogo from '../assets/logo.png'
import lineupsPoster from '../assets/lineups_poster.webp'
import arenaBgmi from '../assets/arena_bgmi1.webp'
import arenaValo from '../assets/arena_valo1.webp'
import arenaExperience from '../assets/arena_experience1.webp'
import minecraftSmpBg from '../assets/minecraft_smp.webp'
import minecraftBedwarsBg from '../assets/minecraft_bedwars.webp'

// --- ANIMATED COMPONENTS ---

function CountUpStat({ label, value, prefix = "", suffix = "+" }) {
  const [count, setCount] = useState(0)
  const numericValue = parseInt(value.replace(/\D/g, ''))

  useEffect(() => {
    if (isNaN(numericValue)) return
    let current = 0
    const increment = Math.ceil(numericValue / 50)
    const timer = setInterval(() => {
      current += increment
      if (current >= numericValue) {
        setCount(numericValue)
        clearInterval(timer)
      } else {
        setCount(current)
      }
    }, 30)
    return () => clearInterval(timer)
  }, [numericValue])

  const formatted = count >= 1000 ? `${Math.floor(count / 1000)}K` : count

  return (
    <div>
      <div className="font-display text-2xl font-bold text-white">{prefix}{formatted}{suffix}</div>
      <div className="text-[10px] uppercase tracking-wider text-gray-500">{label}</div>
    </div>
  )
}

function Marquee({ text }) {
  const marqueeContent = (
    <>
      <span className="mx-4 text-sm font-bold uppercase tracking-[0.2em] text-purple-200">{text}</span>
      <span className="mx-4 text-sm font-bold uppercase tracking-[0.2em] text-purple-200">✦</span>
      <span className="mx-4 text-sm font-bold uppercase tracking-[0.2em] text-purple-200">{text}</span>
      <span className="mx-4 text-sm font-bold uppercase tracking-[0.2em] text-purple-200">✦</span>
      <span className="mx-4 text-sm font-bold uppercase tracking-[0.2em] text-purple-200">{text}</span>
      <span className="mx-4 text-sm font-bold uppercase tracking-[0.2em] text-purple-200">✦</span>
    </>
  )

  return (
    <div className="relative flex overflow-x-hidden bg-purple-900/20 py-3 border-y border-purple-500/20 backdrop-blur-sm">
      <div className="animate-marquee whitespace-nowrap py-1 flex">
        {marqueeContent}
        {marqueeContent}
      </div>
    </div>
  )
}

function Section({ id, children, className = "" }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`space-y-6 ${className}`}
    >
      {children}
    </motion.section>
  )
}

function DiscordPill() {
  return (
    <span className="flex h-3.5 w-3.5 items-center justify-center">
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5 text-white">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.086 2.157 2.419 0 1.334-.946 2.419-2.157 2.419z" />
      </svg>
    </span>
  )
}

function MinecraftServerCard({ title, ip, type, lastRestart = "2 hours ago", bgImage }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(ip)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-900/15 to-black/50 p-5 backdrop-blur-sm transition hover:border-emerald-500/50">
      {bgImage && (
        <div className="pointer-events-none absolute inset-0 -z-10">
          <img
            src={bgImage}
            alt=""
            aria-hidden="true"
            loading="eager"
            className="h-full w-full object-cover opacity-60 transition duration-700 group-hover:opacity-75"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/20 to-black/50" />
        </div>
      )}
      <div className="relative z-10 flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2">
            <Server className="w-4 h-4 text-emerald-400" />
            <h3 className="font-bold text-white">{title}</h3>
          </div>
          <p className="mt-1 text-xs font-semibold text-emerald-300">{type}</p>
        </div>
        <button
          onClick={handleCopy}
          className="rounded-lg bg-emerald-500/15 p-2 text-emerald-400 hover:bg-emerald-500 hover:text-white transition"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
      <div className="mt-4 flex items-center gap-2 rounded bg-black/40 px-3 py-2 font-mono text-xs text-emerald-400 border border-emerald-500/25">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
        {ip}
      </div>
      <div className="mt-3 pt-3 border-t border-emerald-500/15 text-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-gray-400">System Status:</span>
            <span className="text-emerald-400 font-semibold">Online</span>
          </div>
          <span className="text-emerald-300 text-right">Version {lastRestart}</span>
        </div>
      </div>
    </div>
  )
}

function GameCard({ title, type, youtubeId, bgImage }) {
  const [isInView, setIsInView] = useState(false)
  const cardRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting)
    }, { threshold: 0.5 })

    if (cardRef.current) observer.observe(cardRef.current)
    return () => observer.disconnect()
  }, [])

  const Wrapper = youtubeId ? 'a' : 'div'
  const wrapperProps = youtubeId ? {
    href: `https://www.youtube.com/watch?v=${youtubeId}`,
    target: "_blank",
    rel: "noopener noreferrer"
  } : {}

  return (
    <Wrapper
      ref={cardRef}
      {...wrapperProps}
      className="group relative block h-[400px] w-full overflow-hidden rounded-2xl border border-white/10 bg-black hover:scale-105 transition-transform duration-300"
    >
      {youtubeId && isInView ? (
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${youtubeId}`}
            title={title}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        </div>
      ) : (
        <>
          <div className="absolute inset-0 bg-cover bg-center opacity-60" style={{ backgroundImage: `url(${bgImage})` }} />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </>
      )}

      {youtubeId && (
        <div className="absolute right-5 top-5 z-20 rounded-full border border-white/10 bg-black/50 p-2.5 text-white backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:bg-red-600 group-hover:border-red-500 shadow-xl">
          <Youtube className="h-5 w-5 pointer-events-none" />
        </div>
      )}

      <div className="absolute bottom-5 left-5 z-10 w-[80%] pointer-events-none">
        <div className="text-[10px] font-bold uppercase tracking-widest text-yellow-400">{type}</div>
        <h3 className="font-display text-2xl font-bold uppercase text-white truncate">{title}</h3>
      </div>
    </Wrapper>
  )
}

function EventPreviewCard({ title, date, tag, description, linkTo, isClosed = false }) {
  return (
    <Link to={linkTo} className={`group flex flex-col justify-between rounded-2xl border ${isClosed ? 'border-red-500/30' : 'border-purple-500/40'} bg-black/40 p-4 shadow-lg hover:scale-[1.02] transition-all block`}>
      <div>
        <div className="flex items-center justify-between gap-3 text-[11px] text-gray-300">
          <span>{date}</span>
          <span className={`rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-white ${isClosed ? 'bg-red-500/60' : 'bg-gradient-to-r from-purple-500 to-pink-500'}`}>
            {isClosed ? 'Closed' : tag}
          </span>
        </div>
        <h3 className="mt-3 text-base font-semibold text-white">{title}</h3>
        <p className="mt-2 text-xs text-gray-400">{description}</p>
      </div>
    </Link>
  )
}

export default function HomePage() {
  const [discordMembers, setDiscordMembers] = useState(null);

  useEffect(() => {
    const GUILD_ID = '1399021796359016550';
    fetch(`https://discord.com/api/guilds/${GUILD_ID}/widget.json`)
      .then(res => res.json())
      .then(data => setDiscordMembers(data.presence_count))
      .catch(err => console.log("Discord widget err"));
  }, []);

  return (
    <div className="space-y-24 pb-12 overflow-x-hidden">

      {/* 1. HERO SECTION */}
      <section className="relative min-h-[80vh] flex flex-col justify-center px-4">
        <FloatingParticles />
        <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] bg-purple-600/20 blur-[120px] rounded-full opacity-50" />
        <div className="absolute bottom-0 left-0 -z-10 h-[400px] w-[400px] bg-pink-600/10 blur-[100px] rounded-full opacity-40" />

        <div className="grid gap-12 lg:grid-cols-[1.2fr,0.8fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h1 className="font-display text-5xl font-bold uppercase leading-[0.9] text-white sm:text-7xl lg:text-8xl tracking-tight">
              Amity's Premier <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400">Esports Community</span>
            </h1>

            <p className="max-w-xl text-lg text-gray-300 leading-relaxed">
              Amity's most elite esports community. We host tournaments, LANs, and events that hit different. No cap. 🔥
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <ConfettiButton
                onClick={() => { }}
                className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition-all hover:scale-105 shadow-lg shadow-purple-500/25"
              >
                <Link to="/events" className="flex items-center gap-3">
                  <Trophy className="w-4 h-4" />
                  <span className="relative z-10">View Events</span>
                </Link>
              </ConfettiButton>

              <Link to="/roster" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-4 text-sm font-bold uppercase tracking-widest text-white transition hover:bg-white/10">
                Meet The Squad
              </Link>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <CountUpStat label="Prize Pool" value="95000" prefix="₹" suffix="+" />
              <div className="h-8 w-px bg-white/10" />
              <CountUpStat label="Footfall" value="40000" suffix="+" />
              <div className="h-8 w-px bg-white/10" />
              <CountUpStat label="Colleges" value="50" suffix="+" />
            </div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <Link to="/lineups" className="relative z-10 block overflow-hidden rounded-3xl border border-white/10 bg-black/60 shadow-2xl backdrop-blur-sm transition-transform hover:scale-[1.02] hover:border-purple-500/50">
              <img src={lineupsPoster} alt="Playstorm Competitive Lineups" className="w-full object-cover opacity-80 transition-opacity hover:opacity-100" />
              <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/10 bg-black/30 p-4 backdrop-blur-md transition-all duration-300 group-hover:bg-black/40">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex-1">
                    <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#FF2D55] mb-0.5">OPEN TRIALS</div>
                    <div className="text-sm font-semibold tracking-wide text-white">Trials Are Live</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-purple-300 mb-0.5">RECRUITMENT</div>
                    <div className="text-sm font-semibold tracking-wide text-white tracking-widest">OPEN</div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. MARQUEE BANNER */}
      <Marquee text="IT'S GIVING MAIN CHARACTER ENERGY • JOIN THE DISCORD • NO CAP BEST GAMING CLUB • FOLLOW @PLAYSTORM.AMITY • WE'RE SO BACK" />

      {/* 3. GAME ROSTER */}
      <Section id="games" className="px-4">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="font-display text-[11px] uppercase tracking-[0.26em] text-purple-400">Our Channel</p>
            <h2 className="font-display text-3xl text-white">Latest Content 🎬</h2>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <GameCard title="♡" type="365 Days of PlayStorm" youtubeId="iKLKOCxpLlk" bgImage={arenaBgmi} />
          <GameCard title="In Campus" type="Hide & Seek" youtubeId="noB4mll_5-o" bgImage={arenaValo} />
          <GameCard title="Trailer" type="The Pro Arena" youtubeId="nkIqYqU_I-Y" bgImage={arenaExperience} />
        </div>
      </Section>

      {/* 4. MINECRAFT SERVERS */}
      <Section id="minecraft" className="px-4">
        <div className="mb-8">
          <p className="font-display text-[11px] uppercase tracking-[0.26em] text-emerald-400">Official Minecraft Servers</p>
          <h2 className="font-display text-xl text-white sm:text-2xl">Join the PlayStorm SMP</h2>
          <p className="max-w-2xl text-sm text-gray-400 mt-2">
            Server stays online 24/7. Join the grind, build with the squad. ⛏️
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <MinecraftServerCard title="PlayStorm SMP" ip="mc.playstorm.world" type="Survival • 1.21.x" lastRestart="v1.21.1" bgImage={minecraftSmpBg} />
          <MinecraftServerCard title="PvP Arena" ip="pvp.playstorm.world:6017" type="PvP • 1.8 - 1.21" lastRestart="Active" bgImage={minecraftBedwarsBg} />
        </div>
      </Section>

      {/* 5. EVENTS */}
      <Section id="events" className="px-4">
        <div className="mb-6 space-y-2">
          <p className="font-display text-[11px] uppercase tracking-[0.26em] text-purple-300">What's Poppin</p>
          <h2 className="font-display text-xl text-white sm:text-2xl">Recent Events ✨</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          <EventPreviewCard title="#Respawn" date="Mar 12" tag="LAN" description="PlayStorm × Happiness Club multi-game showdown." linkTo="/events" />
          <EventPreviewCard title="The Pro Arena" date="Feb 19-28" tag="Major" description="Our flagship championship featuring BGMI, Valorant, and the Experience Zone." linkTo="/events" />
          <EventPreviewCard title="Season 2 Finals" date="Feb 5" tag="LAN" description="Multi-game tournament series wrapped up successfully." linkTo="/events" />
        </div>

        {/* SOCIAL LINKS ROW */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-xs text-gray-200">
          <div><p className="font-display text-[11px] uppercase tracking-[0.22em] text-purple-200">Connect</p></div>
          <div className="flex flex-wrap items-center gap-3">
            <a href="https://discord.playstorm-amity.club" target="_blank" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-1.5 text-[11px] uppercase tracking-[0.2em] text-white">
              <DiscordPill />
              Discord {discordMembers && <span className="ml-1 opacity-70">({discordMembers})</span>}
            </a>
            <a href="https://instagram.com/playstorm.amity/" target="_blank" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1.5 text-[11px] uppercase tracking-[0.2em]"><Instagram className="h-3.5 w-3.5" /> Instagram</a>
            <a href="https://www.youtube.com/@PlaystormAmity" target="_blank" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1.5 text-[11px] uppercase tracking-[0.2em]"><Youtube className="h-3.5 w-3.5" /> YouTube</a>
          </div>
        </div>
      </Section>

    </div>
  )
}