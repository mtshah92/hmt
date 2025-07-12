import { useEffect } from 'react';

const ImageCarousel = () => {
  useEffect(() => {
    let currentSlide = 0;
    const totalSlides = 3;
    
    window.nextSlide = () => {
      currentSlide = (currentSlide + 1) % totalSlides;
      updateCarousel();
    };
    
    window.prevSlide = () => {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      updateCarousel();
    };
    
    window.goToSlide = (index) => {
      currentSlide = index;
      updateCarousel();
    };
    
    const updateCarousel = () => {
      const carousel = document.getElementById("carousel");
      if (carousel) {
        carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        const dots = document.querySelectorAll(".cursor-pointer");
        dots.forEach((dot, index) => {
          dot.className = index === currentSlide 
            ? "w-3 h-3 bg-orange-500 rounded-full cursor-pointer"
            : "w-3 h-3 bg-orange-300 rounded-full cursor-pointer";
        });
      }
    };
    
    const interval = setInterval(() => {
      window.nextSlide();
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg border border-orange-200 p-6">
          <h3
            className="text-xl font-bold text-orange-700 text-center mb-4"
            style={{
              fontFamily: "AMS Pankhuri Gujarati Calligraphy, Noto Serif Gujarati, serif",
            }}
          >
            ફોટો ગેલેરી
          </h3>
          <div className="relative overflow-hidden rounded-lg">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              id="carousel"
            >
              <div className="min-w-full bg-gradient-to-br from-orange-100 to-yellow-100 h-64 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-8xl mb-2">🏛️</div>
                  <p className="text-orange-700 font-medium">મંદિર દર્શન</p>
                </div>
              </div>
              <div className="min-w-full bg-gradient-to-br from-yellow-100 to-orange-100 h-64 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-8xl mb-2">🙏</div>
                  <p className="text-orange-700 font-medium">પૂજા વિધિ</p>
                </div>
              </div>
              <div className="min-w-full bg-gradient-to-br from-orange-100 to-red-100 h-64 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-8xl mb-2">🎉</div>
                  <p className="text-orange-700 font-medium">ઉત્સવ</p>
                </div>
              </div>
            </div>
            <button
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg"
              onClick={() => window.prevSlide()}
            >
              ←
            </button>
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg"
              onClick={() => window.nextSlide()}
            >
              →
            </button>
          </div>
          <div className="flex justify-center mt-4 space-x-2">
            <div
              className="w-3 h-3 bg-orange-500 rounded-full cursor-pointer"
              onClick={() => window.goToSlide(0)}
            ></div>
            <div
              className="w-3 h-3 bg-orange-300 rounded-full cursor-pointer"
              onClick={() => window.goToSlide(1)}
            ></div>
            <div
              className="w-3 h-3 bg-orange-300 rounded-full cursor-pointer"
              onClick={() => window.goToSlide(2)}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageCarousel;