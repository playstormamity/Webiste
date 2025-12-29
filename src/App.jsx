import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Gamepad2,
  Users,
  Trophy,
  CalendarDays,
  Mail,
  MapPin,
  Instagram,
  Twitch,
  ArrowRight,
} from 'lucide-react'
import './App.css'
// NOTE: the file is unoptmised, run it through js'fier


import playstormLogo from './assets/logo.png'
 

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/roster', label: 'Roster' },
  { to: '/events', label: 'Events' },
  { to: '/contact', label: 'Contact' },
]

const pageTransition = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
}

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#05010b] via-[#080013] to-[#05010b] text-gray-100">
      <div className="pointer-events-none fixed inset-0 opacity-60">
        <div className="absolute -left-32 top-10 h-64 w-64 rounded-full bg-purple-700/40 blur-[110px]" />
        <div className="absolute bottom-10 right-0 h-72 w-72 rounded-full bg-pink-500/30 blur-[120px]" />
      </div>

      <Router>
        <header className="sticky top-0 z-40 border-b border-white/10 bg-black/40 backdrop-blur-xl">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <NavLink to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black/40 shadow-lg shadow-purple-500/40 overflow-hidden border border-purple-500/30">
                <img
                  src={playstormLogo}
                  alt="Playstorm Esports Club logo"
                  className="h-full w-full object-contain p-1"
                />
              </div>
              <div className="leading-tight">
                <div className="font-display text-xs uppercase tracking-[0.2em] text-purple-300">
                  Amity University Noida
                </div>
                <div className="font-display text-sm font-semibold text-white">
                  Playstorm Esports Club
                </div>
              </div>
            </NavLink>

            <div className="hidden items-center gap-6 text-sm font-medium md:flex">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    [
                      'relative px-1 py-1 text-xs uppercase tracking-[0.18em] transition-colors',
                      isActive ? 'text-purple-300' : 'text-gray-300 hover:text-white',
                    ].join(' ')
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span>{link.label}</span>
                      {isActive && (
                        <span className="absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400" />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </nav>
        </header>

        <main className="relative z-10 mx-auto max-w-6xl px-4 pb-16 pt-10">
          {children}
        </main>

        <footer className="relative z-10 border-t border-white/10 bg-black/50">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-6 text-xs text-gray-400 md:flex-row">
            <p>© {new Date().getFullYear()} Playstorm Esports Club · Amity University Noida</p>
            <p className="flex items-center gap-1 text-[11px] uppercase tracking-[0.22em] text-gray-500">
              <span className="h-1 w-1 rounded-full bg-emerald-400" /> Competitive. Inclusive. Future-ready.
            </p>
          </div>
        </footer>
      </Router>
    </div>
  )
}

