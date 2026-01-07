import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Trophy, Calendar, MapPin, Users, Target, Gamepad2, AlertCircle, ArrowRight, Shield, Crown, Swords, Monitor, Zap, Music, CheckCircle, Loader2, Ticket, FileText, Lock } from 'lucide-react'

// --- REUSABLE COMPONENTS ---

function SectionHeader({ title, subtitle }) {
  return (
    <div className="mb-8 md:mb-10 text-center px-4">
      <h2 className="font-display text-3xl font-bold uppercase tracking-widest text-white sm:text-4xl">
        {title}
      </h2>
      <div className="mx-auto mt-3 h-1 w-24 bg-gradient-to-r from-purple-500 to-pink-500"></div>
      {subtitle && <p className="mt-4 text-xs md:text-sm font-medium uppercase tracking-widest text-gray-400">{subtitle}</p>}
    </div>
  )
}

function PrizeCard({ game, winner, runnerUp, icon: Icon, color }) {
  const colorClass = color === 'yellow' ? 'text-yellow-400 border-yellow-500/20' :
    color === 'red' ? 'text-red-400 border-red-500/20' :
      'text-blue-400 border-blue-500/20';

  return (
    <div className={`group relative overflow-hidden rounded-2xl border ${colorClass} bg-black/40 p-6 md:p-8 transition-all hover:scale-[1.02] hover:bg-white/5`}>
      <div className="mb-6 flex items-center justify-between">
        <Icon className={`h-8 w-8 ${color === 'yellow' ? 'text-yellow-400' : color === 'red' ? 'text-red-400' : 'text-blue-400'}`} />
        <div className="rounded-full bg-white/5 px-3 py-1 text-[10px] uppercase tracking-widest text-gray-400">{game}</div>
      </div>

      <div className="space-y-5 md:space-y-6">
        <div>
          <div className="flex items-center gap-2 text-[10px] md:text-xs uppercase tracking-widest text-gray-500 mb-1"><Crown className="w-3 h-3" /> Winner</div>
          <div className="font-display text-3xl md:text-4xl font-bold text-white">{winner}</div>
        </div>
        <div className="border-t border-white/5 pt-4">
          <div className="flex items-center gap-2 text-[10px] md:text-xs uppercase tracking-widest text-gray-500 mb-1"><Shield className="w-3 h-3" /> Runner-Up</div>
          <div className="font-display text-xl md:text-2xl font-bold text-gray-300">{runnerUp}</div>
        </div>
      </div>
    </div>
  )
}

function ScheduleItem({ day, date, phase, location, active }) {
  return (
    <div className={`relative flex gap-4 md:gap-6 border-l-2 py-4 pl-5 md:pl-6 ${active ? 'border-purple-500' : 'border-white/10'}`}>
      <div className={`absolute -left-[9px] top-6 h-4 w-4 rounded-full border-2 border-[#05010b] ${active ? 'bg-purple-500' : 'bg-gray-700'}`} />
      <div className="shrink-0 w-20 md:w-24">
        <div className="text-[10px] md:text-sm font-bold uppercase tracking-widest text-gray-400">{day}</div>
        <div className="font-display text-lg md:text-xl text-white leading-tight">{date}</div>
      </div>
      <div>
        <h4 className="font-bold text-white text-base md:text-lg leading-tight">{phase}</h4>
        <div className="flex items-center gap-1.5 text-xs md:text-sm text-purple-300 mt-1.5">
          <MapPin className="h-3 w-3 shrink-0" /> <span className="truncate">{location}</span>
        </div>
      </div>
    </div>
  )
}

// --- CLOSED REGISTRATION COMPONENT ---
function RegistrationClosed() {
  return (
    <div className="rounded-3xl border border-red-500/20 bg-black/50 p-8 md:p-12 backdrop-blur-md max-w-2xl mx-auto text-center border-dashed">
      <div className="inline-flex items-center justify-center p-4 bg-red-500/10 text-red-500 rounded-full mb-6">
        <Lock className="w-8 h-8 md:w-10 md:h-10" />
      </div>
      <h3 className="text-2xl md:text-3xl font-display font-bold text-white uppercase tracking-wider mb-4">Registration Closed</h3>
      <p className="text-gray-400 text-sm md:text-base mb-8 max-w-md mx-auto leading-relaxed">
        Entry pass generation and tournament registrations for <span className="text-white">The Pro Arena 2026</span> are now officially closed.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        {/* Fixed Link using URL encoding for spaces and ampersand */}
        <a
          href="/Pro%20Arena%20Rules%20%26%20Regulation.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all"
        >
          <FileText className="w-4 h-4" /> View Rulebook (PDF)
        </a>
      </div>
    </div>
  )
}

// --- MAIN PAGE COMPONENT ---

