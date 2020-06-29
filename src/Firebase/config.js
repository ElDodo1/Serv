import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCQmaKPX7-86CvjHZyT_XaUr7fM73RhIUE",
  authDomain: "serv-21983.firebaseapp.com",
  databaseURL: "https://serv-21983.firebaseio.com",
  projectId: "serv-21983",
  storageBucket: "serv-21983.appspot.com",
  messagingSenderId: "946055342417",
  appId: "1:946055342417:web:151402f733da3239d9cb70",
  measurementId: "G-F1RPHL3WW4",
};

export const fire = firebase.initializeApp(firebaseConfig);
export const db = fire.firestore();
export default fire;
