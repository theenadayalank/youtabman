<template>
  <div>
    <MediaTab v-for="tab in tabs" v-bind:key="tab.id" :tab=tab :initializeTabs=initializeTabs :closeVideo=closeVideo></MediaTab>
  </div>
</template>

<script>

import MediaTab from '../components/MediaTab.vue';

const browser = browser || chrome;

export default {
  name: 'app',
  created() {
    this.initializeTabs();
  },
  data() {
    return {
      tabs: []
    };
  },
  props: ['togglePlaylistView', 'openUrl'],
  methods: {
    async initializeTabs() {
      let computedTabs = [];
      browser.tabs.query({},(tabs) => {
        tabs.forEach(function(tab) {
          let url = tab.url;
          if (url.match('https://www.youtube.com/watch')) {
            computedTabs.push(tab);
          }
        });
        this.togglePlaylistView(computedTabs.length > 0 ? false : true); 
      });
      this.tabs = computedTabs;
    },
    closeVideo(tabId) {
      let tabs = this.tabs;
      browser.tabs.remove(tabId, () => {
        this.tabs = tabs.filter((tab) => tab.id !== tabId);
        this.togglePlaylistView(this.tabs.length > 0 ? false : true); 
      });
    }
  },
  components: {
    MediaTab: MediaTab
  }
};
</script>

<style>

</style>
