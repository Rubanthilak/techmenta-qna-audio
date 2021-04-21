<template>
  <div v-if="post">
    <section class="card">
      <h1>{{post.title}}</h1>
      <p>
        <span>Asked on</span>
        {{formattedDate}}
        <span>by</span>
        {{post.username}}
      </p>
      <hr />
      <p>{{post.desc}}</p>
      <div class="tags-wrapper flex" style="margin-top:25px">
        <p class="tag" v-for="tag in post.tags" :key="tag">{{tag}}</p>
      </div>
      <hr />
      <div class="tags-wrapper flex">
        <p>Preferred Language : </p>
        <p class="lang tag" v-for="lang in post.preferredLang" :key="lang">{{lang}}</p>
      </div>
    </section>
    <section class="card" v-if="answerList.length > 0">
      <h3>Answers</h3>
      <hr />
      <div v-for="ans in answerList" :key="ans.id" class="answer">
        <p>
          <span>{{ans.username}}</span>
        </p>
        <p>{{ans.text}}</p>
        <audio :src="ans.audioURL" v-if="ans.audioURL" controls></audio>
        <p>
          answered
          <span>{{formatDate(ans.timestamp)}}</span>
        </p>
      </div>
    </section>
    <section class="ans-wrapper flex">
      <h3>Your Answer</h3>
      <div v-if="!isloading">
        <textarea cols="100" rows="10" v-model="answer"></textarea>
        <div v-if="newAudio" class="flex audio-wrapper">
          <audio :src="newAudioURL" controls></audio>
          <button @click="setNewAudio(null)">Remove</button>
        </div>
        <div v-if="recording" class="record-anime">
          <p>Recording ...</p>
        </div>
        <div class="flex button-container">
          <recorder-view @finish="setNewAudio" @start="startRecording"></recorder-view>
          <button @click="validateForm" v-if="!recording && !isloading">Post Your Answer</button>
        </div>
      </div>
      <div style="margin-top:25px" v-else>
        <div class="sk-chase">
          <div class="sk-chase-dot"></div>
          <div class="sk-chase-dot"></div>
          <div class="sk-chase-dot"></div>
          <div class="sk-chase-dot"></div>
          <div class="sk-chase-dot"></div>
          <div class="sk-chase-dot"></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      post: null,
      newAudio: null,
      recording: false,
      answer: null,
      answerList: null,
      isloading: false,
    };
  },
  computed: {
    newAudioURL() {
      return URL.createObjectURL(this.newAudio);
    },
    formattedDate() {
      return this.post.timestamp ? this.formatDate(this.post.timestamp) : null;
    },
    answersCollection() {
      return this.$store.getters.firestore
        .doc(`posts/${this.$route.params.postid}`)
        .collection("answers");
    },
  },
  methods: {
    formatDate(date) {
      if (!date) {
        return;
      }
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      const formatMin = function (min) {
        if (min < 10) {
          return "0" + min;
        }
        return min;
      };

      var d = date.toDate();
      const year = d.getFullYear();
      const day = d.getDate();
      const monthIndex = d.getMonth();
      const monthName = months[monthIndex];
      const hour = d.getHours();
      const min = d.getMinutes();
      return (
        monthName + " " + day + " " + year + " " + hour + ":" + formatMin(min)
      );
    },
    setNewAudio(audio) {
      this.newAudio = audio;
      this.recording = false;
    },
    startRecording() {
      this.newAudio = null;
      this.recording = true;
    },
    async validateForm() {
      let audioURL = null;
      const { id: answerId } = this.answersCollection.doc();

      if (this.answer) {
        this.isloading = true;

        if (this.newAudio) {
          const storageRef = this.$store.getters.firebaseStorage
            .ref("audio")
            .child(this.$route.params.postid)
            .child(`${answerId}.wav`);
          await storageRef.put(this.newAudio);
          audioURL = await storageRef.getDownloadURL();
        }

        await this.answersCollection.doc(answerId).set({
          text: this.answer,
          userid: this.$store.getters.getUserData.uid,
          username: this.$store.getters.getUserData.displayName,
          timestamp: this.$store.getters.firebase.firestore.FieldValue.serverTimestamp(),
          audioURL,
        });

        this.answer = "";
        this.newAudio = null;
        this.isloading = false;
      }
    },
  },
  beforeCreate() {
    var docRef = this.$store.getters.firestore.doc(
      "posts/" + this.$route.params.postid
    );
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          this.post = doc.data();
          this.$bind("answerList", this.answersCollection.orderBy("timestamp"));
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  },
};
</script>

