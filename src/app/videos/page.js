"use client";
import { useState } from "react";
import Header from "../../components/Header";
import VideoPlayer from "../../components/VideoPlayer";

export default function Videos() {
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Sample videos data - replace with your actual YouTube videos
  const videos = [
    {
      id: "video1",
      title: "सोनगढ़ प्रतिकृति का भव्य शिलान्यास उत्सव- पत्रिका लेखन समारंभ",
      description: "",
      youtubeId: "yPgZhsTTXi8", // Replace with actual YouTube video ID
      thumbnail: "https://img.youtube.com/vi/yPgZhsTTXi8/maxresdefault.jpg",
    },
    {
      id: "video2",
      title: "मंगल गीत - श्री सोनगढ़ प्रतिकृति शिलान्यास महोत्सव",
      description: "",
      youtubeId: "iv97P4YV40E", // Replace with actual YouTube video ID
      thumbnail: "/songadh_pratikruti.jpg",
      date: "",
    },
    {
      id: "video3",
      title: "श्री सोनगढ़ प्रतिकृति शिलान्यास महोत्सव पूर्व बेला",
      description: "",
      youtubeId: "4f2DSxV10RM", // Replace with actual YouTube video ID
      thumbnail: "https://img.youtube.com/vi/4f2DSxV10RM/maxresdefault.jpg",
      date: "",
    },
    {
      id: "video4",
      title: "श्री सोनगढ़ प्रतिकृति शिलान्यास महोत्सव",
      description: "",
      youtubeId: "BHvaM-bCmyI", // Replace with actual YouTube video ID
      thumbnail: "https://img.youtube.com/vi/BHvaM-bCmyI/maxresdefault.jpg",
      date: "",
    },
  ];

  // Handle video selection
  const handleVideoClick = (video) => {
    setSelectedVideo(video);
    window.scrollTo(0, 0);
  };

  // Handle back button click
  const handleBackClick = () => {
    setSelectedVideo(null);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-orange-50 to-yellow-50">
      <Header />

      <main className="py-8 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            વિડિઓ ગેલેરી
          </h1>
          <div className="w-24 h-1 bg-orange-400 mx-auto rounded"></div>
        </div>

        {selectedVideo ? (
          <div className="bg-white rounded-xl shadow-lg border border-orange-200 p-6">
            <div className="flex items-center mb-6">
              <button
                onClick={handleBackClick}
                className="bg-orange-100 hover:bg-orange-200 text-orange-700 px-4 py-2 rounded-lg flex items-center mr-4"
              >
                ← Back
              </button>
              <h2 className="text-2xl font-bold text-gray-800">
                {selectedVideo.title}
              </h2>
            </div>

            <VideoPlayer youtubeId={selectedVideo.youtubeId} />

            <div className="mt-6">
              <p className="text-gray-600 mb-2">{selectedVideo.description}</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {videos.map((video) => (
              <div
                key={video.id}
                className="bg-white rounded-xl shadow-lg border border-orange-200 overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
                onClick={() => handleVideoClick(video)}
              >
                <div className="relative">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/panchkalyank.jpeg";
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-orange-600/80 rounded-full flex items-center justify-center">
                      <div className="w-0 h-0 border-t-8 border-b-8 border-l-12 border-t-transparent border-b-transparent border-l-white ml-1"></div>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {video.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{video.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
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
          ☸️ જય જિનેન્દ્ર ☸️
        </p>
      </footer>
    </div>
  );
}
