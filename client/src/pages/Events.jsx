import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CalendarDays, MapPin, Trophy, ArrowRight, X, Info, Sparkles } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { createPortal } from 'react-dom'
import { TiltCard, GlowCard, MagneticElement, playTactileClick, playDigitalHover, CursorPhysicsDistortion } from '../components/VisualEffects'

// --- LOCAL ASSET IMPORTS (WEBP FORMAT) ---
import season2Poster from '../assets/season2_poster.webp'
import bgmiWinter1 from '../assets/bgmi_winter1.webp'
import bgmiWinter2 from '../assets/bgmi_winter2.webp'
import collegeRivals1 from '../assets/college_rivals_1.webp'
import collegeRivals2 from '../assets/college_rivals_2.webp'
import collegeRivals3 from '../assets/college_rivals_3.webp'
import collegeRivals4 from '../assets/college_rivals_4.webp'
import collegeRivals5 from '../assets/college_rivals_5.webp'
import collegeRivals6 from '../assets/college_rivals_6.webp'
import collegeRivals7 from '../assets/college_rivals_7.webp'
import collegeRivals8 from '../assets/college_rivals_8.webp'
import valo2v2Poster from '../assets/valo_2v2.webp'
import parkourPoster from '../assets/parkour1.1.webp'
import tekkenPoster from '../assets/tekken_poster.webp'
import valoSeries1Poster from '../assets/valo_series1.webp'
import arena1Poster from '../assets/arena1.webp'
import arenaBgmiPoster from '../assets/arena_bgmi1.webp'
import arenaValorantPoster from '../assets/arena_valo1.webp'
import arenaExperiencePoster from '../assets/arena_experience1.webp'
import season3Poster from '../assets/season3_poster.png'

