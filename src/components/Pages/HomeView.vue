<template>
  <div class="home">
    <div class="flex feed-header">
      <p class="subtitle">Top Questions</p>
      <button>Ask Question</button>
    </div>
    <div class="flex feed-content">
      <div v-for="feed in feedList" :key="feed">
        <feed-tile :tileData="feed"></feed-tile>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      feedList: [
        {
          username: "Rohit Sharma",
          question:
            "How can I center the inline block element in a Flexbox div Html Css ?",
          createdOn: "Jan 15 2020 06:26 PM",
        },
        {
          username: "Rohit Sharma",
          question: "How to center the inline block element in a div ?",
          createdOn: "Jan 15 2020 06:26 PM",
        },
        {
          username: "Rohit Sharma",
          question: "How to center the inline block element in a div ?",
          createdOn: "Jan 15 2020 06:26 PM",
        },
        {
          username: "Rohit Sharma",
          question: "How to center the inline block element in a div ?",
          createdOn: "Jan 15 2020 06:26 PM",
        },
        {
          username: "Rohit Sharma",
          question: "How to center the inline block element in a div ?",
          createdOn: "Jan 15 2020 06:26 PM",
        },
        {
          username: "Rohit Sharma",
          question: "How to center the inline block element in a div ?",
          createdOn: "Jan 15 2020 06:26 PM",
        },
        {
          username: "Rohit Sharma",
          question: "How to center the inline block element in a div ?",
          createdOn: "Jan 15 2020 06:26 PM",
        },
        {
          username: "Rohit Sharma",
          question: "How to center the inline block element in a div ?",
          createdOn: "Jan 15 2020 06:26 PM",
        },
      ],
    };
  },
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