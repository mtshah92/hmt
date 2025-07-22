"use client";
import { useEffect, useState } from "react";

const AnimatedBanner = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate parallax effects based on scroll position
  const calculateParallax = (factor) => {
    return scrollY * factor;
  };

  return (
    <section className="relative h-[300px] overflow-hidden">
      {/* Background with parallax effect */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-500"
        style={{
          transform: `translateY(${calculateParallax(0.1)}px)`,
          backgroundSize: "200% 200%",
          animation: "gradient-shift 15s ease infinite",
        }}
      />

      {/* Decorative elements */}
      <div className="absolute inset-0">
        {/* Animated circles */}
        <div
          className="absolute w-40 h-40 rounded-full bg-white/10 top-10 left-[10%]"
          style={{
            transform: `translate(${calculateParallax(
              -0.2
            )}px, ${calculateParallax(0.05)}px)`,
            animation: "float 8s ease-in-out infinite",
          }}
        />
        <div
          className="absolute w-24 h-24 rounded-full bg-white/20 bottom-10 right-[20%]"
          style={{
            transform: `translate(${calculateParallax(
              0.3
            )}px, ${calculateParallax(-0.1)}px)`,
            animation: "float 6s ease-in-out infinite 1s",
          }}
        />

        {/* Temple silhouette */}
        {/* <div
          className="absolute bottom-0 left-0 right-0 h-32 bg-[url('/temple-silhouette.svg')] bg-repeat-x bg-bottom"
          style={{
            transform: `translateY(${calculateParallax(-0.15)}px)`,
            backgroundSize: "contain",
            opacity: 0.7,
          }}
        /> */}
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-white px-4">
        <h2
          className={`text-3xl md:text-5xl font-bold mb-4 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{
            textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
            fontFamily:
              "AMS Pankhuri Gujarati Calligraphy, Noto Serif Gujarati, serif",
            transform: `translateY(${calculateParallax(-0.2)}px)`,
          }}
        >
          શ્રી 1008 શાંતિનાથ ભગવાન પંચ કલ્યાણક મહોત્સવ
        </h2>

        <p
          className={`text-lg md:text-xl text-center max-w-2xl transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{
            textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
            transform: `translateY(${calculateParallax(-0.1)}px)`,
          }}
        >
          Join us for this auspicious celebration honoring Shantinath Bhagwan
        </p>

        {/* Animated lotus icon */}
        <div
          className={`mt-6 transition-all duration-1000 delay-600 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
          }`}
          style={{ animation: "pulse 3s infinite" }}
        >
          <div className="text-4xl"></div>
        </div>
      </div>

      {/* Add a style tag for animations */}
      <style jsx>{`
        @keyframes gradient-shift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </section>
  );
};

export default AnimatedBanner;
