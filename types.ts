export interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number; // Timestamp
}

export enum Mood {
  HAPPY = 'HAPPY',
  THINKING = 'THINKING',
  EXCITED = 'EXCITED',
  SHOCKED = 'SHOCKED',
}

export type QuoteType = 'welcome' | 'add' | 'complete' | 'delete' | 'full' | 'idle';
