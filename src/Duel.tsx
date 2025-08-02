import React, { useState, useMemo } from 'react';

interface Atleta {
  fis_code: string;
  nome: string;
  eta: number | null;
  nazionalita: string;
  nazione_completa?: string;
  sesso: string;
  club?: string;
  punti: {
    sl: number | null;
    gs: number | null;
    sg: number | null;
    dh: number | null;
    ac: number | null;
  };
  gare?: any[];
}

interface DuelProps {
  atleti: Atleta[];
  formatAthleteName: (nome: string) => string;
  getCountryFlag: (nazionalita: string) => string;
}

interface CommonRace {
  data: string;
  luogo: string;
  nazione: string;
  specialita: string;
  athlete1Position: string;
  athlete2Position: string;
  athlete1Points: string;
  athlete2Points: string;
  winner: 'athlete1' | 'athlete2' | 'tie';
}

interface SpecialtyStats {
  name: string;
  fullName: string;
  commonRaces: CommonRace[];
  athlete1Wins: number;
  athlete2Wins: number;
  ties: number;
  winner: 'athlete1' | 'athlete2' | 'tie';
  athlete1WinPercentage: number;
  athlete2WinPercentage: number;
}

interface DuelAnalysis {
  specialties: SpecialtyStats[];
  overallWinner: 'athlete1' | 'athlete2' | 'tie';
  totalCommonRaces: number;
  totalWinsAthlete1: number;
  totalWinsAthlete2: number;
  totalTies: number;
  winCount: { athlete1: number; athlete2: number; ties: number };
  dominancePercentage: { athlete1: number; athlete2: number };
  strengthComparison: {
    athlete1Strengths: string[];
    athlete2Strengths: string[];
  };
}

