import mutations from "./mutations";
import getters from "./getters.js";
import actions from "./actions";


export default {
  namespaced : true,
  state() {
    return {
      feedList : []
    }
  },
  mutations,
  getters,
  actions
};
