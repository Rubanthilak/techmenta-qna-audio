<template>
  <section>
    <div class="topic-wrapper">
      <div class="topic-container" v-for="topic in topicList" :key="topic">
        <p class="topic">{{topic.title}}</p>
        <div v-for="link in topic.links" :key="link">
          <p class="link">{{link}}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      topicList: [
        {
          title: "HTML and CSS",
          links: ["HTML", "CSS", "Bootstrap", "Bulma", "Tailwind CSS"],
        },
        {
          title: "JavaScript",
          links: ["jQuery", "React", "Angular", "Vue", "JSON", "AJAX"],
        },
        {
          title: "Server Side",
          links: ["SQL", "PHP", "Node.js", "Raspberry Pi"],
        },
        {
          title: "Programming",
          links: ["Jave", "Python", "C++", "C#", "R"],
        }
      ],
    };
  },
};
</script>

<style lang="scss">

.topic-wrapper {
  height: calc(100vh - 145px);
  overflow-x: hidden;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }

  &::-webkit-scrollbar-track {
    background-color: var(--primary-color-600);
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--primary-color-100);
    border-radius: 360px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: var(--primary-color-200);
  }
}

.topic-container {
  margin-bottom: 15px;
}

.topic {
  font-weight: var(--semibold);
  font-size: 16px;
  margin-bottom: 10px;
  position: relative;
  display: inline-block;

  &::before{
    position: absolute;
    content : " ";
    height: 1px;
    width: 100%;
    background: var(--primary-color-200);
    bottom: 0px;
  }
}

.link {
  font-weight: var(--regular);
  font-size: 14px;
  cursor: pointer;
  padding: 2px 10px;
  transition: all 0.15s;

  &:hover{
    background: var(--accent-color-900);
    color: var(--primary-color-100);
    border-radius: 3px;
  }
}
</style>