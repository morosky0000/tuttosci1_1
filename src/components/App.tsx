import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import '../styles/App.css';
import Ranking from './Ranking';
import AthleteProfile from './AthleteProfile';
import RaceList from './RaceList';
import RaceDetail from './RaceDetail';
import Duel from './Duel';

const App: React.FC = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const location = useLocation();

  const toggleMobileNav = () => {
    setMobileNavOpen(!mobileNavOpen);
  };

  const isActiveRoute = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <Link to="/" className="app-logo">
            <div className="logo-icon">AR</div>
            <span>AtletiRanking</span>
          </Link>
          
          <nav className={`main-nav ${mobileNavOpen ? 'open' : ''}`}>
            <Link 
              to="/" 
              className={`nav-link ${isActiveRoute('/ranking') || location.pathname === '/' ? 'active' : ''}`}
              onClick={() => setMobileNavOpen(false)}
            >
              Classifiche
            </Link>
            <Link 
              to="/atleti" 
              className={`nav-link ${isActiveRoute('/atleti') ? 'active' : ''}`}
              onClick={() => setMobileNavOpen(false)}
            >
              Atleti
            </Link>
            <Link 
              to="/gare" 
              className={`nav-link ${isActiveRoute('/gare') ? 'active' : ''}`}
              onClick={() => setMobileNavOpen(false)}
            >
              Gare
            </Link>
            <Link 
              to="/confronto" 
              className={`nav-link ${isActiveRoute('/confronto') ? 'active' : ''}`}
              onClick={() => setMobileNavOpen(false)}
            >
              Confronto
            </Link>
          </nav>
          
          <button 
            className="mobile-nav-toggle"
            onClick={toggleMobileNav}
            aria-label="Toggle navigation"
          >
            {mobileNavOpen ? '✕' : '☰'}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <div className="page-container">
          <Routes>
            <Route path="/" element={<Ranking />} />
            <Route path="/ranking" element={<Ranking />} />
            <Route path="/ranking/:specialita" element={<Ranking />} />
            <Route path="/atleti" element={<AthleteProfile />} />
            <Route path="/atleti/:fisCode" element={<AthleteProfile />} />
            <Route path="/gare" element={<RaceList />} />
            <Route path="/gare/:id" element={<RaceDetail />} />
            <Route path="/confronto" element={<Duel />} />
            <Route path="/confronto/:fisCode1/:fisCode2" element={<Duel />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ 
        background: 'var(--color-gray-800)', 
        color: 'var(--color-white)', 
        padding: 'var(--spacing-4) 0',
        textAlign: 'center',
        fontSize: 'var(--font-size-sm)'
      }}>
        <div className="container">
          <p>&copy; 2024 AtletiRanking. Piattaforma per gestione atleti sci alpino.</p>
        </div>
      </footer>
    </div>
  );
};

// 404 Not Found Component
const NotFound: React.FC = () => {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">🏔️</div>
      <h2>Pagina non trovata</h2>
      <p>La pagina che stai cercando non esiste.</p>
      <Link to="/" className="btn btn-primary">
        Torna alla Home
      </Link>
    </div>
  );
};

export default App;