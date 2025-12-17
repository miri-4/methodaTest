// Status interface definition
export interface Status {
  id: string;
  name: string;
}

// Transition interface definition
export interface Transition {
  id: string;
  name: string;
  from: string;
  to: string;
}

// Extended Status with additional metadata
export interface StatusInfo extends Status {
  isInitial: boolean;
  isOrphan: boolean;
  isFinal: boolean;
}

// Configuration containing all statuses and transitions
export interface Configuration {
  statuses: Status[];
  transitions: Transition[];
  initialStatus: string | null;
}

// API Response type for errors
export interface ApiError {
  message: string;
  status: number;
}