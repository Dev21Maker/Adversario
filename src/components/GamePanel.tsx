import { GameBoard } from './GameBoard';
import { X } from 'lucide-react';

interface GamePanelProps {
  isVisible: boolean;
  onClose: () => void;
}

export function GamePanel({ isVisible, onClose }: GamePanelProps) {
  return (
    <div className={`fixed inset-0 bg-white transform transition-transform duration-300 ${
      isVisible ? 'translate-y-0' : 'translate-y-full'
    }`}>
      <div className="relative h-full">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
          aria-label="Close game panel"
        >
          <X className="w-6 h-6" />
        </button>
        <div className="h-full overflow-auto pt-16 pb-4">
          <GameBoard />
        </div>
      </div>
    </div>
  );
}