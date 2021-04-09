import { createStore } from 'vuex'
import authModule from './auth/index.js'
import feedModule from './feed/index.js'
import firebase from "../firebase/firebase";

const store = createStore({
    modules: {
        auth : authModule,
        feed : feedModule
    },
    state : {
        firestore : firebase.db,
        storage: firebase.storage,
    },
    getters : {
        firestore (state) {
            return state.firestore;
        }
    }
});

export default store;