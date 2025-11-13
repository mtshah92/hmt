"use client";
import { useState, useEffect } from 'react';

const QuizCard = ({ 
  question, 
  questionNumber, 
  totalQuestions,
  onAnswer,
  isAnswered,
  userAnswer,
  pointsEarned
}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (isAnswered && userAnswer?.selectedIndex !== undefined) {
      setSelectedOption(userAnswer.selectedIndex);
      setShowResult(true);
    } else {
      setSelectedOption(null);
      setShowResult(false);
    }
  }, [question.id, isAnswered, userAnswer]);

  const handleOptionClick = (index) => {
    if (isAnswered || showResult) return;
    
    setSelectedOption(index);
    setShowResult(true);
    
    setTimeout(() => {
      onAnswer(index);
    }, 500);
  };

  const isCorrect = selectedOption === question.correctAnswer;
  const showExplanation = showResult && isAnswered;

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border-2 border-gray-200 relative overflow-hidden transform transition-all duration-300 hover:shadow-2xl">
      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-100 to-pink-100 rounded-bl-full opacity-50"></div>
      
      <div className="relative z-10">
        {/* Question Number Badge */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 mb-4 sm:mb-6">
          <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-bold text-xs sm:text-sm shadow-lg">
            Question {questionNumber} of {totalQuestions}
          </div>
          {isAnswered && (
            <div className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-bold text-xs sm:text-sm shadow-lg ${
              userAnswer?.correct 
                ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white' 
                : 'bg-gradient-to-r from-red-400 to-pink-500 text-white'
            }`}>
              {userAnswer?.correct ? '✓ Correct!' : '✗ Incorrect'}
            </div>
          )}
        </div>

        {/* Question */}
        <div className="mb-6 sm:mb-8 bg-gradient-to-r from-gray-50 to-orange-50 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-orange-100">
          <div className="flex items-start gap-2 sm:gap-3">
            <div className="text-2xl sm:text-3xl flex-shrink-0">🤔</div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-2 sm:mb-3 leading-relaxed">
                {question.question}
              </h3>
              {question.questionEn && (
                <p className="text-sm sm:text-base text-gray-600 italic bg-white/60 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg">
                  {question.questionEn}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Options */}
        <div className="space-y-4 mb-6">
          {question.options.map((option, index) => {
            const userSelectedIndex = userAnswer?.selectedIndex !== undefined 
              ? userAnswer.selectedIndex 
              : (isAnswered && selectedOption !== null ? selectedOption : null);
            
            const isCorrectOption = index === question.correctAnswer;
            const wasUserSelection = isAnswered && userSelectedIndex === index;
            const showCorrect = isAnswered && isCorrectOption;
            const showIncorrect = isAnswered && wasUserSelection && !isCorrectOption;

            return (
              <button
                key={index}
                onClick={() => handleOptionClick(index)}
                disabled={isAnswered || showResult}
                className={`w-full text-left p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl border-2 sm:border-3 transition-all duration-300 transform ${
                  isAnswered
                    ? isCorrectOption
                      ? 'bg-gradient-to-r from-green-100 to-emerald-100 border-green-400 text-gray-800 shadow-lg scale-[1.02]'
                      : showIncorrect
                      ? 'bg-gradient-to-r from-red-100 to-pink-100 border-red-400 text-gray-800 shadow-lg scale-[1.02]'
                      : 'bg-gray-50 border-gray-200 text-gray-600'
                    : selectedOption === index
                    ? 'bg-gradient-to-r from-orange-100 to-pink-100 border-orange-400 text-gray-800 shadow-lg scale-[1.02]'
                    : 'bg-white border-gray-300 text-gray-800 hover:border-orange-400 hover:bg-orange-50 hover:shadow-md hover:scale-[1.01]'
                } ${isAnswered || showResult ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-1 min-w-0">
                    <div className={`w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold text-base sm:text-lg shadow-md transition-all flex-shrink-0 ${
                      isAnswered
                        ? isCorrectOption
                          ? 'bg-green-300 text-green-900 scale-110'
                          : showIncorrect
                          ? 'bg-red-300 text-red-900 scale-110'
                          : 'bg-gray-200 text-gray-600'
                        : selectedOption === index
                        ? 'bg-orange-300 text-orange-900 scale-110'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="font-semibold text-sm sm:text-base md:text-lg break-words">{option}</span>
                  </div>
                  <div className="text-xl sm:text-2xl font-bold flex-shrink-0">
                    {showCorrect && <span className="text-green-600">✓</span>}
                    {showIncorrect && <span className="text-red-600">✗</span>}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div className={`mt-6 p-5 rounded-xl border-3 shadow-lg ${
            isCorrect 
              ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-300' 
              : 'bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-300'
          }`}>
            <div className="flex items-start gap-4">
              <span className="text-4xl">{isCorrect ? '🎉' : '💡'}</span>
              <div className="flex-1">
                <p className="font-bold text-xl text-gray-800 mb-2">
                  {isCorrect ? 'Excellent! You got it right! 🎊' : 'Good try! Here\'s the explanation:'}
                </p>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {question.explanation}
                </p>
                {question.explanationEn && (
                  <p className="text-gray-600 text-sm italic mt-3 bg-white/60 px-3 py-2 rounded-lg">
                    {question.explanationEn}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Points Display */}
        {showExplanation && isCorrect && (
          <div className="mt-6 text-center">
            <div className="inline-block bg-gradient-to-r from-orange-400 via-pink-500 to-orange-400 text-white px-6 py-3 rounded-xl font-extrabold text-lg shadow-xl border-2 border-white">
              <span className="text-2xl mr-2">💎</span>
              +{question.points} Points
              {pointsEarned > question.points && (
                <span className="ml-2 text-base bg-white/30 px-2 py-1 rounded-full">
                  +{pointsEarned - question.points} Bonus! 🔥
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizCard;

