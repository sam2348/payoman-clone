import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDbKdzO9JXEB1bQpPT3AukxuLrC-1LTWQg",
  authDomain: "payomen-42343.firebaseapp.com",
  projectId: "payomen-42343",
  storageBucket: "payomen-42343.appspot.com",
  messagingSenderId: "838625276744",
  appId: "1:838625276744:web:79b1520797c49e0e6eb97d",
  measurementId: "G-8VPZLSHSQ5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

export {app,auth};