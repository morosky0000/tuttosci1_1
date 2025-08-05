# 🤖 PROMPT PER AI - SVILUPPO ATLETIRANKING

## 📋 CONTESTO E OBIETTIVO

Sei un AI developer esperto incaricato di sviluppare **AtletiRanking**, una piattaforma web enterprise-grade per la gestione e analisi di dati di atleti di sci alpino. Il sistema deve essere completo, scalabile e pronto per la produzione.

### 🎯 MISSIONE PRINCIPALE
Creare un'applicazione full-stack moderna che permetta di:
- Gestire database di atleti e gare di sci alpino
- Visualizzare classifiche dinamiche con filtri avanzati
- Analizzare performance individuali e confronti tra atleti
- Integrare dati da fonti esterne (FIS, n8n)
- Fornire un'interfaccia utente moderna e responsive

### 🛠️ STACK TECNOLOGICO RICHIESTO
- **Frontend**: React 19+ con TypeScript, CSS moderno, responsive design
- **Backend**: Node.js con Express, API RESTful
- **Database**: SQLite con schema ottimizzato
- **Integrazione**: Endpoint per n8n e parsing dati FIS

## ✅ CHECKLIST SVILUPPO - SEGNA [x] QUANDO COMPLETATO

### 🏗️ FASE 1: SETUP E ARCHITETTURA
- [ ] Inizializzazione progetto React con TypeScript
- [ ] Setup server Express con configurazione CORS
- [ ] Creazione schema database SQLite con tabelle ottimizzate
- [ ] Configurazione struttura cartelle e file di progetto
- [ ] Setup script di sviluppo e build

### 🗄️ FASE 2: DATABASE E API
- [ ] Implementazione tabelle database (atleti, gare, gare_complete)
- [ ] Creazione indici e constraint per performance
- [ ] Sviluppo API endpoints RESTful completi
- [ ] Implementazione middleware per validazione dati
- [ ] Sistema di gestione errori e logging
- [ ] Endpoint per integrazione n8n
- [ ] Sistema di backup e recovery database

### 🎨 FASE 3: FRONTEND - COMPONENTI BASE
- [ ] Componente App.tsx con routing e layout principale
- [ ] Componente Ranking.tsx per classifiche con filtri
- [ ] Componente AthleteProfile.tsx per profili atleti
- [ ] Componente RaceList.tsx per lista gare
- [ ] Componente RaceDetail.tsx per dettagli gara
- [ ] Componente Duel.tsx per confronti atleti
- [ ] Sistema di navigazione e breadcrumb

### 🎯 FASE 4: FUNZIONALITÀ AVANZATE
- [ ] Sistema di ricerca avanzata con filtri multipli
- [ ] Paginazione intelligente per grandi dataset
- [ ] Ordinamento dinamico per tutte le colonne
- [ ] Sistema di cache per ottimizzazione performance
- [ ] Gestione stati di caricamento e errori
- [ ] Implementazione lazy loading per componenti

### 📊 FASE 5: VISUALIZZAZIONE DATI
- [ ] Tabelle responsive con sorting e filtering
- [ ] Sistema di colorazione per posizioni e performance
- [ ] Grafici per analisi trend performance
- [ ] Dashboard con statistiche aggregate
- [ ] Export dati in formati CSV/JSON
- [ ] Stampa ottimizzata per report

### 🔧 FASE 6: INTEGRAZIONE E AUTOMAZIONE
- [ ] Parser per dati FIS (HTML/JSON)
- [ ] Endpoint per ricezione dati da n8n
- [ ] Validazione e sanitizzazione input esterni
- [ ] Sistema di notifiche per aggiornamenti
- [ ] Monitoraggio integrità dati
- [ ] Log audit per modifiche database

### 🎨 FASE 7: UX/UI E DESIGN
- [ ] Design system con palette colori coerente
- [ ] Responsive design per mobile/tablet/desktop
- [ ] Implementazione dark mode
- [ ] Animazioni e micro-interazioni
- [ ] Accessibilità WCAG 2.1 AA
- [ ] Loading states e skeleton screens
- [ ] Error boundaries e fallback UI

### ⚡ FASE 8: PERFORMANCE E OTTIMIZZAZIONE
- [ ] Code splitting e lazy loading
- [ ] Ottimizzazione bundle size
- [ ] Implementazione Service Worker per caching
- [ ] Ottimizzazione query database
- [ ] Compressione risorse statiche
- [ ] Monitoring performance e Core Web Vitals

### 🔒 FASE 9: SICUREZZA E VALIDAZIONE
- [ ] Validazione input lato client e server
- [ ] Sanitizzazione dati per prevenire XSS
- [ ] Rate limiting per API endpoints
- [ ] Gestione sicura delle sessioni
- [ ] Audit log per operazioni critiche
- [ ] Backup automatici database

### 🚀 FASE 10: DEPLOY E PRODUZIONE
- [ ] Configurazione ambiente di produzione
- [ ] Setup CI/CD pipeline
- [ ] Configurazione variabili ambiente
- [ ] Testing end-to-end
- [ ] Documentazione API completa
- [ ] Guida utente e amministratore
- [ ] Monitoraggio e alerting

### 📚 FASE 11: DOCUMENTAZIONE E TESTING
- [ ] Unit test per componenti React
- [ ] Integration test per API endpoints
- [ ] Test di performance e load testing
- [ ] Documentazione tecnica completa
- [ ] Guide di installazione e configurazione
- [ ] Esempi di utilizzo API

### 🔮 FASE 12: FUNZIONALITÀ FUTURE
- [ ] PWA (Progressive Web App) capabilities
- [ ] Notifiche push per aggiornamenti
- [ ] API GraphQL per query complesse
- [ ] Integrazione machine learning per predizioni
- [ ] Sistema di commenti e annotazioni
- [ ] Multi-tenancy per diverse organizzazioni

## 🎯 PRIORITÀ DI SVILUPPO

### 🔥 ALTA PRIORITÀ (MVP)
1. Setup base progetto e database
2. API endpoints fondamentali
3. Componenti React base (Ranking, AthleteProfile)
4. Integrazione dati e visualizzazione

### 🟡 MEDIA PRIORITÀ
1. Funzionalità avanzate di ricerca e filtri
2. Ottimizzazioni performance
3. UX/UI migliorata
4. Sistema di integrazione completo

### 🟢 BASSA PRIORITÀ
1. Funzionalità future e sperimentali
2. Integrazioni avanzate
3. Analytics e reporting avanzati

## 📝 ISTRUZIONI OPERATIVE

1. **Lavora in modo incrementale**: Completa una fase alla volta
2. **Testa continuamente**: Ogni funzionalità deve essere testata prima di passare alla successiva
3. **Documenta il codice**: Commenti chiari e documentazione aggiornata
4. **Segui le best practices**: Codice pulito, modulare e manutenibile
5. **Aggiorna la checklist**: Segna [x] per ogni task completato
6. **Comunica i progressi**: Riporta problemi e soluzioni implementate

---

# 📊 AtletiRanking - Documentazione Tecnica Approfondita

## 🎯 Panoramica Generale

AtletiRanking è una piattaforma web enterprise-grade per la gestione completa e l'analisi avanzata di dati relativi agli atleti di sci alpino. Il sistema implementa un'architettura full-stack moderna che permette di:

- **Tracciare Performance**: Monitoraggio dettagliato delle prestazioni atletiche con storico completo
- **Gestire Classifiche**: Sistema di ranking dinamico con filtri multi-criterio avanzati
- **Analizzare Gare**: Visualizzazione dettagliata dei risultati con sistema di colorazione intelligente
- **Confrontare Atleti**: Engine di confronto diretto con analisi statistiche approfondite
- **Integrare Dati FIS**: Connessione diretta con database ufficiali FIS (Fédération Internationale de Ski)

### 🏆 Caratteristiche Distintive

1. **Real-time Data Processing**: Elaborazione in tempo reale di grandi volumi di dati gara
2. **Advanced Analytics**: Algoritmi di analisi statistica per confronti e predizioni
3. **Responsive Design**: Interfaccia ottimizzata per tutti i dispositivi
4. **Scalable Architecture**: Architettura progettata per gestire migliaia di atleti e gare
5. **Data Integrity**: Sistema robusto di validazione e controllo integrità dati

## 🏗️ Architettura del Sistema

### 1. **Stack Tecnologico Dettagliato**

#### 1.1 **Frontend Layer**
   - **React 19.1.0**: Framework principale con Concurrent Features e Automatic Batching
   - **TypeScript 4.9.5**: Type safety completo con strict mode abilitato
   - **React Router DOM 6.22.0**: Routing client-side con lazy loading e code splitting
   - **CSS Modules**: Styling modulare con CSS personalizzato e variabili CSS native
   - **Web Vitals 2.1.4**: Monitoraggio performance e Core Web Vitals
   - **Testing Library**: Suite completa per unit e integration testing

#### 1.2 **Backend Layer**
   - **Node.js**: Runtime JavaScript con Event Loop ottimizzato
   - **Express 5.1.0**: Framework web con middleware personalizzati
   - **SQLite 3**: Database embedded con WAL mode per performance
   - **sqlite3 5.1.7**: Driver nativo con prepared statements
   - **CORS 2.8.5**: Cross-Origin Resource Sharing configurato
   - **Body Parser**: Parsing JSON con limite 50MB per bulk operations

#### 1.3 **Development Tools**
   - **React Scripts 5.0.1**: Build system con Webpack 5 e Babel
   - **ESLint**: Linting con regole React e TypeScript
   - **Jest**: Framework di testing con coverage reporting
   - **npm**: Package manager con lock file per riproducibilità

### 2. **Architettura a Microservizi**

#### 2.1 **Separazione delle Responsabilità**
   ```
   ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
   │   Frontend      │    │   Backend API   │    │   Database      │
   │   (React)       │◄──►│   (Express)     │◄──►│   (SQLite)      │
   │   Port: 3000    │    │   Port: 3001    │    │   File: .db     │
   └─────────────────┘    └─────────────────┘    └─────────────────┘
   ```

#### 2.2 **Comunicazione Inter-Service**
   - **HTTP/REST**: Comunicazione sincrona con JSON payload
   - **CORS Policy**: Configurazione sicura per cross-origin requests
   - **Error Handling**: Propagazione errori strutturata con status codes
   - **Request Validation**: Validazione input su entrambi i layer

### 3. **Struttura del Progetto Dettagliata**
   ```
   atletiranking/
   ├── src/                           # Codice sorgente React
   │   ├── components/                # Componenti riutilizzabili
   │   │   ├── App.tsx               # Componente principale con routing
   │   │   ├── AthleteProfile.tsx    # Profilo atleta con gare
   │   │   ├── Ranking.tsx           # Classifiche con filtri
   │   │   ├── RaceList.tsx          # Lista gare
   │   │   ├── RaceDetail.tsx        # Dettaglio singola gara
   │   │   └── Duel.tsx              # Confronto atleti
   │   ├── styles/
   │   │   ├── App.css               # Stili globali e componenti
   │   │   └── index.css             # Reset CSS e variabili
   │   ├── types/                    # Definizioni TypeScript
   │   ├── utils/                    # Utility functions
   │   ├── hooks/                    # Custom React hooks
   │   └── index.tsx                 # Entry point applicazione
   ├── public/                       # Asset statici
   │   ├── index.html               # Template HTML
   │   ├── manifest.json            # PWA manifest
   │   └── favicon.ico              # Icona sito
   ├── server.js                     # Server backend Express
   ├── database.db                   # Database SQLite principale
   ├── reset-db.js                   # Script reset database
   ├── package.json                  # Dipendenze e script npm
   ├── package-lock.json             # Lock file dipendenze
   ├── tsconfig.json                 # Configurazione TypeScript
   ├── API_DOCUMENTATION.md          # Documentazione API endpoints
   └── README.md                     # Documentazione progetto
   ```

### 4. **Configurazione di Rete e Porte**

#### 4.1 **Servizi Principali**
   - **Frontend React**: `http://localhost:3000`
     - Hot reload abilitato per development
     - Proxy automatico verso backend per API calls
     - Service Worker per caching (production)
   
   - **Backend API**: `http://localhost:3001`
     - RESTful endpoints con versioning
     - Rate limiting configurabile
     - Logging strutturato delle richieste

#### 4.2 **Configurazione CORS**
   ```javascript
   const corsOptions = {
     origin: ['http://localhost:3000', 'http://localhost:3001'],
     methods: ['GET', 'POST', 'PUT', 'DELETE'],
     allowedHeaders: ['Content-Type', 'Authorization'],
     credentials: true
   };
   ```

### 5. **Patterns Architetturali Implementati**

#### 5.1 **Frontend Patterns**
   - **Component Composition**: Composizione di componenti riutilizzabili
   - **Render Props**: Pattern per condivisione logica tra componenti
   - **Custom Hooks**: Estrazione logica stateful in hooks riutilizzabili
   - **Error Boundaries**: Gestione errori a livello di componente
   - **Lazy Loading**: Caricamento differito di componenti pesanti

#### 5.2 **Backend Patterns**
   - **Repository Pattern**: Astrazione layer di accesso ai dati
   - **Middleware Chain**: Pipeline di elaborazione richieste
   - **Transaction Script**: Gestione transazioni database
   - **Data Transfer Objects**: Oggetti per trasferimento dati strutturati
   - **Error Handling Middleware**: Gestione centralizzata errori

### 6. **Scalabilità e Performance**

