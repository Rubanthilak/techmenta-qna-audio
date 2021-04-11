<template>
  <div>
    <h1>Ask a public question</h1>
    <div class="card">
      <form @submit.prevent="validatePost" class="form">
        <p>Title</p>
        <input type="text" v-model="title" />
        <p>Description</p>
        <textarea cols="30" rows="10" v-model="desc"></textarea>
        <p>Tags (i.e: html,css,js)</p>
        <input type="text" v-model="tags" />
        <button type="submit">Post</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: null,
      desc: null,
      tags: null,
    };
  },
  methods: {
    validatePost() {
      if (this.title && this.desc && this.tags) {
        this.$store.getters.firestore
          .collection("posts")
          .add({
            title: this.title,
            desc: this.desc,
            timestamp: this.$store.getters.firebase.firestore.FieldValue.serverTimestamp(),
            tags: this.tags.split(","),
            totalVotes: 0,
            username: this.$store.getters.getUserData.displayName,
            userid: this.$store.getters.getUserData.uid
          })
          .then((docRef) => {
            this.$router.replace('/post/'+ docRef.id)
          })
          .catch((error) => {
            console.error("Error adding document: ", error);
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  width: 600px;
  padding: 25px;
  background: var(--primary-color-800);
  border-radius: 10px;
  margin-top: 25px;
}
.form {
  display: flex;
  flex-direction: column;
}

input,
textarea {
  margin-bottom: 25px;
  padding: 12px 10px;
  border-radius: 6px;
  border: none;
  outline: none;
  background: var(--primary-color-700);
  color: var(--primary-color-100);
  font-family: var(--font);
  font-weight: var(--medium);
  resize: none
}
</style>