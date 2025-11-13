"use client";
import { useEffect, useState } from 'react';

const QuizCelebration = ({ show, onComplete, points = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      
      const newParticles = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: -10,
        delay: Math.random() * 0.5,
        duration: 1 + Math.random() * 1,
        size: 8 + Math.random() * 12,
        color: ['#f97316', '#eab308', '#f59e0b', '#fb923c', '#ec4899', '#a855f7'][Math.floor(Math.random() * 6)]
      }));
      setParticles(newParticles);
      
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onComplete) onComplete();
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  if (!show || !isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      {/* Confetti particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full animate-confetti"
            style={{
              left: `${particle.x}%`,
              top: '-10px',
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Celebration message */}
      <div className="relative z-10 bg-gradient-to-br from-yellow-300 via-orange-400 to-pink-500 rounded-3xl shadow-2xl p-10 text-center transform border-4 border-white">
        <div className="text-7xl mb-4">🎉</div>
        <h2 className="text-4xl font-extrabold text-white mb-3 drop-shadow-lg">
          Excellent!
        </h2>
        <p className="text-2xl text-white font-bold mb-4">
          Correct Answer! 🎊
        </p>
        {points > 0 && (
          <div className="bg-white/90 rounded-2xl px-6 py-3 inline-block">
            <div className="text-3xl font-extrabold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
              +{points} Points! 💎
            </div>
          </div>
        )}
        <div className="flex justify-center gap-2 mt-4">
          <span className="text-4xl">⭐</span>
          <span className="text-4xl">✨</span>
          <span className="text-4xl">🌟</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes confetti {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        
        .animate-confetti {
          animation: confetti linear forwards;
        }
      `}</style>
    </div>
  );
};

export default QuizCelebration;

