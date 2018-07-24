<template>
  <div class="playlist">
    <img @click="navigateToTab()" :src=" showNext ? nextVideoThumbnail : computeVideoThumbnail" class="rounded playlist-thumbnail cursor-pointer">
    <div class="media-body">
      <svg @click="closeVideo(tab.id)" name="close" class="svg-close cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><path fill="#f78f8f" d="M21 24.15L8.857 36.293l-4.15-4.15L16.85 20 4.707 7.857l4.15-4.15L21 15.85 33.143 3.707l4.15 4.15L25.15 20l12.143 12.143-4.15 4.15z"></path><path d="M33.143 4.414l3.443 3.443L25.15 19.293l-.707.707.707.707 11.436 11.436-3.443 3.443L21.707 24.15 21 23.443l-.707.707L8.857 35.586l-3.443-3.443L16.85 20.707l.707-.707-.707-.707L5.414 7.857l3.443-3.443L20.293 15.85l.707.707.707-.707L33.143 4.414m0-1.414L21 15.143 8.857 3 4 7.857 16.143 20 4 32.143 8.857 37 21 24.857 33.143 37 38 32.143 25.857 20 38 7.857 33.143 3z" fill="#c74343"></path></svg>
      <span class="media-body-title">
        {{ showNext ? nextVideoTitle  : tab.title }} 
      </span>
      <hr class="line">
      <div class="playlist-control">
        <button @click="sendMessage('streaming')" v-if=" videoStatus === 'playing' || videoStatus === 'replay' " class="btn-grey">
          <svg v-if="videoStatus === 'playing'" name="Pause" xmlns="http://www.w3.org/2000/svg" fill="#FFF" height="24" viewBox="0 0 24 24" width="24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path><path d="M0 0h24v24H0z" fill="none"></path></svg>
          <svg v-else name="Replay" xmlns="http://www.w3.org/2000/svg" fill="#FFF" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"></path><path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"></path></svg>
        </button>
        <button @click="sendMessage('streaming')" v-else class="btn-green">
          <svg name="Play" xmlns="http://www.w3.org/2000/svg" fill="#FFF" height="24" viewBox="0 0 24 24" width="24"><path d="M8 5v14l11-7z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
        </button>
        <button @click="sendMessage('next')" @mouseover="toggleView(true)" @mouseout="toggleView(false)" name="Next" class="btn-blue">
          <svg fill="#FFF" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"></path><path d="M0 0h24v24H0z" fill="none"></path></svg>
        </button>
        <button @click="sendMessage('mute')" name="Mute" class="btn-red">
          <svg v-if="isMuted" name="Mute" fill="#FFF" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
          <svg v-else name="Unmute" fill="#FFF" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path><path d="M0 0h24v24H0z" fill="none"></path></svg>
        </button>
        <div class="pull-right">
          <button @click="sendMessage('loop')" :class=" isLooped ? 'btn-blue' : 'btn-grey' ">
            <svg xmlns="http://www.w3.org/2000/svg" name="Loop" x="0" y="0" width="150" height="150.223" viewBox="0 0 150 150" fill="#FFF"><path d="M115.885,38.631c-21.312,0-35.416,17.425-47.859,32.802c-10.631,13.136-20.67,25.54-32.897,25.54    c-12.709,0-20.512-13.062-20.512-22.426c0-8.682,8.56-21.299,21.976-21.299c13.018,0,19.8,10.419,20.142,10.953    c2.109,3.413,6.587,4.487,10.017,2.395c3.447-2.1,4.539-6.597,2.438-10.044c-0.446-0.73-11.167-17.92-32.597-17.92    C15.029,38.632,0,57.562,0,74.548c0,17.521,14.427,37.043,35.128,37.043c19.199,0,31.94-15.74,44.259-30.963    c11.396-14.078,22.161-27.379,36.498-27.379c8.53,0,14.135,2.894,17.131,8.84c2.596,5.16,2.594,10.999,2.592,13.022    c0,1.16-0.613,6.978-3.451,12.217c-3.236,5.968-7.83,8.746-14.469,8.746c-13.369,0-20.592-8.69-23.312-11.963    c-0.707-0.852-1.216-1.465-1.896-2.047c-3.062-2.623-7.678-2.271-10.306,0.795c-2.534,2.957-2.29,7.353,0.478,10.014    c0.132,0.15,0.291,0.347,0.48,0.576c3.545,4.266,14.324,17.24,34.553,17.24c24.586,0,32.537-23.973,32.537-35.678    c0.002-7.455-1.394-14.013-4.154-19.496C142.193,47.815,133.809,38.631,115.885,38.631z"></path></svg>
          </button>
          <button v-if=" videoStatus!=='replay' "  @click="sendMessage('replay')" class="btn-grey">
            <svg xmlns="http://www.w3.org/2000/svg" name="Replay" fill="#FFF" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"></path><path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"></path></svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  const browser = browser || chrome;
  export default {
    name: 'MediaTab',
    data() {
      return {
        count: 0,
        isMuted: false,
        videoStatus: "playing",
        isLooped: false,
        nextVideoTitle: "",
        showNext: false,
        nextVideoThumbnail: ""
      }
    },
    props: ["tab", "initializeTabs", "closeVideo"],
    created() {
      this.initializeControls();
    },
    computed: {
      computeVideoThumbnail() {
        let videoID= this.tab.url.split('v=')[1];
        let ampersandPosition = videoID.indexOf('&');
        if(ampersandPosition !== -1) {
          videoID = videoID.substring(0, ampersandPosition);
        }
        return `https://img.youtube.com/vi/${videoID}/default.jpg`;
      }
    },
    methods: {
      sendMessage(message) {
        browser.tabs.sendMessage(this.tab.id, message, (output) => {
          console.log("Action Performed: " + message);
          console.log("Result: " + output);
          switch (message) {
            case "streaming":
              this.videoStatus = output;
              break;
            case "next":
              setTimeout(() => {
                this.initializeTabs();
              }, 1500);
              break;
            case "mute":
              this.isMuted = output;
              break;
            case "replay":
              break;
            case "loop":
              this.isLooped = output;
              break;
            default:
              break
          }
        })
      },
      navigateToTab() {
        this.tab.active ? window.close() : null;
        browser.tabs.update(this.tab.id, {
            active: true
        })
      },
      initializeControls() {
        browser.tabs.sendMessage(this.tab.id, "initialize", (result) => {
          this.isMuted = result.isMuted;
          this.videoStatus = result.videoStatus;
          this.isLooped = result.isLooped;
          this.nextVideoTitle = result.nextVideoTitle;
          this.nextVideoThumbnail = result.nextVideoThumbnail
        })
      },
      toggleView(value) {
        this.showNext = value
      }
    }
  }
