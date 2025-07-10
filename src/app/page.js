"use client";
import { useState, useEffect } from "react";
import Head from "next/head";

export default function Home() {
  const [daysLeft, setDaysLeft] = useState(0);

  useEffect(() => {
    const targetDate = new Date("2026-01-27");
    const today = new Date();
    const diffTime = targetDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDaysLeft(diffDays);

    // Carousel functionality
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

        // Update dots
        const dots = document.querySelectorAll(".cursor-pointer");
        dots.forEach((dot, index) => {
          dot.className =
            index === currentSlide
              ? "w-3 h-3 bg-orange-500 rounded-full cursor-pointer"
              : "w-3 h-3 bg-orange-300 rounded-full cursor-pointer";
        });
      }
    };

    // Auto-slide every 3 seconds
    const interval = setInterval(() => {
      window.nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+Gujarati:wght@400;500;600;700&family=Mukti:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.cdnfonts.com/css/ams-pankhuri-gujarati-calligraphy"
          rel="stylesheet"
        />
      </Head>
      <div className="min-h-screen bg-gradient-to-b from-white via-orange-50 to-yellow-50">
        {/* Header */}
        <header className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-4 shadow-lg">
          <div className="container mx-auto text-center">
            <h1
              className="text-2xl md:text-3xl font-bold tracking-wide"
              style={{
                fontFamily:
                  "AMS Pankhuri Gujarati Calligraphy, Noto Serif Gujarati, serif",
                letterSpacing: "2px",
                textShadow: "3px 3px 6px rgba(0,0,0,0.4)",
                // background: "linear-gradient(45deg, #fff, #fef3c7, #fed7aa)",
                WebkitBackgroundClip: "text",
                // WebkitTextFillColor: "transparent",
                // filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.6))",
                fontWeight: "700",
              }}
            >
              શ્રી 1008 શાંતિનાથ ભગવાન પંચ કલ્યાણક મહોત્સવ - હિમતનગર
            </h1>
            {/* <h2
              className="text-lg md:text-xl font-semibold mt-2"
              style={{
                fontFamily:
                  "AMS Pankhuri Gujarati Calligraphy, Noto Serif Gujarati, serif",
                letterSpacing: "1.5px",
                textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                color: "#fef3c7",
                fontWeight: "600",
              }}
            >
              પંચ કલ્યાણક મહોત્સવ - હિમતનગર
            </h2>
            <p className="text-sm mt-1 opacity-90 font-medium">
              Shri 1008 Shantinath Bhagwan | Panch Kalyanak Mahotsav -
              Himatnagar
            </p> */}
          </div>
        </header>

        {/* Main Content */}
        <main className="flex items-center justify-center py-8 px-4">
          <div className="max-w-4xl w-full">
            <div className="bg-white rounded-xl shadow-xl border-2 border-orange-200 p-6">
              <div className="grid md:grid-cols-2 gap-6 items-center">
                {/* Images Side */}
                <div className="text-center">
                  <div className="mb-4">
                    {/* <div className="text-8xl mb-2">🙏</div>
                    <div className="text-6xl mb-2">☸️</div>
                    <div className="text-5xl">🕉️</div> */}
                  </div>
                  <h2
                    className="text-lg md:text-xl font-bold text-orange-700 mb-2"
                    style={{
                      fontFamily:
                        "AMS Pankhuri Gujarati Calligraphy, Noto Serif Gujarati, serif",
                    }}
                  >
                    પંચ કલ્યાણક મહોત્સવ
                  </h2>

                  <p className="text-sm text-gray-600">
                    27 January'26- 1 Feburay'26
                  </p>
                </div>

                {/* Counter Side */}
                <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg p-6 border border-orange-300 text-center">
                  <div className="text-6xl md:text-7xl font-bold text-orange-600 mb-3">
                    {daysLeft}
                  </div>
                  <div
                    className="text-xl md:text-2xl font-semibold text-orange-700"
                    style={{
                      fontFamily:
                        "AMS Pankhuri Gujarati Calligraphy, Noto Serif Gujarati, serif",
                      letterSpacing: "0.8px",
                      textShadow: "1px 1px 3px rgba(0,0,0,0.2)",
                      fontWeight: "600",
                    }}
                  >
                    {daysLeft === 1 ? "દિવસ બાકી" : "દિવસો બાકી"}
                  </div>
                  {/* <div className="text-sm text-gray-600 mt-1">
                    {daysLeft === 1 ? "day remaining" : "days remaining"}
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Image Carousel Section */}
        <section className="py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg border border-orange-200 p-6">
              <h3
                className="text-xl font-bold text-orange-700 text-center mb-4"
                style={{
                  fontFamily:
                    "AMS Pankhuri Gujarati Calligraphy, Noto Serif Gujarati, serif",
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
                  onclick="prevSlide()"
                >
                  ←
                </button>
                <button
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg"
                  onclick="nextSlide()"
                >
                  →
                </button>
              </div>
              <div className="flex justify-center mt-4 space-x-2">
                <div
                  className="w-3 h-3 bg-orange-500 rounded-full cursor-pointer"
                  onclick="goToSlide(0)"
                ></div>
                <div
                  className="w-3 h-3 bg-orange-300 rounded-full cursor-pointer"
                  onclick="goToSlide(1)"
                ></div>
                <div
                  className="w-3 h-3 bg-orange-300 rounded-full cursor-pointer"
                  onclick="goToSlide(2)"
                ></div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-8 text-orange-700">
          <p
            className="text-lg font-medium"
            style={{
              fontFamily:
                "AMS Pankhuri Gujarati Calligraphy, Noto Serif Gujarati, serif",
              letterSpacing: "0.5px",
              textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
              fontSize: "1.2rem",
            }}
          >
            જય જિનેન્દ્ર
          </p>
        </footer>
      </div>
    </>
  );
}
