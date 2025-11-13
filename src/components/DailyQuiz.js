"use client";
import { useState, useEffect } from 'react';
import { getQuestionsForDay } from '../constants/quizQuestions';
import { getCurrentDayNumber } from '../utils/quizUtils';
import { 
  getUserProgress, 
  submitAnswer, 
  markDayCompleted,
  checkDayCompletion,
  checkBadges
} from '../utils/quizStorage';
import { calculatePointsWithBonus } from '../utils/quizUtils';
import QuizCard from './QuizCard';
import QuizProgress from './QuizProgress';
import QuizCelebration from './QuizCelebration';

const DailyQuiz = ({ targetDate }) => {
  const [currentDay, setCurrentDay] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [progress, setProgress] = useState(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [newBadges, setNewBadges] = useState([]);
  const [dayCompleted, setDayCompleted] = useState(false);
  const [pointsEarned, setPointsEarned] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const dayNumber = getCurrentDayNumber(targetDate);
    setCurrentDay(dayNumber);
    const dayQuestions = getQuestionsForDay(dayNumber);
    setQuestions(dayQuestions);
    
    const userProgress = getUserProgress();
    setProgress(userProgress);
    
    if (userProgress && userProgress.completedDays.includes(dayNumber)) {
      setDayCompleted(true);
    }
  }, [targetDate]);

  const handleAnswer = (selectedIndex) => {
    if (!progress || !questions[currentQuestionIndex]) return;

    const question = questions[currentQuestionIndex];
    const isCorrect = selectedIndex === question.correctAnswer;
    
    const basePoints = question.points;
    const pointsWithBonus = calculatePointsWithBonus(basePoints, progress.currentStreak);
    
    if (isCorrect) {
      setShowCelebration(true);
      setPointsEarned(pointsWithBonus);
    }
    
    const updatedProgress = submitAnswer(
      currentDay,
      question.id,
      isCorrect,
      pointsWithBonus,
      selectedIndex
    );
    
    if (!updatedProgress) {
      return;
    }
    
    setProgress(updatedProgress);
    
    setTimeout(() => {
      const allAnswered = checkDayCompletion(currentDay, questions.length);
      
      if (allAnswered && !dayCompleted) {
        markDayCompleted(currentDay);
        const finalProgress = getUserProgress();
        setProgress(finalProgress);
        setDayCompleted(true);
        
        const badges = checkBadges(finalProgress);
        if (badges.length > 0) {
          setNewBadges(badges);
        }
      }
      
      if (currentQuestionIndex < questions.length - 1 && !allAnswered) {
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentQuestionIndex(prev => prev + 1);
          setShowCelebration(false);
          setPointsEarned(0);
          setIsTransitioning(false);
        }, 2000);
      } else {
        setTimeout(() => {
          setShowCelebration(false);
          setPointsEarned(0);
        }, 2000);
      }
    }, 2000);
  };

  const handleQuestionChange = (newIndex) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentQuestionIndex(newIndex);
      setIsTransitioning(false);
    }, 150);
  };

  const getCurrentQuestion = () => {
    return questions[currentQuestionIndex];
  };

  const getUserAnswerForQuestion = (questionId) => {
    if (!progress) return null;
    const answerKey = `day-${currentDay}-q-${questionId}`;
    return progress.answers[answerKey] || null;
  };

  if (!currentDay || questions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-orange-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading quiz...</p>
        </div>
      </div>
    );
  }

  const currentQuestion = getCurrentQuestion();
  const isQuestionAnswered = currentQuestion 
    ? getUserAnswerForQuestion(currentQuestion.id) !== null
    : false;

  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;
  const level = Math.floor((progress?.totalPoints || 0) / 30) + 1;

  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* Engaging Header */}
      <div className="text-center mb-6 sm:mb-8 relative">
        <div className="inline-block relative">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-orange-600 via-pink-600 to-orange-600 bg-clip-text text-transparent mb-3 px-2">
            Daily Quiz Challenge
          </h1>
          <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 via-pink-400 to-orange-400 rounded-full"></div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-4 mb-4 sm:mb-6 px-2">
          <div className="bg-gradient-to-r from-orange-100 to-pink-100 px-3 sm:px-4 py-2 rounded-full border-2 border-orange-300 shadow-md">
            <span className="text-orange-700 font-bold text-sm sm:text-base">📅 Day {currentDay}</span>
          </div>
          <div className="bg-gradient-to-r from-purple-100 to-blue-100 px-3 sm:px-4 py-2 rounded-full border-2 border-purple-300 shadow-md">
            <span className="text-purple-700 font-bold text-sm sm:text-base">⭐ Level {level}</span>
          </div>
        </div>
        
        {/* Animated Progress Bar */}
        <div className="max-w-md mx-auto px-2">
          <div className="flex justify-between text-xs sm:text-sm font-semibold text-gray-700 mb-2">
            <span className="flex items-center gap-1">
              <span className="text-orange-600">Question {currentQuestionIndex + 1}</span>
              <span className="text-gray-400">of</span>
              <span className="text-gray-600">{questions.length}</span>
            </span>
            <span className="text-orange-600">{Math.round(progressPercentage)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3 shadow-inner overflow-hidden relative">
            <div 
              className="bg-gradient-to-r from-orange-500 via-pink-500 to-orange-500 h-2 sm:h-3 rounded-full transition-all duration-500 ease-out relative overflow-hidden"
              style={{ width: `${progressPercentage}%` }}
            >
              <div className="absolute inset-0 bg-white/30 animate-shimmer"></div>
            </div>
          </div>
        </div>

        {dayCompleted && (
          <div className="mt-4 inline-block bg-gradient-to-r from-green-400 to-emerald-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-bold shadow-lg text-sm sm:text-base">
            ✓ Today's quiz completed!
          </div>
        )}
      </div>

      {/* Progress Stats */}
      <div className="mb-8 transform transition-all duration-300 hover:scale-[1.02]">
        <QuizProgress />
      </div>

      {/* Quiz Card with Transition */}
      {currentQuestion && (
        <div className={`transition-all duration-300 ${isTransitioning ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'}`}>
          <QuizCard
            key={`day-${currentDay}-q-${currentQuestion.id}`}
            question={currentQuestion}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={questions.length}
            onAnswer={handleAnswer}
            isAnswered={isQuestionAnswered}
            userAnswer={getUserAnswerForQuestion(currentQuestion.id)}
            pointsEarned={pointsEarned}
          />
        </div>
      )}

      {/* Day Completion Message */}
      {dayCompleted && currentQuestionIndex === questions.length - 1 && (
        <div className="mt-6 sm:mt-8 bg-gradient-to-br from-green-50 via-emerald-50 to-green-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border-2 sm:border-4 border-green-300 text-center shadow-xl">
          <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">🎉</div>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-800 mb-2 sm:mb-3">
            Amazing Work! 🌟
          </h3>
          <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-4 sm:mb-6 px-2">
            You've completed all questions for today! You can review any question below. Come back tomorrow for new questions!
          </p>
          {newBadges.length > 0 && (
            <div className="mt-4 sm:mt-6">
              <p className="text-lg sm:text-xl font-bold text-purple-700 mb-3 sm:mb-4">🏆 New Badges Unlocked! 🏆</p>
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                {newBadges.map((badge, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-yellow-200 to-orange-300 px-4 sm:px-6 py-3 sm:py-4 rounded-lg sm:rounded-xl shadow-lg border-2 border-yellow-400 transform hover:scale-110 transition-all"
                  >
                    <div className="text-3xl sm:text-4xl mb-1 sm:mb-2">{badge.icon}</div>
                    <div className="font-bold text-gray-800 text-sm sm:text-base">{badge.name}</div>
                    <div className="text-xs sm:text-sm text-gray-700 mt-1">{badge.description}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Enhanced Navigation */}
      {questions.length > 1 && (
        <div className="mt-6 sm:mt-8">
          {/* Mobile: Stacked layout */}
          <div className="flex flex-col sm:hidden gap-3">
            <div className="flex justify-center gap-2 mb-2">
              {questions.map((_, index) => {
                const isAnswered = getUserAnswerForQuestion(questions[index].id) !== null;
                return (
                  <button
                    key={index}
                    onClick={() => handleQuestionChange(index)}
                    className={`w-8 h-8 rounded-full font-bold text-xs shadow-md transition-all ${
                      currentQuestionIndex === index
                        ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white border-2 border-white shadow-lg'
                        : isAnswered
                        ? 'bg-green-100 text-green-700 border-2 border-green-300'
                        : 'bg-gray-200 text-gray-700 border-2 border-transparent'
                    }`}
                    title={`Go to question ${index + 1}${isAnswered ? ' (answered)' : ''}`}
                  >
                    {isAnswered ? '✓' : index + 1}
                  </button>
                );
              })}
            </div>
            <div className="flex justify-between gap-2">
              <button
                onClick={() => handleQuestionChange(Math.max(0, currentQuestionIndex - 1))}
                disabled={currentQuestionIndex === 0}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-semibold shadow-md disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-600 hover:to-cyan-600 transition-all text-sm"
              >
                ← Previous
              </button>
              <span className="px-3 py-2 text-xs font-semibold text-gray-600 bg-gray-100 rounded-lg flex items-center">
                {currentQuestionIndex + 1} / {questions.length}
              </span>
              <button
                onClick={() => {
                  const nextIndex = currentQuestionIndex + 1;
                  if (nextIndex < questions.length) {
                    handleQuestionChange(nextIndex);
                  }
                }}
                disabled={currentQuestionIndex === questions.length - 1}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-semibold shadow-md disabled:opacity-50 disabled:cursor-not-allowed hover:from-green-600 hover:to-emerald-600 transition-all text-sm"
              >
                Next →
              </button>
            </div>
          </div>
          
          {/* Desktop: Horizontal layout */}
          <div className="hidden sm:flex justify-between items-center">
            <button
              onClick={() => handleQuestionChange(Math.max(0, currentQuestionIndex - 1))}
              disabled={currentQuestionIndex === 0}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg sm:rounded-xl font-bold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-600 hover:to-cyan-600 transform hover:scale-105 transition-all disabled:hover:scale-100 text-sm sm:text-base"
            >
              ← Previous
            </button>
            
            {/* Question Navigation Dots */}
            <div className="flex items-center gap-3 sm:gap-4">
              <span className="text-xs sm:text-sm font-semibold text-gray-600 bg-gray-100 px-2 sm:px-3 py-1 rounded-lg">
                {currentQuestionIndex + 1} / {questions.length}
              </span>
              <div className="flex gap-1 sm:gap-2">
                {questions.map((_, index) => {
                  const isAnswered = getUserAnswerForQuestion(questions[index].id) !== null;
                  return (
                    <button
                      key={index}
                      onClick={() => handleQuestionChange(index)}
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full font-bold text-xs sm:text-sm shadow-md transition-all transform hover:scale-110 ${
                        currentQuestionIndex === index
                          ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white scale-110 border-2 border-white shadow-lg'
                          : isAnswered
                          ? 'bg-green-100 text-green-700 border-2 border-green-300 hover:bg-green-200'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300 border-2 border-transparent'
                      }`}
                      title={`Go to question ${index + 1}${isAnswered ? ' (answered)' : ''}`}
                    >
                      {isAnswered ? '✓' : index + 1}
                    </button>
                  );
                })}
              </div>
            </div>
            
            <button
              onClick={() => {
                const nextIndex = currentQuestionIndex + 1;
                if (nextIndex < questions.length) {
                  handleQuestionChange(nextIndex);
                }
              }}
              disabled={currentQuestionIndex === questions.length - 1}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg sm:rounded-xl font-bold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:from-green-600 hover:to-emerald-600 transform hover:scale-105 transition-all disabled:hover:scale-100 text-sm sm:text-base"
            >
              Next →
            </button>
          </div>
        </div>
      )}

      {/* Celebration Animation */}
      <QuizCelebration 
        show={showCelebration} 
        onComplete={() => setShowCelebration(false)}
        points={pointsEarned}
      />

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

export default DailyQuiz;

