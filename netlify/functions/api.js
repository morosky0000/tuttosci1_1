const express = require('express');
const cors = require('cors');
const { neon } = require('@netlify/neon');
const bodyParser = require('body-parser');
const serverless = require('serverless-http');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database connection
const sql = neon(); // automatically uses env NETLIFY_DATABASE_URL

// Routes
app.get('/api/atleti', async (req, res) => {
  try {
    const { sesso, nazione, eta_min, eta_max, search } = req.query;
    
    let whereConditions = [];
    let params = [];
    
    if (sesso && sesso !== 'tutti') {
      whereConditions.push('sesso = $' + (params.length + 1));
      params.push(sesso);
    }
    
    if (nazione && nazione !== 'tutte') {
      whereConditions.push('nazionalita = $' + (params.length + 1));
      params.push(nazione);
    }
    
    if (eta_min) {
      whereConditions.push('eta >= $' + (params.length + 1));
      params.push(parseInt(eta_min));
    }
    
    if (eta_max) {
      whereConditions.push('eta <= $' + (params.length + 1));
      params.push(parseInt(eta_max));
    }
    
    if (search) {
      whereConditions.push('nome ILIKE $' + (params.length + 1));
      params.push(`%${search}%`);
    }
    
    let queryString = 'SELECT * FROM atleti';
    if (whereConditions.length > 0) {
      queryString += ' WHERE ' + whereConditions.join(' AND ');
    }
    queryString += ' ORDER BY (COALESCE(punti_sl, 999) + COALESCE(punti_gs, 999) + COALESCE(punti_sg, 999) + COALESCE(punti_dh, 999) + COALESCE(punti_ac, 999)) / 5 ASC';
    
    const rows = await sql(queryString, params);
    res.json(rows);
  } catch (err) {
    console.error('Errore query atleti:', err);
    res.status(500).json({ error: 'Errore interno del server' });
  }
});

// Endpoint per ranking atleti con paginazione
app.get('/api/atleti/ranking', async (req, res) => {
  try {
    const { page = 1, limit = 20, sesso } = req.query;
    const offset = (page - 1) * limit;
    
    let whereConditions = [];
    let params = [];
    
    if (sesso && sesso !== 'tutti') {
      whereConditions.push('sesso = $' + (params.length + 1));
      params.push(sesso);
    }
    
    let queryString = `
      SELECT *, 
      ROUND((COALESCE(punti_sl, 999) + COALESCE(punti_gs, 999) + COALESCE(punti_sg, 999) + COALESCE(punti_dh, 999) + COALESCE(punti_ac, 999)) / 5, 2) as punti_fis
      FROM atleti
    `;
    
    if (whereConditions.length > 0) {
      queryString += ' WHERE ' + whereConditions.join(' AND ');
    }
    
    queryString += ' ORDER BY punti_fis ASC LIMIT $' + (params.length + 1) + ' OFFSET $' + (params.length + 2);
    params.push(parseInt(limit), parseInt(offset));
    
    const rows = await sql(queryString, params);
    res.json(rows);
  } catch (err) {
    console.error('Errore query ranking:', err);
    res.status(500).json({ error: 'Errore interno del server' });
  }
});

app.get('/api/atleti/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const rows = await sql`SELECT * FROM atleti WHERE fis_code = ${id}`;
    
    if (rows.length === 0) {
      res.status(404).json({ error: 'Atleta non trovato' });
      return;
    }
    
    res.json(rows[0]);
  } catch (err) {
    console.error('Errore query atleta:', err);
    res.status(500).json({ error: 'Errore interno del server' });
  }
});

app.get('/api/nazioni', async (req, res) => {
  try {
    const rows = await sql`SELECT DISTINCT nazionalita FROM atleti ORDER BY nazionalita`;
    res.json(rows.map(row => row.nazionalita));
  } catch (err) {
    console.error('Errore query nazioni:', err);
    res.status(500).json({ error: 'Errore interno del server' });
  }
});

app.get('/api/gare', async (req, res) => {
  try {
    const rows = await sql`SELECT * FROM gare ORDER BY data DESC`;
    res.json(rows);
  } catch (err) {
    console.error('Errore query gare:', err);
    res.status(500).json({ error: 'Errore interno del server' });
  }
});

app.get('/api/gare/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const rows = await sql`SELECT * FROM gare WHERE id = ${id}`;
    
    if (rows.length === 0) {
      res.status(404).json({ error: 'Gara non trovata' });
      return;
    }
    
    res.json(rows[0]);
  } catch (err) {
    console.error('Errore query gara:', err);
    res.status(500).json({ error: 'Errore interno del server' });
  }
});

app.post('/api/duello', async (req, res) => {
  try {
    const { atleta1_id, atleta2_id } = req.body;
    
    if (!atleta1_id || !atleta2_id) {
      res.status(400).json({ error: 'ID atleti richiesti' });
      return;
    }
    
    const rows = await sql`
      SELECT a1.nome as nome1, 
             ROUND((COALESCE(a1.punti_sl, 999) + COALESCE(a1.punti_gs, 999) + COALESCE(a1.punti_sg, 999) + COALESCE(a1.punti_dh, 999) + COALESCE(a1.punti_ac, 999)) / 5, 2) as punti1, 
             a1.nazionalita as nazione1,
             a2.nome as nome2, 
             ROUND((COALESCE(a2.punti_sl, 999) + COALESCE(a2.punti_gs, 999) + COALESCE(a2.punti_sg, 999) + COALESCE(a2.punti_dh, 999) + COALESCE(a2.punti_ac, 999)) / 5, 2) as punti2, 
             a2.nazionalita as nazione2
      FROM atleti a1, atleti a2 
      WHERE a1.fis_code = ${atleta1_id} AND a2.fis_code = ${atleta2_id}
    `;
    
    if (rows.length === 0) {
      res.status(404).json({ error: 'Uno o entrambi gli atleti non trovati' });
      return;
    }
    
    const row = rows[0];
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
  } catch (err) {
    console.error('Errore query duello:', err);
    res.status(500).json({ error: 'Errore interno del server' });
  }
});

// Export per Netlify Functions
module.exports.handler = serverless(app);