</script>

<style scoped>
  .playlist{
    margin: 4px 6px;
    margin-bottom: 12px;
    height: 100px;
    border-radius: 5px;
    display: flex;

    transition-duration: 0.4s;
    background: #146c79;
  }

  .playlist:hover{
    transition-duration: 0.3s;
    box-shadow: 0px 2px 5px #13363c;
  }

  .playlist-thumbnail{
    margin-top: 1px;
    width: 30%;
    height: 75%;
    padding: 6px;
    margin-right: 4px;
  }

  .media-body{
    width: 70%;
    height: 100%;
    position: relative;
  }

  .media-body-title{
    font-size: 12px;
    padding-top: 8px;
    padding-right: 20px;
    display: block;
    color: floralwhite;
    height: 65px;
    overflow: hidden;
    letter-spacing: 0.85px;
  }

  span.media-body-title:hover {
      cursor: default;
  }

  .playlist-control{
    margin-top: 5px;
    padding-right: 10px;
  }

  .svg-close{
    position: absolute;
    top: 3px;
    right: 6px;

    transition: 500ms;
    transition-timing-function: ease-in-out;
    -webkit-transition: 500ms;
    -webkit-transition-timing-function: ease-in-out;
  }
  
  .line{
    margin: 0;
    border: 0;
    border-top: 1px solid rgba(0,0,0,.1);
    height: 0;
  }
</style>
