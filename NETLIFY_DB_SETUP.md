# Configurazione Database Netlify

## Passi per completare la migrazione a Netlify DB

### 1. Configurare le variabili d'ambiente su Netlify

**IMPORTANTE**: Le API restituiscono 404 perché le variabili d'ambiente non sono configurate su Netlify.

1. Vai alla dashboard di Netlify: https://app.netlify.com
2. Seleziona il tuo sito `tuttosci1-1`
3. Vai su **Site settings** > **Environment variables**
4. Aggiungi le seguenti variabili d'ambiente dal tuo database `wandering-mode-91096485`:
   - `NETLIFY_DATABASE_URL`: [Copia l'URL dal pannello Netlify DB]
   - `NETLIFY_DATABASE_URL_UNPOOLED`: [Copia l'URL unpooled dal pannello Netlify DB]

5. **Dopo aver aggiunto le variabili, fai un nuovo deploy**:
   - Vai su **Deploys** > **Trigger deploy** > **Deploy site**

### 2. Testare la connessione e migrare i dati

Una volta configurate le variabili d'ambiente:

1. **Aggiorna il file `.env` locale** con i tuoi URL reali del database:
   ```bash
   # Sostituisci 'your_password' con la password reale dal pannello Netlify DB
   NETLIFY_DATABASE_URL=postgresql://neondb_owner:your_password@ep-wandering-mode-91096485.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```

2. **Testa la connessione**:
   ```bash
   node test-neon-connection.js
   ```

3. **Esegui la migrazione** (solo se il test di connessione è riuscito):
   ```bash
   node migrate-to-neon.js
   ```

### 3. Verificare il funzionamento

Dopo il deploy, testa gli endpoint:
- https://tuttosci1-1.netlify.app/api/nazioni
- https://tuttosci1-1.netlify.app/api/atleti/ranking?page=1&limit=5&sesso=M

## Modifiche apportate

✅ **API migrata da SQLite a PostgreSQL**
- Sostituito `sqlite3` con `@netlify/neon`
- Convertiti tutti gli endpoint per utilizzare async/await
- Aggiornate le query per la sintassi PostgreSQL

✅ **Dipendenze aggiornate**
- Aggiunto `@netlify/neon` al package.json delle funzioni
- Rimosso `sqlite3` dalle dipendenze

✅ **Script di migrazione creato**
- `migrate-to-neon.js` per trasferire i dati da SQLite a PostgreSQL
- Creazione automatica delle tabelle e degli indici
- Migrazione in batch per prestazioni ottimali

## Vantaggi della migrazione

🚀 **Prestazioni migliorate**: Database cloud scalabile
📊 **Gestione semplificata**: Backup automatici e gestione integrata
🔒 **Sicurezza**: Connessioni SSL e gestione delle credenziali
⚡ **Scalabilità**: Supporto per carichi di lavoro crescenti

## Note importanti

- Il database temporaneo scade il 12/08/2025
- Collega il tuo account Neon per mantenerlo attivo
- Le variabili d'ambiente sono gestite automaticamente da Netlify