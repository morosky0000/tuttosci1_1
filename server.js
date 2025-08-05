const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001;

// CORS configuration
const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

// Database connection
const dbPath = path.join(__dirname, 'database.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database');
    initializeDatabase();
  }
});

// Initialize database schema
function initializeDatabase() {
  // Create atleti table
  db.run(`
    CREATE TABLE IF NOT EXISTS atleti (
      fis_code TEXT PRIMARY KEY NOT NULL,
      nome TEXT NOT NULL,
      eta INTEGER CHECK(eta > 0 AND eta < 100),
      sesso TEXT CHECK(sesso IN ('M', 'F')),
      club TEXT,
      nazionalita TEXT NOT NULL CHECK(length(nazionalita) = 3),
      nazione_completa TEXT,
      punti_sl REAL CHECK(punti_sl >= 0),
      punti_gs REAL CHECK(punti_gs >= 0),
      punti_sg REAL CHECK(punti_sg >= 0),
      punti_dh REAL CHECK(punti_dh >= 0),
      punti_ac REAL CHECK(punti_ac >= 0),
      data_creazione TEXT DEFAULT CURRENT_TIMESTAMP,
      data_aggiornamento TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Create gare table
  db.run(`
    CREATE TABLE IF NOT EXISTS gare (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      atleta_fis_code TEXT NOT NULL,
      url TEXT NOT NULL,
      data TEXT NOT NULL,
      luogo TEXT,
      nazione TEXT,
      categoria TEXT NOT NULL,
      specialita TEXT NOT NULL CHECK(specialita IN (
        'Slalom', 'Giant Slalom', 'Super-G', 'Downhill', 'Alpine Combined',
        'slalom', 'giant slalom', 'super-g', 'downhill', 'alpine combined'
      )),
      posizione TEXT NOT NULL,
      punti_fis TEXT,
      punti_coppa TEXT,
      data_inserimento TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (atleta_fis_code) REFERENCES atleti(fis_code) ON DELETE CASCADE
    )
  `);

  // Create gare_complete table
  db.run(`
    CREATE TABLE IF NOT EXISTS gare_complete (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      specialty TEXT NOT NULL,
      category TEXT NOT NULL,
      fis_url TEXT NOT NULL,
      data_gara TEXT,
      luogo TEXT,
      nazione TEXT,
      risultati TEXT NOT NULL,
      data_inserimento TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Create indexes for performance
  db.run('CREATE INDEX IF NOT EXISTS idx_atleti_nome ON atleti(nome)');
  db.run('CREATE INDEX IF NOT EXISTS idx_atleti_nazionalita ON atleti(nazionalita)');
  db.run('CREATE INDEX IF NOT EXISTS idx_atleti_sesso ON atleti(sesso)');
  db.run('CREATE INDEX IF NOT EXISTS idx_gare_atleta ON gare(atleta_fis_code)');
  db.run('CREATE INDEX IF NOT EXISTS idx_gare_data ON gare(data DESC)');
  db.run('CREATE INDEX IF NOT EXISTS idx_gare_specialita ON gare(specialita)');
  db.run('CREATE UNIQUE INDEX IF NOT EXISTS idx_gare_unique ON gare(atleta_fis_code, url, data)');
  
  console.log('Database schema initialized');
}

// API Routes

// Get all athletes with pagination and filters
app.get('/api/atleti', (req, res) => {
  const { page = 1, limit = 50, search, nazionalita, sesso, specialita } = req.query;
  const offset = (page - 1) * limit;
  
  let query = 'SELECT * FROM atleti WHERE 1=1';
  let params = [];
  
  if (search) {
    query += ' AND nome LIKE ?';
    params.push(`%${search}%`);
  }
  
  if (nazionalita) {
    query += ' AND nazionalita = ?';
    params.push(nazionalita);
  }
  
  if (sesso) {
    query += ' AND sesso = ?';
    params.push(sesso);
  }
  
  query += ' ORDER BY nome LIMIT ? OFFSET ?';
  params.push(parseInt(limit), parseInt(offset));
  
  db.all(query, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    // Get total count
    let countQuery = 'SELECT COUNT(*) as total FROM atleti WHERE 1=1';
    let countParams = [];
    
    if (search) {
      countQuery += ' AND nome LIKE ?';
      countParams.push(`%${search}%`);
    }
    
    if (nazionalita) {
      countQuery += ' AND nazionalita = ?';
      countParams.push(nazionalita);
    }
    
    if (sesso) {
      countQuery += ' AND sesso = ?';
      countParams.push(sesso);
    }
    
    db.get(countQuery, countParams, (err, countRow) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      
      res.json({
        atleti: rows,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: countRow.total,
          totalPages: Math.ceil(countRow.total / limit)
        }
      });
    });
  });
});

