const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const serverless = require('serverless-http');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database path per Netlify
const dbPath = path.join(__dirname, '../../database.db');
const db = new sqlite3.Database(dbPath);

// Routes
app.get('/api/atleti', (req, res) => {
  const { sesso, nazione, eta_min, eta_max, search } = req.query;
  
  let query = 'SELECT * FROM atleti WHERE 1=1';
  const params = [];
  
  if (sesso && sesso !== 'tutti') {
    query += ' AND sesso = ?';
    params.push(sesso);
  }
  
  if (nazione && nazione !== 'tutte') {
    query += ' AND nazione = ?';
    params.push(nazione);
  }
  
  if (eta_min) {
    query += ' AND eta >= ?';
    params.push(parseInt(eta_min));
  }
  
  if (eta_max) {
    query += ' AND eta <= ?';
    params.push(parseInt(eta_max));
  }
  
  if (search) {
    query += ' AND (nome LIKE ? OR cognome LIKE ?)';
    params.push(`%${search}%`, `%${search}%`);
  }
  
  query += ' ORDER BY punti_fis ASC';
  
  db.all(query, params, (err, rows) => {
    if (err) {
      console.error('Errore query atleti:', err);
      res.status(500).json({ error: 'Errore interno del server' });
      return;
    }
    res.json(rows);
  });
});

app.get('/api/atleti/:id', (req, res) => {
  const { id } = req.params;
  
  db.get('SELECT * FROM atleti WHERE id = ?', [id], (err, row) => {
    if (err) {
      console.error('Errore query atleta:', err);
      res.status(500).json({ error: 'Errore interno del server' });
      return;
    }
    
    if (!row) {
      res.status(404).json({ error: 'Atleta non trovato' });
      return;
    }
    
    res.json(row);
  });
});

app.get('/api/nazioni', (req, res) => {
  db.all('SELECT DISTINCT nazione FROM atleti ORDER BY nazione', (err, rows) => {
    if (err) {
      console.error('Errore query nazioni:', err);
      res.status(500).json({ error: 'Errore interno del server' });
      return;
    }
    res.json(rows.map(row => row.nazione));
  });
});

app.get('/api/gare', (req, res) => {
  db.all('SELECT * FROM gare ORDER BY data DESC', (err, rows) => {
    if (err) {
      console.error('Errore query gare:', err);
      res.status(500).json({ error: 'Errore interno del server' });
      return;
    }
    res.json(rows);
  });
});

app.get('/api/gare/:id', (req, res) => {
  const { id } = req.params;
  
  db.get('SELECT * FROM gare WHERE id = ?', [id], (err, row) => {
    if (err) {
      console.error('Errore query gara:', err);
      res.status(500).json({ error: 'Errore interno del server' });
      return;
    }
    
    if (!row) {
      res.status(404).json({ error: 'Gara non trovata' });
      return;
    }
    
    res.json(row);
  });
});

app.post('/api/duello', (req, res) => {
  const { atleta1_id, atleta2_id } = req.body;
  
  if (!atleta1_id || !atleta2_id) {
    res.status(400).json({ error: 'ID atleti richiesti' });
    return;
  }
  
  const query = `
    SELECT a1.nome as nome1, a1.cognome as cognome1, a1.punti_fis as punti1, a1.nazione as nazione1,
           a2.nome as nome2, a2.cognome as cognome2, a2.punti_fis as punti2, a2.nazione as nazione2
    FROM atleti a1, atleti a2 
    WHERE a1.id = ? AND a2.id = ?
  `;
  
  db.get(query, [atleta1_id, atleta2_id], (err, row) => {
    if (err) {
      console.error('Errore query duello:', err);
      res.status(500).json({ error: 'Errore interno del server' });
      return;
    }
    
    if (!row) {
      res.status(404).json({ error: 'Uno o entrambi gli atleti non trovati' });
      return;
    }
    
    const vincitore = row.punti1 < row.punti2 ? 1 : 2;
    
    res.json({
      atleta1: {
        nome: row.nome1,
        cognome: row.cognome1,
        punti_fis: row.punti1,
        nazione: row.nazione1
      },
      atleta2: {
        nome: row.nome2,
        cognome: row.cognome2,
        punti_fis: row.punti2,
        nazione: row.nazione2
      },
      vincitore
    });
  });
});

// Export per Netlify Functions
module.exports.handler = serverless(app);