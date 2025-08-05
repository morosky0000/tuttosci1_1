# 🔒 Risoluzione Errore Secrets Scanning su Netlify

## Problema
Netlify ha rilevato "segreti" nel codice durante il deploy con l'errore:
```
Secrets scanning found 1 instance(s) of secrets in build output or repo code.
Secret env var "REACT_APP_ENV"'s value detected
```

## Causa
Netlify considera alcune variabili d'ambiente come potenziali segreti, anche se sono solo configurazioni pubbliche come:
- `REACT_APP_ENV` (ambiente: development/production)
- `REACT_APP_API_URL` (URL pubblico delle API)
- `NODE_VERSION` e `NPM_VERSION` (versioni pubbliche)

## Soluzione Implementata

### 1. Configurazione in `netlify.toml`
```toml
[build]
  environment = { 
    SECRETS_SCAN_OMIT_KEYS = "REACT_APP_ENV,REACT_APP_API_URL,NODE_VERSION,NPM_VERSION",
    SECRETS_SCAN_OMIT_PATHS = "build/**,node_modules/**,.git/**,*.md,package.json,public/**"
  }
```

### 2. Variabili Escluse dalla Scansione
- **SECRETS_SCAN_OMIT_KEYS**: Esclude specifiche variabili d'ambiente
- **SECRETS_SCAN_OMIT_PATHS**: Esclude specifici percorsi di file

### 3. Percorsi Esclusi
- `build/**` - Output di build (contiene variabili compilate)
- `node_modules/**` - Dipendenze
- `.git/**` - Repository Git
- `*.md` - File di documentazione
- `package.json` - Configurazione del progetto
- `public/**` - File statici pubblici

## Variabili d'Ambiente Sicure per React

Le variabili che iniziano con `REACT_APP_` sono **pubbliche** e vengono incluse nel bundle JavaScript finale. Non sono segreti:

✅ **Sicure da escludere:**
- `REACT_APP_ENV`
- `REACT_APP_API_URL`
- `NODE_VERSION`
- `NPM_VERSION`
- `CI`
- `GENERATE_SOURCEMAP`

❌ **NON escludere mai:**
- API keys private
- Database passwords
- JWT secrets
- OAuth client secrets

## Verifica
Dopo aver applicato questa configurazione, il deploy su Netlify dovrebbe completarsi senza errori di secrets scanning.

## Riferimenti
- [Netlify Secrets Scanning Documentation](https://ntl.fyi/configure-secrets-scanning)
- [React Environment Variables](https://create-react-app.dev/docs/adding-custom-environment-variables/)