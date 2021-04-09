import mutations from "./mutations";
import getters from "./getters.js";
import actions from "./actions";


export default {
  state() {
    return {
      user: {
        loggedIn: false,
        data: null
      }
    }
  },
  mutations,
  getters,
  actions
};
