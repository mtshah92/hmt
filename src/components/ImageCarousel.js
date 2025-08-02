import Image from 'next/image';
import { useEffect, useState } from 'react';

const ImageCarousel = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);
  const kalyanaks = [
    { name: "ગર્ભ કલ્યાણક", image: "/Panchkalyanka/garbha__kalyanka.jpg", date: "27 January 2026" },
    { name: "જન્મ કલ્યાણક", image: "/Panchkalyanka/janma_kalyanka.jpg", date: "28 January 2026" },
    { name: "તપ કલ્યાણક", image: "/Panchkalyanka/tap_kalyanka.jpg", date: "29 January 2026" },
    { name: "કેવળ જ્ઞાન કલ્યાણક", image: "/Panchkalyanka/keval_gyan_kalyanka.jpg", date: "30 January 2026" },
    { name: "મોક્ષ કલ્યાણક", image: "/Panchkalyanka/moksha_kalyanka.jpg", date: "3 February 2026" }
  ];

  return (
    <section className="py-8 px-4 relative overflow-hidden">
      {/* Magical background rays */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-yellow-400 via-orange-400 to-transparent transform rotate-12 animate-pulse" style={{animationDelay: '0s'}} />
        <div className="absolute top-0 right-1/4 w-1 h-full bg-gradient-to-b from-orange-400 via-yellow-400 to-transparent transform -rotate-12 animate-pulse" style={{animationDelay: '1s'}} />
        <div className="absolute top-0 left-1/2 w-1 h-full bg-gradient-to-b from-yellow-300 via-orange-300 to-transparent animate-pulse" style={{animationDelay: '2s'}} />
      </div>



      <div className="max-w-4xl mx-auto relative z-10">
        <div className="bg-gradient-to-br from-white via-orange-50/50 to-yellow-50/50 rounded-xl shadow-2xl border border-orange-200/50 p-6 backdrop-blur-sm">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {kalyanaks.map((kalyanak, index) => (
              <div 
                key={index} 
                className={`group cursor-pointer transform transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="relative h-32 md:h-40 rounded-lg overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-500">
                  {/* Magical glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-400 rounded-lg opacity-0 group-hover:opacity-75 blur-sm transition-opacity duration-500" />
                  
                  <div className="relative bg-white rounded-lg overflow-hidden h-full">
                    <Image
                      src={kalyanak.image}
                      alt={kalyanak.name}
                      fill
                      style={{ objectFit: "cover" }}
                      className="group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-orange-400/20" />
                    
                    {/* Magical shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </div>
                </div>
                
                <div className="text-center mt-3">
                  <p 
                    className="text-sm font-bold text-orange-800 group-hover:text-orange-600 transition-all duration-300 group-hover:scale-105"
                    style={{
                      fontFamily: "AMS Pankhuri Gujarati Calligraphy, Noto Serif Gujarati, serif",
                      textShadow: "1px 1px 2px rgba(0,0,0,0.1)"
                    }}
                  >
                    {kalyanak.name}
                  </p>
                  {/* <p className="text-xs text-orange-600 mt-1">
                    {kalyanak.date}
                  </p> */}
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

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}