function HomePage() {
  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="space-y-24"
    >
      <section className="grid gap-10 md:grid-cols-[3fr,2fr] md:items-center">
        <div className="space-y-6">
          <motion.img
            src={playstormLogo}
            alt="Playstorm Esports Club logo"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="h-24 w-auto mb-2"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-purple-500/40 bg-black/60 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-purple-100 shadow-lg shadow-purple-500/30"
          >
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-tr from-purple-500 to-pink-500">
              <SparkleDot />
            </span>
            Official Esports Club · Amity University Noida
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-3xl leading-tight text-white sm:text-4xl lg:text-5xl"
          >
            Where{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-300 bg-clip-text text-transparent">
              casual lobbies
            </span>{" "}
            become{" "}
            <span className="bg-gradient-to-r from-pink-400 to-purple-300 bg-clip-text text-transparent">
              championship runs.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18 }}
            className="max-w-xl text-sm text-gray-300 sm:text-base"
          >
            Playstorm is Amity University Noida&apos;s central hub for all things esports – from
            competitive scrims and inter-college leagues to casual community nights, broadcast
            production and content creation.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24 }}
            className="flex flex-wrap items-center gap-4"
          >
            <a
              href="#join"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-lg shadow-purple-500/40 transition hover:brightness-110"
            >
              Join the club
              <ArrowRight className="h-4 w-4" />
            </a>
            <NavLink
              to="/events"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-gray-200 transition hover:border-purple-400 hover:text-white"
            >
              View events
            </NavLink>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="grid max-w-lg grid-cols-3 gap-4 text-xs text-gray-300"
          >
            <StatCard label="Active players" value="120+" />
            <StatCard label="Titles covered" value="8" />
            <StatCard label="Major trophies" value="14" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, type: 'spring', stiffness: 120 }}
          className="relative mx-auto w-full max-w-sm"
        >
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-purple-500/70 via-pink-500/60 to-purple-400/60 opacity-60 blur-2xl" />
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/60 p-5 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between text-[10px] text-gray-400">
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Live scrims lobby
              </span>
              <span>Playstorm · Noida</span>
            </div>

            <div className="mt-4 rounded-2xl bg-gradient-to-br from-[#5B21B6] via-[#7C3AED] to-[#DB2777] px-4 py-6">
              <div className="mb-4 flex items-center justify-between text-xs text-purple-50">
                <div>
                  <div className="font-display text-[11px] uppercase tracking-[0.22em] text-purple-100">
                    Match lobby · Valorant
                  </div>
                  <div className="mt-1 text-[11px] text-purple-100/80">
                    Amity vs Delhi Circuit · Best of 3
                  </div>
                </div>
                <div className="rounded-xl bg-black/30 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-emerald-300">
                  Live
                </div>
              </div>

              <div className="space-y-3 text-xs text-purple-50/90">
                <HighlightRow label="Avg. SR" value="Immortal / Ascendant mix" />
                <HighlightRow label="Stream lobby" value="@playstormAU · Twitch" />
                <HighlightRow label="Campus room" value="Esports Lab · Block E" />
              </div>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-3 text-[10px] text-gray-300">
              <Pill label="Practice scrims" />
              <Pill label="On-campus LANs" />
              <Pill label="Broadcast desk" />
              <Pill label="Analyst sessions" />
              <Pill label="Content studio" />
              <Pill label="Inter-college leagues" />
            </div>
          </div>
        </motion.div>
      </section>

      <Section
        id="titles"
        eyebrow="Titles we compete in"
        title="From tactical shooters to beautiful chaos."
        description="Our rosters are built around titles that the Amity community actually grinds – with structured teams, coaches and regular practice blocks."
      >
        <div className="grid gap-5 md:grid-cols-3">
          <GameCard
            title="Valorant"
            subtitle="Main competitive title"
            description="Multiple collegiate rosters, role-based tryouts and structured VOD reviews with seniors."
          />
          <GameCard
            title="BGMI / Mobile"
            subtitle="On-the-go fragging"
            description="Squads geared for campus-level circuits and online community tournaments."
          />
          <GameCard
            title="Rocket League & more"
            subtitle="High-octane mix"
            description="Side-rosters for FIFA, Rocket League and fighting games based on interest each semester."
          />
        </div>
      </Section>

      <Section
        id="events"
        eyebrow="Events & broadcasts"
        title="Built by students, for students."
        description="LAN nights, semester showdowns, reveal streams and content drops – everything is produced end-to-end by the club."
      >
        <div className="grid gap-5 md:grid-cols-3">
          <EventPreviewCard
            title="Campus Clash Weekly"
            date="Every Friday · 6PM"
            tag="Open lobby"
            description="Drop in with your stack or find a team on the spot – mixed lobbies balanced by our admins."
          />
          <EventPreviewCard
            title="Inter-Amity Invitational"
            date="Mid-semester"
            tag="Flagship"
            description="Our annual multi-title event featuring teams from other Amity campuses and nearby colleges."
          />
          <EventPreviewCard
            title="Creator Lab Sessions"
            date="Monthly · Media Lab"
            tag="Workshops"
            description="Hands-on sessions on observing scrims, desk hosting, overlays, streaming and editing."
          />
        </div>
      </Section>

      <Section
        id="join"
        eyebrow="Join the storm"
        title="Pick your lane inside the club."
        description="You don&apos;t have to be a Radiant to be part of the scene – we&apos;re building a full ecosystem of players, staff and creators."
      >
        <div className="grid gap-6 md:grid-cols-3">
          <JoinCard
            title="Competitive rosters"
            points={['Title-specific trials', 'Structured practice blocks', 'Analyst + VOD review support']}
          />
          <JoinCard
            title="Broadcast & production"
            points={['Observer + shoutcasting roles', 'Overlay and stream design', 'Highlight edits & recaps']}
          />
          <JoinCard
            title="Community & socials"
            points={['Casual lobby nights', 'IRL viewing parties', 'Memes, reels and story takeovers']}
          />
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-purple-500/40 bg-black/40 px-5 py-4 text-xs text-gray-200">
      <div>
            <p className="font-display text-[11px] uppercase tracking-[0.22em] text-purple-200">
              Quick connect
            </p>
            <p className="mt-1 text-xs text-gray-300">
              DM the club socials or fill out the form on the contact page – seniors will pull you into the Discord.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="#"
              className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-1.5 text-[11px] uppercase tracking-[0.2em] text-white"
            >
              <DiscordPill />
              Discord
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-1 rounded-full border border-white/20 px-3 py-1.5 text-[11px] uppercase tracking-[0.2em] text-gray-100"
            >
              <Instagram className="h-3.5 w-3.5" />
              Instagram
            </a>
          </div>
        </div>
      </Section>
    </motion.div>
  )
}

