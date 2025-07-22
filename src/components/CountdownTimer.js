"use client";
import { useState, useEffect } from 'react';
import { calculateTimeLeft } from '../utils/dateUtils';

const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  
  useEffect(() => {
    // Initial calculation
    setTimeLeft(calculateTimeLeft(targetDate));
    
    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);
    
    // Cleanup
    return () => clearInterval(timer);
  }, [targetDate]);
  
  // Add leading zero if needed
  const addLeadingZero = (num) => {
    return num < 10 ? `0${num}` : num;
  };
  
  return (
    <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg p-4 sm:p-6 border border-orange-300 text-center">
      <div className="flex justify-center items-center space-x-2 sm:space-x-4">
        <div className="flex flex-col items-center">
          <div className="text-3xl sm:text-5xl md:text-6xl font-bold text-orange-600">
            {timeLeft.days}
          </div>
          <div className="text-xs sm:text-sm text-orange-700 font-medium mt-1">
            {timeLeft.days === 1 ? "Day" : "Days"}
          </div>
        </div>
        
        <div className="text-2xl sm:text-4xl md:text-5xl font-bold text-orange-400">:</div>
        
        <div className="flex flex-col items-center">
          <div className="text-3xl sm:text-5xl md:text-6xl font-bold text-orange-600">
            {addLeadingZero(timeLeft.hours)}
          </div>
          <div className="text-xs sm:text-sm text-orange-700 font-medium mt-1">
            Hours
          </div>
        </div>
        
        <div className="text-2xl sm:text-4xl md:text-5xl font-bold text-orange-400">:</div>
        
        <div className="flex flex-col items-center">
          <div className="text-3xl sm:text-5xl md:text-6xl font-bold text-orange-600">
            {addLeadingZero(timeLeft.minutes)}
          </div>
          <div className="text-xs sm:text-sm text-orange-700 font-medium mt-1">
            Mins
          </div>
        </div>
        
        <div className="text-2xl sm:text-4xl md:text-5xl font-bold text-orange-400">:</div>
        
        <div className="flex flex-col items-center">
          <div className="text-3xl sm:text-5xl md:text-6xl font-bold text-orange-600">
            {addLeadingZero(timeLeft.seconds)}
          </div>
          <div className="text-xs sm:text-sm text-orange-700 font-medium mt-1">
            Secs
          </div>
        </div>
      </div>
      
      <div
        className="text-lg sm:text-xl md:text-2xl font-semibold text-orange-700 mt-4"
        style={{
          fontFamily:
            "AMS Pankhuri Gujarati Calligraphy, Noto Serif Gujarati, serif",
          letterSpacing: "0.8px",
          textShadow: "1px 1px 3px rgba(0,0,0,0.2)",
          fontWeight: "600",
        }}
      >
        પ્રતિષ્ઠા મહોત્સવ
      </div>
    </div>
  );
};

export default CountdownTimer;
