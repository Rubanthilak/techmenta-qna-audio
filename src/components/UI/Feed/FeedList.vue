<template>
  <div class="home">
    <div class="flex feed-header">
      <p class="subtitle">Top Questions</p>
      <router-link to="/post">
        <button>Ask Question</button>
      </router-link>
    </div>
    <div class="flex feed-content">
      <div v-for="feed in feedList" :key="feed">
        <router-link :to="'/post/'+feed.docid">
            <feed-tile :tileData="feed"></feed-tile>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    feedList(){
      return this.$store.getters["feed/getFeedList"]
    }
  },
  mounted(){
    this.$store.dispatch("feed/fetchFeedList");
  }
};
</script>

<style lang="scss" scoped>
.feed-header {
  justify-content: space-between;
}

.feed-content {
  margin-top: 25px;
  flex-direction: column;
  height: calc(100vh - 195px);
  overflow-y: scroll;
  overflow-x: hidden;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none;
  }
}
</style>