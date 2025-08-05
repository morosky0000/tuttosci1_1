import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Gara, ApiResponse } from '../types';
import { formatDate, formatSpecialty } from '../utils/formatters';

interface RaceListProps {}

const RaceList: React.FC<RaceListProps> = () => {
  const [gare, setGare] = useState<Gara[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filtri, setFiltri] = useState({
    specialita: '',
    localita: '',
    anno: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 20;

  const specialitaOptions = [
    { value: '', label: 'Tutte le specialità' },
    { value: 'SL', label: 'Slalom' },
    { value: 'GS', label: 'Slalom Gigante' },
    { value: 'SG', label: 'Super Gigante' },
    { value: 'DH', label: 'Discesa Libera' },
    { value: 'AC', label: 'Alpine Combined' }
  ];

  const currentYear = new Date().getFullYear();
  const yearOptions = [
    { value: '', label: 'Tutti gli anni' },
    ...Array.from({ length: 10 }, (_, i) => {
      const year = currentYear - i;
      return { value: year.toString(), label: year.toString() };
    })
  ];

  useEffect(() => {
    fetchGare();
  }, [filtri, currentPage]);

  const fetchGare = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
        ...(filtri.specialita && { specialita: filtri.specialita }),
        ...(filtri.localita && { localita: filtri.localita }),
        ...(filtri.anno && { anno: filtri.anno })
      });

      const response = await fetch(`http://localhost:3001/api/gare?${params}`);
      
      if (!response.ok) {
        throw new Error(`Errore HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (Array.isArray(data)) {
        setGare(data);
        // Per ora impostiamo le pagine totali a 1 se ci sono dati, 0 se non ci sono
        // In futuro l'API dovrebbe restituire il conteggio totale
        setTotalPages(data.length > 0 ? Math.max(1, Math.ceil(data.length / itemsPerPage)) : 0);
      } else {
        throw new Error('Formato dati non valido');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore sconosciuto');
      setGare([]);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  };

  const handleFiltroChange = (campo: string, valore: string) => {
    setFiltri(prev => ({ ...prev, [campo]: valore }));
    setCurrentPage(1);
  };

  const resetFiltri = () => {
    setFiltri({
      specialita: '',
      localita: '',
      anno: ''
    });
    setCurrentPage(1);
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`pagination-btn ${i === currentPage ? 'active' : ''}`}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </button>
      );
    }

    return (
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
        {pages}
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
    );
  };

  return (
    <div className="races-page">
      <div className="page-header">
        <h1>Gare di Sci Alpino</h1>
        <p>Esplora tutte le gare e i risultati</p>
      </div>

      {/* Filtri */}
      <div className="filters-section">
        <div className="filters-grid">
          <div className="filter-group">
            <label htmlFor="specialita">Specialità</label>
            <select
              id="specialita"
              value={filtri.specialita}
              onChange={(e) => handleFiltroChange('specialita', e.target.value)}
              className="form-select"
            >
              {specialitaOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="localita">Località</label>
            <input
              id="localita"
              type="text"
              value={filtri.localita}
              onChange={(e) => handleFiltroChange('localita', e.target.value)}
              className="form-input"
              placeholder="Cerca per località..."
            />
          </div>

          <div className="filter-group">
            <label htmlFor="anno">Anno</label>
            <select
              id="anno"
              value={filtri.anno}
              onChange={(e) => handleFiltroChange('anno', e.target.value)}
              className="form-select"
            >
              {yearOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-actions">
            <button onClick={resetFiltri} className="btn btn-secondary">
              Reset Filtri
            </button>
          </div>
        </div>
      </div>

      {/* Contenuto principale */}
      {loading ? (
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Caricamento gare...</p>
        </div>
      ) : error ? (
        <div className="error-state">
          <div className="error-icon">⚠️</div>
          <h3>Errore nel caricamento</h3>
          <p>{error}</p>
          <button onClick={fetchGare} className="btn btn-primary">
            Riprova
          </button>
        </div>
      ) : gare.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🏔️</div>
          <h3>Nessuna gara trovata</h3>
          <p>Prova a modificare i filtri di ricerca</p>
          <button onClick={resetFiltri} className="btn btn-primary">
            Reset Filtri
          </button>
        </div>
      ) : (
        <>
          {/* Griglia gare */}
          <div className="races-grid">
            {gare.map((gara) => (
              <div key={gara.id} className="race-card">
                <div className="race-card-header">
                  <h3>{gara.nome}</h3>
                  <span className="specialty-badge">
                    {formatSpecialty(gara.specialita)}
                  </span>
                </div>
                
                <div className="race-card-body">
                  <div className="race-info">
                    <div className="info-item">
                      <span className="icon">📅</span>
                      <span className="label">Data:</span>
                      <span className="value">{formatDate(gara.data)}</span>
                    </div>
                    
                    <div className="info-item">
                      <span className="icon">📍</span>
                      <span className="label">Località:</span>
                      <span className="value">{gara.localita}</span>
                    </div>
                    
                    <div className="info-item">
                      <span className="icon">🎿</span>
                      <span className="label">Specialità:</span>
                      <span className="value">{gara.specialita}</span>
                    </div>
                  </div>
                </div>
                
                <div className="race-card-footer">
                  <Link 
                    to={`/gare/${gara.id}`} 
                    className="btn btn-primary btn-sm"
                  >
                    Vedi Dettagli
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Paginazione */}
          {renderPagination()}
        </>
      )}
    </div>
  );
};

export default RaceList;