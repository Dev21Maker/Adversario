export interface Word {
  english: string;
  spanish: string;
}

export interface Player {
  id: string;
  name: string;
  score: number;
  photoURL?: string;
}

export interface GameRoom {
  id: string;
  players: Player[];
  currentRound: number;
  totalRounds: number;
  status: 'waiting' | 'playing' | 'finished';
  currentWord?: Word;
  options?: string[];
  timer?: number;
}