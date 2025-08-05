# Come utilizzare il file FIS statico nel workflow

## Problema risolto
Invece di fare una chiamata GET all'URL FIS che restituisce HTML, ora hai un file JSON statico con tutto l'HTML già scaricato.

## File creato
- `fis_static_data.json` - Contiene l'HTML della pagina FIS con metadati

## Struttura del JSON
```json
{
  "html_content": "<html>...tutto l'HTML della pagina FIS...</html>",
  "source": "FIS Alpine Skiing Biographies - Italian Athletes",
  "url": "https://www.fis-ski.com/DB/alpine-skiing/biographies.html?nationcode=ITA",
  "timestamp": "2025-08-03T00:26:42.355Z",
  "description": "Static HTML content from FIS website for Italian alpine skiing athletes"
}
```

## Come usarlo nel workflow

### Opzione 1: Nodo "Read File"
1. Sostituisci il nodo HTTP GET con un nodo "Read File"
2. Imposta il path: `fis_static_data.json`
3. Il nodo successivo riceverà il JSON con l'HTML in `html_content`

### Opzione 2: Nodo "Code" con JSON statico
1. Sostituisci il nodo HTTP GET con un nodo "Code"
2. Copia il contenuto di `fis_static_data.json` nel nodo
3. Return il JSON direttamente

### Opzione 3: Nodo "Set" con dati statici
1. Usa un nodo "Set" per impostare i dati
2. Imposta `html_content` con il valore dal file JSON

## Vantaggi
- ✅ Nessuna chiamata HTTP esterna
- ✅ Workflow sempre funzionante
- ✅ Velocità maggiore
- ✅ Nessun rate limiting
- ✅ Dati consistenti

## Aggiornamento dati
Per aggiornare i dati, esegui:
```bash
node create_fis_json.js
```

Questo scaricherà nuovamente la pagina FIS e aggiornerà il file JSON.