// Get athletes ranking with pagination and filters (for frontend)
app.get('/api/atleti/ranking', (req, res) => {
  const { page = 1, limit = 20, sesso } = req.query;
  const offset = (page - 1) * limit;
  
  let query = `
    SELECT *, 
    ROUND((COALESCE(punti_sl, 999) + COALESCE(punti_gs, 999) + COALESCE(punti_sg, 999) + COALESCE(punti_dh, 999) + COALESCE(punti_ac, 999)) / 5, 2) as punti_fis
    FROM atleti WHERE 1=1
  `;
  const params = [];
  
  if (sesso && sesso !== 'tutti') {
    query += ' AND sesso = ?';
    params.push(sesso);
  }
  
  query += ' ORDER BY punti_fis ASC LIMIT ? OFFSET ?';
  params.push(parseInt(limit), parseInt(offset));
  
  db.all(query, params, (err, rows) => {
    if (err) {
      console.error('Errore query ranking:', err);
      res.status(500).json({ error: 'Errore interno del server' });
      return;
    }
    res.json(rows);
  });
});

// Get single athlete by FIS code
app.get('/api/atleti/:fisCode', (req, res) => {
  const { fisCode } = req.params;
  
  db.get('SELECT * FROM atleti WHERE fis_code = ?', [fisCode], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    if (!row) {
      res.status(404).json({ error: 'Atleta non trovato' });
      return;
    }
    
    res.json(row);
  });
});

// Get athlete races
app.get('/api/atleti/:fisCode/gare', (req, res) => {
  const { fisCode } = req.params;
  const { specialita, anno } = req.query;
  
  let query = 'SELECT * FROM gare WHERE atleta_fis_code = ?';
  let params = [fisCode];
  
  if (specialita) {
    query += ' AND specialita = ?';
    params.push(specialita);
  }
  
  if (anno) {
    query += ' AND data LIKE ?';
    params.push(`${anno}%`);
  }
  
  query += ' ORDER BY data DESC';
  
  db.all(query, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    res.json(rows);
  });
});

// Get all races
app.get('/api/gare', (req, res) => {
  const { page = 1, limit = 50, specialita, categoria, localita, anno } = req.query;
  const offset = (page - 1) * limit;
  
  let query = 'SELECT * FROM gare_complete WHERE 1=1';
  let params = [];
  
  if (specialita) {
    query += ' AND specialty = ?';
    params.push(specialita);
  }
  
  if (categoria) {
    query += ' AND category = ?';
    params.push(categoria);
  }
  
  if (localita) {
    query += ' AND luogo LIKE ?';
    params.push(`%${localita}%`);
  }
  
  if (anno) {
    query += ' AND strftime(\'%Y\', data_gara) = ?';
    params.push(anno);
  }
  
  query += ' ORDER BY data_gara DESC LIMIT ? OFFSET ?';
  params.push(parseInt(limit), parseInt(offset));
  
  db.all(query, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    // Parse JSON results
    const gare = rows.map(row => ({
      ...row,
      risultati: row.risultati ? JSON.parse(row.risultati) : []
    }));
    
    res.json(gare);
  });
});

// Get single race details
app.get('/api/gare/:id', (req, res) => {
  const { id } = req.params;
  
  db.get('SELECT * FROM gare_complete WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    if (!row) {
      res.status(404).json({ error: 'Gara non trovata' });
      return;
    }
    
    const gara = {
      ...row,
      risultati: JSON.parse(row.risultati)
    };
    
    res.json(gara);
  });
});

