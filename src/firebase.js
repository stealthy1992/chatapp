import firebase from 'firebase/app';
// import 'firebase/storage'
// import 'firebase/firestore'
import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
import { getStorage } from 'firebase/storage'

// TODO: Replace the following with your app's Firebase project configuration

const firebaseConfig = {
  apiKey: "AIzaSyCR0B-UGEnrRAeqiYc3tmM43gavQTyAeBg",
  authDomain: "admin-panel-5400e.firebaseapp.com",
  databaseURL: "https://admin-panel-5400e-default-rtdb.firebaseio.com",
  projectId: "admin-panel-5400e",
  storageBucket: "admin-panel-5400e.appspot.com",
  messagingSenderId: "73881158797",
  appId: "1:73881158797:web:f7229f2154318fcd9acec4",
  measurementId: "G-1H3C33EZ6C"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app)
const storage = getStorage(app)
// const projectStorage = firebase.storage()
// const projectFirestore = firebase.firestore()

export {db, storage}