(() => {
  if (window.hasRun) return;
  window.hasRun = true;

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const video = document.querySelector('video');
    if (!video) return false;

    const playButton = document.querySelector('.ytp-play-button');
    const nextButton = document.querySelector('.ytp-next-button');
    const streamButtonLabel = playButton?.getAttribute('aria-label') ?? '';
    const nextVideoTitle = nextButton?.getAttribute('data-tooltip-text') ?? '';
    const nextVideoPreview = nextButton?.getAttribute('data-preview') ?? '';
    const nextVideoThumbnail = nextVideoPreview.replace('hqdefault.jpg', 'default.jpg');
    const isPlaying = streamButtonLabel === 'Pause (k)';
    const isPaused = streamButtonLabel === 'Play (k)';

    switch (message) {
    case 'initialize': {
      let videoStatus;
      if (isPlaying) {
        videoStatus = 'playing';
      } else if (isPaused) {
        videoStatus = 'paused';
      } else {
        videoStatus = 'replay';
      }
      sendResponse({
        videoStatus,
        isMuted: video.muted,
        isLooped: video.loop,
        nextVideoTitle,
        nextVideoThumbnail,
      });
      break;
    }
    case 'streaming':
      if (isPlaying) {
        video.pause();
        sendResponse('paused');
      } else if (isPaused) {
        video.play();
        sendResponse('playing');
      } else {
        document.querySelector('.ytp-play-button.ytp-button')?.click();
        sendResponse('playing');
      }
      break;
    case 'next':
      if (video.loop) video.loop = false;
      document.querySelector('.ytp-next-button.ytp-button')?.click();
      sendResponse('next');
      break;
    case 'replay':
      video.currentTime = 0;
      sendResponse('replayed');
      break;
    case 'mute':
      video.muted = !video.muted;
      sendResponse(video.muted);
      break;
    case 'loop':
      video.loop = !video.loop;
      sendResponse(video.loop);
      break;
    default:
      break;
    }

    return false;
  });
})();