<style lang="scss" scoped>
.button-container {
  button,
  p {
    margin-left: 10px;
  }
}

.tags-wrapper{
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-top: 10px;
  .tag{
    background: var(--accent-color-900);
    padding: 5px 10px;
    font-size: 10px;
    border-radius: 360px;
  }
  .lang{
    color: var(--accent-color-900);
    background: white;
    font-weight: var(--semibold);
  }
}

span {
  font-weight: var(--semibold);
}

hr {
  border-bottom: 1px solid var(--primary-color-800);
}

audio {
  outline: none;
  border: none;
}

textarea {
  resize: none;
  width: 800px;
  padding: 25px;
  border-radius: 8px;
  margin: 25px 0px;
  font-weight: var(--regular);
  font-family: var(--font);
  outline: none;
}

.card {
  width: 800px;
  padding: 25px;
  background: var(--primary-color-800);
  border-radius: 10px;
  margin-top: 25px;
}

.ans-wrapper {
  margin: 25px 0px;
  flex-direction: column;
}

.audio-wrapper {
  align-items: center;
  margin-bottom: 25px;

  button {
    height: 40px;
    margin-left: 25px;
  }
}

.record-anime {
  margin-bottom: 10px;
}

.answer {
  background: var(--primary-color-700);
  border-radius: 10px;
  padding: 25px;
  p {
    font-size: 14px;
    span {
      font-weight: var(--semibold);
    }
  }
  audio {
    margin: 10px 0px;
  }
  margin-bottom: 10px;
}

.sk-chase {
  width: 40px;
  height: 40px;
  position: relative;
  animation: sk-chase 2.5s infinite linear both;
}

.sk-chase-dot {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  animation: sk-chase-dot 2s infinite ease-in-out both;
}

.sk-chase-dot:before {
  content: "";
  display: block;
  width: 25%;
  height: 25%;
  background-color: #fff;
  border-radius: 100%;
  animation: sk-chase-dot-before 2s infinite ease-in-out both;
}

.sk-chase-dot:nth-child(1) {
  animation-delay: -1.1s;
}
.sk-chase-dot:nth-child(2) {
  animation-delay: -1s;
}
.sk-chase-dot:nth-child(3) {
  animation-delay: -0.9s;
}
.sk-chase-dot:nth-child(4) {
  animation-delay: -0.8s;
}
.sk-chase-dot:nth-child(5) {
  animation-delay: -0.7s;
}
.sk-chase-dot:nth-child(6) {
  animation-delay: -0.6s;
}
.sk-chase-dot:nth-child(1):before {
  animation-delay: -1.1s;
}
.sk-chase-dot:nth-child(2):before {
  animation-delay: -1s;
}
.sk-chase-dot:nth-child(3):before {
  animation-delay: -0.9s;
}
.sk-chase-dot:nth-child(4):before {
  animation-delay: -0.8s;
}
.sk-chase-dot:nth-child(5):before {
  animation-delay: -0.7s;
}
.sk-chase-dot:nth-child(6):before {
  animation-delay: -0.6s;
}

@keyframes sk-chase {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes sk-chase-dot {
  80%,
  100% {
    transform: rotate(360deg);
  }
}

@keyframes sk-chase-dot-before {
  50% {
    transform: scale(0.4);
  }
  100%,
  0% {
    transform: scale(1);
  }
}
</style>