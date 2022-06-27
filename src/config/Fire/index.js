// Ini adalah configurasi firebase versi 7
// import { firebase } from 'firebase/app';

// firebase.initializeApp({
//   apiKey: 'AIzaSyA83oaxxPfUKre-rzgNmuxrwj9rN-dpOfo',
//   authDomain: 'my-doctor-acd4a.firebaseapp.com',
//   projectId: 'my-doctor-acd4a',
//   storageBucket: 'my-doctor-acd4a.appspot.com',
//   messagingSenderId: '759515297653',
//   appId: '1:759515297653:web:ccac35113793163121053c',
// });

// const Fire = firebase;

// export default Fire;

// Ini adalah configurasi firebase versi 9
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyA83oaxxPfUKre-rzgNmuxrwj9rN-dpOfo',
  authDomain: 'my-doctor-acd4a.firebaseapp.com',
  projectId: 'my-doctor-acd4a',
  storageBucket: 'my-doctor-acd4a.appspot.com',
  messagingSenderId: '759515297653',
  appId: '1:759515297653:web:ccac35113793163121053c',
  databaseURL:
    'https://my-doctor-acd4a-default-rtdb.asia-southeast1.firebasedatabase.app/',
};

const Fire = initializeApp(firebaseConfig);
// const database = getDatabase(Fire);

export default Fire;
