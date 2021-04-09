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
        firebaseStorage: firebase.storage,
        firebaseAuth: firebase.auth
    },
    getters : {
        firestore (state) {
            return state.firestore;
        },
        firebaseStorage (state) {
            return state.firebaseStorage;
        },
        firebaseAuth (state) {
            return state.firebaseAuth;
        }
    }
});

export default store;