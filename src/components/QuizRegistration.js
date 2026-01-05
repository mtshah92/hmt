"use client";
import { useState } from 'react';
import { registerUser } from '../utils/localStorage';

const QuizRegistration = ({ onComplete }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      registerUser(name.trim());
      onComplete();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full">
        <div className="text-center mb-4">
          <h2 className="text-lg font-semibold text-black mb-2">
            Welcome! 🙏
          </h2>
          <p className="text-black text-sm">
            Enter your name to start the quiz
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-center text-black"
            required
          />
          
          <button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-lg transition-colors font-medium"
          >
            Start Quiz
          </button>
        </form>
      </div>
    </div>
  );
};

export default QuizRegistration;