import mutations from "./mutations";
import getters from "./getters.js";
import actions from "./actions";


export default {
  state() {
    return {
      token: null,
      userId: null,
      didAutoLogin: false
    }
  },
  mutations,
  getters,
  actions
};
