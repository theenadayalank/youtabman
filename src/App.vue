<template>
  <div class="addon-container">
    <div class="addon-header">
      <div class="popup-title">
        <span>YouTabMan</span>
      </div>
      <div class="header-options">
        <svg @click="openUrl('https://www.youtube.com/')" class="search-icon cursor-pointer" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-label="Open YouTube" role="button" tabindex="0"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path><path d="M0 0h24v24H0z" fill="none"></path></svg>
        <svg @click="initializeTabs()" class="refresh-icon cursor-pointer" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-label="Refresh tabs" role="button" tabindex="0"><path fill-rule="evenodd" clip-rule="evenodd" d="M15.323 4.445a8.234 8.234 0 0 0-5.807-.323 8.237 8.237 0 0 0-5.764 8.41l-2.486.163A10.733 10.733 0 0 1 8.765 1.742a10.742 10.742 0 0 1 8.334.807L19.485 0l.636 7.074-7.493.25 2.695-2.879zm-.092 17.812c-1.05.329-2.141.496-3.224.496-1.765 0-3.517-.456-5.099-1.306L4.517 24l-.635-7.074 7.489-.252-2.693 2.882a8.257 8.257 0 0 0 5.804.322 8.242 8.242 0 0 0 5.763-8.409l2.487-.163a10.727 10.727 0 0 1-7.501 10.951z"></path></svg>
        <svg @click="openUrl('https://www.theenadayalan.me/')" class="info-icon cursor-pointer" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-label="About" role="button" tabindex="0"><path d="M0 0h24v24H0z" fill="none"></path><path d="M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z"></path></svg>
      </div>
    </div>
    <SearchContainer v-if="canShowSearchContainer" :openUrl="openUrl" />
    <PlaylistContainer v-else :togglePlaylistView="togglePlaylistView" :openUrl="openUrl" ref="playlist" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import PlaylistContainer from './components/PlaylistContainer.vue';
import SearchContainer from './components/SearchContainer.vue';

const canShowSearchContainer = ref(false);
const playlist = ref(null);

function initializeTabs() {
  playlist.value.initializeTabs();
}

function togglePlaylistView(value) {
  canShowSearchContainer.value = value;
}

function openUrl(url) {
  chrome.tabs.create({ url }, () => window.close());
}
</script>

<style>
  :root {
    --color-bg: #0f0f0f;
    --color-surface: #1a1a1a;
    --color-surface-hover: #222222;
    --color-border: rgba(255, 255, 255, 0.07);

    --color-text-primary: #ffffff;
    --color-text-secondary: #aaaaaa;
    --color-text-muted: #777777;

    --color-accent: #ff0033;

    --color-success: #2ecc71;
    --color-success-subtle: rgba(46, 204, 113, 0.14);
    --color-info: #4ea8de;
    --color-info-subtle: rgba(78, 168, 222, 0.14);
    --color-danger: #e05252;
    --color-danger-subtle: rgba(224, 82, 82, 0.14);

    --font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;

    --space-1: 4px;
    --space-2: 8px;
    --space-3: 12px;
    --space-4: 16px;
    --space-5: 20px;
    --space-6: 24px;

    --radius-sm: 4px;
    --radius-lg: 8px;

    --transition-fast: 120ms ease;
    --transition-base: 200ms ease;
  }

  *, ::after, ::before {
    box-sizing: border-box;
  }

  body {
    background: var(--color-bg);
    width: 355px;
    height: 470px;
    overflow: hidden;
    margin: 0;
    font-family: var(--font-family);
    font-weight: 400;
    font-size: 14px;
    line-height: 1.5;
    color: var(--color-text-primary);
    text-align: left;
  }

  .cursor-pointer {
    cursor: pointer;
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    padding: 0;
    margin: 0;
    font-family: inherit;
    font-size: inherit;
    line-height: 1;
  }

  button:focus,
  button:active {
    outline: none;
  }

  button:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
  }

  .addon-container {
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    background: var(--color-bg);
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.1) transparent;
  }

  .addon-container::-webkit-scrollbar {
    width: 4px;
  }

  .addon-container::-webkit-scrollbar-track {
    background: transparent;
  }

  .addon-container::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.12);
    border-radius: 2px;
  }

  .addon-header {
    display: flex;
    height: 48px;
    justify-content: space-between;
    align-items: center;
    padding: 0 var(--space-3) 0 var(--space-4);
    background: #111111;
    border-bottom: 1px solid var(--color-border);
    position: sticky;
    top: 0;
    z-index: 10;
  }

  .popup-title {
    font-size: 15px;
    font-weight: 600;
    letter-spacing: 0.2px;
    color: var(--color-text-primary);
    display: flex;
    align-items: center;
    gap: var(--space-2);
  }

  .popup-title::before {
    content: '';
    width: 7px;
    height: 7px;
    background: var(--color-accent);
    border-radius: 50%;
    flex-shrink: 0;
  }

  .header-options {
    display: flex;
    align-items: center;
    gap: var(--space-2);
  }

  .header-options .cursor-pointer,
  .header-options .cursor-pointer path:not([fill="none"]) {
    fill: rgba(255, 255, 255, 0.4);
    transition: fill var(--transition-fast);
  }

  .header-options .cursor-pointer:hover,
  .header-options .cursor-pointer:hover path:not([fill="none"]) {
    fill: rgba(255, 255, 255, 0.9);
  }

  .refresh-icon {
    width: 18px;
    height: 18px;
  }

  .info-icon {
    width: 18px;
    height: 18px;
  }

  .search-icon {
    width: 18px;
    height: 18px;
  }
</style>
