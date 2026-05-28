import { useState } from 'react'
import { motion } from 'framer-motion'
import { Trophy, MapPin, Target, Gamepad2, Swords, Crown, Shield, Zap, Music, FileText, Lock, Sparkles, Send } from 'lucide-react'
import { TiltCard, GlowCard, MagneticElement, playTactileClick, playDigitalHover, CursorPhysicsDistortion } from '../components/VisualEffects'

// --- REUSABLE COMPONENTS ---

function SectionHeader({ title, subtitle }) {
  return (
    <div className="mb-8 md:mb-10 text-center px-4 relative">
      <h2 className="font-display text-2xl font-bold uppercase tracking-[0.25em] text-white sm:text-3xl">
        {title}
      </h2>
      <div className="mx-auto mt-3 h-0.5 w-20 bg-gradient-to-r from-purple-500 to-pink-500"></div>
      {subtitle && <p className="mt-4 text-[10px] md:text-xs font-mono font-bold uppercase tracking-[0.22em] text-purple-300">{subtitle}</p>}
    </div>
  )
}

function PrizeCard({ game, winner, runnerUp, icon: Icon, color }) {
  const colorClass = color === 'yellow' ? 'text-yellow-400 border-yellow-500/20 shadow-yellow-500/5' :
    color === 'red' ? 'text-red-400 border-red-500/20 shadow-red-500/5' :
      'text-blue-400 border-blue-500/20 shadow-blue-500/5';

  return (
    <TiltCard>
      <GlowCard 
        onClick={playTactileClick}
        onMouseEnter={playDigitalHover}
        className={`group relative overflow-hidden rounded-2xl border ${colorClass} bg-black/60 p-6 md:p-8 transition-all hover:scale-[1.02] cursor-pointer`}
      >
        <div className="mb-6 flex items-center justify-between">
          <Icon className={`h-8 w-8 ${color === 'yellow' ? 'text-yellow-400' : color === 'red' ? 'text-red-400' : 'text-blue-400'} group-hover:scale-110 transition-transform duration-300`} />
          <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-[9px] uppercase tracking-widest text-gray-400 font-mono">{game}</span>
        </div>

        <div className="space-y-5">
          <div>
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-500 font-mono mb-1"><Crown className="w-3.5 h-3.5 text-yellow-500" /> Winner</div>
            <div className="font-display text-2xl md:text-3xl font-bold text-white group-hover:text-purple-300 transition-colors">{winner}</div>
          </div>
          <div className="border-t border-white/5 pt-4">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-500 font-mono mb-1"><Shield className="w-3.5 h-3.5 text-gray-400" /> Runner-Up</div>
            <div className="font-display text-lg md:text-xl font-bold text-gray-300">{runnerUp}</div>
          </div>
        </div>
      </GlowCard>
    </TiltCard>
  )
}

function ScheduleItem({ day, date, phase, location, active }) {
  return (
    <div className={`relative flex gap-4 md:gap-6 border-l-2 py-4 pl-5 md:pl-6 ${active ? 'border-purple-500' : 'border-white/10'}`}>
      <div className={`absolute -left-[9px] top-6 h-4 w-4 rounded-full border-2 border-[#05010b] ${active ? 'bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]' : 'bg-gray-700'}`} />
      <div className="shrink-0 w-20 md:w-24">
        <div className="text-[9px] font-mono font-bold uppercase tracking-widest text-gray-500">{day}</div>
        <div className="font-display text-base md:text-lg text-white leading-tight">{date}</div>
      </div>
      <div>
        <h4 className="font-bold text-white text-sm md:text-base leading-tight">{phase}</h4>
        <div className="flex items-center gap-1.5 text-xs text-purple-300 mt-1.5 font-mono">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-purple-400" /> <span className="truncate">{location}</span>
        </div>
      </div>
    </div>
  )
}

