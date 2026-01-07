import { motion } from 'framer-motion'
import { Crown, Star, Shield, Users, Trophy } from 'lucide-react'

// --- LOCAL ASSET IMPORTS ---
// Make sure these files exist in your src/assets/ folder!
import abhinavImg from '../assets/abhinav.webp'
import shouryaImg from '../assets/shourya.webp'
import muditaImg from '../assets/mudita.webp'
import kavyaImg from '../assets/kavya.webp'
import rithwikImg from '../assets/rithwik.webp'
import vedikaImg from '../assets/vedika.webp'
import farazImg from '../assets/faraz.webp'
import akanshiImg from '../assets/akanshi.webp'
import bhagatImg from '../assets/bhagat.webp'
import ishaanImg from '../assets/ishaan.webp'
import sahilImg from '../assets/sahil.webp'
import ashrafulImg from '../assets/ashraful.webp'
import divyanshuImg from '../assets/divyanshu.webp'
import shrutiImg from '../assets/shruti.webp'
import abhisarImg from '../assets/abhisar.webp'
import lakshikaImg from '../assets/lakshika.webp'
import devashishImg from '../assets/devashish.webp'
import vivekImg from '../assets/vivek.webp'

// --- HEADER COMPONENT ---
function PageHeader({ eyebrow, title, description }) {
  return (
    <div className="space-y-3 mb-10 border-b border-white/10 pb-8">
      <p className="font-display text-[11px] uppercase tracking-[0.26em] text-purple-300">{eyebrow}</p>
      <h2 className="font-display text-2xl text-white sm:text-3xl">{title}</h2>
      <p className="max-w-2xl text-sm text-gray-300 sm:text-base">{description}</p>
    </div>
  )
}

// --- CORE TEAM CARD ---
function CoreMemberCard({ role, name, color = "purple", img }) {
  const colors = {
    gold: "text-yellow-400 border-yellow-400/30 bg-gradient-to-br from-yellow-400/10 to-yellow-600/5",
    purple: "text-purple-400 border-purple-400/30 bg-gradient-to-br from-purple-400/10 to-purple-600/5",
    pink: "text-pink-400 border-pink-400/30 bg-gradient-to-br from-pink-400/10 to-pink-600/5",
    blue: "text-blue-400 border-blue-400/30 bg-gradient-to-br from-blue-400/10 to-blue-600/5",
    green: "text-emerald-400 border-emerald-400/30 bg-gradient-to-br from-emerald-400/10 to-emerald-600/5",
  }
  
  const glowColors = {
    gold: "shadow-[0_0_20px_rgba(251,191,36,0.15)]",
    purple: "shadow-[0_0_20px_rgba(192,132,252,0.15)]",
    pink: "shadow-[0_0_20px_rgba(244,114,182,0.15)]",
    blue: "shadow-[0_0_20px_rgba(96,165,250,0.15)]",
    green: "shadow-[0_0_20px_rgba(52,211,153,0.15)]",
  }
  
  return (
    <div className={`group p-5 rounded-xl border backdrop-blur-sm flex items-center gap-4 transition-all duration-300 hover:scale-[1.02] hover:bg-white/5 ${colors[color]} ${glowColors[color]}`}>
      <div className="flex-shrink-0 relative">
        {img ? (
          <>
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <img src={img} alt={role} className="w-14 h-14 rounded-full object-cover border-2 border-white/20 relative z-10 transition-transform duration-300 group-hover:scale-105"/>
          </>
        ) : (
          <div className={`w-14 h-14 rounded-full flex items-center justify-center bg-black/60 border-2 border-white/10 transition-all duration-300 group-hover:border-white/30`}>
            {color === 'gold' && <Crown className="w-7 h-7" />}
            {color === 'purple' || color === 'pink' ? <Star className="w-7 h-7" /> : <Shield className="w-7 h-7" />}
          </div>
        )}
      </div>
      <div className="flex-1">
        <h3 className="font-display text-[10px] font-bold uppercase tracking-widest opacity-70 group-hover:opacity-100 transition-opacity">{role}</h3>
        <p className="text-sm font-bold text-white mt-0.5 group-hover:tracking-wide transition-all duration-300">{name}</p>
      </div>
    </div>
  )
}

