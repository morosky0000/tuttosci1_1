# 📊 AtletiRanking - Documentazione API

## 🚀 Server Backend

Il server backend è disponibile su: **http://localhost:3001**

## 📋 Endpoints Disponibili

### 1. 📥 POST - Aggiungi Nuovo Atleta

**URL:** `POST http://localhost:3001/api/atleti`

**Formato Input (da n8n):**
```json
{
  "atleta": {
    "codice_fis": "FIS code",
    "nome": "ACCORDINI Anna",
    "nazionalita": "ITA",
    "eta": "22",
    "sesso": "F",
    "club": "U.S. MONTI PALLIDI A.S.D."
  }
}
```

**Configurazione Nodo HTTP Request in n8n:**
- **Method:** POST
- **URL:** http://localhost:3001/api/atleti
- **Headers:**
  - Content-Type: application/json
- **Body:** JSON
- **JSON Body:** Il formato sopra indicato

**Risposta di Successo (201):**
```json
{
  "message": "Atleta aggiunto con successo",
  "atleta": {
    "codice_fis": "FIS code",
    "nome": "ACCORDINI Anna",
    "nazionalita": "ITA",
    "eta": 22,
    "sesso": "F",
    "club": "U.S. MONTI PALLIDI A.S.D.",
    "punti": {
      "sl": null,
      "gs": null,
      "sg": null,
      "dh": null,
      "ac": null
    },
    "data_nascita": "2024-01-01"
  }
}
```

### 2. 🔄 PUT - Aggiorna Punti Atleta

**URL:** `PUT http://localhost:3001/api/atleti/{codice_fis}/punti`

**Formato Input:**
```json
{
  "specialita": "sl",
  "punti": 45.2
}
```

**Specialità Valide:**
- `sl` - Slalom
- `gs` - Slalom Gigante
- `sg` - Super Gigante
- `dh` - Discesa Libera
- `ac` - Alpine Combined

**Esempio Configurazione n8n:**
- **Method:** PUT
- **URL:** http://localhost:3001/api/atleti/{{$json.codice_fis}}/punti
- **Headers:**
  - Content-Type: application/json
- **Body:**
```json
{
  "specialita": "sl",
  "punti": 45.2
}
```

### 3. 📋 GET - Ottieni Tutti gli Atleti

**URL:** `GET http://localhost:3001/api/atleti`

**Risposta:**
```json
[
  {
    "codice_fis": "FIS code",
    "nome": "ACCORDINI Anna",
    "nazionalita": "ITA",
    "eta": 22,
    "sesso": "F",
    "club": "U.S. MONTI PALLIDI A.S.D.",
    "punti": {
      "sl": 45.2,
      "gs": null,
      "sg": null,
      "dh": null,
      "ac": null
    },
    "data_nascita": "2024-01-01"
  }
]
```

### 4. 🗑️ DELETE - Elimina Atleta

**URL:** `DELETE http://localhost:3001/api/atleti/{codice_fis}`

## 🔧 Configurazione n8n

### Per Inviare Atleti Uno alla Volta:

1. **Nodo Split In Batches** (se hai un array di atleti)
   - Batch Size: 1

2. **Nodo HTTP Request**
   - Method: POST
   - URL: http://localhost:3001/api/atleti
   - Headers: Content-Type: application/json
   - Body: 
   ```json
   {
     "atleta": {
       "codice_fis": "{{$json.atleta.codice_fis}}",
       "nome": "{{$json.atleta.nome}}",
       "nazionalita": "{{$json.atleta.nazionalita}}",
       "eta": "{{$json.atleta.eta}}",
       "sesso": "{{$json.atleta.sesso}}",
       "club": "{{$json.atleta.club}}"
     }
   }
   ```

3. **Nodo Wait** (opzionale)
   - Per evitare di sovraccaricare il server
   - Wait Time: 100ms

## ⚠️ Note Importanti

1. **Codice FIS Unico:** Ogni atleta deve avere un codice FIS univoco
2. **Sesso:** Deve essere "M" o "F" (maiuscolo)
3. **Nazionalità:** Usa codici a 3 lettere (ITA, GER, FRA, etc.)
4. **Punti:** Vengono aggiunti separatamente con l'endpoint PUT
5. **Server:** Assicurati che entrambi i server siano avviati:
   - Frontend: http://localhost:3000
   - Backend: http://localhost:3001

## 🎯 Workflow Consigliato

1. **Prima fase:** Invia tutti gli atleti con POST
2. **Seconda fase:** Aggiorna i punti per specialità con PUT
3. **Verifica:** Controlla il frontend su http://localhost:3000

## 🐛 Gestione Errori

- **409:** Atleta già esistente
- **400:** Dati mancanti o non validi
- **404:** Atleta non trovato (per PUT/DELETE)
- **500:** Errore interno del server