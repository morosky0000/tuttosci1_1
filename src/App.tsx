import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import AthleteProfile from './AthleteProfile';
import Ranking from './Ranking';
import Duel from './Duel';
import './App.css';

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
  gare?: Gara[];
}

interface Gara {
  luogo: string;
  nazione: string;
  data: string;
  specialita: string;
  categoria: string;
  posizione: string | number | null;
  punti_fis: number | null;
  punti_coppa?: number | null;
}



function App() {
  const navigate = useNavigate();
  const [atleti, setAtleti] = useState<Atleta[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGender, setSelectedGender] = useState<'M' | 'F' | null>('M');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNationalities, setSelectedNationalities] = useState<Set<string>>(new Set());
  const [selectedAge, setSelectedAge] = useState<number | null>(null);
  const [selectedSpecialties, setSelectedSpecialties] = useState<Set<string>>(new Set());
  

  // Effetto per scorrere all'atleta evidenziato
  useEffect(() => {
    if (searchTerm.trim()) {
      const timer = setTimeout(() => {
        const highlightedElement = document.querySelector('.search-highlighted');
        if (highlightedElement) {
          highlightedElement.scrollIntoView({ 
            behavior: 'auto', 
            block: 'center' 
          });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchAtleti();
  }, []);

  const fetchAtleti = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/atleti');
      const data = await response.json();
      setAtleti(data);
    } catch (error) {
      console.error('Errore nel caricamento degli atleti:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenderChange = (gender: 'M' | 'F') => {
    setSelectedGender(selectedGender === gender ? null : gender);
  };

  const handleNationalityChange = (nationality: string) => {
    const newSelected = new Set(selectedNationalities);
    if (newSelected.has(nationality)) {
      newSelected.delete(nationality);
    } else {
      newSelected.add(nationality);
    }
    setSelectedNationalities(newSelected);
  };

  const handleSpecialtyChange = (specialty: string) => {
    const newSelected = new Set(selectedSpecialties);
    if (newSelected.has(specialty)) {
      newSelected.delete(specialty);
    } else {
      newSelected.add(specialty);
    }
    setSelectedSpecialties(newSelected);
  };



  const handleAthleteClick = (fis_code: string) => {
    navigate(`/athlete/${fis_code}`);
  };
  const formatAthleteName = (nome: string) => {
    if (nome.includes(' ')) {
      const parts = nome.split(' ');
      if (parts.length >= 2) {
        const lastName = parts[parts.length - 1];
        const firstNames = parts.slice(0, -1).join(' ');
        return `${lastName} ${firstNames}`;
      }
    }
    return nome;
  };

  const getCountryFlag = (nationality: string) => {
    const flags: { [key: string]: string } = {
      'ITA': '🇮🇹',
      'FRA': '🇫🇷',
      'GER': '🇩🇪',
      'AUT': '🇦🇹',
      'SUI': '🇨🇭',
      'USA': '🇺🇸',
      'CAN': '🇨🇦',
      'NOR': '🇳🇴',
      'SWE': '🇸🇪',
      'FIN': '🇫🇮',
      'SLO': '🇸🇮',
      'CRO': '🇭🇷',
      'CZE': '🇨🇿',
      'POL': '🇵🇱',
      'SVK': '🇸🇰',
      'BUL': '🇧🇬',
      'ROU': '🇷🇴',
      'SRB': '🇷🇸',
      'BIH': '🇧🇦',
      'MKD': '🇲🇰',
      'ALB': '🇦🇱',
      'MNE': '🇲🇪',
      'GRE': '🇬🇷',
      'TUR': '🇹🇷',
      'RUS': '🇷🇺',
      'UKR': '🇺🇦',
      'BLR': '🇧🇾',
      'LTU': '🇱🇹',
      'LAT': '🇱🇻',
      'EST': '🇪🇪',
      'ESP': '🇪🇸',
      'POR': '🇵🇹',
      'AND': '🇦🇩',
      'GBR': '🇬🇧',
      'IRL': '🇮🇪',
      'NED': '🇳🇱',
      'BEL': '🇧🇪',
      'LUX': '🇱🇺',
      'DEN': '🇩🇰',
      'ISL': '🇮🇸',
      'JPN': '🇯🇵',
      'KOR': '🇰🇷',
      'CHN': '🇨🇳',
      'AUS': '🇦🇺',
      'NZL': '🇳🇿',
      'CHI': '🇨🇱',
      'ARG': '🇦🇷',
      'BRA': '🇧🇷',
      'MEX': '🇲🇽',
      'ISR': '🇮🇱',
      'LIE': '🇱🇮',
      'MON': '🇲🇨',
      'SMR': '🇸🇲'
    };
    return flags[nationality] || '🏳️';
  };

  // Filtri normali (esclusa la ricerca)
  const filteredAthletes = atleti.filter(atleta => {
    if (selectedGender && atleta.sesso !== selectedGender) return false;
    if (selectedNationalities.size > 0 && !selectedNationalities.has(atleta.nazionalita)) return false;
    if (selectedAge && atleta.eta !== selectedAge) return false;
    return true;
  });

  // Funzione per verificare se un atleta corrisponde alla ricerca
  const isSearchMatch = (atleta: Atleta) => {
    return searchTerm.trim() && atleta.nome.toLowerCase().includes(searchTerm.toLowerCase());
  };

  const sortedAthletes = filteredAthletes.sort((a, b) => {
    if (selectedSpecialties.size === 0) {
      // Somma tutti i punti tranne AC
      // 0 = migliore (primo posto), null/undefined = N/A (ultimo posto)
      const getPointValue = (point: number | null | undefined | string) => {
        if (point === null || point === undefined || point === '' || point === 'null') return 999.99;
        if (typeof point === 'string') {
          const parsed = parseFloat(point);
          return isNaN(parsed) ? 999.99 : parsed;
        }
        return point; // Include 0 come valore valido (migliore)
      };
      
      const aTotal = getPointValue(a.punti.sl) + getPointValue(a.punti.gs) + getPointValue(a.punti.sg) + getPointValue(a.punti.dh);
      const bTotal = getPointValue(b.punti.sl) + getPointValue(b.punti.gs) + getPointValue(b.punti.sg) + getPointValue(b.punti.dh);
      return aTotal - bTotal;
    } else {
      // Somma i punti delle specialità selezionate
      // 0 = migliore (primo posto), null/undefined = N/A (ultimo posto)
      const getPointValue = (point: number | null | undefined | string) => {
        if (point === null || point === undefined || point === '' || point === 'null') return 999.99;
        if (typeof point === 'string') {
          const parsed = parseFloat(point);
          return isNaN(parsed) ? 999.99 : parsed;
        }
        return point; // Include 0 come valore valido (migliore)
      };
      
      let aTotal = 0;
      let bTotal = 0;
      selectedSpecialties.forEach(specialty => {
        aTotal += getPointValue(a.punti[specialty as keyof typeof a.punti]);
        bTotal += getPointValue(b.punti[specialty as keyof typeof b.punti]);
      });
      return aTotal - bTotal;
    }
  });

  const allNationalities = Array.from(new Set(atleti.map(atleta => atleta.nazionalita))).sort();
  const allAges = Array.from(new Set(atleti.map(atleta => atleta.eta).filter(eta => eta !== null))) as number[];
  allAges.sort((a, b) => a - b);

  return (
    <div className="App">
      <header className="header">
        <nav className="nav-container">
          <div className="logo">
            <div className="logo-icon">⛷️</div>
            <div className="logo-text">
              <span className="logo-main">Alpine Ranking</span>
              <span className="logo-sub">FIS Points System</span>
            </div>
          </div>
          <div className="nav-menu">
            <Link to="/" className="nav-item">
              <span className="nav-icon">📊</span>
              Ranking
            </Link>
            <Link to="/atleti" className="nav-item">
              <span className="nav-icon">👥</span>
              Atleti
            </Link>
            <Link to="/duello" className="nav-item">
              <span className="nav-icon">⚔️</span>
              Duello
            </Link>
          </div>
        </nav>
      </header>

      <main className="main-content">
        <Routes>
          <Route path="/" element={
            <Ranking 
              atleti={atleti}
              loading={loading}
              selectedGender={selectedGender}
              handleGenderChange={handleGenderChange}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              allNationalities={allNationalities}
              selectedNationalities={selectedNationalities}
              handleNationalityChange={handleNationalityChange}
              getCountryFlag={getCountryFlag}
              allAges={allAges}
              selectedAge={selectedAge}
              setSelectedAge={setSelectedAge}
              selectedSpecialties={selectedSpecialties}
              handleSpecialtyChange={handleSpecialtyChange}
              sortedAthletes={sortedAthletes}
              isSearchMatch={isSearchMatch}
              handleAthleteClick={handleAthleteClick}
              formatAthleteName={formatAthleteName}
            />
          } />
          <Route path="/atleti" element={
            <div className="athletes-section">
              <h2>Atleti</h2>
              <div className="filters">
                <div className="filter-group">
                  <label htmlFor="gender">Genere</label>
                  <select
                    id="gender"
                    value={selectedGender || ''}
                    onChange={(e) => setSelectedGender(e.target.value === '' ? null : e.target.value as 'M' | 'F')}
                  >
                    <option value="">Tutti</option>
                    <option value="M">Maschile</option>
                    <option value="F">Femminile</option>
                  </select>
                </div>
                <div className="filter-group">
                  <label htmlFor="search">Ricerca</label>
                  <input
                    id="search"
                    type="text"
                    placeholder="Cerca per nome o cognome..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="athletes-simple-list">
                {atleti
                  .filter(atleta => {
                    const matchesGender = !selectedGender || atleta.sesso === selectedGender;
                    const matchesSearch = !searchTerm || 
                      atleta.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      atleta.nazionalita.toLowerCase().includes(searchTerm.toLowerCase());
                    return matchesGender && matchesSearch;
                  })
                  .map((atleta, index) => (
                  <div key={index} className="athlete-simple-item" onClick={() => handleAthleteClick(atleta.fis_code)}>
                    <div className="athlete-name">
                      {formatAthleteName(atleta.nome)}
                    </div>
                    <div className="athlete-age">
                      {atleta.eta ?? 'N/A'} anni
                    </div>
                    <div className="athlete-nationality">
                      {getCountryFlag(atleta.nazionalita)} {atleta.nazionalita}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          } />
          <Route path="/duello" element={
            <Duel 
              atleti={atleti}
              formatAthleteName={formatAthleteName}
              getCountryFlag={getCountryFlag}
            />
          } />
          <Route path="/athlete/:id" element={<AthleteProfile />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
