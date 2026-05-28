import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Crown, User, Sparkles } from 'lucide-react'
import { gameRankings } from '../data/rankings'
import bgmiBackground from '../assets/bgmi_bg.webp'
import { TiltCard, GlowCard, MagneticElement, playTactileClick, playDigitalHover, CursorPhysicsDistortion } from '../components/VisualEffects'

function splitColumns(items) {
  const midpoint = Math.ceil(items.length / 2)
  return [items.slice(0, midpoint), items.slice(midpoint)]
}

function getRankTone(rank) {
  if (rank === 1) return 'text-amber-300'
  if (rank === 2) return 'text-slate-300'
  if (rank === 3) return 'text-amber-700'
  return 'text-white'
}

function getRankGlow(rank) {
  if (rank === 1) return 'shadow-[0_0_18px_rgba(251,191,36,0.3)]'
  if (rank === 2) return 'shadow-[0_0_18px_rgba(226,232,240,0.2)]'
  if (rank === 3) return 'shadow-[0_0_18px_rgba(180,83,9,0.2)]'
  return ''
}

function TableHeader({ columns, className = '' }) {
  return (
    <div className={`grid ${columns.grid} gap-3 text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-gray-400 ${className} border-b border-white/5 pb-2`}>
      {columns.labels.map((label) => (
        <span key={label}>{label}</span>
      ))}
    </div>
  )
}

function TableRow({ columns, children, className = '' }) {
  return (
    <MagneticElement>
      <div
        onClick={playTactileClick}
        onMouseEnter={playDigitalHover}
        className={`grid ${columns.grid} gap-3 rounded-xl border border-white/10 bg-black/60 backdrop-blur-md px-4 py-3 text-sm text-gray-200 transition duration-300 hover:scale-[1.01] hover:border-purple-500/20 cursor-pointer w-full select-none ${className}`}
      >
        {children}
      </div>
    </MagneticElement>
  )
}

function DataTable({
  title,
  columns,
  rows,
  renderRow,
  headerClassName = '',
  iconClassName = 'text-purple-300',
  split = true
}) {
  const [left, right] = split ? splitColumns(rows) : [rows, []]

  return (
    <GlowCard className="rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl p-6">
      <div className="flex items-center gap-3 pb-4 border-b border-white/5 mb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
          {title.includes('Team') ? (
            <Crown className={`h-5 w-5 ${iconClassName}`} />
          ) : (
            <User className={`h-5 w-5 ${iconClassName}`} />
          )}
        </div>
        <h3 className="font-display text-lg text-white font-bold">{title}</h3>
      </div>
      <div className={`grid gap-4 ${split ? 'lg:grid-cols-2' : ''}`}>
        {[left, right].map((group, index) => (
          group.length > 0 ? (
            <div key={index} className="space-y-3">
              <TableHeader columns={columns} className={headerClassName} />
              {group.map((row, rowIndex) => renderRow(row, rowIndex + 1 + index * left.length))}
            </div>
          ) : null
        ))}
      </div>
    </GlowCard>
  )
}