#### 6.1 **Frontend Optimizations**
   - **Code Splitting**: Bundle splitting automatico per route
   - **Tree Shaking**: Eliminazione codice non utilizzato
   - **Memoization**: React.memo e useMemo per ottimizzazioni
   - **Virtual Scrolling**: Per liste con molti elementi
   - **Image Optimization**: Lazy loading e formati ottimizzati

#### 6.2 **Backend Optimizations**
   - **Connection Pooling**: Pool di connessioni database
   - **Query Optimization**: Indici e query ottimizzate
   - **Caching Strategy**: Cache in-memory per dati frequenti
   - **Bulk Operations**: Operazioni batch per inserimenti multipli
   - **Compression**: Gzip compression per risposte HTTP

## 🗄️ Schema Database Avanzato

### 1. **Schemi di Input Dati**

#### 1.1 **Schema Gare Singole da n8n**
Quando n8n invia una singola gara, i dati devono seguire questo schema:

```json
{
  "specialty": "",
  "category": "",
  "athletes": [
    {
      "Rank": "",
      "Bib": "",
      "FIS code": "",
      "Athlete": "",
      "Year": "",
      "Nation": "",
      "Run 1": "",
      "Run 2": "",
      "Total Time": "",
      "Diff. Time": "",
      "FIS Points": "",
      "Cup Points": ""
    }
  ],
  "url": ""
}
```

**Note Importanti:**
- Ogni oggetto `athletes` rappresenta un singolo atleta nella gara
- Il campo `FIS code` è l'identificativo univoco dell'atleta
- I campi `Run 1`, `Run 2`, `Total Time` possono variare in base alla specialità
- `FIS Points` e `Cup Points` possono essere vuoti se non assegnati
- `fis_url` è l'URL della gara sul sito FIS

#### 1.2 **Schema Dati Atleti con Gare Multiple**
Quando si inviano dati di atleti con le loro gare, il formato è:

```json
[
  {
    "atleta": {
      "nome": "",
      "gruppo_sportivo": "",
      "nazione_short": "",
      "nazione_full": "",
      "fis_code": "",
      "sesso": "",
      "eta": 
    },
    "gare": [
      {
        "url": "",
        "data": "",
        "luogo": "",
        "nazione": "",
        "categoria": "",
        "specialita": "",
        "posizione": "",
        "punti_fis": "",
        "punti_coppa": ""
      }
    ]
  }
]
```

**Note Importanti:**
- L'array può contenere più atleti
- Ogni atleta ha un oggetto `atleta` con i dati anagrafici
- L'array `gare` contiene tutte le gare dell'atleta
- Il sistema deve processare tutte le gare nell'array `gare`
- `posizione` può essere numerica ("1", "2", etc.) o testuale ("DNF", "DSQ", "DNS")
- `punti_fis` e `punti_coppa` possono essere vuoti

### 2. **Tabella `atleti` - Entità Principale**

#### 1.1 **Struttura Completa**
   ```sql
   CREATE TABLE atleti (
     fis_code TEXT PRIMARY KEY NOT NULL,
     nome TEXT NOT NULL,
     eta INTEGER CHECK(eta > 0 AND eta < 100),
     sesso TEXT CHECK(sesso IN ('M', 'F')),
     club TEXT,
     nazionalita TEXT NOT NULL CHECK(length(nazionalita) = 3),
     nazione_completa TEXT,
     punti_sl REAL CHECK(punti_sl >= 0),
     punti_gs REAL CHECK(punti_gs >= 0),
     punti_sg REAL CHECK(punti_sg >= 0),
     punti_dh REAL CHECK(punti_dh >= 0),
     punti_ac REAL CHECK(punti_ac >= 0),
     data_creazione TEXT DEFAULT CURRENT_TIMESTAMP,
     data_aggiornamento TEXT DEFAULT CURRENT_TIMESTAMP
   );
   ```

#### 1.2 **Indici di Performance**
   ```sql
   CREATE INDEX idx_atleti_nome ON atleti(nome);
   CREATE INDEX idx_atleti_nazionalita ON atleti(nazionalita);
   CREATE INDEX idx_atleti_sesso ON atleti(sesso);
   CREATE INDEX idx_atleti_eta ON atleti(eta);
   CREATE INDEX idx_atleti_punti_composite ON atleti(punti_sl, punti_gs, punti_sg, punti_dh, punti_ac);
   ```

#### 1.3 **Constraint e Validazioni**
   - **Primary Key**: `fis_code` garantisce unicità atleta
   - **Check Constraints**: Validazione età (0-100), sesso (M/F), nazionalità (3 caratteri)
   - **Not Null**: Campi obbligatori per integrità dati
   - **Range Validation**: Punti FIS non negativi

#### 1.4 **Trigger di Aggiornamento**
   ```sql
   CREATE TRIGGER update_atleti_timestamp 
   AFTER UPDATE ON atleti
   BEGIN
     UPDATE atleti SET data_aggiornamento = CURRENT_TIMESTAMP 
     WHERE fis_code = NEW.fis_code;
   END;
   ```

### 2. **Tabella `gare` - Storico Performance**

#### 2.1 **Struttura Ottimizzata**
   ```sql
   CREATE TABLE gare (
     id INTEGER PRIMARY KEY AUTOINCREMENT,
     atleta_fis_code TEXT NOT NULL,
     url TEXT NOT NULL,
     data TEXT NOT NULL,
     luogo TEXT,
     nazione TEXT,
     categoria TEXT NOT NULL,
     specialita TEXT NOT NULL CHECK(specialita IN (
       'Slalom', 'Giant Slalom', 'Super-G', 'Downhill', 'Alpine Combined',
       'slalom', 'giant slalom', 'super-g', 'downhill', 'alpine combined'
     )),
     posizione TEXT NOT NULL,
     punti_fis TEXT,
     punti_coppa TEXT,
     data_inserimento TEXT DEFAULT CURRENT_TIMESTAMP,
     FOREIGN KEY (atleta_fis_code) REFERENCES atleti(fis_code) ON DELETE CASCADE
   );
   ```

#### 2.2 **Indici Specializzati**
   ```sql
   CREATE INDEX idx_gare_atleta ON gare(atleta_fis_code);
   CREATE INDEX idx_gare_data ON gare(data DESC);
   CREATE INDEX idx_gare_specialita ON gare(specialita);
   CREATE INDEX idx_gare_url ON gare(url);
   CREATE INDEX idx_gare_composite ON gare(atleta_fis_code, data, specialita);
   CREATE UNIQUE INDEX idx_gare_unique ON gare(atleta_fis_code, url, data);
   ```

#### 2.3 **Relazioni e Integrità**
   - **Foreign Key**: Collegamento con tabella atleti
   - **Cascade Delete**: Eliminazione automatica gare quando atleta viene rimosso
   - **Unique Constraint**: Prevenzione duplicati (atleta + URL + data)
   - **Speciality Validation**: Controllo specialità valide

### 3. **Tabella `gare_complete` - Dati Gara Aggregati**

#### 3.1 **Schema Avanzato**
   ```sql
   CREATE TABLE gare_complete (
     id INTEGER PRIMARY KEY AUTOINCREMENT,
     specialty TEXT NOT NULL,
     category TEXT NOT NULL,
     fis_url TEXT NOT NULL,
     data_gara TEXT,
     luogo TEXT,
     nazione TEXT,
     risultati TEXT NOT NULL CHECK(json_valid(risultati)),
     data_inserimento TEXT DEFAULT CURRENT_TIMESTAMP,
     hash_risultati TEXT GENERATED ALWAYS AS (
       hex(randomblob(16))
     ) STORED,
     numero_partecipanti INTEGER GENERATED ALWAYS AS (
       json_array_length(risultati)
     ) STORED
   );
   ```

#### 3.2 **Indici JSON e Full-Text**
   ```sql
   CREATE INDEX idx_gare_complete_specialty ON gare_complete(specialty);
   CREATE INDEX idx_gare_complete_category ON gare_complete(category);
   CREATE INDEX idx_gare_complete_url ON gare_complete(fis_url);
   CREATE INDEX idx_gare_complete_data ON gare_complete(data_gara DESC);
   CREATE UNIQUE INDEX idx_gare_complete_unique ON gare_complete(
     fis_url, specialty, category, hash_risultati
   );
   ```

#### 3.3 **Funzionalità JSON Avanzate**
   - **JSON Validation**: Controllo validità JSON per risultati
   - **Generated Columns**: Calcolo automatico numero partecipanti
   - **Hash Generation**: Hash univoco per rilevamento duplicati
   - **JSON Indexing**: Indici su campi JSON per query veloci

### 4. **Viste Database per Query Complesse**

#### 4.1 **Vista Atleti con Statistiche**
   ```sql
   CREATE VIEW v_atleti_stats AS
   SELECT 
     a.*,
     COUNT(g.id) as totale_gare,
     COUNT(CASE WHEN g.posizione = '1' THEN 1 END) as vittorie,
     COUNT(CASE WHEN g.posizione LIKE '%DNF%' OR g.posizione LIKE '%DSQ%' THEN 1 END) as dnf,
     AVG(CASE WHEN g.posizione GLOB '[0-9]*' THEN CAST(g.posizione AS INTEGER) END) as posizione_media,
     MIN(g.data) as prima_gara,
     MAX(g.data) as ultima_gara
   FROM atleti a
   LEFT JOIN gare g ON a.fis_code = g.atleta_fis_code
   GROUP BY a.fis_code;
   ```

#### 4.2 **Vista Ranking Dinamico**
   ```sql
   CREATE VIEW v_ranking_dinamico AS
   SELECT 
     fis_code,
     nome,
     nazionalita,
     sesso,
     CASE 
       WHEN punti_sl IS NOT NULL THEN punti_sl
       WHEN punti_gs IS NOT NULL THEN punti_gs
       WHEN punti_sg IS NOT NULL THEN punti_sg
       WHEN punti_dh IS NOT NULL THEN punti_dh
       WHEN punti_ac IS NOT NULL THEN punti_ac
       ELSE 999.99
     END as miglior_punteggio,
     ROW_NUMBER() OVER (
       PARTITION BY sesso 
       ORDER BY 
         CASE 
           WHEN punti_sl IS NOT NULL THEN punti_sl
           WHEN punti_gs IS NOT NULL THEN punti_gs
           WHEN punti_sg IS NOT NULL THEN punti_sg
           WHEN punti_dh IS NOT NULL THEN punti_dh
           WHEN punti_ac IS NOT NULL THEN punti_ac
           ELSE 999.99
         END ASC
     ) as ranking_posizione
   FROM atleti
   WHERE sesso IS NOT NULL;
   ```

### 5. **Stored Procedures e Funzioni**

#### 5.1 **Funzione Calcolo Età**
   ```sql
   CREATE TRIGGER calculate_age_from_year
   BEFORE INSERT ON atleti
   WHEN NEW.eta IS NULL AND NEW.anno_nascita IS NOT NULL
   BEGIN
     UPDATE atleti SET eta = (strftime('%Y', 'now') - NEW.anno_nascita)
     WHERE fis_code = NEW.fis_code;
   END;
   ```

#### 5.2 **Procedura Aggiornamento Ranking**
   ```sql
   CREATE TRIGGER update_ranking_cache
   AFTER UPDATE OF punti_sl, punti_gs, punti_sg, punti_dh, punti_ac ON atleti
   BEGIN
     -- Invalidate ranking cache
     UPDATE sistema_cache SET valido = 0 WHERE tipo = 'ranking';
   END;
   ```

### 6. **Ottimizzazioni Database**

#### 6.1 **Configurazione SQLite**
   ```sql
   PRAGMA journal_mode = WAL;           -- Write-Ahead Logging per performance
   PRAGMA synchronous = NORMAL;         -- Bilanciamento sicurezza/velocità
   PRAGMA cache_size = 10000;           -- Cache 10MB per query veloci
   PRAGMA temp_store = MEMORY;          -- Tabelle temporanee in RAM
   PRAGMA mmap_size = 268435456;        -- Memory mapping 256MB
   PRAGMA optimize;                     -- Ottimizzazione automatica
   ```

#### 6.2 **Strategie di Backup**
   ```sql
   -- Backup incrementale
   .backup backup_$(date +%Y%m%d_%H%M%S).db
   
   -- Vacuum periodico per ottimizzazione
   PRAGMA auto_vacuum = INCREMENTAL;
   PRAGMA incremental_vacuum(1000);
   ```

### 7. **Monitoring e Analytics**

#### 7.1 **Query Performance Tracking**
   ```sql
   CREATE TABLE query_performance (
     id INTEGER PRIMARY KEY AUTOINCREMENT,
     query_type TEXT NOT NULL,
     execution_time REAL NOT NULL,
     timestamp TEXT DEFAULT CURRENT_TIMESTAMP,
     rows_affected INTEGER
   );
   ```

#### 7.2 **Database Statistics**
   ```sql
   CREATE VIEW v_database_stats AS
   SELECT 
     'atleti' as tabella,
     COUNT(*) as record_count,
     AVG(length(nome)) as avg_nome_length
   FROM atleti
   UNION ALL
   SELECT 
     'gare' as tabella,
     COUNT(*) as record_count,
     AVG(length(specialita)) as avg_field_length
   FROM gare
   UNION ALL
   SELECT 
     'gare_complete' as tabella,
     COUNT(*) as record_count,
     AVG(numero_partecipanti) as avg_participants
   FROM gare_complete;
   ```

## 🌐 API Endpoints Avanzati

### 1. **Gestione Atleti - Endpoints Completi**

