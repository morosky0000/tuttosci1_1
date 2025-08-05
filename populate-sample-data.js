const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Sample athletes data
const sampleAthletes = [
  {
    fis_code: '6294207',
    nome: 'Marco',
    eta: 25,
    sesso: 'M',
    club: 'SC Cortina',
    nazionalita: 'ITA',
    nazione_completa: 'Italy',
    punti_sl: 15.50,
    punti_gs: 18.20,
    punti_sg: 22.10,
    punti_dh: 25.80,
    punti_ac: 20.30
  },
  {
    fis_code: '6297613',
    nome: 'Anna',
    eta: 23,
    sesso: 'F',
    club: 'SC Val Gardena',
    nazionalita: 'ITA',
    nazione_completa: 'Italy',
    punti_sl: 12.30,
    punti_gs: 14.80,
    punti_sg: 19.50,
    punti_dh: 21.20,
    punti_ac: 16.90
  },
  {
    fis_code: '6295580',
    nome: 'Hans',
    eta: 27,
    sesso: 'M',
    club: 'SC Kitzbuhel',
    nazionalita: 'AUT',
    nazione_completa: 'Austria',
    punti_sl: 10.20,
    punti_gs: 11.50,
    punti_sg: 13.80,
    punti_dh: 16.40,
    punti_ac: 12.90
  },
  {
    fis_code: '10000756',
    nome: 'Marie',
    eta: 24,
    sesso: 'F',
    club: 'SC Chamonix',
    nazionalita: 'FRA',
    nazione_completa: 'France',
    punti_sl: 14.70,
    punti_gs: 16.30,
    punti_sg: 20.10,
    punti_dh: 23.50,
    punti_ac: 18.60
  },
  {
    fis_code: '6295082',
    nome: 'Erik',
    eta: 26,
    sesso: 'M',
    club: 'SC Wengen',
    nazionalita: 'SUI',
    nazione_completa: 'Switzerland',
    punti_sl: 8.90,
    punti_gs: 9.70,
    punti_sg: 11.20,
    punti_dh: 13.60,
    punti_ac: 10.80
  }
];

function populateDatabase() {
  const dbPath = path.join(__dirname, 'database.db');
  const netlifyDbPath = path.join(__dirname, 'netlify', 'functions', 'database.db');
  
  // Populate main database
  const db = new sqlite3.Database(dbPath);
  
  db.serialize(() => {
    const stmt = db.prepare(`
      INSERT OR REPLACE INTO atleti (
        fis_code, nome, eta, sesso, club, nazionalita, nazione_completa,
        punti_sl, punti_gs, punti_sg, punti_dh, punti_ac
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    sampleAthletes.forEach(athlete => {
      stmt.run([
        athlete.fis_code,
        athlete.nome,
        athlete.eta,
        athlete.sesso,
        athlete.club,
        athlete.nazionalita,
        athlete.nazione_completa,
        athlete.punti_sl,
        athlete.punti_gs,
        athlete.punti_sg,
        athlete.punti_dh,
        athlete.punti_ac
      ]);
    });
    
    stmt.finalize();
    console.log(`Inseriti ${sampleAthletes.length} atleti di esempio`);
  });
  
  db.close(() => {
    console.log('Database principale popolato');
    
    // Copy to Netlify functions directory
    const fs = require('fs');
    fs.copyFileSync(dbPath, netlifyDbPath);
    console.log('Database copiato in netlify/functions/');
  });
}

if (require.main === module) {
  populateDatabase();
}

module.exports = { populateDatabase, sampleAthletes };