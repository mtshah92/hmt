"use client";
import { useEffect, useState } from 'react';

const FloatingElements = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Create an array of decorative elements with random positions
  const decorativeElements = [
    { symbol: '☸️', size: 'text-2xl', delay: '0s', duration: '8s', top: '15%', left: '10%' },
    { symbol: '🕉️', size: 'text-3xl', delay: '1s', duration: '10s', top: '25%', left: '85%' },
    { symbol: '🪷', size: 'text-2xl', delay: '2s', duration: '7s', top: '60%', left: '20%' },
    { symbol: '🔔', size: 'text-xl', delay: '1.5s', duration: '9s', top: '40%', left: '75%' },
    { symbol: '🪔', size: 'text-2xl', delay: '3s', duration: '11s', top: '70%', left: '60%' },
    { symbol: '☮️', size: 'text-xl', delay: '2.5s', duration: '8.5s', top: '30%', left: '30%' },
    { symbol: '✨', size: 'text-xl', delay: '0.5s', duration: '6s', top: '50%', left: '90%' },
    { symbol: '✨', size: 'text-xl', delay: '3.5s', duration: '7.5s', top: '80%', left: '15%' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {decorativeElements.map((element, index) => (
        <div
          key={index}
          className={`absolute ${element.size} opacity-0 ${isVisible ? 'animate-float' : ''}`}
          style={{
            top: element.top,
            left: element.left,
            animationDelay: element.delay,
            animationDuration: element.duration,
            opacity: isVisible ? 0.3 : 0,
            transition: 'opacity 1s ease-in-out',
            textShadow: '0 0 10px rgba(255,255,255,0.7)'
          }}
        >
          {element.symbol}
        </div>
      ))}
      
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          25% {
            transform: translateY(-15px) rotate(5deg);
          }
          50% {
            transform: translateY(-30px) rotate(0deg);
          }
          75% {
            transform: translateY(-15px) rotate(-5deg);
          }
        }
        
        .animate-float {
          animation-name: float;
          animation-iteration-count: infinite;
          animation-timing-function: ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default FloatingElements;