#### 1.1 `GET /api/atleti` - Lista Atleti Completa
   ```javascript
   // Request
   GET http://localhost:3001/api/atleti
   
   // Query Parameters (opzionali)
   ?page=1&limit=50&sort=nome&order=asc&filter[sesso]=M&filter[nazionalita]=ITA
   
   // Response Structure
   {
     "success": true,
     "data": [
       {
         "fis_code": "123456",
         "nome": "Mario Rossi",
         "eta": 25,
         "sesso": "M",
         "club": "SC Milano",
         "nazionalita": "ITA",
         "nazione_completa": "Italy",
         "punti_sl": 15.67,
         "punti_gs": 18.45,
         "punti_sg": null,
         "punti_dh": null,
         "punti_ac": null,
         "gare": [
           {
             "id": 1,
             "url": "https://www.fis-ski.com/DB/general/results.html?sectorcode=AL&raceid=12345",
             "data": "2024-01-15",
             "luogo": "Val d'Isère",
             "nazione": "FRA",
             "categoria": "World Cup",
             "specialita": "Slalom",
             "posizione": "5",
             "punti_fis": "15.67",
             "punti_coppa": "26"
           }
         ],
         "statistiche": {
           "totale_gare": 15,
           "vittorie": 2,
           "podi": 7,
           "dnf_count": 1,
           "posizione_media": 8.3,
           "miglior_risultato": 1,
           "specialita_principale": "Slalom"
         }
       }
     ],
     "pagination": {
       "current_page": 1,
       "total_pages": 3,
       "total_records": 150,
       "per_page": 50
     },
     "filters_applied": {
       "sesso": "M",
       "nazionalita": "ITA"
     }
   }
   ```

#### 1.2 `GET /api/atleti/:fis_code` - Profilo Atleta Dettagliato
   ```javascript
   // Request
   GET http://localhost:3001/api/atleti/123456
   
   // Response con analisi avanzate
   {
     "success": true,
     "data": {
       "atleta": {
         "fis_code": "123456",
         "nome": "Mario Rossi",
         // ... altri campi atleta
       },
       "gare_per_specialita": {
         "Slalom": [
           {
             "data": "2024-01-15",
             "luogo": "Val d'Isère",
             "posizione": "5",
             "punti_fis": "15.67",
             "trend": "miglioramento"
           }
         ],
         "Giant Slalom": [...]
       },
       "analisi_performance": {
         "trend_generale": "positivo",
         "specialita_migliore": "Slalom",
         "progressione_punti": {
           "slalom": {
             "punti_attuali": 15.67,
             "punti_precedenti": 18.23,
             "variazione": -2.56,
             "percentuale_miglioramento": 14.05
           }
         },
         "confronto_stagionale": {
           "gare_stagione_corrente": 8,
           "gare_stagione_precedente": 12,
           "media_posizioni_corrente": 7.2,
           "media_posizioni_precedente": 9.8
         }
       },
       "head_to_head": {
         "rivalita_principali": [
           {
             "avversario_fis_code": "789012",
             "nome_avversario": "Luca Bianchi",
             "scontri_diretti": 8,
             "vittorie": 5,
             "sconfitte": 3,
             "ultima_sfida": "2024-01-15"
           }
         ]
       }
     }
   }
   ```

#### 1.3 `POST /api/atleti/processa-gare` - Processamento Intelligente
   ```javascript
   // Request Body
   {
     "atleta": {
       "fis_code": "123456",
       "nome": "Mario Rossi",
       "eta": 25,
       "sesso": "M",
       "nazionalita": "ITA"
     },
     "gare": [
       {
         "url": "https://www.fis-ski.com/DB/general/results.html?sectorcode=AL&raceid=12345",
         "data": "2024-01-15",
         "luogo": "Val d'Isère",
         "specialita": "Slalom",
         "posizione": "5",
         "punti_fis": "15.67"
       }
     ],
     "options": {
       "force_update": false,
       "validate_fis_data": true,
       "calculate_trends": true,
       "update_rankings": true
     }
   }
   
   // Response con dettagli processamento
   {
     "success": true,
     "data": {
       "atleta_created": false,
       "atleta_updated": true,
       "gare_processed": {
         "total": 1,
         "inserted": 1,
         "duplicates": 0,
         "errors": 0
       },
       "punti_aggiornati": {
         "slalom": {
           "precedente": 18.23,
           "nuovo": 15.67,
           "miglioramento": true
         }
       },
       "ranking_changes": {
         "posizione_precedente": 15,
         "posizione_nuova": 12,
         "variazione": 3
       }
     },
     "warnings": [],
     "processing_time": "0.245s"
   }
   ```

#### 1.4 `POST /api/atleti/fis-points` - Aggiornamento Punti Avanzato
   ```javascript
   // Request Body con validazione
   {
     "updates": [
       {
         "fis_code": "123456",
         "punti": {
           "sl": 15.67,
           "gs": 18.45,
           "sg": null,
           "dh": null,
           "ac": null
         },
         "metadata": {
           "source": "FIS_OFFICIAL",
           "date_updated": "2024-01-15",
           "season": "2023-24"
         }
       }
     ],
     "options": {
       "validate_points_range": true,
       "update_rankings": true,
       "notify_changes": false
     }
   }
   
   // Response con analisi impatto
   {
     "success": true,
     "data": {
       "updates_processed": 1,
       "athletes_affected": 1,
       "ranking_changes": [
         {
           "fis_code": "123456",
           "specialita": "slalom",
           "ranking_before": 15,
           "ranking_after": 12,
           "positions_gained": 3
         }
       ],
       "validation_results": {
         "valid_updates": 1,
         "invalid_updates": 0,
         "warnings": []
       }
     }
   }
   ```

#### 1.5 `DELETE /api/atleti/:fis_code`
   - **Descrizione**: Elimina un atleta e le sue gare
   - **Parametri**: `fis_code`

### 2. **Gestione Gare - Sistema Avanzato**

#### 2.1 `POST /api/gare` - Inserimento Intelligente
   ```javascript
   // Request Body con validazione avanzata
   {
     "gara": {
       "specialty": "Slalom",
       "category": "World Cup",
       "fis_url": "https://www.fis-ski.com/DB/general/results.html?sectorcode=AL&raceid=12345",
       "data_gara": "2024-01-15",
       "luogo": "Val d'Isère",
       "nazione": "FRA",
       "risultati": [
         {
           "posizione": "1",
           "fis_code": "123456",
           "nome": "Mario Rossi",
           "nazionalita": "ITA",
           "tempo_totale": "1:45.67",
           "distacco": "0.00",
           "punti_fis": "0.00",
           "punti_coppa": "100"
         }
       ]
     },
     "options": {
       "auto_create_athletes": true,
       "update_fis_points": true,
       "validate_results": true,
       "check_duplicates": true
     }
   }
   
   // Response con analisi completa
   {
     "success": true,
     "data": {
       "gara_id": 45,
       "processing_summary": {
         "atleti_processati": 30,
         "atleti_creati": 2,
         "atleti_aggiornati": 28,
         "punti_fis_aggiornati": 25,
         "errori_validazione": 0
       },
       "duplicate_check": {
         "is_duplicate": false,
         "similar_races": []
       },
       "ranking_impact": {
         "atleti_con_cambio_ranking": 15,
         "maggiori_variazioni": [
           {
             "fis_code": "123456",
             "nome": "Mario Rossi",
             "specialita": "slalom",
             "posizione_precedente": 15,
             "posizione_nuova": 8,
             "variazione": 7
           }
         ]
       }
     }
   }
   ```

#### 2.2 `GET /api/gare` - Lista Gare con Filtri Avanzati
   ```javascript
   // Request con query parameters complessi
   GET /api/gare?specialty=Slalom&category=World Cup&date_from=2024-01-01&date_to=2024-12-31&location=Val d'Isère&nation=FRA&page=1&limit=20&sort=data_gara&order=desc&include_stats=true
   
   // Response con metadati estesi
   {
     "success": true,
     "data": [
       {
         "id": 45,
         "specialty": "Slalom",
         "category": "World Cup",
         "fis_url": "https://www.fis-ski.com/...",
         "data_gara": "2024-01-15",
         "luogo": "Val d'Isère",
         "nazione": "FRA",
         "statistiche_gara": {
           "partecipanti_totali": 30,
           "partecipanti_classificati": 25,
           "dnf_count": 3,
           "dsq_count": 2,
           "tempo_vincitore": "1:45.67",
           "distacco_massimo": "5.23",
           "media_punti_fis": 25.67
         },
         "risultati_top3": [
           {
             "posizione": "1",
             "nome": "Mario Rossi",
             "nazionalita": "ITA",
             "tempo": "1:45.67"
           }
         ]
       }
     ],
     "pagination": {
       "current_page": 1,
       "total_pages": 5,
       "total_records": 95
     },
     "aggregations": {
       "gare_per_specialita": {
         "Slalom": 45,
         "Giant Slalom": 30,
         "Super-G": 20
       },
       "gare_per_nazione": {
         "FRA": 25,
         "ITA": 20,
         "AUT": 15
       }
     }
   }
   ```

#### 2.3 `GET /api/gare/:id`
   - **Descrizione**: Recupera una gara specifica
   - **Parametri**: `id` (ID della gara)
   - **Risposta**: Dati gara nel formato originale

### 3. **Middleware e Sicurezza API**

#### 3.1 **Rate Limiting e Throttling**
   ```javascript
   // Configurazione rate limiting
   const rateLimit = {
     windowMs: 15 * 60 * 1000, // 15 minuti
     max: 100, // max 100 requests per window
     message: {
       error: "Too many requests",
       retry_after: 900
     },
     standardHeaders: true,
     legacyHeaders: false
   };
   
   // Headers di risposta
   X-RateLimit-Limit: 100
   X-RateLimit-Remaining: 95
   X-RateLimit-Reset: 1640995200
   ```

#### 3.2 **Validazione Input Avanzata**
   ```javascript
   // Schema validazione atleta
   const atletaSchema = {
     fis_code: {
       type: 'string',
       pattern: '^[0-9]{6}$',
       required: true
     },
     nome: {
       type: 'string',
       minLength: 2,
       maxLength: 100,
       required: true
     },
     eta: {
       type: 'integer',
       minimum: 15,
       maximum: 50
     },
     sesso: {
       type: 'string',
       enum: ['M', 'F'],
       required: true
     },
     nazionalita: {
       type: 'string',
       pattern: '^[A-Z]{3}$',
       required: true
     }
   };
   ```

#### 3.3 **Gestione Errori Strutturata**
   ```javascript
   // Struttura errore standardizzata
   {
     "success": false,
     "error": {
       "code": "VALIDATION_ERROR",
       "message": "Dati input non validi",
       "details": [
         {
           "field": "fis_code",
           "message": "Il codice FIS deve essere di 6 cifre",
           "value": "12345"
         }
       ],
       "timestamp": "2024-01-15T10:30:00Z",
       "request_id": "req_123456789"
     }
   }
   
   // Codici errore standardizzati
   400 - BAD_REQUEST: Dati input non validi
   401 - UNAUTHORIZED: Autenticazione richiesta
   403 - FORBIDDEN: Accesso negato
   404 - NOT_FOUND: Risorsa non trovata
   409 - CONFLICT: Conflitto dati (duplicati)
   422 - UNPROCESSABLE_ENTITY: Validazione business logic fallita
   429 - TOO_MANY_REQUESTS: Rate limit superato
   500 - INTERNAL_SERVER_ERROR: Errore server
   503 - SERVICE_UNAVAILABLE: Servizio temporaneamente non disponibile
   ```

### 4. **Gestione Database**

#### 4.1 `DELETE /api/database/reset`
   - **Descrizione**: Svuota completamente il database
   - **Funzionalità**: 
     - Elimina tutti i dati da tutte le tabelle
     - Reset degli autoincrement
     - Transazione atomica

### 5. **API Analytics e Monitoring**

#### 5.1 `GET /api/system/health` - Health Check
   ```javascript
   {
     "status": "healthy",
     "timestamp": "2024-01-15T10:30:00Z",
     "version": "1.0.0",
     "uptime": "72h 15m 30s",
     "database": {
       "status": "connected",
       "response_time": "2ms",
       "connections": {
         "active": 5,
         "idle": 10,
         "total": 15
       }
     },
     "memory": {
       "used": "245MB",
       "free": "755MB",
       "total": "1GB"
     },
     "performance": {
       "avg_response_time": "45ms",
       "requests_per_minute": 120,
       "error_rate": "0.2%"
     }
   }
   ```

#### 5.2 `GET /api/system/metrics` - Metriche Dettagliate
   ```javascript
   {
     "api_usage": {
       "total_requests_24h": 15420,
       "endpoints_most_used": [
         {
           "endpoint": "/api/atleti",
           "requests": 5230,
           "avg_response_time": "35ms"
         }
       ]
     },
     "database_stats": {
       "total_athletes": 1250,
       "total_races": 8500,
       "database_size": "125MB",
       "query_performance": {
         "avg_query_time": "12ms",
         "slow_queries": 3
       }
     }
   }
   ```

## 🖥️ Componenti Frontend Avanzati

### 1. **App.tsx - Architettura Principale**

