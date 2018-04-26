var browser = browser || chrome; // eslint-disable-line
let tabCount;

/* After DOM Content is loaded */
document.addEventListener('DOMContentLoaded', () => {
  searchYoutubeTabs();
});

/* Refresh Button Action*/
document.getElementsByClassName('refresh-icon')[0].addEventListener('click', () => {
  searchYoutubeTabs();
});

/* Info icon Action*/
document.getElementsByClassName('info-icon')[0].addEventListener('click', () => {
  openWebSite();
});

/* Search Icon Action*/
document.getElementsByClassName('search-icon')[0].addEventListener('click', () => {
  let url= 'https://www.youtube.com';
  window.open(url, '_blank');
  window.close();
});

function searchYoutubeTabs(){
  emptyExistingContents();
  getTabController();
}

function emptyExistingContents() {
  var allTabsNode = document.getElementById('all-youtube-tabs');
  while (allTabsNode.firstChild) {
    allTabsNode.removeChild(allTabsNode.firstChild);
  }
}

function getTabController() {
  tabCount=0;
  browser.tabs.query({},(tabs) => {
    tabs.forEach((value) => {
      var url = value.url;
      if (url.match('https://www.youtube.com/watch')) {
        tabCount++;
        let playOrPauseClass = '';
        let tabID = value.id;
        let videoTitle = value.title;
        let videoID= url.split('v=')[1];
        let ampersandPosition = videoID.indexOf('&');
        if(ampersandPosition !== -1) {
          videoID = videoID.substring(0, ampersandPosition);
        }
        let playOrPause = '';

        let playlist = createDOMElement('div', {
          class: 'playlist'
        });

        let videoThumbnail = createDOMElement('img', {
          class: 'rounded playlist-thumbnail',
          src: 'https://img.youtube.com/vi/'+videoID+'/default.jpg'
        });

        let mediaBody = createDOMElement('div', {
          class: 'media-body'
        });

        let mediaTitle = createDOMElement('span', {
          class: 'media-body-title',
        });
        mediaTitle.textContent=videoTitle;

        let mediaControl = createDOMElement('div', {
          class: 'playlist-control'
        });
        let replayButton  = '';

        browser.tabs.executeScript(tabID,
          {
            code: 'document.querySelectorAll(\'.ytp-play-button\')[0].getAttribute(\'aria-label\')'
          }, (results) => {
            playOrPause = results[0];

            if(playOrPause === 'Play'){
              playOrPauseClass = 'btn-green';
            } else if(playOrPause === 'Pause'){
              playOrPauseClass = 'btn-grey';
            } else {
              playOrPause = 'Replay';
              playOrPauseClass = 'btn-grey';
            }

            /* Play or Pause Button*/
            let playButton = createDOMElement('button', {
              class: 'btn '+playOrPauseClass+' btn-xs',
              name: playOrPause,
              tabindex: -1
            });

            let imgPlay = createDOMElement('img', {
              src: '/icons/'+playOrPause.toLowerCase()+'.svg',
              class: 'svg',
              alt: playOrPause,
            });

            playButton.appendChild(imgPlay);

            playButton.addEventListener('click', () => {
              browser.tabs.executeScript(tabID,
                {
                  code: 'document.getElementsByClassName(\'ytp-play-button ytp-button\')[0].click();'
                }, () => {
                  setTimeout(searchYoutubeTabs, 100);
                });
            });

            /* Next Button*/
            let nextButton = createDOMElement('button',{
              class: 'btn btn-xs btn-blue',
              name: 'Next',
              tabindex: -1
            });

            let imgNext = createDOMElement('img', {
              src: '/icons/next.svg',
              class: 'svg svg-next',
              alt: 'Next'
            });

            nextButton.appendChild(imgNext);

            nextButton.addEventListener('click', () => {
              browser.tabs.executeScript(tabID,
                {
                  code: 'document.getElementsByClassName(\'ytp-next-button ytp-button\')[0].click();'
                }, () => {
                  setTimeout(searchYoutubeTabs, 2000);
                });
            });

            /* Mute Button*/
            let muteButton = createDOMElement('button', {
              class: 'btn btn-xs btn-red',
              name: 'Mute',
              tabindex: -1
            });

            let imgMute = createDOMElement('img', {
              src: '/icons/mute.svg',
              class: 'svg',
              alt: 'Mute'
            });

            muteButton.appendChild(imgMute);

            muteButton.addEventListener('click', () => {
              browser.tabs.executeScript(tabID,
                {
                  code: 'document.getElementsByClassName(\'ytp-mute-button ytp-button\')[0].click();'
                });
            });

            /* Replay Button*/
            if(playOrPause !== 'Replay') // Hide Replay Button if the video has ended
            {
              replayButton = createDOMElement('button', {
                class: 'btn btn-xs btn-grey pull-right',
                name: 'Replay',
                tabindex: -1
              });

              let imgReplay = createDOMElement('img', {
                src: '/icons/replay.svg',
                class: 'svg',
                alt: 'Replay'
              });

              replayButton.appendChild(imgReplay);

              replayButton.addEventListener('click', () => {
                browser.tabs.executeScript(tabID,
                  {
                    code: 'document.getElementsByTagName(\'video\')[0].currentTime = 0;'
                  });
              });
            }

            /* Close Button*/
            let closeButton = createDOMElement('img', {
              src: '/icons/close.svg',
              class: 'svg svg-close',
              alt: 'Close'
            });

            closeButton.addEventListener('click', () => {
              browser.tabs.remove(tabID, () => {
                setTimeout(searchYoutubeTabs, 100);
              });
            });


            mediaControl.appendChild(playButton);
            mediaControl.appendChild(nextButton);
            mediaControl.appendChild(muteButton);
            if(replayButton){
              mediaControl.appendChild(replayButton);
            }

            mediaBody.appendChild(closeButton);
            mediaBody.appendChild(mediaTitle);
            mediaBody.appendChild(createDOMElement('hr',{class:'line'}));
            mediaBody.appendChild(mediaControl);

            playlist.appendChild(videoThumbnail);
            playlist.appendChild(mediaBody);

            document.getElementById('all-youtube-tabs').appendChild(playlist);
          }
        );
      }
    });

    if(tabCount === 0){
      emptyExistingContents();
      let searchContainer = createDOMElement('div', {
        class: 'search-container'
      });
      let inputElement = createDOMElement('input', {
        id: 'search',
        class: 'search-input',
        name: 'searchInput',
        placeholder: 'Search...',
      });

      inputElement
        .addEventListener('click', (e) => {
          setTimeout(() => {
            startSearching(e);
          }, 100);
        });

      let footerContent = createDOMElement('div', {
        class: 'footer-text'
      });
      footerContent.textContent = 'Made with ❤️ ';

      let footerLink = createDOMElement('span', {
        class: 'footer-link cursor-pointer',
      });
      footerLink.textContent = '©Theenadayalan';
      footerLink.addEventListener('click', () => {
        openWebSite();
      });

      footerContent.appendChild(footerLink);

      searchContainer.appendChild(inputElement);
      searchContainer.appendChild(footerContent);

      document.getElementById('all-youtube-tabs')
        .appendChild(searchContainer);
    }
  });
}


/*** Function to Create Element and assign attributes to that element ***/
function createDOMElement(elementName, attrs) {
  let element = document.createElement(elementName);
  Object.keys(attrs).forEach(key => element.setAttribute(key, attrs[key]));
  return element;
}

function startSearching(e){
  if(e.which === 13)  // key code for enter
  {
    let keyword = document.getElementsByClassName('search-input')[0].value;
    keyword= encodeURIComponent(keyword);
    let url= 'https://www.youtube.com/results?search_query='+keyword;
    window.open(url, '_blank');
    window.close();
  }
}

function openWebSite(){
  let url= 'https://www.theenadayalan.me';
  window.open(url, '_blank');
  window.close();
}
