<template>
  <div class="addon-container">
    <div class="addon-header">
      <div class="popup-title">
        <p>YouTabMan</p>
      </div>
      <div class="header-options">
        <svg @click=" openUrl('https://www.youtube.com/')" class="search-icon cursor-pointer" fill="#dae0e5" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path><path d="M0 0h24v24H0z" fill="none"></path></svg>
        <svg @click=" initializeTabs()" class="refresh-icon cursor-pointer" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" fill="#dae0e5" d="M15.323 4.445a8.234 8.234 0 0 0-5.807-.323 8.237 8.237 0 0 0-5.764 8.41l-2.486.163A10.733 10.733 0 0 1 8.765 1.742a10.742 10.742 0 0 1 8.334.807L19.485 0l.636 7.074-7.493.25 2.695-2.879zm-.092 17.812c-1.05.329-2.141.496-3.224.496-1.765 0-3.517-.456-5.099-1.306L4.517 24l-.635-7.074 7.489-.252-2.693 2.882a8.257 8.257 0 0 0 5.804.322 8.242 8.242 0 0 0 5.763-8.409l2.487-.163a10.727 10.727 0 0 1-7.501 10.951z"></path></svg>
        <svg @click=" openUrl('https://www.theenadayalan.me/')" class="info-icon cursor-pointer" fill="#dae0e5" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"></path><path d="M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z"></path></svg>
      </div>
    </div>
    <SearchContainer v-if="canShowSearchContainer" :openUrl=openUrl ></SearchContainer>
    <slot v-else>
      <PlaylistContainer :togglePlaylistView=togglePlaylistView :openUrl=openUrl ref="playlist"></PlaylistContainer>
    </slot>
  </div>
</template>

<script>
import PlaylistContainer from './components/PlaylistContainer.vue';
import SearchContainer from './components/SearchContainer.vue';

const browser = browser || chrome;

export default {
  name: 'app',
  data() {
    return {
      canShowSearchContainer: false
    };
  },
  methods: {
    initializeTabs() {
      this.$refs.playlist.initializeTabs();
    },
    togglePlaylistView(value) {
      this.canShowSearchContainer = value;
    },
    openUrl(url) {
      browser.tabs.create({
        url: url
      }, ()=> {
        window.close();
      });
    }
  },
  components: {
    PlaylistContainer: PlaylistContainer,
    SearchContainer: SearchContainer
  }
};
</script>

<style>
  /* General Styles -- Starts */

  *, ::after, ::before {
    box-sizing: border-box;
  }

  body{
    background: #fff;
    width: 355px;
    height: 470px;
    overflow: hidden;
    margin: 0;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 400;
    font-size: 16px;
    line-height: 1.5;
    text-align: left;
  }

  .cursor-pointer{
    cursor: pointer;
  }

  .pull-right {
    float: right;
  }

  button {
    width: 2.2rem;
    cursor: pointer;

    display: inline-block;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    user-select: none;
    border: 1px solid transparent;
    transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out;

    padding: 1px 3px;
    border-radius: 3px;
    margin-right: 4px;
  }

  button:focus, input[type="button"]:focus, button:active, input[type="button"]:active {
    outline: none;
  }

  .btn-green {
    color: #fff;
    background-color: #28a745;
    border-color: #28a745;
  }

  .btn-grey {
    color: #fff;
    background-color: #6c757d;
    border-color: #6c757d;
  }

  .btn-blue {
    color: #fff;
    background-color: #007bff;
    border-color: #007bff;
  }

  .btn-red {
    color: #fff;
    background-color: #dc3545;
    border-color: #dc3545;
  }

  svg {
    width: 15px;
    height: 15px;
  }

  /* General Styles -- Ends  */

  .addon-container {
    margin: 3px;
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    background: #48b1bf;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to bottom, #06beb6, #48b1bf);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to bottom, #06beb6, #48b1bf); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    box-shadow: -1px 2px 12px grey;
  }

  .addon-header {
    display: flex;
    height: 50px;
    justify-content: space-between;
    align-items: center;
    padding-left: 15px;
    padding-right: 10px;

    background: #146c79;
    color: #dae0e5;
  }

  .popup-title{
    letter-spacing: 1px;
    font-size: 20px;
  }

  .header-options {
    display: flex;
    justify-content: space-around;
    width: 85px;
  }

  .refresh-icon{
    height: 21px;
    width: 18px;
  }

  .info-icon{
    height: 20px;
    width: 20px;
  }

  .search-icon{
    height: 23px;
    width: 23px;
  }

</style>
