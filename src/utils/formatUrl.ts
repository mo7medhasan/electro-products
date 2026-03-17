
export const getCleanImageUrl = (rawUrl: string): string => {
  try {
    // Check if it's a Google imgres URL
    if (rawUrl.includes('google.com/imgres')) {
      const urlObj = new URL(rawUrl);
      const imgUrl = urlObj.searchParams.get('imgurl');
      
      // If we found the imgurl parameter, decode and return it
      if (imgUrl) {
        return decodeURIComponent(imgUrl);
      }
    }
    
    // If it's not a Google URL or parsing fails, return the original
    return rawUrl;
  } catch (error) {
    console.error("Error parsing URL:", error);
    // Fallback to original URL if something goes wrong
    return rawUrl;
  }
};