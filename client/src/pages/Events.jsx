import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CalendarDays, MapPin, Trophy, ArrowRight, X, Info } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

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

// --- SHARED HEADER ---
function PageHeader({ eyebrow, title, description }) {
  return (
    <div className="space-y-3 mb-10 border-b border-white/10 pb-8">
      <p className="font-display text-[11px] uppercase tracking-[0.26em] text-purple-300">{eyebrow}</p>
      <h2 className="font-display text-2xl text-white sm:text-3xl">{title}</h2>
      <p className="max-w-2xl text-sm text-gray-300 sm:text-base">{description}</p>
    </div>
  )
}

// --- FEATURED EVENT CARD (Current Event) ---
function WeeklyWarsSpotlight() {
  return (
    <div
      className="group relative block overflow-hidden rounded-2xl border border-purple-500/30 bg-black/50 p-6 md:p-10 shadow-2xl shadow-purple-900/20"
    >
      <div className="absolute -right-40 -top-40 h-[420px] w-[420px] rounded-full bg-purple-600/20 blur-[120px]" />
      <div className="absolute -left-40 -bottom-40 h-[360px] w-[360px] rounded-full bg-pink-600/20 blur-[120px]" />

      <div className="relative z-10 grid gap-8 md:grid-cols-[1.4fr,1fr] items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 px-3 py-1 text-[10px] font-bold uppercase tracking-widest">
            <span className="relative flex h-2 w-2">
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            Registrations Open
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400">PlayStorm Weekly Series</p>
            <h3 className="font-display text-4xl md:text-5xl text-white mt-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-purple-500 to-pink-500">Weekly Wars: BGMI Clash</span>
            </h3>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed mt-3">
              A high-intensity BGMI Battle Royale tournament streamed live with Discord coordination and YouTube coverage.
            </p>
          </div>

          <div className="flex flex-wrap gap-6 text-sm font-medium text-gray-300">
            <div className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-purple-400" />
              <span>April 4-5, 2026</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-purple-400" />
              <span>Online - Discord & YouTube</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-purple-400" />
              <span>BGMI Battle Royale Only</span>
            </div>
          </div>

          <Link
            to="/register"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 text-sm font-bold uppercase tracking-widest text-white border border-purple-400/40 hover:brightness-110 transition"
          >
            Register Now <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="hidden md:block border-l border-white/10 pl-8">
          <div className="space-y-6">
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Organizers</p>
              <p className="text-white">PlayStorm eSports Club</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Venue</p>
              <p className="text-white">Online (Discord & YouTube)</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Games</p>
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="px-2 py-1 rounded bg-white/10 text-[10px] uppercase font-bold text-gray-300">BGMI Battle Royale</span>
                <span className="px-2 py-1 rounded bg-white/10 text-[10px] uppercase font-bold text-gray-300">Discord</span>
                <span className="px-2 py-1 rounded bg-white/10 text-[10px] uppercase font-bold text-gray-300">YouTube Live</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// --- EVENT MODAL ---
function EventModal({ event, onClose }) {
  if (!event) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-[#0a0a0a] border border-purple-500/30 rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
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
              <div className="whitespace-pre-line">{event.description}</div>
            ) : (
              <p className="italic text-gray-500">No additional details available for this event.</p>
            )}

            {event.subEvents && event.subEvents.length > 0 && (
              <div className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-widest text-purple-300">Series Timeline</p>
                <div className="space-y-3">
                  {event.subEvents.map((item, index) => (
                    <div key={`${item.title}-${index}`} className="rounded-xl border border-white/10 bg-black/40 p-3">
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
    </div>
  )
}

// --- SMALLER EVENT ROW ---
function EventRow({ event, onClick, clickable = true }) {
  const isPast = event.status === "Completed";
  const isClickable = clickable && typeof onClick === 'function';

  return (
    <div
      onClick={isClickable ? () => onClick(event) : undefined}
      className={`group flex items-center justify-between p-4 rounded-xl border ${isClickable ? 'cursor-pointer' : 'cursor-default'} ${isPast ? 'border-white/5 bg-white/5 opacity-80 hover:opacity-100' : 'border-purple-500/20 bg-purple-500/5 hover:border-purple-500/40'} transition`}
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
  )
}

function MajorEventCard({ event, onClick }) {
  const navigate = useNavigate()
  
  const handleClick = () => {
    if (event.linkTo) {
      navigate(event.linkTo)
    } else {
      onClick(event)
    }
  }

  return (
    <div
      onClick={handleClick}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-6 md:p-8 shadow-2xl shadow-black/30 cursor-pointer"
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
    </div>
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
      summary: "Series I began with the Tekken 8 LAN and expanded into inter-college collaborations and multi-game tournaments.",
      description: "PlayStorm Series I introduced structured esports on campus and scaled into LANs and inter-college collaborations.",
      cover: null,
      images: [],
      subEvents: [
        {
          title: "PlayStorm Series I: Inaugural LAN (Tekken 8)",
          date: "Sep 25, 2025 · 2:00 PM - 5:00 PM",
          venue: "Room E3-316, Amity University, Noida",
          highlights: "Series I launch + community meet-and-greet. Double-elimination bracket. Champion: Jorish after a finale rematch with Kavya Sejwal."
        },
        {
          title: "PlayStorm Series I: Valorant (Inter-College)",
          date: "Nov 1-2, 2025 · 4:00 PM - 10:00 PM",
          venue: "Online",
          highlights: "8 teams, 300+ live viewers. Knockout format (Bo2) with casters and moderators. Winners: Team Rocket (Amity)."
        },
        {
          title: "PlayStorm Series I: BGMI Tournaments",
          date: "Nov 29-30, 2025",
          venue: "Inter-College + Intra-College",
          highlights: "Event A: Inter-Collegiate. Event B: Intra-College (16 teams)."
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
      summary: "A multi-week season with competitive phases across Valorant, BGMI, and community staples, ending with finale day events on Feb 5.",
      description: "PlayStorm Season 2 ran across multiple phases in January and February, mixing competitive brackets with community favorites.",
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
      date: "Feb 19 - Feb 28, 2026",
      tag: "Major Event",
      status: "Completed",
      monthLabel: "Feb 2026",
      timelineOrder: 2026022801,
      isMajor: true,
      summary: "PlayStorm's major championship featuring BGMI, Valorant, and Experience Zone as key event tracks.",
      description: "The Pro Arena was the headline major event with multi-format competition and live experience activations.",
      cover: arena1Poster,
      images: [arena1Poster, arenaBgmiPoster, arenaValorantPoster, arenaExperiencePoster],
      subEvents: [
        {
          title: "BGMI",
          date: "Feb 19 - Feb 28, 2026",
          venue: "Online Qualifiers + LAN Finals",
          highlights: "Major-event BGMI bracket under The Pro Arena."
        },
        {
          title: "Valorant",
          date: "Feb 19 - Feb 28, 2026",
          venue: "Online Qualifiers + LAN Finals",
          highlights: "Major-event Valorant bracket under The Pro Arena."
        },
        {
          title: "Experience Zone",
          date: "Feb 19 - Feb 28, 2026",
          venue: "On-ground Activation",
          highlights: "Interactive experience zone as part of The Pro Arena showcase."
        }
      ]
    }
  ];

  const communityEvents = [
    {
      title: "#Respawn Event",
      date: "March 5, 2026",
      tag: "Special Event",
      status: "Completed",
      monthLabel: "Mar 2026",
      timelineOrder: 2026030501,
      isMajor: false,
      description: "#Respawn Event marked a packed community day with strong participation and high-energy matchups across featured titles.",
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
      description: "Mobile battle royale tournament with online qualifiers leading to LAN finals at E2 Auditorium. Prize pool: ₹50,000.",
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
      description: "5v5 tactical FPS tournament featuring top college teams. Online qualifiers followed by LAN finals. Prize pool: ₹40,000.",
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
      title: "PlayStorm Series I: Valorant (Inter-College)",
      date: "Nov 1-2, 2025",
      tag: "Tournament",
      status: "Completed",
      monthLabel: "Nov 2025",
      timelineOrder: 20251102,
      isMajor: false,
      description: "Online Valorant tournament to foster inter-college esports with IIT Ranchi, DY Patil, MSI Delhi, NIT Delhi, and Amity. 8 teams, 300+ live viewers, knockout Bo2, with casters and moderators for a professional broadcast. Minor connectivity issues were managed by the ops team. Winners: Team Rocket (Amity) — Aayan Basharat, Bhavya Suryan, Arav Tonger, Divyansh Yadav, Chaitannya.",
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
      description: "8 weeks of themed nights: Among Us, Valorant, BGMI, Minecraft, Monopoly, MOBA.",
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
      description: "Intra-college 4v4 tournament with 10 teams.",
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
      description: "PlayStorm Amity won Valorant finals 2-0. Jorish placed 2nd Runner Up in Tekken.",
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
      description: "50+ participants. Winner: Himanshu Singh.",
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
      description: "Event A: Inter-Collegiate. Event B: Intra-College (16 teams).",
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
      description: "Community 2v2 showdown with a best-of-3 format.",
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
      description: "Fast-paced CODM tournament hosted on Discord. One-hour bracket that kept the lobby packed and competitive throughout the night.",
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
      description: "Two-day Phase 1 bracket for BGMI. Online (Advanced Room Card).",
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
      transition={{ duration: 0.45 }}
      className="max-w-5xl mx-auto space-y-12 pb-12"
    >
      <PageHeader
        eyebrow="Calendar"
        title="Tournaments & Events"
        description="Join the action. From serious competitive brackets to chill community nights."
      />

      {/* 1. SPOTLIGHT EVENT */}
      <section>
        <WeeklyWarsSpotlight />
      </section>

      {/* 2. PAST EVENTS LIST */}
      <section className="space-y-6">
        <h3 className="text-lg font-bold text-gray-400 uppercase tracking-wide border-l-4 border-gray-600 pl-4">
          Past Events
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
