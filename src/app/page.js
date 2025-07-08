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
  }, []);

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+Gujarati:wght@400;500;600;700&family=Mukti:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="min-h-screen bg-gradient-to-b from-white via-orange-50 to-yellow-50">
        {/* Header */}
        <header className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-6 shadow-lg">
          <div className="container mx-auto text-center">
            <h1
              className="text-3xl md:text-4xl font-bold tracking-wide"
              style={{
                fontFamily: "Noto Serif Gujarati, serif",
                letterSpacing: "1px",
                textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                background: "linear-gradient(45deg, #fff, #fef3c7)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(1px 1px 2px rgba(0,0,0,0.5))"
              }}
            >
              ☸️ હિમતનગર મુમુક્ષુ મંડળ ☸️
            </h1>
            <p className="text-lg mt-2 opacity-90">
              Himatnagar Mumukshu Mandal
            </p>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex items-center justify-center py-16 px-4">
          <div className="text-center max-w-2xl">
            <div className="bg-white rounded-2xl shadow-2xl border-4 border-orange-200 p-8 md:p-12">
              {/* <div className="mb-8">
              <div className="text-6xl mb-4">🙏</div>
              <h2 className="text-2xl md:text-3xl font-bold text-orange-700 mb-2">
                આગામી પવિત્ર દિવસ
              </h2>
              <p className="text-lg text-gray-600">January 27, 2026</p>
            </div> */}

              <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-8 border-2 border-orange-300">
                <div className="text-8xl md:text-9xl font-bold text-orange-600 mb-4">
                  {daysLeft}
                </div>
                <div
                  className="text-2xl md:text-3xl font-semibold text-orange-700"
                  style={{
                    fontFamily: "Noto Serif Gujarati, serif",
                    letterSpacing: "0.8px",
                    textShadow: "1px 1px 3px rgba(0,0,0,0.2)",
                    fontWeight: "600"
                  }}
                >
                  {daysLeft === 1 ? "દિવસ બાકી" : "દિવસો બાકી"}
                </div>
                <div className="text-lg text-gray-600 mt-2">
                  {daysLeft === 1 ? "day remaining" : "days remaining"}
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="text-center py-8 text-orange-700">
          <p
            className="text-lg font-medium"
            style={{
              fontFamily: "Noto Serif Gujarati, serif",
              letterSpacing: "0.5px",
              textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
              fontSize: "1.2rem"
            }}
          >
            ☸️ જય જિનેન્દ્ર ☸️
          </p>
        </footer>
      </div>
    </>
  );
}
