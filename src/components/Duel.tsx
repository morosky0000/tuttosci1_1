import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Atleta, Gara, ApiResponse } from '../types';
import { formatTime, formatDate, formatSpecialty, formatFisPoints } from '../utils/formatters';

interface DuelProps {}

interface ConfrontoStats {
  vittorie_atleta1: number;
  vittorie_atleta2: number;
  confronti_diretti: number;
  miglior_tempo_atleta1?: number;
  miglior_tempo_atleta2?: number;
}

interface ConfrontoDiretto {
  gara_id: number;
  nome_gara: string;
  data: string;
  localita: string;
  specialita: string;
  tempo_atleta1?: number;
  tempo_atleta2?: number;
  posizione_atleta1?: number;
  posizione_atleta2?: number;
  vincitore?: string;
}

const Duel: React.FC<DuelProps> = () => {
  const { fisCode1, fisCode2 } = useParams<{ fisCode1?: string; fisCode2?: string }>();
  const [atleta1, setAtleta1] = useState<Atleta | null>(null);
  const [atleta2, setAtleta2] = useState<Atleta | null>(null);
  const [confrontiDiretti, setConfrontiDiretti] = useState<ConfrontoDiretto[]>([]);
  const [stats, setStats] = useState<ConfrontoStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchAtleta1, setSearchAtleta1] = useState('');
  const [searchAtleta2, setSearchAtleta2] = useState('');
  const [suggestionsAtleta1, setSuggestionsAtleta1] = useState<Atleta[]>([]);
  const [suggestionsAtleta2, setSuggestionsAtleta2] = useState<Atleta[]>([]);
  const [showSuggestions1, setShowSuggestions1] = useState(false);
  const [showSuggestions2, setShowSuggestions2] = useState(false);

  useEffect(() => {
    if (fisCode1 && fisCode2) {
      fetchAtletiDetails();
      fetchConfrontoData();
    }
  }, [fisCode1, fisCode2]);

  const fetchAtletiDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [response1, response2] = await Promise.all([
        fetch(`http://localhost:3001/api/atleti/${fisCode1}`),
        fetch(`http://localhost:3001/api/atleti/${fisCode2}`)
      ]);
      
      if (!response1.ok || !response2.ok) {
        throw new Error('Errore nel caricamento degli atleti');
      }
      
      const [data1, data2]: [ApiResponse<Atleta>, ApiResponse<Atleta>] = await Promise.all([
        response1.json(),
        response2.json()
      ]);
      
      if (data1.success && data2.success) {
        setAtleta1(data1.data);
        setAtleta2(data2.data);
      } else {
        throw new Error('Errore nel caricamento dei dati degli atleti');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore sconosciuto');
    } finally {
      setLoading(false);
    }
  };

  const fetchConfrontoData = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/confronto/${fisCode1}/${fisCode2}`);
      
      if (!response.ok) {
        throw new Error('Errore nel caricamento del confronto');
      }
      
      const data = await response.json();
      
      if (data.success) {
        setConfrontiDiretti(data.confronti || []);
        setStats(data.stats || {
          vittorie_atleta1: 0,
          vittorie_atleta2: 0,
          confronti_diretti: 0
        });
      }
    } catch (err) {
      console.error('Errore nel caricamento del confronto:', err);
    }
  };

  const searchAtleti = async (query: string, setterSuggestions: (atleti: Atleta[]) => void) => {
    if (query.length < 2) {
      setterSuggestions([]);
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/api/atleti?search=${encodeURIComponent(query)}&limit=10`);
      
      if (!response.ok) {
        throw new Error('Errore nella ricerca');
      }
      
      const data: ApiResponse<Atleta[]> = await response.json();
      
      if (data.success) {
        setterSuggestions(data.data);
      }
    } catch (err) {
      console.error('Errore nella ricerca atleti:', err);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchAtleti(searchAtleta1, setSuggestionsAtleta1);
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [searchAtleta1]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchAtleti(searchAtleta2, setSuggestionsAtleta2);
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [searchAtleta2]);

  const selectAtleta = (atleta: Atleta, isAtleta1: boolean) => {
    if (isAtleta1) {
      setSearchAtleta1(`${atleta.nome} ${atleta.cognome || ''}`);
      setShowSuggestions1(false);
      // Naviga al confronto
      window.location.href = `/confronto/${atleta.fis_code}/${fisCode2 || 'select'}`;
    } else {
      setSearchAtleta2(`${atleta.nome} ${atleta.cognome || ''}`);
      setShowSuggestions2(false);
      // Naviga al confronto
      window.location.href = `/confronto/${fisCode1 || 'select'}/${atleta.fis_code}`;
    }
  };

  // Se non ci sono entrambi gli atleti selezionati, mostra il selettore
  if (!fisCode1 || !fisCode2 || fisCode1 === 'select' || fisCode2 === 'select') {
    return (
      <div className="duel-selector-page">
        <div className="page-header">
          <h1>Confronto Atleti</h1>
          <p>Seleziona due atleti per confrontare le loro performance</p>
        </div>

        <div className="athlete-selector">
          <div className="selector-grid">
            {/* Selettore Atleta 1 */}
            <div className="athlete-select-card">
              <h3>Primo Atleta</h3>
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Cerca primo atleta..."
                  value={searchAtleta1}
                  onChange={(e) => {
                    setSearchAtleta1(e.target.value);
                    setShowSuggestions1(true);
                  }}
                  onFocus={() => setShowSuggestions1(true)}
                  className="form-input search-input"
                />
                {showSuggestions1 && suggestionsAtleta1.length > 0 && (
                  <div className="suggestions-dropdown">
                    {suggestionsAtleta1.map((atleta) => (
                      <div
                        key={atleta.fis_code}
                        className="suggestion-item"
                        onClick={() => selectAtleta(atleta, true)}
                      >
                        <div className="suggestion-info">
                          <strong>{atleta.nome} {atleta.cognome || ''}</strong>
                          <span className="suggestion-meta">
                            {atleta.nazione} • {atleta.specialita_principale ? formatSpecialty(atleta.specialita_principale) : 'N/A'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {fisCode1 && fisCode1 !== 'select' && atleta1 && (
                <div className="selected-athlete">
                  <div className="athlete-info">
                    <strong>{atleta1.nome} {atleta1.cognome || ''}</strong>
                    <span>{atleta1.nazione}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="vs-divider">
              <span>VS</span>
            </div>

            {/* Selettore Atleta 2 */}
            <div className="athlete-select-card">
              <h3>Secondo Atleta</h3>
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Cerca secondo atleta..."
                  value={searchAtleta2}
                  onChange={(e) => {
                    setSearchAtleta2(e.target.value);
                    setShowSuggestions2(true);
                  }}
                  onFocus={() => setShowSuggestions2(true)}
                  className="form-input search-input"
                />
                {showSuggestions2 && suggestionsAtleta2.length > 0 && (
                  <div className="suggestions-dropdown">
                    {suggestionsAtleta2.map((atleta) => (
                      <div
                        key={atleta.fis_code}
                        className="suggestion-item"
                        onClick={() => selectAtleta(atleta, false)}
                      >
                        <div className="suggestion-info">
                          <strong>{atleta.nome} {atleta.cognome || ''}</strong>
                          <span className="suggestion-meta">
                            {atleta.nazione} • {atleta.specialita_principale ? formatSpecialty(atleta.specialita_principale) : 'N/A'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {fisCode2 && fisCode2 !== 'select' && atleta2 && (
                <div className="selected-athlete">
                  <div className="athlete-info">
                    <strong>{atleta2.nome} {atleta2.cognome || ''}</strong>
                    <span>{atleta2.nazione}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {fisCode1 && fisCode2 && fisCode1 !== 'select' && fisCode2 !== 'select' && (
            <div className="comparison-ready">
              <Link 
                to={`/confronto/${fisCode1}/${fisCode2}`} 
                className="btn btn-primary btn-lg"
              >
                Avvia Confronto
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="loading-state">
        <div className="loading-spinner"></div>
        <p>Caricamento confronto...</p>
      </div>
    );
  }

  if (error || !atleta1 || !atleta2) {
    return (
      <div className="error-state">
        <div className="error-icon">⚠️</div>
        <h3>Errore nel caricamento</h3>
        <p>{error || 'Atleti non trovati'}</p>
        <Link to="/confronto" className="btn btn-primary">
          Seleziona altri atleti
        </Link>
      </div>
    );
  }

  return (
    <div className="duel-page">
      {/* Header confronto */}
      <div className="duel-header">
        <div className="athletes-comparison">
          <div className="athlete-card left">
            <div className="athlete-avatar">
              {atleta1.nome.charAt(0)}{atleta1.cognome ? atleta1.cognome.charAt(0) : ''}
            </div>
            <div className="athlete-info">
              <h2>{atleta1.nome} {atleta1.cognome || ''}</h2>
              <div className="athlete-meta">
                <span className="country">{atleta1.nazione}</span>
                <span className="age">{atleta1.eta} anni</span>
              </div>
              <div className="specialty">{atleta1.specialita_principale ? formatSpecialty(atleta1.specialita_principale) : 'N/A'}</div>
            </div>
          </div>

          <div className="vs-section">
            <div className="vs-circle">
              <span>VS</span>
            </div>
            {stats && (
              <div className="head-to-head">
                <div className="h2h-score">
                  <span className="score-left">{stats.vittorie_atleta1}</span>
                  <span className="score-separator">-</span>
                  <span className="score-right">{stats.vittorie_atleta2}</span>
                </div>
                <div className="h2h-label">Confronti diretti</div>
              </div>
            )}
          </div>

          <div className="athlete-card right">
            <div className="athlete-avatar">
              {atleta2.nome.charAt(0)}{atleta2.cognome ? atleta2.cognome.charAt(0) : ''}
            </div>
            <div className="athlete-info">
              <h2>{atleta2.nome} {atleta2.cognome || ''}</h2>
              <div className="athlete-meta">
                <span className="country">{atleta2.nazione}</span>
                <span className="age">{atleta2.eta} anni</span>
              </div>
              <div className="specialty">{atleta2.specialita_principale ? formatSpecialty(atleta2.specialita_principale) : 'N/A'}</div>
            </div>
          </div>
        </div>

        <div className="duel-actions">
          <Link to="/confronto" className="btn btn-secondary">
            Cambia Atleti
          </Link>
        </div>
      </div>

      {/* Statistiche comparative */}
      <div className="comparison-stats">
        <h3>Statistiche Comparative</h3>
        <div className="stats-comparison">
          <div className="stat-comparison">
            <div className="stat-left">
              <span className="stat-value">{atleta1.vittorie || 0}</span>
            </div>
            <div className="stat-center">
              <span className="stat-label">Vittorie</span>
            </div>
            <div className="stat-right">
              <span className="stat-value">{atleta2.vittorie || 0}</span>
            </div>
          </div>

          <div className="stat-comparison">
            <div className="stat-left">
              <span className="stat-value">{atleta1.podi || 0}</span>
            </div>
            <div className="stat-center">
              <span className="stat-label">Podi</span>
            </div>
            <div className="stat-right">
              <span className="stat-value">{atleta2.podi || 0}</span>
            </div>
          </div>

          <div className="stat-comparison">
            <div className="stat-left">
              <span className="stat-value">{atleta1.numero_gare || 0}</span>
            </div>
            <div className="stat-center">
              <span className="stat-label">Gare</span>
            </div>
            <div className="stat-right">
              <span className="stat-value">{atleta2.numero_gare || 0}</span>
            </div>
          </div>

          <div className="stat-comparison">
            <div className="stat-left">
              <span className="stat-value">
                {atleta1.miglior_tempo ? formatTime(atleta1.miglior_tempo) : '-'}
              </span>
            </div>
            <div className="stat-center">
              <span className="stat-label">Miglior Tempo</span>
            </div>
            <div className="stat-right">
              <span className="stat-value">
                {atleta2.miglior_tempo ? formatTime(atleta2.miglior_tempo) : '-'}
              </span>
            </div>
          </div>

          <div className="stat-comparison">
            <div className="stat-left">
              <span className="stat-value">{formatFisPoints(atleta1.punti_fis)}</span>
            </div>
            <div className="stat-center">
              <span className="stat-label">Punti FIS</span>
            </div>
            <div className="stat-right">
              <span className="stat-value">{formatFisPoints(atleta2.punti_fis)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Confronti diretti */}
      <div className="direct-comparisons">
        <h3>Confronti Diretti</h3>
        {confrontiDiretti.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🏔️</div>
            <h4>Nessun confronto diretto</h4>
            <p>Questi atleti non hanno mai gareggiato nella stessa competizione</p>
          </div>
        ) : (
          <div className="comparisons-list">
            {confrontiDiretti.map((confronto) => (
              <div key={confronto.gara_id} className="comparison-card">
                <div className="comparison-header">
                  <h4>{confronto.nome_gara}</h4>
                  <div className="comparison-meta">
                    <span className="date">{formatDate(confronto.data)}</span>
                    <span className="location">{confronto.localita}</span>
                    <span className="specialty">{formatSpecialty(confronto.specialita)}</span>
                  </div>
                </div>
                
                <div className="comparison-results">
                  <div className="result-left">
                    <div className="athlete-name">{atleta1.nome} {atleta1.cognome || ''}</div>
                    <div className="result-details">
                      {confronto.tempo_atleta1 ? (
                        <>
                          <span className="time">{formatTime(confronto.tempo_atleta1)}</span>
                          <span className="position">#{confronto.posizione_atleta1}</span>
                        </>
                      ) : (
                        <span className="dnf">DNF</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="result-center">
                    {confronto.vincitore === atleta1.fis_code ? (
                      <span className="winner-left">👈 Vincitore</span>
                    ) : confronto.vincitore === atleta2.fis_code ? (
                      <span className="winner-right">Vincitore 👉</span>
                    ) : (
                      <span className="no-winner">-</span>
                    )}
                  </div>
                  
                  <div className="result-right">
                    <div className="athlete-name">{atleta2.nome} {atleta2.cognome || ''}</div>
                    <div className="result-details">
                      {confronto.tempo_atleta2 ? (
                        <>
                          <span className="time">{formatTime(confronto.tempo_atleta2)}</span>
                          <span className="position">#{confronto.posizione_atleta2}</span>
                        </>
                      ) : (
                        <span className="dnf">DNF</span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="comparison-actions">
                  <Link to={`/gare/${confronto.gara_id}`} className="btn btn-sm btn-secondary">
                    Vedi Gara
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Duel;