"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";

const AnimatedBanner = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const bannerRef = useRef(null);

  const images = ["/Songadh_Pratikruti.jpeg", "/HMT_Mandir.jpg"];

  useEffect(() => {
    setIsVisible(true);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleMouseMove = (e) => {
      if (!bannerRef.current) return;
      const rect = bannerRef.current.getBoundingClientRect();
      setMousePosition({
        x: (e.clientX - rect.left) / rect.width - 0.5,
        y: (e.clientY - rect.top) / rect.height - 0.5,
      });
    };

    // Image transition timer
    const imageInterval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % images.length);
    }, 6000);

    window.addEventListener("scroll", handleScroll);
    if (bannerRef.current) {
      bannerRef.current.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (bannerRef.current) {
        bannerRef.current.removeEventListener("mousemove", handleMouseMove);
      }
      clearInterval(imageInterval);
    };
  }, []);

  // Calculate parallax effects based on scroll position
  const calculateParallax = (factor) => {
    return scrollY * factor;
  };

  // Calculate mouse parallax
  const calculateMouseParallax = (factorX, factorY) => {
    return {
      x: mousePosition.x * factorX,
      y: mousePosition.y * factorY,
    };
  };

  return (
    <section ref={bannerRef} className="relative h-[350px] md:h-[450px] overflow-hidden">
      {/* Mobile view - single image with crossfade */}
      <div className="md:hidden absolute inset-0 z-10">
        {images.map((src, index) => (
          <div 
            key={src}
            className="absolute inset-0 transition-opacity duration-1500 ease-in-out"
            style={{
              opacity: activeImage === index ? 1 : 0,
            }}
          >
            <Image 
              src={src} 
              alt={index === 0 ? "Songadh Pratikruti" : "HMT Mandir"}
              fill
              style={{
                objectFit: "cover",
                objectPosition: index === 0 ? "center" : "top center",
                transform: `scale(${index === 0 ? 1.1 : 1.3}) translateY(${index === 1 ? -20 : 0}px)`,
              }}
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          </div>
        ))}
      </div>
      
      {/* Desktop view - split view effect */}
      <div className="hidden md:flex absolute inset-0 z-10">
        <div className="w-1/2 h-full relative overflow-hidden">
          <div className="absolute inset-0 transition-transform duration-1000 ease-out">
            <Image
              src={images[0]}
              alt="Songadh Pratikruti"
              fill
              style={{
                objectFit: "cover",
                objectPosition: "center right",
                transform: `scale(1.1) translate(${
                  calculateMouseParallax(15, 0).x
                }px, ${calculateParallax(0.05)}px)`,
              }}
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-orange-500/30" />
        </div>

        <div className="w-1/2 h-full relative overflow-hidden">
          <div className="absolute inset-0 transition-transform duration-1000 ease-out">
            <Image
              src={images[1]}
              alt="HMT Mandir"
              fill
              style={{
                objectFit: "cover",
                objectPosition: "center top",
                transform: `scale(1.3) translate(${
                  calculateMouseParallax(15, 0).x
                }px, ${calculateParallax(0.05) - 30}px)`,
              }}
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-orange-500/30" />
        </div>
      </div>

      {/* Overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent z-20" />

      {/* Decorative elements */}
      <div className="absolute inset-0 z-20">
        {/* Animated lotus flowers - hidden on small mobile */}
        <div className="hidden sm:block absolute top-[15%] left-[15%] w-12 sm:w-16 h-12 sm:h-16 opacity-60">
          <div
            className="lotus-flower"
            style={{ animation: "float 8s ease-in-out infinite" }}
          ></div>
        </div>
        <div className="hidden sm:block absolute bottom-[20%] right-[15%] w-10 sm:w-12 h-10 sm:h-12 opacity-50">
          <div
            className="lotus-flower"
            style={{ animation: "float 6s ease-in-out infinite 1s" }}
          ></div>
        </div>

        {/* Animated light rays */}
        <div className="light-rays"></div>
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-white px-4 z-30">
        <div
          className={`text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{
            transform: `translateY(${calculateParallax(-0.2)}px)`,
          }}
        >
          <h2
            className="text-2xl sm:text-3xl md:text-5xl font-bold mb-2 md:mb-4"
            style={{
              textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
              fontFamily:
                "AMS Pankhuri Gujarati Calligraphy, Noto Serif Gujarati, serif",
            }}
          >
            શ્રી 1008 શાંતિનાથ ભગવાન પંચ કલ્યાણક મહોત્સવ
          </h2>

          <p
            className="text-sm sm:text-lg md:text-xl text-center max-w-2xl mx-auto transition-all duration-1000 delay-300"
            style={{
              textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
            }}
          >
            Join us for this auspicious celebration honoring Shantinath Bhagwan
          </p>
          
          {/* Image indicators for mobile */}
          <div className="flex gap-2 mt-4 md:hidden justify-center">
            {images.map((_, index) => (
              <button 
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${activeImage === index ? "bg-white scale-110" : "bg-white/50"}`}
                onClick={() => setActiveImage(index)}
                aria-label={`View image ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Add a style tag for animations */}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
          100% {
            transform: translateY(0px) rotate(0deg);
          }
        }

        .lotus-flower {
          width: 100%;
          height: 100%;
          background-image: radial-gradient(
            circle,
            rgba(255, 255, 255, 0.9) 10%,
            rgba(255, 200, 100, 0.6) 60%,
            transparent 70%
          );
          border-radius: 50%;
          position: relative;
          filter: blur(2px);
        }

        .lotus-flower:before,
        .lotus-flower:after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: radial-gradient(
            circle,
            rgba(255, 255, 255, 0.8) 10%,
            rgba(255, 150, 50, 0.5) 60%,
            transparent 70%
          );
          border-radius: 50%;
          animation: pulse 3s infinite alternate;
        }

        .lotus-flower:after {
          animation-delay: 1.5s;
        }

        .light-rays {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(
            ellipse at center,
            transparent 0%,
            transparent 50%,
            rgba(255, 165, 0, 0.2) 100%
          );
          opacity: 0.7;
          animation: pulse 5s infinite alternate;
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.7;
          }
          100% {
            transform: scale(1);
            opacity: 0.5;
          }
        }
      `}</style>
    </section>
  );
};

export default AnimatedBanner;
