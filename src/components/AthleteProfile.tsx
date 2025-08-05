import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Atleta, Gara, ApiResponse } from '../types';
import { formatTime, formatDate, formatFisPoints, formatSpecialty } from '../utils/formatters';

interface AthleteProfileProps {}

const AthleteProfile: React.FC<AthleteProfileProps> = () => {
  const { fisCode } = useParams<{ fisCode?: string }>();
  const [atleta, setAtleta] = useState<Atleta | null>(null);
  const [gare, setGare] = useState<Gara[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'races' | 'stats'>('overview');

  useEffect(() => {
    if (fisCode) {
      fetchAtletaDetails();
      fetchAtletaGare();
    } else {
      // Se non c'è fisCode, mostra la lista degli atleti
      fetchAtletiList();
    }
  }, [fisCode]);

  const fetchAtletaDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`http://localhost:3001/api/atleti/${fisCode}`);
      
      if (!response.ok) {
        throw new Error(`Errore HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.fis_code) {
        setAtleta(data);
      } else {
        throw new Error('Atleta non trovato');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore sconosciuto');
    } finally {
      setLoading(false);
    }
  };

  const fetchAtletaGare = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/atleti/${fisCode}/gare`);
      
      if (!response.ok) {
        throw new Error(`Errore HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (Array.isArray(data)) {
        setGare(data);
      }
    } catch (err) {
      console.error('Errore nel caricamento delle gare:', err);
    }
  };

  const [atleti, setAtleti] = useState<Atleta[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 20;

  const fetchAtletiList = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
        ...(searchTerm && { search: searchTerm })
      });

      const response = await fetch(`http://localhost:3001/api/atleti?${params}`);
      
      if (!response.ok) {
        throw new Error(`Errore HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.atleti) {
        setAtleti(data.atleti);
        setTotalPages(data.pagination?.totalPages || 1);
      } else {
        throw new Error('Formato dati non valido');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore sconosciuto');
      setAtleti([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!fisCode) {
      const timeoutId = setTimeout(() => {
        fetchAtletiList();
      }, 300);
      return () => clearTimeout(timeoutId);
    }
  }, [searchTerm, currentPage]);

  // Se non c'è fisCode, mostra la lista degli atleti
  if (!fisCode) {
    return (
      <div className="athletes-list-page">
        <div className="page-header">
          <h1>Atleti</h1>
          <p>Esplora i profili degli atleti di sci alpino</p>
        </div>

        {/* Barra di ricerca */}
        <div className="search-section">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Cerca atleti per nome, cognome o codice FIS..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="form-input search-input"
            />
            <button className="search-btn" onClick={fetchAtletiList}>
              🔍
            </button>
          </div>
        </div>

        {/* Lista atleti */}
        {loading ? (
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Caricamento atleti...</p>
          </div>
        ) : error ? (
          <div className="error-state">
            <div className="error-icon">⚠️</div>
            <h3>Errore nel caricamento</h3>
            <p>{error}</p>
            <button onClick={fetchAtletiList} className="btn btn-primary">
              Riprova
            </button>
          </div>
        ) : atleti.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🏔️</div>
            <h3>Nessun atleta trovato</h3>
            <p>Prova a modificare i termini di ricerca</p>
          </div>
        ) : (
          <>
            <div className="athletes-grid">
              {atleti.map((atleta) => (
                <div key={atleta.fis_code} className="athlete-card">
                  <div className="athlete-card-header">
                    <h3>{atleta.nome}</h3>
                    <span className="country-badge">{atleta.nazionalita}</span>
                  </div>
                  <div className="athlete-card-body">
                    <div className="athlete-info">
                      <div className="info-item">
                        <span className="label">FIS Code:</span>
                        <span className="value">{atleta.fis_code}</span>
                      </div>
                      <div className="info-item">
                        <span className="label">Età:</span>
                        <span className="value">{atleta.eta} anni</span>
                      </div>
                      <div className="info-item">
                        <span className="label">Club:</span>
                        <span className="value">{atleta.club || 'N/A'}</span>
                      </div>
                      <div className="info-item">
                        <span className="label">Sesso:</span>
                        <span className="value">{atleta.sesso || 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                  <div className="athlete-card-footer">
                    <Link 
                      to={`/atleti/${atleta.fis_code}`} 
                      className="btn btn-primary btn-sm"
                    >
                      Vedi Profilo
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Paginazione */}
            {totalPages > 1 && (
              <div className="pagination">
                <button
                  className="pagination-btn"
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                >
                  ««
                </button>
                <button
                  className="pagination-btn"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  ‹
                </button>
                <span className="pagination-info">
                  Pagina {currentPage} di {totalPages}
                </span>
                <button
                  className="pagination-btn"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  ›
                </button>
                <button
                  className="pagination-btn"
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                >
                  »»
                </button>
              </div>
            )}
          </>
        )}
      </div>
    );
  }

  // Profilo singolo atleta
  if (loading) {
    return (
      <div className="loading-state">
        <div className="loading-spinner"></div>
        <p>Caricamento profilo atleta...</p>
      </div>
    );
  }

  if (error || !atleta) {
    return (
      <div className="error-state">
        <div className="error-icon">⚠️</div>
        <h3>Errore nel caricamento</h3>
        <p>{error || 'Atleta non trovato'}</p>
        <Link to="/atleti" className="btn btn-primary">
          Torna alla lista atleti
        </Link>
      </div>
    );
  }

  return (
    <div className="athlete-profile-page">
      {/* Header profilo */}
      <div className="profile-header">
        <div className="profile-info">
          <div className="athlete-avatar">
            {atleta.nome.charAt(0)}{atleta.nome.split(' ')[1]?.charAt(0) || ''}
          </div>
          <div className="athlete-details">
            <h1>{atleta.nome}</h1>
            <div className="athlete-meta">
              <span className="country-badge">{atleta.nazionalita}</span>
              <span className="age">{atleta.eta} anni</span>
              <span className="fis-code">FIS: {atleta.fis_code}</span>
            </div>
            <div className="specialty">
              <strong>Club:</strong> {atleta.club || 'N/A'}
            </div>
          </div>
        </div>
        <div className="profile-actions">
          <Link to="/atleti" className="btn btn-secondary">
            ← Torna alla lista
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="profile-tabs">
        <button 
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Panoramica
        </button>
        <button 
          className={`tab-btn ${activeTab === 'races' ? 'active' : ''}`}
          onClick={() => setActiveTab('races')}
        >
          Gare ({gare.length})
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
        {activeTab === 'overview' && (
          <div className="overview-tab">
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">🏆</div>
                <div className="stat-info">
                  <div className="stat-value">{atleta.vittorie || 0}</div>
                  <div className="stat-label">Vittorie</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🥇</div>
                <div className="stat-info">
                  <div className="stat-value">{atleta.podi || 0}</div>
                  <div className="stat-label">Podi</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🎿</div>
                <div className="stat-info">
                  <div className="stat-value">{atleta.numero_gare || 0}</div>
                  <div className="stat-label">Gare</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">⏱️</div>
                <div className="stat-info">
                  <div className="stat-value">
                    {atleta.miglior_tempo ? formatTime(atleta.miglior_tempo) : '-'}
                  </div>
                  <div className="stat-label">Miglior Tempo</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">📊</div>
                <div className="stat-info">
                  <div className="stat-value">
                    {formatFisPoints(atleta.punti_fis)}
                  </div>
                  <div className="stat-label">Punti FIS</div>
                </div>
              </div>
            </div>

            <div className="athlete-details-section">
              <h3>Informazioni Personali</h3>
              <div className="details-grid">
                <div className="detail-item">
                  <span className="label">Data di nascita:</span>
                  <span className="value">{formatDate(atleta.data_nascita)}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Sesso:</span>
                  <span className="value">{atleta.sesso === 'M' ? 'Maschile' : 'Femminile'}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Nazione:</span>
                  <span className="value">{atleta.nazione}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Codice FIS:</span>
                  <span className="value">{atleta.fis_code}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'races' && (
          <div className="races-tab">
            {gare.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">🏔️</div>
                <h3>Nessuna gara trovata</h3>
                <p>Non ci sono gare registrate per questo atleta</p>
              </div>
            ) : (
              <div className="races-list">
                {gare.map((gara) => (
                  <div key={gara.id} className="race-card">
                    <div className="race-header">
                      <h4>{gara.nome}</h4>
                      <span className="race-date">{formatDate(gara.data)}</span>
                    </div>
                    <div className="race-details">
                      <div className="race-info">
                        <span className="specialty">{formatSpecialty(gara.specialita)}</span>
                        <span className="location">{gara.localita}</span>
                      </div>
                      {gara.tempo && (
                        <div className="race-time">
                          <strong>{formatTime(gara.tempo)}</strong>
                        </div>
                      )}
                    </div>
                    <div className="race-actions">
                      <Link to={`/gare/${gara.id}`} className="btn btn-sm btn-primary">
                        Dettagli Gara
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="stats-tab">
            <div className="stats-section">
              <h3>Statistiche Avanzate</h3>
              <div className="advanced-stats">
                <div className="stat-row">
                  <span className="stat-name">Percentuale vittorie:</span>
                  <span className="stat-value">
                    {atleta.numero_gare && atleta.numero_gare > 0 
                      ? `${((atleta.vittorie || 0) / atleta.numero_gare * 100).toFixed(1)}%`
                      : '0%'
                    }
                  </span>
                </div>
                <div className="stat-row">
                  <span className="stat-name">Percentuale podi:</span>
                  <span className="stat-value">
                    {atleta.numero_gare && atleta.numero_gare > 0 
                      ? `${((atleta.podi || 0) / atleta.numero_gare * 100).toFixed(1)}%`
                      : '0%'
                    }
                  </span>
                </div>
                <div className="stat-row">
                  <span className="stat-name">Media punti FIS:</span>
                  <span className="stat-value">{formatFisPoints(atleta.punti_fis)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AthleteProfile;