"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const Header = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    // Generate random particles only on client side
    const generatedParticles = [...Array(10)].map((_, i) => ({
      id: i,
      width: Math.random() * 3 + 1,
      height: Math.random() * 3 + 1,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
    }));
    setParticles(generatedParticles);

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <header className="relative overflow-hidden bg-white text-gray-900 shadow-md">
      {/* Clean gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50/50 to-blue-50/30"></div>
      
      {/* Subtle dynamic gradient overlay */}
      <div
        className="absolute inset-0 opacity-10 transition-opacity duration-700"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.1), transparent 60%)`,
        }}
      ></div>

      {/* Subtle floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-blue-100/30 blur-sm"
            style={{
              width: `${particle.width}px`,
              height: `${particle.height}px`,
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animation: `float ${particle.duration}s infinite ease-in-out`,
              animationDelay: `${particle.delay}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Subtle decorative pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[length:40px_40px]"></div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-0 py-0 relative z-10">
        {/* Desktop Layout */}
        <div className="hidden md:flex items-center justify-center">
          <img
            src="/Final Logo Tirthdham Mahavirdham.png"
            alt="Tirthdham Mahavirdham Logo"
            className="h-28 w-28 lg:h-32 lg:w-32 xl:h-36 xl:w-36 object-contain drop-shadow-[0_0_15px_rgba(0,0,0,0.2)] hover:drop-shadow-[0_0_25px_rgba(0,0,0,0.3)] transition-all duration-500 hover:scale-105 block"
            style={{ imageRendering: 'auto', display: 'block' }}
          />
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden flex items-center justify-center">
          <img
            src="/Final Logo Tirthdham Mahavirdham.png"
            alt="Tirthdham Mahavirdham Logo"
            className="h-20 w-20 sm:h-24 sm:w-24 object-contain drop-shadow-[0_0_10px_rgba(0,0,0,0.2)] hover:drop-shadow-[0_0_20px_rgba(0,0,0,0.3)] transition-all duration-500 hover:scale-105 block"
            style={{ imageRendering: 'auto', display: 'block' }}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