// --- CLOSED REGISTRATION COMPONENT ---
function RegistrationClosed() {
  return (
    <GlowCard className="rounded-3xl border border-red-500/20 bg-black/60 p-8 md:p-12 backdrop-blur-xl max-w-2xl mx-auto text-center border-dashed relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-[40px] pointer-events-none" />
      <div className="inline-flex items-center justify-center p-4 bg-red-500/10 text-red-500 rounded-full mb-6 border border-red-500/20 animate-pulse">
        <Lock className="w-8 h-8 md:w-10 md:h-10" />
      </div>
      <h3 className="text-2xl font-display font-bold text-white uppercase tracking-wider mb-4">Registration Finalized</h3>
      <p className="text-gray-400 text-xs md:text-sm mb-8 max-w-md mx-auto leading-relaxed font-mono">
        Entry pass generation and tournament slots for <span className="text-white font-bold">The Pro Arena 2026</span> are now officially closed.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <MagneticElement>
          <a
            href="/Pro%20Arena%20Rules%20%26%20Regulation.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={playTactileClick}
            onMouseEnter={playDigitalHover}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all font-mono shadow-lg"
          >
            <FileText className="w-4 h-4 text-purple-400" /> View Rulebook (PDF)
          </a>
        </MagneticElement>
      </div>
    </GlowCard>
  )
}

// --- MAIN PAGE COMPONENT ---

