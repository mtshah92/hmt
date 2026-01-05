"use client";
import { useState, useEffect } from "react";
import { getQuestionsForDay, getCurrentQuizDay } from "../constants/quizQuestions";
import { getCurrentDayNumber } from "../utils/quizUtils";
import {
  getUserProgress,
  submitAnswer,
  markDayCompleted,
  checkDayCompletion,
  checkBadges,
  isUserRegistered,
} from "../utils/localStorage";
import { calculatePointsWithBonus } from "../utils/quizUtils";
import QuizCard from "./QuizCard";
import QuizProgress from "./QuizProgress";
import QuizCelebration from "./QuizCelebration";
import QuizRegistration from "./QuizRegistration";

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
  const [showRegistration, setShowRegistration] = useState(false);

  useEffect(() => {
    const initializeQuiz = () => {
      const registered = isUserRegistered();
      setShowRegistration(!registered);

      const dayNumber = getCurrentQuizDay();
      setCurrentDay(dayNumber);
      const dayQuestions = getQuestionsForDay();
      setQuestions(dayQuestions);

      const userProgress = getUserProgress();
      setProgress(userProgress);

      if (userProgress && userProgress.completedDays.includes(dayNumber)) {
        setDayCompleted(true);
      }
    };

    initializeQuiz();
  }, [targetDate]);

  const handleRegistrationComplete = () => {
    setShowRegistration(false);
    const userProgress = getUserProgress();
    setProgress(userProgress);
  };

  const handleAnswer = (selectedIndex) => {
    if (!progress || !questions[currentQuestionIndex]) return;

    const question = questions[currentQuestionIndex];
    const isCorrect = selectedIndex === question.correctAnswer;

    const basePoints = question.points;
    const pointsWithBonus = calculatePointsWithBonus(
      basePoints,
      progress.currentStreak
    );

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
          setCurrentQuestionIndex((prev) => prev + 1);
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

  const progressPercentage =
    ((currentQuestionIndex + 1) / questions.length) * 100;
  const level = Math.floor((progress?.totalPoints || 0) / 30) + 1;

  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* Registration Modal */}
      {showRegistration && (
        <QuizRegistration onComplete={handleRegistrationComplete} />
      )}
      {/* Simple Header */}
      <div className="text-center mb-4">
        <div className="bg-white rounded-xl shadow-lg p-4 mb-4">
          <h1 className="text-lg font-bold text-gray-800 mb-2">
            Aaya Panchkalyanak Mahaan
          </h1>

          {/* Progress Bar */}
          <div className="mb-3">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>
                Question {currentQuestionIndex + 1}/{questions.length}
              </span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-orange-400 to-red-400 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          {dayCompleted && (
            <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium inline-block">
              ✓ Completed! 🎉
            </div>
          )}
        </div>
      </div>

      {/* Simple Progress Stats */}
      <div className="mb-6">
        <QuizProgress />
      </div>

      {/* Quiz Card with Transition */}
      {currentQuestion && (
        <div
          className={`transition-all duration-300 ${
            isTransitioning
              ? "opacity-0 transform translate-y-4"
              : "opacity-100 transform translate-y-0"
          }`}
        >
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
        <div className="bg-green-50 rounded-xl p-4 text-center border border-green-200 mb-4">
          <div className="text-2xl mb-2">🎉</div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">
            Quiz Complete!
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            Come back tomorrow for new questions
          </p>

          {newBadges.length > 0 && (
            <div className="mt-3">
              <p className="text-sm font-semibold text-green-700 mb-2">
                🏆 New Badge Unlocked!
              </p>
              <div className="flex justify-center">
                {newBadges.map((badge, index) => (
                  <div
                    key={index}
                    className="bg-yellow-100 border border-yellow-300 px-3 py-2 rounded-lg"
                  >
                    <div className="text-lg">{badge.icon}</div>
                    <div className="text-xs font-semibold text-gray-700">
                      {badge.name}
                    </div>
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
                const isAnswered =
                  getUserAnswerForQuestion(questions[index].id) !== null;
                return (
                  <button
                    key={index}
                    onClick={() => handleQuestionChange(index)}
                    className={`w-8 h-8 rounded-full font-bold text-xs shadow-md transition-all ${
                      currentQuestionIndex === index
                        ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white border-2 border-white shadow-lg"
                        : isAnswered
                        ? "bg-green-100 text-green-700 border-2 border-green-300"
                        : "bg-gray-200 text-gray-700 border-2 border-transparent"
                    }`}
                    title={`Go to question ${index + 1}${
                      isAnswered ? " (answered)" : ""
                    }`}
                  >
                    {isAnswered ? "✓" : index + 1}
                  </button>
                );
              })}
            </div>
            <div className="flex justify-between gap-2">
              <button
                onClick={() =>
                  handleQuestionChange(Math.max(0, currentQuestionIndex - 1))
                }
                disabled={currentQuestionIndex === 0}
                className="px-2 py-1 bg-blue-500 text-white rounded text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ← Prev
              </button>
              <span className="px-2 py-1 text-xs font-semibold text-gray-600 bg-gray-100 rounded flex items-center">
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
                className="px-2 py-1 bg-green-500 text-white rounded text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next →
              </button>
            </div>
          </div>

          {/* Desktop: Horizontal layout */}
          <div className="hidden sm:flex justify-between items-center">
            <button
              onClick={() =>
                handleQuestionChange(Math.max(0, currentQuestionIndex - 1))
              }
              disabled={currentQuestionIndex === 0}
              className="px-3 py-1 bg-blue-500 text-white rounded text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← Prev
            </button>

            {/* Question Navigation Dots */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex gap-1 sm:gap-2">
                {questions.map((_, index) => {
                  const isAnswered =
                    getUserAnswerForQuestion(questions[index].id) !== null;
                  return (
                    <button
                      key={index}
                      onClick={() => handleQuestionChange(index)}
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full font-bold text-xs sm:text-sm shadow-md transition-all transform hover:scale-110 ${
                        currentQuestionIndex === index
                          ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white scale-110 border-2 border-white shadow-lg"
                          : isAnswered
                          ? "bg-green-100 text-green-700 border-2 border-green-300 hover:bg-green-200"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300 border-2 border-transparent"
                      }`}
                      title={`Go to question ${index + 1}${
                        isAnswered ? " (answered)" : ""
                      }`}
                    >
                      {isAnswered ? "✓" : index + 1}
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
              className="px-3 py-1 bg-green-500 text-white rounded text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
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

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes badge-pop {
          0% {
            opacity: 0;
            transform: scale(0.5) rotate(-10deg);
          }
          50% {
            transform: scale(1.1) rotate(5deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-badge-pop {
          animation: badge-pop 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default DailyQuiz;
