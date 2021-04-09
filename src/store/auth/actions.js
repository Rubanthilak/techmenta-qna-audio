export default {
  async login(context,payload){
    await context.getters.firebaseAuth.signInWithEmailAndPassword(payload.email,payload.password);
  },
  async logout (context){
    await context.getters.firebaseAuth.signOut();
  },
  fetchUser({ commit }, user) {
    commit("setLoggedIn", user !== null);
    if (user) {
      commit("setUserData", {
        displayName: user.displayName,
        email: user.email,
        uid: user.uid
      });
    } else {
      commit("setUserData", null);
    }
  }
}