<template>
  <div>
    <MediaTab
      v-for="tab in tabs"
      :key="tab.id"
      :tab="tab"
      :initializeTabs="initializeTabs"
      :closeVideo="closeVideo"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import MediaTab from './MediaTab.vue';

const props = defineProps(['togglePlaylistView', 'openUrl']);
const tabs = ref([]);

async function initializeTabs() {
  const allTabs = await chrome.tabs.query({});
  const youtubeTabs = allTabs.filter(tab => tab.url?.includes('https://www.youtube.com/watch'));
  tabs.value = youtubeTabs;
  props.togglePlaylistView(youtubeTabs.length === 0);
}

async function closeVideo(tabId) {
  await chrome.tabs.remove(tabId);
  tabs.value = tabs.value.filter(tab => tab.id !== tabId);
  props.togglePlaylistView(tabs.value.length === 0);
}

defineExpose({ initializeTabs });

onMounted(() => initializeTabs());
</script>