function AboutPage() {
  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.45 }}
      className="space-y-10"
    >
      <PageHeader
        eyebrow="About the club"
        title="Esports as a serious, structured campus activity."
        description="Playstorm started as a bunch of lab scrims and quickly turned into a proper organisation – complete with rosters, managers, analysts and creators."
      />

      <div className="grid gap-8 md:grid-cols-[3fr,2fr]">
        <div className="space-y-4 text-sm text-gray-200">
          <p>
            We exist to give Amity University Noida students a realistic esports ecosystem – the same
            vibe as professional orgs, but tuned for campus life. That means healthy scrim culture,
            clear communication channels, and a focus on both performance and well-being.
          </p>
          <p>
            Whether you&apos;re grinding ranked, obsessed with observing and casting, or just want a
            place to hang out with like-minded gamers, there&apos;s a slot for you somewhere inside
            Playstorm.
          </p>
          <p>
            We work closely with student bodies and faculty wherever needed for approvals, space
            bookings and representing the university at official tournaments.
          </p>
        </div>

        <div className="space-y-4 rounded-2xl border border-purple-500/40 bg-black/40 p-5 text-xs text-gray-200">
          <h3 className="font-display text-xs uppercase tracking-[0.22em] text-purple-200">
            What we focus on
          </h3>
          <ul className="space-y-2">
            <li className="flex gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-purple-400" />
              <span>Semester-based roadmap for titles, events and content drops.</span>
            </li>
            <li className="flex gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-purple-400" />
              <span>Support structure for captains, IGLs, analysts and managers.</span>
            </li>
            <li className="flex gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-purple-400" />
              <span>Maintaining a positive, inclusive in-game and on-campus reputation.</span>
            </li>
          </ul>

          <div className="mt-4 grid grid-cols-2 gap-3 text-[11px] text-gray-300">
            <div>
              <div className="font-display text-[10px] uppercase tracking-[0.24em] text-purple-200">
                Core team
              </div>
              <p>President, Vice President, esports leads for each title, broadcast and community heads.</p>
            </div>
            <div>
              <div className="font-display text-[10px] uppercase tracking-[0.24em] text-purple-200">
                Location
              </div>
              <p>Amity University Noida · Main Campus · Esports & Media labs (blocks E & F).</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function RosterPage() {
  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.45 }}
      className="space-y-10"
    >
      <PageHeader
        eyebrow="Rosters"
        title="Line-ups built around chemistry and grind."
        description="Below are sample roster blocks you can customise later with real IGN handles, roles and photos."
      />

      <div className="grid gap-8 md:grid-cols-2">
        <RosterBlock
          title="Valorant · A-Team"
          note="Main competitive roster – invited & trial based."
          players={[
            'IGL / Controller',
            'Duelist',
            'Sentinel',
            'Flex',
            'Initiator',
          ]}
        />
        <RosterBlock
          title="Valorant · Academy"
          note="Practice and development roster – open signups every semester."
          players={['Entry', 'Support', 'Flex', 'Sniper', 'Sub / Sixth']}
        />
        <RosterBlock
          title="BGMI Squad"
          note="Mobile-focused squad for online and LAN circuits."
          players={['IGL', 'Entry fragger', 'Support', 'Scout / Utility']}
        />
        <RosterBlock
          title="Broadcast & Media Crew"
          note="Observers, casters, desk hosts, editors and graphics."
          players={['Observer', 'Shoutcaster', 'Desk host', 'Editor', 'Graphics / overlays']}
        />
      </div>
    </motion.div>
  )
}

