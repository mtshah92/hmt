"use client";
import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Header from "../components/Header";
import AnimatedBanner from "../components/AnimatedBanner";
import CountdownTimer from "../components/CountdownTimer";
import LiveStream from "../components/LiveStream";
import UpcomingStreams from "../components/UpcomingStreams";
import ImageCarousel from "../components/ImageCarousel";
import { checkLiveStream, getUpcomingStreams } from "../utils/youtube";

export default function Home() {
  const [liveStreamId, setLiveStreamId] = useState(null);
  const [isLive, setIsLive] = useState(false);
  const [upcomingStreams, setUpcomingStreams] = useState([]);
  const targetDate = new Date("2026-01-27T00:00:00");

  useEffect(() => {
    const fetchLiveStream = async () => {
      const { isLive, videoId } = await checkLiveStream();
      setIsLive(isLive);
      setLiveStreamId(videoId);
    };

    const fetchUpcomingStreams = async () => {
      const streams = await getUpcomingStreams();
      setUpcomingStreams(streams);
    };

    fetchLiveStream();
    fetchUpcomingStreams();
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
      <div className="min-h-screen bg-gradient-to-b from-white via-orange-50 to-yellow-50 relative">
        <Header />
        <AnimatedBanner />

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

        {/* Hero Section - Removed as AnimatedBanner replaces it */}

        {/* Countdown Section - Timer */}
        <section className="py-6 sm:py-8 px-3 sm:px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg border border-orange-100 p-4 sm:p-6 md:p-8">
              <h3 className="text-lg sm:text-xl font-semibold text-center mb-4 sm:mb-6 text-gray-800">
                Pratistha Mahotsav Countdown
              </h3>
              <CountdownTimer targetDate={targetDate} />
            </div>
          </div>
        </section>

        {/* Registration Button - Round Shape */}
        <section className="py-6 sm:py-8 px-3 sm:px-4">
          <div className="max-w-5xl mx-auto flex flex-col items-center justify-center gap-3 sm:gap-4">
            {/* Quiz Message */}
            <div className="text-center mb-3 sm:mb-4">
              <p
                className="text-base sm:text-lg md:text-xl font-bold text-orange-800 leading-relaxed"
                style={{
                  fontFamily:
                    "AMS Pankhuri Gujarati Calligraphy, Noto Serif Gujarati, serif",
                  textShadow:
                    "2px 2px 4px rgba(0,0,0,0.15), 0 0 8px rgba(255, 152, 0, 0.2)",
                }}
              >
                Aaya Panchkalyanak Mahaan (Quiz)!
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Click below to enter quiz
              </p>
            </div>

            {/* Quiz Button - Round */}
            <Link
              href="/quiz"
              className="group bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-semibold py-4 px-6 sm:py-5 sm:px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-center border-2 border-orange-500 hover:border-orange-400 flex items-center justify-center min-w-[140px] sm:min-w-[160px]"
            >
              <span className="text-base sm:text-lg">
                Aaya Panchkalyanak Mahaan
              </span>
            </Link>
          </div>
        </section>

        {/* Gallery Section - Panchakalyanak */}
        <section className="py-8 sm:py-12 px-3 sm:px-4 relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 bg-orange-200 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-yellow-200 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-orange-100 rounded-full blur-3xl"></div>
          </div>

          <div className="max-w-6xl mx-auto relative z-10">
            <ImageCarousel />
          </div>
        </section>

        {/* Main Content Grid */}
        <main className="py-6 px-3 sm:py-8 sm:px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 md:gap-8 mb-8 sm:mb-12">
              {/* Live Stream Section */}
              <div className="bg-white rounded-2xl shadow-lg border border-orange-100 p-4 sm:p-6 md:p-8">
                <h3 className="text-lg sm:text-xl font-semibold text-center mb-4 sm:mb-6 text-gray-800">
                  Live Stream
                </h3>
                <LiveStream isLive={isLive} liveStreamId={liveStreamId} />
              </div>

              {/* Upcoming Streams Section */}
              <div className="bg-white rounded-2xl shadow-lg border border-orange-100 p-4 sm:p-6 md:p-8 mt-6 lg:mt-0">
                <h3 className="text-lg sm:text-xl font-semibold text-center mb-4 sm:mb-6 text-gray-800">
                  <span className="inline-block mr-2">🗓️</span>
                  Upcoming Streams
                </h3>
                <UpcomingStreams upcomingStreams={upcomingStreams} />

                {upcomingStreams.length > 0 && (
                  <div className="mt-4 text-center">
                    <Link href="/videos">
                      <span className="inline-block text-sm text-blue-600 hover:text-blue-800 hover:underline">
                        View all videos →
                      </span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>

        {/* Simple Links Section - At Last */}
        <section className="py-8 sm:py-12 px-3 sm:px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center flex flex-col sm:flex-row gap-6 sm:gap-8 justify-center items-center">
              <Link
                href="/videos"
                className="text-orange-700 hover:text-orange-800 font-semibold text-lg sm:text-xl transition-all duration-300 hover:scale-105 group"
                style={{
                  fontFamily:
                    "AMS Pankhuri Gujarati Calligraphy, Noto Serif Gujarati, serif",
                }}
              >
                <span className="inline-block border-b-2 border-transparent hover:border-orange-500 transition-colors pb-1">
                  📺 Video Gallery
                </span>
              </Link>
              <div className="hidden sm:block w-px h-6 bg-orange-300"></div>
              <Link
                href="/gallery"
                className="text-orange-700 hover:text-orange-800 font-semibold text-lg sm:text-xl transition-all duration-300 hover:scale-105 group"
                style={{
                  fontFamily:
                    "AMS Pankhuri Gujarati Calligraphy, Noto Serif Gujarati, serif",
                }}
              >
                <span className="inline-block border-b-2 border-transparent hover:border-orange-500 transition-colors pb-1">
                  🖼️ Photo Gallery
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
            જય જિનેન્દ્ર
          </p>
        </footer>
      </div>
    </>
  );
}
