"use client";
import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Header from "../components/Header";
import CountdownTimer from "../components/CountdownTimer";
import LiveStream from "../components/LiveStream";
import ImageCarousel from "../components/ImageCarousel";
import { checkLiveStream } from "../utils/youtube";
import { calculateDaysLeft } from "../utils/dateUtils";

export default function Home() {
  const [daysLeft, setDaysLeft] = useState(0);
  const [liveStreamId, setLiveStreamId] = useState(null);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const targetDate = new Date("2026-01-27");
    setDaysLeft(calculateDaysLeft(targetDate));

    const fetchLiveStream = async () => {
      const { isLive, videoId } = await checkLiveStream();
      setIsLive(isLive);
      setLiveStreamId(videoId);
    };

    fetchLiveStream();
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
        <Header />

        {/* Image Section */}
        {/* <section className="py-6 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <img
              src="/panchkalyank.jpeg"
              alt="Shantinath Bhagwan"
              className="w-full max-w-2xl mx-auto rounded-lg shadow-lg"
            />
          </div>
        </section> */}

        {/* Hero Section */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className="mb-8">
              <div className="flex justify-center items-center gap-4 mb-4 text-2xl md:text-3xl font-bold text-orange-700 mb-3">
                શ્રી 1008 શાંતિનાથ ભગવાન પંચ કલ્યાણક મહોત્સવ - હિંમતનગર
              </div>
              <h2
                className="text-2xl md:text-3xl font-bold text-orange-700 mb-3"
                style={{
                  fontFamily:
                    "AMS Pankhuri Gujarati Calligraphy, Noto Serif Gujarati, serif",
                }}
              >
                મહોત્સવ શુભારંભ
              </h2>
              <p className="text-lg text-gray-600 mb-2">January 27, 2026</p>
              <div className="w-24 h-1 bg-orange-400 mx-auto rounded"></div>
            </div>
          </div>
        </section>

        {/* Main Content Grid */}
        <main className="py-8 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              {/* Countdown Section */}
              <div className="bg-white rounded-2xl shadow-lg border border-orange-100 p-8">
                <h3 className="text-xl font-semibold text-center mb-6 text-gray-800">
                  Event Countdown
                </h3>
                <CountdownTimer daysLeft={daysLeft} />
              </div>

              {/* Live Stream Section */}
              <div className="bg-white rounded-2xl shadow-lg border border-orange-100 p-8">
                <h3 className="text-xl font-semibold text-center mb-6 text-gray-800">
                  Live Stream
                </h3>
                <LiveStream isLive={isLive} liveStreamId={liveStreamId} />
              </div>
            </div>
          </div>
        </main>

        {/* Gallery Section */}
        <section className="py-12 bg-orange-25">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                Photo Gallery
              </h2>
              <div className="w-24 h-1 bg-orange-400 mx-auto rounded"></div>
            </div>
            <ImageCarousel />
            <div className="text-center mt-8 flex justify-center space-x-4">
              <Link href="/gallery">
                <span className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-lg transition-colors">
                  View Photo Gallery
                </span>
              </Link>
              <Link href="/videos">
                <span className="inline-block bg-orange-700 hover:bg-orange-800 text-white font-medium py-3 px-6 rounded-lg transition-colors">
                  View Video Gallery
                </span>
              </Link>
            </div>
          </div>
        </section>

        <footer className="bg-gradient-to-r from-orange-100 to-yellow-100 text-center py-12 text-orange-700 mt-12">
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
            ☸️ જય જિનેન્દ્ર ☸️
          </p>
        </footer>
      </div>
    </>
  );
}
