import firebase from "firebase";
require('firebase/auth');
require("firebase/firestore");
const config = {
  apiKey: "AIzaSyDyxwrcyuX-yUNSkxBbdQneko0ud2zDkSg",
  authDomain: "bulmashopping-a3323.firebaseapp.com",
  databaseURL: "https://bulmashopping-a3323.firebaseio.com",
  projectId: "bulmashopping-a3323",
  storageBucket: "bulmashopping-a3323.appspot.com",
  messagingSenderId: "801766169943"
};
firebase.initializeApp(config);
export const db = firebase.firestore();
export const auth = firebase.auth();

export default firebase;
