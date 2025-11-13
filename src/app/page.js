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

        {/* Registration and Quiz Buttons Section */}
        <section className="py-6 sm:py-8 px-3 sm:px-4">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg border border-orange-100 p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-semibold text-center mb-6 text-gray-800">
                Quick Actions
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
                {/* Registration Button */}
                <a 
                  href="https://webdada.sanghtech.com/c/PanchkalyanakPratishthaMahotsavHimmatnagar2025/11" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-medium py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] text-center border-2 border-orange-500 hover:border-orange-400 flex flex-col items-center justify-center min-h-[140px]"
                >
                  <span className="text-3xl group-hover:scale-110 transition-transform duration-300 mb-2">🏛️</span>
                  <span className="text-sm sm:text-base font-semibold leading-tight mb-1">
                    Click here for Pratistha and Awas Registration
                  </span>
                  <span className="text-xs opacity-90">Register Now →</span>
                </a>
                
                {/* Quiz Button */}
                <Link href="/quiz" className="group bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-medium py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] text-center border-2 border-purple-500 hover:border-purple-400 flex flex-col items-center justify-center min-h-[140px]">
                  <span className="text-3xl group-hover:scale-110 transition-transform duration-300 mb-2">🎯</span>
                  <span className="text-sm sm:text-base font-semibold leading-tight mb-1">
                    Daily Quiz
                  </span>
                  <span className="text-xs opacity-90">Test Your Knowledge →</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

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

        {/* Gallery Section */}
        <section className="py-8 sm:py-12 px-3 sm:px-4 relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 bg-orange-200 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-yellow-200 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-orange-100 rounded-full blur-3xl"></div>
          </div>
          
          <div className="max-w-6xl mx-auto relative z-10">
            <ImageCarousel />
            
            {/* Enhanced call-to-action section */}
            <div className="text-center mt-8 sm:mt-12">
              <div className="bg-gradient-to-r from-white via-orange-50 to-yellow-50 rounded-2xl shadow-lg border border-orange-100 p-6 sm:p-8 backdrop-blur-sm">
                <h3 
                  className="text-lg sm:text-xl font-semibold mb-4 text-gray-800"
                  style={{
                    fontFamily: "AMS Pankhuri Gujarati Calligraphy, Noto Serif Gujarati, serif",
                    textShadow: "1px 1px 2px rgba(0,0,0,0.1)"
                  }}
                >
                  Explore More Spiritual Content
                </h3>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Link href="/quiz">
                    <span className="inline-block bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                      🎯 Daily Quiz
                    </span>
                  </Link>
                  <Link href="/videos">
                    <span className="inline-block bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                      📺 View Video Gallery
                    </span>
                  </Link>
                  <Link href="/gallery">
                    <span className="inline-block bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                      🖼️ Photo Gallery
                    </span>
                  </Link>
                </div>
                <p className="text-sm text-gray-600 mt-4 italic">
                  Immerse yourself in the divine journey of Panchkalyanka
                </p>
              </div>
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
