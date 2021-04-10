export default {
  async login(context, payload) {
    await context.getters.firebaseAuth.signInWithEmailAndPassword(
      payload.email,
      payload.password
    );
  },
  async signup(context, payload) {
    await context.getters.firebaseAuth.createUserWithEmailAndPassword(
      payload.email,
      payload.password
    );

    var user = context.getters.firebaseAuth.currentUser;

    user.updateProfile({
        displayName: payload.username,
      })
      .then(function() {
        // Update successful.
        context.dispatch('fetchUser',user);
      })
      .catch(function(error) {
        // An error happened.
        console.log(error)
      });
  },
  async logout(context) {
    await context.getters.firebaseAuth.signOut();
  },
  fetchUser({ commit }, user) {
    commit("setLoggedIn", user !== null);
    if (user) {
      commit("setUserData", {
        displayName: user.displayName,
        email: user.email,
        uid: user.uid,
      });
    } else {
      commit("setUserData", null);
    }
  },
};
