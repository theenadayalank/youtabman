<template>
  <div class="media-card">
    <img
      @click="navigateToTab()"
      :src="showNext ? nextVideoThumbnail : computeVideoThumbnail"
      :alt="showNext ? nextVideoTitle : tab.title"
      class="media-thumb cursor-pointer"
    >
    <div class="media-body">
      <button @click="closeVideo(tab.id)" aria-label="Close tab" class="btn-close">
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        </svg>
      </button>
      <p class="media-title">{{ showNext ? nextVideoTitle : tab.title }}</p>
      <div class="media-controls">
        <button
          @click="sendMessage('streaming')"
          :aria-label="videoStatus === 'playing' ? 'Pause' : 'Play'"
          :class="['ctrl-btn', videoStatus === 'playing' ? 'ctrl-btn--pause' : 'ctrl-btn--play']"
        >
          <svg v-if="videoStatus === 'playing'" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
          </svg>
          <svg v-else-if="videoStatus === 'replay'" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/>
          </svg>
          <svg v-else viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </button>
        <button
          @click="sendMessage('next')"
          @mouseover="toggleView(true)"
          @mouseout="toggleView(false)"
          aria-label="Next video"
          class="ctrl-btn ctrl-btn--neutral"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
          </svg>
        </button>
        <button
          @click="sendMessage('mute')"
          :aria-label="isMuted ? 'Unmute' : 'Mute'"
          :class="['ctrl-btn', isMuted ? 'ctrl-btn--danger' : 'ctrl-btn--neutral']"
        >
          <svg v-if="isMuted" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
          </svg>
          <svg v-else viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
          </svg>
        </button>
        <button
          @click="sendMessage('loop')"
          :aria-label="isLooped ? 'Disable loop' : 'Loop'"
          :class="['ctrl-btn', isLooped ? 'ctrl-btn--info' : 'ctrl-btn--neutral']"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"/>
          </svg>
        </button>
        <button
          v-if="videoStatus !== 'replay'"
          @click="sendMessage('replay')"
          aria-label="Restart"
          class="ctrl-btn ctrl-btn--neutral"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const props = defineProps(['tab', 'initializeTabs', 'closeVideo']);

const isMuted = ref(false);
const videoStatus = ref('playing');
const isLooped = ref(false);
const nextVideoTitle = ref('');
const showNext = ref(false);
const nextVideoThumbnail = ref('');

const computeVideoThumbnail = computed(() => {
  let videoID = props.tab.url.split('v=')[1];
  const ampersandPosition = videoID.indexOf('&');
  if (ampersandPosition !== -1) {
    videoID = videoID.substring(0, ampersandPosition);
  }
  return `https://img.youtube.com/vi/${videoID}/mqdefault.jpg`;
});

async function sendMessage(message) {
  try {
    const output = await chrome.tabs.sendMessage(props.tab.id, message);
    switch (message) {
    case 'streaming':
      videoStatus.value = output;
      break;
    case 'next':
      setTimeout(() => props.initializeTabs(), 1500);
      break;
    case 'mute':
      isMuted.value = output;
      break;
    case 'loop':
      isLooped.value = output;
      break;
    default:
      break;
    }
  } catch {
    // Tab may not have the content script active yet
  }
}

function navigateToTab() {
  if (props.tab.active) {
    window.close();
    return;
  }
  chrome.tabs.update(props.tab.id, { active: true });
}

async function initializeControls() {
  try {
    const result = await chrome.tabs.sendMessage(props.tab.id, 'initialize');
    if (!result) return;
    isMuted.value = result.isMuted;
    videoStatus.value = result.videoStatus;
    isLooped.value = result.isLooped;
    nextVideoTitle.value = result.nextVideoTitle;
    nextVideoThumbnail.value = result.nextVideoThumbnail;
  } catch {
    // Tab may not have the content script active yet
  }
}

function toggleView(value) {
  showNext.value = value;
}

onMounted(() => initializeControls());
</script>

<style scoped>
  .media-card {
    margin: 6px 8px;
    border-radius: var(--radius-lg);
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    display: flex;
    align-items: stretch;
    position: relative;
    overflow: hidden;
    transition: background var(--transition-base);
  }

  .media-card:hover {
    background: var(--color-surface-hover);
  }

  .media-thumb {
    width: 110px;
    flex-shrink: 0;
    object-fit: cover;
    display: block;
    border-radius: var(--radius-lg) 0 0 var(--radius-lg);
  }

  .media-body {
    flex: 1;
    min-width: 0;
    padding: 8px 8px 8px 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .btn-close {
    position: absolute;
    top: 5px;
    right: 5px;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-sm);
    color: rgba(255, 255, 255, 0.25);
    transition: background var(--transition-fast), color var(--transition-fast);
  }

  .btn-close:hover {
    background: var(--color-danger-subtle);
    color: var(--color-danger);
  }

  .btn-close svg {
    width: 14px;
    height: 14px;
  }

  .media-title {
    font-size: 12px;
    line-height: 1.45;
    color: var(--color-text-primary);
    margin: 0;
    padding-right: 22px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    letter-spacing: 0;
  }

  .media-controls {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .ctrl-btn {
    width: 28px;
    height: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-sm);
    transition: background var(--transition-fast), transform var(--transition-fast);
  }

  .ctrl-btn svg {
    width: 15px;
    height: 15px;
    flex-shrink: 0;
  }

  .ctrl-btn:active {
    transform: scale(0.9);
  }

  .ctrl-btn--play {
    background: var(--color-success-subtle);
    color: var(--color-success);
  }
  .ctrl-btn--play:hover { background: rgba(46, 204, 113, 0.25); }

  .ctrl-btn--pause {
    background: rgba(255, 255, 255, 0.07);
    color: var(--color-text-secondary);
  }
  .ctrl-btn--pause:hover { background: rgba(255, 255, 255, 0.14); }

  .ctrl-btn--neutral {
    background: rgba(255, 255, 255, 0.06);
    color: var(--color-text-secondary);
  }
  .ctrl-btn--neutral:hover { background: rgba(255, 255, 255, 0.13); }

  .ctrl-btn--info {
    background: var(--color-info-subtle);
    color: var(--color-info);
  }
  .ctrl-btn--info:hover { background: rgba(78, 168, 222, 0.25); }

  .ctrl-btn--danger {
    background: var(--color-danger-subtle);
    color: var(--color-danger);
  }
  .ctrl-btn--danger:hover { background: rgba(224, 82, 82, 0.25); }
</style>
