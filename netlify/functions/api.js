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
const dbPath = path.join(__dirname, 'database.db');
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
    query += ' AND nazionalita = ?';
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
    query += ' AND nome LIKE ?';
    params.push(`%${search}%`);
  }
  
  query += ' ORDER BY (COALESCE(punti_sl, 999) + COALESCE(punti_gs, 999) + COALESCE(punti_sg, 999) + COALESCE(punti_dh, 999) + COALESCE(punti_ac, 999)) / 5 ASC';
  
  db.all(query, params, (err, rows) => {
    if (err) {
      console.error('Errore query atleti:', err);
      res.status(500).json({ error: 'Errore interno del server' });
      return;
    }
    res.json(rows);
  });
});

// Endpoint per ranking atleti con paginazione
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

app.get('/api/atleti/:id', (req, res) => {
  const { id } = req.params;
  
  db.get('SELECT * FROM atleti WHERE fis_code = ?', [id], (err, row) => {
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
  db.all('SELECT DISTINCT nazionalita FROM atleti ORDER BY nazionalita', (err, rows) => {
    if (err) {
      console.error('Errore query nazioni:', err);
      res.status(500).json({ error: 'Errore interno del server' });
      return;
    }
    res.json(rows.map(row => row.nazionalita));
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
    SELECT a1.nome as nome1, 
           ROUND((COALESCE(a1.punti_sl, 999) + COALESCE(a1.punti_gs, 999) + COALESCE(a1.punti_sg, 999) + COALESCE(a1.punti_dh, 999) + COALESCE(a1.punti_ac, 999)) / 5, 2) as punti1, 
           a1.nazionalita as nazione1,
           a2.nome as nome2, 
           ROUND((COALESCE(a2.punti_sl, 999) + COALESCE(a2.punti_gs, 999) + COALESCE(a2.punti_sg, 999) + COALESCE(a2.punti_dh, 999) + COALESCE(a2.punti_ac, 999)) / 5, 2) as punti2, 
           a2.nazionalita as nazione2
    FROM atleti a1, atleti a2 
    WHERE a1.fis_code = ? AND a2.fis_code = ?
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
        punti_fis: row.punti1,
        nazione: row.nazione1
      },
      atleta2: {
        nome: row.nome2,
        punti_fis: row.punti2,
        nazione: row.nazione2
      },
      vincitore
    });
  });
});

// Export per Netlify Functions
module.exports.handler = serverless(app);