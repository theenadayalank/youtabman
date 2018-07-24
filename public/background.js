/**
 * Variable Declarations
 */
var browser = browser || chrome; // eslint-disable-line


(() => {
  /*
  Self Closing function to make the code as private
  */
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;


  // Event Listeners
  browser.runtime.onMessage.addListener((message, sender , callback) => {
    
    // Needed Propertes
    let video = document.getElementsByTagName('video')[0];
    let streamButton = document.querySelectorAll('.ytp-play-button')[0].getAttribute('aria-label');
    let nextVideoTitle = document.querySelectorAll('.ytp-next-button')[0].getAttribute('data-tooltip-text');
    let nextVideoThumbnail = document.querySelectorAll('.ytp-next-button')[0].getAttribute('data-preview');

    if(message === 'initialize') {
      let videoStatus; 
      if(streamButton) {
        videoStatus = streamButton === 'Play' ? 'paused' : 'playing';
      } else {
        videoStatus = 'replay';
      }
      callback({
        videoStatus: videoStatus,
        isMuted: video.muted,
        isLooped: video.loop,
        nextVideoTitle: nextVideoTitle,
        nextVideoThumbnail: nextVideoThumbnail.replace('hqdefault.jpg', 'default.jpg')
      });
    }

    switch(message) {
    case 'streaming': 
      if(streamButton === 'Pause') {
        video.pause();
        callback('paused');
      } else if (streamButton === 'Play'){
        video.play();
        callback('playing');
      } else {
        document.getElementsByClassName('ytp-play-button ytp-button')[0].click();
        callback('playing');
      }
      break;
      
    case 'next':
      video.loop ? video.loop = false : null;
      document.getElementsByClassName('ytp-next-button ytp-button')[0].click();
      callback('next');
      break;

    case 'replay': 
      document.getElementsByTagName('video')[0].currentTime = 0;
      callback('replayed');
      break; 

    case 'mute':
      video.muted ? video.muted=false : video.muted=true;
      callback(video.muted);
      break;

    case 'loop':
      video.loop ? video.loop=false : video.loop=true;
      callback(video.loop);
      break;
      
    default: 
      break;
    }
  });
})();