// Add/Update athlete (for n8n integration)
app.post('/api/atleti', (req, res) => {
  const { fis_code, nome, eta, sesso, club, nazionalita, nazione_completa } = req.body;
  
  if (!fis_code || !nome || !nazionalita) {
    res.status(400).json({ error: 'FIS code, nome e nazionalità sono obbligatori' });
    return;
  }
  
  const query = `
    INSERT OR REPLACE INTO atleti 
    (fis_code, nome, eta, sesso, club, nazionalita, nazione_completa, data_aggiornamento)
    VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
  `;
  
  db.run(query, [fis_code, nome, eta, sesso, club, nazionalita, nazione_completa], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    res.json({ message: 'Atleta salvato con successo', fis_code });
  });
});

// Add race data from n8n
app.post('/api/gare/single', (req, res) => {
  const { specialty, category, athletes, url } = req.body;
  
  if (!specialty || !category || !athletes || !url) {
    res.status(400).json({ error: 'Dati gara incompleti' });
    return;
  }
  
  // Save complete race
  const insertRaceQuery = `
    INSERT INTO gare_complete (specialty, category, fis_url, risultati)
    VALUES (?, ?, ?, ?)
  `;
  
  db.run(insertRaceQuery, [specialty, category, url, JSON.stringify(athletes)], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    res.json({ message: 'Gara salvata con successo', id: this.lastID });
  });
});

