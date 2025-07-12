const API_KEY = "AIzaSyD8s2lsE0g74NWoBVFkyN7NMbmPzcSxS2M";
const CHANNEL_ID = "UCqE3OcU5RokQW45Sgt9uF3A";

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
