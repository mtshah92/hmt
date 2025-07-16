"use client";
import { useState } from "react";

const GalleryDetail = ({ collection, onBackClick }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  // Handle image click to open lightbox
  const openLightbox = (index) => {
    setSelectedImageIndex(index);
    document.body.style.overflow = "hidden";
  };

  // Handle closing the lightbox
  const closeLightbox = () => {
    setSelectedImageIndex(null);
    document.body.style.overflow = "auto";
  };

  // Navigate to previous image in lightbox
  const prevImage = () => {
    setSelectedImageIndex((prev) => 
      prev === 0 ? collection.images.length - 1 : prev - 1
    );
  };

  // Navigate to next image in lightbox
  const nextImage = () => {
    setSelectedImageIndex((prev) => 
      prev === collection.images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-orange-200 p-6">
      <div className="flex items-center mb-6">
        <button 
          onClick={onBackClick}
          className="bg-orange-100 hover:bg-orange-200 text-orange-700 px-4 py-2 rounded-lg flex items-center mr-4"
        >
          ← Back
        </button>
        <h2 className="text-2xl font-bold text-gray-800">{collection.title}</h2>
      </div>
      
      <p className="text-gray-600 mb-6">{collection.description}</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {collection.images.map((image, index) => (
          <div 
            key={index} 
            className="cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow"
            onClick={() => openLightbox(index)}
          >
            <img 
              src={image.src} 
              alt={image.alt} 
              className="w-full h-48 object-cover hover:scale-105 transition-transform"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/panchkalyank.jpeg";
              }}
            />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImageIndex !== null && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          <button 
            className="absolute top-4 right-4 text-white text-2xl hover:text-orange-300"
            onClick={closeLightbox}
          >
            ✕
          </button>
          
          <button 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 rounded-full p-3 text-white"
            onClick={prevImage}
          >
            ←
          </button>
          
          <img 
            src={collection.images[selectedImageIndex].src} 
            alt={collection.images[selectedImageIndex].alt}
            className="max-h-[80vh] max-w-[90vw] object-contain"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/panchkalyank.jpeg";
            }}
          />
          
          <button 
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 rounded-full p-3 text-white"
            onClick={nextImage}
          >
            →
          </button>
          
          <div className="absolute bottom-4 left-0 right-0 text-center text-white">
            {selectedImageIndex + 1} / {collection.images.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryDetail;