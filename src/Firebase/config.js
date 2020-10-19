import firebase from "firebase";

const firebaseConfig = {
};

export const fire = firebase.initializeApp(firebaseConfig);
export const db = fire.firestore();
export default fire;
