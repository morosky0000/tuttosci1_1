import React from 'react';

const Ranking = ({ 
  atleti,
  loading,
  selectedGender,
  handleGenderChange,
  searchTerm,
  setSearchTerm,
  allNationalities,
  selectedNationalities,
  handleNationalityChange,
  getCountryFlag,
  allAges,
  selectedAge,
  setSelectedAge,
  selectedSpecialties,
  handleSpecialtyChange,
  sortedAthletes,
  isSearchMatch,
  handleAthleteClick,
  formatAthleteName
}: any) => {
  return (
    <div className="ranking-section">
      <h1 className="section-title">Ranking Atleti</h1>
      
      {/* Filtri genere */}
      <div className="gender-filters">
        <button 
          className={`gender-btn female ${selectedGender === 'F' ? 'active' : ''}`}
          onClick={() => handleGenderChange('F')}
        >
          Femmine
        </button>
        <button 
          className={`gender-btn male ${selectedGender === 'M' ? 'active' : ''}`}
          onClick={() => handleGenderChange('M')}
        >
          Maschi
        </button>
      </div>
      
      {/* Filtri di ricerca, nazionalità, età e specialità sulla stessa riga */}
      <div className="filters-row">
        <div className="search-filters">
          <input
            type="text"
            placeholder="Cerca atleti..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="nationality-filters">
          {allNationalities.map((nationality: string) => (
            <button
              key={nationality}
              className={`nationality-btn ${selectedNationalities.has(nationality) ? 'active' : ''}`}
              onClick={() => handleNationalityChange(nationality)}
            >
              {getCountryFlag(nationality)} {nationality}
            </button>
          ))}
        </div>
        
        <div className="age-filters">
          <select 
            className="age-select"
            value={selectedAge || ''}
            onChange={(e) => {
              const value = e.target.value;
              setSelectedAge(value ? parseInt(value) : null);
            }}
          >
            <option value="">Tutte le età</option>
            {allAges.map((age: number) => (
              <option key={age} value={age}>
                {age} anni
              </option>
            ))}
          </select>
        </div>
        
        <div className="specialty-filters">
          {['sl', 'gs', 'sg', 'dh', 'ac'].map(specialty => (
            <button
              key={specialty}
              className={`specialty-btn ${selectedSpecialties.has(specialty) ? 'active' : ''}`}
              onClick={() => handleSpecialtyChange(specialty)}
            >
              {specialty.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
      
      {/* Tabella atleti */}
      <div className="athletes-table-container">
        <table className="athletes-table">
          <thead>
              <tr>
                <th className="desktop-only">Pos</th>
                <th className="desktop-only">Nome</th>
                <th className="desktop-only">Età</th>
                <th className="desktop-only">Nazionalità</th>
                <th className={`desktop-only ${selectedSpecialties.has('sl') ? 'highlighted-column' : ''}`}>SL</th>
                <th className={`desktop-only ${selectedSpecialties.has('gs') ? 'highlighted-column' : ''}`}>GS</th>
                <th className={`desktop-only ${selectedSpecialties.has('sg') ? 'highlighted-column' : ''}`}>SG</th>
                <th className={`desktop-only ${selectedSpecialties.has('dh') ? 'highlighted-column' : ''}`}>DH</th>
                <th className={`desktop-only ${selectedSpecialties.has('ac') ? 'highlighted-column' : ''}`}>AC</th>
              </tr>
            </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={9} className="loading-cell">Caricamento...</td>
              </tr>
            ) : (
              sortedAthletes.map((atleta: any, index: number) => (
                <tr key={atleta.fis_code} className={`athlete-row ${isSearchMatch(atleta) ? 'search-highlighted' : ''}`} onClick={() => handleAthleteClick(atleta.fis_code)}>
                  {/* Layout desktop - celle normali */}
                  <td className="position-cell desktop-only">
                    <div className="position-box">{index + 1}</div>
                  </td>
                  <td className="athlete-name desktop-only">
                    {formatAthleteName(atleta.nome)}
                  </td>
                  <td className="desktop-only">{atleta.eta ?? 'N/A'}</td>
                  <td className="desktop-only">{getCountryFlag(atleta.nazionalita)} {atleta.nazionalita}</td>
                  <td className={`desktop-only ${selectedSpecialties.has('sl') ? 'highlighted-column' : ''}`}>{atleta.punti.sl ?? 'N/A'}</td>
                  <td className={`desktop-only ${selectedSpecialties.has('gs') ? 'highlighted-column' : ''}`}>{atleta.punti.gs ?? 'N/A'}</td>
                  <td className={`desktop-only ${selectedSpecialties.has('sg') ? 'highlighted-column' : ''}`}>{atleta.punti.sg ?? 'N/A'}</td>
                  <td className={`desktop-only ${selectedSpecialties.has('dh') ? 'highlighted-column' : ''}`}>{atleta.punti.dh ?? 'N/A'}</td>
                  <td className={`desktop-only ${selectedSpecialties.has('ac') ? 'highlighted-column' : ''}`}>{atleta.punti.ac ?? 'N/A'}</td>
                  
                  {/* Layout mobile - struttura card */}
                  <td className="mobile-only" colSpan={9}>
                    <div className="athlete-main-info">
                      <div className="position-cell">
                        <div className="position-box">{index + 1}</div>
                      </div>
                      <div>
                        <div className="athlete-name">{formatAthleteName(atleta.nome)}</div>
                        <div className="athlete-meta">
                          <span>Età: {atleta.eta ?? 'N/A'}</span>
                          <span>{getCountryFlag(atleta.nazionalita)} {atleta.nazionalita}</span>
                        </div>
                      </div>
                    </div>
                    <div className="athlete-specialties">
                      <div className={`specialty-item ${selectedSpecialties.has('sl') ? 'highlighted' : ''}`}>
                        <span className="specialty-label">SL</span>
                        <span className="specialty-value">{atleta.punti.sl ?? 'N/A'}</span>
                      </div>
                      <div className={`specialty-item ${selectedSpecialties.has('gs') ? 'highlighted' : ''}`}>
                        <span className="specialty-label">GS</span>
                        <span className="specialty-value">{atleta.punti.gs ?? 'N/A'}</span>
                      </div>
                      <div className={`specialty-item ${selectedSpecialties.has('sg') ? 'highlighted' : ''}`}>
                        <span className="specialty-label">SG</span>
                        <span className="specialty-value">{atleta.punti.sg ?? 'N/A'}</span>
                      </div>
                      <div className={`specialty-item ${selectedSpecialties.has('dh') ? 'highlighted' : ''}`}>
                        <span className="specialty-label">DH</span>
                        <span className="specialty-value">{atleta.punti.dh ?? 'N/A'}</span>
                      </div>
                      <div className={`specialty-item ${selectedSpecialties.has('ac') ? 'highlighted' : ''}`}>
                        <span className="specialty-label">AC</span>
                        <span className="specialty-value">{atleta.punti.ac ?? 'N/A'}</span>
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Ranking;