const GalleryCollection = ({ collection, onClick }) => {
  // Use a placeholder image if the thumbnail is not available
  const thumbnailSrc = collection.thumbnail || "/panchkalyank.jpeg";
  
  return (
    <div 
      className="bg-white rounded-xl shadow-lg border border-orange-200 overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={thumbnailSrc} 
          alt={collection.title} 
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/panchkalyank.jpeg";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
          <h3 className="text-white text-xl font-bold p-4 w-full">
            {collection.title}
          </h3>
        </div>
      </div>
      <div className="p-4">
        <p className="text-gray-600">{collection.description}</p>
        <p className="text-orange-600 mt-2 font-medium">
          {collection.images?.length || 0} Photos
        </p>
      </div>
    </div>
  );
};

export default GalleryCollection;