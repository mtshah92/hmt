const LiveStream = ({ isLive, liveStreamId }) => {
  return (
    <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-lg p-3 sm:p-4 border border-red-300">
      <h3
        className="text-base sm:text-lg font-bold text-red-700 mb-2 sm:mb-3 text-center"
        style={{
          fontFamily:
            "AMS Pankhuri Gujarati Calligraphy, Noto Serif Gujarati, serif",
        }}
      >
        🔴 લાઇવ સ્ટ્રીમ
      </h3>
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        {isLive ? (
          <iframe
            className="absolute top-0 left-0 w-full h-full rounded"
            src={`https://www.youtube.com/embed/${liveStreamId}?autoplay=1`}
            title="Live Stream"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <div className="absolute top-0 left-0 w-full h-full bg-black rounded flex items-center justify-center text-white">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl mb-2">📺</div>
              <p className="text-xs sm:text-sm">No Live Stream</p>
            </div>
          </div>
        )}
      </div>
      <p className="text-xs text-gray-600 mt-2 text-center">
        {isLive ? "🔴 Live Now" : "Offline"}
      </p>
    </div>
  );
};

export default LiveStream;
