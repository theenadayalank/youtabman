<template>
  <div class="search-container">
    <p class="empty-message">No YouTube tabs open</p>
    <div class="search-wrapper">
      <svg class="search-icon-svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
      </svg>
      <input
        @keyup.enter="searchKeyword(searchInput)"
        class="search-input"
        v-model="searchInput"
        placeholder="Search YouTube…"
        type="search"
        aria-label="Search YouTube"
        autofocus
      >
    </div>
    <p class="footer-text">
      Made with ❤️ by
      <span @click="openUrl('https://www.theenadayalan.me')" class="footer-link cursor-pointer">Theenadayalan</span>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps(['openUrl']);
const searchInput = ref('');

function searchKeyword(keyword) {
  props.openUrl(`https://www.youtube.com/results?search_query=${encodeURIComponent(keyword)}`);
}
</script>

<style scoped>
  .search-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--space-3);
    min-height: 380px;
    padding: var(--space-4);
    position: relative;
  }

  .empty-message {
    font-size: 13px;
    color: var(--color-text-muted);
    margin: 0 0 var(--space-1);
    text-align: center;
    letter-spacing: 0;
  }

  .search-wrapper {
    position: relative;
    width: 240px;
  }

  .search-icon-svg {
    position: absolute;
    left: 11px;
    top: 50%;
    transform: translateY(-50%);
    width: 16px;
    height: 16px;
    color: var(--color-text-muted);
    pointer-events: none;
  }

  .search-input {
    width: 100%;
    height: 40px;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: 0 var(--space-3) 0 34px;
    font-size: 14px;
    font-family: var(--font-family);
    color: var(--color-text-primary);
    outline: none;
    transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
    appearance: none;
  }

  .search-input::placeholder {
    color: var(--color-text-muted);
  }

  .search-input:focus {
    border-color: var(--color-accent);
    box-shadow: 0 0 0 3px rgba(255, 0, 51, 0.1);
  }

  .search-input::-webkit-search-cancel-button {
    display: none;
  }

  .footer-text {
    margin-top: var(--space-6);
    color: var(--color-text-muted);
    font-size: 11px;
    text-align: center;
  }

  .footer-link {
    color: var(--color-text-secondary);
    text-decoration: none;
    transition: color var(--transition-fast);
  }

  .footer-link:hover {
    color: var(--color-text-primary);
  }
</style>
