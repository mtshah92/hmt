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
import { calculateDaysLeft } from "../utils/dateUtils";

export default function Home() {
  const [daysLeft, setDaysLeft] = useState(0);
  const [liveStreamId, setLiveStreamId] = useState(null);
  const [isLive, setIsLive] = useState(false);
  const [upcomingStreams, setUpcomingStreams] = useState([]);

  useEffect(() => {
    const targetDate = new Date("2026-01-27");
    setDaysLeft(calculateDaysLeft(targetDate));

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
        <section className="py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg border border-orange-100 p-8">
              <h3 className="text-xl font-semibold text-center mb-6 text-gray-800">
                Pratistha Mahotsav Countdown
              </h3>
              <CountdownTimer daysLeft={daysLeft} />
            </div>
          </div>
        </section>

        {/* Main Content Grid */}
        <main className="py-8 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              {/* Live Stream Section */}
              <div className="bg-white rounded-2xl shadow-lg border border-orange-100 p-8">
                <h3 className="text-xl font-semibold text-center mb-6 text-gray-800">
                  Live Stream
                </h3>
                <LiveStream isLive={isLive} liveStreamId={liveStreamId} />
              </div>

              {/* Upcoming Streams Section */}
              <div className="bg-white rounded-2xl shadow-lg border border-orange-100 p-8">
                <h3 className="text-xl font-semibold text-center mb-6 text-gray-800">
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