// --- FEATURED EVENT CARD (Upcoming Season 3) ---
function Season3EventSpotlight() {
  return (
    <TiltCard>
      <Link
        to="/s3"
        onClick={playTactileClick}
        onMouseEnter={playDigitalHover}
        className="group relative block overflow-hidden rounded-2xl border border-purple-500/30 bg-black/50 p-6 md:p-10 shadow-2xl shadow-purple-900/20 transition-all duration-500 hover:shadow-[0_0_80px_rgba(168,85,247,0.3)] hover:border-purple-500/50"
      >
        {/* Background Poster */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src={season3Poster}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-all duration-700 blur-[12px] scale-110 group-hover:scale-[1.15]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-purple-900/40 mix-blend-multiply" />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Dynamic Backgrounds */}
        <div className="absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-purple-600/30 to-pink-600/20 blur-[120px] group-hover:bg-purple-500/30 transition-colors duration-700 z-0" />
        <div className="absolute -left-40 -bottom-40 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-blue-600/20 to-emerald-600/20 blur-[120px] group-hover:bg-blue-500/30 transition-colors duration-700 z-0" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay z-0" />

        {/* Animated Border/Shimmer */}
        <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-shimmer pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative z-10 grid gap-8 md:grid-cols-[1.4fr,1fr] items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-2 flex-wrap">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 px-3 py-1 text-[10px] font-bold uppercase tracking-widest relative">
                <span className="absolute -inset-1 bg-emerald-500/20 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-500"></span>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="relative text-emerald-400">REGISTRATION OPEN</span>
              </div>
              <span className="rounded-full border border-purple-500/30 bg-black/40 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-sm relative">
                <span className="absolute -inset-1 bg-purple-500/20 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-500"></span>
                <span className="relative">May 30 - Jun 28</span>
              </span>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400">PlayStorm Esports Club</p>
              <h3 className="font-display text-4xl md:text-5xl text-white mt-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-purple-500 to-pink-500 drop-shadow-[0_0_15px_rgba(236,72,153,0.3)]">Season 3</span>
              </h3>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed mt-3">
                The biggest inter-college online esports tournament by PlayStorm. 5 game titles — Valorant, BGMI, Clash Royale, Tekken 8 & EA FC 26. ₹1L+ total prize pool. Open to all college students across India.
              </p>
            </div>

            <div className="flex flex-wrap gap-6 text-sm font-medium text-gray-300">
              <div className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-purple-400" />
                <span>May 30 - Jun 28</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-purple-400" />
                <span>Online (Discord)</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-yellow-400" />
                <span className="text-yellow-400">₹1L+ Prize Pool</span>
              </div>
            </div>

            <div className="relative inline-flex group/btn">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur opacity-30 group-hover/btn:opacity-60 transition duration-300"></div>
              <div className="relative inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 text-sm font-bold uppercase tracking-widest text-white shadow-lg transition-all group-hover/btn:shadow-purple-500/40">
                View Details & Register <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          <div className="hidden md:block border-l border-white/10 pl-8 relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[1px] h-3/4 bg-gradient-to-b from-transparent via-purple-500 to-transparent opacity-50" />

            <div className="space-y-6">
              <div className="space-y-1">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Organizers</p>
                <p className="text-white">PlayStorm Esports Club</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Venue</p>
                <p className="text-white">Online (Discord)</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Game Titles</p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {['Valorant', 'BGMI', 'Clash Royale', 'Tekken 8', 'EA FC 26'].map((game) => (
                    <span key={game} className="px-2 py-1 rounded bg-black/60 border border-white/10 text-[10px] uppercase font-bold text-gray-300 hover:border-purple-500/50 hover:text-white hover:shadow-[0_0_10px_rgba(168,85,247,0.3)] transition-all cursor-default">
                      {game}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </TiltCard>
  )
}

// --- EVENT MODAL ---
function EventModal({ event, onClose }) {
  if (!event) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-[#0a0a0a] border border-purple-500/30 rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto text-white"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-white/10 transition z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 md:p-8 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-bold uppercase tracking-widest border border-purple-500/30">
                {event.tag}
              </span>
              <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">{event.date}</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-display text-white">{event.title}</h3>
          </div>

          <div className="space-y-4 text-sm text-gray-300 leading-relaxed border-t border-white/10 pt-4">
            {event.description ? (
              <div className="whitespace-pre-line text-gray-300">{event.description}</div>
            ) : (
              <p className="italic text-gray-500">No additional details available for this event.</p>
            )}

            {event.subEvents && event.subEvents.length > 0 && (
              <div className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-widest text-purple-300">Series Timeline</p>
                <div className="space-y-3">
                  {event.subEvents.map((item, index) => (
                    <div key={`${item.title}-${index}`} className="rounded-xl border border-white/10 bg-black/60 p-3">
                      <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400">
                        <span className="font-semibold uppercase tracking-widest text-gray-300">{item.date}</span>
                        {item.venue && <span className="text-gray-500">• {item.venue}</span>}
                      </div>
                      <p className="text-sm text-white mt-1">{item.title}</p>
                      {item.highlights && (
                        <p className="text-xs text-gray-400 mt-2">{item.highlights}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {event.images && event.images.length > 0 && (
            <div className="space-y-4 mt-6">
              {event.images.map((img, index) => (
                <div key={index} className="rounded-xl overflow-hidden border border-white/10">
                  <img src={img} alt={`${event.title} ${index + 1}`} className="w-full h-auto object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>,
    document.body
  )
}

// --- SMALLER EVENT ROW ---
function EventRow({ event, onClick, clickable = true }) {
  const isPast = event.status === "Completed";
  const isClickable = clickable && typeof onClick === 'function';

  return (
    <MagneticElement>
      <div
        onClick={isClickable ? () => { playTactileClick(); onClick(event); } : undefined}
        onMouseEnter={playDigitalHover}
        className={`group flex items-center justify-between p-4 rounded-xl border w-full ${isClickable ? 'cursor-pointer' : 'cursor-default'} ${isPast ? 'border-white/5 bg-white/5 opacity-80 hover:opacity-100' : 'border-purple-500/20 bg-purple-500/5 hover:border-purple-500/40'} transition duration-300`}
      >
        <div>
          <h4 className={`font-bold text-sm md:text-base transition ${isPast ? 'text-gray-300 group-hover:text-white' : 'text-white group-hover:text-purple-300'}`}>
            {event.title}
          </h4>
          <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
            <CalendarDays className="w-3 h-3" />
            <span>{event.date}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${isPast ? 'bg-black/20 border-white/5 text-gray-500' : 'bg-purple-500/10 border-purple-500/20 text-purple-300'}`}>
            {event.tag}
          </span>
          <Info className="w-4 h-4 text-gray-600 group-hover:text-purple-400 transition" />
        </div>
      </div>
    </MagneticElement>
  )
}

function MajorEventCard({ event, onClick }) {
  const navigate = useNavigate()

  const handleClick = () => {
    playTactileClick()
    if (event.linkTo) {
      navigate(event.linkTo)
    } else {
      onClick(event)
    }
  }

  return (
    <TiltCard>
      <GlowCard
        onClick={handleClick}
        onMouseEnter={playDigitalHover}
        className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/60 p-6 md:p-8 shadow-2xl shadow-black/30 cursor-pointer"
      >
        {event.cover && (
          <div className="absolute inset-0">
            <img
              src={event.cover}
              alt={event.title}
              className="h-full w-full object-cover opacity-25 group-hover:opacity-35 transition duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/30" />
          </div>
        )}

        <div className="relative z-10 space-y-5">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-bold uppercase tracking-widest border border-purple-500/30">
              {event.tag}
            </span>
            <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">{event.date}</span>
          </div>
          <div>
            <h4 className="font-display text-2xl text-white">{event.title}</h4>
            <p className="text-sm text-gray-300 mt-2">{event.summary}</p>
            {event.subEvents && event.subEvents.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {event.subEvents.map((subEvent, index) => (
                  <span
                    key={`${event.title}-sub-${index}`}
                    className="rounded-full border border-purple-400/30 bg-purple-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-purple-200"
                  >
                    {subEvent.title}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-200">
            View details <ArrowRight className="w-3 h-3" />
          </div>
        </div>
      </GlowCard>
    </TiltCard>
  )
}

function TimelineNode({ event, onClick, isMajor }) {
  const isClickable = event.clickable !== false;

  return (
    <div className="relative pl-10 md:pl-12">
      <div className="absolute left-1 top-6 h-3 w-3 rounded-full border-2 border-[#05010b] bg-purple-500 shadow-[0_0_12px_rgba(168,85,247,0.6)]" />
      <div className="absolute left-2 top-9 h-full w-px bg-white/10" />
      {isMajor ? (
        <MajorEventCard event={event} onClick={onClick} />
      ) : (
        <EventRow event={event} onClick={onClick} clickable={isClickable} />
      )}
    </div>
  )
}

function TimelineMonthSeparator({ label }) {
  return (
    <div className="relative pl-10 md:pl-12">
      <div className="absolute left-[7px] top-1 h-2 w-2 rounded-full bg-white/20" />
      <div className="flex items-center gap-3">
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-500">{label}</span>
        <div className="h-px flex-1 bg-white/10" />
      </div>
    </div>
  )
}

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const majorEvents = [
    {
      title: "College Rivals 3",
      date: "Aug 28, 2024",
      tag: "Kickoff",
      status: "Completed",
      monthLabel: "Aug 2024",
      timelineOrder: 20240828,
      isMajor: true,
      summary: "A campus-wide kickoff to build esports culture and scout top talent for the nationwide College Rivals circuit.",
      description: `College Rivals 3 was a full-day esports showcase to grow campus esports culture and scout talent for the nationwide College Rivals circuit (₹30L prize pool).

Date & Venue: Aug 28, 2024 · 10:00 AM - 6:00 PM · Palm Court, Amity University, Noida.

Highlights: 1,000-2,000 student footfall, Red Bull sponsorship, professional racing simulators, a Valorant PC van, and FIFA on PlayStation. Competitive play covered BGMI (4v4 TDM + 1v1), Valorant solo formats (Spike Rush / Swiftplay), and FIFA 1v1. Crowd energy stayed high with mini-games like musical chairs, push-up challenges, Jenga, and cup games.

Marketing & Promotion: Instagram reels, WhatsApp group promotion, and a campus-wide offline push (60 posters, 4 standees, and on-day posters) drove awareness and turnout.

Outcome: Strong proof-of-concept for campus esports with high engagement. Technical and logistical constraints limited competitive registrations to about 500 players, providing clear learnings for future events.

What Worked: The hybrid model of serious competition + fun community activities, strong marketing, and Red Bull partnership.
Improvements Next Time: Full technical stress tests, more admin devices for BGMI lobbies, cooling stations for mobile players, and contingency plans for tech failures.

Winners:
BGMI Squad — Apurv Gusai, Barun Giri, Dibbyendu Dalal, Mobshir Amin
FIFA — Pratham Sethi`,
      cover: collegeRivals1,
      images: [
        collegeRivals1,
        collegeRivals2,
        collegeRivals3,
        collegeRivals4,
        collegeRivals5,
        collegeRivals6,
        collegeRivals7,
        collegeRivals8
      ]
    },
    {
      title: "PlayStorm Series I",
      date: "Sep 2025 - Dec 2025",
      tag: "Series Launch",
      status: "Completed",
      monthLabel: "Sep 2025",
      timelineOrder: 20250924,
      isMajor: true,
      summary: "8-week gaming night series (645 cumulative participants) + Tekken 8 LAN + Inter-College Valorant (300+ viewers) + BGMI tournaments.",
      description: `PlayStorm Series I marked the official launch of structured esports at Amity. It ran from September through December 2025, combining 8 weeks of themed Gaming Nights (645 cumulative participants) with competitive tournaments.

The Gaming Nights were hosted on the official Playstorm Discord Server with event-specific channels, registration forms, and game VCs. Titles included Among Us, Valorant, BGMI, Minecraft, Monopoly, and MOBA — blending casual fun with esports scouting.

Key outcomes: 400+ unique participants, launch of PlayStorm's official 24/7 Minecraft SMP Server, identification of top talent for college lineups, and a foundation for future inter-university competitions.

Management Team: Mayank Khatri (Head Coordinator), Ashraful Zeya (Discord Mod), Jorish (Discord Manager), plus dedicated hosts for each game title.`,
      cover: null,
      images: [],
      subEvents: [
        {
          title: "Gaming Nights (8 Weeks)",
          date: "Sep - Oct 2025",
          venue: "Online (Discord VC)",
          highlights: "645 cumulative participants across 8 themed weeks. Among Us, Valorant, BGMI, Minecraft SMP launch, Monopoly, MOBA. Season finale with 150 players."
        },
        {
          title: "Tekken 8 Inaugural LAN",
          date: "Sep 25, 2025 · 2:00 PM - 5:00 PM",
          venue: "Room E3-316, Amity University",
          highlights: "Double-elimination bracket. Champion: Jorish defeated Kavya Sejwal 2-0 in Grand Finale. ~20 participants."
        },
        {
          title: "Valorant Inter-College Scrims",
          date: "Aug 1-2, 2025 · 4:00 PM - 10:00 PM",
          venue: "Online",
          highlights: "5 colleges (IIT Ranchi, DY Patil, MSI Delhi, NIT Delhi, Amity). 8 teams, 300+ viewers, knockout Bo2 with casters. Winners: Team Rocket (Amity)."
        },
        {
          title: "BGMI Tournaments",
          date: "Nov 29-30, 2025",
          venue: "Inter-College + Intra-College",
          highlights: "Event A: Inter-Collegiate. Event B: Intra-College (16 teams). Strong competitive play and talent identification."
        }
      ]
    },
    {
      title: "PlayStorm Season 2",
      date: "Jan 11 - Feb 5, 2026",
      tag: "Season 2",
      status: "Completed",
      monthLabel: "Jan 2026",
      timelineOrder: 20260111,
      isMajor: true,
      summary: "Multi-week season: Valorant & BGMI brackets, Clash Royale (50+ players), CODM, Among Us community night, and LAN finale day on Feb 5.",
      description: `PlayStorm Series II / Season 2 ran from January 11 to February 5, 2026 with competitive phases across multiple titles.

On Jan 17-18, the BGMI & Valorant Tournament featured intense two-day competition. Valorant ran through RO16 → Quarterfinals → Semifinals & Finals (Bo3). BGMI had 6 matches (3 per day) with leaderboard-based scoring.

The Clash Royale Tournament attracted 50+ participants in structured knockout rounds — one of the most engaging mobile gaming events by the club.

Highlights: Competitive Valorant rounds with clutch plays, strategic BGMI matches with tight point races, exceptional sportsmanship throughout.`,
      cover: season2Poster,
      images: [],
      subEvents: [
        {
          title: "Valorant Phase 1",
          date: "Jan 16, 2026",
          venue: "Online (Discord)",
          highlights: "Season kickoff for Valorant on Discord."
        },
        {
          title: "BGMI Phase 1",
          date: "Jan 17-18, 2026",
          venue: "Online (Advanced Room Card)",
          highlights: "Phase 1 bracket across two days with Advanced Room Card lobbies."
        },
        {
          title: "Clash Royale",
          date: "Jan 25 - Feb 5, 2026",
          venue: "Online qualifiers → LAN finals",
          highlights: "Multi-day ladder and playoffs."
        },
        {
          title: "Call of Duty: Mobile",
          date: "Jan 25 - Feb 5, 2026",
          venue: "Online qualifiers → LAN finals",
          highlights: "Season-long matches with a Feb 5 finish."
        },
        {
          title: "Among Us",
          date: "Jan 26, 2026",
          venue: "Online",
          highlights: "Community night within Season 2."
        },
        {
          title: "BGMI Zone Wars",
          date: "Feb 1 - Feb 5, 2026",
          venue: "Online qualifiers → LAN finals",
          highlights: "Zone Wars stretch leading into finale day."
        },
        {
          title: "Valorant Skirmish",
          date: "Feb 5, 2026",
          venue: "LAN",
          highlights: "Finale-day Valorant showdown."
        },
        {
          title: "Tekken",
          date: "Feb 5, 2026",
          venue: "LAN",
          highlights: "Finale-day fighting game bracket."
        }
      ]
    },
    {
      title: "The Pro Arena",
      linkTo: "/pro-arena",
      date: "Feb 27-28, 2026",
      tag: "Major Event",
      status: "Completed",
      monthLabel: "Feb 2026",
      timelineOrder: 2026022801,
      isMajor: true,
      summary: "281 registered players, 65 teams, 1,500+ footfall. BGMI & Valorant LAN at E2 Auditorium under Amity Youth Fest 2026. 10 PC setups, 9 PS5s, racing simulator.",
      description: `The Pro Arena, held Feb 27-28 at E2 Auditorium under Amity Youth Fest 2026, was PlayStorm's flagship championship.

281 participants across 65 teams (44 BGMI, 21 Valorant). Total footfall exceeded 1,500 attendees including players, spectators, and Experience Zone visitors.

Infrastructure: 10 gaming PC setups with monitors/peripherals for Valorant, 9 PS5 consoles + 1 racing simulator, dedicated LAN network by university IT.

BGMI Winners: W2R Esports (Kyansh Malik, Krrish Malik, Yatharth Tyagi, Aaditya Siddhant Kain). MVP: Yatharth Tyagi (Bennett University).
Valorant Winners: Armaros (Lakshay Lamba, Aditya K Binu, Rahul, Aryan Bhatnagar, Ayushman Chaudhary). MVP: Lakshay Lamba.

Post-event celebration: Star Night ft. Harrdy Sandhu.`,
      cover: arena1Poster,
      images: [arena1Poster, arenaBgmiPoster, arenaValorantPoster, arenaExperiencePoster],
      subEvents: [
        {
          title: "BGMI LAN Championship",
          date: "Feb 27-28, 2026",
          venue: "E2 Auditorium (LAN)",
          highlights: "44 teams. Winner: W2R Esports. Runner-up: Demon. MVP: Yatharth Tyagi (Bennett University). Volunteers monitored every team for fair play."
        },
        {
          title: "Valorant LAN Championship",
          date: "Feb 27-28, 2026",
          venue: "E2 Auditorium (10 PC Setups)",
          highlights: "21 teams. Winner: Armaros. Runner-up: 10th Symphony. MVP: Lakshay Lamba (MSI). No third-party software monitoring by volunteers."
        },
        {
          title: "Experience Zone",
          date: "Feb 27-28, 2026",
          venue: "E2 Back Hall",
          highlights: "9 PS5 consoles + racing simulator. Tekken 8, FC 26, F1, Street Fighter 6, Mortal Kombat 1. Open to all attendees."
        }
      ]
    },
    {
      title: "#Respawn Event",
      date: "Mar 12, 2026",
      tag: "PlayStorm x Happiness Club",
      status: "Completed",
      monthLabel: "Mar 2026",
      timelineOrder: 2026031200,
      isMajor: true,
      summary: "A collaborative event dedicated to celebrating the month of Happiness, fostering community well-being through interactive play. 300+ students experienced BGMI 4v4 TDM, FC25 1v1, and Tekken 8 knockout bracket.",
      description: `A collaborative event dedicated to celebrating the month of Happiness, fostering community well-being through interactive play. 

300+ students experienced BGMI 4v4 TDM (10 squads), FC25 1v1, and Tekken 8 knockout bracket (70 participants — the most engaging segment). First-ever PlayStorm × Happiness Club collab!

Organizers: PlayStorm & Happiness Club
Venue: On-Campus
Highlights:
- BGMI 🏆 No Mercy (Saad Khan)
- FC25 🏆 Kavya Sejwal (12-4)
- Tekken 🏆 Maumik Raj
- 300+ Footfall`,
      cover: null,
      images: [],
      subEvents: [
        {
          title: "BGMI 4v4 TDM",
          date: "Mar 12, 2026",
          venue: "On-Campus",
          highlights: "10 squads. Winner: No Mercy (Saad Khan)."
        },
        {
          title: "FC25 1v1",
          date: "Mar 12, 2026",
          venue: "On-Campus",
          highlights: "Winner: Kavya Sejwal (12-4)."
        },
        {
          title: "Tekken 8 Knockout",
          date: "Mar 12, 2026",
          venue: "On-Campus",
          highlights: "70 participants. Winner: Maumik Raj."
        }
      ]
    }
  ];

  const communityEvents = [
    {
      title: "#Respawn: Tekken 8 Knockout",
      date: "Mar 12, 2026",
      tag: "Tekken 8",
      status: "Completed",
      monthLabel: "Mar 2026",
      timelineOrder: 2026031203,
      isMajor: false,
      description: "The most engaging and high-energy segment of the #Respawn event! 70 participants went head-to-head in a fast-paced knockout bracket on console setups. The on-campus crowd energy was unmatched throughout the bracket. Winner: Maumik Raj.",
      images: []
    },
    {
      title: "#Respawn: FC25 1v1",
      date: "Mar 12, 2026",
      tag: "FC25",
      status: "Completed",
      monthLabel: "Mar 2026",
      timelineOrder: 2026031202,
      isMajor: false,
      description: "Intense head-to-head virtual football action on PlayStation setups. Players showcased incredible skill and tactical gameplay in front of a live audience. Winner: Kavya Sejwal with a dominating 12-4 victory in the finals.",
      images: []
    },
    {
      title: "#Respawn: BGMI 4v4 TDM",
      date: "Mar 12, 2026",
      tag: "BGMI",
      status: "Completed",
      monthLabel: "Mar 2026",
      timelineOrder: 2026031201,
      isMajor: false,
      description: "10 competitive squads battled it out in fast-paced 4v4 Team Deathmatch rounds. The mobile gaming segment brought massive engagement to the venue with thrilling close-range combat. Winner: Team No Mercy (Saad Khan).",
      images: []
    },
    {
      title: "Pro Arena: BGMI Championship",
      date: "Feb 19 - Feb 28, 2026",
      tag: "BGMI",
      status: "Completed",
      monthLabel: "Feb 2026",
      timelineOrder: 2026022802,
      isMajor: false,
      description: "44 teams competing in mobile battle royale. LAN finals at E2 Auditorium with volunteer-monitored fair play. Winner: W2R Esports (Kyansh Malik, Krrish Malik, Yatharth Tyagi, Aaditya Siddhant Kain). Runner-up: Demon. MVP: Yatharth Tyagi (Bennett University). Prize: ₹30K winner / ₹20K runner-up.",
      images: [arenaBgmiPoster]
    },
    {
      title: "Pro Arena: Valorant Championship",
      date: "Feb 19 - Feb 28, 2026",
      tag: "Valorant",
      status: "Completed",
      monthLabel: "Feb 2026",
      timelineOrder: 2026022803,
      isMajor: false,
      description: "21 teams in 5v5 tactical FPS on 10 PC setups with 240Hz monitors. Winner: Armaros (Lakshay Lamba, Aditya K Binu, Rahul, Aryan Bhatnagar, Ayushman Chaudhary). Runner-up: 10th Symphony. MVP: Lakshay Lamba (MSI). Prize: ₹25K winner / ₹15K runner-up.",
      images: [arenaValorantPoster]
    },
    {
      title: "Pro Arena: Experience Zone",
      date: "Feb 27 - Feb 28, 2026",
      tag: "Experience Zone",
      status: "Completed",
      monthLabel: "Feb 2026",
      timelineOrder: 2026022804,
      isMajor: false,
      description: "Interactive gaming zone featuring Tekken 8, FC 26, F1, Street Fighter 6, and Mortal Kombat 1 on PS5 setups. Open to all attendees.",
      images: [arenaExperiencePoster]
    },
    {
      title: "Valorant Inter-College Scrims",
      date: "Aug 1-2, 2025",
      tag: "Tournament",
      status: "Completed",
      monthLabel: "Aug 2025",
      timelineOrder: 20250802,
      isMajor: false,
      description: "Inter-college Valorant tournament with IIT Ranchi, DY Patil, MSI Delhi, NIT Delhi & Amity. 8 teams, 300+ live viewers via Discord streaming. Knockout Bo2 format with dedicated casters and moderators. Casual mini-games (Codenames, Among Us) between matches kept the audience engaged. Winners: Team Rocket (Amity) — Aayan Basharat, Bhavya Suryan, Arav Tonger, Divyansh Yadav, Chaitannya.",
      images: []
    },
    {
      title: "Tekken 8 - PlayStorm Series I",
      date: "Sep 25, 2025",
      tag: "LAN",
      status: "Completed",
      monthLabel: "Sep 2025",
      timelineOrder: 20250925,
      isMajor: false,
      description: "Flagship Series I launch and community meet-and-greet. 2:00 PM - 5:00 PM at Room E3-316. Double-elimination bracket with Jorish winning the grand finale after a rematch with Kavya Sejwal.",
      images: [tekkenPoster]
    },
    {
      title: "PlayStorm Weekly Gaming Nights",
      date: "Sep - Oct 2025",
      tag: "Community",
      status: "Completed",
      monthLabel: "Sep 2025",
      timelineOrder: 20250930,
      isMajor: false,
      clickable: false,
      description: "8-week series with 645 cumulative participants. Week 1: Among Us + Valorant (80). Week 2: BGMI + MOBA (60). Week 3: Monopoly + BGMI (70). Week 4: Valorant Tourney (40). Week 5: Among Us + Minecraft (90). Week 6: Valorant Tryouts (80). Week 7: BGMI Showdown (75). Week 8: Season Finale — all games + Minecraft SMP launch (150).",
      images: []
    },
    {
      title: "BGMI TDM Tournament",
      date: "Oct 18, 2025",
      tag: "Mobile",
      status: "Completed",
      monthLabel: "Oct 2025",
      timelineOrder: 20251018,
      isMajor: false,
      description: "Intra-college 4v4 TDM tournament with 10 teams (4-6 players each). Competitive bracket on Discord with scheduled matches.",
      images: []
    },
    {
      title: "Vortex Campus Showdown",
      date: "Nov 22, 2025",
      tag: "External",
      status: "Completed",
      monthLabel: "Nov 2025",
      timelineOrder: 20251122,
      isMajor: false,
      description: "PlayStorm sent 2 Valorant lineups + 1 Tekken player (11 students total) to the external Vortex Campus Showdown at Sector 128, Noida. Both Amity Valorant teams reached the finals — Team PlayStorm Amity defeated Team Rocket 2-0 for the championship. Jorish achieved 2nd Runner Up in Tekken. A landmark moment proving Amity's esports representation externally.",
      images: []
    },
    {
      title: "Clash Royale Tournament",
      date: "Late Nov 2025",
      tag: "Online",
      status: "Completed",
      monthLabel: "Nov 2025",
      timelineOrder: 20251130,
      isMajor: false,
      description: "50+ participants in structured knockout rounds — one of the most engaging mobile gaming competitions by the club. Players competed with strategic gameplay, quick decision-making, and competitive sportsmanship. Winner: Himanshu Singh.",
      images: []
    },
    {
      title: "PlayStorm Series I: BGMI Tournaments",
      date: "Nov 29-30, 2025",
      tag: "Mobile",
      status: "Completed",
      monthLabel: "Nov 2025",
      timelineOrder: 20251130,
      isMajor: false,
      description: "Event A (Nov 29): Inter-Collegiate BGMI tournament with multiple college teams demonstrating advanced gameplay mechanics and strategic planning. Event B (Nov 30): Intra-College tournament with 16 teams in an action-packed bracket.",
      images: []
    },
    {
      title: "Valorant 2v2 Skirmish",
      date: "27th - 28th Dec 2025",
      tag: "Community",
      status: "Completed",
      monthLabel: "Dec 2025",
      timelineOrder: 20251227,
      isMajor: false,
      description: "Intra-college 2v2 Valorant tournament with 12 teams. Best-of-3 format. Structured competitive environment that improved teamwork, communication, and in-game decision-making.",
      images: [valo2v2Poster]
    },
    {
      title: "Minecraft Parkour Night",
      date: "26th Dec 2025",
      tag: "Fun",
      status: "Completed",
      monthLabel: "Dec 2025",
      timelineOrder: 20251226,
      isMajor: false,
      description: "A chill community night featuring custom parkour maps. Lots of falls, lots of laughs.",
      images: [parkourPoster]
    },
    {
      title: "CODM Tournament",
      date: "Dec 27, 2025 · 9:00 PM - 10:00 PM",
      tag: "Mobile",
      status: "Completed",
      monthLabel: "Dec 2025",
      timelineOrder: 20251227,
      isMajor: false,
      description: "Inter-collegiate CODM tournament with ~60 students from multiple colleges. Featured Free-for-All mode alongside standard matches. High standard of competitive play with frequent momentum shifts and last-moment eliminations. Helped identify top talent for future esports representation.",
      images: []
    },
    {
      title: "Valorant Phase 1",
      date: "Jan 16, 2026",
      tag: "Valorant · Online (Discord)",
      status: "Completed",
      monthLabel: "Jan 2026",
      timelineOrder: 20260116,
      isMajor: false,
      description: "Season 2 kickoff phase for Valorant. Online (Discord).",
      images: []
    },
    {
      title: "BGMI Phase 1",
      date: "Jan 17-18, 2026",
      tag: "BGMI · Online (Advanced Room Card)",
      status: "Completed",
      monthLabel: "Jan 2026",
      timelineOrder: 20260118,
      isMajor: false,
      description: "PlayStorm Series II two-day BGMI & Valorant bracket. Valorant: RO16 → Quarterfinals → Semifinals & Finals (Bo3). BGMI: 6 matches (3/day) with leaderboard scoring. Competitive rounds with clutch plays and tight point races.",
      images: []
    },
    {
      title: "BGMI Inter-College Tournament",
      date: "Jan 3, 2026",
      tag: "BGMI · Inter-College",
      status: "Completed",
      monthLabel: "Jan 2026",
      timelineOrder: 20260103,
      isMajor: false,
      description: "Inter-college BGMI tournament with 18 teams competing in custom rooms. Professional and semi-professional teams proved their skills, teamwork, and strategy in a high-pressure competitive environment.",
      images: []
    },
    {
      title: "Clash Royale",
      date: "Jan 25 - Feb 5, 2026",
      tag: "Online qualifiers → LAN finals",
      status: "Completed",
      monthLabel: "Jan 2026",
      timelineOrder: 20260125,
      isMajor: false,
      description: "Online qualifiers leading into LAN finals.",
      images: []
    },
    {
      title: "Call of Duty: Mobile",
      date: "Jan 25 - Feb 5, 2026",
      tag: "Online qualifiers → LAN finals",
      status: "Completed",
      monthLabel: "Jan 2026",
      timelineOrder: 20260125,
      isMajor: false,
      description: "Online qualifiers leading into LAN finals on Feb 5.",
      images: []
    },
    {
      title: "Among Us",
      date: "Jan 26, 2026",
      tag: "Community",
      status: "Completed",
      monthLabel: "Jan 2026",
      timelineOrder: 20260126,
      isMajor: false,
      description: "Season 2 community night.",
      images: []
    },
    {
      title: "BGMI Zone Wars",
      date: "Feb 1 - Feb 5, 2026",
      tag: "Online qualifiers → LAN finals",
      status: "Completed",
      monthLabel: "Feb 2026",
      timelineOrder: 20260201,
      isMajor: false,
      description: "Online qualifiers leading into LAN finals.",
      images: []
    },
    {
      title: "Valorant Skirmish",
      date: "Feb 5, 2026",
      tag: "LAN",
      status: "Completed",
      monthLabel: "Feb 2026",
      timelineOrder: 2026020501,
      isMajor: false,
      description: "LAN-only Valorant skirmish on finale day.",
      images: []
    },
    {
      title: "Tekken",
      date: "Feb 5, 2026",
      tag: "LAN",
      status: "Completed",
      monthLabel: "Feb 2026",
      timelineOrder: 2026020502,
      isMajor: false,
      description: "LAN-only Tekken bracket on finale day.",
      images: []
    }
  ];

  const timelineEvents = [...majorEvents, ...communityEvents].sort(
    (a, b) => b.timelineOrder - a.timelineOrder
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="space-y-12 pb-12"
    >
      {/* 1. LOOKSMAXED HEADER */}
      <div className="space-y-4 relative lg:max-w-full">
        <div className="absolute -top-12 -left-10 w-44 h-44 bg-purple-500/10 rounded-full blur-[60px] pointer-events-none" />
        <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 backdrop-blur-md text-[10px] font-mono font-black uppercase tracking-[0.25em] text-purple-300">
          <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
          <span>Esports Timeline</span>
        </div>

        <div>
          <CursorPhysicsDistortion>
            <h1 className="font-display text-3xl font-black tracking-tighter text-white sm:text-5xl uppercase">
              Tournaments & <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-pink-600 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]">Events</span>
            </h1>
          </CursorPhysicsDistortion>
        </div>

        <p className="max-w-full text-sm leading-relaxed text-gray-300 sm:text-base border-l-2 border-purple-500/50 pl-4 py-1">
          Join the operational theater. From high-stakes national inter-college brackets to immersive intra-university LANs and gaming nights.
        </p>
      </div>

      {/* 2. SPOTLIGHT EVENT */}
      <section>
        <Season3EventSpotlight />
      </section>

      {/* 3. PAST EVENTS LIST */}
      <section className="space-y-6">
        <h3 className="text-sm font-bold text-purple-300 uppercase tracking-[0.22em] border-l-2 border-purple-500/50 pl-4 py-0.5">
          Past Operations Archive
        </h3>
        <div className="space-y-5">
          {(() => {
            let lastMonth = null;
            return timelineEvents.map((event, index) => {
              const showMonth = event.monthLabel !== lastMonth;
              lastMonth = event.monthLabel;
              return (
                <div key={`${event.title}-${index}`} className="space-y-4">
                  {showMonth && <TimelineMonthSeparator label={event.monthLabel} />}
                  <TimelineNode
                    event={event}
                    onClick={setSelectedEvent}
                    isMajor={event.isMajor}
                  />
                </div>
              );
            });
          })()}
        </div>
      </section>

      {/* MODAL POPUP */}
      <AnimatePresence>
        {selectedEvent && (
          <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
        )}
      </AnimatePresence>

    </motion.div>
  )
}
