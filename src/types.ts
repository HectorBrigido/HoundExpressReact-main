export type GuideStatus = 'pendiente' | 'en-transito' | 'entregado';

export interface Guide {
  id: string;
  status: GuideStatus;
  origin: string;
  destination: string;
  lastUpdate: string; // ISO date string
}

export interface HistoryEntry {
  guideId: string;
  timestamp: string; // ISO date string
  event: string;
}