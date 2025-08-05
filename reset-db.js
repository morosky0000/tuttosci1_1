const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, 'database.db');

// Delete existing database
if (fs.existsSync(dbPath)) {
  fs.unlinkSync(dbPath);
  console.log('Database esistente eliminato');
}

// Create new database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Errore creazione database:', err.message);
    return;
  }
  console.log('Nuovo database creato');
});

// Initialize schema
db.serialize(() => {
  // Create atleti table
  db.run(`
    CREATE TABLE atleti (
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
    CREATE TABLE gare (
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
    CREATE TABLE gare_complete (
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

  // Create indexes
  db.run('CREATE INDEX idx_atleti_nome ON atleti(nome)');
  db.run('CREATE INDEX idx_atleti_nazionalita ON atleti(nazionalita)');
  db.run('CREATE INDEX idx_atleti_sesso ON atleti(sesso)');
  db.run('CREATE INDEX idx_gare_atleta ON gare(atleta_fis_code)');
  db.run('CREATE INDEX idx_gare_data ON gare(data DESC)');
  db.run('CREATE INDEX idx_gare_specialita ON gare(specialita)');
  db.run('CREATE UNIQUE INDEX idx_gare_unique ON gare(atleta_fis_code, url, data)');
  db.run('CREATE INDEX idx_gare_complete_specialty ON gare_complete(specialty)');
  db.run('CREATE INDEX idx_gare_complete_url ON gare_complete(fis_url)');

  console.log('Database vuoto creato - pronto per il workflow API');
});

db.close((err) => {
  if (err) {
    console.error('Errore chiusura database:', err.message);
  } else {
    console.log('Database reset completato con successo');
  }
});