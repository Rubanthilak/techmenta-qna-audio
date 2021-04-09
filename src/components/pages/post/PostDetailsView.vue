<template>
  <div>
    <section>
      <h1>{{post.title}}</h1>
      <p>{{post.desc}}</p>
    </section>
    <section>
      <p>{{post.username}}</p>
    </section>
    <section>
      <h3>Answers</h3>
      <textarea cols="30" rows="10"></textarea>
      <div class="flex button-container">
        <recorder-view></recorder-view>
        <button>Post Your Answer</button>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      post: {},
    };
  },
  beforeMount() {
    var docRef = this.$store.getters.firestore.doc(
      "posts/" + this.$route.params.postid
    );
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          this.post = doc.data();
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
.button-container{
    button{
        margin-left: 10px;
    }
}
</style>