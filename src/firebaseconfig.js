import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyANYwZEz4XjNbg56C0X4Or5FxJCyD2l7dg",
    authDomain: "udemy-react-37d0c.firebaseapp.com",
    projectId: "udemy-react-37d0c",
    storageBucket: "udemy-react-37d0c.appspot.com",
    messagingSenderId: "840163997614",
    appId: "1:840163997614:web:9172f6dcb743e6ad42ba3f"
};
  // Initialize Firebase

const fire =  firebase.initializeApp(firebaseConfig);

const auth = fire.auth()
const store = fire.firestore()

export {auth, store}