const Duel: React.FC<DuelProps> = ({ atleti, formatAthleteName, getCountryFlag }) => {
  const [athlete1, setAthlete1] = useState<Atleta | null>(null);
  const [athlete2, setAthlete2] = useState<Atleta | null>(null);
  const [searchTerm1, setSearchTerm1] = useState('');
  const [searchTerm2, setSearchTerm2] = useState('');
  const [showDropdown1, setShowDropdown1] = useState(false);
  const [showDropdown2, setShowDropdown2] = useState(false);
  const [selectedView, setSelectedView] = useState<'overview' | 'detailed' | 'comparison'>('overview');

  const specialtyNames = {
    sl: 'Slalom',
    gs: 'Slalom Gigante',
    sg: 'Super Gigante',
    dh: 'Discesa Libera',
    ac: 'Alpine Combined'
  };

  const duelAnalysis = useMemo((): DuelAnalysis | null => {
    if (!athlete1 || !athlete2 || !athlete1.gare || !athlete2.gare) return null;

    // Funzione per determinare il vincitore di una gara
    const determineRaceWinner = (pos1: string, pos2: string): 'athlete1' | 'athlete2' | 'tie' => {
      // Gestione DNF, DSQ, DNS
      const isDNF1 = pos1.toLowerCase().includes('dnf') || pos1.toLowerCase().includes('dsq') || pos1.toLowerCase().includes('dns');
      const isDNF2 = pos2.toLowerCase().includes('dnf') || pos2.toLowerCase().includes('dsq') || pos2.toLowerCase().includes('dns');
      
      if (isDNF1 && isDNF2) return 'tie';
      if (isDNF1) return 'athlete2';
      if (isDNF2) return 'athlete1';
      
      // Estrazione posizione numerica
      const extractPosition = (pos: string): number | null => {
        const match = pos.match(/^(\d+)/); 
        return match ? parseInt(match[1]) : null;
      };
      
      const position1 = extractPosition(pos1);
      const position2 = extractPosition(pos2);
      
      if (position1 === null && position2 === null) return 'tie';
      if (position1 === null) return 'athlete2';
      if (position2 === null) return 'athlete1';
      
      if (position1 < position2) return 'athlete1';
      if (position2 < position1) return 'athlete2';
      return 'tie';
    };

    const specialties: SpecialtyStats[] = [];
    let totalWins1 = 0;
    let totalWins2 = 0;
    let totalTies = 0;
    let totalCommonRaces = 0;

    // Mappatura delle specialità dal database ai codici abbreviati
    const specialtyMapping: { [key: string]: string[] } = {
      'sl': ['slalom', 'special slalom'],
      'gs': ['giant slalom'],
      'sg': ['super-g', 'super g'],
      'dh': ['downhill'],
      'ac': ['alpine combined', 'combined']
    };

    (['sl', 'gs', 'sg', 'dh', 'ac'] as const).forEach(specialty => {
      const specialtyTerms = specialtyMapping[specialty] || [];
      const athlete1Races = (athlete1.gare || []).filter(gara => 
        specialtyTerms.some(term => gara.specialita.toLowerCase().includes(term))
      );
      const athlete2Races = (athlete2.gare || []).filter(gara => 
        specialtyTerms.some(term => gara.specialita.toLowerCase().includes(term))
      );
      
      // Trova gare comuni (stessa data e luogo)
      const commonRaces: CommonRace[] = [];
      let specialtyWins1 = 0;
      let specialtyWins2 = 0;
      let specialtyTies = 0;
      
      athlete1Races.forEach(race1 => {
        const matchingRace = athlete2Races.find(race2 => 
          race1.data === race2.data && race1.luogo === race2.luogo
        );
        
        if (matchingRace) {
          const winner = determineRaceWinner(race1.posizione, matchingRace.posizione);
          
          commonRaces.push({
            data: race1.data,
            luogo: race1.luogo,
            nazione: race1.nazione,
            specialita: race1.specialita,
            athlete1Position: race1.posizione,
            athlete2Position: matchingRace.posizione,
            athlete1Points: race1.punti_fis || 'N/A',
            athlete2Points: matchingRace.punti_fis || 'N/A',
            winner
          });
          
          if (winner === 'athlete1') {
            specialtyWins1++;
            totalWins1++;
          } else if (winner === 'athlete2') {
            specialtyWins2++;
            totalWins2++;
          } else {
            specialtyTies++;
            totalTies++;
          }
          totalCommonRaces++;
        }
      });
      
      const totalSpecialtyRaces = commonRaces.length;
      let specialtyWinner: 'athlete1' | 'athlete2' | 'tie';
      
      if (specialtyWins1 > specialtyWins2) {
        specialtyWinner = 'athlete1';
      } else if (specialtyWins2 > specialtyWins1) {
        specialtyWinner = 'athlete2';
      } else {
        specialtyWinner = 'tie';
      }
      
      specialties.push({
        name: specialty,
        fullName: specialtyNames[specialty],
        commonRaces,
        athlete1Wins: specialtyWins1,
        athlete2Wins: specialtyWins2,
        ties: specialtyTies,
        winner: specialtyWinner,
        athlete1WinPercentage: totalSpecialtyRaces > 0 ? (specialtyWins1 / totalSpecialtyRaces) * 100 : 0,
        athlete2WinPercentage: totalSpecialtyRaces > 0 ? (specialtyWins2 / totalSpecialtyRaces) * 100 : 0
      });
    });

    const overallWinner = totalWins1 > totalWins2 ? 'athlete1' : 
                         totalWins2 > totalWins1 ? 'athlete2' : 'tie';

    const athlete1Strengths = specialties
      .filter(s => s.winner === 'athlete1' && s.commonRaces.length > 0)
      .sort((a, b) => b.athlete1WinPercentage - a.athlete1WinPercentage)
      .slice(0, 2)
      .map(s => s.fullName);

    const athlete2Strengths = specialties
      .filter(s => s.winner === 'athlete2' && s.commonRaces.length > 0)
      .sort((a, b) => b.athlete2WinPercentage - a.athlete2WinPercentage)
      .slice(0, 2)
      .map(s => s.fullName);

    return {
      specialties,
      overallWinner,
      totalCommonRaces,
      totalWinsAthlete1: totalWins1,
      totalWinsAthlete2: totalWins2,
      totalTies,
      winCount: { athlete1: totalWins1, athlete2: totalWins2, ties: totalTies },
      dominancePercentage: {
        athlete1: totalCommonRaces > 0 ? (totalWins1 / totalCommonRaces) * 100 : 0,
        athlete2: totalCommonRaces > 0 ? (totalWins2 / totalCommonRaces) * 100 : 0
      },
      strengthComparison: {
        athlete1Strengths,
        athlete2Strengths
      }
    };
  }, [athlete1, athlete2]);

  const resetDuel = () => {
    setAthlete1(null);
    setAthlete2(null);
    setSearchTerm1('');
    setSearchTerm2('');
    setShowDropdown1(false);
    setShowDropdown2(false);
    setSelectedView('overview');
  };

  const filteredAthletes1 = atleti.filter(atleta => 
    atleta.nome.toLowerCase().includes(searchTerm1.toLowerCase()) &&
    (!athlete2 || atleta.fis_code !== athlete2.fis_code)
  );

  const filteredAthletes2 = atleti.filter(atleta => 
    atleta.nome.toLowerCase().includes(searchTerm2.toLowerCase()) &&
    (!athlete1 || atleta.fis_code !== athlete1.fis_code)
  );

  const ProgressBar: React.FC<{ percentage: number; color: string; height?: string }> = ({ 
    percentage, color, height = '8px' 
  }) => (
    <div className="progress-bar-container" style={{ height }}>
      <div 
        className="progress-bar-fill" 
        style={{ 
          width: `${percentage}%`, 
          backgroundColor: color,
          height: '100%',
          borderRadius: '4px',
          transition: 'width 0.6s ease'
        }}
      />
    </div>
  );

  const StatCard: React.FC<{ title: string; value: string | number; subtitle?: string; color?: string }> = ({
    title, value, subtitle, color = '#3b82f6'
  }) => (
    <div className="stat-card">
      <div className="stat-value" style={{ color }}>{value}</div>
      <div className="stat-title">{title}</div>
      {subtitle && <div className="stat-subtitle">{subtitle}</div>}
    </div>
  );

  return (
    <div className="duel-arena">
      <div className="duel-header">
        <div className="duel-title">
          <h1>⚔️ Arena del Duello</h1>
          <p>Confronta le performance di due atleti in tutte le specialità</p>
        </div>
      </div>

      <div className="athlete-selection-grid">
        {/* Selezione Atleta 1 */}
        <div className="athlete-selector-card">
          <div className="selector-header">
            <h3>🥇 Primo Sfidante</h3>
          </div>
          <div className="search-wrapper">
            <input
              type="text"
              placeholder="Cerca il primo atleta..."
              value={searchTerm1}
              onChange={(e) => {
                setSearchTerm1(e.target.value);
                setShowDropdown1(true);
              }}
              onFocus={() => setShowDropdown1(true)}
              className="athlete-search-input"
            />
            {showDropdown1 && searchTerm1 && (
              <div className="athlete-dropdown">
                {filteredAthletes1.slice(0, 8).map((atleta) => (
                  <div
                    key={atleta.fis_code}
                    className="athlete-option"
                    onClick={() => {
                      setAthlete1(atleta);
                      setSearchTerm1(formatAthleteName(atleta.nome));
                      setShowDropdown1(false);
                    }}
                  >
                    <div className="option-info">
                      <span className="option-name">{formatAthleteName(atleta.nome)}</span>
                      <span className="option-country">
                        {getCountryFlag(atleta.nazionalita)} {atleta.nazionalita}
                      </span>
                    </div>
                    <div className="option-age">{atleta.eta} anni</div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {athlete1 && (
            <div className="selected-athlete-card">
              <div className="athlete-avatar">
                <div className="avatar-circle athlete1">
                  {formatAthleteName(athlete1.nome).split(' ').map(n => n[0]).join('')}
                </div>
              </div>
              <div className="athlete-details">
                <h4>{formatAthleteName(athlete1.nome)}</h4>
                <p className="athlete-country">
                  {getCountryFlag(athlete1.nazionalita)} {athlete1.nazionalita}
                </p>
                <p className="athlete-age">{athlete1.eta} anni • {athlete1.sesso === 'M' ? 'Maschile' : 'Femminile'}</p>
                {athlete1.club && <p className="athlete-club">{athlete1.club}</p>}
              </div>
            </div>
          )}
        </div>

        {/* VS Divider */}
        <div className="vs-divider-container">
          <div className="vs-circle">
            <span>VS</span>
          </div>
          {athlete1 && athlete2 && (
            <div className="quick-stats">
              <div className="quick-stat">
                <span className="stat-label">Gare Comuni</span>
                <span className="stat-comparison">
                  {duelAnalysis?.totalCommonRaces || 0} gare
                </span>
              </div>
              <div className="quick-stat">
                <span className="stat-label">Vittorie</span>
                <span className="stat-comparison">
                  {duelAnalysis?.totalWinsAthlete1 || 0} - {duelAnalysis?.totalWinsAthlete2 || 0}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Selezione Atleta 2 */}
        <div className="athlete-selector-card">
          <div className="selector-header">
            <h3>🥈 Secondo Sfidante</h3>
          </div>
          <div className="search-wrapper">
            <input
              type="text"
              placeholder="Cerca il secondo atleta..."
              value={searchTerm2}
              onChange={(e) => {
                setSearchTerm2(e.target.value);
                setShowDropdown2(true);
              }}
              onFocus={() => setShowDropdown2(true)}
              className="athlete-search-input"
            />
            {showDropdown2 && searchTerm2 && (
              <div className="athlete-dropdown">
                {filteredAthletes2.slice(0, 8).map((atleta) => (
                  <div
                    key={atleta.fis_code}
                    className="athlete-option"
                    onClick={() => {
                      setAthlete2(atleta);
                      setSearchTerm2(formatAthleteName(atleta.nome));
                      setShowDropdown2(false);
                    }}
                  >
                    <div className="option-info">
                      <span className="option-name">{formatAthleteName(atleta.nome)}</span>
                      <span className="option-country">
                        {getCountryFlag(atleta.nazionalita)} {atleta.nazionalita}
                      </span>
                    </div>
                    <div className="option-age">{atleta.eta} anni</div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {athlete2 && (
            <div className="selected-athlete-card">
              <div className="athlete-avatar">
                <div className="avatar-circle athlete2">
                  {formatAthleteName(athlete2.nome).split(' ').map(n => n[0]).join('')}
                </div>
              </div>
              <div className="athlete-details">
                <h4>{formatAthleteName(athlete2.nome)}</h4>
                <p className="athlete-country">
                  {getCountryFlag(athlete2.nazionalita)} {athlete2.nazionalita}
                </p>
                <p className="athlete-age">{athlete2.eta} anni • {athlete2.sesso === 'M' ? 'Maschile' : 'Femminile'}</p>
                {athlete2.club && <p className="athlete-club">{athlete2.club}</p>}
              </div>
            </div>
          )}
        </div>
      </div>

      {duelAnalysis && (
        <div className="duel-results-container">
          {/* Navigation Tabs */}
          <div className="results-navigation">
            <button 
              className={`nav-tab ${selectedView === 'overview' ? 'active' : ''}`}
              onClick={() => setSelectedView('overview')}
            >
              📊 Panoramica
            </button>
            <button 
              className={`nav-tab ${selectedView === 'detailed' ? 'active' : ''}`}
              onClick={() => setSelectedView('detailed')}
            >
              📈 Analisi Dettagliata
            </button>
            <button 
              className={`nav-tab ${selectedView === 'comparison' ? 'active' : ''}`}
              onClick={() => setSelectedView('comparison')}
            >
              ⚖️ Confronto Diretto
            </button>
          </div>

          {/* Overview Tab */}
          {selectedView === 'overview' && (
            <div className="overview-section">
              <div className="winner-announcement">
                {duelAnalysis.overallWinner === 'tie' ? (
                  <div className="tie-result">
                    <h2>🤝 Pareggio</h2>
                    <p>Vittorie pari: {duelAnalysis.totalWinsAthlete1}-{duelAnalysis.totalWinsAthlete2} su {duelAnalysis.totalCommonRaces} gare comuni</p>
                  </div>
                ) : (
                  <div className="winner-result">
                    <h2>🏆 Vincitore del Duello</h2>
                    <div className="winner-info">
                      <div className="winner-name">
                        {formatAthleteName(
                          duelAnalysis.overallWinner === 'athlete1' ? athlete1!.nome : athlete2!.nome
                        )}
                      </div>
                      <div className="winner-country">
                        {getCountryFlag(
                          duelAnalysis.overallWinner === 'athlete1' ? athlete1!.nazionalita : athlete2!.nazionalita
                        )} {duelAnalysis.overallWinner === 'athlete1' ? athlete1!.nazionalita : athlete2!.nazionalita}
                      </div>
                      <div className="winner-stats">
                        Vittorie: {duelAnalysis.overallWinner === 'athlete1' ? duelAnalysis.totalWinsAthlete1 : duelAnalysis.totalWinsAthlete2}/{duelAnalysis.totalCommonRaces} ({duelAnalysis.overallWinner === 'athlete1' ? duelAnalysis.dominancePercentage.athlete1.toFixed(1) : duelAnalysis.dominancePercentage.athlete2.toFixed(1)}%)
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="stats-grid">
                <StatCard 
                  title="Gare Comuni" 
                  value={duelAnalysis.totalCommonRaces}
                  subtitle="confronti diretti"
                  color="#3b82f6"
                />
                <StatCard 
                  title="Vittorie" 
                  value={`${duelAnalysis.totalWinsAthlete1} - ${duelAnalysis.totalWinsAthlete2}`}
                  subtitle={`${duelAnalysis.totalTies} pareggi`}
                  color="#10b981"
                />
                <StatCard 
                  title="Percentuale Vittorie" 
                  value={`${duelAnalysis.dominancePercentage.athlete1.toFixed(1)}% - ${duelAnalysis.dominancePercentage.athlete2.toFixed(1)}%`}
                  color="#f59e0b"
                />
              </div>

              <div className="strengths-comparison">
                <div className="strength-card">
                  <h4>💪 Punti di Forza - {formatAthleteName(athlete1!.nome)}</h4>
                  <ul>
                    {duelAnalysis.strengthComparison.athlete1Strengths.map((strength, index) => (
                      <li key={index}>{strength}</li>
                    ))}
                    {duelAnalysis.strengthComparison.athlete1Strengths.length === 0 && (
                      <li className="no-strengths">Nessuna specialità dominante</li>
                    )}
                  </ul>
                </div>
                <div className="strength-card">
                  <h4>💪 Punti di Forza - {formatAthleteName(athlete2!.nome)}</h4>
                  <ul>
                    {duelAnalysis.strengthComparison.athlete2Strengths.map((strength, index) => (
                      <li key={index}>{strength}</li>
                    ))}
                    {duelAnalysis.strengthComparison.athlete2Strengths.length === 0 && (
                      <li className="no-strengths">Nessuna specialità dominante</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Detailed Analysis Tab */}
          {selectedView === 'detailed' && (
            <div className="detailed-section">
              <div className="specialties-analysis">
                {duelAnalysis.specialties.map((specialty) => (
                  <div key={specialty.name} className="specialty-analysis-card">
                    <div className="specialty-header">
                      <h4>{specialty.fullName}</h4>
                      <div className="specialty-info">
                        <span className="race-count">{specialty.commonRaces.length} gare comuni</span>
                        <div className="specialty-winner">
                          {specialty.winner === 'tie' ? (
                            <span className="tie-badge">Pareggio</span>
                          ) : (
                            <span className={`winner-badge ${specialty.winner}`}>
                              Vince {formatAthleteName(
                                specialty.winner === 'athlete1' ? athlete1!.nome : athlete2!.nome
                              )}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {specialty.commonRaces.length > 0 ? (
                      <>
                        <div className="wins-comparison">
                          <div className="athlete-wins">
                            <span className="athlete-name">{formatAthleteName(athlete1!.nome)}</span>
                            <span className="wins">{specialty.athlete1Wins} vittorie</span>
                          </div>
                          <div className="vs-separator">VS</div>
                          <div className="athlete-wins">
                            <span className="athlete-name">{formatAthleteName(athlete2!.nome)}</span>
                            <span className="wins">{specialty.athlete2Wins} vittorie</span>
                          </div>
                        </div>

                        <div className="percentage-bars">
                          <div className="percentage-bar">
                            <div className="bar-label">
                              {formatAthleteName(athlete1!.nome)} - {specialty.athlete1WinPercentage.toFixed(1)}%
                            </div>
                            <ProgressBar percentage={specialty.athlete1WinPercentage} color="#3b82f6" height="12px" />
                          </div>
                          <div className="percentage-bar">
                            <div className="bar-label">
                              {formatAthleteName(athlete2!.nome)} - {specialty.athlete2WinPercentage.toFixed(1)}%
                            </div>
                            <ProgressBar percentage={specialty.athlete2WinPercentage} color="#ef4444" height="12px" />
                          </div>
                        </div>

                        {specialty.ties > 0 && (
                          <div className="ties-info">
                            <span className="ties-count">{specialty.ties} pareggi</span>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="no-common-races">
                        <p>Nessuna gara comune in questa specialità</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Direct Comparison Tab */}
          {selectedView === 'comparison' && (
            <div className="comparison-section">
              <div className="direct-comparison">
                <h3>Confronto Diretto - Gare Comuni</h3>
                <div className="comparison-summary">
                  <div className="summary-stats">
                    <div className="summary-stat">
                      <span className="stat-number">{duelAnalysis.totalCommonRaces}</span>
                      <span className="stat-label">Gare Comuni</span>
                    </div>
                    <div className="summary-stat">
                      <span className="stat-number">{duelAnalysis.totalWinsAthlete1}</span>
                      <span className="stat-label">Vittorie {formatAthleteName(athlete1!.nome)}</span>
                    </div>
                    <div className="summary-stat">
                      <span className="stat-number">{duelAnalysis.totalWinsAthlete2}</span>
                      <span className="stat-label">Vittorie {formatAthleteName(athlete2!.nome)}</span>
                    </div>
                    <div className="summary-stat">
                      <span className="stat-number">{duelAnalysis.totalTies}</span>
                      <span className="stat-label">Pareggi</span>
                    </div>
                  </div>
                </div>
                
                <div className="races-by-specialty">
                  {duelAnalysis.specialties.map(specialty => (
                    specialty.commonRaces.length > 0 && (
                      <div key={specialty.name} className="specialty-races">
                        <h4>{specialty.fullName} ({specialty.commonRaces.length} gare)</h4>
                        <div className="races-list">
                          {specialty.commonRaces.map((race, index) => (
                            <div key={index} className={`race-result ${race.winner}`}>
                              <div className="race-info">
                                <div className="race-header">
                                  <span className="race-date">{race.data}</span>
                                  <span className="race-location">{race.luogo} ({race.nazione})</span>
                                </div>
                              </div>
                              <div className="race-positions">
                                <div className="athlete-position">
                                  <span className="athlete-name">{formatAthleteName(athlete1!.nome)}</span>
                                  <span className={`position ${race.winner === 'athlete1' ? 'winner' : ''}`}>
                                    {race.athlete1Position}
                                  </span>
                                </div>
                                <div className="vs-divider-small">VS</div>
                                <div className="athlete-position">
                                  <span className="athlete-name">{formatAthleteName(athlete2!.nome)}</span>
                                  <span className={`position ${race.winner === 'athlete2' ? 'winner' : ''}`}>
                                    {race.athlete2Position}
                                  </span>
                                </div>
                              </div>
                              <div className="race-winner">
                                {race.winner === 'athlete1' ? (
                                  <span className="winner-indicator athlete1">🏆 {formatAthleteName(athlete1!.nome)}</span>
                                ) : race.winner === 'athlete2' ? (
                                  <span className="winner-indicator athlete2">🏆 {formatAthleteName(athlete2!.nome)}</span>
                                ) : (
                                  <span className="winner-indicator tie">🤝 Pareggio</span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  ))}
                </div>
                
                {duelAnalysis.totalCommonRaces === 0 && (
                  <div className="no-common-races-message">
                    <h4>Nessuna Gara Comune</h4>
                    <p>Questi atleti non hanno mai gareggiato insieme nella stessa competizione.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="action-buttons">
            <button onClick={resetDuel} className="reset-button">
              🔄 Nuovo Duello
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Duel;