/**
 * Formatta un tempo in millisecondi nel formato mm:ss.SSS
 * @param timeMs Tempo in millisecondi
 * @returns Stringa formattata del tempo
 */
export const formatTime = (timeMs: number): string => {
  if (!timeMs || timeMs <= 0) return '-';
  
  const totalSeconds = timeMs / 1000;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  
  if (minutes > 0) {
    return `${minutes}:${seconds.toFixed(3).padStart(6, '0')}`;
  } else {
    return `${seconds.toFixed(3)}s`;
  }
};

/**
 * Formatta una data nel formato italiano
 * @param date Data da formattare
 * @returns Stringa formattata della data
 */
export const formatDate = (date: string | Date): string => {
  const d = new Date(date);
  return d.toLocaleDateString('it-IT', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Formatta una data nel formato breve
 * @param date Data da formattare
 * @returns Stringa formattata della data
 */
export const formatDateShort = (date: string | Date): string => {
  const d = new Date(date);
  return d.toLocaleDateString('it-IT', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
};

/**
 * Formatta un numero con separatori delle migliaia
 * @param num Numero da formattare
 * @returns Stringa formattata del numero
 */
export const formatNumber = (num: number): string => {
  return num.toLocaleString('it-IT');
};

/**
 * Formatta i punti FIS
 * @param points Punti FIS
 * @returns Stringa formattata dei punti
 */
export const formatFisPoints = (points: number | null | undefined): string => {
  if (points === null || points === undefined) return '-';
  return points.toFixed(2);
};

/**
 * Formatta la differenza di tempo
 * @param timeMs Tempo in millisecondi
 * @param referenceTimeMs Tempo di riferimento in millisecondi
 * @returns Stringa formattata della differenza
 */
export const formatTimeDifference = (timeMs: number, referenceTimeMs: number): string => {
  if (!timeMs || !referenceTimeMs) return '-';
  
  const diff = timeMs - referenceTimeMs;
  const sign = diff >= 0 ? '+' : '';
  const diffSeconds = Math.abs(diff) / 1000;
  
  return `${sign}${diffSeconds.toFixed(3)}s`;
};

/**
 * Formatta la percentuale
 * @param value Valore
 * @param total Totale
 * @returns Stringa formattata della percentuale
 */
export const formatPercentage = (value: number, total: number): string => {
  if (total === 0) return '0%';
  const percentage = (value / total) * 100;
  return `${percentage.toFixed(1)}%`;
};

/**
 * Capitalizza la prima lettera di una stringa
 * @param str Stringa da capitalizzare
 * @returns Stringa capitalizzata
 */
export const capitalize = (str: string): string => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Formatta il nome completo di un atleta
 * @param nome Nome
 * @param cognome Cognome
 * @returns Nome completo formattato
 */
export const formatAthleteName = (nome: string, cognome: string): string => {
  return `${capitalize(nome)} ${capitalize(cognome)}`;
};

/**
 * Formatta la specialità
 * @param specialita Codice specialità
 * @returns Nome completo della specialità
 */
export const formatSpecialty = (specialita: string): string => {
  const specialties: Record<string, string> = {
    'SL': 'Slalom',
    'GS': 'Slalom Gigante',
    'SG': 'Super Gigante',
    'DH': 'Discesa Libera',
    'AC': 'Alpine Combined'
  };
  
  return specialties[specialita] || specialita;
};

/**
 * Formatta il codice nazione con emoji bandiera
 * @param nazione Codice nazione
 * @returns Codice nazione con emoji
 */
export const formatCountry = (nazione: string): string => {
  const countries: Record<string, string> = {
    'ITA': '🇮🇹 ITA',
    'AUT': '🇦🇹 AUT',
    'SUI': '🇨🇭 SUI',
    'FRA': '🇫🇷 FRA',
    'GER': '🇩🇪 GER',
    'USA': '🇺🇸 USA',
    'CAN': '🇨🇦 CAN',
    'NOR': '🇳🇴 NOR',
    'SWE': '🇸🇪 SWE'
  };
  
  return countries[nazione] || nazione;
};

/**
 * Tronca un testo alla lunghezza specificata
 * @param text Testo da troncare
 * @param maxLength Lunghezza massima
 * @returns Testo troncato
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
};