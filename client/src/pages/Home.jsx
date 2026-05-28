import { useState, useEffect, useRef } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { motion, useScroll, useTransform, animate, useInView } from 'framer-motion'
import { ArrowRight, Gamepad2, Users, Trophy, Instagram, Linkedin, Server, Copy, Check, Activity, Zap, MapPin, Calendar, Youtube, FileText, Lock, Sparkles, Pin, Heart, MessageCircle, Play, ExternalLink, Grid } from 'lucide-react'
import ConfettiButton from '../components/ConfettiButton'
import FloatingParticles from '../components/FloatingParticles'
import { TiltCard, TypedText, StaggerReveal, StaggerItem, MagneticElement, GlowCard, CursorPhysicsDistortion, playTactileClick, playDigitalHover } from '../components/VisualEffects'
import playstormLogo from '../assets/logo.png'
import lineupsPoster from '../assets/lineups_poster.webp'
import arenaBgmi from '../assets/arena_bgmi1.webp'
import arenaValo from '../assets/arena_valo1.webp'
import arenaExperience from '../assets/arena_experience1.webp'
import bgmiBg from '../assets/bgmi_bg.webp'
import parkourImg from '../assets/parkour1.1.webp'
import arena1Img from '../assets/arena1.webp'
import season3Poster from '../assets/season3_poster.png'

// --- ANIMATED COMPONENTS ---

