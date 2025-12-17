export interface Status {
  id: string;
  name: string;
}

export interface Transition {
  id: string;
  name: string;
  from: string;
  to: string;
}

export interface Configuration {
  statuses: Status[];
  transitions: Transition[];
  initialStatus: string | null;
}