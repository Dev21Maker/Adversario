import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../lib/firebase';
import { useGameStore } from '../store/gameStore';
import { Loader2 } from 'lucide-react';

export function AuthCheck({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const initializePlayer = useGameStore((state) => state.initializePlayer);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate('/login');
      } else {
        initializePlayer();
      }
    });

    return () => unsubscribe();
  }, [navigate, initializePlayer]);

  if (!auth.currentUser) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}