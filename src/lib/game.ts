import { db } from './firebase';
import { doc, updateDoc, onSnapshot } from 'firebase/firestore';
import type { GameRoom, Player } from '../types/game';
import { getRandomWords, generateOptions } from './words';

export async function joinGameRoom(roomId: string, player: Player) {
  const roomRef = doc(db, 'games', roomId);
  
  await updateDoc(roomRef, {
    players: [player]
  });
}

export function subscribeToGame(roomId: string, callback: (game: GameRoom) => void) {
  return onSnapshot(doc(db, 'games', roomId), (doc) => {
    if (doc.exists()) {
      callback(doc.data() as GameRoom);
    }
  });
}

export async function startNewRound(roomId: string) {
  const [word] = getRandomWords(1);
  const options = generateOptions(word.spanish);
  
  const roomRef = doc(db, 'games', roomId);
  await updateDoc(roomRef, {
    currentWord: word,
    options,
    timer: 30
  });
}

export async function updateGameScore(roomId: string, playerId: string, newScore: number) {
  const roomRef = doc(db, 'games', roomId);
  
  await updateDoc(roomRef, {
    players: [{
      id: playerId,
      score: newScore
    }]
  });
}