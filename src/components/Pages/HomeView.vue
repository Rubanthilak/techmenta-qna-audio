<template>
  <main-col-grid>
    <template #lhs>
      <div>
        <p class="subtitle">Topics</p>
      </div>
    </template>
    <template #feed>
      <div>
        <div class="flex feed-header">
          <p class="subtitle">Top Questions</p>
          <button>Ask Question</button>
        </div>
      </div>
    </template>
  </main-col-grid>
</template>

<script>
export default {
  
};
</script>

<style lang="scss" scoped>

.feed-header{
  justify-content: space-between;
}

</style>