#### 1.1 **Struttura Componente**
   ```typescript
   interface AppState {
     user: User | null;
     theme: 'light' | 'dark';
     language: 'it' | 'en' | 'de' | 'fr';
     notifications: Notification[];
     loading: boolean;
     error: AppError | null;
   }
   
   const App: React.FC = () => {
     const [state, dispatch] = useReducer(appReducer, initialState);
     const { data: systemHealth } = useQuery('systemHealth', fetchSystemHealth);
     
     return (
       <ErrorBoundary>
         <ThemeProvider theme={state.theme}>
           <I18nProvider language={state.language}>
             <Router>
               <Layout>
                 <Header />
                 <Navigation />
                 <main className="app-content">
                   <Routes>
                     <Route path="/" element={<Dashboard />} />
                     <Route path="/ranking" element={<Ranking />} />
                     <Route path="/atleti/:fisCode" element={<AthleteProfile />} />
                     <Route path="/gare" element={<RaceList />} />
                     <Route path="/gare/:id" element={<RaceDetail />} />
                     <Route path="/confronto" element={<Duel />} />
                     <Route path="/analytics" element={<Analytics />} />
                   </Routes>
                 </main>
                 <Footer />
               </Layout>
             </Router>
           </I18nProvider>
         </ThemeProvider>
       </ErrorBoundary>
     );
   };
   ```

#### 1.2 **State Management Avanzato**
   ```typescript
   // Context per gestione stato globale
   const AppContext = createContext<{
     state: AppState;
     dispatch: Dispatch<AppAction>;
   }>({} as any);
   
   // Custom hooks per accesso stato
   export const useAppState = () => {
     const context = useContext(AppContext);
     if (!context) {
       throw new Error('useAppState must be used within AppProvider');
     }
     return context;
   };
   
   // Reducer per gestione azioni
   const appReducer = (state: AppState, action: AppAction): AppState => {
     switch (action.type) {
       case 'SET_LOADING':
         return { ...state, loading: action.payload };
       case 'SET_ERROR':
         return { ...state, error: action.payload, loading: false };
       case 'SET_THEME':
         localStorage.setItem('theme', action.payload);
         return { ...state, theme: action.payload };
       case 'ADD_NOTIFICATION':
         return {
           ...state,
           notifications: [...state.notifications, action.payload]
         };
       default:
         return state;
     }
   };
   ```

#### 1.3 **Performance Optimizations**
   ```typescript
   // Lazy loading dei componenti
   const Ranking = lazy(() => import('./components/Ranking'));
   const AthleteProfile = lazy(() => import('./components/AthleteProfile'));
   const RaceList = lazy(() => import('./components/RaceList'));
   
   // Preloading strategico
   const preloadComponents = () => {
     import('./components/Ranking');
     import('./components/AthleteProfile');
   };
   
   // Service Worker per caching
   useEffect(() => {
     if ('serviceWorker' in navigator) {
       navigator.serviceWorker.register('/sw.js');
     }
   }, []);
   ```

### 2. **Ranking.tsx - Sistema Ranking Enterprise**

#### 2.1 **Architettura Componente**
   ```typescript
   interface RankingState {
     athletes: Athlete[];
     filters: RankingFilters;
     sorting: SortConfig;
     pagination: PaginationConfig;
     loading: boolean;
     error: string | null;
     selectedAthletes: string[];
     viewMode: 'table' | 'grid' | 'cards';
   }
   
   interface RankingFilters {
     gender: 'all' | 'M' | 'F';
     nationality: string[];
     ageRange: [number, number];
     specialties: Specialty[];
     pointsRange: [number, number];
     searchQuery: string;
     hasRecentRaces: boolean;
   }
   
   const Ranking: React.FC = () => {
     const [state, setState] = useState<RankingState>(initialState);
     const debouncedFilters = useDebounce(state.filters, 300);
     
     // Query con cache intelligente
     const { data, isLoading, error } = useQuery(
       ['athletes', debouncedFilters, state.sorting, state.pagination],
       () => fetchAthletes(debouncedFilters, state.sorting, state.pagination),
       {
         keepPreviousData: true,
         staleTime: 5 * 60 * 1000, // 5 minuti
         cacheTime: 10 * 60 * 1000, // 10 minuti
       }
     );
     
     return (
       <div className="ranking-container">
         <RankingHeader />
         <FilterPanel 
           filters={state.filters}
           onFiltersChange={handleFiltersChange}
         />
         <ViewControls 
           viewMode={state.viewMode}
           onViewModeChange={setViewMode}
         />
         <AthletesList 
           athletes={data?.athletes || []}
           viewMode={state.viewMode}
           onAthleteSelect={handleAthleteSelect}
         />
         <Pagination 
           config={state.pagination}
           total={data?.total || 0}
           onChange={handlePaginationChange}
         />
       </div>
     );
   };
   ```

#### 2.2 **Filtri Avanzati con Performance**
   ```typescript
   const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onFiltersChange }) => {
     const [localFilters, setLocalFilters] = useState(filters);
     const debouncedUpdate = useCallback(
       debounce((newFilters: RankingFilters) => {
         onFiltersChange(newFilters);
       }, 300),
       [onFiltersChange]
     );
     
     const handleFilterChange = useCallback((key: keyof RankingFilters, value: any) => {
       const newFilters = { ...localFilters, [key]: value };
       setLocalFilters(newFilters);
       debouncedUpdate(newFilters);
     }, [localFilters, debouncedUpdate]);
     
     return (
       <div className="filter-panel">
         <div className="filter-group">
           <label>Genere</label>
           <SegmentedControl
             options={[
               { value: 'all', label: 'Tutti' },
               { value: 'M', label: 'Uomini' },
               { value: 'F', label: 'Donne' }
             ]}
             value={localFilters.gender}
             onChange={(value) => handleFilterChange('gender', value)}
           />
         </div>
         
         <div className="filter-group">
           <label>Nazionalità</label>
           <MultiSelect
             options={COUNTRIES}
             value={localFilters.nationality}
             onChange={(value) => handleFilterChange('nationality', value)}
             placeholder="Seleziona paesi..."
             searchable
           />
         </div>
         
         <div className="filter-group">
           <label>Età: {localFilters.ageRange[0]} - {localFilters.ageRange[1]}</label>
           <RangeSlider
             min={15}
             max={50}
             value={localFilters.ageRange}
             onChange={(value) => handleFilterChange('ageRange', value)}
           />
         </div>
         
         <div className="filter-group">
           <label>Specialità</label>
           <CheckboxGroup
             options={SPECIALTIES}
             value={localFilters.specialties}
             onChange={(value) => handleFilterChange('specialties', value)}
           />
         </div>
         
         <div className="filter-group">
           <label>Ricerca</label>
           <SearchInput
             value={localFilters.searchQuery}
             onChange={(value) => handleFilterChange('searchQuery', value)}
             placeholder="Nome atleta..."
             debounceMs={300}
           />
         </div>
       </div>
     );
   };
   ```

#### 2.3 **Tabella Virtualizzata per Performance**
   ```typescript
   const AthleteTable: React.FC<AthleteTableProps> = ({ athletes, onSort }) => {
     const tableRef = useRef<HTMLDivElement>(null);
     
     // Virtualizzazione per grandi dataset
     const rowVirtualizer = useVirtual({
       size: athletes.length,
       parentRef: tableRef,
       estimateSize: useCallback(() => 60, []),
       overscan: 5,
     });
     
     const columns = useMemo(() => [
       {
         key: 'position',
         label: 'Pos.',
         width: 60,
         render: (athlete: Athlete, index: number) => (
           <div className="position-cell">
             <span className={`position-badge position-${getPositionClass(index + 1)}`}>
               {index + 1}
             </span>
           </div>
         )
       },
       {
         key: 'name',
         label: 'Nome',
         width: 200,
         sortable: true,
         render: (athlete: Athlete) => (
           <div className="athlete-cell">
             <Avatar src={athlete.photo} size="sm" />
             <div>
               <Link to={`/atleti/${athlete.fis_code}`} className="athlete-name">
                 {athlete.nome}
               </Link>
               <div className="athlete-meta">
                 <Flag country={athlete.nazionalita} size="xs" />
                 <span>{athlete.eta} anni</span>
               </div>
             </div>
           </div>
         )
       },
       {
         key: 'points',
         label: 'Punti FIS',
         width: 120,
         sortable: true,
         render: (athlete: Athlete) => (
           <div className="points-cell">
             <div className="best-points">
               {athlete.miglior_punteggio?.toFixed(2) || 'N/A'}
             </div>
             <div className="specialty-indicator">
               {athlete.specialita_principale}
             </div>
           </div>
         )
       }
     ], []);
     
     return (
       <div ref={tableRef} className="athlete-table-container">
         <div className="table-header">
           {columns.map(column => (
             <div 
               key={column.key}
               className={`table-header-cell ${column.sortable ? 'sortable' : ''}`}
               style={{ width: column.width }}
               onClick={() => column.sortable && onSort(column.key)}
             >
               {column.label}
               {column.sortable && <SortIcon />}
             </div>
           ))}
         </div>
         
         <div className="table-body" style={{ height: '600px' }}>
           {rowVirtualizer.virtualItems.map(virtualRow => {
             const athlete = athletes[virtualRow.index];
             return (
               <div
                 key={athlete.fis_code}
                 className="table-row"
                 style={{
                   position: 'absolute',
                   top: 0,
                   left: 0,
                   width: '100%',
                   height: `${virtualRow.size}px`,
                   transform: `translateY(${virtualRow.start}px)`,
                 }}
               >
                 {columns.map(column => (
                   <div 
                     key={column.key}
                     className="table-cell"
                     style={{ width: column.width }}
                   >
                     {column.render(athlete, virtualRow.index)}
                   </div>
                 ))}
               </div>
             );
           })}
         </div>
       </div>
     );
   };
   ```

### 3. **AthleteProfile.tsx - Profilo Atleta Avanzato**

#### 3.1 **Architettura Componente**
   ```typescript
   interface AthleteProfileState {
     athlete: Athlete | null;
     races: Race[];
     statistics: AthleteStatistics;
     chartData: ChartData;
     activeTab: 'overview' | 'races' | 'statistics' | 'comparisons';
     loading: boolean;
     error: string | null;
   }
   
   const AthleteProfile: React.FC = () => {
     const { fisCode } = useParams<{ fisCode: string }>();
     const [state, setState] = useState<AthleteProfileState>(initialState);
     
     // Queries parallele per ottimizzazione
     const { data: athlete, isLoading: athleteLoading } = useQuery(
       ['athlete', fisCode],
       () => fetchAthlete(fisCode!),
       { enabled: !!fisCode }
     );
     
     const { data: races, isLoading: racesLoading } = useQuery(
       ['athlete-races', fisCode],
       () => fetchAthleteRaces(fisCode!),
       { enabled: !!fisCode }
     );
     
     const { data: statistics } = useQuery(
       ['athlete-statistics', fisCode],
       () => fetchAthleteStatistics(fisCode!),
       { enabled: !!fisCode }
     );
     
     // Calcolo dati chart in background
     const chartData = useMemo(() => {
       if (!races) return null;
       return calculateChartData(races);
     }, [races]);
     
     if (athleteLoading || racesLoading) {
       return <AthleteProfileSkeleton />;
     }
     
     return (
       <div className="athlete-profile">
         <AthleteHeader athlete={athlete} />
         <TabNavigation 
           activeTab={state.activeTab}
           onTabChange={(tab) => setState(prev => ({ ...prev, activeTab: tab }))}
         />
         
         <div className="tab-content">
           {state.activeTab === 'overview' && (
             <OverviewTab 
               athlete={athlete}
               recentRaces={races?.slice(0, 5)}
               statistics={statistics}
             />
           )}
           
           {state.activeTab === 'races' && (
             <RacesTab 
               races={races}
               onRaceSelect={handleRaceSelect}
             />
           )}
           
           {state.activeTab === 'statistics' && (
             <StatisticsTab 
               statistics={statistics}
               chartData={chartData}
             />
           )}
           
           {state.activeTab === 'comparisons' && (
             <ComparisonsTab 
               athlete={athlete}
               onCompareWith={handleCompareWith}
             />
           )}
         </div>
       </div>
     );
   };
   ```

#### 3.2 **Componenti Specializzati**
   ```typescript
   const AthleteHeader: React.FC<{ athlete: Athlete }> = ({ athlete }) => {
     return (
       <div className="athlete-header">
         <div className="athlete-hero">
           <div className="athlete-photo">
             <img 
               src={athlete.photo || '/default-avatar.jpg'} 
               alt={athlete.nome}
               loading="lazy"
             />
             <div className="photo-overlay">
               <Flag country={athlete.nazionalita} size="lg" />
             </div>
           </div>
           
           <div className="athlete-info">
             <h1 className="athlete-name">{athlete.nome}</h1>
             <div className="athlete-meta">
               <span className="age">{athlete.eta} anni</span>
               <span className="nationality">{athlete.nazione_completa}</span>
               <span className="club">{athlete.club}</span>
             </div>
             
             <div className="athlete-stats">
               <div className="stat-item">
                 <span className="stat-label">Ranking Mondiale</span>
                 <span className="stat-value">#{athlete.ranking_mondiale || 'N/A'}</span>
               </div>
               <div className="stat-item">
                 <span className="stat-label">Miglior Punteggio</span>
                 <span className="stat-value">{athlete.miglior_punteggio?.toFixed(2) || 'N/A'}</span>
               </div>
               <div className="stat-item">
                 <span className="stat-label">Specialità</span>
                 <span className="stat-value">{athlete.specialita_principale}</span>
               </div>
             </div>
           </div>
           
           <div className="athlete-actions">
             <Button 
               variant="primary"
               onClick={() => handleCompare(athlete.fis_code)}
             >
               Confronta
             </Button>
             <Button 
               variant="secondary"
               onClick={() => handleShare(athlete)}
             >
               Condividi
             </Button>
             <Button 
               variant="ghost"
               onClick={() => handleFavorite(athlete.fis_code)}
             >
               <HeartIcon />
             </Button>
           </div>
         </div>
       </div>
     );
   };
   
   const PerformanceChart: React.FC<{ data: ChartData }> = ({ data }) => {
     const chartRef = useRef<HTMLCanvasElement>(null);
     
     useEffect(() => {
       if (!chartRef.current || !data) return;
       
       const chart = new Chart(chartRef.current, {
         type: 'line',
         data: {
           labels: data.labels,
           datasets: [
             {
               label: 'Punti FIS',
               data: data.points,
               borderColor: '#3B82F6',
               backgroundColor: 'rgba(59, 130, 246, 0.1)',
               tension: 0.4,
               fill: true
             },
             {
               label: 'Posizioni',
               data: data.positions,
               borderColor: '#EF4444',
               backgroundColor: 'rgba(239, 68, 68, 0.1)',
               tension: 0.4,
               yAxisID: 'y1'
             }
           ]
         },
         options: {
           responsive: true,
           interaction: {
             mode: 'index',
             intersect: false,
           },
           scales: {
             y: {
               type: 'linear',
               display: true,
               position: 'left',
               title: {
                 display: true,
                 text: 'Punti FIS'
               }
             },
             y1: {
               type: 'linear',
               display: true,
               position: 'right',
               title: {
                 display: true,
                 text: 'Posizione'
               },
               reverse: true,
               grid: {
                 drawOnChartArea: false,
               },
             }
           }
         }
       });
       
       return () => chart.destroy();
     }, [data]);
     
     return (
       <div className="performance-chart">
         <canvas ref={chartRef} />
       </div>
     );
   };
   ```

