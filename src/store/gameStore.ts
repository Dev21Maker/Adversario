import { create } from 'zustand';
import type { GameRoom, Player } from '../types/game';
import { auth } from '../lib/firebase';
import { getDisplayName } from '../lib/auth';

interface GameState {
  currentRoom: GameRoom | null;
  player: Player | null;
  setRoom: (room: GameRoom | null) => void;
  setPlayer: (player: Player | null) => void;
  updateScore: (playerId: string, newScore: number) => void;
  initializePlayer: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  currentRoom: null,
  player: null,
  setRoom: (room) => set({ currentRoom: room }),
  setPlayer: (player) => set({ player }),
  updateScore: (playerId, newScore) =>
    set((state) => ({
      currentRoom: state.currentRoom
        ? {
            ...state.currentRoom,
            players: state.currentRoom.players.map((p) =>
              p.id === playerId ? { ...p, score: newScore } : p
            ),
          }
        : null,
    })),
  initializePlayer: () => {
    const user = auth.currentUser;
    if (user) {
      set({
        player: {
          id: user.uid,
          name: getDisplayName(user),
          score: 0,
          photoURL: user.photoURL || undefined,
        },
      });
    }
  },
}));