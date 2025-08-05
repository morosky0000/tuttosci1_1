import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Atleta, ApiResponse, Filtri } from '../types';
import { formatTime } from '../utils/formatters';
import { fetchWithRetry, buildApiUrl } from '../config/api';

interface RankingProps {}

const Ranking: React.FC<RankingProps> = () => {
  const { specialita } = useParams<{ specialita?: string }>();
  const [atleti, setAtleti] = useState<Atleta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filtri, setFiltri] = useState<Filtri>({
    specialita: specialita || '',
    nazione: '',
    sesso: 'M', // Default maschi (maiuscolo per database)
    eta_min: undefined,
    eta_max: undefined
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAge, setSelectedAge] = useState<number | undefined>(undefined);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('combined'); // Default somma punti
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

  const nazioniOptions = [
    { value: '', label: 'Tutte le nazioni' },
    { value: 'ITA', label: 'Italia' },
    { value: 'AUT', label: 'Austria' },
    { value: 'SUI', label: 'Svizzera' },
    { value: 'FRA', label: 'Francia' },
    { value: 'GER', label: 'Germania' },
    { value: 'USA', label: 'Stati Uniti' },
    { value: 'CAN', label: 'Canada' },
    { value: 'NOR', label: 'Norvegia' },
    { value: 'SWE', label: 'Svezia' }
  ];

  useEffect(() => {
    fetchAtleti();
  }, [filtri, currentPage, searchTerm]);

  useEffect(() => {
    if (specialita && specialita !== filtri.specialita) {
      setFiltri(prev => ({ ...prev, specialita }));
    }
  }, [specialita]);

  const fetchAtleti = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
        ...(filtri.specialita && { specialita: filtri.specialita }),
        ...(filtri.nazione && { nazione: filtri.nazione }),
        ...(filtri.sesso && { sesso: filtri.sesso }),
        ...(filtri.eta_min && { eta_min: filtri.eta_min.toString() }),
        ...(filtri.eta_max && { eta_max: filtri.eta_max.toString() }),
        ...(searchTerm.trim() && { search: searchTerm.trim() })
      });

      const url = buildApiUrl('/atleti/ranking', Object.fromEntries(params));
      const response = await fetchWithRetry(url);
      
      if (!response.ok) {
        throw new Error(`Errore HTTP: ${response.status}`);
      }
      
      const data: ApiResponse<Atleta[]> = await response.json();
      
      if (data.success) {
        setAtleti(data.data);
        setTotalPages(Math.ceil((data.total || 0) / itemsPerPage));
      } else {
        throw new Error(data.message || 'Errore nel caricamento dei dati');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore sconosciuto');
      setAtleti([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFiltroChange = (campo: keyof Filtri, valore: string | number | undefined) => {
    setFiltri(prev => ({ ...prev, [campo]: valore }));
    setCurrentPage(1); // Reset alla prima pagina quando cambiano i filtri
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset alla prima pagina quando si cerca
    // La ricerca verrà eseguita automaticamente tramite useEffect
  };

  const calculateCombinedPoints = (atleta: Atleta) => {
    const sl = atleta.punti_sl || 999;
    const gs = atleta.punti_gs || 999;
    const sg = atleta.punti_sg || 999;
    const dh = atleta.punti_dh || 999;
    return sl + gs + sg + dh;
  };

  const handleSpecialtyFilter = (specialty: string) => {
    setSelectedSpecialty(specialty);
    if (specialty === 'combined') {
      // Ordina per somma punti SL+GS+SG+DH
      const sorted = [...atleti].sort((a, b) => calculateCombinedPoints(a) - calculateCombinedPoints(b));
      setAtleti(sorted);
    } else {
      // Filtra per specialità specifica
      handleFiltroChange('specialita', specialty);
    }
  };

  const resetFiltri = () => {
    setFiltri({
      specialita: '',
      nazione: '',
      sesso: '',
      eta_min: undefined,
      eta_max: undefined
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
    <div className="ranking-page">
      <div className="page-header">
        <h1>Classifica Atleti</h1>
        <p>Ranking degli atleti di sci alpino basato sui punti FIS (meno punti = posizione migliore)</p>
      </div>

      {/* Filtri */}
      <div className="filters-section">
        {/* Prima riga: Maschio/Femmina */}
         <div className="gender-filters">
           <button 
             className={`gender-box ${filtri.sesso === 'M' ? 'active' : ''}`}
             onClick={() => handleFiltroChange('sesso', 'M')}
           >
             Maschio
           </button>
           <button 
             className={`gender-box ${filtri.sesso === 'F' ? 'active' : ''}`}
             onClick={() => handleFiltroChange('sesso', 'F')}
           >
             Femmina
           </button>
         </div>

        {/* Seconda riga: Nazione e Età */}
        <div className="secondary-filters">
          <select
            value={filtri.nazione}
            onChange={(e) => handleFiltroChange('nazione', e.target.value)}
            className="nation-select"
          >
            <option value="">Nazione</option>
            {nazioniOptions.slice(1).map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <select
            value={selectedAge || ''}
            onChange={(e) => {
              const age = e.target.value ? parseInt(e.target.value) : undefined;
              setSelectedAge(age);
              handleFiltroChange('eta_min', age);
              handleFiltroChange('eta_max', age);
            }}
            className="age-select"
          >
            <option value="">Età</option>
            {Array.from({length: 36}, (_, i) => i + 15).map(age => (
              <option key={age} value={age}>{age}</option>
            ))}
          </select>
        </div>

        {/* Terza riga: Ricerca */}
        <div className="search-filter">
          <input
            type="text"
            placeholder="Cerca atleta..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="search-input"
          />
        </div>

        {/* Quarta riga: Specialità */}
        <div className="specialty-filters">
          <button 
            className={`specialty-box ${selectedSpecialty === 'combined' ? 'active' : ''}`}
            onClick={() => handleSpecialtyFilter('combined')}
          >
            Combinata
          </button>
          <button 
            className={`specialty-box ${selectedSpecialty === 'SL' ? 'active' : ''}`}
            onClick={() => handleSpecialtyFilter('SL')}
          >
            SL
          </button>
          <button 
            className={`specialty-box ${selectedSpecialty === 'GS' ? 'active' : ''}`}
            onClick={() => handleSpecialtyFilter('GS')}
          >
            GS
          </button>
          <button 
            className={`specialty-box ${selectedSpecialty === 'SG' ? 'active' : ''}`}
            onClick={() => handleSpecialtyFilter('SG')}
          >
            SG
          </button>
          <button 
            className={`specialty-box ${selectedSpecialty === 'DH' ? 'active' : ''}`}
            onClick={() => handleSpecialtyFilter('DH')}
          >
            DH
          </button>
        </div>
      </div>

      {/* Contenuto principale */}
      {loading ? (
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Caricamento classifica...</p>
        </div>
      ) : error ? (
        <div className="error-state">
          <div className="error-icon">⚠️</div>
          <h3>Errore nel caricamento</h3>
          <p>{error}</p>
          <button onClick={fetchAtleti} className="btn btn-primary">
            Riprova
          </button>
        </div>
      ) : atleti.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🏔️</div>
          <h3>Nessun atleta trovato</h3>
          <p>Prova a modificare i filtri di ricerca</p>
          <button onClick={resetFiltri} className="btn btn-primary">
            Reset Filtri
          </button>
        </div>
      ) : (
        <>
          {/* Tabella ranking - Desktop */}
          <div className="table-container desktop-table">
            <table className="ranking-table">
              <thead>
                <tr>
                  <th>Pos.</th>
                  <th>Atleta</th>
                  <th>Nazione</th>
                  <th>Età</th>
                  <th>SL</th>
                  <th>GS</th>
                  <th>SG</th>
                  <th>DH</th>
                  <th>AC</th>
                </tr>
              </thead>
              <tbody>
                {atleti.map((atleta, index) => (
                  <tr 
                    key={atleta.fis_code} 
                    className="ranking-row"
                    data-athlete-index={index}
                    onClick={() => window.location.href = `/atleti/${atleta.fis_code}`}
                    style={{ 
                      cursor: 'pointer',
                      transition: 'background-color 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#f5f5f5';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <td className="position">
                      <span className="position-number">
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </span>
                    </td>
                    <td className="athlete-info">
                      <div className="athlete-details">
                        <strong>{atleta.nome} {atleta.cognome || ''}</strong>
                        <small>FIS: {atleta.fis_code}</small>
                      </div>
                    </td>
                    <td className="country-flag">
                      <span>{atleta.nazione}</span>
                    </td>
                    <td>{atleta.eta}</td>
                    <td className="points">
                      {atleta.punti_sl ? atleta.punti_sl.toFixed(2) : '-'}
                    </td>
                    <td className="points">
                      {atleta.punti_gs ? atleta.punti_gs.toFixed(2) : '-'}
                    </td>
                    <td className="points">
                      {atleta.punti_sg ? atleta.punti_sg.toFixed(2) : '-'}
                    </td>
                    <td className="points">
                      {atleta.punti_dh ? atleta.punti_dh.toFixed(2) : '-'}
                    </td>
                    <td className="points">
                      {atleta.punti_ac ? atleta.punti_ac.toFixed(2) : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Layout Mobile */}
          <div className="mobile-ranking">
            {atleti.map((atleta, index) => (
              <div 
                key={atleta.fis_code} 
                className="mobile-athlete-card"
                onClick={() => window.location.href = `/atleti/${atleta.fis_code}`}
              >
                {/* Informazioni atleta */}
                 <div className="mobile-athlete-info">
                   <div className="mobile-position">
                     {(currentPage - 1) * itemsPerPage + index + 1}
                   </div>
                   <div className="mobile-athlete-details">
                     <div className="mobile-athlete-header">
                       <div className="mobile-athlete-name">
                         {atleta.nome} {atleta.cognome || ''}
                       </div>
                       <div className="mobile-age">{atleta.eta}</div>
                     </div>
                     <div className="mobile-athlete-meta">
                       <span className="mobile-nation">
                          {atleta.nazione === 'ITA' && '🇮🇹'}
                          {atleta.nazione === 'AUT' && '🇦🇹'}
                          {atleta.nazione === 'SUI' && '🇨🇭'}
                          {atleta.nazione === 'FRA' && '🇫🇷'}
                          {atleta.nazione === 'GER' && '🇩🇪'}
                          {atleta.nazione === 'USA' && '🇺🇸'}
                          {atleta.nazione === 'CAN' && '🇨🇦'}
                          {atleta.nazione === 'NOR' && '🇳🇴'}
                          {atleta.nazione === 'SWE' && '🇸🇪'}
                          {atleta.nazione && !['ITA', 'AUT', 'SUI', 'FRA', 'GER', 'USA', 'CAN', 'NOR', 'SWE'].includes(atleta.nazione) && atleta.nazione}
                          {atleta.nazione}
                        </span>
                       <span className="mobile-fis">{atleta.fis_code}</span>
                     </div>
                   </div>
                 </div>
                
                {/* Punti specialità in box */}
                <div className="mobile-points-grid">
                  <div className="mobile-point-box">
                    <div className="point-label">SL</div>
                    <div className="point-value">
                      {atleta.punti_sl ? atleta.punti_sl.toFixed(2) : '-'}
                    </div>
                  </div>
                  <div className="mobile-point-box">
                    <div className="point-label">GS</div>
                    <div className="point-value">
                      {atleta.punti_gs ? atleta.punti_gs.toFixed(2) : '-'}
                    </div>
                  </div>
                  <div className="mobile-point-box">
                    <div className="point-label">SG</div>
                    <div className="point-value">
                      {atleta.punti_sg ? atleta.punti_sg.toFixed(2) : '-'}
                    </div>
                  </div>
                  <div className="mobile-point-box">
                    <div className="point-label">DH</div>
                    <div className="point-value">
                      {atleta.punti_dh ? atleta.punti_dh.toFixed(2) : '-'}
                    </div>
                  </div>
                  <div className="mobile-point-box">
                    <div className="point-label">AC</div>
                    <div className="point-value">
                      {atleta.punti_ac ? atleta.punti_ac.toFixed(2) : '-'}
                    </div>
                  </div>
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

export default Ranking;