### 4. **Pattern di Design e Architettura**

#### 4.1 **Custom Hooks per Logica Riutilizzabile**
   ```typescript
   // Hook per gestione filtri
   export const useFilters = <T>(initialFilters: T) => {
     const [filters, setFilters] = useState<T>(initialFilters);
     const [debouncedFilters, setDebouncedFilters] = useState<T>(initialFilters);
     
     useEffect(() => {
       const timer = setTimeout(() => {
         setDebouncedFilters(filters);
       }, 300);
       
       return () => clearTimeout(timer);
     }, [filters]);
     
     const updateFilter = useCallback(<K extends keyof T>(key: K, value: T[K]) => {
       setFilters(prev => ({ ...prev, [key]: value }));
     }, []);
     
     const resetFilters = useCallback(() => {
       setFilters(initialFilters);
     }, [initialFilters]);
     
     return {
       filters,
       debouncedFilters,
       updateFilter,
       resetFilters,
       hasActiveFilters: JSON.stringify(filters) !== JSON.stringify(initialFilters)
     };
   };
   
   // Hook per gestione paginazione
   export const usePagination = (totalItems: number, itemsPerPage: number = 20) => {
     const [currentPage, setCurrentPage] = useState(1);
     
     const totalPages = Math.ceil(totalItems / itemsPerPage);
     const startIndex = (currentPage - 1) * itemsPerPage;
     const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
     
     const goToPage = useCallback((page: number) => {
       setCurrentPage(Math.max(1, Math.min(page, totalPages)));
     }, [totalPages]);
     
     const nextPage = useCallback(() => {
       goToPage(currentPage + 1);
     }, [currentPage, goToPage]);
     
     const prevPage = useCallback(() => {
       goToPage(currentPage - 1);
     }, [currentPage, goToPage]);
     
     return {
       currentPage,
       totalPages,
       startIndex,
       endIndex,
       goToPage,
       nextPage,
       prevPage,
       hasNextPage: currentPage < totalPages,
       hasPrevPage: currentPage > 1
     };
   };
   ```

#### 4.2 **Error Boundary e Gestione Errori**
   ```typescript
   class ErrorBoundary extends React.Component<
     { children: React.ReactNode },
     { hasError: boolean; error: Error | null }
   > {
     constructor(props: { children: React.ReactNode }) {
       super(props);
       this.state = { hasError: false, error: null };
     }
     
     static getDerivedStateFromError(error: Error) {
       return { hasError: true, error };
     }
     
     componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
       console.error('Error caught by boundary:', error, errorInfo);
       // Invia errore a servizio di monitoring
       sendErrorToMonitoring(error, errorInfo);
     }
     
     render() {
       if (this.state.hasError) {
         return (
           <div className="error-boundary">
             <h2>Qualcosa è andato storto</h2>
             <details>
               <summary>Dettagli errore</summary>
               <pre>{this.state.error?.stack}</pre>
             </details>
             <button onClick={() => window.location.reload()}>
               Ricarica pagina
             </button>
           </div>
         );
       }
       
       return this.props.children;
     }
   }
   ```

### 5. **RaceList.tsx - Lista Gare Avanzata**

#### 5.1 **Visualizzazione Gare**
   - Grid responsive delle gare disponibili
   - Informazioni per gara:
     - Specialità e categoria
     - Data e località (se disponibili)
     - Numero di partecipanti
     - Link alla gara FIS

#### 5.2 **Filtri e Ricerca**
   - Ricerca per specialità
   - Filtro per categoria
   - Ordinamento per data

#### 5.3 **Navigazione**
   - Click su gara per dettagli completi
   - Breadcrumb navigation

### 6. **RaceDetail.tsx - Dettaglio Gara**

#### 6.1 **Informazioni Gara**
   - Header con dettagli gara completi
   - Specialità, categoria, data, località
   - Link diretto alla pagina FIS

#### 6.2 **Risultati Atleti**
   - Tabella completa dei risultati
   - Colonne: Posizione, Pettorale, Codice FIS, Nome, Anno, Nazione
   - Tempi di manche (se disponibili)
   - Tempo totale e distacco
   - Punti FIS e Coppa del Mondo

#### 6.3 **Filtri Risultati**
   - Ricerca per nome atleta
   - Filtro per nazionalità
   - Evidenziazione risultati filtrati

#### 6.4 **Navigazione Atleti**
   - Click su atleta per accesso al profilo
   - Integrazione con sistema di routing

### 7. **Duel.tsx - Confronto Atleti**

#### 7.1 **Selezione Atleti**
   - Doppio sistema di ricerca con dropdown
   - Ricerca incrementale con filtri
   - Validazione selezione atleti diversi

#### 7.2 **Analisi Confronto**
   - **Gare Comuni**: Identificazione automatica gare disputate insieme
   - **Statistiche per Specialità**:
     - Numero vittorie per atleta
     - Percentuali di successo
     - Pareggi (DNF entrambi)
   - **Analisi Globale**:
     - Vincitore complessivo
     - Statistiche aggregate
     - Punti di forza per atleta

#### 7.3 **Modalità Visualizzazione**
   - **Overview**: Statistiche generali e vincitore
   - **Detailed**: Analisi per specialità
   - **Comparison**: Confronto diretto gara per gara

#### 7.4 **Logica Determinazione Vincitore**
   - Gestione posizioni numeriche (1°, 2°, etc.)
   - Gestione DNF/DSQ/DNS
   - Algoritmo di confronto posizioni
   - Calcolo percentuali di successo

## 🎨 Design e User Experience Enterprise

### 1. **Design System Avanzato**

#### 1.1 **Palette Colori Semantica**
   ```css
   :root {
     /* Primary Colors */
     --color-primary-50: #eff6ff;
     --color-primary-100: #dbeafe;
     --color-primary-500: #3b82f6;
     --color-primary-600: #2563eb;
     --color-primary-900: #1e3a8a;
     
     /* Semantic Colors */
     --color-success: #10b981;
     --color-warning: #f59e0b;
     --color-error: #ef4444;
     --color-info: #06b6d4;
     
     /* Neutral Scale */
     --color-gray-50: #f9fafb;
     --color-gray-100: #f3f4f6;
     --color-gray-500: #6b7280;
     --color-gray-900: #111827;
     
     /* Sport-specific Colors */
     --color-slalom: #8b5cf6;
     --color-giant-slalom: #06b6d4;
     --color-super-g: #f59e0b;
     --color-downhill: #ef4444;
     --color-alpine-combined: #10b981;
   }
   ```

#### 1.2 **Typography System**
   ```css
   /* Font Stack Ottimizzato */
   --font-family-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
   --font-family-mono: 'JetBrains Mono', 'Fira Code', Consolas, monospace;
   
   /* Type Scale */
   --text-xs: 0.75rem;    /* 12px */
   --text-sm: 0.875rem;   /* 14px */
   --text-base: 1rem;     /* 16px */
   --text-lg: 1.125rem;   /* 18px */
   --text-xl: 1.25rem;    /* 20px */
   --text-2xl: 1.5rem;    /* 24px */
   --text-3xl: 1.875rem;  /* 30px */
   --text-4xl: 2.25rem;   /* 36px */
   
   /* Font Weights */
   --font-weight-normal: 400;
   --font-weight-medium: 500;
   --font-weight-semibold: 600;
   --font-weight-bold: 700;
   ```

#### 1.3 **Spacing System**
   ```css
   /* Spacing Scale (8px base) */
   --space-1: 0.25rem;   /* 4px */
   --space-2: 0.5rem;    /* 8px */
   --space-3: 0.75rem;   /* 12px */
   --space-4: 1rem;      /* 16px */
   --space-6: 1.5rem;    /* 24px */
   --space-8: 2rem;      /* 32px */
   --space-12: 3rem;     /* 48px */
   --space-16: 4rem;     /* 64px */
   --space-20: 5rem;     /* 80px */
   ```

