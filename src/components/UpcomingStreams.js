import { useState, useEffect } from 'react';

const UpcomingStreams = ({ upcomingStreams }) => {
  // Format date for display
  const formatStreamDate = (dateString) => {
    const streamDate = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // Check if the stream is tomorrow
    if (streamDate.getDate() === tomorrow.getDate() && 
        streamDate.getMonth() === tomorrow.getMonth() && 
        streamDate.getFullYear() === tomorrow.getFullYear()) {
      const options = { hour: '2-digit', minute: '2-digit' };
      return `Tomorrow, ${streamDate.toLocaleTimeString(undefined, options)}`;
    }
    
    // Regular format for other dates
    const options = { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return streamDate.toLocaleDateString(undefined, options);
  };

  // Calculate time remaining until stream
  const getTimeRemaining = (scheduledStartTime) => {
    const total = Date.parse(scheduledStartTime) - Date.parse(new Date());
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    
    if (days > 0) {
      return `${days}d ${hours}h`;
    } else if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else {
      return `${minutes}m`;
    }
  };

  if (!upcomingStreams || upcomingStreams.length === 0) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
        <h3 className="text-lg font-bold text-blue-700 mb-3 text-center"
          style={{
            fontFamily: "AMS Pankhuri Gujarati Calligraphy, Noto Serif Gujarati, serif",
          }}>
          🗓️ આગામી લાઇવ સ્ટ્રીમ
        </h3>
        <div className="text-center py-4">
          <p>No upcoming streams scheduled</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-3 sm:p-4 border border-blue-200 overflow-hidden">
      <h3 className="text-base sm:text-lg font-bold text-blue-700 mb-2 sm:mb-3 text-center"
        style={{
          fontFamily: "AMS Pankhuri Gujarati Calligraphy, Noto Serif Gujarati, serif",
        }}>
        🗓️ આગામી લાઇવ સ્ટ્રીમ
      </h3>
      
      <div className="divide-y divide-blue-200 bg-white rounded-lg p-2 overflow-hidden">
        {upcomingStreams.map((stream) => (
          <div key={stream.videoId} className="py-3 sm:py-4 flex flex-col hover:bg-blue-50 px-2 rounded">
            <div className="flex items-start">
              <div className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 mr-2 sm:mr-3 overflow-hidden rounded-lg">
                <img 
                  src={stream.thumbnail || `https://img.youtube.com/vi/${stream.videoId}/default.jpg`}
                  alt={stream.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/panchkalyank.jpeg";
                  }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <h5 className="text-xs sm:text-sm font-medium text-gray-900" title={stream.title}>{stream.title}</h5>
              </div>
            </div>
            <div className="flex items-center justify-between flex-wrap mt-2 pl-12">
              <p className="text-xs font-semibold bg-yellow-100 text-yellow-800 inline-flex items-center px-1.5 py-0.5 rounded mb-1 mr-1">
                <span className="mr-1">🕒</span>
                {formatStreamDate(stream.scheduledStartTime)}
              </p>
              <a 
                href={`https://www.youtube.com/watch?v=${stream.videoId}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs font-medium bg-red-600 hover:bg-red-700 rounded-full px-3 py-1 text-white inline-flex items-center mb-1 transition-colors shadow-sm"
              >
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M10,16.5V7.5L16,12M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
                </svg>
                Watch
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingStreams;