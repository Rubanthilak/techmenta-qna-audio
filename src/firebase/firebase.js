import firebase from "./firebaseConfig"

export default {
    db : firebase.firestore(),
    storage: firebase.storage(),
};