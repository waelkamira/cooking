// utils/youtubeUtils.js
'use client';

export const getYoutubeVideoId = (url) => {
  let videoId = null;

  // Match youtu.be URLs
  const youtuRegex = /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([^& \n<]+)/;
  const youtuMatch = url?.match(youtuRegex);
  if (youtuMatch && youtuMatch[1]) {
    videoId = youtuMatch[1];
  }

  // Match regular youtube.com URLs
  const youtubeRegex =
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^& \n<]+)/;
  const youtubeMatch = url?.match(youtubeRegex);
  if (youtubeMatch && youtubeMatch[1]) {
    videoId = youtubeMatch[1];
  }

  // Match YouTube Shorts URLs
  const shortsRegex =
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/shorts\/([^& \n<]+)/;
  const shortsMatch = url?.match(shortsRegex);
  if (shortsMatch && shortsMatch[1]) {
    videoId = shortsMatch[1];
  }

  return videoId;
};
