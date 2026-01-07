import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Crown, User } from 'lucide-react'
import { gameRankings } from '../data/rankings'
import bgmiBackground from '../assets/bgmi_bg.webp'

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
  if (rank === 1) return 'shadow-[0_0_18px_rgba(251,191,36,0.45)]'
  if (rank === 2) return 'shadow-[0_0_18px_rgba(226,232,240,0.35)]'
  if (rank === 3) return 'shadow-[0_0_18px_rgba(180,83,9,0.35)]'
  return ''
}

function TableHeader({ columns, className = '' }) {
  return (
    <div className={`grid ${columns.grid} gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 ${className}`}>
      {columns.labels.map((label) => (
        <span key={label}>{label}</span>
      ))}
    </div>
  )
}

function TableRow({ columns, children, className = '' }) {
  return (
    <div
      className={`grid ${columns.grid} gap-3 rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-gray-200 ${className}`}
    >
      {children}
    </div>
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
    <div className="rounded-2xl border border-white/10 bg-black/30 p-6">
      <div className="flex items-center gap-3 pb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
          {title.includes('Team') ? (
            <Crown className={`h-5 w-5 ${iconClassName}`} />
          ) : (
            <User className={`h-5 w-5 ${iconClassName}`} />
          )}
        </div>
        <h3 className="font-display text-lg text-white">{title}</h3>
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
    </div>
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
                <span className="text-gray-200">{team.placementPoints}</span>
                <span className="text-gray-200">{team.kills}</span>
                <span className={`${theme.score} font-semibold`}>{team.total}</span>
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
                    onClick={() => setTeamPage(pageNumber)}
                    className={[
                      'h-8 w-8 rounded-full text-xs font-bold border transition',
                      isActive
                        ? 'bg-lime-400/20 border-lime-300 text-lime-100'
                        : 'bg-black/40 border-white/10 text-gray-400 hover:text-white hover:border-lime-300/60'
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
                <span className="text-gray-400">{player.teamName}</span>
                <span className={`${theme.score} font-semibold`}>{player.points}</span>
                <span>{player.finishes}</span>
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
                    onClick={() => setIndividualPage(pageNumber)}
                    className={[
                      'h-8 w-8 rounded-full text-xs font-bold border transition',
                      isActive
                        ? 'bg-lime-400/20 border-lime-300 text-lime-100'
                        : 'bg-black/40 border-white/10 text-gray-400 hover:text-white hover:border-lime-300/60'
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
      row: 'border-lime-500/30 bg-black/40',
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
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.4 }}
      className="space-y-12 pb-16"
    >
      <section className="relative overflow-hidden rounded-[28px] border border-purple-500/30 bg-[#0b0b18] p-8 md:p-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(124,58,237,0.35),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(88,28,135,0.35),_transparent_50%)]" />
        <div className="absolute inset-0 opacity-70 bg-[radial-gradient(#4c1d95_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="relative z-10 flex flex-col items-center gap-4 text-center">
          <span className="rounded-full border border-purple-400/40 bg-purple-500/10 px-4 py-1 text-[10px] font-bold uppercase tracking-[0.3em] text-purple-200">
            {selectedGame === 'all' ? 'Overall Rankings' : `${selectedGame} Rankings`}
          </span>
          <h1 className="font-display text-3xl text-white sm:text-4xl">Overall Standings</h1>
          <p className="max-w-2xl text-sm text-gray-300">
            Track every game, every squad, and every grind. Pick a game to see full standings.
          </p>
        </div>
      </section>

      <section className="space-y-8">
        {availableGames.length > 1 && (
          <div className="flex flex-wrap justify-center gap-2">
            {availableGames.map((game) => (
              <button
                key={game.game}
                onClick={() => setSelectedGame(game.game)}
                className={[
                  'px-5 py-2 rounded-xl text-[11px] font-bold uppercase tracking-[0.2em] border transition',
                  selectedGame === game.game
                    ? 'bg-purple-600/40 border-purple-400 text-purple-100 shadow-[0_0_12px_rgba(168,85,247,0.4)]'
                    : 'bg-[#111224] border-white/10 text-gray-400 hover:text-white hover:border-purple-400/60'
                ].join(' ')}
              >
                {game.game}
              </button>
            ))}
          </div>
        )}
        {hasTeamsForSelection && (
          <div className="flex flex-wrap justify-center gap-3">
            {['teams', 'individuals'].map((view) => (
              <button
                key={view}
                onClick={() => setSelectedView(view)}
                className={[
                  'px-6 py-2 rounded-full text-xs font-bold uppercase tracking-[0.3em] border transition',
                  selectedView === view
                    ? 'bg-white/10 border-purple-300 text-white'
                    : 'bg-[#111224] border-white/10 text-gray-400 hover:text-white hover:border-purple-300/60'
                ].join(' ')}
              >
                {view === 'teams' ? 'Team' : 'Individual'}
              </button>
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
              className={`relative overflow-hidden rounded-2xl border bg-[#0b0b18]/80 p-6 space-y-6 ${theme.card}`}
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
                <h3 className="font-display text-xl text-white">
                  {game.game === 'BGMI' ? 'Battlegrounds Mobile India (BGMI)' : game.game}
                </h3>
                <p className="text-xs uppercase tracking-[0.25em] text-gray-400">{game.format}</p>
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
                      <span className={`${theme.score} font-semibold`}>{row.points}</span>
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