function BgmiTables({ teams, individuals, view }) {
  const theme = getGameTheme('BGMI')
  const [teamPage, setTeamPage] = useState(1)
  const [individualPage, setIndividualPage] = useState(1)
  const pageSize = 10
  const totalTeamPages = Math.max(1, Math.ceil(teams.length / pageSize))
  const totalIndividualPages = Math.max(1, Math.ceil(individuals.length / pageSize))

  useEffect(() => {
    setTeamPage(1)
    setIndividualPage(1)
  }, [view, teams.length, individuals.length])

  const pagedTeams = teams.slice((teamPage - 1) * pageSize, teamPage * pageSize)
  const pagedIndividuals = individuals.slice((individualPage - 1) * pageSize, individualPage * pageSize)
  const teamColumns = {
    grid: 'grid-cols-[50px,1.5fr,0.5fr,0.5fr,0.6fr] items-center',
    labels: ['Rank', 'Team', 'PP', 'FP', 'Total']
  }

  const individualColumns = {
    grid: 'grid-cols-[50px,1.2fr,1fr,0.9fr,0.8fr] items-center',
    labels: ['Rank', 'Player', 'Team', 'Points', 'Finishes']
  }

  return (
    <div className="grid gap-6">
      {view === 'teams' && (
        <div className="space-y-4">
          <DataTable
            title="BGMI Teams"
            columns={teamColumns}
            headerClassName={theme.header}
            iconClassName={theme.header}
            rows={pagedTeams}
            split={false}
            renderRow={(team, index) => (
              <TableRow
                key={team.teamName}
                columns={teamColumns}
                className={`${theme.row} ${getRankGlow(index + (teamPage - 1) * pageSize)}`}
              >
                <span className={`font-bold ${getRankTone(index + (teamPage - 1) * pageSize)}`}>
                  #{index + (teamPage - 1) * pageSize}
                </span>
                <span className="text-white font-semibold">{team.teamName}</span>
                <span className="text-gray-200 font-mono">{team.placementPoints}</span>
                <span className="text-gray-200 font-mono">{team.kills}</span>
                <span className={`${theme.score} font-semibold font-mono`}>{team.total}</span>
              </TableRow>
            )}
          />
          {totalTeamPages > 1 && (
            <div className="flex flex-wrap justify-center gap-2">
              {Array.from({ length: totalTeamPages }, (_, pageIndex) => {
                const pageNumber = pageIndex + 1
                const isActive = pageNumber === teamPage

                return (
                  <button
                    key={pageNumber}
                    onClick={() => { playTactileClick(); setTeamPage(pageNumber); }}
                    className={[
                      'h-8 w-8 rounded-full text-xs font-bold border transition font-mono',
                      isActive
                        ? 'bg-lime-400/20 border-lime-300 text-lime-100'
                        : 'bg-black/60 border-white/10 text-gray-400 hover:text-white hover:border-lime-300/60'
                    ].join(' ')}
                  >
                    {pageNumber}
                  </button>
                )
              })}
            </div>
          )}
        </div>
      )}

      {view === 'individuals' && (
        <div className="space-y-4">
          <DataTable
            title="BGMI Individuals"
            columns={individualColumns}
            headerClassName={theme.header}
            iconClassName={theme.header}
            rows={pagedIndividuals}
            split={false}
            renderRow={(player, index) => (
              <TableRow
                key={player.playerName}
                columns={individualColumns}
                className={`${theme.row} ${getRankGlow(index + (individualPage - 1) * pageSize)}`}
              >
                <span className={`font-bold ${getRankTone(index + (individualPage - 1) * pageSize)}`}>
                  #{index + (individualPage - 1) * pageSize}
                </span>
                <span className="text-white font-semibold">{player.playerName}</span>
                <span className="text-gray-400 font-mono">{player.teamName}</span>
                <span className={`${theme.score} font-semibold font-mono`}>{player.points}</span>
                <span className="font-mono">{player.finishes}</span>
              </TableRow>
            )}
          />
          {totalIndividualPages > 1 && (
            <div className="flex flex-wrap justify-center gap-2">
              {Array.from({ length: totalIndividualPages }, (_, pageIndex) => {
                const pageNumber = pageIndex + 1
                const isActive = pageNumber === individualPage

                return (
                  <button
                    key={pageNumber}
                    onClick={() => { playTactileClick(); setIndividualPage(pageNumber); }}
                    className={[
                      'h-8 w-8 rounded-full text-xs font-bold border transition font-mono',
                      isActive
                        ? 'bg-lime-400/20 border-lime-300 text-lime-100'
                        : 'bg-black/60 border-white/10 text-gray-400 hover:text-white hover:border-lime-300/60'
                    ].join(' ')}
                  >
                    {pageNumber}
                  </button>
                )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function getGameTheme(game) {
  const themes = {
    BGMI: {
      header: 'text-lime-300',
      row: 'border-lime-500/30 bg-black/60',
      score: 'text-lime-300',
      card: 'border-lime-500/20'
    },
    Valorant: {
      header: 'text-rose-300',
      row: 'border-rose-500/20 bg-[#160b12]/80',
      score: 'text-rose-300',
      card: 'border-rose-500/20'
    },
    CODM: {
      header: 'text-cyan-300',
      row: 'border-cyan-500/20 bg-[#0b1216]/80',
      score: 'text-cyan-300',
      card: 'border-cyan-500/20'
    },
    'Clash Royale': {
      header: 'text-amber-300',
      row: 'border-amber-500/20 bg-[#17120b]/80',
      score: 'text-amber-300',
      card: 'border-amber-500/20'
    },
    Tekken: {
      header: 'text-orange-300',
      row: 'border-orange-500/20 bg-[#17100b]/80',
      score: 'text-orange-300',
      card: 'border-orange-500/20'
    }
  }

  return themes[game] || {
    header: 'text-purple-300',
    row: 'border-purple-500/20 bg-[#120b18]/80',
    score: 'text-purple-300',
    card: 'border-purple-500/20'
  }
}

export default function LeaderboardPage() {
  const [selectedGame, setSelectedGame] = useState('BGMI')
  const [selectedView, setSelectedView] = useState('teams')

  const activeGame = useMemo(() => {
    return gameRankings.find((game) => game.game === selectedGame) || null
  }, [selectedGame])

  const hasTeamsForSelection = useMemo(() => {
    return activeGame ? activeGame.teams.length > 0 : false
  }, [activeGame])

  useEffect(() => {
    if (!hasTeamsForSelection && selectedView === 'teams') {
      setSelectedView('individuals')
    }
  }, [hasTeamsForSelection, selectedView])

  const visibleGames = useMemo(() => {
    return gameRankings.filter((game) => game.game === 'BGMI')
  }, [selectedGame])

  const availableGames = useMemo(() => {
    return gameRankings.filter((game) => game.game === 'BGMI')
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="space-y-12 pb-16"
    >
      
      {/* 1. LOOKSMAXED HEADER */}
      <div className="space-y-4 relative lg:max-w-[58%]">
        <div className="absolute -top-12 -left-10 w-44 h-44 bg-purple-500/10 rounded-full blur-[60px] pointer-events-none" />
        <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 backdrop-blur-md text-[10px] font-mono font-black uppercase tracking-[0.25em] text-purple-300">
          <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
          <span>Esports Standings</span>
        </div>
        
        <div>
          <CursorPhysicsDistortion>
            <h1 className="font-display text-3xl font-black tracking-tight text-white sm:text-5xl uppercase">
              Overall <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-pink-600 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]">Standings</span> 🏆
            </h1>
          </CursorPhysicsDistortion>
        </div>
        
        <p className="max-w-full text-sm leading-relaxed text-gray-300 sm:text-base border-l-2 border-purple-500/50 pl-4 py-1">
          Track every clash, match outcome, and overall placement. Standings sync directly from our active sheet feeds during league runs.
        </p>
      </div>

      <section className="space-y-8">
        {availableGames.length > 1 && (
          <div className="flex flex-wrap justify-center gap-2">
            {availableGames.map((game) => (
              <MagneticElement key={game.game}>
                <button
                  key={game.game}
                  onClick={() => { playTactileClick(); setSelectedGame(game.game); }}
                  className={[
                    'px-5 py-2 rounded-xl text-[11px] font-bold uppercase tracking-[0.2em] border transition font-mono',
                    selectedGame === game.game
                      ? 'bg-purple-600/40 border-purple-400 text-purple-100 shadow-[0_0_12px_rgba(168,85,247,0.4)]'
                      : 'bg-[#111224] border-white/10 text-gray-400 hover:text-white hover:border-purple-400/60'
                  ].join(' ')}
                >
                  {game.game}
                </button>
              </MagneticElement>
            ))}
          </div>
        )}
        
        {hasTeamsForSelection && (
          <div className="flex flex-wrap justify-center gap-3">
            {['teams', 'individuals'].map((view) => (
              <MagneticElement key={view}>
                <button
                  key={view}
                  onClick={() => { playTactileClick(); setSelectedView(view); }}
                  className={[
                    'px-6 py-2 rounded-full text-xs font-bold uppercase tracking-[0.3em] border transition font-mono',
                    selectedView === view
                      ? 'bg-white/10 border-purple-300 text-white'
                      : 'bg-[#111224] border-white/10 text-gray-400 hover:text-white hover:border-purple-300/60'
                  ].join(' ')}
                >
                  {view === 'teams' ? 'Team' : 'Individual'}
                </button>
              </MagneticElement>
            ))}
          </div>
        )}

        <div className="grid gap-6">
          {visibleGames.map((game) => (
            (() => {
              const theme = getGameTheme(game.game)
              const hasTeams = game.teams.length > 0
              const effectiveView = selectedView === 'teams' && !hasTeams ? 'individuals' : selectedView

              return (
                <div
                  key={game.game}
                  className={`relative overflow-hidden rounded-2xl border bg-black/60 backdrop-blur-xl p-6 space-y-6 ${theme.card}`}
                  style={
                    game.game === 'BGMI'
                      ? {
                          backgroundImage: `linear-gradient(rgba(7, 10, 8, 0.55), rgba(7, 10, 8, 0.55)), url(${bgmiBackground})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }
                      : undefined
                  }
                >
                  <div className="flex flex-col items-center gap-2 text-center">
                    <h3 className="font-display text-xl text-white font-bold">
                      {game.game === 'BGMI' ? 'Battlegrounds Mobile India (BGMI)' : game.game}
                    </h3>
                    <p className="text-xs font-mono uppercase tracking-[0.25em] text-gray-400">{game.format}</p>
                  </div>

                  {game.game === 'BGMI' ? (
                    <BgmiTables teams={game.teams} individuals={game.individuals} view={effectiveView} />
                  ) : (
                    <DataTable
                      title={effectiveView === 'teams' ? `${game.game} Teams` : `${game.game} Individuals`}
                      columns={
                        effectiveView === 'teams'
                          ? {
                              grid: 'grid-cols-[50px,1.6fr,0.6fr] items-center',
                              labels: ['Rank', 'Team', 'Points']
                            }
                          : {
                              grid: 'grid-cols-[50px,1.6fr,0.6fr] items-center',
                              labels: ['Rank', 'Player', 'Points']
                            }
                      }
                      rows={effectiveView === 'teams' ? game.teams : game.individuals}
                      headerClassName={theme.header}
                      iconClassName={theme.header}
                      renderRow={(row, index) => (
                        <TableRow
                          key={row.name}
                          columns={{ grid: 'grid-cols-[50px,1.6fr,0.6fr] items-center' }}
                          className={`${theme.row} ${getRankGlow(index)}`}
                        >
                          <span className={`font-bold ${getRankTone(index)}`}>#{index}</span>
                          <span className="text-white font-semibold">{row.name}</span>
                          <span className={`${theme.score} font-semibold font-mono`}>{row.points}</span>
                        </TableRow>
                      )}
                    />
                  )}
                </div>
              )
            })()
          ))}
        </div>
      </section>
    </motion.div>
  )
}
