"use client";
import { useEffect, useState } from 'react';
import { getUserProgress } from '../utils/localStorage';
import { getTotalQuestionsAnswered, getTotalCorrectAnswers } from '../utils/quizUtils';

const QuizProgress = () => {
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    const loadProgress = () => {
      const userProgress = getUserProgress();
      setProgress(userProgress);
    };
    
    loadProgress();
    
    const interval = setInterval(() => {
      const updated = getUserProgress();
      setProgress(updated);
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  if (!progress) return null;

  const totalCorrect = getTotalCorrectAnswers(progress);

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 mb-4">
      <div className="flex justify-between items-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-500">{progress.totalPoints}</div>
          <div className="text-xs text-gray-500">Points</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-red-500">🔥{progress.currentStreak}</div>
          <div className="text-xs text-gray-500">Streak</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-green-500">{totalCorrect}</div>
          <div className="text-xs text-gray-500">Correct</div>
        </div>
      </div>
    </div>
  );
};

export default QuizProgress;

