// Interfacce principali
export interface Atleta {
  fis_code: string;
  nome: string;
  cognome?: string;
  nazione?: string;
  nazionalita: string;
  nazione_completa?: string;
  data_nascita: string;
  sesso: 'M' | 'F';
  eta: number;
  club?: string;
  specialita_principale?: Specialty;
  punti_fis?: number;
  punti_sl?: number;
  punti_gs?: number;
  punti_sg?: number;
  punti_dh?: number;
  punti_ac?: number;
  miglior_tempo?: number;
  numero_gare?: number;
  vittorie?: number;
  podi?: number;
  totale_gare?: number;
  posizione_media?: number;
  miglior_posizione?: number;
  created_at?: string;
  updated_at?: string;
  data_creazione?: string;
  data_aggiornamento?: string;
}

export interface Gara {
  id: number;
  nome: string;
  data: string;
  localita: string;
  specialita: string;
  tempo?: number;
  posizione?: number;
  punti_fis?: number;
  created_at?: string;
  updated_at?: string;
}

// Athlete types
export interface Athlete {
  fis_code: string;
  nome: string;
  eta?: number;
  sesso: 'M' | 'F';
  club?: string;
  nazionalita: string;
  nazione_completa?: string;
  punti_sl?: number;
  punti_gs?: number;
  punti_sg?: number;
  punti_dh?: number;
  punti_ac?: number;
  data_creazione?: string;
  data_aggiornamento?: string;
}

// Race types
export interface Race {
  id?: number;
  atleta_fis_code: string;
  url: string;
  data: string;
  luogo?: string;
  nazione?: string;
  categoria: string;
  specialita: Specialty;
  posizione: string;
  punti_fis?: string;
  punti_coppa?: string;
  data_inserimento?: string;
}

// Complete race types
export interface CompleteRace {
  id?: number;
  specialty: string;
  category: string;
  fis_url: string;
  data_gara?: string;
  luogo?: string;
  nazione?: string;
  risultati: RaceResult[];
  data_inserimento?: string;
}

// Race result for individual athlete in a race
export interface RaceResult {
  Rank: string;
  Bib: string;
  'FIS code': string;
  Athlete: string;
  Year: string;
  Nation: string;
  'Run 1'?: string;
  'Run 2'?: string;
  'Total Time'?: string;
  'Diff. Time'?: string;
  'FIS Points'?: string;
  'Cup Points'?: string;
}

// Specialty enum
export type Specialty = 
  | 'Slalom' 
  | 'Giant Slalom' 
  | 'Super-G' 
  | 'Downhill' 
  | 'Alpine Combined'
  | 'slalom' 
  | 'giant slalom' 
  | 'super-g' 
  | 'downhill' 
  | 'alpine combined';

// Tipi per le risposte API
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  total?: number;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// API response types
export interface ApiResponseOld<T> {
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface AthleteListResponse {
  atleti: Athlete[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Tipi per i filtri
export interface Filtri {
  specialita?: string;
  nazione?: string;
  sesso?: 'M' | 'F' | 'm' | 'f' | '';
  eta_min?: number;
  eta_max?: number;
  punti_fis_min?: number;
  punti_fis_max?: number;
}

export interface FiltriAtleti {
  specialita?: string;
  nazione?: string;
  sesso?: 'M' | 'F' | '';
  eta_min?: number;
  eta_max?: number;
  punti_fis_min?: number;
  punti_fis_max?: number;
}

// Filter types
export interface AthleteFilters {
  search?: string;
  nazionalita?: string;
  sesso?: 'M' | 'F';
  specialita?: Specialty;
  page?: number;
  limit?: number;
}

export interface RaceFilters {
  specialita?: Specialty;
  categoria?: string;
  anno?: string;
  page?: number;
  limit?: number;
}

// Ranking types
export interface RankingEntry extends Athlete {
  totale_gare: number;
  vittorie: number;
  posizione_media: number;
  ranking_position?: number;
}

// Statistics types
export interface AthleteStats {
  totale_gare: number;
  vittorie: number;
  podi: number;
  top_10: number;
  dnf: number;
  posizione_media: number;
  migliore_posizione: number;
  punti_fis_migliori: number;
  specialita_preferita: Specialty;
}

// Form types for data input
export interface AthleteForm {
  fis_code: string;
  nome: string;
  eta?: number;
  sesso: 'M' | 'F';
  club?: string;
  nazionalita: string;
  nazione_completa?: string;
}

export interface RaceForm {
  atleta_fis_code: string;
  url: string;
  data: string;
  luogo?: string;
  nazione?: string;
  categoria: string;
  specialita: Specialty;
  posizione: string;
  punti_fis?: string;
  punti_coppa?: string;
}

// n8n integration types
export interface N8nSingleRace {
  specialty: string;
  category: string;
  athletes: RaceResult[];
  url: string;
}

export interface N8nAthleteData {
  atleta: {
    nome: string;
    gruppo_sportivo?: string;
    nazione_short: string;
    nazione_full?: string;
    fis_code: string;
    sesso: 'M' | 'F';
    eta?: number;
  };
  gare: {
    url: string;
    data: string;
    luogo?: string;
    nazione?: string;
    categoria: string;
    specialita: string;
    posizione: string;
    punti_fis?: string;
    punti_coppa?: string;
  }[];
}

// UI State types
export interface LoadingState {
  isLoading: boolean;
  error?: string;
}

export interface TableSort {
  field: string;
  direction: 'asc' | 'desc';
}

export interface ViewMode {
  mode: 'table' | 'card' | 'grid';
}

// Theme types
export interface Theme {
  mode: 'light' | 'dark';
  primaryColor: string;
  secondaryColor: string;
}

// Navigation types
export interface BreadcrumbItem {
  label: string;
  path?: string;
  active?: boolean;
}

// Export utility type for component props
export type ComponentProps<T = {}> = T & {
  className?: string;
  children?: React.ReactNode;
};

// Error types
export interface AppError {
  code: string;
  message: string;
  details?: any;
  timestamp: string;
}

// Performance monitoring types
export interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  apiResponseTime: number;
  memoryUsage?: number;
}