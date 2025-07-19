import { useState, useEffect } from 'react';

const UpcomingStreams = ({ upcomingStreams }) => {
  // Format date for display
  const formatStreamDate = (dateString) => {
    const options = { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
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
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-3 sm:p-4 border border-blue-200">
      <h3 className="text-base sm:text-lg font-bold text-blue-700 mb-2 sm:mb-3 text-center"
        style={{
          fontFamily: "AMS Pankhuri Gujarati Calligraphy, Noto Serif Gujarati, serif",
        }}>
        🗓️ આગામી લાઇવ સ્ટ્રીમ
      </h3>
      
      <div className="divide-y divide-blue-200 bg-white rounded-lg p-2">
        {upcomingStreams.map((stream) => (
          <div key={stream.videoId} className="py-2 sm:py-3 flex flex-wrap sm:flex-nowrap items-start hover:bg-blue-50 px-2 rounded">
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
            <div className="flex-1 min-w-0 mb-1 sm:mb-0">
              <h5 className="text-xs sm:text-sm font-medium text-gray-900 line-clamp-1">{stream.title}</h5>
              <div className="flex flex-wrap items-center mt-1">
                <p className="text-xs font-semibold bg-yellow-100 text-yellow-800 inline-flex items-center px-1.5 py-0.5 rounded">
                  <span className="mr-1">🕒</span>
                  {formatStreamDate(stream.scheduledStartTime)}
                </p>
              </div>
            </div>
            <div className="w-full sm:w-auto sm:ml-2 mt-1 sm:mt-0 bg-blue-100 rounded px-2 py-1 text-center sm:text-left whitespace-nowrap">
              <span className="text-xs font-medium text-blue-800">
                In {getTimeRemaining(stream.scheduledStartTime)}
              </span>
            </div>
          </div>
        ))}
      </div>
      

    </div>
  );
};

export default UpcomingStreams;