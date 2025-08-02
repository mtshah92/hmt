"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

const PanchkalyankaBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeKalyanak, setActiveKalyanak] = useState(0);

  const kalyanaks = [
    {
      name: "ગર્ભ કલ્યાણક",
      englishName: "Garbha Kalyanak",
      image: "/panchkalyank.jpeg",
      description: "Conception"
    },
    {
      name: "જન્મ કલ્યાણક", 
      englishName: "Janma Kalyanak",
      image: "/panchkalyank.jpeg",
      description: "Birth"
    },
    {
      name: "તપ કલ્યાણક",
      englishName: "Tap Kalyanak", 
      image: "/panchkalyank.jpeg",
      description: "Renunciation"
    },
    {
      name: "કેવળ જ્ઞાન કલ્યાણક",
      englishName: "Keval Gyan Kalyanak",
      image: "/panchkalyank.jpeg", 
      description: "Enlightenment"
    },
    {
      name: "મોક્ષ કલ્યાણક",
      englishName: "Moksha Kalyanak",
      image: "/panchkalyank.jpeg",
      description: "Liberation"
    }
  ];

  useEffect(() => {
    setIsVisible(true);
    
    const interval = setInterval(() => {
      setActiveKalyanak((prev) => (prev + 1) % kalyanaks.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[400px] md:h-[500px] overflow-hidden bg-gradient-to-br from-orange-100 to-yellow-50">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, orange 2px, transparent 2px),
                           radial-gradient(circle at 75% 75%, gold 2px, transparent 2px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Main content container */}
      <div className="relative h-full flex flex-col items-center justify-center px-4 z-10">
        {/* Title */}
        <div className={`text-center mb-6 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <h2 
            className="text-2xl md:text-4xl font-bold text-orange-800 mb-2"
            style={{
              fontFamily: "AMS Pankhuri Gujarati Calligraphy, Noto Serif Gujarati, serif",
              textShadow: "1px 1px 2px rgba(0,0,0,0.1)"
            }}
          >
            પંચ કલ્યાણક મહોત્સવ
          </h2>
          <p className="text-sm md:text-lg text-orange-700">Five Auspicious Events</p>
        </div>

        {/* Images grid - Desktop */}
        {/* <div className="hidden md:flex items-center justify-center gap-4 mb-6">
          {kalyanaks.map((kalyanak, index) => (
            <div 
              key={index}
              className={`relative transition-all duration-500 cursor-pointer ${
                activeKalyanak === index ? 'scale-110 z-20' : 'scale-90 hover:scale-100'
              }`}
              onClick={() => setActiveKalyanak(index)}
            >
              <div className="w-24 h-32 md:w-32 md:h-40 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={kalyanak.image}
                  alt={kalyanak.englishName}
                  fill
                  style={{ objectFit: "cover" }}
                  className="transition-transform duration-300"
                />
              </div>
              {activeKalyanak === index && (
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-lg -z-10 animate-pulse" />
              )}
            </div>
          ))}
        </div> */}

        {/* Mobile carousel */}
        {/* <div className="md:hidden relative w-full max-w-xs mb-6">
          <div className="relative h-48 rounded-lg overflow-hidden shadow-xl">
            {kalyanaks.map((kalyanak, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  activeKalyanak === index ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <Image
                  src={kalyanak.image}
                  alt={kalyanak.englishName}
                  fill
                  style={{ objectFit: "cover" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
            ))}
          </div>
          
          <div className="flex justify-center gap-2 mt-3">
            {kalyanaks.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  activeKalyanak === index ? 'bg-orange-500 scale-125' : 'bg-orange-300'
                }`}
                onClick={() => setActiveKalyanak(index)}
              />
            ))}
          </div>
        </div> */}

        {/* Active Kalyanak info */}
        <div className={`text-center transition-all duration-500 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          <h3 
            className="text-xl md:text-2xl font-bold text-orange-800 mb-1"
            style={{
              fontFamily: "AMS Pankhuri Gujarati Calligraphy, Noto Serif Gujarati, serif"
            }}
          >
            {kalyanaks[activeKalyanak].name}
          </h3>
          <p className="text-sm md:text-base text-orange-700 font-medium">
            {kalyanaks[activeKalyanak].englishName} - {kalyanaks[activeKalyanak].description}
          </p>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-4 left-4 text-2xl md:text-3xl text-orange-400/50 animate-pulse">🕉️</div>
      <div className="absolute bottom-4 right-4 text-2xl md:text-3xl text-orange-400/50 animate-pulse" style={{animationDelay: '1s'}}>🪷</div>
      <div className="absolute top-1/2 left-4 text-xl md:text-2xl text-orange-400/30 animate-pulse" style={{animationDelay: '2s'}}>✨</div>
      <div className="absolute top-1/4 right-8 text-xl md:text-2xl text-orange-400/30 animate-pulse" style={{animationDelay: '0.5s'}}>🌟</div>
    </section>
  );
};

export default PanchkalyankaBanner;