function EventsPage() {
  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.45 }}
      className="space-y-10"
    >
      <PageHeader
        eyebrow="Events calendar"
        title="A mix of serious brackets and chill community nights."
        description="This is a sample events layout – replace the blocks with confirmed brackets and timings for your demo."
      />

      <div className="space-y-6">
        <EventRow
          title="Playstorm Launch LAN"
          date="January · On-campus LAN"
          description="Introductory 5v5 Valorant and 4-man BGMI event to announce the club and scout interested players."
        />
        <EventRow
          title="Mid-Semester Showdown"
          date="March · Hybrid"
          description="Multi-title bracket with online qualifiers and an on-campus finals day stream."
        />
        <EventRow
          title="Creator Cup"
          date="April · Online"
          description="Fun custom lobbies with creators and student streamers from Amity and nearby colleges."
        />
        <EventRow
          title="Off-season Chill Queue"
          date="All year"
          description="Casual nights in the esports lab – ARAMs, customs, party games and watch parties."
        />
      </div>
    </motion.div>
  )
}

function ContactPage() {
  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.45 }}
      className="space-y-10"
    >
      <PageHeader
        eyebrow="Contact"
        title="Reach out to the Playstorm core team."
        description="Use this sample form and contact blocks for your demo – plug in the actual emails, room numbers and links later."
      />

      <div className="grid gap-8 md:grid-cols-[3fr,2fr]">
        <form className="space-y-4 rounded-2xl border border-purple-500/40 bg-black/40 p-5 text-sm text-gray-200">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Name" placeholder="Your full name" />
            <Field label="Amity enrollment / program" placeholder="e.g. B.Tech CSE · 2nd Year" />
          </div>
          <Field label="University email" placeholder="you@amity.edu" type="email" />

          <div className="grid gap-4 md:grid-cols-2">
            <Field label="What are you interested in?" placeholder="Comp roster / casting / content / casual" />
            <Field label="Primary game" placeholder="Valorant, BGMI, etc." />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-200">Tell us a bit more</label>
            <textarea
              rows={4}
              placeholder="Rank, role, past tournament experience or what you’d like to help with…"
              className="w-full rounded-xl border border-white/15 bg-black/60 px-3 py-2 text-sm text-gray-100 outline-none ring-0 placeholder:text-gray-500 focus:border-purple-400"
            />
          </div>

          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-lg shadow-purple-500/30 hover:brightness-110"
          >
            <Mail className="h-4 w-4" />
            Submit (Demo only)
        </button>
        </form>

        <div className="space-y-5 text-xs text-gray-200">
          <div className="rounded-2xl border border-purple-500/40 bg-black/40 p-4">
            <h3 className="font-display text-[11px] uppercase tracking-[0.22em] text-purple-200">
              Quick info
            </h3>
            <div className="mt-3 space-y-2">
              <InfoRow icon={<Mail className="h-3.5 w-3.5" />} label="Email (demo)" value="playstorm@amity.edu" />
              <InfoRow
                icon={<MapPin className="h-3.5 w-3.5" />}
                label="On-campus"
                value="Esports Lab · Block E (exact room TBD)"
              />
              <InfoRow
                icon={<CalendarDays className="h-3.5 w-3.5" />}
                label="Office hours"
                value="Post-classes · Evenings & weekends (as announced on Discord)."
              />
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
            <h3 className="font-display text-[11px] uppercase tracking-[0.22em] text-purple-200">
              Socials (placeholder)
            </h3>
            <div className="mt-3 flex flex-wrap gap-3">
              <SocialPill icon={<DiscordPill />} label="Discord server" />
              <SocialPill icon={<Instagram className="h-3.5 w-3.5" />} label="@playstorm.amity" />
              <SocialPill icon={<Twitch className="h-3.5 w-3.5" />} label="twitch.tv/playstormAU" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function PageHeader({ eyebrow, title, description }) {
  return (
    <div className="space-y-3">
      <p className="font-display text-[11px] uppercase tracking-[0.26em] text-purple-300">{eyebrow}</p>
      <h2 className="font-display text-2xl text-white sm:text-3xl">{title}</h2>
      <p className="max-w-2xl text-sm text-gray-200 sm:text-base">{description}</p>
    </div>
  )
}