// Bulk insert athletes with their races - Formato 1: atleti con le loro gare
app.post('/api/atleti/bulk', (req, res) => {
  
  let athletes = req.body;
  
  // Se non è un array, controlla se è un oggetto con atleta e gare
  if (!Array.isArray(athletes)) {
    if (athletes && typeof athletes === 'object' && athletes.atleta && athletes.gare) {
      // Converte il formato singolo atleta in array
      athletes = [athletes];
    } else {
      res.status(400).json({ error: 'Formato dati non valido - array richiesto o oggetto con atleta e gare' });
      return;
    }
  }
  
  db.serialize(() => {
    db.run('BEGIN TRANSACTION');
    
    let processed = 0;
    let errors = [];
    
    athletes.forEach((athleteData, index) => {
      const { atleta, gare } = athleteData;
      
      if (!atleta || !atleta.fis_code || !atleta.nome) {
        errors.push(`Atleta ${index}: FIS code e nome obbligatori`);
        processed++;
        return;
      }
      
      // Normalizza il campo sesso
      if (atleta.sesso) {
        if (atleta.sesso.toLowerCase() === 'male' || atleta.sesso.toLowerCase() === 'm') {
          atleta.sesso = 'M';
        } else if (atleta.sesso.toLowerCase() === 'female' || atleta.sesso.toLowerCase() === 'f') {
          atleta.sesso = 'F';
        }
      }
      
      // Normalizza il campo nazionalità
      if (atleta.nazione_short && !atleta.nazionalita) {
        atleta.nazionalita = atleta.nazione_short;
      }
      
      // Insert or update athlete
      const atletaQuery = `
        INSERT OR REPLACE INTO atleti 
        (fis_code, nome, nazionalita, sesso, eta, club, nazione_completa, data_aggiornamento)
        VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
      `;
      
      db.run(atletaQuery, [
        atleta.fis_code, 
        atleta.nome, 
        atleta.nazionalita, 
        atleta.sesso, 
        atleta.eta, 
        atleta.gruppo_sportivo,
        atleta.nazione_full
      ], function(err) {
        if (err) {
          errors.push(`Errore atleta ${index}: ${err.message}`);
        } else if (gare && Array.isArray(gare)) {
          // Insert races for this athlete
          gare.forEach((gara, garaIndex) => {
            const garaQuery = `
              INSERT OR IGNORE INTO gare 
              (atleta_fis_code, url, data, luogo, nazione, categoria, specialita, posizione, punti_fis, punti_coppa)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;
            
            db.run(garaQuery, [
              atleta.fis_code, gara.url, gara.data, gara.luogo, gara.nazione,
              gara.categoria, gara.specialita, gara.posizione, gara.punti_fis, gara.punti_coppa
            ], function(err) {
              if (err) {
                errors.push(`Errore gara ${garaIndex} per atleta ${index}: ${err.message}`);
              }
            });
          });
        }
        
        processed++;
        
        if (processed === athletes.length) {
          if (errors.length > 0) {
            console.error('Errori durante il processamento:', errors);
            db.run('ROLLBACK');
            res.status(500).json({ 
              error: 'Errori durante il processamento', 
              details: errors,
              processed
            });
          } else {
            db.run('COMMIT');
            res.json({ 
              message: `${athletes.length} atleti processati con successo`,
              processed
            });
          }
        }
      });
    });
  });
});

// Get ranking by specialty
app.get('/api/ranking/:specialita', (req, res) => {
  const { specialita } = req.params;
  const { sesso, nazionalita } = req.query;
  
  let query = `
    SELECT a.*, 
           COUNT(g.id) as totale_gare,
           COUNT(CASE WHEN g.posizione = '1' THEN 1 END) as vittorie,
           AVG(CASE WHEN g.posizione GLOB '[0-9]*' THEN CAST(g.posizione AS INTEGER) END) as posizione_media
    FROM atleti a
    LEFT JOIN gare g ON a.fis_code = g.atleta_fis_code AND g.specialita = ?
    WHERE 1=1
  `;
  
  let params = [specialita];
  
  if (sesso) {
    query += ' AND a.sesso = ?';
    params.push(sesso);
  }
  
  if (nazionalita) {
    query += ' AND a.nazionalita = ?';
    params.push(nazionalita);
  }
  
  query += ' GROUP BY a.fis_code HAVING totale_gare > 0 ORDER BY posizione_media ASC';
  
  db.all(query, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    res.json(rows);
  });
});

// Mutex per gestire richieste concorrenti
let isProcessing = false;
const requestQueue = [];

// Process race data for athletes (n8n endpoint) - Formato 2: gare complete con risultati
app.post('/api/atleti/processa-gare', (req, res) => {
  // Se c'è già una richiesta in elaborazione, metti in coda
  if (isProcessing) {
    requestQueue.push({ req, res });
    return;
  }
  
  processRaceData(req, res);
});

function processRaceData(req, res) {
  isProcessing = true;
  
  let raceData = req.body;
  

  
  // Se non è un array, controlla se è un oggetto singolo con specialty, category, athletes
  if (!Array.isArray(raceData)) {
    if (raceData && typeof raceData === 'object' && raceData.specialty && raceData.athletes) {
      // Converte il formato singola gara in array
      raceData = [raceData];
    } else {
      res.status(400).json({ error: 'Formato dati non valido - array richiesto o oggetto con specialty e athletes' });
      return;
    }
  } else {
    // Se è un array, verifica che contenga oggetti con la struttura corretta
    if (raceData.length === 0 || !raceData[0] || !raceData[0].specialty || !raceData[0].athletes) {

      res.status(400).json({ error: 'Formato dati non valido - array deve contenere oggetti con specialty e athletes' });
      return;
    }
  }
  
  db.serialize(() => {
    let totalProcessed = 0;
    let totalErrors = [];
    let racesProcessed = 0;
    
    raceData.forEach((race, raceIndex) => {
      const { specialty, category, athletes, fis_url } = race;
      
      if (!specialty || !athletes || !Array.isArray(athletes)) {
        totalErrors.push(`Gara ${raceIndex}: Specialità e atleti sono obbligatori`);
        racesProcessed++;
        return;
      }
      
      // First, save the complete race
      const insertRaceQuery = `
        INSERT INTO gare_complete (specialty, category, fis_url, risultati)
        VALUES (?, ?, ?, ?)
      `;
      
      db.run(insertRaceQuery, [
        specialty, category, fis_url, JSON.stringify(athletes)
      ], function(err) {
        if (err) {
          console.error('Errore inserimento gara completa:', err.message);
        }
      });
      
      // Process each athlete result
      let athletesInRace = 0;
      athletes.forEach((athlete, athleteIndex) => {
        const fisCode = athlete['FIS code'];
        const name = athlete['Athlete'];
        const rank = athlete['Rank'];
        const nation = athlete['Nation'];
        const fisPoints = athlete['FIS Points'];
        const cupPoints = athlete['Cup Points'];
        const bib = athlete['Bib'];
        const year = athlete['Year'];
        const run1 = athlete['Run 1'];
        const run2 = athlete['Run 2'];
        const totalTime = athlete['Total Time'];
        const diffTime = athlete['Diff. Time'];
        
        // Skip athletes with malformed data (e.g., disqualifications with wrong field mapping)
        if (!fisCode || !name || 
            fisCode.length < 3 || name.length > 100 || 
            /^[A-Z]{3}$/.test(fisCode) || // FIS code shouldn't be just a country code
            name.toLowerCase().includes('disqualification') ||
            name.toLowerCase().includes('gate fault') ||
            name.toLowerCase().includes('icr ')) {
          console.warn(`Atleta ${athleteIndex} in gara ${raceIndex}: Dati malformati, saltato (FIS: '${fisCode}', Nome: '${name?.substring(0,50)}...')`);
          athletesInRace++;
          return;
        }
        
        // Validate and fix nation code
        let validNation = nation;
        if (!nation || typeof nation !== 'string' || nation.length !== 3) {
          validNation = 'UNK'; // Default for unknown/invalid nations
          console.warn(`Atleta ${athleteIndex} in gara ${raceIndex}: Nazionalità '${nation}' non valida, usando 'UNK'`);
        }
        
        // Extract year from athlete data to calculate age
        let eta = null;
        if (year && !isNaN(year)) {
          const currentYear = new Date().getFullYear();
          eta = currentYear - parseInt(year);
        }
        
        // Insert/update athlete if not exists
        const atletaQuery = `
          INSERT OR REPLACE INTO atleti 
          (fis_code, nome, nazionalita, eta, data_aggiornamento)
          VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
        `;
        
        db.run(atletaQuery, [fisCode, name, validNation, eta], function(err) {
          if (err) {
            totalErrors.push(`Errore atleta ${athleteIndex} in gara ${raceIndex}: ${err.message}`);
          } else {
            // Insert race result with additional data
            const garaQuery = `
              INSERT OR IGNORE INTO gare 
              (atleta_fis_code, url, categoria, specialita, posizione, punti_fis, punti_coppa, data)
              VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_DATE)
            `;
            
            db.run(garaQuery, [
              fisCode, fis_url, category, specialty, rank, fisPoints, cupPoints
            ], function(err) {
              if (err) {
                totalErrors.push(`Errore gara atleta ${athleteIndex}: ${err.message}`);
              }
            });
          }
          
          athletesInRace++;
          totalProcessed++;
          
          if (athletesInRace === athletes.length) {
            racesProcessed++;
            
            if (racesProcessed === raceData.length) {
              if (totalErrors.length > 0) {
                console.error('Errori durante il processamento:', totalErrors);
                res.status(500).json({ 
                  error: 'Errori durante il processamento', 
                  details: totalErrors,
                  processed: totalProcessed
                });
                
                // Processa la prossima richiesta in coda anche in caso di errore
                processNextRequest();
              } else {
                res.json({ 
                  message: `${raceData.length} gare processate con successo`, 
                  racesProcessed: raceData.length,
                  athletesProcessed: totalProcessed
                });
              }
              
              // Processa la prossima richiesta in coda
              processNextRequest();
            }
          }
        });
      });
    });
  });
}

function processNextRequest() {
  isProcessing = false;
  
  if (requestQueue.length > 0) {
    const { req, res } = requestQueue.shift();
    processRaceData(req, res);
  }
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Errore interno del server' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('Shutting down server...');
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Database connection closed.');
    process.exit(0);
  });
});