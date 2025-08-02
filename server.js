const express = require('express');
const path = require('path');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Path del database SQLite
const DB_FILE = path.join(__dirname, 'atleti.db');

// Variabile per il database
let db;

// Funzione per inizializzare il database
async function initializeDatabase() {
  try {
    db = await open({
      filename: DB_FILE,
      driver: sqlite3.Database
    });

    console.log('🔗 Connesso al database SQLite.');

    // Abilita le chiavi esterne
    await db.run('PRAGMA foreign_keys = ON;');

    // Crea la tabella degli atleti se non esiste
    await db.exec(`
      CREATE TABLE IF NOT EXISTS atleti (
        fis_code TEXT PRIMARY KEY,
        nome TEXT,
        eta INTEGER,
        sesso TEXT,
        club TEXT,
        nazionalita TEXT,
        nazione_completa TEXT,
        punti_sl REAL,
        punti_gs REAL,
        punti_sg REAL,
        punti_dh REAL,
        punti_ac REAL,
        data_nascita TEXT
      );
    `);

    // Crea la tabella delle gare se non esiste
    await db.exec(`
      CREATE TABLE IF NOT EXISTS gare (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        atleta_fis_code TEXT NOT NULL,
        url TEXT,
        data TEXT,
        luogo TEXT,
        nazione TEXT,
        categoria TEXT,
        specialita TEXT,
        posizione TEXT,
        punti_fis TEXT,
        punti_coppa TEXT,
        data_inserimento TEXT,
        FOREIGN KEY (atleta_fis_code) REFERENCES atleti (fis_code) ON DELETE CASCADE
      );
    `);

    console.log('✅ Tabelle del database verificate/create con successo.');

  } catch (error) {
    console.error('❌ Errore durante l\'inizializzazione del database:', error);
    process.exit(1);
  }
}

// Funzione per pulire gli URL dai backtick e caratteri problematici
function pulisciUrl(url) {
  if (!url) return '';
  return url.replace(/`/g, '').replace(/\s+/g, ' ').trim();
}

// GET - Ottieni tutti gli atleti con le loro gare
app.get('/api/atleti', async (req, res) => {
  try {
    const atleti = await db.all('SELECT * FROM atleti ORDER BY nome ASC');

    const atletiConGare = await Promise.all(atleti.map(async (atleta) => {
      const gare = await db.all('SELECT * FROM gare WHERE atleta_fis_code = ? ORDER BY data DESC', [atleta.fis_code]);
      return {
        ...atleta,
        punti: {
          sl: atleta.punti_sl,
          gs: atleta.punti_gs,
          sg: atleta.punti_sg,
          dh: atleta.punti_dh,
          ac: atleta.punti_ac
        },
        gare
      };
    }));

    res.json(atletiConGare);
  } catch (error) {
    console.error('Errore nel recuperare gli atleti:', error);
    res.status(500).json({ error: 'Errore interno del server' });
  }
});

// GET - Ottieni un atleta specifico per FIS code
app.get('/api/atleti/:fis_code', async (req, res) => {
  const { fis_code } = req.params;
  try {
    const atleta = await db.get('SELECT * FROM atleti WHERE fis_code = ?', [fis_code]);

    if (!atleta) {
      return res.status(404).json({ error: 'Atleta non trovato' });
    }

    const gare = await db.all('SELECT * FROM gare WHERE atleta_fis_code = ? ORDER BY data DESC', [fis_code]);

    res.json({
      ...atleta,
      punti: {
        sl: atleta.punti_sl,
        gs: atleta.punti_gs,
        sg: atleta.punti_sg,
        dh: atleta.punti_dh,
        ac: atleta.punti_ac
      },
      gare
    });
  } catch (error) {
    console.error(`Errore nel recuperare l'atleta ${fis_code}:`, error);
    res.status(500).json({ error: 'Errore interno del server' });
  }
});

