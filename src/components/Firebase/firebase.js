// const firebase = require("firebase");
// Required for side-effects
import "firebase/firestore";
import firebase from "firebase/app";
import "firebase/auth";
// import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const config = {
  apiKey: "AIzaSyCMQN2RFGzqGR989GqGkDMlPUv4VYV6Etg",
  authDomain: "roadtofirebase-ae0cc.firebaseapp.com",
  databaseURL: "https://roadtofirebase-ae0cc.firebaseio.com",
  projectId: "roadtofirebase-ae0cc",
  storageBucket: "roadtofirebase-ae0cc.appspot.com",
  messagingSenderId: "360343585953",
  appId: "1:360343585953:web:874070cf11705ccedb1ce0",
  measurementId: "G-34MH463P0B",
};

const app = firebase.initializeApp(config);
export default app;
export const auth = app.auth();
export const db =firebase.firestore();
export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
// export const FacebookProvider = new firebase.auth.FacebookAuthProvider();

// class Firebase {
//   constructor() {
//     app.initializeApp(config);
//     this.auth = app.auth();
//   }
//   // *** Auth API ***
//   doCreateUserWithEmailAndPassword = (email, password) => {
//     console.log("do create user with emaiil & password");
//     this.auth.createUserWithEmailAndPassword(email, password);
//     console.log('created');
//   };
//   doSignInWithEmailAndPassword = (email, password) =>
//     this.auth.signInWithEmailAndPassword(email, password);
//   doSignOut = () => this.auth.signOut();
//   doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);
//   doPasswordUpdate = (password) =>
//     this.auth.currentUser.updatePassword(password);
// }

// export default Firebase;