function CountUpStat({ label, value, prefix = "", suffix = "+" }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const [displayValue, setDisplayValue] = useState(0)
  const numericValue = parseInt(value.replace(/\D/g, ''))

  useEffect(() => {
    if (isInView && !isNaN(numericValue)) {
      const controls = animate(0, numericValue, {
        duration: 2.5,
        ease: "easeOut",
        onUpdate: (val) => setDisplayValue(Math.floor(val))
      })
      return controls.stop
    }
  }, [isInView, numericValue])

  const formatted = displayValue >= 1000 ? `${Math.floor(displayValue / 1000)}K` : displayValue

  return (
    <div ref={ref}>
      <div className="font-display text-2xl font-bold text-white drop-shadow-md">{prefix}{formatted}{suffix}</div>
      <div className="text-[10px] uppercase tracking-wider text-purple-400/80 mt-1">{label}</div>
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

function InstaReelCard({ title, tag, isPinned, views, likes, comments, bgImage, linkUrl, thumbnailUrl, instaShortcode }) {
  const [imgSrc, setImgSrc] = useState(thumbnailUrl || bgImage)
  const [isInView, setIsInView] = useState(false)
  const cardRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting)
    }, { threshold: 0.3 })

    if (cardRef.current) observer.observe(cardRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <TiltCard>
      <div
        ref={cardRef}
        className="group relative block h-[500px] w-full overflow-hidden rounded-2xl border border-white/10 bg-black transition-all duration-500 hover:border-pink-500/50 shadow-xl"
      >
      {/* Instagram Embed iframe (loads when in view) — INTERACTIVE */}
      {instaShortcode && isInView ? (
        <div className="absolute inset-0 w-full h-full">
          <iframe
            src={`https://www.instagram.com/reel/${instaShortcode}/embed/`}
            width="100%"
            height="100%"
            className="absolute inset-0 w-full h-full border-none"
            title={title}
            loading="lazy"
            allowTransparency="true"
            allow="encrypted-media"
          />
          {/* Gradient overlay at bottom for text readability */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />
        </div>
      ) : (
        <a href={linkUrl} target="_blank" rel="noopener noreferrer" className="absolute inset-0">
          {/* Static thumbnail fallback */}
          <img
            src={imgSrc}
            alt={title}
            onError={() => setImgSrc(bgImage)}
            className="absolute inset-0 w-full h-full object-cover opacity-70 transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent group-hover:via-black/50 transition-all duration-300" />
        </a>
      )}

      {/* Top Overlay Bar */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20 pointer-events-none">
        <div className="flex items-center gap-1.5 rounded-full bg-black/60 border border-white/10 px-3 py-1 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-white shadow-lg">
          {isPinned ? <Pin className="w-3 h-3 text-pink-400 animate-pulse" /> : <Sparkles className="w-3 h-3 text-yellow-400" />}
          <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">{tag}</span>
        </div>
        <a href={linkUrl} target="_blank" rel="noopener noreferrer" className="rounded-full bg-black/60 border border-white/10 p-2 text-white backdrop-blur-md transition-transform duration-300 hover:scale-110 hover:bg-gradient-to-tr hover:from-yellow-500 hover:via-pink-500 hover:to-purple-600 hover:border-transparent shadow-lg pointer-events-auto">
          <Instagram className="w-4 h-4" />
        </a>
      </div>

      {/* Center Hover Play Button (only when NOT embedded) */}
      {!isInView && (
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100">
          <div className="flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-3 text-sm font-bold uppercase tracking-widest text-white shadow-[0_0_30px_rgba(236,72,153,0.5)] border border-white/20 backdrop-blur-md">
            <Play className="w-4 h-4 fill-current" /> Watch Reel
          </div>
        </div>
      )}

      {/* Bottom Info Overlay */}
      <a href={linkUrl} target="_blank" rel="noopener noreferrer" className="absolute bottom-4 left-4 right-4 z-20 space-y-3 transform transition-transform duration-300 group-hover:translate-y-[-4px]">
        <h3 className="font-display text-lg font-bold text-white leading-snug tracking-wide line-clamp-2 drop-shadow-md">{title}</h3>
        
        <div className="flex items-center justify-between pt-3 border-t border-white/15 text-xs text-gray-300 backdrop-blur-md rounded-xl bg-black/60 p-2.5 border border-white/10">
          <div className="flex items-center gap-3 font-medium">
            <span className="flex items-center gap-1 text-pink-400"><Heart className="w-3.5 h-3.5 fill-current" /> {likes}</span>
            <span className="flex items-center gap-1 text-purple-300"><MessageCircle className="w-3.5 h-3.5 fill-current" /> {comments}</span>
          </div>
          <div className="flex items-center gap-1 font-mono text-[11px] text-gray-400 font-semibold">
            <Play className="w-3 h-3 fill-current text-gray-400" /> {views}
          </div>
        </div>
      </a>
    </div>
    </TiltCard>
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
    <TiltCard>
      <GlowCard className="h-full">
        <Wrapper
          ref={cardRef}
          {...wrapperProps}
          className="group relative block h-[400px] w-full overflow-hidden rounded-2xl border border-white/10 bg-black/80 transition-all duration-300"
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
      </GlowCard>
    </TiltCard>
  )
}

function EventPreviewCard({ title, date, tag, description, linkTo, isClosed = false }) {
  return (
    <TiltCard>
      <GlowCard className="h-full">
        <Link to={linkTo} className={`group flex h-full flex-col justify-between rounded-2xl border ${isClosed ? 'border-red-500/30' : 'border-purple-500/40'} bg-black/60 p-4 shadow-lg block`}>
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
      </GlowCard>
    </TiltCard>
  )
}

export default function HomePage() {
  const [discordMembers, setDiscordMembers] = useState(null);
  const [instaData, setInstaData] = useState(null);
  const [isInstaLoading, setIsInstaLoading] = useState(true);

  useEffect(() => {
    const GUILD_ID = '1399021796359016550';
    fetch(`https://discord.com/api/guilds/${GUILD_ID}/widget.json`)
      .then(res => res.json())
      .then(data => setDiscordMembers(data.presence_count))
      .catch(err => console.log("Discord widget err"));

    // Fetch live Instagram feed & stats
    fetch('/api/instagram')
      .then(res => res.json())
      .then(data => {
        if (data && data.success) {
          setInstaData(data);
        }
        setIsInstaLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch live Instagram data:", err);
        setIsInstaLoading(false);
      });
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 16 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.45, ease: 'easeOut' }} 
      className="space-y-24 pb-12 overflow-x-hidden"
    >

      {/* 1. HERO SECTION */}
      <section className="relative min-h-[80vh] flex flex-col justify-center px-4">
        <FloatingParticles />
        <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] bg-indigo-950/20 blur-[120px] rounded-full opacity-50" />
        <div className="absolute bottom-0 left-0 -z-10 h-[400px] w-[400px] bg-slate-900/10 blur-[100px] rounded-full opacity-40" />

        <div className="grid gap-12 lg:grid-cols-[1.2fr,0.8fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <CursorPhysicsDistortion>
              <h1 
                onMouseEnter={playDigitalHover}
                className="font-display text-5xl font-black uppercase leading-[0.85] text-white sm:text-7xl lg:text-8xl tracking-tighter select-none cursor-default"
              >
                Amity's Premier <br />
                <motion.span 
                  className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500"
                  style={{ backgroundSize: '200% auto' }}
                  animate={{ backgroundPosition: ['0% center', '200% center'] }}
                  transition={{ duration: 4, ease: "linear", repeat: Infinity }}
                >
                  Esports Community
                </motion.span>
              </h1>
            </CursorPhysicsDistortion>

            <p className="max-w-xl text-lg text-gray-300 leading-relaxed">
              <TypedText text="Amity's most elite esports community. We host tournaments, LANs, and events that hit different. No cap. 🔥" speed={30} delay={800} />
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <MagneticElement range={50}>
                <div onMouseEnter={playDigitalHover} onClick={playTactileClick}>
                  <ConfettiButton
                    onClick={() => { }}
                    className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition-all hover:scale-105 shadow-lg shadow-indigo-500/25 cursor-pointer"
                  >
                    <Link to="/events" className="flex items-center gap-3">
                      <Trophy className="w-4 h-4" />
                      <span className="relative z-10">View Events</span>
                    </Link>
                  </ConfettiButton>
                </div>
              </MagneticElement>

              <MagneticElement range={50}>
                <Link 
                  to="/roster" 
                  onMouseEnter={playDigitalHover}
                  onClick={playTactileClick}
                  className="group relative inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-4 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-white/10 hover:border-slate-500/50 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] overflow-hidden cursor-pointer"
                >
                  <span className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-500 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  Meet The Squad <Users className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                </Link>
              </MagneticElement>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <CountUpStat label="Prize Pool" value="100000" prefix="₹" suffix="+" />
              <div className="h-8 w-px bg-white/10" />
              <CountUpStat label="Game Titles" value="5" suffix="" />
              <div className="h-8 w-px bg-white/10" />
              <CountUpStat label="Entry Fee" value="100" prefix="₹" suffix="" />
            </div>
          </motion.div>

          {/* Hero Visual - Season 3 Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 via-blue-600 to-slate-700 rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-1000 animate-pulse"></div>
            
            <TiltCard>
              <Link to="/s3" className="group relative block rounded-3xl bg-black/80 shadow-[0_0_50px_rgba(255,255,255,0.03)] backdrop-blur-xl transition-all duration-500 hover:shadow-[0_0_80px_rgba(99,102,241,0.15)] hover:-translate-y-2 p-[2px] overflow-hidden">
                
                {/* Rotating Border Layer */}
                <div className="absolute inset-[-100%] z-0 animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#00000000_50%,#818cf8_100%)] opacity-70 group-hover:opacity-100 transition-opacity" />
                
                {/* Inner container to hold background and content */}
                <div className="relative z-10 h-full w-full rounded-[22px] bg-[#0c0c0e] overflow-hidden">
                  
                  {/* Inner Shimmer */}
                  <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:animate-shimmer pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />

                  <div className="flex flex-col relative z-10">
                    <div className="w-full h-[240px] overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
                      <img src={season3Poster} alt="PlayStorm Season 3" className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110" />
                      
                      {/* Floating Badge Over Image */}
                      <div className="absolute top-4 right-4 z-20 inline-flex items-center gap-2 rounded-full border border-emerald-500/50 bg-black/60 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-emerald-400 backdrop-blur-md shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        Registration Open
                      </div>
                    </div>

                    <div className="p-8 pt-6 space-y-5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-sm relative overflow-hidden">
                          <span className="absolute inset-0 bg-indigo-500/15 blur opacity-0 group-hover:opacity-100 transition duration-500"></span>
                          May 30 - Jun 28
                        </span>
                      </div>
                      
                      <div>
                        <h3 className="font-display text-4xl font-bold tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-indigo-300 transition-colors">PlayStorm Season 3</h3>
                        <p className="text-sm text-gray-400 leading-relaxed mt-2">Multi-title online esports showdown. 5 major game titles. ₹1L+ prize pool.</p>
                      </div>
                      
                      <div className="flex items-center justify-between pt-2 border-t border-white/10 mt-4 relative">
                        <div className="absolute inset-x-0 -top-[1px] h-[1px] bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent"></div>
                        <div className="flex flex-col">
                          <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">Prize Pool</span>
                          <span className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">₹1L+</span>
                        </div>
                        <div className="flex flex-col text-right">
                          <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">Games</span>
                          <span className="text-lg font-black text-white">5 Titles</span>
                        </div>
                      </div>

                      <div className="relative inline-flex items-center justify-center gap-2 w-full mt-4 rounded-xl bg-white px-4 py-3.5 text-xs font-black uppercase tracking-widest text-black shadow-lg transition-all group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-blue-600 group-hover:text-white group-hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] border border-transparent group-hover:border-white/20">
                        Enter The Arena <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </TiltCard>
          </motion.div>
        </div>
      </section>

      {/* 2. MARQUEE BANNER */}
      <Marquee text="IT'S GIVING MAIN CHARACTER ENERGY • JOIN THE DISCORD • NO CAP BEST GAMING CLUB • FOLLOW @PLAYSTORM.AMITY • WE'RE SO BACK" />

      {/* 3. INSTAGRAM CREATIVE SHOWCASE */}
      <Section id="instagram" className="px-4 max-w-7xl mx-auto w-full">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-slate-950/20 via-black/60 to-black p-6 sm:p-10 backdrop-blur-xl shadow-[0_0_50px_rgba(255,255,255,0.02)] space-y-8">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-1/4 -z-10 h-96 w-96 bg-slate-900/10 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 -z-10 h-96 w-96 bg-indigo-950/10 blur-[120px] rounded-full pointer-events-none" />

          {/* Instagram Profile Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-white/10">
            <div className="flex items-center gap-5">
              <div className="relative flex-shrink-0">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 animate-spin-slow blur-sm opacity-70" />
                <div className="relative p-1 bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 rounded-full">
                  <img src={playstormLogo} alt="Playstorm Amity" className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover bg-black p-1" />
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {instaData?.profile?.username || "playstorm.amity"}
                  </h2>
                  {instaData?.profile?.verified && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-white text-[10px] font-bold shadow-md shadow-blue-500/20">✓</span>
                  )}
                </div>
                <p className="text-xs text-gray-400 flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-pink-400 flex-shrink-0" /> {instaData?.profile?.name || "Official eSports Club of Amity University, Noida"}
                </p>
                <div className="flex items-center gap-4 pt-1 text-xs font-semibold text-gray-300">
                  <span><strong className="text-white font-bold">{isInstaLoading ? "..." : instaData?.profile?.posts || 113}</strong> posts</span>
                  <span><strong className="text-white font-bold">{isInstaLoading ? "..." : instaData?.profile?.followers || 999}</strong> followers</span>
                  <span><strong className="text-white font-bold">{isInstaLoading ? "..." : instaData?.profile?.following || 16}</strong> following</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/playstorm.amity/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-yellow-500 via-pink-500 to-purple-600 p-[2px] transition-transform hover:scale-105 shadow-lg shadow-pink-500/20"
              >
                <span className="flex items-center gap-2 rounded-full bg-black px-6 py-3 text-xs sm:text-sm font-bold uppercase tracking-widest text-white transition-colors group-hover:bg-transparent">
                  <Instagram className="w-4 h-4" /> Follow @playstorm.amity
                </span>
              </a>
            </div>
          </div>

          {/* Reels & Posts Grid */}
          <div>
            <div className="flex items-center gap-2 mb-6 text-sm font-bold uppercase tracking-widest text-gray-300 border-b border-white/10 pb-4">
              <Grid className="w-4 h-4 text-pink-400" /> Pinned & Trending Reels
            </div>
            {isInstaLoading ? (
              <div className="py-16 text-center text-sm text-pink-400/70 animate-pulse border border-white/5 rounded-2xl bg-white/[0.02]">
                Connecting to live Instagram API...
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-3">
                {(instaData?.reels || [
                  {
                    id: "reel_1", title: "1st time at Amity University… and we turned it into a battleground. 🎮🔥", tag: "Pinned • BGMI", isPinned: true, views: "18.5K", likes: "1,240", comments: "94", bgImage: bgmiBg, linkUrl: "https://www.instagram.com/p/DVSxy1mgfrs/", thumbnailUrl: "https://scontent-cdg4-2.cdninstagram.com/v/t51.71878-15/641243296_2031604577385739_6630750860363136602_n.jpg?stp=dst-jpg_e15_tt6&_nc_ht=scontent-cdg4-2.cdninstagram.com&_nc_cat=107&_nc_oc=Q6cZ2gGS_JPJraNk6zXATyrJJ0jzUxvyrhq1y7o3qRnP9JJgl75OqMzkePuF_MYiKvE4d_U&_nc_ohc=7pOtOOn-VYgQ7kNvwFds0oF&_nc_gid=7GSj2C4ab2ozt0gPWSv-4A&edm=APs17CUBAAAA&ccb=7-5&oh=00_Af7fvKHi4WZNkB5EarY3RY25J2CMC_3cfkvYKjRP6AXsGQ&oe=6A0F720D&_nc_sid=10d13b", instaShortcode: "DVSxy1mgfrs"
                  },
                  {
                    id: "reel_2", title: "Hehe 😛 non gamers ko bhi gamer bana dege 🤙🏻", tag: "👑 Most Viewed • Viral", isPinned: false, views: "35.4K", likes: "1,240", comments: "41", bgImage: parkourImg, linkUrl: "https://www.instagram.com/p/DWOuSkYCUVo/", thumbnailUrl: "https://scontent-cdg4-2.cdninstagram.com/v/t51.71878-15/656005972_2130352561065097_2109240251605278924_n.jpg?stp=dst-jpg_e15_tt6&_nc_ht=scontent-cdg4-2.cdninstagram.com&_nc_cat=101&_nc_oc=Q6cZ2gH284QLa4G6oZGa5VS7IF3w4ADCSchbdYrhkE6_a9RSi6a5IFj5VNvcBS-9W1cNwjo&_nc_ohc=BWQ2oZWhfIMQ7kNvwHsUc3o&_nc_gid=GLeKiJM4QYkboscXWHPIEw&edm=APs17CUBAAAA&ccb=7-5&oh=00_Af6w94My3tctDSed_THntcJ2hyCdXtPhk75b2WL28rY1eg&oe=6A0F64C6&_nc_sid=10d13b", instaShortcode: "DWOuSkYCUVo"
                  },
                  {
                    id: "reel_3", title: "The only crazy event at amity 🔥", tag: "Trending • POV", isPinned: false, views: "14.2K", likes: "1,240", comments: "84", bgImage: arena1Img, linkUrl: "https://www.instagram.com/p/DVS-ZrMAQ_u/", thumbnailUrl: "https://scontent-cdg4-1.cdninstagram.com/v/t51.71878-15/639746797_3870868599885278_566304567590951049_n.jpg?stp=dst-jpg_e15_tt6&_nc_ht=scontent-cdg4-1.cdninstagram.com&_nc_cat=102&_nc_oc=Q6cZ2gGWRwXzwK6mmPtQOcXbgFRu7OreV1n5JX7EjUMhC8jBL_Zdq2zRYkGsHdQS3RY2muU&_nc_ohc=N6y8BGQj14sQ7kNvwFwapnN&_nc_gid=jiRH0Nc2vSJ3vGyO5yopQg&edm=APs17CUBAAAA&ccb=7-5&oh=00_Af4HvhSdug_IOScSmU-mCUH3T8fUMjRjG6F1f7m8-XPMAA&oe=6A0F5106&_nc_sid=10d13b", instaShortcode: "DVS-ZrMAQ_u"
                  }
                ]).map((reel, idx) => (
                  <InstaReelCard
                    key={reel.id || idx}
                    title={reel.title}
                    tag={reel.tag}
                    isPinned={reel.isPinned}
                    views={reel.views}
                    likes={reel.likes}
                    comments={reel.comments}
                    bgImage={idx === 0 ? bgmiBg : idx === 1 ? parkourImg : arena1Img}
                    linkUrl={reel.linkUrl || "https://www.instagram.com/playstorm.amity/"}
                    thumbnailUrl={reel.thumbnailUrl}
                    instaShortcode={reel.instaShortcode}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </Section>

      {/* 4. GAME ROSTER */}
      <Section id="games" className="px-4">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="font-display text-[11px] uppercase tracking-[0.26em] text-purple-400">Our Channel</p>
            <h2 className="font-display text-3xl text-white">Latest Content 🎬</h2>
          </div>
        </div>

        <StaggerReveal className="grid gap-4 md:grid-cols-3">
          <StaggerItem>
            <GameCard title="♡" type="365 Days of PlayStorm" youtubeId="iKLKOCxpLlk" bgImage={arenaBgmi} />
          </StaggerItem>
          <StaggerItem>
            <GameCard title="In Campus" type="Hide & Seek" youtubeId="noB4mll_5-o" bgImage={arenaValo} />
          </StaggerItem>
          <StaggerItem>
            <GameCard title="Trailer" type="The Pro Arena" youtubeId="nkIqYqU_I-Y" bgImage={arenaExperience} />
          </StaggerItem>
        </StaggerReveal>
      </Section>

      {/* 5. EVENTS */}
      <Section id="events" className="px-4">
        <div className="mb-6 space-y-2">
          <p className="font-display text-[11px] uppercase tracking-[0.26em] text-purple-300">What's Poppin</p>
          <h2 className="font-display text-xl text-white sm:text-2xl">Recent Events ✨</h2>
        </div>
        <StaggerReveal className="grid gap-5 md:grid-cols-3">
          <StaggerItem>
            <EventPreviewCard title="#Respawn" date="Mar 12" tag="LAN" description="PlayStorm × Happiness Club collab. 300+ footfall. BGMI, FC25 & Tekken 8 tournaments." linkTo="/events" />
          </StaggerItem>
          <StaggerItem>
            <EventPreviewCard title="The Pro Arena" date="Feb 27-28" tag="Major" description="281 players, 65 teams, 1,500+ footfall. BGMI & Valorant LAN championship at E2 Auditorium." linkTo="/pro-arena" />
          </StaggerItem>
          <StaggerItem>
            <EventPreviewCard title="Season 2 Finals" date="Feb 5" tag="LAN" description="Multi-title tournament: Valorant, BGMI, Clash Royale, CODM & Tekken on finale day." linkTo="/events" />
          </StaggerItem>
        </StaggerReveal>

        {/* SOCIAL LINKS ROW */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/60 px-5 py-4 text-xs text-gray-200">
          <div><p className="font-display text-[11px] uppercase tracking-[0.22em] text-purple-200">Connect</p></div>
          <div className="flex flex-wrap items-center gap-3">
            <a href="https://discord.gg/eAqXkxgTF" target="_blank" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-1.5 text-[11px] uppercase tracking-[0.2em] text-white">
              <DiscordPill />
              Discord {discordMembers && <span className="ml-1 opacity-70">({discordMembers})</span>}
            </a>
            <a href="https://instagram.com/playstorm.amity/" target="_blank" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1.5 text-[11px] uppercase tracking-[0.2em]"><Instagram className="h-3.5 w-3.5" /> Instagram</a>
            <a href="https://www.youtube.com/@PlaystormAmity" target="_blank" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1.5 text-[11px] uppercase tracking-[0.2em]"><Youtube className="h-3.5 w-3.5" /> YouTube</a>
          </div>
        </div>
      </Section>

    </motion.div>
  )
}