// --- PLAYER ROW COMPONENT ---
function PlayerRow({ name, tag }) {
  return (
    <div className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition border-b border-white/5 last:border-0">
      <div className="flex items-center gap-3">
        <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
        <span className="text-sm text-gray-200 font-medium">{name}</span>
      </div>
      {tag && <span className="text-xs font-mono text-gray-500 uppercase tracking-wider">#{tag}</span>}
    </div>
  )
}

export default function RosterPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.45 }}
      className="max-w-5xl mx-auto space-y-16 pb-12"
    >
      <PageHeader 
        eyebrow="Leadership & Lineups" 
        title="The People Behind Playstorm" 
        description="Meet the Core Committee running the show and the Competitive Lineups representing Amity on the server." 
      />

      {/* --- SECTION 1: EXECUTIVE BOARD --- */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-yellow-500/20 text-yellow-400"><Crown size={20} /></div>
          <h2 className="text-xl font-bold text-white uppercase tracking-wide">Executive Board</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          
          <CoreMemberCard 
            role="President" 
            name="Abhinav Sushil Varshney" 
            color="gold" 
            img={abhinavImg} 
          />
          <CoreMemberCard 
            role="Founder" 
            name="Shourya Pal" 
            color="gold" 
            img={shouryaImg} 
          />
          <CoreMemberCard 
            role="Vice President" 
            name="Mudita Dani" 
            color="pink" 
            img={muditaImg} 
          />
          <CoreMemberCard role="General Secretary" name="Ishaan Rastogi" color="blue" img={ishaanImg} />
          <CoreMemberCard role="Treasurer" name="Sahil Yadav" color="blue" img={sahilImg} />
        </div>
      </section>

      {/* --- SECTION 2: DEPARTMENT LEADS --- */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400"><Shield size={20} /></div>
          <h2 className="text-xl font-bold text-white uppercase tracking-wide">Department Leads</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <CoreMemberCard role="Tech Head" name="Ashraful Zeya" color="green" img={ashrafulImg} />
          <CoreMemberCard role="Esport Management" name="Kavya Sejwal" color="green" img={kavyaImg} />
          <CoreMemberCard role="Esports Management" name="Rithwik Sahni" color="green" img={rithwikImg} />
          <CoreMemberCard role="Sales Head" name="Vedika Chikhale" color="green" img={vedikaImg} />
          <CoreMemberCard role="Outreach Head" name="Mohd Faraz" color="green" img={farazImg} />
          <CoreMemberCard role="Outreach Head" name="Akanshi Singh" color="green" img={akanshiImg} />
          <CoreMemberCard role="Social Media Head" name="Divyanshu Dixit" color="green" img={divyanshuImg} />
          <CoreMemberCard role="Social Media Head" name="Khushi Bhagat" color="green" img={bhagatImg} />
          <CoreMemberCard role="Content Head" name="Abhisar Bhardwaj" color="green" img={abhisarImg} />
          <CoreMemberCard role="Content Head" name="Lakshika Singh" color="green" img={lakshikaImg} />
          <CoreMemberCard role="Design Head" name="Devashish Samkola" color="green" img={devashishImg} />
          <CoreMemberCard role="Media Head" name="Vivek Choudhary" color="green" img={vivekImg} />
        </div>
      </section>

      {/* --- SECTION 3: COMPETITIVE LINEUPS --- */}
      <section className="space-y-6 pt-8 border-t border-white/10">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-red-500/20 text-red-400"><Trophy size={20} /></div>
          <h2 className="text-xl font-bold text-white uppercase tracking-wide">Active Lineups</h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          
          {/* VALORANT ROSTER */}
          <div className="rounded-2xl border border-white/10 bg-black/40 overflow-hidden">
            <div className="bg-gradient-to-r from-red-900/40 to-black p-4 border-b border-white/10 flex justify-between items-center">
              <div>
                <h3 className="font-display text-lg font-bold text-white uppercase tracking-wider">Valorant</h3>
                <p className="text-xs text-red-300 font-mono">COMPETITIVE</p>
              </div>
              <div className="px-3 py-1 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 text-[10px] font-bold uppercase tracking-widest">Active</div>
            </div>
            <div className="p-4 space-y-1">
              <PlayerRow name="@ chickenwingers" tag="whiff" />
              <PlayerRow name="@ r4v" tag="2cold" />
              <PlayerRow name="@ vec" tag="kneel" />
              <PlayerRow name="@ syNc meow meow" tag="m1lf" />
              <PlayerRow name="@ CapTainGAMER" tag="8278" />
              <PlayerRow name="@ aayan" tag="meow" />
              <PlayerRow name="@ Kid Scizzar元軍" tag="08888" />
              <PlayerRow name="@ Kranos" tag="Godly" />
              <PlayerRow name="@ Mequidi" tag="IAMYE" />
              <PlayerRow name="@ June" tag="gogh" />
              <PlayerRow name="@ Xeny" tag="uwu69" />
              <PlayerRow name="@ Frick1n" tag="frick" />
              <PlayerRow name="@ MagicMasalaLays" tag="001" />
            </div>
          </div>

          {/* BGMI ROSTER */}
          <div className="rounded-2xl border border-white/10 bg-black/40 overflow-hidden h-fit">
            <div className="bg-gradient-to-r from-yellow-900/40 to-black p-4 border-b border-white/10 flex justify-between items-center">
              <div>
                <h3 className="font-display text-lg font-bold text-white uppercase tracking-wider">BGMI</h3>
                <p className="text-xs text-yellow-300 font-mono">MOBILE SQUAD</p>
              </div>
              <div className="px-3 py-1 rounded-full bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 text-[10px] font-bold uppercase tracking-widest">Active</div>
            </div>
            
            <div className="p-4 space-y-1">
              <PlayerRow name="PSxENFORCER" />
              <PlayerRow name="PSxZeusX" />
              <PlayerRow name="PSxShuvam2507" />
              <PlayerRow name="PSxVaRsHnEyOp" />
              <PlayerRow name="PSxVillan" />
              <PlayerRow name="PSxSahilgodOp" />
            </div>
          </div>

        </div>
      </section>

    </motion.div>
  )
}