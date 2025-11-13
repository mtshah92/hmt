"use client";
import { useEffect, useState } from 'react';
import { getUserProgress } from '../utils/quizStorage';
import { getOverallAccuracy, getTotalQuestionsAnswered, getTotalCorrectAnswers } from '../utils/quizUtils';

const QuizProgress = () => {
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    const userProgress = getUserProgress();
    setProgress(userProgress);
    
    const interval = setInterval(() => {
      const updated = getUserProgress();
      setProgress(updated);
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  if (!progress) return null;

  const totalAnswered = getTotalQuestionsAnswered(progress);
  const totalCorrect = getTotalCorrectAnswers(progress);
  const accuracy = getOverallAccuracy(progress);
  const level = Math.floor(progress.totalPoints / 30) + 1;
  const xpProgress = (progress.totalPoints % 30) / 30 * 100;

  return (
    <div className="bg-gradient-to-br from-white via-orange-50 to-pink-50 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 border-2 border-orange-200 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-orange-200/30 to-pink-200/30 rounded-full blur-2xl"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-yellow-200/30 to-orange-200/30 rounded-full blur-2xl"></div>
      
      <div className="relative z-10">
        <h3 className="text-xl sm:text-2xl font-extrabold text-gray-800 mb-4 sm:mb-6 text-center">
          📊 Your Progress
        </h3>
        
        {/* Level and XP */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 mb-6 border-2 border-orange-200 shadow-md">
          <div className="flex justify-between items-center mb-2">
            <div className="text-gray-700 font-bold">
              ⭐ Level {level}
            </div>
            <div className="text-gray-600 text-sm">
              {progress.totalPoints} / {level * 30} XP
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
            <div 
              className="bg-gradient-to-r from-orange-500 via-pink-500 to-orange-500 h-3 rounded-full transition-all duration-500 relative overflow-hidden"
              style={{ width: `${xpProgress}%` }}
            >
              <div className="absolute inset-0 bg-white/30 animate-shimmer"></div>
            </div>
          </div>
        </div>
        
        {/* Main Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl p-5 text-center border-2 border-orange-300 shadow-lg transform hover:scale-105 transition-all">
            <div className="text-4xl font-extrabold text-orange-700 mb-1">{progress.totalPoints}</div>
            <div className="text-sm font-semibold text-gray-700">💎 Total Points</div>
          </div>
          
          <div className="bg-gradient-to-br from-red-100 to-pink-200 rounded-xl p-5 text-center border-2 border-red-300 shadow-lg transform hover:scale-105 transition-all">
            <div className="text-4xl font-extrabold text-red-700 mb-1">🔥 {progress.currentStreak}</div>
            <div className="text-sm font-semibold text-gray-700">Day Streak</div>
          </div>
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-white/80 rounded-lg p-3 text-center border-2 border-gray-200 shadow-sm hover:shadow-md transition-all">
            <div className="text-2xl font-bold text-gray-700">{progress.completedDays.length}</div>
            <div className="text-xs text-gray-600 font-semibold">📅 Days</div>
          </div>
          <div className="bg-white/80 rounded-lg p-3 text-center border-2 border-green-200 shadow-sm hover:shadow-md transition-all">
            <div className="text-2xl font-bold text-green-600">{totalCorrect}</div>
            <div className="text-xs text-gray-600 font-semibold">✅ Correct</div>
          </div>
          <div className="bg-white/80 rounded-lg p-3 text-center border-2 border-blue-200 shadow-sm hover:shadow-md transition-all">
            <div className="text-2xl font-bold text-blue-600">{accuracy}%</div>
            <div className="text-xs text-gray-600 font-semibold">🎯 Accuracy</div>
          </div>
        </div>

        {/* Badges */}
        {progress.badges && progress.badges.length > 0 && (
          <div className="mt-4 pt-4 border-t-2 border-orange-200">
            <div className="text-sm font-bold text-gray-700 mb-3 text-center">🏅 Badges Earned</div>
            <div className="flex flex-wrap justify-center gap-2">
              {progress.badges.map((badge, index) => (
                <span
                  key={index}
                  className="bg-gradient-to-r from-orange-200 to-pink-200 text-orange-800 px-4 py-2 rounded-full text-sm font-bold border-2 border-orange-300 shadow-md transform hover:scale-110 transition-all"
                >
                  {badge === 'first_quiz' && '🎯 First Steps'}
                  {badge === 'week_warrior' && '🔥 Week Warrior'}
                  {badge === 'month_master' && '👑 Month Master'}
                  {badge === 'knowledge_seeker' && '📚 Knowledge Seeker'}
                  {badge === 'perfect_week' && '⭐ Perfect Week'}
                  {badge === 'point_master' && '💎 Point Master'}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Overall Progress */}
        <div className="mt-4 pt-4 border-t-2 border-orange-200">
          <div className="flex justify-between text-sm font-semibold text-gray-700 mb-2">
            <span>📈 Overall Progress</span>
            <span>{totalAnswered} questions</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
            <div
              className="bg-gradient-to-r from-orange-500 via-pink-500 to-orange-500 h-3 rounded-full transition-all duration-500 relative overflow-hidden"
              style={{ width: `${Math.min(100, (totalAnswered / 50) * 100)}%` }}
            >
              <div className="absolute inset-0 bg-white/30 animate-shimmer"></div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default QuizProgress;

