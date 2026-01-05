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
    <div className="bg-white rounded-xl shadow-lg p-4 mb-4">
      <div className="relative">
        {/* Question Number */}
        <div className="flex justify-between items-center mb-3">
          <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            Q{questionNumber}
          </div>
          {isAnswered && (
            <div className={`px-3 py-1 rounded-full text-sm font-bold ${
              userAnswer?.correct 
                ? 'bg-green-100 text-green-700' 
                : 'bg-red-100 text-red-700'
            }`}>
              {userAnswer?.correct ? '✓ Correct!' : '✗ Wrong'}
            </div>
          )}
        </div>

        {/* Question */}
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <h3 className="text-base font-semibold text-gray-800 leading-relaxed">
            {question.question}
          </h3>
        </div>

        {/* Options */}
        <div className="space-y-2 mb-4">
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
                className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                  isAnswered
                    ? isCorrectOption
                      ? 'bg-green-50 border-green-300 text-gray-800'
                      : showIncorrect
                      ? 'bg-red-50 border-red-300 text-gray-800'
                      : 'bg-gray-50 border-gray-200 text-gray-600'
                    : selectedOption === index
                    ? 'bg-orange-50 border-orange-300 text-gray-800'
                    : 'bg-white border-gray-200 text-gray-800 hover:border-orange-300 hover:bg-orange-50'
                } ${isAnswered || showResult ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                    isAnswered
                      ? isCorrectOption
                        ? 'bg-green-200 text-green-800'
                        : showIncorrect
                        ? 'bg-red-200 text-red-800'
                        : 'bg-gray-200 text-gray-600'
                      : selectedOption === index
                      ? 'bg-orange-200 text-orange-800'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="text-sm font-medium">{option}</span>
                  {showCorrect && <span className="text-green-600 ml-auto">✓</span>}
                  {showIncorrect && <span className="text-red-600 ml-auto">✗</span>}
                </div>
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div className={`p-3 rounded-lg ${
            isCorrect 
              ? 'bg-green-50 border border-green-200' 
              : 'bg-orange-50 border border-orange-200'
          }`}>
            <div className="flex items-start gap-2">
              <span className="text-lg">{isCorrect ? '🎉' : '💡'}</span>
              <div>
                <p className="font-semibold text-sm text-gray-800 mb-1">
                  {isCorrect ? 'Great job!' : 'Learn more:'}
                </p>
                <p className="text-sm text-gray-700">
                  {question.explanation}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Points */}
        {showExplanation && isCorrect && (
          <div className="mt-3 text-center">
            <div className="inline-block bg-orange-500 text-white px-4 py-2 rounded-lg font-bold text-sm">
              💰 +{question.points} Points
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizCard;