export default function ProArena() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="space-y-20 pb-20"
    >
      
      {/* 1. CINEMATIC HERO (LOOKSMAXED HEADER FORMAT) */}
      <div className="space-y-4 relative lg:max-w-[58%]">
        <div className="absolute -top-12 -left-10 w-44 h-44 bg-purple-500/10 rounded-full blur-[60px] pointer-events-none" />
        <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 backdrop-blur-md text-[10px] font-mono font-black uppercase tracking-[0.25em] text-purple-300">
          <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
          <span>AYF 2026 flagship</span>
        </div>
        
        <div>
          <CursorPhysicsDistortion>
            <h1 className="font-display text-3xl font-black tracking-tighter text-white sm:text-5xl uppercase">
              The Pro <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-pink-600 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]">Arena</span> ⚔️
            </h1>
          </CursorPhysicsDistortion>
        </div>
        
        <p className="max-w-full text-sm leading-relaxed text-gray-300 sm:text-base border-l-2 border-purple-500/50 pl-4 py-1">
          The flagship inter-university esports championship of North India. Over <span className="text-pink-400 font-bold">281 players</span>, <span className="text-pink-400 font-bold">65 teams</span>, and <span className="text-pink-400 font-bold">1,500+ attendees</span> clashed inside the E2 Auditorium.
        </p>
        
        <div className="pt-2">
          <MagneticElement>
            <a
              href="/Pro%20Arena%20Rules%20%26%20Regulation.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={playTactileClick}
              onMouseEnter={playDigitalHover}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-lg shadow-purple-500/30 hover:brightness-110 border border-white/15"
            >
              <FileText className="h-3.5 w-3.5" /> Official Rulebook
            </a>
          </MagneticElement>
        </div>
      </div>

      {/* 2. THE PRIZE POOL */}
      <section id="prizes" className="space-y-6">
        <SectionHeader title="The Spoils of War" subtitle="Total Prize Pool: ₹95,000 + Trophies" />

        <div className="grid gap-6 md:grid-cols-3">
          <PrizeCard
            game="BGMI"
            winner="W2R Esports"
            runnerUp="Demon"
            icon={Target}
            color="yellow"
          />
          <PrizeCard
            game="VALORANT"
            winner="Armaros"
            runnerUp="10th Symphony"
            icon={Swords}
            color="red"
          />
          
          <div className="flex flex-col gap-6">
            <TiltCard>
              <GlowCard className="flex-1 rounded-2xl border border-blue-500/20 bg-blue-900/10 p-6 flex flex-col justify-center items-center text-center">
                <Crown className="h-8 w-8 text-blue-400 mb-3" />
                <div className="text-[10px] font-bold uppercase tracking-widest text-blue-300 font-mono">MVP Awards</div>
                <div className="font-display text-sm font-bold text-white mt-2">BGMI: Yatharth Tyagi</div>
                <div className="font-display text-sm font-bold text-white">VAL: Lakshay Lamba</div>
              </GlowCard>
            </TiltCard>
            
            <TiltCard>
              <GlowCard className="flex-1 rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl p-6 flex flex-col justify-center items-center text-center">
                <Gamepad2 className="h-8 w-8 text-purple-400 mb-3" />
                <div className="text-[10px] font-bold uppercase tracking-widest text-purple-300 font-mono">Experience Zone</div>
                <div className="text-xs text-gray-400 font-mono mt-2">9 PS5s + Racing Simulator</div>
              </GlowCard>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* 3. SCHEDULE & VENUES */}
      <section className="py-8">
        <div className="grid gap-12 md:grid-cols-2 items-start">
          
          {/* Left Column: Battle Plan */}
          <div className="space-y-6">
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.22em] text-purple-300 border-l-2 border-purple-500/50 pl-4 py-0.5">Battle Plan</h3>
            <div className="space-y-1">
              <ScheduleItem day="19-25 Feb" date="Phase 1" phase="Online Qualifiers" location="Discord / Custom Rooms" active={false} />
              <ScheduleItem day="27 Feb" date="Phase 2" phase="Quarter Finals" location="Offline / E2 Auditorium" active={false} />
              <ScheduleItem day="27 Feb" date="Semi Finals" phase="LAN Event Day 1" location="Amity E2 Auditorium" active={true} />
              <ScheduleItem day="28 Feb" date="Grand Finals" phase="LAN Event Day 2" location="Amity E2 Auditorium" active={true} />
            </div>

            <GlowCard className="rounded-xl border border-pink-500/30 bg-pink-900/10 p-4 flex items-center gap-4 relative overflow-hidden">
              <div className="rounded-full bg-pink-500 p-2.5 text-white animate-bounce"><Music className="w-5 h-5" /></div>
              <div>
                <div className="text-[9px] uppercase tracking-widest text-pink-400 font-mono font-bold">Post-Event Celebration</div>
                <div className="text-sm text-white font-bold leading-tight">Star Night ft. Harrdy Sandhu</div>
              </div>
            </GlowCard>
          </div>

          {/* Right Column: The Arena details */}
          <div className="space-y-6">
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.22em] text-purple-300 border-l-2 border-purple-500/50 pl-4 py-0.5">The Arena HQ</h3>
            <div className="space-y-4">
              
              <GlowCard className="p-5 rounded-xl border border-white/10 bg-black/60">
                <div className="flex items-center gap-3 mb-2">
                  <MapPin className="text-purple-500 w-4 h-4" />
                  <h4 className="font-bold text-white text-sm">E2 Auditorium</h4>
                </div>
                <p className="text-xs text-gray-400 pl-7 leading-relaxed font-mono">Main Stage for Grand Finals. 10 PC setups + dedicated LAN network. 1,500+ footfall across 2 days.</p>
              </GlowCard>

              <GlowCard className="p-5 rounded-xl border border-white/10 bg-black/60">
                <div className="flex items-center gap-3 mb-2">
                  <MapPin className="text-pink-500 w-4 h-4" />
                  <h4 className="font-bold text-white text-sm">E2 Back Hall</h4>
                </div>
                <p className="text-xs text-gray-400 pl-7 leading-relaxed font-mono">Experience Zone: 9 PS5 consoles + 1 racing simulator. Tekken 8, FC 26, F1, Street Fighter 6, Mortal Kombat 1.</p>
              </GlowCard>

              <GlowCard className="p-5 rounded-xl border border-white/10 bg-black/60">
                <div className="flex items-center gap-3 mb-2">
                  <Zap className="text-yellow-500 w-4 h-4" />
                  <h4 className="font-bold text-white text-sm">Tech Partners</h4>
                </div>
                <p className="text-xs text-gray-400 pl-7 leading-relaxed font-mono">10 gaming PCs with 240Hz monitors, high-end peripherals. Dedicated LAN tested by university IT team.</p>
              </GlowCard>

            </div>
          </div>

        </div>
      </section>

      {/* 4. EXPERIENCE ZONE GRID */}
      <section className="space-y-6">
        <SectionHeader title="Experience Zone" subtitle="Open to All Attendees" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Tekken 8', 'FC 26 & F1', 'Street Fighter 6', 'Mortal MK 1'].map((game) => (
            <MagneticElement key={game}>
              <div 
                onClick={playTactileClick}
                onMouseEnter={playDigitalHover}
                className="group flex h-24 items-center justify-center rounded-xl border border-white/10 bg-black/60 backdrop-blur-md hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-pink-500/10 hover:border-purple-500/30 transition-all duration-300 cursor-pointer select-none"
              >
                <span className="font-display text-sm font-bold uppercase text-gray-400 group-hover:text-white transition-colors text-center px-2">{game}</span>
              </div>
            </MagneticElement>
          ))}
        </div>
      </section>

      {/* 5. CLOSED REGISTRATION SECTION */}
      <section id="register-form" className="space-y-6">
        <SectionHeader title="Registration" subtitle="All entries are now finalized." />
        <RegistrationClosed />
      </section>

    </motion.div>
  )
}