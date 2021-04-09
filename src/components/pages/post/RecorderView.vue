<template>
    <div>
      <audio v-if="newAudio" :src="newAudioURL" controls></audio>
      <button v-if="!recorder" @click="record()">Record</button>
      <button v-else @click="stop()">Stop</button>
    </div>
</template>

<script>
export default {
  data() {
    return {
      newAudio: null,
      recorder: null,
    };
  },
  computed: {
    newAudioURL() {
      return URL.createObjectURL(this.newAudio);
    },
  },
  methods: {
    async record() {
      this.newAudio = null;
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });

      const options = { mimeType: "audio/webm" };
      const recorderChunks = [];
      this.recorder = new MediaRecorder(stream, options);

      this.recorder.addEventListener("dataavailable", (e) => {
        if (e.data.size > 0) {
          recorderChunks.push(e.data);
        }
      });

      this.recorder.addEventListener("stop", () => {
        this.newAudio = new Blob(recorderChunks);
      });

      this.recorder.start();
    },

    async stop() {
      this.recorder.stop();
      this.recorder = null;
    },
  },
};
</script>

<style lang="scss" scoped>


h2{
    margin-bottom: 10px;
}

audio{
    margin-bottom: 25px;
    outline: none;
    border: none;
}

</style>