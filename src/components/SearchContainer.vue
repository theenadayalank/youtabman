<template>
  <div class="search-container">
    <input @keyup.enter=" searchKeyword(searchInput) " class="search-input"  v-model="searchInput" placeholder="Search...">
    <div class="footer-text">
      Made with ❤️ 
      <span @click=" openUrl('https://www.theenadayalan.me') " class="footer-link cursor-pointer">©Theenadayalan</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchContainer',
  data() {
    return {
      keyword: ''
    };
  },
  props: ['openUrl'],
  methods: {
    searchKeyword(keyword) {
      this.openUrl('https://www.youtube.com/results?search_query=' + encodeURIComponent(keyword));
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .search-container{
    padding-top: 75px;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .search-input{
    width: 250px;
    height: 45px;
    outline: none;
    border: 0;
    padding-left: 40px;
    font-size: 16px;

    background: #fffffff2;
    color: grey;

    background-image: url("../assets/search.svg");
    background-position: 10px 10px;
    background-repeat: no-repeat;
  }

  .search-input::placeholder{
    color: #a3a3a3;
  }

  /* Footer */
  .footer{
    height: 9px;
  }

  .footer-text{
    margin-top: 50px;
    color: rgba(255,255,255,.87);
  }

  .footer-link{
    text-decoration: none;
    color: #0a64c3
  }

  .footer-link:hover{
    color: #666;
    text-decoration: none;
  }
</style>
