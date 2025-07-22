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

        {/* Countdown Section */}
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
            <div className="text-center mt-8 flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
              <Link href="/gallery">
                <span className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition-colors w-full sm:w-auto">
                  View Photo Gallery
                </span>
              </Link>
              <Link href="/videos">
                <span className="inline-block bg-orange-700 hover:bg-orange-800 text-white font-medium py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition-colors w-full sm:w-auto">
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