function Section({ id, eyebrow, title, description, children }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.28 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="space-y-6"
    >
      <div className="space-y-2">
        <p className="font-display text-[11px] uppercase tracking-[0.26em] text-purple-300">{eyebrow}</p>
        <h2 className="font-display text-xl text-white sm:text-2xl">{title}</h2>
        <p className="max-w-2xl text-sm text-gray-200">{description}</p>
      </div>
      {children}
    </motion.section>
  )
}

function StatCard({ label, value }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/40 px-3 py-2.5 shadow-lg shadow-purple-500/10">
      <div className="text-[11px] uppercase tracking-[0.22em] text-gray-400">{label}</div>
      <div className="mt-1 text-lg font-semibold text-white">{value}</div>
    </div>
  )
}

function HighlightRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-[11px] uppercase tracking-[0.2em] text-purple-100/80">{label}</span>
      <span className="text-[11px] text-purple-50">{value}</span>
    </div>
  )
}

function Pill({ label }) {
  return (
    <span className="inline-flex items-center rounded-full bg-black/60 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-gray-200 ring-1 ring-white/15">
      {label}
    </span>
  )
}

function GameCard({ title, subtitle, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="group rounded-2xl border border-purple-500/40 bg-black/40 p-4 shadow-lg shadow-purple-500/20 transition hover:border-pink-400/60 hover:shadow-pink-500/30"
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="font-display text-[11px] uppercase tracking-[0.28em] text-purple-200">
            {subtitle}
          </p>
          <h3 className="mt-2 text-lg font-semibold text-white">{title}</h3>
        </div>
        <Gamepad2 className="h-7 w-7 text-purple-200/90" />
      </div>
      <p className="mt-3 text-xs text-gray-200">{description}</p>
    </motion.div>
  )
}

function EventPreviewCard({ title, date, tag, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="group flex flex-col justify-between rounded-2xl border border-purple-500/40 bg-black/40 p-4 shadow-lg shadow-purple-500/20 transition hover:border-pink-400/60 hover:shadow-pink-500/30"
    >
      <div>
        <div className="flex items-center justify-between gap-3 text-[11px] text-gray-300">
          <span>{date}</span>
          <span className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-white">
            {tag}
          </span>
        </div>
        <h3 className="mt-3 text-base font-semibold text-white">{title}</h3>
        <p className="mt-2 text-xs text-gray-200">{description}</p>
      </div>
      <div className="mt-3 flex items-center justify-between text-[11px] text-purple-200/90">
        <span className="flex items-center gap-1">
          <Users className="h-3.5 w-3.5" />
          Slots limited · Sign up early
        </span>
        <span className="flex items-center gap-1 text-purple-100/80">
          <Trophy className="h-3.5 w-3.5" />
          Trophies + merch
        </span>
      </div>
    </motion.div>
  )
}