export default function ProArena() {
  return (
    <div className="space-y-24 md:space-y-32 pb-20 overflow-x-hidden">

      {/* 1. CINEMATIC HERO */}
      <section className="relative min-h-[60vh] md:min-h-[70vh] flex flex-col items-center justify-center text-center px-4 pt-16 md:pt-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[800px] h-[300px] md:h-[800px] bg-purple-600/10 blur-[80px] md:blur-[120px] rounded-full pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10 space-y-6 md:space-y-8 w-full max-w-4xl"
        >
          <div className="inline-block rounded border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] md:text-xs font-bold uppercase tracking-wider text-white">
            Amity Youth Fest 2026
          </div>

          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-black uppercase leading-[0.9] text-white tracking-tighter">
            The Pro <span className="text-transparent bg-clip-text bg-gradient-to-br from-purple-500 to-pink-500">Arena</span>
          </h1>

          <p className="mx-auto max-w-2xl text-sm sm:text-base md:text-lg text-gray-400 font-light tracking-wide px-2">
            The largest inter-university esports championship in North India.
            <span className="text-white font-bold block mt-2">Registrations are closed. Battle begins soon.</span>
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-4 md:pt-6">
            <a
              href="/Pro%20Arena%20Rules%20%26%20Regulation.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 md:h-14 items-center justify-center rounded-none border border-white/20 bg-white/5 px-8 md:px-10 text-xs md:text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-white hover:text-black"
            >
              Rulebook (PDF)
            </a>
          </div>
        </motion.div>
      </section>

      {/* 2. THE PRIZE POOL */}
      <section id="prizes">
        <SectionHeader title="The Spoils of War" subtitle="Total Prize Pool: ₹95,000 + Trophies" />

        <div className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-3 max-w-6xl mx-auto px-4">
          <PrizeCard
            game="BGMI"
            winner="₹30,000"
            runnerUp="₹20,000"
            icon={Target}
            color="yellow"
          />
          <PrizeCard
            game="VALORANT"
            winner="₹25,000"
            runnerUp="₹15,000"
            icon={Swords}
            color="red"
          />
          <div className="flex flex-col gap-6">
            <div className="flex-1 rounded-2xl border border-blue-500/20 bg-blue-900/10 p-6 flex flex-col justify-center items-center text-center">
              <Crown className="h-8 w-8 text-blue-400 mb-3 md:mb-4" />
              <div className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-blue-300">MVP Award</div>
              <div className="font-display text-2xl md:text-3xl font-bold text-white mt-1 md:mt-2">₹2,500 each</div>
            </div>
            <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-6 flex flex-col justify-center items-center text-center">
              <Gamepad2 className="h-8 w-8 text-purple-400 mb-3 md:mb-4" />
              <div className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-purple-300">Experience Zone</div>
              <div className="text-xs md:text-sm text-gray-400 mt-1 md:mt-2">Merch & Vouchers</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SCHEDULE & VENUES */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            <div>
              <h3 className="font-display text-xl md:text-2xl text-white mb-6 md:mb-8 uppercase tracking-widest">Battle Plan</h3>
              <div className="space-y-1">
                <ScheduleItem day="19-25 Feb" date="Phase 1" phase="Online Qualifiers" location="Discord / Custom Rooms" active={false} />
                <ScheduleItem day="27 Feb" date="Phase 2" phase="Quarter Finals" location="Offline / E2 Auditorium" active={false} />
                <ScheduleItem day="27 Feb" date="Semi Finals" phase="LAN Event Day 1" location="Amity E2 Auditorium" active={true} />
                <ScheduleItem day="28 Feb" date="Grand Finals" phase="LAN Event Day 2" location="Amity E2 Auditorium" active={true} />
              </div>

              <div className="mt-6 md:mt-8 rounded-xl border border-pink-500/30 bg-pink-900/10 p-3 md:p-4 flex items-center gap-3 md:gap-4">
                <div className="rounded-full bg-pink-500 p-2 md:p-2.5 text-white"><Music className="w-4 h-4 md:w-5 md:h-5" /></div>
                <div>
                  <div className="text-[9px] md:text-[10px] uppercase tracking-widest text-pink-400 font-bold">Post-Event Celebration</div>
                  <div className="text-sm md:text-base text-white font-bold leading-tight">Star Night ft. Harrdy Sandhu</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-display text-xl md:text-2xl text-white mb-6 md:mb-8 uppercase tracking-widest">The Arena</h3>
              <div className="space-y-4 md:space-y-6">
                <div className="rounded-xl border border-white/10 bg-black/40 p-5 md:p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <MapPin className="text-purple-500 w-4 h-4 md:w-5 md:h-5" />
                    <h4 className="font-bold text-white text-sm md:text-base">E2 Auditorium</h4>
                  </div>
                  <p className="text-xs md:text-sm text-gray-400 pl-7 md:pl-8 leading-relaxed">Main Stage for Grand Finals. 600+ Seating Capacity. Live Broadcasting.</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/40 p-5 md:p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <MapPin className="text-pink-500 w-4 h-4 md:w-5 md:h-5" />
                    <h4 className="font-bold text-white text-sm md:text-base">E2 Back Hall</h4>
                  </div>
                  <p className="text-xs md:text-sm text-gray-400 pl-7 md:pl-8 leading-relaxed">Experience Zone featuring PS5s.</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/40 p-5 md:p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Zap className="text-yellow-500 w-4 h-4 md:w-5 md:h-5" />
                    <h4 className="font-bold text-white text-sm md:text-base">Tech Partners</h4>
                  </div>
                  <p className="text-xs md:text-sm text-gray-400 pl-7 md:pl-8 leading-relaxed">Powered by top tier hardware. High-end rigs and 240Hz monitors provided.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. EXPERIENCE ZONE GRID */}
      <section>
        <SectionHeader title="Experience Zone" subtitle="Open to All Attendees" />
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 px-4">
          {['Tekken 8', 'FC 26 & F1', 'Street Fighter 6', 'Mortal MK 1'].map((game) => (
            <div key={game} className="group flex h-24 md:h-32 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition hover:bg-purple-600 hover:border-purple-500 cursor-pointer">
              <span className="font-display text-sm md:text-lg font-bold uppercase text-gray-400 transition group-hover:text-white text-center px-2">{game}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CLOSED REGISTRATION SECTION */}
      <section id="register-form" className="max-w-4xl mx-auto px-4 pb-10">
        <SectionHeader title="Registration" subtitle="All entries are now finalized." />
        <RegistrationClosed />
      </section> {/* <-- Fixed the missing closing section tag here */}

    </div>
  )
}