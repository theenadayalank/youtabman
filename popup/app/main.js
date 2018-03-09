var browser = browser || chrome;
let tabCount;


/* After document is ready */
$(document).ready(() => {
  searchYoutubeTabs();
});

/* Refresh Button*/
$('.refresh-icon').click(() => {
    searchYoutubeTabs();
 });

$('.info-icon').click(() => {
  let url= "https://www.theenadayalan.me";
  window.open(url, '_blank');
});

$('.search-icon').click(() => {
 let url= "https://www.youtube.com";
 window.open(url, '_blank');
})



function searchYoutubeTabs(){
  emptyExistingContents();
  getTabController();
}

function emptyExistingContents() {
  $('.all-youtube-tabs').empty();
  $('.search-container').remove();
}

function getTabController() {
  tabCount=0;
  browser.tabs.query({},(tab) => {
    $.each(tab, (index, value) => {
      var url = value.url;
      if (url.match("https://www.youtube.com/watch")) {
        tabCount++;
        let playOrPauseClass = '';
        let tabID = value.id;
        let videoTitle = value.title;
        let videoID= url.split('v=')[1]
        let ampersandPosition = videoID.indexOf('&');
        if(ampersandPosition != -1) {
          videoID = videoID.substring(0, ampersandPosition);
        }
        let playOrPause = '';

        let playlist = $('<div class="playlist media"></div>');
        let videoThumbnail = $('<img class="rounded playlist-thumbnail" src="https://img.youtube.com/vi/'+videoID+'/default.jpg" class="rounded">')
        let mediaBody = $('<div class="media-body"></div>');
        let mediaTitle = $('<span class="media-body-title">'+videoTitle+'</span>');
        let mediaControl = $('<div class="playlist-control"></div>');

        chrome.tabs.executeScript(tabID,
          {
            code: "document.querySelectorAll('.ytp-play-button')[0].getAttribute('aria-label')"
          }, (results) => {
            playOrPause = results[0];

            if(playOrPause === 'Play'){
              playOrPauseClass = 'btn-success';
            } else if(playOrPause === 'Pause'){
              playOrPauseClass = 'btn-secondary';
            } else {
              playOrPause = 'Replay';
              playOrPauseClass = 'btn-secondary';
            }

            let buttonResume = $('<button/>',
              {
                class: 'btn '+playOrPauseClass+' btn-xs',
                prepend: '<img src="/icons/'+playOrPause.toLowerCase()+'.svg" class="svg" alt="'+playOrPause+'">',
                tabindex: -1,
                click: () => {
                  chrome.tabs.executeScript(tabID,
                    {
                      code: "document.getElementsByClassName('ytp-play-button ytp-button')[0].click();"
                    }, () => {
                        setTimeout(searchYoutubeTabs, 100);
                    });
                  }
              });

            let buttonNext = $('<button/>',
              {
                class: 'btn btn-xs btn-primary',
                prepend: '<img src="/icons/next.svg" class="svg svg-next" alt="Next">',
                tabindex: -1,
                click: () => {
                  chrome.tabs.executeScript(tabID,
                    {
                      code: "document.getElementsByClassName('ytp-next-button ytp-button')[0].click();"
                    }, () => {
                        setTimeout(searchYoutubeTabs, 2000);
                      });
                  }
              });

            let muteButton = $('<button/>',
              {
                class: 'btn btn-xs btn-danger',
                prepend: '<img src="/icons/mute.svg" class="svg" alt="Mute">',
                tabindex: -1,
                click: () => {
                  chrome.tabs.executeScript(tabID,
                    {
                      code: "document.getElementsByClassName('ytp-mute-button ytp-button')[0].click();"
                    });
                  }
              });

            let closeButton = $('<img/>',
              {
                src: '/icons/close.svg',
                class: 'svg svg-close',
                alt: 'Close icon',
                click: () => {
                  chrome.tabs.remove(tabID, () => {
                    setTimeout(searchYoutubeTabs, 100);
                   });
                  }
              });

              mediaControl
                .append(buttonResume)
                .append(buttonNext)
                .append(muteButton);

              mediaBody
                .append(closeButton)
                .append(mediaTitle)
                .append('<hr class="line">')
                .append(mediaControl);

              playlist
                .append(videoThumbnail)
                .append(mediaBody);

              $('.all-youtube-tabs').append(playlist);
          }
        );
      }
    });
    if(tabCount === 0){
      emptyExistingContents();
      let searchContainer = $('<div class="search-container"></div>');
      let inputElement = $('<input>').attr({
        id: 'search',
        class: 'search-input',
        name: 'searchInput',
        placeholder: 'Search...',
      });

      inputElement
      .keypress ((e) => {
        setTimeout(() => {
            startSearching(e);
        }, 100)
      });

      let footerContent = $('<div class="footer-text">Made with ❤️ </div>');

      footerContent
        .append('<a href="https://www.theenadayalan.me" class="footer-link" target="_blank">&#169;theena</a>');

      searchContainer
        .append(inputElement)
        .append(footerContent)

      $('.all-youtube-tabs').append(searchContainer);
    }
  });
}


function startSearching(e){
  if(e.which == 13)  // the enter key code
   {
     let keyword = $('.search-input').val();
     keyword= encodeURIComponent(keyword);
     let url= "https://www.youtube.com/results?search_query="+keyword;
     window.open(url, '_blank');
     window.close();
   }
}
