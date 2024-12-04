import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../lib/firebase';
import { collection, addDoc, doc, getDoc } from 'firebase/firestore';
import { Play, Users, Sword } from 'lucide-react';
import { GamePanel } from '../components/GamePanel';

export function Home() {
  const [roomCode, setRoomCode] = useState('');
  const [error, setError] = useState('');
  const [showGamePanel, setShowGamePanel] = useState(false);
  const navigate = useNavigate();

  const createGame = async () => {
    try {
      const gameRef = await addDoc(collection(db, 'games'), {
        status: 'waiting',
        players: [],
        currentRound: 0,
        totalRounds: 10,
      });
      navigate(`/game/${gameRef.id}`);
    } catch (error) {
      console.error('Error creating game:', error);
    }
  };

  const joinGame = async () => {
    try {
      const gameRef = doc(db, 'games', roomCode);
      const gameSnap = await getDoc(gameRef);
      
      if (!gameSnap.exists()) {
        setError('Game room not found');
        return;
      }
      
      navigate(`/game/${roomCode}`);
    } catch (error) {
      setError('Error joining game');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Spanish Learning PvP
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Challenge friends and learn Spanish together
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <button
            onClick={() => setShowGamePanel(true)}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
          >
            <Sword className="w-5 h-5 mr-2" />
            Quest
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">Or</span>
            </div>
          </div>

          <button
            onClick={createGame}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Play className="w-5 h-5 mr-2" />
            Create New Game
          </button>

          <div className="space-y-2">
            <input
              type="text"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value)}
              placeholder="Enter Room Code"
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              onClick={joinGame}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <Users className="w-5 h-5 mr-2" />
              Join Game
            </button>
          </div>
        </div>
      </div>
      <GamePanel 
        isVisible={showGamePanel} 
        onClose={() => setShowGamePanel(false)} 
      />
    </div>
  );
}