// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyA83oaxxPfUKre-rzgNmuxrwj9rN-dpOfo",
//   authDomain: "my-doctor-acd4a.firebaseapp.com",
//   projectId: "my-doctor-acd4a",
//   storageBucket: "my-doctor-acd4a.appspot.com",
//   messagingSenderId: "759515297653",
//   appId: "1:759515297653:web:ccac35113793163121053c"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

import firebase from 'firebase';

firebase.initializeApp({
  apiKey: 'AIzaSyA83oaxxPfUKre-rzgNmuxrwj9rN-dpOfo',
  authDomain: 'my-doctor-acd4a.firebaseapp.com',
  projectId: 'my-doctor-acd4a',
  storageBucket: 'my-doctor-acd4a.appspot.com',
  messagingSenderId: '759515297653',
  appId: '1:759515297653:web:ccac35113793163121053c',
});

const Fire = firebase;

export default Fire;
