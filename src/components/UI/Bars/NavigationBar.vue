<template>
  <section>
    <div class="topic-wrapper">
      <div class="topic-container" v-for="topic in topicList" :key="topic">
        <p class="topic">{{topic.title}}</p>
        <div v-for="link in topic.links" :key="link.key">
          <p
            class="link"
            @click="$store.dispatch('feed/fetchFeedListByTag',link.key)"
          >{{link.value}}</p>
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
          title: "Cloud",
          links: [
            { value: "GKE Autopilot", key: ["gke-autopilot","gke","google-kubernetes-engine","google-cloud-platform"] },
            { value: "Cloud Code", key: ["cloud-code"] },
            { value: "Docker", key: ["docker","container"] },
            { value: "Kubernetes", key: ["kubernetes"] },
          ],
        },
        {
          title: "Machine Learning",
          links: [
            { value: "Python", key: ["python"] },
            { value: "Jupyter Notebooks", key: ["jupyter-notebook"] },
            { value: "Scikit Learn", key: ["scikit-learn"] },
            { value: "OpenCV", key: ["opencv"] },
          ],
        },
        {
          title: "Javascript",
          links: [
            { value: "Angular", key: ["angular"] },
            { value: "React", key: ["react"] },
            { value: "Vue", key: ["vue"] },
            { value: "Jquery", key: ["jquery"] },
            { value: "Ember", key: ["ember"] },
          ],
        },
        {
          title: "Programming",
          links: [
            { value: "C#", key: ["c#"] },
            { value: "C++", key: ["c++"] },
            { value: "Java", key: ["java"] },
            { value: "Ruby", key: ["ruby"] },
            { value: "Go", key: ["go"] },
          ],
        },
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

  &::before {
    position: absolute;
    content: " ";
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

  &:hover {
    background: var(--accent-color-900);
    color: var(--primary-color-100);
    border-radius: 3px;
  }
}
</style>