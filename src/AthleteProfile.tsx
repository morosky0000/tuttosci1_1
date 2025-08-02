import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface Gara {
  id: number;
  data: string;
  luogo: string;
  nazione: string;
  categoria: string;
  specialita: string;
  posizione: string;
  punti_fis: string;
  punti_coppa: string;
  url: string;
}

interface Atleta {
  fis_code: string;
  nome: string;
  eta: number;
  sesso: string;
  club: string;
  nazionalita: string;
  nazione_completa: string;
  punti: {
    sl: number;
    gs: number;
    sg: number;
    dh: number;
    ac: number;
  };
  gare: Gara[];
}

const AthleteProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [athlete, setAthlete] = useState<Atleta | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAthlete = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3001/api/atleti/${id}`);
        
        if (!response.ok) {
          throw new Error(`Errore ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        setAthlete(data);
        setError(null);
      } catch (error) {
        console.error('Errore nel recuperare i dati dell\'atleta:', error);
        setError(error instanceof Error ? error.message : 'Errore sconosciuto');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAthlete();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="athlete-profile-section">
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>Caricamento profilo atleta...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="athlete-profile-section">
        <div style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>
          <h3>Errore nel caricamento</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!athlete) {
    return (
      <div className="athlete-profile-section">
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <h3>Atleta non trovato</h3>
          <p>L'atleta con codice FIS {id} non è stato trovato nel database.</p>
        </div>
      </div>
    );
  }

  const formatPunti = (punti: number) => {
    return punti !== null && punti !== undefined ? punti.toFixed(2) : 'N/A';
  };

  const getPosizioneStyle = (posizione: string) => {
    if (!posizione || posizione === 'N/A') return {};
    
    const pos = posizione.toLowerCase();
    
    // DNF - Rosso
    if (pos.includes('dnf') || pos.includes('dsq') || pos.includes('dns')) {
      return {
        backgroundColor: '#e74c3c',
        color: 'white',
        fontWeight: 'bold',
        padding: '4px 8px',
        borderRadius: '4px'
      };
    }
    
    // Vittoria (1° posto) - Viola
    if (pos === '1' || pos === '1°') {
      return {
        backgroundColor: '#9b59b6',
        color: 'white',
        fontWeight: 'bold',
        padding: '4px 8px',
        borderRadius: '4px',
        boxShadow: '0 2px 4px rgba(155, 89, 182, 0.3)'
      };
    }
    
    // Posizioni numeriche (arrivo) - Verde
    if (/^\d+°?$/.test(pos)) {
      const position = parseInt(pos);
      if (position <= 30) { // Top 30
        return {
          backgroundColor: '#27ae60',
          color: 'white',
          fontWeight: 'bold',
          padding: '4px 8px',
          borderRadius: '4px'
        };
      }
    }
    
    return {
      padding: '4px 8px',
      borderRadius: '4px',
      backgroundColor: '#ecf0f1'
    };
  };

  // Funzione per ottenere lo sfondo del box della gara
  const getGaraBoxStyle = (posizione: string) => {
    const baseStyle = {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '1.5rem',
      boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
      border: '1px solid #e9ecef',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      cursor: 'pointer'
    };

    if (!posizione || posizione === 'N/A') return baseStyle;
    
    const pos = posizione.toLowerCase();
    
    // DNF - Sfondo rosso leggero
    if (pos.includes('dnf') || pos.includes('dsq') || pos.includes('dns')) {
      return {
        ...baseStyle,
        backgroundColor: '#ffebee',
        borderColor: '#ffcdd2'
      };
    }
    
    // Vittoria (1° posto) - Sfondo viola leggero
    if (pos === '1' || pos === '1°') {
      return {
        ...baseStyle,
        backgroundColor: '#f3e5f5',
        borderColor: '#e1bee7'
      };
    }
    
    // Posizioni numeriche (arrivo) - Sfondo verde leggero
    if (/^\d+°?$/.test(pos)) {
      const position = parseInt(pos);
      if (position <= 100) { // Top 30
        return {
          ...baseStyle,
          backgroundColor: '#e8f5e8',
          borderColor: '#c8e6c9'
        };
      }
    }
    
    return baseStyle;
  };



  const getCupBadge = (puntiCoppa: string | number | null, categoria: string | null) => {
    if (!puntiCoppa || puntiCoppa === 'N/A' || puntiCoppa === 0) return null;
    
    const punti = typeof puntiCoppa === 'string' ? parseFloat(puntiCoppa) : puntiCoppa;
    
    if (isNaN(punti) || punti <= 0) return null;
    
    // Determina il tipo di coppa basandosi sulla categoria della gara
    let cupType = 'CUP POINT';
    if (categoria) {
      const categoriaLower = categoria.toLowerCase();
      if (categoriaLower.includes('world cup') || categoriaLower.includes('wc')) {
        cupType = 'WORLD CUP POINT';
      } else if (categoriaLower.includes('european cup') || categoriaLower.includes('ec')) {
        cupType = 'EUROPEAN CUP POINT';
      }
    }
    
    return (
        <div style={{
          backgroundColor: '#FFD700',
          color: '#000',
          padding: '8px 12px',
          borderRadius: '6px',
          fontSize: '14px',
          fontWeight: 'bold',
          marginTop: '8px',
          width: '100%',
          textAlign: 'center'
        }}>
          {cupType}: {puntiCoppa}
        </div>
      );
  };

  // Funzione per ottenere la bandiera della nazione
  const getFlagEmoji = (nazione: string | null) => {
    if (!nazione) return '🌍';
    
    const flags: { [key: string]: string } = {
      'ITA': '🇮🇹', 'ITALY': '🇮🇹', 'Italia': '🇮🇹',
      'FRA': '🇫🇷', 'FRANCE': '🇫🇷', 'Francia': '🇫🇷',
      'GER': '🇩🇪', 'GERMANY': '🇩🇪', 'Germania': '🇩🇪',
      'AUT': '🇦🇹', 'AUSTRIA': '🇦🇹', 'Austria': '🇦🇹',
      'SUI': '🇨🇭', 'SWITZERLAND': '🇨🇭', 'Svizzera': '🇨🇭',
      'USA': '🇺🇸', 'United States': '🇺🇸', 'Stati Uniti': '🇺🇸',
      'CAN': '🇨🇦', 'CANADA': '🇨🇦', 'Canada': '🇨🇦',
      'NOR': '🇳🇴', 'NORWAY': '🇳🇴', 'Norvegia': '🇳🇴',
      'SWE': '🇸🇪', 'SWEDEN': '🇸🇪', 'Svezia': '🇸🇪',
      'FIN': '🇫🇮', 'FINLAND': '🇫🇮', 'Finlandia': '🇫🇮',
      'SLO': '🇸🇮', 'SLOVENIA': '🇸🇮', 'Slovenia': '🇸🇮',
      'CRO': '🇭🇷', 'CROATIA': '🇭🇷', 'Croazia': '🇭🇷',
      'CZE': '🇨🇿', 'CZECH REPUBLIC': '🇨🇿', 'Repubblica Ceca': '🇨🇿',
      'POL': '🇵🇱', 'POLAND': '🇵🇱', 'Polonia': '🇵🇱',
      'SVK': '🇸🇰', 'SLOVAKIA': '🇸🇰', 'Slovacchia': '🇸🇰',
      'BUL': '🇧🇬', 'BULGARIA': '🇧🇬', 'Bulgaria': '🇧🇬',
      'ROU': '🇷🇴', 'ROMANIA': '🇷🇴', 'Romania': '🇷🇴',
      'ESP': '🇪🇸', 'SPAIN': '🇪🇸', 'Spagna': '🇪🇸',
      'AND': '🇦🇩', 'ANDORRA': '🇦🇩', 'Andorra': '🇦🇩',
      'GBR': '🇬🇧', 'GREAT BRITAIN': '🇬🇧', 'Gran Bretagna': '🇬🇧',
      'NED': '🇳🇱', 'NETHERLANDS': '🇳🇱', 'Paesi Bassi': '🇳🇱',
      'BEL': '🇧🇪', 'BELGIUM': '🇧🇪', 'Belgio': '🇧🇪',
      'RUS': '🇷🇺', 'RUSSIA': '🇷🇺', 'Russia': '🇷🇺',
      'JPN': '🇯🇵', 'JAPAN': '🇯🇵', 'Giappone': '🇯🇵',
      'KOR': '🇰🇷', 'SOUTH KOREA': '🇰🇷', 'Corea del Sud': '🇰🇷',
      'CHN': '🇨🇳', 'CHINA': '🇨🇳', 'Cina': '🇨🇳'
    };
    
    const upperNazione = nazione.toUpperCase();
    return flags[upperNazione] || flags[nazione] || '🌍';
  };

  const formatData = (data: string) => {
    if (!data) return 'N/A';
    try {
      // Gestisce il formato DD-MM-YYYY dal database
      if (data.includes('-') && data.split('-').length === 3) {
        const [day, month, year] = data.split('-');
        // Crea una data nel formato YYYY-MM-DD per JavaScript
        const jsDate = new Date(`${year}-${month}-${day}`);
        if (!isNaN(jsDate.getTime())) {
          return jsDate.toLocaleDateString('it-IT');
        }
      }
      // Fallback per altri formati
      const date = new Date(data);
      if (!isNaN(date.getTime())) {
        return date.toLocaleDateString('it-IT');
      }
      return data;
    } catch {
      return data;
    }
  };

  return (
    <div className="athlete-profile-section" style={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '2rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    }}>
      {/* Header con informazioni principali */}
      <div style={{ 
        marginBottom: '3rem', 
        padding: '2rem', 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '16px',
        color: 'white',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ 
          margin: '0 0 1.5rem 0', 
          fontSize: '2.5rem',
          fontWeight: '700',
          textShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>{athlete.nome}</h1>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
          gap: '1.5rem',
          fontSize: '1.1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ opacity: 0.9 }}>🏷️</span>
            <div>
              <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Codice FIS</div>
              <div style={{ fontWeight: '600' }}>{athlete.fis_code}</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ opacity: 0.9 }}>🎂</span>
            <div>
              <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Età</div>
              <div style={{ fontWeight: '600' }}>{athlete.eta || 'N/A'}</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ opacity: 0.9 }}>{athlete.sesso === 'M' ? '👨' : athlete.sesso === 'F' ? '👩' : '👤'}</span>
            <div>
              <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Sesso</div>
              <div style={{ fontWeight: '600' }}>{athlete.sesso === 'M' ? 'Maschile' : athlete.sesso === 'F' ? 'Femminile' : 'N/A'}</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ opacity: 0.9 }}>🏂</span>
            <div>
              <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Club</div>
              <div style={{ fontWeight: '600' }}>{athlete.club || 'N/A'}</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ opacity: 0.9 }}>🌍</span>
            <div>
              <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Nazionalità</div>
              <div style={{ fontWeight: '600' }}>{athlete.nazione_completa || athlete.nazionalita || 'N/A'}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Punti FIS */}
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ 
          color: '#2c3e50', 
          fontSize: '1.8rem',
          fontWeight: '600',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          🎯 Punti FIS
        </h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', 
          gap: '1.5rem'
        }}>
          <div style={{ 
            textAlign: 'center', 
            padding: '1.5rem 1rem', 
            background: 'linear-gradient(135deg, #ff6b6b, #ee5a52)',
            borderRadius: '12px',
            color: 'white',
            boxShadow: '0 4px 15px rgba(255, 107, 107, 0.3)',
            transform: 'translateY(0)',
            transition: 'transform 0.2s ease'
          }}>
            <div style={{ fontSize: '0.9rem', opacity: 0.9, marginBottom: '0.5rem' }}>Slalom Speciale</div>
            <div style={{ fontWeight: 'bold', fontSize: '0.8rem', marginBottom: '0.5rem' }}>SL</div>
            <div style={{ fontSize: '1.4rem', fontWeight: '700' }}>{formatPunti(athlete.punti?.sl)}</div>
          </div>
          <div style={{ 
            textAlign: 'center', 
            padding: '1.5rem 1rem', 
            background: 'linear-gradient(135deg, #4ecdc4, #44a08d)',
            borderRadius: '12px',
            color: 'white',
            boxShadow: '0 4px 15px rgba(78, 205, 196, 0.3)'
          }}>
            <div style={{ fontSize: '0.9rem', opacity: 0.9, marginBottom: '0.5rem' }}>Slalom Gigante</div>
            <div style={{ fontWeight: 'bold', fontSize: '0.8rem', marginBottom: '0.5rem' }}>GS</div>
            <div style={{ fontSize: '1.4rem', fontWeight: '700' }}>{formatPunti(athlete.punti?.gs)}</div>
          </div>
          <div style={{ 
            textAlign: 'center', 
            padding: '1.5rem 1rem', 
            background: 'linear-gradient(135deg, #45b7d1, #96c93d)',
            borderRadius: '12px',
            color: 'white',
            boxShadow: '0 4px 15px rgba(69, 183, 209, 0.3)'
          }}>
            <div style={{ fontSize: '0.9rem', opacity: 0.9, marginBottom: '0.5rem' }}>Super Gigante</div>
            <div style={{ fontWeight: 'bold', fontSize: '0.8rem', marginBottom: '0.5rem' }}>SG</div>
            <div style={{ fontSize: '1.4rem', fontWeight: '700' }}>{formatPunti(athlete.punti?.sg)}</div>
          </div>
          <div style={{ 
            textAlign: 'center', 
            padding: '1.5rem 1rem', 
            background: 'linear-gradient(135deg, #f093fb, #f5576c)',
            borderRadius: '12px',
            color: 'white',
            boxShadow: '0 4px 15px rgba(240, 147, 251, 0.3)'
          }}>
            <div style={{ fontSize: '0.9rem', opacity: 0.9, marginBottom: '0.5rem' }}>Discesa Libera</div>
            <div style={{ fontWeight: 'bold', fontSize: '0.8rem', marginBottom: '0.5rem' }}>DH</div>
            <div style={{ fontSize: '1.4rem', fontWeight: '700' }}>{formatPunti(athlete.punti?.dh)}</div>
          </div>
          <div style={{ 
            textAlign: 'center', 
            padding: '1.5rem 1rem', 
            background: 'linear-gradient(135deg, #a8edea, #fed6e3)',
            borderRadius: '12px',
            color: '#2c3e50',
            boxShadow: '0 4px 15px rgba(168, 237, 234, 0.3)'
          }}>
            <div style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '0.5rem' }}>Alpine Combined</div>
            <div style={{ fontWeight: 'bold', fontSize: '0.8rem', marginBottom: '0.5rem' }}>AC</div>
            <div style={{ fontSize: '1.4rem', fontWeight: '700' }}>{formatPunti(athlete.punti?.ac)}</div>
          </div>
        </div>
      </div>

      {/* Gare */}
      <div>
        <h2 style={{ 
          color: '#2c3e50', 
          fontSize: '1.8rem',
          fontWeight: '600',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          🏁 Gare ({athlete.gare?.length || 0})
        </h2>
        
        {athlete.gare && athlete.gare.length > 0 ? (
          <div style={{ marginTop: '1rem' }}>
            <div style={{ 
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}>
              {athlete.gare.map((gara, index) => (
                <div key={gara.id || index} style={getGaraBoxStyle(gara.posizione)}>
                  {/* Header della gara */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '1rem',
                    paddingBottom: '0.75rem',
                    borderBottom: '2px solid #f1f3f4'
                  }}>
                    <div>
                      <h3 style={{
                        margin: '0 0 0.25rem 0',
                        color: '#2c3e50',
                        fontSize: '1.1rem',
                        fontWeight: '600'
                      }}>
                        {gara.luogo || 'Luogo N/A'}
                      </h3>
                      <p style={{
                        margin: '0',
                        color: '#7f8c8d',
                        fontSize: '0.9rem',
                        fontWeight: '500'
                      }}>
                        📅 {formatData(gara.data)}
                      </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={getPosizioneStyle(gara.posizione)}>
                        {gara.posizione || 'N/A'}
                      </span>
                    </div>
                  </div>

                  {/* Dettagli della gara */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '1rem'
                  }}>
                    <div>
                      <span style={{
                        fontSize: '0.8rem',
                        color: '#95a5a6',
                        fontWeight: '500',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}>Nazione</span>
                      <p style={{
                        margin: '0.25rem 0 0 0',
                        color: '#2c3e50',
                        fontWeight: '500'
                      }}>
                        {getFlagEmoji(gara.nazione)} {gara.nazione || 'N/A'}
                      </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{
                        fontSize: '0.8rem',
                        color: '#95a5a6',
                        fontWeight: '500',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}>Punti FIS</span>
                      <p style={{
                        margin: '0.25rem 0 0 0',
                        color: '#2c3e50',
                        fontWeight: '600',
                        fontSize: '1.1rem'
                      }}>
                        {gara.punti_fis || 'N/A'}
                      </p>
                    </div>
                  </div>

                  {/* Badge e informazioni aggiuntive */}
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <span style={{
                        padding: '4px 8px',
                        backgroundColor: '#e3f2fd',
                        color: '#1976d2',
                        borderRadius: '6px',
                        fontSize: '0.8rem',
                        fontWeight: '500'
                      }}>
                        {gara.categoria || 'N/A'}
                      </span>
                      <span style={{
                        padding: '4px 8px',
                        backgroundColor: '#f3e5f5',
                        color: '#7b1fa2',
                        borderRadius: '6px',
                        fontSize: '0.8rem',
                        fontWeight: '500'
                      }}>
                        {gara.specialita || 'N/A'}
                      </span>
                    </div>
                  </div>
                  {getCupBadge(gara.punti_coppa, gara.categoria)}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ 
            textAlign: 'center', 
            padding: '3rem 2rem', 
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            borderRadius: '12px', 
            marginTop: '1rem',
            boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏂</div>
            <p style={{ color: '#7f8c8d', fontSize: '1.2rem', fontWeight: '500' }}>
              Nessuna gara trovata per questo atleta.
            </p>
            <p style={{ color: '#95a5a6', fontSize: '1rem', marginTop: '0.5rem' }}>
              Le gare verranno visualizzate qui una volta caricate nel database.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AthleteProfile;