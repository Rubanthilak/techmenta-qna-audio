export default {
  setLoggedIn(state, value) {
    state.user.loggedIn = value;
  },
  setUserData(state, data) {
    state.user.data = data;
  },
};
