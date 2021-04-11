//firebase setup
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDrtGGTF-z7nvjV7HkDE_nv2lB66_rXgkw",
    authDomain: "techmenta-site.firebaseapp.com",
    projectId: "techmenta-site",
    storageBucket: "techmenta-site.appspot.com",
    messagingSenderId: "313538870857",
    appId: "1:313538870857:web:afe7ee19b695641b534998",
    measurementId: "G-NSCNJHKJF9"
};

firebase.initializeApp(firebaseConfig);


firebase.getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = firebase.auth().onAuthStateChanged(user => {
            unsubscribe();
            resolve(user);
        }, reject);
    })
};

export default firebase;