#### 1.4 **Component Library**
   ```typescript
   // Button Component System
   interface ButtonProps {
     variant: 'primary' | 'secondary' | 'ghost' | 'danger';
     size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
     loading?: boolean;
     disabled?: boolean;
     icon?: React.ReactNode;
     children: React.ReactNode;
   }
   
   const Button: React.FC<ButtonProps> = ({ 
     variant = 'primary', 
     size = 'md', 
     loading = false,
     disabled = false,
     icon,
     children,
     ...props 
   }) => {
     const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
     
     const variantClasses = {
       primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
       secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500',
       ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
       danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
     };
     
     const sizeClasses = {
       xs: 'px-2.5 py-1.5 text-xs',
       sm: 'px-3 py-2 text-sm',
       md: 'px-4 py-2 text-sm',
       lg: 'px-4 py-2 text-base',
       xl: 'px-6 py-3 text-base'
     };
     
     return (
       <button
         className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabled || loading ? 'opacity-50 cursor-not-allowed' : ''}`}
         disabled={disabled || loading}
         {...props}
       >
         {loading && <Spinner className="mr-2" />}
         {icon && !loading && <span className="mr-2">{icon}</span>}
         {children}
       </button>
     );
   };
   ```

### 2. **Responsive Design Enterprise**

#### 2.1 **Breakpoint System**
   ```css
   /* Mobile First Breakpoints */
   --breakpoint-sm: 640px;   /* Small devices */
   --breakpoint-md: 768px;   /* Medium devices */
   --breakpoint-lg: 1024px;  /* Large devices */
   --breakpoint-xl: 1280px;  /* Extra large devices */
   --breakpoint-2xl: 1536px; /* 2X large devices */
   
   /* Container Sizes */
   .container {
     width: 100%;
     margin-left: auto;
     margin-right: auto;
     padding-left: 1rem;
     padding-right: 1rem;
   }
   
   @media (min-width: 640px) {
     .container { max-width: 640px; }
   }
   
   @media (min-width: 768px) {
     .container { max-width: 768px; }
   }
   
   @media (min-width: 1024px) {
     .container { max-width: 1024px; }
   }
   
   @media (min-width: 1280px) {
     .container { max-width: 1280px; }
   }
   ```

#### 2.2 **Adaptive Layout Components**
   ```typescript
   // Responsive Grid System
   const ResponsiveGrid: React.FC<{ children: React.ReactNode }> = ({ children }) => {
     return (
       <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
         {children}
       </div>
     );
   };
   
   // Responsive Table
   const ResponsiveTable: React.FC<TableProps> = ({ data, columns }) => {
     const [isMobile, setIsMobile] = useState(false);
     
     useEffect(() => {
       const checkMobile = () => setIsMobile(window.innerWidth < 768);
       checkMobile();
       window.addEventListener('resize', checkMobile);
       return () => window.removeEventListener('resize', checkMobile);
     }, []);
     
     if (isMobile) {
       return <MobileCardView data={data} />;
     }
     
     return <DesktopTableView data={data} columns={columns} />;
   };
   ```

### 3. **Accessibilità WCAG 2.1 AA**

#### 3.1 **Keyboard Navigation**
   ```typescript
   // Focus Management
   const useFocusManagement = () => {
     const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
     
     const trapFocus = useCallback((container: HTMLElement) => {
       const focusable = container.querySelectorAll(focusableElements);
       const firstFocusable = focusable[0] as HTMLElement;
       const lastFocusable = focusable[focusable.length - 1] as HTMLElement;
       
       const handleKeyDown = (e: KeyboardEvent) => {
         if (e.key === 'Tab') {
           if (e.shiftKey) {
             if (document.activeElement === firstFocusable) {
               lastFocusable.focus();
               e.preventDefault();
             }
           } else {
             if (document.activeElement === lastFocusable) {
               firstFocusable.focus();
               e.preventDefault();
             }
           }
         }
       };
       
       container.addEventListener('keydown', handleKeyDown);
       return () => container.removeEventListener('keydown', handleKeyDown);
     }, []);
     
     return { trapFocus };
   };
   ```

#### 3.2 **Screen Reader Support**
   ```typescript
   // ARIA Labels e Descriptions
   const AccessibleTable: React.FC<TableProps> = ({ data, columns, caption }) => {
     return (
       <table role="table" aria-label={caption}>
         <caption className="sr-only">{caption}</caption>
         <thead>
           <tr>
             {columns.map((column, index) => (
               <th 
                 key={column.key}
                 scope="col"
                 aria-sort={column.sortable ? 'none' : undefined}
                 tabIndex={column.sortable ? 0 : -1}
                 onKeyDown={(e) => {
                   if (e.key === 'Enter' || e.key === ' ') {
                     column.onSort?.(column.key);
                   }
                 }}
               >
                 {column.label}
                 {column.sortable && (
                   <span aria-hidden="true" className="ml-1">
                     ↕️
                   </span>
                 )}
               </th>
             ))}
           </tr>
         </thead>
         <tbody>
           {data.map((row, rowIndex) => (
             <tr key={rowIndex}>
               {columns.map((column, colIndex) => (
                 <td key={column.key}>
                   {column.render ? column.render(row) : row[column.key]}
                 </td>
               ))}
             </tr>
           ))}
         </tbody>
       </table>
     );
   };
   ```

#### 3.3 **Color Contrast e Visual Design**
   ```css
   /* High Contrast Mode Support */
   @media (prefers-contrast: high) {
     :root {
       --color-primary-500: #0066cc;
       --color-text: #000000;
       --color-background: #ffffff;
     }
   }
   
   /* Reduced Motion Support */
   @media (prefers-reduced-motion: reduce) {
     *,
     *::before,
     *::after {
       animation-duration: 0.01ms !important;
       animation-iteration-count: 1 !important;
       transition-duration: 0.01ms !important;
     }
   }
   
   /* Focus Indicators */
   .focus-visible {
     outline: 2px solid var(--color-primary-500);
     outline-offset: 2px;
   }
   ```

### 4. **Performance UX Ottimizzata**

#### 4.1 **Loading States Intelligenti**
   ```typescript
   // Skeleton Components
   const AthleteCardSkeleton: React.FC = () => {
     return (
       <div className="animate-pulse">
         <div className="flex items-center space-x-4">
           <div className="rounded-full bg-gray-300 h-12 w-12"></div>
           <div className="flex-1 space-y-2">
             <div className="h-4 bg-gray-300 rounded w-3/4"></div>
             <div className="h-3 bg-gray-300 rounded w-1/2"></div>
           </div>
         </div>
       </div>
     );
   };
   
   // Progressive Loading
   const useProgressiveLoading = <T>(fetchFn: () => Promise<T>) => {
     const [data, setData] = useState<T | null>(null);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState<Error | null>(null);
     
     useEffect(() => {
       let cancelled = false;
       
       fetchFn()
         .then(result => {
           if (!cancelled) {
             setData(result);
             setLoading(false);
           }
         })
         .catch(err => {
           if (!cancelled) {
             setError(err);
             setLoading(false);
           }
         });
       
       return () => { cancelled = true; };
     }, [fetchFn]);
     
     return { data, loading, error };
   };
   ```

#### 4.2 **Error Handling UX**
   ```typescript
   // Error Boundary con Recovery
   const ErrorFallback: React.FC<{ error: Error; resetError: () => void }> = ({ error, resetError }) => {
     return (
       <div className="min-h-screen flex items-center justify-center bg-gray-50">
         <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
           <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full">
             <ExclamationTriangleIcon className="w-6 h-6 text-red-600" />
           </div>
           <div className="mt-4 text-center">
             <h3 className="text-lg font-medium text-gray-900">
               Oops! Qualcosa è andato storto
             </h3>
             <p className="mt-2 text-sm text-gray-500">
               Si è verificato un errore imprevisto. Puoi provare a ricaricare la pagina o contattare il supporto se il problema persiste.
             </p>
             <div className="mt-6 flex flex-col sm:flex-row gap-3">
               <button
                 onClick={resetError}
                 className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
               >
                 Riprova
               </button>
               <button
                 onClick={() => window.location.reload()}
                 className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
               >
                 Ricarica Pagina
               </button>
             </div>
           </div>
         </div>
       </div>
     );
   };
   ```

### 5. **Dark Mode e Theming Avanzato**

#### 5.1 **Theme System**
   ```typescript
   // Theme Context
   interface ThemeContextType {
     theme: 'light' | 'dark' | 'system';
     setTheme: (theme: 'light' | 'dark' | 'system') => void;
     resolvedTheme: 'light' | 'dark';
   }
   
   const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
   
   export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
     const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
     const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');
     
     useEffect(() => {
       const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
       
       const updateTheme = () => {
         if (theme === 'system') {
           setResolvedTheme(mediaQuery.matches ? 'dark' : 'light');
         } else {
           setResolvedTheme(theme);
         }
       };
       
       updateTheme();
       mediaQuery.addEventListener('change', updateTheme);
       
       return () => mediaQuery.removeEventListener('change', updateTheme);
     }, [theme]);
     
     useEffect(() => {
       document.documentElement.classList.toggle('dark', resolvedTheme === 'dark');
     }, [resolvedTheme]);
     
     return (
       <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
         {children}
       </ThemeContext.Provider>
     );
   };
   ```

#### 5.2 **CSS Variables per Theming**
   ```css
   /* Light Theme */
   :root {
     --color-background: #ffffff;
     --color-foreground: #000000;
     --color-card: #ffffff;
     --color-card-foreground: #000000;
     --color-border: #e5e7eb;
     --color-input: #ffffff;
     --color-muted: #f3f4f6;
     --color-muted-foreground: #6b7280;
   }
   
   /* Dark Theme */
   .dark {
     --color-background: #0f172a;
     --color-foreground: #f8fafc;
     --color-card: #1e293b;
     --color-card-foreground: #f8fafc;
     --color-border: #334155;
     --color-input: #1e293b;
     --color-muted: #334155;
     --color-muted-foreground: #94a3b8;
   }
   ```

### 6. **Micro-Interactions e Animazioni**

#### 6.1 **Transition System**
   ```css
   /* Transition Utilities */
   .transition-base {
     transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
     transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
     transition-duration: 150ms;
   }
   
   .transition-smooth {
     transition-property: all;
     transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
     transition-duration: 300ms;
   }
   
   .transition-bounce {
     transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
   }
   ```

#### 6.2 **Loading Animations**
   ```typescript
   // Pulse Animation Component
   const PulseLoader: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
     const sizeClasses = {
       sm: 'w-4 h-4',
       md: 'w-6 h-6',
       lg: 'w-8 h-8'
     };
     
     return (
       <div className={`${sizeClasses[size]} animate-pulse bg-primary-500 rounded-full`}></div>
     );
   };
   
   // Skeleton Animation
   const SkeletonText: React.FC<{ lines?: number; className?: string }> = ({ lines = 1, className = '' }) => {
     return (
       <div className={`space-y-2 ${className}`}>
         {Array.from({ length: lines }).map((_, index) => (
           <div
             key={index}
             className="h-4 bg-gray-300 rounded animate-pulse"
             style={{ width: `${Math.random() * 40 + 60}%` }}
           ></div>
         ))}
       </div>
     );
   };
   ```

## 🔄 Flussi di Lavoro Enterprise

### 1. **Data Pipeline Avanzato**

#### 1.1 **Inserimento Dati Batch**
   ```javascript
   // Workflow completo per inserimento gare
   const processRaceData = async (raceData) => {
     try {
       // 1. Validazione preliminare
       const validationResult = await validateRaceData(raceData);
       if (!validationResult.isValid) {
         throw new Error(`Validation failed: ${validationResult.errors.join(', ')}`);
       }
       
       // 2. Preprocessing dei dati
       const processedData = await preprocessRaceData(raceData);
       
       // 3. Inserimento con transazione
       const result = await db.transaction(async (trx) => {
         // Inserimento gara completa
         const raceId = await trx('gare_complete').insert({
           specialty: processedData.specialty,
           category: processedData.category,
           fis_url: processedData.fis_url,
           data_originale: JSON.stringify(processedData)
         }).returning('id');
         
         // Processamento atleti
         for (const athlete of processedData.athletes) {
           await processAthleteData(trx, athlete, raceId[0]);
         }
         
         return raceId[0];
       });
       
       // 4. Post-processing
       await updateRankings();
       await invalidateCache(['rankings', 'athletes']);
       
       return { success: true, raceId: result };
     } catch (error) {
       logger.error('Race processing failed:', error);
       throw error;
     }
   };
   ```

#### 1.2 **Gestione Atleti Intelligente**
   ```javascript
   // Sistema di merge intelligente per atleti
   const processAthleteData = async (trx, athleteData, raceId) => {
     // 1. Ricerca atleta esistente
     let athlete = await trx('atleti')
       .where('fis_code', athleteData.fis_code)
       .first();
     
     if (!athlete) {
       // 2. Creazione nuovo atleta
       athlete = await trx('atleti').insert({
         fis_code: athleteData.fis_code,
         nome: athleteData.nome,
         eta: athleteData.eta,
         sesso: athleteData.sesso,
         nazionalita: athleteData.nazionalita,
         club: athleteData.club,
         created_at: new Date()
       }).returning('*');
     } else {
       // 3. Aggiornamento dati esistenti
       await trx('atleti')
         .where('fis_code', athleteData.fis_code)
         .update({
           nome: athleteData.nome || athlete.nome,
           eta: athleteData.eta || athlete.eta,
           club: athleteData.club || athlete.club,
           updated_at: new Date()
         });
     }
     
     // 4. Inserimento gara
     await trx('gare').insert({
       atleta_fis_code: athleteData.fis_code,
       gara_completa_id: raceId,
       posizione: athleteData.posizione,
       punti_fis: athleteData.punti_fis,
       punti_coppa: athleteData.punti_coppa,
       tempo_totale: athleteData.tempo_totale,
       distacco: athleteData.distacco
     });
     
     // 5. Aggiornamento punti specialità
     if (athleteData.punti_fis && athleteData.specialita) {
       await updateSpecialtyPoints(trx, athleteData.fis_code, athleteData.specialita, athleteData.punti_fis);
     }
   };
   ```

### 2. **User Journey Ottimizzato**

#### 2.1 **Homepage Experience**
   ```typescript
   // Caricamento progressivo della homepage
   const HomePage: React.FC = () => {
     const [initialData, setInitialData] = useState(null);
     const [extendedData, setExtendedData] = useState(null);
     
     useEffect(() => {
       // 1. Caricamento dati critici (Above the fold)
       loadCriticalData().then(setInitialData);
       
       // 2. Caricamento dati secondari (Below the fold)
       setTimeout(() => {
         loadExtendedData().then(setExtendedData);
       }, 100);
     }, []);
     
     return (
       <div className="homepage">
         {/* Critical content */}
         <HeroSection data={initialData} />
         <TopRankings data={initialData?.rankings} />
         
         {/* Progressive content */}
         <Suspense fallback={<SkeletonLoader />}>
           <RecentRaces data={extendedData?.recentRaces} />
           <Statistics data={extendedData?.statistics} />
         </Suspense>
       </div>
     );
   };
   ```

#### 2.2 **Search & Filter Experience**
   ```typescript
   // Sistema di ricerca avanzato con debounce
   const useAdvancedSearch = () => {
     const [query, setQuery] = useState('');
     const [filters, setFilters] = useState({});
     const [results, setResults] = useState([]);
     const [loading, setLoading] = useState(false);
     
     const debouncedSearch = useMemo(
       () => debounce(async (searchQuery: string, searchFilters: any) => {
         setLoading(true);
         try {
           const response = await fetch('/api/search', {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify({ query: searchQuery, filters: searchFilters })
           });
           const data = await response.json();
           setResults(data.results);
         } catch (error) {
           console.error('Search failed:', error);
         } finally {
           setLoading(false);
         }
       }, 300),
       []
     );
     
     useEffect(() => {
       if (query.length > 2 || Object.keys(filters).length > 0) {
         debouncedSearch(query, filters);
       } else {
         setResults([]);
       }
     }, [query, filters, debouncedSearch]);
     
     return { query, setQuery, filters, setFilters, results, loading };
   };
   ```

### 3. **Error Handling e Recovery**

#### 3.1 **Retry Logic Intelligente**
   ```typescript
   // Sistema di retry con backoff esponenziale
   const useRetryableRequest = <T>(requestFn: () => Promise<T>, maxRetries = 3) => {
     const [data, setData] = useState<T | null>(null);
     const [error, setError] = useState<Error | null>(null);
     const [loading, setLoading] = useState(false);
     const [retryCount, setRetryCount] = useState(0);
     
     const executeRequest = useCallback(async (attempt = 0) => {
       setLoading(true);
       setError(null);
       
       try {
         const result = await requestFn();
         setData(result);
         setRetryCount(0);
       } catch (err) {
         const error = err as Error;
         
         if (attempt < maxRetries && isRetryableError(error)) {
           const delay = Math.pow(2, attempt) * 1000; // Exponential backoff
           setTimeout(() => {
             setRetryCount(attempt + 1);
             executeRequest(attempt + 1);
           }, delay);
         } else {
           setError(error);
         }
       } finally {
         setLoading(false);
       }
     }, [requestFn, maxRetries]);
     
     const retry = useCallback(() => {
       executeRequest(0);
     }, [executeRequest]);
     
     return { data, error, loading, retry, retryCount };
   };
   
   // Classificazione errori per retry
   const isRetryableError = (error: Error): boolean => {
     const retryableStatuses = [408, 429, 500, 502, 503, 504];
     const status = (error as any).status;
     return retryableStatuses.includes(status) || error.name === 'NetworkError';
   };
   ```

#### 3.2 **Offline Support**
   ```typescript
   // Service Worker per supporto offline
   const useOfflineSupport = () => {
     const [isOnline, setIsOnline] = useState(navigator.onLine);
     const [pendingRequests, setPendingRequests] = useState<any[]>([]);
     
     useEffect(() => {
       const handleOnline = () => {
         setIsOnline(true);
         // Sincronizza richieste pendenti
         syncPendingRequests();
       };
       
       const handleOffline = () => {
         setIsOnline(false);
       };
       
       window.addEventListener('online', handleOnline);
       window.addEventListener('offline', handleOffline);
       
       return () => {
         window.removeEventListener('online', handleOnline);
         window.removeEventListener('offline', handleOffline);
       };
     }, []);
     
     const syncPendingRequests = async () => {
       for (const request of pendingRequests) {
         try {
           await fetch(request.url, request.options);
         } catch (error) {
           console.error('Failed to sync request:', error);
         }
       }
       setPendingRequests([]);
     };
     
     return { isOnline, pendingRequests, setPendingRequests };
   };
   ```

## 🔧 Configurazione e Deploy Enterprise

### 1. **Ambiente di Sviluppo Avanzato**

#### 1.1 **Setup Completo**
   ```bash
   # Clone e setup iniziale
   git clone https://github.com/your-org/atletiranking.git
   cd atletiranking
   
   # Installazione dipendenze con lock file
   npm ci
   
   # Setup ambiente di sviluppo
   cp .env.example .env.local
   
   # Inizializzazione database
   npm run db:setup
   npm run db:seed
   
   # Avvio in modalità sviluppo
   npm run dev
   ```

#### 1.2 **Docker Development Environment**
   ```dockerfile
   # Dockerfile.dev
   FROM node:18-alpine
   
   WORKDIR /app
   
   # Installazione dipendenze
   COPY package*.json ./
   RUN npm ci
   
   # Copia codice sorgente
   COPY . .
   
   # Esposizione porte
   EXPOSE 3000 3001
   
   # Comando di sviluppo
   CMD ["npm", "run", "dev"]
   ```
   
   ```yaml
   # docker-compose.dev.yml
   version: '3.8'
   services:
     app:
       build:
         context: .
         dockerfile: Dockerfile.dev
       ports:
         - "3000:3000"
         - "3001:3001"
       volumes:
         - .:/app
         - /app/node_modules
       environment:
         - NODE_ENV=development
         - DB_FILE=/app/data/atletiranking.db
       depends_on:
         - redis
     
     redis:
       image: redis:7-alpine
       ports:
         - "6379:6379"
   ```

### 2. **Variabili Ambiente Complete**

#### 2.1 **Configurazione Ambiente**
   ```bash
   # .env.production
   NODE_ENV=production
   
   # Server Configuration
   PORT=3001
   HOST=0.0.0.0
   
   # Database
   DB_FILE=/data/atletiranking.db
   DB_BACKUP_INTERVAL=3600000  # 1 hour
   DB_MAX_CONNECTIONS=10
   
   # Redis Cache
   REDIS_URL=redis://localhost:6379
   CACHE_TTL=300  # 5 minutes
   
   # Security
   JWT_SECRET=your-super-secret-jwt-key
   CORS_ORIGIN=https://atletiranking.com
   RATE_LIMIT_WINDOW=900000  # 15 minutes
   RATE_LIMIT_MAX=100
   
   # Monitoring
   LOG_LEVEL=info
   SENTRY_DSN=https://your-sentry-dsn
   
   # External APIs
   FIS_API_KEY=your-fis-api-key
   FIS_API_RATE_LIMIT=60  # requests per minute
   ```

#### 2.2 **Configurazione Dinamica**
   ```typescript
   // config/index.ts
   interface AppConfig {
     server: {
       port: number;
       host: string;
       cors: {
         origin: string[];
         credentials: boolean;
       };
     };
     database: {
       file: string;
       maxConnections: number;
       backupInterval: number;
     };
     cache: {
       url: string;
       ttl: number;
     };
     security: {
       jwtSecret: string;
       rateLimit: {
         windowMs: number;
         max: number;
       };
     };
   }
   
   const config: AppConfig = {
     server: {
       port: parseInt(process.env.PORT || '3001'),
       host: process.env.HOST || 'localhost',
       cors: {
         origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000'],
         credentials: true
       }
     },
     database: {
       file: process.env.DB_FILE || './atletiranking.db',
       maxConnections: parseInt(process.env.DB_MAX_CONNECTIONS || '5'),
       backupInterval: parseInt(process.env.DB_BACKUP_INTERVAL || '3600000')
     },
     cache: {
       url: process.env.REDIS_URL || 'redis://localhost:6379',
       ttl: parseInt(process.env.CACHE_TTL || '300')
     },
     security: {
       jwtSecret: process.env.JWT_SECRET || 'development-secret',
       rateLimit: {
         windowMs: parseInt(process.env.RATE_LIMIT_WINDOW || '900000'),
         max: parseInt(process.env.RATE_LIMIT_MAX || '100')
       }
     }
   };
   
   export default config;
   ```

### 3. **Pipeline CI/CD**

#### 3.1 **GitHub Actions Workflow**
   ```yaml
   # .github/workflows/ci-cd.yml
   name: CI/CD Pipeline
   
   on:
     push:
       branches: [main, develop]
     pull_request:
       branches: [main]
   
   jobs:
     test:
       runs-on: ubuntu-latest
       
       steps:
         - uses: actions/checkout@v3
         
         - name: Setup Node.js
           uses: actions/setup-node@v3
           with:
             node-version: '18'
             cache: 'npm'
         
         - name: Install dependencies
           run: npm ci
         
         - name: Run linting
           run: npm run lint
         
         - name: Run type checking
           run: npm run type-check
         
         - name: Run tests
           run: npm run test:coverage
         
         - name: Upload coverage
           uses: codecov/codecov-action@v3
   
     build:
       needs: test
       runs-on: ubuntu-latest
       
       steps:
         - uses: actions/checkout@v3
         
         - name: Setup Node.js
           uses: actions/setup-node@v3
           with:
             node-version: '18'
             cache: 'npm'
         
         - name: Install dependencies
           run: npm ci
         
         - name: Build application
           run: npm run build
         
         - name: Build Docker image
           run: |
             docker build -t atletiranking:${{ github.sha }} .
             docker tag atletiranking:${{ github.sha }} atletiranking:latest
   
     deploy:
       needs: build
       runs-on: ubuntu-latest
       if: github.ref == 'refs/heads/main'
       
       steps:
         - name: Deploy to production
           run: |
             # Deploy logic here
             echo "Deploying to production..."
   ```

#### 3.2 **Dockerfile Produzione**
   ```dockerfile
   # Multi-stage build per ottimizzazione
   FROM node:18-alpine AS builder
   
   WORKDIR /app
   
   # Installazione dipendenze
   COPY package*.json ./
   RUN npm ci --only=production
   
   # Build frontend
   COPY . .
   RUN npm run build
   
   # Stage produzione
   FROM node:18-alpine AS production
   
   # Creazione utente non-root
   RUN addgroup -g 1001 -S nodejs
   RUN adduser -S atletiranking -u 1001
   
   WORKDIR /app
   
   # Copia dipendenze e build
   COPY --from=builder /app/node_modules ./node_modules
   COPY --from=builder /app/build ./build
   COPY --from=builder /app/server.js ./
   COPY --from=builder /app/package.json ./
   
   # Creazione directory dati
   RUN mkdir -p /app/data && chown -R atletiranking:nodejs /app
   
   USER atletiranking
   
   EXPOSE 3001
   
   # Health check
   HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
     CMD curl -f http://localhost:3001/health || exit 1
   
   CMD ["node", "server.js"]
   ```

## 📊 Performance e Ottimizzazioni Enterprise

### 1. **Database Performance**

#### 1.1 **Ottimizzazioni SQLite**
   ```sql
   -- Configurazione performance SQLite
   PRAGMA journal_mode = WAL;
   PRAGMA synchronous = NORMAL;
   PRAGMA cache_size = 1000000;
   PRAGMA foreign_keys = ON;
   PRAGMA temp_store = MEMORY;
   
   -- Indici ottimizzati
   CREATE INDEX IF NOT EXISTS idx_atleti_fis_code ON atleti(fis_code);
   CREATE INDEX IF NOT EXISTS idx_atleti_nazionalita ON atleti(nazionalita);
   CREATE INDEX IF NOT EXISTS idx_atleti_sesso ON atleti(sesso);
   CREATE INDEX IF NOT EXISTS idx_gare_atleta_fis_code ON gare(atleta_fis_code);
   CREATE INDEX IF NOT EXISTS idx_gare_specialita ON gare_complete(specialty);
   CREATE INDEX IF NOT EXISTS idx_gare_data ON gare_complete(created_at);
   
   -- Indice composito per query complesse
   CREATE INDEX IF NOT EXISTS idx_gare_composite 
   ON gare(atleta_fis_code, gara_completa_id, posizione);
   ```

#### 1.2 **Connection Pooling**
   ```typescript
   // database/pool.ts
   import sqlite3 from 'sqlite3';
   import { open, Database } from 'sqlite';
   
   class DatabasePool {
     private pools: Map<string, Database[]> = new Map();
     private maxConnections = 10;
     private currentConnections = 0;
     
     async getConnection(): Promise<Database> {
       if (this.currentConnections < this.maxConnections) {
         const db = await open({
           filename: config.database.file,
           driver: sqlite3.Database
         });
         
         // Configurazione performance
         await db.exec(`
           PRAGMA journal_mode = WAL;
           PRAGMA synchronous = NORMAL;
           PRAGMA cache_size = 1000000;
           PRAGMA foreign_keys = ON;
         `);
         
         this.currentConnections++;
         return db;
       }
       
       // Attendi connessione disponibile
       return new Promise((resolve) => {
         const checkConnection = () => {
           if (this.currentConnections < this.maxConnections) {
             this.getConnection().then(resolve);
           } else {
             setTimeout(checkConnection, 10);
           }
         };
         checkConnection();
       });
     }
     
     async releaseConnection(db: Database): Promise<void> {
       await db.close();
       this.currentConnections--;
     }
   }
   
   export const dbPool = new DatabasePool();
   ```

### 2. **Frontend Performance**

#### 2.1 **Code Splitting Avanzato**
   ```typescript
   // Lazy loading con preloading
   const RankingPage = lazy(() => 
     import('./pages/Ranking').then(module => ({
       default: module.Ranking
     }))
   );
   
   const AthleteProfilePage = lazy(() => 
     import('./pages/AthleteProfile')
   );
   
   // Preloading strategico
   const preloadRanking = () => {
     const componentImport = import('./pages/Ranking');
     return componentImport;
   };
   
   // Hook per preloading
   const usePreloadPages = () => {
     useEffect(() => {
       // Preload dopo 2 secondi di idle
       const timer = setTimeout(() => {
         preloadRanking();
       }, 2000);
       
       return () => clearTimeout(timer);
     }, []);
   };
   ```

#### 2.2 **Memoization Strategica**
   ```typescript
   // Memoization per componenti pesanti
   const AthleteCard = React.memo<AthleteCardProps>(({ athlete, onSelect }) => {
     const memoizedStats = useMemo(() => {
       return calculateAthleteStats(athlete.gare);
     }, [athlete.gare]);
     
     return (
       <div className="athlete-card" onClick={() => onSelect(athlete.fis_code)}>
         <h3>{athlete.nome}</h3>
         <div className="stats">
           <span>Gare: {memoizedStats.totalRaces}</span>
           <span>Vittorie: {memoizedStats.wins}</span>
         </div>
       </div>
     );
   }, (prevProps, nextProps) => {
     // Custom comparison per ottimizzazione
     return (
       prevProps.athlete.fis_code === nextProps.athlete.fis_code &&
       prevProps.athlete.gare.length === nextProps.athlete.gare.length
     );
   });
   ```

### 3. **Caching Strategy**

#### 3.1 **Redis Implementation**
   ```typescript
   // cache/redis.ts
   import Redis from 'ioredis';
   import config from '../config';
   
   class CacheManager {
     private redis: Redis;
     
     constructor() {
       this.redis = new Redis(config.cache.url, {
         retryDelayOnFailover: 100,
         maxRetriesPerRequest: 3,
         lazyConnect: true
       });
     }
     
     async get<T>(key: string): Promise<T | null> {
       try {
         const value = await this.redis.get(key);
         return value ? JSON.parse(value) : null;
       } catch (error) {
         console.error('Cache get error:', error);
         return null;
       }
     }
     
     async set(key: string, value: any, ttl: number = config.cache.ttl): Promise<void> {
       try {
         await this.redis.setex(key, ttl, JSON.stringify(value));
       } catch (error) {
         console.error('Cache set error:', error);
       }
     }
     
     async invalidate(pattern: string): Promise<void> {
       try {
         const keys = await this.redis.keys(pattern);
         if (keys.length > 0) {
           await this.redis.del(...keys);
         }
       } catch (error) {
         console.error('Cache invalidation error:', error);
       }
     }
   }
   
   export const cache = new CacheManager();
   ```

#### 3.2 **API Caching Middleware**
   ```typescript
   // middleware/cache.ts
   import { Request, Response, NextFunction } from 'express';
   import { cache } from '../cache/redis';
   
   export const cacheMiddleware = (ttl: number = 300) => {
     return async (req: Request, res: Response, next: NextFunction) => {
       const cacheKey = `api:${req.method}:${req.originalUrl}`;
       
       try {
         const cachedData = await cache.get(cacheKey);
         
         if (cachedData) {
           res.setHeader('X-Cache', 'HIT');
           return res.json(cachedData);
         }
         
         // Override res.json per cachare la risposta
         const originalJson = res.json;
         res.json = function(data: any) {
           cache.set(cacheKey, data, ttl);
           res.setHeader('X-Cache', 'MISS');
           return originalJson.call(this, data);
         };
         
         next();
       } catch (error) {
         console.error('Cache middleware error:', error);
         next();
       }
     };
   };
   ```

## 🔐 Sicurezza Enterprise

### 1. **Authentication & Authorization**

#### 1.1 **JWT Implementation**
   ```typescript
   // auth/jwt.ts
   import jwt from 'jsonwebtoken';
   import config from '../config';
   
   interface TokenPayload {
     userId: string;
     role: 'admin' | 'user';
     permissions: string[];
   }
   
   export class JWTManager {
     static generateToken(payload: TokenPayload): string {
       return jwt.sign(payload, config.security.jwtSecret, {
         expiresIn: '24h',
         issuer: 'atletiranking',
         audience: 'atletiranking-users'
       });
     }
     
     static verifyToken(token: string): TokenPayload | null {
       try {
         return jwt.verify(token, config.security.jwtSecret) as TokenPayload;
       } catch (error) {
         return null;
       }
     }
     
     static refreshToken(token: string): string | null {
       const payload = this.verifyToken(token);
       if (!payload) return null;
       
       // Genera nuovo token con payload aggiornato
       return this.generateToken({
         userId: payload.userId,
         role: payload.role,
         permissions: payload.permissions
       });
     }
   }
   ```

#### 1.2 **Rate Limiting**
   ```typescript
   // middleware/rateLimiter.ts
   import rateLimit from 'express-rate-limit';
   import RedisStore from 'rate-limit-redis';
   import { cache } from '../cache/redis';
   import config from '../config';
   
   // Rate limiter generale
   export const generalLimiter = rateLimit({
     store: new RedisStore({
       client: cache.redis,
       prefix: 'rl:general:'
     }),
     windowMs: config.security.rateLimit.windowMs,
     max: config.security.rateLimit.max,
     message: {
       error: 'Troppi tentativi. Riprova più tardi.',
       retryAfter: Math.ceil(config.security.rateLimit.windowMs / 1000)
     },
     standardHeaders: true,
     legacyHeaders: false
   });
   
   // Rate limiter per API sensibili
   export const strictLimiter = rateLimit({
     store: new RedisStore({
       client: cache.redis,
       prefix: 'rl:strict:'
     }),
     windowMs: 15 * 60 * 1000, // 15 minuti
     max: 10, // 10 richieste per finestra
     message: {
       error: 'Limite richieste superato per questa operazione.',
       retryAfter: 900
     }
   });
   ```

### 2. **Input Validation & Sanitization**

#### 2.1 **Validation Schemas**
   ```typescript
   // validation/schemas.ts
   import Joi from 'joi';
   
   export const athleteSchema = Joi.object({
     fis_code: Joi.string().pattern(/^[0-9]{6,7}$/).required(),
     nome: Joi.string().min(2).max(100).required(),
     eta: Joi.number().integer().min(15).max(50),
     sesso: Joi.string().valid('M', 'F').required(),
     nazionalita: Joi.string().length(3).uppercase().required(),
     club: Joi.string().max(100).optional()
   });
   
   export const raceSchema = Joi.object({
     specialty: Joi.string().valid(
       'Slalom', 'Giant Slalom', 'Super-G', 'Downhill', 'Alpine Combined'
     ).required(),
     category: Joi.string().valid('World Cup', 'FIS', 'Continental Cup').required(),
     fis_url: Joi.string().uri().required(),
     athletes: Joi.array().items(
       Joi.object({
         fis_code: Joi.string().pattern(/^[0-9]{6,7}$/).required(),
         posizione: Joi.alternatives().try(
           Joi.number().integer().min(1),
           Joi.string().valid('DNF', 'DSQ', 'DNS')
         ).required(),
         punti_fis: Joi.number().precision(2).min(0).max(999.99).optional(),
         tempo_totale: Joi.string().pattern(/^[0-9]+:[0-9]{2}\.[0-9]{2}$/).optional()
       })
     ).min(1).required()
   });
   ```

#### 2.2 **Sanitization Middleware**
   ```typescript
   // middleware/sanitization.ts
   import { Request, Response, NextFunction } from 'express';
   import DOMPurify from 'isomorphic-dompurify';
   
   export const sanitizeInput = (req: Request, res: Response, next: NextFunction) => {
     const sanitizeObject = (obj: any): any => {
       if (typeof obj === 'string') {
         return DOMPurify.sanitize(obj.trim());
       }
       
       if (Array.isArray(obj)) {
         return obj.map(sanitizeObject);
       }
       
       if (obj && typeof obj === 'object') {
         const sanitized: any = {};
         for (const [key, value] of Object.entries(obj)) {
           sanitized[key] = sanitizeObject(value);
         }
         return sanitized;
       }
       
       return obj;
     };
     
     if (req.body) {
       req.body = sanitizeObject(req.body);
     }
     
     if (req.query) {
       req.query = sanitizeObject(req.query);
     }
     
     next();
   };
   ```

## 🚀 Roadmap e Funzionalità Future

### 1. **Q1 2024 - Foundation Enhancement**

#### 1.1 **Real-time Features**
   ```typescript
   // Implementazione WebSocket per aggiornamenti real-time
   import { Server as SocketIOServer } from 'socket.io';
   
   class RealTimeManager {
     private io: SocketIOServer;
     
     constructor(server: any) {
       this.io = new SocketIOServer(server, {
         cors: {
           origin: config.server.cors.origin,
           methods: ['GET', 'POST']
         }
       });
       
       this.setupEventHandlers();
     }
     
     private setupEventHandlers() {
       this.io.on('connection', (socket) => {
         console.log('Client connected:', socket.id);
         
         // Sottoscrizione a aggiornamenti ranking
         socket.on('subscribe:rankings', (filters) => {
           socket.join(`rankings:${JSON.stringify(filters)}`);
         });
         
         // Sottoscrizione a profilo atleta
         socket.on('subscribe:athlete', (fisCode) => {
           socket.join(`athlete:${fisCode}`);
         });
       });
     }
     
     // Notifica aggiornamenti ranking
     notifyRankingUpdate(filters: any, newData: any) {
       this.io.to(`rankings:${JSON.stringify(filters)}`)
          .emit('ranking:updated', newData);
     }
     
     // Notifica aggiornamenti atleta
     notifyAthleteUpdate(fisCode: string, athleteData: any) {
       this.io.to(`athlete:${fisCode}`)
          .emit('athlete:updated', athleteData);
     }
   }
   ```

#### 1.2 **Advanced Analytics**
   ```typescript
   // Sistema di analytics avanzato
   interface PerformanceMetrics {
     trend: 'improving' | 'declining' | 'stable';
     consistency: number; // 0-100
     peakPerformance: {
       date: string;
       race: string;
       position: number;
     };
     predictions: {
       nextRaceExpectedPosition: number;
       seasonEndRanking: number;
       confidence: number;
     };
   }
   
   class AnalyticsEngine {
     static calculatePerformanceMetrics(races: Race[]): PerformanceMetrics {
       const sortedRaces = races.sort((a, b) => 
         new Date(a.data).getTime() - new Date(b.data).getTime()
       );
       
       // Calcolo trend
       const trend = this.calculateTrend(sortedRaces);
       
       // Calcolo consistenza
       const consistency = this.calculateConsistency(sortedRaces);
       
       // Identificazione picco performance
       const peakPerformance = this.findPeakPerformance(sortedRaces);
       
       // Predizioni ML
       const predictions = this.generatePredictions(sortedRaces);
       
       return {
         trend,
         consistency,
         peakPerformance,
         predictions
       };
     }
     
     private static calculateTrend(races: Race[]): 'improving' | 'declining' | 'stable' {
       if (races.length < 3) return 'stable';
       
       const recentRaces = races.slice(-5);
       const positions = recentRaces
         .filter(r => typeof r.posizione === 'number')
         .map(r => r.posizione as number);
       
       if (positions.length < 3) return 'stable';
       
       const slope = this.calculateLinearRegression(positions).slope;
       
       if (slope < -0.5) return 'improving'; // Posizioni migliori (numeri più bassi)
       if (slope > 0.5) return 'declining';
       return 'stable';
     }
   }
   ```

### 2. **Q2 2024 - User Experience**

#### 2.1 **PWA Implementation**
   ```typescript
   // Service Worker per PWA
   const CACHE_NAME = 'atletiranking-v1';
   const urlsToCache = [
     '/',
     '/static/js/bundle.js',
     '/static/css/main.css',
     '/manifest.json'
   ];
   
   self.addEventListener('install', (event: any) => {
     event.waitUntil(
       caches.open(CACHE_NAME)
         .then((cache) => cache.addAll(urlsToCache))
     );
   });
   
   self.addEventListener('fetch', (event: any) => {
     event.respondWith(
       caches.match(event.request)
         .then((response) => {
           // Cache hit - return response
           if (response) {
             return response;
           }
           
           // Clone request for cache
           const fetchRequest = event.request.clone();
           
           return fetch(fetchRequest).then((response) => {
             if (!response || response.status !== 200 || response.type !== 'basic') {
               return response;
             }
             
             const responseToCache = response.clone();
             
             caches.open(CACHE_NAME)
               .then((cache) => {
                 cache.put(event.request, responseToCache);
               });
             
             return response;
           });
         })
     );
   });
   ```

### 3. **Q3-Q4 2024 - Scalability & Advanced Features**

#### 3.1 **GraphQL API**
   ```typescript
   // GraphQL Schema
   import { buildSchema } from 'graphql';
   
   const schema = buildSchema(`
     type Athlete {
       fisCode: String!
       nome: String!
       eta: Int
       sesso: String!
       nazionalita: String!
       club: String
       gare: [Race!]!
       statistics: AthleteStatistics!
       rankings: [Ranking!]!
     }
     
     type Race {
       id: ID!
       specialty: String!
       category: String!
       data: String!
       luogo: String!
       posizione: String!
       puntiFis: Float
       puntiCoppa: Int
       tempoTotale: String
       distacco: String
     }
     
     type AthleteStatistics {
       totalRaces: Int!
       wins: Int!
       podiums: Int!
       averagePosition: Float!
       bestResult: Int!
       consistency: Float!
       trend: String!
     }
     
     type Query {
       athlete(fisCode: String!): Athlete
       athletes(filters: AthleteFilters): [Athlete!]!
       races(filters: RaceFilters): [Race!]!
       rankings(specialty: String, gender: String): [Athlete!]!
     }
     
     input AthleteFilters {
       gender: String
       nationality: String
       ageMin: Int
       ageMax: Int
       specialty: String
     }
     
     input RaceFilters {
       specialty: String
       category: String
       dateFrom: String
       dateTo: String
       location: String
     }
   `);
   ```

#### 3.2 **Machine Learning Integration**
   ```python
   # ml/predictor.py
   import pandas as pd
   import numpy as np
   from sklearn.ensemble import RandomForestRegressor
   from sklearn.model_selection import train_test_split
   import joblib
   
   class PerformancePredictor:
       def __init__(self):
           self.model = RandomForestRegressor(n_estimators=100, random_state=42)
           self.is_trained = False
       
       def prepare_features(self, athlete_data):
           """Prepara features per il modello ML"""
           features = []
           
           # Features temporali
           features.extend([
               athlete_data['age'],
               athlete_data['races_count'],
               athlete_data['recent_form'],  # Media ultime 5 gare
               athlete_data['consistency'],   # Deviazione standard posizioni
           ])
           
           # Features specialità
           specialty_encoding = {
               'Slalom': 0, 'Giant Slalom': 1, 'Super-G': 2, 
               'Downhill': 3, 'Alpine Combined': 4
           }
           features.append(specialty_encoding.get(athlete_data['specialty'], 0))
           
           # Features ambientali
           features.extend([
               athlete_data['weather_conditions'],
               athlete_data['slope_difficulty'],
               athlete_data['competition_level']
           ])
           
           return np.array(features).reshape(1, -1)
       
       def train(self, training_data):
           """Addestra il modello con dati storici"""
           X = np.array([self.prepare_features(data).flatten() for data in training_data])
           y = np.array([data['actual_position'] for data in training_data])
           
           X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
           
           self.model.fit(X_train, y_train)
           
           # Valutazione modello
           score = self.model.score(X_test, y_test)
           print(f"Model accuracy: {score:.3f}")
           
           self.is_trained = True
           
           # Salva modello
           joblib.dump(self.model, 'performance_predictor.pkl')
       
       def predict_position(self, athlete_data):
           """Predice la posizione per una gara futura"""
           if not self.is_trained:
               raise ValueError("Model must be trained first")
           
           features = self.prepare_features(athlete_data)
           prediction = self.model.predict(features)[0]
           
           # Calcola intervallo di confidenza
           confidence = self.calculate_confidence(features)
           
           return {
               'predicted_position': round(prediction),
               'confidence': confidence,
               'range': (max(1, round(prediction - confidence)), 
                        round(prediction + confidence))
           }
   ```

---

*Questa documentazione fornisce una panoramica completa del sistema AtletiRanking, dalle funzionalità di base all'architettura tecnica, per permettere una comprensione approfondita e facilitare lo sviluppo futuro.*