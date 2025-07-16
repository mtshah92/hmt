"use client";
import { useState } from "react";
import Header from "../../components/Header";
import GalleryCollection from "../../components/GalleryCollection";
import GalleryDetail from "../../components/GalleryDetail";

export default function Gallery() {
  const [selectedCollection, setSelectedCollection] = useState(null);
  
  // Sample collections data - replace with your actual data
  const collections = [
    {
      id: "temple-inauguration",
      title: "મંદિર ઉદ્ઘાટન",
      description: "Temple inauguration ceremony photos",
      thumbnail: "/gallery/temple-inauguration/thumb.jpg",
      images: [
        { src: "/gallery/temple-inauguration/img1.jpg", alt: "Inauguration ceremony" },
        { src: "/gallery/temple-inauguration/img2.jpg", alt: "Ribbon cutting" },
        { src: "/gallery/temple-inauguration/img3.jpg", alt: "First prayer" },
      ]
    },
    {
      id: "puja-ceremony",
      title: "પૂજા વિધિ",
      description: "Puja ceremony photos",
      thumbnail: "/gallery/puja-ceremony/thumb.jpg",
      images: [
        { src: "/gallery/puja-ceremony/img1.jpg", alt: "Main puja" },
        { src: "/gallery/puja-ceremony/img2.jpg", alt: "Aarti ceremony" },
        { src: "/gallery/puja-ceremony/img3.jpg", alt: "Offerings" },
      ]
    },
    {
      id: "cultural-events",
      title: "સાંસ્કૃતિક કાર્યક્રમો",
      description: "Cultural events and performances",
      thumbnail: "/gallery/cultural-events/thumb.jpg",
      images: [
        { src: "/gallery/cultural-events/img1.jpg", alt: "Dance performance" },
        { src: "/gallery/cultural-events/img2.jpg", alt: "Music concert" },
        { src: "/gallery/cultural-events/img3.jpg", alt: "Drama presentation" },
      ]
    },
    {
      id: "community-gathering",
      title: "સમુદાય મિલન",
      description: "Community gathering photos",
      thumbnail: "/gallery/community-gathering/thumb.jpg",
      images: [
        { src: "/gallery/community-gathering/img1.jpg", alt: "Community meal" },
        { src: "/gallery/community-gathering/img2.jpg", alt: "Group photo" },
        { src: "/gallery/community-gathering/img3.jpg", alt: "Community activities" },
      ]
    }
  ];

  // Handle collection selection
  const handleCollectionClick = (collection) => {
    setSelectedCollection(collection);
    window.scrollTo(0, 0);
  };

  // Handle back button click
  const handleBackClick = () => {
    setSelectedCollection(null);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-orange-50 to-yellow-50">
      <Header />
      
      <main className="py-8 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            ફોટો ગેલેરી
          </h1>
          <div className="w-24 h-1 bg-orange-400 mx-auto rounded"></div>
        </div>

        {selectedCollection ? (
          <GalleryDetail 
            collection={selectedCollection} 
            onBackClick={handleBackClick} 
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {collections.map((collection) => (
              <GalleryCollection
                key={collection.id}
                collection={collection}
                onClick={() => handleCollectionClick(collection)}
              />
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