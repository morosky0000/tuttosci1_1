# 🚀 Guida Deploy Netlify - Progetto Ranking Atleti

## 📋 Situazione Attuale

✅ **Progetto completamente migrato a PostgreSQL**
- API convertite da SQLite a `@netlify/neon`
- Database Neon configurato e popolato (5 atleti)
- Funzioni Netlify pronte per il deploy

## 🔧 Problema Autenticazione GitHub

❌ **Errore**: `Permission denied to morosky0000/ranking.git`

**Soluzioni possibili:**

### Opzione 1: Autenticazione GitHub CLI
```bash
# Installa GitHub CLI se non presente
brew install gh

# Autenticati
gh auth login

# Poi riprova il push
git push -u origin main
```

### Opzione 2: Token di accesso personale
1. Vai su GitHub → Settings → Developer settings → Personal access tokens
2. Genera un nuovo token con permessi `repo`
3. Usa il token come password quando richiesto

### Opzione 3: Deploy diretto da Netlify (CONSIGLIATO)

## 🎯 DEPLOY NETLIFY - PROCEDURA COMPLETA

### Passo 1: Carica il progetto su GitHub

**Se hai problemi con il push, puoi:**
1. Creare un nuovo repository su GitHub
2. Fare upload manuale dei file
3. Oppure risolvere l'autenticazione e riprovare il push

### Passo 2: Connetti Netlify a GitHub

1. Vai su **https://app.netlify.com**
2. Clicca **"Add new site"** → **"Import an existing project"**
3. Scegli **"Deploy with GitHub"**
4. Autorizza Netlify ad accedere ai tuoi repository
5. Seleziona il repository `morosky0000/ranking`

### Passo 3: Configurazione Build

**Impostazioni build:**
```
Build command: npm run build
Publish directory: build
Functions directory: netlify/functions
```

### Passo 4: Variabili d'Ambiente (CRITICO)

**Vai su Site settings → Environment variables e aggiungi:**

```
NETLIFY_DATABASE_URL=postgresql://neondb_owner:npg_ypIMbTBO9ER2@ep-dark-river-aeucmghw-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require

NETLIFY_DATABASE_URL_UNPOOLED=postgresql://neondb_owner:npg_ypIMbTBO9ER2@ep-dark-river-aeucmghw-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

### Passo 5: Deploy

1. Clicca **"Deploy site"**
2. Attendi il completamento del build
3. Il sito sarà disponibile su un URL tipo `https://amazing-name-123456.netlify.app`

## 🧪 Test Post-Deploy

**Testa questi endpoint:**

```bash
# Sostituisci YOUR-SITE-URL con l'URL del tuo sito
curl https://YOUR-SITE-URL.netlify.app/api/nazioni

curl "https://YOUR-SITE-URL.netlify.app/api/atleti/ranking?page=1&limit=5&sesso=M"

curl https://YOUR-SITE-URL.netlify.app/api/atleti/123456
```

## 📊 Struttura Progetto

```
ranking_atleti_progetto/
├── netlify/
│   └── functions/
│       ├── api.js          # ✅ API PostgreSQL
│       └── package.json    # ✅ Dipendenze @netlify/neon
├── src/                    # ✅ Frontend React
├── public/                 # ✅ File statici
├── netlify.toml           # ✅ Configurazione Netlify
├── package.json           # ✅ Build configuration
└── migrate-to-neon.js     # ✅ Script migrazione (già eseguito)
```

## 🔍 Troubleshooting

**Se l'API restituisce 404:**
- ✅ Verifica che le variabili d'ambiente siano configurate
- ✅ Controlla i logs del deploy su Netlify
- ✅ Assicurati che `netlify.toml` sia presente

**Se il database non risponde:**
- ✅ Verifica le credenziali Neon
- ✅ Controlla che il database sia attivo
- ✅ Testa la connessione locale con `node test-neon-connection.js`

## 🎉 Risultato Finale

Una volta completato il deploy:
- ✅ Sito React funzionante
- ✅ API PostgreSQL operative
- ✅ Database Neon con 5 atleti
- ✅ Funzioni serverless scalabili

---

**Il progetto è pronto per il deploy! Segui i passi sopra per pubblicarlo su Netlify.** 🚀