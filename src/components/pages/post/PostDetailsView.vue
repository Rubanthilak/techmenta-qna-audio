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
    </section>
    <section class="card" v-if="answerList.length > 0">
      <h3>Answers</h3>
      <hr />
      <div v-for="ans in answerList" :key="ans.id" class="answer">
        <p><span>{{ans.username}}</span></p>
        <p>{{ans.text}}</p>
        <audio :src="ans.audioURL" v-if="ans.audioURL" controls></audio>
        <p>
          answered <span>{{formatDate(ans.timestamp)}}</span>
        </p>
      </div>
    </section>
    <section class="ans-wrapper flex">
      <h3>Your Answer</h3>
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
        <button @click="validateForm" v-if="!recording && !loading">Post Your Answer</button>
        <p v-if="loading">Uploading...</p>
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
      loading: false
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
      if(!date){
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

        this.loading = true;

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
        this.loading = false;
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
  button,p {
    margin-left: 10px;
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
</style>