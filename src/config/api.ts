// Configurazione API per diversi ambienti

const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';

// URL base per le API
export const API_BASE_URL = isDevelopment 
  ? 'http://localhost:3001/api'
  : '/.netlify/functions/api';

// Headers comuni per le richieste
export const API_HEADERS = {
  'Content-Type': 'application/json',
};

// Configurazione per fetch con retry
export const fetchWithRetry = async (url: string, options: RequestInit = {}, retries = 3): Promise<Response> => {
  const fullUrl = url.startsWith('http') ? url : `${API_BASE_URL}${url}`;
  
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(fullUrl, {
        ...options,
        headers: {
          ...API_HEADERS,
          ...options.headers,
        },
      });
      
      if (response.ok) {
        return response;
      }
      
      // Se è l'ultimo tentativo, lancia l'errore
      if (i === retries - 1) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      // Se è l'ultimo tentativo, rilancia l'errore
      if (i === retries - 1) {
        throw error;
      }
      
      // Attendi prima del prossimo tentativo
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
  
  throw new Error('Tutti i tentativi di richiesta falliti');
};

// Utility per costruire URL con parametri
export const buildApiUrl = (endpoint: string, params?: Record<string, string | number | undefined>): string => {
  // Assicurati che l'endpoint inizi con /
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  
  let fullUrl: string;
  
  if (API_BASE_URL.startsWith('http')) {
    // Ambiente di sviluppo - URL completo
    fullUrl = `${API_BASE_URL}${cleanEndpoint}`;
  } else {
    // Ambiente di produzione - percorso relativo
    fullUrl = `${API_BASE_URL}${cleanEndpoint}`;
  }
  
  // Aggiungi parametri query se presenti
  if (params) {
    const url = new URL(fullUrl, window.location.origin);
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        url.searchParams.append(key, String(value));
      }
    });
    return url.toString();
  }
  
  return fullUrl;
};

export default {
  API_BASE_URL,
  API_HEADERS,
  fetchWithRetry,
  buildApiUrl,
};