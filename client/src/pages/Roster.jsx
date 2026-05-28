import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Crown, Shield, Users, Trophy, Sparkles } from 'lucide-react'
import { TiltCard, GlowCard, MagneticElement, playTactileClick, playDigitalHover, CursorPhysicsDistortion } from '../components/VisualEffects'

// --- LOCAL ASSET IMPORTS ---
import abhinavImg from '../assets/abhinav.webp'
import muditaImg from '../assets/mudita.webp'
import kavyaImg from '../assets/kavya.webp'
import rithwikImg from '../assets/rithwik.webp'
import vedikaImg from '../assets/vedika.webp'
import akanshiImg from '../assets/akanshi.webp'
import divyanshuImg from '../assets/divyanshu.webp'
import abhisarImg from '../assets/abhisar.webp'
import lakshikaImg from '../assets/lakshika.webp'
import devashishImg from '../assets/devashish.webp'
import vivekImg from '../assets/vivek.webp'
import bhagatImg from '../assets/bhagat.webp'

// --- CORE TEAM CARD ---
function CoreMemberCard({ role, name, color = "team", img }) {
  const getInitials = (fullName) => {
    if (!fullName) return 'M';
    const clean = fullName.trim();
    if (clean.includes('Abhinav')) return 'AB';
    if (clean.includes('Devashish')) return 'DV';
    const parts = clean.split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const colors = {
    founder: "text-[#FF4500] border-white/10 border-l-4 border-l-[#FF4500] bg-black/75",
    president: "text-[#E03C3C] border-white/10 border-l-4 border-l-[#E03C3C] bg-black/75",
    vp: "text-[#DC2626] border-white/10 border-l-4 border-l-[#DC2626] bg-black/75",
    gsec: "text-[#F97316] border-white/10 border-l-4 border-l-[#F97316] bg-black/75",
    treasurer: "text-[#EAB308] border-white/10 border-l-4 border-l-[#EAB308] bg-black/75",
    hq: "text-[#F59E0B] border-white/10 border-l-4 border-l-[#F59E0B] bg-black/75",
    admin: "text-[#EF4444] border-white/10 border-l-4 border-l-[#EF4444] bg-black/75",
    teamHeads: "text-[#F472B6] border-white/10 border-l-4 border-l-[#F472B6] bg-black/75",
    valorantHead: "text-[#FB923C] border-white/10 border-l-4 border-l-[#FB923C] bg-black/75",
    esportsMgmt: "text-[#FBBF24] border-white/10 border-l-4 border-l-[#FBBF24] bg-black/75",
    tech: "text-[#06B6D4] border-white/10 border-l-4 border-l-[#06B6D4] bg-black/75",
    design: "text-[#EC4899] border-white/10 border-l-4 border-l-[#EC4899] bg-black/75",
    content: "text-[#8B5CF6] border-white/10 border-l-4 border-l-[#8B5CF6] bg-black/75",
    social: "text-[#3B82F6] border-white/10 border-l-4 border-l-[#3B82F6] bg-black/75",
    media: "text-[#6366F1] border-white/10 border-l-4 border-l-[#6366F1] bg-black/75",
    outreach: "text-[#14B8A6] border-white/10 border-l-4 border-l-[#14B8A6] bg-black/75",
    sales: "text-[#22C55E] border-white/10 border-l-4 border-l-[#22C55E] bg-black/75",
    interviewer: "text-[#A3E635] border-white/10 border-l-4 border-l-[#A3E635] bg-black/75",
    team: "text-[#94A3B8] border-white/10 border-l-4 border-l-[#94A3B8] bg-black/75",
  }

  const glowColors = {
    founder: "shadow-[0_0_20px_rgba(255,69,0,0.15)]",
    president: "shadow-[0_0_20px_rgba(224,60,60,0.15)]",
    vp: "shadow-[0_0_20px_rgba(220,38,38,0.15)]",
    gsec: "shadow-[0_0_20px_rgba(249,115,22,0.15)]",
    treasurer: "shadow-[0_0_20px_rgba(234,179,8,0.15)]",
    hq: "shadow-[0_0_20px_rgba(245,158,11,0.15)]",
    admin: "shadow-[0_0_20px_rgba(239,68,68,0.15)]",
    teamHeads: "shadow-[0_0_20px_rgba(244,114,182,0.15)]",
    valorantHead: "shadow-[0_0_20px_rgba(251,146,60,0.15)]",
    esportsMgmt: "shadow-[0_0_20px_rgba(251,191,36,0.15)]",
    tech: "shadow-[0_0_20px_rgba(6,182,212,0.15)]",
    design: "shadow-[0_0_20px_rgba(236,72,153,0.15)]",
    content: "shadow-[0_0_20px_rgba(139,92,246,0.15)]",
    social: "shadow-[0_0_20px_rgba(59,130,246,0.15)]",
    media: "shadow-[0_0_20px_rgba(99,102,241,0.15)]",
    outreach: "shadow-[0_0_20px_rgba(20,184,166,0.15)]",
    sales: "shadow-[0_0_20px_rgba(34,197,94,0.15)]",
    interviewer: "shadow-[0_0_20px_rgba(163,230,53,0.15)]",
    team: "shadow-[0_0_20px_rgba(148,163,184,0.15)]",
  }

  const avatarBgColors = {
    founder: "bg-[#FF4500]/20 border-[#FF4500]/30 text-[#FF4500]",
    president: "bg-[#E03C3C]/20 border-[#E03C3C]/30 text-[#E03C3C]",
    vp: "bg-[#DC2626]/20 border-[#DC2626]/30 text-[#DC2626]",
    gsec: "bg-[#F97316]/20 border-[#F97316]/30 text-[#F97316]",
    treasurer: "bg-[#EAB308]/20 border-[#EAB308]/30 text-[#EAB308]",
    hq: "bg-[#F59E0B]/20 border-[#F59E0B]/30 text-[#F59E0B]",
    admin: "bg-[#EF4444]/20 border-[#EF4444]/30 text-[#EF4444]",
    teamHeads: "bg-[#F472B6]/20 border-[#F472B6]/30 text-[#F472B6]",
    valorantHead: "bg-[#FB923C]/20 border-[#FB923C]/30 text-[#FB923C]",
    esportsMgmt: "bg-[#FBBF24]/20 border-[#FBBF24]/30 text-[#FBBF24]",
    tech: "bg-[#06B6D4]/20 border-[#06B6D4]/30 text-[#06B6D4]",
    design: "bg-[#EC4899]/20 border-[#EC4899]/30 text-[#EC4899]",
    content: "bg-[#8B5CF6]/20 border-[#8B5CF6]/30 text-[#8B5CF6]",
    social: "bg-[#3B82F6]/20 border-[#3B82F6]/30 text-[#3B82F6]",
    media: "bg-[#6366F1]/20 border-[#6366F1]/30 text-[#6366F1]",
    outreach: "bg-[#14B8A6]/20 border-[#14B8A6]/30 text-[#14B8A6]",
    sales: "bg-[#22C55E]/20 border-[#22C55E]/30 text-[#22C55E]",
    interviewer: "bg-[#A3E635]/20 border-[#A3E635]/30 text-[#A3E635]",
    team: "bg-[#94A3B8]/20 border-[#94A3B8]/30 text-[#94A3B8]",
  }

  return (
    <TiltCard>
      <GlowCard
        onClick={playTactileClick}
        onMouseEnter={playDigitalHover}
        className={`group rounded-xl border cursor-pointer ${colors[color]} ${glowColors[color]}`}
      >
        <div className="pl-6 pr-6 py-5 flex items-center gap-5 w-full h-full">
          <div className="flex-shrink-0 relative">
            {img ? (
              <>
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <img src={img} alt={role} className="w-14 h-14 rounded-full object-cover border-2 border-white/20 relative z-10 transition-transform duration-300 group-hover:scale-105" />
              </>
            ) : (
              <div className={`w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all duration-300 group-hover:scale-105 ${avatarBgColors[color]}`}>
                <span className="font-display font-bold text-base tracking-wider">{getInitials(name)}</span>
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-display text-[10px] font-bold uppercase tracking-widest opacity-80 group-hover:opacity-100 transition-opacity flex items-center gap-1.5">
              {(() => {
                const Icon = 
                  color === 'founder' || color === 'president' ? Crown :
                  color === 'vp' || color === 'gsec' || color === 'hq' || color === 'admin' ? Shield :
                  color === 'treasurer' ? Trophy :
                  color === 'teamHeads' ? Sparkles : Users;
                return <Icon className="w-3.5 h-3.5 flex-shrink-0 text-current" />;
              })()}
              <span>{role}</span>
            </h3>
            <p className="text-sm font-bold text-white mt-0.5 group-hover:tracking-wide transition-all duration-300 truncate">{name}</p>
          </div>
        </div>
      </GlowCard>
    </TiltCard>
  )
}

// --- PLAYER ROW COMPONENT ---
function PlayerRow({ name, tag, role, bgmiId, game = "valo" }) {
  const gameConfig = {
    valo: {
      dot: "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]",
      badgeBg: "bg-red-500/10 border-red-500/20 text-red-300",
      borderHover: "hover:border-red-500/30",
      bgHover: "hover:bg-red-500/[0.05]",
      nameHover: "group-hover:text-red-300",
      idText: "text-red-400/60",
      badgeHoverBg: "group-hover:bg-red-500 group-hover:text-white"
    },
    bgmi: {
      dot: "bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]",
      badgeBg: "bg-orange-500/10 border-orange-500/20 text-orange-300",
      borderHover: "hover:border-orange-500/30",
      bgHover: "hover:bg-orange-500/[0.05]",
      nameHover: "group-hover:text-orange-300",
      idText: "text-orange-400/60",
      badgeHoverBg: "group-hover:bg-orange-500 group-hover:text-white"
    }
  };

  const current = gameConfig[game] || gameConfig.valo;

  return (
    <MagneticElement>
      <div
        onClick={playTactileClick}
        onMouseEnter={playDigitalHover}
        className={`group flex items-center justify-between p-3.5 mb-2 rounded-xl border border-white/10 bg-black/60 cursor-pointer ${current.bgHover} ${current.borderHover} transition-all duration-300 relative overflow-hidden shadow-sm hover:scale-[1.01] w-full`}
      >
        <div className="flex items-center gap-3.5 pl-1">
          <div className={`w-2 h-2 rounded-full ${current.dot} animate-pulse flex-shrink-0`} />
          <div>
            <div className={`text-sm font-bold text-white tracking-wide transition-colors ${current.nameHover}`}>{name}</div>
            {bgmiId ? (
              <div className={`font-mono text-[11px] ${current.idText} tracking-wider mt-0.5`}>
                UID: {bgmiId}
              </div>
            ) : null}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {role && (
            <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest border transition-all duration-300 ${current.badgeBg} ${current.badgeHoverBg} group-hover:border-transparent`}>
              {role}
            </span>
          )}
          {tag && (
            <span className="text-xs font-mono text-gray-500 uppercase tracking-wider group-hover:text-gray-300 transition-colors">
              #{tag}
            </span>
          )}
        </div>
      </div>
    </MagneticElement>
  )
}

export default function RosterPage() {
  const [rosterData, setRosterData] = useState(null);

  useEffect(() => {
    fetch('/api/roster')
      .then(res => res.json())
      .then(data => {
        if (data && data.success && data.members) {
          setRosterData(data.members);
        }
      })
      .catch(err => console.error("Failed to fetch live roster:", err));
  }, []);

  const imageMap = {
    'Abhinav Sushil Varshney': abhinavImg,
    'Mudita Dani': muditaImg,
    'Devashish': devashishImg,
    'Devashish Samkola': devashishImg,
    'Divyanshu Dixit': divyanshuImg,
    'Kavya Sejwal': kavyaImg,
    'Rithwik sahni': rithwikImg,
    'Rithwik Sahni': rithwikImg,
    'Vivek Choudhary': vivekImg,
    'Vedika Chikhale': vedikaImg,
    'Akanshi Singh': akanshiImg,
    'Akanshi singh': akanshiImg,
    'Khushi Bhagat': bhagatImg,
    'Abhisar Bhardwaj': abhisarImg,
    'Lakshika Singh': lakshikaImg
  };

  const getRoleInfo = (m) => {
    const code = (m.deptCode || '').toUpperCase();
    let role = m.role || 'Member';
    let color = 'team';

    // Leadership
    if (code.startsWith('OTHER:FOUNDER')) { role = 'Founder'; color = 'founder'; }
    else if (code === 'HQ_PRES') { role = 'President'; color = 'president'; }
    else if (code === 'HQ_VP') { role = 'Vice President'; color = 'vp'; }
    else if (code === 'HQ_GSEC') { role = 'General Secretary'; color = 'gsec'; }
    else if (code === 'HQ_TRES') { role = 'Treasurer'; color = 'treasurer'; }
    else if (code.startsWith('HQ_')) { color = 'hq'; }

    // Department Heads
    else if (code === 'TH_VALORANT') { role = 'Valorant Head'; color = 'valorantHead'; }
    else if (code === 'TH_ESPORTS') { role = 'Esports Head'; color = 'esportsMgmt'; }
    else if (code === 'TH_TECH') { role = 'Tech Head'; color = 'tech'; }
    else if (code === 'TH_SALES') { role = 'Sales Head'; color = 'sales'; }
    else if (code === 'TH_DESIGN') { role = 'Design Head'; color = 'design'; }
    else if (code === 'TH_CONTENT') { role = 'Content Head'; color = 'content'; }
    else if (code === 'TH_MEDIA') { role = 'Media Head'; color = 'media'; }
    else if (code === 'TH_SOCIAL') { role = 'Social Media Head'; color = 'social'; }
    else if (code === 'TH_OUTREACH' || code === 'TH_MARKETING') { role = code === 'TH_MARKETING' ? 'Marketing Head' : 'Outreach Head'; color = 'outreach'; }
    else if (code.startsWith('TH_')) { color = 'teamHeads'; }

    // Department Members
    else if (code === 'ESPORTS') { role = 'Esports Member'; color = 'esportsMgmt'; }
    else if (code === 'TECH') { role = 'Tech Member'; color = 'tech'; }
    else if (code === 'SALES') { role = 'Sales Member'; color = 'sales'; }
    else if (code === 'DESIGN') { role = 'Design Member'; color = 'design'; }
    else if (code === 'CONTENT') { role = 'Content Member'; color = 'content'; }
    else if (code === 'MEDIA') { role = 'Media Member'; color = 'media'; }
    else if (code === 'SOCIAL') { role = 'Social Member'; color = 'social'; }
    else if (code === 'OUTREACH' || code === 'MARKETING') { role = code === 'MARKETING' ? 'Marketing Member' : 'Outreach Member'; color = 'outreach'; }
    else if (code === 'INTERVIEWER') { role = 'Interviewer'; color = 'interviewer'; }
    else if (code === 'ADMIN') { role = 'Admin'; color = 'admin'; }
    else if (!code.startsWith('HQ_') && !code.startsWith('TH_') && !code.startsWith('OTHER:')) {
      role = code ? `${code.charAt(0).toUpperCase() + code.slice(1).toLowerCase()} Member` : 'Member';
      color = 'team';
    }
    return { role, color };
  };

  const execMembers = rosterData ? rosterData.filter(m => m.deptCode?.startsWith('HQ_') || m.deptCode?.startsWith('OTHER:')).sort((a, b) => {
    const roleOrder = { 'OTHER:FOUNDER': 1, 'HQ_PRES': 2, 'HQ_VP': 3, 'HQ_GSEC': 4, 'HQ_TRES': 5 };
    return (roleOrder[a.deptCode] || 99) - (roleOrder[b.deptCode] || 99);
  }) : [];
  const leadMembers = rosterData ? rosterData.filter(m => m.deptCode?.startsWith('TH_')) : [];
  const deptMembers = rosterData ? rosterData.filter(m => {
    const c = (m.deptCode || '').toUpperCase();
    return !c.startsWith('HQ_') && !c.startsWith('TH_') && !c.startsWith('OTHER:');
  }) : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="space-y-12"
    >
      {/* 1. LOOKSMAXED HEADER */}
      <div className="space-y-4 relative lg:max-w-[58%]">
        <div className="absolute -top-12 -left-10 w-44 h-44 bg-purple-500/10 rounded-full blur-[60px] pointer-events-none" />
        <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/15 px-4 py-1.5 text-[10px] font-mono font-black uppercase tracking-[0.25em] text-purple-300">
          <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
          <span>Esports Command</span>
        </div>

        <div>
          <CursorPhysicsDistortion>
            <h1 className="font-display text-3xl font-black tracking-tighter text-white sm:text-5xl uppercase">
              Leadership & <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-pink-600 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]">Roster</span>
            </h1>
          </CursorPhysicsDistortion>
        </div>

        <p className="max-w-full text-sm leading-relaxed text-gray-300 sm:text-base border-l-2 border-purple-500/50 pl-4 py-1">
          Meet the Core Committee driving Playstorm's operational dominance, alongside the elite competitive lineups representing Amity on the server.
        </p>
      </div>

      {/* --- SECTION 1: EXECUTIVE BOARD --- */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-3">
          <div className="p-2 rounded-lg bg-yellow-500/20 text-yellow-400"><Crown size={20} /></div>
          <h2 className="text-sm font-bold text-white uppercase tracking-[0.22em] pl-1">Executive Board</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rosterData ? (
            execMembers.map((m, idx) => {
              const { role, color } = getRoleInfo(m);
              return (
                <CoreMemberCard
                  key={m.discordId || idx}
                  role={role}
                  name={m.fullName}
                  color={color}
                  img={imageMap[m.fullName] || null}
                />
              );
            })
          ) : (
            <div className="col-span-full py-8 text-center text-xs font-mono tracking-widest text-yellow-400/70 animate-pulse border border-white/10 rounded-xl bg-black/75">
              Loading Executive Board from live sheets...
            </div>
          )}
        </div>
      </section>

      {/* --- SECTION 2: DEPARTMENT LEADS --- */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-3">
          <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400"><Shield size={20} /></div>
          <h2 className="text-sm font-bold text-white uppercase tracking-[0.22em] pl-1">Department Leads</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rosterData ? (
            leadMembers.map((m, idx) => {
              const { role, color } = getRoleInfo(m);
              return (
                <CoreMemberCard
                  key={m.discordId || idx}
                  role={role}
                  name={m.fullName}
                  color={color}
                  img={imageMap[m.fullName] || null}
                />
              );
            })
          ) : (
            <div className="col-span-full py-8 text-center text-xs font-mono tracking-widest text-emerald-400/70 animate-pulse border border-white/10 rounded-xl bg-black/75">
              Loading Department Leads from live sheets...
            </div>
          )}
        </div>
      </section>

      {/* --- SECTION 2.5: DEPARTMENT MEMBERS --- */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-3">
          <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400"><Users size={20} /></div>
          <h2 className="text-sm font-bold text-white uppercase tracking-[0.22em] pl-1">Department Members</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rosterData ? (
            deptMembers.map((m, idx) => {
              const { role, color } = getRoleInfo(m);
              return (
                <CoreMemberCard
                  key={m.discordId || idx}
                  role={role}
                  name={m.fullName}
                  color={color}
                  img={imageMap[m.fullName] || null}
                />
              );
            })
          ) : (
            <div className="col-span-full py-8 text-center text-xs font-mono tracking-widest text-purple-400/70 animate-pulse border border-white/10 rounded-xl bg-black/75">
              Loading Department Members from live sheets...
            </div>
          )}
        </div>
      </section>

      {/* --- SECTION 3: COMPETITIVE LINEUPS --- */}
      <section className="space-y-6 pt-8 border-t border-white/10">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-red-500/20 text-red-400"><Trophy size={20} /></div>
          <h2 className="text-sm font-bold text-white uppercase tracking-[0.22em] pl-1">Active Lineups</h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2">

          {/* VALORANT ROSTER */}
          <GlowCard className="rounded-3xl border border-red-500/20 bg-gradient-to-b from-red-950/20 via-black/75 to-black overflow-hidden shadow-[0_0_50px_rgba(239,68,68,0.1)] flex flex-col relative">
            <div className="bg-gradient-to-r from-red-600/20 via-black/75 to-black p-6 border-b border-red-500/30 flex justify-between items-center relative overflow-hidden">
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-red-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-2xl font-bold text-white uppercase tracking-wider">Valorant</h3>
                  <span className="px-2.5 py-0.5 rounded bg-red-500/20 border border-red-500/40 text-red-400 text-[10px] font-bold tracking-widest">TIER 1</span>
                </div>
                <p className="text-xs text-gray-400 font-mono mt-1">PC COMPETITIVE LINEUP</p>
              </div>
              <div className="relative z-10 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/15 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider shadow-lg">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> Active Roster
              </div>
            </div>
            <div className="p-6 flex-1 overflow-y-auto max-h-[620px] custom-scrollbar space-y-1">
              <div className="px-2 text-[10px] font-bold tracking-widest text-red-500/70 uppercase">Lineup 1</div>
              <PlayerRow name="POZO" tag="1805" />
              <PlayerRow name="r4v" tag="2cold" />
              <PlayerRow name="KID SCIZZAR" tag="ONGOD" />
              <PlayerRow name="aayan" tag="meow" />
              <PlayerRow name="CAPTAINGAMER" tag="PAHAD" />

              <div className="mt-4 px-2 text-[10px] font-bold tracking-widest text-red-500/70 uppercase">Lineup 2</div>
              <PlayerRow name="kura" tag="kneel" />
              <PlayerRow name="MagicMasalaLays" tag="001" />
              <PlayerRow name="Mequidi" tag="IAMYE" />
              <PlayerRow name="TAEDOROKI" tag="HAISE" />
              <PlayerRow name="MR CYBERX" tag="CYBER" />

              <div className="mt-4 px-2 text-[10px] font-bold tracking-widest text-red-500/70 uppercase">Substitutes</div>
              <PlayerRow name="FRICK1N" tag="FRICK" />
              <PlayerRow name="CUR3D" tag="HE11" />
              <PlayerRow name="JUNE" tag="GOGH" />
              <PlayerRow name="TOMATINAT0R" tag="RICE0" />
            </div>
          </GlowCard>

          {/* BGMI ROSTER */}
          <GlowCard className="rounded-3xl border border-orange-500/20 bg-gradient-to-b from-orange-950/20 via-black/75 to-black overflow-hidden shadow-[0_0_50px_rgba(249,115,22,0.1)] flex flex-col relative h-fit">
            <div className="bg-gradient-to-r from-orange-600/20 via-black/75 to-black p-6 border-b border-orange-500/30 flex justify-between items-center relative overflow-hidden">
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-2xl font-bold text-white uppercase tracking-wider">BGMI</h3>
                  <span className="px-2.5 py-0.5 rounded bg-orange-500/20 border border-orange-500/40 text-orange-400 text-[10px] font-bold tracking-widest">ELITE</span>
                </div>
                <p className="text-xs text-gray-400 font-mono mt-1">MOBILE COMPETITIVE SQUAD</p>
              </div>
              <div className="relative z-10 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider shadow-lg">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" /> Active Roster
              </div>
            </div>

            <div className="p-6 space-y-1">
              <PlayerRow name="PSxENFORCER" bgmiId="552486766" role="IGL" game="bgmi" />
              <PlayerRow name="PSxICONICqt" bgmiId="5703628686" role="Assaulter" game="bgmi" />
              <PlayerRow name="PSxEMPERORJoD" bgmiId="55626588075" role="Entry Fragger" game="bgmi" />
              <PlayerRow name="PSxVaRsHnEyOp" bgmiId="514131327" role="Supporter" game="bgmi" />
              <PlayerRow name="PSxZeusX" bgmiId="55515710172" role="Assaulter" game="bgmi" />
              <PlayerRow name="PSxPanTheR" bgmiId="5129894103" role="Supporter" game="bgmi" />
            </div>
          </GlowCard>

        </div>
      </section>

    </motion.div>
  )
}