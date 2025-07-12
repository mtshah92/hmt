const LiveStream = ({ isLive, liveStreamId }) => {
  return (
    <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-lg p-4 border border-red-300">
      <h3
        className="text-lg font-bold text-red-700 mb-3 text-center"
        style={{
          fontFamily:
            "AMS Pankhuri Gujarati Calligraphy, Noto Serif Gujarati, serif",
        }}
      >
        🔴 લાઇવ સ્ટ્રીમ
      </h3>
      <div className="aspect-video bg-black rounded overflow-hidden">
        {isLive ? (
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${liveStreamId}?autoplay=1`}
            title="Live Stream"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <div className="flex items-center justify-center h-full text-white">
            <div className="text-center">
              <div className="text-4xl mb-2">📺</div>
              <p className="text-sm">No Live Stream</p>
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
