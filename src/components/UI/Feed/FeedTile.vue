<template>
  <div class="flex feed-tile">
    <p class="ques">{{tileData.title}}</p>
    <div class="flex ques-details">
      <div class="flex user-details">
        <p>{{tileData.username}}</p>
      </div>
      <div class="divider">|</div>
      <div>
        <p class="timestamp">
          <span>Asked on </span> {{tileData.timestamp}}
        </p>
      </div>
      <div class="divider">|</div>
      <div class="flex">
        <p><span>Tags</span></p>
        <p class="tag">{{tileData.tags[0]}}</p>
        <p class="tag" v-if="tileData.tags[1]">{{tileData.tags[1]}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tileData: {
      type: Object,
      required: true,
      validator: function (value) {
        return value;
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.feed-tile {
  flex-direction: column;
  padding: 20px;
  background: var(--primary-color-700);
  color: var(--text-color);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease-in;
  margin: 10px 0px;

  .tag{
    background: var(--accent-color-900);
    color: white !important;
    font-size: 10px !important;
    padding: 2px 10px;
    border-radius: 360px;
    margin-left: 10px;
  }

  &:hover {
    background: var(--primary-color-600);
  }

  .ques {
    font-weight: var(--semibold);
      font-size: 14px;
  }

  .ques-details {
    margin: 10px 0px;
    align-items: center;

    .user-details {
      align-items: center;
    }

    .profile-img {
      height: 30px;
      width: 30px;
      border-radius: 100%;
      background: var(--accent-color-700);
      margin-right: 10px;
    }

    .divider {
      margin: 0px 10px;
      font-size: 14px;
    }

    p {
      font-weight: var(--regular);
      font-size: 14px;
      color: var(--primary-color-200);

      span {
        font-weight: var(--semibold);
        color: var(--primary-color-100);
      }
    }
  }
}
</style>