import Image from "next/image";
import { useEffect, useState } from "react";

const ImageCarousel = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);
  const kalyanaks = [
    {
      name: "ગર્ભ કલ્યાણક (પૂર્વ)",
      image: "/Panchkalyanka/pre_garbha_kalyanka.png",
      date: "27 January 2026",
    },
    {
      name: "ગર્ભ કલ્યાણક",
      image: "/Panchkalyanka/garbha__kalyanka.jpg",
      date: "28 January 2026",
    },
    {
      name: "જન્મ કલ્યાણક",
      image: "/Panchkalyanka/janma_kalyanka.jpg",
      date: "29 January 2026",
    },
    {
      name: "તપ કલ્યાણક",
      image: "/Panchkalyanka/tap_kalyanka.jpg",
      date: "30 January 2026",
    },
    {
      name: "કેવળ જ્ઞાન કલ્યાણક",
      image: "/Panchkalyanka/keval_gyan_kalyanka.jpg",
      date: "31 January 2026",
    },
    {
      name: "મોક્ષ કલ્યાણક",
      image: "/Panchkalyanka/moksha_kalyanka.jpg",
      date: "1 February 2026",
    },
  ];

  return (
    <section className="py-6 md:py-8 px-3 md:px-4 relative overflow-hidden">
      {/* Enhanced magical background rays */}
      <div className="absolute inset-0 opacity-15">
        <div
          className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-yellow-400 via-orange-400 to-transparent transform rotate-12 animate-pulse"
          style={{ animationDelay: "0s" }}
        />
        <div
          className="absolute top-0 right-1/4 w-1 h-full bg-gradient-to-b from-orange-400 via-yellow-400 to-transparent transform -rotate-12 animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-0 left-1/2 w-1 h-full bg-gradient-to-b from-yellow-300 via-orange-300 to-transparent animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        {/* Additional floating particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-orange-300 rounded-full animate-pulse opacity-60" style={{ animationDelay: "0.5s" }}></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-yellow-400 rounded-full animate-pulse opacity-40" style={{ animationDelay: "1.5s" }}></div>
        <div className="absolute bottom-32 left-16 w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse opacity-50" style={{ animationDelay: "2.5s" }}></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Title */}
        <div className="text-center mb-6 md:mb-8">
          <h2
            className="text-2xl md:text-3xl font-bold text-orange-800 mb-2"
            style={{
              fontFamily:
                "AMS Pankhuri Gujarati Calligraphy, Noto Serif Gujarati, serif",
              textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            પંચ કલ્યાણક
          </h2>
          <div className="w-16 h-1 bg-orange-400 mx-auto rounded mb-3"></div>
          <div className="relative inline-block">
            <p 
              className="text-lg md:text-xl font-bold bg-gradient-to-r from-orange-600 via-orange-700 to-orange-800 bg-clip-text text-transparent relative z-10"
              style={{
                fontFamily: "AMS Pankhuri Gujarati Calligraphy, Noto Serif Gujarati, serif",
                textShadow: "2px 2px 4px rgba(251,146,60,0.3)",
                filter: "drop-shadow(0 2px 4px rgba(251,146,60,0.2))",
                letterSpacing: "0.5px"
              }}
            >
              આત્મા થી પરમાત્મા થવાની વિધિ
            </p>
            {/* Decorative elements */}
            <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 text-orange-400/60 text-sm animate-pulse">✨</div>
            <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 text-orange-400/60 text-sm animate-pulse" style={{animationDelay: '1s'}}>✨</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white via-orange-50/30 to-yellow-50/30 rounded-2xl shadow-2xl border border-orange-200/60 p-4 md:p-6 backdrop-blur-sm relative overflow-hidden">
          {/* Subtle inner glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-100/20 via-transparent to-yellow-100/20 rounded-2xl"></div>
          
          <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-6 gap-3 md:gap-4">
            {kalyanaks.map((kalyanak, index) => (
              <div
                key={index}
                className={`group cursor-pointer transform transition-all duration-700 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="relative h-28 sm:h-32 md:h-40 rounded-xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-500">
                  {/* Enhanced magical glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-400 rounded-xl opacity-0 group-hover:opacity-80 blur-sm transition-opacity duration-500" />
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-300 via-yellow-300 to-orange-300 rounded-xl opacity-0 group-hover:opacity-40 blur-md transition-opacity duration-700" />

                  <div className="relative bg-white rounded-xl overflow-hidden h-full border border-orange-100/50">
                    <Image
                      src={kalyanak.image}
                      alt={kalyanak.name}
                      fill
                      style={{ objectFit: "cover" }}
                      className="group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-orange-400/30" />

                    {/* Enhanced magical shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    
                    {/* Subtle border glow */}
                    <div className="absolute inset-0 rounded-xl border border-orange-200/30 group-hover:border-orange-300/50 transition-colors duration-300"></div>
                  </div>
                </div>

                <div className="text-center mt-2 md:mt-3 px-1">
                  <p
                    className="text-xs sm:text-sm font-bold text-orange-800 group-hover:text-orange-600 transition-all duration-300 group-hover:scale-105 leading-tight"
                    style={{
                      fontFamily:
                        "AMS Pankhuri Gujarati Calligraphy, Noto Serif Gujarati, serif",
                      textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
                    }}
                  >
                    {kalyanak.name}
                  </p>
                  <p className="text-xs text-orange-600 mt-1 font-medium group-hover:text-orange-500 transition-colors duration-300">
                    {kalyanak.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageCarousel;

// Add custom CSS for additional animations
const styles = `
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  
  .animate-float {
    animation: float 3s ease-in-out infinite;
  }
`;

if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}
