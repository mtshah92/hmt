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
