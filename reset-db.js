const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const path = require('path');

async function resetDatabase() {
  const DB_FILE = path.join(__dirname, 'atleti.db');
  
  try {
    console.log('🔗 Connessione al database...');
    const db = await open({
      filename: DB_FILE,
      driver: sqlite3.Database
    });

    console.log('🗑️ Svuotamento tabelle...');
    
    // Elimina tutti i dati dalle tabelle
    await db.run('DELETE FROM gare');
    await db.run('DELETE FROM atleti');
    
    // Reset degli autoincrement
    await db.run('DELETE FROM sqlite_sequence WHERE name IN ("gare", "atleti")');
    
    console.log('✅ Database svuotato con successo!');
    
    // Verifica che le tabelle siano vuote
    const atletiCount = await db.get('SELECT COUNT(*) as count FROM atleti');
    const gareCount = await db.get('SELECT COUNT(*) as count FROM gare');
    
    console.log(`📊 Atleti nel database: ${atletiCount.count}`);
    console.log(`📊 Gare nel database: ${gareCount.count}`);
    
    await db.close();
    console.log('🔒 Connessione al database chiusa.');
    
  } catch (error) {
    console.error('❌ Errore durante il reset del database:', error);
    process.exit(1);
  }
}

resetDatabase();