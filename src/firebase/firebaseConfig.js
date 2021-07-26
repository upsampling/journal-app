import firebase from "firebase/app";
import 'firebase/firebase-firestore';
import 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyBNLu9Zxnnzv8xaZ2yjf1rzWSlwFbZwACc",
    authDomain: "react-app-cursos-e54f5.firebaseapp.com",
    projectId: "react-app-cursos-e54f5",
    storageBucket: "react-app-cursos-e54f5.appspot.com",
    messagingSenderId: "945251903875",
    appId: "1:945251903875:web:efdb814494b2a01973eeb6"
  };

  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

  export{
      db,
      googleAuthProvider,
      firebase
  }


