# 🚀 Deploy su Netlify - AtletiRanking

## 📋 Configurazioni Netlify

Quando fai il deploy su Netlify, usa queste impostazioni:

### Build Settings
```
Branch to deploy: main
Base directory: .
Build command: npm run build
Publish directory: build
Functions directory: netlify/functions
```

### Environment Variables

**Opzione 1: Importa file .env**
1. Vai su Netlify Dashboard → Site settings → Environment variables
2. Clicca "Import from a .env file"
3. Carica il file `.env.production` dal progetto

**Opzione 2: Aggiungi manualmente**
Aggiungi queste variabili nel pannello Netlify:
```
REACT_APP_API_URL=/.netlify/functions/api
REACT_APP_ENV=production
GENERATE_SOURCEMAP=false
CI=false
NODE_VERSION=18
NPM_VERSION=9
```

## 🔧 File Configurati

✅ **netlify.toml** - Configurazione build e redirect
✅ **.env.production** - Variabili ambiente produzione
✅ **.env.example** - Template variabili ambiente
✅ **netlify/functions/api.js** - Backend serverless
✅ **src/config/api.ts** - Gestione URL API dinamici
✅ **database.db** - Copiato in netlify/functions/

## 📦 Dipendenze Aggiunte

- `serverless-http` - Per convertire Express in Netlify Function

## 🌐 Funzionalità

### Frontend (React)
- ✅ Build ottimizzato per produzione
- ✅ Routing SPA con redirect
- ✅ API dinamiche (localhost in dev, Netlify Functions in prod)
- ✅ Headers di sicurezza
- ✅ Cache ottimizzata per file statici

### Backend (Netlify Functions)
- ✅ API Express convertita in serverless
- ✅ Database SQLite incluso
- ✅ Tutti gli endpoint funzionanti:
  - `GET /.netlify/functions/api/atleti`
  - `GET /.netlify/functions/api/atleti/:id`
  - `GET /.netlify/functions/api/nazioni`
  - `GET /.netlify/functions/api/gare`
  - `GET /.netlify/functions/api/gare/:id`
  - `POST /.netlify/functions/api/duello`

## 🚀 Passi per il Deploy

1. **Commit e Push** del codice su GitHub
2. **Connetti repository** su Netlify
3. **Configura build settings** come sopra
4. **Aggiungi environment variables**
5. **⚠️ IMPORTANTE: Database Setup**
   - I file `database.db` sono esclusi da Git (troppo grandi per GitHub)
   - Prima del deploy, copia manualmente `database.db` in `netlify/functions/`
   - Oppure ricrea il database usando `node reset-db.js`
6. **Deploy!**

## 🔍 Troubleshooting

### Errore Secrets Scanning
Se il deploy fallisce con "Secrets scanning found secrets in build":
- Il file `netlify.toml` è già configurato per escludere le variabili non sensibili
- Le variabili `REACT_APP_ENV`, `REACT_APP_API_URL`, `NODE_VERSION`, `NPM_VERSION` sono escluse dalla scansione
- I percorsi `build/**`, `node_modules/**`, `*.md`, `package.json`, `public/**` sono esclusi

### Se il database non funziona:
- Verifica che `database.db` sia in `netlify/functions/`
- Controlla i logs delle Functions su Netlify

### Se le API non rispondono:
- Verifica che `REACT_APP_API_URL` sia impostato correttamente
- Controlla che le Functions siano deployate

### Se il routing non funziona:
- Verifica che `netlify.toml` contenga i redirect SPA

## 📱 Test Locale

Per testare in locale con configurazione produzione:
```bash
# Build produzione
npm run build

# Serve build locale
npx serve -s build
```

## 🎯 URL Finali

- **Frontend**: `https://your-app-name.netlify.app`
- **API**: `https://your-app-name.netlify.app/.netlify/functions/api`

---

**Il tuo progetto è ora pronto per il deploy su Netlify! 🎉**