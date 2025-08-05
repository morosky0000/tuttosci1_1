require('dotenv').config();
const sqlite3 = require('sqlite3').verbose();
const { neon } = require('@netlify/neon');

// Initialize Neon connection
const sql = neon(process.env.NETLIFY_DATABASE_URL);

// SQLite database
const db = new sqlite3.Database('./database.db');

async function migrateData() {
  try {
    console.log('🚀 Starting migration to Netlify DB...');
    
    // Create tables in PostgreSQL
    console.log('📋 Creating tables...');
    
    // Create atleti table
    await sql`
      CREATE TABLE IF NOT EXISTS atleti (
        fis_code VARCHAR(20) PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        eta INTEGER,
        sesso VARCHAR(1),
        club VARCHAR(255),
        nazionalita VARCHAR(10),
        nazione_completa VARCHAR(255),
        punti_sl DECIMAL(10,2),
        punti_gs DECIMAL(10,2),
        punti_sg DECIMAL(10,2),
        punti_dh DECIMAL(10,2),
        punti_ac DECIMAL(10,2)
      )
    `;
    
    // Create indexes
    await sql`CREATE INDEX IF NOT EXISTS idx_atleti_nome ON atleti(nome)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_atleti_nazionalita ON atleti(nazionalita)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_atleti_sesso ON atleti(sesso)`;
    
    // Create gare table
    await sql`
      CREATE TABLE IF NOT EXISTS gare (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        data DATE,
        luogo VARCHAR(255),
        disciplina VARCHAR(50),
        sesso VARCHAR(1)
      )
    `;
    
    console.log('✅ Tables created successfully');
    
    // Migrate atleti data
    console.log('📊 Migrating atleti data...');
    
    const atleti = await new Promise((resolve, reject) => {
      db.all('SELECT * FROM atleti', (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
    
    console.log(`Found ${atleti.length} athletes to migrate`);
    
    // Insert atleti in batches
    const batchSize = 100;
    for (let i = 0; i < atleti.length; i += batchSize) {
      const batch = atleti.slice(i, i + batchSize);
      
      for (const atleta of batch) {
        await sql`
          INSERT INTO atleti (
            fis_code, nome, eta, sesso, club, nazionalita, nazione_completa,
            punti_sl, punti_gs, punti_sg, punti_dh, punti_ac
          ) VALUES (
            ${atleta.fis_code}, ${atleta.nome}, ${atleta.eta}, ${atleta.sesso},
            ${atleta.club}, ${atleta.nazionalita}, ${atleta.nazione_completa},
            ${atleta.punti_sl}, ${atleta.punti_gs}, ${atleta.punti_sg},
            ${atleta.punti_dh}, ${atleta.punti_ac}
          )
          ON CONFLICT (fis_code) DO UPDATE SET
            nome = EXCLUDED.nome,
            eta = EXCLUDED.eta,
            sesso = EXCLUDED.sesso,
            club = EXCLUDED.club,
            nazionalita = EXCLUDED.nazionalita,
            nazione_completa = EXCLUDED.nazione_completa,
            punti_sl = EXCLUDED.punti_sl,
            punti_gs = EXCLUDED.punti_gs,
            punti_sg = EXCLUDED.punti_sg,
            punti_dh = EXCLUDED.punti_dh,
            punti_ac = EXCLUDED.punti_ac
        `;
      }
      
      console.log(`Migrated batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(atleti.length/batchSize)}`);
    }
    
    // Migrate gare data if exists
    console.log('🏁 Migrating gare data...');
    
    const gare = await new Promise((resolve, reject) => {
      db.all('SELECT * FROM gare', (err, rows) => {
        if (err && !err.message.includes('no such table')) reject(err);
        else resolve(rows || []);
      });
    });
    
    console.log(`Found ${gare.length} races to migrate`);
    
    for (const gara of gare) {
      await sql`
        INSERT INTO gare (nome, data, luogo, disciplina, sesso)
        VALUES (${gara.nome}, ${gara.data}, ${gara.luogo}, ${gara.disciplina}, ${gara.sesso})
      `;
    }
    
    console.log('✅ Migration completed successfully!');
    console.log('📊 Summary:');
    console.log(`   - Athletes migrated: ${atleti.length}`);
    console.log(`   - Races migrated: ${gare.length}`);
    
    // Verify migration
    const count = await sql`SELECT COUNT(*) as count FROM atleti`;
    console.log(`   - Athletes in Neon DB: ${count[0].count}`);
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  } finally {
    db.close();
  }
}

// Run migration
if (require.main === module) {
  migrateData();
}

module.exports = { migrateData };