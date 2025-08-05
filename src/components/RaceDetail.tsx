import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Gara, Atleta, ApiResponse } from '../types';
import { formatDate, formatTime, formatSpecialty, formatFisPoints } from '../utils/formatters';

interface RaceDetailProps {}

interface RisultatoGara {
  fis_code: string;
  nome: string;
  cognome?: string;
  nazione: string;
  tempo: number;
  posizione: number;
  punti_fis?: number;
  distacco?: number;
  // Campi aggiuntivi per supportare il formato RaceResult
  Rank?: string;
  Bib?: string;
  'FIS code'?: string;
  Athlete?: string;
  Year?: string;
  Nation?: string;
  'Run 1'?: string;
  'Run 2'?: string;
  'Total Time'?: string;
  'Diff. Time'?: string;
  'FIS Points'?: string;
  'Cup Points'?: string;
  punti_coppa?: string;
  Time?: string;
}

const RaceDetail: React.FC<RaceDetailProps> = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [gara, setGara] = useState<Gara | null>(null);
  const [risultati, setRisultati] = useState<RisultatoGara[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'results' | 'stats'>('results');

  useEffect(() => {
    if (id) {
      fetchGaraData();
    }
  }, [id]);

  const fetchGaraData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`http://localhost:3001/api/gare/${id}`);
      
      if (!response.ok) {
        throw new Error(`Errore HTTP: ${response.status}`);
      }
      
      const garaData = await response.json();
      
      if (garaData) {
        // Imposta i dati della gara
         setGara({
           id: garaData.id,
           nome: garaData.specialty,
           specialita: garaData.specialty,
           data: garaData.data_gara,
           localita: garaData.luogo
         });
        
        // Imposta i risultati se disponibili
        if (garaData.risultati && Array.isArray(garaData.risultati)) {
          // Calcola i distacchi dal primo classificato
          const risultatiConDistacchi = garaData.risultati.map((risultato: any, index: number) => {
            const distacco = index === 0 ? 0 : (risultato.tempo ? risultato.tempo - garaData.risultati[0].tempo : 0);
            return { ...risultato, distacco };
          });
          setRisultati(risultatiConDistacchi);
        }
      } else {
        throw new Error('Dati gara non trovati');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore sconosciuto');
    } finally {
      setLoading(false);
    }
  };

  const getPodiumPosition = (posizione: number): string => {
    switch (posizione) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return '';
    }
  };

  const getPositionClass = (posizione: number): string => {
    if (posizione === 1) return 'position-gold';
    if (posizione === 2) return 'position-silver';
    if (posizione === 3) return 'position-bronze';
    return '';
  };

  const handleAthleteClick = (fisCode: string) => {
    navigate(`/atleti/${fisCode}`);
  };

  if (loading) {
    return (
      <div className="loading-state">
        <div className="loading-spinner"></div>
        <p>Caricamento dettagli gara...</p>
      </div>
    );
  }

  if (error || !gara) {
    return (
      <div className="error-state">
        <div className="error-icon">⚠️</div>
        <h3>Errore nel caricamento</h3>
        <p>{error || 'Gara non trovata'}</p>
        <Link to="/gare" className="btn btn-primary">
          Torna alle gare
        </Link>
      </div>
    );
  }

  // Determina se i dati hanno Run 1, Run 2 e Total Time
  const hasRunData = risultati.length > 0 && risultati.some(r => r['Run 1'] || r['Run 2'] || r['Total Time']);
  
  // Determina se nascondere le colonne punti per le categorie training
  const isTraining = gara?.nome?.toLowerCase().includes('training') || gara?.specialita?.toLowerCase().includes('training');
  const showPoints = !isTraining;

  const statistiche = {
    partecipanti: risultati.length,
    tempoMigliore: risultati.length > 0 ? risultati[0].tempo : null,
    tempoPeggiore: risultati.length > 0 ? risultati[risultati.length - 1].tempo : null,
    tempoMedio: risultati.length > 0 
      ? risultati.reduce((sum, r) => sum + r.tempo, 0) / risultati.length 
      : null,
    nazioniPartecipanti: new Set(risultati.map(r => r.nazione)).size
  };

  return (
    <div className="race-detail-page">
      {/* Header gara */}
      <div className="race-header">
        <div className="race-info">
          <div className="race-title">
            <h1>{gara.nome}</h1>
            <span className="specialty-badge">
              {formatSpecialty(gara.specialita)}
            </span>
          </div>
          <div className="race-meta">
            <div className="meta-item">
              <span className="icon">📅</span>
              <span className="label">Data:</span>
              <span className="value">{formatDate(gara.data)}</span>
            </div>
            <div className="meta-item">
              <span className="icon">📍</span>
              <span className="label">Località:</span>
              <span className="value">{gara.localita}</span>
            </div>
            <div className="meta-item">
              <span className="icon">🎿</span>
              <span className="label">Specialità:</span>
              <span className="value">{gara.specialita}</span>
            </div>
            <div className="meta-item">
              <span className="icon">👥</span>
              <span className="label">Partecipanti:</span>
              <span className="value">{statistiche.partecipanti}</span>
            </div>
          </div>
        </div>
        <div className="race-actions">
          <Link to="/gare" className="btn btn-secondary">
            ← Torna alle gare
          </Link>
        </div>
      </div>

      {/* Podio */}
      {risultati.length >= 3 && (
        <div className="podium-section">
          <h2>Podio</h2>
          <div className="podium">
            {/* Secondo posto */}
            <div className="podium-position second">
              <div className="podium-athlete">
                <div className="position-medal">🥈</div>
                <div className="athlete-info">
                  <strong>{risultati[1].nome} {risultati[1].cognome || ''}</strong>
                  <span className="country">{risultati[1].nazione}</span>
                  <span className="time">{formatTime(risultati[1].tempo)}</span>
                  <span className="gap">+{formatTime(risultati[1].distacco || 0)}</span>
                </div>
              </div>
              <div className="podium-step">2</div>
            </div>

            {/* Primo posto */}
            <div className="podium-position first">
              <div className="podium-athlete">
                <div className="position-medal">🥇</div>
                <div className="athlete-info">
                  <strong>{risultati[0].nome} {risultati[0].cognome || ''}</strong>
                  <span className="country">{risultati[0].nazione}</span>
                  <span className="time">{formatTime(risultati[0].tempo)}</span>
                  <span className="gap">Vincitore</span>
                </div>
              </div>
              <div className="podium-step">1</div>
            </div>

            {/* Terzo posto */}
            <div className="podium-position third">
              <div className="podium-athlete">
                <div className="position-medal">🥉</div>
                <div className="athlete-info">
                  <strong>{risultati[2].nome} {risultati[2].cognome || ''}</strong>
                  <span className="country">{risultati[2].nazione}</span>
                  <span className="time">{formatTime(risultati[2].tempo)}</span>
                  <span className="gap">+{formatTime(risultati[2].distacco || 0)}</span>
                </div>
              </div>
              <div className="podium-step">3</div>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="race-tabs">
        <button 
          className={`tab-btn ${activeTab === 'results' ? 'active' : ''}`}
          onClick={() => setActiveTab('results')}
        >
          Risultati ({risultati.length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'stats' ? 'active' : ''}`}
          onClick={() => setActiveTab('stats')}
        >
          Statistiche
        </button>
      </div>

      {/* Contenuto tabs */}
      <div className="tab-content">
        {activeTab === 'results' && (
          <div className="results-tab">
            {risultati.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">🏔️</div>
                <h3>Nessun risultato disponibile</h3>
                <p>Non ci sono risultati per questa gara</p>
              </div>
            ) : (
              <div className="results-table-container">
                <table className="results-table">
                  <thead>
                    <tr>
                      <th>Pos.</th>
                      <th>Atleta</th>
                      <th>Nazione</th>
                      {hasRunData ? (
                        <>
                          <th>Run 1</th>
                          <th>Run 2</th>
                          <th>Tempo Totale</th>
                        </>
                      ) : (
                        <th>Tempo</th>
                      )}
                      <th>Distacco</th>
                      {showPoints && <th>Punti FIS</th>}
                      {showPoints && <th>Punti Cup</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {risultati.map((risultato) => (
                      <tr 
                        key={risultato['FIS code'] || risultato.fis_code} 
                        className={`result-row ${getPositionClass(parseInt(String(risultato.Rank || risultato.posizione)))} clickable-row`}
                        onClick={() => handleAthleteClick(risultato['FIS code'] || risultato.fis_code)}
                        style={{ cursor: 'pointer' }}
                      >
                        <td className="position">
                          <span className="position-number">
                            {getPodiumPosition(parseInt(String(risultato.Rank || risultato.posizione)))}
                            {risultato.Rank || risultato.posizione}
                          </span>
                        </td>
                        <td className="athlete-info">
                          <div className="athlete-details">
                            <strong>{risultato.Athlete || `${risultato.nome} ${risultato.cognome || ''}`}</strong>
                            <small>FIS: {risultato['FIS code'] || risultato.fis_code}</small>
                          </div>
                        </td>
                        <td>
                          <span className="country-flag">{risultato.Nation || risultato.nazione}</span>
                        </td>
                        {hasRunData ? (
                          <>
                            <td className="run-time">
                              {risultato['Run 1'] || '-'}
                            </td>
                            <td className="run-time">
                              {risultato['Run 2'] || '-'}
                            </td>
                            <td className="time">
                              <strong>{risultato['Total Time'] || risultato.Time || formatTime(risultato.tempo) || '-'}</strong>
                            </td>
                          </>
                        ) : (
                          <td className="time">
                            <strong>{risultato.Time || formatTime(risultato.tempo) || '-'}</strong>
                          </td>
                        )}
                        <td className="gap">
                          {risultato['Diff. Time'] || 
                            (parseInt(String(risultato.Rank || risultato.posizione)) === 1 
                              ? '-' 
                              : `+${formatTime(risultato.distacco || 0)}`
                            )
                          }
                        </td>
                        {showPoints && (
                          <td className="points">
                            {risultato['FIS Points'] || formatFisPoints(risultato.punti_fis) || '-'}
                          </td>
                        )}
                        {showPoints && (
                          <td className="points">
                            {risultato['Cup Points'] || risultato.punti_coppa || '-'}
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="stats-tab">
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">👥</div>
                <div className="stat-info">
                  <div className="stat-value">{statistiche.partecipanti}</div>
                  <div className="stat-label">Partecipanti</div>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">🏆</div>
                <div className="stat-info">
                  <div className="stat-value">
                    {statistiche.tempoMigliore ? formatTime(statistiche.tempoMigliore) : '-'}
                  </div>
                  <div className="stat-label">Tempo Migliore</div>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">📊</div>
                <div className="stat-info">
                  <div className="stat-value">
                    {statistiche.tempoMedio ? formatTime(statistiche.tempoMedio) : '-'}
                  </div>
                  <div className="stat-label">Tempo Medio</div>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">🌍</div>
                <div className="stat-info">
                  <div className="stat-value">{statistiche.nazioniPartecipanti}</div>
                  <div className="stat-label">Nazioni</div>
                </div>
              </div>
            </div>

            <div className="detailed-stats">
              <h3>Analisi Dettagliata</h3>
              <div className="stats-details">
                <div className="stat-row">
                  <span className="stat-name">Tempo più veloce:</span>
                  <span className="stat-value">
                    {statistiche.tempoMigliore ? formatTime(statistiche.tempoMigliore) : '-'}
                  </span>
                </div>
                <div className="stat-row">
                  <span className="stat-name">Tempo più lento:</span>
                  <span className="stat-value">
                    {statistiche.tempoPeggiore ? formatTime(statistiche.tempoPeggiore) : '-'}
                  </span>
                </div>
                <div className="stat-row">
                  <span className="stat-name">Differenza max:</span>
                  <span className="stat-value">
                    {statistiche.tempoMigliore && statistiche.tempoPeggiore 
                      ? formatTime(statistiche.tempoPeggiore - statistiche.tempoMigliore)
                      : '-'
                    }
                  </span>
                </div>
                <div className="stat-row">
                  <span className="stat-name">Tempo medio:</span>
                  <span className="stat-value">
                    {statistiche.tempoMedio ? formatTime(statistiche.tempoMedio) : '-'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RaceDetail;