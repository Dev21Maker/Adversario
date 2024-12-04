import { useEffect, useState } from 'react';
import { useGameStore } from '../store/gameStore';
import type { Word } from '../types/game';
import { Timer } from './Timer';

export function GameBoard() {
  const { currentRoom, player, updateScore } = useGameStore();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleAnswer = (option: string) => {
    if (selectedOption || !currentRoom?.currentWord) return;
    
    setSelectedOption(option);
    const correct = option === currentRoom.currentWord.spanish;
    setIsCorrect(correct);
    
    if (player) {
      const newScore = player.score + (correct ? 10 : -5);
      updateScore(player.id, newScore);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <Timer duration={30} onComplete={() => {}} />
      </div>
      
      {currentRoom?.currentWord && (
        <>
          <h2 className="text-3xl font-bold text-center mb-8">
            {currentRoom.currentWord.english}
          </h2>
          
          <div className="grid grid-cols-2 gap-4">
            {currentRoom.options?.map((option) => (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                disabled={!!selectedOption}
                className={`
                  p-6 text-xl font-semibold rounded-lg transition
                  ${
                    selectedOption
                      ? option === currentRoom.currentWord?.spanish
                        ? 'bg-green-500 text-white'
                        : option === selectedOption
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-200'
                      : 'bg-white hover:bg-blue-50 active:bg-blue-100'
                  }
                `}
              >
                {option}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}