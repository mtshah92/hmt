const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
const CHANNEL_ID = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID;

export const checkLiveStream = async () => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&eventType=live&type=video&key=${API_KEY}`
    );

    const data = await response.json();

    if (data.items && data.items.length > 0) {
      return {
        isLive: true,
        videoId: data.items[0].id.videoId,
      };
    }

    return { isLive: false, videoId: null };
  } catch (error) {
    console.log("Error checking live stream:", error);
    return { isLive: false, videoId: null };
  }
};

export const getUpcomingStreams = async () => {
  try {
    // First try to get upcoming broadcasts
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&eventType=upcoming&type=video&key=${API_KEY}&maxResults=5`
    );

    const data = await response.json();
    
    if (!data.items || data.items.length === 0) {
      return [];
    }
    
    // Get additional details for each upcoming stream
    const videoIds = data.items.map(item => item.id.videoId).join(',');
    const detailsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=liveStreamingDetails,snippet&id=${videoIds}&key=${API_KEY}`
    );
    
    const detailsData = await detailsResponse.json();
    
    if (!detailsData.items) {
      return [];
    }
    
    // Get current time
    const now = new Date();
    
    // Format the response and filter out past streams
    return detailsData.items
      .filter(item => 
        item.liveStreamingDetails && 
        item.liveStreamingDetails.scheduledStartTime && 
        new Date(item.liveStreamingDetails.scheduledStartTime) > now
      )
      .map(item => ({
        videoId: item.id,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.high?.url,
        scheduledStartTime: item.liveStreamingDetails.scheduledStartTime
      }))
      .sort((a, b) => new Date(a.scheduledStartTime) - new Date(b.scheduledStartTime));
      
  } catch (error) {
    console.log("Error fetching upcoming streams:", error);
    return [];
  }
};