// POST - Processa array di gare per un atleta
app.post('/api/atleti/processa-gare', async (req, res) => {
  const { atleta: atletaData, gare } = req.body;

  if (!atletaData || !atletaData.fis_code) {
    return res.status(400).json({ error: 'Dati atleta o FIS code mancanti.' });
  }
  if (!Array.isArray(gare)) {
    return res.status(400).json({ error: 'Il campo gare deve essere un array.' });
  }

  const { fis_code, nome, gruppo_sportivo, nazione_short, nazione_full, sesso, eta } = atletaData;
  console.log(`🏃 Processando atleta: ${nome} (FIS: ${fis_code}) con ${gare.length} gare.`);

  try {
    await db.run('BEGIN TRANSACTION');

    let atleta = await db.get('SELECT fis_code FROM atleti WHERE fis_code = ?', [fis_code]);

    if (!atleta) {
      await db.run(
        'INSERT INTO atleti (fis_code, nome, eta, sesso, club, nazionalita, nazione_completa) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [fis_code, nome || '', parseInt(eta) || null, sesso ? (sesso === 'Male' ? 'M' : 'F') : null, gruppo_sportivo || '', nazione_short || '', nazione_full || '']
      );
      console.log(`✅ Nuovo atleta creato: ${nome}`);
    }

    const gareProcessate = [];
    const gareDuplicate = [];
    const gareErrori = [];

    for (const gara of gare) {
      const garaUrl = pulisciUrl(gara.url);
      const garaData = gara.data || '';

      const garaEsistente = await db.get(
        'SELECT id FROM gare WHERE atleta_fis_code = ? AND url = ? AND data = ?',
        [fis_code, garaUrl, garaData]
      );

      if (!garaEsistente) {
        await db.run(
          'INSERT INTO gare (atleta_fis_code, url, data, luogo, nazione, categoria, specialita, posizione, punti_fis, punti_coppa, data_inserimento) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [fis_code, garaUrl, garaData, gara.luogo || '', gara.nazione || '', gara.categoria || '', gara.specialita || '', gara.posizione || '', gara.punti_fis || '', gara.punti_coppa || '', new Date().toISOString()]
        );
        gareProcessate.push(gara);
      } else {
        gareDuplicate.push(gara);
      }
    }

    await db.run('COMMIT');

    console.log(`💾 Dati salvati per ${nome}. Inserite: ${gareProcessate.length}, Duplicate: ${gareDuplicate.length}`);
    res.status(200).json({
      message: `Processamento completato per ${nome}`,
      fis_code,
      inserite: gareProcessate.length,
      duplicate: gareDuplicate.length,
      errori: gareErrori.length
    });

  } catch (error) {
    await db.run('ROLLBACK');
    console.error(`❌ Errore durante il salvataggio per l'atleta ${fis_code}:`, error);
    res.status(500).json({ error: 'Errore durante il salvataggio dei dati nel database.' });
  }
});

// POST - Ricevi punti FIS per un array di atleti
app.post('/api/atleti/fis-points', async (req, res) => {
  const updates = req.body;

  if (!Array.isArray(updates)) {
    return res.status(400).json({ error: 'Input non valido, atteso un array di atleti.' });
  }

  let atletiAggiornati = 0;
  let atletiNonTrovati = [];

  try {
    await db.run('BEGIN TRANSACTION');

    for (const update of updates) {
      const { fis_code, SL, GS, SG, DH, AC } = update;
      const result = await db.run(
        'UPDATE atleti SET punti_sl = ?, punti_gs = ?, punti_sg = ?, punti_dh = ?, punti_ac = ? WHERE fis_code = ?',
        [SL, GS, SG, DH, AC, fis_code]
      );

      if (result.changes > 0) {
        atletiAggiornati++;
      } else {
        atletiNonTrovati.push(fis_code);
      }
    }

    await db.run('COMMIT');

    res.status(200).json({
      message: `Aggiornamento punti completato. Atleti aggiornati: ${atletiAggiornati}.`,
      atleti_non_trovati: atletiNonTrovati
    });

  } catch (error) {
    await db.run('ROLLBACK');
    console.error('Errore durante l\'aggiornamento dei punti FIS:', error);
    res.status(500).json({ error: 'Errore durante l\'aggiornamento dei punti nel database.' });
  }
});

// DELETE - Elimina un atleta e le sue gare
app.delete('/api/atleti/:fis_code', async (req, res) => {
  const { fis_code } = req.params;
  try {
    const result = await db.run('DELETE FROM atleti WHERE fis_code = ?', [fis_code]);
    if (result.changes > 0) {
      res.status(200).json({ message: `Atleta ${fis_code} eliminato con successo.` });
    } else {
      res.status(404).json({ error: 'Atleta non trovato.' });
    }
  } catch (error) {
    console.error(`Errore durante l'eliminazione dell'atleta ${fis_code}:`, error);
    res.status(500).json({ error: 'Errore interno del server.' });
  }
});

// DELETE - Svuota completamente il database
app.delete('/api/database/reset', async (req, res) => {
  try {
    await db.run('BEGIN TRANSACTION');
    
    // Elimina tutti i dati dalle tabelle
    await db.run('DELETE FROM gare');
    await db.run('DELETE FROM atleti');
    
    // Reset degli autoincrement
    await db.run('DELETE FROM sqlite_sequence WHERE name IN ("gare", "atleti")');
    
    await db.run('COMMIT');
    
    console.log('🗑️ Database completamente svuotato.');
    res.status(200).json({ 
      message: 'Database svuotato con successo. Tutte le tabelle sono ora vuote.',
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    await db.run('ROLLBACK');
    console.error('❌ Errore durante lo svuotamento del database:', error);
    res.status(500).json({ error: 'Errore durante lo svuotamento del database.' });
  }
});

// Avvia il server e inizializza il database
async function startServer() {
  await initializeDatabase();
  app.listen(PORT, () => {
    console.log(`🚀 Server API avviato su http://localhost:${PORT}`);
    console.log('📊 Endpoints disponibili (con database SQLite):');
    console.log('   GET    /api/atleti - Ottieni tutti gli atleti');
    console.log('   GET    /api/atleti/:fis_code - Ottieni atleta specifico');
    console.log('   POST   /api/atleti/processa-gare - Processa gare per un atleta');
    console.log('   POST   /api/atleti/fis-points - Aggiorna punti FIS per atleti');
    console.log('   DELETE /api/atleti/:fis_code - Elimina un atleta');
    console.log('   DELETE /api/database/reset - Svuota completamente il database');
    console.log('\n🎯 Pronto a ricevere dati!');
  });
}

startServer();

module.exports = app;