function JoinCard({ title, points }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="rounded-2xl border border-purple-500/40 bg-black/40 p-4 shadow-lg shadow-purple-500/20"
    >
      <h3 className="font-display text-sm text-white">{title}</h3>
      <ul className="mt-3 space-y-2 text-xs text-gray-200">
        {points.map((p) => (
          <li key={p} className="flex gap-2">
            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-purple-400" />
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

function Field({ label, placeholder, type = 'text' }) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-medium text-gray-200">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/15 bg-black/60 px-3 py-2 text-sm text-gray-100 outline-none ring-0 placeholder:text-gray-500 focus:border-purple-400"
      />
    </div>
  )
}

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 text-purple-200">{icon}</div>
      <div>
        <p className="text-[11px] uppercase tracking-[0.22em] text-gray-400">{label}</p>
        <p className="text-xs text-gray-100">{value}</p>
      </div>
    </div>
  )
}

function SocialPill({ icon, label }) {
  return (
    <button
      type="button"
      className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/60 px-3 py-1.5 text-[11px] uppercase tracking-[0.22em] text-gray-100 hover:border-purple-400"
    >
      <span className="text-purple-200">{icon}</span>
      {label}
    </button>
  )
}

function RosterBlock({ title, note, players }) {
  return (
    <div className="rounded-2xl border border-purple-500/40 bg-black/40 p-4 text-xs text-gray-200 shadow-lg shadow-purple-500/20">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="font-display text-sm text-white">{title}</h3>
          <p className="mt-1 text-[11px] text-gray-300">{note}</p>
        </div>
        <span className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-white">
          5-stack
        </span>
      </div>
      <ul className="mt-3 space-y-1.5">
        {players.map((p) => (
          <li key={p} className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
              <span>{p}</span>
            </span>
            <span className="text-[10px] text-gray-400">@ign_here</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function EventRow({ title, date, description }) {
  return (
    <div className="rounded-2xl border border-purple-500/40 bg-black/40 p-4 text-xs text-gray-200 shadow-lg shadow-purple-500/20">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.24em] text-purple-200">Upcoming (demo)</p>
          <h3 className="mt-1 text-sm font-semibold text-white">{title}</h3>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-gray-300">
          <CalendarDays className="h-3.5 w-3.5" />
          <span>{date}</span>
        </div>
      </div>
      <p className="mt-2 text-xs text-gray-200">{description}</p>
    </div>
  )
}

function SparkleDot() {
  return (
    <span className="relative inline-flex">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-200 opacity-60" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
    </span>
  )
}

function DiscordPill() {
  return (
    <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#5865F2] text-[10px] font-bold text-white">
      D
    </span>
  )
}

function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-[#05010b] via-[#080013] to-[#05010b]"
    >
      {/* Animated background gradients */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -left-32 top-10 h-64 w-64 rounded-full bg-purple-700/40 blur-[110px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5,
          }}
          className="absolute bottom-10 right-0 h-72 w-72 rounded-full bg-pink-500/30 blur-[120px]"
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-8">
        {/* Logo with glow effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative"
        >
          {/* Glow rings */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/50 via-pink-500/50 to-purple-500/50 blur-2xl"
            style={{ width: '200px', height: '200px', margin: '-100px' }}
          />
          
          {/* Logo container */}
          <div className="relative flex h-32 w-32 items-center justify-center rounded-2xl bg-black/60 backdrop-blur-xl border border-purple-500/40 shadow-2xl shadow-purple-500/50">
            <motion.img
              src={playstormLogo}
              alt="Playstorm Esports Club logo"
              className="h-24 w-24 object-contain p-2"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>
        </motion.div>

        {/* Club name */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-300 bg-clip-text text-transparent">
              PLAYSTORM
            </span>
          </h2>
          <p className="mt-2 font-display text-xs uppercase tracking-[0.3em] text-purple-300">
            ESPORTS CLUB
          </p>
        </motion.div>

        {/* Loading spinner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="relative h-1 w-48 overflow-hidden rounded-full bg-black/40 border border-purple-500/30">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="text-xs uppercase tracking-[0.2em] text-gray-400"
          >
            Loading...
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  )
}

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time (you can adjust this or remove it if you want instant load)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000) // 2 seconds loading time

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen />}
      </AnimatePresence>
      
      {!isLoading && (
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/roster" element={<RosterPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </Layout>
      )}
    </>
  )
}

export default App
